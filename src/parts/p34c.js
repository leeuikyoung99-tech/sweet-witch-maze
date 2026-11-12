/* ================= 34차 (다): 점검에서 찾은 것 고치기 ================= */
// AI에게 이기면 받는 코인 문구가 실제와 달랐어요 (30개라고 나오지만 실제 7개) → 난이도별 5 · 7 · 9로 맞추고 문구도 같은 값으로
rewardFor=function(){return[5,7,9][AIL]||7};
// 마녀 대 마녀: 내 쿠키 체력바가 둘이라 개수 칸이 아래 체력바를 가렸어요 → 그때는 조금 더 아래로
setInterval(()=>{const c=$('capPanel');if(!c)return;let want='';if(G&&G.duo==='ww'){const k=$('myCk');const r=k&&!k.hidden?k.getBoundingClientRect():null;want=r&&r.bottom>0?Math.round(r.bottom+6)+'px':'calc(150px + env(safe-area-inset-top,0px))'}if(c.style.top!==want)c.style.top=want},300);
// 좁은 휴대폰에서 카드·스킬 이름이 잘리던 문제 → 칸보다 길면 글씨를 조금씩 줄여서 다 보이게
function fitNames(){for(const e of document.querySelectorAll('.dk .nm,.card .nm,#hand .nm,.dex-c b,.ag-card b')){if(!e.offsetParent)continue;if(e.dataset.fz&&e.scrollWidth<=e.clientWidth+1)continue;
  e.style.fontSize='';e.style.letterSpacing='';let fs=parseFloat(getComputedStyle(e).fontSize),n=0;if(e.scrollWidth<=e.clientWidth+1){e.dataset.fz=1;continue}
  e.style.letterSpacing='-.05em';while(e.scrollWidth>e.clientWidth+1&&fs>8&&n++<30){fs-=.5;e.style.setProperty('font-size',fs+'px','important')}e.dataset.fz=1}}
{let q=0;const run=()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;try{fitNames()}catch(e){}})};new MutationObserver(run).observe(document.body,{childList:true,subtree:true});addEventListener('resize',()=>{for(const e of document.querySelectorAll('[data-fz]'))delete e.dataset.fz;run()})}
