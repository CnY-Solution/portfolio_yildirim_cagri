"""Adversarial offline tests: python -B -m unittest discover -s tools/veille."""
from datetime import datetime, timedelta, timezone
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location("veille_update", Path(__file__).with_name("update.py"))
update = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(update)
NOW = datetime(2026, 11, 13, 12, tzinfo=timezone.utc)
SOURCE = {"id": "test", "name": "Test", "url": "https://example.org/", "feed": "https://example.org/feed/",
          "hosts": ["example.org"], "keywords": [], "category": "Cybersécurité", "context": "Context"}


def rss(*items):
    return ("<rss><channel>" + "".join(items) + "</channel></rss>").encode()


def item(path="one", title="Alerte", published="Thu, 12 Nov 2026 12:00:00 +0000"):
    return f"<item><title>{title}</title><link>https://example.org/{path}</link><pubDate>{published}</pubDate></item>"


class FeedTests(unittest.TestCase):
    def test_rss_dates_and_host_are_filtered(self):
        payload = rss(item(), item("old", published="Thu, 01 Jan 2026 12:00:00 +0000"),
                      item("future", published="Sun, 15 Nov 2026 12:00:00 +0000"),
                      item("bad", published="yesterday"),
                      item("naive", published="2026-11-12T12:00:00"),
                      item("evil").replace("https://example.org/evil", "https://example.org.evil/"))
        articles = update.parse_feed(payload, SOURCE, NOW)
        self.assertEqual([article["url"] for article in articles], ["https://example.org/one"])

    def test_atom_and_encoded_markup_remain_text(self):
        payload = b'<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>&lt;b&gt;DNS &amp;amp; TLS&lt;/b&gt;</title><link href="https://example.org/news"/><published>2026-11-12T13:00:00+01:00</published></entry></feed>'
        article = update.parse_feed(payload, SOURCE, NOW)[0]
        self.assertEqual(article["title"], "DNS & TLS")
        self.assertEqual(article["publishedAt"], "2026-11-12T12:00:00Z")

    def test_dtd_blocked_in_all_common_encodings(self):
        dangerous = '<?xml version="1.0"?><!DOCTYPE rss [<!ENTITY x "danger">]><rss><channel/></rss>'
        for encoding in ["utf-8", "utf-16", "utf-32"]:
            with self.subTest(encoding=encoding), self.assertRaisesRegex(ValueError, "DTD"):
                update.parse_feed(dangerous.encode(encoding), SOURCE, NOW)

    def test_malformed_size_and_unsupported_xml_fail(self):
        for payload in [b"<rss>", b"<html/>", b"x" * (update.MAX_BYTES + 1)]:
            with self.subTest(size=len(payload)), self.assertRaises((ValueError, update.ET.ParseError)):
                update.parse_feed(payload, SOURCE, NOW)

    def test_rss_requires_channel_but_empty_channel_is_valid(self):
        for payload in [b"<rss/>", b"<rss><bogus/></rss>"]:
            with self.subTest(payload=payload), self.assertRaisesRegex(ValueError, "missing its channel"):
                update.parse_feed(payload, SOURCE, NOW)
        self.assertEqual(update.parse_feed(b"<rss><channel/></rss>", SOURCE, NOW), [])

    def test_reject_credentials_ports_schemes_and_redirects(self):
        for url in ["http://example.org/", "javascript:alert(1)", "https://user@example.org/", "https://example.org:444/", "https://evil.org/"]:
            self.assertIsNone(update.safe_url(url, SOURCE["hosts"]))
        redirects = update.AllowedRedirects(SOURCE["hosts"])
        with self.assertRaises(ValueError):
            redirects.redirect_request(None, None, 302, "", {}, "http://example.org/")

    def test_dedup_diversity_and_window(self):
        first = update.parse_feed(rss(item("one"), item("two"), item("three")), SOURCE, NOW)
        second_source = dict(SOURCE, id="second")
        second = update.parse_feed(rss(item("four"), item("five")), second_source, NOW)
        articles = update.select_articles(first + first + second, [SOURCE, second_source], NOW)
        self.assertEqual(len(articles), 4)
        self.assertEqual(len({article["url"] for article in articles}), 4)
        self.assertEqual(sum(article["sourceId"] == "test" for article in articles), 2)

    def test_keywords_exclude_irrelevant_publications(self):
        source = dict(SOURCE, keywords=["dns", " ia "])
        result = update.parse_feed(rss(item("one", "Une exposition"), item("two", "DNS sécurisé"), item("three", "Des agents IA publics")), source, NOW)
        self.assertEqual(len(result), 2)

    def test_titles_respect_frontend_limit_without_truncation(self):
        result = update.parse_feed(rss(item("valid", "A" * 280), item("long", "A" * 281)), SOURCE, NOW)
        self.assertEqual(len(result), 1)
        self.assertEqual(len(result[0]["title"]), 280)
        too_long_saved = dict(result[0], title="B" * 281)
        self.assertEqual(update.select_articles([too_long_saved], [SOURCE], NOW), [])


