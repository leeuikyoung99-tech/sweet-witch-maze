/* ================= 32차 (라): 보스 기술 2~8장 (크고, 경고를 보고 피할 수 있게) ================= */
const gMat=(col,op)=>new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2});
function bAdd(m){scene.add(m);(BOSS.objs||(BOSS.objs=[])).push(m);return m}
function bDrop(m){if(!m)return;try{scene.remove(m)}catch(e){}if(BOSS.objs){const i=BOSS.objs.indexOf(m);if(i>=0)BOSS.objs.splice(i,1)}}
function gRect(x0,z0,x1,z1,col,op,y){const m=new THREE.Mesh(new THREE.PlaneGeometry(Math.max(.1,x1-x0),Math.max(.1,z1-z0)),gMat(col,op));m.rotation.x=-Math.PI/2;m.position.set((x0+x1)/2,y||.09,(z0+z1)/2);return bAdd(m)}
function gCirc(x,z,r,col,op,y){const m=new THREE.Mesh(new THREE.CircleGeometry(r,40),gMat(col,op));m.rotation.x=-Math.PI/2;m.position.set(x,y||.1,z);return bAdd(m)}
bossClear=function(){if(BOSS.g){try{scene.remove(BOSS.g)}catch(e){}}for(const m of BOSS.objs||[]){try{scene.remove(m)}catch(e){}}for(const k in BOSS)delete BOSS[k]};
function bossInit(name,msg){if(BOSS.on===name)return false;bossClear();BOSS.on=name;BOSS.objs=[];if(msg)say(msg,true,2);return true}
const capK=h=>{const L=Math.hypot(h.kx||0,h.kz||0);if(L>14){h.kx*=14/L;h.kz*=14/L}};
function bossTick(c,dt){if(c===1)return lollyTick(dt);if(c===2)return blizTick(dt);if(c===3)return pumpTick(dt);if(c===4)return stompTick(dt);if(c===5)return floodTick(dt);if(c===6)return tornTick(dt);if(c===7)return kingTick(dt);if(c===8)return bitterTick(dt)}
// ----- 2장 서리: 눈보라 (3~4줄 폭의 띠를 끝에서 끝까지 쓸고 지나가요) -----
function blizTick(dt){const h=G.hero,W=N*C;if(bossInit('bliz','서리: 눈보라야, 모든 걸 덮어 버려!')){BOSS.next=3;BOSS.wave=null;BOSS.ice=[]}
  if(!BOSS.wave){BOSS.next-=dt;if(BOSS.next<=0){const k=G.stage.d>.5?4:3,ax=Math.random()<.5?'x':'z';const r0=Math.floor(Math.random()*(N-k));const a0=r0*C,a1=(r0+k)*C;
      const warn=ax==='x'?gRect(0,a0,W,a1,'#9fdcff',.28):gRect(a0,0,a1,W,'#9fdcff',.28);const front=ax==='x'?gRect(0,a0,C*1.4,a1,'#ffffff',.85,.2):gRect(a0,0,a1,C*1.4,'#ffffff',.85,.2);front.visible=false;
      BOSS.wave={ax,a0,a1,warn,front,t:-2,dir:Math.random()<.5?1:-1};say('눈보라가 몰려와요! 파란 줄을 벗어나요',true,1.4)}}
  else{const w=BOSS.wave;w.t+=dt;if(w.t<0){w.warn.material.opacity=.18+.14*Math.abs(Math.sin(w.t*6))}
    else{w.front.visible=true;const p=w.t*(W/2.6),pos=w.dir>0?p:W-p;const lo=Math.max(0,Math.min(pos,W)-C*.7),hi=Math.min(W,lo+C*1.4);
      if(w.ax==='x'){w.front.position.x=(lo+hi)/2}else{w.front.position.z=(lo+hi)/2}
      const inBand=w.ax==='x'?(h.z>w.a0&&h.z<w.a1):(h.x>w.a0&&h.x<w.a1),hp=w.ax==='x'?h.x:h.z;
      if(inBand&&Math.abs(hp-pos)<C*.8&&hurt({x:w.ax==='x'?pos:h.x,z:w.ax==='x'?h.z:pos},12,'눈보라에 휩쓸렸어요! 느려졌어요'))h.slowT=Math.max(h.slowT||0,2.2);
      if(p>W+C){bDrop(w.warn);bDrop(w.front);const ice=w.ax==='x'?gRect(0,w.a0,W,w.a1,'#d8f3ff',.32):gRect(w.a0,0,w.a1,W,'#d8f3ff',.32);BOSS.ice.push({m:ice,ax:w.ax,a0:w.a0,a1:w.a1,life:4});BOSS.wave=null;BOSS.next=Math.max(1.6,3.2-G.stage.d)}}}
  for(let i=BOSS.ice.length-1;i>=0;i--){const q=BOSS.ice[i];q.life-=dt;q.m.material.opacity=.32*Math.min(1,q.life);const inB=q.ax==='x'?(h.z>q.a0&&h.z<q.a1):(h.x>q.a0&&h.x<q.a1);if(inB)h.slowT=Math.max(h.slowT||0,.25);if(q.life<=0){bDrop(q.m);BOSS.ice.splice(i,1)}}}
