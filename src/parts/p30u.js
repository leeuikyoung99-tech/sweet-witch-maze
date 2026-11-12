/* ================= 30차 (저): 직접 따라 하는 튜토리얼 (도둑 → 마녀 → 꾸미기 → 카드) ================= */
// 예전 그림 설명은 이제 안 띄워요
SAVE.tut=SAVE.tut||{};SAVE.tut.hero=1;SAVE.tut.devil=1;
const eul=w=>{const c=w.charCodeAt(w.length-1)-0xac00;return w+(c>=0&&c<11172&&c%28?'을':'를')};
const TU={on:false,ph:'',steps:[],i:0,poll:null,tgt:null,allow:null,guard:false};
{const b=document.createElement('div');b.id='tuBub';b.hidden=true;b.innerHTML='<small id="tuProg"></small><b id="tuT"></b><span id="tuS"></span><button class="mbtn berry small" id="tuBtn" hidden><span class="mt"><b>알겠어요</b></span></button>';document.body.appendChild(b);
  const h=document.createElement('div');h.id='tuHand';h.hidden=true;h.innerHTML='<svg viewBox="0 0 48 56" aria-hidden="true"><path d="M18 30 V8 a5 5 0 0 1 10 0 V24 l2-1 a5 5 0 0 1 6 2 l1 1 a5 5 0 0 1 6 3 V40 a14 14 0 0 1-14 14 h-4 a14 14 0 0 1-12-7 L6 37 a5 5 0 0 1 8-6 Z" fill="#fff8ee" stroke="#4a2a1a" stroke-width="3.2" stroke-linejoin="round"/></svg><i></i>';document.body.appendChild(h);const sp=document.createElement('div');sp.id='tuSpot';sp.hidden=true;document.body.appendChild(sp);
  $('tuBtn').onclick=e=>{e.stopPropagation();SFX.click();TU.ok=true}}
// 시간 멈추기: 경기 진행을 잠깐 세워요 (예전 그림 설명이 쓰던 멈춤을 빌려 써요)
function tuPause(on){if(on){if(!TUTON)TUTON={key:'__tu',i:0}}else if(TUTON&&TUTON.key==='__tu'){TUTON=null;G.last=performance.now()}}
// 막아 두기: 지금 가리키는 것 말고는 못 눌러요 (가게·카드 화면에서만)
for(const ev of['pointerdown','click'])document.addEventListener(ev,e=>{if(!TU.on||!TU.guard)return;const t=e.target;if(t.closest('#tuBub')||t.closest('#pgM'))return;
  if(TU.allow&&TU.allow.some(s=>t.closest(s)))return;e.stopPropagation();e.preventDefault();if(ev==='click')SFX.deny()},true);
