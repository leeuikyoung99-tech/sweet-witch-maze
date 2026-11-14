/* ================= 86차: 스토리 새로 짜기 — 8장 × 6단계 · 장마다 규칙 · 마지막은 거대 마녀 보스 ================= */
// 단계 종류: esc 탈출 · candy 사탕 모으기 · surv 버티기 · puzzle 벽 퍼즐 · witch 마녀로 막기 · gate 관문(그 장 마녀의 큰 마법 피해 탈출) · gboss 거대 마녀
// 장 규칙은 그 장의 미로 단계(탈출·사탕·버티기·관문·마녀)에 늘 켜져요. 퍼즐과 거대 마녀에는 없어요.
const ST6={
 1:{rule:'rain',rn:'사탕 비',rd:'사탕이 자주 새로 떨어져요',L:['esc','candy','witch','surv','gate','gboss'],sk:['tower','trap','fake']},
 2:{rule:'moving',rn:'움직이는 얼음벽',rd:'30초마다 벽 하나가 저절로 옮겨져요',L:['esc','puzzle','gate','witch','candy','gboss'],sk:['ice','prison','tower']},
 3:{rule:'night',rn:'깜깜한 밤',rd:'가까운 곳만 보여요 · 사탕은 빛나요',L:['esc','surv','witch','gate','puzzle','gboss'],sk:['ghost','bat','spider']},
 4:{rule:'fakeexit',rn:'가짜 출구',rd:'가짜 출구에 닿으면 출발점으로',L:['esc','candy','gate','witch','surv','gboss'],sk:['bear','soldier','tower']},
 5:{rule:'castle',rn:'포탑 공장',rd:'출구 앞 대포 2개 · 포탑 7개까지',L:['esc','puzzle','witch','gate','candy','gboss'],sk:['magnet','skel','soldier']},
 6:{rule:'nomap',rn:'구름 지도',rd:'처음 30초는 작은 지도가 안 보여요',L:['esc','surv','gate','witch','puzzle','gboss'],sk:['ghost','magnet','ice']},
 7:{rule:'party',rn:'몬스터 파티',rd:'몬스터가 더 많이 · 포탑은 2개까지',L:['esc','candy','witch','gate','surv','gboss'],sk:['skel','spider','trap']},
 8:{rule:'mix',rn:'쓴맛 섞기',rd:'움직이는 벽 + 가짜 출구',L:['esc','puzzle','gate','witch','candy','gboss'],sk:['magnet','bear','prison']}};
const ST6AUG={rain:[],moving:['wp_moving'],night:['wp_night'],fakeexit:['wp_fake'],castle:['wg_tur2','w_guard'],nomap:[],party:['wp_party'],mix:['wp_moving','wp_fake']};
Object.assign(STT_N,{gate:'관문',gboss:'거대 마녀'});
Object.assign(STT_COL,{gate:'#e8506a',gboss:'#ffc23a'});
Object.assign(STT_D,{gate:'그 장 마녀의 큰 마법을 피해 탈출해요',gboss:'거대해진 마녀를 피해 사탕 6개를 먹고 넘어가요'});
stType=function(c,s){const L=ST6[c]&&ST6[c].L;return(L&&L[s-1])||'esc'};
{const sd=stDef;stDef=function(c,s){const st=sd(c,s),R=ST6[c];st.rule=R.rule;const T=st.type;
  st.aug=(T==='puzzle'||T==='gboss')?[]:(ST6AUG[R.rule]||[]).slice();
  if(T==='gate'){st.hz=c;st.ai=c<=2?1:2;st.g3='hp';st.walls=Math.min(60,st.walls+2);st.deck=STORY[c-1].cards.slice(0,8)}
  if(T==='gboss'){st.ai=c<=2?0:c<=5?1:2;st.sk=R.sk.slice();st.fastB=c<=4?150:140}
  return st}}
{const g=stGoals3;stGoals3=function(st){if(st.type==='gate')return['관문을 지나 탈출',G3S.hp,`${st.fast}초 안에 탈출`];
  if(st.type==='gboss')return['거대 마녀 이기기','하트 2개 넘게 남기기',`${st.fastB}초 안에 이기기`];return g(st)}}
