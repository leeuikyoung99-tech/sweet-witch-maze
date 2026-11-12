/* ================= 3차: 새 도둑 스킬 · 메인/서브 게임 고르기 · 맵 고르기 ================= */
const CDK={decoy:'cdDecoy',cloak:'cdCloak',sprint:'cdSprint',jump:'cdJump',smoke:'cdSmoke',gum:'cdGum'};
function skReady(k,ai){const h=G.hero;if(G.over||(h[CDK[k]]||0)>0)return false;if(h.mana<SK[k].cost){if(!ai)say(`사탕이 모자라요 (${SK[k].cost}개 필요)`,true,1.1);return false}return true}
function skPay(k){const h=G.hero;h.mana-=SK[k].cost;h[CDK[k]]=SK[k].cd;h.skills++}
const meLoud=()=>G.mode==='hero'&&!G.hero.isRival;
// 설탕 질주: 5초 동안 40% 빨라요
function doSprint(ai){const h=G.hero;if(h.sprint>0||!skReady('sprint',ai))return;skPay('sprint');h.sprint=SK.sprint.dur;SFX.dash();if(meLoud())say('💨 설탕 질주! 5초 동안 빨라요',false,1.2)}
// 젤리 점프: 바로 앞 쿠키 벽 하나를 넘어요 (출구 칸으로는 못 넘어요)
function doJump(ai,dir){const h=G.hero;if(h.jump||!skReady('jump',ai))return;let d=dir;
  if(!d){let[mx,mz]=worldMove();if(Math.hypot(mx,mz)<.2){if(G.mode==='devil'||h.isAI){mx=Math.sin(h.face);mz=Math.cos(h.face)}else{mx=-Math.sin(h.yaw);mz=-Math.cos(h.yaw)}}d=Math.abs(mx)>Math.abs(mz)?[Math.sign(mx),0]:[0,Math.sign(mz)]}
  const[cx,cz]=cellOf(h.x,h.z),nx=cx+d[0],nz=cz+d[1];
  if(!inM(nx,nz)||canStep(cx,cz,d[0],d[1])){if(!ai)say('바로 앞에 넘을 쿠키 벽이 없어요',false,1.1);return}
  if(nx===EXIT[0]&&nz===EXIT[1]){if(!ai)say('출구 바로 앞 벽은 못 넘어요',true,1.2);return}
  skPay('jump');h.jump={t:0,d:.5,fx:h.x,fz:h.z,tx:cx2x(nx),tz:cx2x(nz)};h.dashT=0;h.slide=null;h.kx=h.kz=0;SFX.dash();netEv('jump');if(meLoud())say('🍬 젤리 점프!',false,.9)}
function jumpTick(h,dt){const J=h.jump;J.t+=dt;const k=Math.min(1,J.t/J.d);h.x=lerp(J.fx,J.tx,k);h.z=lerp(J.fz,J.tz,k);h.jumpY=Math.sin(k*Math.PI)*2.4;h.m.g.position.set(h.x,h.jumpY,h.z);h.m.mixer.update(dt);if(k>=1){h.jump=null;h.jumpY=0;h.m.g.position.y=0}}
// 솜사탕 연막: 근처 몬스터는 3초 멍, 사탕 대포는 4초 동안 못 봐요
function doSmoke(ai){if(!skReady('smoke',ai))return;if(G.rguest&&!ai)return remoteSkill('smoke');const h=G.hero;skPay('smoke');let n=0;
  for(const e of G.ents){if(e.dead)continue;const d=Math.hypot(e.x-h.x,e.z-h.z);if(isMon(e)&&d<9){e.stun=1.2;e.atk=0;e.target=null;play(e.m,'Idle');n++}else if(e.type==='tower'&&d<16)e.blind=2.5}
  burstFx(h.x,h.z,'smoke');burstFx(h.x,h.z,'smoke');SFX.magic();netEv('smoke');if(meLoud())say(n?`☁️ 연막! 몬스터 ${n}마리가 멍해요`:'☁️ 솜사탕 연막!',false,1.3)}
