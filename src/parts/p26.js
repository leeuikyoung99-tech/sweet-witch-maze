/* ================= 6차: 캐릭터 ◀ ▶ 바꾸기 · 과자 마녀 상점 넓히기 ================= */
// 새 슬라임 맛 색
Object.assign(SLIMEC,{choco:['#b07a4a','#5a3220'],mint:['#9eecd4','#2f9c7c'],pudding:['#ffd66b','#c08a10'],rainbow:['#ffffff','#ffb3d6'],galaxy:['#4a3a9a','#2a1a6a']});
// 새 몬스터·포탑 색
const MSKIN={ghost:{cotton:['#fff6fb','#d9c2ff'],berry:['#ffc4de','#ff7eb6'],sky:['#d2f0ff','#7cc6ff'],lemon:['#fff3b0','#ffc93f']},
 bat:{grape:['#8a5ccc','#2a1640','#4a2a6a'],choco:['#9a6a48','#3a2010','#5a3220'],berry:['#ff6f9e','#7a1640','#c0306a'],mint:['#4fc9a8','#14463a','#1f7a64']},
 bear:{peach:['#ff8a5a','#c0401a','#ffd0b8'],lime:['#8de05a','#3f8a1a','#eaffd6'],grape:['#b98cff','#5a2fc0','#f0e2ff'],cola:['#b8693a','#5a2a0a','#f6d8b8']}};
const TSKIN={ice:{snow:{s:['#a8e8ff','#e0f6ff'],head:'#a8e8ff',acc:'#e0f6ff'},berry:{s:['#ff7eb6','#fff0f6'],head:'#ffc4de',acc:'#e8364f'},melon:{s:['#7ee8a8','#f0fff4'],head:'#c9f5a8',acc:'#3fbf6f'},choco:{s:['#7a4526','#f6e3c3'],head:'#c89060',acc:'#fff3e6'}},
 magnet:{red:{s:['#7a4526','#f6e3c3'],head:'#ff7a8a',acc:'#e8364f'},pink:{s:['#ff9ec7','#ffffff'],head:'#ffd6ea',acc:'#ff5f9e'},gold:{s:['#ffd35f','#fff8e0'],head:'#ffe9a0',acc:'#e8a020'},sky:{s:['#7cc6ff','#ffffff'],head:'#d2f0ff',acc:'#2f86c0'}}};
for(const k in TSKIN)for(const id in TSKIN[k])CANNONC[k+'_'+id]={s:TSKIN[k][id].s,head:TSKIN[k][id].head,bow:TSKIN[k][id].acc};
for(const k in MSKIN)for(const id in MSKIN[k])SLIMEC['_'+k+'_'+id]=MSKIN[k][id].slice(0,2);
const wl=(k)=>{const L=witchLook();return L[k]};
/* ----- 슬라임 맛: 색만이 아니라 토핑까지 달라져요 ----- */
const SL_R=1.45,SL_Y=1.2,SL_K=.86;
function slimeSurf(th,ph,o=0){const r=SL_R+o;return new THREE.Vector3(r*Math.sin(ph)*Math.sin(th),SL_Y+r*SL_K*Math.cos(ph),r*Math.sin(ph)*Math.cos(th))}
function stick(body,mesh,th,ph,o){const p=slimeSurf(th,ph,o);mesh.position.copy(p);const n=new THREE.Vector3(p.x,(p.y-SL_Y)/SL_K/SL_K,p.z).normalize();mesh.lookAt(p.clone().add(n));body.add(mesh);return mesh}
// 얼굴(앞쪽 가운데)을 피해서 점을 흩뿌려요
function dotSpots(n,seed){const out=[];let s=seed||1;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;let tries=0;
  while(out.length<n&&tries++<400){const th=rnd()*Math.PI*2,ph=.25+rnd()*1.25;const p=slimeSurf(th,ph);if(p.z>.3&&Math.abs(p.x)<1&&p.y>.7&&p.y<1.85)continue;if(out.some(([a,b])=>{const q=slimeSurf(a,b);return q.distanceTo(p)<.42}))continue;out.push([th,ph])}return out}
