/* ================= 29차 (마): 상점 — 입어 보기·적용 · 무늬 옷 6벌 · 모자·눈 장식·등 장식 · 손 과자는 막대사탕으로 ================= */
// 정리: 손에 든 과자는 막대사탕 하나로 · 별로인 머리띠는 빼고 코인을 돌려줘요
{const gone={hand:['cane','cotton','cone'],hat:['ribbon','antenna','horn','star']};let back=0;
  for(const cat in gone)for(const id of gone[cat]){const it=SHOP[cat]&&SHOP[cat].items[id];if(!it)continue;if(SAVE.own[cat+':'+id]&&!SAVE.refund29)back+=it[1];delete SHOP[cat].items[id];delete SAVE.own[cat+':'+id];if(SAVE.eq[cat]===id)SAVE.eq[cat]=DEF_EQ[cat]}
  if(!SAVE.refund29){SAVE.refund29=1;if(back){SAVE.coins+=back;SAVE.refundMsg2=back}saveGame()}}
SAVE.eq.hand='lolli';
// 옷: 기본 민트 + 무늬 옷 6벌
{const old=SHOP.cloth.items;SHOP.cloth.t='도둑 옷';SHOP.cloth.items={mint:['민트',0],cake:['딸기',300],mintchoco:['민트초코',300],macaron:['마카롱',300],cloud:['솜사탕',300],halloween:['할로윈',300],xmas:['크리스마스',300]};for(const k in old)if(!SHOP.cloth.items[k]&&SAVE.eq.cloth===k)SAVE.eq.cloth='mint'}
Object.assign(CLOTH_HSV,{cake:[352,.85,1.15],mintchoco:[165,.5,1.3],macaron:[330,.35,1.4],cloud:[320,.3,1.45],halloween:[26,1,1.25],xmas:[355,.9,1.05]});
// 모자 (머리띠와 같은 칸)
SHOP.hat.t='모자';Object.assign(SHOP.hat.items,{beret:['생크림 베레모',250],cupcake:['컵케이크 모자',250],cone:['아이스크림콘 모자',250],crown:['쿠키 왕관',300],witch:['작은 마녀 모자',250],santa:['산타 모자',250],berry:['딸기 꼭지 모자',250],pudding:['푸딩 모자',250]});
// 눈 장식
SHOP.eye={t:'눈 장식',items:{band:['도둑 눈 띠',0],none:['없음',0],heart:['하트 선글라스',200],star:['별 안경',200],round:['동그란 뿔테 안경',200],goggle:['수영 고글',200],mono:['외눈 안경',200],donut:['도넛 안경',250],masq:['가면무도회 가면',250]}};
DEF_EQ.eye='band';SAVE.own['eye:band']=1;SAVE.own['eye:none']=1;if(!SAVE.eq.eye||!SHOP.eye.items[SAVE.eq.eye])SAVE.eq.eye='band';
// 등에 메는 것
SHOP.back.t='등 장식';Object.assign(SHOP.back.items,{wafer:['웨이퍼 나비 날개',300],shield:['쿠키 방패',250],umbrella:['막대사탕 우산',250],balloon:['풍선 다발',250],gummy:['젤리곰 인형',250],rocket:['초코 로켓',300],cakebox:['케이크 상자 가방',250]});
SHOPTAB.thief=['cloth','hat','eye','back'];
if(SAVE.dev)for(const cat in SHOP)for(const id in SHOP[cat].items)SAVE.own[cat+':'+id]=1;
saveGame();

/* ----- 무늬 옷: 옷 부분에만 무늬를 그려요 (망토·모자 없이) ----- */
const PATID={cake:1,mintchoco:2,macaron:3,cloud:4,halloween:5,xmas:6};
function markCloth(t,src,test){if(!t||t.__pm)return t;try{const img=src.image,cv=document.createElement('canvas');cv.width=img.width;cv.height=img.height;const g=cv.getContext('2d');g.drawImage(img,0,0);const o=g.getImageData(0,0,cv.width,cv.height).data;
  const tc=t.image.getContext('2d'),d=tc.getImageData(0,0,cv.width,cv.height),a=d.data;let sum=0,n=0;
  for(let i=0;i<a.length;i+=4)if(test(o[i]/255,o[i+1]/255,o[i+2]/255)){a[i+3]=248;sum+=Math.max(a[i],a[i+1],a[i+2])/255;n++}
  tc.putImageData(d,0,0);t.needsUpdate=true;t.__pm=1;t.__base=Math.pow(n?sum/n:.8,2.2)}catch(e){}return t}
{const ct2=clothTex;clothTex=function(id){const t=ct2(id);if(!t||!PATID[id])return t;let src=null;POOL.hero.scene.traverse(o=>{if(!src&&o.isMesh&&o.material&&o.material.map)src=o.material.map});
  markCloth(t,src,(r,g,b)=>{const mx=Math.max(r,g,b),mn=Math.min(r,g,b),dl=mx-mn;if(dl<.1||mx<.08)return false;let h=mx===r?((g-b)/dl)%6:mx===g?(b-r)/dl+2:(r-g)/dl+4;h*=60;if(h<0)h+=360;return h>=88&&h<=172});t.__pat=id;return t}}
{const bt2=bodyTex;bodyTex=function(bk,cl){const t=bt2(bk,cl);if(!t||!PATID[cl])return t;let src=null;POOL[BODY[bk].pool].scene.traverse(o=>{if(!src&&o.isMesh&&o.material&&o.material.map)src=o.material.map});const R=BODY[bk].prim||[];
  markCloth(t,src,(r,g,b)=>{const[h,s,v]=rgb2hsv(r,g,b);return s>.22&&v>.08&&R.some(([lo,hi])=>h>=lo&&h<=hi)});t.__pat=cl;return t}}
