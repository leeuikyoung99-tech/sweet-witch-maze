/* ================= 33차 (가): 시즌 패스 — 8주 · 50단계 · 무료 줄 / 패스 줄 (9,900원, 결제는 앱에서) ================= */
const SEASON={name:'달콤 별 축제',epoch:Date.UTC(2026,10,7,15),days:56,lv:50,per:320,price:'9,900원'};
// 시즌 한정 꾸미기: 별빛 축제 옷 · 별빛 축제 슬라임
CKCL.star={m:'#ffcf3a',w:'#fff6d8',p:'#7a45e0'};SHOP.cloth.items.star=['별빛 축제',0];
SLIMEC.starfest=['#ffe27a','#d9901a'];SHOP.slime.items.starfest=['별빛 축제',0];
const SEASON_ITEMS=[['cloth','star'],['slime','starfest']];
{const rs=renderShop;renderShop=function(){const r=rs.apply(this,arguments);for(const[c,i]of SEASON_ITEMS)if(!owns(c,i)){const b=document.querySelector(`#shopList .it[data-c="${c}"][data-i="${i}"]`);if(b)b.remove()}return r}}
function seasonIdx(){return Math.max(0,Math.floor((Date.now()-SEASON.epoch)/(SEASON.days*864e5)))}
function seasonLeft(){const end=SEASON.epoch+(seasonIdx()+1)*SEASON.days*864e5;return Math.max(0,Math.ceil((end-Date.now())/864e5))}
function passS(){const i=seasonIdx();let P=SAVE.pass;if(!P||P.s!==i){P=SAVE.pass={s:i,pts:0,prem:false,cf:{},cp:{},bonus:0};saveGame()}return P}
const passLv=()=>Math.min(SEASON.lv,Math.floor(passS().pts/SEASON.per));
// 보상표: c 코인 · b 상자(0 쿠키 1 마카롱 2 컵케이크 3 케이크 4 왕관) · o 꾸미기 · L 전설 카드 고르기
const PASSF={},PASSP={};
for(let l=1;l<=SEASON.lv;l++){
  if(l===10||l===30)PASSF[l]={b:0};else if(l===50)PASSF[l]={b:1};else if(l===25)PASSF[l]={c:150};else PASSF[l]={c:20+Math.floor(l/10)*5};
  PASSP[l]={c:60+Math.floor(l/10)*20}}
Object.assign(PASSP,{10:{b:1},20:{b:2},30:{b:2},40:{b:3},15:{o:['cloth','star']},35:{o:['slime','starfest']},25:{c:300},45:{c:400},50:{L:1}});
function passAdd(n,why){if(!n||window.__aiBoth||window.__simFast)return;const P=passS(),before=passLv();P.pts+=n;saveGame();PASSV.gain=(PASSV.gain||0)+n;if(passLv()>before)PASSV.up=1;syncPassBadge()}
const PASSV={};
// 패스 점수: 이기면 10 · 지면 5 · 벽 퍼즐 8 · 매일 미션 30 · 미션 다 깨기 50
{const em=endMatch;endMatch=function(win,why){const was=G.over;const r=em.apply(this,arguments);
  try{if(!was&&G.over&&!G.tutor&&!(typeof TU!=='undefined'&&TU.on)){const role=NET.on?NET.role:G.mode,me=role==='devil'?!win:!!win;PASSV.gain=0;passAdd(me?10:5);const g=PASSV.gain;setTimeout(()=>{const el=$('resXP');if(el&&g&&!el.querySelector('.rx-pass'))el.insertAdjacentHTML('beforeend',`<span class="rx-pass">패스 +${g}</span>`)},2900)}}catch(e){}return r}}
{const pw=pzWin;pzWin=function(){passAdd(8);return pw.apply(this,arguments)}}
{const mc=misClaim;misClaim=function(i){const c0=SAVE.coins;const r=mc.apply(this,arguments);if(SAVE.coins>c0)passAdd(i==='b'?50:30);return r}}
// ----- 받기 -----
function passCan(kind,l){const P=passS();if(l>passLv())return false;const R=kind==='f'?PASSF[l]:PASSP[l];if(!R)return false;if(kind==='p'&&!P.prem)return false;return!(kind==='f'?P.cf:P.cp)[l]}
function passBonusCan(){const P=passS();if(!P.prem||passLv()<SEASON.lv)return 0;return Math.max(0,Math.floor((P.pts-SEASON.lv*SEASON.per)/SEASON.per)-(P.bonus|0))}
function passGive(R){if(R.c){SAVE.coins+=R.c;syncCoins()}if(R.b!=null){SAVE.boxes=SAVE.boxes||[];SAVE.boxes.push(R.b)}if(R.o){SAVE.own[R.o[0]+':'+R.o[1]]=1}if(R.L)SAVE.legPick=(SAVE.legPick|0)+1}
function passClaim(kind,l){if(!passCan(kind,l)){SFX.deny();return}const P=passS(),R=kind==='f'?PASSF[l]:PASSP[l];(kind==='f'?P.cf:P.cp)[l]=1;passGive(R);saveGame();SFX.card();passDraw();syncPassBadge();passAfter(R)}
function passAll(){const P=passS();let got=[];for(let l=1;l<=passLv();l++)for(const k of['f','p'])if(passCan(k,l)){const R=k==='f'?PASSF[l]:PASSP[l];(k==='f'?P.cf:P.cp)[l]=1;passGive(R);got.push(R)}
  const bn=passBonusCan();if(bn){P.bonus=(P.bonus|0)+bn;SAVE.coins+=bn*100;syncCoins();got.push({c:bn*100})}
  if(!got.length){SFX.deny();return}saveGame();SFX.card();passDraw();syncPassBadge();passAfter(got.find(R=>R.L)||got.find(R=>R.b!=null)||got[0])}
