/* ================= 31차 (나): 디자인 2 — 도둑 대 도둑 스킬 창 · 대기 화면 · 등급순 · 맵 고르기 일시정지 ================= */
// ----- 도둑 대 도둑 스킬 고르기: 설명 없이, 등급순, 같은 배경 -----
{const rs=renderSkillPick;renderSkillPick=function(){const r=rs.apply(this,arguments);try{sortGr31($('chSkill2'));sortGr31($('chSkill'))}catch(e){}return r}}
$('bSkBack').classList.add('ic-back');$('bSkBack').setAttribute('aria-label','뒤로');
// ----- 대기 화면: 쿠키가 빙글 도는 표시 -----
{const w=document.createElement('div');w.className='wait31';w.innerHTML=`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="#f2b56b" stroke="#4a2a1a" stroke-width="6"/><circle cx="50" cy="50" r="31" fill="none" stroke="#e39a4a" stroke-width="3" stroke-dasharray="6 7"/><circle cx="36" cy="38" r="6" fill="#5a3220"/><circle cx="62" cy="34" r="5" fill="#5a3220"/><circle cx="58" cy="60" r="6.5" fill="#5a3220"/><circle cx="34" cy="62" r="4.5" fill="#5a3220"/><circle cx="48" cy="48" r="3.5" fill="#5a3220"/></svg>`;$('lobT').before(w)}
{const lb=lobby;lobby=function(t,l,btn,o={}){const r=lb.apply(this,arguments);$('lobby').classList.toggle('wait',!o.pick);return r}}
// ----- 카드 묶음(내 정보 덱 기록 · 바꾸기 표)도 등급순 -----
{let q=0;new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;try{for(const b of document.querySelectorAll('#pgM .pf-cards:not([data-gs])')){b.dataset.gs=1;sortGr31(b)}
  const sw=document.querySelector('#pgM .sw-c');if(sw&&!sw.parentNode.dataset.gs){sw.parentNode.dataset.gs=1;sortGr31(sw.parentNode)}}catch(e){}})}).observe($('pgM'),{childList:true,subtree:true})}
// ----- 맵 고르기(15초): 혼자 할 때는 일시정지 · 친구·아무나와 할 때는 없음 -----
let MAPPZ=false;
{const mp=mapPick;mapPick=function(go,who){mp.apply(this,arguments);const M=$('mapM');if(M.hidden)return;
  clearInterval(mapPick.h);let left=15;const tick=()=>{if(M.hidden){clearInterval(mapPick.h);return}if(PZ.ctx==='map')return;left--;const e=$('mapLeft');if(e)e.textContent=`${Math.max(0,left)}초 뒤엔 첫 번째 맵으로 시작해요`;if(left<=0){clearInterval(mapPick.h);const b=M.querySelector('.map-b');if(b)b.click()}};
  mapPick.h=setInterval(tick,1000);
  if(!NET.on){const b=document.createElement('button');b.className='ib';b.id='bPauseM';b.setAttribute('aria-label','일시정지');b.innerHTML=$('bPauseS').innerHTML;M.appendChild(b);
    b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();MAPPZ=true;uPause('map')})}}}
document.addEventListener('click',e=>{if(!MAPPZ||!e.target.closest)return;
  if(e.target.closest('#bResume')){MAPPZ=false;return}
  if(e.target.closest('#bQuit')){MAPPZ=false;e.stopImmediatePropagation();e.preventDefault();clearInterval(mapPick.h);$('mapM').hidden=true;try{uResume()}catch(err){}screen='title';titleScreen()}},true);
{const st=document.createElement('style');st.textContent=`
/* 스킬 창 */
#skillS{background:radial-gradient(ellipse at 50% 40%,#fff4f8 0 22%,#ffd3e5 60%,#f6aecb 100%)!important;overflow:hidden;isolation:isolate}
#skillS::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;background:${svgUrl31(DECO31L)} left max(4px,env(safe-area-inset-left,0px)) bottom 0/auto 100% no-repeat,${svgUrl31(DECO31R)} right max(4px,env(safe-area-inset-right,0px)) top 0/auto 100% no-repeat,radial-gradient(#ffffff66 2px,#fff0 2.6px) 0 0/28px 28px}
#skillS .skill-slab{position:relative;z-index:1;background:none!important;border:0!important;box-shadow:none!important;width:100%!important;height:100%;padding:0!important;justify-content:center;gap:clamp(10px,3.6vh,18px)!important}
#skillS .kicker,#skillS h2,#skillS .note,#skillS #skillHint2,#skillS .sd{display:none!important}
#skillS #chSkill2{--w:clamp(70px,11vw,88px);--g:clamp(8px,1.6vw,14px);display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:clamp(10px,3vh,16px) var(--g)!important;width:calc(var(--w) * 6 + var(--g) * 5);max-width:96vw!important;margin:0 auto!important}
#skillS #chSkill2 .rc-sk{flex:0 0 var(--w)!important;width:var(--w)!important;margin:0}
#skillS #chSkill2 .rc-sk .dk{height:clamp(84px,28vh,104px)!important}
#skillS .row{margin:0}
#skillS #bSkGo{min-width:clamp(160px,26vw,220px);min-height:52px;justify-content:center;border-radius:26px}
#skillS #bSkGo b{font:24px var(--f-display)}
/* 대기 화면 */
#lobby.wait{background:radial-gradient(ellipse at 50% 40%,#fff4f8 0 22%,#ffd3e5 60%,#f6aecb 100%)!important;overflow:hidden;isolation:isolate}
#lobby.wait::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;background:${svgUrl31(DECO31L)} left max(4px,env(safe-area-inset-left,0px)) bottom 0/auto 100% no-repeat,${svgUrl31(DECO31R)} right max(4px,env(safe-area-inset-right,0px)) top 0/auto 100% no-repeat,radial-gradient(#ffffff66 2px,#fff0 2.6px) 0 0/28px 28px}
#lobby.wait .slab{position:relative;z-index:1;background:none;border:0;box-shadow:none;max-width:none;width:100%;gap:12px}
#lobby.wait .kicker{display:none!important}
#lobby.wait #lobT{font:clamp(24px,7.5vh,32px) var(--f-display);color:var(--choco);text-shadow:0 2px 0 #fff;margin:0}
#lobby.wait #lobL{font:clamp(16px,5vh,20px) var(--f-display);color:#7a3a52;margin:0;max-width:90vw}
#lobby.wait #lobL:empty{display:none}
#lobby.wait #lobCode{box-shadow:0 5px 0 var(--choco);border:3px solid var(--choco)}
#lobby .wait31{display:none}
#lobby.wait .wait31{display:block;width:clamp(54px,17vh,72px);height:clamp(54px,17vh,72px);animation:wait31 1.6s linear infinite;filter:drop-shadow(0 4px 0 #4a2a1a33)}
#lobby.wait:has(#bOfferYes:not([hidden])) .wait31{animation-play-state:paused}
@keyframes wait31{to{transform:rotate(360deg)}}
/* 맵 고르기 일시정지 버튼 */
#bPauseM{position:absolute;left:max(10px,env(safe-area-inset-left,0px));top:max(10px,env(safe-area-inset-top,0px));z-index:3}
`;document.head.appendChild(st)}
