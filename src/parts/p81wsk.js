// ===== 81차: 거대 마녀 스킬 12개 새로 (사용자와 하나씩 정함) · 3개를 골라요 =====
// 사탕 폭탄(큰 1발) · 얼음 우박 · 얼음 감옥 · 블랙홀 사탕 · 숨은 덫 · 가짜 사탕(벽)
// 슬라임 대점프(+충격파) · 거미 그물(묶고 끌어오기) · 유령 순간이동(+2초 투명) · 박쥐(둘레 돌다 한 번 덮침) · 곰 연속 돌진(3번) · 창 울타리
// 기둥·창 울타리는 대시로 부딪혀 하나 깨고 나갈 수 있어서 길은 늘 남아요.
for(const k of Object.keys(MGWS))delete MGWS[k];
Object.assign(MGWS,{
 tower:{n:'사탕 폭탄',d:'아주 큰 사탕 폭탄 1개를 내리꽂아요 · 하트 1개 반',cd:16,range:28},
 ice:{n:'얼음 우박',d:'얼음 우박을 넓게 뿌려요 · 하트 반 칸 + 느려짐',cd:14,range:28},
 prison:{n:'얼음 감옥',d:'얼음 기둥이 둘러싸 4초 가둬요 · 안에선 느려짐 · 대시로 깨고 나와요',cd:18,range:24},
 magnet:{n:'블랙홀 사탕',d:'3초 동안 세게 빨아들이고 가운데가 터져요 · 하트 1개',cd:18,range:26},
 trap:{n:'숨은 덫',d:'덫 8개를 뿌려요 · 도둑은 3m 안에서만 보여요 · 15초',cd:16,range:26},
 fake:{n:'가짜 사탕',d:'진짜와 똑같은 가짜 사탕 2개 · 먹으면 벽이 솟아요',cd:20,range:0},
 skel:{n:'슬라임 대점프',d:'뛰어올라 쿵 착지 · 하트 1개 · 충격파 고리가 퍼져요(반 칸)',cd:15,range:18},
 spider:{n:'거미 그물',d:'부채꼴 그물 · 맞으면 2.5초 묶이고 마녀 쪽으로 끌려와요',cd:14,range:16},
 ghost:{n:'유령 순간이동',d:'조준한 곳으로 순간이동하고 2초 동안 투명해져요',cd:16,range:18},
 bat:{n:'박쥐 떼',d:'박쥐가 조준한 곳을 2초 돌다가 한 방향으로 덮쳐요 · 반 칸',cd:14,range:26},
 bear:{n:'곰 연속 돌진',d:'돌진 3번 · 사이마다 바라보는 쪽으로 다시 · 벽을 부숴요 · 하트 1개',cd:20,range:18},
 soldier:{n:'창 울타리',d:'사탕 창이 줄지어 꽂혀(반 칸) 6초 동안 울타리가 돼요',cd:16,range:24}});
MGWK.length=0;MGWK.push(...Object.keys(MGWS));
Object.assign(MGCOLS,{prison:'#7ccbf5',magnet:'#7a4dd0',trap:'#62d68a'});
Object.assign(MGAIM.w,{prison:'pt',magnet:'pt',trap:'pt',ghost:'pt',bat:'pt',spider:'dir',soldier:'fence'});delete MGAIM.w.slip;delete MGAIM.w.rev;
Object.assign(MGAR,{tower:6,prison:6,magnet:13,trap:7,ghost:2.2,bat:7,soldier:0});
// 새 아이콘 (얼음 감옥 · 블랙홀 · 숨은 덫)
const MGWART={
 prison:'<svg viewBox="0 0 48 48"><ellipse cx="24" cy="38" rx="18" ry="5" fill="#d6f2ff" stroke="#4a2a1a" stroke-width="2"/>'+[8,15,22,29,36].map((x,i)=>`<path d="M${x} ${38-(i%2)*2}V${14+(i%2)*3}l3.5-5 3.5 5V${38-(i%2)*2}z" fill="#9fdcff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/><path d="M${x+2} ${18+(i%2)*3}v12" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`).join('')+'</svg>',
 magnet:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#d9c2ff" stroke="#4a2a1a" stroke-width="2.2"/><path d="M24 7a17 17 0 0 1 14 26M24 41A17 17 0 0 1 10 15" fill="none" stroke="#7a4dd0" stroke-width="3" stroke-linecap="round"/><path d="M24 13a11 11 0 0 1 9 16M24 35a11 11 0 0 1-9-16" fill="none" stroke="#9b7bff" stroke-width="2.6" stroke-linecap="round"/><circle cx="24" cy="24" r="6" fill="#2a1040" stroke="#4a2a1a" stroke-width="2"/><circle cx="22" cy="22" r="1.6" fill="#ff9ec7"/></svg>',
 trap:'<svg viewBox="0 0 48 48"><ellipse cx="24" cy="32" rx="18" ry="8" fill="#a6f0c8" stroke="#4a2a1a" stroke-width="2.2" stroke-dasharray="5 3"/><path d="M8 20q16-14 32 0-16 14-32 0z" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><circle cx="24" cy="20" r="4.5" fill="#62d68a" stroke="#4a2a1a" stroke-width="1.8"/><path d="M9 33 39 9" stroke="#ff5f9e" stroke-width="3.4" stroke-linecap="round"/><path d="M9 33 39 9" stroke="#4a2a1a" stroke-width="1" stroke-linecap="round"/></svg>'};
const mgWArt=k=>MGWART[k]||ART[k]||'';
{const sd=mgSelDraw;mgSelDraw=function(){sd.apply(this,arguments);const m=$('mgSel');if(!m||m.dataset.role==='thief')return;for(const c of m.querySelectorAll('[data-k]')){const k=c.dataset.k;if(MGWART[k]){const sp=c.querySelector('span');if(sp)sp.innerHTML=MGWART[k]}}}}
{const hd=mgHud;mgHud=function(on){const r=hd.apply(this,arguments);if(on&&MG.role==='mon')for(const b of document.querySelectorAll('#mgBtns [data-a]')){const k=b.dataset.a;if(MGWART[k]){const sv=b.querySelector('svg');if(sv)sv.outerHTML=MGWART[k];else b.insertAdjacentHTML('afterbegin',MGWART[k])}}return r}}
{const st=document.createElement('style');st.textContent=`.mg-sel-grid.w{grid-template-columns:repeat(6,minmax(0,1fr))!important}`;document.head.appendChild(st)}