function passAfter(R){if(R&&R.o)tMsg(`${SHOP[R.o[0]].items[R.o[1]][0]} ${SHOP[R.o[0]].t}을 받았어요 · 꾸미기에서 입어요`);
  if(R&&(R.b!=null)&&SAVE.boxes&&SAVE.boxes.length){setTimeout(()=>{try{pgBoxes()}catch(e){}},150);return}if(R&&R.L)setTimeout(legPickOpen,150)}
function legPickOpen(){if(!(SAVE.legPick>0))return;const L=[];for(const kind of['c','s'])for(const k in GRADE[kind]){if(GRADE[kind][k]!==3)continue;if(kind==='c'?cardOpen(k):skillOpen(k))continue;L.push([kind,k])}$('pgM').hidden=false;
  if(!L.length){SAVE.legPick--;SAVE.coins+=GR_P[3];saveGame();syncCoins();$('pgBody').innerHTML=`<h2>${COIN_SVG} ${GR_P[3]}코인</h2><p class="note">전설을 모두 가지고 있어서 코인으로 받았어요</p><button class="mbtn berry small" id="bLpOk"><span class="mt"><b>좋아요</b></span></button>`;$('bLpOk').onclick=()=>{SFX.click();pgClose()};return}
  $('pgBody').innerHTML=`<h2>전설 카드 1장 고르기</h2><div class="cp-grid">${L.map(([kind,k])=>`<div class="cp-c" data-kind="${kind}" data-k="${k}">${dkTile(k,kind==='c','mini')}</div>`).join('')}</div>`;
  for(const c of $('pgBody').querySelectorAll('.cp-c'))c.onclick=()=>{SFX.card();unlockItem(c.dataset.kind,c.dataset.k);SAVE.legPick--;saveGame();pgClose()}}
// ----- 화면 -----
{const b=document.createElement('button');b.className='sbtn tiny';b.id='bPass';b.innerHTML=`<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="10" width="36" height="28" rx="6" fill="#ffd35f" stroke="#4a2a1a" stroke-width="3"/><path d="M6 20 H42" stroke="#4a2a1a" stroke-width="3"/><path d="M24 23 l2.6 5.2 5.6.8-4 4 1 5.6-5.2-2.8-5.2 2.8 1-5.6-4-4 5.6-.8z" fill="#fff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>패스<i class="bdg" id="passBdg"></i>`;
  $('bMis').before(b);b.onclick=()=>{SFX.click();passOpen()}}