const PAT_GLSL=`
vec3 sL(vec3 c){return pow(c,vec3(2.2));}
float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 patCol(vec3 p,int id){
  float a=atan(p.x,p.z)/6.2832+.5; float y=p.y;
  if(id==1){ // 딸기: 빨강 + 노란 씨 + 초록 꽃받침 깃
    vec3 c=sL(vec3(.91,.21,.31)); vec2 q=vec2(a*14.,y*26.); q.x+=.5*mod(floor(q.y),2.); vec2 f=fract(q)-.5;
    if(length(f*vec2(1.,.75))<.17) c=sL(vec3(1.,.88,.4));
    float lf=uNeck-.035-.05*abs(fract(a*16.)-.5)*2.; if(y>lf&&y<uNeck+.03) c=sL(vec3(.25,.75,.43));
    return c;}
  if(id==2){ // 민트초코: 민트 + 초코칩
    vec3 c=sL(vec3(.6,.9,.81)); vec2 q=vec2(a*12.,y*22.); vec2 cell=floor(q); vec2 f=fract(q)-.5; float r=h21(cell);
    if(r>.35){float an=r*6.28; vec2 g=mat2(cos(an),-sin(an),sin(an),cos(an))*(f-vec2(h21(cell+3.)-.5,h21(cell+7.)-.5)*.35); if(abs(g.x)<.17&&abs(g.y)<.1) c=sL(vec3(.32,.18,.1));}
    return c;}
  if(id==3){ // 마카롱: 분홍 위 · 하늘 아래 · 가운데 크림 띠
    float w=uWaist+.012*sin(a*6.2832*10.);
    if(y>w+.03) return sL(vec3(1.,.7,.84)); if(y<w-.03) return sL(vec3(.66,.88,1.));
    return sL(vec3(1.,.97,.92));}
  if(id==4){ // 솜사탕: 위는 분홍, 아래는 하늘 + 몽글몽글
    float t=smoothstep(.15,.75,y); vec3 c=mix(sL(vec3(.66,.86,1.)),sL(vec3(1.,.72,.86)),t);
    vec2 q=vec2(a*10.,y*16.); vec2 cell=floor(q); vec2 f=fract(q)-.5-(vec2(h21(cell),h21(cell+5.))-.5)*.4;
    float d=length(f); if(d<.28+.1*h21(cell+9.)) c=mix(c,vec3(1.),.45*(1.-d*2.));
    return c;}
  if(id==5){ // 할로윈: 호박 줄무늬 + 박쥐 무늬
    vec3 c=sL(vec3(1.,.55,.13)); if(abs(fract(a*12.)-.5)>.43) c=sL(vec3(.8,.34,.04));
    vec2 q=vec2(a*5.,y*7.); vec2 cell=floor(q); if(mod(cell.x+cell.y,2.)<.5){ vec2 f=(fract(q)-.5)*vec2(1.,.6); float ax=abs(f.x);
      float top=.1+.5*ax-1.6*ax*ax, bot=-.12+.35*ax-.09*abs(sin(ax*9.42));
      bool wing=ax<.42&&f.y<top&&f.y>bot; bool body=length(f*vec2(1.,.75))<.09; bool ear=ax>.02&&ax<.075&&f.y>.05&&f.y<.16-ax;
      if(wing||body||ear) c=sL(vec3(.2,.08,.26)); }
    return c;}
  // 크리스마스: 빨강·하양 사탕 줄무늬 + 초록 깃
  float s=fract(y*16.+a*4.); vec3 c=s<.5?sL(vec3(.91,.21,.31)):sL(vec3(1.,.97,.93));
  if(y>uNeck-.03&&y<uNeck+.03) c=sL(vec3(.18,.68,.42));
  return c;}`;
function patMat(mesh,id,y0,H){const m=mesh.material,base=(m.map&&m.map.__base)||.5;
  const M=mesh.matrixWorld.clone();m.onBeforeCompile=sh=>{sh.uniforms.uM={value:M};sh.uniforms.uY0={value:y0};sh.uniforms.uH={value:H};sh.uniforms.uB={value:base};sh.uniforms.uNeck={value:PATNECK};sh.uniforms.uWaist={value:PATWAIST};
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vCP;uniform mat4 uM;').replace('#include <skinning_vertex>','#include <skinning_vertex>\nvCP=(uM*vec4(transformed,1.)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vCP;uniform float uY0,uH,uB,uNeck,uWaist;'+PAT_GLSL)
      .replace('#include <map_fragment>',`#include <map_fragment>
#ifdef USE_MAP
if(texelColor.a<.99){vec3 pp=vec3(vCP.x/uH,(vCP.y-uY0)/uH,vCP.z/uH);float shd=clamp(max(max(texelColor.r,texelColor.g),texelColor.b)/uB,.5,1.3);diffuseColor.rgb=patCol(pp,${PATID[id]})*shd;diffuseColor.a=1.;}
#endif`)};
  m.customProgramCacheKey=()=>'pat'+id;m.needsUpdate=true}
let PATNECK=.555,PATWAIST=.44;
{const mh2=makeHero;makeHero=function(height,look){look=look||DEF_EQ;const m=mh2(height,Object.assign({},look,{hand:'lolli'}));const id=look.cloth;
  // 눈 띠는 고를 수 있어요
  const eye=look.eye||'band';m.g.traverse(o=>{if(o.name==='EyeBand')o.visible=eye==='band'});
  if(eye!=='band'&&eye!=='none'){const hb=findBone(m.g,'head');if(hb){const ws=new THREE.Vector3();hb.getWorldScale(ws);const hold=new THREE.Group();hold.scale.setScalar(1/(ws.x||1));const e=eyeMesh(eye);e.position.set(0,EYEY,EYEZ);e.scale.setScalar(1.3);hold.add(e);hb.add(hold)}}
  if(PATID[id]){m.g.updateMatrixWorld(true);m.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.map&&o.material.map.__pat)patMat(o,id,0,height||1.85)})}
  return m}}
function findBone(root,name){let b=null;root.traverse(o=>{if(!b&&o.name===name)b=o});return b}
// 무늬 옷은 망토·모자 장식 없이 무늬만
{const cd9=clothDeco;clothDeco=function(id,att){if(PATID[id])return;return cd9(id,att)}}
{const hi9=handItem;handItem=function(){return hi9('lolli')}}