// ----- 매 프레임: 관문 = 그 장 보스 마법 · 1장 규칙 = 사탕 비 -----
{const t0=storyTick;storyTick=function(dt){t0.apply(this,arguments);const st=G.stage;if(!st||!st.story||G.over||G.duo||G.mode!=='hero')return;
  if(st.type==='gate')bossTick(st.hz,dt);
  if(st.rule==='nomap'&&!G.nomapOn){G.nomapOn=1;G.mapFog=Math.max(G.mapFog||0,30)}
  if(st.rule==='rain'&&st.type!=='candy'){G.rainT=(G.rainT==null?6:G.rainT)-dt;if(G.rainT<=0){G.rainT=5;if(G.candies.filter(c=>!c.fake).length<9)spawnCandy()}}}}
// ----- 시작: 장 규칙 알림 · 거대 마녀는 미니게임 엔진으로 -----
const MGST={st:null};
{const ss=startStory;startStory=function(c,s){if(!stOpen2(c,s))return;const st=stDef(c,s);G.rainT=null;G.nomapOn=0;MAPPICK=null;
  if(st.type!=='gboss'){const r=ss.apply(this,arguments);if(st.type!=='puzzle'){const R=ST6[c];setTimeout(()=>{if(G.stage&&G.stage.n===st.n&&!G.over)say(`이번 장 규칙 · ${R.rn}`,true,2.4)},3800)}return r}
  SER.on=false;try{resetDuo()}catch(e){}if(!STG_SAVE)STG_SAVE={AIL,PT:PT_SEC};AIL=st.ai;G.chal=null;G.bonus=0;try{netLeave()}catch(e){}G.stage=st;MGST.st=st;
  try{MAPPICK=st.th;applyTheme(st.th,true)}catch(e){}try{loadMapMusic(st.th)}catch(e){}mgSelOpen('thief')}}
function st6Boss(st,sk){AIL=st.ai;try{MAPPICK=st.th;applyTheme(st.th,true)}catch(e){}if(!isFull())goFull(true);
  mgStart('thief',sk.slice(),st.sk.slice());setTimeout(()=>{if(MG.on&&MGST.st===st)mgMsg(`${STORY[st.c-1].w}가 거대해졌어요!`,2.2)},4300)}
{const f=mgSelDone;mgSelDone=function(R,sel){const st=MGST.st;if(!st||R!=='thief')return f.apply(this,arguments);SAVE.mgTh=sel.slice();saveGame();st6Boss(st,sel)}}
{const f=mgAgain;mgAgain=function(){const st=MGST.st;if(!st)return f.apply(this,arguments);const a=MG.th.sk.slice();$('mgRes').hidden=true;mgClean();MG.on=false;st6Boss(st,a)}}
{const f=mgExit;mgExit=function(){if(!MGST.st)return f.apply(this,arguments);MGST.st=null;const ts=titleScreen;titleScreen=function(){titleScreen=ts;openStages()};try{return f.apply(this,arguments)}finally{titleScreen=ts}}}
{const ts=titleScreen;titleScreen=function(){MGST.st=null;return ts.apply(this,arguments)}}
{const os=openStages;openStages=function(){MAPPICK=null;return os.apply(this,arguments)}}
// ----- 거대 마녀 결과: 별 · 코인 · 상자 -----
function st6Save(st,b){const key=st.c+'-'+st.s,old=SAVE.st2[key]|0,nb=b&~old,news=(nb&1)+((nb>>1)&1)+((nb>>2)&1);SAVE.st2[key]=old|b;
  let coins=news*5+((nb&1)?stFirst(st.c):0);const gift={};
  if((nb&1)&&BOSS_BOX[st.c]!=null){SAVE.boxes=SAVE.boxes||[];SAVE.boxes.push(BOSS_BOX[st.c]);gift.box=BOSS_BOX[st.c];SAVE.cardPick=(SAVE.cardPick|0)+1}
  if(coins){SAVE.coins+=coins;syncCoins()}saveGame();if(news)try{misAdd('stage',news)}catch(e){}return{b,news,coins,gift,first:!!(nb&1)}}
