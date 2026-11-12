/* ================= 29차 (다): 증강체 60개 (도둑 30 · 마녀 30) · 화려한 카드 · 직접 그린 그림 ================= */
// [id, 등급, 이름, 설명, 그림, 조건]  조건: 마녀 덱에 있어야(도둑) / 내 덱에 있어야(마녀)
const MONC=()=>MONK,TURC=TURK.slice(),SLOWC=['ghost','ice','jelly','spider','trap'];
const AUGT2=[
 ['ts_hp','s','튼튼한 쿠키','최대 체력 +20','heart'],['ts_spd','s','가벼운 발','이동 속도 +8%','shoe'],['ts_dashcd','s','재빠른 대시','대시 대기시간|0.6초 줄어요','bolt'],['ts_bag','s','큰 사탕 가방','사탕을 1개 더|들 수 있어요','bag'],['ts_iframe','s','오뚝이','맞은 뒤 무적|+0.5초','star'],
 ['ts_eye','s','밝은 눈','지도 밝히는|범위 +1칸','eye'],['ts_calm','s','느긋한 숨','느려짐·멈춤|30% 짧게','leaf',SLOWC],['ts_trap','s','함정 조심','덫·발판 효과|절반으로','spring',TRAPS],['ts_start2','s','달콤한 시작','사탕 2개 들고|시작해요','candy'],['ts_nose','s','출구 냄새','출구까지 남은|칸 수가 보여요','door'],
 ['tg_far','g','멀리 대시','대시 거리|+40%','arrow'],['tg_double','g','사탕 두 배','사탕 1개 먹으면|2개가 차요','candy2'],['tg_cd','g','숙련된 도둑','모든 스킬|대기시간 -25%','hourglass'],['tg_armor','g','단단한 반죽','받는 피해|-25%','shield'],['tg_heal','g','사탕 회복','사탕 먹을 때마다|체력 8 회복','heartplus'],
 ['tg_dash2','g','두 번 대시','대시를 연속|2번 써요','bolt2'],['tg_disc','g','할인 사탕','모든 스킬|사탕 -1 (최소 1)','tag'],['tg_burn','g','버닝 질주','버닝 때|이동 속도 +15%','flame'],['tg_dashinv','g','대시 무적','대시 끝나고|0.5초 더 무적','sparkle'],['tg_wide','g','넓은 시야','화면이 더|멀리 보여요','binoc'],
 ['tp_life','p','두 번째 목숨','쓰러지면 한 번|가득 부활 +3초 무적','wings'],['tp_bomb','p','사탕 폭발','사탕 5개마다|근처 몬스터 펑','bomb'],['tp_clock','p','사탕 시계','사탕 먹을 때마다|남은 시간 +3초','clock'],['tp_sky','p','하늘에서 보기','판마다 한 번|5초 미로 전체 보기','cloud'],['tp_giant','p','거인 쿠키','최대 체력 2배|이동 속도 -10%','giant'],
 ['tp_wind','p','바람 쿠키','이동 속도 +25%|최대 체력 -30','wind'],['tp_free','p','공짜 스킬','스킬 사탕 0개|대기시간 2배','gift'],['tp_half','p','반쪽 지도','출구 쪽 지도 절반이|그려진 채 시작','map'],['tp_extra','p','스킬 하나 더','스킬 칸 +1|(무작위 스킬)','cardplus'],['tp_mana','p','마나 도둑','사탕 먹을 때마다|마녀 소다 -1','soda']];
const AUGW2=[
 ['ws_soda','s','보글보글 소다','소다 차는 속도|+15%','bubbles'],['ws_start','s','넉넉한 시작','시작할 때|소다 +3','cup'],['ws_spd','s','날쌘 몬스터','몬스터|이동 속도 +10%','monfast','M'],['ws_life','s','오래가는 몬스터','몬스터 남는 시간|+30%','monclock','M'],['ws_fire','s','연사 포탑','포탑 공격 속도|+20%','turfire','T'],
 ['ws_sigil','s','빠른 마법진','몬스터·포탑|나오는 시간 절반','sigil','MT'],['ws_trap','s','끈질긴 덫','덫·발판 남는 시간|+50%','trapclock',TRAPS],['ws_choco','s','두꺼운 초코','초코 벽이|10초 더 남아요','choco',['choco']],['ws_big','s','큰 몬스터','몬스터가|1.2배 커져요','monbig','M'],['ws_hit','s','명중 보너스','몬스터가 닿으면|소다 +1','target','M'],
 ['wg_spicy','g','매운 몬스터','몬스터 피해|+30%','pepper','M'],['wg_range','g','멀리 보는 포탑','포탑 사거리|+30%','scope','T'],['wg_hand','g','큰 손','손패 5장','hand'],['wg_bank','g','큰 소다통','소다를|12까지 모아요','piggy'],['wg_mon1','g','몬스터 하나 더','몬스터를|4마리까지 불러요','monplus','M'],
 ['wg_tur2','g','포탑 둘 더','포탑을|7개까지 세워요','turplus','T'],['wg_mondisc','g','몬스터 할인','몬스터 카드|소다 -1','montag','M'],['wg_trapdisc','g','함정 할인','덫·발판 카드|소다 -1','traptag',TRAPS],['wg_turlife','g','오래가는 포탑','포탑 남는 시간|+50%','turclock','T'],['wg_tough','g','질긴 몬스터','몬스터가 두 번|닿아야 사라져요','montough','M'],
 ['wp_flood','p','소다 폭포','소다 속도 2배|대신 손패 3장','flood'],['wp_party','p','몬스터 파티','몬스터 5마리|대신 포탑 2개','party','M'],['wp_fort','p','포탑 요새','포탑 9개|대신 몬스터 1마리','castle','T'],['wp_short','p','짧은 판','판 시간|20초 짧게','shortclock'],['wp_revive','p','몬스터 부활','사라진 몬스터가|10초 뒤 한 번 부활','revive','M'],
 ['wp_moving','p','움직이는 미로','30초마다 벽 하나가|도둑 길을 늘려요','movewall'],['wp_fake','p','가짜 출구','가짜 출구 생김|닿으면 출발점으로','fakedoor'],['wp_night','p','밤의 미로','도둑 화면이 어두워|가까운 곳만 보여요','moon'],['wp_reuse','p','두 번 쓰는 카드','처음 쓴 카드를|한 번 더 써요','recycle'],['wp_tax','p','사탕 세금','도둑이 사탕 3개|먹을 때마다 소다 +2','coin']];
