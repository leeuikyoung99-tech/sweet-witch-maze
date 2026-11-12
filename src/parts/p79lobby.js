// ===== 79차: 들어가는 화면 새로 =====
// 혼자 하기 · 아무나와 하기 · 친구랑 하기 모두 같은 흐름이에요.
// 1) 두 게임(마녀의 미로 · 거대 마녀)을 큰 사진 카드로 보여 줘요
// 2) 게임을 고르면 왼쪽에 큰 맵 고르기(< >), 오른쪽에 역할 · AI 난이도 · 시작
// 메인 게임은 여기서 고른 맵으로 모든 판을 해요(판마다 맵 고르기 창이 안 떠요).
// 온라인 맵: 친구랑 하기는 방장이 고른 맵, 아무나와 하기는 두 사람이 고른 맵 중 무작위.
const LOBBY={view:'games',game:'main',role:null,i:0,map:null,agreed:null};
const LBI={
 back:'<svg viewBox="0 0 24 24"><path d="M14.5 5 7.5 12l7 7" fill="none" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 prev:'<svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 next:'<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 lock:'<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.8"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="#4a2a1a" stroke-width="1.9"/></svg>',
 play:'<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="#fff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>',
 bot:'<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="11" rx="4" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="1.8"/><circle cx="9.5" cy="13.5" r="1.6" fill="#4a2a1a"/><circle cx="14.5" cy="13.5" r="1.6" fill="#4a2a1a"/><path d="M12 8V5" stroke="#4a2a1a" stroke-width="1.8"/><circle cx="12" cy="4" r="1.4" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="1.2"/></svg>'};
// 도둑·마녀 그림은 메인 게임과 미니게임 모두 같은 것(역할 카드 그림)을 써요
try{const h=$('bHero').querySelector('svg'),d=$('bDevil').querySelector('svg');if(h)MGI.thief=h.outerHTML;if(d)MGI.witch=d.outerHTML}catch(e){}
const lbMapsAll=()=>Object.keys(THEMES);
const lbOwn=k=>{try{return owns('theme',k)||SAVE.dev}catch(e){return k==='candy'}};
const LBG={main:{n:'마녀의 미로',d:'도둑 대 마녀 · 미로 탈출 대결',roles:[['hero','쿠키 도둑','mint'],['devil','과자 마녀','berry']]},
  mini:{n:'거대 마녀',d:'1인칭 미니게임 · 3분 한 판',roles:[['hero','쿠키 도둑','mint'],['devil','거대 마녀','grape']]}};
const LBCTX={ai:'혼자 하기',rand:'아무나와 하기',friend:'친구랑 하기'};
function lbEnsure(){if($('lbWrap'))return;const pane=$('role').querySelector('.uni-pane');const w=document.createElement('div');w.id='lbWrap';pane.appendChild(w);
  // 메인 게임이 기본, 거대 마녀는 위쪽 작은 탭 (롤의 칼바람처럼 곁가지 모드)
  const tb=document.createElement('div');tb.id='lbTabs';tb.className='lb-tabs';tb.innerHTML=`<button data-g="main" aria-label="마녀의 미로">${MGI_MAZE}<b>마녀의 미로</b></button><button data-g="mini" aria-label="거대 마녀 미니게임">${MGI_MON}<b>거대 마녀</b><em>미니</em></button>`;
  const top=pane.querySelector('.pane-top');top.insertBefore(tb,top.querySelector('.uni-x')||null);
  tb.addEventListener('click',e=>{const g=e.target.closest('[data-g]');if(!g||LOBBY.game===g.dataset.g)return;SFX.card();LOBBY.game=g.dataset.g;LOBBY.role=lbDefRole();lbDraw()});
  w.addEventListener('click',e=>{const a=e.target.closest('.lb-arw');if(a){lbStep(+a.dataset.d);return}
    const r=e.target.closest('[data-r]');if(r){SFX.card();LOBBY.role=r.dataset.r;lbDraw();return}
    const l=e.target.closest('[data-l]');if(l){SAVE.ail=+l.dataset.l;AIL=SAVE.ail;saveGame();SFX.card();lbDraw();return}
    if(e.target.closest('#lbGo'))lbGo()});
  // 손가락으로 밀어서 맵 넘기기
  let sx=null;w.addEventListener('pointerdown',e=>{if(e.target.closest('.lb-pic'))sx=e.clientX},{passive:true});
  w.addEventListener('pointerup',e=>{if(sx==null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40)lbStep(dx<0?1:-1)})}
