/* ================= 28차 (사): 친구 — 친구 코드 · 접속 표시 · 초대 · 기록 ================= */
{const a='ABCDEFGHJKMNPQRSTUVWXYZ23456789';if(!SAVE.me||!SAVE.me.id){let c='';for(let i=0;i<6;i++)c+=a[Math.floor(Math.random()*a.length)];SAVE.me={id:c,nick:''};saveGame()}}
SAVE.friends=Array.isArray(SAVE.friends)?SAVE.friends:[];SAVE.frRec=SAVE.frRec&&typeof SAVE.frRec==='object'?SAVE.frRec:{};
const FR={peer:null,on:{},info:{},invTo:null,inv:null,timer:0,starting:false};
const frId=id=>PEER_PREFIX+'u-'+id;
const myNick=()=>SAVE.me.nick||('쿠키'+SAVE.me.id.slice(0,3));
const frHi=()=>({t:'hi',id:SAVE.me.id,nick:myNick(),rank:Math.max(SAVE.rankT.p|0,SAVE.rankW.p|0)});
async function frStart(){if(FR.peer||FR.starting)return;FR.starting=true;try{await peerLib()}catch(e){FR.starting=false;return}
  const p=new Peer(frId(SAVE.me.id),peerOpts());FR.peer=p;FR.starting=false;FR.ready=new Promise(res=>{p.on('open',()=>res(true));setTimeout(()=>res(false),8000)});
  p.on('connection',conn=>{conn.on('open',()=>{try{conn.send(frHi())}catch(e){}});conn.on('data',d=>frData(d,conn))});
  p.on('error',e=>{if(e.type==='peer-unavailable'){const m=String(e.message||'').match(/u-([A-Z0-9]{6})/);if(m){FR.unav=FR.unav||{};FR.unav[m[1]]=Date.now();FR.on[m[1]]=false;frRender()}}else if(e.type==='unavailable-id'){/* 다른 탭에서 켜져 있거나 방금 다시 켰어요: 서버가 예전 연결을 놓을 때까지 계속 다시 */try{p.destroy()}catch(x){}if(FR.peer===p){FR.peer=null;FR.tries=(FR.tries|0)+1;setTimeout(frStart,Math.min(30000,5000+FR.tries*3000))}}
    else if(['network','server-error','socket-error','socket-closed'].includes(e.type)){/* 서버 연결이 끊김: 새로 */try{p.destroy()}catch(x){}if(FR.peer===p){FR.peer=null;setTimeout(frStart,5000)}}});
  p.on('disconnected',()=>{try{p.reconnect()}catch(e){}})}
function frData(d,conn){if(!d||typeof d!=='object')return;
  if(d.t==='hi'&&/^[A-Z0-9]{6}$/.test(d.id||'')){if(!d.re&&conn&&conn.open){try{conn.send(Object.assign(frHi(),{re:1}))}catch(e){}}FR.on[d.id]=true;FR.info[d.id]={nick:String(d.nick||'').slice(0,10),rank:d.rank|0};let f=SAVE.friends.find(q=>q.id===d.id);
    if(!f){SAVE.friends.push({id:d.id,nick:FR.info[d.id].nick});saveGame();tMsg(`👫 ${FR.info[d.id].nick}님과 친구가 됐어요`)}else if(f.nick!==FR.info[d.id].nick){f.nick=FR.info[d.id].nick;saveGame()}frRender();return}
  if(d.t==='inv'&&/^[A-Z0-9]{5}$/.test(d.code||'')){const f=SAVE.friends.find(q=>q.id===d.id);if(!f)return;FR.inv={id:d.id,nick:f.nick||d.nick,code:d.code,conn};frInvShow();return}
  if(d.t==='invNo'){if(screen==='lobby')$('lobL').textContent=`${(SAVE.friends.find(q=>q.id===d.id)||{}).nick||'친구'}님이 지금은 어렵대요`;return}}
async function frSend(fid,msg,cb){if(!FR.peer)await frStart();if(!FR.peer||!(await FR.ready)){cb&&cb(false);return}const t0=Date.now();const c=FR.peer.connect(frId(fid),{reliable:true,serialization:'json'});let ok=false;
  c.on('open',()=>{ok=true;try{c.send(frHi());if(msg)c.send(msg)}catch(e){}cb&&cb(true)});c.on('data',d=>frData(d,c));setTimeout(()=>{if(!ok){/* 접속 확인: 서버가 '없는 친구'라고 안 하면 켜져 있는 거예요(직접 연결이 느린 휴대폰 망이어도) */if(!msg)FR.on[fid]=!(FR.unav&&FR.unav[fid]>=t0);else FR.on[fid]=false;frRender();cb&&cb(false)}try{if(!msg)c.close()}catch(e){}},msg?20000:5000)}
