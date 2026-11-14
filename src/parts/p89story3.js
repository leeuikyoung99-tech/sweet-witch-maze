/* ================= 89차: 스토리 다시 짜기 — 스토리 = 메인 게임을 한 장에 하나씩 배우는 길 ================= */
// 다른 게임 참고(마리오 4단계 판 짜기 · 식물 대 좀비 · 클래시 오브 클랜 고블린 맵 · 데드 바이 데이라이트 아카이브):
//  - 스토리 판은 모두 메인 게임(도둑 대 마녀) 규칙. 퍼즐·버티기·사탕 모으기·거대 마녀는 스토리에서 뺐어요(미니게임은 따로 있어요).
//  - 한 장 = 그 장 마녀 + 대표 카드 2장(SIG). 6판을 소개 → 발전 → 비틀기 → 입장 바꾸기 → 실력 확인 → 보스 순서로.
//    1 소개: 대표 카드 1장만 쓰는 쉬운 판(장 규칙 없음)  2 발전: 대표 카드 2장 + 앞 장 카드(장 규칙 없음)
//    3 비틀기: 같은 카드 + 이 장 규칙  4 입장 바꾸기: 내가 그 마녀 카드로 그림자 쿠키(AI 도둑) 막기
//    5 실력 확인: 시간 제한 탈출(시간이 다 되면 실패) · AI 한 단계 위  6 보스: 그 마녀의 모든 카드 + 장 규칙 + 마녀 전용 큰 마법(bossTick)
//  - 보스를 처음 이기면 장 끝 대사 → 바로 상자. 8장을 다 깨면 모든 카드와 마녀 쪽 플레이를 한 번씩 해 봐요.
const SIG={1:['skel','tower'],2:['ice','slip'],3:['ghost','bat'],4:['soldier','bear'],5:['magnet','trap'],6:['fog','eye'],7:['spider','rev'],8:['spin','fake']};
const ST7V=['intro','mix','twist','witch','time','boss'];
const ST7SHORT=['롤리','서리','펌킨','진저','카카오','몽글','말랑','비터'];
const cName=k=>(CARDS[k]&&CARDS[k].n)||k;
const josaEul=w=>{const c=w.charCodeAt(w.length-1)-0xAC00;return w+(c>=0&&c<11172&&c%28?'을':'를')};
const st7Prev=c=>{const o=[];for(let i=c-1;i>=1;i--)for(const k of SIG[i])if(!o.includes(k))o.push(k);return o};
const ST7N={
 1:['처음 만난 슬라임','사탕 대포 골목','사탕 비 내리는 마을','그림자 쿠키 막기','종이 울리기 전에','막대사탕 마녀 롤리'],
 2:['얼음 포탑 동굴','미끄러운 얼음길','움직이는 얼음벽','얼음 카드로 막기','얼어붙기 전에','빙수 마녀 서리'],
 3:['솜사탕 유령 숲','박쥐 떼 오솔길','깜깜한 밤','호박 카드로 막기','해 뜨기 전에','호박 마녀 펌킨'],
 4:['쿠키 병정 행진','젤리 곰 마을','두 개의 출구','진저 카드로 막기','종소리 전에','진저 마녀 진저'],
 5:['자석 포탑 공장','젤리 덫 창고','포탑 공장','초코 카드로 막기','초코가 굳기 전에','초코 마녀 카카오'],
 6:['지도 가리는 구름','마녀의 눈','구름 속 길','구름 카드로 막기','구름이 걷히기 전에','솜사탕 마녀 몽글'],
 7:['젤리 거미 동굴','거꾸로 해류','젤리 몬스터 파티','젤리 카드로 막기','물이 차기 전에','젤리 마녀 말랑'],
 8:['회전날 성문','가짜 사탕 복도','쓴맛 섞기','비터 카드로 막기','성문이 닫히기 전에','쓴맛 마법사 비터']};
for(const c in ST7N)ST6[c].N=ST7N[c];
stType=function(c,s){return['esc','esc','esc','witch','esc','boss'][s-1]||'esc'};
Object.assign(STT_N,{boss:'보스'});
{const sd=stDef;stDef=function(c,s){const st=sd(c,s),v=ST7V[s-1],S=SIG[c],P=st7Prev(c),base=st.ai;st.v=v;
  if(v==='intro'){st.deck=[S[0]];st.rule=null;st.aug=[];st.ai=c<=3?0:1;st.walls=Math.max(28,st.walls-6);st.pt=+(st.pt*1.15).toFixed(2);st.g3='candy'}
  if(v==='mix'){st.deck=S.concat(P.slice(0,2));st.rule=null;st.aug=[];st.g3='hp'}
  if(v==='twist'){st.deck=S.concat(P.slice(0,2));st.g3='nohit'}
  if(v==='witch'){st.deck=S.concat(P.slice(0,4))}
  if(v==='time'){st.deck=S.concat(P.slice(0,4));st.ai=Math.min(2,base+1);st.limit=130-c*3;st.fast=Math.round(st.limit*.7);st.g3='nohit'}
  if(v==='boss'){const all=S.concat(STORY[c-1].cards.filter(k=>k!=='move'&&!S.includes(k)));st.deck=all.slice(0,8);st.ai=c<=2?1:2;st.g3='hp'}
  return st}}