function tuEl(){const p=TU.tgt;if(!p)return null;const el=typeof p==='function'?p():document.querySelector(p);if(el&&!el.nodeType)return el;return el&&el.isConnected&&el.getClientRects().length?el:null}
// 3D 위치를 화면 좌표로
function tuScr(v){const q=v.clone().project(camera);if(q.z>1)return null;const x=(q.x+1)/2*innerWidth,y=(1-q.y)/2*innerHeight;return{left:x-14,top:y-14,width:28,height:28}}
function tuFrame(){if(!TU.on){$('tuHand').hidden=true;$('tuBub').hidden=true;$('tuSpot').hidden=true;document.body.classList.remove('tu-on');if(TU.glow){TU.glow.classList.remove('tu-glow');TU.glow=null}return}requestAnimationFrame(tuFrame);
  const st=TU.steps[TU.i];if(st&&typeof st.s==='function'){const v=st.s();if($('tuS').textContent!==v)$('tuS').textContent=v}
  const el=tuEl(),H=$('tuHand'),Bb=$('tuBub'),SP=$('tuSpot'),game=TU.ph==='hero'||TU.ph==='devil';document.body.classList.toggle('tu-on',game);
  if(TU.arrow){const a=TU.arrow,k=Math.sin(performance.now()/180)*.6;if(TU.hl)TU.hl.material.opacity=.3+.25*(1+Math.sin(performance.now()/200));a.position.set(a.userData.x+a.userData.dx*k,4.5,a.userData.z+a.userData.dz*k)}
  const r=el?(el.getBoundingClientRect?el.getBoundingClientRect():el):null;
  // 게임 중: 손가락 없이 버튼에 빛나는 테두리
  const gl=game&&el&&el.nodeType?el:null;if(TU.glow!==gl){if(TU.glow)TU.glow.classList.remove('tu-glow');if(gl)gl.classList.add('tu-glow');TU.glow=gl}
  // 메뉴: 주변을 어둡게 하고 누를 곳만 밝게 + 손가락
  const menu=!game&&!!r&&!!el.nodeType;SP.hidden=!menu;H.hidden=!menu;
  Bb.classList.toggle('pos-hb',TU.ph==='hero');Bb.classList.toggle('pos-dl',TU.ph==='devil');Bb.classList.toggle('pos-free',menu);
  if(!menu){Bb.style.left='';Bb.style.top='';return}
  SP.style.left=(r.left-6)+'px';SP.style.top=(r.top-6)+'px';SP.style.width=(r.width+12)+'px';SP.style.height=(r.height+12)+'px';
  const cx=r.left+r.width/2,cy=r.top+r.height/2,rt=cx>innerWidth*.8,up=!rt&&cy>innerHeight*.55;H.classList.toggle('up',up);H.classList.toggle('rt',rt);
  if(rt){H.style.left=Math.round(r.left-54)+'px';H.style.top=Math.round(cy-22)+'px'}else{H.style.left=Math.round(cx-18)+'px';H.style.top=Math.round(up?r.top-60:r.bottom+4)+'px'}
  // 말풍선은 누를 곳 바로 위(안 되면 아래)에
  const bw=Bb.offsetWidth,bh=Bb.offsetHeight,ga=up?70:16,gb=(!up&&!rt)?64:16;let top=r.top-bh-ga;if(top<8)top=r.bottom+gb;if(top+bh>innerHeight-8)top=Math.max(8,innerHeight-bh-8);
  const left=Math.min(Math.max(8,cx-bw/2),innerWidth-bw-8);Bb.style.left=Math.round(left)+'px';Bb.style.top=Math.round(top)+'px'}
function tuSteps(ph,steps){TU.ph=ph;TU.steps=steps;TU.i=-1;tuNext()}
function tuNext(){const pv=TU.steps[TU.i];if(pv&&pv.leave)try{pv.leave()}catch(e){}TU.i++;const st=TU.steps[TU.i];if(!st)return;TU.ok=false;TU.miss=0;tuPause(!!st.pause);if(st.enter)st.enter();
  $('tuBtn').hidden=!st.btn;if(st.btn)$('tuBtn').querySelector('b').textContent=st.btn;$('tuBub').classList.toggle('has-btn',!!st.btn);TU.tgt=st.p||null;TU.allow=st.a||null;TU.guard=!!st.g;
  $('tuProg').textContent=st.pr||'';$('tuT').textContent=st.t;$('tuS').textContent=typeof st.s==='function'?st.s():(st.s||'');$('tuBub').hidden=false;
  const el=tuEl();if(el&&st.g)try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(e){}
  if(TU.i>0)SFX.bell&&SFX.bell()}
function tuTick(){if(!TU.on)return;const st=TU.steps[TU.i];if(!st)return;if(st.g&&st.p){const el=document.querySelector(typeof st.p==='string'?st.p:'_');if(el&&!tuEl())try{el.scrollIntoView({block:'nearest'})}catch(e){}
    // 가리킬 버튼이 3초 넘게 안 보이면 막아 둔 걸 풀어요 (화면이 꼬여도 갇히지 않게)
    if(!tuEl()){TU.miss++;if(TU.miss>20)TU.guard=false}else TU.miss=0}
  if(st.need&&G.devil&&G.mode==='devil'){const c=CARDS[st.need].cost;if(G.devil.pt<c){G.devil.pt=c;buildHand()}}
  try{if(st.d())tuNext()}catch(e){}}
