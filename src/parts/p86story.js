/* ================= 86차: 스토리 새로 짜기 — 8장 × 6단계 · 장마다 규칙 · 마지막은 거대 마녀 보스 ================= */
// 단계 종류: esc 탈출 · candy 사탕 모으기 · surv 버티기 · puzzle 벽 퍼즐 · witch 마녀로 막기 · gate 관문(그 장 마녀의 큰 마법 피해 탈출) · gboss 거대 마녀
// 장 규칙은 그 장의 미로 단계(탈출·사탕·버티기·관문·마녀)에 늘 켜져요. 퍼즐과 거대 마녀에는 없어요.
// N: 단계 이름(이야기 순서) · rn: 이 장 규칙(누구나 알아듣게 한 문장) · rd: 조금 더 자세히 · hz: 관문 목표
const ST6={
 1:{rw:'',rule:'rain',rn:'사탕이 계속 생겨요',rd:'5초마다 미로 어딘가에 새 사탕이 떨어져요',hz:'거대 막대사탕을 피해 탈출하기',L:['esc','candy','witch','surv','gate','gboss'],sk:['tower','trap','fake'],
    N:['별 조각 쫓기','별 부스러기 줍기','부스러기 지키기','슬라임 함정','막대사탕 관문','거대 롤리']},
 2:{rw:'벽이 30초마다 저절로 움직여요',rule:'moving',rn:'벽이 30초마다 움직여요',rd:'30초마다 벽 하나가 내 길을 막는 쪽으로 옮겨져요',hz:'눈보라를 피해 탈출하기',L:['esc','puzzle','gate','witch','candy','gboss'],sk:['ice','prison','tower'],
    N:['얼음 동굴 입구','얼어붙은 길','눈보라 관문','롤리의 부탁','동굴 속 부스러기','거대 서리']},
 3:{rw:'',rule:'night',rn:'어두워서 가까운 곳만 보여요',rd:'작은 지도와 반짝이는 사탕을 보고 길을 찾아요',hz:'굴러오는 호박을 피해 탈출하기',L:['esc','surv','witch','gate','puzzle','gboss'],sk:['ghost','bat','spider'],
    N:['깜깜한 숲길','유령 포위','서리의 카드','굴러오는 호박','덩굴 벽','거대 펌킨']},
 4:{rw:'가짜 출구를 하나 놓을 수 있어요',rule:'fakeexit',rn:'가짜 출구가 하나 있어요',rd:'가짜 출구에 닿으면 출발점으로 돌아가요',hz:'거인 발자국을 피해 탈출하기',L:['esc','candy','gate','witch','surv','gboss'],sk:['bear','soldier','tower']
    ,N:['두 개의 출구','선물 상자','거인 발자국','펌킨의 카드','병정 행진','거대 진저']},
 5:{rw:'포탑 7개까지 · 출구 앞 대포 2개',rule:'castle',rn:'포탑이 많아요',rd:'출구 앞에 대포 2개 · 포탑이 7개까지 서요',hz:'초코 홍수를 피해 탈출하기',L:['esc','puzzle','witch','gate','candy','gboss'],sk:['magnet','skel','soldier'],
    N:['포탑 공장','굳은 초코 벽','진저의 카드','초코 홍수','바삭의 고백','거대 카카오']},
 6:{rw:'',rule:'nomap',rn:'처음 30초는 지도가 안 보여요',rd:'구름이 걷히면 작은 지도가 다시 보여요',hz:'회오리를 피해 탈출하기',L:['esc','surv','gate','witch','puzzle','gboss'],sk:['ghost','magnet','ice'],
    N:['구름 속 길','둘이서 버티기','회오리 관문','카카오의 카드','엉킨 솜사탕','거대 몽글']},
 7:{rw:'몬스터 6마리까지 · 포탑은 2개까지',rule:'party',rn:'몬스터가 많아요',rd:'몬스터가 6마리까지 나와요 · 포탑은 2개까지',hz:'젤리 왕을 피해 탈출하기',L:['esc','candy','witch','gate','surv','gboss'],sk:['skel','spider','trap'],
    N:['젤리 파티','바닷속 부스러기','몽글의 카드','젤리 왕','비터의 함정','거대 말랑']},
 8:{rw:'벽이 움직이고 가짜 출구를 놓을 수 있어요',rule:'mix',rn:'벽이 움직이고 가짜 출구도 있어요',rd:'30초마다 벽이 옮겨지고 가짜 출구가 하나 있어요',hz:'모든 마법을 피해 탈출하기',L:['esc','puzzle','gate','witch','candy','gboss'],sk:['magnet','bear','prison'],
    N:['케이크 성문','잠긴 성문','쓴맛 폭풍','말랑의 카드','마지막 부스러기','거대 비터']}};
