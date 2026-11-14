/* ================= 28차 (라): 4판 점수제 · 증강체 72개 ================= */
// [id, 등급(s/g/p), 이름, 설명, 필요(스킬·카드), 아이콘]
const AUGT=[
 ['pouch','s','사탕 주머니','사탕이 가득 차도 2개까지 주머니에 담아 두었다가, 쓰고 나면 바로 먹어요','','👝'],
 ['cmag','s','사탕 자석','2칸 안의 진짜 사탕이 나에게 끌려와요 (가짜는 안 움직여요)','','🧲'],
 ['free','s','첫 스킬 공짜','판마다 처음 쓰는 스킬은 사탕을 안 써요','','🎁'],
 ['warn','s','몬스터 경고등','몬스터가 3칸 안에 오면 화면 가장자리에 방향 화살표','','🚨'],
 ['deadx','s','출구 지도','판을 시작할 때 출구 근처 지도가 미리 보여요','','🗺️'],
 ['crumb','s','부스러기 길','지나온 길에 쿠키 부스러기가 남아 지도에 표시돼요','','🍪'],
 ['quiet','s','조용한 발','멈춰 있는 동안 종 줄·마녀의 눈에 안 걸려요','','🦶'],
 ['shake','s','툭툭 털기','멈춤·느려짐이 풀린 뒤 1초 동안 아무것도 안 걸려요','','✨'],
 ['backdash','s','되돌이 대시','대시 후 1초 안에 대시를 다시 누르면 출발 자리로 돌아가요','','↩️'],
 ['nose','s','출구 냄새','화면 위에 출구까지 남은 칸 수가 늘 보여요','','👃'],
 ['shoes','s','단단한 신발','미끄럼·거꾸로 발판이 처음 한 번은 안 걸려요','','👟'],
 ['share','s','사탕 나눔','사탕을 먹으면 가장 가까운 몬스터가 1초 동안 멍해요','','🍬'],
 ['sugar','g','설탕 길','질주로 지나간 길에 설탕이 깔려 몬스터가 미끄러져요','sprint',''],
 ['popdec','g','펑 분신','분신이 공격받으면 터져서 주변 몬스터가 1초 멈춰요','decoy',''],
 ['shadow','g','그림자 망토','망토 동안 몬스터 공격이 나를 못 맞혀요','cloak',''],
 ['smokemv','g','연막 이동','연막이 3초 동안 나를 따라다니며 공격을 막아요','smoke',''],
 ['gumwall','g','껌 장벽','껌을 뿌린 자리를 2초 동안 몬스터가 못 지나가요','gum',''],
 ['compass2','g','나침반 별길','나침반 별길이 한 번 더 나오고, 가장 가까운 사탕도 반짝여요','compass',''],
 ['lurewalk','g','미끼 춤','젤리 미끼가 가만히 있지 않고 나와 반대쪽으로 걸어가요','lure',''],
 ['flagswap','g','깃발 왕복','깃발로 순간이동하면 깃발이 떠난 자리로 옮겨 꽂혀요','tele',''],
 ['scopemap','g','망원경 지도','망원경으로 본 곳이 지도에 계속 남아요','scope',''],
 ['icepath','g','얼음 길','소다를 얼리면 몬스터도 2초 동안 미끄러져 느려져요','freeze',''],
 ['brickstep','g','벽돌 계단','사탕 벽돌을 세우면 벽 너머 주변이 1.5초 보여요','brick',''],
 ['echotrap','g','메아리 함정','쿠키 메아리가 덫·발판 위치까지 5초 동안 알려줘요','echo',''],
 ['jellydash','g','젤리 대시','대시한 자리에 껌이 남아 3초 동안 몬스터가 느려져요','','💨'],
 ['candydash','g','사탕 대시','대시하면 사탕 1개를 얻지만 대시 대기시간이 1초 늘어요','','🍭'],
 ['smokedash','g','연기 대시','대시하면 작은 연막이 터져 근처 몬스터가 1초 멍해요','','☁️'],
 ['xbomb','g','X 폭탄','X를 친 칸에 몬스터가 들어오면 펑! 사라져요','','💥'],
 ['exit2','p','비밀 출구','미로 어딘가에 출구가 하나 더 생겨요. 마녀는 위치를 몰라요','','🚪'],
 ['friend','p','몬스터 친구','마녀가 처음 부른 몬스터가 내 편이 되어 다른 몬스터를 막아요','','🤝'],
 ['eatwall','p','벽 냠냠','판마다 앞에 있는 벽 3개를 먹어서 없앨 수 있어요','','😋'],
 ['sky','p','하늘 보기','판마다 한 번, 3초 동안 미로 전체를 위에서 봐요','','☁️'],
 ['clock','p','사탕 시계','진짜 사탕을 먹을 때마다 남은 시간 +3초','','⏰'],
 ['burnflip','p','버닝 반전','버닝 시간에 마녀 소다가 안 차고, 내 스킬 대기시간이 절반','','🔥'],
 ['fifth','p','세 번째 스킬','내 덱에 없는 스킬 1개를 무작위로 더 받아요','','🎲'],
 ['steal','p','카드 훔치기','진짜 사탕 5개를 먹으면 마녀 손패 1장이 그 판 동안 막혀요','','🃏'],
 ['mirror','p','거울 사탕','처음 맞는 공격을 반사해서 그 몬스터·포탑이 사라져요','','🪞'],
 ['key','p','출구 열쇠','출구 주변 2칸의 벽이 모두 사라진 채로 시작해요','','🔑'],
 ['mthief','p','마나 도둑','진짜 사탕을 먹으면 마녀 소다가 1 줄어요','','🥤'],
 ['twin','p','쌍둥이 도둑','반대쪽에서 나와 똑같이 움직이는 가짜 도둑이 나와 마녀를 헷갈리게 해요','','👯']];
const AUGW=[
 ['redraw','s','새 패 뽑기','판마다 한 번, 손패를 전부 버리고 새로 뽑을 수 있어요','','🔄'],
 ['bank','s','마나 저금','소다가 꽉 차면 넘치는 소다가 저금돼서 다음 카드에 쓰여요 (최대 2)','','🐷'],
 ['gift','s','시작 선물','덱 맨 앞 카드가 처음 손패에 꼭 들어와요','','🎁'],
 ['crystal','s','수정구슬','도둑이 스킬을 쓰면 무슨 스킬인지 알려 주고 그 자리가 반짝여요','','🔮'],
 ['scent','s','발자국 냄새','도둑이 지나간 길이 3초 동안 내 화면에 남아요','','🐾'],
 ['candypick','s','사탕 숨기기','진짜 사탕 2개가 막다른 길 깊숙이 놓여 도둑을 꾀어요','','🍭'],
 ['qsummon','s','조용한 소환','몬스터를 불러도 도둑 화면에 마법진이 안 보여요','','🤫'],
 ['rewind','s','카드 되감기','공격이 빗나간 몬스터 카드는 다음 카드로 바로 돌아와요','','⏪'],
 ['regret','s','사탕 후회','도둑이 가짜 사탕을 먹으면 소다 +1','','😝'],
 ['wall2','s','벽 두 번','한 번 옮긴 벽을 한 번 더 옮길 수 있어요 (판마다 1개)','','🧱'],
 ['lazy','s','느긋한 도둑','도둑이 3초 넘게 멈추면 그 자리가 보여요','','😴'],
 ['peek','s','마녀의 예고','다음에 나올 카드 2장이 보여요','','📜'],
 ['twinslime','g','쌍둥이 슬라임','슬라임이 떨어진 자리에서 작은 슬라임 둘로 나뉘어 한 번 더 뛰어요','skel',''],
 ['hideghost','g','숨바꼭질 유령','유령이 "부우!" 직전까지 도둑 눈에 안 보여요','ghost',''],
 ['batswarm','g','박쥐 무리','박쥐가 세 마리로 나와 한 줄로 돌진해요 (몬스터 수는 1로 쳐요)','bat',''],
 ['roar','g','고함 곰','곰이 팔을 들면 동그란 파동이 퍼져요 (벽 뒤로 숨으면 피해요)','bear',''],
 ['horn','g','병정 나팔','쿠키 병정이 도둑을 보면 나팔을 불어 몬스터들을 빠르게 불러요','soldier',''],
 ['webtrail','g','거미줄 길','젤리 거미가 지나간 벽 옆에 거미줄이 남아 지나가면 느려져요','spider',''],
 ['rotcannon','g','돌고 도는 대포','사탕 대포가 천천히 돌며 계속 쏴요','tower',''],
 ['rink','g','얼음 장판','얼음 포탑 주변 바닥이 미끄러워 느려져요','ice',''],
 ['push','g','밀어내는 자석','자석이 당기는 대신 밀어내서 도둑을 다른 길로 내몰아요','magnet',''],
 ['dualspin','g','두 갈래 회전날','회전날이 십자 모양으로 두 개가 돼요','spin',''],
 ['ribbon','g','미끄럼 리본','미끄럼 발판이 막히면 모퉁이를 돌아 더 미끄러져요','slip',''],
 ['bellcall','g','종소리 덫','종이 울리면 가장 가까운 몬스터가 아주 빠르게 달려가요','bell',''],
 ['fastsigil','g','빠른 마법진','몬스터·포탑 마법진이 절반 시간에 열려요','','⚡'],
 ['monecho','g','몬스터의 메아리','몬스터가 사라질 때 2초 동안 도둑 위치가 보여요','','📣'],
 ['bigtele','g','큰 공격','몬스터 공격 범위가 커지는 대신 예고가 0.3초 길어요','','🎯'],
 ['fogmon','g','안개 몬스터','몬스터 가까이에선 도둑의 작은 지도가 흐려져요','','🌫️'],
 ['moving','p','움직이는 미로','30초마다 쿠키 벽 3개가 저절로 자리를 바꿔요','','🌀'],
 ['trip','p','마녀 여행','손패가 6장이 되는 대신 소다 최대가 5','','🧳'],
 ['fakeexit','p','가짜 출구','진짜와 똑같은 가짜 출구가 생겨요. 닿으면 출발점으로 돌아가요','','🚪'],
 ['party','p','몬스터 파티','몬스터를 4마리까지, 대신 포탑은 3개까지','','🎉'],
 ['castle','p','포탑 성','포탑을 7개까지, 대신 몬스터는 1마리까지','','🏰'],
 ['night','p','밤의 미로','도둑 화면이 어두워져 가까운 곳만 보여요 (사탕은 빛나요)','','🌙'],
 ['reuse','p','여러 번 쓰는 카드','처음 쓴 카드가 손패로 바로 돌아와 한 번 더 쓸 수 있어요','','♻️'],
 ['tax','p','사탕 도둑맞이','도둑이 진짜 사탕 3개를 먹을 때마다 소다 +2','','💰'],
 ['burnearly','p','버닝 당기기','버닝이 30초 일찍 시작하지만, 버닝 때는 내 소다도 안 차요','','⏳'],
 ['thick','p','두꺼운 벽','도둑이 벽 냠냠·순간이동·벽돌을 못 써요','','🛡️'],
 ['morph','p','마녀 출동','판마다 한 번, 마녀가 직접 5초 동안 도둑을 쫓아가 덮쳐요','','🧙'],
 ['nomap','p','지도 뺏기','도둑의 작은 지도가 처음 30초 동안 안 보여요','','🗺️']];
