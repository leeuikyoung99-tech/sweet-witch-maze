/* ================= 2차: 쿠키 둘이 한 판에서 (용사 대 용사 · 마녀 대 마녀) =================
   쿠키 하나는 늘 G에 그대로 살아 있고(주인공), 다른 쿠키는 G.rv 칸에 따로 있다가 그 쿠키 차례에만 G와 바꿔 끼워요.
   방향(출발·출구)도 같이 바꿔 끼워서, 원래 도둑 코드를 그대로 써요. */
const SLOTK=['hero','decoy','seen','memE','memS','dead','branches','deadVer','trail','xm','heroSkills'];
let QUIET=false,DUO_BOARD=false,CURW=0;
const DUO_SK=['cloak','shield'],GMN={classic:'도둑 대 마녀',race:'용사 대 용사',ww:'마녀 대 마녀'};
// 위아래가 똑같은 판 (양쪽 끝이 둘 다 출발점이자 출구)
const SYMS={cone:'cone2',pumpkin:'pumpkin2',tree:'tree2'};
SHAPES.cone2=(x,z)=>Math.abs(x-7)<=[2,3,5,6,7,7,6,5,6,7,7,6,5,3,2][z];
SHAPES.pumpkin2=(x,z)=>Math.abs(x-7)<=[2,3,5,6,6,7,7,7,7,7,6,6,5,3,2][z];
SHAPES.tree2=(x,z)=>Math.abs(x-7)<=[2,3,4,5,6,5,6,7,6,5,6,5,4,3,2][z];
Object.assign(SHAPEN,{cone2:15,pumpkin2:15,tree2:15});
for(const k of Object.keys(SFX)){const f=SFX[k];if(typeof f==='function')SFX[k]=function(...a){if(!QUIET)return f.apply(SFX,a)}}
function sideSE(side){return side===0?[[MID,N-1],[MID,0]]:[[MID,0],[MID,N-1]]}
function useSide(side){const[s,e]=sideSE(side);START[0]=s[0];START[1]=s[1];EXIT[0]=e[0];EXIT[1]=e[1]}
function withSide(side,fn){const a=[START[0],START[1],EXIT[0],EXIT[1]];useSide(side);try{return fn()}finally{START[0]=a[0];START[1]=a[1];EXIT[0]=a[2];EXIT[1]=a[3]}}
function mkSlot(side){return{side,hero:null,decoy:null,seen:new Uint8Array(N*N),memE:new Int8Array(N*N).fill(-1),memS:new Int8Array(N*N).fill(-1),dead:new Int16Array(N*N).fill(-1),branches:[],deadVer:-1,trail:[],xm:new Map(),heroSkills:DUO_SK.slice()}}
function withSlot(sl,fn){if(!sl)return;const save={};for(const k of SLOTK){save[k]=G[k];G[k]=sl[k]}const a=[START[0],START[1],EXIT[0],EXIT[1]],q=QUIET;useSide(sl.side);QUIET=true;
  try{return fn()}finally{for(const k of SLOTK){sl[k]=G[k];G[k]=save[k]}START[0]=a[0];START[1]=a[1];EXIT[0]=a[2];EXIT[1]=a[3];QUIET=q}}
const allHeroes=()=>G.duo&&G.rv&&G.rv.hero?[G.ph,G.rv.hero]:[G.hero];
const allCells=()=>allHeroes().map(h=>cellOf(h.x,h.z));
// 그 쪽(side) 쿠키 차례로 실행: 주인공이면 그대로, 아니면 바꿔 끼워서
function withCookie(side,fn){if(side===G.pside)return fn();return withSlot(G.rv,fn)}
// 마녀 w의 차례: 그 마녀의 소다·카드로, 상대 쿠키(1-w)를 대상으로
function witchAct(w,fn){const sv=G.devil,cw=CURW;G.devil=G.dv[w];CURW=w;try{return withCookie(1-w,fn)}finally{G.devil=sv;CURW=cw}}
// 마녀 대 마녀: 벽은 상대 쪽 절반에서만 움직여요 (마녀 0의 집은 아래, 마녀 1의 집은 위)
const wwHalf=gz=>CURW===0?gz<N/2:gz>N/2;
function randLook(){const o={};for(const k in DEF_EQ){const ids=Object.keys(SHOP[k].items);o[k]=ids[Math.floor(Math.random()*ids.length)]}return o}
function mkHero(look,ring){const top=START[1]===0;const h={rev:0,root:0,slide:null,x:cx2x(START[0]),z:cx2x(START[1])+(top?-.8:.8),yaw:top?Math.PI:0,pitch:0,bob:0,face:top?0:Math.PI,hp:100,mana:1,dashT:0,dashCd:0,dashDir:[0,top?1:-1],cloak:0,cdDecoy:0,cdCloak:0,cdMap:0,cdShield:0,shield:0,inv:0,moving:false,stepT:0,cell:null,reveal:0,ai:{plan:[],t:0,wander:0},manaGot:0,dashes:0,skills:0,deadFound:0};
  h.m=makeChar('hero',1.85,look);addRing(h.m,ring);scene.add(h.m.g);play(h.m,'Idle');return h}
