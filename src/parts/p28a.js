/* ================= 28차 (가): 기본 수정 ================= */
// 판마다 새로 만드는 것들(예고 표시·깃발 등)은 여기 모아서 한 번에 지워요
const X28={list:[]};
function x28add(o){scene.add(o);X28.list.push(o);return o}
function x28clear(){for(const o of X28.list)drop(o);X28.list=[]}
{const cw0=clearWorld;clearWorld=function(){cw0();x28clear();if(G.tele)G.tele=[];G.flags=[];G.crumbs=[];G.scope=null;G.eyeOn=0}}

/* ----- 3 · 2 · 1 · 시작! ----- */
const CDN={t:0,id:0};
function startCountdown(){if(G.over)return;CDN.id++;const my=CDN.id;CDN.t=3.4;const t0=performance.now();G.over=true;G.cdn=true;const el=$('cdn');el.hidden=false;let last=-1;
  const tick=()=>{if(CDN.id!==my)return;if(screen!=='play'&&screen!=='pause'){el.hidden=true;G.cdn=false;return}
    const n=Math.ceil(CDN.t-.4);if(n!==last){last=n;el.innerHTML=`<b class="cd-n">${n>0?n:'시작!'}</b>`;el.firstChild.classList.remove('pop');void el.firstChild.offsetWidth;el.firstChild.classList.add('pop');if(n>0)tone(660,.12,'triangle',.12);else tone(990,.25,'triangle',.14)}
    CDN.t=3.4-(performance.now()-t0)/1000;if(CDN.t<=0){el.hidden=true;G.cdn=false;G.over=false;G.last=performance.now();return}setTimeout(tick,50)};tick()}
{const nm0=newMatch;newMatch=function(mode){nm0(mode);G.cdnWant=true}}
{const bm0=beginMatch;beginMatch=function(mode,keep){bm0(mode,keep);if(G.cdnWant){G.cdnWant=false;startCountdown()}}}

/* ----- 몬스터 3마리 · 포탑 5개 ----- */
skelCap=function(){return(G.aug&&G.aug.monCap)||3};
const TOWER_CAP=()=>(G.aug&&G.aug.turCap)||5;

/* ----- 한 번 옮긴 벽은 다시 못 옮겨요 (색이 바뀌어요) ----- */
WHY.moved='한 번 옮긴 벽은 다시 못 옮겨요';
{const ac0=applyCard;applyCard=function(k,x,z,extra){
  if(k==='move'&&extra&&extra.w&&extra.w.moved&&!(G.aug&&G.aug.wall2&&!extra.w.moved2&&!G.devil.wall2used))return 'moved';
  if(k==='choco')CHOCO_O=extra&&extra.o||null;
  const r=ac0(k,x,z,extra);CHOCO_O=null;
  if(r==='ok'&&k==='move'&&extra&&extra.w){if(extra.w.moved){extra.w.moved2=1;G.devil.wall2used=1}extra.w.moved=1;tintWall(extra.w)}
  return r}}
{const ws0=wallShifts;wallShifts=function(w){if(w.moved&&!(G.aug&&G.aug.wall2&&!w.moved2&&!G.devil.wall2used))return[];return ws0(w)}}
const MOVEDM={};
function tintWall(w){const m=WORLD.wallMeshes.get(w);if(!m||!m.children[0])return;const f=MAT.crackerFace.map,key=f?f.uuid:'-';
  if(!MOVEDM[key]){const face=keepM(new THREE.MeshLambertMaterial({map:f,color:'#c9b2ff',emissive:new THREE.Color('#7a5cff'),emissiveIntensity:.12})),side=keepM(new THREE.MeshLambertMaterial({color:'#a98be8'}));MOVEDM[key]=[side,side,side,side,face,face]}
  m.children[0].material=MOVEDM[key]}
{const sw0=syncWallMeshes;syncWallMeshes=function(){sw0();for(const w of B.walls)if(w.moved)tintWall(w)}}
{const mw0=markWall;markWall=function(w,on){mw0(w,on);if(!on&&w&&w.moved)tintWall(w)}}
{const mw1=mirrorWalls;mirrorWalls=function(list){const before=B.walls.map(w=>w.x+','+w.z+','+w.o);mw1(list);if(B.walls.length===before.length)B.walls.forEach((w,i)=>{if(before[i]!==w.x+','+w.z+','+w.o){w.moved=1;tintWall(w)}})}}

