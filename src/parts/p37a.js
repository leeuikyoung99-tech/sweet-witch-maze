/* ================= 37차: 결과 '지도 보기' 확대 · 게임 시작 순서 (맵 → 증강체) ================= */
// ----- 지도 보기: 두 손가락으로 벌리면 확대, 한 손가락으로 끌면 이동, 오른쪽 아래 + / − / 전체 버튼 -----
const RVZ={p:new Map(),d0:0,dist0:0,base:122,last:null};
const rvOn=()=>screen==='result'&&G.reveal&&!$('revealBar').hidden&&$('result').hidden;
{const rm=revealMap;revealMap=function(){const r=rm.apply(this,arguments);RVZ.base=DC.dist;RVZ.home={tx:DC.tx,tz:DC.tz,d:DC.dist};return r}}
const rvClamp=()=>{const W=N*C;DC.dist=clamp(DC.dist,RVZ.base*.22,RVZ.base*1.1);const free=1-DC.dist/RVZ.base;const m=W*.5*Math.max(0,free)+12;
  DC.tx=clamp(DC.tx,W/2-m,W/2+m);DC.tz=clamp(DC.tz,W/2-m,W/2+m+8)};
function rvZoom(f){DC.dist*=f;rvClamp()}
{const cv=$('cv');
  cv.addEventListener('pointerdown',e=>{if(!rvOn())return;RVZ.p.set(e.pointerId,{x:e.clientX,y:e.clientY});try{cv.setPointerCapture(e.pointerId)}catch(_){}
    if(RVZ.p.size===2){const q=[...RVZ.p.values()];RVZ.d0=Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y);RVZ.dist0=DC.dist}});
  cv.addEventListener('pointermove',e=>{if(!RVZ.p.has(e.pointerId)||!rvOn())return;const pr=RVZ.p.get(e.pointerId);const dx=e.clientX-pr.x,dy=e.clientY-pr.y;pr.x=e.clientX;pr.y=e.clientY;
    if(RVZ.p.size>=2){const q=[...RVZ.p.values()];const d=Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y);if(RVZ.d0>0){DC.dist=RVZ.dist0*RVZ.d0/Math.max(20,d);rvClamp()}return}
    const k=DC.dist/innerHeight*1.1;DC.tx-=dx*k;DC.tz-=dy*k;rvClamp()});
  const up=e=>{RVZ.p.delete(e.pointerId);if(RVZ.p.size<2)RVZ.d0=0};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  cv.addEventListener('wheel',e=>{if(!rvOn())return;e.preventDefault();e.stopImmediatePropagation();rvZoom(e.deltaY>0?1.12:1/1.12)},{passive:false,capture:true})}
{const z=document.createElement('div');z.id='rvZoom';z.hidden=true;
  z.innerHTML=`<button id="bRvIn" aria-label="확대">+</button><button id="bRvOut" aria-label="축소">−</button><button id="bRvAll" class="rv-all">전체</button>`;
  document.body.appendChild(z);
  $('bRvIn').onclick=()=>{SFX.click();rvZoom(.75)};$('bRvOut').onclick=()=>{SFX.click();rvZoom(1/.75)};
  $('bRvAll').onclick=()=>{SFX.click();if(RVZ.home){DC.tx=RVZ.home.tx;DC.tz=RVZ.home.tz;DC.dist=RVZ.home.d}};
  const sync=()=>{z.hidden=!rvOn()};new MutationObserver(sync).observe($('revealBar'),{attributes:true,attributeFilter:['hidden']});new MutationObserver(sync).observe($('result'),{attributes:true,attributeFilter:['hidden']});
  // 결과 화면으로 돌아가면 다음에 지도를 볼 때 다시 전체 모습부터
  $('bResBack').addEventListener('click',()=>{if(RVZ.home){DC.tx=RVZ.home.tx;DC.tz=RVZ.home.tz;DC.dist=RVZ.home.d}});
  const st=document.createElement('style');st.textContent=`#rvZoom{position:fixed;right:calc(14px + env(safe-area-inset-right,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:16;display:flex;flex-direction:column;gap:8px}
#rvZoom[hidden]{display:none}
#rvZoom button{width:48px;height:48px;border-radius:14px;border:3px solid var(--choco);background:#fff8f0;color:var(--choco);font:28px/1 var(--f-display);box-shadow:0 4px 0 var(--choco);cursor:pointer;display:grid;place-items:center;padding:0}
#rvZoom button:active{transform:translateY(3px);box-shadow:0 1px 0 var(--choco)}
#rvZoom .rv-all{font-size:13px}`;document.head.appendChild(st)}
// ----- 혼자 하기: 맵을 먼저 고르고, 그다음 증강체 -----
serNext=function(){const S=SER;S.r++;const role=roleAt(S.first,S.r),tier=(S.tiers&&S.tiers[S.r])||rollTier();aiAug(S,swapR(role),tier);if(S.bonusOp&&S.bonusOp[S.r])aiAug(S,swapR(role),tier);
  mapPick(()=>serPickAug(S,role,tier,()=>{if(!isFull())goFull(true);if(role==='hero')beginMatch('hero');else startDesign()}),role==='hero'?'hero':undefined)};
