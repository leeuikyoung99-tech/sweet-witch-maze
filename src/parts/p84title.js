// ===== 84차: 제목 화면 = 메인 게임 · 스토리 · 미니게임 =====
// 메인 게임·미니게임을 누르면 같은 자리에서 '혼자 하기 · 아무나와 하기 · 친구랑 하기'로 바뀌어요(왼쪽에 돌아가기).
// 고른 게임으로만 설정 화면에 들어가요(설정 화면 위쪽 게임 탭은 없앴어요).
const TT={mode:null};
const TTI={
 main:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="6" width="36" height="36" rx="8" fill="#fff" stroke="#4a2a1a" stroke-width="3"/><path d="M14 6v14h10M34 42V28H24v-8M14 30h-8M34 14h8" fill="none" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="36" r="3.4" fill="#5fcf9f" stroke="#4a2a1a" stroke-width="2"/><path d="M29 15l3-5 3 5z" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 mini:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 40h36" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/><path d="M12 40 18 22h12l6 18z" fill="#b98cff" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="17" r="7" fill="#fff" stroke="#4a2a1a" stroke-width="3"/><path d="M13 12h22L24 2z" fill="#7a4dd0" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><path d="M9 13h30" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/><circle cx="21.5" cy="17.5" r="1.3" fill="#4a2a1a"/><circle cx="26.5" cy="17.5" r="1.3" fill="#4a2a1a"/><path d="M38 24l-3 16" stroke="#fff8ee" stroke-width="3"/><circle cx="38.5" cy="22" r="3.5" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="2"/></svg>'};
{const row=$('bAI').parentNode,slab=row.parentNode;const mk=(id,cls,ic,t,s)=>{const b=document.createElement('button');b.className='mbtn '+cls;b.id=id;b.innerHTML=`<span class="mi">${ic}</span><span class="mt"><b>${t}</b><small>${s}</small></span>`;return b};
  const bMain=mk('bMain','mint',TTI.main,'메인 '+'게임','마녀의 미로'),bMini=mk('bMini','grape',TTI.mini,'미니게임','거대 마녀');
  // 닫기: 다른 창처럼 위 오른쪽 X (설정 자리, 게임 안에서는 설정을 숨겨요)
  const bk=document.createElement('button');bk.id='bTBack';bk.className='bk31 abs';bk.setAttribute('aria-label','닫기');slab.appendChild(bk);
  // 게임 안 제목(로고 대신) + 맵 사진 그림판
  const hd=document.createElement('div');hd.id='ttHead';hd.innerHTML='<span class="ti"></span><b></b>';slab.insertBefore(hd,$('tRank'));
  const art=document.createElement('div');art.id='ttArt';art.innerHTML='<div class="ta-in"><span class="ta-t"></span><i>VS</i><span class="ta-w"></span></div>';slab.insertBefore(art,row);
  row.insertBefore(bMain,$('bAI'));row.insertBefore($('bStage'),$('bAI'));row.insertBefore(bMini,$('bAI'));row.classList.add('tt');
  bMain.onclick=async()=>{try{await initAudio()}catch(e){}SFX.click();TT.mode='main';ttSync()};
  bMini.onclick=async()=>{try{await initAudio()}catch(e){}SFX.click();TT.mode='mini';ttSync()};
  bk.onclick=()=>{SFX.click();TT.mode=null;ttSync()}}
const TTSUB={main:{bAI:'AI와 대결',bRandT:'도둑 랭크 · 마녀 랭크',bOnline:'코드로 방 만들기'},mini:{bAI:'AI와 대결',bRandT:'판돈·등급 없이',bOnline:'코드로 방 만들기'}};
function ttSync(){const row=$('bAI').parentNode,slab=row.parentNode,m=TT.mode;row.classList.toggle('sub',!!m);row.classList.toggle('mini',m==='mini');
  slab.classList.toggle('t-top',!m);slab.classList.toggle('t-main',m==='main');slab.classList.toggle('t-mini',m==='mini');
  const hd=$('ttHead');if(m){hd.querySelector('b').textContent=m==='mini'?'거대 마녀':'마녀의 미로';hd.querySelector('.ti').innerHTML=TTI[m];ttArtDraw()}
  if(m){for(const id in TTSUB[m]){const s=$(id)&&$(id).querySelector('small');if(s)s.textContent=TTSUB[m][id]}const t=$('bOnline').querySelector('b');if(t)t.textContent=m==='main'?'친구랑 대전하기':'친구랑 하기'}
  LOBBY.pick=m||'main';ttFit()}
function ttArtDraw(){const a=$('ttArt');if(!a)return;let k=LOBBY.map;if(!k||!MAPIMG[k])k=(SAVE&&SAVE.lbMap&&MAPIMG[SAVE.lbMap])?SAVE.lbMap:'candy';
  if(a.dataset.k!==k){a.dataset.k=k;a.style.backgroundImage=`url(${MAPIMG[k]})`}
  const t=a.querySelector('.ta-t'),w=a.querySelector('.ta-w');if(!t.firstChild){t.innerHTML=MGI.thief||'';w.innerHTML=MGI.witch||''}}
// 창 크기는 첫 화면·메인·미니 모두 같게: 세 모양의 높이를 재서 가장 큰 값을 최소 높이로
function ttFit(){const row=$('bAI').parentNode,slab=row.parentNode,z0=slab.style.zoom;slab.style.minHeight='';slab.style.zoom='';
  const SC=['t-top','t-main','t-mini'],RC=['sub','mini'],cs=SC.filter(c=>slab.classList.contains(c)),rs=RC.filter(c=>row.classList.contains(c));let h=0;
  for(const [sc,rc] of [['t-top',[]],['t-main',['sub']],['t-mini',['sub','mini']]]){slab.classList.remove(...SC);slab.classList.add(sc);row.classList.remove(...RC);row.classList.add(...rc);h=Math.max(h,slab.offsetHeight)}
  slab.classList.remove(...SC);slab.classList.add(...cs);row.classList.remove(...RC);row.classList.add(...rs);if(h>0)slab.style.minHeight=h+'px';slab.style.zoom=z0;try{fitScr()}catch(e){}}
addEventListener('resize',()=>{try{ttFit()}catch(e){}});
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);try{ttSync()}catch(e){}return r}}
{const st0=syncTitle;syncTitle=function(){const r=st0.apply(this,arguments);try{ttSync()}catch(e){}return r}}
// 설정 화면: 제목 화면에서 고른 게임으로만, 위쪽 탭은 숨기고 제목에 '게임 · 방식'
{const sr=showRole;showRole=function(){if(LOBBY.fresh&&LOBBY.pick)LOBBY.pickNow=LOBBY.pick;const r=sr.apply(this,arguments);try{if(LOBBY.pickNow){LOBBY.game=LOBBY.pickNow;LOBBY.pickNow=null;LOBBY.role=lbDefRole();lbDraw()}}catch(e){console.warn(e)}return r}}
function ttRoleTitle(){const g=LOBBY.game==='mini';return (g?'거대 마녀':'마녀의 미로')+' · '+(!g&&ROLECTX==='friend'?'친구랑 대전하기':(LBCTX[ROLECTX]||'혼자 하기'))}
{const u=UNI.find(d=>d.box==='#role .slab');if(u){const f=u.title;u.title=b=>$('role').classList.contains('lb')?ttRoleTitle():f(b)}}
{const ld=lbDraw;lbDraw=function(){ld.apply(this,arguments);const t=$('role').querySelector('.uni-t');if(t){const k=ttRoleTitle();t.dataset.k=k;t.textContent=k}}}
{const st=document.createElement('style');st.textContent=`
#lbTabs{display:none!important}
.menu-row.tt #bAI,.menu-row.tt #bRandT,.menu-row.tt #bOnline{display:none}
.menu-row.tt.sub #bAI,.menu-row.tt.sub #bRandT,.menu-row.tt.sub #bOnline{display:flex}
.menu-row.tt.sub #bMain,.menu-row.tt.sub #bMini,.menu-row.tt.sub #bStage{display:none}
/* 창 크기는 세 화면 모두 같게. 첫 화면 = 로고·랭크·게임 3개·아래 메뉴, 게임 안 = 제목·맵 그림판·놀이 버튼 3개 */
.title-slab.t-top,.title-slab.t-main,.title-slab.t-mini{box-sizing:border-box;width:min(680px,97vw)}.title-slab.t-top{justify-content:center}
.menu-row.tt{width:100%}.menu-row.tt>.mbtn{flex:1 1 0;min-width:0;justify-content:center}
.title-slab #bTBack,.title-slab #ttHead,.title-slab #ttArt{display:none}
.title-slab.t-main #bTBack,.title-slab.t-mini #bTBack{display:block}
.title-slab #bTBack.abs{right:13px;top:13px}
.title-slab.t-main #bSnd,.title-slab.t-mini #bSnd,.title-slab.t-main #bProf,.title-slab.t-mini #bProf{display:none!important}
.title-slab.t-main>.duo,.title-slab.t-main>h1,.title-slab.t-main>.kicker,.title-slab.t-mini>.duo,.title-slab.t-mini>h1,.title-slab.t-mini>.kicker{display:none!important}
.title-slab.t-main #tRank,.title-slab.t-mini #tRank,.title-slab.t-main .sub-row,.title-slab.t-mini .sub-row{display:none!important}
.title-slab.t-main #ttHead,.title-slab.t-mini #ttHead{display:flex;align-items:center;justify-content:center;gap:8px;margin:2px 0 0;min-height:44px}
#ttHead .ti svg{width:38px;height:38px;display:block}#ttHead b{font:28px var(--f-display);color:var(--choco);letter-spacing:.5px;white-space:nowrap}
.title-slab.t-mini #ttHead b{color:#6b3fc4}
.title-slab.t-main #ttArt,.title-slab.t-mini #ttArt{display:block;flex:1 1 0;min-height:64px;width:100%;position:relative;border:3px solid var(--choco);border-radius:18px;overflow:hidden;background:#f6e2c8 50% 55%/cover no-repeat;box-shadow:0 4px 0 var(--choco)}
#ttArt::before{content:"";position:absolute;inset:0;background:linear-gradient(#fff0 35%,#4a2a1a59)}
.title-slab.t-mini #ttArt::before{background:linear-gradient(#7a4dd055,#4a1f9a99)}
#ttArt .ta-in{position:absolute;inset:6% 0 4%;display:flex;align-items:flex-end;justify-content:center;gap:4%}
#ttArt .ta-in>span{height:86%;aspect-ratio:1;display:block;filter:drop-shadow(0 3px 0 #4a2a1a99)}#ttArt .ta-in svg{width:100%;height:100%;display:block}
#ttArt .ta-in>i{align-self:center;font:normal clamp(18px,6vh,30px) var(--f-display);color:#fff;-webkit-text-stroke:2px var(--choco);paint-order:stroke;text-shadow:0 3px 0 var(--choco)}
.title-slab.t-mini #ttArt .ta-t{height:48%}.title-slab.t-mini #ttArt .ta-w{height:100%}.title-slab.t-mini #ttArt .ta-in{inset:4% 0 0}
@media (max-height:340px){#ttHead b{font-size:24px}#ttHead .ti svg{width:30px;height:30px}.title-slab.t-main #ttHead,.title-slab.t-mini #ttHead{margin:0}}
`;document.head.appendChild(st)}
