/* ================= 29차 (라): 도둑 랭크 · 마녀 랭크 (점수제) · 반대 역할끼리 짝짓기 ================= */
SAVE.rankT=Object.assign({p:0,best:0},SAVE.rankT&&typeof SAVE.rankT==='object'?SAVE.rankT:{});
SAVE.rankW=Object.assign({p:0,best:0},SAVE.rankW&&typeof SAVE.rankW==='object'?SAVE.rankW:{});
const tierOfP=p=>Math.min(4,Math.floor(Math.max(0,p|0)/100));
const rankTxtP=p=>TIERS[tierOfP(p)][0]+' '+(p|0)+'점';
const RKS=r=>r==='devil'?SAVE.rankW:SAVE.rankT;
function myRP(){return RKS(NET.role||SET.role).p|0}
// 점수: 이기면 25점 안팎, 지면 20점 안팎 (상대 점수가 높을수록 더 얻고 덜 잃어요)
function rpDelta(win,me,op){const k=Math.max(-8,Math.min(8,Math.round((op-me)/12)));return win?25+k:-(20-k)}
rankUpdate=function(win){if(window.__aiBoth)return null;const role=NET.role==='devil'?'devil':'hero',R=RKS(role),old=R.p|0,ot=tierOfP(old);
  const d=rpDelta(win,old,NET.peerRP|0);R.p=Math.max(0,old+d);const nt=tierOfP(R.p);let rew=0;if(nt>(R.best|0)){R.best=nt;rew=TIER_REW[nt];SAVE.coins+=rew;syncCoins()}
  saveGame();syncRank();return{d:R.p-old,up:nt>ot,down:nt<ot,rew,s:R.p,role}};
syncRank=function(){try{syncTitle()}catch(e){}const el=$('tRank');if(!el)return;const a=SAVE.rankT.p|0,b=SAVE.rankW.p|0;
  el.innerHTML=`<span class="rk2">${tierIcon(tierOfP(a))}<span><small>도둑</small>${rankTxtP(a)}</span></span><span class="rk2">${tierIcon(tierOfP(b))}<span><small>마녀</small>${rankTxtP(b)}</span></span>`};
syncTitle=function(){const b=$('bRandT');if(!b)return;b.classList.remove('locked');$('randSub').textContent='도둑 랭크 · 마녀 랭크'};
openRank=function(){const row=(nm,R)=>{const p=R.p|0,t=tierOfP(p);return`<div class="rk2-sec"><div class="rk2-h"><b>${nm} 랭크</b><span>지금 <b>${rankTxtP(p)}</b>${t<4?` · 다음 등급까지 ${100-p%100}점`:''}</span></div><div class="rk-row">`+
  TIERS.map(([n],i)=>{const cur=i===t,done=i<t;return`<div class="rk${cur?' cur':''}${done?' done':''}">${cur?'<span class="me">지금</span>':''}${tierIcon(i)}<b>${n}</b><span class="rk-s">${i*100}${i<4?'~'+(i*100+99):'+'}점</span><small>${i===0?'시작':TIER_REW[i]+'코인 보상'}</small></div>`}).join('')+'</div></div>'};
  $('rankRow').innerHTML=row('도둑',SAVE.rankT)+row('마녀',SAVE.rankW);$('rankRow').className='rk2-wrap';$('rankNow').innerHTML='';
  $('rankHow').innerHTML='<b>아무나와 하기</b>에서 고른 역할로 3판을 해요. 3판 결과로 이기면 <b>+25점</b> 안팎, 지면 <b>-20점</b> 안팎<br>나보다 점수가 높은 상대를 이기면 더 많이 얻고, 지면 덜 잃어요';
  $('rankM').querySelector('.kicker').textContent='랭크';$('rankM').hidden=false};