const AUGI={};for(const a of AUGT)AUGI[a[0]]={id:a[0],side:'t',tier:a[1],n:a[2],d:a[3],need:a[4],ic:a[5]};for(const a of AUGW)AUGI[a[0]]={id:a[0],side:'w',tier:a[1],n:a[2],d:a[3],need:a[4],ic:a[5]};
const AUGSD={jellydash:'대시 자리에 껌',candydash:'대시하면 사탕 +1',smokedash:'대시하면 연막 펑',xbomb:'X 칸의 몬스터 펑!',fastsigil:'마법진 2배 빨리',monecho:'몬스터가 위치를 알려줘요',bigtele:'공격 범위가 커져요',fogmon:'몬스터 곁에선 지도가 흐려요',pouch:'가득 차도 사탕 2개 보관',cmag:'가까운 사탕이 끌려와요',free:'처음 쓰는 스킬은 공짜',warn:'몬스터 방향을 알려줘요',deadx:'출구 근처 지도 공개',crumb:'지나온 길이 지도에 남아요',quiet:'멈추면 감시에 안 걸려요',shake:'풀려나면 1초 무적',backdash:'대시 두 번 → 제자리로',nose:'출구까지 칸 수 표시',shoes:'발판 한 번 버티기',share:'사탕 먹으면 몬스터 멍',
 sugar:'질주 길이 미끌미끌',popdec:'분신이 펑! 몬스터 멈춤',shadow:'망토 중엔 공격 무시',smokemv:'연막이 3초 따라와요',gumwall:'껌이 2초 벽이 돼요',compass2:'별길 한 번 더 + 사탕',lurewalk:'미끼가 걸어 다녀요',flagswap:'깃발과 자리 바꾸기',scopemap:'본 지도가 계속 남아요',icepath:'몬스터도 2초 느려져요',brickstep:'벽 너머가 잠깐 보여요',echotrap:'덫 위치도 알려줘요',
 exit2:'출구가 하나 더!',friend:'첫 몬스터가 내 편',eatwall:'벽 3개를 냠냠',sky:'미로 전체 3초 보기',clock:'사탕마다 +3초',burnflip:'버닝 때 내가 유리',fifth:'스킬 하나 더',steal:'사탕 5개면 카드 봉인',mirror:'첫 공격 반사',key:'출구 앞 벽이 사라져요',mthief:'사탕마다 소다 -1',twin:'가짜 도둑 등장',
 redraw:'손패 새로 뽑기 1번',bank:'넘친 소다 저금',gift:'덱 첫 카드로 시작',crystal:'도둑 스킬이 보여요',scent:'발자국이 3초 남아요',candypick:'사탕으로 막다른 길 유인',qsummon:'마법진이 안 보여요',rewind:'빗나간 몬스터 재사용',regret:'가짜 사탕이면 소다 +1',wall2:'벽 한 번 더 옮기기',lazy:'멈춘 도둑이 보여요',peek:'다음 카드 2장 보기',
 twinslime:'슬라임이 둘로 나뉨',hideghost:'투명한 유령',batswarm:'박쥐 세 마리 돌진',roar:'곰의 고함 파동',horn:'나팔로 몬스터 호출',webtrail:'거미줄 길이 남아요',rotcannon:'대포가 돌며 쏴요',rink:'얼음 바닥 장판',push:'자석이 밀어내요',dualspin:'십자 회전날',ribbon:'미끄럼이 꺾여요',bellcall:'종 울리면 몬스터 돌진',
 moving:'30초마다 벽이 움직여요',trip:'손패 6장 · 소다 최대 5',fakeexit:'가짜 출구 설치',party:'몬스터 4마리까지',castle:'포탑 7개까지',night:'도둑 화면이 깜깜',reuse:'첫 카드 한 번 더',tax:'사탕 3개마다 소다 +2',burnearly:'버닝 30초 먼저',thick:'도둑 벽 기술 봉인',morph:'마녀가 직접 출동',nomap:'30초 동안 지도 뺏기'};
for(const k in AUGSD)if(AUGI[k])AUGI[k].sd=AUGSD[k];
const TIERN={s:'실버',g:'골드',p:'프리즘'};
// 4판 등급 순서: 판마다 무작위, 두 번 나온 등급은 다시 안 나와요
function tierSeq(rnd){rnd=rnd||Math.random;const W={s:.5,g:.35,p:.15};for(let tries=0;tries<200;tries++){const out=[],cnt={s:0,g:0,p:0};let ok=true;for(let i=0;i<4;i++){const opts=['s','g','p'].filter(t=>cnt[t]<2);if(!opts.length){ok=false;break}const tot=opts.reduce((a,t)=>a+W[t],0);let r=rnd()*tot,pick=opts[opts.length-1];for(const t of opts){r-=W[t];if(r<=0){pick=t;break}}out.push(pick);cnt[pick]++}if(ok)return out}return['s','g','s','p']}
function seededRnd(seed){let x=(seed>>>0)||7;return()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296}}
function rollTier(){const r=Math.random();return r<.5?'s':r<.85?'g':'p'}
function augPool(side,tier,have,skills,deck){const L=side==='t'?AUGT:AUGW;return L.filter(a=>a[1]===tier&&!have.includes(a[0])&&(!a[4]||(side==='t'?skills.includes(a[4]):deck.includes(a[4])))).map(a=>a[0])}
function augChoices(side,tier,have,skills,deck){let p=shuffle(augPool(side,tier,have,skills,deck));if(!p.length){for(const t of['s','p','g'])if(t!==tier&&!p.length)p=shuffle(augPool(side,t,have,skills,deck))}return p.slice(0,3)}
function augCard(id){const a=AUGI[id];return`<button class="ag-card t-${a.tier}" data-id="${id}" title="${a.d}"><span class="ag-tr">${TIERN[a.tier]}</span><span class="ag-fr f-${a.tier}"><span class="ag-art">${augArt(a)}</span></span><b class="ag-n"><span>${a.n}</span></b><span class="ag-d">${a.sd||a.d}</span></button>`}
function fitNames(root){for(const n of root.querySelectorAll('.ag-n span')){let f=parseFloat(getComputedStyle(n).fontSize);n.style.fontSize='';f=parseFloat(getComputedStyle(n).fontSize);const W=n.parentElement.clientWidth-4;while(n.scrollWidth>W&&f>9){f-=.5;n.style.fontSize=f+'px'}}}
function augArt(a){if(a.need){if(a.side==='t'&&SKB[a.need]&&$(SKB[a.need]))return `<span class="ag-sk">${$(SKB[a.need]).querySelector('svg').outerHTML}</span>`;if(ART[a.need])return ART[a.need]}return `<span class="ag-em">${a.ic||'✨'}</span>`}

/* ----- 증강체 고르기 화면 ----- */
const AUGP={on:false,cb:null,t:0,ch:[]};
function augPick(side,tier,have,skills,deck,cb,title){const ch=augChoices(side,tier,have,skills,deck);AUGP.on=true;AUGP.cb=cb;AUGP.ch=ch;const S=$('augS');S.hidden=false;let left=30;
  const draw=()=>{S.innerHTML=`<div class="ag-box"><div class="ag-top"><b>${title||'증강체 고르기'}</b><span class="ag-tier t-${tier}">${TIERN[tier]}</span><span class="ag-time" id="agTime">${left}</span></div>
    <div class="ag-row">${ch.map(id=>augCard(id)).join('')}</div>
    <div class="ag-note">${side==='t'?'🍪 도둑':'🧙 마녀'} 증강체 · 30초 뒤엔 무작위로 골라져요</div></div>`;
    for(const b of S.querySelectorAll('.ag-card'))b.onclick=()=>done(b.dataset.id);fitNames(S)};
  const done=id=>{if(!AUGP.on)return;AUGP.on=false;clearInterval(AUGP.h);S.hidden=true;SFX.win&&SFX.card();const f=AUGP.cb;AUGP.cb=null;f&&f(id)};
  draw();SFX.magic();clearInterval(AUGP.h);AUGP.h=setInterval(()=>{left--;const t=$('agTime');if(t)t.textContent=Math.max(0,left);if(left<=0)done(ch[Math.floor(Math.random()*ch.length)])},1000)}
function augCancel(){if(AUGP.on){AUGP.on=false;clearInterval(AUGP.h);$('augS').hidden=true;AUGP.cb=null}}

