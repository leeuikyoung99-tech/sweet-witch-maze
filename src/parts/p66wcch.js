// ===== 미로 벽 스킬: 늘어나는 칸 수(추천 자리)는 판마다 "찬스" 한 번만 =====
// 벽 스킬 카드를 고르면 카드 위에 찬스 버튼이 떠요. 누르면 그 한 번(벽을 쓰거나 다른 카드를 고를 때까지)만 숫자와 추천이 보여요.
const WCH={n:1,act:null};
{const nm=newMatch;newMatch=function(){WCH.n=1;WCH.act=null;return nm.apply(this,arguments)}}
function wchFree(k){try{if(typeof TU!=='undefined'&&TU.on)return true}catch(e){}try{if(PLAN2.on&&PLAN2.steps[PLAN2.i]&&PLAN2.steps[PLAN2.i].k===k)return true}catch(e){}return false}
function wchBtn(){let b=$('wcChB');if(!b){b=document.createElement('button');b.id='wcChB';b.type='button';b.hidden=true;document.body.appendChild(b);
    b.addEventListener('pointerdown',e=>e.stopPropagation());
    b.onclick=e=>{e.stopPropagation();const D=G.devil,k=D&&D.sel!=null?D.hand[D.sel]:null;if(!k||!WALLC.includes(k)||WCH.n<=0||WCH.act)return;WCH.n--;WCH.act={k,sel:D.sel};try{SFX.magic()}catch(e){}WC.key='';try{WC46.key=''}catch(e){}b.hidden=true}}
  return b}
{const wu=wcUpdate;wcUpdate=function(){const r=wu.apply(this,arguments);const D=G.devil,h=G.hero;const k=D&&D.sel!=null?D.hand[D.sel]:null;
  const on=G.mode==='devil'&&screen==='play'&&!G.over&&h&&k&&WALLC.includes(k);const b=wchBtn();
  if(WCH.act&&(!on||WCH.act.k!==k||WCH.act.sel!==D.sel))WCH.act=null;
  if(!on){b.hidden=true;return r}
  const free=wchFree(k);
  // 찬스 버튼: 선택한 카드 바로 위
  if(!free&&!WCH.act&&WCH.n>0){const card=$('hand')&&$('hand').children[D.sel];const q=card&&card.getBoundingClientRect();
    if(q&&q.width){b.innerHTML=`<b>찬스</b><small>숫자 보기 ${WCH.n}번</small>`;b.style.left=Math.round(q.left+q.width/2)+'px';b.style.top=Math.round(q.top-6)+'px';b.hidden=false}else b.hidden=true}
  else b.hidden=true;
  if(free||WCH.act)return r;
  try{const dh=$('dhint');if(k==='turn'&&dh&&/금색|gold/.test(dh.textContent))dh.textContent=tr('민트빛 벽을 끌어서 돌려요')}catch(e){}
  // 찬스를 안 쓰면 숫자·금색 추천을 숨겨요 (돌릴 벽을 고른 뒤 돌아갈 자리는 색만 같게 보여요)
  const box=$('wcLab');if(box&&box.innerHTML)box.innerHTML='';
  try{wc45Hide()}catch(e){}
  if(k==='turn'&&TURN46.w){try{for(const m of WC46.ghosts)if(m&&m.visible){m.material.color.setHex(0x8fe9ff);m.material.opacity=.32}}catch(e){}}
  else{try{wc46Hide()}catch(e){}}
  return r}}
{const st=document.createElement('style');st.textContent=`
#wcChB{position:fixed;z-index:30;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;gap:1px;padding:5px 11px 4px;border:2.5px solid var(--choco,#4a2a1a);border-radius:12px;background:linear-gradient(#ffe36b,#ffb21e);color:#5a2a00;box-shadow:0 3px 0 #4a2a1a,0 0 12px #ffd23a99;cursor:pointer;white-space:nowrap;animation:wchB 1s ease-in-out infinite alternate}
#wcChB[hidden]{display:none}
#wcChB b{font:15px/1 var(--f-display)}#wcChB small{font:11px/1 var(--f-display);opacity:.85}
@keyframes wchB{to{transform:translate(-50%,calc(-100% - 3px))}}`;document.head.appendChild(st)}
// 벽 숫자 표시가 안내 글·시계·카드 등을 가리지 않게: 겹치면 아래로 비키고, 그래도 겹치면 숨겨요
const WCOBS=['#dtimer','#bPauseD','#dhint','#hudD .tray','#capPanel','#emoBtn','#augHud','#augBtnD','#wcChB','#dhud','#hpBox'];
function wcDodge(){const box=$('wcLab');if(!box||!box.children.length)return;const obs=[];for(const s of WCOBS)for(const e of document.querySelectorAll(s)){if(e.hidden||!e.getClientRects().length)continue;const q=e.getBoundingClientRect();if(q.width>2&&q.height>2&&q.width<innerWidth*.9)obs.push(q)}
  const hit=(a,b)=>a.left<b.right+3&&a.right>b.left-3&&a.top<b.bottom+3&&a.bottom>b.top-3;const placed=[];
  for(const sp of box.children){sp.style.visibility='';let q=sp.getBoundingClientRect();let g=0;
    while(g++<4){const o=obs.concat(placed).find(b=>hit(q,b));if(!o)break;const t=parseFloat(sp.style.top)||0;sp.style.top=(t+(o.bottom-q.top)+5).toFixed(0)+'px';q=sp.getBoundingClientRect()}
    if(obs.concat(placed).some(b=>hit(q,b))||q.bottom>innerHeight-4)sp.style.visibility='hidden';else placed.push(q)}}
{const wu=wcUpdate;wcUpdate=function(){const r=wu.apply(this,arguments);try{wcDodge()}catch(e){}return r}}
