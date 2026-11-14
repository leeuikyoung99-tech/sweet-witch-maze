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
/* 버튼은 모두 같은 크기, 줄은 같은 높이 · 창 아래와 넉넉히 띄워요 */
#misList .ms-b{flex:none;width:96px;min-width:0!important;height:34px;min-height:0!important;padding:0 6px!important;box-sizing:border-box;font-size:14px;white-space:nowrap;display:grid;place-items:center}
#misList .ms-row{box-sizing:border-box;height:46px;min-height:0;padding:0 8px 0 10px!important}
#misList{gap:6px!important;flex:0 1 auto;overflow-y:auto;padding-bottom:2px}
#misS .mis-pane{padding-bottom:16px!important}
@media (max-height:340px){#misList .ms-row{height:38px}#misList .ms-b{height:28px;width:88px;font-size:13px}#misList .ms-t{font-size:14px}#misList .ms-bar{height:6px;margin:2px 0 0}#misList{gap:5px!important}#misList .ms-adi{width:22px;height:22px}#misS .pane-top{margin-bottom:2px!important}#misS .mis-pane{padding-bottom:14px!important}}`;document.head.appendChild(st)}
// 새 미션까지 남은 시간: 아래 줄 대신 제목 옆 작은 글씨(작은 화면에서 아래가 잘렸어요)
{const t=$('misS').querySelector('.pane-top>b'),n=$('misNote');if(t&&n)t.after(n)}
{const st=document.createElement('style');st.textContent=`#misS .pane-top #misNote{flex:1 1 auto;min-width:0;margin:0 0 0 10px!important;font:12px var(--f-ui)!important;color:#8a6a50;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0!important}`;document.head.appendChild(st)}
// ----- 마녀 증강체 '두 수 앞 보기' → '자동 두 수': 버튼을 누르면 가장 좋은 벽 밀기 2번을 차례로 알아서 해요 -----
// 판마다 한 번, 소다·벽 밀기 쿨타임과 상관없이. 온라인 마녀(거울 쪽)는 자리를 보내고 도둑(진행) 쪽이 똑같이 밀어요.
{const a=AUGI2.w_plan2,T='자동 두 수',D2='판마다 한 번 버튼을 누르면|가장 좋은 벽 밀기 2번을 알아서 해요';if(a){a.n=T;a.d=D2}const q=AUGW2.find(x=>x[0]==='w_plan2');if(q){q[2]=T;q[3]=D2}}
try{AB70.plan2=['target','자동 두 수','p']}catch(e){}
function p2MoveWall(w,o,nx,nz){if(!w||!B.walls.includes(w)||w.anim)return 'gone';if(o!==w.o||Math.abs(nx-w.x)+Math.abs(nz-w.z)!==1)return 'far';
  if(allHeroes().some(q=>wallDist(q.x,q.z,o,nx,nz)<WALL_NEAR))return 'near';if(heroNearWall(w))return 'heronear';const r=tryWall(o,nx,nz,w,allCells());if(r!=='ok')return r;
  const old={o:w.o,x:w.x,z:w.z};w.o=o;w.x=nx;w.z=nz;w.prev={x:old.x,z:old.z};w.lockUntil=G.t+WALL_LOCK;rebuildEdges();try{G.stats.wallMoves++}catch(e){}w.anim={t:0,from:old};
  try{syncPosts()}catch(e){}try{SFX.crunch()}catch(e){}w.moved=1;try{tintWall(w)}catch(e){}try{rebuildPathLines()}catch(e){}
  if(G.mode==='hero')say('🍪 쿠키 벽이 움직였어요',true,1.2);return 'ok'}
function p2Go(c){if(G.mirror){try{netSend({t:'card',i:-1,k:'p2mv',wi:B.walls.indexOf(c.w),o:c.o,nx:c.x,nz:c.z})}catch(e){}SFX.crunch();return 'ok'}return p2MoveWall(c.w,c.o,c.x,c.z)}
p2Activate=function(){if(PLAN2.used||G.mode!=='devil'||!G.hero||G.over||G.cdn)return;let p=null;try{p=p2Plan('move')}catch(e){p=null}
  if(!p){say('자동 두 수 · 지금은 도둑 길을 늘릴 벽이 없어요',false,1.8);SFX.deny();return}
  PLAN2.used=true;PLAN2.on=false;try{augHud()}catch(e){}try{SFX.magic()}catch(e){}
  const c1=p.steps[0];const w1=c1.w;const r1=p2Go(c1);if(r1!=='ok'){PLAN2.used=false;say('자동 두 수 · 지금은 밀 수 없어요',false,1.5);try{augHud()}catch(e){}return}
  say(`자동 두 수 ① 도둑 길 +${p.gain[0]}칸`,false,1.4);
  setTimeout(()=>{if(G.over||screen!=='play'||G.mode!=='devil')return;let b=null;try{b=p2Best1('move',[w1])}catch(e){b=null}
    if(!b){say('자동 두 수 ② 지금은 더 늘릴 벽이 없어요',false,1.6);return}
    const r2=p2Go(b.c);if(r2==='ok')say(`자동 두 수 ② 도둑 길 +${b.g}칸`,false,1.6)},1300)};
// 진행(도둑) 쪽: 거울 마녀가 보낸 자동 밀기 (판마다 두 번까지)
{const hc=handleCard;handleCard=function(d){if(d&&d.k==='p2mv'){if(G.aug&&G.aug.w_plan2&&(G.p2n|0)<2){const r=p2MoveWall(B.walls[d.wi],d.o,d.nx,d.nz);if(r==='ok')G.p2n=(G.p2n|0)+1}return}return hc.apply(this,arguments)}}
{const bm=beginMatch;beginMatch=function(){G.p2n=0;return bm.apply(this,arguments)}}
// 버튼: 다른 마녀 증강체처럼 칩 옆 아이콘 (예전 '두 수 보기' 떠 있는 버튼은 숨겨요)
p2BtnSync=function(){const b=$('p2Btn');if(b)b.hidden=true};
{const ah=augHud;augHud=function(){const r=ah.apply(this,arguments);try{const db=$('augBtnD');if(!db||!G.devil)return r;const want=AG().w_plan2&&!PLAN2.used&&G.mode==='devil';let b=db.querySelector('[data-a="plan2"]');
  if(want){if(!b){db.insertAdjacentHTML('beforeend','<button data-a="plan2"></button>');ab70Icons();ab70Pos()}db.hidden=false}else if(!want&&b){b.remove();if(!db.querySelector('button,span'))db.hidden=true}}catch(e){}return r}}
setInterval(()=>{try{if(screen==='play'&&G.mode==='devil'&&AG().w_plan2)augHud()}catch(e){}},700);
{const st=document.createElement("style");st.textContent="#p2Btn{display:none!important}";document.head.appendChild(st)}
// ----- 거대 마녀: 시점 버튼을 글씨로(1인칭 | 3인칭, 지금 것이 칠해져요), 움직이는 중(다른 손가락이 조이스틱)에도 바로 눌리게 -----
mgViewSync=function(){const b=$('mgViewB');if(!b)return;const v=MG.view===3?3:1;const k='v'+v;if(b.dataset.k===k)return;b.dataset.k=k;b.classList.add('mgv2');
  b.innerHTML=`<i class="${v===1?'on':''}">1인칭</i><i class="${v===3?'on':''}">3인칭</i>`;b.setAttribute('aria-label',v===3?'지금 3인칭 · 눌러서 1인칭':'지금 1인칭 · 눌러서 3인칭')};
{let last=0;
  document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('#mgViewB');if(!b)return;e.preventDefault();e.stopPropagation();last=performance.now();try{mgViewToggle()}catch(er){}},true);
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#mgViewB');if(!b)return;e.stopPropagation();e.preventDefault();if(performance.now()-last>700){last=performance.now();try{mgViewToggle()}catch(er){}}},true)}
{const st=document.createElement('style');st.textContent=`
#mgViewB.mgv2{width:auto!important;height:38px!important;padding:3px!important;border-radius:19px!important;display:flex!important;gap:2px;align-items:center;touch-action:none;background:#fff8ee}
#mgViewB.mgv2 i{font:normal 13px var(--f-display);color:#9a7a60;padding:0 8px;height:28px;line-height:28px;border-radius:14px;white-space:nowrap;pointer-events:none}
#mgViewB.mgv2 i.on{background:var(--choco);color:#fff}`;document.head.appendChild(st)}
// 스토리 창도 다른 큰 창(첫 화면·메인·미니·설정)과 똑같은 자리·크기
{const st=document.createElement('style');st.textContent=`#stages>.pane{box-sizing:border-box!important;height:100%!important;max-height:100%!important;margin:0 auto!important;width:min(820px,100%)!important;max-width:none!important;transform:none!important}`;document.head.appendChild(st)}
// ----- 결과 창 정리: 최종 승리 리본 · 가운데 큰 글씨 · 바로 밑 경험치·패스 / 가운데 줄 [표+작은 설명][내·상대 증강체 위아래][지도 보기·광고] / 받은 코인 / 그만하기·새 대결 -----
function rsLayout(){const sl=document.querySelector('#result .res-slab');if(!sl)return;
  const who=sl.querySelector('.res-who'),xp=$('resXP'),box=$('resCoin'),row=$('bHome')&&$('bHome').parentElement;if(!who||!box||!row)return;
  // 큰 글씨는 가운데, 그림은 글씨 왼쪽에 붙여요
  const tx=who.querySelector('div');if(tx&&$('resArt')&&$('resArt').parentElement!==tx){tx.classList.add('rs-tx');tx.prepend($('resArt'))}
  if(xp&&xp.previousElementSibling!==who)who.after(xp);
  let mid=$('rsMid');if(!mid){mid=document.createElement('div');mid.id='rsMid';box.before(mid);mid.appendChild(box);const sd=document.createElement('div');sd.id='rsSide';mid.appendChild(sd)}
  const sd=$('rsSide');if($('bMap')&&$('bMap').parentElement!==sd)sd.appendChild($('bMap'));if($('bAdCoin')&&$('bAdCoin').parentElement!==sd)sd.appendChild($('bAdCoin'));
  sd.hidden=![...sd.children].some(b=>!b.hidden&&getComputedStyle(b).display!=='none');
  let cl=$('rsCoinLine');if(!cl){cl=document.createElement('div');cl.id='rsCoinLine';row.before(cl)}
  // 받은 코인 글씨는 버튼 줄 바로 위로 (표·증강체 칸 안의 코인 줄을 옮겨요)
  const coinEls=[...box.children].filter(e=>e.classList.contains('ser-coin')||(!e.matches('table,.ag-foot,.ser-next,.rs-note')&&/코인/.test(e.textContent)));if(coinEls.length){cl.innerHTML='';for(const e of coinEls)cl.appendChild(e)}cl.hidden=!cl.textContent.trim();
  // '3판 결승 결과로 승패가 정해져요' 는 표 아래 작은 한 줄
  const L=$('resLede');if(L&&/결승 결과로/.test(L.textContent)&&box.querySelector('table.ser-t')){L.hidden=true;if(!box.querySelector('.rs-note'))box.querySelector('table.ser-t').insertAdjacentHTML('afterend','<div class="rs-note">3판 결승 결과로 승패가 정해져요</div>')}else if(L)L.hidden=false;
  sl.classList.toggle('rs-ser',!!box.querySelector('table.ser-t'))}
{const sr=serResult;serResult=function(){const r=sr.apply(this,arguments);try{const cl=$('rsCoinLine');if(cl)cl.innerHTML='';rsLayout()}catch(e){console.warn(e)}return r}}
setInterval(()=>{try{if(screen==='result')rsLayout()}catch(e){}},400);
{const st=document.createElement('style');st.textContent=`
#result{padding-top:26px!important;padding-bottom:12px!important}
#result .res-slab{display:flex;flex-direction:column;align-items:center}
#result .res-who{justify-content:center;width:100%}#result .res-who .rs-tx{position:relative;text-align:center}
#result .res-who .rs-tx>#resArt{position:absolute;right:calc(100% + 10px);top:50%;transform:translateY(-50%)}
#result .res-who .rs-tx .res-big,#result .res-who .rs-tx .res-lede{text-align:center}
#result #resXP{margin:2px auto 6px!important}
#rsMid{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;margin:0 0 6px}
#rsMid #resCoin{margin:0!important;flex:0 1 auto;min-width:0}
#result .rs-ser #resCoin{display:grid!important;grid-template-columns:auto auto;grid-template-rows:auto auto;column-gap:10px;row-gap:3px;align-items:center;justify-items:start}
#result .rs-ser #resCoin>table.ser-t{grid-column:1;grid-row:1;margin:0!important}
#result .rs-ser #resCoin>.rs-note{grid-column:1;grid-row:2;font:11px var(--f-ui);color:#8a6a50;white-space:nowrap;justify-self:center}
#result .rs-ser #resCoin>.ag-foot{grid-column:2;grid-row:1/3;display:flex!important;flex-direction:column;align-items:stretch;gap:6px;margin:0!important;width:auto}
#result .rs-ser #resCoin>.ag-foot>.ag-have{display:flex;align-items:center;gap:4px;min-height:34px;margin:0!important;white-space:nowrap}
#result .rs-ser #resCoin>.ser-next{grid-column:1/3}
#rsSide{display:flex;flex-direction:column;gap:8px;flex:none;align-items:stretch;width:150px}
#rsSide>button{width:100%!important;height:40px!important;min-height:0!important;margin:0!important;display:flex;align-items:center;justify-content:center;gap:4px;padding:0 6px!important;box-sizing:border-box;white-space:nowrap}
#rsCoinLine{display:flex;justify-content:center;align-items:center;gap:8px;font:13px var(--f-ui);margin:0 0 6px;white-space:nowrap}
#rsCoinLine .ser-coin{margin:0!important;padding:0!important;border:0!important;background:none!important}
#result .row{margin-top:0!important}
@media (max-height:340px){#result .res-who{min-height:0}#result #resXP{margin:0 auto 4px!important}#rsMid{margin-bottom:4px}#rsSide>button{height:34px!important}#rsCoinLine{margin-bottom:4px;font-size:12px}}`;document.head.appendChild(st)}
// 광고 보고 코인은 3판이 다 끝났을 때만 (중간 판 결과에는 없어요)
{const ac=adCoinBtn;adCoinBtn=function(){const S=(G.chal||G.duo||G.stage)?null:curSer();if(S&&S.on&&!S.done){const b=$('bAdCoin');if(b)b.remove();try{rsLayout()}catch(e){}return}return ac.apply(this,arguments)}}
// 결과 창 증강체 칸: 얇게(높이 26px, 칩 20px)
{const st=document.createElement('style');st.textContent=`
#result .rs-ser #resCoin>.ag-foot{gap:5px!important}
#result .rs-ser #resCoin>.ag-foot>.ag-have{min-height:0!important;height:28px;padding:0 4px 0 10px!important;border-radius:14px!important;gap:3px!important;box-sizing:border-box}
#result .rs-ser #resCoin>.ag-foot>.ag-have>span{font-size:11.5px!important;margin-right:4px}
#result .rs-ser #resCoin>.ag-foot>.ag-have .ag-chip{width:22px!important;height:22px!important;min-width:0!important;padding:0!important;border-width:2px!important}
#result .rs-ser #resCoin>.ag-foot>.ag-have .ag-chip svg{width:14px!important;height:14px!important}`;document.head.appendChild(st)}
{const st=document.createElement("style");st.textContent="#rsCoinLine svg,#rsCoinLine img{width:16px!important;height:16px!important;vertical-align:-3px;flex:none}#rsCoinLine *{font-size:inherit}#rsCoinLine small{font-size:11px!important;color:#8a6a50}";document.head.appendChild(st)}
// ----- 온라인(친구·아무나) 3판 중간: 판이 끝나면 둘 다 '준비'를 눌러야 다음 판 (예전엔 9초 뒤 저절로) -----
serHostAuto=function(){};
function srS(){const S=NET.on&&!NET.duo?NET.ser:null;return S&&S.on&&!S.done?S:null}
function srSync(){const S=srS();if(!S||screen!=='result')return;const b=$('bAgain');if(!b)return;const r=S.r,me=NET.srdyMe===r,pe=NET.srdyPeer===r;
  b.hidden=false;b.disabled=me;const t=b.querySelector('b');if(t)t.textContent=me?'준비 완료':'준비';b.classList.toggle('sr-done',me);
  let st=$('srStat');const box=$('resCoin');if(!st&&box){st=document.createElement('div');st.id='srStat';st.className='ser-next'}
  if(st&&box){if(st.parentElement!==box)box.appendChild(st);for(const e of box.querySelectorAll('.ser-next'))if(e!==st&&/곧 .판을 시작/.test(e.textContent))e.remove();
    st.textContent=me?(pe?`${r+1}판을 시작해요`:'상대가 준비하기를 기다리는 중…'):(pe?`상대는 준비 완료 · 준비를 누르면 ${r+1}판 시작`:`둘 다 준비를 누르면 ${r+1}판을 시작해요`)}}
