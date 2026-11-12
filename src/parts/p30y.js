/* ================= 31차 (다): 글씨가 체력바·버튼을 가리지 않게 · 랭크 막대 · 내 정보 덱을 카드 그대로 ================= */
// ----- 경기 중 안내 글씨: 체력바·사탕 칸·시계·지도·버튼과 겹치면 겹치지 않는 아래쪽으로 밀어요 -----
const AVOID={hero:['hp','candies','timer','map','bView','bFull','bPause','augBtnH','warnBox','bDash','bDecoy','bCloak','bSprint','bJump','bCompass','bSmoke','bGum'],
  devil:['ehp','ecandies','myCk','dtimer','bFullD','bPauseD','hand','elix','augBtnD','peekBox','capPanel','burn']};
function avoidHud(){if(screen!=='play'&&screen!=='pause')return;const mode=G.mode==='devil'?'devil':'hero';const texts=mode==='devil'?['dtoast','dhint']:['toast','hint','echo'];
  const prot=[];for(const id of AVOID[mode]){const e=$(id);if(e&&!e.hidden&&e.offsetParent!==null){const r=e.getBoundingClientRect();if(r.width>2&&r.height>2)prot.push(r)}}
  for(const q of document.querySelectorAll('#hudH .skb,#hudH .sk-btn,#hudH [data-sk]')){const r=q.getBoundingClientRect();if(r.width>2)prot.push(r)}
  for(const id of texts){const el=$(id);if(!el)continue;if(!el.textContent.trim()||el.hidden){el.style.translate='';continue}
    el.style.translate='';let dy=0;for(let it=0;it<4;it++){const r=el.getBoundingClientRect();const hit=prot.find(p=>r.left<p.right-1&&r.right>p.left+1&&r.top+dy<p.bottom-1&&r.bottom+dy>p.top+1);if(!hit)break;dy=hit.bottom-r.top+6}
    if(dy)el.style.translate=`0 ${Math.round(dy)}px`}}
setInterval(avoidHud,150);

// ----- 랭크: 쿠키부터 왕관까지 한 줄 막대가 내 점수만큼 차올라요 -----
openRank=function(tab){const role=tab||(SAVE.lastRole==='devil'?'devil':'hero');const R=role==='devil'?SAVE.rankW:SAVE.rankT;const p=R.p|0,t=tierOfP(p);const w=Math.min(100,t*20+Math.min(1,(p-t*100)/100)*20),pw=Math.max(7,Math.min(93,w));
  $('rankRow').className='rk3';
  $('rankRow').innerHTML=`<div class="rk3-tabs"><button data-r="hero" class="${role==='hero'?'on':''}">도둑</button><button data-r="devil" class="${role==='devil'?'on':''}">마녀</button><button class="rk3-q" id="bRkQ" aria-label="설명">?</button></div>
    <div class="rk3-now">${tierIcon(t)}<b>${rankTxtP(p)}</b>${t<4?`<span>다음 등급까지 ${100-p%100}점</span>`:''}</div>
    <div class="rk-trk"><div class="rk-ics">${TIERS.map(([n],i)=>`<span class="rk-ic${i===t?' cur':''}${i<t?' done':''}" style="left:${i*20+10}%">${tierIcon(i)}<b>${n}</b></span>`).join('')}</div>
      <div class="rk-bar"><i id="rkFill"></i>${[1,2,3,4].map(i=>`<u style="left:${i*20}%"></u>`).join('')}<em id="rkPin" style="left:0%;transform:translateX(0)">${p}점</em></div></div>`;
  $('rankNow').innerHTML='';const how=$('rankHow');how.hidden=true;
  how.innerHTML='<b>아무나와 하기</b>에서 고른 역할로 3판을 해요. 이기면 <b>+25점</b> 안팎, 지면 <b>-20점</b> 안팎<br>나보다 높은 상대를 이기면 더 많이 얻어요 · 처음 오른 등급마다 그 등급 상자를 받아요';
  for(const b of $('rankRow').querySelectorAll('.rk3-tabs [data-r]'))b.onclick=()=>{SFX.click();openRank(b.dataset.r)};
  $('bRkQ').onclick=()=>{SFX.click();how.hidden=!how.hidden};
  $('rankM').querySelector('.kicker').textContent='랭크';$('rankM').hidden=false;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const f=$('rkFill'),pin=$('rkPin');if(f)f.style.width=w+'%';if(pin){pin.style.left=w+'%';pin.style.transform=`translateX(-${w}%)`}}))};

