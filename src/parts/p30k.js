/* ================= 30차 (카): 밸런스 2차 · 순간이동에 깃발 포함 · AI 덱 무작위 · AI가 망원경·투시 제대로 쓰기 ================= */
// 설명
SKN.heal&&(SKN.heal[1]='체력을 25 채워요');
SKN.brick&&(SKN.brick[1]='내 뒤에 5초짜리 작은 벽을 세워요');
SKN.gum[1]='뒤에 껌을 뿌려 몬스터를 9초 느리게';
SKN.smoke[1]='근처 몬스터는 2초 멍, 대포는 4초 못 봐요';
CARD_DESC.ice='얼음 사탕을 쏴요 · 맞으면 3.5초 느려져요';
augDesc('tn_last','마지막 60초|속도 +12% 대시 -40%');
// 정화 사탕 대기시간 16초
SK.clean.cd=16;if(SKBASE.clean)SKBASE.clean.cd=16;
// 몬스터 공격력 표도 맞춰요
for(const k of['bat','soldier','bear','skel'])if(MONP[k]&&DMG2[k]!=null)MONP[k].dmg=DMG2[k];
// 젤리 순간이동: 깃발 꽂기가 같이 붙어 있고 깃발은 공짜
SK.flag.cost=0;if(SKBASE.flag)SKBASE.flag.cost=0;if(SKN.flag)SKN.flag[2]=0;
SKN.tele[1]='깃발 꽂기(공짜)가 같이 있어요 · 마지막 깃발 자리로 휙! (깃발이 없으면 출발점)';
{const i=SKP.indexOf('flag');if(i>=0)SKP.splice(i,1);
  if(SAVE.skills.includes('flag')){const rep=SKP.find(k=>(typeof skillOpen!=='function'||skillOpen(k))&&!SAVE.skills.includes(k));SAVE.skills=cleanSkills(SAVE.skills.map(k=>k==='flag'?rep:k).filter(Boolean));saveGame()}}
function teleFlag(){if(G.heroSkills&&G.heroSkills.includes('tele')&&!G.heroSkills.includes('flag')){G.heroSkills=G.heroSkills.concat('flag');try{setupSkillBtns()}catch(e){}}SK.flag.cost=0}
{const nm9=newMatch;newMatch=function(mode){nm9(mode);try{teleFlag()}catch(e){}}}
{const sc9=skCostSync;skCostSync=function(){sc9();SK.flag.cost=0}}
// AI 마녀 덱: 모든 카드에서 무작위 6장 (고정 카드 없음)
aiDeck=function(){return shuffle(CPOOL.slice()).slice(0,6)};
// AI 도둑: 망원경은 쓸 수 있으면 바로, 투시는 근처에 숨은 함정이 있을 때
{const au2=aiSkillUse;aiSkillUse=function(near,seen,aimed){au2(near,seen,aimed);const h=G.hero,HS=G.heroSkills||[];
  if(HS.includes('scope')&&G.t>3&&!(G.scopeT>0))doScope(true);
  if(HS.includes('xray')&&!(G.seeHidden>0)&&G.ents.some(e=>!e.dead&&(TRAPS.includes(e.type)||e.type==='eye')&&!e._xr&&Math.hypot(e.x-h.x,e.z-h.z)<14))doXray(true)}}
// 투시로 본 함정은 AI가 기억하고 피해 가요
{const uh8=updHero;updHero=function(dt){uh8(dt);if(G.seeHidden>0){const h=G.hero;for(const e of G.ents)if(TRAPS.includes(e.type)&&Math.hypot(e.x-h.x,e.z-h.z)<20)e._xr=true}}}
// 시뮬레이션: 결과 화면을 기다리지 않아요 (시뮬레이션 때만)
{const em8=endMatch;endMatch=function(...a){if(!window.__simFast)return em8(...a);const st=window.setTimeout;window.setTimeout=(f,d,...r)=>st(f,0,...r);try{return em8(...a)}finally{window.setTimeout=st}}}
{const sc8=startCountdown;startCountdown=function(){if(window.__simFast&&!G.over){G.cdn=false;G.last=performance.now();return}return sc8()}}
