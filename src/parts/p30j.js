/* ================= 30차 (차): 밸런스 조정 · 쿠키 메아리 · 회오리 사탕 · 미로 장인 없애기 · AI도 사탕 나침반 ================= */
// 설명 고치기
function augDesc(id,d){if(AUGI2[id])AUGI2[id].d=d;for(const L of[AUGT2,AUGW2]){const q=L.find(q=>q[0]===id);if(q)q[3]=d}}
augDesc('ts_hp','최대 체력 +40');
augDesc('tg_heal','사탕 먹을 때마다|체력 10 회복');
augDesc('tp_free','스킬 사탕 0개|대기시간 1.5배');
augDesc('tn_interest','5초마다 사탕|2개당 1개 이자');
augDesc('tn_dodge','몬스터를 피할 때마다|이동 속도 +3%');
augDesc('tn_edge','체력 30% 이하면|피해 -50% 속도 +25%');
augDesc('tn_rush','시작 40초 동안|이동 속도 +25%');
augDesc('ws_soda','소다 차는 속도|+5%');
augDesc('ws_spd','몬스터|이동 속도 +12%');
augDesc('wn_ambush','시작 20초 동안|모든 카드 소다 -1');
augDesc('wn_interest','5초마다 소다|4당 1 이자');
augDesc('wn_piggy','넘치는 소다를 모아|다음 판에 꺼내 써요');
SKN.sprint[1]='5초 동안 60% 빨라져요';
CARD_DESC.fog='도둑의 지도를 3초 가려요';
CARD_DESC.rev='밟으면 3초 동안 방향이 거꾸로';
CARD_DESC.eye='감시 사탕을 놔요 · 들키면 위치가 알려지고 몬스터가 3초 빨라져요 · 또 들키면 3초씩 더해져요';
// 솜사탕 연막 사탕 4개
SK.smoke.cost=4;if(SKBASE.smoke)SKBASE.smoke.cost=4;if(SKN.smoke)SKN.smoke[2]=4;
for(const k of['dash2','scope','xray']){if(SKBASE[k])SKBASE[k].cost=SK[k].cost;if(SKN[k])SKN[k][2]=SK[k].cost}
// 미로 장인 없애기
{const i=AUGW2.findIndex(q=>q[0]==='wn_craft');if(i>=0)AUGW2.splice(i,1)}
// 쿠키 메아리 없애기
{const i=SKP.indexOf('echo');if(i>=0)SKP.splice(i,1);
  if(SAVE.skills.includes('echo')){const rep=SKP.find(k=>(typeof skillOpen!=='function'||skillOpen(k))&&!SAVE.skills.includes(k));SAVE.skills=cleanSkills(SAVE.skills.map(k=>k==='echo'?rep:k).filter(Boolean));saveGame()}}
// 회오리 사탕 없애기
{const i=CPOOL.indexOf('whirl');if(i>=0)CPOOL.splice(i,1);
  if(SAVE.deck.includes('whirl')){const rep=CPOOL.find(k=>cardOpen(k)&&!SAVE.deck.includes(k));SAVE.deck=SAVE.deck.map(k=>k==='whirl'?rep:k).filter(Boolean);if(SAVE.deck.length<6)SAVE.deck=DEF_DECK.slice();saveGame()}
  for(const ch of STORY)if(ch.cards&&ch.cards.includes('whirl'))ch.cards=ch.cards.map(k=>k==='whirl'?'eye':k).filter((k,j,a)=>a.indexOf(k)===j)}
// AI 도둑도 사탕 나침반을 써요: 5초 동안 진짜 길을 알고 따라가요
aiSkills=function(){if(window.__skills)return window.__skills.slice();return shuffle(SKP.slice()).slice(0,2)};
{const ms0=memStep;memStep=function(x,z,dx,dz){const h=G.hero;if(h&&h.aiCompT>0)return canStep(x,z,dx,dz);return ms0(x,z,dx,dz)}}
{const dc0=doCompass;doCompass=function(ai){const h=G.hero,m=h?h.mana:0,cd=h?h.cdCompass||0:0;dc0(ai);if(h&&ai===true&&((h.cdCompass||0)>cd||h.mana<m)){h.aiCompT=5;if(h.ai){h.ai.t=0;h.ai.wander=0;h.ai.wdir=null}}}}
{const au0=aiSkillUse;aiSkillUse=function(near,seen,aimed){au0(near,seen,aimed);const h=G.hero,HS=G.heroSkills||[];
  if(HS.includes('compass')&&!(h.aiCompT>0)&&!(near<6&&seen))doCompass(true)}}
{const uh7=updHero;updHero=function(dt){uh7(dt);const h=G.hero;if(h&&h.aiCompT>0)h.aiCompT-=dt}}