/* ----- 판 구성 (AI·친구·랭크 공통 계산) ----- */
const SER={on:false};
const swapR=r=>r==='hero'?'devil':'hero';
const roleAt=(first,r)=>first;
function scoreOf(esc,t,left,total){return esc?Math.round(1000+5*Math.max(0,ROUND-t)):Math.round(600*Math.max(0,Math.min(1,1-left/Math.max(1,total))))}
function curSer(){return NET.on?NET.ser:(SER.on?SER:null)}
function serNew(kind,first){return{on:true,kind,r:0,first,res:[],me:0,op:0,aug:{me:[],op:[]},done:false,aiSk:null,aiDk:null,bonus:{},bonusOp:{},opDone:0}}
function mySkills(){return G.heroSkills&&G.heroSkills.length?G.heroSkills:cleanSkills(SAVE.skills)}
function serPickAug(S,role,tier,cb){const side=role==='hero'?'t':'w';const n=S.bonus&&S.bonus[S.r]?2:1;augPickN(side,tier,S.aug.me,n,ids=>{S.aug.me.push(...ids);cb(ids)},`${S.r}판 · ${role==='hero'?'쿠키 도둑':'과자 마녀'} 증강체`+(n>1?' · 이겨서 2장!':''),S.aug.op,S)}
// AI 상대의 증강체
function aiAug(S,role,tier){const side=role==='hero'?'t':'w';S.aiSk=null;S.aiDk=null;const sk=role==='hero'?aiSkills():[],dk=role==='devil'?aiDeck():[];S.aiSk=role==='hero'?sk:null;S.aiDk=role==='devil'?dk:null;const ch=augChoices(side,tier,S.aug.op,sk,dk);const id=ch[Math.floor(Math.random()*ch.length)];if(id)S.aug.op.push(id);return id}
function serStart(kind,first){SER.map=null;SER.augAt=null;SER.sid=null;SER.stk=null;SER.seed=null;Object.assign(SER,serNew(kind,first));SER.tiers=[null,...tierSeq()];serNext()}
function serNext(){const S=SER;S.r++;const role=roleAt(S.first,S.r),tier=(S.tiers&&S.tiers[S.r])||rollTier();aiAug(S,swapR(role),tier);if(S.bonusOp&&S.bonusOp[S.r])aiAug(S,swapR(role),tier);
  serPickAug(S,role,tier,()=>{if(!isFull())goFull(true);if(role==='hero'){mapPick(()=>beginMatch('hero'),'hero')}else mapPick(()=>startDesign())})}
// 이번 판의 증강체 → 효과 깃발
function augFlags(){const S=(G.chal||G.duo)?null:curSer();const out={t:[],w:[]};if(S&&S.on){const meRole=NET.on?NET.role:roleAt(S.first,S.r);const mine=S.aug.me,his=S.aug.op;if(meRole==='hero'){out.t=mine;out.w=his}else{out.t=his;out.w=mine}}
  if(G.stage&&G.stage.aug)out.w=out.w.concat(G.stage.aug);return out}
const AUGFX={free:'freeFirst',quiet:'quietFeet',nose:'exitNose',wall2:'wall2',lurewalk:'lureWalk',flagswap:'flagSwap',scopemap:'scopeMap'};
function buildAug(){const f=augFlags(),A={ids:new Set([...f.t,...f.w]),t:f.t,w:f.w};for(const id of A.ids){A[id]=true;if(AUGFX[id])A[AUGFX[id]]=true}
  if(A.party){A.monCap=4;A.turCap=3}if(A.castle){A.turCap=7;A.monCap=1}return A}
{const nm1=newMatch;newMatch=function(mode){G.aug=buildAug();nm1(mode);augStart()}}

/* ----- 판 시작 때 적용 ----- */
function augStart(){const A=G.aug,h=G.hero,D=G.devil;if(!A||!h)return;h.pouch=0;h.realCandy=0;h.usedFree=false;h.mirrorUsed=false;h.shoesUsed=false;h.eats=A.eatwall?3:0;h.skyUsed=false;D.redrawUsed=false;D.bank=0;D.bankT=0;D.morphUsed=false;D.blocked=null;D.reuseUsed=false;G.friendUsed=false;G.exit2=null;G.fexit=null;G.twin=null;G.moveT=40;
  if(A.fifth&&G.mode!==undefined){const S=curSer();const base=G.heroSkills||[];const extra=shuffle(SKP.filter(k=>!base.includes(k)&&k!=='compass'))[0];if(extra){G.heroSkills=base.concat(extra);setupSkillBtns()}}
  if(A.trip){const add=D.deck.splice(0,2);D.hand.push(...add)}
  if(A.gift){const want=(G.mode==='devil'?SAVE.deck:matchDeck())[0];if(want&&!D.hand.includes(want)){const i=D.deck.indexOf(want);if(i>=0){D.deck.splice(i,1);D.deck.push(D.hand[0]);D.hand[0]=want}}}
  if(A.nomap)G.mapFog=Math.max(G.mapFog||0,30);
  if(A.deadx){for(let z=0;z<=3;z++)for(let x=MID-3;x<=MID+3;x++){const zz=EXIT[1]===0?z:N-1-z;if(!inB(x,zz))continue;const i=idx(x,zz);G.seen[i]=1;G.memE[i]=x<N-1?(B.E[i]?1:0):1;G.memS[i]=zz<N-1?(B.S[i]?1:0):1}}
  if(!G.mirror){if(A.key){const ex=cx2x(EXIT[0]),ez=EXIT[1]===0?0:N*C;const before=B.walls.length;B.walls=B.walls.filter(w=>Math.hypot(w.x*C-ex,w.z*C-ez)>2*C+.1);if(B.walls.length!==before){rebuildEdges();FIELD.clear();syncWallMeshes()}}
    if(A.exit2){const f=exitField(),tot=f[idx(...START)];let best=null,bd=1e9;for(let i=0;i<N*N;i++){const x=i%N,z=(i/N)|0;if(!MASK[i]||f[i]<0)continue;const d=Math.abs(f[i]-tot*.45)+Math.random()*2;if(Math.abs(x-MID)<2&&(z===0||z===N-1))continue;if(d<bd){bd=d;best=[x,z]}}if(best){G.exit2={x:best[0],z:best[1],known:G.mode==='hero'};const g=exitPillar('#ffd35f');g.position.set(cx2x(best[0]),0,cx2x(best[1]));g.visible=G.mode==='hero'||!NET.on;x28add(g);G.exit2.g=g}}
    if(A.fakeexit){const f=exitField(),tot=f[idx(...START)];let best=null,bd=1e9;for(let i=0;i<N*N;i++){const x=i%N,z=(i/N)|0;if(!MASK[i]||f[i]<0)continue;const d=Math.abs(f[i]-tot*.35)+Math.random()*3;if(Math.abs(x-MID)<2&&(z===0||z===N-1))continue;if(d<bd){bd=d;best=[x,z]}}if(best){G.fexit={x:best[0],z:best[1]};const g=exitPillar('#ffd35f');g.position.set(cx2x(best[0]),0,cx2x(best[1]));x28add(g)}}
    if(A.candypick){let n=0;for(let i=0;i<N*N&&n<2;i++){const j=(i*37)%(N*N),x=j%N,z=(j/N)|0;if(!MASK[j]||openings(x,z)!==1)continue;if(Math.abs(x-START[0])+Math.abs(z-START[1])<4)continue;addCandy(cx2x(x),cx2x(z));G.candyVer++;n++}}
    if(A.twin){const m=makeChar('hero',1.85,heroLook());addRing(m);scene.add(m.g);play(m,'Running_A');X28.list.push(m.g);G.twin={x:N*C-h.x,z:h.z,m,face:h.face}}}
  augHud()}
function exitPillar(col){const g=new THREE.Group();const p=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,14,20,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false}));p.position.y=7;g.add(p);const s=new THREE.Mesh(new THREE.TorusGeometry(1.5,.15,8,24),new THREE.MeshBasicMaterial({color:col}));s.rotation.x=Math.PI/2;s.position.y=.2;g.add(s);return g}

