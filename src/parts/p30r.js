/* ================= 30차 (러): 스토리 화면 정리 (잘리지 않게) ================= */
{const st=document.createElement('style');st.textContent=`
#stgGrid.stg-grid{overflow-y:auto;overflow-x:hidden;padding:2px 4px 10px}
#stgGrid .st-row{padding:6px 4px 8px;row-gap:12px}
.st .wh{right:3px;top:3px;width:15px;height:15px;z-index:2}
.st.boss{outline:none;box-shadow:0 3px 0 var(--choco),inset 0 0 0 3px #ffd35f}
#stgInfo{display:flex;flex-direction:column;gap:6px;overflow-y:auto;min-height:0}
#stgInfo .si-h{flex-direction:column;align-items:flex-start;gap:0}
#stgInfo .si-h b{white-space:nowrap;font-size:clamp(18px,5.6vh,26px);line-height:1.15}
#stgInfo .si-h span{font-size:clamp(12px,3.4vh,15px);color:#7a5236}
#stgInfo .si-g{font-size:clamp(12px,3.6vh,15px)}
#stgInfo .si-rw{font-size:clamp(11px,3.2vh,13px);align-items:flex-start}
#stgInfo .si-rw svg{flex:0 0 auto;margin-top:1px}
#stgInfo #bStgGo{margin-top:auto;align-self:flex-start;flex:0 0 auto}
@media (max-height:380px){#stgInfo{gap:4px}#stgInfo .si-g{gap:2px}#stgInfo #bStgGo{padding-top:6px;padding-bottom:6px}}`;document.head.appendChild(st)}
// 단계 칸이 왼쪽 영역 높이를 꽉 채우게 (아래 빈 공간 없이, 숫자가 잘리지 않게)
{const st=document.createElement('style');st.textContent=`
#stages #stgGrid.stg-grid{display:flex!important;flex-direction:column;min-height:0;align-self:stretch;overflow:hidden;padding:2px 4px 6px}
#stgGrid .ch-tabs,#stgGrid .ch-name{flex:0 0 auto}
#stgGrid .st-row{flex:1 1 auto;min-height:0;grid-template-rows:1fr 1fr;row-gap:10px;column-gap:8px;padding:6px 4px 6px}
#stgGrid .st{width:100%;height:100%;min-height:44px;max-height:110px;padding:0 0 12px}
#stages #stgGrid .st b{font-size:clamp(20px,6.4vh,30px);line-height:1}
#stages #stgGrid .st .ss{bottom:5px;font-size:clamp(10px,2.8vh,13px)}`;document.head.appendChild(st)}