function tuStart(){if(NET.on)return;TU.on=true;TU.ail=AIL;TU.sk=null;G.tutor={side:'hero'};clearInterval(TU.poll);TU.poll=setInterval(tuTick,150);requestAnimationFrame(tuFrame);tuThief()}
{const sc=spawnCandy;spawnCandy=function(){if(TU.on&&TU.ph==='hero')return;return sc.apply(this,arguments)}}
// 벽 밀기 튜토리얼: 가리킨 벽 하나만, 가리킨 방향으로만 밀 수 있어요
{const ws=wallShifts;wallShifts=function(w){const r=ws(w);const o=TU.on&&TU.only;if(!o)return r;if(w!==o.w)return[];return r.filter(q=>q.x===o.q.x&&q.z===o.q.z)}}
function tuSkillsBack(){if(TU.sk){SAVE.skills=TU.sk;TU.sk=null;saveGame()}}
function tuArrowOff(){if(TU.arrow){scene.remove(TU.arrow);TU.arrow=null}if(TU.hl){scene.remove(TU.hl);TU.hl=null}}
function tuStop(done){TU.only=null;tuPause(false);tuArrowOff();tuSkillsBack();TU.on=false;TU.guard=false;TU.tgt=null;clearInterval(TU.poll);G.tutor=null;if(TU.ail!=null){AIL=TU.ail;TU.ail=null}$('tuBub').hidden=true;$('tuHand').hidden=true;
  if(done){const first=SAVE.tutDone!==1;SAVE.tutDone=1;if(first)SAVE.boxes.push(0);saveGame();syncProf();
    $('pgM').hidden=false;$('pgBody').innerHTML=`<div class="kicker">튜토리얼 끝!</div><h2>이제 혼자서도 할 수 있어요</h2><p class="note">${first?'선물로 쿠키 상자를 드려요. 게임을 하면 레벨이 오르고, 10레벨마다 상자를 받아요':'게임을 하면 레벨이 오르고, 10레벨마다 상자를 받아요'}</p><button class="mbtn berry small" id="bTuEnd"><span class="mt"><b>${first?'상자 열기':'확인'}</b></span></button>`;
    $('bTuEnd').onclick=()=>{SFX.click();first?pgBoxes():pgClose()}}}
function tuModal(k,t,s,btn,go){$('pgM').hidden=false;$('pgBody').innerHTML=`<div class="kicker">${k}</div><h2>${t}</h2><p class="note">${s}</p><button class="mbtn berry small" id="bTuGo"><span class="mt"><b>${btn}</b></span></button>`;
  $('bTuGo').onclick=()=>{SFX.click();$('pgM').hidden=true;go()}}
