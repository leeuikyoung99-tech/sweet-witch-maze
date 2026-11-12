/* ================= 29차 (사): 카드·스킬은 코인으로 열어요 · 스토리는 코인 보상 ================= */
let unlPrice=()=>300; // 마녀 카드·도둑 스킬 모두 300코인
unlockWhere=function(kind,k){return unlPrice(kind,k)+'코인'};
// 스토리: 예전에 카드·스킬·옷이 열리던 단계는 처음 깨면 보너스 코인
const STBON={};const BONV={3:100,5:150,7:150,10:250};
for(const ch of STORY){for(const[sn]of ch.unl)STBON[ch.n+'-'+sn]=BONV[sn]||150;ch.unl=[]}
{const se9=stageEnd;stageEnd=function(win,why,t){const st=G.stage;const key=st&&st.story?st.c+'-'+st.s:null,old=key?SAVE.st2[key]|0:0;const x=se9(win,why,t);
  if(key&&x&&!(old&1)&&((SAVE.st2[key]|0)&1)&&STBON[key]){x.coins=(x.coins|0)+STBON[key];x.bonus=STBON[key];SAVE.coins+=STBON[key];syncCoins();saveGame()}return x}}
{const re9=resExtra;resExtra=function(win,why,t){re9(win,why,t);const x=G.extra&&G.extra.stage;if(x&&x.bonus)$('resCoin').insertAdjacentHTML('beforeend',`<div class="unl-got">단계 보너스 ${COIN_SVG}+${x.bonus}</div>`)}}
{const rs8=renderStages;renderStages=function(){rs8();const k=STV.c+'-'+STV.s,el=document.querySelector('#stgInfo .si-rw');if(el&&STBON[k])el.insertAdjacentHTML('beforeend',` · 이 단계는 처음 깨면 보너스 ${STBON[k]}코인`)}}
// 덱 화면: 잠긴 카드를 누르면 아래에 '열기' 버튼
{const dt9=deckTap;deckTap=function(a,k){const W=DECKV.tab==='witch',open=W?cardOpen(k):skillOpen(k);if(a==='pool'&&!open){DECKV.pick=null;renderDeck();const kind=W?'c':'s',pr=unlPrice(kind,k),nm=W?CARDS[k].n:SKN[k][0],ds=W?CARD_DESC[k]:SKN[k][1];
    $('deckSel').innerHTML=`<span class="dk-buy-t"><b>${nm}</b> · ${ds}</span><button class="mbtn berry small dk-buy" ${SAVE.coins<pr?'disabled':''}><span class="mt"><b>${SAVE.coins<pr?`코인이 모자라요 (${pr})`:`${pr}코인으로 열기`}</b></span></button>`;
    const b=$('deckSel').querySelector('.dk-buy');b.onclick=()=>{if(SAVE.coins<pr){SFX.deny();return}SAVE.coins-=pr;SAVE.unl[kind+':'+k]=1;saveGame();syncCoins();SFX.win();DECKV.pick={a:'pool',k};renderDeck();$('deckSel').insertAdjacentHTML('afterbegin','<b class="dk-new">열렸어요!</b> ')};SFX.card();return}
  return dt9(a,k)}}