/* ----- 도둑 쪽 효과 (매 프레임) ----- */
{const uh1=updHero;updHero=function(dt){const A=G.aug||{},h=G.hero,D=G.devil;const before={root:h.root,slow:h.slowT,jelly:h.jellyT,rev:h.rev,mana:h.mana};
  if(A.burnflip&&burning()){for(const k in CDK){const c=CDK[k];if(h[c]>0)h[c]=Math.max(0,h[c]-dt)}if(h.dashCd>0)h.dashCd=Math.max(0,h.dashCd-dt*.5)}
  if(A.rink){for(const e of G.ents)if(e.type==='tower'&&e.tk==='ice'&&Math.hypot(e.x-h.x,e.z-h.z)<4.5){h.slowT=Math.max(h.slowT||0,.15)}}
  uh1(dt);if(G.over)return;
  // 버닝·여행·저금: 마녀 소다
  if((A.burnflip||A.burnearly)&&burning()){G.ptHold=G.ptHold==null?D.pt:Math.min(G.ptHold,D.pt);D.pt=G.ptHold}else if(!(G.sodaFreeze>0))G.ptHold=null;
  if(A.trip)D.pt=Math.min(D.pt,5);
  if(A.bank&&D.pt>=(A.trip?5:10)-.001){D.bankT+=dt/PT_SEC;if(D.bankT>=1){D.bankT=0;D.bank=Math.min(2,D.bank+1)}}
  // 툭툭 털기
  if(A.shake&&((before.root>0&&h.root<=0)||(before.slow>0&&!(h.slowT>0))||(before.rev>0&&h.rev<=0))){h.shakeT=1}if(h.shakeT>0)h.shakeT-=dt;
  // 사탕 주머니: 가득 차면 담아 두고, 비면 꺼내 먹기
  if(A.pouch&&h.pouch>0&&h.mana<HERO.manaMax){h.pouch--;h.mana++;h.manaGot++}
  // 사탕 자석
  if(A.cmag)for(const c of G.candies){if(c.fake)continue;const d=Math.hypot(c.x-h.x,c.z-h.z);if(d<12&&d>.5&&los(h.x,h.z,c.x,c.z)){c.x+=(h.x-c.x)/d*dt*6;c.z+=(h.z-c.z)/d*dt*6;c.g.position.x=c.x;c.g.position.z=c.z}}
  // 부스러기 길
  if(A.crumb){const i=idx(...cellOf(h.x,h.z));G.crumbs=G.crumbs||[];if(G.crumbs[G.crumbs.length-1]!==i)G.crumbs.push(i)}
  // 출구 냄새
  if(A.nose&&meLoud()&&!(G.echoT>0)){const ef=exitField(),v=Math.max(0,ef[idx(...cellOf(h.x,h.z))]|0);const el=$('echo');el.hidden=false;el.textContent=`👃 출구까지 ${v}칸`}
  // 몬스터 경고등
  if(A.warn&&meLoud())warnHud();
  // 비밀 출구 · 가짜 출구
  if(G.exit2){const[cx,cz]=cellOf(h.x,h.z);if(cx===G.exit2.x&&cz===G.exit2.z){if(meLoud())say('🚪 비밀 출구로 탈출!',false,1.5);endMatch(true);return}}
  if(G.fexit){const[cx,cz]=cellOf(h.x,h.z);const near=G.fexit.px!=null?Math.hypot(h.x-G.fexit.px,h.z-G.fexit.pz)<1.4:(cx===G.fexit.x&&cz===G.fexit.z);if(near&&!(h.fexT>0)){h.fexT=3;burstFx(h.x,h.z,'smoke');h.x=cx2x(START[0]);h.z=cx2x(START[1])+(START[1]===0?-.8:.8);h.kx=h.kz=0;burstFx(h.x,h.z,'smoke');SFX.magic();netEv('fexit');say(G.mode==='hero'?'🚪 가짜 출구였어요! 출발점으로 돌아왔어요':'🚪 도둑이 가짜 출구에 속았어요!',G.mode==='hero',1.8)}if(h.fexT>0)h.fexT-=dt}
  // 쌍둥이 도둑
  if(G.twin){const T=G.twin;const tx=N*C-h.x,tz=h.z;T.x=lerp(T.x,tx,Math.min(1,dt*8));T.z=lerp(T.z,tz,Math.min(1,dt*8));const q={x:T.x,z:T.z};collide(q,HERO.r);T.x=q.x;T.z=q.z;T.face=-h.face;T.m.g.position.set(T.x,0,T.z);T.m.g.rotation.y=T.face;play(T.m,h.moving?'Running_A':'Idle');T.m.mixer.update(dt);T.m.g.visible=G.mode==='devil'||VIEW===3;setOpacity(T.m,G.mode==='devil'?1:.35)}
  // 느긋한 도둑
  if(A.lazy){if(h.moving)h.stillT=0;else{h.stillT=(h.stillT||0)+dt;if(h.stillT>3)h.reveal=Math.max(h.reveal,.3)}}
  // 설탕 길
  if(A.sugar&&h.sprint>0){G.sugarT=(G.sugarT||0)-dt;if(G.sugarT<=0){G.sugarT=.3;const m=new THREE.Mesh(new THREE.CircleGeometry(1,14),teleMat('#ffffff',.6));m.rotation.x=-Math.PI/2;m.position.set(h.x,.12,h.z);x28add(m);(G.sugar=G.sugar||[]).push({x:h.x,z:h.z,t:6,m})}}
  if(G.sugar)for(let i=G.sugar.length-1;i>=0;i--){const s=G.sugar[i];s.t-=dt;if(s.t<=0){drop(s.m);G.sugar.splice(i,1);continue}for(const e of G.ents)if(isMon(e)&&!e.dead&&Math.hypot(e.x-s.x,e.z-s.z)<1.4)e.slick=Math.max(e.slick||0,1)}
  // 연막 이동
  if(h.smokeT>0){h.smokeT-=dt;G.smkT=(G.smkT||0)-dt;if(G.smkT<=0){G.smkT=.5;burstFx(h.x,h.z,'smoke');for(const e of G.ents)if(isMon(e)&&!e.dead&&e.type!=='ghost'&&Math.hypot(e.x-h.x,e.z-h.z)<6){if(e.ph==='tele'||e.ph==='dash')vanish(e);else e.stun=Math.max(e.stun,1)}}}
  // 마녀: 움직이는 미로
  if(A.moving){G.moveT-=dt;if(G.moveT<=0){G.moveT=40;let n=0;for(const w of shuffle(B.walls.filter(w=>!w.temp&&!w.anim))){if(n>=2)break;const opts=wsBase(w);if(!opts.length)continue;const q=opts[Math.floor(Math.random()*opts.length)];const old={o:w.o,x:w.x,z:w.z};w.x=q.x;w.z=q.z;w.anim={t:0,from:old};w.prev={x:old.x,z:old.z};n++}if(n){rebuildEdges();FIELD.clear();if(G.mode==='hero'){for(const w of B.walls)w.anim=null;syncWallMeshes()}else{syncPosts();SFX.crunch();say('🌀 벽 '+n+'개가 저절로 움직였어요',false,1.4)}}}}
  // 거미줄 길
  if(G.webZones)for(let i=G.webZones.length-1;i>=0;i--){const z=G.webZones[i];z.t-=dt;if(z.t<=0){drop(z.m);G.webZones.splice(i,1);continue}if(!(h.dashT>0)&&Math.hypot(h.x-z.x,h.z-z.z)<1.8)h.slowT=Math.max(h.slowT||0,.5)}}}
const wsBase=w=>{const m=w.moved;w.moved=0;let r=[];try{r=wallShifts(w)}finally{w.moved=m}return r};
function warnHud(){const h=G.hero,box=$('warnBox');let html='';for(const e of G.ents){if(!isMon(e)||e.dead)continue;const dx=e.x-h.x,dz=e.z-h.z,d=Math.hypot(dx,dz);if(d>18)continue;const cy=Math.cos(h.yaw),sy=Math.sin(h.yaw);const rel=Math.atan2(dx*cy-dz*sy,-dx*sy-dz*cy);html+=`<i style="transform:rotate(${(rel*180/Math.PI).toFixed(0)}deg)"><b>▲</b></i>`}box.innerHTML=html;box.hidden=!html}
{const ts0=titleScreen;titleScreen=function(){ts0();$('warnBox').hidden=true;$('echo').hidden=true}}

/* ----- 사탕 먹기 효과 ----- */
{const uh2=updHero;updHero=function(dt){const h=G.hero,got=h.manaGot,cs=G.candies.length,fk=G.candies.filter(c=>c.fake).length,A=G.aug||{};
  // 주머니: 가득일 때 진짜 사탕을 주울 수 있게
  let pocket=null;if(A.pouch&&h.mana>=HERO.manaMax&&h.pouch<2){for(const c of G.candies)if(!c.fake&&Math.hypot(c.x-h.x,c.z-h.z)<1.4){pocket=c;break}}
  if(pocket){drop(pocket.g);G.candies.splice(G.candies.indexOf(pocket),1);G.candyVer++;h.pouch++;SFX.candy();if(meLoud())say(`👝 사탕을 주머니에 담았어요 (${h.pouch}/2)`,false,1,true)}
  uh2(dt);if(!G.hero||G.hero!==h)return;const ate=h.manaGot-got,fakeAte=fk-G.candies.filter(c=>c.fake).length;
  if(ate>0&&!G.over){h.realCandy+=ate;const D=G.devil;
    if(A.clock){G.t=Math.max(0,G.t-3*ate);if(meLoud())say('⏰ +3초!',false,.8,true)}
    if(A.mthief){D.pt=Math.max(0,D.pt-ate);if(G.ptHold!=null)G.ptHold=Math.max(0,G.ptHold-ate)}
    if(A.tax&&Math.floor(h.realCandy/3)>Math.floor((h.realCandy-ate)/3))D.pt=Math.min(A.trip?5:10,D.pt+2);
    if(A.steal&&h.realCandy>=5&&!D.blocked&&D.hand.length){D.blocked=D.hand[Math.floor(Math.random()*D.hand.length)];netEv('steal');say(G.mode==='hero'?`🃏 마녀의 '${CARDS[D.blocked].n}' 카드를 막았어요!`:`🃏 도둑이 '${CARDS[D.blocked].n}' 카드를 훔쳤어요`,false,1.6)}
    if(A.share){let best=null,bd=1e9;for(const e of G.ents)if(isMon(e)&&!e.dead&&e.ph!=='tele'&&e.ph!=='dash'){const d=Math.hypot(e.x-h.x,e.z-h.z);if(d<bd){bd=d;best=e}}if(best)best.stun=Math.max(best.stun,1)}}
  if(fakeAte>0&&A.regret)G.devil.pt=Math.min(10,G.devil.pt+1)}}

/* ----- 스킬·대시·함정 관련 ----- */
{const sp0=skPay;skPay=function(k){const h=G.hero,A=G.aug||{};const m=h.mana;sp0(k);if(A.free&&!h.usedFree&&!h.isRival){h.usedFree=true;h.mana=m;if(meLoud())say('🎁 첫 스킬은 공짜!',false,.9,true)}
  if(A.crystal){netEv('sk:'+k+':'+r1(h.x)+':'+r1(h.z));if(G.mode==='devil'&&!G.mirror)crystalShow(k,h.x,h.z)}
  if(k==='smoke'&&A.smokemv)h.smokeT=3;
  if(k==='compass'&&A.compass2){setTimeout(()=>{if(isPlaying()&&!G.over&&meLoud())compassFx()},5000);let best=null,bd=1e9;for(const c of G.candies)if(!c.fake){const d=Math.hypot(c.x-h.x,c.z-h.z);if(d<bd){bd=d;best=c}}if(best&&meLoud()){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.6),new THREE.MeshBasicMaterial({color:'#ffd35f'}));s.position.set(best.x,3,best.z);x28add(s);setTimeout(()=>drop(s),5000)}}
  if(k==='freeze'&&A.icepath)for(const e of G.ents)if(isMon(e)&&!e.dead)e.slick=Math.max(e.slick||0,2);
  if(k==='brick'&&A.brickstep){G.scopeT=Math.max(G.scopeT||0,1.5)}
  if(k==='echo'&&A.echotrap){G.seeHidden=Math.max(G.seeHidden||0,5);xrayOn()}}}