// 단계 목표 한 줄 (스토리 화면 · 시작 카드 · 결과에 같이 써요)
function st6Goal(st){const T=st.type,R=ST6[st.c];
  if(T==='esc')return'출구를 찾아 탈출하기';if(T==='candy')return`사탕 ${st.need}개 모으기`;if(T==='surv')return`출구가 열릴 때까지 ${st.secs}초 버티기`;
  if(T==='witch')return`마녀가 돼서 ${Math.round(ROUND0/60)}분 동안 도둑 막기`;if(T==='gate')return R.hz;if(T==='puzzle')return'벽을 밀어 출구까지 길 열기';
  if(T==='gboss')return'사탕 6개 먹고 반대편으로 넘어가기';return''}
const st6Name=(c,s)=>(ST6[c]&&ST6[c].N[s-1])||'';
const st6Rule=st=>{if(st.type==='puzzle'||st.type==='gboss')return'';const R=ST6[st.c];return st.type==='witch'?R.rw:R.rn};
const st6RuleOn=st=>!!st6Rule(st);
// 판 시작 카드: 3·2·1 아래에 [단계 이름][목표][이 장 규칙], 5초쯤 보였다 사라져요
const ST6C={id:0};
function st6Card(st){let el=$('st6Card');if(!el){el=document.createElement('div');el.id='st6Card';el.hidden=true;document.body.appendChild(el)}const my=++ST6C.id;
  el.innerHTML=`<span class="c1">${st.c}장 ${st.s}단계 · ${st6Name(st.c,st.s)}</span><span class="c2"><i>목표</i>${st6Goal(st)}</span>`+(st6RuleOn(st)?`<span class="c3"><i>이 장 규칙</i>${st6Rule(st)}</span>`:'');
  el.classList.remove('out');el.hidden=false;el.querySelectorAll('span').forEach(e=>st6Fit(e,10));
  const off=()=>{if(ST6C.id!==my)return;el.classList.add('out');setTimeout(()=>{if(ST6C.id===my)el.hidden=true},420)};setTimeout(off,5200);
  const chk=setInterval(()=>{if(ST6C.id!==my){clearInterval(chk);return}const play=(typeof screen!=='undefined'&&(screen==='play'||screen==='mini'))||(MG&&MG.on);if(!play||(G.over&&!G.cdn&&!(MG&&MG.on))){clearInterval(chk);ST6C.id++;el.hidden=true}},200)}
{const re=resExtra;resExtra=function(win,why,t){re.apply(this,arguments);const st=G.stage;if(!st||!st.story)return;try{const L=$('resLede');L.textContent=`${st.c}장 ${st.s}단계 · ${st6Name(st.c,st.s)}`}catch(e){}}}
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
  if(st.type!=='gboss'){const r=ss.apply(this,arguments);if(st.type!=='puzzle')st6Card(st);return r}
  SER.on=false;try{resetDuo()}catch(e){}if(!STG_SAVE)STG_SAVE={AIL,PT:PT_SEC};AIL=st.ai;G.chal=null;G.bonus=0;try{netLeave()}catch(e){}G.stage=st;MGST.st=st;
  try{MAPPICK=st.th;applyTheme(st.th,true)}catch(e){}try{loadMapMusic(st.th)}catch(e){}mgSelOpen('thief')}}
