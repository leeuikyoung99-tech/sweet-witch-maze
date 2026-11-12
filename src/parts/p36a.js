/* ================= 36차: 계정 (게스트 / 구글) + 클라우드 저장 ================= */
// 처음 시작할 때 게스트로 할지 구글 계정으로 할지 물어봐요.
// 게스트도 서버에 손님 계정이 만들어져 기록이 저장되고, 나중에 설정에서 구글을 연결할 수 있어요.
// 로그인 정보는 'swm-auth'에 따로 두고, 게임 기록(SAVE)은 Supabase 'saves' 표에 계정마다 한 줄로 저장해요.
const AU={url:STATS.url,key:STATS.key,busy:false,upT:0,last:''};
const auPreview=()=>!/^https?:/.test(location.protocol)||/claude|usercontent|sandbox/.test(location.host);
function auGet(){try{return JSON.parse(localStorage.getItem('swm-auth')||'null')}catch(e){return null}}
function auSet(s){try{s?localStorage.setItem('swm-auth',JSON.stringify(s)):localStorage.removeItem('swm-auth')}catch(e){}}
function auFrom(j,u){u=u||j.user||{};return{at:j.access_token,rt:j.refresh_token,exp:Date.now()+((+j.expires_in||3600)-90)*1000,uid:u.id,anon:!!u.is_anonymous,email:u.email||''}}
async function auReq(path,opt={},tok){const h=Object.assign({apikey:AU.key,'Content-Type':'application/json'},opt.headers||{});if(tok)h.Authorization='Bearer '+tok;
  const r=await fetch(AU.url+path,Object.assign({},opt,{headers:h}));let j=null;try{j=await r.json()}catch(e){}if(!r.ok){const er=new Error((j&&(j.msg||j.message||j.error_description||j.error))||('HTTP '+r.status));er.code=j&&(j.error_code||j.code);er.status=r.status;throw er}return j}
