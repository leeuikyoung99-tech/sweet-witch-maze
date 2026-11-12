/* ================= 28차 (나): 몬스터는 예고 → 한 번 공격 → 사라져요 · 새 몬스터·포탑·카드 ================= */
MONK.push('soldier','spider');TURK.push('spin');
Object.assign(CARDS,{soldier:{n:'쿠키 병정',ic:'💂',cost:3},spider:{n:'젤리 거미',ic:'🕷️',cost:3},spin:{n:'막대사탕 회전날',ic:'🍭',cost:4},eye:{n:'마녀의 눈',ic:'👁️',cost:2}});
CPOOL.push('soldier','spider','spin','eye');
Object.assign(KIND,{soldier:'mon',spider:'mon',spin:'tur',eye:'set'});
Object.assign(TCODE,{soldier:14,spider:15,spin:16,eye:17});CTYPE.push('soldier','spider','spin','eye');
Object.assign(CARD_DESC,{skel:'높이 뛰어올라 떨어져요 · 바닥 그림자를 보고 대시로 피해요',ghost:'벽을 뚫고 와서 "부우!" · 바닥 원 밖으로 나가면 토라져서 사라져요',bat:'눈이 빨개지면 선을 따라 돌진 · 옆으로 비켜요',bear:'느리게 걸어와 팔을 들면 앞을 후려쳐요 · 뒤로 물러나요',
  soldier:'통로를 왔다 갔다 순찰 · 앞 시야에 들키면 창으로 찔러요 · 등 뒤로 몰래 지나가요',spider:'벽 위를 기어 다니다 조준선을 따라 거미줄을 쏴요 (2초 느림)',spin:'통로 한 칸에서 막대사탕이 빙글빙글 · 빈틈을 보고 지나가요',eye:'감시 사탕을 놔요 · 시야에 들키면 위치가 알려지고 몬스터가 5초 빨라져요',
  tower:'보이는 도둑에게 2.5초마다 사탕을 쏴요',fake:'먹으면 들키고 인간쿠키가 나와요'});
ART.soldier='<svg viewBox="0 0 64 64"><rect x="22" y="4" width="20" height="18" rx="5" fill="#e8364f" stroke="#4a2a1a" stroke-width="3"/><rect x="20" y="20" width="24" height="5" rx="2" fill="#ffd35f" stroke="#4a2a1a" stroke-width="2"/><circle cx="32" cy="32" r="10" fill="#d99a55" stroke="#4a2a1a" stroke-width="3"/><circle cx="28" cy="31" r="2" fill="#4a2a1a"/><circle cx="36" cy="31" r="2" fill="#4a2a1a"/><path d="M28 36 q4 3 8 0" stroke="#fff" stroke-width="2" fill="none"/><path d="M20 60 v-14 q0-6 12-6 q12 0 12 6 v14z" fill="#d99a55" stroke="#4a2a1a" stroke-width="3"/><path d="M22 48 h20" stroke="#fff" stroke-width="2.5" stroke-dasharray="3 3"/><path d="M52 60 V14" stroke="#fff8ee" stroke-width="3.5"/><path d="M52 6 l5 10 h-10z" fill="#ffd35f" stroke="#4a2a1a" stroke-width="2"/></svg>';
ART.spider='<svg viewBox="0 0 64 64"><g stroke="#2f9c7c" stroke-width="3.5" stroke-linecap="round" fill="none"><path d="M24 34 q-10-8-18-2 M24 38 q-12 0-18 8 M26 42 q-8 8-12 16 M40 34 q10-8 18-2 M40 38 q12 0 18 8 M38 42 q8 8 12 16"/></g><ellipse cx="32" cy="36" rx="14" ry="12" fill="#9eecd4" stroke="#4a2a1a" stroke-width="3"/><circle cx="27" cy="34" r="3.4" fill="#fff"/><circle cx="37" cy="34" r="3.4" fill="#fff"/><circle cx="27" cy="35" r="1.8" fill="#2a1640"/><circle cx="37" cy="35" r="1.8" fill="#2a1640"/><ellipse cx="26" cy="28" rx="4" ry="2" fill="#fff" opacity=".7"/><path d="M32 4 V24" stroke="#fff" stroke-width="2" stroke-dasharray="2 2"/></svg>';
ART.spin='<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 4"/><g transform="rotate(-25 32 32)"><rect x="6" y="29" width="52" height="6" rx="3" fill="#fff8ee" stroke="#4a2a1a" stroke-width="2"/><circle cx="9" cy="32" r="7" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="2.5"/><circle cx="55" cy="32" r="7" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="2.5"/></g><circle cx="32" cy="32" r="6" fill="#ffd35f" stroke="#4a2a1a" stroke-width="2.5"/><path d="M50 10 a20 20 0 0 1 6 8 M14 54 a20 20 0 0 1-6-8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';
ART.eye='<svg viewBox="0 0 64 64"><path d="M32 30 L6 58 h52z" fill="#d9c2ff" opacity=".6"/><path d="M32 54 v-14" stroke="#fff8ee" stroke-width="4"/><ellipse cx="32" cy="24" rx="17" ry="13" fill="#fff" stroke="#4a2a1a" stroke-width="3"/><circle cx="32" cy="25" r="7" fill="#9b6bff" stroke="#4a2a1a" stroke-width="2"/><circle cx="32" cy="25" r="3" fill="#2a1640"/><circle cx="29" cy="22" r="1.6" fill="#fff"/><path d="M18 14 l-4-5 M32 10 v-6 M46 14 l4-5" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>';
const DMG2={skel:13,bat:11,bear:27,soldier:16};
Object.assign(MONP,{soldier:{dmg:20,reach:0,r:.9,spd:2.4,life:40,msg:'쿠키 병정의 창에 찔렸어요!'},spider:{dmg:0,reach:0,r:.8,spd:3.2,life:35,msg:'거미줄에 걸렸어요! 2초 느려져요'}});
MONP.bat.life=22;MONP.ghost.life=26;MONP.bear.life=34;

