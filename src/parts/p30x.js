/* ================= 31차 (나): 친구랑 하기 · 랭크 창 · 내 정보 기록 · 미끄럼 발판 AI · 벽에 낀 AI 도둑 ================= */
// ----- 튜토리얼 중엔 판이 끝난 뒤 "결과 보기" 막대도 안 보여요 -----
setInterval(()=>{document.body.classList.toggle('tu-all',!!(typeof TU!=='undefined'&&TU.on))},200);

// ----- 친구랑 하기: 친구 목록 · 코드로 하기 (처음 화면 친구 버튼은 없어요) -----
{const sm=$('bOnline')&&$('bOnline').querySelector('small');if(sm)sm.textContent='친구 목록 · 코드'}
document.addEventListener('click',e=>{if(!e.target.closest||!e.target.closest('#bOnline'))return;e.stopImmediatePropagation();e.preventDefault();fwOpen()},true);
async function fwOpen(){try{await initAudio()}catch(e){}SFX.click();$('pgM').hidden=false;
  $('pgBody').innerHTML=`<div class="kicker">친구랑 하기</div><div class="row fw-two"><button class="mbtn mint" id="bFwList"><span class="mt"><b>친구 목록</b></span></button><button class="mbtn berry" id="bFwCode"><span class="mt"><b>코드로 하기</b></span></button></div><button class="sbtn" id="bFwX">닫기</button>`;
  $('bFwList').onclick=()=>{SFX.click();$('pgM').hidden=true;openFriends()};$('bFwCode').onclick=()=>{SFX.click();$('pgM').hidden=true;onlineStart()};$('bFwX').onclick=()=>{SFX.click();$('pgM').hidden=true}}

// ----- 판 기록: 마지막 역할 · 사람 대 사람 · 카드 조합 -----
SAVE.pvp=SAVE.pvp||{g:0,w:0};SAVE.combo=SAVE.combo||{hero:{},devil:{}};
function comboKey(role){if(role==='devil')return(SAVE.deck||[]).filter(k=>k!=='move').slice().sort().join(',');return(G.heroSkills&&G.heroSkills.length?G.heroSkills:SAVE.skills||[]).filter(k=>k!=='flag'&&k!=='dash').slice().sort().join(',')}
{const em=endMatch;endMatch=function(win,why){const was=G.over;const r=em.apply(this,arguments);
  try{if(!was&&G.over&&!window.__aiBoth&&!window.__simFast&&!G.tutor&&!(typeof TU!=='undefined'&&TU.on)&&!G.duo){const role=NET.on?NET.role:G.mode;const me=role==='devil'?!win:!!win;SAVE.lastRole=role;
    if(NET.on){SAVE.pvp.g++;if(me)SAVE.pvp.w++}
    if(!G.stage){const k=comboKey(role);if(k){const T=SAVE.combo[role]||(SAVE.combo[role]={});const c=T[k]||(T[k]={g:0,w:0});c.g++;if(me)c.w++}}saveGame()}}catch(e){}return r}}