/* ----- 캐릭터는 쿠키 도둑 하나만 ----- */
for(const k of Object.keys(SHOP.body.items))if(k!=='rogue')delete SHOP.body.items[k];
SAVE.eq.body='rogue';
placeBodyPick=function(){const el=$('bodyPick');if(el)el.hidden=true};

/* ----- 가짜 사탕 3 ----- */
CARDS.fake.cost=3;

/* ----- 소리 설정 ----- */
SAVE.snd=Object.assign({m:1,s:1,mv:.5,sv:1},SAVE.snd||{});
function applySnd(){if(!A.ctx)return;const S=SAVE.snd,now=A.ctx.currentTime;A.music.gain.setTargetAtTime(S.m?S.mv:0,now,.05);A.sfx.gain.setTargetAtTime(S.s?S.sv:0,now,.05)}
{const ia0=initAudio;initAudio=async function(){await ia0();applySnd()}}
function openSnd(){const S=SAVE.snd,M=$('sndM');M.hidden=false;
  M.innerHTML=`<div class="slab snd-slab"><div class="kicker">⚙️ 소리 설정</div>
  <div class="snd-row"><span>🎵 배경음악</span><button class="tg${S.m?' on':''}" data-k="m">${S.m?'켜짐':'꺼짐'}</button><input type="range" min="0" max="100" value="${Math.round(S.mv*100)}" data-k="mv" aria-label="배경음악 크기"></div>
  <div class="snd-row"><span>🔔 효과음</span><button class="tg${S.s?' on':''}" data-k="s">${S.s?'켜짐':'꺼짐'}</button><input type="range" min="0" max="100" value="${Math.round(S.sv*100)}" data-k="sv" aria-label="효과음 크기"></div>
  <div class="row"><button class="mbtn mint small" id="bSndOk"><span class="mt"><b>닫기</b></span></button></div></div>`;
  for(const b of M.querySelectorAll('.tg'))b.onclick=()=>{S[b.dataset.k]=S[b.dataset.k]?0:1;saveGame();applySnd();openSnd();if(b.dataset.k==='s'&&S.s)SFX.card()};
  for(const r of M.querySelectorAll('input'))r.oninput=()=>{S[r.dataset.k]=+r.value/100;saveGame();applySnd()};
  for(const r of M.querySelectorAll('input[data-k="sv"]'))r.onchange=()=>SFX.card();
  $('bSndOk').onclick=()=>{M.hidden=true}}
$('bSnd').onclick=async()=>{await initAudio();openSnd()};$('bSnd2').onclick=async()=>{await initAudio();openSnd()};