/* ----- 눈 장식 (머리 뼈 기준 · 앞쪽 +Z) ----- */
let EYEY=.3,EYEZ=.42;
function shapeMesh(sh,col,depth){const g=depth?new THREE.ExtrudeGeometry(sh,{depth,bevelEnabled:false}):new THREE.ShapeGeometry(sh);return new THREE.Mesh(g,typeof col==='string'?new THREE.MeshLambertMaterial({color:col,side:THREE.DoubleSide}):col)}
function heartShape(s){const h=new THREE.Shape();h.moveTo(0,-.9*s);h.bezierCurveTo(-1.1*s,-.1*s,-.9*s,.8*s,0,.35*s);h.bezierCurveTo(.9*s,.8*s,1.1*s,-.1*s,0,-.9*s);return h}
function starShape(r1,r2){const h=new THREE.Shape();for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,r=i%2?r2:r1;i?h.lineTo(Math.cos(a)*r,Math.sin(a)*r):h.moveTo(Math.cos(a)*r,Math.sin(a)*r)}return h}
function eyeMesh(id){const g=new THREE.Group(),dx=.12;
  const lens=(c,o)=>new THREE.MeshPhongMaterial({color:c,transparent:true,opacity:o,shininess:90,side:THREE.DoubleSide});
  if(id==='heart'){for(const s of[-1,1]){const f=shapeMesh(heartShape(.1),'#ff5f9e',.02);f.position.set(s*dx,0,0);g.add(f);const l=shapeMesh(heartShape(.075),lens('#5a1030',.85));l.position.set(s*dx,0,.025);g.add(l)}const br=new THREE.Mesh(new THREE.BoxGeometry(.06,.015,.015),LM('#ff5f9e'));br.position.set(0,.02,.01);g.add(br)}
  else if(id==='star'){for(const s of[-1,1]){const f=shapeMesh(starShape(.12,.06),'#ffd35f',.02);f.position.set(s*dx,0,0);g.add(f);const l=shapeMesh(starShape(.085,.042),lens('#a8e0ff',.6));l.position.set(s*dx,0,.025);g.add(l)}const br=new THREE.Mesh(new THREE.BoxGeometry(.05,.015,.015),LM('#ffd35f'));br.position.set(0,.02,.01);g.add(br)}
  else if(id==='round'){for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.TorusGeometry(.075,.016,8,24),LM('#6a3a1a'));f.position.set(s*dx,0,0);g.add(f);const l=new THREE.Mesh(new THREE.CircleGeometry(.07,20),lens('#e0f2ff',.35));l.position.set(s*dx,0,0);g.add(l)}const br=new THREE.Mesh(new THREE.TorusGeometry(.03,.012,6,10,Math.PI),LM('#6a3a1a'));br.position.set(0,.01,0);g.add(br)}
  else if(id==='goggle'){const st=new THREE.Mesh(new THREE.TorusGeometry(.3,.03,6,30),LM('#3f9bff'));st.rotation.x=Math.PI/2;st.scale.set(1,1.15,1);st.position.set(0,0,-.27);g.add(st);for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.06,20),LM('#ffd35f'));f.rotation.x=Math.PI/2;f.position.set(s*dx,0,.01);g.add(f);const l=new THREE.Mesh(new THREE.CircleGeometry(.075,20),lens('#7cc6ff',.65));l.position.set(s*dx,0,.045);g.add(l)}}
  else if(id==='mono'){const f=new THREE.Mesh(new THREE.TorusGeometry(.08,.016,8,24),LM('#ffc94a'));f.position.set(dx,0,0);g.add(f);const l=new THREE.Mesh(new THREE.CircleGeometry(.075,20),lens('#e0f2ff',.4));l.position.set(dx,0,0);g.add(l);for(let k=0;k<6;k++){const c=new THREE.Mesh(new THREE.SphereGeometry(.012,6,4),LM('#ffc94a'));c.position.set(dx+.07+k*.012,-.07-k*.035,-.01);g.add(c)}}
  else if(id==='donut'){const sp=['#ff5f9e','#7cc6ff','#ffd35f','#7ee8a8'];for(const s of[-1,1]){const d=new THREE.Mesh(new THREE.TorusGeometry(.075,.034,10,24),LM('#e3a659'));d.position.set(s*dx,0,0);g.add(d);const ic=new THREE.Mesh(new THREE.TorusGeometry(.075,.03,8,24),LM('#ff9ec7'));ic.position.set(s*dx,0,.012);ic.scale.z=.6;g.add(ic);for(let k=0;k<6;k++){const a=k*1.05,q=new THREE.Mesh(new THREE.BoxGeometry(.022,.008,.008),LM(sp[k%4]));q.position.set(s*dx+Math.cos(a)*.075,Math.sin(a)*.075,.035);q.rotation.z=a+1;g.add(q)}}const br=new THREE.Mesh(new THREE.BoxGeometry(.05,.016,.016),LM('#e3a659'));br.position.set(0,.01,0);g.add(br)}
  else if(id==='masq'){const sh=new THREE.Shape();sh.moveTo(-.25,.02);sh.bezierCurveTo(-.24,.12,-.08,.1,0,.05);sh.bezierCurveTo(.08,.1,.24,.12,.25,.02);sh.bezierCurveTo(.22,-.1,.06,-.1,0,-.04);sh.bezierCurveTo(-.06,-.1,-.22,-.1,-.25,.02);
    for(const s of[-1,1]){const hole=new THREE.Path();hole.absellipse(s*.12,.01,.045,.03,0,Math.PI*2,false);sh.holes.push(hole)}const m=shapeMesh(sh,'#8a4dff',.015);g.add(m);
    for(const s of[-1,1]){const gm=new THREE.Mesh(new THREE.SphereGeometry(.018,8,6),LM('#ffd35f'));gm.position.set(s*.22,.07,.02);g.add(gm)}const fe=new THREE.Mesh(new THREE.ConeGeometry(.03,.18,6),LM('#ff7eb6'));fe.position.set(.24,.15,0);fe.rotation.z=-.5;g.add(fe)}
  return g}

