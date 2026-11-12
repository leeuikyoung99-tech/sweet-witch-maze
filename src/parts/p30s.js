/* ================= 30차 (서): 카드 등급 · 레벨 · 상자 ================= */
// 카드 등급: 1 일반 200코인, 2 희귀 400코인, 3 전설 700코인 (처음부터 가진 카드는 기본)
const GRADE={c:{bear:3,choco:3,spin:2,bat:2,spider:2,soldier:2,ice:2,fog:1,rev:1,eye:1,magnet:3},
  s:{tele:3,smoke:3,freeze:3,lure:2,xray:2,brick:2,compass:2,dash2:1,scope:1,clean:1,heal:1}};
const GR_N=['기본','일반','희귀','전설'],GR_P=[0,200,400,700],GR_C=['#c9b49a','#6cc35a','#4f9dff','#ffa51f'];
const grOf=(kind,k)=>GRADE[kind][k]||0;
unlPrice=(kind,k)=>GR_P[grOf(kind,k)]||200;
{const dt=dkTile;dkTile=function(k,W,a){const h=dt(k,W,a),g=grOf(W?'c':'s',k);return h.replace('class="dk ',`class="dk gr${g} `)}}
{const dt=deckTap;deckTap=function(a,k){const r=dt(a,k);try{const W=DECKV.tab==='witch',t=$('deckSel').querySelector('.dk-buy-t');if(t&&!t.querySelector('.gr-l')){const g=grOf(W?'c':'s',k);t.insertAdjacentHTML('afterbegin',`<span class="gr-l" style="--gc:${GR_C[g]}">${GR_N[g]}</span>`)}}catch(e){}return r}}

// 레벨: 이기면 30, 지면 15. 필요한 경험치는 레벨마다 10씩 늘어요 (최대 300)
SAVE.lv=Math.max(1,SAVE.lv|0);SAVE.xp=Math.max(0,SAVE.xp|0);SAVE.boxes=Array.isArray(SAVE.boxes)?SAVE.boxes:[];
const xpNeed=L=>Math.min(300,60+10*(L-1));
const LV_COIN=50;
// 10레벨마다 상자: 10 쿠키, 20 마카롱, 30 컵케이크, 40 케이크, 50 왕관 (그다음 다시 쿠키부터)
const lvBox=L=>((L/10-1)%5+5)%5;
function addXP(n){const r={n,lv0:SAVE.lv,coins:0,boxes:[]};SAVE.xp+=n;
  while(SAVE.xp>=xpNeed(SAVE.lv)){SAVE.xp-=xpNeed(SAVE.lv);SAVE.lv++;SAVE.coins+=LV_COIN;r.coins+=LV_COIN;if(SAVE.lv%10===0){const t=lvBox(SAVE.lv);SAVE.boxes.push(t);r.boxes.push(t)}}
  saveGame();syncCoins();try{syncProf()}catch(e){}return r}
{const rc=$('resCoin');if(rc){const d=document.createElement('div');d.id='resXP';d.className='res-xp';rc.after(d)}}
function showXP(x){const el=$('resXP');if(!el)return;if(!x){el.innerHTML='';return}const need=xpNeed(SAVE.lv);
  el.innerHTML=`<b>Lv ${SAVE.lv}</b><span class="xpb"><i style="width:${Math.round(SAVE.xp/need*100)}%"></i></span><small>경험치 +${x.n}</small>`+
    (x.lv0<SAVE.lv?`<em>레벨 업! ${COIN_SVG}+${x.coins}</em>`:'')+(x.boxes.length?`<em>상자 +${x.boxes.length}</em>`:'')}
{const em=endMatch;endMatch=function(win,why){const was=G.over;const r=em.apply(this,arguments);
  if(!was&&G.over&&!window.__aiBoth&&!window.__simFast&&!G.tutor){try{const role=NET.on?NET.role:G.mode,me=role==='devil'?!win:!!win;showXP(addXP(me?30:15))}catch(e){}}else if(!was&&G.over)showXP(null);return r}}