const ST6_NEXT='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 L15 12 L5 19 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/><rect x="16" y="5" width="3.6" height="14" rx="1.2" fill="#fff" stroke="#4a2a1a" stroke-width="2"/></svg>';
{const f=mgEnd;mgEnd=function(win,why){const st=MGST.st,was=MG.over;const r=f.apply(this,arguments);if(!st||was||!MG.over)return r;
  const won=win==='thief';let b=0;if(won){b|=1;if(MG.th.hp>=2)b|=2;if(MG.t<=st.fastB)b|=4}const x=st6Save(st,b);
  setTimeout(()=>{if(!MG.on||MGST.st!==st)return;const R=$('mgRes'),all=sb2(st.c,st.s);
    R.querySelector('.mg-rt').textContent=`${st.c}장 ${st.s}단계 · `+(won?`${STORY[st.c-1].w}를 이겼어요`:why==='hp'?'거대 마녀에게 잡혔어요':'시간이 다 됐어요');
    let ln=R.querySelector('.mg-st6');if(!ln){ln=document.createElement('div');ln.className='mg-st6';R.querySelector('.mg-rs').after(ln)}
    ln.innerHTML=`<span class="s6s">${[0,1,2].map(i=>`<i class="${(all>>i)&1?'on':''}">${PS_STAR}</i>`).join('')}</span><span class="s6t">${x.news?`새 별 ${x.news}개 · ${COIN_SVG}+${x.coins}`:(x.b?'이미 받은 별이에요':'별을 못 받았어요')}${x.gift.box!=null?` · ${boxName(x.gift.box)}`:''}</span>`;
    const row=R.querySelector('.mg-prow');let nb=$('mgResNext');const nx=st.c<8?[st.c+1,1]:null,ok=!!(nx&&stOpen2(nx[0],nx[1]));
    if(!nb){nb=document.createElement('button');nb.id='mgResNext';nb.className='mg-big go';nb.setAttribute('aria-label','다음 장');nb.innerHTML=ST6_NEXT;row.appendChild(nb);
      nb.onclick=()=>{SFX.click();const s=MGST.st;if(!s)return;const n2=[s.c+1,1];MGST.st=null;const ts=titleScreen;titleScreen=function(){titleScreen=ts};try{mgExit()}finally{titleScreen=ts}startStage(n2[0]*100+n2[1])}}
    nb.hidden=!ok;R.querySelector('#mgResHome').setAttribute('aria-label','목록');
    if(won&&x.first)setTimeout(()=>{if(MG.on)storyOutro(st.c)},700)},960);return r}}
{const f=mgExit;mgExit=function(){const r=f.apply(this,arguments);const ln=document.querySelector('#mgRes .mg-st6');if(ln)ln.remove();const nb=$('mgResNext');if(nb)nb.hidden=true;return r}}
{const f=mgStart;mgStart=function(){const r=f.apply(this,arguments);const ln=document.querySelector('#mgRes .mg-st6');if(ln)ln.remove();const nb=$('mgResNext');if(nb)nb.hidden=true;return r}}
// ----- 대사 (장마다 6단계) -----
{const D={
 1:{1:[['t','하늘에서 반짝이는 게 떨어졌어! 별 조각인가?'],['w','이건 내 거야! 쓴맛 님이 꼭 지키라고 했거든'],['t','이 마을엔 사탕 비가 내리네. 주우면서 가자!']],
    2:[['t','깨진 별 부스러기가 사탕이 돼서 흩어졌어'],['t','다 모으면 롤리가 숨은 곳이 보일 거야']],
    3:[['t','롤리가 마녀 카드를 떨어뜨렸어!'],['r','크래커 도둑 바삭 님의 그림자 쿠키가 간다~'],['t','이번엔 내가 마녀가 돼서 미로를 지키자!']],
    4:[['w','슬라임들아, 저 쿠키를 붙잡아!'],['t','출구가 잠겼어! 끝까지 버텨야 해!']],
    5:[['b','후후… 롤리, 그 쿠키를 절대 보내지 마라'],['w','거대 막대사탕이 미로를 휩쓸 거야!'],['t','막대가 지나간 뒤를 따라가면 돼!']],
    6:[['w','쓴맛 님이 힘을 주셨어! 이제 난 거인이야!'],['t','사탕 6개를 먹고 반대편으로 넘어가자!']]},
 2:{1:[['w','꽁꽁 얼려 주지! 이 별 조각은 비터 님 거야'],['t','롤리처럼 너도 저주에 걸린 거구나'],['w','내 얼음벽은 가만히 있지 않는단다~']],
    2:[['t','얼음벽이 길을 막았어'],['t','벽을 밀어서 길을 열어 보자']],
    3:[['w','눈보라야, 모든 걸 덮어 버려!'],['t','파란 줄이 깔리면 그 줄을 벗어나자!']],
    4:[['p','쿠키야, 비터의 그림자 쿠키들이 몰려와!'],['p','내 마녀 카드를 빌려줄게. 미로로 막아 줘!'],['t','롤리, 맡겨 줘!']],
    5:[['r','또 만났네! 이번 조각도 내가 가져간다'],['t','바삭, 넌 왜 별 조각을 모으는 거야?'],['r','…그건 비밀이야']],
    6:[['b','서리, 실망시키지 마라'],['w','추워… 그런데 왜 이렇게 화가 나지…'],['t','조금만 기다려, 서리! 금방 구해 줄게!']]},
 3:{1:[['t','호박 숲은 어둡고 으스스해… 앞이 잘 안 보여'],['w','히히, 길 잃은 쿠키 한 명 추가요~'],['t','사탕이 빛나니까 그걸 따라가자']],
    2:[['w','유령들아, 저 쿠키를 놓치지 마!'],['t','출구가 잠겼어. 버티자!']],
    3:[['p','그림자 쿠키들이 호박 숲까지 왔어!'],['t','서리, 카드를 빌려줘. 같이 막자!']],
    4:[['w','거대 호박아, 굴러라!'],['t','굴러오는 줄을 보고 옆 길로 비키자!']],
    5:[['r','비터가 조각을 다 모으면 과자 왕국이 쓴맛이 된대'],['t','그걸 알면서 왜 돕는 거야?'],['r','…일단 이 덩굴 벽부터 밀어']],
    6:[['w','펌킨 님의 진짜 무서운 맛을 보여 주지!'],['t','숨어도 소용없어. 지도를 보면 돼!']]},
 4:{1:[['w','메리 크리스마스! 선물은 쓴맛이야~'],['t','진저까지 저주에 걸렸구나'],['w','출구가 두 개? 어느 게 진짜일까~']],
    2:[['t','선물 상자에서 별 부스러기가 쏟아졌어'],['t','얼른 다 모으자!']],
    3:[['w','거인 발로 쿵! 쿵!'],['t','그림자가 생기면 바로 피하자!']],
    4:[['p','펌킨이 카드를 빌려줄게!'],['t','그림자 쿠키들, 한 명도 못 지나가!']],
    5:[['r','쿠키… 사실 비터가 내 동생을 데려갔어'],['t','뭐라고?'],['r','진저브레드 병정들이 온다. 일단 버텨!']],
    6:[['b','쿠키, 내 쓴 가루 맛이 어떠냐'],['w','쓴맛 님을 위해! 곰아, 돌진해!'],['t','돌진은 옆으로 피하면 돼!']]},
 5:{1:[['w','초콜릿은 원래 쓴맛이 진짜지!'],['t','카카오, 정신 차려!'],['w','내 공장엔 포탑이 가득하단다']],
    2:[['t','초코 벽이 굳어서 길을 막았어'],['t','벽을 밀어서 열자']],
    3:[['p','진저가 왔다! 카드는 내가 빌려줄게'],['t','그림자 쿠키를 공장 밖으로 못 나가게!']],
    4:[['w','초코 홍수다! 전부 덮어 주지!'],['t','초코는 느려. 출구 쪽으로 계속 달리자!']],
    5:[['r','쿠키, 비터가 날 속였어'],['r','동생은 처음부터 거기 없었어. 날 이용한 거야'],['t','그럼 같이 비터를 막자!']],
    6:[['b','바삭, 배신하면 어떻게 되는지 알지?'],['r','…이제 너 따위 무섭지 않아'],['w','블랙홀 사탕으로 빨아들여 주지!']]},
 6:{1:[['w','몽글몽글~ 구름이 지도를 가려 줄게'],['r','쿠키, 이번엔 같이 가자'],['t','좋아, 바삭! 길은 눈으로 보고 가자']],
    2:[['w','둘이 붙어 다니니 보기 싫어!'],['t','출구가 잠겼어. 버티자!']],
    3:[['w','거대 회오리야, 다 빨아들여라!'],['t','회오리 바깥으로 대시!']],
    4:[['p','카카오가 카드를 빌려줄게!'],['t','그림자 쿠키들, 오지 마!']],
    5:[['t','솜사탕 벽이 엉켜 버렸어'],['r','몇 개만 밀면 풀릴 거야']],
    6:[['b','바삭, 결국 배신했구나. 둘 다 쓴맛을 보여 주마'],['w','구름 속으로 순간이동~ 잡아 봐!'],['r','흥, 해 봐!']]},
 7:{1:[['w','말랑말랑 젤리 바다에 온 걸 환영해~'],['t','말랑, 너도 쓴 가루에 걸렸구나'],['w','내 젤리 친구들이 잔뜩 놀러 왔어!']],
    2:[['r','거의 마지막 별 부스러기들이야'],['t','다 모으면 별이 거의 완성돼!']],
    3:[['p','몽글이 카드를 빌려줄게!'],['t','고마워! 그림자 쿠키는 내가 막을게']],
    4:[['w','젤리 왕님이 오신다!'],['t','느리니까 계속 움직이면 돼!']],
    5:[['b','여기까지 오다니. 이 바다가 너희 무덤이다'],['t','비터!'],['r','침착해, 버티면 돼!']],
    6:[['w','말랑 슬라임 대점프! 쿵!'],['t','떨어지는 자리를 보고 피하자!']]},
 8:{1:[['b','케이크 성에 온 걸 환영한다. 여기가 너희 마지막이다'],['t','모두를 쓴맛으로 바꾸게 두지 않을 거야!'],['r','벽도 움직이고 가짜 출구도 있대. 조심해!']],
    2:[['t','성문 벽이 꽉 잠겼어'],['r','밀 수 있는 벽을 찾아!']],
    3:[['b','내 모든 쓴맛을 보여 주마!'],['t','다들 배운 대로 피하자!']],
    4:[['p','말랑이 젤리 카드로 도울게!'],['t','고마워, 말랑! 그림자 쿠키 군단을 막자!']],
    5:[['r','쿠키, 고마워. 너 아니었으면 난 아직 비터 편이었을 거야'],['t','이제 친구잖아. 마지막 부스러기를 모으자!']],
    6:[['b','왜 포기하지 않는 거냐!'],['t','달콤한 건 나누면 더 커지니까!'],['b','그럼 거인이 된 내 힘을 보아라!']]}};
  for(const c in D)ST3[c]=D[c]}
