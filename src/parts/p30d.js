/* ================= 30차 (라): 증강체 개편 — 돈 · 초반 · 후반 · 스택 · 가챠 ================= */
// 새 증강체 [id, 등급, 이름, 설명, 그림, 조건]
const AUGNEW_T=[
 ['tn_piggy','s','사탕 저금통','넘치는 사탕을 모아|다음 판에 꺼내 써요','piggy'],
 ['tn_rush','s','출발 질주','시작 30초 동안|이동 속도 +25%','shoe'],
 ['tn_interest','g','사탕 이자','10초마다 사탕|3개당 1개 이자','coinstack'],
 ['tn_bigbag','g','큰 주머니','사탕 최대 8개|5초마다 1개씩 차요','bag'],
 ['tn_morning','g','아침 사탕','시작 40초 동안|모든 스킬 사탕 0개','sun'],
 ['tn_last','g','마지막 질주','마지막 60초|속도 +20% 대시 -40%','flame'],
 ['tn_muscle','g','사탕 근육','사탕마다 최대 체력 +2|10개마다 속도 +2%','muscle'],
 ['tn_dodge','g','회피 달인','몬스터를 피할 때마다|이동 속도 +1.5%','dodge'],
 ['tn_fate','g','운명의 쿠키','판마다 주사위로|좋은 효과 하나','dice'],
 ['tn_merchant','p','사탕 장사꾼','스킬 쓰면 30% 확률로|사탕을 돌려받아요','coin'],
 ['tn_edge','p','벼랑 끝','체력 30% 이하면|피해 -50% 속도 +15%','shield'],
 ['tn_lucky','p','행운 상자','판마다 무작위|증강체 하나 더','gift']];
const AUGNEW_W=[
 ['wn_piggy','s','소다 저금통','넘치는 소다를 모아|다음 판에 꺼내 써요','piggy'],
 ['wn_ambush','s','기습','시작 30초 동안|모든 카드 소다 -1','bolt'],
 ['wn_interest','g','소다 이자','10초마다 소다|4당 1 이자','coinstack'],
 ['wn_recycle','g','재활용','내 것이 사라지면|소다 +1','recycle'],
 ['wn_first','g','첫 수','판마다 처음 쓰는|카드는 공짜','cardplus'],
 ['wn_burn','g','버닝 마녀','버닝 타임에 소다 2배|모든 카드 소다 -1','flame'],
 ['wn_hunt','g','사냥 일지','도둑이 다칠 때마다|내 피해 +3%','target'],
 ['wn_craft','g','미로 장인','카드 쓸 때마다|소다 속도 +1.5%','hourglass'],
 ['wn_fate','g','운명의 카드','카드를 쓰면 25% 공짜|10% 한 번 더','dice'],
 ['wn_curse','p','마지막 저주','남은 60초부터|도둑 속도 -15%','moon'],
 ['wn_roul','p','마녀의 룰렛','판마다 룰렛|소다 +3 ~ 1.6배','roulette']];
// 겹치거나 밋밋한 예전 것은 빼요
const AUGDROP=['ts_iframe','ts_start2','ts_bag','tg_wide','tg_dashinv','tg_burn','tg_far','tp_wind','tp_half','ws_start','ws_big','ws_choco','wg_range','wg_turlife','wg_trapdisc','wp_short','wp_fort'];
for(const id of AUGDROP){for(const L of[AUGT2,AUGW2]){const i=L.findIndex(q=>q[0]===id);if(i>=0)L.splice(i,1)}delete AUGI2[id]}
AUGT2.push(...AUGNEW_T);AUGW2.push(...AUGNEW_W);
for(const[a,side]of[[AUGNEW_T,'t'],[AUGNEW_W,'w']])for(const q of a)AUGI2[q[0]]={id:q[0],side,tier:q[1],n:q[2],d:q[3],ic:q[4],need:q[5]||null};
// 이미 고른 예전 증강체(빠진 것)는 시리즈에서 조용히 빼요
{const ag0=augFlags;augFlags=function(){const f=ag0();return{t:f.t.filter(id=>AUGI2[id]),w:f.w.filter(id=>AUGI2[id])}}}
// 유형: 돈 · 초반 · 후반 · 스택 · 가챠 · 능력치
const AUGTY={tn_piggy:'econ',tn_interest:'econ',tn_bigbag:'econ',tn_merchant:'econ',tg_double:'econ',tp_mana:'econ',wn_piggy:'econ',wn_interest:'econ',wn_recycle:'econ',ws_hit:'econ',wg_bank:'econ',wp_tax:'econ',
  tn_rush:'early',tn_morning:'early',wn_ambush:'early',wn_first:'early',tp_half:'early',
  tn_last:'late',tn_edge:'late',tp_clock:'late',wn_burn:'late',wn_curse:'late',
  tn_muscle:'stack',tn_dodge:'stack',wn_hunt:'stack',wn_craft:'stack',
  tn_fate:'gacha',tn_lucky:'gacha',wn_fate:'gacha',wn_roul:'gacha'};
