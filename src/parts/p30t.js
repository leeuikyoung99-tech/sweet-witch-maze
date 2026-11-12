/* ================= 30차 (어): 닉네임 · 아이콘 · 내 정보 ================= */
const PICONS=['ghost','skel','bat','bear','spider','soldier','tower','ice','choco','fake'].filter(k=>ART[k]);
const picon=k=>ART[PICONS.includes(k)?k:PICONS[0]];
const cleanNick=v=>String(v||'').replace(/[<>&"'`\\]/g,'').replace(/\s+/g,' ').trim().slice(0,8);
// 처음 화면 왼쪽 위: 아이콘 · 닉네임 · 레벨 (누르면 내 정보)
{const b=document.createElement('button');b.className='prof-chip';b.id='bProf';b.setAttribute('aria-label','내 정보');
  const sl=document.querySelector('#title .title-slab');if(sl)sl.appendChild(b);b.onclick=()=>{SFX.click();profOpen()}}
function syncProf(){const b=$('bProf');if(!b)return;const need=xpNeed(SAVE.lv);
  b.innerHTML=`<span class="pc-ic">${picon(SAVE.icon)}</span><span class="pc-t"><b>${SAVE.nick||'이름 없음'}</b><small>Lv ${SAVE.lv}<span class="pc-xp"><i style="width:${Math.round(SAVE.xp/need*100)}%"></i></span></small></span>`+(SAVE.boxes.length?`<i class="pc-bx">${SAVE.boxes.length}</i>`:'')}
function profOpen(){const need=xpNeed(SAVE.lv),T=SAVE.rankT.p|0,W=SAVE.rankW.p|0;
  const cOwn=Object.keys(CARDS).filter(k=>CPOOL.includes(k)&&k!=='move'&&cardOpen(k)).length,cAll=CPOOL.filter(k=>k!=='move').length,sOwn=SKP.filter(skillOpen).length;
  $('pgM').hidden=false;$('pgBody').innerHTML=`<div class="kicker">내 정보</div>
    <div class="pf-top"><button class="pf-ic" id="bPfIc" aria-label="아이콘 바꾸기">${picon(SAVE.icon)}<i>바꾸기</i></button>
      <div class="pf-id"><div class="pf-nm"><b>${SAVE.nick||'이름 없음'}</b><button class="sbtn tiny" id="bPfNm">이름 바꾸기</button></div>
        <div class="pf-lv"><b>Lv ${SAVE.lv}</b><span class="xpb"><i style="width:${Math.round(SAVE.xp/need*100)}%"></i></span><small>${SAVE.xp} / ${need}</small></div></div></div>
    <div class="pf-grid">
      <div><small>도둑 랭크</small><span>${tierIcon(tierOfP(T))}${rankTxtP(T)}</span></div>
      <div><small>마녀 랭크</small><span>${tierIcon(tierOfP(W))}${rankTxtP(W)}</span></div>
      <div><small>마녀 카드</small><span>${cOwn} / ${cAll}</span></div>
      <div><small>도둑 스킬</small><span>${sOwn} / ${SKP.length}</span></div></div>
    <div class="row pf-btns">${SAVE.boxes.length?`<button class="mbtn lemon small" id="bPfBox"><span class="mt"><b>상자 열기 ${SAVE.boxes.length}개</b></span></button>`:''}<button class="sbtn" id="bPfTut">튜토리얼 다시 하기</button><button class="sbtn" id="bPfX">닫기</button></div>`;
  $('bPfX').onclick=()=>{SFX.click();pgClose()};$('bPfIc').onclick=()=>{SFX.click();obIcon(profOpen)};$('bPfNm').onclick=()=>{SFX.click();obNick(profOpen)};
  if($('bPfBox'))$('bPfBox').onclick=()=>{SFX.click();pgBoxes()};$('bPfTut').onclick=()=>{SFX.click();pgClose();tuStart()}}
// 처음 실행: 닉네임 → 아이콘 → 해 본 적 있어요?
function obNick(next){$('pgM').hidden=false;$('pgBody').innerHTML=`<div class="kicker">반가워요!</div><h2>이름을 정해 주세요</h2><input class="ob-in" id="obIn" maxlength="8" placeholder="2~8글자" autocomplete="off" spellcheck="false" aria-label="닉네임" value="${SAVE.nick||''}"><p class="note" id="obMsg">친구 목록과 대결 화면에도 이 이름이 보여요</p><button class="mbtn berry small" id="bObGo"><span class="mt"><b>다음</b></span></button>`;
  const inp=$('obIn');setTimeout(()=>{try{inp.focus()}catch(e){}},60);
  const go=()=>{const v=cleanNick(inp.value);if(v.length<2){SFX.deny();$('obMsg').textContent='이름을 두 글자 이상 넣어 주세요';return}SAVE.nick=v;saveGame();syncProf();SFX.click();try{inp.blur()}catch(e){}next()};
  $('bObGo').onclick=go;inp.onkeydown=e=>{if(e.key==='Enter')go()}}
function obIcon(next){$('pgM').hidden=false;let sel=PICONS.includes(SAVE.icon)?SAVE.icon:PICONS[0];
  $('pgBody').innerHTML=`<div class="kicker">${SAVE.nick||''}</div><h2>아이콘을 골라 주세요</h2><div class="ob-ics">${PICONS.map(k=>`<button class="ob-ic${k===sel?' on':''}" data-k="${k}" aria-label="${CARDS[k]?CARDS[k].n:k}">${ART[k]}</button>`).join('')}</div><button class="mbtn berry small" id="bObGo"><span class="mt"><b>다음</b></span></button>`;
  for(const b of $('pgBody').querySelectorAll('.ob-ic'))b.onclick=()=>{SFX.click();sel=b.dataset.k;for(const o of $('pgBody').querySelectorAll('.ob-ic'))o.classList.toggle('on',o===b)};
  $('bObGo').onclick=()=>{SAVE.icon=sel;saveGame();syncProf();SFX.click();next()}}
function obAsk(){$('pgM').hidden=false;$('pgBody').innerHTML=`<div class="kicker">${SAVE.nick}</div><h2>과자 마녀의 미로를 해 본 적 있어요?</h2><p class="note">처음이면 같이 한 판씩 해 보면서 배워요</p>
  <div class="row pg-two"><button class="mbtn berry small" id="bObNew"><span class="mt"><b>처음이에요</b></span></button><button class="mbtn mint small" id="bObOld"><span class="mt"><b>해 봤어요</b></span></button></div>`;
  $('bObNew').onclick=()=>{SFX.click();pgClose();tuStart()};
  $('bObOld').onclick=()=>{SFX.click();SAVE.tutDone=SAVE.tutDone||2;saveGame();pgClose();tMsg('내 정보에서 언제든 튜토리얼을 다시 할 수 있어요')}}
function onboard(){obNick(()=>obIcon(obAsk))}
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);try{syncProf();if(!window.__simFast&&!window.__aiBoth&&!G.tutor&&!(typeof TU!=='undefined'&&TU.on)){if(!SAVE.nick)setTimeout(()=>{if(screen==='title'&&$('pgM').hidden)onboard()},300);else if(SAVE.boxes.length&&!titleScreen.bx){titleScreen.bx=1;setTimeout(()=>{if(screen==='title'&&$('pgM').hidden)pgBoxes()},500)}}}catch(e){}return r}}
{const sb=addXP;addXP=function(n){const r=sb(n);if(r.boxes.length)titleScreen.bx=0;return r}}