// ----- 스토리 화면: 지도 위에 이번 장 규칙 칩 (누르면 설명 창, 별 창과 같은 모양) · 퍼즐·거대 마녀 단계엔 없어요 -----
{const rs=renderStages;renderStages=function(){const r=rs.apply(this,arguments);try{const R=ST6[STV.c],m=document.querySelector('#sv72 .sv-map'),T=stType(STV.c,STV.s),on=R&&T!=='puzzle'&&T!=='gboss';if(!on)SV72.rp=false;
    if(m&&on&&!m.querySelector('.sv-rule'))m.insertAdjacentHTML('afterbegin',`<button class="sv-rule${SV72.rp?' on':''}" aria-label="장 규칙"><i>규칙</i><span>${R.rn}</span></button>`);
    if(m&&on&&SV72.rp&&!SV72.pop)m.insertAdjacentHTML('beforeend',`<div class="sv-pop sv-rpop" role="dialog"><b>${STV.c}장 규칙 · ${R.rn}</b><p>${R.rd}</p></div>`)}catch(e){}return r}}
document.addEventListener('click',e=>{const P=e.target.closest&&e.target.closest('#sv72');if(!P)return;
  if(e.target.closest('.sv-rule')){e.stopImmediatePropagation();SV72.rp=!SV72.rp;SV72.pop=false;SFX.card();renderStages();return}
  if(e.target.closest('.sv-star'))SV72.rp=false;else if(SV72.rp&&!e.target.closest('.sv-rpop')){SV72.rp=false;if(!e.target.closest('.sv-n,.sv-tab,.sv-go'))renderStages()}},true);
{const st=document.createElement('style');st.textContent=`
#sv72 .sv-rule{position:absolute;left:8px;top:8px;max-width:calc(100% - 112px);display:flex;align-items:center;gap:5px;height:34px;box-sizing:border-box;padding:0 12px 0 5px;border-radius:17px;background:#fff8ee;border:2.5px solid var(--choco);box-shadow:0 3px 0 var(--choco);font:14px/1 var(--f-display);color:var(--choco);white-space:nowrap;cursor:pointer}
#sv72 .sv-rule span{overflow:hidden;text-overflow:ellipsis;min-width:0}#sv72 .sv-rule.on{background:#efe4ff}
#sv72 .sv-rpop{left:8px;right:auto;margin-left:0}#sv72 .sv-rpop p{margin:0;font:13px/1.3 var(--f-display);white-space:nowrap}
#sv72 .sv-rule i{font-style:normal;flex:0 0 auto;background:#8f5fe8;color:#fff;border-radius:11px;padding:4px 8px;font-size:12px}
@media (max-height:360px){#sv72 .sv-pop{top:46px!important;padding:5px 9px!important}#sv72 .sv-pop b{font-size:13px!important;margin-bottom:2px!important}#sv72 .sv-pop ul{gap:1px!important}#sv72 .sv-pop li{font-size:12px!important;line-height:1.15!important}#sv72 .sv-pop li i{width:15px!important;height:15px!important}#sv72 .sv-rpop p{font-size:12px}}
#mgRes .mg-st6{display:flex;align-items:center;gap:8px;font-size:14px;white-space:nowrap}
#mgRes .mg-st6 .s6s{display:flex;gap:1px}#mgRes .mg-st6 .s6s i{width:22px;height:22px;filter:grayscale(1) opacity(.35)}#mgRes .mg-st6 .s6s i.on{filter:none}#mgRes .mg-st6 svg{width:100%;height:100%}
#mgRes .mg-st6 .s6t svg{width:16px;height:16px;vertical-align:-3px}
#mgRes #mgResNext[hidden]{display:none}
body.st-talk #mgRes,body.st-talk #mgHud{visibility:hidden!important}`;document.head.appendChild(st)}