st6Goal=function(st){const S=SIG[st.c];switch(st.v){
  case'intro':return`${josaEul(cName(S[0]))} 피해 탈출하기`;case'mix':return`${cName(S[0])}·${josaEul(cName(S[1]))} 피해 탈출하기`;
  case'twist':return'규칙이 바뀐 미로에서 탈출하기';case'witch':return`마녀가 돼서 ${Math.round(ROUND0/60)}분 동안 도둑 막기`;
  case'time':return`${st.limit}초 안에 탈출하기`;case'boss':return`보스 ${josaEul(ST7SHORT[st.c-1])} 피해 탈출하기`}return'출구를 찾아 탈출하기'};
st6Rule=function(st){if(st.v==='intro'||st.v==='mix'||!st.v)return'';const R=ST6[st.c];return st.v==='witch'?R.rw:R.rn};
st6RuleOn=st=>!!st6Rule(st);
{const g=stGoals3;stGoals3=function(st){if(st.v==='time')return[`${st.limit}초 안에 탈출`,G3S.nohit,`${st.fast}초 안에 탈출`];
  if(st.v==='boss')return['보스 판 탈출',G3S.hp,`${st.fast}초 안에 탈출`];return g(st)}}
// 새 카드 줄: 1·2판은 규칙 대신 '새 카드' 를 보여 줘요 (스토리 화면 카드 · 시작 카드)
const st7New=st=>st.v==='intro'?[SIG[st.c][0]]:st.v==='mix'?[SIG[st.c][1]]:[];
function st7NewHtml(st){const L=st7New(st);if(!L.length)return'';return`<i class="n">새 카드</i>`+L.map(k=>`<b class="s7c">${ART[k]||''}</b>${cName(k)}`).join(' ')}
{const rs=renderStages;renderStages=function(){const r=rs.apply(this,arguments);try{const st=stDef(STV.c,STV.s),t=document.querySelector('#sv72 .sv-ttl');
    if(t&&st7New(st).length&&!t.querySelector('.s7n')){t.insertAdjacentHTML('beforeend',`<span class="s6l s7n">${st7NewHtml(st)}</span>`);st6Fit(t.querySelector('.s7n'),9)}}catch(e){}return r}}
{const sc=st6Card;st6Card=function(st){sc.apply(this,arguments);const el=$('st6Card');if(el&&st7New(st).length){el.insertAdjacentHTML('beforeend',`<span class="c3 s7n">${st7NewHtml(st)}</span>`);st6Fit(el.querySelector('.s7n'),10)}}}
// 시간 제한 판: 3·2·1 뒤 남은 시간이 st.limit 부터 줄어요(다 되면 실패)
{const ss=startStory;startStory=function(c,s){const r=ss.apply(this,arguments);try{const st=G.stage;if(st&&st.story&&st.v==='time')ROUND=st.limit}catch(e){}return r}}
// 보스를 처음 이기면: 장 끝 대사가 끝나자마자 상자 열기
{const re=resExtra;resExtra=function(win,why,t){re.apply(this,arguments);const st=G.stage;if(!st||!st.story||st.type!=='boss')return;const x=G.extra&&G.extra.stage;if(!x||!x.gift||x.gift.box==null)return;
  const t0=performance.now();let seen=false;const w=setInterval(()=>{const open=!$('storyM').hidden;if(open)seen=true;if(open)return;if(!seen&&performance.now()-t0<2500)return;clearInterval(w);if(SAVE.boxes&&SAVE.boxes.length)try{pgBoxes()}catch(e){}},250)}}