const AUGI2={};for(const[a,side]of[[AUGT2,'t'],[AUGW2,'w']])for(const q of a)AUGI2[q[0]]={id:q[0],side,tier:q[1],n:q[2],d:q[3],ic:q[4],need:q[5]||null};
// 예전 효과 코드와 이어 주기
const AUGMAP={tp_sky:'sky',tp_clock:'clock',tp_mana:'mthief',tp_extra:'fifth',ts_nose:'nose',wp_fake:'fakeexit',wp_night:'night',wp_reuse:'reuse',wp_tax:'tax',ws_sigil:'fastsigil',ws_spd:'wswift',wg_spicy:'wspicy',wg_tough:'wtough',ws_hit:'whitbonus',wg_bank:'wbank',wg_mondisc:'wmondisc',wg_trapdisc:'wtrapdisc'};
function augCtx(side,S){// 도둑: 상대(마녀) 덱 / 마녀: 내 덱
  let deck=SAVE.deck;if(side==='t'){deck=NET.on?(NET.peerDeck||CPOOL):(S&&S.aiDk)||(G.stage&&G.stage.deck)||CPOOL}return{deck:withPairs?withPairs(deck):deck}}
function needOk(a,ctx){const n=a.need;if(!n)return true;const dk=ctx.deck||[];if(Array.isArray(n))return n.some(k=>dk.includes(k));let ok=false;if(n.includes('M'))ok=ok||dk.some(k=>MONC().includes(k));if(n.includes('T'))ok=ok||dk.some(k=>TURC.includes(k));return ok}
function augChoices3(side,tier,have,ctx){const L=(side==='t'?AUGT2:AUGW2).map(q=>AUGI2[q[0]]).filter(a=>!have.includes(a.id)&&needOk(a,ctx));let p=shuffle(L.filter(a=>a.tier===tier).map(a=>a.id));return p.slice(0,3)}
// AI 상대도 같은 규칙으로
aiAug=function(S,role,tier){const side=role==='hero'?'t':'w';S.aiSk=role==='hero'?(S.aiSk||aiSkills()):null;S.aiDk=role==='devil'?(S.aiDk||aiDeck()):S.aiDk;const ctx=side==='t'?{deck:SAVE.deck}:{deck:S.aiDk||[]};const ch=augChoices3(side,tier,S.aug.op,ctx);const id=ch[Math.floor(Math.random()*ch.length)];if(id)S.aug.op.push(id);return id};
// 플래그 만들기
buildAug=function(){const f=augFlags(),A={ids:new Set([...f.t,...f.w]),t:f.t,w:f.w};for(const id of A.ids){A[id]=true;if(AUGMAP[id])A[AUGMAP[id]]=true}
  let mc=3,tc=5;if(A.wg_mon1)mc=4;if(A.wg_tur2)tc=7;if(A.wp_party){mc=6;tc=2}if(A.wp_fort){tc=9;mc=1}A.monCap=mc;A.turCap=tc;return A};

/* ----- 효과: 도둑 ----- */
const HBASE={speed:HERO.speed,dashCd:HERO.dashCd,dashTime:HERO.dashTime,manaMax:HERO.manaMax};const SKBASE={};for(const k in SK)SKBASE[k]={cost:SK[k].cost,cd:SK[k].cd};
function heroStats(){const A=G.aug||{};let sp=1,cd=0,dt=1,mm=0;if(A.ts_spd)sp*=1.04;if(A.tp_giant)sp*=.94;if(A.tp_wind)sp*=1.25;if(A.tg_burn&&isPlaying()&&burning())sp*=1.15;if(A.ts_dashcd)cd+=.45;if(A.tg_far)dt*=1.4;
  return{speed:HBASE.speed*sp,dashCd:Math.max(.8,HBASE.dashCd-cd),dashTime:HBASE.dashTime*dt}}
