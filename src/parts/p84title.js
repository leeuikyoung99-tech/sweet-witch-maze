// ===== 84차: 제목 화면 = 메인 게임 · 스토리 · 미니게임 =====
// 메인 게임·미니게임을 누르면 같은 자리에서 '혼자 하기 · 아무나와 하기 · 친구랑 하기'로 바뀌어요(왼쪽에 돌아가기).
// 고른 게임으로만 설정 화면에 들어가요(설정 화면 위쪽 게임 탭은 없앴어요).
const TT={mode:null};
const TTI={
 main:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="6" width="36" height="36" rx="8" fill="#fff" stroke="#4a2a1a" stroke-width="3"/><path d="M14 6v14h10M34 42V28H24v-8M14 30h-8M34 14h8" fill="none" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="19" cy="36" r="3.4" fill="#5fcf9f" stroke="#4a2a1a" stroke-width="2"/><path d="M29 15l3-5 3 5z" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 mini:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 40h36" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/><path d="M12 40 18 22h12l6 18z" fill="#b98cff" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="17" r="7" fill="#fff" stroke="#4a2a1a" stroke-width="3"/><path d="M13 12h22L24 2z" fill="#7a4dd0" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><path d="M9 13h30" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/><circle cx="21.5" cy="17.5" r="1.3" fill="#4a2a1a"/><circle cx="26.5" cy="17.5" r="1.3" fill="#4a2a1a"/><path d="M38 24l-3 16" stroke="#fff8ee" stroke-width="3"/><circle cx="38.5" cy="22" r="3.5" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="2"/></svg>'};
{const row=$('bAI').parentNode;const mk=(id,cls,ic,t,s)=>{const b=document.createElement('button');b.className='mbtn '+cls;b.id=id;b.innerHTML=`<span class="mi">${ic}</span><span class="mt"><b>${t}</b><small>${s}</small></span>`;return b};
  const bMain=mk('bMain','mint',TTI.main,'메인 '+'게임','도둑 대 마녀 미로'),bMini=mk('bMini','grape',TTI.mini,'미니게임','거대 마녀 · 3분 한 판');
  const bk=document.createElement('button');bk.id='bTBack';bk.className='tback';bk.setAttribute('aria-label','돌아가기');bk.innerHTML=`${LBI.back}<b></b>`;
  row.insertBefore(bk,$('bAI'));row.insertBefore(bMain,$('bAI'));row.insertBefore($('bStage'),$('bAI'));row.insertBefore(bMini,$('bAI'));row.classList.add('tt');
  bMain.onclick=async()=>{try{await initAudio()}catch(e){}SFX.click();TT.mode='main';ttSync()};
  bMini.onclick=async()=>{try{await initAudio()}catch(e){}SFX.click();TT.mode='mini';ttSync()};
  bk.onclick=()=>{SFX.click();TT.mode=null;ttSync()}}
const TTSUB={main:{bAI:'AI와 대결',bRandT:'도둑 랭크 · 마녀 랭크',bOnline:'코드로 방 만들기'},mini:{bAI:'AI와 대결',bRandT:'판돈·등급 없이',bOnline:'코드로 방 만들기'}};
function ttSync(){const row=$('bAI').parentNode,m=TT.mode;row.classList.toggle('sub',!!m);row.classList.toggle('mini',m==='mini');
  const bk=$('bTBack');bk.querySelector('b').textContent=m==='mini'?'미니게임':'메인 '+'게임';
  if(m){for(const id in TTSUB[m]){const s=$(id)&&$(id).querySelector('small');if(s)s.textContent=TTSUB[m][id]}const t=$('bOnline').querySelector('b');if(t)t.textContent=m==='main'?'친구랑 대전하기':'친구랑 하기'}
  LOBBY.pick=m||'main'}
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);try{ttSync()}catch(e){}return r}}
{const st0=syncTitle;syncTitle=function(){const r=st0.apply(this,arguments);try{if(TT.mode)ttSync()}catch(e){}return r}}
// 설정 화면: 제목 화면에서 고른 게임으로만, 위쪽 탭은 숨기고 제목에 '게임 · 방식'
{const sr=showRole;showRole=function(){if(LOBBY.fresh&&LOBBY.pick)LOBBY.pickNow=LOBBY.pick;const r=sr.apply(this,arguments);try{if(LOBBY.pickNow){LOBBY.game=LOBBY.pickNow;LOBBY.pickNow=null;LOBBY.role=lbDefRole();lbDraw()}}catch(e){console.warn(e)}return r}}
function ttRoleTitle(){const g=LOBBY.game==='mini';return (g?'거대 마녀':'마녀의 미로')+' · '+(!g&&ROLECTX==='friend'?'친구랑 대전하기':(LBCTX[ROLECTX]||'혼자 하기'))}
{const u=UNI.find(d=>d.box==='#role .slab');if(u){const f=u.title;u.title=b=>$('role').classList.contains('lb')?ttRoleTitle():f(b)}}
{const ld=lbDraw;lbDraw=function(){ld.apply(this,arguments);const t=$('role').querySelector('.uni-t');if(t){const k=ttRoleTitle();t.dataset.k=k;t.textContent=k}}}
{const st=document.createElement('style');st.textContent=`
#lbTabs{display:none!important}
.menu-row.tt #bAI,.menu-row.tt #bRandT,.menu-row.tt #bOnline,.menu-row.tt #bTBack{display:none}
.menu-row.tt.sub #bAI,.menu-row.tt.sub #bRandT,.menu-row.tt.sub #bOnline{display:flex}.menu-row.tt.sub #bTBack{display:flex}
.menu-row.tt.sub #bMain,.menu-row.tt.sub #bMini,.menu-row.tt.sub #bStage{display:none}
#bTBack{align-items:center;gap:4px;align-self:center;height:44px;padding:0 12px 0 6px;border-radius:22px;border:3px solid var(--choco);background:#fff8ee;box-shadow:0 3px 0 var(--choco);font:14px var(--f-display);color:var(--choco);cursor:pointer;flex:0 0 auto;white-space:nowrap}
#bTBack svg{width:22px;height:22px}.menu-row.tt.mini #bTBack{background:#e9dcff}
.menu-row.tt.mini #bAI,.menu-row.tt.mini #bRandT,.menu-row.tt.mini #bOnline{filter:hue-rotate(0deg)}
@media (max-width:700px){#bTBack b{display:none}#bTBack{padding:0 9px}}`;document.head.appendChild(st)}