/* ----- 짝짓기: 도둑은 마녀 자리, 마녀는 도둑 자리를 찾아요 ----- */
const RANKPRE=x=>'swm-rank-v4-'+x+'-';
randomMatch=async function(resume){if(SAVE.coins<5){netLeave();lobby('코인이 5개 필요해요','아무나와 하기는 서로 판돈을 걸고 이긴 사람이 두 배를 가져가요. AI 대전에서 이겨서 코인을 모아 오세요.','돌아가기',{ai:true});return}
  if(SET.stake<5||SET.stake>SAVE.coins)SET.stake=5;SET.gmode='classic';
  netLeave();if(!resume)RM.skip.clear();RM.stop=false;NET.cancel=false;const my=++RM.id;const alive=()=>!NET.cancel&&RM.id===my;
  const myR=SET.role==='devil'?'devil':'hero';SET.role=myR;const own=myR==='hero'?'T':'W',opp=myR==='hero'?'W':'T';
  NET.rand=true;NET.stake=SET.stake;
  lobby(`${myR==='hero'?'도둑':'마녀'} 상대를 찾는 중…`,`${myR==='hero'?'과자 마녀':'쿠키 도둑'}를 찾고 있어요 · 판돈 ${SET.stake}코인`,'그만두기');
  try{await peerLib()}catch(e){if(alive())lobby('연결하지 못했어요',NETFAIL,'돌아가기');return}
  const me=new Peer(undefined,peerOpts());NET.peer=me;try{await waitOpen(me)}catch(e){if(alive())lobby('연결하지 못했어요',NETFAIL,'돌아가기');return}
  while(alive()){
    // 1) 반대 역할로 기다리는 사람이 있으면 바로 붙어요
    for(let k=0;k<RSLOTS;k++){if(!alive())return;const id=RANKPRE(opp)+k;if(skipped(id))continue;const conn=await tryJoin(me,id);if(!alive()){try{conn&&conn.close()}catch(e){}return}if(conn){NET.rand=true;NET.stake=SET.stake;joinWith(conn);return}}
    // 2) 없으면 내 역할 자리를 잡고 기다려요
    RPX=RANKPRE(own);for(let k=0;k<RSLOTS;k++){if(!alive())return;const r=await claimSlot(k,my);if(r==='ok'){if(myR==='hero')oppProbe(my,opp);return}if(r==='gone')return}
    $('lobL').textContent='맞는 상대를 계속 찾는 중…';await new Promise(r=>setTimeout(r,3000))}};
// 도둑이 기다리는 동안 마녀 자리를 가끔 살펴서 붙어요 (둘이 따로 기다리는 일 없게 · 마녀는 안 살펴서 서로 엇갈리지 않아요)
function oppProbe(my,opp){clearInterval(RM.probe2);RM.probe2=setInterval(async()=>{const p=NET.peer2;if(NET.cancel||RM.id!==my||NET.room){clearInterval(RM.probe2);return}if(!p||RM.cand||RM.busy)return;RM.busy=1;
  try{for(let j=0;j<RSLOTS;j++){const id=RANKPRE(opp)+j;if(skipped(id))continue;const conn=await tryJoin(NET.peer,id);if(conn&&NET.peer2===p&&!NET.room&&!RM.cand){clearInterval(RM.probe2);NET.peer2=null;try{p.destroy()}catch(e){}joinWith(conn);break}else if(conn){try{conn.close()}catch(e){}}}}finally{RM.busy=0}},6000)}
{const nl9=netLeave;netLeave=function(){clearInterval(RM.probe2);RPX='';return nl9.apply(this,arguments)}}
// 역할 고르는 화면: 아무나와 하기도 도둑·마녀 중 골라요
{const sr9=showRole;showRole=function(tab){sr9(tab);if(ROLETAB!=='main')return;const rk=ROLECTX==='rand';$('bRankGo').hidden=true;$('bHero').hidden=$('bDevil').hidden=false;
  $('roleNote').textContent=rk?`고른 역할로 3판 · 3판 결과로 점수가 바뀌어요 · 도둑 ${rankTxtP(SAVE.rankT.p)} · 마녀 ${rankTxtP(SAVE.rankW.p)}`:ROLECTX==='friend'?'3판 내내 같은 역할 · 판마다 증강체가 쌓여요 · 랭크는 바뀌지 않아요':'3판 내내 같은 역할 · 판마다 증강체가 쌓여요 (이기면 다음 판 2장) · 3판 결과로 승패'}}
// AI와 할 때 난이도 고르기 (역할 고르는 화면)
{const row=document.createElement('div');row.id='aiLvl';row.className='ai-lvl';row.hidden=true;row.innerHTML='<span>AI 난이도</span>'+AIL_N.map((n,i)=>`<button data-v="${i}">${n}</button>`).join('');$('roleNote').before(row);
  const sync=()=>{const v=SAVE.ail==null?1:SAVE.ail;for(const b of row.querySelectorAll('button'))b.classList.toggle('on',+b.dataset.v===v)};
  for(const b of row.querySelectorAll('button'))b.onclick=()=>{SAVE.ail=+b.dataset.v;AIL=SAVE.ail;saveGame();sync();SFX.card()};
  const sr8=showRole;showRole=function(tab){sr8(tab);row.hidden=!(ROLECTX==='ai'&&ROLETAB==='main');sync()}}
