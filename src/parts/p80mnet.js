// ===== 80차: 미니게임 '거대 마녀' 온라인 (아무나와 하기 · 친구랑 하기) =====
// 판돈·등급 없이 가볍게. 아무나는 'swm-rand-v3-mini-' 자리로 따로 찾아요(메인 게임과 안 섞여요).
// 각자 자기 캐릭터를 움직이고 1초에 15번 위치를 보내요. 상대는 받은 위치로 부드럽게 따라가요.
// 누가 정하나: 도둑 쪽 = 체력·맞음·사탕·벽 솟기·출구·끝. 마녀 쪽 = 벽 부수기·껌·미끼에 걸림.
// 스킬은 '쓴 사람의 위치 + 조준 + 난수 씨앗'을 보내 상대 화면에서도 똑같이 다시 써요.
window.MGNET_OK=true;
try{GMN.mini='거대 마녀 미니게임'}catch(e){}
const MGN={tx:0,tt:null,wt:null,dc:null,rec:null,play:null,remote:false,fromNet:false,again:{me:0,peer:0}};
function mgSend(m){m.t='mg';netSend(m)}
function mgSeedRand(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mgWithSeed(seed,fn){const r=Math.random;Math.random=mgSeedRand(seed);try{return fn()}finally{Math.random=r}}
const MGN_TK=['slowT','rootT','revT','slipT','fogT','cloakT','sprintT','scopeT','xrayT','compT','dashT'],MGN_WK=['fastT','slowT','ghostT','smokeT','freezeT','eatT','spinT'];
const mgR2=v=>Math.round(v*100)/100;

// ---------- 시작 ----------
function mgNetGo(R,sel){SET.gmode='mini';SET.role=R==='thief'?'hero':'devil';SET.stake=0;NET.peerCoins=null;if(ROLECTX==='rand')mgRandMatch();else hostRoom()}
{const hn=hostNext;hostNext=function(hr){if(SET.gmode!=='mini')return hn.apply(this,arguments);mgHostStart(hr||pickHostRole())}}
function mgHostStart(hr){const gr=hr==='devil'?'hero':'devil';try{NET.room.send('start',{duo:'mini',role:gr,stake:0,look:SAVE.eq})}catch(e){}netStart({duo:'mini',role:hr,stake:0})}
{const sd=startDuoNet;startDuoNet=function(d){if(d&&d.duo==='mini')return mgNetStart(d);return sd.apply(this,arguments)}}
function mgNetStart(d){NET.again={me:false,peer:false};MGN.again={me:0,peer:0};MGN.tt=MGN.wt=MGN.dc=null;MGN.tx=0;
  if(MG.on){$('mgRes').hidden=true;mgClean();MG.on=false}
  const role=NET.role==='devil'?'mon':'thief';lbApplyMap(LOBBY.agreed);
  const mySk=role==='thief'?(SAVE.mgTh&&SAVE.mgTh.length===2?SAVE.mgTh.slice():mgDefThief()):(SAVE.mgWi&&SAVE.mgWi.length===MGWN?SAVE.mgWi.slice():mgDefWitch());
  MG.net=true;MG.both=false;mgStart(role,role==='thief'?mySk:mgRandThief(),role==='mon'?mySk:mgRandWitch());MG.ai.mt=MG.ai.tt=1e9;
  if(role==='mon'){if(MG.cand){mgDrop(MG.cand.g);MG.cand=null}}else if(MG.cand)mgSend({k:'cand',x:MG.cand.x,z:MG.cand.z});
  mgMsg((role==='thief'?'당신은 쿠키 도둑!':'당신은 거대 마녀!')+' · '+(NET.peerNick||'상대')+'와 대결',2.4)}
// 아무나와 하기 (미니게임): 등급·코인 조건 없이
async function mgRandMatch(resume){SET.stake=0;netLeave();if(!resume)RM.skip.clear();RM.stop=false;NET.cancel=false;const my=++RM.id;const alive=()=>!NET.cancel&&RM.id===my;NET.rand=true;NET.stake=0;
  lobby('상대를 찾는 중…','거대 마녀 미니게임 · 판돈 없이 가볍게','그만두기');
  try{await peerLib()}catch(e){if(alive())lobby('연결하지 못했어요',NETFAIL,'돌아가기');return}
  const me=new Peer(undefined,peerOpts());NET.peer=me;try{await waitOpen(me)}catch(e){if(alive())lobby('연결하지 못했어요',NETFAIL,'돌아가기');return}
  while(alive()){for(let k=0;k<RSLOTS;k++){if(!alive())return;const r=await claimSlot(k,my);if(r==='ok'||r==='gone')return;
      if(r==='taken'&&!skipped(rpre()+k)){const conn=await tryJoin(me,rpre()+k);if(!alive()){try{conn&&conn.close()}catch(e){}return}if(conn){NET.rand=true;NET.stake=0;joinWith(conn);return}}}
    $('lobL').textContent='맞는 상대를 계속 찾는 중…';await new Promise(r=>setTimeout(r,3000))}}
{const rm=randomMatch;randomMatch=function(resume){if(SET.gmode==='mini')return mgRandMatch(resume);return rm.apply(this,arguments)}}

// ---------- 받기 ----------
{const nm=netMsg;netMsg=function(d){if(d&&d.t==='mg'){try{mgNetRx(d)}catch(e){console.warn('mgrx',e)}return}return nm.apply(this,arguments)}}
function mgNetCand(x,z){if(MG.cand)mgDrop(MG.cand.g);const g=mgCandyMesh();g.position.set(x,0,z);MG.g.add(g);MG.cand={x,z,g}}
function mgNetRx(d){if(!MG.on||!MG.net||!MG.g){if(d.k==='again'){MGN.again.peer=1;mgNetAgainChk()}return}const th=MG.th,mo=MG.mo;
  switch(d.k){
  case 'ts':MGN.tt=d;th.yaw=d.yaw;th.moving=!!d.mv;th.dx=d.dx;th.dz=d.dz;th.hp=d.hp;th.inv=d.inv||0;for(const k of MGN_TK)th[k]=d.st[k]||0;MGN.dc=d.dc;break;
  case 'ws':MGN.wt=d;mo.yaw=d.yaw;mo.pitch=d.pi;mo.moving=!!d.mv;for(const k of MGN_WK)mo[k]=d.st[k]||0;break;
  case 'cast':mo.x=d.mx;mo.z=d.mz;mo.yaw=d.yaw;mo.cd[d.a]=0;mo.lockT=0;mo.jump=null;mo.charge=null;mo.eatT=0;MGN.play=(d.far||[]).slice();MGN.remote=true;
    try{mgWithSeed(d.seed,()=>mgCast(d.a,d.aim))}finally{MGN.remote=false;MGN.play=null}break;
  case 'orb':mo.x=d.mx;mo.z=d.mz;mo.yaw=d.yaw;mo.cd.stomp=0;mo.lockT=0;MGN.remote=true;try{mgStomp(d.aim)}finally{MGN.remote=false}break;
  case 'tsk':th.x=d.x;th.z=d.z;th.yaw=d.yaw;th.cd[d.a]=0;if(d.a==='heal'){th.healed=0;th.hp=Math.min(th.hp,MGP.hp-1)}MGN.remote=true;try{mgWithSeed(d.seed,()=>mgThSkill(d.a,d.aim))}finally{MGN.remote=false}break;
  case 'cand':mgNetCand(d.x,d.z);break;
  case 'eat':{const c=MG.cand;if(c){mgDrop(c.g);MG.cand=null;MGS.candy();mgBurst(c.x,c.z,['#ffd23a','#ff5f9e','#ffffff','#7cc6ff'],26,8,.6,1.5);try{mgBeam(c.x,c.z,'#ffd23a',1.2,10,.7)}catch(e){}}
    MG.got=d.got;if(d.exit&&!MG.exitOpen)mgOpenExit();else mgMsg(`도둑이 사탕을 먹었어요 (${MG.got}/${MGP.candies}) · 벽이 솟았어요`,1.6);if(d.c)mgNetCand(d.c[0],d.c[1]);break}
  case 'wadd':{const fresh=[];for(const[o,x,z]of d.w){if(B.walls.some(w=>w.x===x&&w.z===z&&w.o===o))continue;const w={o,x,z};B.walls.push(w);fresh.push(w)}
    rebuildEdges();syncWallMeshes();B.ver=(B.ver||0)+1;for(const w of fresh){const m=WORLD.wallMeshes.get(w);if(m){const y=m.position.y;m.position.y=y-8;MG.rise.push({m,y,t:0})}}if(fresh.length)MGS.rise();break}
  case 'wdel':{let hit=false;for(const[o,x,z]of d.w){const i=B.walls.findIndex(w=>w.x===x&&w.z===z&&w.o===o);if(i<0)continue;B.walls.splice(i,1);hit=true;try{burstFx(x*C,z*C,'smoke')}catch(e){}}
    if(hit){rebuildEdges();syncWallMeshes();B.ver=(B.ver||0)+1;try{SFX.crunch()}catch(e){}MG.shake=Math.max(MG.shake||0,.25)}break}
  case 'ioff':{const ks=new Set(d.ks);for(const it of MG.items)if(ks.has(it.key))it.t=0;break}
  case 'hurt':th.hp=d.hp;th.inv=MGP.inv;MGS.hurt();mgSpark(th.x,1.6,th.z,['#ffd23a','#ffffff','#ff5f8f'],14,{spd:6,size:.8,grav:4});mgMsg(d.why==='orb'?'사탕 구슬이 맞았어요!':'맞혔어요!',1);
    if(d.why==='orb'&&MG.orbs&&MG.orbs.length){let b=null,bd=1e9;for(const o of MG.orbs){const q=Math.hypot(o.x-th.x,o.z-th.z);if(q<bd){bd=q;b=o}}if(b&&bd<4)mgOrbBoom(b,1)}break;
  case 'end':MGN.fromNet=true;try{mgEnd(d.win,d.why)}finally{MGN.fromNet=false}break;
  case 'again':MGN.again.peer=1;mgNetAgainChk();break}}

// ---------- 보내기 (내 캐릭터 상태) ----------
function mgNetTick(dt){MGN.tx-=dt;if(MGN.tx>0)return;MGN.tx=1/15;
  if(MG.role==='thief'){const th=MG.th,st={};for(const k of MGN_TK)if(th[k]>0)st[k]=mgR2(th[k]);const dd=MG.decoy;
    mgSend({k:'ts',x:mgR2(th.x),z:mgR2(th.z),yaw:mgR2(th.yaw),mv:th.moving?1:0,dx:mgR2(th.dx),dz:mgR2(th.dz),hp:th.hp,inv:mgR2(th.inv),st,dc:dd?[mgR2(dd.x),mgR2(dd.z),mgR2(dd.dx),mgR2(dd.dz)]:0})}
  else{const mo=MG.mo,st={};for(const k of MGN_WK)if(mo[k]>0)st[k]=mgR2(mo[k]);mgSend({k:'ws',x:mgR2(mo.x),z:mgR2(mo.z),yaw:mgR2(mo.yaw),pi:mgR2(mo.pitch),mv:mo.moving||mo.charge?1:0,st})}}
{const tk=mgTick;mgTick=function(dt){tk.apply(this,arguments);if(MG.on&&MG.net&&!MG.over)try{mgNetTick(dt)}catch(e){console.warn(e)}}}

// ---------- 상대 캐릭터: 받은 위치로 따라가기 ----------
{const f=mgThTick;mgThTick=function(dt,mv){if(MG.net&&MG.role==='mon')return mgThRemote(dt);return f.apply(this,arguments)}}
{const f=mgMoTick;mgMoTick=function(dt,mv){if(MG.net&&MG.role==='thief')return mgMoRemote(dt);return f.apply(this,arguments)}}
{const f=mgThiefAI;mgThiefAI=function(dt){if(MG.net&&!(MGN.bot&&MG.role==='thief'))return[0,0];return f.apply(this,arguments)}}
{const f=mgMonAI;mgMonAI=function(dt){if(MG.net&&!(MGN.bot&&MG.role==='mon'))return[0,0];return f.apply(this,arguments)}}
function mgFollow(e,T,dt,k){if(!T)return;const a=Math.min(1,dt*k);e.x+=(T.x-e.x)*a;e.z+=(T.z-e.z)*a;if(Math.hypot(T.x-e.x,T.z-e.z)>10){e.x=T.x;e.z=T.z}}
function mgThRemote(dt){const th=MG.th;th.inv=Math.max(0,th.inv-dt);for(const k in th.cd)th.cd[k]=Math.max(0,th.cd[k]-dt);for(const k of MGN_TK)if(th[k]>0)th[k]-=dt;
  mgFollow(th,MGN.tt,dt,14);if(th.moving)th.bob+=dt*10;
  const d=MG.decoy;if(d){d.t-=dt;d.age=(d.age||0)+dt;const q=MGN.dc;if(q){const a=Math.min(1,dt*14);d.x+=(q[0]-d.x)*a;d.z+=(q[1]-d.z)*a;d.dx=q[2];d.dz=q[3]}
    if(d.t<=0||(!q&&d.age>.6)){mgBurst(d.x,d.z,['#ffffff','#7ee8c8'],12,6,.4);mgDrop(d.m.g);MG.decoy=null}}}
function mgMoRemote(dt){const mo=MG.mo,th=MG.th;const fr=mo.freezeT>0;for(const k in mo.cd)if(!fr)mo.cd[k]=Math.max(0,mo.cd[k]-dt);for(const k of['lockT',...MGN_WK])if(mo[k]>0)mo[k]-=dt;
  if(mo.jump){const J=mo.jump;J.t+=dt;const k=Math.min(1,J.t/J.T);mo.hy=Math.sin(k*Math.PI)*9;if(k>=1){mo.jump=null;mo.hy=0}}
  if(mo.charge){const c=mo.charge,st=Math.min(c.d,24*dt);c.d-=st;if(Math.hypot(th.x-mo.x,th.z-mo.z)<MGP.moR+1.1)mgHurt(mo,'bear');if(c.d<=.01){mo.charge=null;MGS.boom(mo.x,mo.z)}}
  mgFollow(mo,MGN.wt,dt,mo.charge||mo.jump?22:12);
  if(mo.moving||mo.charge){mo.stepT-=dt;if(mo.stepT<=0){mo.stepT=mo.charge?.18:.62/(mo.fastT>0?1.5:1);MGS.step(mo.x,mo.z);MG.shake=Math.max(MG.shake||0,Math.min(.18,6/(Math.hypot(th.x-mo.x,th.z-mo.z)+4)))}}}

// ---------- 누가 정하나 ----------
// 도둑 쪽만 맞음·끝을 정해요
{const f=mgHurt;mgHurt=function(src,why,dmg){if(MG.net&&MG.role==='mon')return false;const r=f.apply(this,arguments);if(r&&MG.net)mgSend({k:'hurt',hp:MG.th.hp,why});return r}}
{const f=mgThEffect;mgThEffect=function(e){if(MG.net&&MG.role==='mon')return;return f.apply(this,arguments)}}
{const f=mgEnd;mgEnd=function(win,why){if(MG.net&&!MG.over){if(MG.role==='mon'&&!MGN.fromNet)return;if(MG.role==='thief')mgSend({k:'end',win,why})}return f.apply(this,arguments)}}
// 벽: 솟는 건 도둑 쪽, 부수는 건 마녀 쪽
{const f=mgAddWalls;mgAddWalls=function(n){const n0=B.walls.length;const r=f.apply(this,arguments);if(MG.net&&MG.role==='thief'){const fr=B.walls.slice(n0);if(fr.length)mgSend({k:'wadd',w:fr.map(w=>[w.o,w.x,w.z])})}return r}}
{const f=mgSmash;mgSmash=function(o,r){if(MG.net&&MG.role==='thief')return false;if(!MG.net)return f.apply(this,arguments);const before=B.walls.slice();const res=f.apply(this,arguments);
  if(res){const gone=before.filter(w=>!B.walls.includes(w));if(gone.length)mgSend({k:'wdel',w:gone.map(w=>[w.o,w.x,w.z])})}return res}}
// 사탕: 도둑 쪽에서 먹고 다음 사탕 자리를 알려요
{const f=mgEatCandy;mgEatCandy=function(){if(MG.net&&MG.role==='mon')return;const r=f.apply(this,arguments);if(MG.net)mgSend({k:'eat',got:MG.got,exit:MG.exitOpen?1:0,c:MG.cand?[mgR2(MG.cand.x),mgR2(MG.cand.z)]:null});return r}}
// 놓인 것: 자리로 이름표를 붙이고, 내 캐릭터에 걸린 것만 내 쪽에서 처리해요 (사라지면 알려요)
{const f=mgItem;mgItem=function(type,x,z){const it=f.apply(this,arguments);it.key=type+':'+x.toFixed(1)+':'+z.toFixed(1);return it}}
{const f=mgItemTick;mgItemTick=function(dt){if(!MG.net)return f.apply(this,arguments);const rem=MG.role==='thief'?MG.mo:MG.th,sx=rem.x,sz=rem.z;const before=MG.items.map(i=>i.key);
  rem.x=rem.z=-1e4;try{f.apply(this,arguments)}finally{rem.x=sx;rem.z=sz}const now=new Set(MG.items.map(i=>i.key));const off=before.filter(k=>!now.has(k));if(off.length)mgSend({k:'ioff',ks:off})}}
// 가짜 사탕 자리 (쓴 쪽에서 정한 걸 상대가 그대로)
{const f=mgFarCell;mgFarCell=function(minD){if(MGN.play&&MGN.play.length)return MGN.play.shift();const r=f.apply(this,arguments);if(MGN.rec)MGN.rec.push(r?{x:r.x,z:r.z}:null);return r}}
// 상대 화면에선 도둑의 사탕 나침반을 안 보여요
{const f=mgCompass;mgCompass=function(){if(MG.net&&MG.role==='mon'){if(MG.compG)MG.compG.visible=false;return}return f.apply(this,arguments)}}

// ---------- 스킬 보내기 ----------
{const f=mgCast;mgCast=function(k,aim){if(!MG.net||MGN.remote||MG.role!=='mon')return f.apply(this,arguments);const mo=MG.mo,pre={mx:mgR2(mo.x),mz:mgR2(mo.z),yaw:mo.yaw};
  const P=aim?{x:aim.x,z:aim.z,drag:aim.drag}:mgAim();const A={x:mgR2(P.x),z:mgR2(P.z),drag:P.drag?1:0};mo.x=pre.mx;mo.z=pre.mz;const seed=(Math.random()*2147483647)|0;MGN.rec=[];let r=false;
  try{r=mgWithSeed(seed,()=>f.call(this,k,A))}finally{const far=MGN.rec;MGN.rec=null;if(r)mgSend(Object.assign({k:'cast',a:k,aim:A,seed,far},pre))}return r}}
{const f=mgStomp;mgStomp=function(aim){if(!MG.net||MGN.remote||MG.role!=='mon')return f.apply(this,arguments);const mo=MG.mo,P=aim?{x:aim.x,z:aim.z}:mgAim(),A={x:mgR2(P.x),z:mgR2(P.z)};mo.x=mgR2(mo.x);mo.z=mgR2(mo.z);
  const r=f.call(this,A);if(r)mgSend({k:'orb',aim:A,mx:mo.x,mz:mo.z,yaw:mo.yaw});return r}}
{const f=mgThSkill;mgThSkill=function(k,aim){if(!MG.net||MGN.remote||MG.role!=='thief')return f.apply(this,arguments);const th=MG.th;th.x=mgR2(th.x);th.z=mgR2(th.z);const pre={x:th.x,z:th.z,yaw:th.yaw};
  const A=aim?{x:mgR2(aim.x),z:mgR2(aim.z)}:null,seed=(Math.random()*2147483647)|0;const r=mgWithSeed(seed,()=>f.call(this,k,A));if(r)mgSend(Object.assign({k:'tsk',a:k,aim:A,seed},pre));return r}}

// ---------- 끝난 뒤 · 나가기 ----------
{const f=mgAgain;mgAgain=function(){if(!MG.net)return f.apply(this,arguments);if(MGN.again.me)return;MGN.again.me=1;mgSend({k:'again'});
  const t=$('mgRes').querySelector('.mg-rt');if(t)t.textContent='상대를 기다려요… (역할을 바꿔서 해요)';mgNetAgainChk()}}
function mgNetAgainChk(){if(!(MGN.again.me&&MGN.again.peer)||!NET.on)return;if(NET.host)mgHostStart(NET.role==='devil'?'hero':'devil')}
{const f=mgExit;mgExit=function(){if(MG.net){MG.net=false;try{netLeave()}catch(e){}}return f.apply(this,arguments)}}
{const f=netPeerLeft;netPeerLeft=function(){if(MG.on&&MG.net){MG.net=false;MG.on=false;$('mgRes').hidden=true;$('mgPauseM').hidden=true;mgHud(false);mgClean();mgHideWorld(false)}return f.apply(this,arguments)}}
// 온라인에선 일시정지가 멈추지 않아요 (그만두기만)
{const h=mgHud;mgHud=function(on){const first=!$('mgHud');const r=h.apply(this,arguments);if(first){$('mgPauseB').addEventListener('click',()=>{if(MG.net){MG.pause=false;const b=document.querySelector('#mgPauseM b');if(b)b.textContent='그만둘까요?'}})}
  if(on){const b=document.querySelector('#mgPauseM b');if(b)b.textContent='일시정지';const rs=$('mgResume');if(rs)rs.setAttribute('aria-label','계속하기')}return r}}
// 상대 도둑은 상대가 꾸민 모습으로
{const f=mgThiefModel;mgThiefModel=function(){if(MG.net&&MG.role==='mon'&&NET.peerLook){try{const m=makeChar('hero',1.85,NET.peerLook);try{play(m,'Idle')}catch(e){}return m}catch(e){}}return f.apply(this,arguments)}}