function withStats(fn){const s=heroStats(),keep={speed:HERO.speed,dashCd:HERO.dashCd,dashTime:HERO.dashTime};Object.assign(HERO,s);try{return fn()}finally{Object.assign(HERO,keep)}}
{const uh7=updHero;updHero=function(dt){const h=G.hero,A=G.aug||{};if(h.isRival||G.duo)return uh7(dt);const pre={got:h.manaGot};
  if(A.ts_calm){const ps=h._ps||0,pr=h._pr||0;if((h.slowT||0)>ps+.05)h.slowT=ps+(h.slowT-ps)*.7;if((h.root||0)>pr+.05)h.root=pr+(h.root-pr)*.7}
  withStats(()=>uh7(dt));if(G.over)return;
  if(A.tg_cd)for(const k in CDK){const c=CDK[k];if(h[c]>0)h[c]=Math.max(0,h[c]-dt*.54)}
  h._ps=h.slowT||0;h._pr=h.root||0;
  const ate=h.manaGot-pre.got;if(ate>0){if(A.tg_double)h.mana=Math.min(HERO.manaMax,h.mana+ate);if(A.tg_heal)h.hp=Math.min(h.hpMax||100,h.hp+10*ate);if(A.tp_bomb){h.bombN=(h.bombN|0)+ate;if(h.bombN>=3){h.bombN-=3;let n=0;for(const e of G.ents)if(isMon(e)&&!e.dead&&Math.hypot(e.x-h.x,e.z-h.z)<16){monGone(e);n++}burstFx(h.x,h.z,'smoke');SFX.pop();if(meLoud())say(`사탕 폭발! 몬스터 ${n}마리가 사라졌어요`,false,1.4)}}}
  if(A.ts_eye){const[cx,cz]=cellOf(h.x,h.z);for(let z=cz-1;z<=cz+1;z++)for(let x=cx-1;x<=cx+1;x++)if(inB(x,z)){const i=idx(x,z);if(!G.seen[i]){G.seen[i]=1;G.memE[i]=x<N-1?(B.E[i]?1:0):1;G.memS[i]=z<N-1?(B.S[i]?1:0):1}}}}}
{const dd3=doDash;doDash=function(ai){const h=G.hero,A=G.aug||{};const n=h.dashes;withStats(()=>dd3(ai));if(h.dashes>n){if(A.tg_dash2){if(!h.d2){h.d2=true;h.dashCd=.25}else h.d2=false}if(A.tg_dashinv)h.inv=Math.max(h.inv,HERO.dashTime*(A.tg_far?1.4:1)+.5)}}}
{const hu1=hurt;hurt=function(src,amount,why){const h=G.hero,A=G.aug||{};if(h.remote||h.isRival)return hu1(src,amount,why);if(A.tg_armor)amount=Math.round(amount*.75);if(A.tp_life&&!h.lifeUsed&&!(h.inv>0)&&!(h.dashT>0)&&!G.over&&amount>=h.hp){h.lifeUsed=true;h.hp=Math.round((h.hpMax||100)*.5);h.inv=3;burstFx(h.x,h.z,'smoke');SFX.win();netEv('life');say('두 번째 목숨! 체력이 가득 찼어요',true,1.8);return true}
  const r=hu1(src,amount,why);if(r&&A.ts_iframe)h.inv+=.5;return r}}
{const st4=springTrap;springTrap=function(e){const h=G.hero,A=G.aug||{};st4(e);if(A.ts_trap){if(h.slide)h.slide.t*=.6;if(h.rev>0)h.rev*=.6;if(e.type==='trap'&&h.root>0)h.root*=.6}}}
{const sp1=skPay;skPay=function(k){const h=G.hero,A=G.aug||{};sp1(k);if(A.tp_free){const c=CDK[k];if(h[c]>0)h[c]*=1.1}}}
function augStart2(){const A=G.aug||{},h=G.hero,D=G.devil;if(!h)return;
  HERO.manaMax=HBASE.manaMax+(A.ts_bag?1:0);for(const k in SK){SK[k].cost=SKBASE[k].cost;if(A.tg_disc)SK[k].cost=Math.max(1,SK[k].cost-1);if(A.tp_free)SK[k].cost=0}
  let hp=100;if(A.ts_hp)hp+=30;if(A.tp_giant)hp*=2;if(A.tp_wind)hp-=30;h.hpMax=hp;h.hp=hp;h.lifeUsed=false;h.d2=false;h.bombN=0;
  if(A.ts_start2)h.mana=Math.max(h.mana,2);
  if(A.tp_half){for(let i=0;i<N*N;i++){const x=i%N,z=(i/N)|0;if((EXIT[1]===0?z<N/2:z>=N/2)&&MASK[i]){G.seen[i]=1;G.memE[i]=x<N-1?(B.E[i]?1:0):1;G.memS[i]=z<N-1?(B.S[i]?1:0):1}}}
  if(A.tg_wide)G.fovAdd=12;else G.fovAdd=0;
  // 마녀
  if(A.ws_start&&!G.mirror)D.pt=Math.min(ptMax(),D.pt+3);
  if(A.wg_hand&&!G.mirror&&D.deck.length){D.hand.push(D.deck.shift())}
  if(A.wp_flood&&!G.mirror&&D.hand.length>3){D.deck.push(D.hand.pop())}
  if(A.wp_short&&!G.mirror)G.t=Math.max(G.t,20);
  G.moveT2=30;G.revQ=[];try{buildHand()}catch(e){}}