// ---------- 기둥 (얼음 감옥 · 창 울타리): 도둑이 못 지나가요, 대시로 부딪히면 하나 깨져요 ----------
MG.posts=[];MG.zones=[];MG.holes=[];MG.waves=[];MG.bats=[];MG.postN=0;MG.later=[];
function mgLater(t,fn){MG.later.push({at:MG.t+t,fn})}
function mgIcePillar(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.CylinderGeometry(.75,1.05,3.6,7),new THREE.MeshLambertMaterial({color:'#bfeaff',emissive:'#1a4a6a',transparent:true,opacity:.88}));m.position.y=1.8;g.add(m);
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.75,1.2,7),new THREE.MeshLambertMaterial({color:'#e8f8ff',emissive:'#1a4a6a',transparent:true,opacity:.9}));tip.position.y=4.2;g.add(tip);return g}
function mgPostAdd(x,z,r,T,mesh,grp){const id=grp+':'+MG.posts.length+':'+x.toFixed(1);if(mesh){mesh.position.set(x,0,z);MG.g.add(mesh);MG.rise.push({m:mesh,y:0,t:.15})}MG.posts.push({id,x,z,r,until:MG.t+T,m:mesh});return id}
function mgPostBreak(p,send){if(p.dead)return;p.dead=1;if(p.m)mgDrop(p.m);mgSpark(p.x,1.6,p.z,['#bfeaff','#ffffff','#ff9ec7'],14,{spd:7,grav:10});MGS.crunch(p.x,p.z);if(send&&MG.net)mgSend({k:'pbrk',id:p.id})}
function mgPostCollide(o,dash,isTh){for(const p of MG.posts){if(p.dead)continue;const dx=o.x-p.x,dz=o.z-p.z,d=Math.hypot(dx,dz)||.01,R=p.r+MGP.thR;if(d>=R)continue;
    if(dash&&isTh){mgPostBreak(p,true);mgMsg(MG.role==='thief'?'쾅! 깨고 나왔어요':'도둑이 기둥을 깼어요!',1);continue}o.x=p.x+dx/d*R;o.z=p.z+dz/d*R}}
// ---------- 블랙홀 · 충격파 · 박쥐 · 숨은 덫 · 감옥 안 느려짐 (매 프레임) ----------
let MGHOLEMAT=null;
function mgSkTick(dt){const th=MG.th,mo=MG.mo,local=!(MG.net&&MG.role==='mon');
  if(MG.later.length){const due=MG.later.filter(q=>MG.t>=q.at);MG.later=MG.later.filter(q=>MG.t<q.at);for(const q of due)try{q.fn()}catch(e){console.warn(e)}}
  // 기둥 시간 끝
  for(const p of MG.posts)if(!p.dead&&MG.t>=p.until){p.dead=1;if(p.m)mgDrop(p.m);mgSpark(p.x,1.2,p.z,['#ffffff','#bfeaff'],5,{spd:3,grav:6})}MG.posts=MG.posts.filter(p=>!p.dead);
  MG.zones=MG.zones.filter(z=>MG.t<z.until);
  if(local)for(const z of MG.zones)if(Math.hypot(th.x-z.x,th.z-z.z)<z.r)th.slowT=Math.max(th.slowT||0,.12);
  // 블랙홀: 빨아들이기
  for(const h of MG.holes){h.t+=dt;if(h.g){h.g.children[1].rotation.z-=dt*(3+h.t*2);h.g.children[0].scale.setScalar(.6+Math.min(1,h.t/h.T)*.6)}
    mgEmit('hl'+h.id,22,dt,()=>{const a=Math.random()*6.28,r=h.r*mgR(.5,1);mgP('glow',Math.random()<.5?'#9b7bff':'#ffffff',h.x+Math.cos(a)*r,mgR(.3,1.5),h.z+Math.sin(a)*r,{path:[h.x+Math.cos(a)*r,1,h.z+Math.sin(a)*r,h.x,.6,h.z],life:.7,s0:.7,s1:.2,op:.85,ease:1})});
    if(local&&!(th.dashT>0)){const dx=h.x-th.x,dz=h.z-th.z,d=Math.hypot(dx,dz);if(d<h.r&&d>.5){const k=(2.6+2.6*(1-d/h.r))*dt;th.x+=dx/d*k;th.z+=dz/d*k}}
    if(h.t>=h.T){h.dead=1;if(h.g)mgDrop(h.g);mgGlowAt(h.x,1.5,h.z,'#d9c2ff',14,.35);mgSpark(h.x,1,h.z,['#7a4dd0','#ff9ec7','#ffffff'],30,{spd:12,grav:10});MGS.boom(h.x,h.z,1);MG.shake=Math.max(MG.shake||0,.4)}}
  MG.holes=MG.holes.filter(h=>!h.dead);
  // 충격파 고리: 넓어지며 지나갈 때 닿으면 반 칸 (대시·점프로 넘어요)
  for(const w of MG.waves){const r0=w.r;w.r+=w.spd*dt;if(w.m){w.m.scale.set(w.r,w.r,1);w.m.material.opacity=.85*(1-w.r/w.max)}
    if(local&&!w.hit&&!(th.dashT>0)){const d=Math.hypot(th.x-w.x,th.z-w.z);if(d>=r0-.6&&d<=w.r+.6){if(mgHurt({x:w.x,z:w.z},'wave',.5))w.hit=1}}
    if(w.r>=w.max){w.dead=1;if(w.m)mgDrop(w.m)}}
  MG.waves=MG.waves.filter(w=>!w.dead);
  // 박쥐 둘레 돌기
  for(const b of MG.bats){b.t+=dt;for(const s of b.sp){if(s.dead)continue;const a=b.a0+s.a+b.t*3.2;s.p.lx=b.x+Math.cos(a)*s.r;s.p.lz=b.z+Math.sin(a)*s.r;s.p.ly=s.y+Math.sin(b.t*5+s.a)*.4;s.p.t=Math.min(s.p.t,.3)}
    if(b.t>=b.T){b.dead=1;for(const s of b.sp){s.p.t=s.p.life}}}
  MG.bats=MG.bats.filter(b=>!b.dead);
  // 숨은 덫: 도둑 화면에선 3m 안에서만
  const me=MG.role==='thief';for(const it of MG.items)if(it.hid&&it.g){it.g.visible=!me||Math.hypot(th.x-it.x,th.z-it.z)<3}
  // 감옥 · 울타리 기둥 부딪힘
  if(local){mgPostCollide(th,th.dashT>0,true);if(MG.decoy)mgPostCollide(MG.decoy,false,false)}}
{const tk=mgTick;mgTick=function(dt){tk.apply(this,arguments);if(MG.on&&MG.g&&!MG.pause&&!MG.over&&MG.cdn<=0)try{mgSkTick(dt)}catch(e){console.warn(e)}}}
{const cl=mgClean;mgClean=function(){MG.posts=[];MG.zones=[];MG.holes=[];MG.waves=[];MG.bats=[];MG.postN=0;MG.later=[];return cl.apply(this,arguments)}}

