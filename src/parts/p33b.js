/* ================= 33차 (나): 휴대폰에서 목록 스크롤이 막히던 문제 — 스크롤되는 칸 안에서는 손가락으로 밀 수 있게 ================= */
function scrollableUp(el){for(let n=el;n&&n!==document.body&&n.nodeType===1;n=n.parentElement){const cs=getComputedStyle(n);
  if(/(auto|scroll)/.test(cs.overflowY)&&n.scrollHeight>n.clientHeight+1)return true;if(/(auto|scroll)/.test(cs.overflowX)&&n.scrollWidth>n.clientWidth+1)return true}return false}
document.addEventListener('touchmove',e=>{if(screen==='play'&&!G.over)return;if(e.target&&e.target.closest&&scrollableUp(e.target))e.stopImmediatePropagation()},{capture:true,passive:true});
