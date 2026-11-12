/* ================= 29차 (나): 3판 대결 · 증강체 고르기(이기면 2장) · 상대 증강체 보기 · 맵은 마녀가 · 설정 화면 없애기 ================= */
let MAPPICK=null;
{const at1=applyTheme;applyTheme=function(id,force){if(MAPPICK&&THEMES[MAPPICK])id=MAPPICK;return at1(id,force)}}
{const ts4=titleScreen;titleScreen=function(){MAPPICK=null;ts4()}}
// 설정 화면 없이 고정: 쿠키 벽 60 · 소다 보통 · 미로 1분 · AI 보통
function fixedSet(){WALLS=60;PT_SEC=2.5;DESIGN_T=60;AIL=SAVE.ail==null?1:SAVE.ail;SET.stake=0;NET.stake=0}
{const os0=openSetup;openSetup=function(back,showTime,go,online){fixedSet();
  if(online==='friend'&&back==='result'){os0(back,showTime,go,online);hideOpts();return}
  SET.back=back;SET.net=online||'';SET.gmode=SET.gmode||'classic';const g=online?go:()=>{if(skillPickOn())openSkillPick(go);else go()};g()}}
function hideOpts(){for(const o of document.querySelectorAll('#setup [id^="opt"]'))if(!['optGame','optRole'].includes(o.id))o.hidden=true;for(const id of['rewardHint','stakeHint'])if($(id))$(id).hidden=true}
{const sc0=syncChips;syncChips=function(){sc0();if(SET.net==='friend'&&SET.back==='result')hideOpts()}}

/* ----- 증강체 고르기: n장 (이긴 쪽은 2장) · 상대 증강체도 보여요 ----- */
function augPickN(side,tier,have,n,cb,title,opList,S){const sk=side==='t'?cleanSkills(SAVE.skills):[],dk=SAVE.deck;const ctx=augCtx(side,S);const ch=augChoices3(side,tier,have,ctx);AUGP.on=true;AUGP.cb=cb;AUGP.ch=ch;AUGP.n=n;const box=$('augS');box.hidden=false;let left=30;const sel=[];
  const draw=()=>{box.innerHTML=`<div class="ag-box"><div class="ag-top"><b>${title||'증강체 고르기'}</b><span class="ag-tier t-${tier}">${TIERN[tier]}</span><span class="ag-time" id="agTime">${left}</span></div>
    <div class="ag-row">${ch.map(id=>augCard(id,sel.includes(id))).join('')}</div>
    <div class="ag-foot"><div class="ag-have"><span>내 증강체</span>${augChips(have)}</div></div>
    <div class="ag-note">${n>1?`<b>2장</b>을 골라요 · `:''}30초가 지나면 무작위로 골라져요</div></div>`;
    for(const b of box.querySelectorAll('.ag-card'))b.onclick=()=>{const id=b.dataset.id;const i=sel.indexOf(id);if(i>=0)sel.splice(i,1);else sel.push(id);SFX.card();if(sel.length>=n)finish(sel.slice(0,n));else draw()};
    for(const c of box.querySelectorAll('.ag-chip'))c.onclick=()=>augTip(c.dataset.id);fitNames(box)};
  const finish=ids=>{if(!AUGP.on)return;AUGP.on=false;clearInterval(AUGP.h);box.hidden=true;const f=AUGP.cb;AUGP.cb=null;f&&f(ids)};
  draw();SFX.magic();clearInterval(AUGP.h);AUGP.h=setInterval(()=>{left--;const t=$('agTime');if(t)t.textContent=Math.max(0,left);if(left<=0){const rest=shuffle(ch.filter(id=>!sel.includes(id)));finish(sel.concat(rest).slice(0,n))}},1000)}
function augChips(list){return list.length?list.map(id=>{const a=AUGI2[id];return a?`<button class="ag-chip t-${a.tier}" data-id="${id}" title="${a.n}">${augIcon(id,true)}</button>`:''}).join(''):'<i class="ag-none">없음</i>'}
function augTip(id){const a=AUGI2[id];if(!a)return;tMsg(`${a.n} · ${a.d.replace(/\|/g,' ')}`)}