function mkArch2(){if(WORLD.arch2||!WORLD.arch)return;const a=WORLD.arch.clone();a.rotation.y=Math.PI;scene.add(a);WORLD.arch2=a}
function placeArch2(beam){mkArch2();const a=WORLD.arch2;if(!a)return;a.visible=true;a.position.set(cx2x(MID)+cx2x(6),0,N*C);for(const c of a.children)if(c.geometry&&c.geometry.parameters&&c.geometry.parameters.height===140)c.visible=beam!==false}
function resetDuo(){if(G.rv&&G.rv.hero&&G.rv.hero.m)drop(G.rv.hero.m.g);G.rv=null;G.duo=null;G.rguest=false;G.dv=null;G.ph=null;CURW=0;DUO_BOARD=false;useSide(0);
  if(WORLD.arch2)WORLD.arch2.visible=false;if(WORLD.startG)WORLD.startG.visible=true}
function duoCommon(mode,th,walls){resetDuo();G.stage=null;G.chal=null;restoreStage();DUO_BOARD=true;clearWorld();applyTheme(THEMES[th]?th:'candy',true);
  if(walls){B.walls=walls.map(([o,x,z])=>({o,x,z}))}else{B.walls=[];autoWalls(WMAX())}rebuildEdges();FIELD.clear();placeArch2();if(WORLD.startG)WORLD.startG.visible=false;G.duo=mode;G.bonus=0;G.goalSent=0;G.picks=[];G.gsT=0;G.bumpT=0}
function duoGo(msg){show(null);camPreview=false;if(A.ctx)musicGame();G.last=performance.now();say(msg,false,2.4)}
/* ----- 용사 대 용사 ----- */
function startRace(o){duoCommon('race',o.th,o.walls);G.mySide=o.side;G.pside=o.side;G.rguest=!!o.guest;useSide(o.side);newMatch('hero');
  const h=G.hero;h.side=o.side;G.ph=h;G.heroSkills=DUO_SK.slice();setupSkillBtns();
  G.rv=mkSlot(1-o.side);withSlot(G.rv,()=>{const r=mkHero(o.look||randLook());r.side=1-o.side;r.isRival=true;r.isAI=!o.remote&&!o.guest;r.remote=!!(o.remote||o.guest);G.hero=r});
  if(!G.rguest){raceTowers();G.rwT=8;G.rspT=14}duoGo('먼저 반대편 출구에 닿으면 이겨요!')}
function raceTowers(){const mz=Math.floor(N/2);for(const s of[-1,1]){let best=null,bd=1e9;for(let z=0;z<N;z++)for(let x=0;x<N;x++){if(!inM(x,z))continue;const d=Math.hypot(x-(MID+s*3),z-mz);if(d<bd){bd=d;best=[x,z]}}if(best)spawnTower(cx2x(best[0]),cx2x(best[1]))}}
function shiftWall(w,q){const old={o:w.o,x:w.x,z:w.z};w.x=q.x;w.z=q.z;w.prev={x:old.x,z:old.z};w.lockUntil=G.t+WALL_LOCK;rebuildEdges();w.anim={t:0,from:old};syncPosts();SFX.crunch()}
function raceTick(dt){G.rwT-=dt;if(G.rwT<=0){G.rwT=6+Math.random()*3;for(const w of shuffle(B.walls.filter(w=>!w.temp&&!w.anim))){const qs=wallShifts(w);if(qs.length){shiftWall(w,qs[Math.floor(Math.random()*qs.length)]);say('🍪 벽이 움직였어요',false,1,true);break}}}
  G.rspT-=dt;if(G.rspT<=0){G.rspT=13+Math.random()*4;if(G.t>=GRACE&&count('skel')+G.sigils.length<(G.t<60?2:3)){const hs=allHeroes();for(let k=0;k<40;k++){const x=Math.floor(Math.random()*N),z=Math.floor(Math.random()*N);if(!inM(x,z))continue;const px=cx2x(x),pz=cx2x(z);if(hs.some(h=>Math.hypot(h.x-px,h.z-pz)<16))continue;sigil(px,pz,1.1,()=>{const e=spawnSkel(px,pz);collide(e,e.r)});G.sigils[G.sigils.length-1].kind='skel';break}}}}
