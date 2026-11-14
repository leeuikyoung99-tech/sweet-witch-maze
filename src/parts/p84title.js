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
  const art=document.createElement('div');art.id='ttArt';slab.insertBefore(art,row);
  row.insertBefore(bMain,$('bAI'));row.insertBefore($('bStage'),$('bAI'));row.insertBefore(bMini,$('bAI'));row.classList.add('tt');
  bMain.onclick=async()=>{try{await initAudio()}catch(e){}SFX.click();TT.mode='main';ttSync()};
  bMini.onclick=async()=>{try{await initAudio()}catch(e){}SFX.click();TT.mode='mini';ttSync()};
  bk.onclick=()=>{SFX.click();TT.mode=null;ttSync()}}
const TTSUB={main:{bAI:'AI와 대결',bRandT:'도둑 랭크 · 마녀 랭크',bOnline:'코드로 방 만들기'},mini:{bAI:'AI와 대결',bRandT:'판돈·등급 없이',bOnline:'코드로 방 만들기'}};
function ttSync(){const row=$('bAI').parentNode,slab=row.parentNode,m=TT.mode;row.classList.toggle('sub',!!m);row.classList.toggle('mini',m==='mini');
  slab.classList.toggle('t-top',!m);slab.classList.toggle('t-main',m==='main');slab.classList.toggle('t-mini',m==='mini');
  const hd=$('ttHead');if(m){hd.querySelector('b').textContent=m==='mini'?'거대 마녀':'마녀의 미로';hd.querySelector('.ti').innerHTML=TTI[m]}ttArtDraw();
  if(m){for(const id in TTSUB[m]){const s=$(id)&&$(id).querySelector('small');if(s)s.textContent=TTSUB[m][id]}const t=$('bOnline').querySelector('b');if(t)t.textContent=m==='main'?'친구랑 대전하기':'친구랑 하기'}
  LOBBY.pick=m||'main';ttFit()}
// 게임 안 그림판: 실제 게임 장면 영상(봇 대 봇 녹화)을 소리 없이 되풀이. 못 불러오면 맵 사진 + 도둑 VS 마녀 그림 그대로
const TTV={src:{main:'media/demo_main.mp4',mini:'media/demo_mini.mp4'},url:{},busy:{}};
function ttVidUrl(m){if(TTV.url[m])return Promise.resolve(TTV.url[m]);if(TTV.busy[m])return TTV.busy[m];
  return TTV.busy[m]=fetch(TTV.src[m]).then(r=>{if(!r.ok)throw 0;return r.blob()}).then(b=>{if(!b.size)throw 0;return TTV.url[m]=URL.createObjectURL(b)}).catch(()=>{TTV.busy[m]=null;return null})}
function ttArtDraw(){const a=$('ttArt');if(!a)return;const k=TT.mode||'main';
  if(a.dataset.k!==k){a.dataset.k=k;a.style.backgroundImage=`url(${TTPOST[k]})`}
  let v=a.querySelector('video');if(!v){v=document.createElement('video');v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('muted','');v.setAttribute('aria-hidden','true');v.preload='auto';a.appendChild(v);
    v.addEventListener('playing',()=>a.classList.add('vid'));v.addEventListener('error',()=>a.classList.remove('vid'))}
  const m=TT.mode;if(!m){try{v.pause()}catch(e){}return}
  if(v.dataset.m!==m){v.dataset.m=m;a.classList.remove('vid');try{v.pause()}catch(e){}v.removeAttribute('src');
    ttVidUrl(m).then(u=>{if(!u||TT.mode!==m||v.dataset.m!==m)return;v.src=u;const p=v.play();if(p&&p.catch)p.catch(()=>{})})}
  else if(v.src&&v.paused){const p=v.play();if(p&&p.catch)p.catch(()=>{})}}