const AUGTYN={econ:'돈',early:'초반',late:'후반',stack:'스택',gacha:'가챠',stat:'능력치'};
const augTy=id=>AUGTY[id]||'stat';
Object.assign(AICON,{
 coinstack:'<ellipse cx="32" cy="48" rx="20" ry="7"/><ellipse cx="32" cy="38" rx="20" ry="7"/><ellipse cx="32" cy="28" rx="20" ry="7"/><path d="M48 6 v14 M41 13 h14" stroke-width="5" stroke-linecap="round"/>',
 sun:'<circle cx="32" cy="34" r="12"/><path d="M32 8 v8 M32 52 v8 M6 34 h8 M50 34 h8 M14 16 l6 6 M44 46 l6 6 M14 52 l6 -6 M44 22 l6 -6" stroke-width="5" stroke-linecap="round"/>',
 muscle:'<path d="M10 44 C10 30 18 22 26 22 L30 12 C34 8 40 10 40 16 L38 24 C48 24 56 32 54 44 C52 54 16 56 10 44Z"/><path d="M22 40 h10" stroke="#2a1a5e" stroke-width="3" stroke-linecap="round"/>',
 dodge:'<circle cx="18" cy="40" r="10" opacity=".45"/><circle cx="44" cy="22" r="10"/><path d="M14 22 C24 10 36 8 42 10 M22 56 C34 54 46 46 52 36" fill="none" stroke-width="4" stroke-linecap="round"/>',
 dice:'<rect x="8" y="8" width="48" height="48" rx="10"/><circle cx="20" cy="20" r="4" fill="#2a1a5e"/><circle cx="44" cy="20" r="4" fill="#2a1a5e"/><circle cx="32" cy="32" r="4" fill="#2a1a5e"/><circle cx="20" cy="44" r="4" fill="#2a1a5e"/><circle cx="44" cy="44" r="4" fill="#2a1a5e"/>',
 coin:'<circle cx="32" cy="32" r="22"/><path d="M32 18 v28 M24 24 h12 a6 6 0 0 1 0 12 h-10 a6 6 0 0 0 0 12 h14" stroke="#2a1a5e" stroke-width="3" fill="none"/>',
 recycle:'<path d="M32 8 L44 28 H20 Z"/><path d="M12 36 L24 56 H6 Z" opacity=".8"/><path d="M52 36 L58 56 H40 Z" opacity=".8"/>',
 moon:'<path d="M40 8 C24 10 14 22 14 34 C14 48 26 58 40 56 C30 52 24 42 24 32 C24 22 30 12 40 8Z"/><circle cx="46" cy="20" r="3"/><circle cx="52" cy="34" r="2"/>',
 roulette:'<circle cx="32" cy="34" r="24"/><path d="M32 10 V58 M8 34 H56 M15 17 L49 51 M49 17 L15 51" stroke="#2a1a5e" stroke-width="2"/><circle cx="32" cy="34" r="6" fill="#2a1a5e"/><path d="M28 4 h8 l-4 7z"/>'});
// 설명 창: 스택은 지금 쌓인 만큼
{const at0=augTip;augTip=function(id){at0(id);const a=AUGI2[id],tip=$('agTip');if(a&&tip&&!tip.hidden){const sm=tip.querySelector('small');if(sm&&AUGSTK[id])sm.textContent=`${TIERN[a.tier]} · ${a.side==='t'?'쿠키 도둑':'과자 마녀'} · 지금 ${stkTxt(id)}`}}}

