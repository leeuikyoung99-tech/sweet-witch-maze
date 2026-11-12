/* ================= 32차 (다): 새 스토리 대사 (단계마다 짧게) · 따로 뜨는 이야기 장면 ================= */
// 말하는 사람: t 쿠키(내 닉네임) · w 그 장 마녀 · p 앞 장 마녀(동료) · r 바삭 · b 비터
const ST3={
 1:{1:[['t','하늘에서 반짝이는 게 떨어졌어! 별 조각인가?'],['w','이건 내 거야! 쓴맛 님이 꼭 지키라고 했거든'],['t','쓴맛 님? 일단 이 미로부터 빠져나가자!']],
    2:[['w','막대사탕 미로는 이제 시작일 뿐이야~'],['t','롤리 눈빛이 이상해… 누가 조종하는 것 같아']],
    3:[['w','슬라임들아, 저 쿠키를 붙잡아!'],['t','출구가 잠겼어! 끝까지 버텨야 해!']],
    4:[['r','어이, 별 조각은 내가 먼저 찜했어'],['t','넌 누구야?'],['r','크래커 도둑 바삭. 곧 또 보자고!']],
    5:[['r','누가 먼저 저쪽 끝에 닿나 내기하자!'],['t','좋아, 절대 안 져!']],
    6:[['w','바삭이랑 노느라 나를 잊었니?'],['t','롤리를 만나서 꼭 물어볼 게 있어']],
    7:[['t','깨진 별 부스러기가 사탕이 돼서 흩어졌어'],['t','다 모으면 롤리가 숨은 곳이 보일 거야']],
    8:[['b','후후… 롤리, 그 쿠키를 절대 보내지 마라'],['t','방금 그 쓴 목소리는 누구지…?']],
    9:[['w','쓴맛 님이 화나셨어! 이번엔 진짜야!'],['t','거의 다 왔어. 조금만 더!']],
    10:[['w','거대 막대사탕을 받아라!'],['t','막대가 지나간 뒤를 따라가면 돼!']]},
 2:{1:[['w','꽁꽁 얼려 주지! 이 별 조각은 비터 님 거야'],['t','롤리처럼 너도 저주에 걸린 거구나']],
    2:[['w','얼음 미로에선 발이 미끄러울걸?'],['t','천천히, 하지만 멈추지 말고!']],
    3:[['t','얼음벽이 길을 막았어'],['t','벽을 밀어서 길을 열어 보자']],
    4:[['r','또 만났네! 이번 조각도 내가 가져간다'],['t','바삭, 넌 왜 별 조각을 모으는 거야?'],['r','…그건 비밀이야']],
    5:[['r','눈썰매 경주다! 먼저 가는 쪽이 조각 주인!'],['t','좋아, 받아 주지!']],
    6:[['p','쿠키야, 비터의 그림자 쿠키들이 몰려와!'],['p','내 마녀 카드를 빌려줄게. 미로로 막아 줘!'],['t','롤리, 맡겨 줘!']],
    7:[['w','눈사람 슬라임들아, 길을 막아라!'],['t','버티면 서리가 지칠 거야']],
    8:[['b','서리, 실망시키지 마라'],['t','또 그 목소리…! 비터, 넌 어디 있는 거야?']],
    9:[['w','추워… 그런데 왜 이렇게 슬프지…'],['t','조금만 기다려, 서리!']],
    10:[['w','눈보라야, 모든 걸 덮어 버려!'],['t','경고선이 깔리면 그 줄을 벗어나자!']]},
 3:{1:[['t','호박 숲은 어둡고 으스스해…'],['w','히히, 길 잃은 쿠키 한 명 추가요~']],
    2:[['w','내 호박 등불 없이는 한 발짝도 못 갈걸'],['t','미니맵을 잘 보면 돼!']],
    3:[['t','별 부스러기가 호박밭에 흩어졌어'],['t','유령들보다 먼저 모으자!']],
    4:[['r','쿠키, 이번 조각은 이미 내 손에 있어'],['t','바삭! 비터랑 무슨 사이야?'],['r','…따라올 수 있으면 따라와 봐']],
    5:[['r','잡을 수 있으면 잡아 봐!'],['t','조각 돌려줘!']],
    6:[['p','그림자 쿠키들이 호박 숲까지 왔어!'],['t','서리, 같이 막자!']],
    7:[['t','호박 덩굴 벽이 꽉 막혔어'],['t','몇 개만 밀면 길이 열릴 거야']],
    8:[['r','비터가 조각을 다 모으면 과자 왕국이 쓴맛이 된대'],['t','그걸 알면서 왜 돕는 거야?'],['r','…']],
    9:[['w','펌킨 님의 진짜 무서운 맛을 보여 주지!'],['t','거의 다 왔어!']],
    10:[['w','거대 호박아, 굴러라!'],['t','굴러오는 줄을 보고 옆 길로 비키자!']]},
 4:{1:[['w','메리 크리스마스! 선물은 쓴맛이야~'],['t','진저까지 저주에 걸렸구나']],
    2:[['t','바닥에 회색 가루가 떨어져 있어'],['t','이게 쓴 가루… 비터의 마법인가 봐']],
    3:[['w','진저브레드 병정들, 앞으로!'],['t','출구가 잠겼어. 버티자!']],
    4:[['b','쿠키, 내 쓴 가루 맛이 어떠냐'],['t','비터! 드디어 나타났구나'],['b','후후, 아직은 그림자일 뿐이다']],
    5:[['r','눈 쌓인 길 경주다. 이번엔 진심이야'],['t','나도 진심이야!']],
    6:[['p','호박 마녀 펌킨이 도와줄게!'],['t','그림자 쿠키들을 막아 줘!']],
    7:[['t','선물 상자에서 별 부스러기가 쏟아졌어'],['t','얼른 다 모으자!']],
    8:[['r','쿠키… 사실 비터가 내 동생을 데려갔어'],['t','뭐라고?'],['r','조각을 모아 오면 돌려준다고 했어']],
    9:[['w','진저 쿠키 군단이 막는다!'],['t','바삭 동생도 꼭 구해야 해']],
    10:[['w','거인 발로 쿵! 쿵!'],['t','그림자가 생기면 바로 피하자!']]},
 5:{1:[['w','초콜릿은 원래 쓴맛이 진짜지!'],['t','카카오, 정신 차려!']],
    2:[['t','공장 안에 쓴 가루 냄새가 가득해'],['w','톱니바퀴 미로에 끼어 버려라!']],
    3:[['t','초코 벽이 굳어서 길을 막았어'],['t','벽을 밀어서 열자']],
    4:[['r','쿠키, 비터가 날 속였어'],['t','무슨 말이야?'],['r','동생은 처음부터 거기 없었어. 날 이용한 거야']],
    5:[['r','한 번만 겨루자. 내가 이기면 혼자 갈 거야'],['t','지면 같이 가는 거다!']],
    6:[['p','진저 마녀가 왔다! 그림자 쿠키는 내가 막을게'],['t','고마워, 진저!']],
    7:[['w','초코 슬라임들아, 쿠키를 녹여라!'],['t','버티자!']],
    8:[['b','바삭, 배신하면 어떻게 되는지 알지?'],['r','…이제 너 따위 무섭지 않아'],['t','바삭, 멋있다!']],
    9:[['w','공장이 녹아내린다! 서둘러야 할걸?'],['t','달려!']],
    10:[['w','초코 홍수다! 전부 덮어 주지!'],['t','초코는 느려. 출구 쪽으로 계속 달리자!']]},
 6:{1:[['w','몽글몽글~ 구름 위에서 길을 잃어 봐'],['r','쿠키, 이번엔 같이 가자'],['t','좋아, 바삭!']],
    2:[['t','구름이 계속 움직여서 길이 헷갈려'],['r','미니맵을 같이 보자']],
    3:[['r','별 부스러기가 구름 사이에 박혀 있어'],['t','누가 더 많이 모으나 해 볼까?']],
    4:[['w','둘이 붙어 다니니 보기 싫어!'],['t','몽글도 원래는 착한 마녀였을 거야']],
    5:[['r','연습 경주! 실력 녹슬면 안 되지'],['t','봐주지 않을 거야!']],
    6:[['p','카카오가 초코 벽으로 막아 줄게!'],['t','그림자 쿠키들, 오지 마!']],
    7:[['t','솜사탕 벽이 엉켜 버렸어'],['r','몇 개만 밀면 풀릴 거야']],
    8:[['b','바삭, 결국 배신했구나. 둘 다 쓴맛을 보여 주마'],['r','흥, 해 봐!']],
    9:[['w','구름 폭풍이 다가온다!'],['t','조금만 더!']],
    10:[['w','거대 회오리야, 다 빨아들여라!'],['t','회오리 바깥으로 대시!']]},
 7:{1:[['w','말랑말랑 젤리 바다에 온 걸 환영해~'],['t','말랑, 너도 쓴 가루에 걸렸구나']],
    2:[['r','물속이라 몸이 무거워'],['t','거품 따라 가자!']],
    3:[['w','해파리 슬라임들아, 둘러싸라!'],['t','버티자, 바삭!']],
    4:[['b','여기까지 오다니. 직접 상대해 주지'],['t','비터!'],['b','이 바다가 너희 무덤이다']],
    5:[['r','비터 함정을 피해서 먼저 도착하는 거야!'],['t','경주는 언제나 환영이지!']],
    6:[['p','몽글이 구름으로 그림자 쿠키를 막을게!'],['t','부탁해!']],
    7:[['t','거의 마지막 별 부스러기들이야'],['r','다 모으면 별이 거의 완성돼!']],
    8:[['b','후후… 함정에 걸렸구나'],['t','길이 계속 바뀌어!'],['r','침착해, 미니맵을 봐!']],
    9:[['w','젤리 왕님이 오신다!'],['t','거의 다 왔어!']],
    10:[['w','젤리 왕, 저 쿠키들을 눌러 버려!'],['t','느리니까 계속 움직이면 돼!']]},
 8:{1:[['b','케이크 성에 온 걸 환영한다. 여기가 너희 마지막이다'],['t','모두를 쓴맛으로 바꾸게 두지 않을 거야!']],
    2:[['r','성 안이 쓴 가루로 가득해'],['t','숨 참고 빨리 가자!']],
    3:[['t','성문 벽이 꽉 잠겼어'],['r','밀 수 있는 벽을 찾아!']],
    4:[['b','마녀들이 너희 편이 되다니… 하지만 소용없다'],['t','우린 혼자가 아니야!']],
    5:[['r','성 꼭대기까지 경주! 진짜 마지막 경주다'],['t','좋아, 덤벼!']],
    6:[['p','말랑이 젤리로 그림자 쿠키를 막을게!'],['t','고마워, 말랑!']],
    7:[['b','그림자 쿠키 군단이여, 몰려가라!'],['t','다 같이 버티자!']],
    8:[['r','쿠키, 고마워. 너 아니었으면 난 아직 비터 편이었을 거야'],['t','이제 친구잖아']],
    9:[['b','왜 포기하지 않는 거냐!'],['t','달콤한 건 나누면 더 커지니까!']],
    10:[['b','내 모든 쓴맛을 보여 주마!'],['t','다들 배운 대로 피하자!']]}};
