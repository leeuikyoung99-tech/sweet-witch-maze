/* ================= 32차 (가): 새 스토리 "달콤 별 조각" — 단계 종류 · 난이도 곡선 · 보상 B · 보스 칸 · 1장 보스 ================= */
// ----- 이야기 인물 -----
STORY[0].w='막대사탕 마녀 롤리';STORY[1].w='빙수 마녀 서리';STORY[2].w='호박 마녀 펌킨';STORY[3].w='진저 마녀 진저';
STORY[4].w='초코 마녀 카카오';STORY[5].w='솜사탕 마녀 몽글';STORY[6].w='젤리 마녀 말랑';STORY[7].w='쓴맛 마법사 비터';
for(const ch of STORY)ch.unl=[];for(const k in STBON)delete STBON[k];
const RIVAL='크래커 도둑 바삭',VILLAIN='쓴맛 마법사 비터';
// ----- 단계 종류: 탈출 · 미니게임(버티기·사탕 모으기·벽 퍼즐) · 경주 · 마녀로 막기 · 보스 -----
const MINI3={1:['surv','candy'],2:['candy','surv'],3:['surv','candy'],4:['candy','surv'],5:['surv','candy'],6:['candy','surv'],7:['surv','candy'],8:['candy','surv']};
const STT_N={esc:'탈출',surv:'버티기',candy:'사탕 모으기',puzzle:'벽 퍼즐',race:'경주',witch:'마녀로 막기',boss:'보스'};
function stType(c,s){if(s===10)return'boss';if(s===5)return'race';if(s===6)return c>=2?'witch':'esc';if(s===3)return MINI3[c][0];if(s===7)return MINI3[c][1];return'esc'}
const stDiff=(c,s)=>((c-1)*10+(s-1))/79;
{const sd=stDef;stDef=function(c,s){const st=sd(c,s),d=stDiff(c,s),ty=stType(c,s);st.type=ty;st.d=d;
  st.ai=ty==='boss'?(c<=2?1:2):d<.15?0:d<.5?1:2;
  st.walls=Math.min(60,Math.round(34+d*24)+(ty==='boss'?2:0));
  st.pt=+(3-d*1).toFixed(2);
  if(ty==='surv'){st.secs=30+Math.round(30*d);st.pt=+(st.pt*.75).toFixed(2)}
  if(ty==='candy'){st.need=8+Math.round(12*d);st.limit=60+st.need*5;st.fastC=st.need*6}
  if(ty==='race')st.fastR=Math.max(60,120-c*5);
  st.witch=ty==='witch';if(ty==='boss')st.aug=[];
  return st}}
// ----- 보상 (B): 처음 깨면 20코인 + 장마다 5 · 별마다 5 · 짝수 장 보스는 상자 + 일반·희귀 카드 1장 -----
const stFirst=c=>20+5*(c-1);
const BOSS_BOX={2:0,4:1,6:2,8:4};
// ----- 시작 -----
let ROUND0=ROUND;
startStory=function(c,s){if(!stOpen2(c,s))return;const st=stDef(c,s);SER.on=false;resetDuo();if(!STG_SAVE)STG_SAVE={AIL,PT:PT_SEC};AIL=st.ai;PT_SEC=st.pt;G.chal=null;G.bonus=0;netLeave();window.__deck=st.deck;
  ROUND=st.type==='surv'?st.secs:st.type==='candy'?st.limit:ROUND0;
  if(!isFull())goFull(true);
  if(st.type==='race'){B.walls=[];withSeed(st.seed,()=>autoWalls(st.walls));const walls=B.walls.map(w=>[w.o,w.x,w.z]);SET.mode='race';startRace({side:0,th:st.th,walls});AIL=st.ai;G.stage=st;return}
  G.stage=st;clearWorld();applyTheme(st.th);B.walls=[];withSeed(st.seed,()=>autoWalls(st.walls));rebuildEdges();FIELD.clear();syncWallMeshes();
  beginMatch(st.witch?'devil':'hero',true)};
{const rs=restoreStage;restoreStage=function(){ROUND=ROUND0;return rs.apply(this,arguments)}}
// 경주 결과에서 다시 하기 · 다음은 스토리로
document.addEventListener('click',e=>{const st=G.stage;if(!st||!st.story||!G.duo||!e.target.closest)return;if(e.target.closest('#bAgain')){e.stopImmediatePropagation();e.preventDefault();$('revealBar').hidden=true;startStage(st.n)}},true);
// 버티기 · 사탕 모으기: 출구는 잠겨요 / 버티기는 시간이 다 되면 승리
{const em=endMatch;endMatch=function(win,why){const st=G.stage;if(st&&st.story&&!G.over){
    if((st.type==='surv'||st.type==='candy')&&win===true&&why==null){if(!G.lockSaid||G.t-G.lockSaid>3){G.lockSaid=G.t;say(st.type==='surv'?'출구가 잠겼어요. 끝까지 버텨요!':`사탕을 다 모아야 출구가 열려요`,true,1.4)}return}
    if(st.type==='surv'&&why==='time')return em.call(this,true,'surv')}
  return em.apply(this,arguments)}}