// ----- 3장 펌킨: 거대 호박 굴리기 (긴 줄을 끝까지 굴러가요) -----
function pumpMesh(dark){const g=new THREE.Group();const r=C*.46;const b=new THREE.Mesh(new THREE.SphereGeometry(r,20,14),new THREE.MeshPhongMaterial({color:dark?'#5a3a7a':'#ff8a2a',shininess:40}));b.scale.y=.86;g.add(b);
  for(let i=0;i<6;i++){const s=new THREE.Mesh(new THREE.TorusGeometry(r*.98,.12,6,28),new THREE.MeshPhongMaterial({color:dark?'#3a2050':'#e0601a'}));s.rotation.y=i*Math.PI/6;s.scale.y=.86;g.add(s)}
  const st=new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,1.4,8),new THREE.MeshPhongMaterial({color:'#4a7a2a'}));st.position.y=r*.86+.5;g.add(st);return g}
function pumpTick(dt,dark){const h=G.hero,W=N*C;if(bossInit(dark?'bpump':'pump',dark?null:'펌킨: 거대 호박아, 굴러라!')){BOSS.next=2.5;BOSS.rolls=[]}
  BOSS.next-=dt;if(BOSS.next<=0){BOSS.next=Math.max(3,4.8-G.stage.d*1.5);const n=G.stage.d>.45?3:2;const used=new Set();
    for(let i=0;i<n;i++){const ax=Math.random()<.5?'x':'z';let lane=i===0?Math.floor((ax==='x'?h.z:h.x)/C):Math.floor(Math.random()*N);lane=Math.max(0,Math.min(N-1,lane));if(used.has(ax+lane))continue;used.add(ax+lane);
      const a0=lane*C,a1=a0+C,dir=Math.random()<.5?1:-1;const warn=ax==='x'?gRect(0,a0,W,a1,'#ff9a3a',.3):gRect(a0,0,a1,W,'#ff9a3a',.3);const m=bAdd(pumpMesh(dark));m.visible=false;
      BOSS.rolls.push({ax,a0,a1,dir,warn,m,t:-1.7})}say('호박이 굴러와요! 주황 줄에서 비켜요',true,1.2)}
  for(let i=BOSS.rolls.length-1;i>=0;i--){const q=BOSS.rolls[i];q.t+=dt;if(q.t<0){q.warn.material.opacity=.2+.15*Math.abs(Math.sin(q.t*7));continue}
    q.m.visible=true;const p=q.t*16,pos=q.dir>0?p-C:W+C-p,mid=(q.a0+q.a1)/2,r=C*.46;
    if(q.ax==='x'){q.m.position.set(pos,r*.86,mid);q.m.rotation.z=-q.dir*p/r}else{q.m.position.set(mid,r*.86,pos);q.m.rotation.x=q.dir*p/r}
    const inL=q.ax==='x'?Math.abs(h.z-mid)<C*.5:Math.abs(h.x-mid)<C*.5,hp=q.ax==='x'?h.x:h.z;if(inL&&Math.abs(hp-pos)<r+.5)hurt({x:q.m.position.x,z:q.m.position.z},18,'거대 호박에 깔렸어요!');
    if(p>W+C*2){bDrop(q.warn);bDrop(q.m);BOSS.rolls.splice(i,1)}}}
// ----- 4장 진저: 거인 발구르기 (그림자가 생기고 1.5초 뒤 쿵) -----
function footMesh(){const g=new THREE.Group();const s=new THREE.Mesh(new THREE.CylinderGeometry(C*1.15,C*1.25,3,24),new THREE.MeshPhongMaterial({color:'#c9803f',shininess:20}));g.add(s);
  const ic=new THREE.Mesh(new THREE.TorusGeometry(C*1.05,.35,8,32),new THREE.MeshPhongMaterial({color:'#fffaf2'}));ic.rotation.x=Math.PI/2;ic.position.y=-1.2;g.add(ic);
  const leg=new THREE.Mesh(new THREE.CylinderGeometry(C*.7,C*.8,30,16),new THREE.MeshPhongMaterial({color:'#c9803f'}));leg.position.y=16;g.add(leg);return g}