/* ----- 작은 지도: 모양으로 알아보기 ----- */
function mapIcon(g,kind,x,y,s,col,alpha){g.save();g.translate(x,y);g.globalAlpha=alpha==null?1:alpha;g.lineWidth=Math.max(1.2,s*.08);g.strokeStyle='#4a2a1a';g.fillStyle=col;const r=s*.42;g.beginPath();
  if(kind==='skel'){g.moveTo(-r,r*.55);g.quadraticCurveTo(-r,-r*.9,0,-r*.9);g.quadraticCurveTo(r,-r*.9,r,r*.55);g.closePath()}
  else if(kind==='ghost'){g.moveTo(-r*.8,r*.8);g.lineTo(-r*.8,-r*.1);g.arc(0,-r*.1,r*.8,Math.PI,0);g.lineTo(r*.8,r*.8);g.lineTo(r*.4,r*.5);g.lineTo(0,r*.8);g.lineTo(-r*.4,r*.5);g.closePath()}
  else if(kind==='bat'){g.moveTo(0,-r*.2);g.lineTo(-r*1.1,-r*.6);g.lineTo(-r*.7,r*.1);g.lineTo(-r*.3,r*.5);g.lineTo(0,r*.25);g.lineTo(r*.3,r*.5);g.lineTo(r*.7,r*.1);g.lineTo(r*1.1,-r*.6);g.closePath()}
  else if(kind==='bear'){g.arc(0,r*.15,r*.75,0,7);g.moveTo(-r*.45+r*.33,-r*.55);g.arc(-r*.45,-r*.55,r*.33,0,7);g.moveTo(r*.45+r*.33,-r*.55);g.arc(r*.45,-r*.55,r*.33,0,7)}
  else if(kind==='soldier'){g.rect(-r*.45,-r*.35,r*.9,r*1.2);g.rect(-r*.5,-r*.95,r*1,r*.55)}
  else if(kind==='spider'){g.arc(0,0,r*.55,0,7);g.fill();g.stroke();g.beginPath();for(const sx of[-1,1])for(const k of[-.5,0,.5]){g.moveTo(sx*r*.4,k*r*.6);g.lineTo(sx*r*1.1,k*r*1.3)}g.stroke();g.restore();return}
  else if(kind==='ginger'){g.arc(0,-r*.45,r*.38,0,7);g.moveTo(-r*.6,0);g.lineTo(r*.6,0);g.lineTo(r*.4,r*.9);g.lineTo(-r*.4,r*.9);g.closePath()}
  else if(kind==='tower'){g.rect(-r*.38,-r*.2,r*.76,r*1.1);g.moveTo(r*.55,-r*.45);g.arc(0,-r*.45,r*.55,0,7)}
  else if(kind==='eye'){g.ellipse(0,0,r*.9,r*.55,0,0,7);g.fill();g.stroke();g.beginPath();g.fillStyle='#2a1640';g.arc(0,0,r*.28,0,7);g.fill();g.restore();return}
  else if(kind==='cookie'){g.arc(0,0,r*.85,0,7);g.fill();g.stroke();g.beginPath();g.fillStyle='#6e3e22';for(const[a,b]of[[-.3,-.3],[.35,-.1],[-.1,.35]]){g.moveTo(a*r+r*.13,b*r);g.arc(a*r,b*r,r*.13,0,7)}g.fill();g.restore();return}
  else if(kind==='flag'){g.moveTo(-r*.4,r*.9);g.lineTo(-r*.4,-r*.9);g.lineTo(r*.8,-r*.5);g.lineTo(-r*.4,-r*.1);g.stroke();g.fill();g.restore();return}
  else g.arc(0,0,r*.6,0,7);
  g.fill();g.stroke();g.restore()}
