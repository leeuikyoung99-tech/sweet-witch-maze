// ===== 튜토리얼: 마녀 연습 전에 증강체 고르기 (항상 "소다 충전", 마녀 연습에서 직접 써 봐요) =====
const TU_AUG='w_soda4',TU_AUGCH=['w_lateburn','w_soda4','w_walls3'];
{const af=augFlags;augFlags=function(){const f=af.apply(this,arguments);if(TU.on&&TU.aug&&G.tutor&&G.tutor.side==='devil')return{t:f.t,w:[TU.aug]};return f}}
{const ac=augChoices3;augChoices3=function(){if(TU.on&&TU.agFix)return TU_AUGCH.slice();return ac.apply(this,arguments)}}
{const ts=tuStart;tuStart=function(){TU.aug=null;TU.augDone=0;TU.agFix=0;return ts.apply(this,arguments)}}
{const tp=tuStop;tuStop=function(){TU.aug=null;TU.agFix=0;document.body.classList.remove('tu-ag');return tp.apply(this,arguments)}}
function tuAugPick(go){
  tuModal('증강체','판마다 증강체를 골라요','혼자 하기와 대결에서는 판을 시작하기 전에 증강체 3장 중 1장을 골라요. 고른 증강체는 그 대결이 끝날 때까지 계속 힘을 줘요','골라 보기',()=>{
    document.body.classList.add('tu-ag');TU.agFix=1;
    augPickN('w','s',[],1,ids=>{TU.agFix=0;document.body.classList.remove('tu-ag');TU.guard=false;TU.tgt=null;TU.steps=[];TU.i=0;$('tuBub').hidden=true;
      TU.aug=TU_AUG;const a=AUGI2[TU_AUG];
      tuModal('증강체',`${eul(a.n)} 골랐어요`,'이제 마녀 연습에서 직접 써 봐요','마녀 연습 시작',go)},'연습 · 과자 마녀 증강체');
    clearInterval(AUGP.h);
    const S=$('augS'),mo=new MutationObserver(()=>{if(S.hidden||!AUGP.on){mo.disconnect();return}clearInterval(AUGP.h)});mo.observe(S,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
    const sel=`#augS .ag-card[data-id="${TU_AUG}"]`;
    tuSteps('aug',[{pr:'증강체',t:'소다 충전을 골라요',s:'판마다 한 번, 버튼을 누르면 소다가 4 바로 차요. 마녀 연습에서 써 볼게요',p:sel,a:[sel],g:1,d:()=>!AUGP.on}])})}
{const tw=tuWitch;tuWitch=function(){if(TU.on&&!TU.augDone){TU.augDone=1;return tuAugPick(()=>tw.apply(this,arguments))}return tw.apply(this,arguments)}}
// 마녀 연습에 "증강체 써 보기" 단계를 넣어요 (도둑을 잡기 전에)
{const tsp=tuSteps;tuSteps=function(ph,steps){if(ph==='devil'&&TU.aug===TU_AUG&&!steps.some(s=>s.agUse)){
    for(const s of steps)if(typeof s.pr==='string')s.pr=s.pr.replace('/4','/5');
    const last=steps.pop();if(last&&typeof last.pr==='string')last.pr='마녀 5/5';
    const btn=()=>{let b=document.querySelector('#augBtnD button[data-a="soda4"]');if(!b){try{augHud()}catch(e){}b=document.querySelector('#augBtnD button[data-a="soda4"]')}return b};const D=()=>G.devil;let tw0=0;
    const twr=()=>G.ents.filter(e=>e.type==='tower'&&!e.dead).length;const tcard=()=>D().sel==null&&$('hand').children[D().hand.indexOf('tower')]||null;
    steps.push(
      {agUse:1,pr:'마녀 4/5',pause:true,t:'소다가 모자라요',s:'카드를 내려면 소다가 필요해요. 아까 고른 소다 충전을 써 봐요. 반짝이는 소다 충전 버튼을 눌러요',p:btn,a:['#augBtnD'],g:1,enter(){D().pt=0;try{buildHand();augHud();sodaUI()}catch(e){}},d:()=>!!D().soda4Used},
      {pr:'마녀 4/5',t:'소다가 4 찼어요! 바로 써요',s:'찬 소다로 사탕 대포를 하나 더 놓아요. 카드를 누르고 미로의 빈 곳을 눌러요',p:tcard,
        enter(){tw0=twr();if(!D().hand.includes('tower')){D().hand[0]='tower'}D().pt=Math.max(D().pt,CARDS.tower.cost);try{buildHand()}catch(e){}},d:()=>twr()>tw0},
      {pr:'마녀 4/5',pause:true,btn:'계속',t:'증강체로 대포를 하나 더 놓았어요!',s:'증강체는 이렇게 판을 유리하게 만들어 줘요. 버튼이 없는 증강체는 저절로 힘을 줘요',d:()=>TU.ok});
    if(last)steps.push(last)}
  return tsp.call(this,ph,steps)}}
{const st=document.createElement('style');st.textContent=`
body.tu-ag #augS .ag-time,body.tu-ag #augS .ag-rr2,body.tu-ag #augS .ag-note,body.tu-ag #augS .ag-foot{visibility:hidden}
body.tu-ag #augS{z-index:38}
body.tu-ag #augS .ag-box{transform:translateY(-36px) scale(.9);transform-origin:50% 50%}`;document.head.appendChild(st)}