function srTry(){const S=srS();if(!S||!NET.host)return;const r=S.r;if(NET.srdyMe===r&&NET.srdyPeer===r&&NET.srGo!==r){NET.srGo=r;setTimeout(()=>{if(srS()!==S||S.r!==r)return;NET.nextRound=r+1;NET.peerReady=true;try{hostNext(roleAt(S.first,r+1))}finally{NET.nextRound=1}},600)}}
$('bAgain').addEventListener('click',e=>{const S=srS();if(!S||screen!=='result')return;e.stopImmediatePropagation();e.preventDefault();if(NET.srdyMe===S.r)return;SFX.click();NET.srdyMe=S.r;try{netSend({t:'srdy',r:S.r})}catch(er){}srSync();srTry()},true);
{const nm=netMsg;netMsg=function(d){if(d&&d.t==='srdy'){NET.srdyPeer=d.r|0;srSync();srTry();return}return nm.apply(this,arguments)}}
{const sr=serResult;serResult=function(){const r=sr.apply(this,arguments);try{srSync()}catch(e){}return r}}
setInterval(()=>{try{if(screen==='result'&&srS())srSync()}catch(e){}},500);
{const st=document.createElement('style');st.textContent=`#bAgain.sr-done{filter:saturate(.5);opacity:.8}`;document.head.appendChild(st)}
