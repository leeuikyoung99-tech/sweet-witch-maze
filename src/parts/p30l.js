/* ================= 30차 (타): 벽 밀기는 덱에 늘 들어가는 고정 카드 · 나머지 5장을 골라요 ================= */
// 손패는 예전처럼 덱에서 4장씩 뽑아요. 덱 = 벽 밀기(고정) + 고른 5장
{const i=CPOOL.indexOf('move');if(i>=0)CPOOL.splice(i,1)}
DEF_DECK.length=0;DEF_DECK.push('skel','tower','slip','trap','fake');
const DECK_N=5;
cleanDeck=function(d){const ok=Array.isArray(d)?[...new Set(d.filter(k=>CPOOL.includes(k)))]:[];return ok.length>=DECK_N?ok.slice(0,DECK_N):DEF_DECK.slice()};
{let d=(SAVE.deck||[]).filter(k=>k!=='move'&&CPOOL.includes(k));for(const k of CPOOL){if(d.length>=DECK_N)break;if(!d.includes(k)&&cardOpen(k))d.push(k)}d=d.slice(0,DECK_N);SAVE.deck=d.length===DECK_N?d:DEF_DECK.slice();try{saveGame()}catch(e){}}
aiDeck=function(){return shuffle(CPOOL.slice()).slice(0,DECK_N)};
{const md0=matchDeck;matchDeck=function(){return['move',...md0().filter(k=>k!=='move')]}}
{const sd0=stDef;stDef=function(c,s){const st=sd0(c,s);if(st&&st.deck){let d=st.deck.filter(k=>k!=='move');for(const q of['skel','tower','slip','trap','fake','ghost'])if(d.length<DECK_N&&!d.includes(q))d.push(q);st.deck=d.slice(0,DECK_N)}return st}}
// 덱 화면: 맨 앞에 벽 밀기가 고정으로 보여요
{const st=document.createElement('style');st.textContent='.dk.fixed{opacity:.85;cursor:default}.dk.fixed .x2{display:none}.dk .fx{position:absolute;right:5px;top:5px;font:10px var(--f-display);color:#fff;background:#7a4526;border-radius:6px;padding:0 4px}';document.head.appendChild(st)}
{const rd1=renderDeck;renderDeck=function(){rd1();if(DECKV.tab!=='witch'){$('deckN').textContent='스킬 2개 + 대시';return}$('deckN').textContent='카드 5장 + 벽 밀기';
  const t=$('deckTop');if(t&&!t.querySelector('.dk.fixed')){t.insertAdjacentHTML('afterbegin',dkTile('move',true,'fixed').replace('class="dk ','class="dk fixed ').replace('</button>','<span class="fx">고정</span></button>'))}}}
{const dt1=deckTap;deckTap=function(a,k){if(a==='fixed'||k==='move'){DECKV.pick=null;try{$('deckSel').innerHTML=`<b>${CARDS.move.n}</b> · ${CARD_DESC.move} · 늘 덱에 들어가요`}catch(e){}return}return dt1(a,k)}}
// 카드·스킬 화면: 마녀 카드와 도둑 스킬 칸 크기를 똑같이
{const st=document.createElement('style');st.textContent='#deckS .dk-top,#deckS .dk-pool,#deckS .dk-top.two,#deckS .dk-pool.two{display:flex;flex-wrap:wrap;justify-content:center;gap:6px}#deckS .dk-top .dk,#deckS .dk-pool .dk,#deckS .dk-top.two .dk,#deckS .dk-pool.two .dk{width:80px!important;height:92px!important;min-height:92px;flex:0 0 80px}#deckS .deck-n{font-size:13px;line-height:18px;min-width:120px}';document.head.appendChild(st)}
