/* ================= 30차 (가): 직접 만든 쿠키 도둑 ================= */
// 단위: 발바닥 y=0, 키 약 1.78. 머리 중심 CK.HY, 머리 반지름 CK.R (모자·안경은 모두 이 머리 기준)
const CK={R:.44,HY:1.34,H:1.78,SKIN:'#f7c59f',SKIN2:'#eaa982',HAIR:'#2a170d'};
const CKCL={
  mint:{m:'#2fae74',w:'#ffffff',p:'#3d3a36'},
  cake:{m:'#ff7fa8',w:'#fff6ee',p:'#7a4a3a'},
  mintchoco:{m:'#8fe3c8',w:'#5a3220',p:'#5a3220'},
  macaron:{m:'#c9a6ff',w:'#ffd6ea',p:'#6a5a8a'},
  cloud:{m:'#a8d8ff',w:'#ffffff',p:'#7a8ab0'},
  halloween:{m:'#ff8a1e',w:'#2a1a2e',p:'#2a1a2e'},
  xmas:{m:'#e8364f',w:'#ffffff',p:'#1f6a4a'}};
const CKTEX={};
// 줄무늬 티셔츠 (옷마다 색만 달라요)
function ckClothTex(id,rep){const k=id+':'+rep;if(CKTEX[k])return CKTEX[k];const C=CKCL[id]||CKCL.mint;
  const t=canvasTex(16,64,(g,w,h)=>{g.fillStyle=C.w;g.fillRect(0,0,w,h);g.fillStyle=C.m;g.fillRect(0,0,w,h*.56)},[1,rep]);return CKTEX[k]=t}
function ckZ(x,y,o){const R=CK.R;return Math.sqrt(Math.max(0,R*R-x*x-y*y))*.97+(o||0)}
// 머리카락 한 장: 아래 가장자리만 앞머리 모양으로 (이마는 끝이 갈라진 앞머리, 옆은 귀 위까지, 뒤는 목덜미까지)
let CKHG=null;
function ckHairEdge(phi){const PI=Math.PI;let d=phi-PI/2;while(d>PI)d-=2*PI;while(d<-PI)d+=2*PI;const a=Math.abs(d);
  const sm=(e0,e1,x)=>{const t=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return t*t*(3-2*t)};
  const sp=1-Math.abs(Math.sin(d*6.2+.4)),front=PI*.43-PI*.05*Math.pow(1-sp,2.2)*(1-sm(1.0,1.3,a))+PI*.012*Math.sin(d*11)*sp;
  const side=PI*.47,back=PI*.6;let e=front+(side-front)*sm(.95,1.3,a);e=e+(back-e)*sm(1.9,2.5,a);return e}
function ckHairGeo(HR){if(CKHG)return CKHG;const g=new THREE.SphereGeometry(HR,256,32,0,Math.PI*2,0,Math.PI*.999);const pos=g.attributes.position,uv=g.attributes.uv;
  for(let i=0;i<pos.count;i++){const phi=uv.getX(i)*Math.PI*2,t=(1-uv.getY(i)),th=Math.min(1,t)*ckHairEdge(phi);
    pos.setXYZ(i,-HR*Math.cos(phi)*Math.sin(th),HR*Math.cos(th),HR*Math.sin(phi)*Math.sin(th))}
  g.computeVertexNormals();return CKHG=g}
