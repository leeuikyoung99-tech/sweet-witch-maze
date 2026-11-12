/* ================= 30차 (거): 사탕 박쥐 · 젤리 거미 새 모양 (모난 도형이 보이지 않게) ================= */
// 사탕 박쥐: 둥근 몸, 물방울 모양 귀, 가장자리가 둥근 날개 (뼈대 막대 없음)
function batWingTex(c1,c2){return canvasTex(256,128,(g,w,h)=>{g.fillStyle=c1;g.fillRect(0,0,w,h);g.strokeStyle=c2;g.lineWidth=5;g.lineCap='round';
  for(const[tx,ty]of[[.42,.08],[.68,.1],[.95,.3]]){g.beginPath();g.moveTo(0,h*.45);g.quadraticCurveTo(w*tx*.6,h*.35,w*tx,h*(1-ty));g.stroke()}})}
function batEarGeo(){if(batEarGeo.g)return batEarGeo.g;const pts=[[0,0],[.27,.04],[.3,.18],[.24,.4],[.13,.6],[.04,.7],[0,.72]].map(([x,y])=>new THREE.Vector2(x,y));return batEarGeo.g=keepG(new THREE.LatheGeometry(pts,24))}
batModel=function(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);monShadow(g,.7);
  const mat=new THREE.MeshPhongMaterial({color:C[0],shininess:60,specular:new THREE.Color('#ffffff'),transparent:true,opacity:1});
  const ball=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mat);ball.position.y=1.5;body.add(ball);
  const belly=new THREE.Mesh(new THREE.SphereGeometry(.62,24,18),new THREE.MeshPhongMaterial({color:new THREE.Color(C[0]).lerp(new THREE.Color('#ffffff'),.35),shininess:40,transparent:true,opacity:1}));belly.scale.set(1,.9,.35);belly.position.set(0,1.28,.78);body.add(belly);
  const inner=new THREE.MeshLambertMaterial({color:'#ffb3d0'});
  for(const s of[-1,1]){const e=new THREE.Mesh(batEarGeo(),mat);e.scale.set(1,1,.55);e.position.set(s*.46,2.18,-.05);e.rotation.z=s*-.32;body.add(e);
    const ie=new THREE.Mesh(batEarGeo(),inner);ie.scale.set(.6,.7,.3);ie.position.set(s*.47,2.24,.06);ie.rotation.z=s*-.32;body.add(ie)}
  // 날개: 아래쪽이 물결 모양인 막, 가장자리를 둥글게
  const sh=new THREE.Shape();sh.moveTo(0,.32);sh.quadraticCurveTo(1.1,1.0,2.35,.82);sh.quadraticCurveTo(2.42,.5,2.2,.12);sh.quadraticCurveTo(1.95,-.12,1.68,.02);sh.quadraticCurveTo(1.4,-.3,1.08,-.08);sh.quadraticCurveTo(.72,-.36,.38,-.2);sh.quadraticCurveTo(.15,-.32,0,-.28);sh.lineTo(0,.32);
  const wg=new THREE.ExtrudeGeometry(sh,{depth:.05,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:3,curveSegments:16});
  {const p=wg.attributes.position,uv=wg.attributes.uv;for(let i=0;i<uv.count;i++){const x=p.getX(i);uv.setXY(i,x/2.45,(p.getY(i)+.4)/1.45);p.setZ(i,p.getZ(i)-.16*x*x)}p.needsUpdate=true;wg.computeVertexNormals()}
  const wm=new THREE.MeshPhongMaterial({map:batWingTex(C[2]||C[1],C[1]),shininess:30,side:THREE.DoubleSide});
  const wgs=[];for(const s of[-1,1]){const piv=new THREE.Group();piv.position.set(s*.78,1.62,-.12);const w=new THREE.Mesh(wg,wm);w.position.z=-.04;w.scale.x=s;piv.add(w);body.add(piv);wgs.push(piv)}
  // 눈 · 작은 송곳니 · 볼
  const wE=new THREE.MeshBasicMaterial({color:'#ffffff'}),pE=new THREE.MeshBasicMaterial({color:'#2a1640'});
  for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.22,20,16),wE);e.scale.set(1,1.2,.5);e.position.set(s*.33,1.78,.9);body.add(e);const p=new THREE.Mesh(new THREE.SphereGeometry(.11,16,12),pE);p.position.set(s*.31,1.75,1.0);body.add(p);
    const f=new THREE.Mesh(new THREE.SphereGeometry(.07,12,10),wE);f.scale.set(1,1.7,.8);f.position.set(s*.15,1.22,.95);body.add(f)}
  const ch=new THREE.Mesh(new THREE.CircleGeometry(.14,20),new THREE.MeshBasicMaterial({color:'#ff7eb6',transparent:true,opacity:.6}));for(const s of[-1,1]){const c=ch.clone();c.position.set(s*.62,1.42,.79);c.rotation.y=s*.62;body.add(c)}
  const m=mkMon(g,body,[mat]);m.wing=wgs;return m};
