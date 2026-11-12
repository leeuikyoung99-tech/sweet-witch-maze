/* ================= 30차 (처): 벽 밀기 끌기 · 초코 벽 창 · 도둑 대 도둑 스킬 ================= */
// 벽 밀기 카드를 고른 상태: 눌린 곳 근처의 밀 수 있는 벽을 넉넉하게 집어요 (못 집으면 화면도 안 움직여요)
function movPick(cx,cy){const p=groundAt(cx,cy);if(!p)return null;let best=null,bd=C*1.1;
  for(const w of B.walls){if(w.temp||w.anim)continue;const wx=w.x*C,wz=w.z*C;const along=w.o==='H'?Math.abs(p.x-wx):Math.abs(p.z-wz),across=w.o==='H'?Math.abs(p.z-wz):Math.abs(p.x-wx);if(along>C*1.05)continue;if(across<bd&&wallShifts(w).length){bd=across;best=w}}return best}
// 초코 벽 창: 화면 아래쪽으로, 판이 끝나면 바로 닫혀요
{const st=document.createElement('style');st.textContent=`
#chocoBar{left:max(10px,env(safe-area-inset-left,0px))!important;right:auto!important;transform:none!important;top:auto!important;bottom:calc(10px + env(safe-area-inset-bottom,0px))!important;flex-direction:column!important;align-items:stretch}
#chocoBar[hidden]{display:none!important}
#skillS .skill-slab{width:min(600px,94vw)!important;max-width:none!important;box-sizing:border-box}
#skillS #chSkill2,#chSkill.sk-chips{flex-wrap:wrap!important;gap:8px 6px!important;max-width:540px;margin-left:auto!important;margin-right:auto!important}
.sk-chips .rc-sk{width:84px!important;flex:0 0 auto!important}
.sk-chips .rc-sk .dk{height:84px!important}
.sk-chips .rc-sk .sd{display:none!important}
#skillHint,#skillHint2{min-height:2.6em;line-height:1.3}`;document.head.appendChild(st)}
{const em=endMatch;endMatch=function(){const r=em.apply(this,arguments);try{chocoBarSync()}catch(e){}return r}}
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);try{chocoBarSync()}catch(e){}return r}}
setInterval(()=>{if(!$('chocoBar').hidden)try{chocoBarSync()}catch(e){}},300);
// 도둑 대 도둑: 지금 스킬들로 (마녀가 없는 판이라 소다 얼리기·투시·회복은 빼요)
RACE_SKP.splice(0,RACE_SKP.length,...SKP.filter(k=>!['freeze','xray','heal'].includes(k)));
for(const k of RACE_SKP)if(k!=='gum'&&SKN[k])RACE_DESC[k]=SKN[k][1];
SAVE.raceSkills=cleanRace(SAVE.raceSkills);
function raceAISk(){const P=['sprint','gum','dash2','compass','cloak','smoke','decoy'].filter(k=>RACE_SKP.includes(k));return shuffle(P.slice()).slice(0,2)}
// 스킬이 많아져서 설명은 누른 스킬 것만 아래에 보여줘요
{const sp=skillPickTap;skillPickTap=function(k){const r=sp.apply(this,arguments);try{const t=`<b>${SKN[k][0]}</b> ${RACE_DESC[k]||SKN[k][1]}<br>`+SAVE.raceSkills.map(q=>SKN[q][0]).join(' · ')+' + 대시';$('skillHint').innerHTML=$('skillHint2').innerHTML=t}catch(e){}return r}}
// 닉네임은 하나만: 친구 화면 닉네임 = 내 정보 닉네임 (따로 묻지 않아요)
SAVE.me=SAVE.me||{};if(!SAVE.nick&&SAVE.me.nick)SAVE.nick=cleanNick(SAVE.me.nick);if(SAVE.nick)SAVE.me.nick=SAVE.nick;
{const o=obNick;obNick=function(next){o(()=>{SAVE.me.nick=SAVE.nick;saveGame();next()})}}
frNickAsk=function(){obNick(()=>{pgClose();if(screen==='friendS'){frRender();frProbeAll()}})};