function stompTick(dt){const h=G.hero;if(bossInit('stomp','진저: 거인 발로 쿵! 쿵!')){BOSS.next=2.5;BOSS.st=[]}
  BOSS.next-=dt;if(BOSS.next<=0){BOSS.next=Math.max(2.2,3.4-G.stage.d);const a=Math.random()*7,o=Math.random()*C*.6,x=h.x+Math.cos(a)*o,z=h.z+Math.sin(a)*o,R=C*1.5;
    BOSS.st.push({x,z,R,t:-1.6,sh:gCirc(x,z,R,'#4a2a1a',.12),f:null})}
  for(let i=BOSS.st.length-1;i>=0;i--){const q=BOSS.st[i];q.t+=dt;
    if(q.t<0){q.sh.material.opacity=.12+.35*(1+q.t/1.6);if(q.t>-.45){if(!q.f){q.f=bAdd(footMesh())}q.f.position.set(q.x,1.5+(-q.t/.45)*30,q.z)}}
    else if(!q.hit){q.hit=1;q.f&&q.f.position.set(q.x,1.5,q.z);G.shake=Math.max(G.shake||0,.5);if(Math.hypot(h.x-q.x,h.z-q.z)<q.R+.3)hurt({x:q.x,z:q.z},20,'거인 발에 밟혔어요!');q.ring=gCirc(q.x,q.z,q.R,'#ffffff',.5,.12)}
    else{const k=q.t;if(q.ring){q.ring.scale.setScalar(1+k*1.2);q.ring.material.opacity=Math.max(0,.5-k)}if(q.f)q.f.position.y=1.5+Math.max(0,k-.5)*40;if(k>1.3){bDrop(q.sh);bDrop(q.f);bDrop(q.ring);BOSS.st.splice(i,1)}}}}
// ----- 5장 카카오: 초코 홍수 (출발점 쪽부터 밀려와요 · 닿으면 느려지기만) -----
function floodTick(dt){const h=G.hero,W=N*C;if(bossInit('flood','카카오: 초코 홍수다! 전부 덮어 주지!')){BOSS.front=W+C;BOSS.delay=6;BOSS.m=gRect(0,0,W,1,'#6b3a1e',.82,.22);BOSS.m.visible=false;BOSS.edge=gRect(0,0,W,1,'#a0602e',.9,.24);BOSS.edge.visible=false}
  if(BOSS.delay>0){BOSS.delay-=dt;if(BOSS.delay<=0)say('초코가 밀려와요! 출구 쪽으로 계속 가요',true,1.6);return}
  const v=.55+G.stage.d*.25;BOSS.front=Math.max(W*.2,BOSS.front-v*dt);const f=BOSS.front;
  BOSS.m.visible=BOSS.edge.visible=true;BOSS.m.scale.set(1,Math.max(.01,(W-f)),1);BOSS.m.position.z=(f+W)/2;BOSS.edge.scale.set(1,1.4,1);BOSS.edge.position.z=f+.7;
  if(h.z>f){h.slowT=Math.max(h.slowT||0,.3);if(!BOSS.said||G.t-BOSS.said>4){BOSS.said=G.t;say('초코에 빠져서 느려졌어요',true,1)}}}
// ----- 6장 몽글: 거대 회오리 (가까우면 빨려 들어가요 · 대시로 빠져나와요) -----
function tornMesh(dark){const g=new THREE.Group();for(let i=0;i<6;i++){const r=1.6+i*1.1;const t=new THREE.Mesh(new THREE.TorusGeometry(r,.5+i*.08,8,30),new THREE.MeshPhongMaterial({color:dark?(i%2?'#6a4a8a':'#3a2a50'):(i%2?'#ffffff':'#ffd6ea'),transparent:true,opacity:.85}));t.rotation.x=Math.PI/2;t.position.y=1+i*1.6;g.add(t)}return g}
function tornTick(dt,dark){const h=G.hero,W=N*C;if(bossInit(dark?'btorn':'torn',dark?null:'몽글: 거대 회오리야, 다 빨아들여라!')){BOSS.x=W/2;BOSS.z=W/2;BOSS.m=bAdd(tornMesh(dark));BOSS.pull=C*2.3}
  const dx=h.x-BOSS.x,dz=h.z-BOSS.z,d=Math.hypot(dx,dz)||1,sp=1.9+G.stage.d*1.2;BOSS.x+=dx/d*sp*dt+Math.sin(G.t*.7)*dt*1.5;BOSS.z+=dz/d*sp*dt+Math.cos(G.t*.6)*dt*1.5;
  BOSS.m.position.set(BOSS.x,0,BOSS.z);BOSS.m.rotation.y+=dt*4;
  if(d<BOSS.pull&&h.dashT<=0){const k=11*(1-d/BOSS.pull);h.kx=(h.kx||0)-dx/d*k*dt*6;h.kz=(h.kz||0)-dz/d*k*dt*6;capK(h)}
  if(d<2.6&&hurt({x:BOSS.x,z:BOSS.z},14,'회오리에 휘말렸어요!')){h.kx=dx/d*14;h.kz=dz/d*14}}
