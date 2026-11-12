/* ================= 31차 (다): 증강체 도감 · 설명 창 ================= */
// ----- 설명 창: ?나 도감 칸을 누르면 뜨는 작은 창 -----
{const m=document.createElement('div');m.className='scr';m.id='infoM';m.hidden=true;
  m.innerHTML='<div class="slab info31"><button class="info31x" id="bInfoX" aria-label="닫기"></button><div id="infoBody"></div></div>';document.body.appendChild(m);
  m.addEventListener('click',e=>{if(e.target===m||e.target.closest('#bInfoX')){SFX.click();m.hidden=true}})}
function infoOpen(html){$('infoBody').innerHTML=html;$('infoM').hidden=false}
// 랭크 창의 ?: 글씨가 펼쳐지는 대신 설명 창
{const or=openRank;openRank=function(){const r=or.apply(this,arguments);const q=$('bRkQ'),how=$('rankHow');if(q&&how){how.hidden=true;q.onclick=()=>{SFX.click();infoOpen(`<h3>랭크 점수</h3><p class="info31p">${how.innerHTML}</p>`)}}return r}}

// ----- 증강체 도감 -----
const TIER31={s:['실버','#c9d3e6'],g:['골드','#ffcf5a'],p:['프리즘','#e2a0ff']};
const DEX={side:'t'};
{const b=document.createElement('button');b.className='sbtn tiny';b.id='bAugDex';
  b.innerHTML=`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5 L40 15 V33 L24 43 L8 33 V15 Z" fill="#c9a6ff" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><path d="M24 14 l3 7 7 1 -5 5 1.5 7 -6.5 -3.5 -6.5 3.5 1.5 -7 -5 -5 7 -1z" fill="#fff4c2" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>증강체`;
  $('bMis').after(b);b.onclick=()=>{SFX.click();dexOpen()}}
{const m=document.createElement('div');m.className='scr';m.id='dexM';m.hidden=true;
  m.innerHTML=`<div class="dex31"><button class="ic-back" id="bDexX" aria-label="뒤로"></button><div class="seg dex-tabs" id="dexTabs"><button data-s="t"><b>도둑</b></button><button data-s="w"><b>마녀</b></button></div><div class="dex-body" id="dexBody"></div></div>`;document.body.appendChild(m);
  $('bDexX').onclick=()=>{SFX.click();m.hidden=true};
  for(const b of $('dexTabs').children)b.onclick=()=>{SFX.click();DEX.side=b.dataset.s;dexDraw()};
  $('dexBody').addEventListener('click',e=>{const c=e.target.closest('[data-id]');if(!c)return;SFX.card();const a=AUGI2[c.dataset.id];if(!a)return;const T=TIER31[a.tier]||TIER31.s;
    infoOpen(`<div class="dex-big t-${a.tier}">${augIcon(a.id)}</div><span class="dex-tier" style="--tc:${T[1]}">${T[0]}</span><h3>${a.n}</h3><p class="info31p">${String(a.d||'').split('|').join('<br>')}</p>`)})}