const MAPCOL={skel:'#a46bff',ginger:'#c9803a',ghost:'#f4ecff',bat:'#6a3fa0',bear:'#ff8a5a',soldier:'#e0a060',spider:'#7ee8c8',tower:'#ffb36b'};
drawMap=function(cv){const g=cv.getContext('2d'),W=cv.width,pad=W*.05,s=(W-pad*2)/N,h=G.hero;g.fillStyle='#fff8ee';g.fillRect(0,0,W,W);const X=x=>pad+x/C*s,Z=z=>pad+z/C*s;
  for(let z=0;z<N;z++)for(let x=0;x<N;x++){if(!MASK[idx(x,z)]){g.fillStyle='#e9ddd0';g.fillRect(pad+x*s,pad+z*s,s+.5,s+.5);continue}if(!G.seen[idx(x,z)])continue;g.fillStyle=G.dead[idx(x,z)]>=0?'#ffd6e6':'#f4d6a1';g.fillRect(pad+x*s,pad+z*s,s+.5,s+.5)}
  if(G.crumbs&&G.crumbs.length){g.fillStyle='#c98d5f';for(const i of G.crumbs){const x=i%N,z=(i/N)|0;g.beginPath();g.arc(pad+(x+.5)*s,pad+(z+.5)*s,s*.1,0,7);g.fill()}}
  g.strokeStyle='#8a5530';g.lineWidth=Math.max(2,s*.16);g.lineCap='round';
  for(let z=0;z<N;z++)for(let x=0;x<N;x++){const i=idx(x,z);if(G.memE[i]===1&&x<N-1){g.beginPath();g.moveTo(pad+(x+1)*s,pad+z*s);g.lineTo(pad+(x+1)*s,pad+(z+1)*s);g.stroke()}if(G.memS[i]===1&&z<N-1){g.beginPath();g.moveTo(pad+x*s,pad+(z+1)*s);g.lineTo(pad+(x+1)*s,pad+(z+1)*s);g.stroke()}}
  g.strokeStyle='#4a2a1a';g.lineWidth=Math.max(2,s*.12);if(SHAPE==='square')g.strokeRect(pad,pad,N*s,N*s);const eyy=EXIT[1]===0?pad:pad+N*s;g.fillStyle='#fff8ee';g.fillRect(pad+MID*s+2,eyy-3,s-4,6);
  g.fillStyle='#ffd35f';g.strokeStyle='#4a2a1a';g.lineWidth=2;g.beginPath();g.arc(pad+(MID+.5)*s,eyy+(EXIT[1]===0?-1:1)*s*.05,s*.35,0,7);g.fill();g.stroke();
  if(G.exit2&&G.exit2.known){g.fillStyle='#ffd35f';g.beginPath();g.arc(pad+(G.exit2.x+.5)*s,pad+(G.exit2.z+.5)*s,s*.32,0,7);g.fill();g.stroke()}
  g.strokeStyle='#ff5f9e';g.lineWidth=Math.max(2,s*.14);for(const br of G.branches){if(br.alive===false)continue;const[x,z]=br.cells[0],c=.25;g.beginPath();g.moveTo(pad+(x+c)*s,pad+(z+c)*s);g.lineTo(pad+(x+1-c)*s,pad+(z+1-c)*s);g.moveTo(pad+(x+1-c)*s,pad+(z+c)*s);g.lineTo(pad+(x+c)*s,pad+(z+1-c)*s);g.stroke()}
  if(G.xm)for(const i of G.xm.keys()){const x=i%N,z=(i/N)|0,c=.2;g.strokeStyle='#fff';g.lineWidth=Math.max(3,s*.26);g.lineCap='round';for(let k=0;k<2;k++){g.beginPath();g.moveTo(pad+(x+c)*s,pad+(z+c)*s);g.lineTo(pad+(x+1-c)*s,pad+(z+1-c)*s);g.moveTo(pad+(x+1-c)*s,pad+(z+c)*s);g.lineTo(pad+(x+c)*s,pad+(z+1-c)*s);g.stroke();g.strokeStyle='#e8364f';g.lineWidth=Math.max(2,s*.15)}}
  if(G.deadX)for(const i of G.deadX){const x=i%N,z=(i/N)|0,c=.3;g.strokeStyle='#e8364f';g.lineWidth=Math.max(1.5,s*.1);g.beginPath();g.moveTo(pad+(x+c)*s,pad+(z+c)*s);g.lineTo(pad+(x+1-c)*s,pad+(z+1-c)*s);g.moveTo(pad+(x+1-c)*s,pad+(z+c)*s);g.lineTo(pad+(x+c)*s,pad+(z+1-c)*s);g.stroke()}
  for(const f of G.flags||[])mapIcon(g,'flag',X(f.x),Z(f.z),s,'#ff5f9e');
  const sense=G.scopeT>0?60:26;
  for(const e of G.ents){if(e.dead)continue;const isT=e.type==='tower',isE=e.type==='eye';if(!(isMon(e)||isT||(isE&&G.seeHidden>0)))continue;if(!(G.seeHidden>0&&isE)&&!(Math.hypot(e.x-h.x,e.z-h.z)<sense&&(G.scopeT>0||los(h.x,h.z,e.x,e.z))))continue;
    if(e.type==='ghost'&&e.hide)continue;mapIcon(g,isT?'tower':e.type,X(e.x),Z(e.z),s*(isT?1.05:1),isT?(e.tk==='ice'?'#a8e8ff':e.tk==='magnet'?'#ff7a8a':e.tk==='spin'?'#ffd35f':MAPCOL.tower):isE?'#fff':MAPCOL[e.type]||'#a46bff')}
  if(G.twin&&!G.mirror)mapIcon(g,'cookie',X(G.twin.x),Z(G.twin.z),s*.9,'#d99a55',.45);
  if(G.decoy){mapIcon(g,'cookie',X(G.decoy.x),Z(G.decoy.z),s*.95,'#d99a55',.5);g.strokeStyle='#7cc6ff';g.setLineDash([s*.2,s*.15]);g.lineWidth=s*.1;g.beginPath();g.moveTo(X(G.decoy.x),Z(G.decoy.z));{const nx=G.decoy.next||cellOf(G.decoy.x,G.decoy.z);g.lineTo(pad+(nx[0]+.5)*s,pad+(nx[1]+.5)*s)}g.stroke();g.setLineDash([])}
  if(G.lure)mapIcon(g,'skel',X(G.lure.x),Z(G.lure.z),s*.8,'#ffb3d6',.8);
  g.save();g.translate(X(h.x),Z(h.z));g.rotate(-h.yaw);g.fillStyle='#3fbf9f';g.strokeStyle='#4a2a1a';g.lineWidth=2;g.beginPath();g.moveTo(0,-s*.45);g.lineTo(s*.32,s*.3);g.lineTo(0,s*.15);g.lineTo(-s*.32,s*.3);g.closePath();g.fill();g.stroke();g.restore()};
