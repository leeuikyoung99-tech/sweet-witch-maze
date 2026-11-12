// ===== 알림: 빨간 글씨 대신 작은 창 (X로 언제든 닫기) =====
// 공지(코인 돌려받기 같은 것)는 닫을 때까지 남고, 짧은 안내는 4초 뒤 저절로 사라져요.
{const box=document.createElement('div');box.id='ntBox';document.body.appendChild(box);
  const old=$('tMsg');if(old)old.remove();
  const IC_I='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="2"/><circle cx="12" cy="7.6" r="1.6" fill="#4a2a1a"/><path d="M12 11 V17" stroke="#4a2a1a" stroke-width="2.6" stroke-linecap="round"/></svg>';
  const IC_GIFT='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="9.5" width="17" height="11" rx="2" fill="#ff8ab5" stroke="#4a2a1a" stroke-width="2"/><rect x="2.5" y="7" width="19" height="4" rx="1.5" fill="#ffb3d1" stroke="#4a2a1a" stroke-width="2"/><path d="M12 7 V20.5" stroke="#4a2a1a" stroke-width="2"/><path d="M12 7 C9 2.5 5.5 4.5 8 7 M12 7 C15 2.5 18.5 4.5 16 7" fill="#fff" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  const EMO=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{FE0F}\u{200D}]/gu;
  tMsg=function(t,o){o=o||{};t=String(t==null?'':t).replace(EMO,'').trim();if(!t)return;
    const stay=o.stay!=null?o.stay:/돌려드렸어요|없어져서|바뀌어서/.test(t);
    for(const n of box.children)if(n.dataset.t===t){n.remove();break}
    while(box.children.length>=3)box.firstElementChild.remove();
    const n=document.createElement('div');n.className='nt'+(stay?' stay':'');n.dataset.t=t;
    n.innerHTML=`<span class="nt-ic">${stay?IC_GIFT:IC_I}</span><p></p><button class="nt-x" aria-label="닫기"></button>`;n.querySelector('p').textContent=t;
    const close=()=>{if(n.classList.contains('out'))return;n.classList.add('out');setTimeout(()=>n.remove(),220)};
    n.querySelector('.nt-x').onclick=e=>{e.stopPropagation();try{SFX.click()}catch(_){}close()};
    if(!stay)n.onclick=close;
    box.appendChild(n);if(!stay)setTimeout(close,4000)};
  const st=document.createElement('style');st.textContent=`
#ntBox{position:fixed;left:50%;top:max(8px,env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:400;display:flex;flex-direction:column;align-items:center;gap:6px;pointer-events:none;width:min(440px,calc(100vw - 24px))}
#ntBox .nt{pointer-events:auto;display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;background:#fff8ee;border:2.5px solid var(--choco);border-radius:14px;box-shadow:0 4px 0 #4a2a1a66;padding:8px 8px 8px 10px;animation:ntIn .22s ease-out}
#ntBox .nt.stay{background:linear-gradient(#fffdf6,#fff0d6)}
#ntBox .nt.out{animation:ntOut .22s ease-in forwards}
#ntBox .nt-ic{flex:none;width:26px;height:26px}#ntBox .nt-ic svg{width:100%;height:100%;display:block}
#ntBox .nt p{flex:1;min-width:0;margin:0;font:14px/1.35 var(--f-display);color:var(--choco);text-align:left;word-break:keep-all;overflow-wrap:anywhere}
#ntBox .nt-x{flex:none;width:28px;height:28px;border-radius:50%;border:2px solid var(--choco);background:#fff;cursor:pointer;position:relative;padding:0}
#ntBox .nt-x::before,#ntBox .nt-x::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2.6px;border-radius:2px;background:var(--choco);transform:translate(-50%,-50%) rotate(45deg)}
#ntBox .nt-x::after{transform:translate(-50%,-50%) rotate(-45deg)}
@keyframes ntIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
@keyframes ntOut{to{opacity:0;transform:translateY(-10px)}}`;document.head.appendChild(st)}