class CollectionTests(unittest.TestCase):
    def previous(self):
        return {"schemaVersion": 1, "collectedAt": "2026-11-12T12:00:00Z",
                "sources": [{"id": "test", "lastSuccessAt": "2026-11-12T12:00:00Z", "status": "ok"}],
                "articles": update.parse_feed(rss(item()), SOURCE, NOW)}

    def test_partial_failure_keeps_original_success_and_article_date(self):
        second = dict(SOURCE, id="second")
        def fetcher(source):
            if source["id"] == "test":
                raise OSError("offline")
            return rss(item("new"))
        result = update.collect([SOURCE, second], self.previous(), NOW, fetcher)
        self.assertEqual(result["sources"][0]["status"], "error")
        self.assertEqual(result["sources"][0]["lastSuccessAt"], "2026-11-12T12:00:00Z")
        self.assertEqual(result["articles"][0]["publishedAt"], "2026-11-12T12:00:00Z")
        self.assertEqual(len(result["articles"]), 2)

    def test_old_fallback_expires_and_empty_valid_feed_is_success(self):
        second = dict(SOURCE, id="second")
        def fetcher(source):
            if source["id"] == "test":
                raise OSError("offline")
            return rss()
        result = update.collect([SOURCE, second], self.previous(), NOW + timedelta(days=31), fetcher)
        self.assertEqual(result["articles"], [])
        self.assertEqual(result["sources"][1]["status"], "ok")

    def test_all_failed_does_not_write(self):
        previous = self.previous()
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "veille.json"
            update.write_snapshot(path, previous)
            original = path.read_bytes()
            with self.assertRaises(RuntimeError):
                result = update.collect([SOURCE], previous, NOW, lambda _: b"broken xml")
                update.write_snapshot(path, result)
            self.assertEqual(path.read_bytes(), original)

    def test_missing_channel_preserves_previous_snapshot_and_source_date(self):
        previous = self.previous()
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "veille.json"
            update.write_snapshot(path, previous)
            original = path.read_bytes()
            for payload in [b"<rss/>", b"<rss><bogus/></rss>"]:
                with self.subTest(payload=payload), self.assertRaises(RuntimeError):
                    result = update.collect([SOURCE], previous, NOW, lambda _: payload)
                    update.write_snapshot(path, result)
                self.assertEqual(path.read_bytes(), original)
            second = dict(SOURCE, id="second")
            result = update.collect([SOURCE, second], previous, NOW,
                                    lambda source: b"<rss/>" if source["id"] == "test" else rss())
            self.assertEqual(result["sources"][0]["status"], "error")
            self.assertEqual(result["sources"][0]["lastSuccessAt"], "2026-11-12T12:00:00Z")
            self.assertEqual(result["articles"], previous["articles"])

    def test_atomic_replace_error_preserves_old_file_and_cleans_temporary(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "veille.json"
            path.write_text("old", encoding="utf-8")
            with patch.object(update.os, "replace", side_effect=OSError("busy")), self.assertRaises(OSError):
                update.write_snapshot(path, self.previous())
            self.assertEqual(path.read_text(), "old")
            self.assertEqual(list(Path(directory).iterdir()), [path])


if __name__ == "__main__":
    unittest.main()
