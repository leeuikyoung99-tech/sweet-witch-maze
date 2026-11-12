// ===== 67차: 미로 벽 스킬은 '벽 밀기' 하나만 =====
// 초코 벽·벽 돌리기는 없어요. 벽 밀기를 고르면 찬스 없이 늘 +칸 숫자가 보이고, 숫자를 누르면 그 벽이 가장 좋은 자리로 알아서 움직여요.
WALLC.splice(0,WALLC.length,'move');
myWall=function(){return 'move'};
wchFree=function(){return true};
try{for(const ch of STORY){const i=ch.cards.indexOf('choco');if(i>=0){const alt=['trap','slip','magnet','fake','bear'].find(k=>!ch.cards.includes(k));ch.cards[i]=alt}ch.unl=ch.unl.filter(([,u])=>!(u[0]==='c'&&(u[1]==='choco'||u[1]==='turn')))}}catch(e){}
// 이미 연 초코 벽·벽 돌리기는 코인으로 돌려드려요
{let back=0;for(const k of['turn','choco'])if(SAVE.unl&&SAVE.unl['c:'+k]){let pr=0;try{pr=unlPrice('c',k)}catch(e){pr=1600}back+=pr|0;delete SAVE.unl['c:'+k]}
  let ch=false;if(SAVE.wallCard&&SAVE.wallCard!=='move'){SAVE.wallCard='move';ch=true}
  if(back){SAVE.coins=(SAVE.coins|0)+back;ch=true;setTimeout(()=>{try{tMsg(`초코 벽·벽 돌리기가 없어져서 ${back}코인을 돌려드렸어요`)}catch(e){}},2600)}
  if(ch)try{saveGame()}catch(e){}}
// 숫자를 누르면 그 벽이 알아서 움직여요
function wcAuto(w,q){const D=G.devil;if(!D||D.sel==null||D.hand[D.sel]!=='move'||G.over)return;
  const r=useCard('move',0,0,{w,o:w.o,nx:q.x,nz:q.z});if(r!=='ok'){say(tr(WHY[r]||'지금은 그 벽을 옮길 수 없어요'),false,1.3,true);SFX.deny();return}
  D.sel=null;$('dhint').textContent='';try{markMovable(false)}catch(e){}buildHand();try{rebuildPathLines()}catch(e){}}
$('wcLab').addEventListener('pointerdown',e=>{const s=e.target.closest&&e.target.closest('span[data-i]');if(!s)return;e.preventDefault();e.stopPropagation();const it=WC.list[+s.dataset.i];if(it&&it[2])wcAuto(it[0],it[2])});
{const wu=wcUpdate;wcUpdate=function(){const r=wu.apply(this,arguments);try{const D=G.devil,dh=$('dhint');if(D&&D.sel!=null&&D.hand[D.sel]==='move'&&dh){const a=dh.textContent;if(a===tr('민트빛 벽을 밀 방향으로 쓸기')||a==='민트빛 벽을 밀 방향으로 쓸기')dh.textContent=tr('숫자를 누르면 그 벽이 알아서 움직여요')}}catch(e){}return r}}
{const st=document.createElement('style');st.textContent='#wcLab span[data-i]{pointer-events:auto;cursor:pointer;padding:4px 8px;font-size:14px}#wcLab span.top{font-size:17px}#wcChB{display:none!important}';document.head.appendChild(st)}