function tuMap(seed,role){resetDuo();restoreStage();G.stage=null;G.chal=null;netLeave();clearWorld();applyTheme('candy');withSeed(seed,()=>autoWalls(Math.round(WMAX()*.5)));rebuildEdges();FIELD.clear();syncWallMeshes();if(!isFull())goFull(true);G.tutor={side:role};beginMatch(role,true)}
// 도둑 튜토리얼: 마녀는 아무것도 안 해요
{const da=devilAI;devilAI=function(dt){if(G.tutor&&G.tutor.side==='hero')return;return da(dt)}}
function tuThief(){$('tuBub').hidden=true;if(!TU.sk)TU.sk=SAVE.skills.slice();if(!SAVE.skills.includes('decoy'))SAVE.skills=['decoy',SAVE.skills.find(k=>k!=='decoy')||'cloak'];
  tuMap(4242,'hero');for(const c of G.candies)drop(c.g);G.candies=[];const h=()=>G.hero;let x0,z0,m0,d0,s0,t0;const DB=()=>$(SKB.decoy);
  const slime=()=>G.ents.find(e=>e.type==='skel'&&!e.dead);const pr=n=>`도둑 ${n}/5`;
  tuSteps('hero',[
    {pr:pr(1),t:'움직여 보세요',s:'왼쪽 아래 조이스틱을 밀면 쿠키 도둑이 걸어요',enter(){x0=h().x;z0=h().z},d:()=>Math.hypot(h().x-x0,h().z-z0)>4},
    {pr:pr(2),t:'사탕을 2개 먹어요',s:'바로 앞 길에 사탕을 놓았어요. 지나가면 먹어요',enter(){m0=h().manaGot;h().mana=0;const[cx,cz]=cellOf(h().x,h().z),P=pathFrom(cx,cz,8);for(const j of[2,4]){const c=P[Math.min(j,P.length-1)];if(c)addCandy(cx2x(c[0]),cx2x(c[1]))}},d:()=>h().manaGot>=m0+2},
    {pr:pr(3),t:'대시를 눌러요',s:'잠깐 아주 빠르게 달리고, 그동안은 다치지 않아요',p:'#bDash',enter(){d0=h().dashes;h().dashCd=0},d:()=>h().dashes>d0},
    {pr:pr(4),t:'포도 슬라임이 나타났어요!',s:'슬라임은 도둑을 쫓아와요',
      enter(){const H=h(),[cx,cz]=cellOf(H.x,H.z),P=pathFrom(cx,cz,12);let c=null,bd=-2;const fx=-Math.sin(H.yaw),fz=-Math.cos(H.yaw);
        // 눈앞에 보이는 칸 중 2.5~4칸 떨어진 곳 (너무 가깝지도 멀지도 않게)
        for(let z=0;z<N;z++)for(let x=0;x<N;x++){const px=cx2x(x),pz=cx2x(z),d=Math.hypot(px-H.x,pz-H.z);if(d<C*2.5||d>C*4)continue;if(!los(H.x,H.z,px,pz))continue;const dot=((px-H.x)*fx+(pz-H.z)*fz)/d;if(dot>bd){bd=dot;c=[x,z]}}
        if(!c)c=P.find((q,k)=>k>=2&&Math.hypot(cx2x(q[0])-H.x,cx2x(q[1])-H.z)>=C*2.5)||P[Math.min(4,P.length-1)];t0=performance.now();try{spawnSkel(cx2x(c[0]),cx2x(c[1]))}catch(e){}},
      d:()=>{const e=slime();return!e||Math.hypot(e.x-h().x,e.z-h().z)<C*2.2||performance.now()-t0>1800}},
    {pr:pr(4),pause:true,btn:'알겠어요',t:'잠깐! 분신으로 슬라임을 속여요',s:'분신은 조이스틱을 민 방향으로 달려가요. 슬라임 쪽으로 보내면 슬라임이 분신을 잡고 펑 하고 터져요',enter(){h().mana=Math.max(h().mana,2);h().cdDecoy=0},d:()=>TU.ok},
    {pr:pr(4),pause:true,t:'조이스틱을 민 채로 분신을 눌러요',s:'왼쪽 아래 조이스틱을 슬라임 쪽으로 밀고, 손을 떼지 말고 분신을 눌러요. 분신이 슬라임에게 달려가서 대신 잡혀요',p:DB,
      enter(){s0=h().skills;h().mana=Math.max(h().mana,2);h().cdDecoy=0;const jh=$('joyHint');if(jh)jh.classList.add('tu-glow')},leave(){const jh=$('joyHint');if(jh)jh.classList.remove('tu-glow')},d:()=>h().skills>s0},
    {pr:pr(4),t:'슬라임이 분신을 쫓아가요!',s:()=>G.stats.decoyFooled?'펑! 분신에 속은 슬라임이 터졌어요':'분신을 잡으면 슬라임은 펑 터져요',enter(){t0=performance.now();this.f0=G.stats.decoyFooled|0},d(){return performance.now()-t0>(G.stats.decoyFooled>this.f0?1800:6000)}},
    {pr:pr(5),t:'지도를 보고 출구로 탈출해요',s:'오른쪽 위 지도에 미로와 출구가 보여요. 지도를 누르면 크게 볼 수 있어요',p:'#map',d:()=>G.over}]);
  TU.end='hero'}