function crystalShow(k,x,z){say(`🔮 도둑이 '${SKN[k]?SKN[k][0]:k}' 스킬을 썼어요`,false,1.4);const r=new THREE.Mesh(new THREE.RingGeometry(1.2,1.8,24),teleMat('#b98cff',.8));r.rotation.x=-Math.PI/2;r.position.set(x,.2,z);x28add(r);setTimeout(()=>drop(r),1500)}
{const dd1=doDash;doDash=function(ai){const h=G.hero,A=G.aug||{};if(A.backdash&&h.backT>0&&h.backPos&&!ai){burstFx(h.x,h.z,'smoke');h.x=h.backPos.x;h.z=h.backPos.z;h.backT=0;h.backPos=null;h.dashT=0;SFX.magic();return}const p={x:h.x,z:h.z},n=h.dashes;dd1(ai);if(h.dashes>n&&A.backdash){h.backPos=p;h.backT=1}}}
{const uh3=updHero;updHero=function(dt){const h=G.hero;if(h.backT>0)h.backT-=dt;uh3(dt)}}
{const st1=springTrap;springTrap=function(e){const h=G.hero,A=G.aug||{};if(h.shakeT>0){e.life=0;drop(e.g);return}if(A.shoes&&!h.shoesUsed&&(e.type==='slip'||e.type==='rev')){h.shoesUsed=true;e.life=0;drop(e.g);if(meLoud())say('👟 단단한 신발! 발판을 버텼어요',false,1.2);return}st1(e);if(e.type==='slip'&&A.ribbon&&h.slide)h.slide.turn=1}}
{const rb0=ringBell;ringBell=function(e){const h=G.hero,A=G.aug||{};if(A.quiet&&!h.moving){return}rb0(e);if(A.bellcall){let best=null,bd=1e9;for(const q of G.ents)if(isMon(q)&&!q.dead){const d=Math.hypot(q.x-e.x,q.z-e.z);if(d<bd){bd=d;best=q}}if(best){best.boostT=4;best.target='hero'}}}}
// 미끄럼 리본: 막히면 다른 길로 돌아 계속 미끄러짐
{const uh4=updHero;updHero=function(dt){const h=G.hero,s=h.slide,px=h.x,pz=h.z;uh4(dt);if(s&&s.turn&&s.t>0&&Math.hypot(h.x-px,h.z-pz)<dt*3){const[cx,cz]=cellOf(h.x,h.z);const ds=DIRS.filter(([dx,dz])=>canStep(cx,cz,dx,dz)&&!(dx===-s.dx&&dz===-s.dz));if(ds.length){const d=ds[Math.floor(Math.random()*ds.length)];s.dx=d[0];s.dz=d[1];s.t=Math.max(s.t,.4)}}}}
// 거울 사탕 · 그림자 망토
{const hu0=hurt;hurt=function(src,amount,why){const h=G.hero,A=G.aug||{};if(G.over||h.inv>0||h.dashT>0)return hu0(src,amount,why);
  if(A.shadow&&h.cloak>0&&src&&isMon(src))return false;
  if(A.mirror&&!h.mirrorUsed&&src){h.mirrorUsed=true;h.inv=1;SFX.pop();netEv('mirror');if(isMon(src))vanish(src);else if(src.type==='tower'){src.life=0}if(meLoud())say('🪞 거울 사탕이 공격을 튕겨 냈어요!',false,1.5);return false}
  return hu0(src,amount,why)}}
// 펑 분신
{const pd0=popDecoy;popDecoy=function(by){const d=G.decoy;if(by&&d&&(G.aug||{}).popdec){for(const e of G.ents)if(isMon(e)&&!e.dead&&Math.hypot(e.x-d.x,e.z-d.z)<6){if(e.ph==='tele'||e.ph==='dash')vanish(e);else e.stun=Math.max(e.stun,1)}burstFx(d.x,d.z,'smoke')}pd0(by)}}
// 껌 장벽: 처음 2초는 몬스터가 못 지나가요
{const ge0=gumEnt;gumEnt=function(x,z){const e=ge0(x,z);if((G.aug||{}).gumwall)e.wallT=2;return e}}
{const mt0=monTick;monTick=function(e,dt,i){const A=G.aug||{};
  if(e.boostT>0){e.boostT-=dt;e.spd0=e.spd0||e.spd;e.spd=e.spd0*1.8}else if(e.spd0){e.spd=e.spd0;e.spd0=0}
  if(e.ally&&!e.dead){return allyTick(e,dt,i)}
  const px=e.x,pz=e.z;const r=mt0(e,dt,i);
  if(!e.dead)for(const j of G.ents)if(j.type==='gum'&&j.wallT>0&&e.type!=='ghost'&&Math.hypot(j.x-e.x,j.z-e.z)<j.r){e.x=px;e.z=pz;e.g.position.x=px;e.g.position.z=pz}
  if(A.webtrail&&e.type==='spider'&&!e.dead&&e.node&&e.lastWebN!==e.node.join()){e.lastWebN=e.node.join();e.webN=(e.webN||0)+1;if(e.webN%2===0){const m=new THREE.Mesh(new THREE.CircleGeometry(1.8,16),teleMat('#e9fff8',.45));m.rotation.x=-Math.PI/2;m.position.set(e.x,.13,e.z);x28add(m);(G.webZones=G.webZones||[]).push({x:e.x,z:e.z,t:8,m})}}
  return r}}
{const ug0=updEnts;updEnts=function(dt){for(const j of G.ents)if(j.type==='gum'&&j.wallT>0)j.wallT-=dt;ug0(dt)}}
// 몬스터 친구: 다른 몬스터를 쫓아가 함께 사라져요
function allyTick(e,dt,i){e.m.mixer.update(dt);if(e.life<=0){vanish(e);return 0}let best=null,bd=1e9;for(const o of G.ents)if(o!==e&&isMon(o)&&!o.dead&&!o.ally){const d=Math.hypot(o.x-e.x,o.z-e.z);if(d<bd){bd=d;best=o}}
  if(!best){const h=G.hero,d=Math.hypot(h.x-e.x,h.z-e.z);if(d>4){const sp=e.spd*dt;e.x+=(h.x-e.x)/d*sp;e.z+=(h.z-e.z)/d*sp;e.face=Math.atan2(h.x-e.x,h.z-e.z)}}
  else{if(bd<2){vanish(best);vanish(e);if(meLoud())say('🤝 친구 몬스터가 막아 줬어요!',false,1.3);return 0}const[cx,cz]=cellOf(e.x,e.z),[gx,gz]=cellOf(best.x,best.z);let tx=best.x,tz=best.z;if(!los(e.x,e.z,best.x,best.z)){const f=field(gx,gz),here=f[idx(cx,cz)];if(here>0)for(const[dx,dz]of DIRS){const a=cx+dx,b=cz+dz;if(!inB(a,b)||!canStep(cx,cz,dx,dz))continue;if(f[idx(a,b)]===here-1){tx=cx2x(a);tz=cx2x(b);break}}}const dx=tx-e.x,dz=tz-e.z,L=Math.hypot(dx,dz)||1,sp=e.spd*1.3*dt;e.x+=dx/L*sp;e.z+=dz/L*sp;e.face=Math.atan2(dx,dz)}
  if(e.type!=='ghost'&&e.type!=='spider')collide(e,e.r);e.g.position.set(e.x,0,e.z);monFly(e);e.g.rotation.y=e.face;return 0}
{const sm1=spawnMon;spawnMon=function(k,x,z){const e=sm1(k,x,z);const A=G.aug||{};if(A.friend&&!G.friendUsed&&!G.mirror&&!e.extra&&!e.mini){G.friendUsed=true;e.ally=true;addRing(e.m,'#3fbf9f');netEv('ally');if(meLoud())say('🤝 마녀의 첫 몬스터가 내 편이 됐어요!',false,1.6)}
  if(A.hideghost&&k==='ghost')e.hide=true;
  if(A.roar&&k==='bear')e.roar=true;
  if(A.batswarm&&k==='bat'&&!e.extra&&!G.mirror){for(let n=1;n<=2;n++){const b=sm1('bat',x-Math.sin(e.face)*1.8*n,z-Math.cos(e.face)*1.8*n);b.extra=true;b.lead=e}}
  return e}}
{const sk0=skelCap;skelCap=function(){return sk0()+G.ents.filter(e=>e.extra&&!e.dead).length}}
{const ss1=spawnSkel;spawnSkel=function(x,z){const e=ss1(x,z);const A=G.aug||{};if(A.friend&&!G.friendUsed&&!G.mirror){G.friendUsed=true;e.ally=true;addRing(e.m,'#3fbf9f');if(meLoud())say('🤝 마녀의 첫 몬스터가 내 편이 됐어요!',false,1.6)}return e}}
// 유령 숨바꼭질은 예고가 시작되면 보여요 · 박쥐 무리는 같이 돌진 · 쌍둥이 슬라임
{const st2=startTele;startTele=function(e,tx,tz){e.hide=false;if(e.type==='ghost')e.g.visible=true;st2(e,tx,tz);
  if(e.type==='bat'&&!e.extra)for(const b of G.ents)if(b.lead===e&&!b.dead&&b.ph!=='tele'&&b.ph!=='dash'){b.x=e.x-Math.sin(e.tele.ang)*1.8*(G.ents.filter(q=>q.lead===e).indexOf(b)+1);b.z=e.z-Math.cos(e.tele.ang)*1.8*(G.ents.filter(q=>q.lead===e).indexOf(b)+1);st2(b,b.x+Math.sin(e.tele.ang)*10,b.z+Math.cos(e.tele.ang)*10);b.tele.d=e.tele.d+.12*(G.ents.filter(q=>q.lead===e).indexOf(b)+1)}
  if(e.type==='soldier'&&(G.aug||{}).horn){G.hasteT=4;for(const q of G.ents)if(isMon(q)&&!q.dead&&q.type!=='soldier'&&q.type!=='spider')q.target='hero';SFX.bell();if(meLoud())say('📯 쿠키 병정의 나팔! 몬스터가 빨라져요',true,1.4)}}}
{const rt0=resolveTele;resolveTele=function(e){const h=G.hero,A=G.aug||{},T=e.tele;
  if(e.type==='bear'&&e.roar){const hit=inTele(T,h.x,h.z,.2)&&los(e.x,e.z,h.x,h.z)&&!G.mirror;if(hit&&hurt(e,DMG2.bear,'곰의 고함 파동에 맞았어요!')){h.kx*=2;h.kz*=2}vanish(e);return}
  const hp=h.hp,inv=h.inv;rt0(e);const hit=h.hp<hp||(e.type==='ghost'&&h.root>0&&h.inv!==inv);
  if(e.type==='skel'&&A.twinslime&&!e.mini&&!G.mirror){for(const s of[-1,1]){const m=spawnSkel(T.x+s*1.5,T.z);m.mini=true;m.g.scale.multiplyScalar(.6);m.r=.8;m.life=8;startTele(m,h.x+s*1.2,h.z+s*.6);m.tele.d=.9}}
  if(A.rewind&&!hit&&!e.extra&&!e.mini&&(e.type==='skel'||MONK.includes(e.type))&&e.type!=='bat'&&!G.mirror){const D=G.devil,k=e.type,j=D.deck.indexOf(k);if(j>0){D.deck.splice(j,1);D.deck.unshift(k)}}}}
{const dt1=dashTick;dashTick=function(e,dt){const hp=G.hero.hp;dt1(e,dt);if(e.dead&&G.hero.hp===hp&&(G.aug||{}).rewind&&!e.extra&&!G.mirror){const D=G.devil,j=D.deck.indexOf(e.type);if(j>0){D.deck.splice(j,1);D.deck.unshift(e.type)}}}}

