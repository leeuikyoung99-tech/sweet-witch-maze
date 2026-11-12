/* ================= 31차 (가): 디자인 1 — 카드 등급 모양 · 모드 고르는 창 ================= */
// ----- 카드 등급: 기본·일반은 네모, 희귀는 팔각형(파란 빛), 전설은 육각형(금빛) -----
{const dt=dkTile;dkTile=function(k,W,a){let h=dt(k,W,a);if(!/class="dk [^"]*\bgr3\b/.test(h))return h;
  const nmT=(h.match(/<span class="nm">([^<]*)<\/span>/)||[,''])[1];if(nmT.length>=6)h=h.replace('class="dk ','class="dk nmL ');
  const i=h.indexOf('>')+1,j=h.lastIndexOf('</button>');return h.slice(0,i)+'<span class="gin"><i class="grg"></i>'+h.slice(i,j)+'</span>'+h.slice(j)}}
// 아이콘 그림
const IC31={
  back:`<svg viewBox="0 0 24 24"><path d="M15 4 L7 12 L15 20" fill="none" stroke="#4a2a1a" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  x:`<svg viewBox="0 0 24 24"><path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="#4a2a1a" stroke-width="3.6" stroke-linecap="round"/></svg>`,
  house:`<svg viewBox="0 0 120 110" aria-hidden="true"><path d="M14 54 L60 14 L106 54" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/><path d="M26 50 L60 21 L94 50" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="7 6" stroke-linecap="round"/><rect x="26" y="50" width="68" height="50" rx="7" fill="#f7c98e" stroke="#4a2a1a" stroke-width="5"/><rect x="50" y="64" width="22" height="36" rx="11" fill="#9a5630" stroke="#4a2a1a" stroke-width="4"/><circle cx="66" cy="83" r="3" fill="#ffd34d"/><rect x="33" y="60" width="12" height="12" rx="3" fill="#bfe9ff" stroke="#4a2a1a" stroke-width="3.5"/><rect x="77" y="60" width="12" height="12" rx="3" fill="#bfe9ff" stroke="#4a2a1a" stroke-width="3.5"/></svg>`,
  key:`<svg viewBox="0 0 120 110" aria-hidden="true"><circle cx="38" cy="55" r="22" fill="#ffd34d" stroke="#4a2a1a" stroke-width="5"/><circle cx="38" cy="55" r="9" fill="#fff8ee" stroke="#4a2a1a" stroke-width="4"/><path d="M58 50 H104 V60 H96 V72 H86 V60 H78 V68 H68 V60 H58 Z" fill="#ffd34d" stroke="#4a2a1a" stroke-width="5" stroke-linejoin="round"/><path d="M27 42 q6 -6 13 -4" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`,
  bot:`<svg viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="12" rx="4" fill="#bfe9ff" stroke="#4a2a1a" stroke-width="2.2"/><path d="M12 7 V3.5" stroke="#4a2a1a" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="3" r="1.8" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="1.4"/><circle cx="9" cy="13" r="1.8" fill="#4a2a1a"/><circle cx="15" cy="13" r="1.8" fill="#4a2a1a"/></svg>`};
const svgUrl31=s=>`url("data:image/svg+xml,${encodeURIComponent(s.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '))}")`;
{const st=document.createElement('style');st.textContent=`
/* --- 카드 등급 모양 --- */
.dk.gr0::after,.dk.gr1::after,.dk.gr2::after{content:""!important;position:absolute!important;inset:2px!important;left:2px!important;right:2px!important;bottom:2px!important;height:auto!important;border-radius:12px;border:3px solid #fffc;box-shadow:inset 0 0 0 1.5px #0003,inset 0 -10px 14px #0002;background:none!important;z-index:3}
.dk.gr0,.dk.gr1{box-shadow:0 0 0 2px #fff8,0 3px 0 #2b160b!important}
.dk.gr2{box-shadow:0 0 0 2px #fff8,0 3px 0 #2b160b,0 0 10px 3px #4f9dffb0,0 0 20px 4px #7fb8ff66!important}
.dk.gr3{--o:11px;--c:10px;background-size:0 0!important;background-color:transparent!important;border-color:transparent!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important}
.dk.gr3::before{content:""!important;position:absolute!important;inset:-5px 0 -8px!important;background:#2b160b!important;z-index:0!important;border-radius:0!important;opacity:1!important;clip-path:polygon(0 var(--o),50% 0,100% var(--o),100% calc(100% - var(--o)),50% 100%,0 calc(100% - var(--o)))}
.dk.gr3::after{content:""!important;position:absolute!important;inset:-7px -2px -10px!important;height:auto!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#fff8!important;z-index:-1!important;pointer-events:none;clip-path:polygon(0 13px,50% 0,100% 13px,100% calc(100% - 13px),50% 100%,0 calc(100% - 13px))}
.dk .grg{position:absolute;inset:0;z-index:3;pointer-events:none;background:#fffc;clip-path:polygon(evenodd,2px 11.6px,50% 2.1px,calc(100% - 2px) 11.6px,calc(100% - 2px) calc(100% - 11.6px),50% calc(100% - 2.1px),2px calc(100% - 11.6px),2px 11.6px,5px 13.9px,50% 5.2px,calc(100% - 5px) 13.9px,calc(100% - 5px) calc(100% - 13.9px),50% calc(100% - 5.2px),5px calc(100% - 13.9px),5px 13.9px)}
.dk .gin{position:absolute;inset:-2px 3px;z-index:1;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;overflow:hidden;background:inherit;background-size:100% 100%!important;color:inherit;clip-path:polygon(0 var(--c),50% 0,100% var(--c),100% calc(100% - var(--c)),50% 100%,0 calc(100% - var(--c)))}
.dk .gin::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 42%,#ffffffa0 0 30%,#fff0 64%),linear-gradient(#ffffff38,#fff0 40%),linear-gradient(#0000 62%,#00000026);pointer-events:none}
.dk .gin::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:3;background:linear-gradient(115deg,#fff0 30%,#ffffff70 45%,#fff0 60%) -120% 0/250% 100% no-repeat;animation:gr3shine 3.2s ease-in-out infinite}
@keyframes gr3shine{0%,55%{background-position:-120% 0}100%{background-position:220% 0}}
.dk.gr3{filter:drop-shadow(0 0 4px #ffb31f) drop-shadow(0 0 9px #ffd34dcc)!important;animation:gr3glow 2.4s ease-in-out infinite}
@keyframes gr3glow{50%{filter:drop-shadow(0 0 6px #ffc23a) drop-shadow(0 0 14px #ffe58acc)}}
.dk.gr3 .cs{left:4px!important;top:9px!important}.dk.gr3 .knd{top:9px!important;right:3px!important}.dk.gr3 .x2{top:26px!important}
.dk.gr3 .nm{padding-bottom:10px!important}.dk.gr3.nmL .nm{font-size:10.5px!important;letter-spacing:-.06em!important;padding-left:0!important;padding-right:0!important;text-overflow:clip!important}.dk.gr3 .lk small{margin-bottom:14px}
.dk.gr3.pk{filter:drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff) drop-shadow(0 0 6px var(--berry))!important;animation:none}
.sk-chips .rc-sk:not(.on) .dk.gr3{filter:saturate(.8) drop-shadow(0 0 5px #ffb31f)!important;animation:none}
.dk.locked .lk{border-radius:0!important}

/* --- 공통: 아이콘 뒤로 버튼 --- */
.ic-back{position:absolute;left:max(10px,env(safe-area-inset-left,0px));top:max(8px,env(safe-area-inset-top,0px));width:46px!important;height:46px!important;min-height:0!important;padding:0!important;border-radius:50%!important;font-size:0!important;color:transparent!important;background:#fff ${svgUrl31(IC31.x)} 50% 50%/20px no-repeat!important;border:3px solid var(--choco)!important;box-shadow:0 4px 0 var(--choco)!important;z-index:6}
.ic-back:active{transform:translateY(3px);box-shadow:0 1px 0 var(--choco)!important}

/* --- 역할 고르기 (혼자 하기 · 아무나와 하기 · 친구 방) --- */
#role .slab{position:relative;background:none;border:0;box-shadow:none;max-width:none;width:100%;height:100%;padding:6px 0 4px;box-sizing:border-box;justify-content:center;gap:clamp(10px,3.4vh,18px)}
#role .kicker,#role h2,#roleNote,#role .role-tabs small{display:none!important}
#role .role-tabs{width:auto;border:0;box-shadow:none;overflow:visible;gap:12px;background:none}
#role .role-tabs button{flex:none;display:flex;align-items:center;justify-content:center;line-height:1;width:clamp(124px,20vw,160px);height:44px;padding:0;border:3px solid var(--choco);border-radius:22px;background:linear-gradient(#fff,#f4e4d2);box-shadow:0 5px 0 var(--choco),inset 0 -4px 0 #0000000f;color:var(--choco);transition:transform .08s}
#role .role-tabs button b{font:19px var(--f-display);letter-spacing:.02em}
#role .role-tabs button.on{background:linear-gradient(#ff9cc6,#e8407e);color:#fff;transform:translateY(3px);box-shadow:0 2px 0 var(--choco),inset 0 3px 0 #ffffff66,inset 0 -4px 0 #0000001f}
#role .role-tabs button.on b{text-shadow:0 2px 0 #9e1f52}
#role .roles{gap:clamp(16px,4vw,30px)!important;align-items:stretch}
#role .rcard{position:relative;isolation:isolate;width:clamp(178px,28vw,226px)!important;height:clamp(150px,50vh,212px);padding:0 0 10px;gap:0;justify-content:flex-end;border:4px solid var(--choco);border-radius:30px;box-shadow:0 9px 0 var(--choco),0 16px 14px -6px #4a2a1a59;overflow:hidden;transition:transform .08s}
#role .rcard::before{content:"";position:absolute;z-index:-1;left:50%;top:44%;width:78%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,#ffffffe6 0 35%,#fff0 70%)}
#role .rcard::after{content:"";position:absolute;z-index:-1;inset:5px 9px auto;height:34%;border-radius:22px 22px 50% 50%/22px 22px 16px 16px;background:linear-gradient(#ffffffb3,#fff0)}
#role .rcard svg{position:absolute;left:50%;top:7%;transform:translateX(-50%);width:auto!important;height:62%!important;filter:drop-shadow(0 5px 0 #4a2a1a2e)}
#role .rcard b{position:relative;font:clamp(22px,6.6vh,28px) var(--f-display);color:var(--choco);text-shadow:0 2px 0 #fff,0 -1px 0 #fff}
#role .rcard small{display:none!important}
#role .rcard:active{transform:translateY(6px);box-shadow:0 3px 0 var(--choco)}
#role .rcard.mint{background:linear-gradient(#ecfff8,#9fe6cd)}#role .rcard.berry{background:linear-gradient(#fff0f6,#ffb3d2)}
#role .rcard.lemon{background:linear-gradient(#fffbe6,#ffd76a)}#role .rcard.grape{background:linear-gradient(#f6f0ff,#c6aeff)}
#role .ai-lvl{margin:0;gap:8px;min-height:38px}
#role .ai-lvl[hidden]{display:flex!important;visibility:hidden}
#role .ai-lvl>span{width:30px;height:30px;font-size:0;background:${svgUrl31(IC31.bot)} center/30px no-repeat}
#role .ai-lvl button{font:16px var(--f-display);min-width:70px;height:34px;padding:0 10px;border:3px solid var(--choco);border-radius:17px;background:#fff;box-shadow:0 4px 0 var(--choco);color:var(--choco)}
#role .ai-lvl button.on{background:linear-gradient(#ffe48a,#ffbd2e);transform:translateY(2px);box-shadow:0 2px 0 var(--choco)}

/* --- 친구랑 하기 · 코드 화면 --- */
#lobby.pick .slab{position:relative;background:none;border:0;box-shadow:none;max-width:none;width:100%;height:100%;padding:0;flex-direction:row;justify-content:center;align-items:center;gap:clamp(16px,4vw,30px)}
#lobby.pick .kicker,#lobby.pick #lobT,#lobby.pick #lobCode{display:none!important}
#lobby.pick #lobL{position:absolute;left:50%;bottom:6px;transform:translateX(-50%);margin:0;font:15px var(--f-display);color:#c2185b;background:#fff;border:2.5px solid var(--choco);border-radius:12px;padding:3px 12px;white-space:nowrap}
#lobby.pick #lobL:empty{display:none}
#lobby.pick .slab>.row:last-child{position:static;margin:0;gap:0}
#lobby.pick #lobPick,#lobby.pick #lobJoin{margin:0}
#lobby.pick #bRand{display:none!important}
.card31{position:relative;isolation:isolate;display:flex!important;flex-direction:column;align-items:center;justify-content:flex-end;width:clamp(178px,28vw,226px)!important;height:clamp(150px,50vh,212px);box-sizing:border-box;padding:0 0 12px!important;border:4px solid var(--choco)!important;border-radius:30px!important;box-shadow:0 9px 0 var(--choco),0 16px 14px -6px #4a2a1a59!important;overflow:hidden;color:var(--choco)!important;cursor:pointer;font:inherit}
.card31::after{content:""!important;position:absolute;z-index:-1;inset:5px 9px auto;height:34%;border-radius:22px 22px 50% 50%/22px 22px 16px 16px;background:linear-gradient(#ffffffb3,#fff0)!important;border:0!important;box-shadow:none!important}
.card31>svg{position:absolute;left:50%;top:9%;transform:translateX(-50%);height:56%;width:auto;filter:drop-shadow(0 5px 0 #4a2a1a2e)}
.card31 .mt{display:contents}.card31 small{display:none!important}
.card31 b{position:relative;font:clamp(22px,6.6vh,28px) var(--f-display)!important;color:var(--choco)!important;text-shadow:0 2px 0 #fff,0 -1px 0 #fff!important}
.card31:active{transform:translateY(6px);box-shadow:0 3px 0 var(--choco)!important}
.card31.mint{background:linear-gradient(#ecfff8,#9fe6cd)!important}.card31.berry{background:linear-gradient(#fff0f6,#ffb3d2)!important}.card31.lemon{background:linear-gradient(#fffbe6,#ffd76a)!important}
#lobby.pick #lobJoin{position:relative;isolation:isolate;display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;justify-content:center;gap:9px;width:clamp(178px,28vw,226px);height:clamp(150px,50vh,212px);box-sizing:border-box;padding:14px;border:4px solid var(--choco);border-radius:30px;background:linear-gradient(#fffbe6,#ffd76a);box-shadow:0 9px 0 var(--choco),0 16px 14px -6px #4a2a1a59}
#lobby.pick #lobJoin::before{content:"";flex:none;align-self:center;width:90px;height:50px;background:${svgUrl31(IC31.key)} center/contain no-repeat;margin-bottom:-4px}
#lobby.pick #codeIn{flex:none;width:100%!important;margin:0!important;font-size:22px;min-height:46px;letter-spacing:.24em;box-shadow:inset 0 3px 0 #0000001a}
#lobby.pick #codeIn::placeholder{letter-spacing:.06em;color:#b99a80;font-size:17px}
#lobby.pick #bJoin{flex:none;width:100%!important;margin:0!important;min-height:46px;justify-content:center;padding:0}
#lobby.pick #bJoin b{font:20px var(--f-display)}

/* --- 친구랑 하기: 고르기 --- */
.fw31{position:relative;display:flex;gap:clamp(16px,4vw,30px);padding:8px 4px 10px}
.fw31 .card31{width:clamp(170px,26vw,210px)!important;height:clamp(150px,48vh,200px)}
.pg31x{position:fixed!important}
#pgM.fw-on{background:#2b160bb0!important;backdrop-filter:blur(2px)}
#pgM.fw-on .slab,#pgM.fw-on .pg-slab{background:none!important;border:0!important;box-shadow:none!important;width:auto!important;overflow:visible!important}
`;document.head.appendChild(st)}


const DECO31L=`<svg viewBox="0 0 220 380"><g stroke="#c9789c" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" opacity=".55"><path d="M48 250 V352" fill="none"/><circle cx="48" cy="226" r="30" fill="#ffe0ee"/><path d="M48 226 m-16 0 a16 16 0 1 1 16 16 a9 9 0 1 1 -9 -9" fill="none"/><g transform="rotate(-25 150 300)"><rect x="128" y="286" width="44" height="28" rx="12" fill="#d8f5ff"/><path d="M128 300 l-18 -12 v24 z M172 300 l18 -12 v24 z" fill="#d8f5ff"/></g><path d="M118 92 l7 15 16 2 -12 11 3 16 -14 -8 -14 8 3 -16 -12 -11 16 -2z" fill="#fff4c2"/><circle cx="34" cy="60" r="7" fill="#fff"/><circle cx="170" cy="190" r="5" fill="#fff"/></g></svg>`;
const DECO31R=`<svg viewBox="0 0 220 380"><g stroke="#c9789c" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" opacity=".55"><ellipse cx="160" cy="70" rx="34" ry="14" fill="#e3d4ff"/><rect x="128" y="74" width="64" height="10" rx="5" fill="#fff"/><ellipse cx="160" cy="90" rx="34" ry="14" fill="#e3d4ff"/><path d="M60 300 c0 -30 34 -30 34 0 c0 -30 34 -30 34 0 c0 24 -34 44 -34 44 c0 0 -34 -20 -34 -44z" fill="#ffd3e4" transform="rotate(12 94 310)"/><path d="M176 230 V182 a16 16 0 0 0 -32 0" fill="none" stroke="#e8407e" stroke-width="10" opacity=".7"/><path d="M176 230 V182 a16 16 0 0 0 -32 0" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="8 8"/><path d="M60 150 l5 11 12 1 -9 8 2 12 -10 -6 -10 6 2 -12 -9 -8 12 -1z" fill="#fff4c2"/><circle cx="196" cy="330" r="7" fill="#fff"/><circle cx="40" cy="40" r="5" fill="#fff"/></g></svg>`;
{const st=document.createElement('style');st.textContent=`
#role,#lobby.pick{background:radial-gradient(ellipse at 50% 40%,#fff4f8 0 22%,#ffd3e5 60%,#f6aecb 100%)!important;overflow:hidden}
#role::before,#lobby.pick::before{content:"";position:absolute;inset:-40%;background:repeating-conic-gradient(from 0deg at 50% 50%,#ffffff2e 0 9deg,#fff0 9deg 22deg);animation:ray31 60s linear infinite;pointer-events:none;z-index:-1}
@keyframes ray31{to{transform:rotate(360deg)}}
#role::after,#lobby.pick::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;
  background:${svgUrl31(DECO31L)} left max(4px,env(safe-area-inset-left,0px)) bottom 0/auto 100% no-repeat,${svgUrl31(DECO31R)} right max(4px,env(safe-area-inset-right,0px)) top 0/auto 100% no-repeat,radial-gradient(#ffffff66 2px,#fff0 2.6px) 0 0/28px 28px}
#role>.slab,#lobby.pick>.slab{z-index:1}
#role,#lobby.pick{isolation:isolate}`;document.head.appendChild(st)}
// 카드·스킬 화면: 늘 등급 순서로 (기본 → 일반 → 희귀 → 전설)
function sortGr31(box){if(!box)return;const g=el=>{const d=el.classList.contains('dk')?el:el.querySelector('.dk');if(!d||d.classList.contains('fixed'))return -1;const m=d.className.match(/\bgr(\d)\b/);return m?+m[1]:0};
  const items=[...box.children].map((el,i)=>({el,i,g:g(el)}));items.sort((a,b)=>a.g-b.g||a.i-b.i);for(const it of items)box.appendChild(it.el)}
{const rd=renderDeck;renderDeck=function(){const r=rd.apply(this,arguments);try{sortGr31($('deckPool'))}catch(e){}return r}}

// 역할 화면 · 로비: 뒤로 버튼을 아이콘으로
$('bRoleBack').classList.add('ic-back');$('bRoleBack').setAttribute('aria-label','뒤로');
// 로비: 코드 고르는 화면이면 .pick
{const lb=lobby;lobby=function(t,l,btn,o={}){lb.apply(this,arguments);const pk=!!o.pick;$('lobby').classList.toggle('pick',pk);$('bLobBack').classList.toggle('ic-back',pk);if(pk)$('lobL').textContent=''}}
{const h=$('bHost');h.classList.add('card31');h.insertAdjacentHTML('afterbegin',IC31.house)}
// 친구랑 하기 고르기: 큰 카드 둘 + 닫기 아이콘
fwOpen=async function(){try{await initAudio()}catch(e){}SFX.click();$('pgM').hidden=false;$('pgM').classList.add('fw-on');
  const two=$('bRace')?$('bRace').querySelector('svg').outerHTML:'';
  $('pgBody').innerHTML=`<div class="fw31"><button class="card31 mint" id="bFwList">${two}<b>친구 목록</b></button><button class="card31 lemon" id="bFwCode">${IC31.key}<b>코드로 하기</b></button><button class="pg31x ic-back" id="bFwX" aria-label="닫기"></button></div>`;
  const close=()=>{$('pgM').hidden=true;$('pgM').classList.remove('fw-on')};
  $('bFwList').onclick=()=>{SFX.click();close();openFriends()};$('bFwCode').onclick=()=>{SFX.click();close();onlineStart()};$('bFwX').onclick=()=>{SFX.click();close()}};
{const pc=window.pgClose;if(typeof pc==='function')pgClose=function(){$('pgM').classList.remove('fw-on');return pc.apply(this,arguments)}}
new MutationObserver(()=>{if($('pgM').hidden)$('pgM').classList.remove('fw-on')}).observe($('pgM'),{attributes:true,attributeFilter:['hidden']});