async function auGuest(){const j=await auReq('/auth/v1/signup',{method:'POST',body:JSON.stringify({data:{}})});const s=auFrom(j);auSet(s);return s}
async function auToken(){let s=auGet();if(!s||!s.rt)return null;if(Date.now()<s.exp)return s;
  try{const j=await auReq('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:s.rt})});s=auFrom(j);auSet(s);return s}
  catch(e){if(e.status===400||e.status===401){auSet(null);return null}throw e}}
const auBack=()=>location.origin+location.pathname;
function auGoogle(kind){if(auPreview()){acctNote('미리보기 화면에서는 구글 로그인을 할 수 없어요. 게임 주소에서 해 주세요.');return}
  try{localStorage.setItem('swm-auth-go',kind||'signin')}catch(e){}
  location.href=AU.url+'/auth/v1/authorize?provider=google&redirect_to='+encodeURIComponent(auBack())}
async function auLink(){if(auPreview()){acctNote('미리보기 화면에서는 구글 로그인을 할 수 없어요. 게임 주소에서 해 주세요.');return}
  let s=null;try{s=await auToken();if(!s)s=await auGuest()}catch(e){}
  if(!s)return auGoogle('signin');
  try{const j=await auReq('/auth/v1/user/identities/authorize?provider=google&skip_http_redirect=true&redirect_to='+encodeURIComponent(auBack()),{method:'GET'},s.at);
    try{localStorage.setItem('swm-auth-go','link')}catch(e){}location.href=j.url}
  catch(e){acctNote('구글 연결을 시작하지 못했어요. 잠시 뒤에 다시 해 주세요.')}}
// ----- 클라우드 저장 -----
const cloudData=()=>{const d=JSON.parse(JSON.stringify(SAVE));return d};
async function cloudGet(s){const r=await auReq('/rest/v1/saves?select=data,updated_at&user_id=eq.'+s.uid,{method:'GET'},s.at);return r&&r[0]||null}
async function cloudPut(force){if(window.__noSave)return;let s=null;try{s=await auToken()}catch(e){}if(!s)return;
  const body=JSON.stringify({user_id:s.uid,data:cloudData(),updated_at:new Date().toISOString()});if(!force&&body===AU.last)return;
  try{await auReq('/rest/v1/saves?on_conflict=user_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body,keepalive:body.length<60000},s.at);AU.last=body}catch(e){}}
{const sg=saveGame;saveGame=function(){if(window.__noSave)return;SAVE._t=Date.now();sg();if(SAVE.acct){clearTimeout(AU.upT);AU.upT=setTimeout(()=>cloudPut(),8000)}}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&SAVE.acct)cloudPut()});
function cloudApply(d){d.lang=SAVE.lang||LANG;window.__noSave=true;try{localStorage.setItem('swm-save',JSON.stringify(d))}catch(e){}location.reload()}
const saveEmpty=d=>!d||(!d.nick&&!(d.lv>1)&&!d.tutDone);
const saveLine=d=>`${d.nick||'이름 없음'} · Lv ${d.lv||1} · ${COIN_SVG}${d.coins|0}`;
// 이 기기 기록과 계정 기록이 다르면 어느 쪽을 쓸지 골라요
function cloudPick(cloud,s){return new Promise(res=>{$('pgM').hidden=false;
  $('pgBody').innerHTML=`<div class="kicker">기록 고르기</div><h2>어느 기록으로 할까요?</h2>
  <div class="acc-pick"><button class="acc-opt" id="bAccDev"><b>이 기기의 기록</b><span>${saveLine(SAVE)}</span></button><button class="acc-opt" id="bAccCloud"><b>계정에 저장된 기록</b><span>${saveLine(cloud.data)}</span></button></div>
  <p class="note">고르지 않은 기록은 지워져요</p>`;
  $('bAccDev').onclick=()=>{SFX.click();pgClose();SAVE._uid=s.uid;saveGame();cloudPut(true);res('dev')};
  $('bAccCloud').onclick=()=>{SFX.click();const d=cloud.data;d._uid=s.uid;d.acct=SAVE.acct||'google';cloudApply(d);res('cloud')}})}
async function cloudSync(s){let cloud=null;try{cloud=await cloudGet(s)}catch(e){return}
  if(!cloud||!cloud.data){SAVE._uid=s.uid;saveGame();await cloudPut(true);return}
  const d=cloud.data;
  if(SAVE._uid===s.uid){if((d._t||0)>(SAVE._t||0)+1500){d._uid=s.uid;cloudApply(d)}else if((SAVE._t||0)>(d._t||0)+1500)cloudPut(true);return}
  if(saveEmpty(SAVE)){d._uid=s.uid;d.acct=SAVE.acct||d.acct||'google';cloudApply(d);return}
  if(saveEmpty(d)||JSON.stringify(Object.assign({},d,{_t:0,_uid:0,acct:0}))===JSON.stringify(Object.assign({},SAVE,{_t:0,_uid:0,acct:0}))){SAVE._uid=s.uid;saveGame();cloudPut(true);return}
  await cloudPick(cloud,s)}
// ----- 처음 화면: 게스트 / 구글 -----
function acctNote(t){const n=$('accMsg');if(n){n.textContent=t;n.hidden=false}else tMsg(t)}
const G_LOGO='<svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.3 5.7c4.3-3.9 7-9.7 7-17.1z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.3-5.7c-2 1.4-4.7 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';
function acctAsk(next){$('pgM').hidden=false;const old=!!SAVE.nick;
  $('pgBody').innerHTML=`<div class="kicker">${old?SAVE.nick:'시작하기'}</div><h2>${old?'기록을 어떻게 저장할까요?':'어떻게 시작할까요?'}</h2>
  <div class="acc-pick"><button class="acc-opt acc-g" id="bAccG">${G_LOGO}<b>구글 계정으로 시작</b><span>기록이 계정에 저장돼서 폰을 바꿔도 이어서 해요</span></button>
  <button class="acc-opt" id="bAccGuest"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4.2" fill="#f7c38f" stroke="#4a2a1a" stroke-width="1.8"/><path d="M4.5 20.5c.8-4 3.8-6 7.5-6s6.7 2 7.5 6z" fill="#7fd6b8" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/></svg><b>게스트로 시작</b><span>바로 시작해요 · 나중에 설정에서 구글을 연결할 수 있어요</span></button></div>
  <p class="note" id="accMsg" hidden></p>`;
  $('bAccG').onclick=()=>{SFX.click();if(old){SAVE.acct='guest';saveGame();auLink()}else auGoogle('signin')};
  $('bAccGuest').onclick=async()=>{SFX.click();SAVE.acct='guest';saveGame();pgClose();next&&next();try{const s=(await auToken())||(await auGuest());await cloudSync(s)}catch(e){}}}
{const ob=onboard;onboard=function(){if(window.__acctBusy)return;if(!SAVE.acct&&!window.__simFast&&!window.__aiBoth)return acctAsk(ob);return ob()}}
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);try{if(SAVE.nick&&!SAVE.acct&&!window.__acctBusy&&!titleScreen.acc&&!window.__simFast&&!window.__aiBoth&&!G.tutor&&!(typeof TU!=='undefined'&&TU.on)){titleScreen.acc=1;setTimeout(()=>{if(screen==='title'&&$('pgM').hidden)acctAsk(()=>{})},700)}}catch(e){}return r}}
// ----- 구글에서 돌아왔을 때 -----
(async()=>{const hs=new URLSearchParams(location.hash.slice(1)),qs=new URLSearchParams(location.search);const go=(()=>{try{return localStorage.getItem('swm-auth-go')}catch(e){return null}})();
  const err=hs.get('error_code')||qs.get('error_code')||hs.get('error')||qs.get('error');
  if(hs.get('access_token')||err){try{history.replaceState(null,'',auBack())}catch(e){}try{localStorage.removeItem('swm-auth-go')}catch(e){}}
  if(err){setTimeout(()=>{if(err==='identity_already_exists'){$('pgM').hidden=false;$('pgBody').innerHTML=`<div class="kicker">구글 연결</div><h2>이 구글 계정에는 이미 기록이 있어요</h2><p class="note">그 계정으로 로그인하면 어느 기록을 쓸지 고를 수 있어요</p><div class="row pg-two"><button class="mbtn berry small" id="bAccSw"><span class="mt"><b>그 계정으로 로그인</b></span></button><button class="mbtn mint small" id="bAccNo"><span class="mt"><b>그만두기</b></span></button></div>`;$('bAccSw').onclick=()=>{SFX.click();auGoogle('signin')};$('bAccNo').onclick=()=>{SFX.click();pgClose()}}else tMsg('구글 로그인을 마치지 못했어요. 다시 해 주세요.')},900);
    if(!SAVE.acct&&go)SAVE.acct='guest'}
  const at=hs.get('access_token');
  if(at){window.__acctBusy=true;try{const u=await auReq('/auth/v1/user',{method:'GET'},at);const s=auFrom({access_token:at,refresh_token:hs.get('refresh_token'),expires_in:hs.get('expires_in')},u);auSet(s);
      SAVE.acct='google';saveGame();await cloudSync(s);setTimeout(()=>tMsg(go==='link'?'구글 계정을 연결했어요':'구글 계정으로 로그인했어요'),900)}
    catch(e){tMsg('구글 로그인을 마치지 못했어요. 다시 해 주세요.')}
    window.__acctBusy=false;if(!SAVE.nick&&screen==='title'&&$('pgM').hidden)onboard();return}
  // 평소: 로그인이 살아 있으면 계정 기록과 맞춰요 · 게스트인데 손님 계정이 아직 없으면 만들어요
  if(!SAVE.acct)return;
  setTimeout(async()=>{try{let s=await auToken();if(!s&&SAVE.acct==='guest')s=await auGuest();if(s)await cloudSync(s)}catch(e){}},1500)})();
