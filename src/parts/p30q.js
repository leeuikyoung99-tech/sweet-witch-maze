/* ================= 30차 (더): 도둑 얼굴·머리·몸 다듬기 ================= */
// 머리카락: 지그재그 대신 둥근 앞머리 세 갈래, 옆은 귀 위를 덮고, 뒤는 목덜미까지 부드럽게
ckHairEdge=function(phi){const PI=Math.PI;let d=phi-PI/2;while(d>PI)d-=2*PI;while(d<-PI)d+=2*PI;const a=Math.abs(d);
  const sm=(e0,e1,x)=>{const t=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return t*t*(3-2*t)};
  const bump=Math.pow(.5+.5*Math.cos((d+.18)*6.2),1.6)*(1-sm(.75,1.05,a));
  const front=PI*(.385+.055*bump);const side=PI*.5,back=PI*.63;
  let e=front+(side-front)*sm(.85,1.25,a);e=e+(back-e)*sm(1.7,2.4,a);return e};
CKHG=null;
// 머리카락 가장자리는 얇아지며 피부에 붙어요 (옆에서 봐도 계단처럼 잘리지 않게)
ckHairGeo=function(HR){if(CKHG)return CKHG;const R0=CK.R*1.004,g=new THREE.SphereGeometry(HR,256,40,0,Math.PI*2,0,Math.PI*.999);const pos=g.attributes.position,uv=g.attributes.uv;
  for(let i=0;i<pos.count;i++){const phi=uv.getX(i)*Math.PI*2,t=(1-uv.getY(i)),edge=ckHairEdge(phi),th=Math.min(1,t)*edge;
    const k=Math.min(1,Math.max(0,(edge-th)/.32)),r=R0+(HR-R0)*(k*k*(3-2*k));
    pos.setXYZ(i,-r*Math.cos(phi)*Math.sin(th),r*Math.cos(th),r*Math.sin(phi)*Math.sin(th))}
  g.computeVertexNormals();return CKHG=g};
// 얼굴: 큰 눈(흰자 테두리 없이), 얇은 가면, 작은 입
ckFaceTex=function(mask){const k=mask?'m2':'n2';if(CKFT[k])return CKFT[k];const R=CK.R,{p0,pl,t0,tl,W,H}=CKF;
  const ang=(x,y)=>{const z=Math.sqrt(Math.max(1e-6,R*R-x*x-y*y));return[Math.atan2(z,-x),Math.acos(y/R)]};
  const P=(x,y)=>{const[ph,th]=ang(x,y);return[(ph-p0)/pl*W,(th-t0)/tl*H]};
  const S=(x,y,sx,sy)=>{const[,th]=ang(x,y);return[sx/(R*Math.sin(th))/pl*W,sy/R/tl*H]};
  const ell=(g,x,y,rx,ry,col)=>{const[cx,cy]=P(x,y),[a,b]=S(x,y,rx,ry);g.fillStyle=col;g.beginPath();g.ellipse(cx,cy,a,b,0,0,7);g.fill()};
  const EX=.158,EY=-.035;
  const t=canvasTex(W,H,g=>{g.clearRect(0,0,W,H);
    g.globalAlpha=.45;for(const s of[-1,1])ell(g,s*.25,-.15,.06,.045,'#ff8fb1');g.globalAlpha=1;
    if(mask){const c=document.createElement('canvas');c.width=W;c.height=H;const m=c.getContext('2d');const MC='#2b2f4a';
      // 눈 둘레 둥근 테 + 가운데 이음 + 관자놀이로 가는 얇은 끈
      for(const s of[-1,1])ell(m,s*EX,EY+.004,.142,.1,MC);
      {const[ax,ay]=P(-EX,EY),[bx,by]=P(EX,EY),[,hy]=S(0,EY,0,.045);m.fillStyle=MC;m.beginPath();m.moveTo(ax,ay-hy*1.3);m.quadraticCurveTo((ax+bx)/2,ay-hy*.4,bx,by-hy*1.3);m.lineTo(bx,by+hy*.6);m.quadraticCurveTo((ax+bx)/2,ay+hy*.2,ax,ay+hy*.6);m.closePath();m.fill()}
      for(const s of[-1,1]){const[ex,ey]=P(s*EX,EY),tx=s<0?0:W,[,h0]=S(s*EX,EY,0,.05),[,h1]=S(s*EX,EY,0,.024);m.fillStyle=MC;m.beginPath();m.moveTo(ex,ey-h0);m.quadraticCurveTo((ex+tx)/2,ey-h0*.9,tx,ey-h1);m.lineTo(tx,ey+h1);m.quadraticCurveTo((ex+tx)/2,ey+h0*.9,ex,ey+h0);m.closePath();m.fill()}
      m.globalCompositeOperation='destination-out';for(const s of[-1,1])ell(m,s*EX,EY,.074,.068,'#000');g.drawImage(c,0,0)}
    // 눈: 진한 갈색 타원 + 반짝임 두 개 (흰자 테두리 없음)
    for(const s of[-1,1]){ell(g,s*EX,EY,.052,.062,'#3a2418');ell(g,s*EX,EY-.012,.04,.04,'#5a3826');ell(g,s*EX-.016,EY+.02,.017,.019,'#ffffff');ell(g,s*EX+.017,EY-.022,.008,.008,'#ffffffcc')}
    // 눈썹 (가면 위로 살짝)
    if(!mask)for(const s of[-1,1]){const[cx,cy]=P(s*EX,EY+.1),[a,b]=S(s*EX,EY+.1,.045,.012);g.strokeStyle='#4a2c1c';g.lineWidth=Math.max(3,b*1.2);g.lineCap='round';g.beginPath();g.ellipse(cx,cy+b*2,a,b*2.4,0,Math.PI+.5,Math.PI*2-.5);g.stroke()}
    // 입: 작은 웃음
    {const[cx,cy]=P(0,-.175),[a,b]=S(0,-.175,.04,.03);g.strokeStyle='#7a3a2a';g.lineWidth=Math.max(3,b*.42);g.lineCap='round';g.beginPath();g.ellipse(cx,cy,a,b,0,.3,Math.PI-.3);g.stroke()}});
  t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;return CKFT[k]=t};