/* ----- 모델: 쿠키 병정 · 젤리 거미 ----- */
function soldierModel(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);monShadow(g,.8);
  const ck=new THREE.MeshLambertMaterial({color:C[0]}),ic=LM('#fffaf2'),red=LM(C[1]),gold=LM('#ffd35f');
  const torso=new THREE.Mesh(new THREE.CylinderGeometry(.62,.7,1.5,18),ck);torso.position.y=1.15;body.add(torso);
  const belt=new THREE.Mesh(new THREE.TorusGeometry(.66,.07,6,20),ic);belt.rotation.x=Math.PI/2;belt.position.y=1.0;body.add(belt);
  for(const y of[1.3,1.6]){const b=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),red);b.position.set(0,y,.66);body.add(b)}
  for(const s of[-1,1]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,.55,10),ck);leg.position.set(s*.3,.28,0);body.add(leg);const arm=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.9,10),ck);arm.position.set(s*.78,1.35,0);arm.rotation.z=s*.25;body.add(arm)}
  const head=new THREE.Mesh(new THREE.SphereGeometry(.62,18,14),ck);head.position.y=2.35;body.add(head);
  const hat=new THREE.Mesh(new THREE.CylinderGeometry(.5,.55,1.1,18),red);hat.position.y=3.15;body.add(hat);const brim=new THREE.Mesh(new THREE.TorusGeometry(.55,.07,6,20),gold);brim.rotation.x=Math.PI/2;brim.position.y=2.65;body.add(brim);
  const pom=new THREE.Mesh(new THREE.SphereGeometry(.16,10,8),gold);pom.position.y=3.78;body.add(pom);
  const icing=new THREE.Mesh(new THREE.TorusGeometry(.25,.035,6,14,Math.PI),ic);icing.rotation.z=Math.PI;icing.position.set(0,2.18,.58);body.add(icing);
  // 창: 막대 + 캔디콘 끝
  const spear=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,3.2,8),LM('#fff8ee'));st.position.y=1.6;spear.add(st);const tip=new THREE.Mesh(new THREE.ConeGeometry(.2,.55,10),gold);tip.position.y=3.4;spear.add(tip);const tip2=new THREE.Mesh(new THREE.ConeGeometry(.21,.25,10),LM('#ff8a3d'));tip2.position.y=3.17;spear.add(tip2);
  spear.position.set(.95,.3,.15);body.add(spear);
  monFace(body,2.38,.6,.95,'smile');const m=mkMon(g,body,[ck]);m.walk=true;m.spear=spear;return m}
function spiderModel(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  const mat=new THREE.MeshPhongMaterial({color:C[0],emissive:new THREE.Color(C[1]),emissiveIntensity:.2,shininess:100,specular:new THREE.Color('#ffffff'),transparent:true,opacity:.9});
  const b=new THREE.Mesh(new THREE.SphereGeometry(.85,20,14),mat);b.scale.set(1,.75,1.1);b.position.y=.7;body.add(b);
  const hd=new THREE.Mesh(new THREE.SphereGeometry(.5,16,12),mat);hd.position.set(0,.75,.9);body.add(hd);
  const lm=LM(C[1]),legs=[];for(const s of[-1,1])for(let k=0;k<4;k++){const leg=new THREE.Group();const a=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.9,6),lm);a.rotation.z=s*1.1;a.position.set(s*.4,.15,0);leg.add(a);const c=new THREE.Mesh(new THREE.CylinderGeometry(.05,.04,.8,6),lm);c.rotation.z=-s*.5;c.position.set(s*.9,-.25,0);leg.add(c);leg.position.set(s*.55,.7,-.45+k*.32);leg.rotation.y=s*(-.5+k*.33);body.add(leg);legs.push(leg)}
  monFace(body,.85,1.33,.7,'smile');const m=mkMon(g,body,[mat]);m.legs=legs;m.walk=true;return m}
MSKIN.soldier={ginger:['#d99a55','#e8364f']};MSKIN.spider={mint:['#9eecd4','#2f9c7c']};
{const mm0=monModel;monModel=function(k,skin){if(k==='soldier'){const id=skin||wl('soldier')||'ginger';return soldierModel((MSKIN.soldier[id]||MSKIN.soldier.ginger))}if(k==='spider'){const id=skin||wl('spider')||'mint';const m=spiderModel(MSKIN.spider[id]||MSKIN.spider.mint);m.g.scale.setScalar(1.1);return m}return mm0(k,skin)}}
{const mf0=monFly;monFly=function(e){mf0(e);if(e.type==='spider'){e.g.position.y=WH+.05;const L=e.m.legs;if(L)L.forEach((l,i)=>l.rotation.x=Math.sin(G.t*12+i*1.3)*.25)}}}

/* ----- 예고 표시 (바닥에 빨간 그림) ----- */
const TELEM={};function teleMat(c,o){const k=c+o;return TELEM[k]||(TELEM[k]=keepM(new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o,depthWrite:false,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-6,fog:false})))}
function teleMesh(T){const g=new THREE.Group(),col=T.col||'#ff3d5a';let base,fill;
  if(T.kind==='circle'){base=new THREE.Mesh(new THREE.CircleGeometry(T.r,32),teleMat(col,.22));fill=new THREE.Mesh(new THREE.RingGeometry(T.r*.94,T.r,32),teleMat(col,.85));const f2=new THREE.Mesh(new THREE.CircleGeometry(T.r,32),teleMat(col,.3));g.add(f2);T.grow=f2}
  else if(T.kind==='line'){base=new THREE.Mesh(new THREE.PlaneGeometry(T.w,T.len),teleMat(col,.22));base.position.y=0;base.geometry.translate(0,T.len/2,0);const f2=new THREE.Mesh(new THREE.PlaneGeometry(T.w,T.len).translate(0,T.len/2,0),teleMat(col,.32));g.add(f2);T.grow=f2;fill=new THREE.Mesh(new THREE.PlaneGeometry(T.w+.25,.25).translate(0,T.len,0),teleMat(col,.85))}
  else{base=new THREE.Mesh(new THREE.CircleGeometry(T.r,24,Math.PI/2-T.half,T.half*2),teleMat(col,.22));const f2=new THREE.Mesh(new THREE.CircleGeometry(T.r,24,Math.PI/2-T.half,T.half*2),teleMat(col,.32));g.add(f2);T.grow=f2;fill=new THREE.Mesh(new THREE.RingGeometry(T.r*.93,T.r,24,1,Math.PI/2-T.half,T.half*2),teleMat(col,.85))}
  g.add(base);g.add(fill);g.rotation.x=-Math.PI/2;
  const wrap=new THREE.Group();wrap.add(g);g.rotation.z=0;wrap.position.set(T.x,.14,T.z);
  // 평면 위 방향: ang=atan2(dx,dz) → 화면에서 +y(평면)이 그 방향을 보게
  if(T.kind!=='circle')g.rotation.z=T.ang+Math.PI;T.grow.scale.setScalar(.01);return x28add(wrap)}
