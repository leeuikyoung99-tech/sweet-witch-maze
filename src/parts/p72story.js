// ===== 72차: 스토리 고르기 화면 새로 꾸미기 =====
// 왼쪽: 장 고르기 + 큰 맵 그림(제목만) + 그림 위 별 버튼(누르면 별 얻는 법) + 그림 아래 보상
// 오른쪽: 사탕 길을 따라 이어진 1~10단계 동그라미 (1→3, 6←4, 7→9, 보스 10) + 시작 버튼
// 보스 단계의 마녀 그림은 빼고 왕관으로 표시해요.
const SV72={pop:false};
const SV72_PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5 L19 12 L8 18.5 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/></svg>';
const SV72_GIFT='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="9" width="17" height="11.5" rx="2" fill="#ff8fc0" stroke="#4a2a1a" stroke-width="1.8"/><rect x="2.5" y="6.5" width="19" height="4" rx="1.5" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.8"/><path d="M12 6.5 V20.5" stroke="#4a2a1a" stroke-width="1.8"/><path d="M12 6.5 C9 2.5 5.5 4 8 6.5 M12 6.5 C15 2.5 18.5 4 16 6.5" fill="none" stroke="#4a2a1a" stroke-width="1.8" stroke-linecap="round"/></svg>';
const SV72_CARD='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2.5" fill="#b9a0f0" stroke="#4a2a1a" stroke-width="1.8"/><path d="M12 8.2 l1.3 2.7 3 .4-2.2 2 .6 3-2.7-1.5-2.7 1.5.6-3-2.2-2 3-.4z" fill="#fff" stroke="#4a2a1a" stroke-width="1"/></svg>';
const SV72_SLOT=[null,[1,1],[1,2],[1,3],[2,3],[2,2],[2,1],[3,1],[3,2],[3,3],[4,3]];// 단계 → [줄, 칸]
function sv72Stars(bits,cls){return`<span class="${cls}">${[0,1,2].map(i=>`<i class="${(bits>>i)&1?'on':''}">${PS_STAR}</i>`).join('')}</span>`}
function sv72Cnt(bits){return(bits&1)+((bits>>1)&1)+((bits>>2)&1)}
renderStages=function(){const ch=STORY[STV.c-1],S=STV.s,st=stDef(ch.n,S),bits=sb2(ch.n,S),open=stOpen2(ch.n,S),ty=stType(ch.n,S);
  try{$('stages').querySelector('.pane-top b').textContent='스토리 · 달콤 별 조각';$('stgTot').innerHTML=`${recipes()} / 80 · <span class="sv-tst">${PS_STAR}</span> ${stars2()} / 240`}catch(e){}
  const stg=$('stages').querySelector('.stg');let R=$('sv72');if(!R){R=document.createElement('div');R.id='sv72';stg.appendChild(R);R.addEventListener('click',sv72Click)}
  const tabs=STORY.map(q=>`<button class="sv-tab${q.n===STV.c?' on':''}${chOpen(q.n)?'':' lock'}" data-c="${q.n}" style="--tc:${THC[q.th]}" aria-label="${q.n}장">${chOpen(q.n)?q.n+'장':LOCK_SVG}</button>`).join('');
  const goals=stGoals3(st);
  const pop=SV72.pop?`<div class="sv-pop" role="dialog"><b>별 얻는 법</b><ul>${goals.map((g,i)=>`<li class="${(bits>>i)&1?'ok':''}"><i>${PS_STAR}</i><span>${g}</span></li>`).join('')}</ul></div>`:'';
  const key=ch.n+'-'+S,bonus=(typeof STBON!=='undefined'&&STBON[key])|0;
  const gift=ty==='boss'&&BOSS_BOX[ch.n]!=null?`<span class="sv-chip">${SV72_GIFT}${boxName(BOSS_BOX[ch.n])}</span><span class="sv-chip">${SV72_CARD}+1</span>`:'';
  const rw=`<span class="sv-rl">보상</span><span class="sv-chip">${COIN_SVG}${stFirst(ch.n)+bonus}</span><span class="sv-chip">${PS_STAR}마다 ${COIN_SVG}5</span>${gift}`;
  const nodes=Array.from({length:10},(_,i)=>{const s=i+1,o=stOpen2(ch.n,s),b=sb2(ch.n,s),t=stType(ch.n,s),boss=t==='boss',[r,c]=SV72_SLOT[s];
    return`<button class="sv-n${s===S?' sel':''}${o?'':' lock'}${boss?' boss':''}${b&1?' done':''}" data-s="${s}" style="grid-row:${r};grid-column:${c};--c:${STT_COL[t]||THC[ch.th]}" aria-label="${s}단계"><span class="sv-dot">${o?(boss?`<span class="sv-cr">${PS_CROWN}</span>`:`<b>${s}</b>`):LOCK_SVG}</span>${o?sv72Stars(b,'sv-ss'):''}</button>`}).join('');
  R.innerHTML=`<div class="sv-left"><div class="sv-tabs">${tabs}</div>`+
    `<div class="sv-map" style="background-image:url(${MAPIMG[ch.th]||''})"><b class="sv-ttl">${ch.n}장 ${S}단계 · ${STT_N[ty]||''}</b>`+
    `<button class="sv-star${SV72.pop?' on':''}" aria-label="별 얻는 법">${PS_STAR}<span>${sv72Cnt(bits)}/3</span></button>${pop}</div>`+
    `<div class="sv-rw">${rw}</div></div>`+
    `<div class="sv-path"><svg class="sv-ln" aria-hidden="true"></svg>${nodes}`+
    `<button class="mbtn berry sv-go" id="bStgGo"${open?'':' disabled'} aria-label="${open?'시작':'앞 단계를 깨면 열려요'}">${open?SV72_PLAY:LOCK_SVG}</button></div>`;
  requestAnimationFrame(sv72Fit)};