function lbDefRole(){const k=LOBBY.game==='mini'?SAVE.lbMiniRole:SAVE.lbRole;return k==='hero'||k==='devil'?k:'hero'}
function lbStep(d){const L=lbMapsAll();LOBBY.i=(LOBBY.i+d+L.length)%L.length;try{SFX.card()}catch(e){}lbDraw()}
function lbNote(){const c=ROLECTX,mini=LOBBY.game==='mini'; // 한 줄로 짧게
  if(mini)return c==='ai'?'3분 한 판 · 시작하면 스킬 고르기':c==='rand'?'판돈·등급 없이 가볍게 한 판':'방장이 고른 맵 · 가볍게 한 판';
  if(c==='rand')return'고른 역할로 3판 · 맵은 둘 중 무작위';
  if(c==='friend')return'3판 · 방장이 고른 맵 · 랭크 없음';
  return'3판 · 판마다 증강체가 쌓여요'}
// 설명이 두 줄이 되지 않게 글자를 줄여 맞춰요
function lbFitNote(){const n=document.querySelector('#lbWrap .lb-note');if(!n)return;n.style.fontSize='';let f=parseFloat(getComputedStyle(n).fontSize)||13;for(let i=0;i<8&&n.scrollWidth>n.clientWidth+1&&f>9;i++){f-=.5;n.style.fontSize=f+'px'}}
function lbDraw(){lbEnsure();const w=$('lbWrap'),R=$('role');R.classList.add('lb');R.classList.toggle('lb-mini',LOBBY.game==='mini');
  const ctx=LBCTX[ROLECTX]||'혼자 하기',t=R.querySelector('.uni-t');for(const b of $('lbTabs').children)b.classList.toggle('on',b.dataset.g===LOBBY.game);
  // 설정 화면
  if(t)t.textContent=ctx;const L=lbMapsAll();if(LOBBY.i>=L.length)LOBBY.i=0;const k=L[LOBBY.i],own=lbOwn(k),G=LBG[LOBBY.game];
  const art=r=>r==='hero'?MGI.thief:MGI.witch;
  const ail=SAVE.ail==null?1:SAVE.ail;
  w.innerHTML=`<div class="lb-set"><div class="lb-left"><div class="lb-map"><button class="lb-arw" data-d="-1" aria-label="이전 맵">${LBI.prev}</button>
      <div class="lb-pic${own?'':' lk'}" style="background-image:url(${MAPIMG[k]||''})"><span>${THN[k]||k}</span>${own?'':`<em>${LBI.lock}<b>꾸미기에서 열어요</b></em>`}</div>
      <button class="lb-arw" data-d="1" aria-label="다음 맵">${LBI.next}</button></div><div class="lb-dots">${L.map((q,j)=>`<i class="${j===LOBBY.i?'on':''}${lbOwn(q)?'':' lk'}"></i>`).join('')}</div></div>
    <div class="lb-right"><div class="lb-roles">${G.roles.map(([r,n,c])=>`<button class="lb-r ${c}${LOBBY.role===r?' on':''}" data-r="${r}" aria-label="${n}"><span>${art(r)}</span><b>${n}</b></button>`).join('')}</div>
      ${ROLECTX==='ai'?`<div class="lb-ail"><i>${LBI.bot}</i>${AIL_N.map((n,j)=>`<button data-l="${j}" class="${j===ail?'on':''}">${n}</button>`).join('')}</div>`:''}
      <p class="lb-note">${lbNote()}</p>
      <button class="lb-go${own?'':' off'}" id="lbGo" aria-label="시작">${LBI.play}<b>시작</b></button></div></div>`;lbFitNote()}
