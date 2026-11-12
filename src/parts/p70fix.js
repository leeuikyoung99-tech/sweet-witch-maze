// ===== 70차: 버그 고치기 =====
// 마녀 3,2,1: 판이 시작될 때 왼쪽 개수 판(몬스터·포탑·발판)이 잠깐 켜졌다 꺼졌다 다시 켜졌어요. 카운트다운이 끝날 때 한 번만 켜지게 해요.
{const bh=buildHand;buildHand=function(){const r=bh.apply(this,arguments);try{if(G.cdnWant||G.cdn)$('capPanel').hidden=true}catch(e){}return r}}