const ST3END={
 1:[['w','어… 내가 뭘 한 거지? 쓴 가루 때문에 머리가 멍했어'],['t','쓴맛 마법사라는 녀석 때문이야'],['w','고마워, 쿠키! 다음 조각은 빙수 마녀 서리가 가지고 있어. 나도 도울게!']],
 2:[['w','고마워… 차가운 꿈에서 깬 것 같아'],['w','바삭이라는 아이가 비터와 몰래 만나는 걸 봤어'],['t','바삭이…? 호박 숲으로 가 보자']],
 3:[['w','머리가 맑아졌어… 고마워'],['r','쿠키… 크리스마스 마을에서 보자'],['t','바삭이 뭔가 숨기고 있어']],
 4:[['w','고마워, 쿠키. 쓴 가루가 다 털렸어'],['w','비터는 초콜릿 공장에 쓴 가루 창고를 두고 있어'],['t','초콜릿 공장으로!']],
 5:[['w','달콤한 초콜릿 맛이 돌아왔어!'],['r','쿠키… 나도 같이 가도 될까?'],['t','물론이지!']],
 6:[['w','구름이 걷혔어… 고마워'],['w','다음 조각은 젤리 바다 깊은 곳에 있어'],['r','바다라니, 신난다!']],
 7:[['w','고마워… 이제 비터는 케이크 성에 혼자 남았어'],['r','마지막이다, 쿠키'],['t','달콤 별을 되찾자!']],
 8:[['b','으윽… 아무도 내 쓴 과자를 좋아해 주지 않아서…'],['t','쓴 초콜릿도 달콤한 케이크랑 같이 먹으면 맛있어'],['r','같이 과자 만들자, 비터'],['t','달콤 별이 다시 빛나요!']]};