// 젤리 거미: 둥근 몸, 무릎이 굽은 매끈한 다리 8개 (양쪽에 고르게)
spiderModel=function(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  const mat=new THREE.MeshPhongMaterial({color:C[0],emissive:new THREE.Color(C[1]),emissiveIntensity:.15,shininess:90,specular:new THREE.Color('#ffffff'),transparent:true,opacity:1});
  const ab=new THREE.Mesh(new THREE.SphereGeometry(.85,28,20),mat);ab.scale.set(1,.8,1.12);ab.position.set(0,.78,-.3);body.add(ab);
  const hd=new THREE.Mesh(new THREE.SphereGeometry(.52,24,18),mat);hd.position.set(0,.74,.62);body.add(hd);
  const lm=new THREE.MeshPhongMaterial({color:C[1],shininess:60}),legs=[];
  const ZO=[.85,.3,-.3,-.85],AT=[.55,.3,.0,-.28];
  for(const s of[-1,1])for(let k=0;k<4;k++){const leg=new THREE.Group();leg.position.set(s*.42,.74,AT[k]);
    const zo=ZO[k],cv=new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,0),new THREE.Vector3(s*.55,.42,zo*.35),new THREE.Vector3(s*1.1,.3,zo*.7),new THREE.Vector3(s*1.38,-.64,zo*.95)]);
    const tb=new THREE.Mesh(new THREE.TubeGeometry(cv,24,.085,10,false),lm);leg.add(tb);
    const tip=new THREE.Mesh(new THREE.SphereGeometry(.095,12,10),lm);tip.position.copy(cv.getPoint(1));leg.add(tip);
    const root=new THREE.Mesh(new THREE.SphereGeometry(.09,12,10),lm);leg.add(root);
    leg.scale.setScalar(.85);body.add(leg);legs.push(leg)}
  monFace(body,.8,1.12,.6,'smile');const m=mkMon(g,body,[mat]);m.legs=legs;m.walk=true;return m};