// 얼굴(눈·입·볼·가면)은 머리 겉면에 바로 그려요: 옆에서 봐도 뜨지 않아요
const CKF={p0:Math.PI/2-1.45,pl:2.9,t0:Math.PI*.28,tl:Math.PI*.5,W:1024,H:512};let CKFG=null;const CKFT={};
function ckFaceGeo(){if(CKFG)return CKFG;return CKFG=new THREE.SphereGeometry(CK.R*1.004,72,36,CKF.p0,CKF.pl,CKF.t0,CKF.tl)}
function ckFaceTex(mask){const k=mask?'m':'n';if(CKFT[k])return CKFT[k];const R=CK.R,{p0,pl,t0,tl,W,H}=CKF;
  const ang=(x,y)=>{const z=Math.sqrt(Math.max(1e-6,R*R-x*x-y*y));return[Math.atan2(z,-x),Math.acos(y/R)]};
  const P=(x,y)=>{const[ph,th]=ang(x,y);return[(ph-p0)/pl*W,(th-t0)/tl*H]};
  const S=(x,y,sx,sy)=>{const[,th]=ang(x,y);return[sx/(R*Math.sin(th))/pl*W,sy/R/tl*H]};
  const ell=(g,x,y,rx,ry,col)=>{const[cx,cy]=P(x,y),[a,b]=S(x,y,rx,ry);g.fillStyle=col;g.beginPath();g.ellipse(cx,cy,a,b,0,0,7);g.fill()};
  const t=canvasTex(W,H,g=>{g.clearRect(0,0,W,H);
    // 볼
    g.globalAlpha=.5;for(const s of[-1,1])ell(g,s*.26,-.13,.058,.05,'#ff8fb1');g.globalAlpha=1;
    // 가면 (눈 둘레가 뚫림, 관자놀이까지)
    if(mask){const c=document.createElement('canvas');c.width=W;c.height=H;const m=c.getContext('2d');m.fillStyle='#22382d';
      for(const s of[-1,1])ell(m,s*.155,-.01,.15,.112,'#22382d');
      {const[ax,ay]=P(-.155,-.01),[bx,by]=P(.155,-.01),[,hy]=S(0,-.01,0,.05);m.beginPath();m.moveTo(ax,ay-hy);m.lineTo(bx,by-hy);m.lineTo(bx,by+hy*.7);m.quadraticCurveTo((ax+bx)/2,ay-hy*.1,ax,ay+hy*.7);m.closePath();m.fill()}
      for(const s of[-1,1]){const[ex,ey]=P(s*.155,-.01),tx=s<0?0:W,[,h0]=S(s*.155,-.01,0,.065),[,h1]=S(s*.155,-.01,0,.026);m.beginPath();m.moveTo(ex,ey-h0);m.quadraticCurveTo((ex+tx)/2,ey-h0*.8,tx,ey-h1);m.lineTo(tx,ey+h1);m.quadraticCurveTo((ex+tx)/2,ey+h0*.8,ex,ey+h0);m.closePath();m.fill()}
      m.globalCompositeOperation='destination-out';for(const s of[-1,1])ell(m,s*.155,-.01,.084,.09,'#000');g.drawImage(c,0,0)}
    // 눈
    for(const s of[-1,1]){ell(g,s*.155,-.01,.084,.09,'#4a2c1c');ell(g,s*.155,-.01,.077,.083,'#ffffff');ell(g,s*.155+.004*s,-.016,.044,.05,'#3a2414');ell(g,s*.155-.014,.012,.016,.017,'#ffffff');ell(g,s*.155+.016,-.034,.008,.008,'#ffffff')}
    // 입
    {const[cx,cy]=P(0,-.15),[a,b]=S(0,-.15,.055,.045);g.strokeStyle='#5a3424';g.lineWidth=Math.max(3,b*.32);g.lineCap='round';g.beginPath();g.ellipse(cx,cy,a,b,0,.25,Math.PI-.25);g.stroke()}});
  t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;return CKFT[k]=t}
// (예전) 도둑 가면: 눈 둘레가 뚫린 가면 모양 (눈 주위는 살색이 보여요), 관자놀이에서 끝나요
let CKMASK=null;
function ckMaskTex(){if(CKMASK)return CKMASK;const R=CK.R+.012,W=512,H=128,len=2.64,ux=W/len/R,vy=H/.24;
  const t=canvasTex(W,H,(g)=>{g.clearRect(0,0,W,H);const cx=W/2,cy=H/2,ex=.155/CK.R*W/len;g.fillStyle='#22382d';
    g.beginPath();for(const s of[-1,1]){g.ellipse(cx+s*ex,cy,.165*ux,.108*vy,0,0,7)}g.fill();
    g.beginPath();g.moveTo(cx-ex,cy-.05*vy);g.lineTo(cx+ex,cy-.05*vy);g.lineTo(cx+ex,cy+.035*vy);g.quadraticCurveTo(cx,cy-.005*vy,cx-ex,cy+.035*vy);g.closePath();g.fill();
    for(const s of[-1,1]){g.beginPath();g.moveTo(cx+s*ex,cy-.06*vy);g.quadraticCurveTo(cx+s*(ex+.3*ux),cy-.045*vy,W/2+s*(W/2-2),cy-.025*vy);g.lineTo(W/2+s*(W/2-2),cy+.02*vy);g.quadraticCurveTo(cx+s*(ex+.3*ux),cy+.05*vy,cx+s*ex,cy+.06*vy);g.closePath();g.fill()}
    g.globalCompositeOperation='destination-out';for(const s of[-1,1]){g.beginPath();g.ellipse(cx+s*ex,cy,.1*ux,.095*vy,0,0,7);g.fill()}g.globalCompositeOperation='source-over'});
  t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;return CKMASK=t}