/* ----- 마녀 쪽 카드 효과 ----- */
WHY.blocked='도둑이 훔쳐 간 카드예요';WHY.thick='두꺼운 벽 때문에 못 써요';
{const ac2=applyCard;applyCard=function(k,x,z,extra){const D=G.devil,A=G.aug||{};if(D.blocked===k)return 'blocked';const pt=D.pt,before=D.hand.slice();const r=ac2(k,x,z,extra);
  if(r==='ok'){if(A.bank&&D.bank>0){const back=Math.min(D.bank,CARDS[k].cost);D.pt+=back;D.bank=0}
    if(A.reuse&&!D.reuseUsed){D.reuseUsed=true;const i=before.indexOf(k);if(i>=0&&D.hand[i]!==k){const nw=D.hand[i];D.hand[i]=k;const j=D.deck.lastIndexOf(k);if(j>=0)D.deck.splice(j,1);D.deck.unshift(nw)}}
    if(A.qsummon&&(MONK.includes(k)||TURK.includes(k))&&G.sigils.length){const s=G.sigils[G.sigils.length-1];if(G.mode==='hero')s.m.visible=false}}
  return r}}
{const bh1=buildHand;buildHand=function(){bh1();const D=G.devil,A=G.aug||{};if(D.blocked){const i=D.hand.indexOf(D.blocked);const b=$('hand').children[i];if(b){b.classList.add('na');b.insertAdjacentHTML('beforeend','<span class="lock">🃏</span>')}}
  const pk=$('peekBox');if(A.peek&&G.mode==='devil'){pk.hidden=false;pk.innerHTML='다음 '+D.deck.slice(0,2).map(k=>`<i>${ART[k]||''}</i>`).join('')}else pk.hidden=true;augHud()}}
{const hk0=handKey;handKey=function(){const D=G.devil;return hk0()+(D.blocked||'')+(D.deck[1]||'')+(D.bank|0)+(D.redrawUsed?1:0)}}
// 온라인 거울: 다음 카드 2장 · 이벤트
{const ns2=netSend;netSend=function(m){if(m&&m.t==='s'&&G&&G.devil){m.nx2=G.devil.deck[1];m.bl=G.devil.blocked||0;if(G.exit2&&!G.mirror)m.e2=0}return ns2(m)}}
mirrorExtras=function(s){const D=G.devil;if(s.nx2)D.deck=[s.nx,s.nx2];D.blocked=s.bl||null;
  if(s.tw){if(!G.twin){const m=makeChar('hero',1.85,heroLook());addRing(m);scene.add(m.g);play(m,'Running_A');X28.list.push(m.g);G.twin={m,x:s.tw[0],z:s.tw[1],face:s.tw[2]}}const T=G.twin;T.x=s.tw[0];T.z=s.tw[1];T.m.g.position.set(T.x,0,T.z);T.m.g.rotation.y=s.tw[2];T.m.mixer.update(1/15)}
  if(s.lu){if(!G.lure){const g=lureMesh();x28add(g);G.lure={g,x:0,z:0,t:5}}G.lure.x=s.lu[0];G.lure.z=s.lu[1];G.lure.g.position.set(s.lu[0],0,s.lu[1])}else if(G.lure){drop(G.lure.g);G.lure=null}
  for(const ev of s.ev||[]){if(ev.startsWith('sk:')&&(G.aug||{}).crystal){const[,k,x,z]=ev.split(':');crystalShow(k,+x,+z)}else if(ev==='steal'){say('🃏 도둑이 카드 한 장을 훔쳤어요',false,1.4)}else if(ev==='mirror'){say('🪞 도둑의 거울 사탕이 공격을 튕겨 냈어요',false,1.4)}else if(ev==='fexit'){say('🚪 도둑이 가짜 출구에 속았어요!',false,1.6)}else if(ev==='ally'){say('🤝 첫 몬스터가 도둑 편이 됐어요',false,1.5)}}};
// 발자국 냄새 (마녀 화면)
{const uh5=updHUD;updHUD=function(){uh5();const A=G.aug||{};if(A.scent&&G.mode==='devil'&&!G.over){G.scT=(G.scT||0)-1/30;const h=G.hero;if(G.scT<=0&&h.x!=null){G.scT=.25;const m=new THREE.Mesh(new THREE.CircleGeometry(.45,10),teleMat('#ff5f9e',.7));m.rotation.x=-Math.PI/2;m.position.set(h.x,.15,h.z);x28add(m);setTimeout(()=>{drop(m);const i=X28.list.indexOf(m);if(i>=0)X28.list.splice(i,1)},3000)}}}}

/* ----- 증강체 버튼 (벽 냠냠·하늘 보기·새 패·마녀 출동) ----- */
function augHud(){const A=G.aug||{},h=G.hero,D=G.devil;const hb=$('augBtnH'),db=$('augBtnD');if(!hb||!h)return;
  let H='';if(A.eatwall&&h.eats>0)H+=`<button data-a="eat">😋 벽 냠냠 ${h.eats}</button>`;if(A.sky&&!h.skyUsed)H+=`<button data-a="sky">☁️ 하늘 보기</button>`;
  if(A.pouch&&h.pouch>0)H+=`<span class="ab-i">👝 ${h.pouch}</span>`;
  if(hb.dataset.k!==H){hb.dataset.k=H;hb.innerHTML=H}hb.hidden=!H||G.mode!=='hero';
  let W='';if(A.fakeexit&&D.fcReady)W+=`<button data-a="fcandy">슈퍼 가짜 사탕</button>`;if(A.redraw&&!D.redrawUsed)W+=`<button data-a="redraw">🔄 새 패</button>`;if(A.morph&&!D.morphUsed)W+=`<button data-a="morph">🧙 출동</button>`;if(A.bank&&D.bank>0)W+=`<span class="ab-i">🐷 ${D.bank}</span>`;
  if(db.dataset.k!==W){db.dataset.k=W;db.innerHTML=W}db.hidden=!W||G.mode!=='devil'}
for(const id of['augBtnH','augBtnD'])$(id).addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(!b)return;e.preventDefault();e.stopPropagation();augAct(b.dataset.a)});
function augAct(a){const h=G.hero,D=G.devil,A=G.aug||{};if(G.over)return;
  if(a==='eat'){if(A.thick){say(WHY.thick,true,1);return}if(h.eats<=0)return;const fx=-Math.sin(h.yaw),fz=-Math.cos(h.yaw);const[cx,cz]=cellOf(h.x,h.z);const d=Math.abs(fx)>Math.abs(fz)?[Math.sign(fx),0]:[0,Math.sign(fz)];if(canStep(cx,cz,d[0],d[1])){say('바로 앞에 먹을 벽이 없어요',false,1);return}
    // 그 홈을 지나가는 벽 찾기
    const ex=d[0]===1?(cx+1)*C:d[0]===-1?cx*C:cx2x(cx),ez=d[1]===1?(cz+1)*C:d[1]===-1?cz*C:cx2x(cz);const o=d[0]?'V':'H';let best=null,bd=1e9;for(const w of B.walls){if(w.o!==o)continue;const dd=Math.hypot(w.x*C-ex,w.z*C-ez);if(dd<C+.1&&dd<bd){bd=dd;best=w}}
    if(!best){say('이 벽은 먹을 수 없어요',false,1);return}B.walls.splice(B.walls.indexOf(best),1);rebuildEdges();FIELD.clear();syncWallMeshes();burstFx(ex,ez,'ginger');SFX.crunch();h.eats--;netEv('choco');say(`😋 냠냠! 벽을 먹었어요 (남은 ${h.eats})`,false,1.2);augHud();return}
  if(a==='sky'){if(h.skyUsed)return;h.skyUsed=true;G.skyT=7;SFX.magic();$('bigmap').hidden=false;setTimeout(()=>{G.skyT=0;if(screen==='play')$('bigmap').hidden=true},7000);augHud();return}
  if(a==='redraw'){if(D.redrawUsed)return;if(G.mirror){netSend({t:'augAct',a});D.redrawUsed=true;augHud();return}doRedraw();return}
  if(a==='morph'){if(D.morphUsed)return;if(G.mirror){netSend({t:'augAct',a});D.morphUsed=true;augHud();return}doMorph();return}}