function teleSet(T,p){if(!T.mesh)return;const k=Math.max(.01,Math.min(1,p));if(T.kind==='line')T.grow.scale.set(1,k,1);else T.grow.scale.setScalar(k)}
function teleKill(e){if(e.tele&&e.tele.mesh){drop(e.tele.mesh);const i=X28.list.indexOf(e.tele.mesh);if(i>=0)X28.list.splice(i,1)}e.tele=null}
const angTo=(ax,az,bx,bz)=>Math.atan2(bx-ax,bz-az);
function inTele(T,x,z,pad){const dx=x-T.x,dz=z-T.z;pad=pad||0;if(T.kind==='circle')return Math.hypot(dx,dz)<T.r+pad;
  if(T.kind==='line'){const ux=Math.sin(T.ang),uz=Math.cos(T.ang),along=dx*ux+dz*uz,side=Math.abs(dx*uz-dz*ux);return along>-.6&&along<T.len+.5&&side<T.w/2+pad}
  const d=Math.hypot(dx,dz);if(d>T.r+pad)return false;if(d<.8)return true;let a=Math.atan2(dx,dz)-T.ang;a=Math.atan2(Math.sin(a),Math.cos(a));return Math.abs(a)<T.half+.08}
function vanish(e,msg){teleKill(e);if(e.dead)return;e.dead=.5;e.g.visible=true;burstFx(e.x,e.z,e.type==='ghost'?'smoke':e.type);play(e.m,'Death_A',.15,true);if(msg&&meLoud())say(msg,false,1.1,true)}

/* ----- 쿠키 병정: 통로 순찰 ----- */
function soldierPath(e){const[cx,cz]=cellOf(e.x,e.z);let best=null,bl=-1;for(const[dx,dz]of[[1,0],[0,1]]){let a=0,b=0;while(a<6&&inM(cx+dx*(a+1),cz+dz*(a+1))&&canStep(cx+dx*a,cz+dz*a,dx,dz))a++;while(b<6&&inM(cx-dx*(b+1),cz-dz*(b+1))&&canStep(cx-dx*b,cz-dz*b,-dx,-dz))b++;if(a+b>bl){bl=a+b;best=[[cx-dx*b,cz-dz*b],[cx+dx*a,cz+dz*a]]}}
  e.pat=best;e.patI=1;if(bl<=0)e.pat=null}
const VIS={r:9,half:.55};
function visCone(e){const m=new THREE.Mesh(new THREE.CircleGeometry(VIS.r,24,Math.PI/2-VIS.half,VIS.half*2),teleMat('#ffd35f',.18));m.rotation.x=-Math.PI/2;m.rotation.z=Math.PI;m.position.y=.13;e.g.add(m);e.vis=m}
/* ----- 젤리 거미: 벽 위 길 ----- */
function wallEdge(ax,az,bx,bz){// 격자점 (ax,az)-(bx,bz) 사이에 벽이 있나
  if(ax===bx){const z=Math.min(az,bz),x=ax;if(x<=0||x>=N||z<0||z>=N)return false;return !canStep(x-1,z,1,0)&&(inM(x-1,z)||inM(x,z))}
  const x=Math.min(ax,bx),z=az;if(z<=0||z>=N||x<0||x>=N)return false;return !canStep(x,z-1,0,1)&&(inM(x,z-1)||inM(x,z))}
function spiderNext(e){const h=G.hero,[a,b]=e.node,opts=[];for(const[dx,dz]of DIRS){const nx=a+dx,nz=b+dz;if(!wallEdge(a,b,nx,nz))continue;if(e.prevN&&e.prevN[0]===nx&&e.prevN[1]===nz)continue;opts.push([nx,nz])}
  if(!opts.length){if(e.prevN&&wallEdge(a,b,e.prevN[0],e.prevN[1]))opts.push(e.prevN);else return null}
  opts.sort((p,q)=>Math.hypot(p[0]*C-h.x,p[1]*C-h.z)-Math.hypot(q[0]*C-h.x,q[1]*C-h.z)+(Math.random()-.5)*6);return opts[0]}
function spiderSnap(e){let best=null,bd=1e9;for(let gz=1;gz<N;gz++)for(let gx=1;gx<N;gx++){const d=Math.hypot(gx*C-e.x,gz*C-e.z);if(d<bd&&DIRS.some(([dx,dz])=>wallEdge(gx,gz,gx+dx,gz+dz))){bd=d;best=[gx,gz]}}e.node=best;e.nxt=null;if(best){e.x=best[0]*C;e.z=best[1]*C}}

{const sm0=spawnMon;spawnMon=function(k,x,z){const e=sm0(k,x,z);e.ph='chase';if(k==='soldier'){soldierPath(e);visCone(e);e.target='hero'}if(k==='spider'){spiderSnap(e);e.target='hero'}if(k==='bear')e.target='hero';return e}}
{const ss0=spawnSkel;spawnSkel=function(x,z){const e=ss0(x,z);e.ph='chase';e.dmg=DMG2.skel;return e}}