/* ----- 모자 새로 (머리 위에 딱 붙게) ----- */
{const hm9=hatMesh;hatMesh=function(id){const g=new THREE.Group();
  if(id==='beret'){const b=new THREE.Mesh(new THREE.SphereGeometry(.36,20,12),LM('#fff6ee'));b.scale.set(1,.32,1);b.position.set(.04,.04,0);b.rotation.z=-.18;g.add(b);const n=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),LM('#fff6ee'));n.position.set(.06,.16,0);g.add(n);
    const sw=new THREE.Mesh(new THREE.TorusGeometry(.08,.03,8,16),LM('#ffd6ea'));sw.rotation.x=Math.PI/2;sw.position.set(-.1,.12,.12);g.add(sw);const ch=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),LM('#e8364f'));ch.position.set(-.1,.17,.12);g.add(ch)}
  else if(id==='crown'){const ring=new THREE.Mesh(new THREE.CylinderGeometry(.27,.29,.13,20,1,true),new THREE.MeshLambertMaterial({color:'#d99a55',side:THREE.DoubleSide}));ring.position.y=.06;g.add(ring);const cush=new THREE.Mesh(new THREE.SphereGeometry(.27,20,10,0,Math.PI*2,0,Math.PI*.5),LM('#e8364f'));cush.scale.y=.6;cush.position.y=.04;g.add(cush);
    for(let k=0;k<6;k++){const a=k/6*Math.PI*2;const sp=new THREE.Mesh(new THREE.ConeGeometry(.07,.15,8),LM('#d99a55'));sp.position.set(Math.cos(a)*.27,.2,Math.sin(a)*.27);g.add(sp);const gm=new THREE.Mesh(new THREE.SphereGeometry(.045,10,8),LM(['#ff5f9e','#7cc6ff','#7ee8c8'][k%3]));gm.position.set(Math.cos(a)*.27,.29,Math.sin(a)*.27);g.add(gm);
      const chip=new THREE.Mesh(new THREE.BoxGeometry(.04,.03,.02),LM('#4a2a1a'));chip.position.set(Math.cos(a+.5)*.29,.06,Math.sin(a+.5)*.29);chip.rotation.y=-a;g.add(chip)}}
  else if(id==='witch'){const br=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.03,24),LM('#5a2fc0'));g.add(br);const c=new THREE.Mesh(new THREE.ConeGeometry(.24,.55,18),LM('#7a45e0'));c.position.set(0,.29,0);c.rotation.z=.18;g.add(c);const bd=new THREE.Mesh(new THREE.CylinderGeometry(.245,.245,.06,18),LM('#ff7eb6'));bd.position.y=.05;g.add(bd);const st=shapeMesh(starShape(.05,.025),'#ffd35f');st.position.set(0,.2,.2);g.add(st)}
  else if(id==='santa'){const c=new THREE.Mesh(new THREE.ConeGeometry(.32,.62,18),LM('#e8364f'));c.position.set(0,.28,-.1);c.rotation.x=-.55;g.add(c);const r=new THREE.Mesh(new THREE.TorusGeometry(.33,.075,8,22),LM('#ffffff'));r.rotation.x=Math.PI/2;r.position.y=.02;g.add(r);const p=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),LM('#ffffff'));p.position.set(0,.5,-.36);g.add(p)}
  else if(id==='berry'){const cap=new THREE.Mesh(new THREE.SphereGeometry(.3,24,12,0,Math.PI*2,0,Math.PI*.5),LM('#2fa85a'));cap.scale.y=.75;g.add(cap);
    for(let k=0;k<7;k++){const a=k/7*Math.PI*2,l=new THREE.Mesh(new THREE.ConeGeometry(.08,.26,4),LM(k%2?'#3fbf6f':'#2fa85a'));l.position.set(Math.cos(a)*.3,.02,Math.sin(a)*.3);l.rotation.set(Math.sin(a)*1.9,0,-Math.cos(a)*1.9);l.scale.z=.4;g.add(l)}
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.03,.045,.2,8),LM('#2f8a4a'));st.position.set(.02,.3,0);st.rotation.z=-.3;g.add(st)}
  else if(id==='pudding'){const p=new THREE.Mesh(new THREE.CylinderGeometry(.2,.28,.26,22),LM('#ffd86a'));p.position.y=.13;g.add(p);const top=new THREE.Mesh(new THREE.CylinderGeometry(.205,.205,.06,22),LM('#8a4a1a'));top.position.y=.27;g.add(top);
    for(let k=0;k<5;k++){const a=k*1.26,d=new THREE.Mesh(new THREE.SphereGeometry(.045,8,6),LM('#8a4a1a'));d.scale.y=1.6;d.position.set(Math.cos(a)*.2,.22,Math.sin(a)*.2);g.add(d)}const cr=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),LM('#fff6ee'));cr.position.y=.33;g.add(cr);const ch=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),LM('#e8364f'));ch.position.y=.4;g.add(ch)}
  else return hm9(id);if(id==='crown'){g.position.y=0;g.scale.setScalar(1.3)}if(id==='berry'){g.position.y=-.04;g.scale.setScalar(1.35)}return g}}

