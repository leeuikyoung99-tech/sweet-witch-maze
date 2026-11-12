// ===== 이름 바꾸기: 내 정보에서만 (친구 화면에서는 못 바꿔요) =====
const PEN_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20 l1-5 11-11 4 4-11 11z" fill="#ffd35f" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 6 l4 4" stroke="#4a2a1a" stroke-width="1.8"/><path d="M4 20 l1-5 4 4z" fill="#ff9ec7" stroke="#4a2a1a" stroke-width="1.5" stroke-linejoin="round"/></svg>';
{const po=profOpen;profOpen=function(page){const r=po.apply(this,arguments);const nm=document.querySelector('#pgBody .pf-nm');
  if(nm&&!nm.querySelector('.pf-nmed')){nm.insertAdjacentHTML('beforeend',`<button class="pf-nmed" aria-label="이름 바꾸기">${PEN_SVG}<span>이름 바꾸기</span></button>`);
    nm.querySelector('.pf-nmed').onclick=()=>{SFX.click();obEdit(()=>profOpen(1))}}return r}}
{const fr=frRender;frRender=function(){const r=fr.apply(this,arguments);const b=$('bFrNick');if(b)b.remove();return r}}
frNickAsk=function(){};
{const of=openFriends;openFriends=function(){if(!SAVE.me.nick){SAVE.me.nick=SAVE.nick||'쿠키';saveGame()}return of.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent=`
#pgBody .pf-nm{display:flex;align-items:center;gap:8px;min-width:0}#pgBody .pf-nm>b{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pf-nmed{flex:none;display:inline-flex;align-items:center;gap:4px;padding:3px 10px 3px 6px;border:2px solid var(--choco);border-radius:12px;background:#fff8dc;box-shadow:0 2px 0 var(--choco);font:13px var(--f-display);color:var(--choco);cursor:pointer}
.pf-nmed svg{width:18px;height:18px}.pf-nmed:active{transform:translateY(2px);box-shadow:none}
#bFrNick{display:none!important}`;document.head.appendChild(st)}
// ----- 온라인 방 코드 화면: 낮은 화면에서 그만두기 버튼이 창 아래에 닿지 않게 -----
{const st=document.createElement('style');st.textContent=`
#lobby .slab{padding-bottom:22px!important}
#lobby .slab>.wait31{margin-top:auto!important}#lobby .slab>.row:last-child{margin-bottom:auto!important}
@media (max-height:380px){#lobby .slab{gap:6px!important;row-gap:6px!important}#lobby .wait31{height:40px!important;width:40px!important;min-height:0!important}#lobby .wait31 svg{width:40px!important;height:40px!important}
  #lobby #lobCode{padding-top:2px!important;padding-bottom:2px!important;font-size:30px!important}#lobby #lobT{font-size:20px!important;margin:0!important}#lobby .pane-top{min-height:0!important}}`;document.head.appendChild(st)}