function passClaimable(){let n=0;for(let l=1;l<=passLv();l++)for(const k of['f','p'])if(passCan(k,l))n++;return n+passBonusCan()}
function syncPassBadge(){const b=$('passBdg');if(!b)return;const n=passClaimable();b.textContent=n?n:'';b.hidden=!n}
{const m=document.createElement('div');m.className='scr';m.id='passM';m.hidden=true;
  m.innerHTML=`<div class="ps31"><div class="ps-top"><button class="ic-back" id="bPassX" aria-label="뒤로"></button><div class="ps-tt"><b>시즌 ${seasonIdx()+1} · ${SEASON.name}</b><span id="psLeft"></span></div><div class="ps-lv"><span class="ps-badge" id="psLv"></span><div class="ps-bar"><i id="psBar"></i></div><small id="psPts"></small></div><button class="sbtn ps-all" id="bPassAll">모두 받기</button></div>
    <div class="ps-track"><div class="ps-lab"><span class="pr">패스</span><span class="mid"></span><span>무료</span></div><div class="ps-scroll" id="psScroll"></div></div>
    <div class="ps-foot" id="psFoot"></div></div>`;document.body.appendChild(m);
  $('bPassX').onclick=()=>{SFX.click();m.hidden=true;syncPassBadge()};$('bPassAll').onclick=()=>passAll();
  $('psScroll').addEventListener('click',e=>{const c=e.target.closest('[data-k]');if(c)passClaim(c.dataset.k,+c.dataset.l)})}
function passOpen(){$('passM').hidden=false;passDraw();const L=passLv(),sc=$('psScroll');requestAnimationFrame(()=>{sc.scrollLeft=Math.max(0,(L-2)*86)})}
function passIc(R){if(!R)return'';if(R.c)return`<span class="pi-c">${COIN_SVG}<b>${R.c}</b></span>`;if(R.b!=null)return`<span class="pi-b">${boxSvg(R.b)}</span>`;if(R.o)return`<span class="pi-o">${itemIcon(R.o[0],R.o[1])}</span>`;
  if(R.L)return`<span class="pi-L"><svg viewBox="0 0 40 48"><path d="M8 3 H32 L37 9 V45 H3 V9 Z" fill="#ffcf3a" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><path d="M20 14 l3.4 7 7.6 1-5.5 5.3 1.4 7.6-6.9-3.7-6.9 3.7 1.4-7.6-5.5-5.3 7.6-1z" fill="#fff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg></span>`;return''}