function st6Boss(st,sk){AIL=st.ai;try{MAPPICK=st.th;applyTheme(st.th,true)}catch(e){}if(!isFull())goFull(true);
  mgStart('thief',sk.slice(),st.sk.slice());st6Card(st)}
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
// ----- 대사 (장마다 6단계): 앞 판에서 이어지고, 마지막 줄은 늘 이번 판에 할 일 -----
{const D={
 1:{1:[['t','하늘에서 반짝이는 별 조각이 떨어졌어!'],['w','이건 쓴맛 님 거야! 내 미로로 못 따라오게 막아 주지!'],['t','롤리가 조각을 들고 미로 끝으로 달아났어. 출구까지 쫓아가자!']],
    2:[['w','흥, 못 가질 바엔 부숴 버리겠어!'],['t','별 조각이 부서져서 사탕이 됐어!'],['t','흩어진 사탕을 다 모으면 별 조각을 다시 붙일 수 있어!']],
    3:[['r','그 부스러기, 크래커 도둑 바삭 님이 가져간다!'],['t','롤리가 떨어뜨린 마녀 카드가 있어. 이번엔 내가 마녀야!'],['t','카드로 미로를 바꿔서 바삭의 그림자 쿠키가 출구에 못 가게 막자!']],
    4:[['w','잡았다! 출구는 잠갔어. 슬라임들아, 덮쳐!'],['t','출구가 다시 열릴 때까지 슬라임을 피해 버티자!']],
    5:[['w','마지막 길은 거대 막대사탕이 지키고 있지!'],['t','막대사탕이 휩쓸고 간 뒤를 따라가서 출구로 빠져나가자!']],
    6:[['b','롤리, 내 쓴 가루를 받아라!'],['w','힘이 넘쳐! 이제 난 거인이야!'],['t','사탕 6개를 먹으면 반대편 출구가 열려. 붙잡히지 말자!']]},
 2:{1:[['t','첫 번째 별 조각을 찾았어! 다음 조각은 얼음 동굴에 있대'],['w','어서 와~ 내 얼음벽은 30초마다 자리를 바꾼단다'],['t','길이 바뀌어도 당황하지 말고 출구를 찾자!']],
    2:[['w','길을 꽁꽁 얼려 버렸지!'],['t','얼음벽을 몇 개 밀어서 출구까지 길을 열자!']],
    3:[['w','눈보라야, 다 덮어 버려!'],['t','파란 줄이 깔리면 그 줄 밖으로 피하면서 출구로 가자!']],
    4:[['p','쿠키야! 바삭의 그림자 쿠키들이 내 마을로 몰려가!'],['p','내 마녀 카드를 빌려줄게. 미로로 막아 줘!'],['t','좋아, 그림자 쿠키가 출구에 못 가게 막자!']],
    5:[['r','서리가 조각을 부숴서 동굴에 뿌렸대'],['t','바삭, 넌 왜 별 조각을 모으는 거야?'],['r','…비밀이야. 아무튼 부스러기부터 줍자']],
    6:[['b','서리, 실망시키지 마라'],['w','추워… 그런데 화가 멈추질 않아…!'],['t','서리를 구하자! 사탕 6개를 먹고 반대편으로 넘어가면 돼!']]},
 3:{1:[['t','서리가 그러는데 다음 조각은 호박 숲에 있대'],['w','히히, 내 숲은 깜깜해서 코앞만 보인단다'],['t','작은 지도와 반짝이는 사탕을 보며 출구를 찾자!']],
    2:[['w','유령들아, 출구를 막고 저 쿠키를 둘러싸!'],['t','출구가 열릴 때까지 유령을 피해 버티자!']],
    3:[['p','쿠키, 그림자 쿠키들이 숲으로 들어왔어! 내 카드를 써!'],['t','출구 앞을 막아서 한 명도 못 나가게 하자!']],
    4:[['w','거대 호박아, 굴러라~!'],['t','호박이 굴러오는 줄을 보고 옆길로 비키며 출구로 가자!']],
    5:[['r','비터가 조각을 다 모으면 과자 나라가 쓴맛이 된대'],['t','그걸 알면서 왜 비터를 돕는 거야?'],['r','…일단 이 덩굴 벽부터 밀어서 길을 열자']],
    6:[['w','펌킨 님의 진짜 무서운 맛을 보여 주지!'],['t','어두워도 괜찮아. 사탕 6개를 먹고 반대편으로 넘어가자!']]},
 4:{1:[['t','펌킨이 알려 줬어. 다음 조각은 크리스마스 마을이야'],['w','메리 크리스마스~ 출구가 두 개! 하나는 가짜란다'],['t','가짜에 닿으면 처음 자리로 돌아가. 진짜 출구를 찾자!']],
    2:[['w','조각을 부숴서 선물 상자에 숨겼지~'],['t','상자에서 쏟아진 사탕을 모두 모으자!']],
    3:[['w','거인 발로 쿵! 쿵!'],['t','바닥에 그림자가 생기면 피하면서 출구로 가자!']],
    4:[['p','그림자 쿠키 떼가 온다! 내 호박 카드를 빌려줄게'],['t','그림자 쿠키가 출구에 못 가게 막자!']],
    5:[['r','쿠키… 사실 비터가 내 동생을 데려갔어'],['w','진저브레드 병정들, 출구를 막아라!'],['t','출구가 열릴 때까지 병정들을 피해 버티자!']],
    6:[['b','쿠키, 쓴 가루 맛이 어떠냐'],['w','쓴맛 님을 위해! 곰아, 돌진해!'],['t','돌진은 옆으로 피하고 사탕 6개를 먹고 넘어가자!']]},
 5:{1:[['t','진저가 다음 조각은 초콜릿 공장에 있대'],['w','초콜릿은 쓴맛이 진짜지! 내 공장엔 포탑이 가득해'],['t','포탑이 쏘기 전 표시를 보고 피하면서 출구로 가자!']],
    2:[['w','초코를 부어서 길을 굳혀 버렸어!'],['t','벽을 밀어서 출구까지 길을 열자!']],
    3:[['p','그림자 쿠키들이 공장으로 몰려가! 내 카드 받아!'],['t','그림자 쿠키를 공장 밖으로 못 나가게 막자!']],
    4:[['w','초코 홍수다! 전부 덮어 버려!'],['t','초코에 빠지면 느려져. 멈추지 말고 출구로!']],
    5:[['r','쿠키, 비터가 날 속였어. 동생은 처음부터 거기 없었어'],['t','그럼 이제 같이 하자! 흩어진 사탕을 모두 모으자!']],
    6:[['b','바삭, 배신하면 어떻게 되는지 알지?'],['r','이제 너 따위 무섭지 않아!'],['t','카카오를 피해 사탕 6개를 먹고 넘어가자!']]},
 6:{1:[['r','다음 조각은 솜사탕 구름 위래. 이번엔 같이 가자!'],['w','몽글몽글~ 구름이 처음 30초 동안 지도를 가려 줄게'],['t','지도가 안 보여도 길을 기억하며 출구로 가자!']],
    2:[['w','둘이 붙어 다니니 보기 싫어! 출구는 잠갔어!'],['t','출구가 다시 열릴 때까지 버티자!']],
    3:[['w','거대 회오리야, 다 빨아들여라!'],['t','회오리에 끌려가지 않게 바깥으로 돌아 출구로!']],
    4:[['p','그림자 쿠키들이 구름까지 올라왔어! 내 카드를 써!'],['t','그림자 쿠키가 출구에 못 가게 막자!']],
    5:[['t','솜사탕 벽이 엉켜서 길이 막혔어'],['r','몇 개만 밀면 풀릴 거야. 출구까지 길을 열자!']],
    6:[['b','바삭, 결국 배신했구나. 둘 다 쓴맛을 보여 주마'],['w','구름 속으로 순간이동~ 잡아 봐!'],['t','몽글을 피해 사탕 6개를 먹고 넘어가자!']]},
 7:{1:[['t','이제 조각이 두 개 남았어. 젤리 바다로 가자!'],['w','말랑말랑~ 오늘은 젤리 몬스터 파티야!'],['t','몬스터가 많아. 피해 다니며 출구로 가자!']],
    2:[['w','조각은 산산조각 내서 바다에 뿌렸지~'],['t','바다에 흩어진 사탕을 모두 모으자!']],
    3:[['p','그림자 쿠키 군단이 바다로 와! 내 카드 받아!'],['t','그림자 쿠키가 출구에 못 가게 막자!']],
    4:[['w','젤리 왕님이 오신다! 다 밟아 버려!'],['t','젤리 왕은 느려. 계속 움직이며 출구로!']],
    5:[['b','여기까지 오다니. 출구는 내가 잠갔다'],['r','침착해, 쿠키. 출구가 열릴 때까지만 버티면 돼!']],
    6:[['w','말랑 슬라임 대점프! 쿵!'],['t','떨어지는 자리를 보고 피하며 사탕 6개를 먹자!']]},
 8:{1:[['b','케이크 성에 온 걸 환영한다. 여기가 끝이다'],['r','벽이 30초마다 움직이고 가짜 출구도 있대!'],['t','지금까지 배운 대로 진짜 출구를 찾아가자!']],
    2:[['b','성문은 꽉 잠겼다. 들어올 수 있으면 와 봐라'],['t','벽을 밀어서 성 안으로 가는 길을 열자!']],
    3:[['b','모든 마녀의 마법을 한꺼번에 보여 주마!'],['t','눈보라·호박·회오리… 배운 대로 피하며 출구로!']],
    4:[['p','비터가 그림자 쿠키를 전부 풀었어! 내 카드를 써!'],['t','마지막 그림자 쿠키 군단, 한 명도 못 나가게 막자!']],
    5:[['r','쿠키, 고마워. 너 아니었으면 난 아직 비터 편이었을 거야'],['t','이제 친구잖아. 마지막 사탕을 모두 모으자!']],
    6:[['b','왜 포기하지 않는 거냐!'],['t','달콤한 건 나누면 더 커지니까!'],['t','사탕 6개를 먹고 넘어가면 별이 완성돼!']]}};
  for(const c in D)ST3[c]=D[c]}
