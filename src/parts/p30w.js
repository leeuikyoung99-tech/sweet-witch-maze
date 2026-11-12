/* ================= 31차 (가): 미로 짓기 창 · 어디서나 일시정지 · 포탑 범위 · 카드 개수 · 스킬 수치 ================= */
// ----- 미로 짓기: 지우기·뒤로 버튼 없이, 벽을 누르면 지워져요. 자동 배치(새 미로)는 3번까지 -----
{const e=$('bErase');if(e)e.style.display='none';const bk=$('bDesignBack');if(bk)bk.style.display='none'}
// (스위치를 켰을 때만 지워져요 — 벽을 눌러 바로 지우기는 뺐어요)
const DSN={auto:5};
function autoLabel(){const b=$('bAuto');if(!b)return;b.textContent=`새 미로 (${DSN.auto}/5)`;b.disabled=DSN.auto<=0}
document.addEventListener('click',e=>{if(!e.target.closest||!e.target.closest('#bAuto'))return;if(DSN.auto<=0){e.stopImmediatePropagation();e.preventDefault();SFX.deny();sToast('새 미로는 5번까지 바꿀 수 있어요');return}DSN.auto--;setTimeout(autoLabel,0)},true);
{const sd=startDesign;startDesign=function(){DSN.auto=5;const r=sd.apply(this,arguments);autoLabel();return r}}
// 미로 짓기 화면 왼쪽 위: 일시정지
{const b=document.createElement('button');b.className='ib';b.id='bPauseS';b.setAttribute('aria-label','일시정지');
  b.innerHTML='<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1.6" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.6" fill="currentColor"/></svg>';
  $('hudS').prepend(b);b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();uPause('design')})}
// ----- 일시정지: 경기 · 3초 세기 · 증강체 고르기 · 미로 짓기 어디서나 -----
const PZ={ctx:null};
function uPause(ctx){if(PZ.ctx)return;PZ.ctx=ctx;if(!NET.on){if(ctx==='design')screen='designP';if(ctx==='aug')AUGP.paused=true}
  const P=$('pause');P.querySelector('.kicker').textContent=NET.on?'온라인 경기는 멈추지 않아요':'일시정지';P.classList.add('pz-on');P.hidden=false;SFX.click()}
function uResume(){const c=PZ.ctx;PZ.ctx=null;const P=$('pause');P.hidden=true;P.classList.remove('pz-on');if(c==='design'&&screen==='designP')screen='design';if(c==='aug')AUGP.paused=false;G.last=performance.now()}
document.addEventListener('click',e=>{if(!PZ.ctx||!e.target.closest||!e.target.closest('#bResume'))return;e.stopImmediatePropagation();e.preventDefault();uResume()},true);
document.addEventListener('click',e=>{if(!PZ.ctx||!e.target.closest||!e.target.closest('#bQuit'))return;const c=PZ.ctx;uResume();if(c==='aug')try{augCancel()}catch(err){}if(c==='design'){e.stopImmediatePropagation();e.preventDefault();screen='title';$('hudS').hidden=true;titleScreen()}},true);
// 증강체 고를 때: 오른쪽 위 일시정지 버튼
{const b=document.createElement('button');b.className='ib';b.id='bPauseA';b.hidden=true;b.setAttribute('aria-label','일시정지');b.innerHTML=$('bPauseS').innerHTML;document.body.appendChild(b);
  b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();uPause('aug')})}
setInterval(()=>{const a=$('bPauseA');if(a)a.hidden=!(AUGP.on&&!$('augS').hidden)},250);