// ----- 설정 창: 계정 줄 -----
{const o=openSnd;openSnd=function(){o();const M=$('sndM');const kk=M.querySelector('.kicker');if(kk)kk.textContent='설정';if(M.querySelector('.acc-row'))return;const rows=M.querySelectorAll('.snd-row');const last=rows[rows.length-1];if(!last)return;
  const s=auGet();const g=SAVE.acct==='google'&&s&&!s.anon;
  const d=document.createElement('div');d.className='snd-row acc-row';
  d.innerHTML=`<span>계정</span><div class="acc-box"><div class="acc-st"><em>${g?'구글':'게스트'}</em>${g&&s.email?`<small data-ni="">${s.email}</small>`:''}</div>${g?'':`<button class="tg acc-link" id="bAccLink">${G_LOGO}<i>구글 연결</i></button>`}</div>`;
  last.after(d);const b=$('bAccLink');if(b)b.onclick=()=>{SFX.click();if(!SAVE.acct){SAVE.acct='guest';saveGame()}auLink()}}}
{const st=document.createElement('style');st.textContent=`
.acc-pick{display:flex;gap:12px;justify-content:center;margin:6px 0 2px;flex-wrap:wrap}
.acc-opt{flex:1 1 0;min-width:180px;max-width:260px;display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 14px;border:3px solid var(--choco);border-radius:18px;background:#fff;box-shadow:0 4px 0 var(--choco);cursor:pointer;color:var(--choco)}
.acc-opt b{font:17px var(--f-display)}.acc-opt span{font:12.5px/1.35 var(--f-ui);color:#7a5236}.acc-opt svg{width:24px;height:24px}
.acc-opt:active{transform:translateY(3px);box-shadow:0 1px 0 var(--choco)}
.acc-opt.acc-g{background:#f3fbff}.acc-opt span svg{width:14px;height:14px;vertical-align:-2px;margin-right:1px}
.acc-row .acc-box{flex:0 0 197px;display:flex;align-items:center;gap:10px;min-width:0;text-align:left}.acc-row .acc-st{display:flex;flex-direction:column;min-width:0;max-width:197px}.acc-row .acc-st em{font-style:normal}.acc-row .acc-st small{font:11px var(--f-ui);color:#8a6a50;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.acc-row .acc-link{display:inline-flex;align-items:center;gap:6px;background:#fff}.acc-row .acc-link svg{width:16px;height:16px}.acc-row .acc-link i{font-style:normal}`;document.head.appendChild(st)}
// ----- 설정 창: 기록 초기화 · 계정 삭제 (누르면 경고를 두 번 보여 줘요) -----
function dangerAsk(o){$('sndM').hidden=true;let step=1;const draw=()=>{$('pgM').hidden=false;
  $('pgBody').innerHTML=step===1?`<div class="kicker dz-k1">${o.title}</div><h2>${o.q1}</h2><p class="note dz-note">${o.d1}</p>
  <div class="row pg-two"><button class="mbtn mint small" id="bDzNo"><span class="mt"><b>취소</b></span></button><button class="sbtn dz-btn" id="bDzGo">${o.go1}</button></div>`
  :`<div class="kicker dz-k">마지막 확인</div><h2>${o.q2}</h2><p class="note dz-note">되돌릴 수 없어요</p>
  <div class="row pg-two"><button class="mbtn mint small" id="bDzNo"><span class="mt"><b>취소</b></span></button><button class="sbtn dz-btn dz-hot" id="bDzGo">${o.go2}</button></div>
  <p class="note" id="dzMsg" hidden></p>`;
  $('bDzNo').onclick=()=>{SFX.click();pgClose();openSnd()};
  $('bDzGo').onclick=async()=>{SFX.click();if(step===1){step=2;draw();return}const b=$('bDzGo');b.disabled=true;
    try{await o.run()}catch(e){b.disabled=false;const m=$('dzMsg');m.hidden=false;m.textContent=e&&e.msg||'인터넷 연결을 확인하고 다시 해 주세요.'}}};draw()}