function creamTop(body,y,col){for(let k=0;k<3;k++){const f=new THREE.Mesh(new THREE.SphereGeometry(.55-k*.14,14,10),LM(col||'#fff8f0'));f.scale.y=.6;f.position.set(.05,y+k*.15,0);body.add(f)}}
let RAINT=null;const rainbowSlimeT=()=>RAINT||(RAINT=keepTex(canvasTex(16,256,(c,w,h)=>{const cs=['#ffb3c8','#ffd2a8','#fff3a8','#c8f5c0','#b8e4ff','#dccbff'];cs.forEach((cl,i)=>{c.fillStyle=cl;c.fillRect(0,i*h/6,w,h/6+1)})})));
function slimeDecor(m,skin){const b=m.body,tip=b.children[1],mat=m.mats[0];
  if(skin==='berry'){tip.visible=false;const leaf=LM('#5fcf6f');for(let k=0;k<5;k++){const l=new THREE.Mesh(new THREE.ConeGeometry(.24,.8,4),leaf);const a=k/5*Math.PI*2;l.position.set(Math.cos(a)*.38,2.45,Math.sin(a)*.38);l.rotation.set(Math.sin(a)*1.25,0,-Math.cos(a)*1.25);b.add(l)}
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.05,.07,.3,6),leaf);st.position.y=2.6;b.add(st);
    for(const[th,ph]of dotSpots(16,7)){const d=new THREE.Mesh(new THREE.SphereGeometry(.085,6,4),LM('#fff3a0'));d.scale.set(.7,1.2,.5);stick(b,d,th,ph,.01)}}
  else if(skin==='soda'){const bm=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.65});for(const[th,ph]of dotSpots(9,3)){const r=.07+Math.random()*.07;stick(b,new THREE.Mesh(new THREE.SphereGeometry(r,10,8),bm),th,ph,-.02)}
    const straw=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,1.3,10),new THREE.MeshLambertMaterial({map:stripeT('#ff5f9e','#ffffff',[1,2])}));straw.position.set(-.45,2.6,-.1);straw.rotation.z=.35;b.add(straw)}
  else if(skin==='lemon'){tip.visible=false;const sl=new THREE.Group();const rim=new THREE.Mesh(new THREE.CylinderGeometry(.78,.78,.16,24),LM('#ffe14a'));sl.add(rim);const pulp=new THREE.Mesh(new THREE.CylinderGeometry(.68,.68,.17,24),LM('#fff6b0'));sl.add(pulp);
    for(let k=0;k<8;k++){const a=k/8*Math.PI*2,s=new THREE.Mesh(new THREE.BoxGeometry(.05,.18,.6),LM('#ffe98a'));s.position.set(Math.cos(a)*.32,0,Math.sin(a)*.32);s.rotation.y=-a;sl.add(s)}
    sl.rotation.set(1.05,0,.35);sl.position.set(.3,2.6,-.2);b.add(sl)}
  else if(skin==='choco'||skin==='mint'){const cm=LM('#4a2414');for(const[th,ph]of dotSpots(skin==='mint'?14:12,skin==='mint'?11:5)){const d=new THREE.Mesh(new THREE.SphereGeometry(.11,8,6),cm);d.scale.set(1,.55,1);stick(b,d,th,ph,-.02)}
    if(skin==='choco'){tip.visible=false;creamTop(b,2.42);const ch=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),LM('#e8364f'));ch.position.y=2.86;b.add(ch)}}
  else if(skin==='pudding'){tip.visible=false;const cap=new THREE.Mesh(new THREE.SphereGeometry(SL_R+.03,32,12,0,Math.PI*2,0,.9),new THREE.MeshPhongMaterial({color:'#9a4a14',shininess:120,specular:new THREE.Color('#ffd0a0')}));cap.scale.set(1,SL_K,1);cap.position.y=SL_Y;b.add(cap);
    for(let k=0;k<9;k++){const a=k/9*Math.PI*2,d=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),cap.material);d.scale.y=1.8;const p=slimeSurf(a,.9,.0);d.position.set(p.x,p.y-.12,p.z);b.add(d)}
    creamTop(b,2.45);const ch=new THREE.Mesh(new THREE.SphereGeometry(.15,10,8),LM('#e8364f'));ch.position.y=2.9;b.add(ch)}
  else if(skin==='rainbow'){mat.map=rainbowSlimeT();mat.needsUpdate=true;const st=['#ff7eb6','#ffd84a','#7ee8c8','#7cc6ff','#b98cff'];dotSpots(14,9).forEach(([th,ph],i)=>{const d=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.22,6),LM(st[i%5]));stick(b,d,th,ph,.02)})}
  else if(skin==='galaxy'){mat.emissiveIntensity=.25;mat.opacity=.98;const sm=new THREE.MeshBasicMaterial({color:'#fff6b0'});dotSpots(14,13).forEach(([th,ph],i)=>{const d=new THREE.Mesh(new THREE.OctahedronGeometry(i%3?.08:.14,0),i%4?sm:new THREE.MeshBasicMaterial({color:'#ffffff'}));stick(b,d,th,ph,.02)});
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.75,.05,6,40),new THREE.MeshBasicMaterial({color:'#ffd35f',transparent:true,opacity:.8}));ring.rotation.x=Math.PI/2.3;ring.position.y=1.35;b.add(ring)}}
{const ms0=makeSlime;makeSlime=function(skin){const m=ms0(skin);if(skin&&skin[0]!=='_')slimeDecor(m,skin);return m}}
/* ----- 몬스터 색 (유령·박쥐·곰) ----- */
monModel=function(k,skin){const id=skin||wl(k),C=(MSKIN[k]&&MSKIN[k][id])||Object.values(MSKIN[k])[0];const m=makeSlime(MSKIN[k]&&MSKIN[k][id]?'_'+k+'_'+id:'_'+k),g=m.g,body=g.children[0];
  if(k==='ghost')g.traverse(o=>{if(o.material&&o.material.type==='MeshPhongMaterial'){o.material.opacity=.55}});
  if(k==='bat'){g.scale.setScalar(.62);const wm=new THREE.MeshLambertMaterial({color:C[2],side:THREE.DoubleSide});m.wg=[];for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.CircleGeometry(1.4,3),wm);w.position.set(s*1.7,1.5,0);w.rotation.set(Math.PI/2,0,s>0?0:Math.PI);body.add(w);m.wg.push(w)}
    for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.ConeGeometry(.18,.4,6),new THREE.MeshBasicMaterial({color:'#ffffff'}));f.position.set(s*.25,.95,1.25);f.rotation.x=Math.PI;body.add(f)}}
  if(k==='bear'){g.scale.setScalar(1.25);const em=new THREE.MeshPhongMaterial({color:C[0],shininess:80});for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.45,12,8),em);e.position.set(s*.95,2.35,0);body.add(e)}
    const sn=new THREE.Mesh(new THREE.SphereGeometry(.38,12,8),new THREE.MeshPhongMaterial({color:C[2]}));sn.scale.set(1,.7,.6);sn.position.set(0,1.05,1.25);body.add(sn)}
  return m};