// ----- 랭크 창: 최근에 한 역할만, 위에서 반대 역할로 바꿔 보기 · 설명은 ? 안에 -----
openRank=function(tab){const role=tab||(SAVE.lastRole==='devil'?'devil':'hero');const R=role==='devil'?SAVE.rankW:SAVE.rankT;const p=R.p|0,t=tierOfP(p);
  $('rankRow').className='rk3';
  $('rankRow').innerHTML=`<div class="rk3-tabs"><button data-r="hero" class="${role==='hero'?'on':''}">도둑</button><button data-r="devil" class="${role==='devil'?'on':''}">마녀</button><button class="rk3-q" id="bRkQ" aria-label="설명">?</button></div>
    <div class="rk3-now">${tierIcon(t)}<b>${rankTxtP(p)}</b>${t<4?`<span>다음 등급까지 ${100-p%100}점</span>`:''}</div>
    <div class="rk-row">${TIERS.map(([n],i)=>`<div class="rk${i===t?' cur':''}${i<t?' done':''}">${tierIcon(i)}<b>${n}</b><span class="rk-s">${i*100}점</span></div>`).join('')}</div>`;
  $('rankNow').innerHTML='';const how=$('rankHow');how.hidden=true;
  how.innerHTML='<b>아무나와 하기</b>에서 고른 역할로 3판을 해요. 이기면 <b>+25점</b> 안팎, 지면 <b>-20점</b> 안팎<br>나보다 높은 상대를 이기면 더 많이 얻어요 · 처음 오른 등급마다 그 등급 상자를 받아요';
  for(const b of $('rankRow').querySelectorAll('.rk3-tabs [data-r]'))b.onclick=()=>{SFX.click();openRank(b.dataset.r)};
  $('bRkQ').onclick=()=>{SFX.click();how.hidden=!how.hidden};
  $('rankM').querySelector('.kicker').textContent='랭크';$('rankM').hidden=false};

// ----- 내 정보: 초상화를 누르면 이름·아이콘 바꾸기 · 사람 대 사람 기록 · 다음 장에 카드 조합 승률 -----
function obEdit(next){$('pgM').hidden=false;let sel=PICONS.includes(SAVE.icon)?SAVE.icon:PICONS[0];
  $('pgBody').innerHTML=`<div class="kicker">내 정보 바꾸기</div><input class="ob-in" id="obIn" maxlength="8" placeholder="2~8글자" autocomplete="off" spellcheck="false" aria-label="닉네임" value="${SAVE.nick||''}"><p class="note" id="obMsg"></p>
    <div class="ob-ics">${PICONS.map(k=>`<button class="ob-ic${k===sel?' on':''}" data-k="${k}" aria-label="${CARDS[k]?CARDS[k].n:k}">${ART[k]}</button>`).join('')}</div>
    <div class="row pg-two"><button class="sbtn" id="bObX">취소</button><button class="mbtn berry small" id="bObGo"><span class="mt"><b>저장</b></span></button></div>`;
  const inp=$('obIn');for(const ev of['keydown','keyup','pointerdown'])inp.addEventListener(ev,e=>e.stopPropagation());
  for(const b of $('pgBody').querySelectorAll('.ob-ic'))b.onclick=()=>{SFX.click();sel=b.dataset.k;for(const o of $('pgBody').querySelectorAll('.ob-ic'))o.classList.toggle('on',o===b)};
  $('bObX').onclick=()=>{SFX.click();next()};
  $('bObGo').onclick=()=>{const v=cleanNick(inp.value);if(v.length<2){SFX.deny();$('obMsg').textContent='이름을 두 글자 이상 넣어 주세요';return}SAVE.nick=v;SAVE.me.nick=v;SAVE.icon=sel;saveGame();syncProf();SFX.click();try{inp.blur()}catch(e){}next()}}
const pct=(w,g)=>g?Math.round(w/g*100)+'%':'-';
function comboRows(role){const T=SAVE.combo[role]||{};const L=Object.entries(T).sort((a,b)=>b[1].g-a[1].g).slice(0,4);
  if(!L.length)return'<p class="note pf-empty">아직 기록이 없어요</p>';
  return L.map(([k,c])=>`<div class="pf-cb"><span class="pf-cbn">${k.split(',').map(q=>role==='devil'?(CARDS[q]?CARDS[q].n:q):(SKN[q]?SKN[q][0]:q)).join(' · ')}</span><b>${pct(c.w,c.g)}</b><small>${c.g}판</small></div>`).join('')}