/* ----- 마녀의 눈 ----- */
function spawnEye(x,z,dir){const[cx,cz]=cellOf(x,z);x=cx2x(cx);z=cx2x(cz);let ang=dir!=null?dir:null;
  if(ang==null){let bl=-1;for(const[dx,dz]of DIRS){let n=0;while(n<5&&inM(cx+dx*(n+1),cz+dz*(n+1))&&canStep(cx+dx*n,cz+dz*n,dx,dz))n++;if(n>bl){bl=n;ang=Math.atan2(dx,dz)}}}
  const g=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,1.6,8),LM('#fff8ee'));st.position.y=.8;g.add(st);
  const ball=new THREE.Mesh(new THREE.SphereGeometry(.55,16,12),LM('#ffffff'));ball.position.y=1.9;g.add(ball);const iris=new THREE.Mesh(new THREE.SphereGeometry(.3,12,10),LM('#9b6bff'));iris.position.set(0,1.9,.36);g.add(iris);const pu=new THREE.Mesh(new THREE.SphereGeometry(.15,10,8),new THREE.MeshBasicMaterial({color:'#2a1640'}));pu.position.set(0,1.9,.6);g.add(pu);
  const cone=new THREE.Mesh(new THREE.CircleGeometry(10,24,Math.PI/2-.5,1),teleMat('#b98cff',.2));cone.rotation.x=-Math.PI/2;cone.rotation.z=Math.PI;cone.position.y=.12;g.add(cone);
  g.position.set(x,0,z);g.rotation.y=ang;scene.add(g);const e={id:++G.eid,type:'eye',x,z,r:.4,life:60,g,ang,face:ang,cd:0,half:.5,rng:10};G.ents.push(e);SFX.place();return e}
WHY.eyecap='마녀의 눈은 2개까지예요';
{const ac1=applyCard;applyCard=function(k,x,z,extra){const D=G.devil;
  if(k==='eye'){if(count('eye')>=2)return 'cap';if(x<.5||z<.5||x>N*C-.5||z>N*C-.5)return 'out';const r=canPlaceAt(x,z);if(r!=='ok')return r;const[ex,ez]=cellOf(x,z);if(G.ents.some(q=>q.type==='eye'&&cellOf(q.x,q.z).join()===ex+','+ez))return 'busy';spawnEye(x,z,extra&&extra.dir);
    D.pt-=CARDS[k].cost;D.played[k]=(D.played[k]||0)+1;const i=D.hand.indexOf(k);D.hand.splice(i,1);D.deck.push(k);D.hand.splice(i,0,D.deck.shift());return 'ok'}
  return ac1(k,x,z,extra)}}

/* ----- 갱신 (몬스터 부분을 새로) ----- */
const TELE_T={skel:.7,ghost:.8,bat:1,bear:.8,soldier:.6,spider:1};
function heroVisible(h){return h.cloak<=0||h.reveal>0}
function startTele(e,tx,tz){const T={t:0,d:TELE_T[e.type]*(G.aug&&G.aug.slowTele?1.2:1),fx:e.x,fz:e.z};
  if(e.type==='skel')Object.assign(T,{kind:'circle',x:tx,z:tz,r:2.3});
  else if(e.type==='ghost')Object.assign(T,{kind:'circle',x:e.x,z:e.z,r:2.6,col:'#b98cff'});
  else if(e.type==='bat'){const a=angTo(e.x,e.z,tx,tz);Object.assign(T,{kind:'line',x:e.x,z:e.z,ang:a,len:13,w:1.7})}
  else if(e.type==='soldier'){const a=angTo(e.x,e.z,tx,tz),L=Math.min(10,Math.hypot(tx-e.x,tz-e.z)+2.5);Object.assign(T,{kind:'line',x:e.x,z:e.z,ang:a,len:L,w:1.5})}
  else if(e.type==='spider'){const a=angTo(e.x,e.z,tx,tz);Object.assign(T,{kind:'line',x:e.x,z:e.z,ang:a,len:15,w:1.3,col:'#2fbf93'})}
  else if(e.type==='bear'){const a=angTo(e.x,e.z,tx,tz);Object.assign(T,e.roar?{kind:'circle',x:e.x,z:e.z,r:5.2}:{kind:'cone',x:e.x,z:e.z,ang:a,r:5,half:.9})}
  e.tele=T;e.ph='tele';T.mesh=teleMesh(T);e.face=T.ang!=null?T.ang:e.face;e.m.state='atk';e.m.t=0;
  if(e.type==='bat'||e.type==='spider')SFX.clack();if(e.type==='ghost'&&meLoud())tone(300,.5,'sine',.08,0,200)}
function resolveTele(e){const h=G.hero,T=e.tele;const hitHero=!(h.dashT>0)&&inTele(T,h.x,h.z,.2)&&!(G.mirror);
  const dec=G.decoy&&inTele(T,G.decoy.x,G.decoy.z,.2);
  if(e.type==='skel'){e.x=T.x;e.z=T.z;e.g.position.set(e.x,0,e.z);G.shake=Math.max(G.shake,.2);SFX.squish();
    if(hitHero&&hurt(e,DMG2.skel,'슬라임에게 철퍼덕 깔렸어요!')){}else if(dec)popDecoy(true);vanish(e);return}
  if(e.type==='ghost'){if(hitHero&&!(h.inv>0)){h.root=Math.max(h.root,1);h.dashCd=Math.max(h.dashCd,1);h.inv=Math.max(h.inv,.3);SFX.bonk();netEv('boo');if(meLoud())say('👻 부우! 깜짝 놀라 1초 멈췄어요',true,1.3);G.stats.hits++;vanish(e)}else vanish(e,'유령이 토라져서 사라졌어요');return}
  if(e.type==='bear'){if(hitHero&&hurt(e,DMG2.bear,'젤리 곰에게 튕겨 나갔어요!')){h.kx*=2.2;h.kz*=2.2}else if(dec&&!e.roar)popDecoy(true);vanish(e);return}
  if(e.type==='bat'||e.type==='soldier'){e.ph='dash';e.dashL=T.len;e.dashGo=0;e.hitOnce=false;teleKill(e);e.tele=T;return}
  if(e.type==='spider'){const g=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),LM('#e9fff8'));g.position.set(e.x,WH,e.z);x28add(g);(G.webs=G.webs||[]).push({x:e.x,z:e.z,y:WH,vx:Math.sin(T.ang)*18,vz:Math.cos(T.ang)*18,life:15/18,g,id:++G.eid});SFX.pew();vanish(e);return}}