// 손에 든 막대사탕·쿠키: 몸 바깥쪽으로 기울여 들어요 (몸을 뚫지 않게)
let CKSW=null;
function ckLolli(){const g=new THREE.Group(),L=c=>new THREE.MeshLambertMaterial({color:c});
  const st=new THREE.Mesh(new THREE.CylinderGeometry(.017,.017,.34,8),L('#fff8ee'));st.position.y=.17;g.add(st);
  if(!CKSW)CKSW=canvasTex(128,128,(c,w,h)=>{c.fillStyle='#fff6fb';c.fillRect(0,0,w,h);const cs=['#ff5f9e','#7cc6ff','#ffd35f'];c.lineWidth=9;for(let k=0;k<3;k++){c.strokeStyle=cs[k];c.beginPath();for(let a=0;a<14;a+=.1){const r=a*4.2,x=w/2+Math.cos(a+k*2.1)*r,y=h/2+Math.sin(a+k*2.1)*r;a?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}});
  const cm=new THREE.MeshLambertMaterial({map:CKSW});const side=L('#ffb3d6');
  const d=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.045,28),[side,cm,cm]);d.rotation.x=Math.PI/2;d.position.y=.38;g.add(d);return g}
function ckCookie(){const g=new THREE.Group(),L=c=>new THREE.MeshLambertMaterial({color:c});
  const c=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.035,22),L('#d99a55'));c.rotation.z=Math.PI/2;g.add(c);
  for(let i=0;i<5;i++){const a=i*1.3,r=.03+(i%3)*.03;for(const s of[-1,1]){const ch=new THREE.Mesh(new THREE.SphereGeometry(.018,6,4),L('#4a2a1a'));ch.position.set(s*.018,Math.sin(a)*r,Math.cos(a)*r);g.add(ch)}}return g}
function ckBuild(look){look=look||DEF_EQ;const cid=look.cloth in CKCL?look.cloth:'mint',C=CKCL[cid],mats=[];
  const M=(c,o)=>{const m=new THREE.MeshLambertMaterial(Object.assign({color:c},o||{}));mats.push(m);return m};
  const shirt=M('#ffffff',{map:ckClothTex(cid,5)}),sleeve=M('#ffffff',{map:ckClothTex(cid,3)}),skin=M(CK.SKIN),pants=M('#ffffff',{map:ckSolidTex(C.p)}),hairM=M(CK.HAIR,{side:THREE.DoubleSide});
  const root=new THREE.Group(),body=new THREE.Group();root.add(body);const P={root,body};
  // 다리 (엉덩이에서 돌아요)
  for(const s of[-1,1]){const hip=new THREE.Group();hip.position.set(s*.12,.46,0);body.add(hip);
    const leg=new THREE.Mesh(new THREE.CylinderGeometry(.095,.085,.36,12),pants);leg.position.y=-.2;hip.add(leg);
    const foot=new THREE.Group();foot.position.y=-.46;hip.add(foot);P[s<0?'legR':'legL']=hip;P[s<0?'footR':'footL']=foot}
  {const seat=new THREE.Mesh(new THREE.SphereGeometry(.24,18,10,0,Math.PI*2,Math.PI*.5,Math.PI*.5),pants);seat.scale.set(1.12,.5,.9);seat.position.y=.47;body.add(seat)}
  // 몸통 (줄무늬 티셔츠)
  const prof=[[0,.42],[.27,.42],[.29,.45],[.29,.6],[.27,.76],[.23,.9],[.16,.98],[.1,1.0],[0,1.0]].map(([r,y])=>new THREE.Vector2(r,y));
  const torso=new THREE.Mesh(new THREE.LatheGeometry(prof,28),shirt);body.add(torso);P.torso=torso;
  {const nk=new THREE.Mesh(new THREE.CylinderGeometry(.09,.1,.14,12),skin);nk.position.y=1.02;body.add(nk)}
  // 팔 (어깨에서 돌아요)
  for(const s of[-1,1]){const sh=new THREE.Group();sh.position.set(s*.25,.87,0);body.add(sh);
    const sl=new THREE.Mesh(new THREE.CylinderGeometry(.075,.07,.28,12),sleeve);sl.position.y=-.13;sh.add(sl);
    const cap=new THREE.Mesh(new THREE.SphereGeometry(.078,12,8),sleeve);sh.add(cap);
    const hand=new THREE.Mesh(new THREE.SphereGeometry(.08,12,10),skin);hand.scale.set(1,1.05,.9);hand.position.y=-.33;sh.add(hand);
    const hold=new THREE.Group();hold.position.y=-.34;sh.add(hold);P[s<0?'armR':'armL']=sh;P[s<0?'handR':'handL']=hold}
  // 머리
  const head=new THREE.Group();head.name='ckHead';head.position.y=CK.HY;body.add(head);P.head=head;const R=CK.R;
  const skull=new THREE.Mesh(new THREE.SphereGeometry(R,32,24),skin);skull.scale.set(1,.96,.97);head.add(skull);
  for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.085,12,10),skin);e.scale.set(.55,1,.75);e.position.set(s*R*.99,-.04,-.01);head.add(e);
    const ei=new THREE.Mesh(new THREE.SphereGeometry(.045,8,6),M(CK.SKIN2));ei.scale.set(.4,1,.7);ei.position.set(s*(R*.99+.03),-.04,0);head.add(ei)}
  const face=new THREE.Mesh(ckFaceGeo(),M('#ffffff',{map:ckFaceTex(true),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));face.scale.set(1,.96,.97);head.add(face);P.face=face;P.eyes=[];
  // 머리카락: 정수리·뒤통수 덮개 + 이마에 삐죽삐죽 앞머리
  const hair=new THREE.Group();head.add(hair);P.hair=hair;const HR=R*1.045;
  {const hm=new THREE.Mesh(ckHairGeo(HR),hairM);hm.scale.set(1,.96,.97);hair.add(hm)}
  // 도둑 눈가리개 (관자놀이까지만)
  P.band={visible:true};
  const m={g:null,ck:true,P,mats,state:'idle',t:0,ph:0,acts:{},cur:null,body:'rogue'};return m}