profOpen=function(page){const need=xpNeed(SAVE.lv),T=SAVE.rankT.p|0,W=SAVE.rankW.p|0;$('pgM').hidden=false;
  if(page===2){$('pgBody').innerHTML=`<div class="kicker">카드 조합 승률</div><div class="pf-cbs"><div><h3>마녀 덱</h3>${comboRows('devil')}</div><div><h3>도둑 스킬</h3>${comboRows('hero')}</div></div>
    <div class="row pf-btns"><button class="sbtn" id="bPfPrev">이전</button><button class="sbtn" id="bPfX">닫기</button></div>`;
    $('bPfPrev').onclick=()=>{SFX.click();profOpen(1)};$('bPfX').onclick=()=>{SFX.click();pgClose()};return}
  const cOwn=CPOOL.filter(k=>k!=='move'&&cardOpen(k)).length,cAll=CPOOL.filter(k=>k!=='move').length,sOwn=SKP.filter(skillOpen).length;
  $('pgBody').innerHTML=`<div class="pf-top"><button class="pf-ic" id="bPfIc" aria-label="이름·아이콘 바꾸기">${picon(SAVE.icon)}</button>
      <div class="pf-id"><div class="pf-nm"><b>${SAVE.nick||'이름 없음'}</b></div>
        <div class="pf-lv"><b>Lv ${SAVE.lv}</b><span class="xpb"><i style="width:${Math.round(SAVE.xp/need*100)}%"></i></span><small>${SAVE.xp} / ${need}</small></div></div></div>
    <div class="pf-grid">
      <div><small>도둑 랭크</small><span>${tierIcon(tierOfP(T))}${rankTxtP(T)}</span></div>
      <div><small>마녀 랭크</small><span>${tierIcon(tierOfP(W))}${rankTxtP(W)}</span></div>
      <div><small>사람 대 사람</small><span>${SAVE.pvp.g}판 · 승률 ${pct(SAVE.pvp.w,SAVE.pvp.g)}</span></div>
      <div><small>모은 카드</small><span>마녀 ${cOwn}/${cAll} · 도둑 ${sOwn}/${SKP.length}</span></div></div>
    <div class="row pf-btns">${SAVE.boxes.length?`<button class="mbtn lemon small" id="bPfBox"><span class="mt"><b>상자 열기 ${SAVE.boxes.length}</b></span></button>`:''}<button class="sbtn" id="bPfTut">튜토리얼</button><button class="sbtn" id="bPfX">닫기</button><button class="sbtn" id="bPfNext">다음</button></div>`;
  $('bPfX').onclick=()=>{SFX.click();pgClose()};$('bPfIc').onclick=()=>{SFX.click();obEdit(()=>profOpen(1))};$('bPfNext').onclick=()=>{SFX.click();profOpen(2)};
  if($('bPfBox'))$('bPfBox').onclick=()=>{SFX.click();pgBoxes()};$('bPfTut').onclick=()=>{SFX.click();pgClose();tuStart()}};
frNickAsk=function(){obEdit(()=>{pgClose();if(screen==='friendS'){frRender();frProbeAll()}})};

