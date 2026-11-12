/* ================= 30차 (파): 밸런스 3차 (시뮬레이션 1200판 결과) ================= */
// 마녀 전체: 소다가 22% 더 빨리 차요
{const sm1=sodaMul;sodaMul=function(){return sm1()*1.22}}
// 망토 4초
SK.cloak.dur=4;SKN.cloak[1]='4초 동안 투명해져요';
SKN.heal&&(SKN.heal[1]='체력을 20 채워요');
SKN.gum[1]='뒤에 껌을 뿌려 몬스터를 12초 느리게';
SKN.smoke[1]='근처 몬스터는 1.5초 멍, 대포는 4초 못 봐요';
SK.clean.cd=12;if(SKBASE.clean)SKBASE.clean.cd=12;
for(const k of['bat','skel'])if(MONP[k])MONP[k].dmg=DMG2[k];
CARD_DESC.eye='감시 사탕을 놔요 · 들키면 위치가 알려지고 몬스터가 4초 빨라져요 · 또 들키면 4초씩 더해져요';
augDesc('ts_hp','최대 체력 +30');
augDesc('ts_spd','이동 속도 +6%');
augDesc('tg_cd','모든 스킬|대기시간 -35%');
augDesc('tn_merchant','스킬 쓰면 50% 확률로|사탕을 돌려받아요');
augDesc('wp_flood','소다 속도 1.6배|대신 손패 3장');
augDesc('wg_mondisc','몬스터 카드 소다 -1|(2 이하 카드는 그대로)');
augDesc('wn_fate','카드를 쓰면 15% 공짜|10% 한 번 더');
augDesc('wn_curse','남은 60초부터|도둑 속도 -10%');
augDesc('ws_trap','덫·발판 남는 시간|2배');
// 3차
SK.cloak.cost=5;if(SKBASE.cloak)SKBASE.cloak.cost=5;SKN.cloak[2]=5;
SK.scope.cost=1;if(SKBASE.scope)SKBASE.scope.cost=1;if(SKN.scope)SKN.scope[2]=1;
SK.compass.cost=4;if(SKBASE.compass)SKBASE.compass.cost=4;SKN.compass[2]=4;
SKN.heal&&(SKN.heal[1]='체력을 15 채워요');
SKN.smoke[1]='근처 몬스터는 1.2초 멍, 대포는 2.5초 못 봐요';
for(const k of['skel'])if(MONP[k])MONP[k].dmg=DMG2[k];
CARD_DESC.eye='감시 사탕을 놔요 · 들키면 위치가 알려지고 몬스터가 5초 빨라져요 · 또 들키면 5초씩 더해져요';
// 매운 몬스터: 모든 몬스터 공격이 40% 세져요 (닿기·점프·돌진·후려치기 모두)
{const hu8=hurt;hurt=function(src,amount,why){if((G.aug||{}).wspicy&&src&&src.type&&isMon(src))amount=Math.round(amount*1.4);return hu8(src,amount,why)}}
augDesc('ts_spd','이동 속도 +5%');
augDesc('ts_dashcd','대시 대기시간|0.45초 줄어요');
augDesc('tn_rush','시작 40초 동안|이동 속도 +20%');
augDesc('tn_bigbag','사탕 최대 8개|4초마다 1개씩 차요');
augDesc('tn_interest','4초마다 사탕|2개당 1개 이자');
augDesc('tp_free','스킬 사탕 0개|대기시간 1.25배');
augDesc('tp_giant','최대 체력 2배|이동 속도 -6%');
augDesc('tp_sky','판마다 한 번|8초 미로 전체 보기');
augDesc('wp_flood','소다 속도 1.35배|대신 손패 3장');
augDesc('ws_soda','소다 차는 속도|+3%');
augDesc('ws_trap','덫·발판 남는 시간|1.75배');
augDesc('wn_fate','카드를 쓰면 10% 공짜|10% 한 번 더');
augDesc('wn_ambush','시작 15초 동안|모든 카드 소다 -1');
augDesc('wg_spicy','몬스터 피해|+40%');
augDesc('wg_bank','소다를|14까지 모아요');
augDesc('wn_interest','5초마다 소다|3당 1 이자');
augDesc('wp_party','몬스터 6마리|대신 포탑 2개');
augDesc('wn_roul','판마다 룰렛|소다 +4 ~ 1.6배');
// 4차
SKN.sprint[1]='5초 동안 50% 빨라져요';
if(SKN.freeze)SKN.freeze[1]='마녀의 소다가 7초 동안 안 차요';
if(SKN.scope)SKN.scope[1]='12초 동안 지도가 멀리까지 밝혀지고 몬스터가 보여요';
for(const k of['skel','bat'])if(MONP[k])MONP[k].dmg=DMG2[k];
CARD_DESC.choco='15초 동안 벽을 하나 더 세워요';
CARD_DESC.ice='얼음 사탕을 쏴요 · 맞으면 3초 느려져요';
augDesc('tp_life','쓰러지면 한 번|체력 70%로 부활 +3초 무적');
augDesc('ts_spd','이동 속도 +4%');
augDesc('tp_sky','판마다 한 번|6초 미로 전체 보기');
augDesc('ts_trap','덫·발판 효과|40% 줄여요');
augDesc('tp_bomb','사탕 4개마다|근처 몬스터 펑');
augDesc('tn_merchant','스킬 쓰면 60% 확률로|사탕을 돌려받아요');
augDesc('ts_hp','최대 체력 +35');
augDesc('wn_roul','판마다 룰렛|소다 +3 ~ 1.45배');
augDesc('wp_moving','40초마다 벽 하나가|도둑 길을 늘려요');
// 5차
SKN.heal&&(SKN.heal[1]='체력을 12 채워요');
for(const k of['skel'])if(MONP[k])MONP[k].dmg=DMG2[k];
CARD_DESC.choco='12초 동안 벽을 하나 더 세워요';
augDesc('tp_life','쓰러지면 한 번|체력 50%로 부활 +3초 무적');
augDesc('tn_merchant','스킬 쓰면 45% 확률로|사탕을 돌려받아요');
augDesc('tn_edge','체력 30% 이하면|피해 -40% 속도 +20%');
augDesc('ts_hp','최대 체력 +30');
augDesc('tp_free','스킬 사탕 0개|대기시간 1.1배');
augDesc('tp_sky','판마다 한 번|7초 미로 전체 보기');
augDesc('tn_interest','3초마다 사탕|2개당 1개 이자');
augDesc('tp_bomb','사탕 3개마다|근처 몬스터 펑');
augDesc('wn_roul','판마다 룰렛|소다 +2 ~ 1.3배');
augDesc('wp_moving','40초마다 벽 두 개가|도둑 길을 늘려요');
augDesc('wp_flood','소다 속도 1.2배|대신 손패 3장');
augDesc('wp_revive','사라진 몬스터가|15초 뒤 한 번 부활');
augDesc('wn_hunt','도둑이 다칠 때마다|내 피해 +4%');
augDesc('ws_trap','덫·발판 남는 시간|2.25배');
augDesc('wg_mon1','몬스터 4마리까지|몬스터 남는 시간 +20%');