/* ----- 마녀가 맵 고르기 ----- */
function mapPick(go,who){const M=$('mapM');const own=Object.keys(THEMES).filter(k=>owns('theme',k)||SAVE.dev);const list=own.length?own:['candy'];let left=15;
  M.hidden=false;M.innerHTML=`<div class="slab map-slab"><div class="kicker">${who==='hero'?'쿠키 도둑':'과자 마녀'}</div><h2>${who==='hero'?'어느 맵에서 탈출할까요?':'어느 맵에 미로를 만들까요?'}</h2><div class="map-grid">${list.map(k=>`<button class="map-b" data-k="${k}" style="--mc:${THC[k]||'#ff7eb6'}"><i></i><b>${THN[k]||k}</b></button>`).join('')}</div><div class="note" id="mapLeft">15초 뒤엔 첫 번째 맵으로 시작해요</div></div>`;
  const done=k=>{if(M.hidden)return;clearInterval(mapPick.h);M.hidden=true;MAPPICK=k;try{loadMapMusic(k)}catch(e){}if(NET.on)netSend({t:'map',k});SFX.card();go()};
  for(const b of M.querySelectorAll('.map-b'))b.onclick=()=>done(b.dataset.k);
  clearInterval(mapPick.h);mapPick.h=setInterval(()=>{left--;const e=$('mapLeft');if(e)e.textContent=`${Math.max(0,left)}초 뒤엔 첫 번째 맵으로 시작해요`;if(left<=0)done(list[0])},1000)}

{const nm9=netMsg;netMsg=function(d){if(d&&d.t==='map'){if(THEMES[d.k])MAPPICK=d.k;return}return nm9(d)}}
/* ----- 결과: 3판 · 3판 결과로 승패 ----- */
serResult=function(S){if(screen!=='result')return;const fin=S.done;
  const cell=i=>{const q=S.res[i];if(!q)return'<td>·</td>';return`<td class="${q.win?'sc':'wd'}">${q.win?'승':'패'}${q.thiefMe?`<small>${q.esc?q.t+'초 탈출':'못 나감'}</small>`:`<small>${q.esc?'놓침':'막음'}</small>`}</td>`};
  let html=`<table class="ser-t"><tr><th></th><th>1판</th><th>2판</th><th>3판 · 결승</th></tr><tr><th>나</th>${[0,1,2].map(cell).join('')}</tr></table>`;
  html+=`<div class="ag-foot res"><div class="ag-have"><span>내 증강체</span>${augChips(S.aug.me)}</div><div class="ag-have op"><span>${S.kind==='ai'?'AI':(NET.peerNick||'상대')} 증강체</span>${augChips(S.aug.op)}</div></div>`;
  let res=null;if(fin){const fr=S.res[2];res=fr&&fr.win?'win':'lose';$('resKick').textContent=res==='win'?'최종 승리!':'최종 패배';$('resKick').className='res-rib'+(res==='lose'?' lose':'');$('resLede').textContent='3판 결승 결과로 승패가 정해져요'}
  else{const nx=S.r+1;html+=`<div class="ser-next">${S.res[S.r-1]&&S.res[S.r-1].win?'이겼어요! 다음 판은 증강체를 2장 골라요':'다음 판엔 상대가 증강체를 2장 골라요'}</div>`}
  const box=$('resCoin');const prev=S.kind==='ai'?box.innerHTML:'';box.innerHTML=html+(fin&&S.payTxt?`<div>${S.payTxt}</div>`:'')+(prev&&fin?`<div class="ser-coin">${prev}</div>`:'');
  for(const c of box.querySelectorAll('.ag-chip'))c.onclick=()=>augTip(c.dataset.id);
  if(!NET.on){$('bAgain').querySelector('b').textContent=fin?'새 대결':`다음 판 ▶ ${S.r+1}판${S.r+1===3?' · 결승':''}`;$('bAgain').disabled=false;$('bHome').textContent='그만하기'}
  else if(!fin){$('bAgain').hidden=true;$('bHome').textContent='나가기';box.insertAdjacentHTML('beforeend',`<div class="ser-next">곧 ${S.r+1}판을 시작해요</div>`)}else $('bAgain').hidden=false;
  return res};

/* ----- 게임 중 증강체 보기 (화면 구석) ----- */
function augHudSync(){const el=$('augHud');const S=(G.chal||G.duo||G.stage)?null:curSer();if(!S||!S.on||!isPlaying()){el.hidden=true;return}const key=S.aug.me.join()+'|'+S.aug.op.join();if(el.dataset.k!==key){el.dataset.k=key;el.innerHTML=`<div><span>나</span>${augChips(S.aug.me)}</div><div class="op"><span>상대</span>${augChips(S.aug.op)}</div>`;for(const c of el.querySelectorAll('.ag-chip'))c.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();augTip(c.dataset.id)})}el.style.top=G.mode==='devil'?'calc(104px + env(safe-area-inset-top,0px))':'';el.hidden=false}
setInterval(augHudSync,400);
{const ts5=titleScreen;titleScreen=function(){ts5();$('augHud').hidden=true}}