function tuBestWall(){const h=G.hero;const[hx,hz]=cellOf(h.x,h.z);const base=exitField()[idx(hx,hz)];let best=null;
  for(const w of B.walls){if(w.temp||w.anim)continue;for(const q of wallShifts(w)){const o={x:w.x,z:w.z};w.x=q.x;w.z=q.z;rebuildEdges();const L=exitField()[idx(hx,hz)];w.x=o.x;w.z=o.z;if(L>0&&(!best||L>best.L))best={w,q,L}}}
  rebuildEdges();return best&&best.L>base?Object.assign(best,{base}):null}
function tuArrow(w,q){const g=new THREE.Group(),m=new THREE.MeshBasicMaterial({color:'#ff4f9a',depthTest:false,transparent:true,opacity:.95});
  const sh=new THREE.Mesh(new THREE.BoxGeometry(.6,.6,2.2),m);sh.position.z=-.5;const hd=new THREE.Mesh(new THREE.ConeGeometry(1,1.5,18),m);hd.rotation.x=Math.PI/2;hd.position.z=1.3;g.add(sh,hd);
  for(const o of[sh,hd])o.renderOrder=999;const mesh=WORLD.wallMeshes.get(w),p=mesh?mesh.getWorldPosition(new THREE.Vector3()):new THREE.Vector3(w.x*C,0,w.z*C);
  const dx=q.x-w.x,dz=q.z-w.z;g.rotation.y=Math.atan2(dx,dz);g.scale.setScalar(3);g.userData={x:p.x+dx*C*.75,z:p.z+dz*C*.75,dx,dz};g.position.set(g.userData.x,4.5,g.userData.z);scene.add(g);
  if(mesh){const bb=new THREE.Box3().setFromObject(mesh),sz=bb.getSize(new THREE.Vector3()),ct=bb.getCenter(new THREE.Vector3());const hl=new THREE.Mesh(new THREE.BoxGeometry(sz.x+.5,sz.y+.4,sz.z+.5),new THREE.MeshBasicMaterial({color:'#ff4f9a',transparent:true,opacity:.45,depthWrite:false}));hl.position.copy(ct);scene.add(hl);TU.hl=hl}return g}