function sv72Click(e){const t=e.target.closest('.sv-tab');if(t){const c=+t.dataset.c;if(!chOpen(c)){SFX.deny();tMsg('앞 장의 보스를 이기면 열려요');return}
    STV.c=c;STV.s=1;for(let i=1;i<=10;i++)if(stOpen2(c,i))STV.s=i;SV72.pop=false;applyTheme(STORY[c-1].th);SFX.card();renderStages();return}
  if(e.target.closest('.sv-star')){SV72.pop=!SV72.pop;SFX.card();renderStages();return}
  const n=e.target.closest('.sv-n');if(n){STV.s=+n.dataset.s;SV72.pop=false;SFX.card();renderStages();return}
  const g=e.target.closest('.sv-go');if(g){if(g.disabled){SFX.deny();return}(async()=>{try{await initAudio()}catch(_){}startStage(STV.c*100+STV.s)})();return}
  if(SV72.pop&&!e.target.closest('.sv-pop')){SV72.pop=false;renderStages()}}
// 동그라미 크기를 칸에 맞추고, 단계 사이 사탕 길을 그려요
function sv72Fit(){const P=document.querySelector('#sv72 .sv-path');if(!P||!P.getClientRects().length)return;const pr=P.getBoundingClientRect();
  const cs=getComputedStyle(P),rg=parseFloat(cs.rowGap)||0,cg=parseFloat(cs.columnGap)||0;const rowH=(pr.height-3*rg)/4,colW=(pr.width-2*cg)/3;
  const d=Math.max(26,Math.min(62,rowH-14,colW-12));P.style.setProperty('--d',Math.round(d)+'px');
  const svg=P.querySelector('.sv-ln');const ns=[...P.querySelectorAll('.sv-n')];const ctr=n=>{const r=n.querySelector('.sv-dot').getBoundingClientRect();return[r.left+r.width/2-pr.left,r.top+r.height/2-pr.top]};
  svg.setAttribute('viewBox',`0 0 ${Math.round(pr.width)} ${Math.round(pr.height)}`);let h='';
  for(let i=0;i<ns.length-1;i++){const[a,b]=[ctr(ns[i]),ctr(ns[i+1])],done=ns[i].classList.contains('done');
    h+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="${done?'dn':''}"/>`}svg.innerHTML=h}
addEventListener('resize',()=>setTimeout(()=>{if(!$('stages').hidden)sv72Fit()},80));
{const st=document.createElement('style');st.textContent=`
#stages .stg{display:block!important;position:relative}
#stages #stgGrid,#stages #stgInfo{display:none!important}
#sv72{position:absolute;inset:0;display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:12px;min-height:0}
#sv72 .sv-left{display:flex;flex-direction:column;gap:7px;min-height:0;min-width:0}
#sv72 .sv-tabs{display:flex;gap:4px;flex:0 0 auto}
#sv72 .sv-tab{flex:1 1 0;min-width:0;height:28px;padding:0;border-radius:10px;border:2.5px solid var(--choco);background:#fff8ee;color:var(--choco);font:13px var(--f-display);box-shadow:0 2px 0 var(--choco);display:grid;place-items:center;cursor:pointer}
#sv72 .sv-tab.on{background:var(--tc);color:#fff;-webkit-text-stroke:2.5px var(--choco);paint-order:stroke}
#sv72 .sv-tab.lock{background:#efe2d2}#sv72 .sv-tab svg{width:16px;height:16px}
#sv72 .sv-map{position:relative;flex:1 1 auto;min-height:0;border-radius:16px;border:3px solid var(--choco);background-size:cover;background-position:center;box-shadow:0 4px 0 var(--choco)}
#sv72 .sv-ttl{position:absolute;left:8px;bottom:8px;max-width:calc(100% - 16px);font:clamp(14px,4.4vh,19px) var(--f-display);color:#fff;background:#4a2a1ad0;border-radius:10px;padding:3px 12px;white-space:nowrap}
#sv72 .sv-star{position:absolute;right:8px;top:8px;display:flex;align-items:center;gap:3px;height:34px;padding:0 10px 0 6px;border-radius:17px;border:2.5px solid var(--choco);background:#fff8ee;box-shadow:0 3px 0 var(--choco);font:15px var(--f-display);color:var(--choco);cursor:pointer}
#sv72 .sv-star svg{width:22px;height:22px}#sv72 .sv-star.on{background:#fff1b8}
#sv72 .sv-pop{position:absolute;right:8px;top:48px;left:8px;max-width:330px;margin-left:auto;z-index:3;background:#fff8ee;border:3px solid var(--choco);border-radius:14px;box-shadow:0 4px 0 var(--choco);padding:8px 10px;color:var(--choco)}
#sv72 .sv-pop b{font:14px var(--f-display);display:block;margin-bottom:4px}
#sv72 .sv-pop ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:3px}
#sv72 .sv-pop li{display:flex;align-items:center;gap:6px;font:13px/1.25 var(--f-display)}
#sv72 .sv-pop li i{flex:0 0 auto;width:18px;height:18px;filter:grayscale(1) opacity(.35)}#sv72 .sv-pop li.ok i{filter:none}#sv72 .sv-pop li i svg{width:100%;height:100%}
#sv72 .sv-rw{flex:0 0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;font:13px var(--f-display);color:var(--choco)}
#sv72 .sv-rl{color:#a0705a}
#sv72 .sv-chip{display:inline-flex;align-items:center;gap:2px;white-space:nowrap;background:#fff1dc;border-radius:9px;padding:1px 7px}
#sv72 .sv-chip svg{width:16px;height:16px;flex:0 0 auto}
#sv72 .sv-path{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(4,minmax(0,1fr));gap:4px 6px;min-height:0;--d:44px}
#sv72 .sv-ln{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}
#sv72 .sv-ln line{stroke:#e6cdb0;stroke-width:7;stroke-linecap:round;stroke-dasharray:2 11}
#sv72 .sv-ln line.dn{stroke:#ffb3d6;stroke-dasharray:none}
#sv72 .sv-n{position:relative;z-index:1;align-self:center;justify-self:center;width:var(--d);height:calc(var(--d) + 8px);padding:0;border:0;background:none;cursor:pointer;display:flex;flex-direction:column;align-items:center}
#sv72 .sv-dot{width:var(--d);height:var(--d);border-radius:50%;display:grid;place-items:center;border:3px solid var(--choco);background:radial-gradient(circle at 35% 30%,#ffffffb0 0 18%,transparent 19%),var(--c);box-shadow:0 3px 0 var(--choco),inset 0 -5px 0 #0000002a}
#sv72 .sv-dot b{font:calc(var(--d) * .46)/1 var(--f-display);color:#fff;-webkit-text-stroke:3px var(--choco);paint-order:stroke}
#sv72 .sv-dot svg{width:48%;height:48%}
#sv72 .sv-n.boss .sv-dot{background:radial-gradient(circle at 35% 30%,#ffffffc0 0 18%,transparent 19%),linear-gradient(#fff3c4,#ffc94a 60%)}
#sv72 .sv-cr{width:62%;display:grid}#sv72 .sv-cr svg{width:100%;height:auto}
#sv72 .sv-n.lock .sv-dot{background:#e8dccd}
#sv72 .sv-n.sel .sv-dot{box-shadow:0 3px 0 var(--choco),0 0 0 4px #fff,0 0 0 8px #ff5f9e}
#sv72 .sv-ss{position:absolute;left:50%;bottom:-3px;transform:translateX(-50%);display:flex;gap:0;pointer-events:none}
#sv72 .sv-ss i{width:calc(var(--d) * .3);height:calc(var(--d) * .3);max-width:15px;max-height:15px;filter:grayscale(1) brightness(1.6) opacity(.75)}#sv72 .sv-ss i.on{filter:none}#sv72 .sv-ss svg{width:100%;height:100%}
#sv72 .sv-go{grid-row:4;grid-column:1/3;align-self:center;justify-self:stretch;margin:0 4px;height:min(48px,calc(var(--d) + 4px));display:grid;place-items:center;padding:0!important}
#sv72 .sv-go svg{height:70%;width:auto}#sv72 .sv-go[disabled]{filter:grayscale(.8);opacity:.7}
#stages .sv-tst svg{width:15px;height:15px;vertical-align:-2px}`;
document.head.appendChild(st)}