async function lbGo(){const L=lbMapsAll(),k=L[LOBBY.i];if(!lbOwn(k)){SFX.deny();tMsg('이 맵은 꾸미기에서 열 수 있어요');return}const r=LOBBY.role||'hero';
  LOBBY.map=k;SAVE.lastMap=k;if(LOBBY.game==='mini')SAVE.lbMiniRole=r;else SAVE.lbRole=r;saveGame();SFX.click();try{await initAudio()}catch(e){}
  if(LOBBY.game==='main'){SET.gmode='classic';return roleGo(r)}
  mgSelOpen(r==='hero'?'thief':'mon')}
// 미니게임 스킬 고르기 '시작' 뒤: 혼자면 바로, 온라인이면 상대 찾기
function mgSelDone(R,sel){if(R==='thief')SAVE.mgTh=sel.slice();else SAVE.mgWi=sel.slice();saveGame();
  if(ROLECTX!=='ai'&&typeof mgNetGo==='function')return mgNetGo(R,sel.slice());
  lbApplyMap();if(R==='thief')mgStart('thief',sel.slice(),mgRandWitch());else mgStart('mon',mgRandThief(),sel.slice())}
function lbApplyMap(k){k=k||LOBBY.agreed||LOBBY.map||SAVE.lastMap;if(!k||!THEMES[k])return;MAPPICK=k;try{applyTheme(k,true)}catch(e){}try{loadMapMusic(k)}catch(e){}}

// 예전 역할 화면 대신 새 화면
{const sr=showRole;showRole=function(){const r=sr.apply(this,arguments);try{lbDraw()}catch(e){console.warn(e)}return r}}
{const ts=titleScreen;titleScreen=function(){LOBBY.fresh=true;LOBBY.map=null;LOBBY.agreed=null;return ts.apply(this,arguments)}}
LOBBY.fresh=true;
// 고른 맵 시작 시 위치: 지난번 맵
{const sr=showRole;showRole=function(){if(LOBBY.fresh){LOBBY.fresh=false;LOBBY.game='main';LOBBY.role=lbDefRole();const L=lbMapsAll(),j=L.indexOf(SAVE.lastMap||SAVE.eq.theme);LOBBY.i=j<0?0:j}return sr.apply(this,arguments)}}
// 메인 게임: 판마다 맵 고르기 대신 여기서 고른 맵으로
{const mp=mapPick;mapPick=function(go,who){const S=curSer();const k=NET.on?(LOBBY.agreed||null):LOBBY.map;if(S&&S.on&&!S.map&&k&&THEMES[k])S.map=k;return mp.apply(this,arguments)}}
// 온라인: 들어온 사람이 고른 맵을 'ready' 에 실어 보내고, 방장이 'start' 에 정한 맵을 실어요
{const wc=wrapConn;wrapConn=function(conn){const room=wc(conn);const s=room.send.bind(room),on=room.onMessage.bind(room);
  room.send=(t,m)=>{if(t==='ready'&&m&&typeof m==='object')m=Object.assign({lmap:LOBBY.map||null},m);
    if(t==='start'&&m&&typeof m==='object'){const mine=LOBBY.map,his=NET.peerMap;let k=mine;if(NET.rand){const c=[mine,his].filter(q=>q&&THEMES[q]);k=c.length?c[(Math.random()*c.length)|0]:mine}else if(!k)k=his;
      LOBBY.agreed=LOBBY.agreed||k||null;m=Object.assign({lmap:LOBBY.agreed},m)}
    return s(t,m)};
  room.onMessage=(t,fn)=>on(t,t==='ready'?d=>{NET.peerMap=d&&d.lmap||null;return fn(d)}:t==='start'?d=>{if(d&&d.lmap&&THEMES[d.lmap])LOBBY.agreed=d.lmap;return fn(d)}:fn);
  return room}}
// 미니게임 스킬 고르기 '시작' → mgSelDone
{const so=mgSelOpen;mgSelOpen=function(role){so.apply(this,arguments);const m=$('mgSel');if(m&&!m.dataset.lb){m.dataset.lb=1;
    m.addEventListener('click',e=>{const go=e.target.closest('#mgSelGo');if(!go)return;e.stopImmediatePropagation();const R=m.dataset.role,th=R==='thief',sel=th?MGSEL.thief:MGSEL.witch;
      if(sel.length!==(th?2:MGWN)){SFX.deny();return}SFX.click();m.hidden=true;mgSelDone(R,sel)},true)}}}