/* ----- 포탑 모양 (얼음·자석) ----- */
turretMesh=function(tk,skin){if(!TSKIN[tk])return towerMesh(skin||witchLook().cannon);const id=TSKIN[tk][skin]?skin:TSKIN[tk][wl(tk)]?wl(tk):Object.keys(TSKIN[tk])[0],T=TSKIN[tk][id],g=towerMesh(tk+'_'+id);
  if(tk==='ice'){const m=LM(T.acc);for(let i=0;i<5;i++){const c=new THREE.Mesh(new THREE.ConeGeometry(.16,.6,6),m);const a=i/5*Math.PI*2;c.position.set(Math.cos(a)*.6,3.75,Math.sin(a)*.6);c.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5);g.add(c)}
    const sy=new THREE.Mesh(new THREE.SphereGeometry(.4,12,8),LM(id==='choco'?'#7a4526':id==='melon'?'#ff9ec7':'#ffffff'));sy.scale.y=.6;sy.position.y=4.05;g.add(sy)}
  if(tk==='magnet'){const t=new THREE.Mesh(new THREE.TorusGeometry(.55,.18,8,18,Math.PI),LM(T.acc));t.position.set(0,4.25,0);g.add(t);for(const s of[-1,1]){const tip=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.3,10),LM('#e9eef5'));tip.position.set(s*.55,4.12,0);g.add(tip)}}
  return g};