function frProbeAll(){for(const f of SAVE.friends)frSend(f.id,null)}
/* ----- 친구 화면 ----- */
function openFriends(){show('friendS');frStart();if(!SAVE.me.nick){frNickAsk();return}frRender();frProbeAll();clearInterval(FR.timer);FR.timer=setInterval(()=>{if(screen!=='friendS'){clearInterval(FR.timer);return}frProbeAll()},15000)}
function frNickAsk(){const M=$('frM');M.hidden=false;M.innerHTML=`<div class="slab fr-nick"><div class="kicker">👫 친구</div><h2>닉네임을 정해요</h2><p class="lede">친구 목록과 대결 화면에 보여요 (2~8글자)</p><input id="frNickIn" maxlength="8" value="${SAVE.me.nick||''}" placeholder="예: 말랑쿠키" autocomplete="off"><div class="row"><button class="sbtn" id="bFrNickX">닫기</button><button class="mbtn mint small" id="bFrNickOk"><span class="mt"><b>정했어요</b></span></button></div></div>`;
  const inp=$('frNickIn');for(const ev of['keydown','keyup','pointerdown'])inp.addEventListener(ev,e=>e.stopPropagation());setTimeout(()=>inp.focus(),50);
  $('bFrNickX').onclick=()=>{M.hidden=true;if(!SAVE.me.nick)titleScreen();else frRender()};
  $('bFrNickOk').onclick=()=>{const v=inp.value.trim().replace(/[<>&"']/g,'');if(v.length<2){SFX.deny();inp.focus();return}SAVE.me.nick=v.slice(0,8);saveGame();M.hidden=true;SFX.card();frRender();frProbeAll();
    clearInterval(FR.timer);FR.timer=setInterval(()=>{if(screen!=='friendS'){clearInterval(FR.timer);return}frProbeAll()},15000)}}
function frRecTxt(id){const r=SAVE.frRec[id];if(!r||!(r.w+r.l+r.d))return'아직 대결 기록 없음';return`나 ${r.w}승 ${r.l}패${r.d?` ${r.d}무`:''}`}
function frRender(){if(screen!=='friendS')return;$('frMe').innerHTML=`<span class="fr-nm">${myNick()}</span><button class="fr-ed" id="bFrNick">✏️</button><span class="fr-code">내 코드 <b>${SAVE.me.id}</b></span><button class="sbtn tiny" id="bFrCopy">복사</button>`;
  $('bFrNick').onclick=()=>frNickAsk();$('bFrCopy').onclick=async()=>{try{await navigator.clipboard.writeText(SAVE.me.id);tMsg('내 친구 코드를 복사했어요')}catch(e){tMsg('내 친구 코드: '+SAVE.me.id)}};
  const L=SAVE.friends.slice().sort((a,b)=>(FR.on[b.id]?1:0)-(FR.on[a.id]?1:0));
  $('frList').innerHTML=L.length?L.map(f=>{const on=FR.on[f.id],inf=FR.info[f.id],rk=inf?inf.rank:null;return`<div class="fr-row${on?' on':''}"><i class="fr-dot" title="${on?'접속 중':'접속 안 함'}"></i><div class="fr-who"><b>${f.nick||'친구'}</b><small>${on===undefined?'확인 중…':on?'접속 중':'접속 안 함'}${rk!=null?` · ${tierIcon(tierOf(rk))}${rankTxtP(rk)}`:''}</small></div><div class="fr-rec">${frRecTxt(f.id)}</div><button class="mbtn berry tiny fr-inv" data-id="${f.id}"${on?'':' disabled'}><span class="mt"><b>초대</b></span></button><button class="fr-del" data-id="${f.id}" aria-label="친구 삭제">✕</button></div>`}).join(''):'<p class="note">아직 친구가 없어요 · 친구 코드를 넣어 추가해요</p>'}
function frAdd(){const v=($('frAddIn').value||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(v.length!==6){SFX.deny();tMsg('친구 코드 6자리를 넣어 주세요');return}if(v===SAVE.me.id){SFX.deny();tMsg('내 코드예요');return}if(SAVE.friends.some(f=>f.id===v)){tMsg('이미 친구예요');return}
  SAVE.friends.push({id:v,nick:'친구 '+v.slice(0,3)});saveGame();$('frAddIn').value='';SFX.card();frRender();frSend(v,null,ok=>{tMsg(ok?'친구를 추가했어요!':'친구를 추가했어요 · 친구가 게임을 켜면 이름이 보여요')})}
/* ----- 초대 ----- */
function frInvite(fid){FR.invTo=fid;ROLECTX='friend';showRole('main');tMsg(`${(SAVE.friends.find(f=>f.id===fid)||{}).nick||'친구'}님과 할 게임을 골라요 · 방이 만들어지면 초대가 가요`)}
{const lb0=lobby;lobby=function(t,l,btn,o={}){lb0(t,l,btn,o);if(o.code&&FR.invTo){const fid=FR.invTo,f=SAVE.friends.find(q=>q.id===fid);FR.invTo=null;$('lobL').textContent=`${f?f.nick:'친구'}님에게 초대를 보내는 중…`;
  frSend(fid,{t:'inv',id:SAVE.me.id,nick:myNick(),code:o.code},ok=>{if(screen==='lobby')$('lobL').textContent=ok?`${f?f.nick:'친구'}님에게 초대를 보냈어요! 수락하면 바로 시작해요`:'친구가 지금 접속해 있지 않아요 · 코드를 직접 알려 줘도 돼요'})}}}
function frInvShow(){const I=FR.inv;if(!I)return;if(['play','design'].includes(screen)||NET.on){try{I.conn.send({t:'invNo',id:SAVE.me.id})}catch(e){}FR.inv=null;return}const M=$('frInv');M.hidden=false;SFX.bell();
  M.innerHTML=`<div class="fr-ib"><b>👫 ${I.nick}님의 초대!</b><span>같이 과자 마녀의 미로를 해요</span><div class="row"><button class="sbtn tiny" id="bFrNo">거절</button><button class="mbtn mint tiny" id="bFrYes"><span class="mt"><b>수락</b></span></button></div></div>`;
  clearTimeout(FR.invT);FR.invT=setTimeout(()=>{M.hidden=true;FR.inv=null},20000);
  $('bFrNo').onclick=()=>{try{I.conn.send({t:'invNo',id:SAVE.me.id})}catch(e){}M.hidden=true;FR.inv=null};
  $('bFrYes').onclick=async()=>{M.hidden=true;FR.inv=null;await initAudio();joinRoom(I.code)}}
/* ----- 대결 상대 알기 · 기록 ----- */
{const ns5=netStart;netStart=function(d){ns5(d);try{netSend({t:'me',id:SAVE.me.id,nick:myNick()})}catch(e){}}}
{const nm4=netMsg;netMsg=function(d){if(d&&d.t==='me'){if(/^[A-Z0-9]{6}$/.test(d.id||'')){NET.peerId=d.id;NET.peerNick=String(d.nick||'').replace(/[<>&"']/g,'').slice(0,8);const f=SAVE.friends.find(q=>q.id===d.id);if(f&&f.nick!==NET.peerNick){f.nick=NET.peerNick;saveGame()}}return}nm4(d)}}
{const em3=endMatch;endMatch=function(win,why){const S=NET.on&&NET.ser&&NET.ser.on?NET.ser:null,was=G.over;em3(win,why);if(!S||was||!S.done||!NET.peerId)return;const r=SAVE.frRec[NET.peerId]||(SAVE.frRec[NET.peerId]={w:0,l:0,d:0});if(S.me>S.op)r.w++;else if(S.me<S.op)r.l++;else r.d++;saveGame()}}
// 점수표에 상대 닉네임
{const sr3=serResult;serResult=function(S){const r=sr3(S);try{if(NET.on&&NET.peerNick){const th=$('resCoin').querySelectorAll('.ser-t tr th');if(th[7])th[7].textContent=NET.peerNick}}catch(e){}return r}}
/* ----- 처음 화면 버튼 ----- */
{const b=document.createElement('button');b.className='sbtn tiny';b.id='bFriend';b.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="17" cy="18" r="8" fill="#ffd9c0" stroke="#4a2a1a" stroke-width="3"/><circle cx="32" cy="20" r="7" fill="#ffd9c0" stroke="#4a2a1a" stroke-width="3"/><path d="M5 40 q12-16 24 0 M24 40 q10-13 20 0" fill="#3fbf9f" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/></svg>친구';$('bMis').after(b);b.onclick=async()=>{await initAudio();openFriends()}}
$('bFrX').onclick=()=>titleScreen();$('bFrAdd').onclick=()=>frAdd();
for(const ev of['keydown','keyup','pointerdown'])$('frAddIn').addEventListener(ev,e=>{e.stopPropagation();if(ev==='keydown'&&e.key==='Enter')frAdd()});
$('frList').addEventListener('click',e=>{const iv=e.target.closest('.fr-inv');if(iv&&!iv.disabled){SFX.card();frInvite(iv.dataset.id);return}const dl=e.target.closest('.fr-del');if(dl){const f=SAVE.friends.find(q=>q.id===dl.dataset.id);if(dl.dataset.sure){SAVE.friends=SAVE.friends.filter(q=>q.id!==dl.dataset.id);saveGame();frRender()}else{dl.dataset.sure=1;dl.textContent='삭제?';setTimeout(()=>{if(dl.isConnected){delete dl.dataset.sure;dl.textContent='✕'}},2500)}}});
{const ts3=titleScreen;titleScreen=function(){ts3();frStart()}}
/* 친구 연결 지키기: 앱을 다시 보거나 15초마다, 끊겼으면 다시 잇고 없어졌으면 새로 */
function frKeep(){try{FR.tries=0;const p=FR.peer;if(!p){if(!FR.starting)frStart();return}if(p.destroyed){FR.peer=null;frStart();return}if(p.disconnected){try{p.reconnect()}catch(e){}}}catch(e){}}
setInterval(frKeep,15000);document.addEventListener('visibilitychange',()=>{if(!document.hidden){frKeep();if(screen==='friendS')setTimeout(frProbeAll,1500)}});
{const sh8=show;show=function(id){sh8(id);$('friendS').hidden=id!=='friendS';if(id!=='friendS')$('frM').hidden=true}}
