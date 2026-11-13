import{o as e}from"./index-CKZKtY8S.js";import{Ft as t,L as n,Nt as r,R as i,S as a,T as o,c as s,f as c,g as l,ht as u,jt as d,l as ee,m as te,mt as f,n as ne,p as re,q as p,st as m,u as h,yt as g}from"./three.module-DJ-Z1bjf.js";var _=`
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
    vec3 pos = position;
    vec2 scale = 1.0 - boundarySpace * 2.0;
    pos.xy = pos.xy * scale;
    uv = vec2(0.5) + (pos.xy) * 0.5;
    gl_Position = vec4(pos, 1.0);
  }
`,ie=`
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
    vec3 pos = position;
    uv = 0.5 + pos.xy * 0.5;
    vec2 n = sign(pos.xy);
    pos.xy = abs(pos.xy) - px * 1.0;
    pos.xy *= n;
    gl_Position = vec4(pos, 1.0);
  }
`,ae=`
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  uniform vec2 center;
  uniform vec2 scale;
  uniform vec2 px;
  varying vec2 vUv;
  void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
  }
`,oe=`
  precision highp float;
  uniform sampler2D velocity;
  uniform float dt;
  uniform bool isBFECC;
  uniform vec2 fboSize;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
      vec2 vel = texture2D(velocity, uv).xy;
      vec2 uv2 = uv - vel * dt * ratio;
      gl_FragColor = vec4(texture2D(velocity, uv2).xy, 0.0, 0.0);
    } else {
      vec2 vel_old = texture2D(velocity, uv).xy;
      vec2 spot_old = uv - vel_old * dt * ratio;
      vec2 vel_new1 = texture2D(velocity, spot_old).xy;
      vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
      vec2 spot_new3 = uv - (spot_new2 - uv) / 2.0;
      vec2 vel_2 = texture2D(velocity, spot_new3).xy;
      vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
      gl_FragColor = vec4(texture2D(velocity, spot_old2).xy, 0.0, 0.0);
    }
  }
`,se=`
  precision highp float;
  uniform sampler2D velocity;
  uniform sampler2D palette;
  uniform vec4 bgColor;
  varying vec2 uv;
  void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    gl_FragColor = vec4(mix(bgColor.rgb, c, lenv), mix(bgColor.a, 1.0, lenv));
  }
`,ce=`
  precision highp float;
  uniform sampler2D velocity;
  uniform float dt;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    float x0 = texture2D(velocity, uv - vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv + vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv - vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv + vec2(0.0, px.y)).y;
    gl_FragColor = vec4((x1 - x0 + y1 - y0) * 0.5 / dt);
  }
`,le=`
  precision highp float;
  uniform vec2 force;
  uniform vec2 center;
  uniform vec2 scale;
  uniform vec2 px;
  varying vec2 vUv;
  void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
  }
`,ue=`
  precision highp float;
  uniform sampler2D pressure;
  uniform sampler2D divergence;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    gl_FragColor = vec4((p0 + p1 + p2 + p3) / 4.0 - texture2D(divergence, uv).r);
  }
`,de=`
  precision highp float;
  uniform sampler2D pressure;
  uniform sampler2D velocity;
  uniform vec2 px;
  uniform float dt;
  varying vec2 uv;
  void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y)).r;
    vec2 v = texture2D(velocity, uv).xy - vec2(p0 - p1, p2 - p3) * 0.5 * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
  }
`,fe=`
  precision highp float;
  uniform sampler2D velocity;
  uniform sampler2D velocity_new;
  uniform float v;
  uniform vec2 px;
  uniform float dt;
  varying vec2 uv;
  void main(){
    vec2 old  = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    gl_FragColor = vec4((4.0 * old + v * dt * (new0 + new1 + new2 + new3)) / (4.0 * (1.0 + v * dt)), 0.0, 0.0);
  }
`,pe={colors:[`#5227FF`,`#FF9FFC`,`#B497CF`],mouseForce:20,cursorSize:100,isViscous:!1,viscous:30,iterationsViscous:32,iterationsPoisson:32,dt:.014,BFECC:!0,resolution:.5,isBounce:!1,autoDemo:!0,autoSpeed:.5,autoIntensity:2.2,takeoverDuration:.25,autoResumeDelay:1e3,autoRampDuration:.6};function me(e){let t=e.length===0?[`#fff`,`#fff`]:e.length===1?[e[0],e[0]]:[...e],n=new Uint8Array(t.length*4);t.forEach((e,t)=>{let r=new te(e);n[t*4]=Math.round(r.r*255),n[t*4+1]=Math.round(r.g*255),n[t*4+2]=Math.round(r.b*255),n[t*4+3]=255});let r=new l(n,t.length,1,f);return r.magFilter=r.minFilter=i,r.wrapS=r.wrapT=c,r.generateMipmaps=!1,r.needsUpdate=!0,r}function v(e,n){return new t(e,n,{type:/(iPad|iPhone|iPod)/i.test(navigator.userAgent)?o:a,depthBuffer:!1,stencilBuffer:!1,minFilter:i,magFilter:i,wrapS:c,wrapT:c})}function y(e,t,n,r,i){let a=new g,o=new h,s=new u({vertexShader:t,fragmentShader:n,uniforms:r});return a.add(new p(new m(2,2),s)),{uniforms:r,render(t=i){e.setRenderTarget(t),e.render(a,o),e.setRenderTarget(null)}}}function b(t,i={}){if(!e())return null;let a={...pe,...i},o=new ne({antialias:!0,alpha:!0});o.autoClear=!1,o.setClearColor(0,0),o.setPixelRatio(Math.min(window.devicePixelRatio,2)),Object.assign(o.domElement.style,{position:`absolute`,inset:`0`,width:`100%`,height:`100%`,display:`block`,pointerEvents:`none`}),t.appendChild(o.domElement);let c=new re(!0),l=me(a.colors),te=new r(0,0,0,0),f=1,b=1;function he(){let e=t.getBoundingClientRect();f=Math.max(1,Math.floor(e.width)),b=Math.max(1,Math.floor(e.height)),o.setSize(f,b,!1)}he();function x(){return new d(Math.max(1,Math.round(a.resolution*f)),Math.max(1,Math.round(a.resolution*b)))}function ge(e,t){return new d(1/e,1/t)}let S=x(),C=ge(S.x,S.y),w=new d,T={vel0:v(S.x,S.y),vel1:v(S.x,S.y),velV0:v(S.x,S.y),velV1:v(S.x,S.y),div:v(S.x,S.y),p0:v(S.x,S.y),p1:v(S.x,S.y)},E={boundarySpace:{value:C},px:{value:C},fboSize:{value:S},velocity:{value:T.vel0.texture},dt:{value:a.dt},isBFECC:{value:!0}},D=new g,_e=new h,ve=new u({vertexShader:_,fragmentShader:oe,uniforms:E});D.add(new p(new m(2,2),ve));let ye=new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]),be=new ee;be.setAttribute(`position`,new s(ye,3));let xe=new n(be,new u({vertexShader:ie,fragmentShader:oe,uniforms:E}));D.add(xe);function Se(){xe.visible=a.isBounce,E.dt.value=a.dt,E.isBFECC.value=a.BFECC,o.setRenderTarget(T.vel1),o.render(D,_e),o.setRenderTarget(null)}let O=new g,Ce=new h,k={px:{value:C},force:{value:new d},center:{value:new d},scale:{value:new d(a.cursorSize,a.cursorSize)}},we=new p(new m(1,1),new u({vertexShader:ae,fragmentShader:le,blending:2,depthWrite:!1,uniforms:k}));O.add(we);function Te(e,t){let n=t.x/2*a.mouseForce,r=t.y/2*a.mouseForce,i=a.cursorSize*C.x,s=a.cursorSize*C.y;k.force.value.set(n,r),k.center.value.set(Math.min(Math.max(e.x,-1+i+C.x*2),1-i-C.x*2),Math.min(Math.max(e.y,-1+s+C.y*2),1-s-C.y*2)),k.scale.value.set(a.cursorSize,a.cursorSize),o.setRenderTarget(T.vel1),o.render(O,Ce),o.setRenderTarget(null)}let A={boundarySpace:{value:w},px:{value:C},velocity:{value:T.vel1.texture},velocity_new:{value:T.velV0.texture},v:{value:a.viscous},dt:{value:a.dt}},Ee=y(o,_,fe,A,T.velV1);function De(){A.v.value=a.viscous,A.dt.value=a.dt;let e=T.velV1;for(let t=0;t<a.iterationsViscous;t++){let n=t%2==0;e=n?T.velV1:T.velV0,A.velocity_new.value=(n?T.velV0:T.velV1).texture,Ee.render(e)}return e}let j=y(o,_,ce,{boundarySpace:{value:w},px:{value:C},velocity:{value:T.vel1.texture},dt:{value:a.dt}},T.div),M={boundarySpace:{value:w},px:{value:C},pressure:{value:T.p0.texture},divergence:{value:T.div.texture}},Oe=y(o,_,ue,M,T.p1);function ke(){let e=T.p1;for(let t=0;t<a.iterationsPoisson;t++){let n=t%2==0;e=n?T.p1:T.p0,M.pressure.value=(n?T.p0:T.p1).texture,Oe.render(e)}return e}let N={boundarySpace:{value:w},px:{value:C},pressure:{value:T.p0.texture},velocity:{value:T.vel1.texture},dt:{value:a.dt}},Ae=y(o,_,de,N,T.vel0),je=y(o,_,se,{velocity:{value:T.vel0.texture},boundarySpace:{value:new d},palette:{value:l},bgColor:{value:te}},null),P=new d,F=new d,I=new d,Me=new d,L=new d,R=!1,z=!1,Ne=0,B=!1,V=!1;function H(e,n){let r=t.getBoundingClientRect();!r.width||!r.height||P.set((e-r.left)/r.width*2-1,-((n-r.top)/r.height*2-1))}function U(e,n){let r=t.getBoundingClientRect();return R=!!(r.width&&e>=r.left&&e<=r.right&&n>=r.top&&n<=r.bottom),R}let W=performance.now();function Pe(e){if(U(e.clientX,e.clientY)){if(W=performance.now(),V&&!B&&!z){let n=t.getBoundingClientRect();Me.copy(P),L.set((e.clientX-n.left)/n.width*2-1,-((e.clientY-n.top)/n.height*2-1)),Ne=performance.now(),z=!0,B=!0,V=!1;return}H(e.clientX,e.clientY),B=!0}}function Fe(e){let t=e.touches[0];!t||!U(t.clientX,t.clientY)||(W=performance.now(),H(t.clientX,t.clientY),B=!0)}function Ie(e){let t=e.touches[0];!t||!U(t.clientX,t.clientY)||H(t.clientX,t.clientY)}function Le(){R=!1}function Re(){R=!1}window.addEventListener(`mousemove`,Pe),window.addEventListener(`touchstart`,Fe,{passive:!0}),window.addEventListener(`touchmove`,Ie,{passive:!0}),window.addEventListener(`touchend`,Le),document.addEventListener(`mouseleave`,Re);function ze(){if(z){let e=(performance.now()-Ne)/(a.takeoverDuration*1e3);e>=1?(z=!1,P.copy(L),F.copy(P),I.set(0,0)):P.copy(Me).lerp(L,e*e*(3-2*e))}I.subVectors(P,F),F.copy(P),F.x===0&&F.y===0&&I.set(0,0),V&&!z&&I.multiplyScalar(a.autoIntensity)}let G=new d,Be=new d,K=!1,q=0,Ve=0;function He(){Be.set((Math.random()*2-1)*.8,(Math.random()*2-1)*.8)}He();function Ue(){if(!a.autoDemo)return;let e=performance.now();if(e-W<a.autoResumeDelay||R){K&&(K=!1,V=!1);return}K||(K=!0,G.copy(P),q=Ve=e),V=!0;let t=Math.min((e-q)/1e3,.2);q=e;let n=a.autoRampDuration*1e3,r=n>0?(e=>e*e*(3-2*e))(Math.min(1,(e-Ve)/n)):1,i=Be.clone().sub(G),o=i.length();if(o<.01){He();return}G.addScaledVector(i.normalize(),Math.min(a.autoSpeed*t*r,o)),P.copy(G)}function We(){S=x(),C=ge(S.x,S.y),Object.values(T).forEach(e=>e.setSize(S.x,S.y)),E.px.value=C,E.boundarySpace.value=C,E.fboSize.value=S,k.px.value=C,[A,j.uniforms,M,N].forEach(e=>{e.px&&(e.px.value=C)})}function Ge(){w.set(a.isBounce?0:C.x,a.isBounce?0:C.y),Se(),Te(P,I);let e=T.vel1;a.isViscous&&(A.velocity.value=T.vel1.texture,e=De()),j.uniforms.velocity.value=e.texture,j.render();let t=ke();N.pressure.value=t.texture,N.velocity.value=e.texture,Ae.render(),je.uniforms.velocity.value=T.vel0.texture,je.render(null)}let J=0,Y=!1;function Ke(){Y&&(c.getDelta(),Ue(),ze(),Ge(),J=requestAnimationFrame(Ke))}function X(){Y||(Y=!0,Ke())}function Z(){Y=!1,cancelAnimationFrame(J),J=0}let Q=0,qe=new ResizeObserver(()=>{cancelAnimationFrame(Q),Q=requestAnimationFrame(()=>{he(),We()})});qe.observe(t);let $=!0,Je=new IntersectionObserver(e=>{$=(e[0]?.isIntersecting??!1)&&(e[0]?.intersectionRatio??0)>0,$&&!document.hidden?X():Z()},{threshold:[0,.01]});Je.observe(t);function Ye(){document.hidden?Z():$&&X()}return document.addEventListener(`visibilitychange`,Ye),X(),{dispose(){Z(),cancelAnimationFrame(Q),qe.disconnect(),Je.disconnect(),window.removeEventListener(`mousemove`,Pe),window.removeEventListener(`touchstart`,Fe),window.removeEventListener(`touchmove`,Ie),window.removeEventListener(`touchend`,Le),document.removeEventListener(`mouseleave`,Re),document.removeEventListener(`visibilitychange`,Ye),Object.values(T).forEach(e=>e.dispose()),l.dispose(),o.dispose(),o.domElement.remove()}}}export{b as createFluidBg};