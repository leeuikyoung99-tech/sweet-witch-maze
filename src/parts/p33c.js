/* ================= 33차 (다): 뒤로·닫기 버튼은 어디서나 오른쪽 위 동그란 화살표로 ================= */
const BK_IDS=['bDeckX','bShopX','bStgX','bMisX','bFrX','bRankX','bCodeX','bChalX','bSetupBack','bSndOk','bFrNickX','bPfX','bInfoX'];
function bkApply(){for(const id of BK_IDS){const b=document.getElementById(id);if(!b||b.dataset.bk)continue;b.dataset.bk=1;
    const lab=(b.textContent||'').trim()||b.getAttribute('aria-label')||'뒤로';b.setAttribute('aria-label',lab);b.innerHTML='';b.className='bk31';
    const top=b.closest('.pane-top,.shop-top');if(top){top.prepend(b);continue}
    const slab=b.closest('.slab')||b.parentElement;slab.classList.add('has-bk');slab.prepend(b);b.classList.add('abs')}}
bkApply();
{let q=0;new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;bkApply()})}).observe(document.body,{childList:true,subtree:true})}
{const st=document.createElement('style');st.textContent=`
.bk31{flex:none;width:44px!important;height:44px!important;min-height:0!important;padding:0!important;margin:0!important;border-radius:50%!important;font-size:0!important;color:transparent!important;background:#fff ${svgUrl31(IC31.x)} 50% 50%/19px no-repeat!important;border:3px solid var(--choco)!important;box-shadow:0 4px 0 var(--choco)!important;cursor:pointer;order:99}
.bk31:active{transform:translateY(3px);box-shadow:0 1px 0 var(--choco)!important}
.bk31.abs{position:absolute!important;right:10px;left:auto;top:10px;z-index:4}
.has-bk{position:relative}
.pane-top>.bk31,.shop-top>.bk31{margin-left:6px!important}
.info31 .bk31.abs{right:8px;top:8px}
.ic-back{left:auto!important;right:max(10px,env(safe-area-inset-right,0px))!important}
.ps-top .ic-back{order:99;right:auto!important}
.pz-top{right:auto!important;left:max(12px,env(safe-area-inset-left,0px));align-items:flex-start!important}
`;document.head.appendChild(st)}