// ----- 스토리 화면: 지도 아래 카드에 [단계 이름][목표][이 장 규칙] 세 줄. 글자가 넘치면 줄여 맞춰요 -----
function st6Fit(el,min){if(!el)return;el.style.fontSize='';let f=parseFloat(getComputedStyle(el).fontSize)||14;for(let i=0;i<14&&el.scrollWidth>el.clientWidth+1&&f>min;i++){f-=1;el.style.fontSize=f+'px'}}
{const rs=renderStages;renderStages=function(){const r=rs.apply(this,arguments);try{const c=STV.c,s=STV.s,st=stDef(c,s),R=ST6[c],t=document.querySelector('#sv72 .sv-ttl');
    if(t){t.innerHTML=`<span class="s6n">${c}-${s} ${st6Name(c,s)}</span><span class="s6l"><i class="g">목표</i>${st6Goal(st)}</span>`+(st6RuleOn(st)?`<span class="s6l"><i>이 장 규칙</i>${st6Rule(st)}</span>`:'');
      t.querySelectorAll('.s6n,.s6l').forEach(e=>st6Fit(e,9))}}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`
#sv72 .sv-ttl{display:flex!important;flex-direction:column;gap:2px;max-width:calc(100% - 16px)!important;box-sizing:border-box;padding:5px 10px 6px!important;overflow:hidden}
#sv72 .sv-ttl .s6n,#sv72 .sv-ttl .s6l{display:block;white-space:nowrap;overflow:hidden;min-width:0}
#sv72 .sv-ttl .s6l{font:12px/1.25 var(--f-display);color:#fff4e6}
#sv72 .sv-ttl .s6l i{font-style:normal;display:inline-block;background:#8f5fe8;color:#fff;border-radius:8px;padding:1px 6px;margin-right:5px;font-size:.9em}
#sv72 .sv-ttl .s6l i.g{background:#e8507a}
#st6Card{position:fixed;left:50%;top:calc(50% + clamp(46px,13vh,80px));transform:translateX(-50%);z-index:58;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:4px;
  max-width:min(62vw,460px);box-sizing:border-box;padding:8px 16px 9px;border-radius:16px;background:#fff8eef2;border:3px solid var(--choco);box-shadow:0 4px 0 var(--choco);transition:opacity .4s}
#st6Card[hidden]{display:none}#st6Card.out{opacity:0}
#st6Card .c1{font:12px/1.2 var(--f-display);color:#8a5a40;white-space:nowrap;overflow:hidden;max-width:100%}
#st6Card .c2,#st6Card .c3{font:17px/1.25 var(--f-display);color:var(--choco);white-space:nowrap;overflow:hidden;max-width:100%}
#st6Card .c3{font-size:14px}
#st6Card i{font-style:normal;display:inline-block;background:#e8507a;color:#fff;border-radius:9px;padding:2px 8px;margin-right:6px;font-size:.78em;vertical-align:1px}
#st6Card .c3 i{background:#8f5fe8}
@media (max-height:360px){#st6Card{padding:5px 12px 6px;gap:2px}#st6Card .c2{font-size:15px}#st6Card .c3{font-size:12px}}
@media (max-height:360px){#sv72 .sv-pop{top:46px!important;padding:5px 9px!important}#sv72 .sv-pop b{font-size:13px!important;margin-bottom:2px!important}#sv72 .sv-pop ul{gap:1px!important}#sv72 .sv-pop li{font-size:12px!important;line-height:1.15!important}#sv72 .sv-pop li i{width:15px!important;height:15px!important}#sv72 .sv-rpop p{font-size:12px}}
#mgRes .mg-st6{display:flex;align-items:center;gap:8px;font-size:14px;white-space:nowrap}
#mgRes .mg-st6 .s6s{display:flex;gap:1px}#mgRes .mg-st6 .s6s i{width:22px;height:22px;filter:grayscale(1) opacity(.35)}#mgRes .mg-st6 .s6s i.on{filter:none}#mgRes .mg-st6 svg{width:100%;height:100%}
#mgRes .mg-st6 .s6t svg{width:16px;height:16px;vertical-align:-3px}
#mgRes #mgResNext[hidden]{display:none}
body.st-talk #mgRes,body.st-talk #mgHud{visibility:hidden!important}`;document.head.appendChild(st)}