// 스킬 버튼의 사탕 수도 바뀐 값으로 (줄어들면 초록색)
function syncSkCost(){for(const k in SKB){const b=$(SKB[k]);if(!b||!SK[k])continue;const c=b.querySelector('.cost');if(!c)continue;const v=SK[k].cost,base=SKBASE[k]?SKBASE[k].cost:v;c.innerHTML='<i></i>'+v;c.classList.toggle('disc',v<base);const lb=b.getAttribute('aria-label');if(lb)b.setAttribute('aria-label',lb.replace(/사탕 \d+/,'사탕 '+v))}}
{const nm5=newMatch;newMatch=function(mode){nm5(mode);if(!G.duo)augStart2();else for(const k in SK)if(SKBASE[k])SK[k].cost=SKBASE[k].cost;syncSkCost()}}
// 체력 최대치를 넘지 않게
{const uh8=updHero;updHero=function(dt){uh8(dt);const h=G.hero;if(h&&h.hpMax&&h.hp>h.hpMax)h.hp=h.hpMax}}
// 넓은 시야
{const uc1=updCamera;updCamera=function(dt){uc1(dt);if(G.fovAdd&&G.mode==='hero'&&isPlaying()&&!G.reveal){camera.fov+=G.fovAdd;camera.updateProjectionMatrix();camera.fov-=G.fovAdd}}}

/* ----- 효과: 마녀 ----- */
function sodaMul(){const A=G.aug||{};let m=1;if(A.ws_soda)m*=1.03;if(A.wp_flood)m*=1.2;return m}
{const sm3=spawnMon;spawnMon=function(k,x,z){const e=sm3(k,x,z),A=G.aug||{};if(k==='skel')return e;if(A.ws_life)e.life*=1.3;if(A.wg_mon1)e.life*=1.2;if(A.ws_big){e.g.scale.multiplyScalar(1.2);e.r*=1.2}return e}}
{const ss5=spawnSkel;spawnSkel=function(x,z){const e=ss5(x,z),A=G.aug||{};if(A.ws_life)e.life*=1.3;if(A.wg_mon1)e.life*=1.2;if(A.ws_big){e.g.scale.multiplyScalar(1.2);e.r*=1.2}return e}}
{const st5=spawnTower;spawnTower=function(x,z,tk){const e=st5(x,z,tk);if((G.aug||{}).wg_turlife)e.life*=1.5;return e}}
{const ac6=applyCard;applyCard=function(k,x,z,extra){const A=G.aug||{},n=G.ents.length,nw=B.walls.length;const r=ac6(k,x,z,extra);if(r==='ok'){if(A.ws_trap&&TRAPS.includes(k))for(let i=n;i<G.ents.length;i++)if(TRAPS.includes(G.ents[i].type))G.ents[i].life*=2.25;if(A.ws_choco&&k==='choco'){const w=B.walls[B.walls.length-1];if(w&&w.temp&&B.walls.length>nw)w.temp+=10}}return r}}
{const ug2=updEnts;updEnts=function(dt){const A=G.aug||{};if(A.ws_fire)for(const e of G.ents)if(e.type==='tower'&&e.tk!=='spin'&&e.tk!=='magnet')e.cd-=dt*.25;ug2(dt);
  // 몬스터 부활
  if(A.wp_revive&&G.revQ){for(let i=G.revQ.length-1;i>=0;i--){const q=G.revQ[i];q.t-=dt;if(q.t<=0){G.revQ.splice(i,1);const h=G.hero;let best=null,bd=-1;for(let j=0;j<20;j++){const x=Math.floor(Math.random()*N),z=Math.floor(Math.random()*N);if(!MASK[idx(x,z)])continue;const d=Math.hypot(cx2x(x)-h.x,cx2x(z)-h.z);if(d>14&&d<30&&d>bd){bd=d;best=[x,z]}}if(best){const px=cx2x(best[0]),pz=cx2x(best[1]);sigil(px,pz,.8,()=>{const e=q.k==='skel'?spawnSkel(px,pz):spawnMon(q.k,px,pz);e.revived=true})}}}}
  // 움직이는 미로: 30초마다 벽 하나가 도둑 길이 가장 길어지는 쪽으로
  if(A.wp_moving&&!G.mirror&&!G.over){G.moveT2-=dt;if(G.moveT2<=0){G.moveT2=30;moveBestWall()}}}}
{const mg0=monGone;monGone=function(e){if(!e.dead&&(G.aug||{}).wp_revive&&!e.revived&&!G.mirror&&G.revQ&&e.type!=='ginger'&&isMon(e))G.revQ.push({k:e.type,t:15});mg0(e)}}
function moveBestWall(){const h=G.hero,hc=cellOf(h.x,h.z);let best=null,bv=-1;const base=()=>{const f=exitField();return f[idx(...hc)]};for(const w of B.walls){if(w.temp||w.anim)continue;if(Math.hypot(w.x*C-h.x,w.z*C-h.z)<C*2)continue;const opts=wsBase(w);for(const q of opts){const old={x:w.x,z:w.z};w.x=q.x;w.z=q.z;rebuildEdges();FIELD.clear();const v=base();w.x=old.x;w.z=old.z;if(v>bv&&v>0){bv=v;best={w,q}}}}
  rebuildEdges();FIELD.clear();if(!best)return;const w=best.w,old={o:w.o,x:w.x,z:w.z};w.x=best.q.x;w.z=best.q.z;w.prev={x:old.x,z:old.z};w.anim={t:0,from:old};rebuildEdges();FIELD.clear();syncPosts();if(G.mode!=='hero'){SFX.crunch();say('벽 하나가 저절로 움직였어요',false,1.2)}}