function passDraw(){const P=passS(),L=passLv();$('psLeft').textContent=`${seasonLeft()}일 남음`;$('psLv').textContent=L;const into=L>=SEASON.lv?SEASON.per:P.pts-L*SEASON.per;
  $('psBar').style.width=Math.min(100,into/SEASON.per*100)+'%';$('psPts').textContent=L>=SEASON.lv?'완료':`${into} / ${SEASON.per}`;
  let h='';for(let l=1;l<=SEASON.lv;l++){const f=PASSF[l],p=PASSP[l],reach=l<=L;
    const cell=(k,R,got)=>`<div class="ps-cell ${k}${R?'':' none'}${reach?' reach':''}${got?' got':''}${R&&passCan(k,l)?' can':''}${k==='p'&&!P.prem?' lock':''}" ${R?`data-k="${k}" data-l="${l}"`:''}>${passIc(R)}</div>`;
    h+=`<div class="ps-col${reach?' reach':''}${l===L?' cur':''}">${cell('p',p,P.cp[l])}<span class="ps-n"><i>${l}</i></span>${cell('f',f,P.cf[l])}</div>`}
  $('psScroll').innerHTML=h;
  $('psFoot').innerHTML=P.prem?`<span class="ps-own">패스 사용 중 · 50단계 뒤에는 ${SEASON.per}점마다 100코인</span>`:`<button class="mbtn berry ps-buy" id="bPassBuy"><span class="mt"><b>패스 열기 · ${SEASON.price}</b></span></button>`;
  const bb=$('bPassBuy');if(bb)bb.onclick=()=>{SFX.click();if(SAVE.dev){P.prem=true;saveGame();passDraw();syncPassBadge();return}infoOpen(`<h3>시즌 패스</h3><p class="info31p">앱으로 출시되면 구글 결제로 열 수 있어요.<br>패스를 열면 지금까지 올라간 단계의 패스 보상을 한 번에 받아요.</p>`)}}
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);try{syncPassBadge()}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`
#bPass{position:relative}#passBdg{position:absolute;right:-6px;top:-8px}
#passM{z-index:33;background:radial-gradient(ellipse at 50% -10%,#5a4a9a 0%,#2e2556 45%,#1b1534 100%)!important;padding:0!important}
#passM::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(#fff8 1px,#fff0 1.6px) 0 0/46px 46px,radial-gradient(#ffe48a99 1.2px,#fff0 1.8px) 23px 17px/58px 58px}
.ps31{position:relative;width:100%;height:100%;display:flex;flex-direction:column;gap:8px;padding:8px max(14px,env(safe-area-inset-right,0px)) 10px max(14px,env(safe-area-inset-left,0px));box-sizing:border-box}
.ps-top{display:flex;align-items:center;gap:12px;min-height:50px}.ps-top .ic-back{position:static!important;flex:none}
.ps-tt{display:flex;flex-direction:column;gap:2px;flex:none}.ps-tt b{font:clamp(17px,5.4vh,22px) var(--f-display);color:#ffe9a8;white-space:nowrap;text-shadow:0 2px 0 #1b1534}.ps-tt span{font:14px var(--f-display);color:#c9bdf0}
.ps-lv{flex:1;min-width:120px;display:flex;align-items:center;gap:8px}
.ps-badge{flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font:19px var(--f-display);color:#4a2a1a;background:radial-gradient(circle at 35% 30%,#fff6c8,#ffcf3a 55%,#e09a1a);border:3px solid #4a2a1a;box-shadow:0 3px 0 #120e24,0 0 12px #ffcf3a88}
.ps-bar{flex:1;height:16px;border:3px solid #120e24;border-radius:10px;background:#3a3068;overflow:hidden}.ps-bar i{display:block;height:100%;background:linear-gradient(90deg,#ffcf3a,#fff0a8)}
.ps-lv small{font:14px var(--f-display);color:#ffe9a8;white-space:nowrap}
.ps-all{flex:none;min-height:42px;padding:4px 14px;font-size:15px}
.ps-track{flex:1;min-height:0;display:flex;gap:6px}
.ps-lab{flex:none;width:40px;display:flex;flex-direction:column;gap:0;padding:8px 0 10px}
.ps-lab span{flex:1;display:grid;place-items:center;writing-mode:vertical-rl;font:15px var(--f-display);border-radius:12px;border:3px solid #120e24;letter-spacing:.1em}
.ps-lab .pr{color:#4a2a1a;background:linear-gradient(#fff0a8,#ffcf3a 60%,#e09a1a)}.ps-lab span:last-child{color:#4a2a1a;background:#efe6ff}.ps-lab .mid{flex:none;height:30px;border:0}
.ps-scroll{flex:1;min-width:0;display:flex;gap:0;overflow-x:auto;overflow-y:hidden;padding:8px 0 10px;scroll-behavior:smooth}
.ps-col{flex:0 0 84px;display:flex;flex-direction:column;gap:0}
.ps-n{position:relative;height:30px;flex:none;display:grid;place-items:center}
.ps-n::before{content:"";position:absolute;left:0;right:0;top:50%;height:6px;transform:translateY(-50%);background:#3a3068}
.ps-col.reach .ps-n::before{background:#ffcf3a}
.ps-n i{position:relative;font:13px/22px var(--f-display);font-style:normal;min-width:22px;height:22px;padding:0 4px;box-sizing:border-box;border-radius:11px;text-align:center;color:#c9bdf0;background:#2e2556;border:2px solid #5a4a9a}
.ps-col.reach .ps-n i{color:#4a2a1a;background:#ffcf3a;border-color:#4a2a1a}.ps-col.cur .ps-n i{transform:scale(1.25);box-shadow:0 0 10px #ffcf3a}
.ps-cell{position:relative;flex:1;display:grid;place-items:center;cursor:pointer}
.ps-cell.p{background:linear-gradient(#4f4198,#392d70);border-top:3px solid #ffcf3a;border-bottom:3px solid #ffcf3a}
.ps-cell.f{background:linear-gradient(#f3eeff,#ddd2f7);border-top:3px solid #b9a8e6;border-bottom:3px solid #b9a8e6}
.ps-col:first-child .ps-cell{border-left:3px solid;border-radius:16px 0 0 16px}.ps-col:last-child .ps-cell{border-right:3px solid;border-radius:0 16px 16px 0}
.ps-col:first-child .ps-cell.p,.ps-col:last-child .ps-cell.p{border-left-color:#ffcf3a;border-right-color:#ffcf3a}.ps-col:first-child .ps-cell.f,.ps-col:last-child .ps-cell.f{border-left-color:#b9a8e6;border-right-color:#b9a8e6}
.ps-cell>span{position:relative;width:min(70px,86%);aspect-ratio:1;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;box-sizing:border-box}
.ps-cell.p>span{background:radial-gradient(circle at 50% 35%,#6c5ac8,#33286a 75%);border:3px solid #ffcf3a;box-shadow:0 3px 0 #120e24,inset 0 2px 0 #ffffff33}
.ps-cell.f>span{background:radial-gradient(circle at 50% 35%,#fff,#e6defa 75%);border:3px solid #9d8ad8;box-shadow:0 3px 0 #6d5bb0,inset 0 2px 0 #fff}
.ps-cell:not(.reach)>span{filter:saturate(.7) brightness(.88)}
.pi-c svg{width:32px;height:32px;filter:drop-shadow(0 2px 0 #0004)}.pi-c b{font:15px/1.1 var(--f-display);color:#4a2a1a}.ps-cell.p .pi-c b{color:#ffe9a8}
.pi-b svg{width:52px;height:52px}.pi-o>*{width:46px;height:46px}.pi-L svg{width:36px;height:42px}
.ps-cell.can>span{animation:psGlow 1.3s ease-in-out infinite}@keyframes psGlow{0%,100%{box-shadow:0 3px 0 #120e24,0 0 0 3px #fff,0 0 10px 4px #ffcf3a}50%{box-shadow:0 3px 0 #120e24,0 0 0 3px #fff,0 0 20px 9px #ffcf3a}}
.ps-cell.got>span{filter:grayscale(.4) brightness(.8)}.ps-cell.got>span::after{content:"";position:absolute;right:-4px;bottom:-2px;width:24px;height:24px;border-radius:50%;background:#2fbf73 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5 L10 16.5 L18 8' fill='none' stroke='%23fff' stroke-width='3.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/18px no-repeat;border:2px solid #4a2a1a}
.ps-cell.lock>span::before{content:"";position:absolute;right:-4px;top:-4px;width:22px;height:22px;border-radius:50%;background:#2e2556 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='5' y='11' width='14' height='10' rx='3' fill='%23ffd35f' stroke='%234a2a1a' stroke-width='2'/%3E%3Cpath d='M8.5 11 V8 a3.5 3.5 0 0 1 7 0 V11' fill='none' stroke='%23ffd35f' stroke-width='2.4'/%3E%3C/svg%3E") center/16px no-repeat;border:2px solid #ffcf3a;z-index:2}
.ps-foot{display:flex;justify-content:center;min-height:48px;align-items:center}
.ps-buy{min-height:48px;padding:6px 26px;background:linear-gradient(#fff0a8,#ffcf3a 55%,#e09a1a)!important}.ps-buy b{font:19px var(--f-display);color:#4a2a1a!important;text-shadow:0 1px 0 #fff8}
.ps-own{font:15px var(--f-display);color:#ffe9a8;background:#2e2556;border:3px solid #ffcf3a;border-radius:14px;padding:6px 14px}
.rx-pass{margin-left:8px;font:13px var(--f-display);color:#4a2a1a;background:#ffcf3a;border-radius:8px;padding:1px 8px}
`;document.head.appendChild(st)}