drawRival=function(cv){if(G.duo!=='race'||!G.rv)return;const g=cv.getContext('2d'),W=cv.width,pad=W*.05,s=(W-pad*2)/N,h=G.rv.hero;if(h.cloak>0)return;mapIcon(g,'cookie',pad+h.x/C*s,pad+h.z/C*s,s*1.05,'#ff8cc6')};

/* ----- 초코 벽: 가로·세로 고르고 → 칸 누르면 미리보기 → [배치] ----- */
let CHOCO_O=null;
{const pc0=placeChoco;placeChoco=function(x,z){if(!CHOCO_O)return pc0(x,z);const o=CHOCO_O;if(B.walls.filter(w=>w.temp).length>=2)return 'cap';const gx=clamp(Math.round(x/C),1,N-1),gz=clamp(Math.round(z/C),1,N-1);if(G.duo==='ww'&&!wwHalf(gz))return 'half';
  if(allHeroes().some(q=>wallDist(q.x,q.z,o,gx,gz)<WALL_NEAR))return 'near';const h=G.hero,hc=[cellOf(h.x,h.z)];if(G.decoy)hc.push(cellOf(G.decoy.x,G.decoy.z));if(G.duo)for(const c of allCells())hc.push(c);const q=tryWall(o,gx,gz,null,hc);if(q!=='ok')return q;
  const w={o,x:gx,z:gz,temp:G.t+CHOCO_T,anim:{t:0,from:null}};B.walls.push(w);rebuildEdges();syncWallMeshes();SFX.crunch();netEv('choco');if(G.mode==='hero')say('🍫 초코 벽이 솟았어요!',true,1.3);else say('초코 벽을 세웠어요 · 20초',false,1.2);return 'ok'}}
const CHB={o:'H',pend:null,mesh:null};
function chocoBarSync(){const D=G.devil,on=screen==='play'&&G.mode==='devil'&&D&&D.sel!=null&&D.hand[D.sel]==='choco'&&!G.over;$('chocoBar').hidden=!on;if(!on){chocoPrevClear();CHB.pend=null;return}
  for(const b of $('chocoBar').querySelectorAll('[data-o]'))b.classList.toggle('on',b.dataset.o===CHB.o);$('bChocoGo').disabled=!CHB.pend}