{const st=document.createElement('style');st.textContent=`
#role.lb .row.roles,#role.lb #aiLvl,#role.lb #mgTabs,#role.lb #roleNote,#role.lb .uni-mid{display:none!important}
#role.lb .uni-pane{display:flex;flex-direction:column}
#lbWrap{flex:1;min-height:0;width:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:stretch;padding:4px 6px 6px}
.lb-games,.lb-set{width:100%;box-sizing:border-box}
.lb-back{display:none;width:40px;height:40px;flex:0 0 auto;border-radius:50%;border:2.5px solid var(--choco);background:#fff8ee;box-shadow:0 3px 0 var(--choco);padding:7px;margin-right:8px;cursor:pointer}.lb-back svg{width:100%;height:100%;display:block}
#lbTabs{display:flex;gap:4px;margin:0 8px;flex:0 0 auto;background:#4a2a1a14;border-radius:14px;padding:3px}
#lbTabs button{display:flex;align-items:center;gap:4px;padding:3px 9px 3px 5px;border-radius:11px;border:2px solid transparent;background:none;font-family:var(--f-display);color:#4a2a1a99;cursor:pointer;white-space:nowrap}
#lbTabs button svg{width:20px;height:20px;flex:0 0 auto;opacity:.7}#lbTabs button b{font-size:13px}
#lbTabs button em{font-style:normal;font-size:10px;background:#b98cff;color:#fff;border-radius:7px;padding:0 5px;margin-left:1px}
#lbTabs button.on{background:#fff8ee;border-color:var(--choco);color:var(--choco);box-shadow:0 2px 0 var(--choco)}#lbTabs button.on svg{opacity:1}
#role.lb-mini .uni-pane{background:linear-gradient(#f4ecff,#e9dcff)!important}#role.lb-mini #lbTabs button[data-g=mini].on{background:#d9c2ff}
#role.lb-mini .lb-go{background:#9b6bff}#role.lb-mini .lb-pic{border-color:#5a2db0}#role.lb .pane-top{display:flex;align-items:center}#lbBack{display:none!important}#role.lb .pane-top .uni-t{flex:1;min-width:0}
.lb-games{display:grid;grid-template-columns:1fr 1fr;gap:min(3vw,22px);height:100%;max-height:min(72vh,420px);align-items:stretch}
.lb-g{position:relative;display:flex;flex-direction:column;min-height:0;padding:0;border-radius:20px;border:3px solid var(--choco);background:#fff8ee;box-shadow:0 5px 0 var(--choco);overflow:hidden;cursor:pointer;font-family:var(--f-display);color:var(--choco);text-align:left}
.lb-g:active{transform:translateY(3px);box-shadow:0 2px 0 var(--choco)}
.lb-g i{flex:1;min-height:0;background-size:cover;background-position:center;border-bottom:3px solid var(--choco)}
.lb-g span{display:flex;flex-direction:column;gap:1px;padding:7px 14px 9px}.lb-g.main span{background:linear-gradient(90deg,#d6fff3,#fff8ee)}.lb-g.mini span{background:linear-gradient(90deg,#efe3ff,#fff8ee)}
.lb-g b{font-size:clamp(17px,4.6vh,24px)}.lb-g small{font-size:clamp(11px,3vh,14px);opacity:.8}
.lb-g.off i{filter:grayscale(.85) brightness(1.05)}.lb-g em{position:absolute;right:10px;top:10px;font-style:normal;font-size:13px;background:#4a2a1ad8;color:#fff;border-radius:10px;padding:2px 9px}
.lb-set{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:min(2.6vw,18px);align-items:center;height:100%;min-height:0}
.lb-left{display:flex;flex-direction:column;gap:6px;min-width:0;min-height:0}
.lb-map{display:flex;align-items:center;gap:6px;min-height:0}
.lb-arw{flex:0 0 auto;width:36px;height:52px;border-radius:14px;border:2.5px solid var(--choco);background:#fff8ee;color:var(--choco);box-shadow:0 3px 0 var(--choco);padding:8px 5px;cursor:pointer}.lb-arw svg{width:100%;height:100%;display:block}
.lb-arw:active{transform:translateY(2px);box-shadow:0 1px 0 var(--choco)}
.lb-pic{position:relative;flex:1;min-width:0;aspect-ratio:16/10;max-height:calc(100vh - 150px);border-radius:16px;border:3px solid var(--choco);background-size:cover;background-position:center;box-shadow:0 4px 0 var(--choco);overflow:hidden;touch-action:pan-y}
.lb-pic span{position:absolute;left:0;right:0;bottom:0;padding:16px 10px 6px;text-align:center;font:clamp(15px,4.4vh,21px) var(--f-display);color:#fff;-webkit-text-stroke:4px var(--choco);paint-order:stroke;background:linear-gradient(transparent,#4a2a1a66)}
.lb-pic.lk{filter:saturate(.45)}.lb-pic em{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-style:normal;background:#ffffff66}.lb-pic em svg{width:40px;height:40px}.lb-pic em b{font:14px var(--f-display);color:var(--choco);background:#fff8ee;border-radius:10px;padding:2px 9px;border:2px solid var(--choco)}
.lb-dots{display:flex;justify-content:center;gap:5px}.lb-dots i{width:8px;height:8px;border-radius:50%;background:#e3c9a8}.lb-dots i.on{background:#ff5f9e;transform:scale(1.25)}.lb-dots i.lk:not(.on){background:#efe2d0}
.lb-right{display:flex;flex-direction:column;gap:8px;min-width:0;justify-content:center}
.lb-roles{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.lb-r{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 4px 5px;border-radius:16px;border:2.5px solid #e3c9a8;background:#fff8ee;cursor:pointer;font-family:var(--f-display);color:var(--choco);min-width:0}
.lb-r span{width:min(58px,15vh);height:min(58px,15vh);display:grid;place-items:center}.lb-r span svg{width:100%;height:100%}.lb-r b{font-size:clamp(12px,3.6vh,16px);white-space:nowrap}
.lb-r.on{border-color:var(--choco);box-shadow:0 4px 0 var(--choco)}.lb-r.mint.on{background:linear-gradient(#d6fff3,#a9f0d9)}.lb-r.berry.on{background:linear-gradient(#ffe0ef,#ffb8d6)}.lb-r.grape.on{background:linear-gradient(#efe3ff,#d3bbff)}
.lb-r:not(.on) span{opacity:.75}
.lb-ail{display:flex;align-items:center;gap:5px;justify-content:center}.lb-ail i{width:26px;height:26px;flex:0 0 auto}.lb-ail i svg{width:100%;height:100%}
.lb-ail button{flex:1;min-width:0;padding:4px 2px;border-radius:12px;border:2.5px solid var(--choco);background:#fff8ee;font:clamp(12px,3.4vh,15px) var(--f-display);color:var(--choco);cursor:pointer}.lb-ail button.on{background:#ffd23a;box-shadow:0 3px 0 var(--choco)}
.lb-note{margin:0;font-size:clamp(10px,2.9vh,13px);line-height:1.3;color:var(--choco);opacity:.85;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lb-go{display:flex;align-items:center;justify-content:center;gap:6px;height:clamp(42px,13vh,56px);border-radius:28px;border:3px solid var(--choco);background:#ff5f9e;box-shadow:0 4px 0 var(--choco);cursor:pointer;padding:0 16px}
.lb-go svg{width:24px;height:24px}.lb-go b{font:clamp(18px,5.4vh,24px) var(--f-display);color:#fff;-webkit-text-stroke:4px var(--choco);paint-order:stroke;letter-spacing:2px}
.lb-go:active{transform:translateY(3px);box-shadow:0 1px 0 var(--choco)}.lb-go.off{filter:grayscale(.85);opacity:.65}
@media (max-height:340px){.lb-r span{width:42px;height:42px}.lb-right{gap:5px}.lb-arw{width:30px;height:44px}.lb-g span{padding:4px 12px 6px}}`;document.head.appendChild(st)}