// ----- 포탑 범위: 마녀 화면에만 옅게 (벽에 가리는 칸은 빼요). 포탑 카드를 고르면 진하게 -----
const TRG={mesh:null,key:'',t:0};
const TRGC={tower:'#ffd0ea',ice:'#c6f0ff',magnet:'#ffc4cc',spin:'#fff1a8'},TRGM={};
function trgMat(c){return TRGM[c]||(TRGM[c]=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.32,depthWrite:false,fog:false}))}
function trgUpdate(dt){const show=G.mode==='devil'&&screen==='play'&&!window.__aiBoth&&!window.__simFast;
  if(!show){if(TRG.mesh)TRG.mesh.visible=false;return}TRG.t-=dt;
  const D=G.devil,selT=D&&D.sel!=null&&TURK.includes(D.hand[D.sel]);for(const k in TRGM)TRGM[k].opacity=selT?.6:.4;if(TRG.mesh)TRG.mesh.visible=true;
  if(TRG.t>0)return;TRG.t=.3;
  const T=G.ents.filter(e=>e.type==='tower'&&!e.dead);const key=T.map(e=>e.id).join(',')+'|'+B.walls.map(w=>w.o+w.x+'_'+w.z).join(',');if(key===TRG.key&&TRG.mesh&&TRG.mesh.parent)return;TRG.key=key;
  const by={},h=C*.47,y=.4;
  for(const e of T){const c=TRGC[e.tk||'tower']||TRGC.tower;const P=by[c]||(by[c]=[]);
    for(let z=0;z<N;z++)for(let x=0;x<N;x++){if(typeof MASK!=='undefined'&&!MASK[idx(x,z)])continue;const px=cx2x(x),pz=cx2x(z);if(Math.hypot(px-e.x,pz-e.z)>22)continue;if(!los(e.x,e.z,px,pz))continue;
      P.push(px-h,y,pz-h, px-h,y,pz+h, px+h,y,pz+h, px-h,y,pz-h, px+h,y,pz+h, px+h,y,pz-h)}}
  if(TRG.mesh){scene.remove(TRG.mesh);TRG.mesh.traverse(o=>{if(o.geometry)o.geometry.dispose()});TRG.mesh=null}
  const grp=new THREE.Group();for(const c in by){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(by[c],3));const m=new THREE.Mesh(g,trgMat(c));m.renderOrder=2;m.frustumCulled=false;grp.add(m)}
  scene.add(grp);TRG.mesh=grp}
{const uh=updHero;updHero=function(dt){const r=uh.apply(this,arguments);try{trgUpdate(dt)}catch(e){}return r}}
{const cw=clearWorld;clearWorld=function(){if(TRG.mesh){scene.remove(TRG.mesh);TRG.mesh=null;TRG.key=''}return cw.apply(this,arguments)}}

// ----- 손패: 개수 제한이 있는 카드는 "지금 / 최대" -----
function capOf(k){try{if(MONK.includes(k))return[monCount(),skelCap()];if(TURK.includes(k))return[towerCount(),TOWER_CAP()];
  if(k==='fake')return[G.candies.filter(c=>c.fake).length,3];if(TRAPS.includes(k))return[G.ents.filter(e=>TRAPS.includes(e.type)&&!e.dead).length,trapCap()];
  if(k==='choco')return[B.walls.filter(w=>w.temp).length,2]}catch(e){}return null}
// 왼쪽 빈 곳에 따로: 덱에 있는 종류만 "몬스터 1/3"처럼 (손패 카드에는 안 붙여요)
const CAPG=[['mon','몬스터',k=>MONK.includes(k)],['tur','포탑',k=>TURK.includes(k)],['trap','발판·덫',k=>TRAPS.includes(k)],['fake','가짜 사탕',k=>k==='fake'],['choco','초코 벽',k=>k==='choco']];
{const d=document.createElement('div');d.id='capPanel';d.hidden=true;document.body.appendChild(d)}
function capSync(){const P=$('capPanel'),D=G.devil;const on=G.mode==='devil'&&screen==='play'&&D&&!G.over;if(!on){P.hidden=true;return}
  const all=(D.deck||[]).concat(D.hand||[]);let html='';
  for(const[g,nm,f]of CAPG){const k=all.find(f);if(!k)continue;const c=capOf(k);if(!c)continue;html+=`<div class="cp-r${c[0]>=c[1]?' full':''}"><span class="cp-i">${ART[k]||''}</span><span class="cp-n">${nm}</span><b>${c[0]}/${c[1]}</b></div>`}
  if(P.dataset.k!==html){P.dataset.k=html;P.innerHTML=html}P.hidden=!html}
{const bh=buildHand;buildHand=function(){const r=bh.apply(this,arguments);capSync();return r}}
setInterval(capSync,300);

