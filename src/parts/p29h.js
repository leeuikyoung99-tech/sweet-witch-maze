/* ================= 29차 (아): 종 줄 카드 없애기 · 증강체 꾹 누르면 설명 · 판 시작 음악 · 고르는 창 뒤 가리기 ================= */
// 종 줄 카드 없애기
{const i=CPOOL.indexOf('bell');if(i>=0)CPOOL.splice(i,1);
  if(SAVE.deck.includes('bell')){const rep=CPOOL.find(k=>cardOpen(k)&&!SAVE.deck.includes(k));SAVE.deck=SAVE.deck.map(k=>k==='bell'?rep:k).filter(Boolean);if(SAVE.deck.length<6)SAVE.deck=DEF_DECK.slice();saveGame()}}
// 증강체 그림을 누르면 이름·설명이 떠요 (빈 곳을 누르면 사라져요)
{const tip=document.createElement('div');tip.id='agTip';tip.hidden=true;document.body.appendChild(tip);let hideT=0;
  const show=id=>{const a=AUGI2[id];if(!a)return;clearTimeout(hideT);tip.innerHTML=`<small>${TIERN[a.tier]} · ${a.side==='t'?'쿠키 도둑':'과자 마녀'}</small><b>${a.n}</b><span>${a.d.replace(/\|/g,' ')}</span>`;tip.hidden=false};
  const hide=d=>{clearTimeout(hideT);hideT=setTimeout(()=>{tip.hidden=true},d||0)};
  let lastC=null;
  document.addEventListener('pointerdown',e=>{const c=e.target.closest&&e.target.closest('.ag-chip');if(!c){if(!tip.hidden)hide(0);return}e.preventDefault();e.stopPropagation();lastC=c;show(c.dataset.id)},true);
  setInterval(()=>{if(!tip.hidden&&(!lastC||!lastC.isConnected||lastC.offsetParent===null))hide(0)},300);
  document.addEventListener('contextmenu',e=>{if(e.target.closest&&e.target.closest('.ag-chip'))e.preventDefault()},true);
  augTip=show}
// 판 시작: 그 맵 음악이 아직 안 받아졌으면 다른 곡을 틀지 않고 기다렸다가 맵 음악으로 시작해요
{const mg9=musicGame;musicGame=function(){const th=THEMEID,k='m_'+th;if(A.ctx&&MAPMUS[th]&&!window.__noMapMusic&&!A.buf[k]){stopTrack('title');stopTrack('design');for(const n of Object.keys(A.tracks))if(n==='game'||n.startsWith('m_'))stopTrack(n);loadMapMusic(th);clearTimeout(musicGame.w);musicGame.w=setTimeout(()=>{if(isPlaying()&&THEMEID===th&&!A.buf[k]){MAPMUS[th]=0;mg9()}},12000);return}return mg9()}}
// 증강체 고르는 동안은 지난 판 음악을 끄고 처음 화면 음악
{const ap9=augPickN;augPickN=function(...a){try{if(A.ctx&&!NET.on)musicTitle();else if(A.ctx)musicTitle()}catch(e){}return ap9(...a)}}
// 오디오가 켜지면 맵 음악을 차례로 미리 받아 둬요
function preloadMapMusic(){if(!A.ctx||window.__noMapMusic)return;const ks=Object.keys(MAPMUS).filter(k=>MAPMUS[k]&&!A.buf['m_'+k]);if(!ks.length)return;if(!A.loading)loadMapMusic(MAPPICK&&ks.includes(MAPPICK)?MAPPICK:ks[0]);setTimeout(preloadMapMusic,1500)}
{const ia9=initAudio;initAudio=async function(){const r=await ia9.apply(this,arguments);setTimeout(preloadMapMusic,2000);return r}}
// 맵이 정해지면 그 맵 음악부터
{const nm8=netMsg;netMsg=function(d){const r=nm8(d);if(d&&d.t==='map')try{loadMapMusic(d.k)}catch(e){}return r}}
// 결과 화면 '그만하기'·'뒤로': 새 판을 바로 시작하지 않고 게임 밖(역할 고르는 화면)으로 나가요
setTimeout(()=>{const bh=$('bHome'),old=bh.onclick;bh.onclick=e=>{if(!NET.on&&!G.stage&&!G.chal){const sub=!!G.duo;SER.on=false;try{augCancel()}catch(_){}clearInterval(mapPick.h);$('mapM').hidden=true;titleScreen();ROLECTX='ai';showRole(sub?'sub':'main');return}old&&old(e)}},0);
