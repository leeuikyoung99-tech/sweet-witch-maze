// ===== 70차: 버그 고치기 =====
// 마녀 3,2,1: 판이 시작될 때 왼쪽 개수 판(몬스터·포탑·발판)이 잠깐 켜졌다 꺼졌다 다시 켜졌어요. 카운트다운이 끝날 때 한 번만 켜지게 해요.
{const bh=buildHand;buildHand=function(){const r=bh.apply(this,arguments);try{if(G.cdnWant||G.cdn)$('capPanel').hidden=true}catch(e){}return r}}

// 증강체 버튼: 도둑 '하늘 보기'(미로 전체 보기)가 나/상대 증강체 칩 바로 위에 겹쳐 있었고,
// 마녀 '소다 충전'·'새 패'·'출동'은 글씨 버튼으로 미로 한가운데 떠 있었어요.
// 둘 다 증강체 칩 옆(도둑은 칩 아래, 마녀는 칩 오른쪽)에 붙이고, 글씨 대신 아이콘으로 그려요.
const AB70={sky:['cloud','하늘 보기','p'],eat:['movewall','벽 냠냠','p'],soda4:['soda','소다 충전','s'],redraw:['recycle','새 패','s'],morph:['wind','마녀 출동','p']};
function ab70Svg(ic,tier){AUGI2.__ab70={ic,tier,n:''};try{return augIcon('__ab70',true)}finally{delete AUGI2.__ab70}}
function ab70Badge(a){if(a==='eat')return ((G.hero||{}).eats)|0;if(a==='soda4')return '+'+(typeof SODA4!=='undefined'?SODA4:4);return ''}
function ab70Icons(){for(const id of['augBtnH','augBtnD']){const box=$(id);if(!box)continue;
  for(const b of box.querySelectorAll('button[data-a]')){const a=b.dataset.a,d=AB70[a];if(!d)continue;const n=String(ab70Badge(a));
    if(b.classList.contains('ab70')&&b.dataset.n===n)continue;b.classList.add('ab70');b.dataset.n=n;b.setAttribute('aria-label',d[1]);b.title=d[1];
    b.innerHTML=ab70Svg(d[0],d[2])+(n&&n!=='0'?`<i class="ab70n">${n}</i>`:'')}}}
function ab70Set(b,k,v){if(b.style.getPropertyValue(k)!==v){if(v)b.style.setProperty(k,v,'important');else b.style.removeProperty(k)}}
function ab70Pos(){const h=$('augHud');const on=h&&!h.hidden&&h.getClientRects().length&&h.getBoundingClientRect().height>2;const r=on?h.getBoundingClientRect():null;
  const bh=$('augBtnH');if(bh)ab70Set(bh,'top',r?Math.round(r.bottom+6)+'px':'');
  const bd=$('augBtnD');if(bd){const L=r?Math.round(r.right+6)+'px':'',T=r?Math.round(r.top)+'px':'';
    ab70Set(bd,'left',L);ab70Set(bd,'top',T);ab70Set(bd,'bottom',r?'auto':'');ab70Set(bd,'transform',r?'none':'')}}
{const ah=augHud;augHud=function(){const r=ah.apply(this,arguments);try{ab70Icons();ab70Pos()}catch(e){}return r}}
setInterval(()=>{try{ab70Icons();ab70Pos()}catch(e){}},300);

// 도둑: 화면 높이가 낮으면(740x330 이하) 오른쪽 아래 스킬 버튼 묶음이 미니맵 아래쪽과 겹쳤어요. 미니맵 아래 남는 높이에 맞게 줄여요.
function sk70Fit(){const s=document.querySelector('#hudH .skills'),m=$('map');if(!s||!m||!s.getClientRects().length)return;
  const H=s.offsetHeight;if(!H)return;const mb=m.getClientRects().length?m.getBoundingClientRect().bottom:0;
  const avail=s.getBoundingClientRect().bottom-(mb+8);// 오른쪽 아래를 기준으로 줄여서 아래 끝은 그대로예요
  const k=Math.max(.6,Math.min(1,avail/H));const v=k>.995?'':`scale(${k.toFixed(3)})`;
  if(s.style.transform!==v){s.style.transformOrigin='100% 100%';s.style.transform=v}}
setInterval(()=>{try{sk70Fit()}catch(e){}},400);addEventListener('resize',()=>setTimeout(()=>{try{sk70Fit()}catch(e){}},60));

{const st=document.createElement('style');st.textContent=`
.aug-btns button.ab70{position:relative;width:38px;height:38px;padding:3px;border-radius:12px;display:grid;place-items:center}
.aug-btns button.ab70 svg{width:100%;height:100%}
.aug-btns .ab70n{position:absolute;right:-6px;bottom:-6px;min-width:18px;height:18px;border-radius:9px;background:#fff;color:var(--choco);border:2px solid var(--choco);font:11px/14px var(--f-display);font-style:normal;text-align:center}`;
document.head.appendChild(st)}
