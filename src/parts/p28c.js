/* ================= 28차 (다): 도둑 새 스킬 10개 ================= */
const NSK={
 dash2:{n:'대시 충전',d:'대시를 바로 한 번 더 쓸 수 있어요',c:1,cd:8,lb:'충전',bg:'#ffe0f0,#ff7eb6',sv:'<path d="M8 30 h14 M4 22 h14 M10 38 h10" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M22 14 l16 10 -16 10z" fill="#fff" stroke="#c0306a" stroke-width="2.5" stroke-linejoin="round"/><path d="M30 14 l14 10 -14 10" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>'},
 lure:{n:'젤리 미끼',d:'던진 미끼에 2.5초 동안 몬스터가 모여요 (먹으면 사라져요)',c:2,cd:10,lb:'미끼',bg:'#ffe9c2,#ffa94a',sv:'<ellipse cx="24" cy="30" rx="13" ry="10" fill="#fff" stroke="#c0601a" stroke-width="2.5"/><circle cx="19" cy="27" r="3" fill="#ffd0a0"/><path d="M14 12 q10-8 20 0" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="3 3"/><path d="M34 12 l-3-4 M34 12 l-5 1" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'},
 flag:{n:'쿠키 깃발',d:'지금 자리에 깃발을 꽂아 지도에 남겨요 (순간이동 자리)',c:1,cd:6,lb:'깃발',bg:'#ffd6e6,#ff5f9e',sv:'<path d="M14 42 V6" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M15 7 h20 l-5 7 5 7 h-20z" fill="#fff" stroke="#c0306a" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="14" r="3" fill="#c98d5f"/>'},
 tele:{n:'젤리 순간이동',d:'마지막 쿠키 깃발 자리로 휙! (깃발이 없으면 출발점)',c:4,cd:18,lb:'순간',bg:'#e6dcff,#9b6bff',sv:'<circle cx="24" cy="24" r="15" fill="none" stroke="#fff" stroke-width="3.5" stroke-dasharray="6 4"/><circle cx="24" cy="24" r="7" fill="#fff"/><path d="M24 2 v6 M24 40 v6 M2 24 h6 M40 24 h6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'},
 scope:{n:'쿠키 망원경',d:'12초 동안 지도가 멀리까지 밝혀지고 몬스터가 보여요',c:2,cd:14,lb:'망원경',bg:'#d6f0ff,#4a9be8',sv:'<path d="M6 30 l26-14 4 8 -26 14z" fill="#fff" stroke="#2f6aa0" stroke-width="2.5" stroke-linejoin="round"/><circle cx="36" cy="18" r="6" fill="#bfe6ff" stroke="#fff" stroke-width="3"/><path d="M16 36 l-4 8 M20 34 l4 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'},
 heal:{n:'사탕 회복',d:'체력을 12 채워요',c:3,cd:15,lb:'회복',bg:'#d8ffe0,#3fbf6f',sv:'<path d="M24 42 C8 30 6 20 12 13 c5-5 11-3 12 3 c1-6 7-8 12-3 c6 7 4 17-12 29z" fill="#fff" stroke="#2a8a48" stroke-width="2.5"/><path d="M24 20 v12 M18 26 h12" stroke="#3fbf6f" stroke-width="4" stroke-linecap="round"/>'},
 freeze:{n:'소다 얼리기',d:'마녀의 소다가 7초 동안 안 차요',c:4,cd:20,lb:'얼리기',bg:'#e0f8ff,#5fc8e8',sv:'<rect x="14" y="8" width="20" height="32" rx="6" fill="#fff" stroke="#2f86c0" stroke-width="2.5"/><path d="M24 14 v20 M16 18 l16 12 M32 18 l-16 12" stroke="#7cc6ff" stroke-width="2.6" stroke-linecap="round"/>'},
 brick:{n:'사탕 벽돌',d:'내 뒤에 5초짜리 작은 벽을 세워요',c:3,cd:12,lb:'벽돌',bg:'#ffe0e8,#e8708f',sv:'<rect x="6" y="14" width="36" height="22" rx="4" fill="#fff" stroke="#b03a5a" stroke-width="2.5"/><path d="M6 25 h36 M18 14 v11 M30 25 v11" stroke="#ff9ec7" stroke-width="2.5"/>'},
 echo:{n:'쿠키 메아리',d:'5초 동안 출구까지 남은 칸 수를 알려줘요',c:2,cd:8,lb:'메아리',bg:'#fff3c9,#e8b020',sv:'<circle cx="16" cy="24" r="6" fill="#fff"/><path d="M24 14 a12 12 0 0 1 0 20 M30 9 a18 18 0 0 1 0 30 M36 4 a24 24 0 0 1 0 40" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'},
 xray:{n:'투시 사탕',d:'3초 동안 숨은 덫·발판·가짜 사탕·마녀의 눈이 보여요',c:2,cd:12,lb:'투시',bg:'#f3e2ff,#b06be8',sv:'<path d="M4 24 q20-18 40 0 q-20 18 -40 0z" fill="#fff" stroke="#7a3ab0" stroke-width="2.5"/><circle cx="24" cy="24" r="7" fill="#d9a8ff" stroke="#7a3ab0" stroke-width="2"/><circle cx="24" cy="24" r="3" fill="#4a1a6a"/><path d="M38 8 l2 4 4 1 -4 2 -2 4 -2-4 -4-2 4-1z" fill="#fff"/>'}};