function bumpCheck(dt){if(G.duo!=='race'||!G.rv)return;G.bumpT=Math.max(0,G.bumpT-dt);const a=G.ph,b=G.rv.hero;const dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz);if(d>1.25||d<1e-4)return;
  // 겹치지 않게 살짝 떼고
  const nx=dx/d,nz=dz/d,push=(1.25-d)/2;a.x-=nx*push;a.z-=nz*push;if(!b.remote){b.x+=nx*push;b.z+=nz*push}if(G.bumpT>0)return;G.bumpT=.7;
  const va=a.dashT>0?17:(a.vel||0),vb=b.dashT>0?17:(b.vel||0);let ka,kb,m;if(Math.abs(va-vb)<1.5){ka=kb=7;m='both'}else if(va>vb){kb=12;ka=1.5;m='a'}else{ka=12;kb=1.5;m='b'}
  a.kx=(a.kx||0)-nx*ka;a.kz=(a.kz||0)-nz*ka;if(b.remote)netSend({t:'knock',kx:+(nx*kb).toFixed(2),kz:+(nz*kb).toFixed(2),m:m==='a'?'lost':m==='b'?'won':'both'});else{b.kx=(b.kx||0)+nx*kb;b.kz=(b.kz||0)+nz*kb}
  SFX.bonk();G.shake=.35;say(m==='both'?'쾅! 둘 다 튕겼어요':m==='a'?'쾅! 상대를 밀쳐 냈어요':'쾅! 상대에게 밀렸어요',m==='b',1)}
/* ----- 마녀 대 마녀 ----- */
function startWW(o){duoCommon('ww',o.th,o.walls);G.mySide=o.side;G.myW=o.side;const ps=1-o.side;G.pside=ps;useSide(ps);G.rguest=false;newMatch('devil');G.mirror=!!o.guest;
  if(!G.mirror&&!G.candies.length)for(let i=0;i<16;i++)spawnCandy();
  const h=G.hero;h.side=ps;h.isAI=!G.mirror;G.ph=h;G.heroSkills=DUO_SK.slice();if(!NET.on){drop(h.m.g);h.m=makeChar('hero',1.85,randLook());addRing(h.m);scene.add(h.m.g);play(h.m,'Idle')}
  G.rv=mkSlot(o.side);withSlot(G.rv,()=>{const r=mkHero(SAVE.eq,'#3fdc9e');r.side=o.side;r.isAI=!G.mirror;r.isRival=true;G.hero=r});
  const other={pt:4,hand:[],deck:[],think:3,played:{},sel:null,moving:null,lastMove:-99},od=shuffle(withPairs(o.otherDeck?cleanDeck(o.otherDeck):aiDeck()));other.hand=od.slice(0,4);other.deck=od.slice(4);
  G.dv=[];G.dv[o.side]=G.devil;G.dv[ps]=other;CURW=o.side;
  devilCamFit();buildHand();$('dhint').textContent='상대 쿠키를 막아요 · 벽은 상대 쪽 절반만 밀 수 있어요';placeArch2(false);duoGo('내 쿠키(민트 고리)가 먼저 도착하게!')}
/* ----- 매 프레임 (기준 쪽) ----- */
function duoTargets(){const A=G.ph,Bh=G.rv.hero,vis=h=>h.cloak<=0||h.reveal>0;
  for(const e of G.ents){if(!(isMon(e)||e.type==='tower')||e.dead)continue;const da=vis(A)?Math.hypot(A.x-e.x,A.z-e.z):1e9,db=vis(Bh)?Math.hypot(Bh.x-e.x,Bh.z-e.z):1e9;if(da>=1e9&&db>=1e9)continue;
    const cur=e.ts|0;if(cur===0?db<da-3:da<db-3){e.ts=cur?0:1;e.target=null;e.retarget=0}}}