// 랭크가 처음 오를 때: 코인 대신 그 랭크의 상자
TIER_REW.fill(0);
{const ru=rankUpdate;rankUpdate=function(win){const role=NET.role==='devil'?'devil':'hero',R=RKS(role),b0=R.best|0;const rk=ru(win);
  if(rk&&(R.best|0)>b0){for(let t=b0+1;t<=(R.best|0);t++)SAVE.boxes.push(t);saveGame();rk.box=true;try{syncProf()}catch(e){}}return rk}}

// 상자 열기: 마녀 카드·도둑 스킬 중 고르고, 상자 등급이 높을수록 좋은 카드가 잘 나와요
const BOXP=[[80,20,0],[60,35,5],[40,45,15],[20,50,30],[0,50,50]];
const boxName=t=>TIERS[t][0]+' 상자';
function boxSvg(t){const c=TIERS[t][1];return`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="27" width="44" height="29" rx="5" fill="${c}" stroke="#4a2a1a" stroke-width="3"/><rect x="7" y="18" width="50" height="12" rx="4" fill="${c}" stroke="#4a2a1a" stroke-width="3"/><rect x="28" y="18" width="8" height="38" fill="#fff8ee" stroke="#4a2a1a" stroke-width="2.5"/><path d="M32 18 C25 7 14 9 19 16 Q24 19 32 18 Z M32 18 C39 7 50 9 45 16 Q40 19 32 18 Z" fill="#fff8ee" stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 31 h8" stroke="#ffffff99" stroke-width="3" stroke-linecap="round"/></svg>`}
function boxRoll(t,kind){const p=BOXP[t];const r=Math.random()*100,g=r<p[0]?1:r<p[0]+p[1]?2:3;const own=kind==='c'?cardOpen:skillOpen;
  const c=Object.keys(GRADE[kind]).filter(k=>GRADE[kind][k]===g&&!own(k));if(!c.length){SAVE.coins+=GR_P[g];saveGame();syncCoins();return{g,coins:GR_P[g]}}
  const k=c[Math.floor(Math.random()*c.length)];unlockItem(kind,k);return{g,k}}
{const m=document.createElement('div');m.className='scr';m.id='pgM';m.hidden=true;m.style.cssText='z-index:31;background:#4a2a1a66';m.innerHTML='<div class="slab pg-slab" id="pgBody"></div>';document.body.appendChild(m)}
function pgClose(){$('pgM').hidden=true;try{syncProf()}catch(e){}}
function pgBoxes(){const B=SAVE.boxes;if(!B.length)return pgClose();const t=B[0];$('pgM').hidden=false;
  $('pgBody').innerHTML=`<div class="kicker">상자 ${B.length}개</div><div class="pg-box">${boxSvg(t)}</div><h2>${boxName(t)}</h2><p class="pg-odds">${['일반','희귀','전설'].map((n,i)=>BOXP[t][i]?`<span style="--gc:${GR_C[i+1]}">${n} ${BOXP[t][i]}%</span>`:'').join('')}</p><p class="note">무엇을 열까요?</p>
    <div class="row pg-two"><button class="mbtn berry small" data-k="c"><span class="mt"><b>마녀 카드</b></span></button><button class="mbtn mint small" data-k="s"><span class="mt"><b>도둑 스킬</b></span></button></div><button class="sbtn" id="bPgLater">나중에</button>`;
  $('bPgLater').onclick=()=>{SFX.click();pgClose()};
  for(const b of $('pgBody').querySelectorAll('.pg-two button'))b.onclick=()=>{SFX.click();const kind=b.dataset.k,res=boxRoll(t,kind);B.shift();saveGame();
    const bx=$('pgBody').querySelector('.pg-box');bx.classList.add('shake');$('pgBody').querySelector('.pg-two').remove();$('bPgLater').remove();
    setTimeout(()=>{SFX.win();const W=kind==='c',nm=res.k?(W?CARDS[res.k].n:SKN[res.k][0]):'';
      $('pgBody').innerHTML=`<div class="kicker">${boxName(t)}</div>`+(res.k?`<div class="pg-card">${dkTile(res.k,W,'box')}</div><h2><span class="gr-l" style="--gc:${GR_C[res.g]}">${GR_N[res.g]}</span> ${nm}</h2><p class="note">카드·스킬 화면에서 덱에 넣을 수 있어요</p>`
        :`<div class="pg-box">${boxSvg(t)}</div><h2>${COIN_SVG} ${res.coins}코인</h2><p class="note">${GR_N[res.g]} ${W?'카드':'스킬'}를 모두 가지고 있어서 코인으로 받았어요</p>`)+
        `<button class="mbtn berry small" id="bPgOk"><span class="mt"><b>${B.length?'다음 상자':'확인'}</b></span></button>`;
      $('bPgOk').onclick=()=>{SFX.click();B.length?pgBoxes():pgClose()}},900)}}