function dashTick(e,dt){const T=e.tele,h=G.hero,sp=e.type==='bat'?26:22,st=sp*dt;const nx=e.x+Math.sin(T.ang)*st,nz=e.z+Math.cos(T.ang)*st;
  const wallHit=e.type!=='bat'&&!los(e.x,e.z,nx,nz);e.dashGo+=st;if(!wallHit){e.x=nx;e.z=nz}
  if(!e.hitOnce&&!G.mirror&&Math.hypot(h.x-e.x,h.z-e.z)<1.25+(e.type==='bat'?0:.15)){e.hitOnce=true;if(hurt(e,DMG2[e.type],e.type==='bat'?'사탕 박쥐에게 쪼였어요!':'쿠키 병정의 창에 찔렸어요!')){}}
  if(G.decoy&&Math.hypot(G.decoy.x-e.x,G.decoy.z-e.z)<1.3)popDecoy(true);
  e.g.position.set(e.x,0,e.z);monFly(e);e.g.rotation.y=T.ang;if(e.dashGo>=e.dashL||wallHit)vanish(e)}
function monTick(e,dt,i){const h=G.hero;e.m.mixer.update(dt);
  if(e.dead){e.dead-=dt;if(e.dead<=0){teleKill(e);drop(e.g);G.ents.splice(i,1)}return 0}
  if(e.life<=0||e.lostT>3){vanish(e);return 0}
  e.clack-=dt;if(e.clack<=0){e.clack=1.6+Math.random()*2;if(meLoud()&&Math.hypot(e.x-h.x,e.z-h.z)<22)SFX.clack()}
  if(e.ph==='tele'){const T=e.tele;T.t+=dt;teleSet(T,T.t/T.d);
    if(e.type==='skel'){const k=Math.min(1,T.t/T.d);e.x=lerp(T.fx,T.x,k);e.z=lerp(T.fz,T.z,k);e.g.position.set(e.x,Math.sin(k*Math.PI)*5.5+(k>.85?0:0),e.z)}
    else if(e.type==='soldier'&&e.m.spear){e.m.spear.rotation.x=-Math.min(1,T.t/T.d)*1.2}
    else{e.g.position.set(e.x,0,e.z);monFly(e)}
    if(e.type!=='skel')e.g.rotation.y=T.ang!=null?T.ang:e.face;
    if(T.t>=T.d)resolveTele(e);return 0}
  if(e.ph==='dash'){dashTick(e,dt);return 0}
  if(e.stun>0){e.stun-=dt;if(e.stun<=0)play(e.m,'Running_A');e.g.position.set(e.x,0,e.z);monFly(e);return 0}
  const hv=heroVisible(h),haste=(G.hasteT>0?1.4:1);
  // 쿠키 병정: 순찰하다 시야(부채꼴)에 보이면 찌르기
  if(e.type==='soldier'){const d=Math.hypot(h.x-e.x,h.z-e.z);let a=Math.atan2(h.x-e.x,h.z-e.z)-e.face;a=Math.atan2(Math.sin(a),Math.cos(a));
    if(hv&&d<VIS.r&&Math.abs(a)<VIS.half&&los(e.x,e.z,h.x,h.z)){startTele(e,h.x,h.z);return 0}
    if(G.decoy){const dd=Math.hypot(G.decoy.x-e.x,G.decoy.z-e.z);let b=Math.atan2(G.decoy.x-e.x,G.decoy.z-e.z)-e.face;b=Math.atan2(Math.sin(b),Math.cos(b));if(dd<VIS.r&&Math.abs(b)<VIS.half&&los(e.x,e.z,G.decoy.x,G.decoy.z)){startTele(e,G.decoy.x,G.decoy.z);return 0}}
    if(e.pat){const p=e.pat[e.patI],tx=cx2x(p[0]),tz=cx2x(p[1]),dx=tx-e.x,dz=tz-e.z,L=Math.hypot(dx,dz);if(L<.3){e.patI=1-e.patI;e.wait=.8}else if(!(e.wait>0)){const sp=e.spd*haste*dt;e.x+=dx/L*Math.min(sp,L);e.z+=dz/L*Math.min(sp,L);e.face=Math.atan2(dx,dz)}if(e.wait>0)e.wait-=dt}
    else{e.face+=dt*.8}
    collide(e,e.r);e.g.position.set(e.x,0,e.z);e.g.rotation.y=e.face;return 0}
  // 젤리 거미: 벽 위를 따라가다 가까우면 조준
  if(e.type==='spider'){if(!e.node){spiderSnap(e);if(!e.node){vanish(e);return 0}}
    const d=Math.hypot(h.x-e.x,h.z-e.z);if(hv&&d<12&&e.life<MONP.spider.life-1.2){startTele(e,h.x,h.z);return 0}
    if(!e.nxt||!wallEdge(e.node[0],e.node[1],e.nxt[0],e.nxt[1])){e.nxt=spiderNext(e);if(!e.nxt){spiderSnap(e);return 0}}
    const tx=e.nxt[0]*C,tz=e.nxt[1]*C,dx=tx-e.x,dz=tz-e.z,L=Math.hypot(dx,dz),sp=e.spd*haste*dt;if(L<=sp){e.x=tx;e.z=tz;e.prevN=e.node;e.node=e.nxt;e.nxt=null}else{e.x+=dx/L*sp;e.z+=dz/L*sp;e.face=Math.atan2(dx,dz)}
    e.g.position.set(e.x,0,e.z);monFly(e);e.g.rotation.y=e.face;return 0}
  // 대상: 보이는 도둑들 중 (유령·곰·병정은 분신에 안 속아요)
  e.retarget-=dt;const figs=figures();if(e.target==='decoy'&&!G.decoy)e.target=null;if(e.target==='hero'&&e.type!=='ghost'&&!hv)e.target=null;
  if(e.type==='ghost')e.target='hero';else if(e.retarget<=0){e.retarget=.4;let best=null,bd=1e9;for(const f of figs){if(e.type==='bear'&&!f.real)continue;const d=Math.hypot(f.x-e.x,f.z-e.z)-(f.real&&e.target==='hero'?1:0)-(!f.real&&e.target==='decoy'?1:0);if(d<bd){bd=d;best=f}}if(best)e.target=best.real?'hero':'decoy'}
  if(G.lure&&e.type!=='ghost'&&e.type!=='bear'&&Math.hypot(G.lure.x-e.x,G.lure.z-e.z)<22){const L=G.lure;const d=Math.hypot(L.x-e.x,L.z-e.z);if(d<1.6){burstFx(e.x,e.z,e.type);vanish(e,'몬스터가 젤리 미끼를 먹고 사라졌어요');return 0}e.target='lure'}
  let t=null;if(e.target==='hero')t={x:h.x,z:h.z,real:true};else if(e.target==='decoy'&&G.decoy)t={x:G.decoy.x,z:G.decoy.z,real:false};else if(e.target==='lure'&&G.lure)t={x:G.lure.x,z:G.lure.z,real:false,lure:true};
  if(!t){e.lostT+=dt;const lk=h.lastSeen||h;t={x:lk.x,z:lk.z,real:false,lost:true}}else e.lostT=0;
  const dTo=Math.hypot(t.x-e.x,t.z-e.z),seeT=e.type==='ghost'||los(e.x,e.z,t.x,t.z);
  const trig={skel:5.2,ghost:2.6,bat:10,bear:3.8}[e.type]||3;
  if(!t.lost&&!t.lure&&dTo<trig&&seeT&&!(e.type==='bat'&&dTo<2.5&&false)){startTele(e,t.x,t.z);return 0}
  let tx=t.x,tz=t.z;const[cx,cz]=cellOf(e.x,e.z),[gx,gz]=cellOf(t.x,t.z);
  if(e.type!=='ghost'&&!(dTo<8&&los(e.x,e.z,t.x,t.z))){const f=field(gx,gz),here=f[idx(cx,cz)];if(here>0)for(const[dx,dz]of DIRS){const a=cx+dx,b=cz+dz;if(a<0||b<0||a>=N||b>=N||!canStep(cx,cz,dx,dz))continue;if(f[idx(a,b)]===here-1){tx=cx2x(a);tz=cx2x(b);break}}}
  const dx=tx-e.x,dz=tz-e.z,L=Math.hypot(dx,dz);let sp=e.spd*haste;if(e.type!=='ghost')for(const j of G.ents)if((j.type==='jelly'||j.type==='gum')&&Math.hypot(j.x-e.x,j.z-e.z)<j.r)sp*=j.type==='gum'?.35:.7;if(e.slick>0){e.slick-=dt;sp*=.5}
  if(L>.05){e.x+=dx/L*sp*dt;e.z+=dz/L*sp*dt;e.face=Math.atan2(dx,dz)}
  for(const o of G.ents){if(o===e||!isMon(o)||o.dead)continue;const ox=e.x-o.x,oz=e.z-o.z,d=Math.hypot(ox,oz),m=e.r+o.r;if(d<m&&d>1e-4){e.x+=ox/d*(m-d)*.5;e.z+=oz/d*(m-d)*.5}}
  if(e.type!=='ghost')collide(e,e.r);else{e.x=clamp(e.x,1,N*C-1);e.z=clamp(e.z,1,N*C-1)}e.g.position.set(e.x,0,e.z);monFly(e);e.g.rotation.y=e.face;
  if(e.type==='ghost'&&e.hide!=null)e.g.visible=G.mode==='devil'||!e.hide;
  return t.real&&dTo<14?1-dTo/14:0}