/* ----- 스택: 시리즈 내내 이어져요 (S.stk[id]) ----- */
const AUGSTK={tn_muscle:1,tn_dodge:1,wn_hunt:1,wn_craft:1,tn_piggy:1,wn_piggy:1};
function SS(){const S=(G.chal||G.duo||G.stage)?null:curSer();if(!S||!S.on)return null;if(!S.stk)S.stk={};return S.stk}
const stk=id=>{const s=SS();return s?(s[id]||0):0};
const stkAdd=(id,n,cap)=>{const s=SS();if(!s)return 0;s[id]=Math.min(cap==null?1e9:cap,(s[id]||0)+n);return s[id]};
function stkTxt(id){const n=stk(id);if(id==='tn_muscle')return`최대 체력 +${n*2} · 속도 +${Math.floor(n/10)*2}%`;if(id==='tn_dodge')return`속도 +${n*3}%`;if(id==='wn_hunt')return`피해 +${n*4}%`;if(id==='wn_craft')return`소다 +${(n*1.5).toFixed(1).replace('.0','')}%`;if(id==='tn_piggy')return`사탕 ${n}개 저금`;if(id==='wn_piggy')return`소다 ${n} 저금`;return''}
// 스택: 증강체 줄 아래에 글씨로 (예: 회피 달인 5/30)
const STKCAP={tn_dodge:20,wn_hunt:30,wn_craft:40,tn_piggy:4,wn_piggy:4};
function stkLine(id){const n=stk(id),a=AUGI2[id];if(!a)return'';if(id==='tn_muscle'){const nx=(Math.floor(n/10)+1)*10;return`${a.n} ${n}/${nx}`}return`${a.n} ${n}/${STKCAP[id]}`}
setInterval(()=>{const el=$('augHud');if(!el||el.hidden)return;const S=curSer();if(!S)return;const mine=(S.aug&&S.aug.me||[]).filter(id=>AUGSTK[id]&&AUGI2[id]);
  let row=el.querySelector('.ag-stkrow');if(!mine.length){if(row)row.remove();return}if(!row){row=document.createElement('div');row.className='ag-stkrow';el.appendChild(row)}
  const t=mine.map(stkLine).join(' · ');if(row.textContent!==t)row.textContent=t},300);

/* ----- 판 시작: 저금 꺼내기 · 근육 · 주사위 · 룰렛 · 행운 상자 ----- */
const FATE=[['사탕 +1',{mana:1}],['이동 속도 +8%',{sp:1.08}],['최대 체력 +25',{hp:25}],['대시 대기 -25%',{dcd:.75}],['이동 속도 +10% · 사탕 +3',{sp:1.1,mana:3}],['최대 체력 +50% · 이동 속도 +10%',{hpm:1.5,sp:1.1}]];
{const ba0=buildAug;buildAug=function(){const A=ba0();const S=SS()?curSer():null;if(S&&S.seed==null&&!NET.on)S.seed=Math.floor(Math.random()*1e6);
  // 행운 상자: 판마다 무작위 증강체 하나 (같은 대결·같은 판이면 같은 결과)
  if(A.tn_lucky&&S){const rnd=seededRnd((S.seed||7)*131+S.r*17+3);rnd();const tier='p';const pool=AUGT2.map(q=>q[0]).filter(id=>AUGI2[id].tier===tier&&!A.ids.has(id)&&augTy(id)!=='gacha'&&!AUGSTK[id]);
    if(pool.length){const id=pool[Math.floor(rnd()*pool.length)];A[id]=true;if(AUGMAP[id])A[AUGMAP[id]]=true;A.lucky=id}}
  if(A.tn_fate&&S){const rnd=seededRnd((S.seed||7)*977+S.r*31+11);A.fate=Math.min(5,Math.floor(rnd()*6))}
  if(A.wn_roul&&S){const rnd=seededRnd((S.seed||7)*613+S.r*29+5);const t=rnd();A.roul=t<.2?2:t<.7?1:0}
  return A}}
{const nm7=newMatch;newMatch=function(mode){nm7(mode);if(G.duo)return;const A=G.aug||{},h=G.hero,D=G.devil;if(!h)return;
  G.fx30={fate:null};
  // 도둑
  if(A.tn_bigbag)HERO.manaMax=Math.max(HERO.manaMax,8);
  let hp=h.hpMax||100;if(A.tn_muscle){hp+=stk('tn_muscle')*2}
  let fate=null;if(A.fate!=null){fate=FATE[A.fate][1];G.fx30.fate=fate;if(fate.hp)hp+=fate.hp;if(fate.hpm)hp=Math.round(hp*fate.hpm)}
  h.hpMax=hp;h.hp=hp;
  if(A.tn_piggy){const n=stk('tn_piggy');if(n){h.mana=Math.min(HERO.manaMax,h.mana+n);SS()['tn_piggy']=0}}
  if(fate&&fate.mana)h.mana=Math.min(HERO.manaMax,h.mana+fate.mana);
  h.bankAcc=0;h.intT=0;
  // 마녀
  if(D&&!G.mirror){if(A.wn_piggy){const n=stk('wn_piggy');if(n){D.pt=Math.min(ptMax(),D.pt+n);SS()['wn_piggy']=0}}
    if(A.roul===1){D.pt=Math.min(ptMax(),D.pt+4);if(D.deck.length)D.hand.push(D.deck.shift());try{buildHand()}catch(e){}}if(A.roul===0)D.pt=Math.min(ptMax(),D.pt+2);
    D.firstFree=A.wn_first?3:0;D.bankAcc=0;D.intT=0}
  skCostSync();
  // 알림
  setTimeout(()=>{if(!isPlaying())return;const msg=[];const meT=G.mode==='hero',meW=G.mode==='devil';
    if(A.fate!=null&&meT)msg.push('운명의 쿠키: '+FATE[A.fate][0]);if(A.lucky&&meT)msg.push('행운 상자: '+AUGI2[A.lucky].n);
    if(A.roul!=null&&meW)msg.push('마녀의 룰렛: '+['소다 +2','손패 +1 · 소다 +4','대박! 소다 1.3배'][A.roul]);
    if(msg.length)say(msg.join(' · '),true,2.4)},3600)}}