// ----- 이야기 장면: 그 장 배경 · 왼쪽 쿠키 · 오른쪽 상대 · 아래 대사 상자 -----
function st3Who(who,c){const nick=(SAVE.me&&SAVE.me.nick)||SAVE.nick||'쿠키 도둑';const hero=$('bHero').querySelector('svg').outerHTML,witch=$('bDevil').querySelector('svg').outerHTML;
  if(who==='t')return{nm:nick,art:hero,side:'L',cls:''};if(who==='r')return{nm:RIVAL,art:hero,side:'R',cls:'rv'};if(who==='b')return{nm:VILLAIN,art:witch,side:'R',cls:'bt'};
  if(who==='p')return{nm:STORY[Math.max(0,c-2)].w,art:witch,side:'R',cls:'p'+Math.max(1,c-1)};return{nm:STORY[c-1].w,art:witch,side:'R',cls:'w'+c}}
const uniqSvg=(s,k)=>s.replace(/id="([^"]+)"/g,`id="$1${k}"`).replace(/url\(#([^)]+)\)/g,`url(#$1${k})`);
storyTalk=function(lines,c,done){const M=$('storyM');let i=0;M.classList.add('st31');M.style.setProperty('--thc',THC[STORY[c-1].th]||'#ff9ec7');
  let L=null,R=null;
  const step=()=>{if(i>=lines.length){M.hidden=true;M.classList.remove('st31');done&&done();return}const[who,txt]=lines[i],W=st3Who(who,c);
    if(W.side==='L')L=W;else R=W;i++;
    M.innerHTML=`<div class="s3-bg"></div><div class="s3-stage">`+
      `<div class="s3-pt L${L?'':' empty'}${W.side==='L'?' on':''}">${L?`<span class="${L.cls}">${uniqSvg(L.art,'sL'+i)}</span>`:''}</div>`+
      `<div class="s3-pt R${R?'':' empty'}${W.side==='R'?' on':''}">${R?`<span class="${R.cls}">${uniqSvg(R.art,'sR'+i)}</span>`:''}</div></div>`+
      `<div class="s3-box ${W.side}"><b>${W.nm}</b><p>${txt}</p></div><button class="sbtn s3-skip">건너뛰기</button>`;
    M.hidden=false;M.querySelector('.s3-skip').onclick=e=>{e.stopPropagation();i=lines.length;step()}};
  M.onclick=()=>{SFX.card();step()};step()};