// 회전날 포탑
function spinMesh(){const g=new THREE.Group();const base=new THREE.Mesh(new THREE.CylinderGeometry(.7,.9,1.2,16),new THREE.MeshLambertMaterial({map:stripeT('#ff7eb6','#ffffff',[1,1])}));base.position.y=.6;g.add(base);
  const piv=new THREE.Group();piv.position.y=1.25;g.add(piv);const bar=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,5.6,10),LM('#fff8ee'));bar.rotation.z=Math.PI/2;piv.add(bar);
  for(const[s,c]of[[-1,'#ff7eb6'],[1,'#7cc6ff']]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,.3,20),new THREE.MeshLambertMaterial({map:swirlT(c,'#ffffff')}));l.rotation.z=Math.PI/2;l.rotation.y=Math.PI/2;l.position.x=s*2.8;l.rotation.set(0,0,0);l.rotation.x=Math.PI/2;piv.add(l)}
  const hub=new THREE.Mesh(new THREE.SphereGeometry(.45,14,10),LM('#ffd35f'));hub.position.y=1.25;g.add(hub);g.userData.head=hub;g.userData.piv=piv;return g}
{const st0=spawnTower;spawnTower=function(x,z,tk){if(tk!=='spin')return st0(x,z,tk);const g=spinMesh();g.position.set(x,0,z);scene.add(g);const e={id:++G.eid,type:'tower',tk:'spin',x,z,r:.85,life:60,g,head:g.userData.head,cd:0,charge:0,ang:Math.random()*6,spd:1.7};G.ents.push(e);SFX.place();return e}}
function spinTick(e,dt){const h=G.hero;e.ang+=dt*e.spd*(e.dual?1:1);e.g.rotation.y=e.ang;if(G.mirror)return;const dx=h.x-e.x,dz=h.z-e.z,d=Math.hypot(dx,dz);if(d>3.2||d<.2)return;
  const hitA=a=>{let q=Math.atan2(dx,dz)-a;q=Math.atan2(Math.sin(q),Math.cos(q));const off=Math.abs(Math.sin(q))*d;return off<.75};
  const bars=[Math.PI/2+e.ang,-Math.PI/2+e.ang];if(e.dual)bars.push(e.ang,e.ang+Math.PI);
  // 막대 방향 = 피벗의 x축 (y회전 ang) → 바닥 각도 atan2(dx,dz) 기준으로 ang+π/2
  if(bars.some(a=>{let q=Math.atan2(dx,dz)-a;q=Math.atan2(Math.sin(q),Math.cos(q));return Math.abs(q)<Math.PI/2&&Math.abs(Math.sin(q))*d<.7}))if(hurt(e,18,'🍭 회전날에 맞았어요!')){h.kx*=1.4;h.kz*=1.4}}
function eyeTick(e,dt){const h=G.hero;e.cd-=dt;if(e.cd>0||G.mirror)return;if(!heroVisible(h))return;if(G.aug&&G.aug.quietFeet&&!h.moving)return;const d=Math.hypot(h.x-e.x,h.z-e.z);if(d>e.rng)return;let a=Math.atan2(h.x-e.x,h.z-e.z)-e.ang;a=Math.atan2(Math.sin(a),Math.cos(a));if(Math.abs(a)>e.half||!los(e.x,e.z,h.x,h.z))return;
  e.cd=5;G.hasteT=Math.max(0,G.hasteT||0)+5;h.reveal=Math.max(h.reveal,3);netEv('eye');SFX.bell();say(G.mode==='hero'?'👁️ 마녀의 눈에 들켰어요! 몬스터가 빨라져요':'👁️ 마녀의 눈이 도둑을 봤어요! 몬스터가 5초 더 빨라져요',G.mode==='hero',1.6);for(const q of G.ents)if(isMon(q)&&!q.dead&&q.type!=='soldier'&&q.type!=='spider')q.target='hero'}