function localWipe(keep){window.__noSave=true;const lang=SAVE.lang;try{localStorage.setItem('swm-save',JSON.stringify(Object.assign({lang},keep||{})))}catch(e){}
  for(const k of['swm_stats_q'])try{localStorage.removeItem(k)}catch(e){}}
async function resetProgress(){let s=null;try{s=await auToken()}catch(e){}
  if(s){try{await auReq('/rest/v1/saves?user_id=eq.'+s.uid,{method:'DELETE',headers:{Prefer:'return=minimal'}},s.at)}catch(e){throw{msg:'서버 기록을 지우지 못했어요. 인터넷 연결을 확인하고 다시 해 주세요.'}}}
  localWipe({acct:SAVE.acct,_uid:s?s.uid:undefined});location.reload()}
async function deleteAccount(){let s=null;try{s=await auToken()}catch(e){throw{msg:'서버에 연결하지 못했어요. 인터넷 연결을 확인하고 다시 해 주세요.'}}
  if(s){try{await auReq('/rest/v1/rpc/delete_my_account',{method:'POST',body:'{}'},s.at)}catch(e){throw{msg:'계정을 지우지 못했어요. 인터넷 연결을 확인하고 다시 해 주세요.'}}}
  auSet(null);localWipe();location.reload()}
{const o=openSnd;openSnd=function(){o();const M=$('sndM');if(M.querySelector('.dz-row'))return;const rows=M.querySelectorAll('.snd-row');const last=rows[rows.length-1];if(!last)return;
  const d=document.createElement('div');d.className='snd-row dz-row';
  d.innerHTML=`<span>기록</span><div class="dz-box"><button class="tg" id="bReset">초기화</button><button class="tg dz-del" id="bDelAcc">계정 삭제</button></div>`;
  last.after(d);
  $('bReset').onclick=()=>{SFX.click();dangerAsk({title:'기록 초기화',q1:'처음부터 다시 시작할까요?',d1:'코인, 카드, 스킬, 꾸미기, 스토리, 등급, 패스 기록이 모두 지워지고 처음 상태로 돌아가요. 계정은 그대로 남아요.',go1:'초기화',q2:'정말 모든 기록을 지울까요?',go2:'모두 지우기',run:resetProgress})};
  $('bDelAcc').onclick=()=>{SFX.click();const g=SAVE.acct==='google';dangerAsk({title:'계정 삭제',q1:'계정을 삭제할까요?',d1:(g?'구글 계정과의 연결이 끊기고, ':'')+'서버와 이 기기에 저장된 모든 기록이 지워져요. 구매한 상품도 다시 받을 수 없어요.',go1:'계정 삭제',q2:'정말 계정을 삭제할까요?',go2:'영구 삭제',run:deleteAccount})}}}
{const st=document.createElement('style');st.textContent=`
#sndM .snd-row{margin:7px 0}
.dz-row .dz-box{flex:0 0 197px;display:flex;gap:8px}
.dz-row .tg{background:#fff}.dz-row .tg.dz-del{color:#d8344f;border-color:#d8344f}
#pgBody .dz-btn{color:#d8344f;border-color:#d8344f;box-shadow:0 4px 0 #d8344f;min-height:44px;background:#fff}
#pgBody .dz-btn.dz-hot{background:#e8445f;color:#fff;border-color:#8f1f33;box-shadow:0 4px 0 #8f1f33}
.dz-btn:disabled{opacity:.6}
.dz-note{max-width:380px;margin-left:auto;margin-right:auto;line-height:1.45}
#pgBody .kicker.dz-k,#pgBody .kicker.dz-k1{color:#d8344f}`;document.head.appendChild(st)}