storyIntro=function(c,s,go){SAVE.st3Seen=SAVE.st3Seen||{};const key=c+'-'+s;if(SAVE.st3Seen[key]){go();return}
  const L=ST3[c]&&ST3[c][s];SAVE.st3Seen[key]=1;saveGame();if(!L){go();return}storyTalk(L,c,go)};
storyOutro=function(c){storyTalk(ST3END[c]||[['t','별 조각을 하나 더 찾았어!']],c,()=>{})};
{const st=document.createElement('style');st.textContent=`
#storyM.st31{position:fixed;inset:0;z-index:60;background:#2b160b;display:block;padding:0;cursor:pointer;overflow:hidden}
#storyM.st31 .s3-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,#fff8 0 15%,#fff0 60%),linear-gradient(var(--thc) 0%,var(--thc) 45%,#6b3a52 100%);}
#storyM.st31 .s3-bg::after{content:"";position:absolute;inset:0;background:radial-gradient(#ffffff40 2px,#fff0 2.6px) 0 0/30px 30px}
#storyM.st31 .s3-stage{position:absolute;left:0;right:0;top:0;bottom:30%;display:flex;justify-content:space-between;align-items:flex-end;padding:0 max(6vw,env(safe-area-inset-left,0px))}
#storyM.st31 .s3-pt{width:min(34vw,46vh);aspect-ratio:1;display:grid;place-items:end center;transition:transform .2s,filter .2s;filter:brightness(.55) saturate(.7);transform:scale(.9)}
#storyM.st31 .s3-pt.on{filter:none;transform:scale(1.04)}
#storyM.st31 .s3-pt.empty{visibility:hidden}
#storyM.st31 .s3-pt span{width:100%;height:100%;display:block;filter:drop-shadow(0 8px 0 #2b160b55)}#storyM.st31 .s3-pt svg{width:100%;height:100%}
#storyM.st31 .s3-pt.R span{transform:scaleX(-1)}
#storyM.st31 .rv svg{filter:hue-rotate(150deg) saturate(1.2)}#storyM.st31 .bt svg{filter:grayscale(.6) brightness(.7) hue-rotate(220deg)}
#storyM.st31 .w2 svg,#storyM.st31 .p2 svg{filter:hue-rotate(170deg)}#storyM.st31 .w3 svg,#storyM.st31 .p3 svg{filter:hue-rotate(60deg) saturate(1.3)}#storyM.st31 .w4 svg,#storyM.st31 .p4 svg{filter:hue-rotate(110deg)}
#storyM.st31 .w5 svg,#storyM.st31 .p5 svg{filter:sepia(.6) hue-rotate(-20deg) saturate(1.4)}#storyM.st31 .w6 svg,#storyM.st31 .p6 svg{filter:hue-rotate(200deg) brightness(1.08)}#storyM.st31 .w7 svg,#storyM.st31 .p7 svg{filter:hue-rotate(250deg)}
#storyM.st31 .s3-box{position:absolute;left:max(16px,env(safe-area-inset-left,0px));right:max(16px,env(safe-area-inset-right,0px));bottom:max(12px,env(safe-area-inset-bottom,0px));min-height:26%;box-sizing:border-box;padding:14px 22px 14px;background:#fff8ee;border:4px solid var(--choco);border-radius:22px;box-shadow:0 6px 0 var(--choco)}
#storyM.st31 .s3-box b{position:absolute;top:-20px;left:22px;font:18px var(--f-display);color:#fff;background:var(--berry);border:3px solid var(--choco);border-radius:12px;padding:2px 14px;white-space:nowrap}
#storyM.st31 .s3-box.R b{left:auto;right:22px;background:#7a45e0}
#storyM.st31 .s3-box p{margin:6px 0 0;font:clamp(17px,5.4vh,22px)/1.45 var(--f-display);color:var(--choco);word-break:keep-all}
#storyM.st31 .s3-skip{position:absolute;right:max(14px,env(safe-area-inset-right,0px));top:max(10px,env(safe-area-inset-top,0px));min-height:40px;padding:4px 14px;font-size:15px}
`;document.head.appendChild(st)}