/* ----- 카드 모양 (남색 바탕 · 등급 테두리 · 메달 · 이름 띠) ----- */
const AICON={
 heart:'<path d="M32 52 C14 40 8 30 12 21 C16 13 27 13 32 21 C37 13 48 13 52 21 C56 30 50 40 32 52Z"/>',
 heartplus:'<path d="M28 50 C12 39 7 30 11 22 C15 14 25 14 28 21 C31 14 41 14 45 22 C47 26 46 30 44 33"/><path d="M48 38 v14 M41 45 h14" stroke-width="5" stroke-linecap="round" fill="none"/>',
 shoe:'<path d="M12 40 C12 30 18 26 22 18 L32 20 C32 28 38 32 50 34 C55 35 56 42 52 46 L14 46 C12 46 12 44 12 40Z"/><path d="M8 54 h12 M24 54 h18" stroke-width="4" stroke-linecap="round"/>',
 bolt:'<path d="M36 6 L16 36 H30 L26 58 L48 26 H34 Z"/>',bolt2:'<path d="M28 6 L12 34 H24 L20 56 L38 26 H27 Z"/><path d="M46 10 L34 32 H43 L40 50 L54 28 H46 Z" opacity=".75"/>',
 bag:'<path d="M18 24 H46 L50 54 H14 Z"/><path d="M24 24 C24 12 40 12 40 24" fill="none" stroke-width="5"/><circle cx="32" cy="38" r="6" opacity=".5"/>',
 star:'<path d="M32 6 L39 24 L58 25 L43 37 L48 56 L32 45 L16 56 L21 37 L6 25 L25 24Z"/>',
 eye:'<path d="M4 32 C16 12 48 12 60 32 C48 52 16 52 4 32Z"/><circle cx="32" cy="32" r="10" fill="#2a1a5e"/><circle cx="28" cy="28" r="3"/>',
 leaf:'<path d="M12 52 C10 26 26 10 54 10 C54 38 38 54 12 52Z"/><path d="M14 50 L40 24" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 spring:'<path d="M14 54 h36 M14 10 h36" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M18 46 L46 40 L18 34 L46 28 L18 22 L46 16" stroke-width="5" stroke-linejoin="round" fill="none"/>',
 candy:'<circle cx="32" cy="32" r="14"/><path d="M18 32 L6 22 V42 Z M46 32 L58 22 V42 Z"/><path d="M24 28 Q32 22 40 28" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 candy2:'<circle cx="24" cy="36" r="11"/><path d="M13 36 L4 28 V44Z"/><circle cx="42" cy="26" r="11" opacity=".75"/><path d="M53 26 L60 18 V34Z" opacity=".75"/>',
 door:'<path d="M16 58 V14 Q32 2 48 14 V58 Z"/><circle cx="40" cy="36" r="3" fill="#2a1a5e"/><path d="M8 58 h48" stroke-width="4" fill="none"/>',
 arrow:'<path d="M6 32 H44" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M38 16 L58 32 L38 48 Z"/><path d="M6 20 H22 M6 44 H22" stroke-width="4" stroke-linecap="round" opacity=".6" fill="none"/>',
 hourglass:'<path d="M16 6 H48 V12 L36 30 L48 50 V58 H16 V50 L28 30 L16 12 Z"/><path d="M24 50 H40 L32 42Z" fill="#2a1a5e"/>',
 shield:'<path d="M32 6 L54 14 V30 C54 44 44 54 32 58 C20 54 10 44 10 30 V14 Z"/><path d="M32 16 V48" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 tag:'<path d="M8 30 L30 8 H54 V32 L32 54 Z"/><circle cx="44" cy="18" r="5" fill="#2a1a5e"/><path d="M22 34 h14" stroke="#2a1a5e" stroke-width="4" stroke-linecap="round"/>',
 flame:'<path d="M32 58 C18 58 12 46 16 36 C20 26 28 24 26 8 C40 16 48 28 46 40 C52 36 52 30 50 26 C58 36 54 58 32 58Z"/>',
 sparkle:'<path d="M32 4 L36 28 L60 32 L36 36 L32 60 L28 36 L4 32 L28 28Z"/><circle cx="50" cy="14" r="4"/><circle cx="14" cy="50" r="3"/>',
 binoc:'<circle cx="18" cy="38" r="12"/><circle cx="46" cy="38" r="12"/><path d="M22 18 H42 V30 H22Z"/><circle cx="18" cy="38" r="5" fill="#2a1a5e"/><circle cx="46" cy="38" r="5" fill="#2a1a5e"/>',
 wings:'<path d="M32 50 C22 40 6 40 4 22 C14 26 20 22 24 14 C28 26 30 34 32 40 C34 34 36 26 40 14 C44 22 50 26 60 22 C58 40 42 40 32 50Z"/><circle cx="32" cy="12" r="5"/>',
 bomb:'<circle cx="28" cy="38" r="18"/><path d="M40 22 L48 14" stroke-width="5" fill="none"/><path d="M50 6 L52 12 L58 12 L53 16 L56 22 L50 18 L45 22 L47 16 L42 12 L48 12Z"/>',
 clock:'<circle cx="32" cy="34" r="22"/><path d="M32 20 V34 L42 40" stroke="#2a1a5e" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M26 6 h12" stroke-width="5" stroke-linecap="round"/>',
 cloud:'<path d="M14 46 C4 46 4 32 14 32 C14 20 30 16 34 26 C40 18 54 22 52 34 C60 36 58 46 50 46 Z"/><path d="M20 56 L24 50 M32 58 L34 50 M44 56 L42 50" stroke-width="3" stroke-linecap="round"/>',
 giant:'<circle cx="32" cy="20" r="12"/><path d="M12 58 C12 38 52 38 52 58 Z"/><path d="M4 12 L10 6 M60 12 L54 6" stroke-width="4" stroke-linecap="round"/>',
 wind:'<path d="M6 22 H40 C50 22 50 10 42 10 M6 34 H52 C60 34 60 48 50 48 M6 46 H30" fill="none" stroke-width="6" stroke-linecap="round"/>',
 gift:'<rect x="10" y="26" width="44" height="30" rx="3"/><rect x="6" y="18" width="52" height="10" rx="2"/><path d="M32 18 V56" stroke="#2a1a5e" stroke-width="5"/><path d="M32 18 C24 6 14 12 22 18 M32 18 C40 6 50 12 42 18" fill="none" stroke-width="4"/>',
 map:'<path d="M6 14 L22 8 L42 14 L58 8 V50 L42 56 L22 50 L6 56 Z"/><path d="M22 8 V50 M42 14 V56" stroke="#2a1a5e" stroke-width="3"/><path d="M42 14 L58 8 V50 L42 56Z" opacity=".45"/>',
 cardplus:'<rect x="10" y="10" width="28" height="40" rx="5"/><rect x="22" y="16" width="28" height="40" rx="5" opacity=".7"/><path d="M48 30 v18 M39 39 h18" stroke-width="6" stroke-linecap="round" fill="none"/>',
 soda:'<path d="M18 16 H46 L42 58 H22 Z"/><path d="M36 16 L42 4" stroke-width="4" fill="none"/><path d="M22 36 h20" stroke="#2a1a5e" stroke-width="3"/><path d="M48 44 l8 8 M56 44 l-8 8" stroke-width="4" stroke-linecap="round"/>',
 bubbles:'<circle cx="24" cy="40" r="14"/><circle cx="44" cy="24" r="10"/><circle cx="46" cy="48" r="6"/><circle cx="20" cy="36" r="4" fill="#2a1a5e" opacity=".4"/>',
 cup:'<path d="M14 18 H50 L46 56 H18 Z"/><path d="M16 26 H48" stroke="#2a1a5e" stroke-width="3"/><circle cx="26" cy="12" r="5"/><circle cx="38" cy="8" r="4"/>',
 monfast:'<path d="M14 50 C14 28 22 18 34 18 C46 18 54 28 54 50 Z"/><circle cx="28" cy="34" r="3" fill="#2a1a5e"/><circle cx="42" cy="34" r="3" fill="#2a1a5e"/><path d="M2 26 H12 M4 36 H12 M2 46 H12" stroke-width="4" stroke-linecap="round"/>',
 monclock:'<path d="M8 52 C8 32 14 22 26 22 C38 22 44 32 44 52 Z"/><circle cx="20" cy="36" r="3" fill="#2a1a5e"/><circle cx="32" cy="36" r="3" fill="#2a1a5e"/><circle cx="48" cy="18" r="12"/><path d="M48 10 V18 L54 22" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 turfire:'<rect x="18" y="30" width="20" height="26" rx="3"/><circle cx="28" cy="24" r="10"/><path d="M38 24 H50" stroke-width="6" stroke-linecap="round"/><circle cx="56" cy="16" r="4"/><circle cx="58" cy="28" r="3"/>',
 sigil:'<circle cx="32" cy="32" r="24" fill="none" stroke-width="5"/><path d="M32 12 L37 27 L52 27 L40 36 L45 51 L32 42 L19 51 L24 36 L12 27 L27 27Z"/>',
 trapclock:'<path d="M8 50 h36 M8 22 h36" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M12 44 L40 40 L12 34 L40 30" stroke-width="4" fill="none"/><circle cx="50" cy="16" r="11"/><path d="M50 9 V16 L55 19" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 choco:'<rect x="10" y="10" width="44" height="44" rx="5"/><path d="M10 25 H54 M10 40 H54 M25 10 V54 M40 10 V54" stroke="#2a1a5e" stroke-width="3"/>',
 monbig:'<path d="M6 56 C6 26 18 12 32 12 C46 12 58 26 58 56 Z"/><circle cx="24" cy="32" r="4" fill="#2a1a5e"/><circle cx="40" cy="32" r="4" fill="#2a1a5e"/><path d="M24 44 Q32 50 40 44" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 target:'<circle cx="32" cy="32" r="24" fill="none" stroke-width="5"/><circle cx="32" cy="32" r="13" fill="none" stroke-width="5"/><circle cx="32" cy="32" r="5"/>',
 pepper:'<path d="M18 22 C10 34 16 56 40 54 C56 52 52 36 44 28 C38 22 26 16 18 22Z"/><path d="M20 22 C18 12 26 8 30 4" stroke-width="5" fill="none" stroke-linecap="round"/>',
 scope:'<circle cx="26" cy="26" r="16" fill="none" stroke-width="6"/><path d="M38 38 L56 56" stroke-width="8" stroke-linecap="round"/><path d="M26 16 V36 M16 26 H36" stroke-width="3"/>',
 hand:'<path d="M18 58 C10 50 8 40 10 30 L14 20 C16 16 20 18 20 22 V30 V12 C20 8 26 8 26 12 V28 V8 C26 4 32 4 32 8 V28 V10 C32 6 38 6 38 10 V30 V18 C38 14 44 14 44 18 V40 C44 50 40 56 34 58 Z"/>',
 piggy:'<ellipse cx="32" cy="36" rx="22" ry="16"/><circle cx="50" cy="34" r="6" opacity=".7"/><path d="M18 50 v8 M42 50 v8" stroke-width="5" stroke-linecap="round"/><rect x="28" y="16" width="10" height="4" rx="2" fill="#2a1a5e"/>',
 monplus:'<path d="M6 54 C6 32 14 22 26 22 C38 22 46 32 46 54 Z"/><circle cx="20" cy="38" r="3" fill="#2a1a5e"/><circle cx="32" cy="38" r="3" fill="#2a1a5e"/><path d="M52 8 v16 M44 16 h16" stroke-width="6" stroke-linecap="round"/>',
 turplus:'<rect x="10" y="30" width="18" height="26" rx="3"/><circle cx="19" cy="24" r="9"/><rect x="30" y="34" width="14" height="22" rx="3" opacity=".7"/><circle cx="37" cy="29" r="7" opacity=".7"/><path d="M52 8 v14 M45 15 h14" stroke-width="5" stroke-linecap="round"/>',
 montag:'<path d="M6 54 C6 34 12 26 22 26 C32 26 38 34 38 54 Z"/><path d="M34 22 L48 8 H60 V20 L46 34 Z"/><circle cx="54" cy="14" r="3" fill="#2a1a5e"/>',
 traptag:'<path d="M6 54 h30 M6 30 h30" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M10 48 L32 44 L10 38 L32 34" stroke-width="4" fill="none"/><path d="M34 22 L48 8 H60 V20 L46 34 Z"/><circle cx="54" cy="14" r="3" fill="#2a1a5e"/>',
 turclock:'<rect x="8" y="30" width="20" height="26" rx="3"/><circle cx="18" cy="24" r="10"/><circle cx="46" cy="22" r="13"/><path d="M46 14 V22 L52 26" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 montough:'<path d="M8 54 C8 32 16 22 28 22 C40 22 48 32 48 54 Z"/><circle cx="22" cy="38" r="3" fill="#2a1a5e"/><circle cx="34" cy="38" r="3" fill="#2a1a5e"/><path d="M50 10 L58 14 V24 C58 30 54 34 50 36 C46 34 42 30 42 24 V14 Z"/>',
 flood:'<path d="M10 8 H54 V20 C54 28 46 30 46 38 V58 H38 V38 C38 32 32 30 32 26 C32 30 26 32 26 38 V58 H18 V38 C18 30 10 28 10 20 Z"/>',
 party:'<path d="M32 4 L50 56 H14 Z"/><path d="M22 34 L42 26 M18 46 L46 38" stroke="#2a1a5e" stroke-width="3"/><circle cx="32" cy="6" r="5"/>',
 castle:'<path d="M8 58 V22 H16 V30 H24 V22 H32 V30 H40 V22 H48 V30 H56 V58 Z"/><path d="M26 58 V44 C26 38 38 38 38 44 V58" fill="#2a1a5e"/>',
 shortclock:'<circle cx="32" cy="32" r="22"/><path d="M32 18 V32 L22 36" stroke="#2a1a5e" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M48 52 l10 -6 M48 52 l4 -11" stroke-width="4" stroke-linecap="round"/>',
 revive:'<path d="M14 56 C14 30 20 20 32 20 C44 20 50 30 50 56 L44 50 L38 56 L32 50 L26 56 L20 50 Z"/><path d="M50 14 A12 12 0 1 0 54 26" fill="none" stroke-width="4"/><path d="M48 8 L54 14 L46 16Z"/>',
 movewall:'<rect x="6" y="22" width="30" height="12" rx="3"/><rect x="28" y="40" width="30" height="12" rx="3" opacity=".6"/><path d="M40 14 C52 14 54 26 50 34" fill="none" stroke-width="4"/><path d="M44 32 L50 38 L56 32Z"/>',
 fakedoor:'<path d="M16 58 V14 Q32 2 48 14 V58 Z"/><path d="M26 28 C26 20 38 20 38 28 C38 34 32 34 32 40" stroke="#2a1a5e" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="32" cy="48" r="3" fill="#2a1a5e"/>',
 moon:'<path d="M40 6 C24 8 12 20 12 34 C12 48 24 58 38 58 C48 58 54 54 58 48 C40 50 28 38 30 22 C30 16 34 10 40 6Z"/><circle cx="48" cy="18" r="3"/><circle cx="54" cy="30" r="2"/>',
 recycle:'<path d="M32 8 L44 28 H36 C36 36 42 42 50 42 L44 54 C30 54 22 44 24 28 H18 Z"/><path d="M14 40 C14 50 20 56 30 56" fill="none" stroke-width="5"/>',
 coin:'<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="15" fill="none" stroke="#2a1a5e" stroke-width="3"/><path d="M28 24 h8 M32 24 V42 M26 42 h12" stroke="#2a1a5e" stroke-width="4"/>'};
