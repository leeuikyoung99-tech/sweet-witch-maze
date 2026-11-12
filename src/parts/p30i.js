/* ================= 30차 (자): 풍선껌 카드 없애기 ================= */
{const i=CPOOL.indexOf('jelly');if(i>=0)CPOOL.splice(i,1);
  if(SAVE.deck.includes('jelly')){const rep=CPOOL.find(k=>cardOpen(k)&&!SAVE.deck.includes(k));SAVE.deck=SAVE.deck.map(k=>k==='jelly'?rep:k).filter(Boolean);if(SAVE.deck.length<6)SAVE.deck=DEF_DECK.slice();saveGame()}
  // 이야기 모드: 마녀 덱에서 빼고 다른 카드로, 1장 7단계 보상(풍선껌)은 없어요
  const REP={4:'soldier',7:'slip'};
  for(const ch of STORY){if(ch.cards&&ch.cards.includes('jelly'))ch.cards=ch.cards.map(k=>k==='jelly'?(REP[ch.n]||'slip'):k).filter((k,j,a)=>a.indexOf(k)===j);
    if(ch.unl)ch.unl=ch.unl.filter(q=>!(q[1][0]==='c'&&q[1][1]==='jelly'))}}
