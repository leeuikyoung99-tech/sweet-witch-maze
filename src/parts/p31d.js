/* ================= 31차 (라): 코인 경제 다시 맞추기 (하루 2시간 · 광고 포함 · 한 달에 원하는 카드 5~6개) ================= */
// 카드·스킬 가격: 일반 800 · 희귀 1600 · 전설 2800
GR_P[1]=800;GR_P[2]=1600;GR_P[3]=2800;
// 판 끝날 때 코인: 지면 3 · 이기면 7
{const e=earnCoins;earnCoins=function(w){const c0=SAVE.coins;const r=e.apply(this,arguments);if(SAVE.coins-c0>0){const n=w?(typeof rewardFor==='function'?rewardFor(G.mode):7):3;SAVE.coins=c0+n;saveGame();syncCoins();if(r&&typeof r==='object'&&'n' in r)r.n=n;return typeof r==='number'?n:r}return r}}
// 경험치 두 배 효과 없애기: 이기면 30 · 지면 15
{const a=addXP;addXP=function(n){return a(n/2)}}
// 꾸미기 가격은 다시 원래대로 (반값)
for(const c in SHOP){const S=SHOP[c];if(!S||!S.items)continue;for(const id in S.items){const it=S.items[id];if(it[1]>0&&!SHOP.__half)it[1]=Math.round(it[1]/2)}}
Object.defineProperty(SHOP,'__half',{value:1,enumerable:false});