function doRedraw(){const D=G.devil;D.redrawUsed=true;const n=D.hand.length;D.deck.push(...D.hand);D.hand=D.deck.splice(0,n);SFX.card();if(G.mode==='devil')say('🔄 새 패를 뽑았어요',false,1);buildHand();augHud()}
function doMorph(){const D=G.devil,h=G.hero;D.morphUsed=true;const[cx,cz]=cellOf(h.x,h.z);let best=null;const f=field(cx,cz);for(let i=0;i<N*N;i++){if(f[i]===6||f[i]===7){best=[i%N,(i/N)|0];break}}if(!best)best=[cx,cz];const x=cx2x(best[0]),z=cx2x(best[1]);
  sigil(x,z,.6,()=>{const e=spawnMon('skel',x,z);e.spd=HERO.speed;e.life=6;e.morph=true;const hat=new THREE.Mesh(new THREE.ConeGeometry(.9,1.8,14),LM('#5a2fc0'));hat.position.y=3.2;e.m.body.add(hat)});say(G.mode==='devil'?'🧙 마녀 출동! 5초 동안 쫓아가요':'🧙 마녀가 직접 쫓아와요!',G.mode==='hero',1.5);augHud()}
{const nm2=netMsg;netMsg=function(d){if(d&&d.t==='augAct'){if(d.a==='redraw')doRedraw();if(d.a==='morph')doMorph();return}if(d&&d.t==='aug'){const S=NET.ser;if(S)for(const id of(d.ids||[d.id]))if(id&&!S.aug.op.includes(id))S.aug.op.push(id);if(G.aug&&!G.over&&d.r===(S&&S.r)){G.aug=buildAug()}return}if(d&&d.t==='augDone'){const S=NET.ser;if(S){S.opDone=d.r;if(S.waitGo&&S.myDone===d.r){const g=S.waitGo;S.waitGo=null;g()}}return}nm2(d)}}
// 하늘 보기: 큰 지도에 미로 전체
{const dm0=drawMap;drawMap=function(cv){dm0(cv);if(G.skyT>0||G.scopeShow)skyDraw(cv)}}
function skyDraw(cv){const g=cv.getContext('2d'),W=cv.width,pad=W*.05,s=(W-pad*2)/N;g.strokeStyle='#8a5530';g.lineWidth=Math.max(2,s*.16);g.lineCap='round';const all=G.skyT>0;
  for(let z=0;z<N;z++)for(let x=0;x<N;x++){const i=idx(x,z);if(!MASK[i])continue;if(!all&&!(G.scopeCells&&G.scopeCells.has(i)))continue;if(!G.seen[i]){g.fillStyle='#f8e6c4';g.fillRect(pad+x*s,pad+z*s,s+.5,s+.5)}}
  for(let z=0;z<N;z++)for(let x=0;x<N;x++){const i=idx(x,z);if(!all&&!(G.scopeCells&&G.scopeCells.has(i)))continue;if(x<N-1&&B.E[i]){g.beginPath();g.moveTo(pad+(x+1)*s,pad+z*s);g.lineTo(pad+(x+1)*s,pad+(z+1)*s);g.stroke()}if(z<N-1&&B.S[i]){g.beginPath();g.moveTo(pad+x*s,pad+(z+1)*s);g.lineTo(pad+(x+1)*s,pad+(z+1)*s);g.stroke()}}
  const h=G.hero;g.save();g.translate(pad+h.x/C*s,pad+h.z/C*s);g.rotate(-h.yaw);g.fillStyle='#3fbf9f';g.strokeStyle='#4a2a1a';g.lineWidth=2;g.beginPath();g.moveTo(0,-s*.45);g.lineTo(s*.32,s*.3);g.lineTo(0,s*.15);g.lineTo(-s*.32,s*.3);g.closePath();g.fill();g.stroke();g.restore()}
// 망원경: 본 곳은 잠깐만 (망원경 지도 증강체면 계속)
scopeReveal=function(){const h=G.hero;const[cx,cz]=cellOf(h.x,h.z),R=5;G.scopeCells=G.scopeCells||new Set();for(let z=cz-R;z<=cz+R;z++)for(let x=cx-R;x<=cx+R;x++)if(inB(x,z))G.scopeCells.add(idx(x,z))};
{const uh6=updHero;updHero=function(dt){uh6(dt);G.scopeShow=G.scopeT>0||((G.aug||{}).scopemap&&G.scopeCells&&G.scopeCells.size);if(!(G.scopeT>0)&&!(G.aug||{}).scopemap&&G.scopeCells)G.scopeCells.clear()}}
// 두꺼운 벽: 순간이동·벽돌도 막혀요
{const dt2=doTele;doTele=function(ai){if((G.aug||{}).thick){if(!ai)say(WHY.thick,true,1);return}dt2(ai)}}
{const db2=doBrick;doBrick=function(ai){if((G.aug||{}).thick){if(!ai)say(WHY.thick,true,1);return}db2(ai)}}
// 깃발 왕복: 떠난 자리로 깃발 옮기기
doTele=(f0=>function(ai){const h=G.hero,ox=h.x,oz=h.z,fl=G.flags&&G.flags[G.flags.length-1];const cd=h.cdTele||0;f0(ai);if((h.cdTele||0)>cd&&fl&&(G.aug||{}).flagswap){fl.x=ox;fl.z=oz;fl.g.position.set(ox,0,oz)}})(doTele);
// 쌍둥이: AI 마녀는 반쯤은 쌍둥이를 진짜로 믿어요
{const da1=devilAI;devilAI=function(dt){const h=G.hero,T=G.twin;if(T&&Math.random()<.5){const x=h.x,z=h.z;h.x=T.x;h.z=T.z;try{da1(dt)}finally{h.x=x;h.z=z}}else da1(dt)}}
// 밤의 미로
{const uc0=updCamera;updCamera=function(dt){uc0(dt);if(!scene.fog)return;if((G.aug||{}).night&&G.mode==='hero'&&isPlaying()&&!G.reveal){if(!G.fogSave)G.fogSave=[scene.fog.near,scene.fog.far];scene.fog.near=3;scene.fog.far=26}else if(G.fogSave){scene.fog.near=G.fogSave[0];scene.fog.far=G.fogSave[1];G.fogSave=null}}}
{const ac3=addCandy;addCandy=function(px,pz,fake){ac3(px,pz,fake);const c=G.candies[G.candies.length-1];if((G.aug||{}).night&&c){const l=new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),new THREE.MeshBasicMaterial({color:'#fff3a8',transparent:true,opacity:.35,fog:false}));c.g.add(l)}}}

/* ----- AI 대전(혼자 하기) 메인 게임 = 4판 ----- */
{const rg0=roleGo;roleGo=async function(kind){if(ROLECTX==='ai'&&(kind==='hero'||kind==='devil')){await initAudio();SET.mode=kind;SER.on=false;openSetup('role',true,()=>{if(!isFull())goFull(true);serStart('ai',kind)});return}return rg0(kind)}}
{const em1=endMatch;endMatch=function(win,why){if(G.over)return;const S=curSer();document.querySelector('.res-slab').classList.toggle('ser',!!(S&&S.on&&!G.duo&&!G.stage&&!G.chal));if(!S||!S.on||G.duo||G.stage||G.chal){return em1(win,why)}
  const h=G.hero,t=G.t;const left=win?0:(G.mirror&&G.endLeft!=null?G.endLeft:thiefLeft());const total=Math.max(1,exitField()[idx(...START)]|0);const sc=scoreOf(!!win,t,left,total);const thiefMe=G.mode==='hero';
  const iWon=thiefMe?!!win:!win;S.res[S.r-1]={thiefMe,sc,esc:!!win,win:iWon,t:+t.toFixed(1),left,aug:{me:S.aug.me.slice(),op:S.aug.op.slice()}};if(iWon)S.me++;else S.op++;S.bonus=S.bonus||{};S.bonusOp=S.bonusOp||{};if(iWon)S.bonus[S.r+1]=1;else S.bonusOp[S.r+1]=1;
  if(S.r>=3)S.done=true;em1(win,why);setTimeout(()=>serResult(S),2750)}}
function serResult(S){if(screen!=='result')return;const fin=S.done;const rows=[0,1,2,3].map(i=>S.res[i]);
  const cell=(q,me)=>!q?'<td>·</td>':((q.thiefMe===me)?`<td class="sc">${q.sc}${q.esc?'<small>탈출</small>':''}</td>`:'<td class="wd">마녀</td>');
  const augIc=list=>list.map(id=>`<i title="${AUGI[id].n}: ${AUGI[id].d}" data-aug="${id}">${AUGI[id].ic||'✦'}</i>`).join('');
  let html=`<table class="ser-t"><tr><th></th><th>1판</th><th>2판</th><th>3판</th><th>4판</th><th>합계</th></tr><tr><th>나</th>${rows.map(q=>cell(q,true)).join('')}<td class="tot">${S.me}</td></tr><tr><th>${S.kind==='ai'?'AI':'상대'}</th>${rows.map(q=>cell(q,false)).join('')}<td class="tot">${S.op}</td></tr></table>`;
  html+=`<div class="ser-aug"><span>내 증강체 ${augIc(S.aug.me)||'없음'}</span><span>상대 ${augIc(S.aug.op)||'없음'}</span></div>`;
  let res=null;if(fin){res=S.me>S.op?'win':S.me<S.op?'lose':'draw';$('resKick').textContent=res==='win'?'최종 승리!':res==='lose'?'최종 패배':'무승부';$('resKick').className='res-rib'+(res==='lose'?' lose':'');
    $('resLede').textContent=`4판 합계 나 ${S.me} : ${S.op} ${S.kind==='ai'?'AI':'상대'}`}
  const box=$('resCoin');const prev=S.kind==='ai'?box.innerHTML:'';box.innerHTML=html+(fin&&S.payTxt?`<div>${S.payTxt}</div>`:'')+(prev?`<div class="ser-coin">${prev}</div>`:'');
  for(const i of box.querySelectorAll('[data-aug]'))i.onclick=()=>{const a=AUGI[i.dataset.aug];tMsg(a.n+' · '+a.d)};
  if(!NET.on){$('bAgain').querySelector('b').textContent=fin?'새 대결':`다음 판 ▶ ${S.r+1}판${S.r===2?' · 역할 바꿈':''}`;$('bAgain').disabled=false;$('bHome').textContent='그만하기'}
  else if(!fin){$('bAgain').hidden=true;$('bHome').textContent='나가기';const nxt=roleAt(S.first,S.r+1);box.insertAdjacentHTML('beforeend',`<div class="ser-next">🔁 곧 ${S.r+1}판을 시작해요 · 나는 ${nxt==='hero'?'🍪 도둑':'🧙 마녀'}</div>`)}
  else{$('bAgain').hidden=false}
  return res}
