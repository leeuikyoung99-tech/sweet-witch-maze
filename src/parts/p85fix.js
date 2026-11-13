// ===== 85차: 고친 것 모음 =====
// 온라인 마녀(방장 화면을 받아 그리는 쪽, G.mirror)는 updHero 가 안 돌아서 벽 밀기 추천 숫자가 안 떴어요. 받아 그릴 때도 계산해요.
{const mu=mirrorUpdate;mirrorUpdate=function(dt){const r=mu.apply(this,arguments);try{if(G.mode==='devil'&&!G.rguest)wcUpdate()}catch(e){}return r}}
// ----- 친구창 다듬기: 한 줄짜리 작은 친구 칸, 아이콘 버튼(초대·지우기·복사), 지우기는 한 번 더 묻기 -----
const FRI={
 inv:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2.5" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><path d="M4 7.5l8 6 8-6" fill="none" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/><circle cx="18.5" cy="6.5" r="3.6" fill="#ffd35f" stroke="#4a2a1a" stroke-width="1.6"/></svg>',
 del:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14l-1.3 12.2a2 2 0 0 1-2 1.8H8.3a2 2 0 0 1-2-1.8z" fill="#ffd0e2" stroke="#4a2a1a" stroke-width="1.9" stroke-linejoin="round"/><path d="M3.5 7h17M9.5 7V4.5h5V7M10 11v6M14 11v6" fill="none" stroke="#4a2a1a" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 copy:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2.5" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><path d="M15.5 5.5V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" fill="#ffd35f" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>'};
function frCopyMine(){(async()=>{try{await navigator.clipboard.writeText(SAVE.me.id);tMsg('내 친구 코드를 복사했어요')}catch(e){tMsg('내 친구 코드: '+SAVE.me.id)}})()}
{const fr0=frRender;frRender=function(){const r=fr0.apply(this,arguments);if(screen!=='friendS')return r;
  const cb=$('bFrCopy');if(cb&&!cb.classList.contains('fr-ic')){cb.className='fr-ic fr-copy';cb.setAttribute('aria-label','코드 복사');cb.innerHTML=FRI.copy;cb.onclick=()=>{SFX.click();frCopyMine()}}
  const L=SAVE.friends.slice().sort((a,b)=>(FR.on[b.id]?1:0)-(FR.on[a.id]?1:0));
  if(L.length)$('frList').innerHTML=`<div class="fr-grid fr2">${L.map(f=>{const on=FR.on[f.id],inf=FR.info[f.id],rk=inf?inf.rank:null;
    const st=on===undefined?'확인 중…':on?'접속 중':'접속 안 함';
    return`<div class="fr-card${on?' on':''}"><span class="fr-av">${frAvatar(f.id)}<i class="fr-dot"></i></span>
      <div class="fr-inf"><b class="fr-cn" data-ni="">${f.nick||'친구'}</b><small class="fr-sub"><em>${st}</em>${rk!=null?` · ${tierIcon(tierOf(rk))}${rankTxtP(rk)}`:''} · ${frRecTxt(f.id)}</small></div>
      <button class="fr-ic fr-inv" data-id="${f.id}" aria-label="초대"${on?'':' disabled'}>${FRI.inv}</button>
      <button class="fr-ic fr-rm" data-id="${f.id}" aria-label="친구 지우기">${FRI.del}</button></div>`}).join('')}</div>`;
  return r}}
function frAskDel(id){const f=SAVE.friends.find(q=>q.id===id);if(!f)return;$('pgM').hidden=false;
  $('pgBody').innerHTML=`<div class="kicker">친구 지우기</div><h2 class="fr-dq"><span class="fr-av sm">${frAvatar(id)}</span>${f.nick||'친구'}님을 지울까요?</h2>
  <div class="row pg-two"><button class="mbtn mint small" id="bFrDelNo"><span class="mt"><b>취소</b></span></button><button class="sbtn dz-btn" id="bFrDelGo">지우기</button></div>`;
  $('bFrDelNo').onclick=()=>{SFX.click();pgClose()};
  $('bFrDelGo').onclick=()=>{SFX.click();SAVE.friends=SAVE.friends.filter(q=>q.id!==id);saveGame();pgClose();frRender()}}
$('frList').addEventListener('click',e=>{const d=e.target.closest('.fr-rm');if(!d)return;e.stopPropagation();SFX.click();frAskDel(d.dataset.id)},true);
// 친구창에서 초대하면 방 코드는 안 보여요(친구가 접속해 있지 않아 초대가 안 가면 그때 코드를 보여 줘요)
{const lb=lobby;lobby=function(t,l,btn,o={}){const inv=!!(o&&o.code&&FR.invTo);lb.apply(this,arguments);if(inv){$('lobCode').hidden=true;$('lobT').textContent='친구 초대'}}}
{const fs0=frSend;frSend=function(fid,msg,cb){if(msg&&msg.t==='inv'){const c0=cb;cb=ok=>{try{c0&&c0(ok)}finally{if(!ok&&screen==='lobby'){$('lobCode').hidden=false;$('lobT').textContent='방 코드'}}}}return fs0.call(this,fid,msg,cb)}}
{const st=document.createElement('style');st.textContent=`
#friendS .fr-code{padding:3px 3px 3px 12px!important;gap:8px!important;height:34px;box-sizing:border-box}
.fr-ic{display:grid;place-items:center;padding:0;flex:none;border-radius:50%;border:2.5px solid var(--choco);background:#fff;box-shadow:0 2px 0 var(--choco);cursor:pointer}
.fr-ic svg{width:62%;height:62%;display:block}.fr-ic:active{transform:translateY(2px);box-shadow:0 0 0 var(--choco)}
#friendS .fr-copy{width:24px;height:24px;box-shadow:none;border-width:2px}#friendS .fr-copy svg{width:70%;height:70%}
#frList .fr-grid.fr2{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px;padding:2px 2px 6px}
#frList .fr2 .fr-card{flex-direction:row;align-items:center;gap:8px;padding:5px 7px 5px 6px;border-radius:16px;box-shadow:0 3px 0 var(--choco);text-align:left;min-height:0}
#frList .fr2 .fr-av{width:38px;height:38px}#frList .fr2 .fr-card .fr-dot{width:12px;height:12px;right:0;bottom:1px;border-width:2px}
#frList .fr2 .fr-inf{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
#frList .fr2 .fr-cn{font-size:15px!important;text-align:left}
#frList .fr2 .fr-sub{font:11.5px var(--f-ui);color:#8a6a50;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
#frList .fr2 .fr-sub em{font-style:normal}#frList .fr2 .fr-card.on .fr-sub em{color:#1f9e66}#frList .fr2 .fr-sub svg{width:13px;height:13px;vertical-align:-2px}
#frList .fr2 .fr-inv{width:38px;height:38px;margin:0!important;min-width:0;background:linear-gradient(#ff8fbf,#ff4f93)}
#frList .fr2 .fr-inv:disabled{background:#e6dcd3;filter:grayscale(1);opacity:.6;cursor:default;box-shadow:0 2px 0 #b9a99a;border-color:#b9a99a}
#frList .fr2 .fr-rm{width:30px;height:30px}
.fr-dq{display:flex;align-items:center;justify-content:center;gap:8px}.fr-dq .fr-av.sm{width:30px;height:30px}`;document.head.appendChild(st)}
// ----- 매일 미션: 광고 보고 코인 받기 (2시간마다 한 번) -----
const MAD={n:50,gap:2*3600*1000};
function madLeft(){return Math.max(0,(SAVE.misAdT||0)+MAD.gap-Date.now())}
function madTxt(ms){const m=Math.ceil(ms/60000),h=Math.floor(m/60);return h?`${h}시간 ${m%60}분 뒤`:`${m}분 뒤`}
function madRow(){const L=madLeft();return`<div class="ms-row ms-adr${L?' wait':''}"><span class="ms-adi">${AD_IC}</span><div class="ms-t">광고 보고 코인 받기<small class="ms-adn">2시간마다 한 번</small></div><span class="ms-rw">${COIN_SVG}${MAD.n}</span><button class="sbtn ms-b ms-ad"${L?' disabled':''}>${L?madTxt(L):'광고 보기'}</button></div>`}
{const rm=renderMis;renderMis=function(){const r=rm.apply(this,arguments);try{const l=$('misList');const old=l.querySelector('.ms-adr');if(old)old.remove();l.insertAdjacentHTML('afterbegin',madRow())}catch(e){}return r}}
$('misList').addEventListener('click',async e=>{const b=e.target.closest('.ms-ad');if(!b)return;e.stopPropagation();if(b.disabled||madLeft())return;SFX.click();b.disabled=true;
  let ok=false;try{ok=await ADS.show('mission')}catch(er){ok=false}
  if(ok&&!madLeft()){SAVE.misAdT=Date.now();SAVE.coins=(SAVE.coins|0)+MAD.n;saveGame();try{SFX.win()}catch(er){}tMsg(`광고 보상 ${MAD.n}코인을 받았어요`);try{syncCoins()}catch(er){}}
  if(screen==='misS')renderMis()},true);
// 기다리는 시간 글씨는 1분마다 새로
setInterval(()=>{try{if(screen!=='misS')return;const b=document.querySelector('#misList .ms-ad');if(!b)return;const L=madLeft();if(!!L!==b.disabled||(L&&b.textContent!==madTxt(L)))renderMis()}catch(e){}},5000);
{const st=document.createElement('style');st.textContent=`
#misList .ms-adr{background:linear-gradient(90deg,#ffe6f1,#fff 70%)}#misList .ms-adr.wait{background:#fff}
#misList .ms-adi{display:grid;place-items:center;width:28px;height:28px;flex:none}#misList .ms-adi svg{width:100%;height:100%}
#misList .ms-adr .ms-t{display:flex;align-items:baseline;gap:8px;white-space:nowrap;overflow:hidden}#misList .ms-adr .ms-adn{font:12px var(--f-ui);color:#8a6a50}
#misList .ms-ad{min-width:92px}
#misS .mis-pane{padding-bottom:12px!important}#misList{min-height:0;overflow-y:auto}
@media (max-height:340px){#misList .ms-row{padding-top:0;padding-bottom:0;min-height:0}#misList .ms-t{font-size:14px}#misList .ms-b{min-height:26px;height:26px;padding-top:0;padding-bottom:0}#misList .ms-bar{height:6px;margin:1px 0 0}#misList{gap:4px!important}#misList .ms-adi{width:22px;height:22px}#misS .pane-top{margin-bottom:2px!important}}`;document.head.appendChild(st)}
// 새 미션까지 남은 시간: 아래 줄 대신 제목 옆 작은 글씨(작은 화면에서 아래가 잘렸어요)
{const t=$('misS').querySelector('.pane-top>b'),n=$('misNote');if(t&&n)t.after(n)}
{const st=document.createElement('style');st.textContent=`#misS .pane-top #misNote{flex:1 1 auto;min-width:0;margin:0 0 0 10px!important;font:12px var(--f-ui)!important;color:#8a6a50;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0!important}`;document.head.appendChild(st)}