// ----- 카드·스킬 수치 -----
CARDS.ghost.cost=3;
function setSkCost(k,c){if(SK[k])SK[k].cost=c;if(typeof SKBASE!=='undefined'&&SKBASE[k])SKBASE[k].cost=c;if(SKN[k])SKN[k][2]=c}
setSkCost('scope',2);setSkCost('decoy',3);setSkCost('heal',2);
SKN.scope&&(SKN.scope[1]='12초 동안 작은 지도가 멀리까지 밝혀지고 몬스터가 보여요');
SKN.decoy&&(SKN.decoy[1]='분신이 조이스틱 방향으로 달려가요 · 몬스터가 쫓아가고, 분신 주변이 작은 지도에 밝혀져요');
// 망원경: 큰 지도를 띄우지 않고 작은 지도만
doScope=function(ai){if(!skReady('scope',ai))return;skPay('scope');G.scopeT=12;scopeReveal();SFX.magic();if(meLoud())say('망원경! 12초 동안 작은 지도가 멀리까지 보여요',false,1.3)};
// 분신: 달리는 동안 분신 주변 칸이 지도에 밝혀져요
function seeAround(x,z,R){const[cx,cz]=cellOf(x,z);for(let dz=-R;dz<=R;dz++)for(let dx=-R;dx<=R;dx++){const qx=cx+dx,qz=cz+dz;if(qx<0||qz<0||qx>=N||qz>=N)continue;if(!los(x,z,cx2x(qx),cx2x(qz)))continue;const i=idx(qx,qz);G.seen[i]=1;G.memE[i]=qx<N-1?(B.E[i]?1:0):1;G.memS[i]=qz<N-1?(B.S[i]?1:0):1}}
{const uh=updHero;updHero=function(dt){const r=uh.apply(this,arguments);if(G.decoy&&G.seen&&!G.over)try{seeAround(G.decoy.x,G.decoy.z,1)}catch(e){}return r}}
// 사탕 벽돌은 없어요 (산 사람은 코인을 돌려줘요)
{const i=SKP.indexOf('brick');if(i>=0)SKP.splice(i,1);if(typeof GRADE!=='undefined')delete GRADE.s.brick;const j=RACE_SKP.indexOf('brick');if(j>=0)RACE_SKP.splice(j,1);
  if(SAVE.unl&&SAVE.unl['s:brick']){delete SAVE.unl['s:brick'];SAVE.coins+=400;SAVE.brickRefund=1;setTimeout(()=>{try{tMsg('사탕 벽돌이 없어져서 400코인을 돌려드렸어요')}catch(e){}},2500)}
  if(Array.isArray(SAVE.skills)&&SAVE.skills.includes('brick'))SAVE.skills=SAVE.skills.filter(k=>k!=='brick');if(SAVE.skills.length<2)SAVE.skills=cleanSkills(SAVE.skills.concat(['decoy','cloak']));
  if(Array.isArray(SAVE.raceSkills))SAVE.raceSkills=cleanRace(SAVE.raceSkills);saveGame()}

// ----- 사탕 칸: 다음 사탕이 조금씩 차오르는 게 보여요 -----
function manaPeriod(){const A=G.aug||{};return A.tn_bigbag?4:6}
{const pp=pips;pips=function(el,n){pp(el,n);try{const h=G.hero;if(!h)return;const kids=[...el.children];const f=n<HERO.manaMax?Math.min(1,(h.manaT||0)/manaPeriod()):0;
  kids.forEach((c,i)=>{let s=c.querySelector('.pf');if(i===n&&f>0){if(!s){s=document.createElement('s');s.className='pf';s.innerHTML=CANDY_SVG;c.appendChild(s)}s.style.clipPath=`inset(0 ${((1-f)*100).toFixed(1)}% 0 0)`}else if(s)s.remove()})}catch(e){}}}

// ----- 증강체: 카드마다 한 번씩 다시 뽑기 -----
{const ap=augPick;augPick=function(side,tier,have,skills,deck){AUGP.more=ex=>augChoices(side,tier,(have||[]).concat(ex),skills,deck);AUGP.rr=[0,0,0,0,0];AUGP.paused=false;return ap.apply(this,arguments)}}
{const an=augPickN;augPickN=function(side,tier,have,n,cb,title,opList,S){AUGP.more=ex=>augChoices3(side,tier,(have||[]).concat(ex),augCtx(side,S));AUGP.rr=[0,0,0,0,0];AUGP.paused=false;return an.apply(this,arguments)}}
{let busy=false;new MutationObserver(()=>{if(busy)return;busy=true;try{augRR()}finally{busy=false}}).observe($('augS'),{childList:true,subtree:true})}
function augRR(){const S=$('augS');if(!S||S.hidden||!AUGP.on)return;const cards=[...S.querySelectorAll('.ag-card')];
  cards.forEach((b,i)=>{if(b.querySelector('.ag-rr'))return;const u=document.createElement('button');u.className='ag-rr'+(AUGP.rr[i]?' used':'');u.setAttribute('aria-label','다시 뽑기');
    u.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 8a8 8 0 1 0 1.5 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M20 3v5.5h-5.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    u.onclick=e=>{e.stopPropagation();e.preventDefault();if(AUGP.rr[i]||!AUGP.on){SFX.deny();return}const shown=AUGP.ch.slice();
      let pool=[];try{pool=AUGP.more(shown)||[]}catch(err){}const nid=pool.find(q=>!shown.includes(q));if(!nid){SFX.deny();tMsg('더 바꿀 증강체가 없어요');return}
      AUGP.rr[i]=1;AUGP.ch[i]=nid;const tmp=document.createElement('div');tmp.innerHTML=augCard(nid);const nc=tmp.firstElementChild;b.className=nc.className;b.innerHTML=nc.innerHTML;b.dataset.id=nid;if(nc.getAttribute('style'))b.setAttribute('style',nc.getAttribute('style'));
      try{fitNames(S)}catch(err){}SFX.card();augRR()};b.appendChild(u)})}