/* ----- 상점 그림 ----- */
const STR=`stroke="#4a2a1a" stroke-width="2.6"`;
const SLIMEI={berry:'<path d="M18 16 l6-8 6 8 M24 9 v-4" stroke="#3f9f4f" stroke-width="3" fill="#5fcf6f" stroke-linejoin="round"/><circle cx="12" cy="34" r="1.3" fill="#fff6c8"/><circle cx="36" cy="33" r="1.3" fill="#fff6c8"/><circle cx="24" cy="22" r="1.3" fill="#fff6c8"/><circle cx="34" cy="24" r="1.3" fill="#fff6c8"/>',
 soda:'<circle cx="13" cy="33" r="2.5" fill="#fff" opacity=".8"/><circle cx="35" cy="26" r="2" fill="#fff" opacity=".8"/><circle cx="31" cy="36" r="1.6" fill="#fff" opacity=".8"/><path d="M15 18 L9 3" stroke="#ff5f9e" stroke-width="4" stroke-linecap="round"/><path d="M13 13 L11 8" stroke="#fff" stroke-width="4"/>',
 lemon:`<circle cx="30" cy="12" r="8" fill="#fff6b0" ${STR}/><path d="M30 12 l0-7 M30 12 l6 4 M30 12 l-6 4 M30 12 l6-4 M30 12 l-6-4" stroke="#ffd84a" stroke-width="1.6"/>`,
 choco:'<circle cx="13" cy="33" r="2.2" fill="#4a2414"/><circle cx="35" cy="34" r="2.2" fill="#4a2414"/><circle cx="33" cy="22" r="2" fill="#4a2414"/><ellipse cx="24" cy="12" rx="9" ry="4.5" fill="#fff8f0" stroke="#4a2a1a" stroke-width="2"/><circle cx="24" cy="7" r="3" fill="#e8364f"/>',
 mint:'<circle cx="13" cy="33" r="2.2" fill="#4a2414"/><circle cx="35" cy="34" r="2.2" fill="#4a2414"/><circle cx="33" cy="22" r="2" fill="#4a2414"/><circle cx="16" cy="22" r="2" fill="#4a2414"/>',
 pudding:'<path d="M9 24 q15-14 30 0 q-3 3-6 0 q-3 3-6 0 q-3 3-6 0 q-3 3-6 0 q-3 3-6 0z" fill="#9a4a14"/><ellipse cx="24" cy="12" rx="7" ry="3.5" fill="#fff8f0" stroke="#4a2a1a" stroke-width="2"/><circle cx="24" cy="7" r="3" fill="#e8364f"/>',
 rainbow:'',galaxy:'<path d="M14 24 l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2-1.5-1.4 2-.3z" fill="#fff6b0"/><circle cx="34" cy="36" r="1.4" fill="#fff"/><circle cx="36" cy="24" r="1.1" fill="#fff6b0"/><ellipse cx="24" cy="30" rx="22" ry="5" fill="none" stroke="#ffd35f" stroke-width="2" opacity=".85"/>'};
function slimeIcon(id){const c=SLIMEC[id][0],fill=id==='rainbow'?'url(#rbw)':c,defs=id==='rainbow'?'<defs><linearGradient id="rbw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb3c8"/><stop offset=".25" stop-color="#fff3a8"/><stop offset=".5" stop-color="#c8f5c0"/><stop offset=".75" stop-color="#b8e4ff"/><stop offset="1" stop-color="#dccbff"/></linearGradient></defs>':'';
  return `${defs}<path d="M6 40 q0-26 18-26 q18 0 18 26z" fill="${fill}" stroke="#4a2a1a" stroke-width="3"/>${id==='pudding'?SLIMEI.pudding:''}<circle cx="18" cy="30" r="3" fill="#2a1640"/><circle cx="30" cy="30" r="3" fill="#2a1640"/><ellipse cx="15" cy="21" rx="4" ry="2" fill="#fff" opacity=".7"/>${id==='pudding'?'':SLIMEI[id]||''}`}
function monIcon(k,id){const C=MSKIN[k][id];
  if(k==='ghost')return `<path d="M10 42 V22 a14 14 0 0 1 28 0 V42 l-5-4 -4.5 4 -4.5-4 -4.5 4 -4.5-4z" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.6" stroke-linejoin="round"/><circle cx="19" cy="23" r="2.6" fill="#2a1640"/><circle cx="29" cy="23" r="2.6" fill="#2a1640"/><circle cx="16" cy="13" r="3.4" fill="${C[1]}"/><ellipse cx="24" cy="30" rx="3" ry="2.2" fill="#ff9ec7"/>`;
  if(k==='bat')return `<path d="M24 24 L3 14 l5 10 -3 8 9-5 5 6z M24 24 L45 14 l-5 10 3 8 -9-5 -5 6z" fill="${C[2]}" stroke="#2a1640" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="27" r="8.5" fill="${C[0]}" stroke="#2a1640" stroke-width="2.6"/><circle cx="21" cy="25.5" r="1.9" fill="#fff"/><circle cx="27" cy="25.5" r="1.9" fill="#fff"/><path d="M22 31 l1.2 2.4 1.2-2.4 M25 31 l1.2 2.4 1.2-2.4" fill="#fff" stroke="#fff" stroke-width="1"/>`;
  return `<circle cx="13" cy="13" r="6.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.6"/><circle cx="35" cy="13" r="6.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.6"/><ellipse cx="24" cy="27" rx="17" ry="16" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.6"/><ellipse cx="24" cy="32" rx="7" ry="5" fill="${C[2]}"/><circle cx="18.5" cy="24" r="2.4" fill="#2a1640"/><circle cx="29.5" cy="24" r="2.4" fill="#2a1640"/><circle cx="24" cy="30.5" r="2" fill="#4a2a1a"/><ellipse cx="16" cy="18" rx="4" ry="2" fill="#fff" opacity=".6"/>`}