function chocoPrevClear(){if(CHB.mesh){drop(CHB.mesh);CHB.mesh=null}}
function chocoPrev(){chocoPrevClear();if(!CHB.pend)return;const[gx,gz]=CHB.pend,o=CHB.o;const m=new THREE.Mesh(new THREE.BoxGeometry(2*C-WT,WH*.7,WT+.25),new THREE.MeshBasicMaterial({color:'#7a4526',transparent:true,opacity:.55,depthWrite:false}));const[x,z,ry]=wallPos({o,x:gx,z:gz});m.position.set(x,WH*.35,z);m.rotation.y=ry;scene.add(m);CHB.mesh=m}
for(const b of $('chocoBar').querySelectorAll('[data-o]'))b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();CHB.o=b.dataset.o;SFX.card();chocoPrev();chocoBarSync()});
$('bChocoGo').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();const D=G.devil;if(!CHB.pend||D.sel==null||D.hand[D.sel]!=='choco')return;const[gx,gz]=CHB.pend;const r=useCard('choco',gx*C,gz*C,{o:CHB.o});if(r!=='ok'){say(WHY[r]||'놓을 수 없어요',false,1.2);SFX.deny();return}D.sel=null;CHB.pend=null;chocoPrevClear();$('dhint').textContent='';buildHand();chocoBarSync()});
{const dt0=devilTap;devilTap=function(x,z,picked){const D=G.devil;if(D.sel!=null&&D.hand[D.sel]==='choco'){const gx=clamp(Math.round(x/C),1,N-1),gz=clamp(Math.round(z/C),1,N-1);if(!CHB.pend){const b=chocoBest(gx,gz);if(b.o)CHB.o=b.o}CHB.pend=[gx,gz];chocoPrev();chocoBarSync();$('dhint').textContent='가로·세로를 고르고 [배치]를 눌러요';SFX.card();return}dt0(x,z,picked)}}
{const sc0=selectCard;selectCard=function(i){sc0(i);CHB.pend=null;chocoPrevClear();const D=G.devil;if(D.sel!=null&&D.hand[D.sel]==='choco')$('dhint').textContent='초코 벽을 세울 곳을 누르고 [배치] · 20초 뒤 녹아요';chocoBarSync()}}
{const bh0=buildHand;buildHand=function(){bh0();try{chocoBarSync()}catch(e){}}}

/* ----- 카드 쓰기 (온라인 마녀 쪽): 초코 방향·새 카드 정보도 같이 보내요 ----- */
const NOPLACE=['fog','move','bell','choco','whirl','eye'];
useCard=function(k,x,z,extra){if(!G.mirror)return applyCard(k,x,z,extra);const D=G.devil;if(D.pt<CARDS[k].cost)return 'pt';if(MONK.includes(k)&&G.t<GRACE)return 'early';
  if(!NOPLACE.includes(k)){const r=canPlaceAt(x,z);if(r!=='ok')return r}
  const msg={t:'card',i:D.hand.indexOf(k),k,x:+x.toFixed(2),z:+z.toFixed(2)};if(k==='move'){msg.wi=B.walls.indexOf(extra.w);msg.o=extra.o;msg.nx=extra.nx;msg.nz=extra.nz}else if(extra&&extra.o)msg.o=extra.o;if(extra&&extra.dir)msg.dir=extra.dir;netSend(msg);SFX.card();return 'ok'};
handleCard=function(d){const D=G.devil;let r;if(!D.hand.includes(d.k))r='gone';else if(D.pt<CARDS[d.k].cost)r='pt';else{let extra=null;if(d.k==='move'){const w=B.walls[d.wi];if(!w)r='gone';else extra={w,o:d.o,nx:d.nx,nz:d.nz}}else if(d.o||d.dir)extra={o:d.o,dir:d.dir};if(!r)r=applyCard(d.k,d.x,d.z,extra)}netSend({t:'cr',r,k:d.k})};

/* ----- 결과: AI 대전은 '뒤로' → 게임 설정 ----- */
const aiPlain=()=>!NET.on&&!G.stage&&!G.chal;
{const re0=resExtra;resExtra=function(win,why,t){re0(win,why,t);if(aiPlain()&&!(typeof SER!=='undefined'&&SER.on))$('bHome').textContent='뒤로'}}
setTimeout(()=>{const bh=$('bHome'),old=bh.onclick;bh.onclick=e=>{if(aiPlain()&&bh.textContent==='뒤로'){clearWorld();roleGo(SET.mode||'hero');return}old&&old(e)}},0);