updEnts=function(dt){const h=G.hero;let chase=0;if(G.hasteT>0)G.hasteT-=dt;
  for(let i=G.ents.length-1;i>=0;i--){const e=G.ents[i];if(G.duoPass!=null&&(e.ts|0)!==G.duoPass)continue;e.life-=dt;
    if(isMon(e)){chase=Math.max(chase,monTick(e,dt,i)||0)}
    else if(e.type==='tower'){if(e.life<=0){drop(e.g);G.ents.splice(i,1);continue}if(e.tk==='spin'){spinTick(e,dt);continue}
      e.cd-=dt;if(e.blind>0)e.blind-=dt;const dh=Math.hypot(h.x-e.x,h.z-e.z);const sees=!(e.blind>0)&&heroVisible(h)&&dh<22*((G.aug||{}).wg_range?1.3:1)&&los(e.x,e.z,h.x,h.z);
      if(e.rot){e.g.rotation.y+=dt*.9;}else e.g.rotation.y=sees?Math.atan2(h.x-e.x,h.z-e.z):e.g.rotation.y+dt*.5;
      if(e.tk==='magnet'){if(sees&&dh>2.6&&h.dashT<=0&&!h.jump&&!h.remote){const k=3.2*dt*(e.push?-1:1);h.x+=(e.x-h.x)/dh*k;h.z+=(e.z-h.z)/dh*k;collide(h,HERO.r);e.charge=.5+Math.abs(Math.sin(G.t*8))*.5;if(!h.isRival&&G.mode==='hero'&&!(h.magT>0)){say(e.push?'🧲 자석이 밀어내요!':'🧲 자석 포탑이 끌어당겨요! 벽 뒤로 숨어요',true,1.4);h.magT=3}}else e.charge=0;e.head.scale.setScalar(1+e.charge*.25);if(h.magT>0)h.magT-=dt;continue}
      if(e.rot){if(e.cd<=0){e.cd=2.5;const a=e.g.rotation.y;shootDir(e,Math.sin(a),Math.cos(a))}continue}
      if(sees&&e.cd<=0){e.charge+=dt;e.head.scale.setScalar(1+e.charge*.4);if(e.charge>.9){e.charge=0;e.cd=2.5;e.head.scale.setScalar(1);shoot(e)}}else if(!sees){e.charge=0;e.head.scale.setScalar(1)}
      if(e.tk==='ice'&&e.rink){if(dh<4.5&&!h.isRival){h.slickT=.3}}}
    else if(e.type==='eye'){if(e.life<=0){drop(e.g);G.ents.splice(i,1);continue}eyeTick(e,dt)}
    else if(e.type==='jelly'||e.type==='gum'){const o=Math.min(1,e.life/2);for(const m of e.mats)m.opacity=o;e.ph+=dt*2;e.bubbles.forEach((b,k)=>b.scale.setScalar(1+Math.sin(e.ph+k*1.7)*.18));if(e.life<=0){drop(e.g);G.ents.splice(i,1)}}
    else if(TRAPS.includes(e.type)){if(e.life<=0){drop(e.g);G.ents.splice(i,1)}}
    else if(e.type==='bell'){if(e.ring){e.bell.rotation.z=Math.sin(G.t*30)*.5*e.life/2}if(e.life<=0){drop(e.g);G.ents.splice(i,1)}}
    else if(e.tick){e.tick(e,dt);if(e.life<=0){drop(e.g);G.ents.splice(i,1)}}
  }
  for(let i=G.projs.length-1;i>=0;i--){const p=G.projs[i];if(G.duoPass!=null&&(p.ts|0)!==G.duoPass)continue;p.life-=dt;const nx=p.x+p.vx*dt,nz=p.z+p.vz*dt;let done=p.life<=0||!los(p.x,p.z,nx,nz);p.x=nx;p.z=nz;p.g.position.set(p.x,1.4,p.z);p.g.rotation.x+=dt*8;
    if(!done&&Math.hypot(h.x-p.x,h.z-p.z)<.7){done=true;(hurt(p,p.ice?6:DMG.arrow,p.ice?'얼음 사탕! 느려졌어요':'사탕알에 맞았어요!')&&p.ice&&(h.slowT=3))}if(done){drop(p.g);G.projs.splice(i,1)}}
  for(let i=(G.webs||[]).length-1;i>=0;i--){const p=G.webs[i];p.life-=dt;p.x+=p.vx*dt;p.z+=p.vz*dt;p.y=Math.max(1.2,p.y-dt*5);p.g.position.set(p.x,p.y,p.z);let done=p.life<=0;
    if(!done&&!(h.dashT>0)&&Math.hypot(h.x-p.x,h.z-p.z)<.9){done=true;h.slowT=Math.max(h.slowT||0,2);SFX.squish();netEv('web');if(meLoud())say('🕸️ 거미줄! 2초 느려져요',true,1.2)}if(done){drop(p.g);const j=X28.list.indexOf(p.g);if(j>=0)X28.list.splice(j,1);G.webs.splice(i,1)}}
  if(G.duoPass===1)return;
  for(let i=G.sigils.length-1;i>=0;i--){const s=G.sigils[i];s.t+=dt;s.m.material.opacity=Math.min(.85,s.t/s.d);s.m.rotation.z+=dt;if(s.t>=s.d){s.cb();drop(s.m);G.sigils.splice(i,1)}}
  updWallAnim(dt);updFx(dt);G.chase=chase;
  G.candyT=(G.candyT||0)-dt;if(G.candyT<=0){G.candyT=7;if(G.candies.filter(c=>!c.fake).length<6)spawnCandy()}
  for(const c of G.candies){c.ph+=dt*2;c.g.position.y=1+Math.sin(c.ph)*.18;c.g.rotation.y+=dt}};