// ----- 대사: 1·2판은 새 카드 소개, 3판은 장 규칙, 4판은 입장 바꾸기, 5판은 시간 제한, 6판은 보스 -----
{const D={
 1:{1:[['t','하늘에서 반짝이는 별 조각이 떨어졌어!'],['w','이건 쓴맛 님 거야! 내 포도 슬라임이 지킨단다~'],['t','슬라임은 느려. 옆으로 돌아서 출구로 가자!']],
    2:[['w','흥, 이번엔 사탕 대포까지 세웠지!'],['t','대포는 쏘기 전에 바닥에 표시가 떠. 그걸 보고 피하자!']],
    3:[['w','내 마을엔 사탕 비가 내려! 그런데 그게 네 편일까?'],['t','사탕을 먹으면 스킬을 쓸 수 있어. 주우면서 탈출하자!']],
    4:[['r','크래커 도둑 바삭 님이 별 조각을 가져간다! 그림자 쿠키들, 가라!'],['t','롤리가 떨어뜨린 카드가 있어. 이번엔 내가 마녀야!'],['t','슬라임과 대포로 그림자 쿠키가 출구에 못 가게 막자!']],
    5:[['w','종이 울리면 마을 문이 다 잠긴단다!'],['t','시간 안에 빠져나가야 해. 서두르자!']],
    6:[['b','롤리, 내 쓴 가루를 받아라!'],['w','힘이 넘쳐! 거대 막대사탕으로 쓸어 버리겠어!'],['t','지금까지 배운 대로! 막대가 지나간 뒤를 따라 출구로!']]},
 2:{1:[['t','다음 별 조각은 얼음 동굴에 있대'],['w','어서 와~ 내 얼음 포탑에 맞으면 꽁꽁 느려진단다'],['t','포탑이 보는 길은 피해서 가자!']],
    2:[['w','바닥엔 미끄럼 발판도 깔아 뒀지!'],['t','미끄럼 발판을 밟으면 쭉 미끄러져. 밟지 말고 돌아가자!']],
    3:[['w','이제 얼음벽이 30초마다 움직여!'],['t','길이 바뀌면 작은 지도를 다시 보고 가자!']],
    4:[['p','쿠키야, 그림자 쿠키들이 동굴로 몰려와!'],['t','서리의 얼음 카드로 막아 보자. 이번엔 내가 마녀야!']],
    5:[['w','동굴이 다 얼어붙기 전에 나갈 수 있을까~?'],['t','시간 안에! 미끄럼 발판은 피하고 빠르게!']],
    6:[['b','서리, 실망시키지 마라'],['w','추워… 그런데 화가 멈추질 않아! 눈보라야!'],['t','진한 파란 띠가 깔리면 띠 밖으로! 서리를 구하자!']]},
 3:{1:[['t','서리가 그러는데 다음 조각은 호박 숲이래'],['w','히히, 솜사탕 유령에 닿으면 몸이 느려진단다'],['t','유령은 천천히 따라와. 거리를 두고 출구로!']],
    2:[['w','사탕 박쥐들아, 날아라!'],['t','박쥐는 빨라. 막다른 길로 몰리지 않게 조심하자!']],
    3:[['w','이제 숲이 깜깜해졌지? 코앞만 보일걸~'],['t','작은 지도와 반짝이는 사탕을 보고 출구를 찾자!']],
    4:[['p','그림자 쿠키들이 숲까지 왔어! 내 호박 카드를 써!'],['t','유령과 박쥐로 그림자 쿠키를 막자!']],
    5:[['w','해가 뜨기 전에 못 나가면 영영 숲에 갇혀!'],['t','시간 안에 빠져나가자!']],
    6:[['w','펌킨 님의 진짜 무서운 맛! 거대 호박아, 굴러라!'],['t','주황 줄이 깔리면 옆 길로 비켜! 어두워도 할 수 있어!']]},
 4:{1:[['t','펌킨이 알려 줬어. 다음 조각은 크리스마스 마을이야'],['w','메리 크리스마스~ 쿠키 병정들이 길을 지킨단다'],['t','병정이 지키는 길은 피해서 돌아가자!']],
    2:[['w','젤리 곰도 데려왔지! 부딪히면 멀리 튕겨 나갈걸?'],['t','곰은 느리지만 세. 멀리서 돌아가자!']],
    3:[['w','이번엔 출구가 두 개! 하나는 가짜란다~'],['t','가짜에 닿으면 처음 자리로 돌아가. 진짜 출구를 찾자!']],
    4:[['r','쿠키… 사실 비터가 내 동생을 데려갔어'],['t','그래서 그림자 쿠키를… 일단 진저 카드로 막아 보자!']],
    5:[['w','종소리가 울리면 마을 문이 닫혀!'],['t','시간 안에! 병정과 곰은 멀리 피해서!']],
    6:[['b','쿠키, 쓴 가루 맛이 어떠냐'],['w','쓴맛 님을 위해! 거인 발로 쿵! 쿵!'],['t','바닥에 그림자가 생기면 바로 피하자!']]},
 5:{1:[['t','진저가 다음 조각은 초콜릿 공장에 있대'],['w','초콜릿은 쓴맛이 진짜지! 자석 포탑이 끌어당길 거야'],['t','자석에 끌리면 반대쪽으로 힘껏 달리자!']],
    2:[['w','창고 바닥엔 젤리 덫이 숨어 있단다'],['t','덫에 걸리면 잠깐 못 움직여. 바닥을 잘 보자!']],
    3:[['w','이제 공장엔 포탑이 가득해! 출구 앞엔 대포 두 개!'],['t','포탑 표시를 보고 틈을 노려서 출구로!']],
    4:[['r','쿠키, 비터가 날 속였어. 동생은 처음부터 거기 없었어'],['t','그럼 이제 같이 하자! 초코 카드로 그림자 쿠키부터 막자!']],
    5:[['w','초코가 굳기 전에 나가 보시지!'],['t','시간 안에! 자석과 덫을 피해서!']],
    6:[['b','바삭, 배신하면 어떻게 되는지 알지?'],['r','이제 너 따위 무섭지 않아!'],['w','초코 홍수다! 전부 덮어 버려!'],['t','초코에 빠지면 느려져. 멈추지 말고 출구로!']]},
 6:{1:[['r','다음 조각은 솜사탕 구름 위래. 이번엔 같이 가자!'],['w','몽글몽글~ 내 구름이 지도를 가려 줄게'],['t','지도가 가려지면 길을 기억해서 가자!']],
    2:[['w','마녀의 눈이 다 보고 있단다~'],['t','눈에 들키면 마녀가 내 자리를 알아. 숨어서 가자!']],
    3:[['w','처음 30초는 지도가 아예 안 보여!'],['t','처음엔 눈으로 보고, 구름이 걷히면 지도로!']],
    4:[['p','그림자 쿠키들이 구름까지 올라왔어!'],['t','구름 카드로 그림자 쿠키가 길을 잃게 하자!']],
    5:[['w','구름이 걷히기 전에 나갈 수 있을까?'],['t','시간 안에! 지도가 없어도 침착하게!']],
    6:[['b','바삭, 결국 배신했구나. 둘 다 쓴맛을 보여 주마'],['w','거대 회오리야, 다 빨아들여라!'],['t','회오리에 끌려가지 않게 바깥으로 돌아 출구로!']]},
 7:{1:[['t','이제 조각이 두 개 남았어. 젤리 바다로 가자!'],['w','말랑말랑~ 젤리 거미가 거미줄을 칠 거야'],['t','거미줄에 걸리면 느려져. 대시로 빠져나가자!']],
    2:[['w','거꾸로 발판도 깔아 뒀지~'],['t','밟으면 방향이 반대가 돼. 밟으면 침착하게 반대로!']],
    3:[['w','오늘은 젤리 몬스터 파티야!'],['t','몬스터가 많아. 피해 다니며 출구로!']],
    4:[['p','그림자 쿠키 군단이 바다로 와!'],['t','젤리 카드로 마지막 그림자 쿠키 군단을 막자!']],
    5:[['b','여기까지 오다니. 물이 차기 전에 나가 봐라'],['r','시간 안에 나가면 돼, 쿠키!']],
    6:[['w','젤리 왕님이 오신다! 다 밟아 버려!'],['t','젤리 왕은 느려. 계속 움직이며 출구로!']]},
 8:{1:[['b','케이크 성에 온 걸 환영한다. 회전날이 성문을 지킨다'],['t','회전날 근처는 크게 돌아서 가자!']],
    2:[['b','복도엔 가짜 사탕을 뿌려 뒀지'],['t','진짜 같은 사탕도 조심! 먹기 전에 한 번 더 보자']],
    3:[['b','벽은 움직이고 출구는 하나가 가짜다!'],['r','지금까지 배운 걸 다 쓰면 돼!']],
    4:[['p','비터가 그림자 쿠키를 전부 풀었어!'],['t','모든 카드를 써서 한 명도 못 나가게 막자!']],
    5:[['b','성문이 닫히기 전에 나갈 수 있을까?'],['t','시간 안에! 마지막 조각까지 얼마 안 남았어!']],
    6:[['b','왜 포기하지 않는 거냐!'],['t','달콤한 건 나누면 더 커지니까!'],['b','그럼 내 모든 마법을 보아라!']]}};
  for(const c in D)ST3[c]=D[c]}
// 대사를 처음부터 다시 보여 주려고 한 번만 봤던 기록을 비워요 (89차 처음 켤 때 한 번)
if(SAVE.st7!==1){SAVE.st7=1;SAVE.st3Seen={};try{saveGame()}catch(e){}}
{const st=document.createElement('style');st.textContent=`
#sv72 .sv-ttl .s6l i.n,#st6Card i.n{background:#2fae84}
#sv72 .sv-ttl .s7c,#st6Card .s7c{display:inline-block;width:1.25em;height:1.25em;vertical-align:-.3em;margin-right:3px}
#sv72 .sv-ttl .s7c svg,#st6Card .s7c svg{width:100%;height:100%}`;document.head.appendChild(st)}