/* ----- 등 장식 새로 ----- */
{const bm9=backMesh;backMesh=function(id){const g=new THREE.Group();
  if(id==='wafer'){const t=waffleT();for(const s of[-1,1])for(const[k,sz,y]of[[0,.3,.2],[1,.22,-.12]]){const w=new THREE.Mesh(new THREE.BoxGeometry(sz*1.5,sz,.04),new THREE.MeshLambertMaterial({map:t}));w.position.set(s*(.22+sz*.6),y,-.02);w.rotation.z=s*(k?-.45:.35);w.rotation.y=s*.25;g.add(w);const cr=new THREE.Mesh(new THREE.BoxGeometry(sz*1.5,sz,.02),LM('#ffd6ea'));cr.position.copy(w.position);cr.position.z+=.03;cr.rotation.copy(w.rotation);g.add(cr)}const b=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.35,8),LM('#8a4a1a'));b.position.y=.04;g.add(b)}
  else if(id==='shield'){const c=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.07,28),LM('#d99a55'));c.rotation.x=Math.PI/2;c.position.y=.05;g.add(c);for(let k=0;k<7;k++){const a=k*.9,r=k?.2:0,d=new THREE.Mesh(new THREE.SphereGeometry(.04,8,6),LM('#4a2a1a'));d.scale.z=.5;d.position.set(Math.cos(a)*r,.05+Math.sin(a)*r,-.04);g.add(d)}
    const rim=new THREE.Mesh(new THREE.TorusGeometry(.34,.03,8,28),LM('#b97a3a'));rim.position.y=.05;g.add(rim)}
  else if(id==='umbrella'){const top=new THREE.MeshLambertMaterial({map:swirlT('#ff5f9e','#ffffff'),side:THREE.DoubleSide});const c=new THREE.Mesh(new THREE.ConeGeometry(.55,.22,24,1,true),top);c.position.set(.15,.85,-.05);c.rotation.z=-.25;g.add(c);
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,1.0,8),LM('#fff8ee'));st.position.set(.03,.3,-.02);st.rotation.z=-.25;g.add(st);const hk=new THREE.Mesh(new THREE.TorusGeometry(.06,.022,6,12,Math.PI),LM('#e8364f'));hk.position.set(-.08,-.2,-.02);hk.rotation.z=Math.PI;g.add(hk)}
  else if(id==='balloon'){const cols=['#ff5f9e','#7cc6ff','#ffd35f'];cols.forEach((c,k)=>{const x=(k-1)*.22,y=1.0+(k===1?.15:0);const b=new THREE.Mesh(new THREE.SphereGeometry(.17,14,10),new THREE.MeshPhongMaterial({color:c,shininess:80}));b.scale.y=1.18;b.position.set(x,y,-.1);g.add(b);
      const pts=[new THREE.Vector3(0,.0,-.05),new THREE.Vector3(x,y-.2,-.1)];const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:'#ffffff'}));g.add(ln)})}
  else if(id==='gummy'){const m=new THREE.MeshPhongMaterial({color:'#ff7a5a',transparent:true,opacity:.92,shininess:90});const add=(x,y,z,r,sx,sy)=>{const s=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),m);s.position.set(x,y,z);s.scale.set(sx||1,sy||1,1);g.add(s)};
    add(0,-.02,-.02,.17,1,1.15);add(0,.22,-.02,.13);for(const s of[-1,1]){add(s*.1,.33,-.02,.05);add(s*.17,0,-.02,.06,1,1.4);add(s*.08,-.2,-.02,.065)}const e=LM('#4a2a1a');for(const s of[-1,1]){const d=new THREE.Mesh(new THREE.SphereGeometry(.018,6,4),e);d.position.set(s*.05,.25,-.14);g.add(d)}}
  else if(id==='rocket'){const b=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.55,16),LM('#7a4526'));b.position.y=.08;g.add(b);const n=new THREE.Mesh(new THREE.ConeGeometry(.13,.22,16),LM('#ff7eb6'));n.position.y=.46;g.add(n);
    for(const a of[0,2.1,4.2]){const f=new THREE.Mesh(new THREE.BoxGeometry(.02,.16,.12),LM('#ffd35f'));f.position.set(Math.cos(a)*.14,-.13,Math.sin(a)*.14);f.rotation.y=-a;g.add(f)}for(let k=0;k<3;k++){const s=new THREE.Mesh(new THREE.TorusGeometry(.132,.012,6,20),LM('#fff6ee'));s.rotation.x=Math.PI/2;s.position.y=-.1+k*.17;g.add(s)}
    const fl=new THREE.Mesh(new THREE.ConeGeometry(.08,.2,10),new THREE.MeshBasicMaterial({color:'#ffb347'}));fl.rotation.x=Math.PI;fl.position.y=-.3;g.add(fl)}
  else if(id==='cakebox'){const bx=new THREE.Mesh(new THREE.BoxGeometry(.5,.42,.3),LM('#ffd6ea'));bx.position.y=.05;g.add(bx);const rb=LM('#e8364f');const r1=new THREE.Mesh(new THREE.BoxGeometry(.52,.05,.32),rb);r1.position.y=.05;g.add(r1);const r2=new THREE.Mesh(new THREE.BoxGeometry(.06,.44,.32),rb);r2.position.y=.05;g.add(r2);
    for(const s of[-1,1]){const l=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),rb);l.scale.set(1.4,.8,.6);l.position.set(s*.08,.3,0);g.add(l)}const strap=LM('#ff5f9e');for(const s of[-1,1]){const t=new THREE.Mesh(new THREE.TorusGeometry(.22,.025,6,14,Math.PI),strap);t.position.set(s*.16,.05,.18);t.rotation.y=Math.PI/2;g.add(t)}}
  else return bm9(id);return g}}

/* ----- 상점: 누르면 입어 보기, '적용'을 눌러야 바뀌어요 ----- */
shopPick=function(cat,id){SHOPV.prev[cat]=id;SHOPV.sel=[cat,id];SFX.card();renderShop();shopStage()};
shopBuy=function(){const s=SHOPV.sel;if(!s)return;const[cat,id]=s,pr=SHOP[cat].items[id][1];
  if(owns(cat,id)){if(cat==='theme'||SAVE.eq[cat]===id)return;SAVE.eq[cat]=id;saveGame();SFX.win();renderShop();return}
  if(SAVE.coins<pr){SFX.deny();return}SAVE.coins-=pr;SAVE.own[cat+':'+id]=1;saveGame();SFX.win();renderShop();shopStage()};
{const rs9=renderShop;renderShop=function(){rs9();const s=SHOPV.sel,b=$('bBuy');if(!s){$('shopSel').textContent='누르면 입어 볼 수 있어요';return}const[cat,id]=s,[nm,pr]=SHOP[cat].items[id];
  if(cat==='theme'){$('shopSel').textContent=nm+(owns(cat,id)?' · 마녀가 게임 시작 때 골라요':'');return}
  if(owns(cat,id)){const on=SAVE.eq[cat]===id;$('shopSel').textContent=nm+(on?' · 착용 중':' · 입어 보는 중');b.hidden=on;b.disabled=false;b.querySelector('b').textContent='적용'}
  else{$('shopSel').textContent=nm+' · 입어 보는 중';b.hidden=false;b.disabled=SAVE.coins<pr;b.querySelector('b').textContent=SAVE.coins>=pr?`${pr}코인으로 사기`:'코인이 모자라요'}
  for(const it of document.querySelectorAll('#shopList .it')){const c=it.dataset.c,i=it.dataset.i;const pe=it.querySelector('.pr');if(c!=='theme'&&SHOPV.prev[c]===i&&SAVE.eq[c]!==i&&pe)pe.textContent=owns(c,i)?'입어 보는 중':pe.textContent}}}