{const st=document.createElement('style');st.textContent=`
.dk.gr1,.dk.gr2,.dk.gr3{position:relative}
.dk.gr1::after,.dk.gr2::after,.dk.gr3::after{content:'';position:absolute;left:10px;right:10px;bottom:3px;height:4px;border-radius:3px;pointer-events:none}
.dk.gr1::after{background:#6cc35a}.dk.gr2::after{background:#4f9dff}.dk.gr3::after{background:linear-gradient(90deg,#ffa51f,#ffe14d,#ffa51f)}
.dk.gr3{box-shadow:0 0 0 2px #ffd35f88,0 3px 0 var(--choco)}
.gr-l{display:inline-block;font:12px var(--f-display);color:#fff;background:var(--gc);border:2px solid var(--choco);border-radius:8px;padding:0 6px;margin-right:4px;vertical-align:middle;line-height:1.4}
.res-xp{display:flex;align-items:center;gap:6px;font:14px var(--f-display);color:var(--choco)}.res-xp:empty{display:none}
.res-xp .xpb{width:90px;height:10px;border:2px solid var(--choco);border-radius:6px;background:#fff;overflow:hidden}.res-xp .xpb i{display:block;height:100%;background:linear-gradient(90deg,#ff7eb6,#ffb36b)}
.res-xp small{font-size:12px;color:#7a5236}.res-xp em{display:inline-flex;align-items:center;gap:3px;color:#c2410c}.res-xp em svg{width:16px;height:16px}
.pg-slab{width:min(400px,92vw);max-height:calc(100dvh - 20px);overflow-y:auto;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.pg-slab h2{margin:0;font-size:clamp(18px,5.4vh,24px);display:flex;align-items:center;gap:6px}.pg-slab h2 svg{width:24px;height:24px}
.pg-box svg{width:clamp(64px,22vh,104px);height:auto;display:block}.pg-box.shake{animation:pgShake .9s ease-in-out}
@keyframes pgShake{0%,100%{transform:none}15%{transform:rotate(-9deg) scale(1.05)}30%{transform:rotate(9deg) scale(1.08)}45%{transform:rotate(-12deg) scale(1.1)}60%{transform:rotate(12deg) scale(1.14)}80%{transform:scale(1.3)}}
.pg-odds{display:flex;gap:6px;margin:0}.pg-odds span{font:12px var(--f-display);color:#fff;background:var(--gc);border:2px solid var(--choco);border-radius:8px;padding:0 6px}
.pg-two{gap:10px}.pg-card{width:84px}.pg-card .dk{pointer-events:none}
.pg-slab .note{margin:0}`;document.head.appendChild(st)}
// 카드·스킬 화면에도 가진 코인 표시
{const x=$('bDeckX');if(x){const c=document.createElement('span');c.className='coin';c.id='deckCoin';x.before(c)}}
{const sc=syncCoins;syncCoins=function(){sc();const e=$('deckCoin');if(e)e.innerHTML=COIN_SVG+'<em>'+SAVE.coins+'</em>'}}
{const rd=renderDeck;renderDeck=function(){rd.apply(this,arguments);syncCoins()}}
{const st=document.createElement('style');st.textContent='#deckCoin{flex:0 0 auto;white-space:nowrap}#deckCoin svg{width:18px;height:18px}';document.head.appendChild(st)}
// 창이 열리거나 내용이 바뀌면 그리기 전에 바로 크기를 맞춰요 (열릴 때 커졌다 작아지는 깜빡임 없애기)
{let q=false;const run=()=>{q=false;try{fitScr()}catch(e){}};const mo=new MutationObserver(()=>{if(!q){q=true;queueMicrotask(run)}});
  for(const s of document.querySelectorAll('.scr,#augS'))mo.observe(s,{attributes:true,attributeFilter:['hidden'],childList:true,subtree:true})}