// ----- 미끄럼 발판: 근처(3칸)의 포탑·몬스터 쪽으로, 없으면 가던 방향으로 (도둑 뒤쪽에 있는 건 빼요) -----
function slipDir(h,ds){if(!ds||!ds.length)return null;const fl=Math.hypot(h.mvx||0,h.mvz||0),fx=fl>.05?h.mvx/fl:0,fz=fl>.05?h.mvz/fl:0;
  let tg=null,bd=C*3.2;for(const e of G.ents){if(e.dead)continue;if(!(isMon(e)||e.type==='tower'))continue;const vx=e.x-h.x,vz=e.z-h.z,d=Math.hypot(vx,vz);if(d>bd||d<.3)continue;if(fl>.05&&(vx*fx+vz*fz)/d<-.35)continue;bd=d;tg=[vx/d,vz/d]}
  const aim=tg||(fl>.05?[fx,fz]:null);if(!aim)return null;let best=null,bs=-9;for(const d of ds){const sc=d[0]*aim[0]+d[1]*aim[1];if(sc>bs){bs=sc;best=d}}return best}
{const uh=updHero;updHero=function(dt){const h=G.hero;const x0=h?h.x:0,z0=h?h.z:0;const r=uh.apply(this,arguments);
  if(h&&dt>0&&!(h.slide&&h.slide.t>0)){const vx=(h.x-x0)/dt,vz=(h.z-z0)/dt,k=Math.min(1,dt*6);h.mvx=(h.mvx||0)*(1-k)+vx*k;h.mvz=(h.mvz||0)*(1-k)+vz*k}
  // ----- AI 도둑이 벽에 끼거나 한자리에서 못 빠져나오면 칸 한가운데로 옮기고 길을 다시 찾아요 -----
  try{if(h&&!G.over&&((G.mode==='devil'&&!NET.on)||window.__aiBoth)&&G.t>4){const free=!(h.root>0)&&!(h.frozen>0)&&!(h.stun>0)&&!(h.slide&&h.slide.t>0)&&!(h.hp<=0);
    const inW=nearWalls(h.x,h.z).some(w=>h.x>w[0]+.02&&h.x<w[2]-.02&&h.z>w[1]+.02&&h.z<w[3]-.02);
    h.__sk=(h.__sk||0)+dt;if(h.__sk>=2.5||inW){const moved=Math.hypot(h.x-(h.__sx??h.x),h.z-(h.__sz??h.z));
      if(inW||(free&&moved<.6)){const[cx,cz]=cellOf(h.x,h.z);h.x=cx2x(cx);h.z=cx2x(cz);collide(h,HERO.r);try{look()}catch(e){}h.unstuck=(h.unstuck||0)+1}
      h.__sk=0;h.__sx=h.x;h.__sz=h.z}}}catch(e){}
  return r}}

{const st=document.createElement('style');st.textContent=`
body.tu-all #revealBar{display:none!important}
#bFriend{display:none!important}
.fw-two{gap:12px;flex-wrap:wrap;justify-content:center}.fw-two .mbtn{min-width:150px}
.rk3{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%}
.rk3-tabs{display:flex;gap:6px;align-items:center}
.rk3-tabs button{font:15px var(--f-display);color:var(--choco);background:#fff;border:2.5px solid var(--choco);border-radius:12px;padding:4px 16px;box-shadow:0 3px 0 var(--choco);cursor:pointer}
.rk3-tabs button.on{background:#ff7eb6;color:#fff}
.rk3-tabs .rk3-q{width:34px;height:34px;padding:0;border-radius:50%;background:#fff8ee}
.rk3-now{display:flex;align-items:center;gap:8px;font:16px var(--f-display);color:var(--choco)}.rk3-now svg{width:34px;height:34px}.rk3-now span{font-size:13px;color:#7a5236}
.rk3 .rk-row{display:flex;gap:6px;justify-content:center}
.rk3 .rk{min-width:0}
#rankHow[hidden]{display:none!important}
.pf-ic{position:relative}
.pf-cbs{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}
.pf-cbs h3{margin:0 0 4px;font:14px var(--f-display);color:var(--choco)}
.pf-cb{display:grid;grid-template-columns:1fr auto auto;gap:6px;align-items:center;background:#fff;border:2px solid var(--choco);border-radius:10px;padding:4px 8px;margin-bottom:4px}
.pf-cbn{font-size:12px;line-height:1.3;word-break:keep-all}
.pf-cb b{font:15px var(--f-display);color:#e8508a}.pf-cb small{font-size:11px;color:#7a5236;white-space:nowrap}
.pf-empty{margin:0}`;document.head.appendChild(st)}
// 예전 그림 설명은 어디서도 저절로 안 떠요 (일시정지의 "하는 법"으로만)
try{SAVE.tut=SAVE.tut||{};for(const k in TUT)SAVE.tut[k]=1;saveGame()}catch(e){}