// 거미줄을 친 거미는 줄 아래 바닥에 앉아 있어요 (벽 높이에 떠 있지 않게)
{const mf9=monFly;monFly=function(e){mf9(e);if(e.type==='spider'&&e.web)e.g.position.y=0}}
// 쿠키 병정: 둥근 진저쿠키 몸, 둥근 털모자, 손에 쥔 지팡이 사탕 창
function caneTex(){return caneTex.t||(caneTex.t=canvasTex(64,256,(g,w,h)=>{g.fillStyle='#fffaf2';g.fillRect(0,0,w,h);g.fillStyle='#e8364f';for(let i=-2;i<12;i++){g.beginPath();g.moveTo(0,i*28);g.lineTo(w,i*28-24);g.lineTo(w,i*28-10);g.lineTo(0,i*28+14);g.closePath();g.fill()}}))}
function lathe(pts,seg){return new THREE.LatheGeometry(pts.map(([x,y])=>new THREE.Vector2(x,y)),seg||28)}
soldierModel=function(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);monShadow(g,.8);
  const ck=new THREE.MeshPhongMaterial({color:C[0],shininess:20}),ic=new THREE.MeshPhongMaterial({color:'#fffaf2',shininess:40}),red=new THREE.MeshPhongMaterial({color:C[1],shininess:50}),gold=new THREE.MeshPhongMaterial({color:'#ffd35f',shininess:80});
  // 몸통 (아래가 살짝 넓은 둥근 쿠키)
  const torso=new THREE.Mesh(lathe([[0,0],[.5,.04],[.66,.3],[.68,.75],[.58,1.2],[.4,1.45],[0,1.5]]),ck);torso.position.y=.45;body.add(torso);
  const belt=new THREE.Mesh(new THREE.TorusGeometry(.665,.06,10,40),ic);belt.rotation.x=Math.PI/2;belt.position.y=.98;body.add(belt);
  for(const y of[1.3,1.6]){const b=new THREE.Mesh(new THREE.SphereGeometry(.09,14,10),red);b.scale.z=.6;b.position.set(0,y,y<1.4?.66:.6);body.add(b)}
  // 다리 · 팔 (둥근 막대)
  for(const s of[-1,1]){const leg=new THREE.Mesh(new THREE.SphereGeometry(.27,18,14),ck);leg.scale.set(1,1.35,1);leg.position.set(s*.3,.36,0);body.add(leg);
    const cuff=new THREE.Mesh(new THREE.TorusGeometry(.2,.035,8,28),ic);cuff.rotation.x=Math.PI/2;cuff.position.set(s*.3,.2,0);body.add(cuff)}
  const arm=(s,ang,len)=>{const a=new THREE.Group();a.position.set(s*.6,1.62,0);const up=new THREE.Mesh(new THREE.SphereGeometry(.18,16,12),ck);up.scale.set(1,len/.36,1);up.position.y=-len/2;a.add(up);
    const hand=new THREE.Mesh(new THREE.SphereGeometry(.2,16,12),ck);hand.position.y=-len;a.add(hand);a.rotation.z=s*ang;body.add(a);return a};
  arm(-1,.35,.62);const ra=arm(1,.55,.62);ra.rotation.x=-.5;
  // 머리 · 모자 (둥근 털모자 + 금빛 띠 + 방울)
  const head=new THREE.Mesh(new THREE.SphereGeometry(.6,28,20),ck);head.position.y=2.32;body.add(head);
  const hat=new THREE.Mesh(lathe([[0,0],[.56,0],[.6,.25],[.6,.7],[.52,1.0],[.3,1.12],[0,1.15]]),red);hat.position.y=2.55;body.add(hat);
  const band=new THREE.Mesh(new THREE.TorusGeometry(.58,.06,10,40),gold);band.rotation.x=Math.PI/2;band.position.y=2.62;body.add(band);
  const pom=new THREE.Mesh(new THREE.SphereGeometry(.16,16,12),gold);pom.position.y=3.72;body.add(pom);
  // 창: 오른손에 쥔 지팡이 사탕 막대 + 둥근 사탕 끝 (손이 축이라 찌를 때 손에서 기울어요)
  const hw=new THREE.Vector3();ra.updateMatrixWorld(true);body.updateMatrixWorld(true);ra.children[1].getWorldPosition(hw);
  const spear=new THREE.Group();spear.position.copy(hw);
  const st=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,3.0,16),new THREE.MeshPhongMaterial({map:caneTex(),shininess:60}));st.position.y=.45;spear.add(st);
  const tip=new THREE.Mesh(lathe([[0,0],[.16,.06],[.2,.2],[.14,.4],[.05,.56],[0,.6]]),gold);tip.position.y=1.92;spear.add(tip);
  const cap=new THREE.Mesh(new THREE.SphereGeometry(.09,12,10),gold);cap.position.y=-1.06;spear.add(cap);
  body.add(spear);
  monFace(body,2.36,.58,.78,'smile');const m=mkMon(g,body,[ck]);m.walk=true;m.spear=spear;return m};