setTimeout(()=>{const ba=$('bAgain'),old=ba.onclick;ba.onclick=e=>{if(SER.on&&!NET.on&&!G.stage&&!G.chal&&!G.duo){$('revealBar').hidden=true;if(!SER.done){serNext();return}serStart(SER.kind,SER.first);return}old&&old(e)}},0);
setTimeout(()=>{const bh=$('bHome'),old=bh.onclick;bh.onclick=e=>{if(SER.on&&!NET.on){SER.on=false;augCancel();clearWorld();roleGo(SER.first);return}old&&old(e)}},0);
{const ts1=titleScreen;titleScreen=function(){SER.on=false;augCancel();ts1()}}
{const ss2=startStage;startStage=function(n){SER.on=false;ss2(n)}}
{const sr0=startRaceAI;startRaceAI=function(){SER.on=false;sr0()}}{const sw0=startWWAI;startWWAI=function(){SER.on=false;sw0()}}

/* ----- 온라인 (친구 방 · 랭크): 4판 ----- */
{const ec1=earnCoins;earnCoins=function(iWon){if(NET.on&&NET.ser&&NET.ser.on)return{n:0,t:'series'};return ec1(iWon)}}
{const ns3=netStart;netStart=function(d){const classic=!d.duo;const r=d.round||1;
  if(classic){if(d.seed!=null)NET.seriesSeed=d.seed;if(r===1||!NET.ser){NET.ser=serNew(NET.rand?'rank':'friend',d.role);NET.ser.seed=NET.seriesSeed||7}if(r>1){const k=NET.stake;delete d.stake;NET.ser.r=r-1;ns3(d);NET.stake=k}else ns3(d);NET.series=null}
  else{NET.ser=null;ns3(d)}}}
{const sr2=startRound;startRound=function(){const S=NET.ser;if(!S||!S.on||NET.duo){return sr2()}S.r++;if(!S.tiers)S.tiers=[null,...tierSeq(seededRnd(S.seed||7))];const r=S.r,role=NET.role,tier=S.tiers[r]||rollTierSeeded(S,r);
  G.over=true;clearWorld();themeBoard(witchLook().theme);camPreview=true;lobby(`${r}판 준비 · 나는 ${role==='hero'?'쿠키 도둑':'과자 마녀'}`,'증강체를 골라요','나가기');
  serPickAug(S,role,tier,ids=>{netSend({t:'aug',r,ids});netSend({t:'augDone',r});S.myDone=r;const go=()=>{if(!NET.on||screen==='play'||screen==='design')return;if(role==='devil')mapPick(()=>sr2());else sr2()};if(S.opDone===r)go();else{lobby(`${r}판 준비`,'상대가 증강체를 고르는 중이에요','나가기');S.waitGo=go}})}}
{const bm2=beginMatch;beginMatch=function(m,k){if(AUGP.on)augForce();bm2(m,k)}}
function augForce(){if(!AUGP.on)return;const ids=shuffle(AUGP.ch.slice()).slice(0,AUGP.n||1);AUGP.on=false;clearInterval(AUGP.h);$('augS').hidden=true;const f=AUGP.cb;AUGP.cb=null;f&&f(ids)}
function rollTierSeeded(S,r){const seed=(S.seed||7)*31+r*977;const x=Math.abs(Math.sin(seed))*1e4%1;return x<.5?'s':x<.85?'g':'p'}
{const hn1=hostNext;hostNext=function(hr){if(NET.on&&!(SET.gmode&&SET.gmode!=='classic')){const r=NET.nextRound||1;if(r===1){NET.seriesSeed=Math.floor(Math.random()*1e6)}}hn1(hr)}}
{const ns4=netStart;netStart=function(d){if(d&&!d.duo){if(d.seed!=null)NET.seriesSeed=d.seed;ns4(d);if(NET.ser)NET.ser.seed=NET.seriesSeed||7}else ns4(d)}}
function serHostAuto(){const S=NET.ser;if(!NET.on||!NET.host||!S||S.done)return;const r=S.r;setTimeout(()=>{if(!NET.on||!NET.ser||NET.ser!==S||S.r!==r||S.done)return;NET.nextRound=r+1;NET.peerReady=true;try{hostNext(roleAt(S.first,r+1))}finally{NET.nextRound=1}},9000)}
{const em2=endMatch;endMatch=function(win,why){const S=NET.on&&NET.ser&&NET.ser.on?NET.ser:null;const was=G.over;em2(win,why);if(!S||was)return;
  if(!S.done){serHostAuto();return}
  // 4판 끝: 판돈·랭크
  const fr=S.res[2];const res=fr&&fr.win?'win':'lose';let txt='';const st=NET.stake|0;
  if(NET.staked){NET.staked=false;if(res==='win'){SAVE.coins+=st*2;txt=COIN_SVG+'상금 +'+st*2+' 코인'}else if(res==='draw'){SAVE.coins+=st;txt=COIN_SVG+'무승부라 판돈을 돌려받았어요'}else txt=COIN_SVG+'판돈 '+st+'코인을 잃었어요';saveGame();syncCoins();netSend({t:'coins',n:SAVE.coins})}
  if(S.kind==='rank'&&res!=='draw'){const rk=rankUpdate(res==='win');if(rk)txt+=`<span class="rs-rank">${tierIcon(tierOfP(rk.s))}${rk.role==='devil'?'마녀':'도둑'} 랭크 ${rk.d>=0?'+':''}${rk.d}점 · ${rankTxtP(rk.s)}${rk.up?` · 올랐어요! ${COIN_SVG}+${rk.rew}`:''}</span>`}
  S.payTxt=txt}}
{const pl1=netPeerLeft;netPeerLeft=function(){const S=NET.ser;if(NET.on&&S&&S.on&&!S.done&&!NET.duo){S.done=true;augCancel();let extra='';if(S.kind==='rank'){const rk=rankUpdate(true);if(rk)extra+=` ${rk.role==='devil'?'마녀':'도둑'} 랭크 +${rk.d}점.`}if(NET.staked){SAVE.coins+=NET.stake*2;NET.staked=false;saveGame();syncCoins();extra+=' 상금 '+NET.stake*2+'코인을 받았어요.'}const wasRoom=inRoom();netLeave();G.over=true;NET.ser=null;lobby('상대가 나갔어요 · 내 승리!',extra+' 처음 화면에서 다시 시작할 수 있어요.','처음으로');return}pl1()}}
// 손님도 다음 판 시작을 자동으로 받도록 (방 '준비' 없이)
{const hn2=hostNext;hostNext=function(hr){if(NET.on&&NET.ser&&NET.ser.on&&!NET.ser.done&&(NET.nextRound||1)>1)NET.peerReady=true;hn2(hr)}}

{const as1=aiSkills;aiSkills=function(){if(SER.on&&SER.aiSk&&!NET.on&&!G.duo)return SER.aiSk.slice();return as1()}}
{const ad1=aiDeck;aiDeck=function(){if(SER.on&&SER.aiDk&&!NET.on&&!G.duo)return SER.aiDk.slice();return ad1()}}
{const sb0=setupSkillBtns;setupSkillBtns=function(){sb0();const S=G.heroSkills||[];for(const k in SKB){const b=$(SKB[k]);if(b)b.classList.toggle('slC',S.indexOf(k)===2)}}}
{const sm=document.querySelector('#bRankGo small');if(sm)sm.textContent='도둑 2판 · 마녀 2판 · 점수 합계'}
{const sr2=showRole;showRole=function(tab){sr2(tab);if(ROLECTX==='rand'&&ROLETAB==='main')$('roleNote').textContent='역할은 고르지 않아요 · 도둑 2판, 마녀 2판 · 도둑으로 얻은 점수 합계로 등급 별 +1 / -1';else if(ROLETAB==='main'&&ROLECTX!=='rand')$('roleNote').textContent='메인 게임은 4판 · 고른 역할로 2판 하고 바꿔서 2판 · 판마다 증강체를 골라요'}}

/* ----- 늘 고를 수 있는 골드 증강체 효과 ----- */
{const dd2=doDash;doDash=function(ai){const h=G.hero,A=G.aug||{},n=h.dashes;dd2(ai);if(h.dashes<=n)return;
  if(A.jellydash){const e=gumEnt(h.x,h.z);e.life=3}
  if(A.candydash&&h.mana<HERO.manaMax){h.mana++;h.manaGot++;h.dashCd+=1;SFX.candy()}else if(A.candydash)h.dashCd+=1;
  if(A.smokedash){burstFx(h.x,h.z,'smoke');for(const e of G.ents)if(isMon(e)&&!e.dead&&e.type!=='ghost'&&Math.hypot(e.x-h.x,e.z-h.z)<5){if(e.ph==='tele'||e.ph==='dash')vanish(e);else e.stun=Math.max(e.stun,1)}}}}
{const mt1=monTick;monTick=function(e,dt,i){const r=mt1(e,dt,i);const A=G.aug||{};if(A.xbomb&&!e.dead&&G.xm&&!e.ally){const[cx,cz]=cellOf(e.x,e.z),k=idx(cx,cz);if(G.xm.has(k)){vanish(e);if(meLoud())say('💥 X 폭탄! 몬스터가 펑',false,1.2);scene.remove(G.xm.get(k));G.xm.delete(k)}}
  if(A.fogmon&&!e.dead&&Math.hypot(e.x-G.hero.x,e.z-G.hero.z)<10)G.mapFog=Math.max(G.mapFog,.3);return r}}
{const vn0=vanish;vanish=function(e,msg){const was=e.dead;vn0(e,msg);if(!was&&(G.aug||{}).monecho&&!e.ally){G.hero.reveal=Math.max(G.hero.reveal||0,2)}}}
{const sg0=sigil;sigil=function(x,z,delay,cb){sg0(x,z,(G.aug||{}).fastsigil&&!G.mirror?delay*.5:delay,cb)}}
{const st3=startTele;startTele=function(e,tx,tz){st3(e,tx,tz);if((G.aug||{}).bigtele&&e.tele){const T=e.tele;T.d+=.3;if(T.r)T.r*=1.3;if(T.w)T.w*=1.3;if(T.len)T.len*=1.15;if(T.mesh){drop(T.mesh);const i=X28.list.indexOf(T.mesh);if(i>=0)X28.list.splice(i,1)}T.mesh=teleMesh(T)}}}