// ----- 온라인 (친구 방 · 랭크): 마녀 쪽이 맵을 먼저 고르고 증강체를 골라요 -----
{const sr0=startRound;startRound=function(){const S=NET.ser;if(!S||!S.on||NET.duo||NET.role!=='devil'||S.map)return sr0();
  // 첫 판 마녀: 증강체 고르기 전에 맵부터
  const pa=serPickAug;serPickAug=function(S2,role,tier,cb){serPickAug=pa;mapPick(()=>pa(S2,role,tier,cb))};
  try{return sr0()}finally{if(serPickAug!==pa&&!AUGP.on&&$('mapM').hidden)serPickAug=pa}}}
// ----- 행운 상자 · 운명의 쿠키 · 마녀의 룰렛: 판이 시작할 때 무엇이 나왔는지 카드로 보여 줘요 -----
augDesc('tn_lucky','무작위 프리즘 1개 +|골드 1개 (대결 내내)');
augDesc('tn_fate','판이 시작할 때마다|주사위로 좋은 효과 1개');
const ROULT=['소다 +2','손패 +1 · 소다 +4','대박! 소다 1.3배'];
function gachaShow(items){let M=$('gachaM');if(!M){M=document.createElement('div');M.id='gachaM';document.body.appendChild(M);M.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();M.hidden=true})}
  M.innerHTML=`<div class="gc-row">${items.map(it=>{const src=AUGI2[it.from];return`<div class="gc-wrap"><div class="gc-src">${augIcon(it.from,true)}<b>${src?src.n:''}</b></div><div class="gc-k">${it.id?'이번 판에 받은 증강체':'이번 판 효과'}</div>
    <div class="gc-card">${it.id?augCard(it.id):`<div class="gc-fx t-${src?src.tier:'g'}">${augIcon(it.from)}<b>${it.txt}</b></div>`}</div></div>`}).join('')}</div><div class="gc-tap">눌러서 닫기</div>`;
  M.hidden=false;M.classList.remove('go');void M.offsetWidth;M.classList.add('go');try{SFX.magic()}catch(e){}
  clearTimeout(gachaShow.h);gachaShow.h=setTimeout(()=>{M.hidden=true},3000)}
{const nm=newMatch;newMatch=function(mode){nm.apply(this,arguments);G.gachaQ=null;if(G.duo)return;const A=G.aug||{};const items=[];
  if(A.luckyNew&&A.lucky&&G.mode==='hero')items.push({from:'tn_lucky',id:A.lucky});if(A.luckyNew&&A.lucky2&&G.mode==='hero')items.push({from:'tn_lucky',id:A.lucky2});
  if(A.fate!=null&&G.mode==='hero')items.push({from:'tn_fate',txt:FATE[A.fate][0]});
  if(A.roul!=null&&G.mode==='devil')items.push({from:'wn_roul',txt:ROULT[A.roul]});
  if(!items.length)return;G.gachaQ=items.slice();setTimeout(()=>{if(G.gachaQ)gachaShow(G.gachaQ)},350)}}