function dexOpen(){$('dexM').hidden=false;dexDraw()}
function dexDraw(){for(const b of $('dexTabs').children)b.classList.toggle('on',b.dataset.s===DEX.side);
  const ids=[...new Set((DEX.side==='t'?AUGT2:AUGW2).map(q=>q[0]))].filter(id=>AUGI2[id]);
  $('dexBody').innerHTML=['s','g','p'].map(t=>{const L=ids.filter(id=>AUGI2[id].tier===t);if(!L.length)return'';const T=TIER31[t];
    return`<section><div class="dex-h" style="--tc:${T[1]}"><b>${T[0]}</b><i>${L.length}</i></div><div class="dex-grid">${L.map(id=>`<button class="dex-c t-${t}" data-id="${id}"><span class="dex-ic">${augIcon(id)}</span><b>${AUGI2[id].n}</b></button>`).join('')}</div></section>`}).join('');
  $('dexBody').scrollTop=0}
{const st=document.createElement('style');st.textContent=`
#infoM{z-index:90;background:#2b160bb0!important}
.info31{position:relative;width:min(380px,86vw);max-height:calc(100dvh - 30px);overflow:auto;gap:8px!important;padding:20px 22px 22px!important;box-sizing:border-box}
.info31 h3{margin:2px 0 0;font:clamp(20px,6.4vh,26px) var(--f-display);color:var(--choco)}
.info31p{margin:0;font:16px/1.5 var(--f-display);color:#6b4630;word-break:keep-all}
.info31x{position:absolute;right:8px;top:8px;width:38px;height:38px;padding:0;border-radius:50%;background:#fff ${svgUrl31(IC31.x)} center/18px no-repeat;border:3px solid var(--choco);box-shadow:0 3px 0 var(--choco);cursor:pointer}
#infoBody{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.dex-big{width:86px;height:86px;border-radius:22px;padding:8px;box-sizing:border-box;background:radial-gradient(circle at 50% 35%,#3a2a6a,#1d1640);border:4px solid var(--fr,#c9d3e6);box-shadow:0 0 14px 2px var(--glow,#a8c8ff99),0 5px 0 var(--choco)}
.dex-big svg,.dex-ic svg{width:100%;height:100%}
.t-s{--fr:#c9d3e6;--glow:#a8c8ff99}.t-g{--fr:#ffcf5a;--glow:#ffcf5a99}.t-p{--fr:#ffb3f0;--glow:#e2a0ffaa}
.dex-tier{font:13px var(--f-display);color:#2b160b;background:var(--tc);border:2.5px solid var(--choco);border-radius:10px;padding:1px 10px}
#dexM{z-index:33;background:radial-gradient(ellipse at 50% 40%,#fff4f8 0 22%,#ffd3e5 60%,#f6aecb 100%)!important;isolation:isolate;padding:0!important}
#dexM::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(#ffffff66 2px,#fff0 2.6px) 0 0/28px 28px}
.dex31{position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;padding:10px max(16px,env(safe-area-inset-right,0px)) 0 max(16px,env(safe-area-inset-left,0px));box-sizing:border-box}
#dexTabs{border:0;box-shadow:none;overflow:visible;gap:12px;background:none;flex:none}
#dexTabs button{width:clamp(110px,18vw,140px);height:42px;display:flex;align-items:center;justify-content:center;padding:0;border:3px solid var(--choco);border-radius:21px;background:linear-gradient(#fff,#f4e4d2);box-shadow:0 5px 0 var(--choco);color:var(--choco)}
#dexTabs button b{font:18px var(--f-display)}
#dexTabs button.on{background:linear-gradient(#ff9cc6,#e8407e);color:#fff;transform:translateY(3px);box-shadow:0 2px 0 var(--choco),inset 0 3px 0 #ffffff66}
#dexTabs button.on b{text-shadow:0 2px 0 #9e1f52}
.dex-body{flex:1;min-height:0;width:100%;max-width:760px;overflow-y:auto;margin-top:12px;padding:0 4px 16px;box-sizing:border-box}
.dex-body section{margin-bottom:12px}
.dex-h{display:flex;align-items:center;gap:6px;margin:0 0 8px 4px}
.dex-h b{font:16px var(--f-display);color:#2b160b;background:var(--tc);border:2.5px solid var(--choco);border-radius:11px;padding:1px 12px;box-shadow:0 3px 0 var(--choco)}
.dex-h i{font:14px var(--f-display);font-style:normal;color:#8a5a70}
.dex-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(84px,1fr));gap:10px 8px}
.dex-c{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 2px 7px;border:3px solid var(--choco);border-radius:16px;background:#fff8ee;box-shadow:0 4px 0 var(--choco);cursor:pointer;font:inherit;min-width:0}
.dex-c:active{transform:translateY(3px);box-shadow:0 1px 0 var(--choco)}
.dex-ic{width:52px;height:52px;border-radius:14px;padding:5px;box-sizing:border-box;background:radial-gradient(circle at 50% 35%,#3a2a6a,#1d1640);border:3px solid var(--fr);box-shadow:0 0 8px 1px var(--glow)}
.dex-c b{font:13px/1.2 var(--f-display);color:var(--choco);white-space:nowrap;letter-spacing:-.03em;max-width:100%;overflow:hidden}
`;document.head.appendChild(st)}