/* ----- 도둑 효과 ----- */
function skCostSync(){const A=G.aug||{};const morn=A.tn_morning&&isPlaying()&&G.t<40;for(const k in SK){if(!SKBASE[k])continue;let c=SKBASE[k].cost;if(A.tg_disc)c=Math.max(1,c-1);if(A.tp_free||morn)c=0;SK[k].cost=c}try{syncSkCost()}catch(e){}}
{const hs0=heroStats;heroStats=function(){const s=hs0(),A=G.aug||{},h=G.hero;if(!h||G.duo)return s;let sp=1,dc=1;const left=ROUND-G.t;
  if(A.tn_rush&&G.t<40)sp*=1.2;
  if(A.tn_last&&left<=60){sp*=1.12;dc*=.6}
  if(A.tn_edge&&h.hp<=(h.hpMax||100)*.3)sp*=1.2;
  if(A.tn_muscle)sp*=1+Math.floor(stk('tn_muscle')/10)*.02;
  if(A.tn_dodge)sp*=1+stk('tn_dodge')*.03;
  const f=G.fx30&&G.fx30.fate;if(f){if(f.sp)sp*=f.sp;if(f.dcd)dc*=f.dcd}
  if(A.wn_curse&&left<=60)sp*=.9;
  s.speed*=sp;s.dashCd=Math.max(.6,s.dashCd*dc);return s}}
{const uh9=updHero;updHero=function(dt){const h=G.hero,A=G.aug||{};if(!h||h.isRival||G.duo||h.remote)return uh9(dt);
  const pre={mana:h.mana,got:h.manaGot,mt:h.manaT||0};if(A.tn_bigbag&&isPlaying())h.manaT=(h.manaT||0)+dt*.5;
  uh9(dt);if(G.over)return;
  const ate=h.manaGot-pre.got;
  if(A.tn_muscle&&ate>0){stkAdd('tn_muscle',ate);h.hpMax=(h.hpMax||100)+2*ate;h.hp=Math.min(h.hpMax,h.hp+2*ate)}
  if(A.tn_piggy){const regen=(h.manaT||0)<pre.mt-.001?1:0;const over=pre.mana+ate+regen-h.mana;if(over>0&&h.mana>=HERO.manaMax)stkAdd('tn_piggy',over,4)}
  if(A.tn_interest){h.intT=(h.intT||0)+dt;if(h.intT>=3){h.intT-=3;const add=Math.floor(h.mana/2);if(add>0&&h.mana<HERO.manaMax){h.mana=Math.min(HERO.manaMax,h.mana+add);if(G.mode==='hero')SFX.candy()}}}
  if(A.tn_morning){const on=G.t<40;if(h._morn!==on){h._morn=on;skCostSync()}}
  // 회피 달인: 몬스터가 4칸 안으로 왔다가 못 맞히고 8 넘게 멀어지면 (몬스터마다 한 번)
  if(A.tn_dodge){const now=performance.now();for(const e of G.ents){if(!isMon(e))continue;if(e._hit){e._hit=false;e._dn=false;e._dgT=now+3000;continue}const d=Math.hypot(e.x-h.x,e.z-h.z);if(e._dodged)continue;if(d<5&&!(e._dgT>now))e._dn=true;if(e._dn&&(d>6.5||e.dead)){e._dn=false;e._dgT=now+3000;e._dodged=true;const n=stkAdd('tn_dodge',1,20);if(G.mode==='hero')say(`회피 달인 ${n} · 이동 속도 +${n*3}%`,false,1)}}}}}
{const hu9=hurt;hurt=function(src,amount,why){const h=G.hero,A=G.aug||{};if(!h||h.remote||h.isRival||G.duo)return hu9(src,amount,why);
  if(A.wn_hunt)amount=Math.round(amount*(1+stk('wn_hunt')*.04));
  if(A.tn_edge&&h.hp<=(h.hpMax||100)*.3)amount=Math.round(amount*.6);
  const r=hu9(src,amount,why);if(r){if(src&&typeof src==='object')src._hit=true;if(A.wn_hunt)stkAdd('wn_hunt',1,30)}return r}}
{const sp9=skPay;skPay=function(k){const h=G.hero,A=G.aug||{};const c=SK[k]?SK[k].cost:0;sp9(k);if(A.tn_merchant&&c>0&&Math.random()<.45&&h&&h.mana<HERO.manaMax){h.mana=Math.min(HERO.manaMax,h.mana+c);if(G.mode==='hero')say('사탕 장사꾼: 사탕을 돌려받았어요',false,1)}}}

