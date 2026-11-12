/* ================= 30차 (바): 판 기록 모으기 (승률 분석용) ================= */
// 판이 끝날 때마다 한 줄씩 기록해서 Supabase 'matches' 표로 보내요. 못 보내면 기기에 모아 뒀다가 다음에 보내요.
// 패치 번호: 배포할 때마다 patch.txt 숫자가 들어가요 (패치별로 따로 모아 봐요)
const STATS={url:'https://djtbilcgsjuwwfulciwa.supabase.co',key:'sb_publishable_cpaRNZVgYSgCQIMl6-g5vw_hgtqz5c_',ver:'__PATCH__'};
if(!SAVE.pid){SAVE.pid=Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4);try{saveGame()}catch(e){}}
// 증강체를 몇 판째에 골랐는지 기억해요
{const ba5=buildAug;buildAug=function(){const A=ba5();try{const S=(G.chal||G.duo||G.stage)?null:curSer();if(S&&S.on){S.augAt=S.augAt||{};for(const id of A.ids)if(S.augAt[id]==null)S.augAt[id]=S.r;if(!S.sid)S.sid=Math.random().toString(36).slice(2,10)}}catch(e){}return A}}
function statsQ(){try{return JSON.parse(localStorage.getItem('swm_stats_q')||'[]')}catch(e){return[]}}
function statsSave(q){try{localStorage.setItem('swm_stats_q',JSON.stringify(q.slice(-300)))}catch(e){}}
let statsBusy=false;
async function statsFlush(){if(!STATS.url||!STATS.key||statsBusy)return;const q=statsQ();if(!q.length)return;statsBusy=true;const batch=q.slice(0,50);
  try{const r=await fetch(STATS.url+'/rest/v1/matches',{method:'POST',headers:{'Content-Type':'application/json',apikey:STATS.key,Prefer:'return=minimal'},body:JSON.stringify(batch),keepalive:true});
    if(r.ok){const now=statsQ();statsSave(now.slice(batch.length));if(now.length>batch.length)setTimeout(statsFlush,500)}}catch(e){}statsBusy=false}
function statsRecord(win,why,t){try{if(G.duo||G.stage||G.chal)return;const S=curSer();if(!S||!S.on)return;
  // 온라인은 같은 판을 두 번 세지 않게 도둑 쪽에서만 보내요
  if(NET.on&&NET.role!=='hero')return;
  const A=G.aug||{},h=G.hero,D=G.devil||{};const role=NET.on?NET.role:G.mode;const mode=NET.on?(NET.rand?'rank':'friend'):'ai';
  const wdeck=role==='devil'?SAVE.deck.slice():(NET.on?(NET.peerDeck||[]):(S.aiDk||[]));
  const rec={ver:STATS.ver,pid:SAVE.pid,sid:S.sid||null,mode,ai_level:mode==='ai'?AIL:null,dev:!!SAVE.dev,map:THEMEID,round:S.r,my_role:role,
    thief_win:!!win,why:why||null,secs:Math.round(t*10)/10,hp:Math.round(h.hp||0),hp_max:h.hpMax||100,candies:h.manaGot||0,skills_used:h.skills||0,
    thief_skills:(G.heroSkills||[]).slice(),witch_deck:wdeck,cards_played:D.played||{},
    aug_thief:(A.t||[]).filter(id=>AUGI2[id]&&AUGI2[id].side==='t'),aug_witch:(A.w||[]).filter(id=>AUGI2[id]&&AUGI2[id].side==='w'),
    aug_round:S.augAt||{},extra:{lucky:A.lucky||null,fate:A.fate!=null?A.fate:null,roul:A.roul!=null?A.roul:null,stk:S.stk||{},rank:NET.rand?(SAVE.rank&&SAVE.rank.s)||0:null}};
  const q=statsQ();q.push(rec);statsSave(q);statsFlush()}catch(e){}}
{const em9=endMatch;endMatch=function(win,why){const was=G.over;const t=G.t;const r=em9(win,why);if(!was)statsRecord(win,why,t);return r}}
setTimeout(statsFlush,4000);