for(const k in NSK){const S=NSK[k];SK[k]={cost:S.c,cd:S.cd};SKN[k]=[S.n,S.d,S.c];CDK[k]='cd'+k[0].toUpperCase()+k.slice(1);SKB[k]='b'+k[0].toUpperCase()+k.slice(1)+'S';SKP.push(k);
  const b=document.createElement('button');b.className='sk';b.id=SKB[k];b.hidden=true;b.setAttribute('aria-label',S.n+', 사탕 '+S.c);b.innerHTML=`<svg viewBox="0 0 48 48" aria-hidden="true">${S.sv}</svg><span class="lb">${S.lb}</span><span class="cost"><i></i>${S.c}</span><canvas class="cd" width="80" height="80"></canvas>`;
  b.style.background=`linear-gradient(${S.bg})`;$('bGum').after(b);b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();useSkill(k)})}
{const us0=useSkill;useSkill=function(k){const f={dash2:doDash2,lure:doLure,flag:doFlag,tele:doTele,scope:doScope,heal:doHeal,freeze:doFreeze,brick:doBrick,echo:doEcho,xray:doXray}[k];if(f)return f();return us0(k)}}
{const uh0=updHero;updHero=function(dt){const h=G.hero;for(const k in NSK){const c=CDK[k];if(h[c]>0)h[c]=Math.max(0,h[c]-dt)}uh0(dt);
  if(G.scopeT>0){G.scopeT-=dt;scopeReveal()}if(G.echoT>0){G.echoT-=dt;echoHud()}else if(!h.isRival&&G.mode==='hero')$('echo').hidden=!(G.aug&&G.aug.exitNose);
  if(G.seeHidden>0){G.seeHidden-=dt;if(G.seeHidden<=0)xrayOff()}
  if(G.lure&&G.lure.walk&&!G.mirror){const L=G.lure,dx=L.x-h.x,dz=L.z-h.z,d=Math.hypot(dx,dz)||1,q={x:L.x+dx/d*3*dt,z:L.z+dz/d*3*dt};collide(q,.5);L.x=q.x;L.z=q.z;L.g.position.set(L.x,0,L.z)}
  if(G.lure){G.lure.t-=dt;G.lure.g.rotation.y+=dt*2;if(G.lure.t<=0){drop(G.lure.g);G.lure=null}}
  if(G.sodaFreeze>0){G.sodaFreeze-=dt;const D=G.devil;G.ptHold=Math.min(G.ptHold,D.pt);D.pt=G.ptHold}
  if(h.dashExtra>0&&h.dashCd>.2&&h.dashCd<HERO.dashCd-.05){}}}