function duoTick(dt){updHero(dt);updDecoy(dt);const rv=G.rv;if(rv.hero.remote)remoteHeroTick(dt);else withSlot(rv,()=>{updHero(dt);updDecoy(dt)});
  if(G.duo==='ww'){const o=G.dv[1-G.myW],rate=(burning()?2:1)/PT_SEC;o.pt=Math.min(10,o.pt+dt*rate);if(!NET.on)witchAct(1-G.myW,()=>devilAI(dt));if(window.__aiBoth&&!NET.on)witchAct(G.myW,()=>devilAI(dt))}
  else raceTick(dt);
  duoTargets();G.duoPass=0;updEnts(dt);G.duoPass=1;withSlot(rv,()=>updEnts(dt));G.duoPass=null;updTemp();bumpCheck(dt);
  if(NET.on)netTick(dt);if(G.t>=ROUND&&!G.over)duoTimeUp()}
function remoteHeroTick(dt){const h=G.rv.hero,k=Math.min(1,dt*12);if(h.tx!==undefined){h.x=lerp(h.x,h.tx,k);h.z=lerp(h.z,h.tz,k);h.face=angLerp(h.face,h.tface||0,k)}h.inv=Math.max(0,h.inv-dt);
  h.m.g.position.set(h.x,0,h.z);h.m.g.rotation.y=h.face;const vis=h.cloak>0?.15:1;setOpacity(h.m,vis);h.m.g.visible=true;play(h.m,h.moving?'Running_A':'Idle');h.m.mixer.update(dt);shieldBubble(h,h.shield>0)}
function cookieDist(h,side){return withSide(side,()=>{const f=exitField(),[x,z]=cellOf(h.x,h.z);const v=f[idx(x,z)];return v<0?999:v})}
function duoTimeUp(){const d0=cookieDist(G.ph,G.pside),d1=cookieDist(G.rv.hero,G.rv.side);let ws;if(d0!==d1)ws=d0<d1?G.pside:G.rv.side;else ws=G.ph.hp>=G.rv.hero.hp?G.pside:G.rv.side;duoEnd(ws,'time')}
function duoGoal(h){if(G.over)return;if(G.rguest){if(!G.goalSent){G.goalSent=1;netSend({t:'goal'})}return}duoEnd(h.side,'goal')}
function duoEnd(ws,why){if(G.over)return;if(NET.on&&!G.mirror&&!G.rguest)netSend({t:'dend',ws,why,T:+G.t.toFixed(2)});duoLocalEnd(ws,why)}
function duoLocalEnd(ws,why){if(G.over)return;const iWon=ws===G.mySide;G.duoWin={ws,why,iWon};endMatch(G.mode==='hero'?iWon:!iWon,why)}
function duoCaught(h){h.hp=100;h.inv=2;h.kx=h.kz=0;h.slide=null;h.cloak=0;burstFx(h.x,h.z);h.x=cx2x(START[0]);h.z=cx2x(START[1])+(START[1]===0?-.8:.8);h.cell=null;
  say(G.mode==='hero'?'붙잡혔어요! 출발점으로 돌아가요':'쿠키가 붙잡혀 출발점으로 돌아갔어요',true,1.6)}
/* ----- 온라인 (용사 대 용사 손님 쪽: 내 쿠키는 내가, 나머지는 방장 화면을 받아 그려요) ----- */
function raceGuestTick(dt){const sv=G.hero,sd=G.decoy;G.hero=G.rv.hero;G.decoy=G.rv.decoy;try{mirrorUpdate(dt)}finally{G.rv.decoy=G.decoy;G.hero=sv;G.decoy=sd}G.rv.hero.m.g.visible=true;setOpacity(G.rv.hero.m,G.rv.hero.cloak>0?.15:1);
  updHero(dt);const h=G.hero;G.gsT-=dt;if(G.gsT<=0){G.gsT=1/20;netSend({t:'gs',x:r1(h.x),z:r1(h.z),f:r2(h.face),hp:Math.round(h.hp),m:h.mana,v:(h.cloak<=0||h.reveal>0)?1:0,mv:h.moving?1:0,vel:r1(h.vel||0),ds:h.dashT>0?1:0,sh:h.shield>0?1:0})}
  if(G.t>=ROUND+3&&!G.over)duoLocalEnd(G.rv.side,'time')}
function applyRaceSnap(d){d.ev=[];const sv=G.hero,sd=G.decoy;G.hero=G.rv.hero;G.decoy=G.rv.decoy;const mine=G.devil;try{applySnap(d)}finally{G.rv.decoy=G.decoy;G.hero=sv;G.decoy=sd}
  // 방금 주운 사탕이 방장 화면에서 아직 안 사라졌으면 다시 지워요
  G.picks=(G.picks||[]).filter(p=>G.t-p.t<2.5);for(const p of G.picks)for(let i=G.candies.length-1;i>=0;i--){const c=G.candies[i];if(Math.hypot(c.x-p.x,c.z-p.z)<1.2){drop(c.g);G.candies.splice(i,1)}}}