// 예전 짧은 알림은 카드로 보여 줬으니 빼요
{const s0=say;say=function(t){if(typeof t==='string'&&/^(운명의 쿠키|행운 상자|마녀의 룰렛): /.test(t)&&G.gachaQ)return;return s0.apply(this,arguments)}}
// 증강체 목록: 행운 상자 옆에 이번 판에 나온 증강체도 같이
{const ac=augChips;augChips=function(list){let h=ac(list);const L=G.aug&&G.aug.lucky;if(L&&list&&list.includes('tn_lucky')&&(isPlaying()||screen==='result'||screen==='pause')){const a=AUGI2[L];
    const L2=G.aug.lucky2,a2=L2&&AUGI2[L2];if(a)h=h.replace(/(<button class="ag-chip[^"]*" data-id="tn_lucky"[\s\S]*?<\/button>)/,`$1<i class="ag-arrow">▸</i><button class="ag-chip t-${a.tier} ag-got" data-id="${L}" title="${a.n}">${augIcon(L,true)}</button>`+(a2?`<button class="ag-chip t-${a2.tier} ag-got" data-id="${L2}" title="${a2.n}">${augIcon(L2,true)}</button>`:''))}return h}}
{const hs=augHudSync;augHudSync=function(){const el=$('augHud');const L=((G.aug&&G.aug.lucky)||'')+((G.aug&&G.aug.lucky2)||'');if(el&&el.dataset.lk!==L){el.dataset.lk=L;el.dataset.k=''}return hs()}}
{const st=document.createElement('style');st.textContent=`
#gachaM{position:fixed;inset:0;z-index:95;display:grid;place-items:center;background:radial-gradient(circle at 50% 50%,#2a1a4af2,#1a0f2ee0 75%);cursor:pointer}
#gachaM[hidden]{display:none}
#gachaM{grid-template-rows:auto auto;align-content:center;gap:4px}#gachaM .gc-row{display:flex;gap:22px;justify-content:center}#gachaM .gc-wrap{display:flex;flex-direction:column;align-items:center;gap:6px}
#gachaM .gc-src{display:flex;align-items:center;gap:6px;color:#ffe9a8;font:16px var(--f-display)}#gachaM .gc-src svg{width:26px;height:26px}
#gachaM .gc-k{color:#fff;font:13px var(--f-ui);opacity:.9}
#gachaM .gc-card{perspective:600px;display:flex;justify-content:center}#gachaM .gc-card .ag-card{width:164px;flex:0 0 164px;height:min(220px,56vh)}#gachaM .gc-card .ag-card{pointer-events:none;transform-origin:50% 50%}
#gachaM.go .gc-card>*{animation:gcIn .6s cubic-bezier(.2,1.4,.4,1) both}
#gachaM .gc-fx{display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 22px;border-radius:18px;background:#2a1a4a;border:3px solid #ffd36b;color:#fff;box-shadow:0 0 30px #ffd36b88}
#gachaM .gc-fx svg{width:64px;height:64px}#gachaM .gc-fx b{font:18px var(--f-display);color:#ffe9a8;text-align:center}
#gachaM .gc-tap{color:#ffffffaa;font:11px var(--f-ui);margin-top:10px;text-align:center}body:has(#gachaM:not([hidden])) #cdn{opacity:0}
@keyframes gcIn{0%{transform:rotateY(90deg) scale(.6);opacity:0}60%{opacity:1}100%{transform:rotateY(0) scale(1);opacity:1}}
.ag-arrow{font-style:normal;color:#b48a5a;font-size:11px;margin:0 -2px;align-self:center}
.ag-chip.ag-got{box-shadow:0 0 0 2px #ffd36b}`;document.head.appendChild(st)}
// 버튼 '똑' 소리가 두 번 나지 않게: 아주 짧은 사이에 또 부르면 한 번만 내요 (화면 전체 공통 소리 + 버튼 자체 소리가 겹칠 때)
{const c0=SFX.click;let t0=0;SFX.click=function(){const n=performance.now();if(n-t0<200)return;t0=n;return c0.apply(this,arguments)}}