/* ----- 다시 하기: 장면을 처음 켠 것처럼 ----- */
function freshScene(){G.reveal=false;G.trail=[];G.devilSeesHero=null;G.pathKey='';$('revealBar').hidden=true;for(const l of G.pathLines||[])drop(l);G.pathLines=[];try{for(const m of FORBID)drop(m);FORBID=[];FORBIDK=''}catch(e){}clearWorld();try{clearGhosts()}catch(e){}chocoPrevClear();CHB.pend=null;
  for(const w of B.walls){w.moved=0;w.moved2=0;w.anim=null;w.prev=null}G.devil&&(G.devil.wall2used=0);if(WORLD.arch2)for(const c of WORLD.arch2.children)c.visible=true;if(VM.obj)VM.obj.visible=false;G.shake=0}
{const sd0=startDesign;startDesign=function(){freshScene();sd0();for(const w of B.walls){w.moved=0}}}
{const bm1=beginMatch;beginMatch=function(mode,keep){if(mode==='hero'&&!keep)freshScene();else{G.reveal=false;$('revealBar').hidden=true;x28clear()}bm1(mode,keep);for(const w of B.walls){w.moved=0;w.moved2=0}syncWallMeshes()}}

/* ----- 손에 든 과자: 손이 보이게 ----- */
{const hi0=handItem;handItem=function(id){const o=hi0(id);if(id==='cone'||id==='cotton'||id==='lolli'){const g=new THREE.Group();o.position.y=id==='cone'?.16:.1;o.scale.setScalar(id==='cone'?.85:.9);g.add(o);if(id==='cone'){const st=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.3,8),LM('#f6e3c3'));st.position.y=.1;g.add(st)}return g}return o}}
{const vi0=viewItem;viewItem=function(id){const o=vi0(id);const hand=new THREE.Group();let cl='mint';try{cl=heroLook().cloth}catch(e){}
  const sk=LM(typeof CK!=='undefined'?CK.SKIN:'#f7c59f'),sl=new THREE.MeshLambertMaterial({color:'#ffffff',map:typeof ckClothTex==='function'?ckClothTex(cl in CKCL?cl:'mint',2):null});
  // 1인칭 손: 캐릭터 손처럼 동그랗게
  const palm=new THREE.Mesh(new THREE.SphereGeometry(.17,20,14),sk);hand.add(palm);
  const cuff=new THREE.Mesh(new THREE.CylinderGeometry(.16,.17,.34,18),sl);cuff.position.y=-.3;hand.add(cuff);
  hand.position.set(0,.02,0);hand.scale.setScalar(1/.36*.36);
  hand.traverse(m=>{if(m.isMesh){m.material.depthTest=false;m.material.depthWrite=false;m.renderOrder=21}});o.add(hand);return o}}
{const dg0=duoGo;duoGo=function(m){dg0(m);if(G.cdnWant){G.cdnWant=false;startCountdown()}}}

/* ----- 자동 X 표시 없애기 (도둑이 직접 X를 쳐요) ----- */
markDead=function(){};
/* ----- 도둑은 벽이 움직인 걸 몰라요: 색·소리·알림·움직이는 모습 없이 바로 바뀌어요 ----- */
tintWall=(t0=>function(w){if(G.mode==='hero'&&!G.reveal)return;t0(w)})(tintWall);
{const rv0=revealMap;revealMap=function(){rv0();for(const w of B.walls)if(w.moved)tintWall(w)}}

/* ----- 화면이 작으면 창 전체를 살짝 줄여서 잘리지 않게 ----- */
function fitScr(){for(const s of document.querySelectorAll('.scr:not([hidden]),#augS:not([hidden])')){if(s.id==='shop'||s.id==='deckS'||s.id==='stages')continue;const c=s.id==='augS'?s.querySelector('.ag-box'):s.firstElementChild;if(!c)continue;
  const cs=getComputedStyle(s),avail=s.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-4,availW=s.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);const z=parseFloat(c.style.zoom)||1;c.style.zoom='';const r=c.getBoundingClientRect();
  const natH=r.height,natW=r.width;if(!natH){if(z!==1)c.style.zoom=z;continue}let want=Math.max(.55,Math.min(1,avail/natH,availW/natW));if(want>.97)want=1;c.style.zoom=want<1?want.toFixed(3):''}}
{const sh9=show;show=function(id){sh9(id);requestAnimationFrame(fitScr)}}
addEventListener('resize',()=>requestAnimationFrame(fitScr));setInterval(fitScr,400);