function setRvSnap(a){const h=G.rv&&G.rv.hero;if(!h||!a)return;h.tx=a[0];h.tz=a[1];h.tface=a[2];h.hp=a[3];h.mana=a[4];h.vis=a[5];h.cloak=a[5]?0:1;h.moving=!!a[6];h.shieldOn=!!a[7];if(h.x===undefined||!h.synced){h.x=h.tx;h.z=h.tz;h.synced=1}}
function lerpRv(dt){const h=G.rv&&G.rv.hero;if(!h||h.tx===undefined)return;const k=Math.min(1,dt*12);h.x=lerp(h.x,h.tx,k);h.z=lerp(h.z,h.tz,k);h.face=angLerp(h.face,h.tface,k);h.m.g.position.set(h.x,0,h.z);h.m.g.rotation.y=h.face;h.m.g.visible=true;setOpacity(h.m,h.vis?1:.4);play(h.m,h.moving?'Running_A':'Idle');h.m.mixer.update(dt);shieldBubble(h,h.shieldOn)}
function duoRemoteState(d){const h=G.rv&&G.rv.hero;if(!h||!h.remote)return;h.tx=d.x;h.tz=d.z;h.tface=d.f;h.hp=d.hp;h.mana=d.m;h.cloak=d.v?0:1;h.reveal=0;h.moving=!!d.mv;h.vel=d.vel||0;h.dashT=d.ds?.1:0;h.shield=d.sh?1:0;if(h.x===undefined||!h.synced){h.x=d.x;h.z=d.z;h.synced=1}}
function duoPick(d){let bi=-1,bd=1.6;G.candies.forEach((c,i)=>{const q=Math.hypot(c.x-d.x,c.z-d.z);if(q<bd){bd=q;bi=i}});if(bi>=0){drop(G.candies[bi].g);G.candies.splice(bi,1);G.candyVer++}}
// 방장: 판(테마·벽)을 만들어서 손님에게 보내요
function duoBoardPacket(){DUO_BOARD=true;const th=SAVE.eq.theme;applyTheme(th,true);B.walls=[];autoWalls(WMAX());return{th:THEMEID,w:B.walls.map(w=>[w.o,w.x,w.z])}}
function startDuoNet(d){NET.again={me:false,peer:false};if(NET.stake>0&&!NET.staked){SAVE.coins=Math.max(0,SAVE.coins-NET.stake);NET.staked=true;saveGame();syncCoins()}NET.sentWallVer=-1;NET.sentCandy='';
  const side=NET.host?0:1;if(d.duo==='race'){NET.role='hero';startRace({side,th:d.th,walls:d.w,remote:NET.host,guest:!NET.host,look:cleanLook(NET.peerLook)})}else{NET.role='devil';startWW({side,th:d.th,walls:d.w,guest:!NET.host,otherDeck:NET.peerDeck})}}
function startRaceAI(){SET.mode='race';startRace({side:0,th:SAVE.eq.theme})}
function startWWAI(){SET.mode='ww';startWW({side:0,th:SAVE.eq.theme})}
// 작은 지도에 상대 쿠키도 (용사 대 용사)
function drawRival(cv){if(G.duo!=='race'||!G.rv)return;const g=cv.getContext('2d'),W=cv.width,pad=W*.05,s=(W-pad*2)/N,h=G.rv.hero;if(h.cloak>0)return;g.fillStyle='#ff4f6d';g.strokeStyle='#4a2a1a';g.lineWidth=2;g.beginPath();g.arc(pad+h.x/C*s,pad+h.z/C*s,Math.max(4,s*.3),0,7);g.fill();g.stroke()}
function duoHud(){if(G.duo==='race'){G.dT=(G.dT||0)-1;if(G.dT>0)return G.dTxt;G.dT=20;G.dTxt=`출구까지 나 ${cookieDist(G.ph,G.pside)}칸 · 상대 ${cookieDist(G.rv.hero,G.rv.side)}칸`;return G.dTxt}
  if(G.duo==='ww'){const m=G.rv.hero;$('mhp').firstChild.style.width=Math.max(0,m.hp)+'%';G.dT=(G.dT||0)-1;if(G.dT<=0){G.dT=20;$('mdist').textContent=`출구까지 내 쿠키 ${cookieDist(m,G.rv.side)}칸 · 상대 ${cookieDist(G.ph,G.pside)}칸`}}}