// ----- 내 정보 두 번째 장: 카드 조합을 실제 카드 모양으로 -----
function comboCards(role){const T=SAVE.combo[role]||{};const L=Object.entries(T).sort((a,b)=>b[1].g-a[1].g).slice(0,3);const W=role==='devil';
  if(!L.length)return'<p class="note pf-empty">아직 이 역할로 한 판이 없어요</p>';
  return L.map(([k,c])=>`<div class="pf-cb2"><div class="pf-cards">${(W?['move']:[]).concat(k.split(',')).map(q=>{try{return dkTile(q,W,'mini')}catch(e){return''}}).join('')}</div><div class="pf-wr"><b>${pct(c.w,c.g)}</b><small>${c.g}판</small></div></div>`).join('')}
{const po=profOpen;profOpen=function(page,tab){if(page!==2)return po(page);const role=tab||(SAVE.lastRole==='hero'?'hero':'devil');$('pgM').hidden=false;
  $('pgBody').innerHTML=`<div class="rk3-tabs pf-tabs"><button data-r="devil" class="${role==='devil'?'on':''}">마녀 덱</button><button data-r="hero" class="${role==='hero'?'on':''}">도둑 스킬</button></div>
    <div class="pf-cbl">${comboCards(role)}</div><div class="row pf-btns"><button class="sbtn" id="bPfPrev">이전</button><button class="sbtn" id="bPfX">닫기</button></div>`;
  for(const b of $('pgBody').querySelectorAll('.pf-tabs [data-r]'))b.onclick=()=>{SFX.click();profOpen(2,b.dataset.r)};
  $('bPfPrev').onclick=()=>{SFX.click();profOpen(1)};$('bPfX').onclick=()=>{SFX.click();pgClose()}}}