{const st=document.createElement('style');st.textContent=`
.prof-chip{position:absolute;left:10px;top:10px;display:flex;align-items:center;gap:6px;background:#fff8ee;border:2px solid var(--choco);border-radius:14px;box-shadow:0 3px 0 var(--choco);padding:3px 10px 3px 4px;font:inherit;color:var(--choco);cursor:pointer;max-width:42vw;z-index:2}
.prof-chip .pc-ic{width:32px;height:32px;border-radius:10px;background:#ffe9f2;border:2px solid var(--choco);display:grid;place-items:center;overflow:hidden;flex:0 0 auto}.prof-chip .pc-ic svg{width:28px;height:28px}
.prof-chip .pc-t{display:flex;flex-direction:column;align-items:flex-start;min-width:0;line-height:1.1}
.prof-chip .pc-t b{font:14px var(--f-display);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.prof-chip .pc-t small{display:flex;align-items:center;gap:4px;font:11px var(--f-display);color:#7a5236;white-space:nowrap}
.pc-xp{width:44px;height:6px;border:1.5px solid var(--choco);border-radius:4px;background:#fff;overflow:hidden}.pc-xp i{display:block;height:100%;background:#ff7eb6}
.pc-bx{position:absolute;right:-7px;top:-7px;min-width:18px;height:18px;border-radius:9px;background:#ff4f7a;color:#fff;border:2px solid var(--choco);font:11px/14px var(--f-display);font-style:normal;text-align:center}
.pf-top{display:flex;align-items:center;gap:12px;width:100%}
.pf-ic{position:relative;width:clamp(56px,18vh,76px);height:clamp(56px,18vh,76px);border-radius:16px;background:#ffe9f2;border:3px solid var(--choco);box-shadow:0 3px 0 var(--choco);display:grid;place-items:center;flex:0 0 auto;cursor:pointer;padding:4px}
.pf-ic svg{width:100%;height:100%}.pf-ic i{position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);font:10px var(--f-display);font-style:normal;background:#fff;border:2px solid var(--choco);border-radius:7px;padding:0 4px;white-space:nowrap}
.pf-id{display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0;flex:1}
.pf-nm{display:flex;align-items:center;gap:8px;max-width:100%}.pf-nm b{font:clamp(18px,5.4vh,22px) var(--f-display);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pf-nm .sbtn{flex:0 0 auto;white-space:nowrap}
.pf-lv{display:flex;align-items:center;gap:6px;font:14px var(--f-display)}.pf-lv .xpb{width:110px;height:10px;border:2px solid var(--choco);border-radius:6px;background:#fff;overflow:hidden}.pf-lv .xpb i{display:block;height:100%;background:linear-gradient(90deg,#ff7eb6,#ffb36b)}.pf-lv small{font-size:12px;color:#7a5236}
.pf-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%}
.pf-grid>div{background:#fff;border:2px solid var(--choco);border-radius:12px;padding:4px 8px;display:flex;flex-direction:column;align-items:flex-start;min-width:0}
.pf-grid small{font-size:11px;color:#7a5236}.pf-grid span{display:flex;align-items:center;gap:4px;font:14px var(--f-display);white-space:nowrap}.pf-grid span svg{width:20px;height:20px;flex:0 0 auto}
.pf-btns{gap:8px;flex-wrap:wrap;justify-content:center}
.ob-in{font:18px var(--f-display);text-align:center;width:min(240px,70vw);padding:8px 10px;border:3px solid var(--choco);border-radius:12px;background:#fff;color:var(--choco)}
.ob-ics{display:grid;grid-template-columns:repeat(5,clamp(44px,13vh,56px));gap:8px}
.ob-ic{width:100%;aspect-ratio:1;border-radius:12px;background:#fff;border:3px solid var(--choco);padding:3px;cursor:pointer;display:grid;place-items:center}.ob-ic svg{width:100%;height:100%}
.ob-ic.on{background:#ffe9f2;box-shadow:0 0 0 3px #ff7eb6}`;document.head.appendChild(st)}