// 대시 충전
function doDash2(ai){const h=G.hero;if(!skReady('dash2',ai))return;skPay('dash2');h.dashCd=0;h.dashExtra=1;SFX.dash();if(meLoud())say('💨 대시 충전! 바로 대시할 수 있어요',false,1.1)}
{const dd0=doDash;doDash=function(ai){const h=G.hero,before=h.dashes;dd0(ai);if(h.dashes>before&&h.dashExtra>0){h.dashExtra--;h.dashCd=Math.min(h.dashCd,.25)}}}
// 젤리 미끼
function lureMesh(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.55,14,10),new THREE.MeshPhongMaterial({color:'#ffb36b',emissive:new THREE.Color('#ff7a2e'),emissiveIntensity:.3,shininess:90,transparent:true,opacity:.9}));b.scale.y=.7;b.position.y=.4;g.add(b);
  const r=new THREE.Mesh(new THREE.RingGeometry(1,1.2,24),teleMat('#ffb36b',.6));r.rotation.x=-Math.PI/2;r.position.y=.1;g.add(r);return g}
function doLure(ai){const h=G.hero;if(!skReady('lure',ai))return;skPay('lure');if(G.lure)drop(G.lure.g);let fx=Math.sin(h.face),fz=Math.cos(h.face);if(G.mode==='hero'&&!h.isAI){fx=-Math.sin(h.yaw);fz=-Math.cos(h.yaw)}
  let x=h.x,z=h.z;for(let s=0;s<7;s+=.5){const nx=h.x+fx*s,nz=h.z+fz*s;if(!los(h.x,h.z,nx,nz))break;x=nx;z=nz}const g=lureMesh();g.position.set(x,0,z);x28add(g);G.lure={x,z,t:2.5,g,walk:G.aug&&G.aug.lureWalk?1:0};
  for(const e of G.ents)if(isMon(e)&&!e.dead)e.retarget=0;SFX.squish();netEv('lure');if(meLoud())say('🍬 젤리 미끼! 몬스터가 미끼로 가요',false,1.2)}
// 쿠키 깃발
function flagMesh(){const g=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,2.4,8),LM('#fff8ee'));st.position.y=1.2;g.add(st);const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(1.1,-.35);sh.lineTo(0,-.7);const f=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshLambertMaterial({color:'#ff5f9e',side:THREE.DoubleSide}));f.position.set(.05,2.35,0);g.add(f);
  const ck=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.1,16),LM('#d99a55'));ck.rotation.x=Math.PI/2;ck.position.set(.45,2.0,.03);g.add(ck);return g}
function markDeadAround(cx,cz,R){G.deadX=G.deadX||new Set();const seen=new Map([[idx(cx,cz),0]]),q=[[cx,cz]];for(let i=0;i<q.length;i++){const[x,z]=q[i],d=seen.get(idx(x,z));if(d>=R)continue;for(const[dx,dz]of DIRS){const a=x+dx,b=z+dz;if(!inM(a,b)||!canStep(x,z,dx,dz))continue;const j=idx(a,b);if(seen.has(j))continue;seen.set(j,d+1);q.push([a,b])}}
  let n=0;for(const[j]of seen){const x=j%N,z=(j/N)|0;if(x===cx&&z===cz)continue;if(x===EXIT[0]&&z===EXIT[1])continue;if(openings(x,z)<=1&&!G.deadX.has(j)){G.deadX.add(j);n++}}return n}
function doFlag(ai){const h=G.hero;if(!skReady('flag',ai))return;skPay('flag');G.flags=G.flags||[];if(G.flags.length>=3){const o=G.flags.shift();drop(o.g)}const g=flagMesh();g.position.set(h.x,0,h.z);x28add(g);G.flags.push({x:h.x,z:h.z,g});
  SFX.place();if(meLoud())say('🚩 쿠키 깃발을 꽂았어요',false,1.2)}