function shootDir(e,ux,uz){const g=gumballMesh();g.position.set(e.x,1.4,e.z);scene.add(g);G.projs.push({id:++G.eid,ts:e.ts|0,ice:0,x:e.x+ux*.9,z:e.z+uz*.9,vx:ux*12,vz:uz*12,life:2.6,g});if(meLoud()&&Math.hypot(e.x-G.hero.x,e.z-G.hero.z)<30)SFX.pew()}

/* ----- 연막: 예고 중인 공격을 취소해요 ----- */
{const ds0=doSmoke;doSmoke=function(ai){const h=G.hero,before=h.cdSmoke||0;ds0(ai);if((h.cdSmoke||0)>before){let n=0;for(const e of G.ents)if(isMon(e)&&!e.dead&&(e.ph==='tele'||e.ph==='dash')&&e.type!=='ghost'&&Math.hypot(e.x-h.x,e.z-h.z)<10){vanish(e);n++}if(n&&meLoud())say(`☁️ 연막! 공격 ${n}개를 취소했어요`,false,1.3)}}}

/* ----- 온라인: 예고 표시도 마녀 화면에 ----- */
{const ns1=netSend;netSend=function(m){if(m&&m.t==='s'&&G&&G.ents){m.tg=G.ents.filter(e=>e.tele&&!e.dead).map(e=>{const T=e.tele;return[e.id,T.kind[0],r1(T.x),r1(T.z),r2(T.ang||0),r1(T.r||T.len||0),r2(T.half||T.w||0),e.ph==='dash'?1:r2(T.t/T.d)]});m.wb=(G.webs||[]).map(p=>[p.id,r1(p.x),r1(p.z)]);if(G.twin)m.tw=[r1(G.twin.x),r1(G.twin.z),r2(G.twin.face||0)];if(G.lure)m.lu=[r1(G.lure.x),r1(G.lure.z)]}return ns1(m)}}
const MTELE=new Map();
function mirrorTele(list){const seen=new Set();for(const[id,k,x,z,a,r,hw,p]of list||[]){seen.add(id);let T=MTELE.get(id);if(!T){const kind={c:'circle',l:'line',o:'cone'}[k]||'circle';T={kind,x,z,ang:a,r,len:r,w:hw,half:hw,col:'#ff3d5a'};T.mesh=teleMesh(T);MTELE.set(id,T)}teleSet(T,p)}
  for(const[id,T]of MTELE)if(!seen.has(id)){drop(T.mesh);MTELE.delete(id)}}
{const as0=applySnap;applySnap=function(s){for(const a of s.e||[]){const[id,tc,x,z]=a,ty=CTYPE[tc];if((ty==='spin'||ty==='eye')&&!G.ents.find(q=>q.id===id)){const e=ty==='spin'?spawnTower(x,z,'spin'):spawnEye(x,z,a[4]);e.id=id}}
  as0(s);mirrorTele(s.tg);
  const wb=new Set();G.mwebs=G.mwebs||new Map();for(const[id,x,z]of s.wb||[]){wb.add(id);let g=G.mwebs.get(id);if(!g){g=x28add(new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),LM('#e9fff8')));G.mwebs.set(id,g)}g.position.set(x,1.6,z)}for(const[id,g]of G.mwebs)if(!wb.has(id)){drop(g);G.mwebs.delete(id)}
  mirrorExtras(s);
  for(const ev of s.ev||[]){if(ev==='boo'){SFX.bonk();say('👻 부우! 도둑이 1초 멈췄어요',false,1.2)}else if(ev==='eye'){SFX.bell();say('👁️ 마녀의 눈이 도둑을 봤어요! 몬스터가 5초 더 빨라져요',false,1.4)}else if(ev==='web'){SFX.squish();say('🕸️ 도둑이 거미줄에 걸렸어요',false,1.2)}}}}
function mirrorExtras(s){}
{const cw1=clearWorld;clearWorld=function(){cw1();for(const[,T]of MTELE)drop(T.mesh);MTELE.clear();if(G.mwebs){for(const[,g]of G.mwebs)drop(g);G.mwebs.clear()}G.webs=[]}}
// 마녀 화면(거울): 회전날도 빙글
{const mu0=mirrorUpdate;mirrorUpdate=function(dt){mu0(dt);for(const e of G.ents){if(e.type==='tower'&&e.tk==='spin'){e.g.rotation.y=e.tf||0}if(e.type==='eye'&&e.tf!=null)e.g.rotation.y=e.tf}}}

/* ----- AI 도둑: 예고를 보면 피해요 ----- */
{const ha0=heroAI;heroAI=function(dt){let d=ha0(dt);const h=G.hero;const skill=[.35,.6,.85][AIL]||.6;
  for(const e of G.ents){if(!e.tele||e.dead)continue;const T=e.tele;if(!inTele(T,h.x,h.z,.8))continue;if(e.dodgeRoll==null)e.dodgeRoll=Math.random()<skill;if(!e.dodgeRoll)continue;
    let ax,az;if(T.kind==='line'){const ux=Math.sin(T.ang),uz=Math.cos(T.ang),side=(h.x-T.x)*uz-(h.z-T.z)*ux>=0?1:-1;ax=uz*side;az=-ux*side}else{ax=h.x-T.x;az=h.z-T.z;const L=Math.hypot(ax,az)||1;ax/=L;az/=L;if(T.kind==='cone'){ax=ax*.6+Math.sin(T.ang)*.4;az=az*.6+Math.cos(T.ang)*.4}}
    d=[ax,az];if((T.d-T.t)<.35&&h.dashCd<=0){h.aiDir=d;doDash(true)}break}
  return d}}
/* ----- AI 마녀: 마녀의 눈 ----- */
{const da0=devilAI;devilAI=function(dt){const D=G.devil;if(D.hand.includes('eye')&&D.pt>=CARDS.eye.cost&&count('eye')<2&&Math.random()<dt*.15&&G.t>8){const h=G.hero,[bx,bz]=cellOf(h.x,h.z),p=pathFrom(bx,bz,20);for(let j=3;j<Math.min(p.length,9);j++){const[x,z]=p[j],px=cx2x(x),pz=cx2x(z);if(canPlaceAt(px,pz)==='ok'&&!(los(h.x,h.z,px,pz)&&Math.hypot(px-h.x,pz-h.z)<14)){if(applyCard('eye',px,pz)==='ok')return}}}da0(dt)}}