{const st=document.createElement('style');st.textContent=`
#augBtnH{left:max(12px,env(safe-area-inset-left,0px))!important;right:auto!important;top:calc(66px + env(safe-area-inset-top,0px))!important;transform:none!important}
.rk-trk{position:relative;width:min(520px,82vw);padding:46px 0 30px;margin:4px auto 0}
.rk-ics span{position:absolute;top:0;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;font:11px var(--f-display);color:#9a7a60;opacity:.75}
.rk-bar u{position:absolute;top:3px;bottom:3px;width:2px;margin-left:-1px;background:#4a2a1a33;border-radius:1px}
.rk-ics svg{width:24px;height:24px}.rk-ics .cur{opacity:1;color:var(--choco)}.rk-ics .cur svg{width:30px;height:30px}.rk-ics .done{opacity:1}
.rk-bar{position:relative;height:16px;border:2.5px solid var(--choco);border-radius:10px;background:#fff;overflow:visible}
.rk-bar i{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:8px;background:linear-gradient(90deg,#c98a4b,#ff9ad0 25%,#b98cff 50%,#ff7eb6 75%,#ffd35f);transition:width 1.1s cubic-bezier(.2,.8,.2,1)}
.rk-bar em{position:absolute;top:20px;transform:translateX(-50%);font:12px var(--f-display);font-style:normal;color:#fff;background:var(--choco);border-radius:8px;padding:1px 6px;white-space:nowrap;transition:left 1.1s cubic-bezier(.2,.8,.2,1)}
.rk-num span{position:absolute;bottom:0;transform:translateX(-50%);font-size:10px;color:#9a7a60}.rk-num span:first-child{transform:none}
.pf-tabs{justify-content:center;margin-bottom:4px}
.pf-cbl{display:flex;flex-direction:column;gap:6px;width:100%}
.pf-cb2{display:flex;align-items:center;gap:10px;background:#fff;border:2px solid var(--choco);border-radius:12px;padding:4px 10px}
.pf-cards{display:flex;gap:6px;zoom:.5;pointer-events:none}.pf-cards .dk{width:80px!important;height:92px!important;flex:none!important}
.pf-wr{display:flex;flex-direction:column;align-items:flex-end;margin-left:auto}.pf-wr b{font:18px var(--f-display);color:#e8508a}.pf-wr small{font-size:11px;color:#7a5236}`;document.head.appendChild(st)}
// 앱에서는 늘 전체화면이라 전체화면 버튼은 빼요
{const st=document.createElement('style');st.textContent='#bFull,#bFullD{display:none!important}';document.head.appendChild(st)}
// 랭크 창: 빈 공간 없이 크게
{const st=document.createElement('style');st.textContent=`
.rank-slab{width:min(720px,94vw)!important;max-width:none!important}
.rk3{gap:12px}
.rk3-tabs button{font-size:18px;padding:6px 24px}.rk3-tabs .rk3-q{width:40px;height:40px;font-size:18px}
.rk3-now{font-size:22px;gap:10px}.rk3-now svg{width:46px;height:46px}.rk3-now span{font-size:15px}
.rk-trk{width:min(640px,86vw);padding:76px 0 36px}
.rk-ics span{font-size:14px;gap:2px}.rk-ics svg{width:42px;height:42px}.rk-ics .cur svg{width:56px;height:56px}
.rk-ics span{top:auto;bottom:calc(100% - 70px)}
.rk-bar{height:26px;border-width:3px;border-radius:14px}.rk-bar i{border-radius:11px}
.rk-bar em{top:32px;font-size:15px;padding:2px 10px;border-radius:10px}`;document.head.appendChild(st)}
// ----- 내 정보 창: 위쪽 탭으로 "내 정보 · 덱 기록" (다음·이전 버튼 없이) -----
{const po=profOpen;profOpen=function(page,role){page=page===2?2:1;
  const tabs=`<div class="rk3-tabs pf-top-tabs"><button data-p="1" class="${page===1?'on':''}">내 정보</button><button data-p="2" class="${page===2?'on':''}">덱 기록</button></div>`;
  if(page===1){po(1);const B=$('pgBody');B.insertAdjacentHTML('afterbegin',tabs);const nx=$('bPfNext');if(nx)nx.remove()}
  else{role=role||(SAVE.lastRole==='hero'?'hero':'devil');$('pgM').hidden=false;
    $('pgBody').innerHTML=tabs+`<div class="pf-sub"><button data-r="devil" class="${role==='devil'?'on':''}">마녀 덱</button><button data-r="hero" class="${role==='hero'?'on':''}">도둑 스킬</button></div>
      <div class="pf-cbl">${comboCards(role)}</div><div class="row pf-btns"><button class="sbtn" id="bPfX">닫기</button></div>`;
    for(const b of $('pgBody').querySelectorAll('.pf-sub [data-r]'))b.onclick=()=>{SFX.click();profOpen(2,b.dataset.r)};
    $('bPfX').onclick=()=>{SFX.click();pgClose()}}
  for(const b of $('pgBody').querySelectorAll('.pf-top-tabs [data-p]'))b.onclick=()=>{SFX.click();profOpen(+b.dataset.p)}}}
{const st=document.createElement('style');st.textContent=`
.pf-top-tabs{justify-content:center;width:100%;margin-bottom:2px}
.pf-sub{display:flex;gap:4px;background:#f3e2cc;border-radius:12px;padding:3px;border:2px solid var(--choco)}
.pf-sub button{font:13px var(--f-display);color:#7a5236;background:none;border:0;border-radius:9px;padding:4px 14px;cursor:pointer}
.pf-sub button.on{background:#fff;color:var(--choco);box-shadow:0 2px 0 #4a2a1a44}`;document.head.appendChild(st)}
// ----- AI 상대: 한 번의 대결(여러 판) 동안 스킬·덱이 바뀌지 않아요 -----
{const as=aiSkills;aiSkills=function(){if(SER.on&&!NET.on){if(!SER.fixSk)SER.fixSk=as.apply(this,arguments);return SER.fixSk.slice()}return as.apply(this,arguments)}}
{const ad=aiDeck;aiDeck=function(){if(SER.on&&!NET.on){if(!SER.fixDk)SER.fixDk=ad.apply(this,arguments);return SER.fixDk.slice()}return ad.apply(this,arguments)}}
{const ss=serStart;serStart=function(){SER.fixSk=null;SER.fixDk=null;return ss.apply(this,arguments)}}