// 껌 뿌리기: 뒤에 끈적 껌 (6초) · 몬스터만 느려져요
function gumEnt(x,z){const e=spawnJelly(x,z);e.type='gum';e.life=12;return e}
function doGum(ai){if(!skReady('gum',ai))return;if(G.rguest&&!ai)return remoteSkill('gum');const h=G.hero;skPay('gum');const bx=clamp(h.x-Math.sin(h.face)*1.6,1,N*C-1),bz=clamp(h.z-Math.cos(h.face)*1.6,1,N*C-1);gumEnt(bx,bz);netEv('gum2');if(meLoud())say('🫧 껌을 뿌렸어요! 쫓아오는 몬스터가 느려져요',false,1.4)}
// 온라인 용사 대 용사 손님: 몬스터에 닿는 스킬은 방장 화면에서 처리해요
function remoteSkill(k){const h=G.hero;if(!skReady(k))return;skPay(k);netSend({t:'skill',k});SFX.magic();if(k==='smoke')burstFx(h.x,h.z,'smoke');say({decoy:'분신이 달려가요',smoke:'☁️ 솜사탕 연막!',gum:'🫧 껌을 뿌렸어요!'}[k],false,1.1)}
function hostSkill(k){if(!G.rv)return;withSlot(G.rv,()=>{const h=G.hero,m=h.mana;h.mana=9;h.cdDecoy=h.cdSmoke=h.cdGum=0;h.isAI=true;h.aiDir=[Math.sin(h.face),Math.cos(h.face)];try{({decoy:doDecoy,smoke:doSmoke,gum:doGum}[k]||(()=>{}))(true)}finally{h.isAI=false;h.mana=m}})}
function aiJump(){const h=G.hero,[cx,cz]=cellOf(h.x,h.z),f=exitField(),cur=f[idx(cx,cz)];if(cur<0)return;
  for(const[dx,dz]of DIRS){const a=cx+dx,b=cz+dz;if(!inM(a,b)||canStep(cx,cz,dx,dz)||(a===EXIT[0]&&b===EXIT[1]))continue;const v=f[idx(a,b)];if(v>=0&&v<cur-5){doJump(true,[dx,dz]);return}}}
function aiSkillUse(near,seen,aimed){const h=G.hero,HS=G.heroSkills||[];
  if(HS.includes('smoke')&&seen&&near<5)doSmoke(true);
  if(HS.includes('gum')&&seen&&near<7&&near>2.2)doGum(true);
  if(HS.includes('sprint')&&h.sprint<=0&&((near<8&&seen)||(G.t>50&&Math.random()<.01)))doSprint(true);
  if(HS.includes('jump')&&!h.jump)aiJump()}
// 가까이 붙은 상대 쿠키는 흐리게 (1인칭에서 화면을 가리지 않게)
function rivalFade(h,base){if(!G.ph||G.mode!=='hero'||VIEW!==1)return base;const d=Math.hypot(h.x-G.ph.x,h.z-G.ph.z);return d<2.6?Math.min(base,Math.max(.18,(d-.8)/1.8)):base}
/* ----- 메인/서브 게임 · 들어가는 곳 ----- */
let ROLECTX='ai',ROLETAB='main';
const rpre=()=>'swm-rand-v3-'+(SET.gmode||'classic')+'-';
function showRole(tab){if(tab)ROLETAB=tab;show('role');for(const b of $('roleTabs').children)b.classList.toggle('on',b.dataset.t===ROLETAB);
  for(const id of['bHero','bDevil'])$(id).hidden=ROLETAB!=='main';for(const id of['bRace','bWW'])$(id).hidden=ROLETAB!=='sub';
  $('roleKick').textContent={ai:'혼자 하기 · AI와 대결',rand:'아무나와 하기',friend:'친구랑 하기 · 방 만들기'}[ROLECTX];
  $('roleNote').textContent=ROLETAB==='main'?(ROLECTX==='friend'?'친구 대전은 등급이 바뀌지 않아요':ROLECTX==='ai'?(randOpen()?'등급은 이제 아무나와 하기에서만 올라요 · 매일 미션은 여기서도 쌓여요':'마카롱 전까지는 AI(보통 이상)를 이기면 등급 별 +1 · 그다음은 아무나와 하기에서 올라요'):'이기면 등급 별 +1, 지면 -1'):'서브 게임은 등급·매일 미션에 들어가지 않아요'}