// ----- 별 · 보상 계산 -----
{const se=stageEnd;stageEnd=function(win,why,t){const st=G.stage;if(!st||!st.story||!st.type)return se.apply(this,arguments);const h=G.hero;let b=0;const hits=(G.stats&&G.stats.hits)|0;
  if(st.type==='witch'){if(!win){b|=1;const ef=exitField(),[cx,cz]=cellOf(h.x,h.z);if(why==='caught'||ef[idx(cx,cz)]>=12)b|=2;if(why==='caught')b|=4}}
  else if(win){b|=1;
    if(st.type==='surv'){if(h.hp>50)b|=2;if(!hits)b|=4}
    else if(st.type==='candy'){if(t<=st.fastC)b|=2;if(!hits)b|=4}
    else if(st.type==='race'){if(t<=st.fastR)b|=2;if(!hits)b|=4}
    else{const g=st.g3;if((g==='candy'&&h.manaGot>=5)||(g==='nohit'&&!hits)||(g==='hp'&&h.hp>60)||(g==='noskill'&&!h.skills))b|=2;if(t<=st.fast)b|=4}}
  const key=st.c+'-'+st.s,old=SAVE.st2[key]|0,nb=b&~old,news=(nb&1)+((nb>>1)&1)+((nb>>2)&1);SAVE.st2[key]=old|b;
  let coins=news*5+((nb&1)?stFirst(st.c):0);const gift={};
  if((nb&1)&&st.type==='boss'&&BOSS_BOX[st.c]!=null){SAVE.boxes=SAVE.boxes||[];SAVE.boxes.push(BOSS_BOX[st.c]);gift.box=BOSS_BOX[st.c];gift.pick=1;SAVE.cardPick=(SAVE.cardPick|0)+1}
  if(coins){SAVE.coins+=coins;syncCoins()}saveGame();if(news)misAdd('stage',news);return{b,news,coins,unl:[],gift}}}
function stGoals3(st){const T=st.type;
  if(T==='surv')return[`${st.secs}초 버티기`,'체력 절반 넘게 남기기','한 대도 안 맞기'];
  if(T==='candy')return[`사탕 ${st.need}개 모으기`,`${st.fastC}초 안에 모으기`,'한 대도 안 맞기'];
  if(T==='race')return['바삭보다 먼저 도착',`${st.fastR}초 안에 도착`,'한 대도 안 맞기'];
  if(T==='witch')return['도둑 막기','도둑을 출구에서 멀리 두기','도둑 붙잡기'];
  return['탈출하기',G3S[st.g3],`${st.fast}초 안에 탈출`]}