// ---------- 스킬 하나하나 ----------
const MGCAST={
 tower({P}){mgHit('circle',{x:P.x,z:P.z,r:6},2,{dmg:1.5,why:'tower',fall:{mesh:(()=>{const m=mgBombMesh();m.scale.setScalar(1.7);return m})(),y0:46,spin:2},end:()=>{MGS.boom(P.x,P.z,1);MGS.boom(P.x,P.z,1);mgRing(P.x,P.z,15,'#ffd6ea',.7);mgRing(P.x,P.z,10,'#ffffff',.5);MG.shake=Math.max(MG.shake||0,.8)}})},
 ice({P}){mgScatter(P,7,6).forEach((q,i)=>mgHit('circle',{x:q.x,z:q.z,r:2},1.2+i*.15,{dmg:.5,eff:'slow',quiet:i>0,why:'ice',fall:{mesh:mgIceMesh(),y0:34,spin:4},end:()=>{MGS.ice(q.x,q.z);mgRing(q.x,q.z,3.5,'#bfeaff',.35)}}))},
 prison({P}){const R=6,id='pr'+(MG.postN++);mgHit('circle',{x:P.x,z:P.z,r:R},.85,{dmg:0,why:'prison',end:()=>{MGS.ice(P.x,P.z);MGS.rise();for(let i=0;i<14;i++){const a=i/14*Math.PI*2;mgPostAdd(P.x+Math.cos(a)*R,P.z+Math.sin(a)*R,1.15,4,mgIcePillar(),id)}
   MG.zones.push({x:P.x,z:P.z,r:R,until:MG.t+4});mgRing(P.x,P.z,R+2,'#bfeaff',.5);const th=MG.th;if(Math.hypot(th.x-P.x,th.z-P.z)<R)mgMsg(MG.role==='thief'?'얼음 감옥! 대시로 기둥을 깨요':'도둑을 가뒀어요!',1.4)}})},
 magnet({P}){const g=new THREE.Group();const core=new THREE.Mesh(new THREE.CircleGeometry(2.4,32),new THREE.MeshBasicMaterial({color:'#2a1040',transparent:true,opacity:.9,depthWrite:false}));core.rotation.x=-Math.PI/2;core.position.y=.16;g.add(core);
   const sw=new THREE.Mesh(new THREE.CircleGeometry(4.6,32),new THREE.MeshBasicMaterial({map:mgTex('swirl'),color:'#9b7bff',transparent:true,opacity:.8,depthWrite:false}));sw.rotation.x=-Math.PI/2;sw.position.y=.17;g.add(sw);
   const rg=new THREE.Mesh(new THREE.RingGeometry(12.6,13,56),new THREE.MeshBasicMaterial({color:'#7a4dd0',transparent:true,opacity:.6,depthWrite:false,side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.y=.15;g.add(rg);
   g.position.set(P.x,0,P.z);MG.g.add(g);MG.holes.push({x:P.x,z:P.z,r:13,t:0,T:3,g,id:Math.random()});MGS.zap(P.x,P.z);
   mgHit('circle',{x:P.x,z:P.z,r:3.6},3,{dmg:1,why:'magnet',quiet:1});mgMsg(MG.role==='thief'?'블랙홀! 반대로 달려요':'블랙홀!',1.4)},
 trap({P}){const ty=['slip','rev','trap'];mgScatter(P,7,8).forEach((q,i)=>{const k=ty[i%3];mgLater(.12+i*.06,()=>{const it=mgItem(k,q.x,q.z,15,1.6,mgPadMesh(k));it.hid=1;if(MG.role==='mon')mgSpark(q.x,.6,q.z,[MGCOLS[k],'#ffffff'],6,{spd:4,grav:8})})});MGS.whoosh(P.x,P.z)},
 fake(){for(let i=0;i<2;i++){const c=mgFarCell(16);if(c){const g=mgCandyMesh();mgItem('fake',c.x,c.z,30,1.7,g)}}MGS.magic();mgMsg(MG.role==='mon'?'가짜 사탕 2개를 뿌렸어요':'사탕 냄새가 나요…',1.4)},
 skel({P,mo}){const p=mgClampPt({x:P.x,z:P.z},18);mo.jump={x0:mo.x,z0:mo.z,x1:p.x,z1:p.z,t:0,T:1.3};MGS.jump(mo.x,mo.z);
   mgHit('circle',{x:p.x,z:p.z,r:5.2},1.3,{why:'skel',end:()=>{MGS.boom(p.x,p.z,1);mgSmash({x:p.x,z:p.z},3.5);mgRing(p.x,p.z,10,'#b98cff',.55);MG.shake=Math.max(MG.shake||0,.6);
     const m=new THREE.Mesh(new THREE.RingGeometry(.86,1,64),new THREE.MeshBasicMaterial({color:'#c99cff',transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(p.x,.25,p.z);MG.g.add(m);MG.waves.push({x:p.x,z:p.z,r:2,spd:8,max:12,m})}})},
 spider({P,mo,aim,f}){let dir=f;if(aim&&aim.drag)dir=Math.atan2(P.z-mo.z,P.x-mo.x);const ox=mo.x,oz=mo.z;
   mgHit('cone',{x:ox,z:oz,r:16,a:.52,dir},.8,{dmg:0,why:'spider',end:hit=>{MGS.web(ox+Math.cos(dir)*8,oz+Math.sin(dir)*8);const wx=ox+Math.cos(dir)*7,wz=oz+Math.sin(dir)*7;mgItem('web',wx,wz,10,4.2,mgWebMesh(4.2));
     if(hit&&!(MG.net&&MG.role==='mon')){const th=MG.th;if(!(th.dashT>0)){th.rootT=2.5;const dx=mo.x-th.x,dz=mo.z-th.z,L=Math.hypot(dx,dz)||1,pull=Math.min(8,Math.max(0,L-MGP.moR-2.5));th.kx=dx/L*pull*3.2;th.kz=dz/L*pull*3.2;mgMsg('거미 그물에 걸렸어요!',1.2)}}}})},
 ghost({P,mo}){const W=MGW();let q=mgClampPt({x:P.x,z:P.z},18);let[cx,cz]=cellOf(q.x,q.z);if(!mgOpen(cx,cz)){q={x:mo.x,z:mo.z}}
   try{mgPortal(mo.x,mo.z,'#b98cff',.8)}catch(e){}mo.x=clamp(q.x,MGP.moR,W-MGP.moR);mo.z=clamp(q.z,MGP.moR,W-MGP.moR);try{mgPortal(mo.x,mo.z,'#b98cff',.8)}catch(e){}mo.ghostT=2;MGS.magic();MGS.whoosh(mo.x,mo.z);
   if(MG.role==='mon')mgMsg('순간이동!',.9)},
 bat({P}){const T=2,a0=Math.random()*6.28,dir=Math.random()*6.28,ux=Math.cos(dir),uz=Math.sin(dir),sx=P.x-ux*9,sz=P.z-uz*9;
   const sp=[];for(let i=0;i<16;i++){const p=mgP('bat',i%4?'#3a1d50':'#7a5cc0',P.x,3,P.z,{life:T+.2,s0:1.4,s1:1.5,flap:18+Math.random()*8,rot:false,fin:.05,pow:8});if(p){p.vx=p.vy=p.vz=0;sp.push({p,a:i/16*6.28,r:4+Math.random()*3.5,y:1.6+Math.random()*2.5})}}
   MG.bats.push({x:P.x,z:P.z,t:0,T,a0,sp});MGS.bats(P.x,P.z);
   mgLater(1,()=>{mgHit('rect',{x:sx,z:sz,w:4,len:18,dir},1,{dmg:0,why:'bat',end:()=>{MGS.bats(P.x,P.z);mgSweep(sx,sz,ux,uz,4,18,30,'bat',.5);
     for(let i=0;i<22;i++){const s=(Math.random()-.5)*3.6,v=26+Math.random()*8;mgP('bat',i%4?'#3a1d50':'#7a5cc0',sx-uz*s,1.2+Math.random()*2.6,sz+ux*s,{vx:ux*v,vz:uz*v,life:.7,s0:1.5,s1:1.6,flap:20,rot:false,fin:.05,pow:6})}}})})},
 bear({mo,f,aim,P}){let dir=f;if(aim&&aim.drag)dir=Math.atan2(P.z-mo.z,P.x-mo.x);mo.bearN=2;mgBearSeg(mo.x,mo.z,dir)},
 soldier({P,mo}){const a=Math.atan2(P.z-mo.z,P.x-mo.x),px=-Math.sin(a),pz=Math.cos(a),id='fe'+(MG.postN++);
   for(let i=0;i<8;i++){const o=(i-3.5)*2,q=mgClampPt({x:P.x+px*o,z:P.z+pz*o},0);mgHit('circle',{x:q.x,z:q.z,r:1.3},1+i*.06,{dmg:.5,quiet:i>0,why:'soldier',fall:{mesh:mgSpearMesh(),y0:30},end:()=>{MGS.boom(q.x,q.z);mgSpark(q.x,1,q.z,['#ffd23a','#ff5f9e'],6,{spd:6,grav:10});const m=mgSpearMesh();m.position.y=.3;const g=new THREE.Group();g.add(m);mgPostAdd(q.x,q.z,.8,6,g,id)}})}}};
// 곰 돌진 한 번 (예고 0.6초 → 돌진)
function mgBearSeg(x,z,dir){const mo=MG.mo,ux=Math.cos(dir),uz=Math.sin(dir);mo.lockT=.75;if(MG.role!=='mon'||MG.both)mo.yaw=Math.atan2(-ux,-uz); // 내 화면은 저절로 안 돌려요
 
  mgHit('rect',{x,z,w:4.6,len:18,dir},.6,{dmg:0,why:'bear',end:()=>{mo.charge={ux,uz,d:18};MGS.whoosh(mo.x,mo.z);try{mgGlowAt(mo.x,6,mo.z,'#ff9e5f',6,.4)}catch(e){}}})}
// 돌진이 끝나면 남은 횟수만큼 다시 (마녀 쪽에서 방향을 정해 상대에게 알려요)
{const f=mgMoTick;mgMoTick=function(dt,mv){const mo=MG.mo,had=!!mo.charge;const r=f.apply(this,arguments);
  if(had&&!mo.charge&&mo.bearN>0&&!(MG.net&&MG.role==='thief')&&!MG.over){mo.bearN--;let dir;
    if(MG.role==='mon'&&!MG.both){dir=Math.atan2(-Math.cos(mo.yaw),-Math.sin(mo.yaw))}else{const th=MG.th;dir=Math.atan2(th.z-mo.z,th.x-mo.x)}
    const x=mo.x,z=mo.z;mgLater(.2,()=>{mgBearSeg(x,z,dir);if(MG.net)mgSend({k:'bseg',x:mgR2(x),z:mgR2(z),dir})})}return r}}
// 온라인: 곰 다음 돌진 · 기둥 깨짐
{const nr=mgNetRx;mgNetRx=function(d){if(d&&d.k==='bseg'&&MG.on){const mo=MG.mo;mo.x=d.x;mo.z=d.z;mgBearSeg(d.x,d.z,d.dir);return}
  if(d&&d.k==='pbrk'&&MG.on){const p=MG.posts.find(q=>q.id===d.id);if(p)mgPostBreak(p,false);return}return nr.apply(this,arguments)}}
// AI 마녀가 언제 쓸지
function mgAiOk(k,d,aim,px,pz){const th=MG.th;const S=MGWS[k];if(!S)return false;
  if(k==='tower'||k==='ice'||k==='prison'||k==='magnet'||k==='bat')return d<(S.range||24)-1;
  if(k==='trap'||k==='soldier'){if(MG.cand||MG.exitOpen){const gx=MG.cand?MG.cand.x:cx2x(EXIT[0]),gz=MG.cand?MG.cand.z:cx2x(EXIT[1]);aim.x=th.x+(gx-th.x)*.45;aim.z=th.z+(gz-th.z)*.45}return d<24}
  if(k==='fake')return MG.t>8;if(k==='skel')return d>7&&d<18;if(k==='spider')return d<15;if(k==='bear')return d<16&&d>4;
  if(k==='ghost'){if(d>14){const L=d||1,mo=MG.mo;aim.x=th.x-(th.x-mo.x)/L*6;aim.z=th.z-(th.z-mo.z)/L*6;return true}return false}return false}
// AI 도둑: 블랙홀·충격파를 피하고, 기둥에 막히면 대시
{const dg=mgDangerAt;mgDangerAt=function(x,z){let d=dg(x,z);for(const h of MG.holes)if(Math.hypot(x-h.x,z-h.z)<h.r*.75)d+=2.2;for(const w of MG.waves){const q=Math.hypot(x-w.x,z-w.z);if(q>w.r-.5&&q<w.r+3)d+=2.5}
  for(const p of MG.posts)if(Math.hypot(x-p.x,z-p.z)<p.r+.8)d+=1.5;return d}}
{const f=mgThiefAI;mgThiefAI=function(dt){const th=MG.th,r=f.apply(this,arguments);const ai=MG.ai;ai.st=(ai.st||0)+dt;if(ai.st>.7){const mv=Math.hypot(th.x-(ai.sx??th.x),th.z-(ai.sz??th.z));ai.sx=th.x;ai.sz=th.z;ai.st=0;
    const near=MG.posts.some(p=>Math.hypot(th.x-p.x,th.z-p.z)<p.r+1.6);if(near&&mv<1.2&&th.charges>0&&r&&(r[0]||r[1])){th.dx=r[0];th.dz=r[1];th.moving=true;mgDash(th)}}return r}}
// 스킬 효과: 새 스킬에 맞게
{const wf=mgWiFx;mgWiFx=function(k){const mo=MG.mo,c=MGCOLS[k]||'#ffffff',H=MGP.moH/9.2,head=6.4*H;if(mo.ghostT>0&&MG.role==='thief'&&k!=='ghost')return;
  const fx=-Math.sin(mo.yaw),fz=-Math.cos(mo.yaw),sx=mo.x+fx*1.2-fz*1.4,sz=mo.z+fz*1.2+fx*1.4;
  if(!['bear','ghost'].includes(k)){mgGlowAt(sx,head+1.5,sz,c,4,.4);mgSpark(sx,head+1.5,sz,[c,'#ffffff'],10,{spd:5,grav:2})}
  if(k==='spider'){const h=MG.hits[MG.hits.length-1];if(h&&h.why==='spider'&&h.kind==='cone'){const dir=h.o.dir;for(let i=0;i<5;i++){const a=dir+(i-2)*.22,L=15;mgP('web','#ffffff',sx,head+1,sz,{path:[sx,head+1,sz,mo.x+Math.cos(a)*L,.6,mo.z+Math.sin(a)*L,2],life:h.T,s0:.8,s1:2.6,op:1,fin:.05,pow:8,rot:false})}}}
  else if(k==='skel'){mgSpark(mo.x,.6,mo.z,['#e8c48a','#ffffff'],12,{spd:5})}
  else if(k==='bear'){mgRing(mo.x,mo.z,7,c,.5)}}}
{const im=mgImpactFx;mgImpactFx=function(h){const o=h.o,w=h.why;
  if(w==='tower'){mgGlowAt(o.x,2,o.z,'#fff1a8',22,.4);mgSpark(o.x,1.5,o.z,['#ff5f9e','#ffd23a','#7cc6ff','#ffffff'],44,{spd:17,size:1.1,grav:14});return}
  if(w==='prison'||w==='bear'||w==='bat'||w==='magnet')return;return im.apply(this,arguments)}}
// 조준 표시: 창 울타리는 조준한 곳을 가로지르는 줄
{const ps=mgPrevSync;mgPrevSync=function(){ps.apply(this,arguments);const d=MGDR;if(!d.a||!d.g||mgAimKind(d.a)!=='fence')return;const me=MG.mo,P=d.P,u=d.g.userData;
  u.ring.visible=u.fill.visible=false;u.dot.visible=true;const a=Math.atan2(P.z-me.z,P.x-me.x);u.bar.scale.set(16,1.2,1);u.bar.position.set(P.x-me.x,.15,P.z-me.z);u.bar.rotation.set(-Math.PI/2,0,-(a+Math.PI/2))}}
// ---------- 버튼 모양·자리: 메인 게임 도둑 버튼과 같게 ----------
// 색이 칠해진 동그라미 + 흰 아이콘 + 아래 이름, 대시(평타)는 오른쪽 아래 큰 분홍 버튼, 스킬은 그 왼쪽·왼쪽 위·위
const MGSHORT={tower:'폭탄',ice:'우박',prison:'감옥',magnet:'블랙홀',trap:'숨은 덫',fake:'가짜 사탕',skel:'대점프',spider:'그물',ghost:'순간이동',bat:'박쥐',bear:'돌진',soldier:'울타리',stomp:'구슬',dash:'대시'};
{const bp=mgBtnPaint;mgBtnPaint=function(){bp.apply(this,arguments);for(const b of document.querySelectorAll('#mgBtns [data-a]')){const a=b.dataset.a;if(b.querySelector('.lb'))continue;
  const nm=MGSHORT[a]||(MG.role==='thief'?mgSkName(a):(MGWS[a]||{}).n||'');const l=document.createElement('span');l.className='lb';l.textContent=nm;b.appendChild(l)}}}
mgBtnLayout=function(){const box=$('mgBtns');if(!box||!MG.on)return;const big=box.querySelector('.mg-ab.big');if(!big)return;const sk=[...box.querySelectorAll('.mg-ab:not(.big)')];box.classList.add('arc');
  const W=innerWidth,H=innerHeight;const Bs=Math.round(Math.max(70,Math.min(98,H*.25))),s=Math.round(Bs*.76),pad=Math.round(Math.max(8,Math.min(14,H*.03)));let sr=0;try{sr=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sar'))||0}catch(e){}
  const cx=W-Math.max(pad,sr)-Bs/2,cy=H-pad-Bs/2;const put=(b,x,y,z)=>{b.style.position='fixed';b.style.left=(x-z/2)+'px';b.style.top=(y-z/2)+'px';b.style.width=b.style.height=z+'px';b.style.margin='0'};
  put(big,cx,cy,Bs);const R=Bs/2+s/2+Math.round(Bs*.09);const ang=sk.length<=1?[205]:sk.length===2?[180,232]:[180,228,276];
  sk.forEach((b,i)=>{const a=ang[i]*Math.PI/180;put(b,cx+R*Math.cos(a),cy+R*Math.sin(a),s)});};
{const st=document.createElement('style');st.textContent=`
#mgHud .mg-btns.arc .mg-ab{border:3px solid var(--choco)!important;border-radius:50%!important;padding:0!important;display:grid;place-items:center;color:#fff;
  background:linear-gradient(color-mix(in srgb,var(--c) 55%,#fff),var(--c))!important;box-shadow:0 4px 0 var(--choco),inset 0 -5px 0 #0002,inset 0 4px 0 #fff7!important}
#mgHud .mg-btns.arc .mg-ab::before,#mgHud .mg-btns.arc .mg-ab::after{display:none!important}
#mgHud .mg-btns.arc .mg-ab>svg{width:46%;height:46%;margin-top:-24%;position:relative;z-index:1;filter:drop-shadow(0 1px 0 #0003)}
#mgHud .mg-btns.arc .mg-ab.mgcard>svg{width:52%;height:52%;margin-top:-22%}
#mgHud .mg-btns.arc .mg-ab .lb{position:absolute;bottom:11%;left:0;right:0;text-align:center;font:clamp(10px,3.2vh,13px) var(--f-display);color:#fff;text-shadow:0 1px 0 #0005;pointer-events:none;white-space:nowrap;z-index:2}
#mgHud .mg-btns.arc .mg-ab.big{background:linear-gradient(#ff9ec7,#ff4f93)!important}#mgHud .mg-btns.arc .mg-ab.big .lb{font-size:clamp(12px,3.8vh,15px)}#mgHud .mg-btns.arc .mg-ab.big>svg{width:50%;height:50%}
#mgHud .mg-btns.arc .mg-ab.wait{filter:grayscale(.75) brightness(.9);opacity:.85}#mgHud .mg-btns.arc .mg-ab.wait svg{filter:none}
#mgHud .mg-btns.arc .mg-ab .cd{inset:-3px;border-radius:50%}
#mgHud .mg-btns.arc .mg-ab .sec{font-size:clamp(16px,5vh,22px);align-items:start;padding-top:22%}
#mgHud .mg-btns.arc .mg-ab.used{filter:grayscale(1);opacity:.6}`;document.head.appendChild(st)}
try{const d=$('bDash')&&$('bDash').querySelector('svg');if(d)MGI.dash=d.outerHTML}catch(e){} // 대시 아이콘도 메인 게임과 같게
// 스킬 고르기 아래 설명도 한 줄로 (넘치면 글자를 줄여요)
{const sd=mgSelDraw;mgSelDraw=function(){sd.apply(this,arguments);const n=document.querySelector('#mgSel .mg-sel-bot p');if(!n)return;n.style.fontSize='';let f=parseFloat(getComputedStyle(n).fontSize)||13;for(let i=0;i<10&&n.scrollWidth>n.clientWidth+1&&f>9;i++){f-=.5;n.style.fontSize=f+'px'}}}
{const st=document.createElement('style');st.textContent=`#mgSel .mg-sel-bot p{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-height:0;line-height:1.3}`;document.head.appendChild(st)}
// ---------- 사탕 지키기 막기: 마녀가 사탕 8m 안에 5초 넘게 있으면 사탕이 먼 곳으로 도망가요 ----------
// 정하는 건 도둑 쪽(혼자 하기는 그냥 내 쪽). 남은 시간은 양쪽 화면 가운데 위에 작은 막대로 보여요.
const MGGUARD={r:8,T:5};
function mgFleeCell(){const mo=MG.mo,th=MG.th;let best=null;for(let i=0;i<90;i++){const x=(Math.random()*N)|0,z=(Math.random()*N)|0;if(!mgOpen(x,z)||(x===EXIT[0]&&z===EXIT[1]))continue;const px=cx2x(x),pz=cx2x(z);
  const dM=Math.hypot(px-mo.x,pz-mo.z),dT=Math.hypot(px-th.x,pz-th.z);const sc=Math.min(dM,34)+Math.min(dT,12)*.3+Math.random()*3-(dM<20?60:0);if(!best||sc>best.sc)best={x:px,z:pz,sc}}return best}
function mgCandFlee(x,z){const c=MG.cand;if(c){mgSpark(c.x,1.6,c.z,['#ffd23a','#ff5f9e','#ffffff'],18,{spd:7,up:3,grav:5});try{mgBeam(c.x,c.z,'#ffd23a',1,8,.5)}catch(e){}}
  mgNetCand(x,z);mgSpark(x,1.6,z,['#ffd23a','#ffffff'],14,{spd:5,up:4,grav:4});MGS.whoosh(x,z);MGS.candy();mgMsg(MG.role==='thief'?'마녀가 지켜서 사탕이 도망갔어요!':'사탕이 도망갔어요! 너무 오래 지켰어요',1.8);MG.guard=0}
function mgGuardTick(dt){const c=MG.cand,mo=MG.mo;if(!c){MG.guard=0;return}const near=Math.hypot(mo.x-c.x,mo.z-c.z)<MGGUARD.r;MG.guard=near?(MG.guard||0)+dt:Math.max(0,(MG.guard||0)-dt*.6);
  if(MG.guard>=MGGUARD.T&&!(MG.net&&MG.role==='mon')){const q=mgFleeCell();if(q){mgCandFlee(q.x,q.z);if(MG.net)mgSend({k:'cand',x:mgR2(q.x),z:mgR2(q.z),flee:1})}else MG.guard=0}
  const g=$('mgGuard');if(g){const k=Math.min(1,(MG.guard||0)/MGGUARD.T);g.classList.toggle('on',k>.08);$('mgHud').classList.toggle('guard',k>.08);g.querySelector('i').style.width=(k*100).toFixed(0)+'%'}}
{const tk=mgTick;mgTick=function(dt){tk.apply(this,arguments);if(MG.on&&MG.g&&!MG.pause&&!MG.over&&MG.cdn<=0)try{mgGuardTick(dt)}catch(e){console.warn(e)}}}
{const nr=mgNetRx;mgNetRx=function(d){if(d&&d.k==='cand'&&d.flee&&MG.on&&MG.g){mgCandFlee(d.x,d.z);return}return nr.apply(this,arguments)}}
{const hd=mgHud;mgHud=function(on){const first=!$('mgHud');const r=hd.apply(this,arguments);if(first){const m=document.querySelector('#mgHud .mg-mid');const g=document.createElement('div');g.id='mgGuard';g.innerHTML=`<span>${MGI.candy}</span><b><i></i></b>`;m.appendChild(g)}
  if(on){MG.guard=0;const g=$('mgGuard');if(g)g.classList.remove('on')}return r}}
{const st=document.createElement('style');st.textContent=`#mgGuard{display:none;align-items:center;gap:4px;background:#4a2a1ad0;border-radius:10px;padding:2px 8px 2px 4px}#mgGuard.on{display:flex}#mgHud.guard .mg-msg{top:100px}
#mgGuard span{width:18px;height:18px;display:block}#mgGuard span svg{width:100%;height:100%}#mgGuard b{display:block;width:64px;height:7px;border-radius:4px;background:#ffffff40;overflow:hidden}#mgGuard i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ffd23a,#ff5f5f)}`;document.head.appendChild(st)}
{const st=document.createElement('style');st.textContent=`
#mgHud #mgCancel{transform:none!important;flex-direction:column;justify-content:center;gap:0;padding:0;border-radius:50%;background:#fff8ee;box-shadow:0 3px 0 var(--choco);font-size:11px;line-height:1}
#mgHud #mgCancel i{width:52%;height:52%;border:0;background:none;padding:0}#mgHud #mgCancel i svg path:first-child{stroke:#ff5f5f}
#mgHud #mgCancel.hot{background:#ff6b6b;color:#fff;transform:scale(1.15)!important}#mgHud #mgCancel.hot i svg path:first-child{stroke:#fff}`;document.head.appendChild(st)}
// ---------- 메인 게임에서 남은 것 치우기 ----------
// 메인 게임의 연기 조각(G.fx)은 메인 화면에서만 움직여서, 미니게임에선 흰 덩어리로 멈춰 보였어요. 정답 길 선(G.pathLines)도 남아 있었어요.
function mgWallCrumb(w){const x=w.x*C,z=w.z*C;mgSpark(x,1.6,z,['#e0a060','#c97a3a','#fff1dd'],14,{spd:7,grav:12,size:.8,tex:'glow'});mgSpark(x,2.4,z,['#ffd6a0','#e8c48a'],8,{spd:5,grav:10,size:.5})}
{const hw=mgHideWorld;mgHideWorld=function(on){if(on){try{for(const k of['pathLines','fx','projs','sigils','marks','candies'])for(const o of(G[k]||[]))drop(o.g||o.m||o);for(const k of['pathLines','fx','projs','sigils','marks'])G[k]=[]}catch(e){console.warn(e)}}return hw.apply(this,arguments)}}
// ---------- 취소: 와일드 리프트처럼 스킬 묶음 오른쪽 위의 X 버튼 ----------
// 스킬을 끄는 동안만 떠요. X 쪽으로 끌어서 놓으면 안 써요. 미니맵과 겹치는 화면에선 끄는 동안 미니맵을 잠깐 숨겨요.
function mgCancelPlace(){const c=$('mgCancel'),box=$('mgBtns');if(!c||!box)return;const bs=[...box.querySelectorAll('.mg-ab')];if(!bs.length)return;
  const big=box.querySelector('.mg-ab.big');const br=big.getBoundingClientRect();let top=1e9;for(const b of bs){const r=b.getBoundingClientRect();top=Math.min(top,r.top)}
  const z=Math.round(br.width*(innerHeight<360?.52:.6)),x=br.right-z/2-2,gap=Math.max(50,innerHeight*.14);let y=top-gap-z/2;y=Math.max(54+z/2,y); // 스킬과 충분히 떨어지게 (위 버튼줄 아래까지)
  c.style.left=(x-z/2)+'px';c.style.top=(y-z/2)+'px';c.style.width=c.style.height=z+'px';
  const m=document.querySelector('#mgHud .mg-map');if(m){const mr=m.getBoundingClientRect();$('mgHud').classList.toggle('cxmap',y-z/2<mr.bottom+4)}}
{const mv=mgBtnMove;mgBtnMove=function(e){const d=MGDR;const was=d.moved;mv.apply(this,arguments);if(d.a&&d.moved&&!was)mgCancelPlace()}}
{const st=document.createElement('style');st.textContent=`
#mgHud #mgCancel{transform:none!important;flex-direction:column;align-items:center;justify-content:center;gap:0;padding:0;border-radius:50%;background:#3a1d10cc;border:3px solid #ff5f5f;box-shadow:0 0 0 3px #ff5f5f55;color:#fff;font-size:0}
#mgHud #mgCancel b,#mgHud #mgCancel{font-size:0}#mgHud #mgCancel i{width:56%;height:56%;border:0;background:none;padding:0}#mgHud #mgCancel i svg path:first-child{stroke:#ff5f5f}#mgHud #mgCancel i svg path:last-child{stroke:#ff5f5f}
#mgHud #mgCancel.hot{background:#ff5f5f;transform:scale(1.15)!important}#mgHud #mgCancel.hot i svg path{stroke:#fff}
#mgHud.aiming.cxmap .mg-map{visibility:hidden}`;document.head.appendChild(st)}
// 마녀 미니맵은 마녀가 처음 바라보는 쪽(도둑 출발점 쪽)이 위로 오게 뒤집어요 (돌아가진 않아요)
{const st=document.createElement('style');st.textContent=`#mgHud.witch #mgMap{transform:rotate(180deg)}`;document.head.appendChild(st)}

// ===== 82: 평타 · 곰 · 박쥐 다시 (사용자 요청 2026-11-13) =====
// 평타: 지팡이 끝에서 조준한 곳으로 마법 줄기가 바로 날아가 내리꽂혀요. 거리 제한 없음(판 안이면 어디든). 0.5초 예고(작은 원) 뒤 하트 반 칸.
MGP.stomp.range=120;MGAIM.w.stomp='pt';MGAR.stomp=1.7;
function mgBolt(aim){const mo=MG.mo,H=MGP.moH/9.2;const P=mgClampPt(aim?{x:aim.x,z:aim.z}:mgAim(),0);
  mo.cd.stomp=MGP.stomp.cd;mo.lockT=.12;mo.m.atkT=.6;MG.stat.atk.orb=(MG.stat.atk.orb||0)+1;
  const fx=-Math.sin(mo.yaw),fz=-Math.cos(mo.yaw),sx=mo.x+fx*1.4+Math.cos(mo.yaw)*1.3,sz=mo.z+fz*1.4-Math.sin(mo.yaw)*1.3,sy=7.4*H,T=.5;
  MGS.shoot(sx,sz);const vis=!(mo.ghostT>0&&MG.role==='thief');
  if(vis){mgGlowAt(sx,sy,sz,'#ffb3d6',3.5,.3)}
  // 줄기: 빛 알갱이 여러 개가 지팡이에서 목표로 차례로 날아가요 (위에서 아래로 휘어 내리꽂힘)
  for(let i=0;i<7;i++)mgP(i%2?'star':'glow',i%3?'#ff5f9e':'#ffffff',sx,sy,sz,{path:[sx,sy,sz,P.x,.4,P.z,2.5],life:T*(.55+i*.075),s0:1.3-i*.08,s1:.5,op:1,ease:0,fin:.02,pow:6});
  mgHit('circle',{x:P.x,z:P.z,r:1.7},T,{dmg:MGP.stomp.dmg,why:'orb',quiet:1,end:()=>{MGS.pop(P.x,P.z);mgGlowAt(P.x,.8,P.z,'#ffb3d6',4.5,.3);mgSpark(P.x,.6,P.z,['#ff5f9e','#ffffff','#ffd23a'],12,{spd:6,grav:9});mgRing(P.x,P.z,3,'#ff9ec7',.35)}});
  return true}
// 구슬 맞을 때 상대 화면에서 구슬 찾던 것은 이제 필요 없어요(줄기는 예고 원으로 같이 맞춰져요)

// 곰 연속 돌진: 처음 쓰면 한 번 돌진. 돌진이 끝나면 3초 안에 곰 버튼을 다시 누를 때마다 한 번 더 (최대 3번). 방향은 끌어서 조준하거나 바라보는 쪽.
MGWS.bear.d='돌진 · 끝나고 3초 안에 다시 누르면 또 돌진(최대 3번) · 하트 1개';
function mgBearReady(){const mo=MG.mo;return mo.bearN>0&&MG.t<(mo.bearWin||0)&&!mo.charge&&!(mo.bearSegT>MG.t)}
MGCAST.bear=function({mo,f,aim,P}){let dir=f;if(aim&&aim.drag)dir=Math.atan2(P.z-mo.z,P.x-mo.x);mo.bearN=2;mo.bearWin=0;mo.bearSegT=MG.t+1.2;mgBearSeg(mo.x,mo.z,dir)};
{const f=mgCast;mgCast=function(k,aim){const mo=MG.mo;if(k==='bear'&&!MGN.remote&&mgBearReady()&&MG.role==='mon'&&!MG.both){
    let dir=Math.atan2(-Math.cos(mo.yaw),-Math.sin(mo.yaw));if(aim){const P=aim.x!=null?aim:null;if(P&&Math.hypot(P.x-mo.x,P.z-mo.z)>1)dir=Math.atan2(P.z-mo.z,P.x-mo.x)}
    mo.bearN--;mo.bearWin=0;mo.bearSegT=MG.t+1.2;const x=mo.x,z=mo.z;mgBearSeg(x,z,dir);if(MG.net)mgSend({k:'bseg',x:mgR2(x),z:mgR2(z),dir});return true}
  return f.apply(this,arguments)}}
// 돌진이 끝나면: 사람 마녀는 3초 기다림(버튼이 반짝), AI 마녀는 알아서 이어서
{const mt=mgMoTick;mgMoTick=function(dt,mv){const mo=MG.mo,had=!!mo.charge;const human=MG.role==='mon'&&!MG.both;const n=mo.bearN;if(human)mo.bearN=0;const r=mt.apply(this,arguments);if(human)mo.bearN=n;
  if(human&&had&&!mo.charge&&mo.bearN>0)mo.bearWin=MG.t+3;if(human&&mo.bearN>0&&mo.bearWin&&MG.t>mo.bearWin){mo.bearN=0;mo.bearWin=0}return r}}
{const bd=mgBtnDown;mgBtnDown=function(e,b){const mo=MG.mo;if(b.dataset.a==='bear'&&MG.role==='mon'&&mgBearReady()){const c=mo.cd.bear;mo.cd.bear=0;try{return bd.apply(this,arguments)}finally{mo.cd.bear=c}}return bd.apply(this,arguments)}}
{const am=mgAct;mgAct=function(a){const mo=MG.mo;if(a==='bear'&&MG.role==='mon'&&mgBearReady()){if(!MG.on||MG.over||MG.pause||MG.cdn>0)return;return mgCast('bear')}return am.apply(this,arguments)}}
{const hs=mgHudSync;mgHudSync=function(){hs.apply(this,arguments);if(!MG.on||MG.role!=='mon')return;const b=document.querySelector('#mgBtns [data-a=bear]');if(!b)return;const on=mgBearReady();b.classList.toggle('recast',on);
  if(on){b.classList.remove('wait');const s=b.querySelector('.sec');if(s)s.textContent='';const cd=b.querySelector('.cd');if(cd)cd.style.setProperty('--k',0);b.dataset.n=MG.mo.bearN}}}

// 박쥐 회오리: 박쥐 떼가 3초 동안 마녀 둘레(4.5~9.5m)를 돌아요. 0.5초 뒤부터 닿으면 반 칸 + 바깥으로 튕겨요. 가까이 온 도둑을 쫓아내는 스킬.
Object.assign(MGWS.bat,{n:'박쥐 회오리',d:'박쥐가 3초 동안 마녀 둘레를 돌아요 · 닿으면 반 칸 + 튕겨 나가요',cd:14,range:0});delete MGAIM.w.bat;MGSHORT.bat='박쥐';
MG.bring=[];
MGCAST.bat=function({mo}){const T=3.2,sp=[];for(let i=0;i<26;i++){const p=mgP('bat',i%4?'#3a1d50':'#7a5cc0',mo.x,3,mo.z,{life:T+.2,s0:1.5,s1:1.6,flap:18+Math.random()*8,rot:false,fin:.05,pow:8});if(p){p.vx=p.vy=p.vz=0;sp.push({p,a:i/26*6.28,r:4.8+Math.random()*4.4,y:.8+Math.random()*3})}}
  const m=new THREE.Mesh(new THREE.RingGeometry(4.5,9.5,48),new THREE.MeshBasicMaterial({color:'#7a5cc0',transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(mo.x,.14,mo.z);MG.g.add(m);
  MG.bats.push({x:mo.x,z:mo.z,t:0,T,a0:0,sp,follow:mo});MG.bring.push({t:0,T,m,hit:0});MGS.bats(mo.x,mo.z)};
{const sk=mgSkTick;mgSkTick=function(dt){const mo=MG.mo,th=MG.th,local=!(MG.net&&MG.role==='mon');for(const b of MG.bats)if(b.follow){b.x=b.follow.x;b.z=b.follow.z}sk.apply(this,arguments);
  for(const r of MG.bring){r.t+=dt;r.m.position.set(mo.x,.14,mo.z);r.m.material.opacity=r.t<.5?.18+.3*Math.abs(Math.sin(r.t*12)):.3;r.m.rotation.z+=dt*2;
    if(local&&r.t>.5&&!(th.dashT>0)){const dx=th.x-mo.x,dz=th.z-mo.z,d=Math.hypot(dx,dz)||1;if(d>4.2&&d<9.8&&mgHurt(mo,'bat',.5)){th.kx=dx/d*14;th.kz=dz/d*14}}
    if(r.t>=r.T){r.dead=1;mgDrop(r.m)}}MG.bring=MG.bring.filter(r=>!r.dead)}}
{const cl=mgClean;mgClean=function(){MG.bring=[];return cl.apply(this,arguments)}}
{const dg=mgDangerAt;mgDangerAt=function(x,z){let d=dg(x,z);if(MG.bring.length){const q=Math.hypot(x-MG.mo.x,z-MG.mo.z);if(q>3.5&&q<10.5)d+=3}return d}}
{const ok=mgAiOk;mgAiOk=function(k,d,aim,px,pz){if(k==='bat')return d<10;return ok.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent=`#mgHud .mg-btns.arc .mg-ab.recast{filter:none!important;opacity:1!important;box-shadow:0 4px 0 var(--choco),0 0 0 4px #ffd23a,0 0 18px #ffd23a!important;animation:mgRc .5s ease-in-out infinite alternate}
@keyframes mgRc{to{transform:scale(1.08)}}#mgHud .mg-btns.arc .mg-ab.recast::after{content:attr(data-n);display:grid!important;place-items:center;position:absolute;top:-6px;right:-6px;width:22px;height:22px;border-radius:50%;background:#ffd23a;border:2px solid var(--choco);font:13px var(--f-display);color:var(--choco);opacity:1!important;animation:none;box-shadow:none;inset:auto -6px auto auto}`;document.head.appendChild(st)}
