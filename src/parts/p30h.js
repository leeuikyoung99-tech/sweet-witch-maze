/* ================= 30차 (아): 판 기록에 시간 흐름 추가 (15초마다 진행도 · 체력 · 사탕 · 받은 피해) · 랭크 등급 ================= */
// 15초마다 [초, 출구까지 진행도(%), 체력, 모은 사탕, 받은 피해 합, 마녀가 낸 카드 수, 도둑이 쓴 스킬 수]
const TL_STEP=15;
function tlReset(){G.tl={pts:[],next:TL_STEP,d0:0,dmg:0,lastHp:null}}
function tlProg(){const h=G.hero;if(!h)return 0;try{const ef=exitField(),[cx,cz]=cellOf(h.x,h.z),d=ef[idx(cx,cz)];const T=G.tl;
  if(!T.d0){const s=ef[idx(START[0],START[1])];T.d0=s>0?s:1}if(!(d>=0))return T.lastP||0;T.lastP=Math.max(0,Math.min(100,Math.round(100*(1-d/T.d0))));return T.lastP}catch(e){return 0}}
function tlSnap(t){const h=G.hero,D=G.devil||{},T=G.tl;let cards=0;for(const k in(D.played||{}))cards+=D.played[k]|0;
  T.pts.push([t,tlProg(),Math.round(h.hp||0),h.manaGot||0,Math.round(T.dmg),cards,h.skills||0])}
function tlTick(){if(!G||!G.tl||G.over||screen!=='play'||!G.hero)return;const h=G.hero,T=G.tl;
  if(T.lastHp!=null&&h.hp<T.lastHp)T.dmg+=T.lastHp-h.hp;T.lastHp=h.hp;
  if(!T.d0)tlProg();
  while(G.t>=T.next){tlSnap(T.next);T.next+=TL_STEP;if(T.pts.length>60)break}}
{const bm8=beginMatch;beginMatch=function(m,k){const r=bm8(m,k);try{tlReset()}catch(e){}return r}}
{const fr0=frame;frame=function(now){fr0(now);try{tlTick()}catch(e){}}}
// 기록에 시간 흐름 · 받은 피해 · 랭크 점수를 붙여요
let TL_REC=false;
{const sr0=statsRecord;statsRecord=function(...a){TL_REC=true;try{return sr0(...a)}finally{TL_REC=false}}}
{const sq0=statsSave;statsSave=function(q){try{const r=q[q.length-1];if(TL_REC&&r&&!r.timeline&&G&&G.tl){const T=G.tl;if(G.hero.hp<T.lastHp)T.dmg+=T.lastHp-G.hero.hp;tlSnap(Math.round((G.t||0)*10)/10);if(r.thief_win)T.pts[T.pts.length-1][1]=100;r.timeline=T.pts.slice();
    r.dmg_taken=Math.round(T.dmg);r.start_dist=T.d0||null;
    if(r.mode==='rank'){const t=SAVE.rankT.p|0,w=NET.peerRP|0;r.t_rp=t;r.w_rp=w;r.tier=tierOfP(Math.round((t+w)/2))}}}catch(e){}return sq0(q)}}