/* ----- 마녀 효과 ----- */
{const sm0=sodaMul;sodaMul=function(){let m=sm0();const A=G.aug||{};if(A.wn_craft)m*=1+stk('wn_craft')*.015;if(A.wn_burn&&isPlaying()&&burning())m*=2;if(A.roul===2)m*=1.3;return m}}
{const cd0=cardDisc;cardDisc=function(k){let d=cd0(k);const A=G.aug||{};if(A.wn_ambush&&isPlaying()&&G.t<15)d++;if(A.wn_burn&&isPlaying()&&burning())d++;return d}}
{const ac9=applyCard;applyCard=function(k,x,z,extra){const D=G.devil,A=G.aug||{};const cost=CARDS[k]?CARDS[k].cost:0,pt0=D?D.pt:0,n0=G.ents.length;const r=ac9(k,x,z,extra);
  if(r==='ok'&&D&&!G.mirror){const paid=pt0-D.pt>0;
    if(A.wn_craft)stkAdd('wn_craft',1,40);
    if(D.firstFree>0&&paid){D.firstFree--;D.pt=Math.min(ptMax(),D.pt+cost);if(G.mode==='devil')say('첫 수: 공짜!',false,1)}
    else if(A.wn_fate){const t=Math.random();if(t<.1&&paid){D.pt=Math.min(ptMax(),D.pt+cost);if(G.mode==='devil')say('운명의 카드: 공짜!',false,1)}
      else if(t<.35){const i=D.hand.indexOf(k);// 한 번 더: 몬스터·포탑은 하나 더, 그 밖의 카드는 손에 다시
        const e=G.ents[G.ents.length-1];if(G.ents.length>n0&&e&&(isMon(e)||e.type==='tower')){try{const ox=x+(Math.random()<.5?-1:1)*C*.6,oz=z;if(e.type==='tower')spawnTower(ox,oz,e.tk);else if(e.type==='skel')spawnSkel(ox,oz);else spawnMon(e.type,ox,oz)}catch(_){}}
        else{const j=D.deck.lastIndexOf(k);if(j>=0){D.deck.splice(j,1);const slot=D.hand.findIndex((q,qi)=>qi>=0&&q!==k);if(slot>=0){D.deck.unshift(D.hand[slot]);D.hand[slot]=k}try{buildHand()}catch(_){}}}
        if(G.mode==='devil')say('운명의 카드: 한 번 더!',false,1)}}}
  return r}}
{const ue9=updEnts;updEnts=function(dt){const A=G.aug||{},D=G.devil;const ids=A.wn_recycle?new Set(G.ents.filter(e=>isMon(e)||e.type==='tower'||TRAPS.includes(e.type)).map(e=>e)):null;ue9(dt);
  if(!D||G.mirror||G.over)return;
  if(ids){let n=0;const now=new Set(G.ents);G._rc=G._rc||new WeakSet();for(const e of ids)if((!now.has(e)||e.dead)&&!G._rc.has(e)){G._rc.add(e);n++}if(n){D.pt=Math.min(ptMax(),D.pt+n)}}
  if(A.wn_piggy&&D.pt>=ptMax()-1e-6){D.bankAcc=(D.bankAcc||0)+dt/PT_SEC*sodaMul();if(D.bankAcc>=1){D.bankAcc-=1;stkAdd('wn_piggy',1,4)}}
  if(A.wn_interest){D.intT=(D.intT||0)+dt;if(D.intT>=5){D.intT-=5;const add=Math.floor(D.pt/3);if(add>0)D.pt=Math.min(ptMax(),D.pt+add)}}}}