// 젤리 순간이동
function doTele(ai){const h=G.hero;if(!skReady('tele',ai))return;const f=(G.flags||[])[G.flags?G.flags.length-1:0];skPay('tele');burstFx(h.x,h.z,'smoke');
  if(f){h.x=f.x;h.z=f.z}else{h.x=cx2x(START[0]);h.z=cx2x(START[1])+(START[1]===0?-.8:.8)}h.slide=null;h.kx=h.kz=0;h.dashT=0;h.inv=Math.max(h.inv,.6);burstFx(h.x,h.z,'smoke');SFX.magic();netEv('tele');if(meLoud())say(f?'✨ 깃발로 순간이동!':'✨ 출발점으로 순간이동!',false,1.2)}
// 쿠키 망원경
function scopeReveal(){const h=G.hero;const[cx,cz]=cellOf(h.x,h.z),R=5;for(let z=cz-R;z<=cz+R;z++)for(let x=cx-R;x<=cx+R;x++){if(x<0||z<0||x>=N||z>=N)continue;const i=idx(x,z);G.seen[i]=1;G.memE[i]=x<N-1?(B.E[i]?1:0):1;G.memS[i]=z<N-1?(B.S[i]?1:0):1}}
function doScope(ai){if(!skReady('scope',ai))return;skPay('scope');G.scopeT=12;scopeReveal();SFX.magic();if(meLoud()){say('🔭 망원경! 12초 동안 멀리까지 보여요',false,1.3);$('bigmap').hidden=false;setTimeout(()=>{if(screen==='play')$('bigmap').hidden=true},1800)}}
// 사탕 회복
function doHeal(ai){const h=G.hero;if(h.hp>=100){if(!ai)say('체력이 가득해요',false,1);return}if(!skReady('heal',ai))return;skPay('heal');h.hp=Math.min(100,h.hp+12);SFX.candy();burstFx(h.x,h.z,'smoke');netEv('heal');if(meLoud())say('💖 사탕 회복! 체력 35 회복',false,1.2)}
// 소다 얼리기
function doFreeze(ai){if(!skReady('freeze',ai))return;skPay('freeze');G.sodaFreeze=7;G.ptHold=G.devil.pt;SFX.magic();netEv('freeze');if(meLoud())say('🧊 마녀의 소다가 7초 동안 얼었어요',false,1.3)}
// 사탕 벽돌
let BRICKM=null;function brickMat(){if(BRICKM)return BRICKM;const f=keepM(new THREE.MeshLambertMaterial({map:keepTex(wallTex({style:'chocobar',face:['#ff9ec7','#e8708f'],frame:'#b03a5a',rim:'#ffd0e0'},512,270,6,2))})),s2=keepM(new THREE.MeshLambertMaterial({color:'#e8708f'})),t=keepM(new THREE.MeshLambertMaterial({color:'#ffd0e0'}));BRICKM=[s2,s2,t,s2,f,f];return BRICKM}
function doBrick(ai){const h=G.hero;if(h.cdBrick>0)return;let fx=Math.sin(h.face),fz=Math.cos(h.face);const o=Math.abs(fz)>=Math.abs(fx)?'H':'V';const[cx,cz]=cellOf(h.x,h.z);
  const cands=[];if(o==='H'){const gz=fz<0?cz+1:cz;for(const gx of[cx,cx+1])cands.push([gx,gz])}else{const gx=fx<0?cx+1:cx;for(const gz of[cz,cz+1])cands.push([gx,gz])}
  const hc=allCells();let ok=null;for(const[gx,gz]of cands){if(gx<1||gz<1||gx>N-1||gz>N-1)continue;if(B.walls.some(w=>w.o===o&&w.x===gx&&w.z===gz))continue;if(tryWall(o,gx,gz,null,hc)==='ok'){ok=[gx,gz];break}}
  if(!ok){if(!ai)say('여기엔 벽돌을 못 세워요',false,1);return}if(!skReady('brick',ai))return;skPay('brick');
  const w={o,x:ok[0],z:ok[1],temp:G.t+5,brick:1,anim:{t:0,from:null}};B.walls.push(w);rebuildEdges();FIELD.clear();syncWallMeshes();SFX.crunch();netEv('choco');if(meLoud())say('🧱 사탕 벽돌! 3초 동안 막아요',false,1.1)}
{const wm0=wallMesh;wallMesh=function(w){const g=wm0(w);if(w.brick&&g.children[0])g.children[0].material=brickMat();return g}}
// 쿠키 메아리
function echoHud(){const h=G.hero;if(h.isRival||G.mode!=='hero')return;const ef=exitField(),[cx,cz]=cellOf(h.x,h.z),v=Math.max(0,ef[idx(cx,cz)]|0);const el=$('echo');el.hidden=false;const tr=G.echoLast==null?'':v<G.echoLast?' ⬆ 가까워져요':v>G.echoLast?' ⬇ 멀어져요':'';if(G.echoV!==v){G.echoLast=G.echoV;G.echoV=v}el.textContent=`🍪 출구까지 ${v}칸`+(G.echoLast!=null&&G.echoLast!==v?(v<G.echoLast?' · 가까워져요':' · 멀어져요'):'')}
function doEcho(ai){if(!skReady('echo',ai))return;skPay('echo');G.echoT=5;G.echoV=null;G.echoLast=null;SFX.bell();echoHud();if(meLoud())say('🔊 쿠키 메아리!',false,.9)}
// 투시 사탕
function doXray(ai){if(!skReady('xray',ai))return;skPay('xray');G.seeHidden=3;SFX.magic();xrayOn();if(meLoud())say('🔮 투시! 숨은 것들이 3초 동안 보여요',false,1.2)}
function xrayOn(){if(G.mode!=='hero')return;for(const e of G.ents){if(TRAPS.includes(e.type)&&e.g)e.g.visible=true;if(e.type==='ghost')e.hide=false}for(const c of G.candies)if(c.fake&&!c.xr){const q=new THREE.Mesh(new THREE.RingGeometry(.75,1,20),new THREE.MeshBasicMaterial({color:'#ff3d5a',side:THREE.DoubleSide}));q.rotation.x=-Math.PI/2;q.position.y=-.9;c.g.add(q);c.xr=q}}
function xrayOff(){if(G.mode!=='hero'||G.reveal)return;for(const e of G.ents)if(TRAPS.includes(e.type)&&e.g)e.g.visible=false;for(const c of G.candies)if(c.xr){c.g.remove(c.xr);c.xr=null}}