function tuWitch(){tuSkillsBack();AIL=0;tuMap(139,'devil');G.tutor={side:'devil'};const D=G.devil,h=G.hero;h.hp=45;D.hand=['tower','move','skel','trap'];D.sel=null;buildHand();
  const pay=k=>{D.pt=Math.max(D.pt,CARDS[k].cost)},card=k=>()=>D.sel==null&&$('hand').children[D.hand.indexOf(k)]||null;const has=t=>G.ents.some(e=>e.type===t&&!e.dead);
  const pr=n=>`마녀 ${n}/4`;let bw=null,mv0=0;
  const wallPt=()=>{if(!bw)return null;const m=WORLD.wallMeshes.get(bw.w);return m?tuScr(m.getWorldPosition(new THREE.Vector3()).setY(1.5)):null};
  tuSteps('devil',[
    {pr:pr(1),need:'tower',t:'사탕 대포를 놓아요',s:'카드를 누르고, 미로의 빈 곳을 눌러요',p:card('tower'),enter(){pay('tower');buildHand()},d:()=>has('tower')},
    {pr:pr(2),pause:true,need:'move',t:'벽 밀기 카드를 눌러요',s:'시간을 잠깐 멈췄어요. 벽을 밀어 도둑이 갈 길을 길게 만들어 봐요',p:card('move'),enter(){pay('move');TU.only=null;bw=tuBestWall();TU.only=bw||null;buildHand();mv0=D.played.move|0},d:()=>D.sel!=null&&D.hand[D.sel]==='move'},
    {pr:pr(2),pause:true,need:'move',t:'이 벽을 화살표 쪽으로 쓸어요',s:()=>D.sel==null?'벽 밀기 카드를 다시 눌러요':bw?`이 벽을 밀면 도둑이 갈 길이 ${bw.base}칸에서 ${bw.L}칸으로 길어져요`:'민트빛 벽을 손가락으로 옆으로 쓸어요',
      p:()=>D.sel==null?card('move')():wallPt(),enter(){if(bw)TU.arrow=tuArrow(bw.w,bw.q)},leave(){tuArrowOff();TU.only=null},d:()=>(D.played.move|0)>mv0},
    {pr:pr(2),btn:'계속',t:'길이 길어졌어요!',s:()=>{const[hx,hz]=cellOf(h.x,h.z),L=exitField()[idx(hx,hz)];return`굵은 선이 도둑이 갈 길이에요. 이제 ${L}칸을 돌아가야 해요`},d:()=>TU.ok},
    {pr:pr(3),need:'skel',t:'포도 슬라임을 불러요',s:()=>G.t<GRACE?`시작 15초가 지나면 부를 수 있어요 (${Math.ceil(GRACE-G.t)}초)`:'카드를 누르고 미로를 눌러요. 슬라임이 도둑을 쫓아가요',p:()=>G.t>=GRACE?card('skel')():null,enter(){if(!D.hand.includes('skel')){D.hand[0]='skel'}pay('skel');buildHand()},d:()=>has('skel')},
    {pr:pr(4),t:'도둑을 잡아요!',s:'카드를 더 써서 도둑이 탈출하기 전에 잡아요',d:()=>G.over}]);
  TU.end='devil'}
// 판이 끝나면 결과 화면 대신 다음 단계로
{const em=endMatch;endMatch=function(win,why){const r=em.apply(this,arguments);if(TU.on&&G.tutor&&(TU.end==='hero'||TU.end==='devil')){const side=TU.end;TU.end='';$('tuBub').hidden=true;TU.tgt=null;
  setTimeout(()=>{if(!TU.on)return;$('result').hidden=true;
    if(side==='hero'){if(win)tuModal('도둑 끝!','탈출 성공!','이번엔 마녀가 되어 도둑을 막아 봐요','다음',tuWitch);else tuModal('도둑','다시 해 봐요','출구까지 가면 돼요','다시 하기',tuThief)}
    else tuModal('마녀 끝!',win?'아깝다, 도둑이 탈출했어요':'도둑을 잡았어요!','이제 꾸미기 상점과 카드를 알아봐요','다음',tuShop)},1400)}return r}}