// 4판 등급: 실버·프리즘은 각각 최대 한 번
tierSeq=function(rnd){rnd=rnd||Math.random;const W={s:.35,g:.45,p:.2},cap={s:1,g:4,p:1};for(let k=0;k<200;k++){const out=[],cnt={s:0,g:0,p:0};for(let i=0;i<4;i++){const o=['s','g','p'].filter(t=>cnt[t]<cap[t]);const tot=o.reduce((a,t)=>a+W[t],0);let r=rnd()*tot,p=o[o.length-1];for(const t of o){r-=W[t];if(r<=0){p=t;break}}out.push(p);cnt[p]++}return out}return['g','s','g','p']};
rollTierSeeded=function(S,r){let a=((S.seed||7)*2654435761)>>>0;const rnd=()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};return tierSeq(rnd)[Math.max(0,Math.min(3,(r|0)-1))]};

// ----- 거인 쿠키: 몸이 실제로 커져요 -----
{const uh=updHero;updHero=function(dt){const r=uh.apply(this,arguments);const h=G.hero;if(h&&h.g){const big=!!(G.aug&&G.aug.tp_giant);if(big!==!!h.__giant){h.g.scale.multiplyScalar(big?1.35:1/1.35);h.__giant=big}}return r}}

// ----- 돈 2배 · 경험치 2배 -----
for(const c in SHOP)for(const id in SHOP[c].items){const it=SHOP[c].items[id];if(it[1]>0&&!SHOP.__x2)it[1]*=2}SHOP.__x2=1;
GR_P[1]=400;GR_P[2]=800;GR_P[3]=1400;
{const ax=addXP;addXP=function(n){return ax(n*2)}}

{const st=document.createElement('style');st.textContent=`
#pause.pz-on{z-index:80}
#bPauseA{position:fixed;right:max(12px,env(safe-area-inset-right,0px));top:max(10px,env(safe-area-inset-top,0px));z-index:70}
#hudS #bPauseS{pointer-events:auto;position:absolute;left:max(10px,env(safe-area-inset-left,0px));top:max(10px,env(safe-area-inset-top,0px));z-index:3}
#bAuto:disabled{opacity:.45}
#capPanel{position:fixed;left:max(10px,env(safe-area-inset-left,0px));top:calc(96px + env(safe-area-inset-top,0px));z-index:6;display:flex;flex-direction:column;gap:4px;pointer-events:none}
#capPanel .cp-r{display:flex;align-items:center;gap:5px;background:#fff8eeee;border:2px solid var(--choco);border-radius:10px;padding:2px 8px 2px 3px;box-shadow:0 2px 0 var(--choco);font:12px var(--f-display);color:var(--choco);white-space:nowrap}
#capPanel .cp-i{width:22px;height:22px;display:grid;place-items:center}#capPanel .cp-i svg{width:22px;height:22px}
#capPanel .cp-r b{font-size:14px;margin-left:2px}#capPanel .cp-r.full b{color:#e8364f}
body.tu-all #capPanel{display:none!important}
.candies i{position:relative}
.candies i s.pf{position:absolute;inset:0;text-decoration:none;pointer-events:none;color:#ff7eb6}.candies i:nth-child(2n) s.pf{color:#7cc6ff}

.candies i s.pf svg{width:100%;height:100%;display:block}
.ag-card{position:relative}
.ag-rr{position:absolute;right:-8px;top:-8px;width:30px;height:30px;border-radius:50%;background:#fff8ee;border:2.5px solid var(--choco);box-shadow:0 2px 0 var(--choco);color:var(--choco);display:grid;place-items:center;padding:4px;cursor:pointer;z-index:3}
.ag-rr svg{width:100%;height:100%}
.ag-rr.used{opacity:.35;pointer-events:none}`;document.head.appendChild(st)}