/* ----- AI 도둑이 새 스킬 쓰기 ----- */
{const au1=aiSkillUse;aiSkillUse=function(near,seen,aimed){au1(near,seen,aimed);const h=G.hero,HS=G.heroSkills||[];
  if(HS.includes('dash2')&&h.dashCd>1.5&&seen&&near<4)doDash2(true);
  if(HS.includes('lure')&&seen&&near<9&&!G.lure)doLure(true);
  if(HS.includes('flag')&&(h.cdFlag||0)<=0&&openings(...cellOf(h.x,h.z))>=3&&Math.random()<.02)doFlag(true);
  if(HS.includes('tele')&&h.hp<35&&near<5&&(G.flags||[]).length)doTele(true);
  if(HS.includes('scope')&&G.t>10&&Math.random()<.004)doScope(true);
  if(HS.includes('heal')&&h.hp<=60)doHeal(true);
  if(HS.includes('freeze')&&G.devil.pt>5)doFreeze(true);
  if(HS.includes('brick')&&seen&&near<6&&near>2)doBrick(true);
  if(HS.includes('echo')&&Math.random()<.003)doEcho(true);
  if(HS.includes('xray')&&Math.random()<.003)doXray(true)}}
// 망원경·투시·메아리 HUD 자리
{const e=document.createElement('div');e.id='echo';e.hidden=true;$('hint').after(e)}

{const st=document.createElement('style');st.textContent=Object.keys(NSK).map(k=>`.dk.sk-${k}{background:linear-gradient(${NSK[k].bg})!important}`).join('');document.head.appendChild(st)}