// 튜토리얼 중엔 결과 화면을 아예 띄우지 않아요 (뒤늦게 떠서 다른 화면을 가리지 않게)
{const sh=show;show=function(id){if(TU.on&&id==='result')return;sh(id)}}
// 꾸미기 상점: 옷 하나 사 보기
function tuShop(){G.tutor=null;titleScreen();let it=null;
  const list=SHOPTAB.thief.flatMap(c=>Object.entries(SHOP[c].items).map(([id,[nm,pr]])=>[c,id,nm,pr])).filter(([c,id,,pr])=>pr>0&&!owns(c,id)).sort((a,b)=>a[3]-b[3]);it=list[0]||null;
  const card=Object.keys(GRADE.c).filter(k=>!cardOpen(k)).sort((a,b)=>grOf('c',a)-grOf('c',b))[0]||null;TU.card=card;
  let gift=0;if(!SAVE.tutGift){gift=(it?it[3]:0)+(card?unlPrice('c',card):0);SAVE.tutGift=1;SAVE.coins+=gift;saveGame();syncCoins()}
  const go=()=>{if(!it)return tuDeck();const[c,id,nm,pr]=it,sel=`#shopList .it[data-c="${c}"][data-i="${id}"]`;
    tuSteps('shop',[
      {pr:'상점 1/5',t:'꾸미기를 눌러요',s:'옷과 모자를 사서 꾸밀 수 있어요',p:'#bShop',a:['#bShop'],g:1,d:()=>screen==='shop'},
      {pr:'상점 2/5',t:`${eul(nm)} 골라요`,s:'누르면 미리 입어 볼 수 있어요',p:sel,a:[sel],g:1,enter(){if(SHOPV.tab!=='thief'){SHOPV.tab='thief';SHOPV.sel=null;renderShop();shopStage()}},d:()=>SHOPV.sel&&SHOPV.sel[0]===c&&SHOPV.sel[1]===id},
      {pr:'상점 3/5',t:'사기 버튼을 눌러요',s:`${pr}코인이 들어요`,p:'#bBuy',a:['#bBuy',sel],g:1,d:()=>owns(c,id)},
      {pr:'상점 4/5',t:'적용을 눌러요',s:'산 다음 적용을 눌러야 입혀져요',p:'#bBuy',a:['#bBuy',sel],g:1,d:()=>SAVE.eq[c]===id},
      {pr:'상점 5/5',t:'닫기를 눌러요',s:'이제 쿠키 도둑이 새 옷을 입고 나가요',p:'#bShopX',a:['#bShopX'],g:1,d:()=>screen==='title'},
      {t:'',d:()=>{tuDeck();return false}}])};
  if(gift)tuModal('선물','튜토리얼 선물 '+gift+'코인',`꾸미기 하나와 카드 하나를 살 수 있어요`,'받기',go);else go()}
// 카드·스킬: 카드 하나 열고 덱에 넣기
function tuDeck(){const k=TU.card;
  const steps=[{pr:'카드 1/5',t:'카드·스킬을 눌러요',s:'싸움에 들고 갈 카드를 고르는 곳이에요',p:'#bDeck',a:['#bDeck'],g:1,d:()=>screen==='deckS',enter(){DECKV.tab='witch'}}];
  if(k){const nm=CARDS[k].n,ps=`#deckPool .dk[data-k="${k}"]`,g=grOf('c',k);
    steps.push(
      {pr:'카드 2/5',t:`${eul(nm)} 눌러요`,s:`${GR_N[g]} 카드는 ${GR_P[g]}코인이에요. 등급이 높을수록 비싸요`,p:ps,a:[ps,'#deckTabs'],g:1,enter(){if(DECKV.tab!=='witch'){DECKV.tab='witch';renderDeck()}},d:()=>!!document.querySelector('#deckSel .dk-buy')||cardOpen(k)},
      {pr:'카드 3/5',t:'코인으로 열어요',s:'한 번 열면 계속 쓸 수 있어요',p:'#deckSel .dk-buy',a:['#deckSel .dk-buy'],g:1,d:()=>cardOpen(k)},
      {pr:'카드 4/5',t:`${eul(nm)} 한 번 더 눌러요`,s:'덱에 넣을 카드를 골라요',p:ps,a:[ps],g:1,enter(){renderDeck()},d:()=>SAVE.deck.includes(k)||(DECKV.pick&&DECKV.pick.k===k)},
      {pr:'카드 5/5',t:'뺄 카드를 눌러요',s:'위쪽 덱에서 누른 카드와 바뀌어요',p:'#deckTop .dk[data-a="top"]',a:['#deckTop .dk[data-a="top"]'],g:1,d:()=>SAVE.deck.includes(k)})}
  steps.push({pr:'',t:'닫기를 눌러요',s:'이제 새 카드로 싸울 수 있어요',p:'#bDeckX',a:['#bDeckX'],g:1,d:()=>screen==='title'},{t:'',d:()=>{tuStop(true);return false}});
  tuSteps('deck',steps)}
