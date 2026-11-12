// ===== 증강체: 한 번 보여준 건 다시 안 나와요 =====
// 다시 뽑기(새로고침)로 바꿀 때 이미 나왔던 카드는 안 나오고, 같은 대결의 다음 세트에서도
// 앞 세트에서 보여준 카드(다시 뽑기로 바뀐 것 포함)는 다시 안 나와요. 남은 카드가 모자랄 때만 예외로 다시 섞어요.
const AGSEEN={key:null,side:null,ids:[]};
function agSeenList(side){const S=curSer();const key=S||'solo';if(AGSEEN.key!==key){AGSEEN.key=key;AGSEEN.t=[];AGSEEN.w=[]}return AGSEEN[side]||(AGSEEN[side]=[])}
{const ac=augChoices3;augChoices3=function(side,tier,have,ctx){if(AGSEEN.side!==side)return ac.apply(this,arguments);
  const seen=agSeenList(side),h=have||[];const a=ac(side,tier,h.concat(seen),ctx)||[];if(a.length>=3)return a;
  const b=(ac(side,tier,h.concat(a),ctx)||[]).filter(id=>!a.includes(id));return a.concat(b).slice(0,3)}}
{const an=augPickN;augPickN=function(side){AGSEEN.side=side;agSeenList(side);return an.apply(this,arguments)}}
function agSeenAdd(){if(!AGSEEN.side)return;const L=agSeenList(AGSEEN.side);for(const c of document.querySelectorAll('#augS .ag-card[data-id]')){const id=c.dataset.id;if(id&&!L.includes(id))L.push(id)}}
new MutationObserver(()=>{if(!$('augS').hidden)agSeenAdd()}).observe($('augS'),{childList:true,subtree:true,attributes:true,attributeFilter:['data-id','hidden']});