let AIGN=0;function augIcon(id,small){const a=AUGI2[id];if(!a)return'';const g=AICON[a.ic]||AICON.star;const gid='aig'+(++AIGN);return`<svg viewBox="0 0 64 64" class="ai-svg" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="${a.tier==='g'?'#ffe9a8':a.tier==='p'?'#ffd0f4':'#dfe8ff'}"/><stop offset="1" stop-color="${a.tier==='g'?'#ffc94a':a.tier==='p'?'#a8e0ff':'#b8c8e8'}"/></linearGradient></defs><g fill="url(#${gid})" stroke="url(#${gid})">${g}</g></svg>`}
const CORNER='<svg viewBox="0 0 30 30" aria-hidden="true"><path d="M1 1 H20 Q14 4 12 8 Q8 9 6 12 Q3 14 1 20 Z"/><path d="M20 1 Q26 2 28 6 Q24 5 21 6Z M1 20 Q2 26 6 28 Q5 24 6 21Z"/><circle cx="8" cy="8" r="3.2" class="gem"/></svg>';
augCard=function(id,on){const a=AUGI2[id];if(!a)return'';return`<button class="ag-card fz t-${a.tier}${on?' on':''}" data-id="${id}" title="${a.d.replace(/\|/g,' ')}">
  <span class="fz-c tl">${CORNER}</span><span class="fz-c tr">${CORNER}</span><span class="fz-c bl">${CORNER}</span><span class="fz-c br">${CORNER}</span>
  <span class="fz-tier">${TIERN[a.tier]}</span><span class="fz-med"><span class="fz-glow"></span>${augIcon(id)}</span>
  <span class="fz-rib"><b class="ag-n"><span>${a.n}</span></b></span><span class="ag-d">${a.d.split('|').join('<br>')}</span>${on?'<span class="fz-ok">선택</span>':''}</button>`};

// 설명 글씨가 카드 밖으로 넘치지 않게 (줄은 정해 둔 곳에서만 바뀌고, 넘치면 글씨를 줄여요)
function fitDescs(box){for(const c of box.querySelectorAll('.fz.ag-card')){const d=c.querySelector('.ag-d');if(!d)continue;d.style.fontSize='';let fs=parseFloat(getComputedStyle(d).fontSize)||15;const lim=()=>c.getBoundingClientRect().bottom-10;
  for(let i=0;i<14&&(d.scrollWidth>d.clientWidth+1||d.scrollHeight>d.clientHeight+1||d.getBoundingClientRect().bottom>lim())&&fs>10;i++){fs-=.5;d.style.fontSize=fs+'px'}}}
{const fn9=fitNames;fitNames=function(box){fn9(box);try{fitDescs(box)}catch(e){}}}