// 켜고 조금 뒤 두 영상을 미리 받아 둬요(처음 들어갈 때 바로 나오게)
setTimeout(()=>{ttVidUrl('main');ttVidUrl('mini')},1500);
// 제목 화면을 떠나면 영상을 멈춰요
setInterval(()=>{try{const v=$('ttArt')&&$('ttArt').querySelector('video');if(!v)return;const on=screen==='title'&&TT.mode&&!document.hidden;if(!on&&!v.paused)v.pause();else if(on&&v.paused&&v.src){const p=v.play();if(p&&p.catch)p.catch(()=>{})}}catch(e){}},700);
// 창 크기는 첫 화면·메인·미니 모두 같게: 세 모양의 높이를 재서 가장 큰 값을 최소 높이로
function ttFit(){const slab=$('bAI').parentNode.parentNode;if(slab.style.minHeight)slab.style.minHeight='';try{fitScr()}catch(e){}}
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
/* 다른 큰 창(설정·스토리·카드)과 똑같은 크기: 화면 안쪽을 꽉 채워요 */
#title{align-items:stretch!important}
.title-slab.t-top,.title-slab.t-main,.title-slab.t-mini{box-sizing:border-box;width:min(820px,100%)!important;max-width:none!important;height:100%!important;max-height:none!important;margin:0 auto!important;border-radius:22px}
.title-slab.t-top{justify-content:center;gap:clamp(6px,2.4vh,14px)!important}
.title-slab.t-main,.title-slab.t-mini{justify-content:flex-start;gap:clamp(6px,2vh,12px)!important;padding-bottom:clamp(18px,5vh,26px)!important}
@media (max-height:340px){.title-slab.t-top>.kicker{display:none}.title-slab.t-top>.duo svg{width:clamp(38px,13vh,52px)!important;height:auto!important}.title-slab.t-top>h1{font-size:clamp(28px,10vh,40px)!important;margin:0!important}.title-slab.t-top{gap:clamp(5px,1.8vh,8px)!important}}
.title-slab.t-top .sub-row{flex-wrap:nowrap!important;max-width:100%}
@media (max-width:720px){.title-slab.t-top .sub-row{gap:5px!important}.title-slab.t-top .sub-row .sbtn{padding-left:7px!important;padding-right:7px!important}}
.menu-row.tt{width:100%;justify-content:center}.menu-row.tt>.mbtn{flex:0 1 auto;min-width:0;justify-content:center;padding-right:14px!important}
.title-slab #bTBack,.title-slab #ttHead,.title-slab #ttArt{display:none}
.title-slab.t-main #bTBack,.title-slab.t-mini #bTBack{display:block}
.title-slab #bTBack.abs{right:13px;top:13px}
.title-slab.t-main #bSnd,.title-slab.t-mini #bSnd,.title-slab.t-main #bProf,.title-slab.t-mini #bProf{display:none!important}
.title-slab.t-main>.duo,.title-slab.t-main>h1,.title-slab.t-main>.kicker,.title-slab.t-mini>.duo,.title-slab.t-mini>h1,.title-slab.t-mini>.kicker{display:none!important}
.title-slab.t-main #tRank,.title-slab.t-mini #tRank,.title-slab.t-main .sub-row,.title-slab.t-mini .sub-row{display:none!important}
.title-slab.t-main #ttHead,.title-slab.t-mini #ttHead{display:flex;align-items:center;justify-content:center;gap:8px;margin:2px 0 0;min-height:44px}
#ttHead .ti svg{width:38px;height:38px;display:block}#ttHead b{font:28px var(--f-display);color:var(--choco);letter-spacing:.5px;white-space:nowrap}
.title-slab.t-mini #ttHead b{color:#6b3fc4}
.title-slab.t-main #ttArt,.title-slab.t-mini #ttArt{display:block;flex:1 1 0;min-height:64px;width:100%;position:relative;border:3px solid var(--choco);border-radius:18px;overflow:hidden;background:#f6e2c8 50% 50%/cover no-repeat;box-shadow:0 4px 0 var(--choco)}
#ttArt video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .35s}#ttArt.vid video{opacity:1}
@media (max-height:340px){#ttHead b{font-size:24px}#ttHead .ti svg{width:30px;height:30px}.title-slab.t-main #ttHead,.title-slab.t-mini #ttHead{margin:0}}
`;document.head.appendChild(st)}
// 게임 안 배치: 위에 게임 이름, 아래 왼쪽 영상 · 오른쪽 세로 버튼 3개(모두 같은 크기)
{const st=document.createElement('style');st.textContent=`
.title-slab.t-main,.title-slab.t-mini{display:grid!important;grid-template-columns:minmax(0,1fr) clamp(170px,30%,250px);grid-template-rows:auto minmax(0,1fr);column-gap:clamp(18px,3.4vw,28px)!important;row-gap:clamp(6px,2vh,12px)!important;align-content:stretch}
.title-slab.t-main #ttHead,.title-slab.t-mini #ttHead{grid-column:1/3;grid-row:1}
.title-slab.t-main #ttArt,.title-slab.t-mini #ttArt{grid-column:1;grid-row:2;min-height:0;height:auto;max-height:100%;aspect-ratio:16/10;align-self:center;flex:none}
.title-slab.t-main .menu-row.tt.sub,.title-slab.t-mini .menu-row.tt.sub{grid-column:2;grid-row:2;flex-direction:column!important;flex-wrap:nowrap!important;justify-content:center;align-items:stretch;width:auto!important;gap:clamp(6px,2.2vh,12px)!important;margin:0!important;min-height:0}
.title-slab.t-main .menu-row.tt.sub>.mbtn,.title-slab.t-mini .menu-row.tt.sub>.mbtn{flex:0 0 auto!important;width:100%;justify-content:flex-start;padding-right:10px!important;min-height:0}
@media (max-height:340px){.title-slab.t-main .menu-row.tt.sub>.mbtn,.title-slab.t-mini .menu-row.tt.sub>.mbtn{height:52px}}`;document.head.appendChild(st)}
// 게임 이름도 다른 창(스토리·설정)처럼 왼쪽 위 22px 제목
{const st=document.createElement('style');st.textContent=`
.title-slab.t-main #ttHead,.title-slab.t-mini #ttHead{justify-content:flex-start!important;min-height:44px;margin:0 0 0 -11px!important;padding-left:0}
#ttHead .ti{display:none}#ttHead b{font-size:22px!important;letter-spacing:0!important}`;document.head.appendChild(st)}