// ----- 7장 말랑: 젤리 왕 (세 배 크기 · 벽을 무시하고 천천히 · 내리찍기) -----
function kingMesh(){const g=new THREE.Group();const jm=new THREE.MeshPhongMaterial({color:'#5fe0a0',transparent:true,opacity:.82,shininess:90,emissive:new THREE.Color('#1f8a5a'),emissiveIntensity:.2});
  const body=new THREE.Mesh(new THREE.SphereGeometry(4.2,24,18),jm);body.position.y=4.2;body.scale.set(1,1.1,1);g.add(body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(3,22,16),jm);head.position.y=10;g.add(head);
  for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(1.2,14,10),jm);e.position.set(s*2.2,12.4,0);g.add(e);const ey=new THREE.Mesh(new THREE.SphereGeometry(.45,10,8),new THREE.MeshBasicMaterial({color:'#1a2a20'}));ey.position.set(s*1.1,10.4,2.6);g.add(ey)}
  const cr=new THREE.Mesh(new THREE.ConeGeometry(1.6,2.2,5),new THREE.MeshPhongMaterial({color:'#ffd35f',shininess:90}));cr.position.y=13.6;g.add(cr);return g}
function kingTick(dt){const h=G.hero,W=N*C;if(bossInit('king','말랑: 젤리 왕, 저 쿠키를 눌러 버려!')){BOSS.x=W/2;BOSS.z=W*.35;BOSS.m=bAdd(kingMesh());BOSS.slam=4;BOSS.ring=null}
  const dx=h.x-BOSS.x,dz=h.z-BOSS.z,d=Math.hypot(dx,dz)||1,sp=(2.3+G.stage.d*.8)*(BOSS.ring?0:1);BOSS.x+=dx/d*sp*dt;BOSS.z+=dz/d*sp*dt;BOSS.m.position.set(BOSS.x,0,BOSS.z);BOSS.m.rotation.y=Math.atan2(dx,dz);
  const bob=1+Math.sin(G.t*5)*.05;BOSS.m.scale.set(1/bob,bob,1/bob);
  BOSS.slam-=dt;if(BOSS.slam<=0&&!BOSS.ring){BOSS.ring=gCirc(BOSS.x,BOSS.z,C*1.6,'#2fbf73',.2);BOSS.rt=1.3;say('젤리 왕이 뛰어올라요! 초록 원 밖으로',true,1)}
  if(BOSS.ring){BOSS.rt-=dt;BOSS.ring.material.opacity=.2+.3*(1-BOSS.rt/1.3);BOSS.m.position.y=Math.sin(Math.max(0,1-BOSS.rt/1.3)*Math.PI)*6;
    if(BOSS.rt<=0){G.shake=Math.max(G.shake||0,.5);if(Math.hypot(h.x-BOSS.ring.position.x,h.z-BOSS.ring.position.z)<C*1.6+.3&&hurt({x:BOSS.x,z:BOSS.z},20,'젤리 왕에게 눌렸어요!')){h.kx=dx/d*12;h.kz=dz/d*12}bDrop(BOSS.ring);BOSS.ring=null;BOSS.slam=Math.max(3,5-G.stage.d)}}
  else if(d<3.4&&hurt({x:BOSS.x,z:BOSS.z},14,'젤리 왕에게 부딪혔어요!')){h.kx=dx/d*12;h.kz=dz/d*12}}
// ----- 8장 비터: 앞 보스 기술을 돌아가며 (막대사탕 → 호박 → 발구르기 → 회오리) -----
function bitterTick(dt){const PH=['lolly','pump','stomp','torn'],L=26;if(G.bphT==null){G.bphT=0;G.bph=-1}G.bphT-=dt;
  if(G.bphT<=0){G.bph=(G.bph+1)%PH.length;G.bphT=L;bossClear();say(['비터: 쓴 막대사탕을 받아라!','비터: 쓴 호박아, 굴러라!','비터: 쿵! 쿵! 쿵!','비터: 쓴 회오리다!'][G.bph],true,1.8)}
  const p=PH[G.bph];if(p==='lolly'){lollyTick(dt);if(!BOSS.dk&&BOSS.g){BOSS.dk=1;BOSS.g.traverse(o=>{if(o.material&&o.material.color){o.material=o.material.clone();o.material.color.lerp(new THREE.Color('#3a2050'),.6)}})}}
  else if(p==='pump')pumpTick(dt,true);else if(p==='stomp')stompTick(dt);else tornTick(dt,true)}
{const se=startStory;startStory=function(){G.bphT=null;return se.apply(this,arguments)}}
