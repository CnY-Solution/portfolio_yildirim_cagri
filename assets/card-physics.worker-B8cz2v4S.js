(function(){var e=Object.defineProperty,t=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},n=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};function r(e,t){let n=1-e-t;return[n*(2*n-1),e*(2*e-1),t*(2*t-1),4*n*e,4*e*t,4*t*n]}function i(e,t){let n=1-e-t;return{dr:[1-4*n,4*e-1,0,4*(n-e),4*t,-4*t],ds:[1-4*n,0,4*t-1,-4*e,4*e,4*(n-t)]}}function a(e,t,n,i){let a=r(n,i),o=0,s=0;for(let n=0;n<6;n++){let r=e[t[n]],i=a[n];o+=r.x*i,s+=r.y*i}return{x:o,y:s}}function o(e){let t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=t,c=2*(t+n-2*i),l=n-s-c,u=2*(t+r-2*o),d=r-s-u,f=4*(a-s-(l+d)/2)-c-u,p=Math.min(t,n,r);if(c!==0){let e=-l/(2*c);e>0&&e<1&&Number.isFinite(e)&&(p=Math.min(p,s+l*e+c*e*e))}if(u!==0){let e=-d/(2*u);e>0&&e<1&&Number.isFinite(e)&&(p=Math.min(p,s+d*e+u*e*e))}let m=c-f+u,h=l-d+f-2*u;if(m!==0){let e=-h/(2*m);if(e>0&&e<1&&Number.isFinite(e)){let t=e,n=1-e;p=Math.min(p,s+l*t+d*n+c*t*t+f*t*n+u*n*n)}}let g=4*c*u-f*f;if(g!==0&&Number.isFinite(g)){let e=(f*d-2*u*l)/g,t=(f*l-2*c*d)/g;e>=0&&t>=0&&e+t<=1&&Number.isFinite(e)&&Number.isFinite(t)&&(p=Math.min(p,s+l*e+d*t+c*e*e+f*e*t+u*t*t))}return p}var s=t((()=>{}));function c(e){return e===1||e===2||e===3||e===4||e===5||e===6?e:0}var l=t((()=>{}));function u(e,t,n){return{x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n}}function d(e,t,n){return(t.x-e.x)*(n.y-e.y)-(t.y-e.y)*(n.x-e.x)}function f(e,t){return(t.x-e.x)**2+(t.y-e.y)**2}function p([e,t,n],r){let i=u(e,n,r),a=u(e,n,.5),o=4*r*(1-r);return{x:i.x+o*(t.x-a.x),y:i.y+o*(t.y-a.y)}}function m(e,t,n){let r=n=>{let r=Math.cos(n),i=Math.sin(n);return{x:e/2*(1+Math.sign(r)*Math.sqrt(Math.abs(r))),y:t/2*(1+Math.sign(i)*Math.sqrt(Math.abs(i)))}},i=Array.from({length:8},(e,t)=>r(t*Math.PI/4));i[0]={x:e,y:t/2},i[2]={x:e/2,y:t},i[4]={x:0,y:t/2},i[6]={x:e/2,y:0};let a=i.map((e,t)=>{let n=i[(t+1)%8];return[e,u(u(e,n,.5),r((t+.5)*Math.PI/4),.55),n]}),o=a.map(e=>{let t=[0],n=e[0];for(let r=1;r<=32;r++){let i=p(e,r/32);t.push(t[r-1]+Math.hypot(i.x-n.x,i.y-n.y)),n=i}return t}),s=n/4,c=o[0][32],l=o[1][32],d=Math.max(1,Math.min(s-1,Math.round(s*c/(c+l)))),f=[],m=[];for(let[e,t]of a.entries()){let n=e%4==0||e%4==3?d:s-d,r=o[e],i=0,a=1;for(let e=1;e<=n;e++){let o=e/n*r[32];for(;r[a]<o;)a++;let s=r[a-1],c=e===n?1:(a-1+(o-s)/(r[a]-s))/32;f.push(p(t,i)),m.push(p(t,(i+c)/2)),i=c}}return{rest:f,boundaryMids:m}}function h(e,t,n){let r=u(t,n,.5),i=n.x-t.x,a=n.y-t.y,o=e=>(e.x-r.x)*i+(e.y-r.y)*a,s=[],c=e[e.length-1],l=o(c);for(let t of e){let e=o(t);l>0!=e>0&&s.push(u(c,t,l/(l-e))),e<=0&&s.push(t),c=t,l=e}return s}function g(e,t){let n=0,r=0,i=0;for(let a=1;a+1<e.length;a++){let o=e[0],s=e[a],c=e[a+1],l=d(o,s,c);n+=l,r+=(o.x-t.x+(s.x-t.x)+(c.x-t.x))*l,i+=(o.y-t.y+(s.y-t.y)+(c.y-t.y))*l}return n>0?{x:t.x+r/n/3,y:t.y+i/n/3}:t}function _(e,t,n,r){let i=(e,t)=>Math.max(6,Math.min(4*r+8,Math.ceil(Math.sqrt(12*r*e/t)))),a=i(t,n),o=i(n,t),s=[];for(let r=0;r<o;r++)for(let i=0;i<a;i++){let c={x:(i+(r%2?.75:.25))/a*t,y:(r+.5)/o*n};if(e.every((t,n)=>d(t,e[(n+1)%e.length],c)>0)){let t=Math.min(...e.map(e=>f(e,c)));s.push({point:c,distance:t})}}let c=[];for(let e=0;e<r;e++){let e=s.reduce((e,t)=>t.distance>e.distance?t:e);c.push(e.point);for(let t of s)t.distance=Math.min(t.distance,f(t.point,e.point))}for(let t=0;t<8;t++){let t=[...e,...c];c=c.map(n=>{let r=e;for(let e of t)e!==n&&r.length&&(r=h(r,n,e));return g(r,n)})}return c}function v(e,t,n,r){let i=e.x-r.x,a=e.y-r.y,o=t.x-r.x,s=t.y-r.y,c=n.x-r.x,l=n.y-r.y,u=(i*i+a*a)*(o*l-s*c),d=(o*o+s*s)*(c*a-l*i),f=(c*c+l*l)*(i*s-a*o);return u+d+f>16*2**-52*(Math.abs(u)+Math.abs(d)+Math.abs(f))}function y(e,t){return Math.min(e,t)*128+Math.max(e,t)}function b(e,t){let n=[];n.push([0,1,2]);for(let r=3;r<e.length;r++){let i=/* @__PURE__ */ new Map,a=(e,t)=>{let n=y(e,t);i.delete(n)||i.set(n,[e,t])},o=e[r];n=n.filter(([t,n,r])=>!v(e[t],e[n],e[r],o)||(a(t,n),a(n,r),a(r,t),!1)),r<t&&a(r-1,0);for(let[a,s]of i.values()){let i=d(e[a],e[s],o);i>0?n.push([a,s,r]):i<0&&r<t&&a===r-1&&s===0&&n.push([s,a,r])}}return n}function x(e,t,n){let r=n.length;for(let[a,s,c]of t){let t=[a,s,c],l=t.map(t=>e[t]),f=l.map((e,t)=>u(e,l[(t+1)%3],.5)),p=t.map((e,n)=>e<r&&(e+1)%r===t[(n+1)%3]?e:-1);if(p.every(e=>e<0))continue;let m=p.map((e,t)=>e<0?f[t]:n[e]),h=.125*d(l[0],l[1],l[2]),g=e=>{let t=[...l,...f.map((t,n)=>u(t,m[n],e))];return o(T.map(([e,n])=>{let{dr:r,ds:a}=i(e,n),o=0,s=0,c=0,u=0;for(let e=1;e<t.length;e++){let n=t[e].x-l[0].x,i=t[e].y-l[0].y;o+=n*r[e],s+=n*a[e],c+=i*r[e],u+=i*a[e]}return o*u-s*c}))};if(g(1)>=h)continue;let _=0,v=1;for(let e=0;e<16;e++){let e=(_+v)/2;g(e)>=h?_=e:v=e}for(let[e,t]of p.entries())t>=0&&(n[t]=u(f[e],m[e],_))}}function S(e,t,n){if(!Number.isFinite(e)||!Number.isFinite(t)||e<=0||t<=0)throw RangeError(`Invalid card mesh dimensions`);let r=Number.isInteger(n)&&n>=0&&n<C.length?n:0,i=C[r],a=Math.max(e,t),o=e/a,s=t/a,{rest:c,boundaryMids:l}=m(o,s,i);c.push(..._(c,o,s,w[r]));let u=b(c,i);x(c,u,l);let d=n=>({x:n.x===o?e:n.x*a,y:n.y===s?t:n.y*a});return{rest:c.map(d),triangles:u,boundaryMids:l.map(d),boundaryCount:i}}var C,w,T,E=t((()=>{s(),C=[12,12,16,20,24,28,28],w=[2,6,11,24,37,58,66],T=[[0,0],[1,0],[0,1],[.5,0],[.5,.5],[0,.5]]}));function ee(e){let t=typeof e==`object`&&e&&!Array.isArray(e)?e:{},n={...D};for(let{key:e,min:r,max:i,step:a}of O){let o=t[e];typeof o==`number`&&Number.isFinite(o)&&(n[e]=Number((r+Math.round((Math.max(r,Math.min(i,o))-r)/a)*a).toFixed(6)))}return Object.freeze(n)}var D,O,te=t((()=>{D=Object.freeze({shearModulus:900,bulkModulus:9e4,viscosity:4,ambientDrag:1.8,gripStiffness:1800,gripDamping:34,mass:57,particleSpeed:720,gripNodes:4,gripRadius:.18}),O=[{key:`shearModulus`,label:`Rigidité des triangles`,hint:`Plus bas : la gelée s’étire et se plie davantage.`,min:150,max:3600,step:50,unit:``},{key:`bulkModulus`,label:`Résistance à la compression`,hint:`Plus haut : la carte conserve davantage sa surface.`,min:9e3,max:18e4,step:3e3,unit:``},{key:`viscosity`,label:`Amortissement interne`,hint:`Plus haut : les vibrations de la matière s’atténuent plus vite.`,min:0,max:12,step:.25,unit:`s⁻¹`},{key:`ambientDrag`,label:`Frein du mouvement`,hint:`Plus bas : le mouvement continue plus longtemps après le lâcher.`,min:.2,max:6,step:.1,unit:`s⁻¹`},{key:`mass`,label:`Masse / inertie`,hint:`Masse de chaque carte. Modifie la réponse de la matière ; la prise compense la masse.`,min:28.5,max:114,step:.5,unit:``},{key:`gripStiffness`,label:`Force de prise`,hint:`Plus haut : la zone saisie suit plus fermement le pointeur.`,min:450,max:2700,step:50,unit:``},{key:`gripDamping`,label:`Amortissement de prise`,hint:`Plus haut : moins d’oscillations autour du pointeur.`,min:16,max:80,step:2,unit:``},{key:`gripNodes`,label:`Nœuds saisis`,hint:`Nombre de nœuds voisins qui partagent la traction.`,min:2,max:12,step:1,unit:`nœuds`},{key:`gripRadius`,label:`Étendue de la prise`,hint:`Plus haut : la traction est mieux répartie entre les nœuds saisis.`,min:.08,max:.4,step:.01,unit:`%`},{key:`particleSpeed`,label:`Vitesse maximale`,hint:`Plafond de vitesse des nœuds pendant les mouvements et les chocs.`,min:180,max:720,step:30,unit:`px/s`}]}));function k(e){let t=at.get(e);if(!t)throw Error(`Construct material with createSoftCard`);return t}function A(e,t,n,r){return e*r-t*n}function j(e,t,n){for(let r=0;r<2;r++){let i=r?`y`:`x`,a=e[t[0]][i],o=e[t[1]][i],s=e[t[2]][i],c=e[t[3]][i],l=e[t[4]][i],u=e[t[5]][i],d=r*5;n[d]=-3*a-o+4*c,n[d+1]=-3*a-s+4*u,n[d+2]=2*a+2*o-4*c,n[d+3]=4*(a-c+l-u),n[d+4]=2*a+2*s-4*u}}function ne(e,t,n,r,i=0){let a=e[0]+i*(r?.[0]??0),o=e[1]+i*(r?.[1]??0),s=e[2]+i*(r?.[2]??0),c=e[3]+i*(r?.[3]??0),l=e[4]+i*(r?.[4]??0),u=e[5]+i*(r?.[5]??0),d=e[6]+i*(r?.[6]??0),f=e[7]+i*(r?.[7]??0),p=e[8]+i*(r?.[8]??0),m=e[9]+i*(r?.[9]??0);return(a+2*s*t+c*n)*(d+p*t+2*m*n)-(o+c*t+2*l*n)*(u+2*f*t+p*n)}function M(e,t,n,r=0){let i=e[0]+r*(n?.[0]??0),a=e[1]+r*(n?.[1]??0),o=e[2]+r*(n?.[2]??0),s=e[3]+r*(n?.[3]??0),c=e[4]+r*(n?.[4]??0),l=e[5]+r*(n?.[5]??0),u=e[6]+r*(n?.[6]??0),d=e[7]+r*(n?.[7]??0),f=e[8]+r*(n?.[8]??0),p=e[9]+r*(n?.[9]??0);t[0]=i*u-a*l,t[1]=2*o*u+i*f-2*a*d-s*l,t[2]=s*u+2*i*p-a*f-2*c*l,t[3]=2*(o*f-s*d),t[4]=4*(o*p-c*d),t[5]=2*(s*p-c*f)}function N(e){let t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],s=e[5];return o([t,t+n+i,t+r+s,t+n/2+i/4,t+(n+r)/2+(i+a+s)/4,t+r/2+s/4])}function P(e,t){let n=e[0],r=e[1],i=e[2],a=e[3],o=e[4],s=e[5];return Math.min(n,n+r+a,n+i+s,n+r/2,n+i/2,n+(r+i+o)/2)>t||N(e)>t}function re(e,t){for(let n=0;n<6;n++)e.endJac[n]=e.jac[n]+t*e.linearJac[n]+t*t*e.quadraticJac[n],e.controlJac[n]=e.jac[n]+t*e.linearJac[n]/2;return P(e.endJac,e.floor)&&P(e.controlJac,e.floor)}function ie(e,t){(t.dirty||e.geometryDirtyMask&t.geometryBit)&&(j(e.nodes,t.indices,t.geometry),M(t.geometry,t.jac),t.dirty=!1,e.geometryDirtyMask&=~t.geometryBit)}function F(e,t){ie(e,t);let n=t.geometry,r=N(t.jac),i=0;for(let e=0;e<3;e++){let[t,r]=ht[e];i=Math.max(i,Math.hypot(n[0]+2*n[2]*t+n[3]*r,n[1]+n[3]*t+2*n[4]*r,n[5]+2*n[7]*t+n[8]*r,n[6]+n[8]*t+2*n[9]*r))}let a=Math.max(0,r-t.floor);t.radius=1.8*a/(i+Math.sqrt(i*i+2*a)||1)/13,t.indices.forEach((n,r)=>{t.certificate[2*r]=e.nodes[n].x,t.certificate[2*r+1]=e.nodes[n].y})}function I(e,t){let n=1/0,r=e.nodes[t];for(let i of e.incident[t]){let e=i.indices.indexOf(t)*2;n=Math.min(n,i.radius-Math.hypot(r.x-i.certificate[e],r.y-i.certificate[e+1]))}e.clearance[t]=Math.max(0,n)}function L(e){for(let t of e.cells)F(e,t);e.nodes.forEach((t,n)=>I(e,n))}function ae(e){if(!e.world)return 1/0;let t=1/0,{width:n,height:r}=e.world;for(let[i,a,o]of e.curves){let s=e.nodes[i],c=e.nodes[a],l=e.nodes[o],u=2*l.x-(s.x+c.x)/2,d=2*l.y-(s.y+c.y)/2;t=Math.min(t,Math.min(s.x,c.x,u),Math.min(s.y,c.y,d),n-Math.max(s.x,c.x,u),r-Math.max(s.y,c.y,d))}return Math.max(0,t)}function oe(e,t){let n=[];for(let e of t)n[e.index]=e;let r=[];for(let[t,i,a]of e.curves){let o=n[t],s=n[i],c=n[a];(o||s||c)&&r.push({a:e.nodes[t],b:e.nodes[i],mid:e.nodes[a],aMove:o,bMove:s,midMove:c,ia:o?e.inverseMasses[t]:0,ib:s?e.inverseMasses[i]:0,im:c?e.inverseMasses[a]:0})}return r}function se(e,t,n,r){let i=2*n-(e+t)/2,a=1e-7,o=r-a;return r<=1e6&&e>a&&e<o&&t>a&&t<o&&i>a&&i<o}function ce(e,t=1){if(!e.world)return!0;for(let{a:n,b:r,mid:i,aMove:a,bMove:o,midMove:s}of e.wallProjection)for(let c of[`x`,`y`]){let l=n[c]+t*(a?.[c]??0),u=r[c]+t*(o?.[c]??0),d=i[c]+t*(s?.[c]??0),f=c===`x`?e.world.width:e.world.height;if(se(l,u,d,f))continue;let p=2*(l+u-2*d),m=-3*l-u+4*d,h=Math.abs(p)>G?-m/(2*p):-1,g=h>0&&h<1?l+m*h+p*h*h:l;if(Math.min(l,u,g)<-1e-7||Math.max(l,u,g)>f+1e-7)return!1}return!0}function le(e,t,n){if(!e.world)return!0;let r=0;for(let n of t)e.boundaryPhysical[n.index]&&(r=Math.max(r,Math.abs(n.x),Math.abs(n.y)));if(!r)return!0;if(3*r<=e.wallBudget||(e.wallBudget!==0&&(e.wallBudget=ae(e)),3*r<=e.wallBudget))return e.wallBudget-=3*r,!0;e.wallBudget=0,e.wallProjection=n??oe(e,t);for(let t=0;t<12;t++){if(ce(e))return!0;for(let{a:t,b:n,mid:r,aMove:i,bMove:a,midMove:o,ia:s,ib:c,im:l}of e.wallProjection)for(let u of[`x`,`y`]){let d=u===`x`?e.world.width:e.world.height,f=t[u]+(i?.[u]??0),p=n[u]+(a?.[u]??0),m=r[u]+(o?.[u]??0);if(se(f,p,m,d))continue;let h=2*(f+p-2*m),g=-3*f-p+4*m,_=Math.abs(h)>G?-g/(2*h):-1,v=_>0&&_<1?3:2;for(let e=0;e<v;e++){let f=e===2?_:e,p=(1-f)*(1-2*f),m=f*(2*f-1),h=4*f*(1-f),g=0+p*(t[u]+(i?.[u]??0))+m*(n[u]+(a?.[u]??0))+h*(r[u]+(o?.[u]??0)),v=Math.max(0,Math.min(d,g))-g;if(!v)continue;let y=s*p**2+c*m**2+l*h**2;y<G||(i&&(i[u]+=v*p*s/y),a&&(a[u]+=v*m*c/y),o&&(o[u]+=v*h*l/y))}}}return ce(e)}function R(e,t){let n=0,r=0;for(let i=0;i<t.indices.length;i++){let a=e.nodes[t.indices[i]],o=t.weights[i];n+=a.x*o,r+=a.y*o}t.point.x=n,t.point.y=r}function ue(e,t){return e.curves[t]}function z(e){if(!e.boundaryDirtyMask&&!e.previousBoundaryDirty)return;let t=e.curveCounts.slice(),n=e.previousBoundaryDirty?e.allBoundaryMask:e.boundaryDirtyMask;for(let r=0;r<e.curves.length;r++){if(!(n&1<<r))continue;let i=ue(e,r),a=0;for(let t of[e.nodes,e.previous]){let e=t[i[0]],n=t[i[1]],r=t[i[2]];a=Math.max(a,2*Math.hypot(e.x+n.x-2*r.x,e.y+n.y-2*r.y))}let o=4;for(;o<128&&a/(4*o*o)>pt;)o*=2;o<e.curveCounts[r]&&a/(4*o*o)>pt/2&&(o=e.curveCounts[r]),t[r]=o,e.curveErrors[r]=a/(4*o*o)}if(e.boundaryError=Math.max(...e.curveErrors),t.some((t,n)=>t!==e.curveCounts[n])){e.curveCounts=t,e.boundary=[],e.body.nodes.length=0;for(let n=0;n<e.curves.length;n++)for(let r=0;r<t[n];r++){let i=r/t[n],a={x:0,y:0};e.boundary.push({indices:ue(e,n),weights:[(1-i)*(1-2*i),i*(2*i-1),4*i*(1-i)],point:a}),e.body.nodes.push(a)}let n=me(e.rest,e.material.elements,t,e.curves);e.render=n.render,e.mesh={...e.mesh,nodes:n.render.map(e=>e.point),rest:n.rest,triangles:n.triangles,boundary:e.body.nodes},e.dirty=!0,e.boundaryDirtyMask=e.allBoundaryMask,e.previousBoundaryDirty=!0,e.curveOffsets[0]=0;for(let n=0;n<e.curves.length;n++)e.curveOffsets[n+1]=e.curveOffsets[n]+t[n]}e.oldBoundary.length=e.boundary.length;for(let t=0;t<e.curves.length;t++)if(e.boundaryDirtyMask&1<<t)for(let n=e.curveOffsets[t];n<e.curveOffsets[t+1];n++)R(e,e.boundary[n]);if(e.previousBoundaryDirty)for(let t=0;t<e.boundary.length;t++){let n=e.boundary[t],r=e.oldBoundary[t]??{x:0,y:0};r.x=r.y=0,n.indices.forEach((t,i)=>{r.x+=e.previous[t].x*n.weights[i],r.y+=e.previous[t].y*n.weights[i]}),e.oldBoundary[t]=r}e.boundaryDirtyMask=0,e.previousBoundaryDirty=!1,e.boundaryRevision++}function de(e,t,n=1){if(n)for(let n of t)(n.x||n.y)&&(e.boundaryDirtyMask|=e.curveMasks[n.index])}function fe(e){if(e.dirty){z(e);for(let t of e.render)R(e,t);e.dirty=!1}}function pe(e){let t=0,n=0,r=0;for(let i=0;i<e.nodes.length;i++){let a=1/e.inverseMasses[i];r+=a,t+=e.nodes[i].x*a,n+=e.nodes[i].y*a}let i=0,a=0;for(let t=0;t<e.rest.length;t++){let n=1/e.inverseMasses[t];i+=e.rest[t].x*n,a+=e.rest[t].y*n}e.body.x=(t-i)/r,e.body.y=(n-a)/r}function me(e,t,n,i){let o=[],s=[],c=[],l=/* @__PURE__ */ new Map,u=/* @__PURE__ */ new Map,d=(e,t)=>`${Math.min(e,t)}/${Math.max(e,t)}`;i.forEach(([e,t],n)=>u.set(d(e,t),n));for(let i of t){let t=([t,n])=>{let c=r(t,n),u=i.map((e,t)=>[e,c[t]]).filter(([,e])=>Math.abs(e)>G).sort((e,t)=>e[0]-t[0]).map(([e,t])=>`${e}:${t.toFixed(9)}`).join(`/`),d=l.get(u);if(d!==void 0)return d;let f=o.length;return l.set(u,f),o.push({indices:i,weights:c,point:{x:0,y:0}}),s.push(a(e,i,t,n)),f},f=(e,r,a)=>{let o=[],s=[e,r,a];for(let e=0;e<3;e++){let t=s[e],r=s[(e+1)%3];o.push(t);let a=Math.abs(t[1])<G&&Math.abs(r[1])<G?[i[0],i[1]]:Math.abs(t[0]+t[1]-1)<G&&Math.abs(r[0]+r[1]-1)<G?[i[1],i[2]]:Math.abs(t[0])<G&&Math.abs(r[0])<G?[i[2],i[0]]:null,c=a&&u.get(d(a[0],a[1])),l=c==null?1:n[c]/W;for(let e=1;e<l;e++)o.push([t[0]+(r[0]-t[0])*e/l,t[1]+(r[1]-t[1])*e/l])}if(o.length===3){c.push([t(e),t(r),t(a)]);return}let l=t([(e[0]+r[0]+a[0])/3,(e[1]+r[1]+a[1])/3]);for(let e=0;e<o.length;e++)c.push([t(o[e]),t(o[(e+1)%o.length]),l])};for(let e=0;e<W;e++)for(let t=0;t<W-e;t++)f([e/W,t/W],[(e+1)/W,t/W],[e/W,(t+1)/W]),e+t<1&&f([(e+1)/W,t/W],[(e+1)/W,(t+1)/W],[e/W,(t+1)/W])}return{render:o,rest:s,triangles:c}}function he(e,t,n,a,s=0,l=D){let u=c(s),d=ee(l);if(![e,t,n,a].every(Number.isFinite)||n<=0||a<=0)throw RangeError(`Invalid material dimensions`);let f=S(n,a,u),p=f.rest,m=f.triangles,h=f.boundaryCount;if(h>31)throw RangeError(`Too many physical boundary arcs for the dirty mask`);let g=(e,t)=>e<h&&t<h?(e+1)%h===t?e:(t+1)%h===e?t:-1:-1,_=/* @__PURE__ */ new Map,v=[],y=(e,t)=>{let n=`${Math.min(e,t)}/${Math.max(e,t)}`,r=_.get(n);if(r!==void 0)return r;let i=p[e],a=p[t],o={x:(i.x+a.x)/2,y:(i.y+a.y)/2},s=g(e,t);s>=0&&(o={...f.boundaryMids[s]});let c=p.length;return p.push(o),_.set(n,c),v.push([e,c],[c,t]),c},b=m.map(([e,t,n])=>[e,t,n,y(e,t),y(t,n),y(n,e)]),x=p.map(n=>({x:n.x+e,y:n.y+t})),C=new Float64Array(x.length),w=new Float64Array(x.length),T=b.map((e,t)=>{let n=/* @__PURE__ */ new Float64Array(10);j(p,e,n);let a=o(ht.map(([e,t])=>ne(n,e,t)));if(!(a>0))throw Error(`Invalid quadratic reference`);let s=mt.map(([t,n,a])=>{let{dr:o,ds:s}=i(t,n),c=r(t,n),l=0,u=0,d=0,f=0;for(let t=0;t<6;t++){let n=p[e[t]];l+=n.x*o[t],u+=n.x*s[t],d+=n.y*o[t],f+=n.y*s[t]}let m=l*f-u*d,h=a*m/2,g=o.map((e,t)=>(f*e-d*s[t])/m),_=o.map((e,t)=>(-u*e+l*s[t])/m);for(let t=0;t<6;t++)w[e[t]]+=h*c[t]*c[t];return{gx:g,gy:_,weight:h,shearX:0,shearY:0,shearDenominator:0,pressure:0,shearCompliance:0,shearDivisor:0,bulkCompliance:0}});return{indices:e,geometry:n,delta:/* @__PURE__ */ new Float64Array(10),floor:a*.025,quadrature:s,moves:e.map(e=>({index:e,x:0,y:0})),affected:[],wallCurves:[],geometryBit:b.length<=31?1<<t:0,affectedMask:0,dirty:!1,certificate:/* @__PURE__ */ new Float64Array(12),radius:0,jac:/* @__PURE__ */ new Float64Array(6),linearJac:/* @__PURE__ */ new Float64Array(6),quadraticJac:/* @__PURE__ */ new Float64Array(6),endJac:/* @__PURE__ */ new Float64Array(6),controlJac:/* @__PURE__ */ new Float64Array(6)}}),E=w.reduce((e,t)=>e+t,0);for(let e of T)M(e.geometry,e.jac);for(let e=0;e<x.length;e++)C[e]=E/(d.mass*w[e]);for(let e of T)for(let t of e.quadrature){let n=0;for(let r=0;r<6;r++)n+=C[e.indices[r]]*(t.gx[r]**2+t.gy[r]**2);t.shearDenominator=n}let O=x.map(()=>[]);for(let e of T)for(let t of e.indices)O[t].push(e);for(let e of T){e.affected=[...new Set(e.indices.flatMap(e=>O[e]))];for(let t of e.affected)e.affectedMask|=t.geometryBit}let te=(e,t)=>({indices:e,weights:t,point:{x:0,y:0}}),k=Array.from({length:h},(e,t)=>{let n=(t+1)%h;return[t,n,_.get(`${Math.min(t,n)}/${Math.max(t,n)}`)]}),A=[];for(let e=0;e<h;e++)for(let t=0;t<4;t++){let n=t/4;A.push(te(k[e],[(1-n)*(1-2*n),n*(2*n-1),4*n*(1-n)]))}let N=me(p,b,Array(h).fill(4),k),P=N.render,re=N.rest,ie=N.triangles,F={x:e,y:t,width:n,height:a,vx:0,vy:0,nodes:A.map(e=>e.point),meshLevel:u,physics:d},I={body:F,nodes:x,rest:p,inverseMasses:C,cells:T,incident:O,boundary:A,render:P,mesh:{nodes:P.map(e=>e.point),rest:re,triangles:ie,boundary:F.nodes,physicalNodeCount:x.length,elementCount:b.length,order:2},previous:x.map(e=>({...e})),velocity:x.map(()=>({x:0,y:0})),oldBoundary:A.map(()=>({x:0,y:0})),edges:v,grab:null,material:{nodes:x,rest:p,elements:b,inverseMasses:C,get grip(){return I.grab}},clock:0,asleep:!0,publicVX:0,publicVY:0,dirty:!0,geometryDirtyMask:0,dx:new Float64Array(x.length),dy:new Float64Array(x.length),moveLengths:new Float64Array(x.length),world:null,passPositions:new Float64Array(x.length*2),clearance:new Float64Array(x.length),stamps:new Uint32Array(x.length),revision:0,curveCounts:Array(h).fill(4),boundaryError:0,boundaryPhysical:new Uint8Array(x.length),wallBudget:1/0,referenceCache:/* @__PURE__ */ new Map,curves:k,wallProjection:[],materialDt:0,curveMasks:new Uint32Array(x.length),allBoundaryMask:(1<<h)-1,boundaryDirtyMask:(1<<h)-1,previousBoundaryDirty:!0,curveOffsets:Uint32Array.from({length:h+1},(e,t)=>4*t),curveErrors:new Float64Array(h),boundaryRevision:0,outlineRevision:-1,sweepRevision:-1,sleepRevision:-1,unchangedStep:!1,outlineBox:je(),outlineCurves:Array.from({length:h},je),sweptVertices:/* @__PURE__ */ new Float64Array,sweptTree:/* @__PURE__ */ new Float64Array,sweepStack:/* @__PURE__ */ new Int32Array(16),sweepBox:je(),sweepCurves:Array.from({length:h},je),sweepDeforming:!1};for(let e=0;e<I.curves.length;e++)I.boundaryPhysical[e]=1,I.boundaryPhysical[I.curves[e][2]]=1;I.curves.forEach((e,t)=>e.forEach(e=>{I.curveMasks[e]|=1<<t}));for(let e of T)e.wallCurves=oe(I,e.moves);return at.set(F,I),L(I),fe(I),I.oldBoundary.forEach((e,t)=>Object.assign(e,F.nodes[t])),F}function ge(e){return k(e).material}function _e(e){let t=k(e);return fe(t),t.mesh}function ve(e,t,n){for(let n of t)e.dx[n.index]=n.x,e.dy[n.index]=n.y;for(let t of n){ie(e,t);let n=t.indices,r=t.delta;for(let t=0;t<2;t++){let i=t?e.dy:e.dx,a=t*5,o=i[n[0]],s=i[n[1]],c=i[n[2]],l=i[n[3]],u=i[n[4]],d=i[n[5]];r[a]=-3*o-s+4*l,r[a+1]=-3*o-c+4*d,r[a+2]=2*o+2*s-4*l,r[a+3]=4*(o-l+u-d),r[a+4]=2*o+2*c-4*d}M(t.delta,t.quadraticJac),M(t.geometry,t.linearJac,t.delta,1);for(let e=0;e<6;e++)t.linearJac[e]-=t.jac[e]+t.quadraticJac[e]}for(let n of t)e.dx[n.index]=e.dy[n.index]=0}function ye(e,t,n,r,i){let a=!0;for(let e of t)if(!(Math.abs(e.x)<1e-10&&Math.abs(e.y)<1e-10)){a=!1;break}if(a)return 1;let o=n??[...new Set(t.flatMap(t=>e.incident[t.index]))],s=le(e,t,r),c=s;if(c)for(let n of t){let t=n.x*n.x+n.y*n.y,r=t>=1e-200&&t<=1e200?Math.sqrt(t)*(1+4*2**-52):Math.hypot(n.x,n.y);if(e.moveLengths[n.index]=r,!(r<=e.clearance[n.index])){c=!1;break}}if(c){for(let n of t){let t=e.nodes[n.index];t.x+=n.x,t.y+=n.y,e.clearance[n.index]-=e.moveLengths[n.index]}if(i)e.geometryDirtyMask|=i;else for(let e of o)e.dirty=!0;return de(e,t),e.asleep=!1,e.dirty=!0,1}ve(e,t,o);let l=1;for(let t=0;!(o.every(e=>re(e,l))&&(s||ce(e,l)));t++){if(t===12){l=0;break}l*=.5}for(let n of t){let t=e.nodes[n.index];t.x+=n.x*l,t.y+=n.y*l,e.dx[n.index]=e.dy[n.index]=0}de(e,t,l);for(let t of o){for(let e=0;e<10;e++)t.geometry[e]+=t.delta[e]*l;for(let e=0;e<6;e++)t.jac[e]+=l*t.linearJac[e]+l*l*t.quadraticJac[e];F(e,t)}e.revision++;for(let t of o)for(let n of t.indices)e.stamps[n]!==e.revision&&(e.stamps[n]=e.revision,I(e,n));return e.asleep=!1,e.dirty=!0,l}function be(e,t,n){let r=0,i=0,a=0,o=0;for(let s=0;s<6;s++){let c=e.nodes[t.indices[s]],l=n.gx[s],u=n.gy[s];r+=c.x*l,i+=c.y*l,a+=c.x*u,o+=c.y*u}return[r,i,a,o]}function xe(e,t){if(e.materialDt!==t){e.materialDt=t;let{shearModulus:n,bulkModulus:r}=e.body.physics;for(let i of e.cells)for(let e of i.quadrature)e.shearCompliance=1/(n*e.weight*t*t),e.shearDivisor=e.shearDenominator+e.shearCompliance,e.bulkCompliance=1/(r*e.weight*t*t)}}function Se(e,t){xe(e,t);for(let t of e.cells)for(let n of t.quadrature){let[r,i,a,o]=be(e,t,n),{shearCompliance:s,shearDivisor:c}=n,l=(-(r-o)-s*n.shearX)/c,u=(-(i+a)-s*n.shearY)/c;for(let r=0;r<6;r++){let i=t.moves[r],a=e.inverseMasses[i.index],o=n.gx[r],s=n.gy[r];i.x=a*(l*o+u*s),i.y=a*(-l*s+u*o)}let d=ye(e,t.moves,t.affected,t.wallCurves,t.affectedMask);n.shearX+=l*d,n.shearY+=u*d;let[f,p,m,h]=be(e,t,n),g=0;for(let r=0;r<6;r++){let i=t.moves[r],a=n.gx[r],o=n.gy[r];i.x=h*a-p*o,i.y=-m*a+f*o,g+=e.inverseMasses[i.index]*(i.x*i.x+i.y*i.y)}let _=n.bulkCompliance,v=(1-f*h+p*m-_*n.pressure)/(g+_);for(let n of t.moves)n.x*=v*e.inverseMasses[n.index],n.y*=v*e.inverseMasses[n.index];n.pressure+=v*ye(e,t.moves,t.affected,t.wallCurves,t.affectedMask)}}function B(e){e.world&&(e.world.parked=!1,e.world.quietTime=0)}function Ce(e,t,n){let r=k(e);if(!Number.isFinite(t)||!Number.isFinite(n))return{x:e.x+e.width/2,y:e.y+e.height/2};B(r);let{gripNodes:i,gripRadius:a}=e.physics,o=r.nodes.map((e,r)=>({index:r,d:(e.x-t)**2+(e.y-n)**2})).sort((e,t)=>e.d-t.d).slice(0,i),s=Math.max(12,Math.min(e.width,e.height)*a),c=o.map(e=>Math.exp(-(e.d-o[0].d)/(2*s*s))),l=c.reduce((e,t)=>e+t,0);c.forEach((e,t)=>{c[t]=e/l});let u={x:0,y:0};return o.forEach((e,t)=>{u.x+=r.nodes[e.index].x*c[t],u.y+=r.nodes[e.index].y*c[t]}),r.grab={indices:o.map(e=>e.index),weights:c,target:u},r.asleep=!1,{...u}}function we(e,t,n){let r=k(e).grab;r&&Number.isFinite(t)&&Number.isFinite(n)&&Object.assign(r.target,{x:t,y:n})}function Te(e,t=!0){let n=k(e);n.grab&&B(n),n.grab=null,t||(n.velocity.forEach(e=>{e.x=e.y=0}),e.vx=e.vy=n.publicVX=n.publicVY=0)}function Ee(e,t,n){if(![t,n].every(Number.isFinite))return;let r=k(e);(t||n)&&B(r),r.nodes.forEach((e,i)=>{e.x+=t,e.y+=n,r.previous[i].x+=t,r.previous[i].y+=n}),r.grab&&(r.grab.target.x+=t,r.grab.target.y+=n),e.x+=t,e.y+=n,r.dirty=!0,r.boundaryDirtyMask=r.allBoundaryMask,r.previousBoundaryDirty=!0,fe(r)}function De(e,t,n=ft){return e[0]<=t[2]+n&&t[0]<=e[2]+n&&e[1]<=t[3]+n&&t[1]<=e[3]+n}function Oe(e,t,n,r,i){let a=/* @__PURE__ */ new Map;for(let{sample:e,factor:n}of t)e.indices.forEach((t,r)=>a.set(t,(a.get(t)??0)+n*e.weights[r]));ye(e,[...a].map(([t,a])=>({index:t,x:n*i*e.inverseMasses[t]*a,y:r*i*e.inverseMasses[t]*a}))),z(e)}function ke(e,t){let n=/* @__PURE__ */ new Map;for(let{sample:e,factor:r}of t)e.indices.forEach((t,i)=>n.set(t,(n.get(t)??0)+r*e.weights[i]));let r=0;for(let[t,i]of n)r+=e.inverseMasses[t]*i*i;return r}function Ae(e){let{a:t,b:n,c:r,sa:i,sb:a,t:o,nx:s,ny:c}=e,l=1-o;R(i,t),R(a,n),R(a,r);let u=(t.point.x-n.point.x*l-r.point.x*o)*s+(t.point.y-n.point.y*l-r.point.y*o)*c,d=ft+i.boundaryError+a.boundaryError;if(u>=d)return 0;let f=d-u,p=[{sample:t,factor:1}],m=[{sample:n,factor:-l},{sample:r,factor:-o}];if(i===a){let e=[...p,...m],t=ke(i,e);t>G&&Oe(i,e,s,c,f/t)}else{let e=ke(i,p)+ke(a,m);if(e>G){let t=f/e;Oe(i,p,s,c,t),Oe(a,m,s,c,t)}}return f}function je(){return[1/0,1/0,-1/0,-1/0]}function V(e,t,n,r,i){e[0]=t,e[1]=n,e[2]=r,e[3]=i}function Me(e,t){V(e,Math.min(e[0],t[0]),Math.min(e[1],t[1]),Math.max(e[2],t[2]),Math.max(e[3],t[3]))}function Ne(e){if(e.outlineRevision===e.boundaryRevision)return e.outlineBox;let t=e.body.nodes,n=t.length;V(e.outlineBox,1/0,1/0,-1/0,-1/0);for(let r=0;r<e.curves.length;r++){let i=1/0,a=1/0,o=-1/0,s=-1/0,c=e.curveOffsets[r+1];for(let l=e.curveOffsets[r];l<=c;l++){let e=t[l===n?0:l];i=Math.min(i,e.x),a=Math.min(a,e.y),o=Math.max(o,e.x),s=Math.max(s,e.y)}let l=e.outlineCurves[r];V(l,i,a,o,s),Me(e.outlineBox,l)}return e.outlineRevision=e.boundaryRevision,e.outlineBox}function Pe(e,t,n){let r=e.body.nodes,i=r.length,a=!1;for(let o=0;o<e.curves.length;o++){let[,s,,c]=e.outlineCurves[o];if(!(n<s||n>=c))for(let s=e.curveOffsets[o],c=e.curveOffsets[o+1];s<c;s++){let e=r[s],o=r[s+1===i?0:s+1];e.y>n!=o.y>n&&t<e.x+(n-e.y)*(o.x-e.x)/(o.y-e.y)&&(a=!a)}}return a}function Fe(e,t){let n=Ne(t);if(!De(Ne(e),n))return 0;let r=0;for(let i of e.boundary){if(R(e,i),i.point.x<n[0]||i.point.x>n[2]||i.point.y<n[1]||i.point.y>n[3]||!Pe(t,i.point.x,i.point.y))continue;let a=1/0,o=null;for(let n=0;n<t.boundary.length;n++){let r=t.boundary[n],s=t.boundary[n+1===t.boundary.length?0:n+1],c=s.point.x-r.point.x,l=s.point.y-r.point.y,u=c*c+l*l;if(u<G)continue;let d=Math.max(0,Math.min(1,((i.point.x-r.point.x)*c+(i.point.y-r.point.y)*l)/u)),f=(i.point.x-r.point.x-d*c)**2+(i.point.y-r.point.y-d*l)**2;if(f<a){a=f;let n=Math.sqrt(u);o={a:i,b:r,c:s,sa:e,sb:t,t:d,nx:l/n,ny:-c/n}}}o&&(r=Math.max(r,Ae(o)),Ne(t))}return r}function Ie(e,t,n,r,i,a,o,s){let c=i.x-n.x,l=i.y-n.y,u=e.x-n.x,d=e.y-n.y,f=a.point.x-r.point.x-c,p=a.point.y-r.point.y-l,m=t.point.x-r.point.x-u,h=t.point.y-r.point.y-d,g=A(f,p,m,h),_=A(c,l,m,h)+A(f,p,u,d),v=A(c,l,u,d),y,b=0,x=1;if(Math.abs(g)<G){if(!(Math.abs(_)>G))return null;y=-v/_}else{let e=_*_-4*g*v;if(!(e>=0))return null;let t=Math.sqrt(e),n=2*g;if(y=(-_-t)/n,b=(-_+t)/n,b<y){let e=y;y=b,b=e}x=2}for(let e=0;e<x;e++){let n=e===0?y:b;if(n<=G||n>1)continue;let i=_+2*g*n;if(o===s?i*v>=0:i<=0)continue;let x=c+f*n,S=l+p*n,C=Math.hypot(x,S);if(C<G)continue;let w=((u+m*n)*x+(d+h*n)*S)/(C*C);if(w<0||w>1)continue;let T=o===s?Math.sign(v):-1;return{a:t,b:r,c:a,sa:o,sb:s,t:w,nx:-S/C*T,ny:x/C*T}}return null}function Le(e){if(z(e),e.sweepRevision===e.boundaryRevision)return;let t=e.boundary.length;e.sweptVertices.length!==t*4&&(e.sweptVertices=new Float64Array(t*4),e.sweptTree=new Float64Array(t*8));let n=e.sweptVertices,r=e.sweptTree,i=e.body.nodes[0],a=e.oldBoundary[0],o=i.x-a.x,s=i.y-a.y;e.sweepDeforming=!1;for(let r=0;r<t;r++){let t=e.body.nodes[r],i=e.oldBoundary[r],a=r*4;n[a]=Math.min(t.x,i.x),n[a+1]=Math.min(t.y,i.y),n[a+2]=Math.max(t.x,i.x),n[a+3]=Math.max(t.y,i.y),(Math.abs(t.x-i.x-o)>1e-10||Math.abs(t.y-i.y-s)>1e-10)&&(e.sweepDeforming=!0)}V(e.sweepBox,1/0,1/0,-1/0,-1/0);for(let i=0;i<e.curves.length;i++){let a=e.curveOffsets[i],o=e.curveCounts[i],s=2*a;for(let e=0;e<o;e++){let i=4*(a+e),c=a+e+1===t?0:i+4,l=4*(s+o+e);r[l]=Math.min(n[i],n[c]),r[l+1]=Math.min(n[i+1],n[c+1]),r[l+2]=Math.max(n[i+2],n[c+2]),r[l+3]=Math.max(n[i+3],n[c+3])}for(let e=o-1;e>0;e--){let t=4*(s+e),n=4*(s+2*e),i=n+4;r[t]=Math.min(r[n],r[i]),r[t+1]=Math.min(r[n+1],r[i+1]),r[t+2]=Math.max(r[n+2],r[i+2]),r[t+3]=Math.max(r[n+3],r[i+3])}let c=4*(s+1),l=e.sweepCurves[i];V(l,r[c],r[c+1],r[c+2],r[c+3]),Me(e.sweepBox,l)}e.sweepRevision=e.boundaryRevision}function Re(e,t,n){let r=e===t,i=e.boundary.length,a=t.boundary.length,{sweptTree:o,sweepStack:s}=t,c=e.sweptVertices;for(let l=0;l<e.curves.length;l++)for(let u=0;u<t.curves.length;u++){if(r&&l===u||!De(e.sweepCurves[l],t.sweepCurves[u]))continue;let d=t.curveOffsets[u],f=t.curveCounts[u],p=2*d;for(let u=e.curveOffsets[l],m=e.curveOffsets[l+1];u<m;u++){let l=u*4,m=c[l],h=c[l+1],g=c[l+2],_=c[l+3],v=1;for(s[0]=1;v;){let c=s[--v],l=4*(p+c);if(m>o[l+2]||g<o[l]||h>o[l+3]||_<o[l+1])continue;if(c<f){s[v++]=c*2+1,s[v++]=c*2;continue}let y=d+c-f,b=y+1===a?0:y+1;if(r){let e=Math.abs(u-y),t=Math.abs(u-b);if(e<=2||i-e<=2||t<=2||i-t<=2)continue}let x=Ie(e.oldBoundary[u],e.boundary[u],t.oldBoundary[y],t.boundary[y],t.oldBoundary[b],t.boundary[b],e,t);x&&n.push(x)}}}}function ze(e){let t=[],n=e.map(k);for(let e of n)Le(e);for(let e=0;e<n.length;e++)for(let r=e;r<n.length;r++){let i=n[e],a=n[r];i.asleep&&a.asleep||i===a&&!i.sweepDeforming||De(i.sweepBox,a.sweepBox,ft+i.boundaryError+a.boundaryError)&&(Re(i,a,t),i!==a&&Re(a,i,t))}return t}function Be(e,t,n){if(e.wallBudget>1e-7&&t<=1e6&&n<=1e6)return z(e),0;let r=0;for(let i=0;i<e.curves.length;i++){let a=ue(e,i),o=e.nodes[a[0]],s=e.nodes[a[1]],c=e.nodes[a[2]],l=[0,1];for(let e of[`x`,`y`]){let t=2*(o[e]+s[e]-2*c[e]),n=-3*o[e]-s[e]+4*c[e];if(Math.abs(t)>G){let e=-n/(2*t);e>0&&e<1&&l.push(e)}}for(let i of l){let o={indices:a,weights:[(1-i)*(1-2*i),i*(2*i-1),4*i*(1-i)],point:{x:0,y:0}};R(e,o);let s=Math.max(0,Math.min(t,o.point.x))-o.point.x,c=Math.max(0,Math.min(n,o.point.y))-o.point.y;if(s===0&&c===0)continue;let l=ke(e,[{sample:o,factor:1}]),u=Math.hypot(s,c);r=Math.max(r,u),l>G&&u&&Oe(e,[{sample:o,factor:1}],s/u,c/u,u/l)}}return z(e),r}function Ve(e,t,n){if(e.asleep)return!0;let r=e.passPositions;if(n)for(let t=0;t<e.nodes.length;t++)r[2*t]=e.nodes[t].x,r[2*t+1]=e.nodes[t].y;return Se(e,t),z(e),n?e.nodes.every(({x:e,y:t},n)=>{let i=e-r[2*n],a=t-r[2*n+1];return i*i+a*a<=ut**2}):!1}function He(e){for(let t of e.cells)for(let e of t.quadrature)e.shearX=e.shearY=e.pressure=0}function*Ue(e,t,n,r){for(let t of e){let e=k(t);if(e.unchangedStep=e.asleep&&e.sleepRevision===e.boundaryRevision&&e.nodes.every((t,n)=>t.x===e.previous[n].x&&t.y===e.previous[n].y),e.unchangedStep){e.wallBudget=ae(e);continue}e.previousBoundaryDirty=!0,e.boundaryDirtyMask=e.allBoundaryMask,e.nodes.forEach((t,n)=>Object.assign(e.previous[n],t));for(let t of e.cells)j(e.nodes,t.indices,t.geometry),M(t.geometry,t.jac),t.dirty=!1;if(e.geometryDirtyMask=0,e.wallBudget=ae(e),He(e),e.asleep){L(e),z(e),e.sleepRevision=e.boundaryRevision;continue}let n=t.physics,i=1-Math.exp(-n.viscosity*r);for(let[t,n]of e.edges){let r=e.nodes[t],a=e.nodes[n],o=e.velocity[t],s=e.velocity[n],c=a.x-r.x,l=a.y-r.y,u=Math.hypot(c,l);if(u<G)continue;let d=c/u,f=l/u,p=e.inverseMasses[t],m=e.inverseMasses[n],h=((s.x-o.x)*d+(s.y-o.y)*f)*i/(p+m);o.x+=p*d*h,o.y+=p*f*h,s.x-=m*d*h,s.y-=m*f*h}if(e.grab){let t=e.grab,i=0,a=0,o=0,s=0,c=0;t.indices.forEach((n,r)=>{let l=t.weights[r];i+=e.nodes[n].x*l,a+=e.nodes[n].y*l,o+=e.velocity[n].x*l,s+=e.velocity[n].y*l,c+=e.inverseMasses[n]*l*l});let l=((t.target.x-i)*n.gripStiffness-o*n.gripDamping)/c,u=((t.target.y-a)*n.gripStiffness-s*n.gripDamping)/c;t.indices.forEach((n,i)=>{let a=r*e.inverseMasses[n]*t.weights[i];e.velocity[n].x+=l*a,e.velocity[n].y+=u*a})}let a=Math.exp(-n.ambientDrag*r),o=e.nodes.map((t,i)=>{let o=e.velocity[i];o.x*=a,o.y*=a;let s=Math.min(1,n.particleSpeed/Math.max(G,Math.hypot(o.x,o.y)));return{index:i,x:o.x*r*s,y:o.y*r*s}}),s=le(e,o);if(ve(e,o,e.cells),s&&e.cells.every(e=>re(e,1))){for(let t of o)e.nodes[t.index].x+=t.x,e.nodes[t.index].y+=t.y;de(e,o);for(let t of e.cells)for(let e=0;e<10;e++)t.geometry[e]+=t.delta[e];for(let t of e.cells)for(let e=0;e<6;e++)t.jac[e]+=t.linearJac[e]+t.quadraticJac[e];e.dirty=!0,L(e)}else{L(e);for(let t of o)ye(e,[t],e.incident[t.index])}z(e)}let i=r===U,a=i?ct:12,o=0;for(let s=0;s<a;s++){let a=yield{bodies:e,dt:r,adaptive:i},s=0;for(let t of ze(e))s=Math.max(s,Ae(t));for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let r=k(e[t]),i=k(e[n]);s=Math.max(s,Fe(r,i),Fe(i,r))}for(let r of e){let e=k(r);s=Math.max(s,Be(e,t,n)),!e.asleep&&e.wallBudget<=dt&&(a=!1)}if(o=a&&s<=dt?o+1:0,o>=lt)break}for(let t of ze(e))Ae(t);for(let r of e)Be(k(r),t,n);for(let t of e){let e=k(t);if(e.asleep&&e.unchangedStep)continue;let{particleSpeed:n}=t.physics,i=0,a=0,o=0;e.nodes.forEach((t,s)=>{let c=e.velocity[s],l=e.previous[s],u=1/e.inverseMasses[s];c.x=(t.x-l.x)/r,c.y=(t.y-l.y)/r;let d=Math.min(1,n/Math.max(G,Math.hypot(c.x,c.y)));c.x*=d,c.y*=d,i+=c.x*u,a+=c.y*u,o+=u}),t.vx=e.publicVX=i/o,t.vy=e.publicVY=a/o,pe(e),e.dirty=!0,z(e)}}function H(e,t,n){let r=k(e[0]).world;if(r&&r.width===t&&r.height===n&&r.bodies.length===e.length&&e.every((e,t)=>e===r.bodies[t]&&k(e).world===r))return r;let i={bodies:[...e],width:t,height:n,quietTime:0,parked:!1};for(let t of e)k(t).world=i;return i}function We(e){let t=!0;for(let n of e.bodies){let r=k(n),i={x:0,y:0};for(let n of[`x`,`y`]){let a=n===`x`?e.width:e.height,o=1/0,s=-1/0;for(let[e,t,i]of r.curves){let a=r.nodes[e][n],c=r.nodes[t][n],l=r.nodes[i][n],u=2*(a+c-2*l),d=-3*a-c+4*l,f=Math.abs(u)>G?-d/(2*u):-1,p=f>0&&f<1?a+f*(d+f*u):a;o=Math.min(o,a,c,p),s=Math.max(s,a,c,p)}o>=-1e-7&&s<=a+1e-7||(t=!1,s-o<=a+1e-7&&(i[n]=o<0?-o:a-s))}(i.x||i.y)&&Ee(n,i.x,i.y)}return t}function Ge(e,t){let n=!0;for(let t of e.bodies){let r=k(t);if(r.grab||r.velocity.some(e=>!(e.x*e.x+e.y*e.y<=ot*ot)))return e.quietTime=0,!1;r.asleep||(n=!1)}let r=e.quietTime===0;if(e.quietTime+=t,(r||n||e.quietTime>=st)&&!We(e))return e.quietTime=0,!1;if(!n&&e.quietTime<st)return!1;for(let t of e.bodies){let e=k(t);for(let t=0;t<e.nodes.length;t++)Object.assign(e.previous[t],e.nodes[t]),e.velocity[t].x=e.velocity[t].y=0;t.vx=e.publicVX=t.vy=e.publicVY=e.clock=0,He(e)}return e.parked=!0,!0}function*Ke(e,t,n,r,i){if(!e.length||![t,n,r].every(Number.isFinite)||t<=0||n<=0)return!1;let a=H(e,t,n),o=a.parked;for(let t of e){let e=k(t),n=t.vx-e.publicVX,r=t.vy-e.publicVY;o&&e.nodes.some((t,n)=>t.x!==e.previous[n].x||t.y!==e.previous[n].y)&&(B(e),e.asleep=!1),(n||r)&&(B(e),e.velocity.forEach(e=>{e.x+=n,e.y+=r}),e.asleep=!1),e.publicVX=t.vx,e.publicVY=t.vy}if(a.parked)return!1;if(r<=0)return!0;let s=k(e[0]);s.clock+=Math.min(r,4*U);let c=Math.min(4,Math.floor((s.clock+G)/U));s.clock=Math.max(0,s.clock-c*U);let l=1+Math.max(...e.map(e=>e.meshLevel)),u=Math.min(...e.map(e=>Math.min(e.width,e.height))),d=Math.max(...e.map(e=>e.physics.particleSpeed)),f=Math.min(16*l,Math.max(1,Math.ceil(d*U/(Math.max(.5,u*.2)/l)))),p=U/f;for(let r=0;r<c;r++)for(let r=0;r<f;r++)if(yield*Ue(e,t,n,p),Ge(a,p))return!1;return!0}function qe(e,t,n){if(!e.length||![t,n].every(Number.isFinite)||t<=0||n<=0)return;let r=H(e,t,n);r.parked=!1,r.quietTime=0;for(let r of e)pe(k(r)),r.x=Math.max(0,Math.min(t-r.width,r.x)),r.y=Math.max(0,Math.min(n-r.height,r.y));for(let r=0;r<60;r++){let r=!1;for(let i=0;i<e.length;i++)for(let a=i+1;a<e.length;a++){let o=e[i],s=e[a],c=Math.min(o.x+o.width,s.x+s.width)-Math.max(o.x,s.x),l=Math.min(o.y+o.height,s.y+s.height)-Math.max(o.y,s.y);if(c<=.01||l<=.01)continue;let u=c<l?`x`:`y`,d=u===`x`?`width`:`height`,f=u===`x`?t:n,p=o[u]+o[d]/2<s[u]+s[d]/2?1:-1,m=Math.min(c,l)+.05,h=Math.max(0,p>0?o[u]:f-o[u]-o[d]),g=Math.max(0,p>0?f-s[u]-s[d]:s[u]),_=Math.min(m/2,h),v=Math.min(m-_,g);_=Math.min(m-v,h),v=Math.min(m-_,g),o[u]-=p*_,s[u]+=p*v,r||=_+v>G}if(!r)break}for(let t of e){let e=k(t);e.grab=null,e.clock=0,e.asleep=!0,He(e),e.nodes.forEach((n,r)=>{n.x=t.x+e.rest[r].x,n.y=t.y+e.rest[r].y,Object.assign(e.previous[r],n),e.velocity[r].x=e.velocity[r].y=0});for(let t of e.cells)j(e.nodes,t.indices,t.geometry);t.vx=t.vy=e.publicVX=e.publicVY=0,e.dirty=!0,e.boundaryDirtyMask=e.allBoundaryMask,e.previousBoundaryDirty=!0,fe(e)}}function Je(e,t,n){let r=`${t}:${n}`,o=e.referenceCache.get(r);if(o)return o;let s={cell:e.cells[0],r:1/3,t:1/3},c=1/0;for(let r of e.cells){let o=1/3,l=1/3;for(let s=0;s<8;s++){let s=a(e.rest,r.indices,o,l),{dr:c,ds:u}=i(o,l),d=0,f=0,p=0,m=0;for(let t=0;t<6;t++){let n=e.rest[r.indices[t]];d+=n.x*c[t],f+=n.x*u[t],p+=n.y*c[t],m+=n.y*u[t]}let h=d*m-f*p;if(Math.abs(h)<G)break;let g=t-s.x,_=n-s.y;if(o+=(m*g-f*_)/h,l+=(-p*g+d*_)/h,Math.hypot(g,_)<1e-6)break}let u=Math.max(0,-o,-l,o+l-1),d=a(e.rest,r.indices,o,l),f=Math.hypot(d.x-t,d.y-n)+u*Math.max(e.body.width,e.body.height);if(f<c&&(c=f,s={cell:r,r:o,t:l}),u<1e-7&&f<1e-5)break}return e.referenceCache.size<64&&e.referenceCache.set(r,s),s}function Ye(e,t,n,r,o=0){if(!Number.isInteger(o)||o<0||o+6>r.length)throw RangeError(`Invalid point matrix output`);let s=k(e),{cell:c,r:l,t:u}=Je(s,t,n),{dr:d,ds:f}=i(l,u),p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0;for(let e=0;e<6;e++){let t=s.rest[c.indices[e]],n=s.nodes[c.indices[e]];p+=t.x*d[e],m+=t.x*f[e],h+=t.y*d[e],g+=t.y*f[e],_+=n.x*d[e],v+=n.x*f[e],y+=n.y*d[e],b+=n.y*f[e]}let x=p*g-m*h,S=(_*g-v*h)/x,C=(y*g-b*h)/x,w=(-_*m+v*p)/x,T=(-y*m+b*p)/x,E=a(s.nodes,c.indices,l,u);r[o]=S,r[o+1]=C,r[o+2]=w,r[o+3]=T,r[o+4]=E.x-e.x-S*t-w*n,r[o+5]=E.y-e.y-C*t-T*n}function Xe(e){let t=k(e),n=0,r=0,i=0,a=0;t.rest.forEach((e,o)=>{n+=e.x/t.rest.length,r+=e.y/t.rest.length,i+=t.nodes[o].x/t.rest.length,a+=t.nodes[o].y/t.rest.length});let o=0,s=0,c=0,l=0,u=0,d=0,f=0;t.rest.forEach((e,p)=>{let m=e.x-n,h=e.y-r,g=t.nodes[p];o+=m*m,s+=m*h,c+=h*h,l+=(g.x-i)*m,u+=(g.x-i)*h,d+=(g.y-a)*m,f+=(g.y-a)*h});let p=o*c-s*s,m=(l*c-u*s)/p,h=(d*c-f*s)/p,g=(u*o-l*s)/p,_=(f*o-d*s)/p;return[m,h,g,_,i-e.x-m*n-g*r,a-e.y-h*n-_*r]}function Ze(e){let t=e.adaptive;for(let n of e.bodies)Ve(k(n),e.dt,t)||(t=!1);return t}function Qe(e,t,n){let r=2*(e+t-2*n),i=-3*e-t+4*n,a=Math.abs(r)>G?-i/(2*r):-1,o=a>0&&a<1?e+i*a+r*a*a:e;return[Math.min(e,t,o),Math.max(e,t,o)]}function $e(e){let t=e.map(k);if(new Set(t).size!==t.length)throw Error(`Duplicate card in WASM material batch`);let n=1+t.reduce((e,t)=>e+5+t.nodes.length+t.curves.length*3+t.cells.length*(7+mt.length*14),0),r=t.reduce((e,t)=>e+gt+t.nodes.length*_t+t.cells.length*vt,0),i=t.map(e=>({nodes:e.nodes.map(()=>({x:0,y:0})),geometryMask:e.cells.reduce((e,t)=>e|t.geometryBit,0)})),a=/* @__PURE__ */ new Float64Array(6),o=/* @__PURE__ */ new Float64Array(10),s=e=>e===0||e===1,c=(e,t)=>Number.isInteger(e)&&e>=0&&e<=t&&(e&t)===e;return{topologyWords:n,stateWords:r,packTopology(e){let n=0;e[n++]=t.length;for(let r of t){e[n++]=r.nodes.length,e[n++]=r.cells.length,e[n++]=r.curves.length,e[n++]=r.body.physics.shearModulus,e[n++]=r.body.physics.bulkModulus,e.set(r.inverseMasses,n),n+=r.nodes.length;for(let t of r.curves)e.set(t,n),n+=t.length;for(let t of r.cells){e.set(t.indices,n),n+=t.indices.length,e[n++]=t.floor;for(let r of t.quadrature)e.set(r.gx,n),n+=r.gx.length,e.set(r.gy,n),n+=r.gy.length,e[n++]=r.weight,e[n++]=r.shearDenominator}}},packState(e){let n=0;for(let r of t){e[n++]=+r.asleep,e[n++]=r.world?.width??0,e[n++]=r.world?.height??0,e[n++]=r.wallBudget,e[n++]=r.geometryDirtyMask,e[n++]=r.boundaryDirtyMask,e[n++]=+r.dirty;for(let t=0;t<r.nodes.length;t++){let i=r.nodes[t];e[n++]=i.x,e[n++]=i.y,e[n++]=r.clearance[t]}for(let t of r.cells){e[n++]=+t.dirty,e[n++]=t.radius,e.set(t.geometry,n),n+=10,e.set(t.jac,n),n+=6,e.set(t.certificate,n),n+=12;for(let r of t.quadrature)e[n++]=r.shearX,e[n++]=r.shearY,e[n++]=r.pressure}}},validate(e,n,l){if(e.length!==r||l&&!n)return!1;let u=0,d=n;for(let n=0;n<t.length;n++){let r=t[n],l=i[n];if(e[u++]!==+r.asleep||e[u++]!==(r.world?.width??0)||e[u++]!==(r.world?.height??0))return!1;let f=e[u++],p=e[u++],m=e[u++],h=e[u++];if(!(f>=0&&(Number.isFinite(f)||f===1/0&&!r.world))||!c(p,l.geometryMask)||!c(m,r.allBoundaryMask)||!s(h)||h<+r.dirty||(m&r.boundaryDirtyMask)!==r.boundaryDirtyMask)return!1;for(let t=0;t<r.nodes.length;t++){let n=l.nodes[t],i=r.nodes[t];n.x=e[u++],n.y=e[u++];let a=e[u++];if(!Number.isFinite(n.x)||!Number.isFinite(n.y)||!Number.isFinite(a)||a<0)return!1;if(r.asleep)continue;let o=n.x-i.x,s=n.y-i.y;if((o||s)&&((m&r.curveMasks[t])!==r.curveMasks[t]||!h))return!1;d&&o*o+s*s>ut**2&&(d=!1)}for(let t of r.cells){let n=e[u++],i=e[u++];if(!s(n)||!Number.isFinite(i)||i<0)return!1;let c=u+vt-2;for(;u<c;)if(!Number.isFinite(e[u++]))return!1;if(!r.asleep&&(j(l.nodes,t.indices,o),M(o,a),!P(a,t.floor)))return!1}if(!r.asleep&&r.world)for(let[e,t,n]of r.curves){let i=l.nodes[e],a=l.nodes[t],o=l.nodes[n];for(let s of[`x`,`y`]){let c=i[s],l=a[s],u=o[s],d=s===`x`?r.world.width:r.world.height;if(se(c,l,u,d))continue;let[f,p]=Qe(c,l,u);if(f>=-1e-7&&p<=d+1e-7)continue;let[m,h]=Qe(r.nodes[e][s],r.nodes[t][s],r.nodes[n][s]);if(!(f>=Math.min(0,m)-1e-7&&p<=Math.max(d,h)+1e-7))return!1}}}return l===d},commit(e){let n=0;for(let r of t)if(r.asleep)n+=gt+r.nodes.length*_t+r.cells.length*vt;else{n+=3,r.wallBudget=e[n++],r.geometryDirtyMask=e[n++],r.boundaryDirtyMask=e[n++],r.dirty=!!e[n++];for(let t=0;t<r.nodes.length;t++){let i=r.nodes[t];i.x=e[n++],i.y=e[n++],r.clearance[t]=e[n++]}for(let t of r.cells){t.dirty=!!e[n++],t.radius=e[n++];for(let r=0;r<10;r++)t.geometry[r]=e[n++];for(let r=0;r<6;r++)t.jac[r]=e[n++];for(let r=0;r<12;r++)t.certificate[r]=e[n++];for(let r of t.quadrature)r.shearX=e[n++],r.shearY=e[n++],r.pressure=e[n++]}z(r)}}}}function et(e,t,n,r){let i=e.map(k),a=e.length?H(e,t,n):null,o=$e(e),s=i.reduce((e,t)=>e+12+t.nodes.length*2+t.edges.length*2,0),c=o.topologyWords+s,l=e=>7+7*e.nodes.length+51*e.cells.length+44+514*e.curves.length,u=8+i.reduce((e,t)=>e+l(t),0),d=4+c+u,f=i.map(e=>e.nodes.map(()=>({x:0,y:0}))),p=i.map(e=>new Float64Array(e.nodes.length*2).fill(NaN)),m=i.map(e=>new Uint8Array(e.nodes.length)),h=/* @__PURE__ */ new Float64Array(10),g=/* @__PURE__ */ new Float64Array(6),_=e=>e===0||e===1,v=(e,t,n)=>Number.isSafeInteger(e)&&e>=t&&e<=n,y=(e,t)=>v(e,0,t)&&(e&t)===e;function b(e){if(e.length<u)throw Error(`Checkpoint buffer too short`);e.set([2,i.length,t,n,a?.quietTime??0,+(a?.parked??!1),+!(a?.parked??!1),u]);let o=8;for(let a=0;a<i.length;a++){let s=i[a];z(s),e.set([+s.asleep,t,n,s.wallBudget,s.geometryDirtyMask,s.boundaryDirtyMask,+s.dirty],o),o+=7;for(let t=0;t<s.nodes.length;t++)e[o++]=s.nodes[t].x,e[o++]=s.nodes[t].y,e[o++]=s.clearance[t];for(let t of s.cells){e[o++]=+t.dirty,e[o++]=t.radius,e.set(t.geometry,o),o+=10,e.set(t.jac,o),o+=6,e.set(t.certificate,o),o+=12;for(let n of t.quadrature)e[o++]=n.shearX,e[o++]=n.shearY,e[o++]=n.pressure}let c=s.grab,l=r.get(a);e.set([s.body.x,s.body.y,s.body.vx,s.body.vy,s.publicVX,s.publicVY,s.clock,+s.previousBoundaryDirty,s.boundaryRevision,s.sleepRevision,+s.unchangedStep,s.boundaryError,s.materialDt,c?.indices.length??0,c?.target.x??0,c?.target.y??0,+!!l,l?.x??0,l?.y??0,s.boundary.length],o),o+=20;for(let t=0;t<12;t++)e[o++]=c?.indices[t]??0,e[o++]=c?.weights[t]??0;for(let t=0;t<s.nodes.length;t++)e[o++]=s.velocity[t].x,e[o++]=s.velocity[t].y,e[o++]=s.previous[t].x,e[o++]=s.previous[t].y;for(let t=0;t<s.curves.length;t++)e[o++]=s.curveCounts[t],e[o++]=s.curveErrors[t];for(let t=0;t<s.boundary.length;t++)e[o++]=s.boundary[t].point.x,e[o++]=s.boundary[t].point.y,e[o++]=s.oldBoundary[t].x,e[o++]=s.oldBoundary[t].y;o+=(s.curves.length*128-s.boundary.length)*4}if(o!==u)throw Error(`Checkpoint layout mismatch`)}return{initWords:d,checkpointWords:u,packCheckpoint:b,packInit(e){e.set([2,i.length,c,u]),o.packTopology(e.subarray(4));let t=4+o.topologyWords;for(let n of i){let r=n.body.physics;e.set([n.body.width,n.body.height,n.body.meshLevel,r.viscosity,r.ambientDrag,r.gripStiffness,r.gripDamping,r.mass,r.particleSpeed,r.gripNodes,r.gripRadius,n.edges.length],t),t+=12;for(let r of n.rest)e[t++]=r.x,e[t++]=r.y;for(let[r,i]of n.edges)e[t++]=r,e[t++]=i}b(e.subarray(t,t+u))},validate(e){if(e.length!==u||e[0]!==2||e[1]!==i.length||e[2]!==t||e[3]!==n||!Number.isFinite(e[4])||e[4]<0||!_(e[5])||!_(e[6])||e[5]===1&&e[6]!==0||e[7]!==u)return!1;let r=8;for(let a=0;a<i.length;a++){let o=i[a],s=f[a],c=p[a],l=m[a],u=o.cells.reduce((e,t)=>e|t.geometryBit,0);if(!_(e[r++])||e[r++]!==t||e[r++]!==n||!(e[r++]>=0)||!y(e[r++],u)||!y(e[r++],o.allBoundaryMask)||!_(e[r++]))return!1;for(let t=0;t<s.length;t++){let n=s[t];n.x=e[r++],n.y=e[r++];let i=e[r++];if(!Number.isFinite(n.x)||!Number.isFinite(n.y)||!Number.isFinite(i)||i<0)return!1;l[t]=+(n.x!==c[t*2]||n.y!==c[t*2+1])}for(let t of o.cells){if(!_(e[r++]))return!1;let n=e[r++];if(!Number.isFinite(n)||n<0)return!1;let i=r+49;for(;r<i;)if(!Number.isFinite(e[r++]))return!1;if(t.indices.some(e=>l[e])&&(j(s,t.indices,h),M(h,g),!P(g,t.floor)))return!1}let d=r;for(let t=0;t<20;t++)if(!Number.isFinite(e[r++]))return!1;let b=e[d+13],x=e[d+19];if(!_(e[d+7])||!_(e[d+10])||!_(e[d+16])||!v(e[d+8],0,2**53-1)||!v(e[d+9],-1,2**53-1)||e[d+6]<0||e[d+11]<0||e[d+12]<0||!v(b,0,12)||!v(x,4*o.curves.length,128*o.curves.length))return!1;let S=0,C=/* @__PURE__ */ new Set;for(let t=0;t<12;t++){let n=e[r++],i=e[r++];if(!(t>=b)){if(!v(n,0,s.length-1)||C.has(n)||!Number.isFinite(i)||i<0)return!1;C.add(n),S+=i}}if(b&&Math.abs(S-1)>1e-10)return!1;for(let t=0;t<s.length*4;t++)if(!Number.isFinite(e[r++]))return!1;let w=0;for(let t=0;t<o.curves.length;t++){let t=e[r++],n=e[r++];if(![4,8,16,32,64,128].includes(t)||!Number.isFinite(n)||n<0)return!1;w+=t}if(w!==x)return!1;for(let t=0;t<w*4;t++)if(!Number.isFinite(e[r++]))return!1;r+=(o.curves.length*128-w)*4;for(let[e,r,i]of o.curves)for(let a of[`x`,`y`]){if(!l[e]&&!l[r]&&!l[i])continue;let c=a===`x`?t:n,[u,d]=Qe(s[e][a],s[r][a],s[i][a]);if(u>=-1e-7&&d<=c+1e-7)continue;let[f,p]=Qe(o.nodes[e][a],o.nodes[r][a],o.nodes[i][a]);if(u<Math.min(0,f)-1e-7||d>Math.max(c,p)+1e-7)return!1}}return r===u},commit(e){a&&(a.quietTime=e[4],a.parked=!!e[5]);let t=8;r.clear();for(let n=0;n<i.length;n++){let a=i[n],o=p[n],s=!1;a.asleep=!!e[t++],t+=2,a.wallBudget=e[t++],a.geometryDirtyMask=e[t++],a.boundaryDirtyMask=e[t++],t++;for(let n=0;n<a.nodes.length;n++){let r=e[t++],i=e[t++];s||=r!==a.nodes[n].x||i!==a.nodes[n].y,a.nodes[n].x=r,a.nodes[n].y=i,a.clearance[n]=e[t++],o[n*2]=r,o[n*2+1]=i}for(let n of a.cells){n.dirty=!!e[t++],n.radius=e[t++];for(let r=0;r<10;r++)n.geometry[r]=e[t++];for(let r=0;r<6;r++)n.jac[r]=e[t++];for(let r=0;r<12;r++)n.certificate[r]=e[t++];for(let r of n.quadrature)r.shearX=e[t++],r.shearY=e[t++],r.pressure=e[t++]}a.body.x=e[t++],a.body.y=e[t++],a.body.vx=e[t++],a.body.vy=e[t++],a.publicVX=e[t++],a.publicVY=e[t++],a.clock=e[t++],a.previousBoundaryDirty=!!e[t++],a.boundaryRevision=e[t++],a.sleepRevision=e[t++],a.unchangedStep=!!e[t++],a.boundaryError=e[t++];let c=e[t++];c>0?xe(a,c):a.materialDt=0;let l=e[t++],u=e[t++],d=e[t++],f=!!e[t++],m=e[t++],h=e[t++],g=e[t++];f&&r.set(n,{x:m,y:h});let _=l?{indices:[],weights:[],target:{x:u,y:d}}:null;for(let n=0;n<12;n++){let r=e[t++],i=e[t++];n<l&&(_.indices.push(r),_.weights.push(i))}a.grab=_;for(let n=0;n<a.nodes.length;n++)a.velocity[n].x=e[t++],a.velocity[n].y=e[t++],a.previous[n].x=e[t++],a.previous[n].y=e[t++];let v=!1;for(let n=0;n<a.curves.length;n++){let r=e[t++];v||=r!==a.curveCounts[n],a.curveCounts[n]=r,a.curveErrors[n]=e[t++]}if(v){a.boundary=[],a.body.nodes.length=0,a.oldBoundary=[],a.curveOffsets[0]=0;for(let e=0;e<a.curves.length;e++){let t=a.curveCounts[e];for(let n=0;n<t;n++){let r=n/t,i={x:0,y:0};a.boundary.push({indices:ue(a,e),weights:[(1-r)*(1-2*r),r*(2*r-1),4*r*(1-r)],point:i}),a.body.nodes.push(i),a.oldBoundary.push({x:0,y:0})}a.curveOffsets[e+1]=a.curveOffsets[e]+t}let e=me(a.rest,a.material.elements,a.curveCounts,a.curves);a.render=e.render,a.mesh={...a.mesh,nodes:e.render.map(e=>e.point),rest:e.rest,triangles:e.triangles,boundary:a.body.nodes}}for(let n=0;n<g;n++){let r=e[t++],i=e[t++];s||=r!==a.boundary[n].point.x||i!==a.boundary[n].point.y,a.boundary[n].point.x=r,a.boundary[n].point.y=i,a.oldBoundary[n].x=e[t++],a.oldBoundary[n].y=e[t++]}t+=(a.curves.length*128-g)*4,a.outlineRevision=a.sweepRevision=-1,a.dirty||=s||v}}}}function tt(e,t,n,r,i){let a=Ke(e,t,n,r,i),o=a.next();for(;!o.done;)o=a.next(Ze(o.value));return o.value}function nt(e){let t=Object.keys(D);if(e.some(e=>t.some(t=>e.physics[t]!==D[t])))throw Error(`Unsupported GPU physics profile`)}function rt(e,t,n,r){if(!e.length||![t,n,r].every(Number.isFinite)||t<=0||n<=0||r<0)throw RangeError(`Invalid GPU physics world`);nt(e);let i=H(e,t,n),a=k(e[0]),o=e.length,s=Math.min(...e.map(e=>Math.min(e.width,e.height))),c=Math.min(16,Math.max(1,Math.ceil(D.particleSpeed*U/Math.max(.5,s*.2)))),l=U/c,u=yt.get(i);if(!u||u.dt!==l){u={quads:new Float32Array(o*16*7*16),cells:new Uint32Array(o*16*8),curves:new Uint32Array(o*8*4),edges:new Uint32Array(o*56*2),dt:l};let t=new Float32Array(u.cells.buffer);e.forEach((e,n)=>{let r=k(e);if(r.nodes.length!==41||r.cells.length!==16||r.curves.length!==8||r.edges.length!==56)throw Error(`Unsupported full GPU topology`);xe(r,l),r.cells.forEach((e,r)=>{let i=(n*16+r)*8;u.cells.set(e.indices,i),t[i+6]=e.floor,e.quadrature.forEach((e,t)=>{let i=(n*112+r*7+t)*16;u.quads.set(e.gx,i),u.quads.set(e.gy,i+6),u.quads.set([e.shearCompliance,e.shearDivisor,e.bulkCompliance,0],i+12)})}),r.curves.forEach((e,t)=>u.curves.set(e,(n*8+t)*4)),r.edges.forEach((e,t)=>u.edges.set(e,(n*56+t)*2))}),yt.set(i,u)}let d=new Float32Array(o*41*8),f=new Float32Array(o*12),p=new Uint32Array(f.buffer),m=!i.parked;e.forEach((e,t)=>{let n=k(e),r=e.vx-n.publicVX,i=e.vy-n.publicVY;(r||i||n.grab||n.nodes.some((e,t)=>e.x!==n.previous[t].x||e.y!==n.previous[t].y))&&(m=!0),n.nodes.forEach((e,a)=>{let o=n.velocity[a],s=n.previous[a];d.set([e.x,e.y,s.x,s.y,o.x+r,o.y+i,n.inverseMasses[a],0],(t*41+a)*8)}),n.grab&&(p.set(n.grab.indices,t*12),f.set(n.grab.weights,t*12+4),f.set([n.grab.target.x,n.grab.target.y],t*12+8),p[t*12+10]=1)});let h=a.clock+(m?Math.min(r,4*U):0),g=m?Math.min(4,Math.floor((h+G)/U)):0;return{...u,nodes:d,grips:f,count:o,steps:g*c,dt:l,width:t,height:n,bodies:e,clock:Math.max(0,h-g*U),active:m}}function it(e,t,n){if(t.length!==e.nodes.length||n.length!==e.count*4||!t.every(Number.isFinite))throw Error(`Invalid full GPU physics output`);for(let r=0;r<e.count;r++){if(n[r*4]!==0)throw Error(`GPU physics rejected: flags=`+n[r*4]);if(n[r*4+2]!==e.steps)throw Error(`Incomplete GPU physics request`);let i=k(e.bodies[r]),a=i.nodes.map((e,n)=>({x:t[(r*41+n)*8],y:t[(r*41+n)*8+1]})),o=/* @__PURE__ */ new Float64Array(10),s=/* @__PURE__ */ new Float64Array(6);for(let e of i.cells)if(j(a,e.indices,o),M(o,s),!P(s,e.floor))throw Error(`GPU physics invalid curved element`);for(let[t,n,r]of i.curves)for(let i of[`x`,`y`]){let o=a[t][i],s=a[n][i],c=a[r][i],l=2*(o+s-2*c),u=-3*o-s+4*c,d=Math.abs(l)>G?-u/(2*l):-1,f=d>0&&d<1?o+d*(u+d*l):o,p=i===`x`?e.width:e.height;if(Math.min(o,s,f)<-.002||Math.max(o,s,f)>p+.002)throw Error(`GPU physics outside curved wall`)}for(let n=0;n<41;n++){let a=(r*41+n)*8;if(Math.hypot(t[a+4],t[a+5])>D.particleSpeed+.02||Math.abs(t[a+6]-i.inverseMasses[n])>1e-5)throw Error(`Invalid GPU physics state`);if(e.steps){let n=(t[a]-t[a+2])/e.dt,r=(t[a+1]-t[a+3])/e.dt,i=Math.min(1,D.particleSpeed/Math.max(G,Math.hypot(n,r)));if(Math.hypot(t[a+4]-n*i,t[a+5]-r*i)>.02)throw Error(`GPU physics momentum does not match its trajectory`)}}}if(!e.steps)return k(e.bodies[0]).clock=e.clock,e.active;let r=H(e.bodies,e.width,e.height);r.parked=!1;for(let n=0;n<e.count;n++){let r=k(e.bodies[n]),i=0,a=0,o=0;r.nodes.forEach((e,s)=>{let c=(n*41+s)*8;e.x=t[c],e.y=t[c+1],Object.assign(r.previous[s],{x:t[c+2],y:t[c+3]});let l=r.velocity[s];l.x=t[c+4],l.y=t[c+5];let u=1/r.inverseMasses[s];i+=l.x*u,a+=l.y*u,o+=u}),r.body.vx=r.publicVX=i/o,r.body.vy=r.publicVY=a/o,r.asleep=!1,r.geometryDirtyMask=0,r.cells.forEach(e=>{e.dirty=!0}),He(r),L(r),r.wallBudget=ae(r),r.boundaryDirtyMask=r.allBoundaryMask,r.previousBoundaryDirty=!0,r.dirty=!0,pe(r),z(r)}return k(e.bodies[0]).clock=e.clock,!Ge(r,e.steps*e.dt)}var at,U,ot,st,W,ct,lt,ut,dt,G,ft,pt,mt,ht,gt,_t,vt,yt,bt=t((()=>{s(),l(),E(),te(),at=/* @__PURE__ */ new WeakMap,U=1/120,ot=.08,st=.65,W=2,ct=6,lt=2,ut=.08,dt=.24,G=1e-9,ft=.12,pt=.06,mt=[[1/3,1/3,.225],[.470142064105115,.470142064105115,.132394152788506],[.05971587178977,.470142064105115,.132394152788506],[.470142064105115,.05971587178977,.132394152788506],[.101286507323456,.101286507323456,.125939180544827],[.797426985353087,.101286507323456,.125939180544827],[.101286507323456,.797426985353087,.125939180544827]],ht=[[0,0],[1,0],[0,1],[.5,0],[.5,.5],[0,.5]],gt=7,_t=3,vt=30+mt.length*3,yt=/* @__PURE__ */ new WeakMap}));bt();function xt(e){return e.type===`init`||e.actions.some(e=>e.type===`settle`)}var St=/* @__PURE__ */ n({createWasmPhysics:()=>Tt});function Ct(){return`/portfolio_yildirim_cagri/wasm/card-material.wasm`}async function wt(e){let t=await fetch(Ct(),{signal:e});if(!t.ok)throw Error(`WASM physics request failed (HTTP ${t.status})`);let{instance:n}=await WebAssembly.instantiate(await t.arrayBuffer(),{}),r=n.exports;if(!(r.memory instanceof WebAssembly.Memory)||typeof r.abi_version!=`function`||r.abi_version()!==2||[`world_reserve`,`world_buffer`,`world_capacity`,`world_init`,`world_request`,`world_drop`].some(e=>typeof r[e]!=`function`))throw Error(`Incompatible WASM physics ABI`);return r}async function Tt(){let e=new AbortController,t,n;try{n=await Promise.race([wt(e.signal),new Promise((n,r)=>{t=setTimeout(()=>{r(Error(`WASM physics load timed out`)),e.abort()},5e3)})])}finally{clearTimeout(t)}let r={calls:0,kernelMs:0,packMs:0,validationMs:0,bytes:0},i;function a(e,t){let n=e.world_buffer();if(!Number.isSafeInteger(n)||n<=0||n%8||e.world_capacity()<t)throw Error(`Invalid WASM physics buffer`);return new Float64Array(e.memory.buffer,n,t)}return{metrics:r,solve(e,t,o){let s=n;if(!s)throw Error(`WASM physics solver is disposed`);if(!Number.isFinite(t)||t<0)throw Error(`Invalid WASM physics timestep`);let c=6+o.length*6,l=performance.now();try{if(!i||i.width!==e.width||i.height!==e.height||i.offsets!==e.offsets||i.bodies.length!==e.bodies.length||i.bodies.some((t,n)=>t!==e.bodies[n])){let t=et(e.bodies,e.width,e.height,e.offsets);if(s.world_reserve(Math.max(t.initWords,t.checkpointWords,c)),t.packInit(a(s,t.initWords)),r.bytes+=t.initWords*8,s.world_init(t.initWords)!==0)throw Error(`Invalid WASM physics initialization`);i={bodies:e.bodies.slice(),width:e.width,height:e.height,offsets:e.offsets,bridge:t}}s.world_reserve(Math.max(i.bridge.checkpointWords,c));let n=a(s,c);n.set([2,e.width,e.height,t,0,o.length]);let l=6;for(let e of o)e.type===`settle`?n.set([4,0,0,0,0,0],l):e.type===`release`?n.set([3,e.index,0,0,+e.throwCard,0],l):n.set([e.type===`grab`?1:2,e.index,e.x,e.y,0,0],l),l+=6;r.bytes+=c*8}finally{r.packMs+=performance.now()-l}let u=performance.now(),d;try{r.calls++,d=s.world_request(c)}finally{r.kernelMs+=performance.now()-u}let f=performance.now();try{if(d!==i.bridge.checkpointWords)throw Error(`Rejected WASM physics request (${d})`);let e=a(s,d);if(!i.bridge.validate(e))throw Error(`Invalid WASM physics checkpoint`);return r.bytes+=e.byteLength,i.bridge.commit(e),e[6]===1}finally{r.validationMs+=performance.now()-f}},dispose(){i=void 0,n=void 0}}}var Et=t((()=>{})),Dt,Ot=t((()=>{Dt=`
struct Arc {
  a: vec2f, b: vec2f, m: vec2f,
  oldA: vec2f, oldB: vec2f, oldM: vec2f,
  count: u32, error: f32, box: vec4f,
}
struct Segment { a: vec2f, b: vec2f, oldA: vec2f, oldB: vec2f, t0: f32, t1: f32 }
struct Hit { time: f32, along: f32, normal: vec2f }
fn boxUnion(a: vec4f,b: vec4f) -> vec4f {return vec4f(min(a.xy,b.xy),max(a.zw,b.zw));}
fn pointBox(a: vec2f,b: vec2f) -> vec4f {return vec4f(min(a,b),max(a,b));}
fn overlaps(a: vec4f,b: vec4f,pad: f32) -> bool {return all(a.xy<=b.zw+vec2f(pad))&&all(b.xy<=a.zw+vec2f(pad));}
fn outlineArc(card: u32,ci: u32) -> Arc {
  let ids=curves[card*8u+ci];
  // Read only geometry: finish may write neighbouring velocity fields.
  let a=nodes[card*41u+ids.x].position;let b=nodes[card*41u+ids.y].position;let m=nodes[card*41u+ids.z].position;
  let oa=nodes[card*41u+ids.x].previous;let ob=nodes[card*41u+ids.y].previous;let om=nodes[card*41u+ids.z].previous;
  let bend=2.0*(b-a)-4.0*(m-a);
  let oldBend=2.0*(ob-oa)-4.0*(om-oa);
  let curvature=max(length(bend),length(oldBend));var count=2u;
  loop {if(count>=128u||curvature/(4.0*f32(count*count))<=CURVE_ERROR){break;}count*=2u;}
  let error=curvature/(4.0*f32(count*count));
  // Bezier control hull encloses the entire curved sweep, not just samples.
  let control=a+2.0*(m-a)-0.5*(b-a);
  let oldControl=oa+2.0*(om-oa)-0.5*(ob-oa);
  let bounds=boxUnion(boxUnion(pointBox(a,b),pointBox(control,control)),boxUnion(pointBox(oa,ob),pointBox(oldControl,oldControl)));
  return Arc(a,b,m,oa,ob,om,count,error,bounds);
}
fn arcPoint(a: Arc,t: f32,old: bool) -> vec2f {
  let w=basis(t);let origin=select(a.a,a.oldA,old);
  return origin+(select(a.b,a.oldB,old)-origin)*w.y+(select(a.m,a.oldM,old)-origin)*w.z;
}
fn segment(a: Arc,i: u32,count: u32) -> Segment {
  let t0=f32(i)/f32(count);let t1=f32(i+1u)/f32(count);
  return Segment(arcPoint(a,t0,false),arcPoint(a,t1,false),arcPoint(a,t0,true),arcPoint(a,t1,true),t0,t1);
}
fn segmentBox(s: Segment) -> vec4f {return boxUnion(pointBox(s.a,s.b),pointBox(s.oldA,s.oldB));}
fn bodyBox(card: u32) -> vec4f {
  var result=outlineArc(card,0u).box;
  for(var ci=1u;ci<8u;ci++){result=boxUnion(result,outlineArc(card,ci).box);}
  return result;
}
fn closestPoint(p: vec2f,a: vec2f,b: vec2f) -> f32 {let e=b-a;return clamp(dot(p-a,e)/max(EPS,dot(e,e)),0.0,1.0);}
// Returns the two segment coordinates and squared distance, including crossings.
fn closestSegments(a: vec2f,b: vec2f,c: vec2f,d: vec2f) -> vec3f {
  let e=b-a;let f=d-c;let den=cross2(e,f);
  if(abs(den)>EPS){let s=cross2(c-a,f)/den;let t=cross2(c-a,e)/den;if(s>=0.0&&s<=1.0&&t>=0.0&&t<=1.0){return vec3f(s,t,0.0);}}
  var t=closestPoint(a,c,d);var v=a-(c+t*f);var best=vec3f(0.0,t,dot(v,v));
  t=closestPoint(b,c,d);v=b-(c+t*f);if(dot(v,v)<best.z){best=vec3f(1.0,t,dot(v,v));}
  var s=closestPoint(c,a,b);v=a+s*e-c;if(dot(v,v)<best.z){best=vec3f(s,0.0,dot(v,v));}
  s=closestPoint(d,a,b);v=a+s*e-d;if(dot(v,v)<best.z){best=vec3f(s,1.0,dot(v,v));}
  return best;
}
fn roundMargin(a: Arc,b: Arc) -> f32 {
  let magnitude=max(max(max(abs(a.box.x),abs(a.box.y)),max(abs(a.box.z),abs(a.box.w))),max(max(abs(b.box.x),abs(b.box.y)),max(abs(b.box.z),abs(b.box.w))));
  return max(0.0002,magnitude*5e-7);
}
fn inside(card: u32,p: vec2f) -> bool {
  let bounds=bodyBox(card);
  if(any(p<bounds.xy)||any(p>bounds.zw)){return false;}
  var result=false;
  for(var ci=0u;ci<8u;ci++){
    let arc=outlineArc(card,ci);
    if(p.y<arc.box.y||p.y>arc.box.w){continue;}
    for(var j=0u;j<arc.count;j++){
      let edge=segment(arc,j,arc.count);let a=edge.a-p;let b=edge.b-p;
      if((a.y>0.0)!=(b.y>0.0)){if(0.0<a.x-a.y*(b.x-a.x)/(b.y-a.y)){result=!result;}}
    }
  }
  return result;
}
// Ignore only the chord pair meeting at the actual shared corner. No blanket
// neighbouring-curve exclusion: folded distant parts of those arcs still collide.
fn neighbours(ca: u32,cb: u32,ia: u32,ib: u32,na: u32,nb: u32) -> bool {
  if(ca==cb){return true;}
  if((ca+1u)%8u==cb&&ia+1u==na&&ib==0u){return true;}
  if((cb+1u)%8u==ca&&ib+1u==nb&&ia==0u){return true;}
  return false;
}
// Exempt only a shared endpoint whose two entire adjacent sub-arcs have a
// separating line through it throughout the accepted linear substep.
// Q(s)-joint = s*(U+s*V): the four space/time corners certify both halfplanes.
fn jointSpanSafe(a: Arc,b: Arc,sa: f32,sb: f32) -> bool {
  let ua=4.0*(a.m-a.b)-(a.a-a.b);let va=2.0*(a.a-a.b)-4.0*(a.m-a.b);
  let ub=4.0*(b.m-b.a)-(b.b-b.a);let vb=2.0*(b.b-b.a)-4.0*(b.m-b.a);
  let oa=4.0*(a.oldM-a.oldB)-(a.oldA-a.oldB);let qa=2.0*(a.oldA-a.oldB)-4.0*(a.oldM-a.oldB);
  let ob=4.0*(b.oldM-b.oldA)-(b.oldB-b.oldA);let qb=2.0*(b.oldB-b.oldA)-4.0*(b.oldM-b.oldA);
  let n=ua/max(EPS,length(ua))-ub/max(EPS,length(ub))+oa/max(EPS,length(oa))-ob/max(EPS,length(ob));
  if(length(n)<1e-5){return false;}
  let normal=normalize(n);
  let margin=1e-5*max(1.0,max(max(length(ua),length(ub)),max(length(oa),length(ob))));
  return min(min(dot(ua,normal),dot(ua+va*sa,normal)),min(dot(oa,normal),dot(oa+qa*sa,normal)))>margin &&
    max(max(dot(ub,normal),dot(ub+vb*sb,normal)),max(dot(ob,normal),dot(ob+qb*sb,normal))) < -margin;
}
fn jointSafe(a: Arc,b: Arc) -> bool {return jointSpanSafe(a,b,1.0/f32(a.count),1.0/f32(b.count));}
fn entireJointSafe(ca: u32,cb: u32,a: Arc,b: Arc) -> bool {
  if((ca+1u)%8u==cb){return jointSpanSafe(a,b,1.0,1.0);}
  if((cb+1u)%8u==ca){return jointSpanSafe(b,a,1.0,1.0);}
  return false;
}
var<private> contactDemand: f32;
fn sweptVertex(p0: vec2f,p1: vec2f,e: Segment,isSelf: bool) -> Hit {
  let edge=e.oldB-e.oldA;let de=(e.b-e.a)-edge;
  let rel=p0-e.oldA;let dr=(p1-e.a)-rel;
  let aa=cross2(de,dr);let bb=cross2(edge,dr)+cross2(de,rel);let cc=cross2(edge,rel);
  var roots=vec2f(-1.0);var count=0u;
  let tol=1e-7*max(1.0,abs(aa)+abs(bb)+abs(cc));
  if(abs(aa)<=tol){if(abs(bb)>tol){roots.x=-cc/bb;count=1u;}}
  else {
    let disc=bb*bb-4.0*aa*cc;
    if(disc>=0.0){
      let root=sqrt(disc);let q=-0.5*(bb+select(-root,root,bb>=0.0));
      if(abs(q)>EPS){roots=vec2f(q/aa,cc/q);}else{roots=vec2f(-bb/(2.0*aa));}
      roots=vec2f(min(roots.x,roots.y),max(roots.x,roots.y));count=2u;
    }
  }
  for(var k=0u;k<count;k++){
    let time=roots[k];if(time<=0.0||time>1.0){continue;}
    let derivative=bb+2.0*aa*time;
    if(select(derivative<=0.0,derivative*cc>=0.0,isSelf)){continue;}
    let dir=edge+de*time;let len=length(dir);if(len<=EPS){continue;}
    let along=dot(rel+dr*time,dir)/(len*len);if(along<0.0||along>1.0){continue;}
    var n=vec2f(dir.y,-dir.x)/len;if(isSelf&&cc>0.0){n=-n;}
    return Hit(time,along,n);
  }
  return Hit(-1.0,0.0,vec2f(0.0));
}
// The gradient of a chord sample is the interpolated *quadratic basis*, not
// the basis evaluated at its interpolated parameter (these differ for T6).
fn chordWeights(s: Segment,t: f32) -> vec3f {return mix(basis(s.t0),basis(s.t1),t);}
fn reactPair(ca: u32,cb: u32,curveA: u32,curveB: u32,wa: vec3f,wb: vec3f,n: vec2f,skin: f32){
  let idsA=curves[ca*8u+curveA];let idsB=curves[cb*8u+curveB];
  var weightsA: array<f32,41>;var weightsB: array<f32,41>;
  let origin=nodes[ca*41u+idsA.x].position;var relative=vec2f(0.0);
  for(var k=0u;k<3u;k++){relative+=(nodes[ca*41u+idsA[k]].position-origin)*wa[k]-(nodes[cb*41u+idsB[k]].position-origin)*wb[k];weightsA[idsA[k]]+=wa[k];if(ca==cb){weightsA[idsB[k]]-=wb[k];}else{weightsB[idsB[k]]-=wb[k];}}
  let demand=skin-dot(relative,n);contactDemand=max(contactDemand,demand);if(demand<=0.0){return;}
  var den=0.0;
  for(var i=0u;i<41u;i++){den+=nodes[ca*41u+i].inverseMass*weightsA[i]*weightsA[i];if(ca!=cb){den+=nodes[cb*41u+i].inverseMass*weightsB[i]*weightsB[i];}}
  if(den<=EPS){flag(ca,16u);if(ca!=cb){flag(cb,16u);}return;}
  let impulse=demand/den;
  for(var side=0u;side<select(2u,1u,ca==cb);side++){
    let card=select(ca,cb,side==1u);loadPoints(card);
    for(var i=0u;i<41u;i++){
      let w=select(weightsA[i],weightsB[i],side==1u);let im=nodes[card*41u+i].inverseMass;
      scratchDelta[i]=n*(impulse*im*w);scratchSupport[i]=w!=0.0&&im>0.0;
    }
    let fraction=guarded(card);
    for(var i=0u;i<41u;i++){nodes[card*41u+i].position=scratchPosition[i];}
    stats[card].y+=1u;
  }
}
fn collideSegments(ca: u32,cb: u32,curveA: u32,curveB: u32,ia: u32,ib: u32,na: u32,nb: u32){
  var aa=outlineArc(ca,curveA);var ab=outlineArc(cb,curveB);
  var a=segment(aa,ia,na);var b=segment(ab,ib,nb);
  // Recalculate error at the iteration's fixed sample counts after reactions.
  let errA=aa.error*f32(aa.count*aa.count)/f32(na*na);let errB=ab.error*f32(ab.count*ab.count)/f32(nb*nb);
  let skin=SKIN+errA+errB+roundMargin(aa,ab);
  if(!overlaps(segmentBox(a),segmentBox(b),skin)){return;}
  for(var endpoint=0u;endpoint<2u;endpoint++){
    let hit=sweptVertex(select(a.oldA,a.oldB,endpoint==1u),select(a.a,a.b,endpoint==1u),b,ca==cb);
    if(hit.time>=0.0){reactPair(ca,cb,curveA,curveB,basis(select(a.t0,a.t1,endpoint==1u)),chordWeights(b,hit.along),hit.normal,skin);}
    aa=outlineArc(ca,curveA);ab=outlineArc(cb,curveB);a=segment(aa,ia,na);b=segment(ab,ib,nb);
  }
  let close=closestSegments(a.a,a.b,b.a,b.b);let distance=sqrt(max(0.0,close.z));
  if(distance>=skin){return;}
  let pa=mix(a.a,a.b,close.x);let pb=mix(b.a,b.b,close.y);var n=vec2f(0.0);
  if(distance>1e-6){n=(pa-pb)/distance;}
  else {
    let old=closestSegments(a.oldA,a.oldB,b.oldA,b.oldB);let d=mix(a.oldA,a.oldB,old.x)-mix(b.oldA,b.oldB,old.y);
    if(length(d)>1e-6){n=normalize(d);}else{let e=b.b-b.a;if(length(e)<=EPS){flag(ca,16u);return;}n=vec2f(e.y,-e.x)/length(e);}
  }
  if(ca!=cb&&inside(cb,pa)){let e=b.b-b.a;if(length(e)>EPS){n=vec2f(e.y,-e.x)/length(e);}}
  reactPair(ca,cb,curveA,curveB,chordWeights(a,close.x),chordWeights(b,close.y),n,skin);
}
fn containment(ca: u32,cb: u32){
  var bounds=bodyBox(cb);
  for(var ci=0u;ci<8u;ci++){
    let source=outlineArc(ca,ci);let count=source.count;
    if(!overlaps(source.box,bounds,0.0)){continue;}
    for(var sample=0u;sample<count;sample++){
      let arc=outlineArc(ca,ci);let t=f32(sample)/f32(count);let p=arcPoint(arc,t,false);
      if(any(p<bounds.xy)||any(p>bounds.zw)){continue;}
      if(!inside(cb,p)){continue;}
      var best=3e30;var selected=0u;var selectedIndex=0u;var selectedCount=2u;var along=0.0;
      for(var cj=0u;cj<8u;cj++){
        let other=outlineArc(cb,cj);
        for(var j=0u;j<other.count;j++){
          let seg=segment(other,j,other.count);let u=closestPoint(p,seg.a,seg.b);let d=p-mix(seg.a,seg.b,u);let d2=dot(d,d);
          if(d2<best){best=d2;selected=cj;selectedIndex=j;selectedCount=other.count;along=u;}
        }
      }
      let other=outlineArc(cb,selected);let seg=segment(other,selectedIndex,selectedCount);let edge=seg.b-seg.a;
      if(length(edge)<=EPS){flag(ca,16u);continue;}
      reactPair(ca,cb,ci,selected,basis(t),chordWeights(seg,along),vec2f(edge.y,-edge.x)/length(edge),SKIN+arc.error+other.error+roundMargin(arc,other));
      bounds=bodyBox(cb);
    }
  }
}
@compute @workgroup_size(1)
fn contacts(@builtin(global_invocation_id) id: vec3u){
  if(id.x!=0u){return;}
  if(stats[0].w>=2u){return;}
  contactDemand=0.0;
  for(var ca=0u;ca<params.count;ca++){
    if(stats[ca].x!=0u){continue;}
    for(var cb=ca;cb<params.count;cb++){
      if(stats[cb].x!=0u){continue;}
      if(!overlaps(bodyBox(ca),bodyBox(cb),SKIN+2.0*CURVE_ERROR)){continue;}
      for(var ci=0u;ci<8u;ci++){
        for(var cj=0u;cj<8u;cj++){
          if(ca==cb&&ci==cj){continue;}
          var a=outlineArc(ca,ci);var b=outlineArc(cb,cj);
          if(ca==cb&&entireJointSafe(ci,cj,a,b)){continue;}
          if(a.error>CURVE_ERROR||b.error>CURVE_ERROR){flag(ca,8u);continue;}
          if(!overlaps(a.box,b.box,SKIN+a.error+b.error+roundMargin(a,b))){continue;}
          let na=a.count;let nb=b.count;
          for(var i=0u;i<na;i++){
            for(var j=0u;j<nb;j++){
              if(ca==cb&&neighbours(ci,cj,i,j,na,nb)){continue;}
              let pad=SKIN+a.error*f32(a.count*a.count)/f32(na*na)+b.error*f32(b.count*b.count)/f32(nb*nb)+roundMargin(a,b);
              // Cache the arcs until a reaction changes their actual nodes.
              if(!overlaps(segmentBox(segment(a,i,na)),segmentBox(segment(b,j,nb)),pad)){continue;}
              let before=stats[ca].y;
              collideSegments(ca,cb,ci,cj,i,j,na,nb);
              if(ca!=cb){collideSegments(cb,ca,cj,ci,j,i,nb,na);}
              if(stats[ca].y!=before){a=outlineArc(ca,ci);b=outlineArc(cb,cj);}
            }
          }
        }
      }
      if(ca!=cb){containment(ca,cb);containment(cb,ca);}
    }
  }
  var quiet=contactDemand<=0.24;
  for(var card=0u;card<params.count;card++){
    let box=bodyBox(card);
    quiet=quiet&&nodes[card*41u].pad<=0.08&&min(min(box.x,box.y),min(params.width-box.z,params.height-box.w))>0.24;
  }
  stats[0].w=select(0u,stats[0].w+1u,quiet);
}
// Conservative advancement: segment distance is Lipschitz with the maximum
// relative endpoint travel. Translation common to both segments cancels exactly.
// The interpolation-error envelope is valid at every time by convexity.
fn separatedSweep(a: Segment,b: Segment,pad: f32) -> bool {
  let va=a.a-a.oldA;let vb=a.b-a.oldB;let vc=b.a-b.oldA;let vd=b.b-b.oldB;
  let speed=max(max(length(va-vc),length(va-vd)),max(length(vb-vc),length(vb-vd)));
  var time=0.0;
  for(var iteration=0u;iteration<128u;iteration++){
    let pa=mix(a.oldA,a.a,time);let qa=mix(a.oldB,a.b,time);let pb=mix(b.oldA,b.a,time);let qb=mix(b.oldB,b.b,time);
    let closest=closestSegments(pa,qa,pb,qb);let clearance=sqrt(max(0.0,closest.z))-pad;
    if(!(clearance>0.0)){return false;}
    if(speed<=EPS||clearance>speed*(1.0-time)){return true;}
    let increment=0.8*clearance/speed;
    if(increment<1e-6){return false;}
    time=min(1.0,time+increment);if(time>=1.0){return true;}
  }
  return false;
}
fn auditContacts(card: u32){
  for(var ci=0u;ci<8u;ci++){
    let a=outlineArc(card,ci);
    if(!finite(a.error)||a.error>CURVE_ERROR){flag(card,8u);return;}
    if(!jointSafe(a,outlineArc(card,(ci+1u)%8u))){flag(card,16u);return;}
  }
  for(var other=0u;other<params.count;other++){
    if(!overlaps(bodyBox(card),bodyBox(other),2.0*CURVE_ERROR+0.01)){continue;}
    if(card!=other){
      if(inside(other,nodes[card*41u+curves[card*8u].x].position)||inside(card,nodes[other*41u+curves[other*8u].x].position)){flag(card,16u);return;}
    }
    for(var ci=0u;ci<8u;ci++){
      for(var cj=0u;cj<8u;cj++){
        if(card==other&&ci>=cj){continue;}
        let a=outlineArc(card,ci);let b=outlineArc(other,cj);let pad=a.error+b.error+roundMargin(a,b);
        if(card==other&&entireJointSafe(ci,cj,a,b)){continue;}
        if(!overlaps(a.box,b.box,pad)){continue;}
        for(var i=0u;i<a.count;i++){
          let sa=segment(a,i,a.count);
          for(var j=0u;j<b.count;j++){
            if(card==other&&neighbours(ci,cj,i,j,a.count,b.count)){continue;}
            let sb=segment(b,j,b.count);
            if(!overlaps(segmentBox(sa),segmentBox(sb),pad)){continue;}
            if(!separatedSweep(sa,sb,pad)){flag(card,16u);return;}
          }
        }
      }
    }
  }
}
`})),kt,At=t((()=>{Ot(),kt=`
struct Node { position: vec2f, previous: vec2f, velocity: vec2f, inverseMass: f32, pad: f32 }
struct Quad { gx: array<f32,6>, gy: array<f32,6>, alpha: f32, shearDivisor: f32, beta: f32, pad: f32 }
struct Cell { indices: array<u32,6>, floor: f32, pad: f32 }
// Contract's "target"/"active" names are reserved; offsets 32/40 unchanged.
struct Grip { indices: vec4u, weights: vec4f, goal: vec2f, enabled: u32, pad: u32 }
struct Params { count: u32, steps: u32, dt: f32, width: f32, height: f32, pad0: f32, pad1: f32, pad2: f32 }
// Scalars are distinct memory locations. A vec4 component write could race
// with another workgroup reading the global quiet counter.
struct Stat { x: u32, y: u32, z: u32, w: u32 }
@group(0) @binding(0) var<storage,read_write> nodes: array<Node>;
@group(0) @binding(1) var<storage,read> quads: array<Quad>;
@group(0) @binding(2) var<storage,read> cells: array<Cell>;
@group(0) @binding(3) var<storage,read_write> lambdas: array<vec4f>;
@group(0) @binding(4) var<storage,read> grips: array<Grip>;
@group(0) @binding(5) var<storage,read> curves: array<vec4u>;
@group(0) @binding(6) var<storage,read> edges: array<vec2u>;
@group(0) @binding(7) var<storage,read_write> stats: array<Stat>;
@group(0) @binding(8) var<uniform> params: Params;
alias Points = array<vec2f,41>;
alias Six = array<f32,6>;
// One invocation owns its scratch. Fixed private arrays avoid HLSL inout-array
// copies at every nested contact/guard call on older D3D compilers.
var<private> scratchPosition: Points;
var<private> scratchDelta: Points;
var<private> scratchEnd: Points;
var<private> scratchSupport: array<bool,41>;
var<private> certificatePosition: Points;
var<private> certificateRadius: array<f32,41>;
var<private> certificateValid: bool;
var<private> wallMargin: f32;
struct Geometry { r: vec2f, s: vec2f, rr: vec2f, rs: vec2f, ss: vec2f }
const EPS: f32 = 1e-9;
const SKIN: f32 = 0.12;
const CURVE_ERROR: f32 = 0.03;
fn finite(x: f32) -> bool { return abs(x) <= 3.0e30; }
fn finite2(x: vec2f) -> bool { return all(abs(x) <= vec2f(3.0e30)); }
fn flag(card: u32, bits: u32) { stats[card].x = stats[card].x | bits; }
fn cross2(a: vec2f,b: vec2f) -> f32 { return a.x*b.y-a.y*b.x; }
fn loadPoints(card: u32) {
  for(var i=0u;i<41u;i++){scratchPosition[i]=nodes[card*41u+i].position;}
  certificateValid=false;wallMargin=0.0;
}
fn basis(t: f32) -> vec3f { return vec3f((1.0-t)*(1.0-2.0*t),t*(2.0*t-1.0),4.0*t*(1.0-t)); }
fn geometryPoint(index: u32, endpoint: bool) -> vec2f {
  return select(scratchPosition[index],scratchEnd[index],endpoint);
}
fn geometry(cell: Cell, endpoint: bool) -> Geometry {
  let a=geometryPoint(cell.indices[0],endpoint);
  let b=geometryPoint(cell.indices[1],endpoint)-a;let c=geometryPoint(cell.indices[2],endpoint)-a;
  let d=geometryPoint(cell.indices[3],endpoint)-a;let e=geometryPoint(cell.indices[4],endpoint)-a;let f=geometryPoint(cell.indices[5],endpoint)-a;
  return Geometry(-b+4.0*d,-c+4.0*f,2.0*b-4.0*d,4.0*(-d+e-f),2.0*c-4.0*f);
}
// Polynomial coefficients [1,r,s,r*r,r*s,s*s], relative geometry only.
fn jac(g: Geometry) -> Six {
  return Six(cross2(g.r,g.s),2.0*cross2(g.rr,g.s)+cross2(g.r,g.rs),
    cross2(g.rs,g.s)+2.0*cross2(g.r,g.ss),2.0*cross2(g.rr,g.rs),
    4.0*cross2(g.rr,g.ss),2.0*cross2(g.rs,g.ss));
}
fn poly(p: Six,r: f32,s: f32) -> f32 { return p[0]+r*(p[1]+r*p[3]+s*p[4])+s*(p[2]+s*p[5]); }
// Exact stationary candidates on the three edges and in the whole triangle.
// A near-singular Hessian falls back to the conservative Bernstein hull.
fn positive(p: Six, floor: f32) -> bool {
  var scale=abs(floor);
  for(var i=0u;i<6u;i++){ if(!finite(p[i])){return false;} scale+=abs(p[i]); }
  let bound=floor+max(1e-6,scale*2e-5);
  let v0=p[0]; let v1=poly(p,1.0,0.0); let v2=poly(p,0.0,1.0);
  let hull=min(min(min(v0,v1),v2),min(min(p[0]+p[1]*0.5,p[0]+p[2]*0.5),p[0]+(p[1]+p[2]+p[4])*0.5));
  if(hull>bound){return true;}
  var low=min(min(v0,v1),v2);
  if(abs(p[3])>EPS){let t=-p[1]/(2.0*p[3]); if(t>0.0&&t<1.0){low=min(low,poly(p,t,0.0));}}
  if(abs(p[5])>EPS){let t=-p[2]/(2.0*p[5]); if(t>0.0&&t<1.0){low=min(low,poly(p,0.0,t));}}
  let q=p[3]-p[4]+p[5]; let l=p[1]-p[2]+p[4]-2.0*p[5];
  if(abs(q)>EPS){let t=-l/(2.0*q); if(t>0.0&&t<1.0){low=min(low,poly(p,t,1.0-t));}}
  let h=4.0*p[3]*p[5]-p[4]*p[4];
  let hs=max(1e-12,abs(4.0*p[3]*p[5])+p[4]*p[4]);
  if(abs(h)<hs*1e-5){return hull>bound;}
  let r=(p[4]*p[2]-2.0*p[5]*p[1])/h;
  let s=(p[4]*p[1]-2.0*p[3]*p[2])/h;
  if(r>=0.0&&s>=0.0&&r+s<=1.0){low=min(low,poly(p,r,s));}
  return low>bound;
}
fn pathSafe(card: u32) -> bool {
  for(var ci=0u;ci<16u;ci++){
    let cell=cells[card*16u+ci]; var touched=false;
    for(var k=0u;k<6u;k++){let ix=cell.indices[k];touched=touched||any(scratchPosition[ix]!=scratchEnd[ix]);}
    if(!touched){continue;}
    let g=geometry(cell,false);let h=geometry(cell,true);
    let mid=Geometry((g.r+h.r)*0.5,(g.s+h.s)*0.5,(g.rr+h.rr)*0.5,(g.rs+h.rs)*0.5,(g.ss+h.ss)*0.5);
    let j0=jac(g); let j1=jac(h); let jm=jac(mid); var control: Six;
    for(var k=0u;k<6u;k++){control[k]=2.0*jm[k]-0.5*(j0[k]+j1[k]);}
    // Temporal quadratic Bernstein controls are polynomials over the *whole* cell.
    if(!positive(j0,cell.floor)||!positive(j1,cell.floor)||!positive(control,cell.floor)){return false;}
  }
  return true;
}
fn wallSafe(card: u32, endpoint: bool) -> bool {
  for(var ci=0u;ci<8u;ci++){
    let ids=curves[card*8u+ci];let a=geometryPoint(ids.x,endpoint);let b=geometryPoint(ids.y,endpoint)-a;let m=geometryPoint(ids.z,endpoint)-a;
    let q=2.0*b-4.0*m; let l=-b+4.0*m;
    for(var axis=0u;axis<2u;axis++){
      let limit=select(params.width,params.height,axis==1u);
      var lo=min(a[axis],a[axis]+b[axis]); var hi=max(a[axis],a[axis]+b[axis]);
      if(abs(q[axis])>EPS){let t=-l[axis]/(2.0*q[axis]); if(t>0.0&&t<1.0){let v=a[axis]+t*(l[axis]+t*q[axis]);lo=min(lo,v);hi=max(hi,v);}}
      if(!finite(lo)||!finite(hi)||lo<0.0||hi>limit){return false;}
    }
  }
  return true;
}
// Project only nodes in this correction's support. A wall cannot translate a
// whole card to accommodate one local material/contact correction.
fn projectWalls(card: u32) -> bool {
  for(var projectionPass=0u;projectionPass<12u;projectionPass++){
    for(var i=0u;i<41u;i++){scratchEnd[i]=scratchPosition[i]+scratchDelta[i];}
    if(wallSafe(card,true)){return true;}
    for(var ci=0u;ci<8u;ci++){
      let ids=curves[card*8u+ci];
      for(var axis=0u;axis<2u;axis++){
        let limit=select(params.width,params.height,axis==1u);
        let a=scratchPosition[ids.x][axis]+scratchDelta[ids.x][axis];
        let b=scratchPosition[ids.y][axis]+scratchDelta[ids.y][axis]-a;
        let m=scratchPosition[ids.z][axis]+scratchDelta[ids.z][axis]-a;
        let q=2.0*b-4.0*m; let l=-b+4.0*m;
        var extremum=-1.0; if(abs(q)>EPS){extremum=-l/(2.0*q);}
        for(var sample=0u;sample<3u;sample++){
          var t=f32(sample); if(sample==2u){t=extremum;if(t<=0.0||t>=1.0){continue;}}
          let w=basis(t); var value=0.0; var den=0.0;
          // Relative evaluation avoids cancellation for negative T6 weights.
          let origin=scratchPosition[ids.x][axis]+scratchDelta[ids.x][axis];value=origin;
          for(var k=0u;k<3u;k++){
            let ix=ids[k];value+=w[k]*(scratchPosition[ix][axis]+scratchDelta[ix][axis]-origin);
            if(scratchSupport[ix]){den+=nodes[card*41u+ix].inverseMass*w[k]*w[k];}
          }
          if(value>=0.0&&value<=limit){continue;}
          if(den<=EPS){continue;}
          // Interior target leaves a few world-coordinate ULPs for rounding.
          let inset=min(limit*0.001,max(0.0001,limit*2.0e-7));
          let correction=clamp(value,inset,limit-inset)-value;
          for(var k=0u;k<3u;k++){let ix=ids[k];if(scratchSupport[ix]){scratchDelta[ix][axis]+=correction*w[k]*nodes[card*41u+ix].inverseMass/den;}}
        }
      }
    }
  }
  for(var i=0u;i<41u;i++){scratchEnd[i]=scratchPosition[i]+scratchDelta[i];}
  return wallSafe(card,true);
}
fn guarded(card: u32) -> f32 {
  var travel=0.0;for(var i=0u;i<41u;i++){travel=max(travel,max(abs(scratchDelta[i].x),abs(scratchDelta[i].y)));}
  if(wallMargin<=3.0*travel){
    wallMargin=3e30;
    for(var ci=0u;ci<8u;ci++){
      let ids=curves[card*8u+ci];let a=scratchPosition[ids.x];let b=scratchPosition[ids.y];
      let c=a+2.0*(scratchPosition[ids.z]-a)-0.5*(b-a);
      let lo=min(min(a,b),c);let hi=max(max(a,b),c);
      wallMargin=min(wallMargin,min(min(lo.x,lo.y),min(params.width-hi.x,params.height-hi.y))-0.002);
    }
    wallMargin=max(0.0,wallMargin);
  }
  let clearWall=wallMargin>3.0*travel;
  var projected=true;if(!clearWall){projected=projectWalls(card);}
  var fraction=1.0;
  for(var attempt=0u;attempt<13u;attempt++){
    var valid=true;
    for(var i=0u;i<41u;i++){scratchEnd[i]=scratchPosition[i]+fraction*scratchDelta[i];valid=valid&&finite2(scratchEnd[i]);}
    if(!certificateValid){buildCertificates(card);}
    var certified=true;
    for(var i=0u;i<41u;i++){certified=certified&&length(scratchEnd[i]-certificatePosition[i])<certificateRadius[i];}
    if(valid&&(clearWall||wallSafe(card,true))&&(certified||pathSafe(card))){
      scratchPosition=scratchEnd;wallMargin=max(0.0,wallMargin-3.0*travel);
      if(!certified){certificateValid=false;}
      return fraction;
    }
    fraction*=0.5;
  }
  flag(card,select(2u,6u,!projected)); return 0.0;
}
// Same local determinant perturbation bound as the CPU, with extra F32 slack.
// A product of nodal balls is convex: the entire accepted path is certified.
fn buildCertificates(card: u32) {
  certificatePosition=scratchPosition;
  for(var i=0u;i<41u;i++){certificateRadius[i]=3e30;}
  for(var ci=0u;ci<16u;ci++){
    let cell=cells[card*16u+ci];let g=geometry(cell,false);let p=jac(g);
    let hull=min(min(min(p[0],poly(p,1.0,0.0)),poly(p,0.0,1.0)),min(min(p[0]+p[1]*0.5,p[0]+p[2]*0.5),p[0]+(p[1]+p[2]+p[4])*0.5));
    var norm=0.0;
    for(var corner=0u;corner<3u;corner++){
      let r=select(0.0,1.0,corner==1u);let s=select(0.0,1.0,corner==2u);
      let dr=g.r+2.0*g.rr*r+g.rs*s;let ds=g.s+g.rs*r+2.0*g.ss*s;
      norm=max(norm,sqrt(dot(dr,dr)+dot(ds,ds)));
    }
    let margin=max(0.0,hull-cell.floor-max(0.001,abs(hull)*0.001));
    let radius=0.8*2.0*margin/max(1e-10,norm+sqrt(norm*norm+2.0*margin))/13.0;
    for(var k=0u;k<6u;k++){let id=cell.indices[k];certificateRadius[id]=min(certificateRadius[id],radius);}
  }
  certificateValid=true;
}
fn deformation(cell: Cell,q: Quad) -> vec4f {
  var f=vec4f(0.0);let origin=scratchPosition[cell.indices[0]];
  for(var i=0u;i<6u;i++){let v=scratchPosition[cell.indices[i]]-origin;f+=vec4f(v*q.gx[i],v*q.gy[i]);}
  return f;
}
@compute @workgroup_size(1)
fn predict(@builtin(global_invocation_id) id: vec3u){
  let card=id.x;if(card>=params.count){return;}
  if(!(params.dt>0.0&&params.dt<=1.0&&params.width>0.0&&params.height>0.0)||!finite(params.width)||!finite(params.height)){flag(card,1u);return;}
  if(stats[card].x!=0u){return;}
  stats[card].w=0u;
  loadPoints(card);var v: Points;
  for(var i=0u;i<41u;i++){
    let n=nodes[card*41u+i]; if(!finite2(n.position)||!finite2(n.velocity)||!finite(n.inverseMass)||n.inverseMass<0.0){flag(card,1u);return;}
    v[i]=n.velocity;nodes[card*41u+i].previous=scratchPosition[i];
  }
  for(var ci=0u;ci<16u;ci++){
    let cell=cells[card*16u+ci];for(var k=0u;k<6u;k++){if(cell.indices[k]>=41u){flag(card,1u);return;}}
    if(!finite(cell.floor)||cell.floor<0.0||!positive(jac(geometry(cell,false)),cell.floor)){flag(card,2u);return;}
  }
  for(var ci=0u;ci<8u;ci++){if(any(curves[card*8u+ci].xyz>=vec3u(41u))){flag(card,1u);return;}}
  for(var qi=0u;qi<112u;qi++){
    let q=quads[card*112u+qi];lambdas[card*112u+qi]=vec4f(0.0);
    if(!finite(q.alpha)||!finite(q.beta)||!finite(q.shearDivisor)||q.alpha<0.0||q.beta<=0.0||q.shearDivisor<=0.0){flag(card,1u);return;}
    for(var k=0u;k<6u;k++){if(!finite(q.gx[k])||!finite(q.gy[k])){flag(card,1u);return;}}
  }
  let visc=1.0-exp(-4.0*params.dt);
  for(var ei=0u;ei<56u;ei++){
    let e=edges[card*56u+ei];if(any(e>=vec2u(41u))){flag(card,1u);return;}
    let d=scratchPosition[e.y]-scratchPosition[e.x];let len=length(d);let ia=nodes[card*41u+e.x].inverseMass;let ib=nodes[card*41u+e.y].inverseMass;
    if(len>EPS&&ia+ib>EPS){let n=d/len;let j=dot(v[e.y]-v[e.x],n)*visc/(ia+ib);v[e.x]+=ia*n*j;v[e.y]-=ib*n*j;}
  }
  let grip=grips[card];
  if(grip.enabled!=0u){
    if(any(grip.indices>=vec4u(41u))||!finite2(grip.goal)||!all(abs(grip.weights)<=vec4f(3e30))){flag(card,1u);return;}
    var weights: array<f32,41>;
    // Aggregate duplicates before effective mass (also works for signed weights).
    for(var k=0u;k<4u;k++){weights[grip.indices[k]]+=grip.weights[k];}
    var x=vec2f(0.0);var vel=vec2f(0.0);var inv=0.0;var sum=0.0;
    let origin=scratchPosition[grip.indices.x];
    for(var i=0u;i<41u;i++){let w=weights[i];x+=(scratchPosition[i]-origin)*w;vel+=v[i]*w;inv+=nodes[card*41u+i].inverseMass*w*w;sum+=w;}
    if(abs(sum-1.0)>1e-4||inv<=EPS){flag(card,1u);return;}
    let force=((grip.goal-origin-x)*1800.0-vel*34.0)/inv;
    for(var i=0u;i<41u;i++){v[i]+=force*(params.dt*nodes[card*41u+i].inverseMass*weights[i]);}
  }
  for(var i=0u;i<41u;i++){
    v[i]*=exp(-1.8*params.dt);v[i]*=min(1.0,720.0/max(EPS,length(v[i])));
    scratchSupport[i]=nodes[card*41u+i].inverseMass>0.0;scratchDelta[i]=select(vec2f(0.0),v[i]*params.dt,scratchSupport[i]);
  }
  // Try the simultaneous path first; a blocked neighbourhood must not freeze
  // other nodes. The fallback admits individual nodal paths, never a pose fit.
  let projected=projectWalls(card);
  if(projected&&pathSafe(card)){scratchPosition=scratchEnd;}
  else {
    for(var i=0u;i<41u;i++){
      if(nodes[card*41u+i].inverseMass<=0.0){continue;}
      scratchDelta=Points();scratchSupport=array<bool,41>();
      scratchDelta[i]=v[i]*params.dt;scratchSupport[i]=true;let admitted=guarded(card);
    }
  }
  for(var i=0u;i<41u;i++){nodes[card*41u+i].position=scratchPosition[i];nodes[card*41u+i].velocity=v[i];}
}
@compute @workgroup_size(1)
fn material(@builtin(global_invocation_id) id: vec3u){
  let card=id.x;if(card>=params.count){return;}if(stats[card].x!=0u){return;}
  if(stats[0].w>=2u){return;}
  loadPoints(card);
  let startPosition=scratchPosition;
  for(var ci=0u;ci<16u;ci++){
    let cell=cells[card*16u+ci];scratchSupport=array<bool,41>();
    for(var k=0u;k<6u;k++){let ix=cell.indices[k];scratchSupport[ix]=nodes[card*41u+ix].inverseMass>0.0;}
    for(var qi=0u;qi<7u;qi++){
      let index=card*112u+ci*7u+qi;let q=quads[index];var lambda=lambdas[index];
      let f=deformation(cell,q);let sx=(-(f.x-f.w)-q.alpha*lambda.x)/q.shearDivisor;let sy=(-(f.y+f.z)-q.alpha*lambda.y)/q.shearDivisor;
      scratchDelta=Points();
      for(var k=0u;k<6u;k++){let ix=cell.indices[k];scratchDelta[ix]=nodes[card*41u+ix].inverseMass*vec2f(sx*q.gx[k]+sy*q.gy[k],-sx*q.gy[k]+sy*q.gx[k]);}
      let fraction=guarded(card);lambda.x+=sx*fraction;lambda.y+=sy*fraction;
      let h=deformation(cell,q);var den=0.0;var gradient: array<vec2f,6>;
      for(var k=0u;k<6u;k++){let g=vec2f(h.w*q.gx[k]-h.y*q.gy[k],-h.z*q.gx[k]+h.x*q.gy[k]);gradient[k]=g;den+=nodes[card*41u+cell.indices[k]].inverseMass*dot(g,g);}
      let change=(1.0-h.x*h.w+h.y*h.z-q.beta*lambda.z)/(den+q.beta);
      scratchDelta=Points();
      for(var k=0u;k<6u;k++){let ix=cell.indices[k];scratchDelta[ix]=gradient[k]*(change*nodes[card*41u+ix].inverseMass);}
      lambda.z+=change*guarded(card);lambdas[index]=lambda;
    }
  }
  for(var i=0u;i<41u;i++){nodes[card*41u+i].position=scratchPosition[i];}
  var travel=0.0;
  for(var i=0u;i<41u;i++){travel=max(travel,length(scratchPosition[i]-startPosition[i]));}
  nodes[card*41u].pad=travel;
}
@compute @workgroup_size(1)
fn walls(@builtin(global_invocation_id) id: vec3u){
  let card=id.x;if(card>=params.count){return;}if(stats[card].x!=0u){return;}
  loadPoints(card);scratchDelta=Points();scratchSupport=array<bool,41>();
  for(var i=0u;i<8u;i++){let ids=curves[card*8u+i];for(var k=0u;k<3u;k++){scratchSupport[ids[k]]=nodes[card*41u+ids[k]].inverseMass>0.0;}}
  let admitted=guarded(card);
  if(!wallSafe(card,false)){flag(card,4u);}
  for(var i=0u;i<41u;i++){nodes[card*41u+i].position=scratchPosition[i];}
}
`+Dt+`
@compute @workgroup_size(1)
fn finish(@builtin(global_invocation_id) id: vec3u){
  let card=id.x;if(card>=params.count){return;}if(stats[card].x!=0u){return;}
  loadPoints(card);if(!wallSafe(card,false)){flag(card,4u);}
  for(var ci=0u;ci<16u;ci++){let cell=cells[card*16u+ci];if(!positive(jac(geometry(cell,false)),cell.floor)){flag(card,2u);}}
  // Read-only cross-card audit after the last walls dispatch. No geometry is
  // written by finish, so other finish invocations cannot race with this audit.
  auditContacts(card);
  for(var i=0u;i<41u;i++){
    let ix=card*41u+i;var v=(scratchPosition[i]-nodes[ix].previous)/params.dt;
    if(!finite2(scratchPosition[i])||!finite2(v)){flag(card,1u);v=vec2f(0.0);}
    v*=min(1.0,720.0/max(EPS,length(v)));nodes[ix].velocity=v;
  }
  for(var i=0u;i<112u;i++){if(!all(abs(lambdas[card*112u+i])<=vec4f(3e30))){flag(card,1u);}}
  stats[card].z+=1u;
}
`})),jt=/* @__PURE__ */ n({createGpuPhysics:()=>Nt});async function Mt(e,t){e.pushErrorScope(`validation`);let n;try{n=t()}catch(t){throw await e.popErrorScope(),t}let r=e.popErrorScope().then(e=>{if(e)throw Error(`WebGPU validation: ${e.message}`)}),[i]=await Promise.all([n,r]);return i}async function Nt(){let e=globalThis.navigator?.gpu;if(!e)throw Error(`WebGPU is unavailable`);let t,n,r;function i(e){n||(n=e,r?.(e),t?.destroy(),t=void 0)}async function a(e,t,n){let a=new Promise((e,t)=>{r=t}),o=setTimeout(()=>i(Error(t)),e);try{return await Promise.race([a,n()])}finally{clearTimeout(o),r=void 0}}async function o(e){let o=await e.requestAdapter();if(n)throw n;if(!o)throw Error(`No WebGPU adapter found`);let s=await o.requestDevice();if(n)throw s.destroy(),n;t=s,s.lost.then(({message:e})=>i(/* @__PURE__ */ Error(`WebGPU device lost: ${e}`)),()=>i(/* @__PURE__ */ Error(`WebGPU device lost`)));let c=await Mt(s,()=>s.createShaderModule({code:kt}));if(n)throw n;let{messages:l}=await c.getCompilationInfo();if(n)throw n;let u=l.filter(({type:e})=>e===`error`);if(u.length)throw Error(`WebGPU shader compilation: ${u.map(({message:e})=>e).join(`
`)}`);let{bindLayout:d,pipelines:f}=await Mt(s,()=>{let e=s.createBindGroupLayout({entries:[`storage`,`read-only-storage`,`read-only-storage`,`storage`,`read-only-storage`,`read-only-storage`,`read-only-storage`,`storage`,`uniform`].map((e,t)=>({binding:t,visibility:Ft,buffer:{type:e}}))}),t=s.createPipelineLayout({bindGroupLayouts:[e]}),n=e=>s.createComputePipelineAsync({layout:t,compute:{module:c,entryPoint:e}});return Promise.all([n(`predict`),n(`material`),n(`contacts`),n(`walls`),n(`finish`)]).then(t=>({bindLayout:e,pipelines:t}))});if(n)throw n;let[p,m,h,g,_]=f,v;function y(e){if(v?.count===e)return v;if(v){for(let e of[...v.storage,v.params,v.readback])e.destroy();v=void 0}let t=K.map((t,n)=>s.createBuffer({size:e*t,usage:136|(n===0||n===7?Pt:0)})),n=s.createBuffer({size:Bt,usage:72});return v={count:e,storage:t,params:n,readback:s.createBuffer({size:e*(K[0]+K[7]),usage:9}),group:s.createBindGroup({layout:d,entries:[...t,n].map((e,t)=>({binding:t,resource:{buffer:e}}))}),nodes:t[0],lambdas:t[3],stats:t[7]},v}async function b(e){if(n)throw n;if(r)throw Error(`WebGPU physics solve already in progress`);let{nodes:t,quads:o,cells:c,grips:l,curves:u,edges:d,count:f,steps:v,dt:b,width:x,height:S}=e,C=[t,o,c,void 0,l,u,d];if(!Number.isInteger(f)||f<0||f>s.limits.maxComputeWorkgroupsPerDimension||!Number.isInteger(v)||v<1||v>64||![b,x,S].every(e=>Number.isFinite(Math.fround(e))&&Math.fround(e)>0)||K.some((e,t)=>{let n=C[t];return n&&n.byteLength!==f*e}))throw RangeError(`Invalid WebGPU physics input`);if(f===0)return{nodes:/* @__PURE__ */ new Float32Array,stats:/* @__PURE__ */ new Uint32Array};let w=/* @__PURE__ */ new ArrayBuffer(Bt);new Uint32Array(w).set([f,v]),new Float32Array(w).set([b,x,S],2);let T=f*K[7],E=`WebGPU physics solve timed out`,ee=performance.now()+Rt,D;try{D=await a(Rt,E,()=>Mt(s,async()=>{let e=y(f),{storage:r,readback:i,group:a}=e,{queue:o}=s;r.forEach((e,t)=>{let n=C[t];if(!n)return;let r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength).slice();o.writeBuffer(e,0,r.buffer)}),o.writeBuffer(e.params,0,w);let c=s.createCommandEncoder();c.clearBuffer(e.lambdas),c.clearBuffer(e.stats);let l=c.beginComputePass();l.setBindGroup(0,a);for(let e=0;e<v;e++){if(performance.now()>=ee)throw Error(E);l.setPipeline(p),l.dispatchWorkgroups(f);for(let e=0;e<zt;e++)l.setPipeline(m),l.dispatchWorkgroups(f),l.setPipeline(h),l.dispatchWorkgroups(1),l.setPipeline(g),l.dispatchWorkgroups(f);l.setPipeline(_),l.dispatchWorkgroups(f)}if(l.end(),c.copyBufferToBuffer(e.nodes,0,i,0,t.byteLength),c.copyBufferToBuffer(e.stats,0,i,t.byteLength,T),performance.now()>=ee)throw Error(E);if(o.submit([c.finish()]),await i.mapAsync(It),n)throw n;try{let e=i.getMappedRange();return{nodes:new Float32Array(e,0,t.length).slice(),stats:new Uint32Array(e,t.byteLength,f*4).slice()}}finally{i.unmap()}}))}catch(e){throw i(e instanceof Error?e:Error(String(e))),e}if(n)throw n;for(let e=0;e<f;e++){let t=D.stats[e*4];if(t)throw Error(`WebGPU physics rejected card ${e} (flags 0x${t.toString(16)})`)}return D}return{adapter:o.info?.description||o.info?.device||o.info?.vendor||`WebGPU`,solve:b,dispose:()=>i(/* @__PURE__ */ Error(`WebGPU physics solver disposed`))}}try{return await a(Lt,`WebGPU physics setup timed out`,()=>o(e))}catch(e){throw i(e instanceof Error?e:Error(String(e))),e}}var Pt,Ft,It,Lt,Rt,zt,K,Bt,Vt=t((()=>{At(),Pt=4,Ft=4,It=1,Lt=3e4,Rt=1200,zt=6,K=[1312,7168,512,1792,48,128,448,16],Bt=32}));bt(),l();let q=self,J,Y,Ht=!1,X=!0,Ut=null,Z,Wt=!1,Gt=null,Q={mode:`cpu`,requested:`cpu`,adapter:``,reason:null,accepted:0,rejected:0,dispatches:0,errors:0,gpuMs:0,packMs:0,validationMs:0,readbacks:0,submissions:0,gpuSteps:0,uploadedBytes:0,downloadedBytes:0,initializing:!1};function $(){Q.requested===`wasm`?(Q.mode=Z?`wasm-full`:`cpu`,Q.reason=Gt):(Q.mode=Q.requested===`webgpu`&&Y&&X?`webgpu-full`:`cpu`,Q.reason=X?Ut:`This mesh topology uses the CPU Worker`)}function Kt(e){Q.errors++,Gt=e instanceof Error?e.message:String(e),Z?.dispose(),Z=void 0,$()}async function qt(){if(Wt)return;Wt=!0,Q.initializing=!0;let e=!1;try{Z=await Yt((async()=>{let{createWasmPhysics:t}=await Promise.resolve().then(()=>(Et(),St));if(e)throw Error(`WASM setup expired`);let n=await t();if(e)throw n.dispose(),Error(`WASM setup expired`);return n})(),8e3),$()}catch(t){e=!0,Kt(t)}finally{Q.initializing=!1,J&&q.postMessage({type:`compute`,generation:J.generation,compute:{...Q}},[])}}function Jt(e){Q.errors++,Ut=e instanceof Error?e.message:String(e),Y?.dispose(),Y=void 0,$()}async function Yt(e,t){let n;try{return await Promise.race([e,new Promise((e,r)=>{n=setTimeout(()=>r(/* @__PURE__ */ Error(`Compute request budget exceeded`)),Math.max(0,t))})])}finally{clearTimeout(n)}}async function Xt(e){if(Q.requested=e,e!==`webgpu`||Ht)return;Ht=!0,Q.initializing=!0;let t=!1;try{Y=await Yt((async()=>{let{createGpuPhysics:e}=await Promise.resolve().then(()=>(Vt(),jt));if(t)throw Error(`WebGPU setup expired`);let n=await e();if(t)throw n.dispose(),Error(`WebGPU setup expired`);return n})(),32e3),Q.adapter=Y.adapter,$()}catch(e){t=!0,Jt(e)}finally{Q.initializing=!1,J&&q.postMessage({type:`compute`,generation:J.generation,compute:{...Q}},[])}}async function Zt(e,t,n){if(Q.requested!==`webgpu`||!Y||!X)return tt(e.bodies,e.width,e.height,t,n);try{let n=performance.now(),r=rt(e.bodies,e.width,e.height,t);if(Q.packMs+=performance.now()-n,!r.steps)return it(r,r.nodes,new Uint32Array(r.count*4));Q.dispatches+=r.steps*20,Q.submissions++,Q.uploadedBytes+=r.nodes.byteLength+r.grips.byteLength+r.quads.byteLength+r.cells.byteLength+r.curves.byteLength+r.edges.byteLength+32,n=performance.now();let i=await Yt(Y.solve(r),1400);Q.gpuMs+=performance.now()-n,Q.readbacks++,Q.downloadedBytes+=i.nodes.byteLength+i.stats.byteLength,n=performance.now();let a=it(r,i.nodes,i.stats);return Q.validationMs+=performance.now()-n,Q.accepted++,Q.gpuSteps+=r.steps,a}catch(r){return Q.rejected++,Jt(r),tt(e.bodies,e.width,e.height,t,n)}}function Qt(e,t){for(let n of t)if(n.type!==`settle`){if(!Number.isInteger(n.index)||!e.bodies[n.index])throw RangeError(`Invalid card index`);if(n.type===`release`){if(typeof n.throwCard!=`boolean`)throw RangeError(`Invalid release`)}else if(n.type===`grab`||n.type===`drag`){if(![n.x,n.y].every(Number.isFinite))throw RangeError(`Invalid pointer`)}else throw RangeError(`Invalid card action`)}}function $t(e,t){for(let n of t){if(n.type===`settle`){qe(e.bodies,e.width,e.height),e.offsets.clear();continue}let t=e.bodies[n.index];if(n.type===`release`)Te(t,n.throwCard),e.offsets.delete(n.index);else if(n.type===`grab`){let r=Ce(t,n.x,n.y);e.offsets.set(n.index,{x:r.x-n.x,y:r.y-n.y})}else{let r=e.offsets.get(n.index);r&&we(t,n.x+r.x,n.y+r.y)}}}async function en(e,t,n,r=[]){if(Qt(e,r),Q.requested===`wasm`&&Z)try{let n=Z.solve(e,t,r),i=Z.metrics;return Q.wasmCalls=i.calls,Q.wasmMs=i.kernelMs,Q.wasmPackMs=i.packMs,Q.wasmValidationMs=i.validationMs,Q.wasmBytes=i.bytes,Q.accepted++,n}catch(e){Q.rejected++,Kt(e)}return $t(e,r),Zt(e,t,n)}function tn(e){let t=new Float64Array(2*e.length);for(let n=0;n<e.length;n++)t[2*n]=e[n].x,t[2*n+1]=e[n].y;return t}function nn(e,t){for(let n=0;n<e.length;n++)t[2*n]=e[n].x,t[2*n+1]=e[n].y}function rn(e,t){if(2*e.length!==t.length)return!1;for(let n=0;n<e.length;n++){let{x:r,y:i}=e[n];if(!Object.is(r,t[2*n])||!Object.is(i,t[2*n+1]))return!1}return!0}function an(e,t){return t?.length===e.length?(t.set(e),t):e.slice()}function on(e){if(J&&e.generation<J.generation)throw Error(`Stale init generation`);if(![e.width,e.height].every(e=>Number.isFinite(e)&&e>0))throw RangeError(`Invalid world dimensions`);let t=e.cards,n=t.map(e=>e.points.map(({x:e,y:t})=>{if(![e,t].every(Number.isFinite))throw RangeError(`Invalid matrix point`);return{x:e,y:t}}));return{generation:e.generation,width:e.width,height:e.height,bodies:t.map(({x:e,y:t,width:n,height:r,meshLevel:i,physics:a})=>he(e,t,n,r,c(i),a)),points:n,offsets:/* @__PURE__ */ new Map,poses:[]}}function sn(e,t,n){let r=e.bodies.map((t,r)=>{let i=_e(t),a=ge(t),o=e.poses[r],{x:s,y:c,vx:l,vy:u}=t;return{body:t,index:r,mesh:i,material:a,previous:o,x:s,y:c,vx:l,vy:u,changed:n||!o||o.mesh!==i||!Object.is(o.x,s)||!Object.is(o.y,c)||!Object.is(o.vx,l)||!Object.is(o.vy,u)||!rn(a.nodes,o.physical)||!rn(i.nodes,o.nodes)||!rn(i.boundary,o.boundary),points:e.points[r]}}),i=r.reduce((e,t)=>t.changed?e+2*t.material.nodes.length+2*t.mesh.nodes.length+2*t.mesh.boundary.length+6*t.points.length:e,0),a=new Float64Array(i);i&&t.push(a.buffer);let o=0;return r.map(({body:r,index:i,mesh:s,material:c,previous:l,x:u,y:d,vx:f,vy:p,changed:m,points:h})=>{if(!m)return null;let g=a.subarray(o,o+=2*c.nodes.length),_=a.subarray(o,o+=2*s.nodes.length),v=a.subarray(o,o+=2*s.boundary.length),y=a.subarray(o,o+=6*h.length);nn(c.nodes,g),nn(s.nodes,_),nn(s.boundary,v);for(let e=0;e<h.length;e++){let t=h[e];Ye(r,t.x,t.y,y,6*e)}let b={x:u,y:d,vx:f,vy:p,physical:g,nodes:_,boundary:v,pointMatrices:y,matrix:Xe(r)};if(n||l?.mesh!==s){let e=tn(s.rest),n=new Uint32Array(3*s.triangles.length);s.triangles.forEach((e,t)=>n.set(e,3*t)),b.topology={rest:e,triangles:n,physicalNodeCount:s.physicalNodeCount,elementCount:s.elementCount,order:s.order},t.push(e.buffer,n.buffer)}return e.poses[i]={mesh:s,x:u,y:d,vx:f,vy:p,physical:an(g,l?.physical),nodes:an(_,l?.nodes),boundary:an(v,l?.boundary)},b})}async function cn(e){try{let t=performance.now(),n,r;if(e.type===`init`){Q.requested=e.compute??`cpu`;let t=on(e);X=t.bodies.every(e=>{let t=ge(e);return t.nodes.length===41&&t.elements.length===16}),$(),Q.requested===`wasm`?qt():X&&Xt(Q.requested),n=performance.now(),r=await en(t,1/120,0),J=t}else{if(!J||e.generation!==J.generation)throw Error(`Unknown or stale step generation`);if(![e.elapsed,e.time].every(Number.isFinite)||e.elapsed<0)throw RangeError(`Invalid step time`);n=performance.now(),r=await en(J,e.elapsed,e.time,e.actions)}let i=performance.now()-n,a=[],o=sn(J,a,xt(e));q.postMessage({type:`frame`,generation:e.generation,id:e.id,active:r,stepMs:performance.now()-t,physicsMs:i,compute:{...Q},cards:o},a)}catch(t){q.postMessage({type:`error`,generation:e.generation,id:e.id,message:t instanceof Error?t.message:String(t)},[])}}let ln=Promise.resolve();q.onmessage=({data:e})=>{ln=ln.then(()=>cn(e))}})();