// 튜토리얼 중엔 처음 화면에서 다른 창이 뜨지 않게, 끝나지 않았으면 처음 화면에서 다시 물어봐요
{const ts=titleScreen;titleScreen=function(){if(TU.on&&(TU.ph==='hero'||TU.ph==='devil')&&TU.end){tuStop(false)}const r=ts.apply(this,arguments);
  try{if(!TU.on&&SAVE.nick&&!SAVE.tutDone&&!window.__simFast&&!window.__aiBoth)setTimeout(()=>{if(screen==='title'&&$('pgM').hidden&&!TU.on)obAsk()},400)}catch(e){}return r}}

{const st=document.createElement('style');st.textContent=`
#tuBub{position:fixed;z-index:40;left:50%;transform:translateX(-50%);top:calc(64px + env(safe-area-inset-top,0px));max-width:min(440px,60vw);background:#fff8ee;border:3px solid var(--choco);border-radius:16px;box-shadow:0 4px 0 var(--choco);padding:6px 14px 8px;display:flex;flex-direction:column;align-items:center;gap:1px;text-align:center;pointer-events:none;color:var(--choco)}
#tuBub.pos-hb{top:auto;bottom:calc(8px + env(safe-area-inset-bottom,0px));max-width:min(400px,46vw)}
#tuBub.pos-dl{left:max(10px,env(safe-area-inset-left,0px));transform:none;top:max(140px,40vh);max-width:min(200px,24vw)}
#tuBub.pos-free{transform:none;max-width:min(360px,80vw)}
#tuSpot{position:fixed;z-index:39;border-radius:16px;border:3px solid #ff4f9a;box-shadow:0 0 0 200vmax rgba(60,30,15,.5);pointer-events:none;animation:tuSpotP 1s ease-in-out infinite}
@keyframes tuSpotP{0%,100%{border-color:#ff4f9a}50%{border-color:#fff}}
body.tu-on #hint{visibility:hidden}
#tuBub.at-b{top:auto;bottom:calc(14px + env(safe-area-inset-bottom,0px))}
#tuBub.at-r{left:auto;right:max(16px,env(safe-area-inset-right,0px));transform:none}#tuBub.at-l{left:max(16px,env(safe-area-inset-left,0px));transform:none}
#tuBub #tuBtn{pointer-events:auto;margin-top:6px}#tuBub.has-btn{max-width:min(460px,70vw)}
#tuBub small{font:11px var(--f-display);color:#ff5f9e}#tuBub small:empty{display:none}
#tuBub b{font:clamp(16px,4.8vh,20px) var(--f-display);line-height:1.2}
#tuBub span{font-size:clamp(12px,3.4vh,14px);line-height:1.35;word-break:keep-all}#tuBub span:empty{display:none}
#tuHand{position:fixed;z-index:41;width:36px;height:44px;pointer-events:none;animation:tuTap 1s ease-in-out infinite}
#tuHand svg{width:100%;height:100%;filter:drop-shadow(0 2px 0 #4a2a1a55)}
#tuHand.up svg{transform:rotate(180deg)}
#tuHand i{position:absolute;left:50%;top:-6px;width:26px;height:26px;margin-left:-13px;border-radius:50%;border:3px solid #ff5f9e;animation:tuRing 1s ease-out infinite}
#tuHand.up i{top:auto;bottom:-6px}
@keyframes tuTap{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
#tuHand.up{animation-name:tuTapU}@keyframes tuTapU{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
#tuHand.rt svg{transform:rotate(90deg)}#tuHand.rt i{top:50%;left:auto;right:-14px;margin:-13px 0 0}#tuHand.rt{animation-name:tuTapR}@keyframes tuTapR{0%,100%{transform:translateX(0)}50%{transform:translateX(8px)}}
.tu-glow{animation:tuGlow 1s ease-in-out infinite!important;z-index:5}
@keyframes tuGlow{0%,100%{box-shadow:0 0 0 3px #ff4f9a,0 0 0 0 #ff4f9a99}50%{box-shadow:0 0 0 4px #ff4f9a,0 0 0 12px #ff4f9a00}}
@keyframes tuRing{0%{transform:scale(.4);opacity:1}100%{transform:scale(1.5);opacity:0}}`;document.head.appendChild(st)}