function turIcon(k,id){const T=TSKIN[k][id];const body=`<rect x="16" y="22" width="16" height="23" rx="3" fill="${T.s[1]}" stroke="#4a2a1a" stroke-width="2.6"/><path d="M16 29 h16 M16 37 h16" stroke="${T.s[0]}" stroke-width="3.5"/>`;
  if(k==='ice')return body+`<circle cx="24" cy="15" r="8.5" fill="${T.head}" stroke="#4a2a1a" stroke-width="2.6"/><path d="M24 2 v6 M15 5 l3.5 5 M33 5 l-3.5 5" stroke="${T.acc}" stroke-width="3" stroke-linecap="round"/>`;
  return body+`<path d="M13 19 V12 a11 11 0 0 1 22 0 V19" fill="none" stroke="${T.acc}" stroke-width="6.5"/><path d="M13 19 v-3.5 M35 19 v-3.5" stroke="#e9eef5" stroke-width="6.5"/><circle cx="24" cy="18" r="5" fill="${T.head}" stroke="#4a2a1a" stroke-width="2"/>`}
{const ii0=itemIcon;itemIcon=function(cat,id){const s=b=>'<svg viewBox="0 0 48 48" aria-hidden="true">'+b+'</svg>';if(cat==='slime')return s(slimeIcon(id));if(MSKIN[cat])return s(monIcon(cat,id));if(TSKIN[cat])return s(turIcon(cat,id));return ii0(cat,id)}}
/* ----- 미리보기 무대 ----- */
const WSTAGE={slime:'mon',ghost:'mon',bat:'mon',bear:'mon',cannon:'tur',ice:'tur',magnet:'tur'};
{const ss0=shopStage;shopStage=function(){ss0();placeBodyPick();if(SHOPV.tab!=='witch')return;const P=SHOPV.prev,f=SHOPV.sel&&WSTAGE[SHOPV.sel[0]]?SHOPV.sel[0]:null;if(!f)return;
  clearStage();STAGE.d=WSTAGE[f]==='tur'?9.6:7.2;let o;
  if(f==='slime'){o=makeSlime(P.slime)}else if(MSKIN[f]){o=monModel(f,P[f]);if(f==='bat'){o.g.position.y=1.3;o.g.scale.setScalar(1)}if(f==='ghost')o.g.position.y=.5}
  if(o){o.g.position.x=STAGE.x;o.g.position.z=STAGE.z;o.state='idle';o.g.rotation.x=.32;scene.add(o.g);STAGE.objs.push(o);return}
  const t=f==='cannon'?towerMesh(P.cannon):turretMesh(f,P[f]);t.position.set(STAGE.x,0,STAGE.z);t.scale.setScalar(.62);t.rotation.y=.6;scene.add(t);STAGE.objs.push(t)}}
/* ----- 캐릭터 ◀ ▶: 상점 왼쪽 캐릭터 양옆, 언제든 공짜로 바꿔요 ----- */
function placeBodyPick(){const el=$('bodyPick');if(!el)return;const on=$('shop')&&!$('shop').hidden&&SHOPV.tab==='thief';el.hidden=!on;if(!on)return;
  const pr=document.querySelector('#shop .shop').getBoundingClientRect(),L=Math.max(8,parseFloat(getComputedStyle($('shop')).paddingLeft)||8),W=Math.max(0,pr.left-L-10);el.style.left=L+'px';el.style.width=W+'px';el.classList.toggle('sm',W<230);$('bodyNm').textContent=SHOP.body.items[SAVE.eq.body||'rogue'][0]}
function stepBody(d){const ks=Object.keys(SHOP.body.items).filter(k=>POOL[BODY[k].pool]);let i=ks.indexOf(SAVE.eq.body);if(i<0)i=0;const k=ks[(i+d+ks.length)%ks.length];SAVE.eq.body=k;SHOPV.prev.body=k;saveGame();SFX.card();shopStage()}
addEventListener('resize',()=>{if(!$('shop').hidden)placeBodyPick()});