// 상점을 닫으면 입어 본 건 원래대로
{const cs9=closeShop;closeShop=function(){SHOPV.prev=Object.assign({},SAVE.eq);cs9()}}
// 마녀 탭 미리보기는 작게 (화면 밖으로 안 나가게)
{const ss9=shopStage;shopStage=function(){ss9();if(SHOPV.tab!=='witch'||STAGE.theme)return;const k=(STAGE.d||7.2)/7.2;for(const o of STAGE.objs){const g=o.g||o;if(g&&g.scale)g.scale.multiplyScalar(.62*k)}STAGE.rotY=0}}
if(SAVE.refundMsg2){setTimeout(()=>{try{tMsg(`손에 든 과자와 일부 머리띠가 없어져서 ${SAVE.refundMsg2}코인을 돌려드렸어요`)}catch(e){}delete SAVE.refundMsg2;saveGame()},3000)}

/* ----- 상점 그림 ----- */
{const ii9=itemIcon;itemIcon=function(cat,id){const s=b=>'<svg viewBox="0 0 48 48" aria-hidden="true">'+b+'</svg>',K='stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"';
  if(cat==='cloth'&&PATID[id]){const pid='pc'+id;const pat={
    cake:`<pattern id="${pid}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#e8364f"/><ellipse cx="2" cy="2" rx="1" ry="1.4" fill="#ffe066"/><ellipse cx="6" cy="6" rx="1" ry="1.4" fill="#ffe066"/></pattern>`,
    mintchoco:`<pattern id="${pid}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#9be6d2"/><rect x="1" y="2" width="3" height="2" fill="#4a2a1a" transform="rotate(20 2 3)"/><rect x="6" y="6" width="3" height="2" fill="#4a2a1a" transform="rotate(-25 7 7)"/></pattern>`,
    macaron:`<linearGradient id="${pid}" x1="0" y1="0" x2="0" y2="1"><stop offset=".5" stop-color="#ffb3d6"/><stop offset=".5" stop-color="#fff6ee"/><stop offset=".62" stop-color="#fff6ee"/><stop offset=".62" stop-color="#a8e0ff"/></linearGradient>`,
    cloud:`<linearGradient id="${pid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb3d6"/><stop offset="1" stop-color="#a8e0ff"/></linearGradient>`,
    halloween:`<pattern id="${pid}" width="8" height="48" patternUnits="userSpaceOnUse"><rect width="8" height="48" fill="#ff8a1e"/><rect x="7" width="1.4" height="48" fill="#d9620a"/></pattern>`,
    xmas:`<pattern id="${pid}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="10" height="10" fill="#fff6ee"/><rect width="5" height="10" fill="#e8364f"/></pattern>`}[id];
    const extra={cake:'<path d="M14 33 l4 4 4-4 4 4 4-4 4 4 4-4" fill="none" stroke="#3fbf6f" stroke-width="3"/>',xmas:'<path d="M12 34 q12 5 24 0" fill="none" stroke="#2fae6a" stroke-width="3.5"/>',
      halloween:'<path d="M30 38 q3-3 6 0 q-1-3 1-4 q-2 1-4-1 q-2 2-4 1 q2 1 1 4z" fill="#3a1a4a"/>',cloud:'<circle cx="16" cy="38" r="3" fill="#fff" opacity=".7"/><circle cx="31" cy="12" r="3" fill="#fff" opacity=".7"/>'}[id]||'';
    return s(`<defs>${pat}</defs><path d="M24 6 q-14 0-15 16 l-3 20 q18 6 36 0 l-3-20 q-1-16-15-16z" fill="url(#${pid})" ${K}/><ellipse cx="24" cy="26" rx="9" ry="8" fill="#ffd9c0" ${K}/>${extra}`)}
  const H={beret:`<ellipse cx="24" cy="28" rx="18" ry="8" fill="#fff6ee" ${K}/><circle cx="25" cy="18" r="3" fill="#fff6ee" ${K}/><circle cx="15" cy="24" r="3.5" fill="#e8364f"/>`,
    cupcake:null,cone:null,
    crown:`<path d="M8 36 l3-20 8 9 5-13 5 13 8-9 3 20z" fill="#d99a55" ${K}/><circle cx="24" cy="30" r="3" fill="#ff5f9e"/><rect x="13" y="29" width="3" height="2.5" fill="#4a2a1a"/><rect x="32" y="30" width="3" height="2.5" fill="#4a2a1a"/>`,
    witch:`<ellipse cx="24" cy="38" rx="19" ry="5" fill="#5a2fc0" ${K}/><path d="M14 37 L26 6 L33 37z" fill="#7a45e0" ${K}/><rect x="15" y="31" width="18" height="4" fill="#ff7eb6"/>`,
    santa:`<path d="M10 34 Q16 8 34 10 Q38 12 37 16 L34 34z" fill="#e8364f" ${K}/><rect x="7" y="32" width="32" height="8" rx="4" fill="#fff" ${K}/><circle cx="37" cy="15" r="4.5" fill="#fff" ${K}/>`,
    berry:`<path d="M24 30 l-14 4 8-8-10-6 13 2 3-12 3 12 13-2-10 6 8 8z" fill="#3fbf6f" ${K}/><path d="M24 22 q2-8 6-12" stroke="#2f8a4a" stroke-width="3" fill="none"/>`,
    pudding:`<path d="M12 40 l4-22 h16 l4 22z" fill="#ffd86a" ${K}/><path d="M16 18 h16 l1 5 q-3 3-5 0 q-2 3-4 0 q-2 3-4 0 q-2 3-5 0z" fill="#8a4a1a"/><circle cx="24" cy="12" r="4" fill="#e8364f" ${K}/>`};
  const E={band:`<rect x="6" y="19" width="36" height="10" rx="5" fill="#2f5d55" ${K}/><circle cx="17" cy="24" r="3" fill="#fff"/><circle cx="31" cy="24" r="3" fill="#fff"/>`,
    heart:`<path d="M15 33 C5 26 6 16 15 20 C24 16 25 26 15 33z M33 33 C23 26 24 16 33 20 C42 16 43 26 33 33z" fill="#5a1030" stroke="#ff5f9e" stroke-width="3"/>`,
    star:`<path d="M14 15 l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z M34 15 l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="#a8e0ff" stroke="#ffc94a" stroke-width="2.5" stroke-linejoin="round"/>`,
    round:`<circle cx="15" cy="25" r="8" fill="#e0f2ff" stroke="#6a3a1a" stroke-width="3"/><circle cx="33" cy="25" r="8" fill="#e0f2ff" stroke="#6a3a1a" stroke-width="3"/><path d="M22 24 q2-2 4 0" stroke="#6a3a1a" stroke-width="2.5" fill="none"/>`,
    goggle:`<path d="M3 25 h42" stroke="#3f9bff" stroke-width="4"/><circle cx="15" cy="25" r="8" fill="#7cc6ff" stroke="#ffc94a" stroke-width="3.5"/><circle cx="33" cy="25" r="8" fill="#7cc6ff" stroke="#ffc94a" stroke-width="3.5"/>`,
    mono:`<circle cx="30" cy="20" r="9" fill="#e0f2ff" stroke="#ffc94a" stroke-width="3"/><path d="M38 24 q4 8 -2 18" stroke="#ffc94a" stroke-width="2" stroke-dasharray="2 2" fill="none"/>`,
    donut:`<circle cx="14" cy="25" r="8" fill="none" stroke="#e3a659" stroke-width="6"/><circle cx="34" cy="25" r="8" fill="none" stroke="#e3a659" stroke-width="6"/><circle cx="14" cy="25" r="8" fill="none" stroke="#ff9ec7" stroke-width="3.5"/><circle cx="34" cy="25" r="8" fill="none" stroke="#ff9ec7" stroke-width="3.5"/><path d="M21 24 h6" stroke="#e3a659" stroke-width="3"/>`,
    masq:`<path d="M4 24 C6 14 18 16 24 21 C30 16 42 14 44 24 C41 33 29 33 24 28 C19 33 7 33 4 24z" fill="#8a4dff" ${K}/><ellipse cx="14" cy="24" rx="4.5" ry="3" fill="#fff8ee"/><ellipse cx="34" cy="24" rx="4.5" ry="3" fill="#fff8ee"/><path d="M42 18 l4-10" stroke="#ff7eb6" stroke-width="3"/>`};
  const Bk={wafer:`<path d="M24 24 L6 10 L4 26z M24 24 L42 10 L44 26z M24 26 L10 40 L18 30z M24 26 L38 40 L30 30z" fill="#e3a659" ${K}/><path d="M8 16 l6 4 M40 16 l-6 4" stroke="#b97a3a" stroke-width="2"/><rect x="21" y="16" width="6" height="18" rx="3" fill="#8a4a1a"/>`,
    shield:`<circle cx="24" cy="24" r="17" fill="#d99a55" ${K}/><g fill="#4a2a1a"><circle cx="18" cy="18" r="2.4"/><circle cx="30" cy="20" r="2.4"/><circle cx="22" cy="30" r="2.4"/><circle cx="32" cy="31" r="2"/><circle cx="14" cy="27" r="2"/></g>`,
    umbrella:`<path d="M5 22 Q24 2 43 22 Q38 18 33 22 Q29 18 24 22 Q19 18 15 22 Q10 18 5 22z" fill="#ff5f9e" ${K}/><path d="M24 12 Q14 14 10 21 M24 12 Q34 14 38 21" stroke="#fff" stroke-width="2.5" fill="none"/><path d="M24 22 V40 q0 4 -4 4 q-3 0-3-3" stroke="#e8364f" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    balloon:`<path d="M24 44 L14 26 M24 44 L24 22 M24 44 L34 26" stroke="#c9b6a4" stroke-width="1.5"/><ellipse cx="14" cy="17" rx="7" ry="9" fill="#ff5f9e" ${K}/><ellipse cx="34" cy="17" rx="7" ry="9" fill="#7cc6ff" ${K}/><ellipse cx="24" cy="12" rx="7" ry="9" fill="#ffd35f" ${K}/>`,
    gummy:`<g fill="#ff7a5a" ${K}><circle cx="17" cy="9" r="4"/><circle cx="31" cy="9" r="4"/><circle cx="24" cy="15" r="9"/><ellipse cx="24" cy="31" rx="10" ry="11"/><circle cx="13" cy="28" r="4"/><circle cx="35" cy="28" r="4"/><circle cx="17" cy="42" r="4.5"/><circle cx="31" cy="42" r="4.5"/></g><circle cx="21" cy="14" r="1.5" fill="#4a2a1a"/><circle cx="27" cy="14" r="1.5" fill="#4a2a1a"/>`,
    rocket:`<path d="M24 4 Q32 12 32 22 V36 H16 V22 Q16 12 24 4z" fill="#7a4526" ${K}/><path d="M24 4 Q32 12 32 16 H16 Q16 12 24 4z" fill="#ff7eb6"/><path d="M16 28 l-6 10 h6z M32 28 l6 10 h-6z" fill="#ffd35f" ${K}/><path d="M20 36 l4 9 4-9z" fill="#ffb347"/>`,
    cakebox:`<rect x="8" y="14" width="32" height="28" rx="3" fill="#ffd6ea" ${K}/><path d="M24 14 V42 M8 26 H40" stroke="#e8364f" stroke-width="4"/><path d="M24 14 q-8-10-10-2 q2 4 10 2 q8-10 10-2 q-2 4-10 2" fill="#e8364f"/>`};
  if(cat==='hat'&&H[id])return s(H[id]);if(cat==='eye'){return id==='none'?ii9('hat','none'):s(E[id]||'')}if(cat==='back'&&Bk[id])return s(Bk[id]);
  return ii9(cat,id)}}
// 모자가 머리 위에 떠 보이지 않게 조금 내리고 키워요
let HATDY=-.03,HATSC=1.1;
// 모자 밑에 머리 모양 그대로 덮는 천(모자 색)을 대서 머리가 모자 밖으로 안 보여요
const HATBASE={beret:'#fff6ee',cupcake:'#ff9ec7',cone:'#ffb3d6',crown:'#e8364f',witch:'#7a45e0',santa:'#e8364f',berry:'#2fa85a',pudding:'#ffd86a'};
{const hm8=hatMesh;hatMesh=function(id){const inner=hm8(id);const g=new THREE.Group();inner.position.y+=HATDY;inner.scale.multiplyScalar(HATSC);g.add(inner);
  if(HATBASE[id]){const d=new THREE.Mesh(new THREE.SphereGeometry(HAIRR*1.06,28,14,0,Math.PI*2,0,Math.PI*.5),LM(HATBASE[id]));d.position.set(0,HAIRY-.68,HAIRZ);g.add(d)}return g}}

/* ----- 모자를 쓰면 두건을 벗어요 · 옷 무늬는 두건 빼고 ----- */
let FACEG=null;
function rogueFaceGeo(g0){if(FACEG)return FACEG;hoodGeo('rogue');const set=new Set();for(let t=0;t<HOODTRI.length;t+=3)set.add(HOODTRI[t]+','+HOODTRI[t+1]+','+HOODTRI[t+2]);const ix=g0.index.array,keep=[];for(let t=0;t<ix.length;t+=3)if(!set.has(ix[t]+','+ix[t+1]+','+ix[t+2]))keep.push(ix[t],ix[t+1],ix[t+2]);const g=g0.clone();g.setIndex(keep);return FACEG=g}
let HAIRY=.4,HAIRZ=-.02,HAIRR=.4;
function hairMesh(){const g=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:'#7a4526',side:THREE.DoubleSide});
  const back=new THREE.Mesh(new THREE.SphereGeometry(HAIRR,26,18,Math.PI/2+.95,Math.PI*2-1.9,0,Math.PI*.72),m);g.add(back);
  const top=new THREE.Mesh(new THREE.SphereGeometry(HAIRR*1.01,26,12,0,Math.PI*2,0,.85),m);g.add(top);
  for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),m);b.scale.set(.8,1.4,.8);b.position.set(s*HAIRR*.86,-.12,.05);g.add(b)}
  g.position.set(0,HAIRY,HAIRZ);return g}
{const mh3=makeHero;makeHero=function(height,look){look=look||DEF_EQ;const m=mh3(height,look);const hat=look.hat&&look.hat!=='none';const bk=BODY[look.body]&&POOL[BODY[look.body].pool]?look.body:'rogue';
  let orig=null;POOL.hero.scene.traverse(o=>{if(!orig&&o.isMesh&&o.material&&o.material.map)orig=o.material.map});
  m.g.traverse(o=>{if(!o.isMesh)return;
    // 두건은 옷 무늬·옷 색을 따르지 않아요
    if((o.name==='Rogue_Head_Hooded'||o.name==='Hood')&&orig&&o.material.map&&o.material.map!==orig){o.material.map=orig;o.material.onBeforeCompile=()=>{};o.material.customProgramCacheKey=()=>'plain';o.material.needsUpdate=true}
    if(hat){if(o.name==='Hood')o.visible=false;
      if(o.name==='Rogue_Head_Hooded'&&bk==='rogue')o.geometry=rogueFaceGeo(o.geometry);
      else if(bk!=='rogue'&&o.name===BODY[bk].head){const src=byName(POOL[BODY[bk].pool].scene,BODY[bk].head);if(src)o.geometry=src.geometry}}});
  if(hat&&bk==='rogue'){const hb=findBone(m.g,'head');if(hb){const ws=new THREE.Vector3();hb.getWorldScale(ws);const hold=new THREE.Group();hold.scale.setScalar(1/(ws.x||1));hold.add(hairMesh());hb.add(hold)}}
  return m}}
SHOPTAB.thief=['hat','eye','cloth','back'];
{const it=SHOP.eye.items,o={none:it.none,band:it.band};for(const k in it)if(!o[k])o[k]=it[k];SHOP.eye.items=o}

// 상점 미리보기: 손가락(마우스)으로 끌어서 돌려요
{let drag=null;
  addEventListener('pointerdown',e=>{if(screen!=='shop'||!STAGE.on||STAGE.theme||!renderer)return;const t=e.target;if(!(t===renderer.domElement||t.id==='shop'))return;drag={x:e.clientX};STAGE.hold=true});
  addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;drag.x=e.clientX;STAGE.rotY=(STAGE.rotY||0)+dx*.012});
  for(const ev of['pointerup','pointercancel'])addEventListener(ev,()=>{if(drag){drag=null;STAGE.hold=false;STAGE.holdT=performance.now()}});
  const sc8=stageCam;stageCam=function(dt){const spin=STAGE.spin;const r0=spin?spin.rotation.y:0;sc8(dt);const idle=!STAGE.hold&&!(STAGE.holdT&&performance.now()-STAGE.holdT<4000);
    if(spin){if(!idle)spin.rotation.y=r0;spin.rotation.y+=(STAGE.rotY||0);STAGE.rotY=0}
    else if(SHOPV.tab==='witch'){for(const o of STAGE.objs){const g=o.g||o;if(g&&g.rotation)g.rotation.y+=(STAGE.rotY||0)}STAGE.rotY=0}}}