// 걷기·뛰기·대시·쓰러짐: 직접 움직여요
function ckAnim(m,dt){const P=m.P;m.t+=dt;const st=m.state;let lean=0,bob=0,lL=0,lR=0,aL=0,aR=0,az=.22,hy=0,breathe=0;
  if(st==='run'){m.ph+=dt*11;const s=Math.sin(m.ph);lL=s*.8;lR=-s*.8;aL=-s*.75;aR=s*.75;bob=Math.abs(Math.cos(m.ph))*.06;lean=.14;hy=Math.abs(Math.cos(m.ph))*.01}
  else if(st==='dash'){const k=Math.min(1,m.t/.12);lean=.55*k;lL=.9*k;lR=-.7*k;aL=-1.1*k;aR=-1.1*k;bob=.04*k}
  else if(st==='die'){const k=Math.min(1,m.t/.5),e=k*k*(3-2*k);P.body.rotation.x=-1.5*e;P.body.position.y=.12*e;aL=-.6*e;aR=-.6*e;az=.5*e;P.body.position.z=-.4*e}
  else{breathe=Math.sin(m.t*2.4);aL=.04*breathe;aR=-.04*breathe;az=.2+.02*breathe;hy=.008*breathe}
  if(st!=='die'){P.body.rotation.x=lean;P.body.position.y=bob;P.body.position.z=0}
  P.legL.rotation.x=lL;P.legR.rotation.x=lR;P.armL.rotation.x=aL;P.armR.rotation.x=aR;P.armL.rotation.z=az;P.armR.rotation.z=-az;
  P.head.position.y=CK.HY+hy;P.torso.scale.set(1,1+.012*breathe,1)}
{const pl0=play;play=function(m,name,fade,once){if(m&&m.ck){const st=name==='Death_A'?'die':name==='Dodge_Forward'?'dash':name==='Running_A'?'run':'idle';
  if(m.state==='dash'&&m.t<.38&&st!=='die')return;if(m.state==='die'&&st!=='die')return;if(m.state!==st){m.state=st;m.t=0}m.cur=name;return}return pl0(m,name,fade,once)}}
function ckHero(height,look){look=look||DEF_EQ;const m=ckBuild(look),P=m.P;
  P.face.material.map=ckFaceTex((look.eye||'band')==='band');
  {const it=ckLolli();it.rotation.set(.35,0,.7);P.handR.add(it);P.lolli=it;const c=ckCookie();c.position.set(.06,-.02,.05);P.handL.add(c);P.cookie=c}
  if(typeof ckDress==='function')ckDress(m,look);else for(const f of[P.footL,P.footR]){const bm=new THREE.MeshLambertMaterial({color:'#7a4526'});const t=new THREE.Mesh(new THREE.SphereGeometry(.1,14,10),bm);t.scale.set(1,.72,1.45);t.position.set(0,.06,.04);f.add(t);const a=new THREE.Mesh(new THREE.CylinderGeometry(.088,.09,.1,12),bm);a.position.y=.12;f.add(a)}
  const k=(height||1.85)/CK.H;P.root.scale.setScalar(k);const g=new THREE.Group();g.add(P.root);m.g=g;
  g.traverse(o=>{if(o.isMesh){o.frustumCulled=false;const ms=Array.isArray(o.material)?o.material:[o.material];for(const x of ms)if(!m.mats.includes(x))m.mats.push(x)}});
  m.mixer={update:dt=>ckAnim(m,dt)};ckAnim(m,0);return m}
makeHero=function(height,look){return ckHero(height,look)};
