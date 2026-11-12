// ===== 보상 칸 모양: 동그라미 없이 그림 + 이름표(알약) =====
// 코인은 양이 많을수록 동전 더미, 상자·꾸미기·전설도 같은 자리에 이름표를 달아 그림 높이를 맞춰요.
// 받은 칸은 그림이 흐려지고 이름표가 초록 "받음"으로 바뀌어요.
function coinPile(c){const n=c<50?1:c<150?2:3,S='stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"';
  const st=(cx,base,k)=>{let h='';for(let i=0;i<k;i++){const y=base-i*5;h+=`<path d="M${cx-12} ${y} v4 a12 4.6 0 0 0 24 0 v-4" fill="#e8a000" ${S}/><ellipse cx="${cx}" cy="${y}" rx="12" ry="4.6" fill="#ffd23a" ${S}/><ellipse cx="${cx}" cy="${y}" rx="7" ry="2.4" fill="none" stroke="#e8a000" stroke-width="1.6"/>`}return h};
  const face=(cx,cy,r)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd23a" ${S}/><circle cx="${cx}" cy="${cy}" r="${r*.66}" fill="none" stroke="#e8a000" stroke-width="2"/><path d="M${cx-r*.45} ${cy-r*.3} a${r*.6} ${r*.6} 0 0 1 ${r*.5} ${-r*.35}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>`;
  let g;if(n===1)g=face(28,30,16);else if(n===2)g=st(22,44,4)+face(36,36,12);else g=st(15,46,3)+st(31,46,5)+face(41,38,11);
  return`<svg class="cpile" viewBox="0 0 56 56" aria-hidden="true">${g}</svg>`}
const RW_CHK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 12.5 L10 17 L18.5 7.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function rwLabel(sp){if(sp.classList.contains('pi-b')){const m=sp.className.match(/bt(\d)/);return m?TIERS[+m[1]][0]:'상자'}if(sp.classList.contains('pi-o'))return'꾸미기';if(sp.classList.contains('pi-L'))return'전설';return''}
function rwLook(){const m=$('passM');if(!m)return;
  for(const c of m.querySelectorAll('#psScroll .ps-cell')){const sp=c.querySelector(':scope>span');if(!sp)continue;
    if(sp.classList.contains('pi-c')){const b=sp.querySelector('b'),sv=sp.querySelector('svg');if(sv&&!sv.classList.contains('cpile'))sv.outerHTML=coinPile(b?+b.textContent:0)}
    let b=sp.querySelector('b');if(!b){sp.insertAdjacentHTML('beforeend',`<b>${rwLabel(sp)}</b>`);b=sp.querySelector('b')}
    const nm=c.querySelector('.lv-nm');if(nm)nm.remove();
    if(c.classList.contains('got')){b.className='gotb';b.innerHTML=`${RW_CHK}받음`}}}
{const pd=passDraw;passDraw=function(){const r=pd.apply(this,arguments);rwLook();return r}}
{const st=document.createElement('style');st.textContent=`
#passM #psScroll .ps-cell>span{background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important;aspect-ratio:auto!important;width:80px!important;max-width:96%;height:100%!important;max-height:92px;box-sizing:border-box;padding:4px 0 5px;display:flex!important;flex-direction:column;align-items:center;justify-content:flex-end;gap:3px;filter:none}
#passM #psScroll .ps-cell>span>svg,#passM #psScroll .ps-cell>span>.pi-ic{flex:1 1 0;min-height:0;width:100%!important;height:auto!important;max-height:52px!important;transform:none!important;filter:drop-shadow(0 3px 0 #4a2a1a40)}
#passM #psScroll .ps-cell>span.pi-b>svg{max-height:56px!important}
#passM #psScroll .ps-cell.lv.bx>span{max-height:110px}#passM #psScroll .ps-cell.lv.bx>span>svg{max-height:74px!important}
#passM #psScroll .ps-cell>span>b{width:auto!important;height:auto!important;flex:none!important;max-height:none!important}
#passM #psScroll .ps-cell>span.pi-o>*:not(b){flex:1 1 0;min-height:0;max-height:46px;width:100%!important;height:auto!important}
#passM #psScroll .ps-cell>span>b{font:13px/1 var(--f-display)!important;color:var(--choco)!important;background:#fff;border:2px solid var(--choco);border-radius:9px;padding:3px 8px 2px;box-shadow:0 2px 0 #4a2a1a40;white-space:nowrap}
#passM #psScroll .ps-cell.p>span>b{background:#fff8dc}
#passM #psScroll .ps-cell>span>b.gotb{display:flex;align-items:center;gap:2px;background:#2fbf73!important;color:#fff!important;padding-left:4px}#passM #psScroll .ps-cell>span>b.gotb svg{width:13px!important;height:13px!important;flex:none}
#passM #psScroll .ps-cell:not(.reach)>span>svg,#passM #psScroll .ps-cell:not(.reach)>span>.pi-ic{filter:saturate(.75) brightness(.96) drop-shadow(0 3px 0 #4a2a1a30)!important}
#passM #psScroll .ps-cell.got>span{filter:none!important;opacity:1}
#passM #psScroll .ps-cell.got>span>:not(b){opacity:.45;filter:grayscale(.6)!important}
#passM #psScroll .ps-cell.got::after{display:none!important}
#passM #psScroll .ps-cell.lv .lv-tag{top:6px;bottom:auto}
/* 단계 구슬이 위아래 칸에 닿지 않게 */
#passM #psScroll .ps-n{height:38px!important}
#passM #psScroll .ps-col.cur .ps-n i{transform:none!important;box-shadow:0 0 0 2.5px #fff,0 0 0 4.5px #ff8ab5!important}
#passM #psScroll .ps-col.ms5 .ps-n i,#passM #psScroll .ps-col.ms10 .ps-n i{min-width:30px!important;height:30px!important;line-height:26px!important}
/* 낮은 화면: 위·아래 여백을 줄여 칸 높이 확보 */
@media (max-height:380px){#passM .ps-top{min-height:40px!important}#passM .ps-foot{min-height:36px!important}#passM .ps-foot .ps-ad,#passM .ps-foot .ps-season{padding-top:3px!important;padding-bottom:3px!important}
  #passM .ps31.uni-pane .ps-track{padding-top:13px!important}#passM .ps-scroll{padding:2px 0 3px!important}#passM .ps-lab{padding:2px 0 3px!important}
  #passM #psScroll .ps-n{height:30px!important}#passM #psScroll .ps-cell>span>b{font-size:12px!important;padding:2px 6px 1px}#passM .ps31{gap:5px!important}}
`;document.head.appendChild(st)}