async function roleGo(kind){await initAudio();const sub=kind==='race'||kind==='ww';SET.mode=kind;
  if(ROLECTX==='ai'){const go=kind==='hero'?()=>beginMatch('hero'):kind==='devil'?()=>startDesign():kind==='race'?()=>startRaceAI():()=>startWWAI();openSetup('role',kind==='devil',()=>{if(!isFull())goFull(true);go()});return}
  SET.gmode=sub?kind:'classic';if(!sub)SET.role=kind;NET.peerCoins=null;openSetup('role',true,ROLECTX==='rand'?()=>randomMatch():()=>hostRoom(),ROLECTX)}
const randOpen=()=>tierOf(SAVE.rank.s|0)>=1;
function tMsg(t){const el=$('tMsg');el.textContent=t;el.hidden=false;clearTimeout(tMsg.h);tMsg.h=setTimeout(()=>{el.hidden=true},3200)}
function syncTitle(){const b=$('bRandT');if(!b)return;const open=randOpen();b.classList.toggle('locked',!open);$('randSub').textContent=open?'판돈 걸고 대결':'🔒 마카롱 등급부터'}
const MAPN={candy:'과자 마을',ice:'아이스크림',pumpkin:'할로윈',xmas:'크리스마스'};
/* ----- 카드·스킬 고르기: 위는 쓰는 것, 아래는 후보 (후보를 누르고 위를 누르면 바뀌어요) ----- */
const DECKV={tab:'witch',pick:null};
function openDeck(){DECKV.pick=null;show('deckS');renderDeck()}
function dkTile(k,W,a){const pk=DECKV.pick&&DECKV.pick.a===a&&DECKV.pick.k===k?' pk':'';
  if(W){const c=CARDS[k];return`<button class="dk k-${KIND[k]}${pk}" data-a="${a}" data-k="${k}"><span class="cs">${c.cost}</span>${DOUBLE.includes(k)?'<span class="x2">×2</span>':''}<span class="dk-art">${ART[k]||''}</span><span class="nm">${c.n}</span></button>`}
  const[n,,c]=SKN[k],sv=$(SKB[k]).querySelector('svg').outerHTML;return`<button class="dk sk-${k}${pk}" data-a="${a}" data-k="${k}"><span class="cs candy">${c}</span><span class="dk-art">${sv}</span><span class="nm">${n}</span></button>`}
function renderDeck(){for(const b of $('deckTabs').children)b.classList.toggle('on',b.dataset.t===DECKV.tab);const W=DECKV.tab==='witch',top=W?SAVE.deck:SAVE.skills,pool=(W?CPOOL:SKP).filter(k=>!top.includes(k));
  $('deckN').textContent=W?'쓰는 카드 8장':'쓰는 스킬 2개 · 대시는 늘 있어요';$('deckTop').className='dk-top'+(W?'':' two');$('deckTop').innerHTML=top.map(k=>dkTile(k,W,'top')).join('');
  $('deckLbl').textContent=(W?'후보 카드':'후보 스킬')+' · 후보를 누르고, 바꿀 위쪽 '+(W?'카드':'스킬')+'를 누르면 서로 바뀌어요';
  $('deckPool').className='dk-pool'+(W?'':' two');$('deckPool').innerHTML=pool.length?pool.map(k=>dkTile(k,W,'pool')).join(''):'<p class="note">후보가 없어요</p>';
  const p=DECKV.pick;$('deckSel').innerHTML=p?`<b>${W?CARDS[p.k].n:SKN[p.k][0]}</b> · ${W?CARD_DESC[p.k]:SKN[p.k][1]}${W&&DOUBLE.includes(p.k)?' · 덱에 2장씩 들어가요':''}`:(W?'카드를 누르면 설명이 나와요 · 포도 슬라임·벽 밀기는 2장씩 들어가요':'스킬을 누르면 설명이 나와요 · 사탕을 모아 써요')}
function deckTap(a,k){const W=DECKV.tab==='witch',top=W?SAVE.deck:SAVE.skills,p=DECKV.pick;
  if(p&&p.a!==a){const t=a==='top'?k:p.k,c=a==='top'?p.k:k,i=top.indexOf(t);if(i>=0&&!top.includes(c)){top[i]=c;saveGame()}DECKV.pick={a:'top',k:c};SFX.card();renderDeck();return}
  DECKV.pick=p&&p.k===k&&p.a===a?null:{a,k};SFX.card();renderDeck()}
function closeDeck(){titleScreen()}