// ----- 결과 화면 -----
{const re=resExtra;resExtra=function(win,why,t){re.apply(this,arguments);const st=G.stage;if(!st||!st.story||!st.type)return;const x=G.extra&&G.extra.stage||{b:0,news:0,coins:0,gift:{}},all=sb2(st.c,st.s);
  let html=`<span class="rs-stars">${starRow(all,'big')}</span>`+(x.news?`새 별 ${x.news}개 · ${COIN_SVG}+${x.coins}`:(x.b?'이미 받은 별이에요':'별을 못 받았어요'));
  if(x.gift&&x.gift.box!=null)html+=`<div class="rc-got">보상: ${boxName(x.gift.box)} · 카드 1장 고르기</div>`;
  $('resCoin').innerHTML=html;$('bHome').textContent='목록';const nx=st.s<10?[st.c,st.s+1]:st.c<8?[st.c+1,1]:null;const nxOk=!!(nx&&stOpen2(nx[0],nx[1]));$('bNext').hidden=!nxOk;setTimeout(()=>{if(G.stage===st){$('bNext').hidden=!nxOk;$('bAgain').hidden=false;$('bHome').textContent='목록'}},0);$('bAgain').hidden=false;$('bAgain').disabled=false;$('bAgain').querySelector('b').textContent='다시 하기';
  const iWon=st.type==='witch'?!win:win;
  if(st.type==='surv'){$('resKick').textContent=win?'버텼어요!':'붙잡혔어요';$('resBig').textContent=win?st.secs+'초':Math.floor(t)+'초';$('resLede').textContent=`${st.c}장 ${st.s}단계 · 버티기`}
  if(st.type==='candy'){$('resKick').textContent=win?'다 모았어요!':(why==='time'?'시간 초과':'붙잡혔어요');$('resBig').textContent=`${G.hero.manaGot}/${st.need}`;$('resLede').textContent=`${st.c}장 ${st.s}단계 · 사탕 모으기`}
  if(st.type==='race'){$('resLede').textContent=`${st.c}장 ${st.s}단계 · 경주`}
  if(st.type==='boss'&&iWon&&(x.b&1)&&x.news)setTimeout(()=>storyOutro(st.c),900)}}
// ----- 카드 1장 고르기 (보스 보상) -----
function cardPickOpen(){const L=[];for(const kind of['c','s'])for(const k in GRADE[kind]){const g=GRADE[kind][k];if(g<1||g>2)continue;if(kind==='c'?cardOpen(k):skillOpen(k))continue;L.push([kind,k,g])}
  L.sort((a,b)=>a[2]-b[2]);$('pgM').hidden=false;
  if(!L.length){SAVE.cardPick=Math.max(0,(SAVE.cardPick|0)-1);SAVE.coins+=GR_P[2];saveGame();syncCoins();$('pgBody').innerHTML=`<h2>${COIN_SVG} ${GR_P[2]}코인</h2><p class="note">일반·희귀를 모두 가지고 있어서 코인으로 받았어요</p><button class="mbtn berry small" id="bCpOk"><span class="mt"><b>좋아요</b></span></button>`;$('bCpOk').onclick=()=>{SFX.click();pgClose()};return}
  $('pgBody').innerHTML=`<h2>카드 1장 고르기</h2><div class="cp-grid">${L.map(([kind,k])=>`<div class="cp-c" data-kind="${kind}" data-k="${k}">${dkTile(k,kind==='c','mini')}</div>`).join('')}</div>`;
  for(const c of $('pgBody').querySelectorAll('.cp-c'))c.onclick=()=>{SFX.card();unlockItem(c.dataset.kind,c.dataset.k);SAVE.cardPick=Math.max(0,(SAVE.cardPick|0)-1);saveGame();pgClose();setTimeout(()=>{if(SAVE.cardPick>0)cardPickOpen()},200)}}
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);if((SAVE.cardPick|0)>0&&!(SAVE.boxes&&SAVE.boxes.length))setTimeout(()=>{if(screen==='title'&&$('pgM').hidden&&$('storyM').hidden)cardPickOpen()},400);return r}}
{const pc=pgClose;pgClose=function(){const r=pc.apply(this,arguments);if((SAVE.cardPick|0)>0&&!(SAVE.boxes&&SAVE.boxes.length)&&screen==='title')setTimeout(()=>{if($('pgM').hidden&&$('storyM').hidden)cardPickOpen()},250);return r}}

{const os=openStages;openStages=function(){const r=os.apply(this,arguments);if((SAVE.cardPick|0)>0&&!(SAVE.boxes&&SAVE.boxes.length))setTimeout(()=>{if(screen==='stages'&&$('pgM').hidden&&$('storyM').hidden)cardPickOpen()},400);return r}}
{const b=$('bStage'),sm=b&&b.querySelector('small');if(sm)sm.textContent='달콤 별 조각'}
