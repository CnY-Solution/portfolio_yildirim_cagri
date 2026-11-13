"""Collect a small, dated, French technology watch. Python 3.11+, stdlib only."""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
import hashlib
from html import unescape
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
import tempfile
from urllib.parse import urlsplit, urlunsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener
import xml.etree.ElementTree as ET

UTC = timezone.utc
MAX_BYTES = 2 * 1024 * 1024
MAX_AGE = timedelta(days=30)
ATOM = "{http://www.w3.org/2005/Atom}"
DEFAULT_SOURCES = Path(__file__).with_name("sources.json")


def iso(value: datetime) -> str:
    return value.astimezone(UTC).isoformat(timespec="seconds").replace("+00:00", "Z")


def date(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        parsed = datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
    except ValueError:
        try:
            parsed = parsedate_to_datetime(value.strip())
        except (ValueError, TypeError, OverflowError):
            return None
    if parsed.tzinfo is None:
        return None
    return parsed.astimezone(UTC)


def safe_url(value: str, hosts: list[str]) -> str | None:
    try:
        part = urlsplit(value.strip())
        if (part.scheme != "https" or part.hostname not in hosts or part.username
                or part.password or part.port not in (None, 443)):
            return None
        return urlunsplit((part.scheme, part.netloc, part.path, part.query, ""))
    except ValueError:
        return None


class TextOnly(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)


def plain(value: str) -> str:
    parser = TextOnly()
    parser.feed(unescape(value))
    return " ".join(" ".join(parser.parts).split())


class AllowedRedirects(HTTPRedirectHandler):
    def __init__(self, hosts: list[str]) -> None:
        self.hosts = hosts

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if not safe_url(newurl, self.hosts):
            raise ValueError("Redirect outside the source allowlist")
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def fetch(source: dict) -> bytes:
    url = safe_url(source["feed"], source["hosts"])
    if not url:
        raise ValueError("Untrusted feed URL")
    request = Request(url, headers={"User-Agent": "AstralPortfolioVeille/1.0",
                                    "Accept": "application/rss+xml, application/atom+xml, application/xml"})
    with build_opener(AllowedRedirects(source["hosts"])).open(request, timeout=15) as response:
        payload = response.read(MAX_BYTES + 1)
    if len(payload) > MAX_BYTES:
        raise ValueError("Feed exceeds 2 MiB")
    return payload


def parse_feed(payload: bytes, source: dict, now: datetime) -> list[dict]:
    if len(payload) > MAX_BYTES:
        raise ValueError("Feed exceeds 2 MiB")
    # Block DTD/entities in UTF-8 and UTF-16/32 before invoking the XML parser.
    guard = payload.replace(b"\x00", b"")
    if re.search(br"<!\s*(?:DOCTYPE|ENTITY)", guard, re.IGNORECASE):
        raise ValueError("DTD and entity declarations are forbidden")
    root = ET.fromstring(payload)
    if root.tag == "rss":
        channel = root.find("channel")
        if channel is None:
            raise ValueError("RSS feed is missing its channel")
        entries = channel.findall("item")
        atom = False
    elif root.tag == f"{ATOM}feed":
        entries = root.findall(f"{ATOM}entry")
        atom = True
    else:
        raise ValueError("Expected RSS 2.0 or Atom feed")
    articles = []
    for entry in entries:
        title = plain(entry.findtext(f"{ATOM}title" if atom else "title", ""))
        if not title or len(title) > 280:
            continue
        if atom:
            links = [link.get("href", "") for link in entry.findall(f"{ATOM}link")
                     if link.get("rel", "alternate") == "alternate"]
            raw_url = links[0] if links else ""
            published = entry.findtext(f"{ATOM}published") or entry.findtext(f"{ATOM}updated")
        else:
            raw_url, published = entry.findtext("link", ""), entry.findtext("pubDate")
        url, published_at = safe_url(raw_url, source["hosts"]), date(published)
        if not url or not published_at or not now - MAX_AGE <= published_at <= now + timedelta(days=1):
            continue
        searchable = f" {title.casefold()} "
        if source["keywords"] and not any(word in searchable for word in source["keywords"]):
            continue
        category = source["category"]
        if source["id"] == "cloudflare" and any(word in searchable for word in (" ia ", "intelligence artificielle", "agent")):
            category = "IA et données"
        articles.append({"id": hashlib.sha256(url.encode()).hexdigest()[:16], "title": title,
                         "url": url, "publishedAt": iso(published_at), "sourceId": source["id"],
                         "category": category, "context": source["context"]})
    return articles


def select_articles(articles: list[dict], sources: list[dict], now: datetime) -> list[dict]:
    """Recent items, maximum two per source; source order breaks exact date ties."""
    allowed = {source["id"]: source for source in sources}
    found: set[str] = set()
    counts: dict[str, int] = {}
    selected = []
    candidates = sorted(articles, key=lambda item: item.get("publishedAt", ""), reverse=True)
    for article in candidates:
        source_id = article.get("sourceId")
        if source_id not in allowed:
            continue
        source = allowed[source_id]
        timestamp = date(article.get("publishedAt"))
        url = safe_url(article.get("url", ""), source["hosts"])
        if (not timestamp or not now - MAX_AGE <= timestamp <= now + timedelta(days=1)
                or not url or url in found or counts.get(source_id, 0) >= 2):
            continue
        # Reconstruct saved articles: old metadata must not inject a new context or host.
        title = article.get("title")
        if not isinstance(title, str) or not title or len(title) > 280:
            continue
        category = article.get("category")
        if category not in ("Cybersécurité", "Cloud et réseaux", "IA et données"):
            continue
        selected.append({"id": hashlib.sha256(url.encode()).hexdigest()[:16], "title": plain(title),
                         "url": url, "publishedAt": iso(timestamp), "sourceId": source_id,
                         "category": category, "context": source["context"]})
        found.add(url)
        counts[source_id] = counts.get(source_id, 0) + 1
        if len(selected) >= 6:
            break
    return selected


def collect(sources: list[dict], previous: dict, now: datetime, fetcher=fetch) -> dict:
    previous_sources = {item["id"]: item for item in previous.get("sources", [])}
    previous_articles = previous.get("articles", [])

    def one(source):
        try:
            return parse_feed(fetcher(source), source, now), None
        except Exception as error:
            return [], error

    with ThreadPoolExecutor(max_workers=3) as executor:
        results = list(executor.map(one, sources))
    candidates, statuses = [], []
    successes = 0
    for source, (articles, error) in zip(sources, results):
        old = previous_sources.get(source["id"], {})
        last_success = old.get("lastSuccessAt") if date(old.get("lastSuccessAt")) else None
        if error is None:
            successes += 1
            last_success = iso(now)
        else:
            print(f"{source['id']}: {type(error).__name__}: {error}", file=sys.stderr)
            articles = [article for article in previous_articles if article.get("sourceId") == source["id"]]
        candidates.extend(articles)
        statuses.append({"id": source["id"], "name": source["name"], "url": source["url"],
                         "lastSuccessAt": last_success, "status": "error" if error else "ok"})
    if not successes:
        raise RuntimeError("All feeds failed; previous snapshot is preserved")
    return {"schemaVersion": 1, "collectedAt": iso(now), "sources": statuses,
            "articles": select_articles(candidates, sources, now)}


def write_snapshot(path: Path, snapshot: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n"
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", dir=path.parent,
                                     prefix=f".{path.name}.", delete=False, newline="\n") as stream:
        temporary = Path(stream.name)
        stream.write(payload)
    try:
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=Path("public/data/veille.json"))
    parser.add_argument("--sources", type=Path, default=DEFAULT_SOURCES)
    parser.add_argument("--now", help="Explicit ISO timestamp for reproducible verification")
    args = parser.parse_args()
    now = date(args.now) if args.now else datetime.now(UTC)
    if now is None:
        parser.error("--now requires an ISO timestamp with timezone")
    try:
        sources = json.loads(args.sources.read_text(encoding="utf-8"))
        previous = json.loads(args.output.read_text(encoding="utf-8")) if args.output.exists() else {}
        snapshot = collect(sources, previous, now)
        write_snapshot(args.output, snapshot)
    except (OSError, ValueError, RuntimeError) as error:
        print(f"Veille not updated: {error}", file=sys.stderr)
        return 1
    print(f"Veille: {len(snapshot['articles'])} articles, "
          f"{sum(source['status'] == 'ok' for source in snapshot['sources'])}/{len(sources)} sources, "
          f"collected {snapshot['collectedAt']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