// 몸: 둥근 몸통, 통통하고 끝이 둥근 팔다리, 엄지가 있는 손, 작은 코
{const cb0=ckBuild;ckBuild=function(look){const m=cb0(look),P=m.P,mats=m.mats;
  const find=(root,fn)=>{let r=null;root.traverse(o=>{if(!r&&fn(o))r=o});return r};
  const shirtM=P.torso.material,skinM=find(P.head,o=>o.isMesh&&o.geometry.type==='SphereGeometry'&&o.geometry.parameters.radius===CK.R).material;
  // 몸통 다시
  P.torso.geometry.dispose();P.torso.geometry=new THREE.LatheGeometry([[0,.4],[.26,.41],[.31,.47],[.325,.6],[.31,.74],[.27,.86],[.2,.95],[.11,1.0],[0,1.01]].map(([r,y])=>new THREE.Vector2(r,y)),32);
  // 팔: 소매를 둥근 원뿔대 + 끝 둥글게, 손은 벙어리장갑 모양
  for(const sh of[P.armL,P.armR]){const s=sh===P.armL?1:-1;const[sl,cap,hand]=sh.children.filter(o=>o.isMesh);
    sl.geometry.dispose();sl.geometry=new THREE.LatheGeometry([[0,-.155],[.074,-.15],[.084,-.1],[.09,0],[.088,.1],[.07,.15],[0,.155]].map(([r,y])=>new THREE.Vector2(r,y)),20);sl.position.y=-.13;
    hand.geometry.dispose();hand.geometry=new THREE.SphereGeometry(.085,18,14);hand.scale.set(1,1.08,.92);hand.position.y=-.34;
    const th=new THREE.Mesh(new THREE.SphereGeometry(.036,12,10),hand.material);th.position.set(s*-.06,-.31,.04);sh.add(th)}
  // 다리: 아래로 살짝 좁아지는 둥근 다리
  for(const hip of[P.legL,P.legR]){const leg=hip.children.find(o=>o.isMesh);if(!leg)continue;leg.geometry.dispose();
    leg.geometry=new THREE.LatheGeometry([[0,-.2],[.092,-.19],[.098,-.13],[.108,0],[.112,.12],[.1,.19],[0,.195]].map(([r,y])=>new THREE.Vector2(r,y)),20)}
  // 코
  {const n=new THREE.Mesh(new THREE.SphereGeometry(.034,14,10),new THREE.MeshLambertMaterial({color:CK.SKIN2}));n.scale.set(1.15,.85,.7);const R=CK.R;n.position.set(0,-.1,Math.sqrt(R*R-.01)*.97);P.head.add(n);mats.push(n.material)}
  // 머리숱: 조금 더 풍성하게
  {const hm=P.hair.children[0];if(hm)hm.scale.set(1.025,.985,1.0)}
  return m}}
