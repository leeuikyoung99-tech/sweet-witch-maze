// ================= 테마: 미로 판 모양 · 바닥 · 벽 · 둘레 마을 · 하늘 =================
// 마녀가 고른 테마로 판이 지어져요. 도둑도 그 테마 안에서 뛰어요.
const THEMES={
 candy:{shape:'square',icon:'#8d5432',bg:'#ffd9e8',fog:'#ffe2ec',sky:['#7fc8ff','#bfe3ff','#ffd6ea','#ffe9c9'],hemi:['#fff3f8','#c9a27a',.85],sun:['#fff1d6',.75],
  ground:'#bfeccc',grass:['#a9e4bd','#d3f5dd','#9edcb2'],spr:['#ff7eb6','#7cc6ff','#ffd35f','#ffffff','#b98cff'],river:['#8a5a36','#5a3220','#6e4029','#9c6a44'],plaza:['#fff1dc','#e8c48a'],road:['#c8954f','#ecc98f','#d9ab6a','#b97a3a'],
  floor:{bg:'#4e2a17',t:['#a8683f','#8d5432','#6e3e22'],i1:'#b97a4e',i2:'#9a5c36',sp:['#c98d5f55','#5e321c55']},
  wall:{style:'cracker',face:['#f1cf8c','#e2b46c'],frame:'#b97a3a',rim:'#cf9550',hole:'#8f5a28',holeHi:'#f6dca2',sugar:['#fff6e0aa','#d8a55e'],edge:'#d39a55',joint:'#8a5530'},
  hillC:['#dfa35c','#e9b572','#c88443','#4a2a1a','#5b3420'],castle:'choco',tower:'icecream',scoops:['#ff9ec7','#9df0cf','#fff1c9'],houses:[0,1,2],cup:['#ffb3d6','#a8e0ff','#c9f2c9'],frost:['#fff3e6','#ffd6ea','#fff3e6'],cake:['#ffe9c9','#ffb3d6','#c9a6ff'],roof:'#ff8cc6',
  tree:'cotton',puff:['#ffb3d6','#a8e0ff','#d9c2ff','#ffe0ef'],trunk:'#fff8ee',ring:'lolli',lamp:['#ff5f9e','#7cc6ff','#ffd35f','#7ee8c8','#b98cff'],drops:['#ff5f9e','#5fd3b8','#ffd35f','#b98cff','#ff9e5f'],cane:['#ff5f9e','#ffffff'],rail:'#ff8cc6',
  swirl:['#ff5f9e','#7cc6ff'],cloud:['#ffe0ef','#e0f2ff','#fff6fb','#f0e0ff'],wheel:['#e9b572','#ff8cc6','#ff7eb6'],tube:'#bfe6ff',flyer:'icecream',arc:'rainbow',balloon:'swirl',snow:false},
 ice:{shape:'cone',icon:'#ff8fb8',bg:'#dff1ff',fog:'#e9f6ff',sky:['#7cc0f5','#bfe4ff','#eaf6ff','#ffffff'],hemi:['#ffffff','#a9c8e0',.9],sun:['#ffffff',.7],
  ground:'#e9f6ff',grass:['#d8ecfa','#f7fcff','#cfe5f5'],spr:['#ff9ec7','#9df0cf','#ffe08a','#c9a6ff','#7cc6ff'],river:['#9cb8e0','#6f9de0','#8fb6ec','#cfe2ff'],plaza:['#fffaf2','#cfe0f0'],road:['#d9b77a','#f6e3b4','#e6c98f','#c8a060'],
  floor:{bg:'#6fbfa6',t:['#c9f5e6','#aeeed8','#94e2c8'],alt:['#fff6dc','#ffeec0','#ffe39e'],i1:'#d8faee',i2:'#bff2e0',alti1:'#fffaea',alti2:'#fff1c8',sp:['#ffffff66','#7cc6ff44']},
  wall:{style:'wafer',face:['#ffc6da','#ff9fc2'],frame:'#e8789f',rim:'#ff86b0',cream:'#fff6ee',edge:'#f7b5cc',joint:'#d9668f'},
  hillC:['#f6fbff','#e3f1fb','#ffffff','#ffb3d6','#9df0cf'],castle:'ice',tower:'icecream',scoops:['#a8e0ff','#fff1c9','#ffb3d6'],houses:[3,1,3],cup:['#a8e0ff','#ffb3d6','#c9f2c9'],frost:['#ffffff','#e0f2ff','#ffffff'],cake:['#e0f2ff','#ffd6ea','#d9c2ff'],roof:'#7cc6ff',
  tree:'popsicle',puff:['#ff9ec7','#7cc6ff','#ffd35f','#9df0cf','#c9a6ff'],trunk:'#f6e3c3',ring:'popsicle',lamp:['#a8e0ff','#ffb3d6','#fff1c9','#9df0cf','#d9c2ff'],drops:['#a8e0ff','#ffb3d6','#fff1c9','#9df0cf','#d9c2ff'],cane:['#7cc6ff','#ffffff'],rail:'#7cc6ff',
  swirl:['#7cc6ff','#ffb3d6'],cloud:['#ffffff','#eef8ff','#ffffff','#f4f0ff'],wheel:['#f6e3b4','#a8e0ff','#7cc6ff'],tube:'#d9f2ff',flyer:'icecream',arc:'rainbow',balloon:'swirl',snow:true},
 pumpkin:{shape:'pumpkin',icon:'#ef8634',bg:'#2b1a44',fog:'#3a2456',sky:['#0f0824','#2a1a52','#5e2f72','#ff9a5a'],hemi:['#e6d6ff','#4a2f66',1.05],sun:['#ffd2a8',.6],
  ground:'#3b2a52',grass:['#33244a','#47345f','#2e2142'],spr:['#ff8a3d','#ffd35f','#ffffff','#b98cff','#7ee87e'],river:['#24123a','#6b2fa0','#8a4dd0','#c49cff'],plaza:['#4c3b62','#ff8a3d'],road:['#140b1c','#35223f','#ff8a3d','#ffb36b'],
  floor:{bg:'#1e1028',t:['#ffa65a','#ef8634','#d0681e'],alt:['#a77be0','#8a5ccc','#6d43b0'],i1:'#ffbd7d',i2:'#f0954a',sp:['#ffffff22','#00000033'],alti1:'#b993ea',alti2:'#9369d6'},
  wall:{style:'chocobar',face:['#8a5030','#5e3220'],frame:'#3a1d10',rim:'#a8693d',edge:'#4e2a17',joint:'#2a140a'},
  hillC:['#4a2a3a','#5a3448','#3a2030','#ff8a3d','#b98cff'],castle:'haunted',tower:'jack',scoops:['#ff8a3d','#b98cff','#7ee87e'],houses:[4,5,4],cup:['#ff8a3d','#b98cff','#7ee87e'],frost:['#2a1a2e','#ffd35f','#2a1a2e'],cake:['#2a1a2e','#ff8a3d','#b98cff'],roof:'#6b2fa0',
  tree:'spooky',puff:['#6b2fa0','#2e1a3e','#ff8a3d','#4a2a6a'],trunk:'#2a1a2e',ring:'lolli',lamp:['#ff8a3d','#ffd35f','#b98cff','#7ee87e','#ff8a3d'],drops:['#ff8a3d','#2a1a2e','#b98cff','#ffd35f','#7ee87e'],cane:['#ff8a3d','#2a1a2e'],rail:'#ff8a3d',
  swirl:['#ff8a3d','#2a1a2e'],cloud:['#5a4a7a','#4a3a6a','#6a5a8a','#3a2a5a'],wheel:['#ff8a3d','#2a1a2e','#6b2fa0'],tube:'#c9a6ff',flyer:'bat',arc:'moon',balloon:'ghost',snow:false},
 xmas:{shape:'tree',icon:'#2fae6a',bg:'#e6f0ff',fog:'#eef5ff',sky:['#5f9ee6','#a9d0ff','#e6f2ff','#ffffff'],hemi:['#ffffff','#b9c8dc',.9],sun:['#fff6e6',.7],
  ground:'#f4f8ff',grass:['#e3ecf8','#ffffff','#d9e5f3'],spr:['#e8364f','#2fae6a','#ffd35f','#ffffff','#e8364f'],river:['#9cc0e0','#cfe6f8','#e6f4ff','#ffffff'],plaza:['#fff6ea','#e8364f'],road:['#c0283f','#ffffff','#f08a98','#e8364f'],
  floor:{bg:'#c0283f',t:['#ffffff','#f3f7ff','#e3ecf8'],alt:['#e6f7ec','#d2f0dd','#bde8cd'],i1:'#ffffff',i2:'#f4f8ff',alti1:'#eefaf2',alti2:'#dcf3e5',sp:['#ffffff55','#e8364f33']},
  wall:{style:'ginger',face:['#d08a4a','#b06a30'],frame:'#8a4a20',rim:'#ffffff',edge:'#a8602a',joint:'#ffffff'},
  hillC:['#f8fbff','#e6eef8','#ffffff','#e8364f','#2fae6a'],castle:'xtree',tower:'snowman',scoops:['#ffffff','#ffffff','#ffffff'],houses:[6,1,2],cup:['#e8364f','#2fae6a','#ffffff'],frost:['#ffffff','#ffffff','#ffd6dc'],cake:['#ffffff','#e8364f','#2fae6a'],roof:'#ffffff',
  tree:'pine',puff:['#2fae6a','#249158','#3cbf78'],trunk:'#7a4526',ring:'cane',lamp:['#e8364f','#2fae6a','#ffd35f','#ffffff','#e8364f'],drops:['#e8364f','#2fae6a','#ffffff','#ffd35f','#e8364f'],cane:['#e8364f','#ffffff'],rail:'#2fae6a',
  swirl:['#e8364f','#2fae6a'],cloud:['#ffffff','#f2f7ff','#ffffff','#eef3ff'],wheel:['#2fae6a','#e8364f','#e8364f'],tube:'#dff0ff',flyer:'gift',arc:'star',balloon:'swirl',snow:true},
};
// 판 모양 (출구는 위 가운데, 출발은 아래 가운데에 늘 있어요)
const SHAPES={square:()=>true,
 cone:(x,z)=>z<=7?(x-MID)**2+(z-6.2)**2<=6.7**2:Math.abs(x-MID)<=Math.max(1,Math.round(6*(12-z)/5)),
 pumpkin:(x,z)=>z<=1?Math.abs(x-MID)<=1:((x-MID)/6.6)**2+((z-7.2)/5.4)**2<=1,
 tree:(x,z)=>{if(z>=11)return Math.abs(x-MID)<=1;const w=z<=3?z:z<=7?z-2:z-4;return Math.abs(x-MID)<=w}};
let THEME=null,THEMEID='';
const keepTex=t=>{t.userData=t.userData||{};t.userData.keep=true;return t};const kept=t=>!!(t&&t.userData&&t.userData.keep);
const SWIRLS={};function swirlT(a,b){const k=a+b;return SWIRLS[k]||(SWIRLS[k]=keepTex(canvasTex(128,128,(g,w,h)=>{g.fillStyle='#fff';g.fillRect(0,0,w,h);g.translate(64,64);for(let i=0;i<6;i++){g.rotate(Math.PI/3);g.fillStyle=i%2?a:b;g.beginPath();g.moveTo(0,0);for(let t=0;t<=1;t+=.05){const q=t*4,r=t*64;g.lineTo(Math.cos(q)*r,Math.sin(q)*r)}for(let t=1;t>=0;t-=.05){const q=t*4+.5,r=t*64;g.lineTo(Math.cos(q)*r,Math.sin(q)*r)}g.fill()}})))}
const STRIPES={};function stripeT(a,b,rep){const k=a+b+(rep||'');return STRIPES[k]||(STRIPES[k]=keepTex(canvasTex(64,256,(c,w,h)=>{c.fillStyle=b;c.fillRect(0,0,w,h);c.fillStyle=a;for(let y=-64;y<h;y+=40){c.beginPath();c.moveTo(0,y);c.lineTo(w,y+32);c.lineTo(w,y+52);c.lineTo(0,y+20);c.fill()}},rep||[1,3])))}
function setMap(mat,tex){const o=mat.map;mat.map=tex;mat.needsUpdate=true;if(o&&o!==tex&&!kept(o))o.dispose()}
function disposeTree(root){root.traverse(o=>{if(o.geometry)o.geometry.dispose();const ms=Array.isArray(o.material)?o.material:o.material?[o.material]:[];for(const m of ms){if(m.userData.keep)continue;if(m.map&&!kept(m.map))m.map.dispose();m.dispose()}})}
function skyTex(P){return canvasTex(16,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,P.sky[0]);gr.addColorStop(.42,P.sky[1]);gr.addColorStop(.52,P.sky[2]);gr.addColorStop(1,P.sky[3]);g.fillStyle=gr;g.fillRect(0,0,w,h)})}
// 바닥 한 칸 = 그림 한 장 (2x2 타일)
function floorTex(F){const t=canvasTex(256,256,(g,w,h)=>{g.fillStyle=F.bg;g.fillRect(0,0,w,h);const m=7,seg=(w-2*m)/2;
  for(let yy=0;yy<2;yy++)for(let xx=0;xx<2;xx++){const x0=m+xx*seg+3,y0=m+yy*seg+3,s2=seg-6,alt=F.alt&&(xx+yy)%2===1,T=alt?F.alt:F.t;
    if(F.style==='mint'){const cx=x0+s2/2,cy=y0+s2/2,r=s2/2;g.fillStyle=T[0];g.beginPath();g.arc(cx,cy,r,0,7);g.fill();for(let k=0;k<8;k++){g.fillStyle=k%2?F.i1:T[1];g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,r-4,k*Math.PI/4+.2,(k+1)*Math.PI/4+.2);g.closePath();g.fill()}g.fillStyle='#ffffff';g.beginPath();g.arc(cx,cy,r*.22,0,7);g.fill();g.strokeStyle='#ffffffaa';g.lineWidth=3;g.beginPath();g.arc(cx,cy,r-2,0,7);g.stroke();continue}
    const gr=g.createLinearGradient(x0,y0,x0+s2,y0+s2);gr.addColorStop(0,T[0]);gr.addColorStop(.5,T[1]);gr.addColorStop(1,T[2]);g.fillStyle=gr;g.fillRect(x0,y0,s2,s2);
    g.fillStyle=alt&&F.alti1?F.alti1:F.i1;g.fillRect(x0+5,y0+5,s2-10,s2-10);g.fillStyle=alt&&F.alti2?F.alti2:F.i2;g.fillRect(x0+9,y0+9,s2-18,s2-18);g.fillStyle='#ffffff22';g.fillRect(x0+9,y0+9,s2-18,4)}
  speckle(g,w,h,24,F.sp,1,2.5)});t.repeat.set(1,1);t.anisotropy=8;return t}
// 벽 그림: 크래커 / 웨하스 / 초코바 / 진저브레드
function wallTex(Wl,w2,h2,cols,rows){return canvasTex(w2,h2,(g,w,h)=>{const rr=(x,y,a,b,r)=>{g.beginPath();g.roundRect?g.roundRect(x,y,a,b,r):g.rect(x,y,a,b)};
  if(Wl.style==='cracker'){const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,Wl.face[0]);gr.addColorStop(1,Wl.face[1]);g.fillStyle=Wl.frame;g.fillRect(0,0,w,h);g.fillStyle=gr;rr(10,10,w-20,h-20,18);g.fill();g.strokeStyle=Wl.rim;g.lineWidth=8;g.stroke();
    const mx=w*.09,my=h*.18;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=mx+(w-2*mx)*(c/(cols-1)),y=my+(h-2*my)*(r/(rows-1));const hr=h*.035;g.fillStyle=Wl.holeHi;g.beginPath();g.arc(x+2,y+2,hr*1.6,0,7);g.fill();g.fillStyle=Wl.hole;g.beginPath();g.arc(x,y,hr,0,7);g.fill()}
    for(let i=0;i<220;i++){g.fillStyle=i%3?Wl.sugar[0]:Wl.sugar[1];g.fillRect(14+Math.random()*(w-28),14+Math.random()*(h-28),2,2)}}
  else if(Wl.style==='wafer'){g.fillStyle=Wl.frame;g.fillRect(0,0,w,h);const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,Wl.face[0]);gr.addColorStop(1,Wl.face[1]);g.fillStyle=gr;rr(8,8,w-16,h-16,10);g.fill();
    const lay=4;for(let i=1;i<lay;i++){g.fillStyle=Wl.cream;g.fillRect(8,8+(h-16)*i/lay-5,w-16,10)}
    g.save();rr(8,8,w-16,h-16,10);g.clip();g.strokeStyle=Wl.rim;g.lineWidth=3;const st=h/6;for(let x=-h;x<w+h;x+=st){g.beginPath();g.moveTo(x,0);g.lineTo(x+h,h);g.stroke();g.beginPath();g.moveTo(x+h,0);g.lineTo(x,h);g.stroke()}g.restore();
    for(let i=1;i<lay;i++){g.fillStyle=Wl.cream;g.fillRect(8,8+(h-16)*i/lay-5,w-16,10)}g.fillStyle='#ffffff55';g.fillRect(12,12,w-24,6)}
  else if(Wl.style==='chocobar'){g.fillStyle=Wl.frame;g.fillRect(0,0,w,h);const pad=10,cw=(w-pad*2)/cols,ch=(h-pad*2)/Math.max(2,rows-1);
    for(let r=0;r<Math.max(2,rows-1);r++)for(let c=0;c<cols;c++){const x=pad+c*cw+3,y=pad+r*ch+3,a=cw-6,b=ch-6;g.fillStyle=Wl.rim;rr(x,y,a,b,8);g.fill();const gr=g.createLinearGradient(x,y,x+a,y+b);gr.addColorStop(0,Wl.face[0]);gr.addColorStop(1,Wl.face[1]);g.fillStyle=gr;rr(x+5,y+5,a-10,b-10,6);g.fill();g.fillStyle='#ffffff22';g.fillRect(x+8,y+7,a-16,4)}}
  else{// ginger
    const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,Wl.face[0]);gr.addColorStop(1,Wl.face[1]);g.fillStyle=gr;g.fillRect(0,0,w,h);speckle(g,w,h,160,['#e3a060','#9a5424'],1.5,3.5);
    g.strokeStyle=Wl.rim;g.lineWidth=7;g.lineJoin='round';for(const y0 of[16,h-16]){g.beginPath();for(let x=8,k=0;x<=w-8;x+=w/(cols*2),k++)g.lineTo(x,y0+(k%2?9:-9));g.stroke()}
    const cc=['#e8364f','#2fae6a','#ffd35f'];for(let c=0;c<cols;c++){const x=w*.06+(w*.88)*(c/(cols-1)),y=h/2;g.fillStyle=Wl.rim;g.beginPath();g.arc(x,y,h*.07,0,7);g.fill();g.fillStyle=cc[c%3];g.beginPath();g.arc(x,y,h*.045,0,7);g.fill()}}})}
function hillT(P){const c=P.hillC;return canvasTex(256,256,(g,w,h)=>{g.fillStyle=c[0];g.fillRect(0,0,w,h);speckle(g,w,h,120,[c[1],c[2]],2,5);speckle(g,w,h,26,[c[3],c[4]],5,9)},[3,2])}
function waffleT(){return canvasTex(128,128,(g,w,h)=>{g.fillStyle='#e3a659';g.fillRect(0,0,w,h);g.strokeStyle='#b97a3a';g.lineWidth=6;for(let i=-128;i<256;i+=24){g.beginPath();g.moveTo(i,0);g.lineTo(i+128,128);g.stroke();g.beginPath();g.moveTo(i+128,0);g.lineTo(i,128);g.stroke()}},[4,3])}
// 테마 바꾸기: 판 모양, 재질, 둘레 세상 전부 다시 지어요
function applyTheme(id,force){const P=THEMES[id]||THEMES.candy;if(!force&&THEME===P)return false;THEME=P;THEMEID=THEMES[id]?id:'candy';setShape(P.shape);
  scene.background.set(P.bg);scene.fog.color.set(P.fog);WORLD.hemi.color.set(P.hemi[0]);WORLD.hemi.groundColor.set(P.hemi[1]);WORLD.hemi.intensity=P.hemi[2];sunLight.color.set(P.sun[0]);sunLight.intensity=P.sun[1];
  setMap(WORLD.skyMesh.material,skyTex(P));setMap(MAT.crackerFace,wallTex(P.wall,1024,388,11,3));setMap(MAT.crackerFenceFace,wallTex(P.wall,512,270,6,2));MAT.edge.color.set(P.wall.edge);MAT.joint.color.set(P.wall.joint);setMap(MAT.floor,floorTex(P.floor));
  MOVM=null;HILITE=null;
  if(WORLD.root){scene.remove(WORLD.root);disposeTree(WORLD.root)}const R=WORLD.root=new THREE.Group();scene.add(R);WORLD.anims=[];
  buildVillage(R,P);buildScenery(R,P);buildBoard(R,P);return true}
// 테마를 바꾸고 그 모양에 맞는 벽을 다시 깔아요 (처음 화면·상점 미리보기)
function themeBoard(id){if(!applyTheme(id))return;B.walls=[];autoWalls(WMAX());syncWallMeshes()}
// 미로 판: 모양대로 바닥을 깔고, 가장자리마다 울타리
function buildBoard(R,P){const pos=[],uv=[],nor=[],ind=[];let v=0;
  for(let z=0;z<N;z++)for(let x=0;x<N;x++){if(!MASK[idx(x,z)])continue;const x0=x*C,z0=z*C;pos.push(x0,0,z0,x0+C,0,z0,x0+C,0,z0+C,x0,0,z0+C);uv.push(0,1,1,1,1,0,0,0);nor.push(0,1,0,0,1,0,0,1,0,0,1,0);ind.push(v,v+2,v+1,v,v+3,v+2);v+=4}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ind);
  const floor=new THREE.Mesh(g,MAT.floor);R.add(floor);WORLD.floor=floor;
  const fg=new THREE.BoxGeometry(C,WH*.75,WT),verts=new Set();const seg=(x,z,ry)=>{const m=new THREE.Mesh(fg,MAT.crackerFence);m.position.set(x,WH*.375,z);m.rotation.y=ry;R.add(m)};
  for(let z=0;z<N;z++)for(let x=0;x<N;x++){if(!inM(x,z))continue;
    if(!inM(x,z-1)&&!(z===0&&x===MID)){seg(cx2x(x),z*C,0);verts.add(x+','+z);verts.add((x+1)+','+z)}
    if(!inM(x,z+1)){seg(cx2x(x),(z+1)*C,0);verts.add(x+','+(z+1));verts.add((x+1)+','+(z+1))}
    if(!inM(x-1,z)){seg(x*C,cx2x(z),Math.PI/2);verts.add(x+','+z);verts.add(x+','+(z+1))}
    if(!inM(x+1,z)){seg((x+1)*C,cx2x(z),Math.PI/2);verts.add((x+1)+','+z);verts.add((x+1)+','+(z+1))}}
  const posts=new THREE.InstancedMesh(new THREE.BoxGeometry(WT+.14,WH*.75+.12,WT+.14),MAT.joint,verts.size);let i=0;const M4=new THREE.Matrix4();for(const k of verts){const[a,b]=k.split(',').map(Number);M4.makeTranslation(a*C,WH*.375+.06,b*C);posts.setMatrixAt(i++,M4)}R.add(posts)}
// 마을 땅: 잔디(또는 눈·밤풀) + 길 + 강 + 광장 (한 장의 큰 그림)
const VA=440,VC=[N*C/2,N*C/2];const ROADS=[[0,-1,1],[0,1,.8],[1,0,.9],[-1,0,.9]];const riverR=a=>128+Math.sin(a*3)*10+Math.sin(a*5+1)*6;
function buildVillage(R,P){const W=N*C,cx=VC[0],cz=VC[1],PX=2048,k=PX/VA,px=x=>(x-cx+VA/2)*k,pz=z=>(z-cz+VA/2)*k;
  const base=new THREE.Mesh(new THREE.CircleGeometry(900,48),new THREE.MeshLambertMaterial({color:P.ground}));base.rotation.x=-Math.PI/2;base.position.set(cx,-.08,cz);R.add(base);
  const tex=canvasTex(PX,PX,(g,w,h)=>{g.fillStyle=P.ground;g.fillRect(0,0,w,h);
    for(let i=0;i<9000;i++){g.fillStyle=P.grass[i%3];g.fillRect(Math.random()*w,Math.random()*h,2,2)}
    for(let i=0;i<2600;i++){g.fillStyle=P.spr[i%5];g.save();g.translate(Math.random()*w,Math.random()*h);g.rotate(Math.random()*3);g.fillRect(-3,-1,6,2);g.restore()}
    const riv=(wd,col)=>{g.strokeStyle=col;g.lineWidth=wd*k;g.lineJoin='round';g.beginPath();for(let a=0;a<=Math.PI*2+.01;a+=.03){const r=riverR(a);const x=px(cx+Math.sin(a)*r),y=pz(cz-Math.cos(a)*r);a?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()};
    const Rv=P.river;riv(26,Rv[0]);riv(22,Rv[1]);riv(10,Rv[2]);g.setLineDash([18,40]);riv(3,Rv[3]);g.setLineDash([]);
    g.fillStyle=P.plaza[0];g.fillRect(px(-14),pz(-14),(W+28)*k,(W+28)*k);g.strokeStyle=P.plaza[1];g.lineWidth=2*k;g.strokeRect(px(-14),pz(-14),(W+28)*k,(W+28)*k);
    const Rd=P.road;const road=(x0,z0,x1,z1,wd)=>{g.lineCap='butt';g.strokeStyle=Rd[0];g.lineWidth=(wd+2)*k;g.beginPath();g.moveTo(px(x0),pz(z0));g.lineTo(px(x1),pz(z1));g.stroke();g.strokeStyle=Rd[1];g.lineWidth=wd*k;g.stroke();
      const L=Math.hypot(x1-x0,z1-z0),ux=(x1-x0)/L,uz=(z1-z0)/L;g.strokeStyle=Rd[2];g.lineWidth=1.2*k*.6;for(let d=0;d<L;d+=wd*.8){const mx=x0+ux*d,mz=z0+uz*d;g.beginPath();g.moveTo(px(mx-uz*wd/2),pz(mz+ux*wd/2));g.lineTo(px(mx+uz*wd/2),pz(mz-ux*wd/2));g.stroke()}
      g.fillStyle=Rd[3];for(let d=wd*.4;d<L;d+=wd*.8)for(const o of[-.25,.25]){g.beginPath();g.arc(px(x0+ux*d-uz*o*wd),pz(z0+uz*d+ux*o*wd),1.1*k*.5,0,7);g.fill()}};
    road(cx,-14,cx,-200,12);road(cx,W+14,cx,W+200,10);road(W+14,cz,W+200,cz,10);road(-14,cz,-200,cz,10);
    for(const[x,z,r]of VHOUSES)if(r){g.fillStyle=P.plaza[0];g.beginPath();g.arc(px(x),pz(z),r*k,0,7);g.fill()}});
  tex.anisotropy=8;const ground=new THREE.Mesh(new THREE.PlaneGeometry(VA,VA),new THREE.MeshLambertMaterial({map:tex}));ground.rotation.x=-Math.PI/2;ground.position.set(cx,-.03,cz);R.add(ground)}
const VHOUSES=(()=>{const W=N*C,o=[];const near=[[-30,10],[-34,48],[-24,86],[W+28,6],[W+36,88],[10,W+32],[70,W+30],[-26,W+26],[W+26,W+24],[-60,-30],[W+62,-26],[-70,40],[W+70,58],[20,-34],[60,-30]];
  near.forEach(([x,z],i)=>o.push([x,z,9,i%3]));return o})();
// 집 종류: 0 생강쿠키집 1 컵케이크 2 케이크탑 3 아이스크림 이글루 4 호박집 5 마녀모자탑 6 눈 덮인 생강쿠키집
function makeHouse(kind,i,L,P){const hs=new THREE.Group(),icing=L('#fffaf2'),glow=new THREE.MeshBasicMaterial({color:'#ffd35f'});
  if(kind===0||kind===6){const base=new THREE.Mesh(new THREE.BoxGeometry(8,6,7),L('#c97a3a'));base.position.y=3;hs.add(base);const roof=new THREE.Mesh(new THREE.CylinderGeometry(0,6.4,4.5,4,1),L(kind===6?'#ffffff':P.roof));roof.rotation.y=Math.PI/4;roof.scale.set(1,1,.8);roof.position.y=8.2;hs.add(roof);
    const trim=new THREE.Mesh(new THREE.BoxGeometry(8.4,.5,7.4),icing);trim.position.y=6;hs.add(trim);const door=new THREE.Mesh(new THREE.BoxGeometry(2,3.4,.2),L(kind===6?'#e8364f':'#5a3220'));door.position.set(0,1.7,3.55);hs.add(door);
    for(const s2 of[-1,1]){const win=new THREE.Mesh(new THREE.BoxGeometry(1.4,1.4,.2),kind===6?glow:L('#7cc6ff'));win.position.set(s2*2.5,3.8,3.55);hs.add(win)}
    if(kind===6){const ch=new THREE.Mesh(new THREE.BoxGeometry(1.2,2.6,1.2),L('#e8364f'));ch.position.set(2,9,0);hs.add(ch);for(let k=0;k<6;k++){const b=new THREE.Mesh(new THREE.SphereGeometry(.3,8,6),L(['#e8364f','#2fae6a','#ffd35f'][k%3]));b.position.set(-3.5+k*1.4,6.4,3.75);hs.add(b)}}}
  else if(kind===1){const cup=new THREE.Mesh(new THREE.CylinderGeometry(4.2,3.2,5,20),L(P.cup[i%3]));cup.position.y=2.5;hs.add(cup);
    for(let r=0;r<3;r++){const sw=new THREE.Mesh(new THREE.TorusGeometry(3.6-r*1.1,1.1,10,24),L(P.frost[r]));sw.rotation.x=Math.PI/2;sw.position.y=5.6+r*1.3;hs.add(sw)}
    const ch=new THREE.Mesh(new THREE.SphereGeometry(.9,12,8),L('#e8364f'));ch.position.y=9.5;hs.add(ch);const door=new THREE.Mesh(new THREE.BoxGeometry(1.8,2.8,.3),L('#5a3220'));door.position.set(0,1.4,3.75);hs.add(door)}
  else if(kind===2){P.cake.forEach((c,r)=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(4.6-r*1.3,4.6-r*1.3,3.2,24),L(c));t.position.y=1.6+r*3.2;hs.add(t);const dr=new THREE.Mesh(new THREE.TorusGeometry(4.6-r*1.3,.4,6,24),icing);dr.rotation.x=Math.PI/2;dr.position.y=3.2+r*3.2;hs.add(dr)});
    const cn=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,2,8),L('#ffd35f'));cn.position.y=10.6;hs.add(cn);const fl=new THREE.Mesh(new THREE.SphereGeometry(.35,8,6),new THREE.MeshBasicMaterial({color:'#ffb000'}));fl.position.y=11.8;hs.add(fl)}
  else if(kind===3){const dome=new THREE.Mesh(new THREE.SphereGeometry(5,24,14,0,Math.PI*2,0,Math.PI/2),L(P.cup[i%3]));hs.add(dome);
    for(let k=0;k<9;k++){const d=new THREE.Mesh(new THREE.SphereGeometry(.9,10,8),L(P.cup[i%3]));const a=k/9*Math.PI*2;d.scale.y=1.5;d.position.set(Math.cos(a)*4.8,.8,Math.sin(a)*4.8);hs.add(d)}
    const cone=new THREE.Mesh(new THREE.ConeGeometry(1.1,3.4,12),L('#e3a659'));cone.rotation.x=Math.PI;cone.position.set(1.6,5.6,0);hs.add(cone);const sc=new THREE.Mesh(new THREE.SphereGeometry(1.2,12,8),L('#ffb3d6'));sc.position.set(1.6,7.6,0);hs.add(sc);
    const door=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,1,16,1,false,0,Math.PI),L('#7a4fb0'));door.rotation.x=Math.PI/2;door.position.set(0,0,4.9);door.scale.set(1,1,1);hs.add(door);const cherry=new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),L('#e8364f'));cherry.position.y=5.3;hs.add(cherry)}
  else if(kind===4){const pm=L('#ff8a3d');for(let k=0;k<7;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(3.2,16,12),pm);const a=k/7*Math.PI*2;s.scale.set(.8,1,.8);s.position.set(Math.cos(a)*2.2,3.4,Math.sin(a)*2.2);hs.add(s)}
    const core=new THREE.Mesh(new THREE.SphereGeometry(3.6,16,12),pm);core.position.y=3.4;hs.add(core);const stem=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,2.4,8),L('#4a7a2a'));stem.position.y=7.6;stem.rotation.z=.3;hs.add(stem);
    for(const s2 of[-1,1]){const e=new THREE.Mesh(new THREE.ConeGeometry(.75,1.2,3),glow);e.rotation.x=Math.PI/2;e.rotation.z=Math.PI;e.position.set(s2*1.4,4.4,4.3);hs.add(e)}const mouth=new THREE.Mesh(new THREE.BoxGeometry(2.8,.7,.3),glow);mouth.position.set(0,2.6,4.35);hs.add(mouth)}
  else{const tw=new THREE.Mesh(new THREE.CylinderGeometry(2.8,3.2,7,16),L(['#6b2fa0','#4a2a6a','#2e1a3e'][i%3]));tw.position.y=3.5;hs.add(tw);const brim=new THREE.Mesh(new THREE.CylinderGeometry(4.6,4.6,.5,20),L('#1e1028'));brim.position.y=7.2;hs.add(brim);
    const hat=new THREE.Mesh(new THREE.ConeGeometry(3,6.5,16),L('#1e1028'));hat.position.y=10.5;hat.rotation.z=.18;hs.add(hat);const band=new THREE.Mesh(new THREE.TorusGeometry(2.75,.35,6,20),L('#ff8a3d'));band.rotation.x=Math.PI/2;band.position.y=7.9;hs.add(band);
    const win=new THREE.Mesh(new THREE.BoxGeometry(1.3,1.6,.2),glow);win.position.set(0,4.4,3.05);hs.add(win)}
  return hs}
function buildVillageObjects(S,P,L,hill,waffle){const W=N*C,cx=VC[0],cz=VC[1];const stickM=L(P.trunk);
  const onRoad=(x,z)=>{for(const[dx,dz]of ROADS){const along=(x-cx)*dx+(z-cz)*dz,perp=Math.abs((x-cx)*dz-(z-cz)*dx);if(along>W/2&&perp<10)return true}return false};
  const onRiver=(x,z)=>{const a=Math.atan2(x-cx,-(z-cz)),r=Math.hypot(x-cx,z-cz);return Math.abs(r-riverR(a))<16};
  const nearHouse=(x,z,d)=>VHOUSES.some(h=>Math.hypot(h[0]-x,h[1]-z)<d);
  const inBoard=(x,z)=>x>-18&&x<W+18&&z>-18&&z<W+18;
  VHOUSES.forEach(([x,z,,kind],i)=>{const hs=makeHouse(P.houses[kind],i,L,P);hs.position.set(x,0,z);hs.rotation.y=Math.atan2(cx-x,cz-z);S.add(hs)});
  for(const[dx,dz]of ROADS){const a=Math.atan2(dx,-dz),r=riverR(a);const br=new THREE.Mesh(new THREE.BoxGeometry(14,1.2,34),L({map:waffle}));br.position.set(cx+Math.sin(a)*r,.6,cz-Math.cos(a)*r);br.rotation.y=-a;S.add(br);
    for(const s2 of[-1,1]){const rail=new THREE.Mesh(new THREE.BoxGeometry(.8,1.6,34),L(P.rail));rail.position.set(br.position.x+Math.cos(a)*s2*6.6,1.8,br.position.z+Math.sin(a)*s2*6.6);rail.rotation.y=-a;S.add(rail)}}
  const M4=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),SC=new THREE.Vector3(),COL=new THREE.Color(),E=new THREE.Euler();
  const put=(im,i,x,y,z,s2,col,ry)=>{Q.setFromEuler(E.set(0,ry||0,0));M4.compose(V.set(x,y,z),Q,SC.set(s2,s2,s2));im.setMatrixAt(i,M4);if(col)im.setColorAt(i,COL.set(col))};
  const IM=(geo,mat,n)=>new THREE.InstancedMesh(geo,mat,Math.max(1,n));const white=()=>new THREE.MeshLambertMaterial({color:'#ffffff'});
  const spots=[];for(let t=0;t<3000&&spots.length<70;t++){const a=Math.random()*Math.PI*2,r=24+Math.random()*170,x=cx+Math.sin(a)*(W/2+r),z=cz-Math.cos(a)*(W/2+r);if(inBoard(x,z)||onRoad(x,z)||onRiver(x,z)||nearHouse(x,z,10)||spots.some(q=>Math.hypot(q[0]-x,q[1]-z)<9))continue;spots.push([x,z])}
  const PC=P.puff,n=spots.length;
  if(P.tree==='pine'){const tr=IM(new THREE.CylinderGeometry(.45,.6,3,8),stickM,n),cn=IM(new THREE.ConeGeometry(3.4,4.2,10),white(),n*3),sn=IM(new THREE.ConeGeometry(1.1,1.4,10),L('#ffffff'),n),st=IM(new THREE.SphereGeometry(.5,8,6),new THREE.MeshBasicMaterial({color:'#ffd35f'}),n);
    spots.forEach(([x,z],i)=>{const s=.8+(i%5)*.12;put(tr,i,x,1.5*s,z,s);for(let k=0;k<3;k++)put(cn,i*3+k,x,(4.2+k*2.3)*s,z,s*(1-k*.24),PC[(i+k)%PC.length]);put(sn,i,x,10.3*s,z,s);put(st,i,x,11.2*s,z,s)});S.add(tr);S.add(cn);S.add(sn);S.add(st)}
  else if(P.tree==='popsicle'){const sk=IM(new THREE.BoxGeometry(.6,4,.35),stickM,n),cr=IM(new THREE.BoxGeometry(3,4.6,1.2),white(),n),tp=IM(new THREE.CylinderGeometry(1.5,1.5,1.2,16,1,false,0,Math.PI),white(),n);
    spots.forEach(([x,z],i)=>{const s=.85+(i%5)*.12,ry=(i*1.7)%3;put(sk,i,x,2*s,z,s,null,ry);put(cr,i,x,6.2*s,z,s,PC[i%PC.length],ry);Q.setFromEuler(E.set(Math.PI/2,ry,0,'YXZ'));M4.compose(V.set(x,8.5*s,z),Q,SC.set(s,s,s));tp.setMatrixAt(i,M4);tp.setColorAt(i,COL.set(PC[i%PC.length]))});S.add(sk);S.add(cr);S.add(tp)}
  else{const trunks=IM(new THREE.CylinderGeometry(.35,.45,6,8),stickM,n),puffs=IM(new THREE.SphereGeometry(1,14,10),white(),n*3);
    spots.forEach(([x,z],i)=>{const s2=.8+(i%5)*.12;put(trunks,i,x,3*s2,z,s2);const c=PC[i%PC.length];put(puffs,i*3,x,6.8*s2,z,3.1*s2,c);put(puffs,i*3+1,x+1.6*s2,6*s2,z+.6*s2,2.2*s2,PC[(i+1)%PC.length]);put(puffs,i*3+2,x-1.4*s2,6.2*s2,z-.8*s2,2.3*s2,c)});S.add(trunks);S.add(puffs)}
  const lamps=[];for(const[dx,dz,len]of ROADS)for(let d=W/2+22;d<W/2+175*len;d+=16)for(const s2 of[-1,1]){const x=cx+dx*d+dz*s2*8,z=cz+dz*d-dx*s2*8;if(onRiver(x,z))continue;lamps.push([x,z])}
  const poles=IM(new THREE.CylinderGeometry(.18,.18,5,6),stickM,lamps.length),heads=IM(new THREE.SphereGeometry(.8,12,8),new THREE.MeshBasicMaterial({color:'#ffffff'}),lamps.length);
  lamps.forEach(([x,z],i)=>{put(poles,i,x,2.5,z,1);put(heads,i,x,5.4,z,1,P.lamp[i%P.lamp.length])});S.add(poles);S.add(heads);
  const gd=[];for(let t=0;t<4000&&gd.length<120;t++){const a=Math.random()*Math.PI*2,r=16+Math.random()*190,x=cx+Math.sin(a)*(W/2+r),z=cz-Math.cos(a)*(W/2+r);if(inBoard(x,z)||onRoad(x,z)||onRiver(x,z)||nearHouse(x,z,7))continue;gd.push([x,z])}
  const drops=IM(new THREE.SphereGeometry(1,12,8,0,Math.PI*2,0,Math.PI/2),white(),gd.length);gd.forEach(([x,z],i)=>put(drops,i,x,0,z,.8+(i%4)*.35,P.drops[i%P.drops.length]));S.add(drops);
  const cane=[];for(let d=-12;d<=W+12;d+=6){for(const[x,z]of[[d,-12],[d,W+12],[-12,d],[W+12,d]]){if(Math.abs(x-cx)<8&&z<0)continue;if(Math.abs(x-cx)<6&&z>W)continue;if(Math.abs(z-cz)<6)continue;cane.push([x,z])}}
  const canes=IM(new THREE.CylinderGeometry(.22,.22,2.4,6),white(),cane.length);cane.forEach(([x,z],i)=>put(canes,i,x,1.2,z,1,P.cane[i%2]));S.add(canes)}
// 멀리 보이는 것: 언덕, 북쪽 성, 서쪽 탑, 둘레 나무, 큰 구름
function castleGroup(P,L){const g=new THREE.Group();
  if(P.castle==='xtree'){const trunk=new THREE.Mesh(new THREE.CylinderGeometry(5,6,14,12),L('#7a4526'));trunk.position.y=7;g.add(trunk);
    for(let k=0;k<5;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(34-k*6,22,20),L(['#2fae6a','#249158','#2fae6a','#3cbf78','#249158'][k]));c.position.y=22+k*13;g.add(c);
      for(let j=0;j<10;j++){const a=j/10*Math.PI*2+k,r=(34-k*6)*.78;const b=new THREE.Mesh(new THREE.SphereGeometry(1.8,10,8),new THREE.MeshLambertMaterial({color:['#e8364f','#ffd35f','#7cc6ff','#ffffff'][j%4],emissive:new THREE.Color(['#e8364f','#ffd35f','#7cc6ff','#ffffff'][j%4]),emissiveIntensity:.35}));b.position.set(Math.cos(a)*r,16+k*13,Math.sin(a)*r);g.add(b)}}
    const sh=new THREE.Shape();for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=i%2?4:9;i?sh.lineTo(Math.cos(a)*r,Math.sin(a)*r):sh.moveTo(Math.cos(a)*r,Math.sin(a)*r)}
    const star=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:2,bevelEnabled:false}),new THREE.MeshBasicMaterial({color:'#ffd35f'}));star.position.set(0,92,-1);star.rotation.z=Math.PI;g.add(star);
    g.position.set(N*C/2,0,-60);g.scale.setScalar(.8);return g}
  const K={choco:['#5a3220','#3f2214','#ff5f9e','#fff3e6','#ff8cc6','#ffd35f'],ice:['#d6eeff','#a8d4f5','#ff9ec7','#ffffff','#ffffff','#ff9ec7'],haunted:['#3a2450','#2a1840','#ff8a3d','#b98cff','#1e1028','#7ee87e']}[P.castle]||['#5a3220','#3f2214','#ff5f9e','#fff3e6','#ff8cc6','#ffd35f'];
  const body=L(K[0]),dark=L(K[1]),cream=L(K[3]),roofM=L(K[4]);
  const keep=new THREE.Mesh(new THREE.BoxGeometry(46,34,30),body);keep.position.y=17;g.add(keep);
  for(let i=0;i<9;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(3.6,4,3.6),dark);b.position.set(-20+i*5,36,15.5);g.add(b)}
  const gate=new THREE.Mesh(new THREE.CylinderGeometry(6,6,1,20,1,false,0,Math.PI),L(K[2]));gate.rotation.x=Math.PI/2;gate.position.set(0,8,15.2);g.add(gate);
  for(const[x,z,hgt]of[[-27,-12,52],[27,-12,52],[-27,14,46],[27,14,46],[0,-6,66]]){const t=new THREE.Mesh(new THREE.CylinderGeometry(6,7,hgt,20),body);t.position.set(x,hgt/2,z);g.add(t);
    const drip=new THREE.Mesh(new THREE.TorusGeometry(6.4,1.1,8,24),cream);drip.rotation.x=Math.PI/2;drip.position.set(x,hgt,z);g.add(drip);
    const roof=new THREE.Mesh(new THREE.ConeGeometry(8,P.castle==='haunted'?24:18,20),roofM);roof.position.set(x,hgt+(P.castle==='haunted'?12:9),z);if(P.castle==='haunted')roof.rotation.z=(x>0?-1:1)*.12;g.add(roof);const ball=new THREE.Mesh(new THREE.SphereGeometry(1.6,12,8),L(K[5]));ball.position.set(x,hgt+(P.castle==='haunted'?25:19),z);g.add(ball)}
  if(P.castle==='haunted'){const glow=new THREE.MeshBasicMaterial({color:'#ffd35f'});for(let i=0;i<10;i++){const w=new THREE.Mesh(new THREE.BoxGeometry(2.4,3.4,.4),glow);w.position.set(-18+(i%5)*9,14+Math.floor(i/5)*10,15.3);g.add(w)}}
  if(P.castle==='ice'){g.traverse(o=>{if(o.isMesh&&o.material.color&&o.material.color.getHexString()==='d6eeff'){o.material=new THREE.MeshPhongMaterial({color:'#d6eeff',shininess:90,specular:new THREE.Color('#ffffff'),transparent:true,opacity:.92})}})}
  g.position.set(N*C/2,0,-56);g.scale.setScalar(.8);return g}
function towerGroup(P,L,waffle){const g=new THREE.Group();
  if(P.tower==='jack'){const pm=L('#ff8a3d');for(let k=0;k<8;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(20,20,14),pm);const a=k/8*Math.PI*2;s.scale.set(.75,1,.75);s.position.set(Math.cos(a)*12,22,Math.sin(a)*12);g.add(s)}const core=new THREE.Mesh(new THREE.SphereGeometry(24,20,14),pm);core.position.y=22;g.add(core);
    const stem=new THREE.Mesh(new THREE.CylinderGeometry(3,5,12,10),L('#4a7a2a'));stem.position.y=48;stem.rotation.z=.3;g.add(stem);const glow=new THREE.MeshBasicMaterial({color:'#ffd35f'});
    for(const s2 of[-1,1]){const e=new THREE.Mesh(new THREE.ConeGeometry(4.5,7,3),glow);e.rotation.x=Math.PI/2;e.rotation.z=Math.PI;e.position.set(s2*8,28,26);g.add(e)}const m=new THREE.Mesh(new THREE.BoxGeometry(18,4,1),glow);m.position.set(0,16,27.5);g.add(m);
    g.position.set(-46,0,26);g.rotation.y=Math.PI/2.3;g.scale.setScalar(.6);return g}
  if(P.tower==='snowman'){const wm=L('#ffffff');[[22,22],[16,54],[11,78]].forEach(([r,y])=>{const s=new THREE.Mesh(new THREE.SphereGeometry(r,22,16),wm);s.position.y=y;g.add(s)});
    const coal=L('#2a1a1e');for(const s2 of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(1.6,8,6),coal);e.position.set(s2*4,82,9.6);g.add(e)}const nose=new THREE.Mesh(new THREE.ConeGeometry(1.6,9,10),L('#ff8a3d'));nose.rotation.x=Math.PI/2;nose.position.set(0,78,14);g.add(nose);
    const sc=new THREE.Mesh(new THREE.TorusGeometry(11,3,8,24),L('#e8364f'));sc.rotation.x=Math.PI/2;sc.position.y=68;g.add(sc);const hat=new THREE.Mesh(new THREE.CylinderGeometry(7,7,12,16),coal);hat.position.y=93;g.add(hat);const brim=new THREE.Mesh(new THREE.CylinderGeometry(11,11,1.5,16),coal);brim.position.y=87.5;g.add(brim);
    for(let k=0;k<3;k++){const b=new THREE.Mesh(new THREE.SphereGeometry(1.5,8,6),coal);b.position.set(0,58-k*7,15.5-k*.5);g.add(b)}g.position.set(-46,0,26);g.rotation.y=Math.PI/2.3;g.scale.setScalar(.55);return g}
  const cone=new THREE.Mesh(new THREE.ConeGeometry(16,48,24),L({map:waffle}));cone.rotation.x=Math.PI;cone.position.y=24;g.add(cone);
  [[P.scoops[0],16,54],[P.scoops[1],14.5,76],[P.scoops[2],13,96]].forEach(([c,r,y])=>{const sc=new THREE.Mesh(new THREE.SphereGeometry(r,24,16),L(c));sc.position.y=y;g.add(sc);for(let k=0;k<7;k++){const d=new THREE.Mesh(new THREE.SphereGeometry(r*.22,10,8),L(c));const a=k/7*Math.PI*2;d.scale.y=1.6;d.position.set(Math.cos(a)*r*.92,y-r*.55,Math.sin(a)*r*.92);g.add(d)}});
  const cherry=new THREE.Mesh(new THREE.SphereGeometry(4,16,12),L('#e8364f'));cherry.position.y=112;g.add(cherry);g.scale.setScalar(.55);g.position.set(-46,0,26);return g}
function ringItem(P,L,i){const tr=new THREE.Group(),stick=L(P.trunk==='#2a1a2e'?'#fff8ee':'#fff8ee');
  if(P.ring==='popsicle'){const st=new THREE.Mesh(new THREE.BoxGeometry(1.4,10,.7),L('#f6e3c3'));st.position.y=5;tr.add(st);const c=P.puff[i%P.puff.length];const b=new THREE.Mesh(new THREE.BoxGeometry(7,11,2.4),L(c));b.position.y=14;tr.add(b);const top=new THREE.Mesh(new THREE.CylinderGeometry(3.5,3.5,2.4,20,1,false,0,Math.PI),L(c));top.rotation.x=Math.PI/2;top.position.y=19.5;tr.add(top);return tr}
  if(P.ring==='cane'){const tex=stripeT(P.cane[0],P.cane[1],[1,6]),m=L({map:tex});const st=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,18,10),m);st.position.y=9;tr.add(st);const hk=new THREE.Mesh(new THREE.TorusGeometry(2.6,.9,8,16,Math.PI),m);hk.position.set(2.6,18,0);tr.add(hk);return tr}
  const st=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,16,8),stick);st.position.y=8;tr.add(st);const top=new THREE.MeshLambertMaterial({map:swirlT(P.swirl[0],P.swirl[1])});const d=new THREE.Mesh(new THREE.CylinderGeometry(5,5,1.2,28),[L(P.lamp[i%P.lamp.length]),top,top]);d.rotation.x=Math.PI/2;d.position.y=19;tr.add(d);return tr}
function buildScenery(R,P){const S=new THREE.Group(),cx=N*C/2,cz=N*C/2,L=c=>new THREE.MeshLambertMaterial(typeof c==='string'?{color:c}:c);
  const at=(o,ang,r,y=0)=>{o.position.set(cx+Math.sin(ang)*r,y,cz-Math.cos(ang)*r);S.add(o);return o};
  const hill=hillT(P);
  [[.9,240,70],[1.6,280,90],[2.4,250,60],[3.3,300,110],[4.2,230,75],[5.0,270,95],[5.7,320,120],[.3,330,100]].forEach(([a,r,s2])=>{const m=new THREE.Mesh(new THREE.SphereGeometry(s2,28,14,0,Math.PI*2,0,Math.PI/2),L({map:hill}));m.scale.y=.42;at(m,a,r)});
  S.add(castleGroup(P,L));const waffle=waffleT();S.add(towerGroup(P,L,waffle));
  for(let i=0;i<26;i++){const a=i/26*Math.PI*2+.13,r=110+(i*37%60);const tr=ringItem(P,L,i);tr.rotation.y=-a;at(tr,a,r)}
  for(let i=0;i<9;i++){const cl=new THREE.Group(),c=P.cloud[i%P.cloud.length];for(let k=0;k<5;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(9+k%3*3,14,10),new THREE.MeshBasicMaterial({color:c,fog:false}));p.position.set(k*10-20,(k%2)*4,(k%3)*4);cl.add(p)}at(cl,i*.7+.2,300+i*25,95+(i%4)*18)}
  R.add(S);buildNear(R,P,L,hill,waffle)}
// 미로 바로 둘레 + 도둑만 보는 하늘 (쿠키 통, 날아다니는 것, 구름, 무지개·달·별, 풍선·유령, 눈)
function buildNear(R,P,L,hill,waffle){const S=new THREE.Group(),W=N*C;R.add(S);const SK=new THREE.Group();R.add(SK);WORLD.sky=SK;const stick=L('#fff8ee');
  for(const[x,z,r]of[45,135,225,315,25,160,250,335].map((d,i)=>{const a=d*Math.PI/180,R0=i<4?168:192;return[W/2+Math.sin(a)*R0,W/2-Math.cos(a)*R0,i<4?26:20]})){const m=new THREE.Mesh(new THREE.SphereGeometry(r,28,14,0,Math.PI*2,0,Math.PI/2),L({map:hill}));m.scale.y=.45;m.position.set(x,0,z);S.add(m)}
  buildVillageObjects(S,P,L,hill,waffle);
  // 돌아가는 관람차 (동쪽)
  const wheel=new THREE.Group(),hub=new THREE.Group();const dn=new THREE.Mesh(new THREE.TorusGeometry(13,2.2,14,40),L(P.wheel[0]));hub.add(dn);const glaze=new THREE.Mesh(new THREE.TorusGeometry(13,2.3,10,40,Math.PI*2),L(P.wheel[1]));glaze.scale.set(1,1,.55);glaze.position.z=.9;hub.add(glaze);
  const cars=[];for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const sp=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,13,6),stick);sp.position.set(Math.cos(a)*6.5,Math.sin(a)*6.5,0);sp.rotation.z=a+Math.PI/2;hub.add(sp);
    const car=new THREE.Mesh(new THREE.SphereGeometry(1.6,12,10,0,Math.PI*2,0,Math.PI*.6),L(P.lamp[i%P.lamp.length]));car.rotation.x=Math.PI;cars.push({car,a});wheel.add(car)}
  wheel.add(hub);for(const s2 of[-1,1]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(.6,.9,20,8),L(P.wheel[2]));leg.position.set(s2*5,-8,-2);leg.rotation.z=s2*.28;wheel.add(leg)}
  wheel.position.set(W+34,18,46);wheel.rotation.y=-Math.PI/2.6;S.add(wheel);
  WORLD.anims.push((t)=>{hub.rotation.z=t*.18;for(const c of cars){const a=c.a+t*.18;c.car.position.set(Math.cos(a)*13,Math.sin(a)*13-2.2,0)}});
  // 미로 위를 가로지르는 투명 통 (기둥은 미로 밖)
  const tubeM=new THREE.MeshLambertMaterial({color:P.tube,transparent:true,opacity:.32,depthWrite:false,side:THREE.DoubleSide});
  const cookieM=L('#d99a55'),chipM=L('#4a2a1a');
  const mkCookie=()=>{const g=new THREE.Group();const c=new THREE.Mesh(new THREE.CylinderGeometry(.85,.85,.3,18),cookieM);c.rotation.x=Math.PI/2;g.add(c);for(let k=0;k<4;k++){const d=new THREE.Mesh(new THREE.SphereGeometry(.13,6,4),chipM);d.position.set(Math.cos(k*1.7)*.45,Math.sin(k*1.7)*.45,.16);g.add(d)}return g};
  const pilT=stripeT(P.cane[0],P.cane[1]);
  for(const[a,b,hgt,n,spd]of[[[-14,0,22],[W+14,0,58],17,6,.05],[[14,0,W+14],[W-6,0,-14],20,5,.04]]){
    const pa=new THREE.Vector3(a[0],hgt-3,a[2]),pb=new THREE.Vector3(b[0],hgt-3,b[2]),mid=pa.clone().lerp(pb,.5);mid.y=hgt+7;const curve=new THREE.CatmullRomCurve3([pa,pa.clone().lerp(mid,.5).setY(hgt+4),mid,pb.clone().lerp(mid,.5).setY(hgt+4),pb]);
    SK.add(new THREE.Mesh(new THREE.TubeGeometry(curve,80,1.25,14,false),tubeM));
    for(const p of[pa,pb]){const pil=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.8,p.y+1.5,14),L({map:pilT}));pil.position.set(p.x,(p.y+1.5)/2,p.z);SK.add(pil);const cap=new THREE.Mesh(new THREE.SphereGeometry(2.2,14,10),L('#ffd35f'));cap.position.set(p.x,p.y+1.5,p.z);SK.add(cap)}
    const cs=[];for(let i=0;i<n;i++){const c=mkCookie();SK.add(c);cs.push({c,u:i/n})}
    WORLD.anims.push((t,dt)=>{for(const q of cs){q.u=(q.u+(dt||0)*spd)%1;const u=Math.min(.995,Math.max(.005,q.u)),p=curve.getPointAt(u),tg=curve.getTangentAt(u);q.c.position.copy(p);q.c.lookAt(p.x+tg.x,p.y+tg.y,p.z+tg.z);q.c.rotateZ(t*3)}})}
  // 날아다니는 것: 날개 달린 아이스크림 / 박쥐 / 날개 달린 선물 상자
  const wingM=new THREE.MeshBasicMaterial({color:P.flyer==='bat'?'#2a1a2e':'#ffffff',transparent:true,opacity:.92,side:THREE.DoubleSide});
  for(let i=0;i<10;i++){const g=new THREE.Group();
    if(P.flyer==='bat'){const b=new THREE.Mesh(new THREE.SphereGeometry(.9,12,10),L('#2a1a2e'));g.add(b);for(const s2 of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.16,6,5),new THREE.MeshBasicMaterial({color:'#ffd35f'}));e.position.set(s2*.3,.25,.8);g.add(e);const ear=new THREE.Mesh(new THREE.ConeGeometry(.25,.6,4),L('#2a1a2e'));ear.position.set(s2*.45,.9,0);g.add(ear)}}
    else if(P.flyer==='gift'){const bx=new THREE.Mesh(new THREE.BoxGeometry(1.8,1.8,1.8),L(['#e8364f','#2fae6a','#7cc6ff','#ffd35f'][i%4]));g.add(bx);const rb=L(i%2?'#ffd35f':'#ffffff');const r1=new THREE.Mesh(new THREE.BoxGeometry(1.9,1.9,.35),rb);g.add(r1);const r2=new THREE.Mesh(new THREE.BoxGeometry(.35,1.9,1.9),rb);g.add(r2);const bow=new THREE.Mesh(new THREE.TorusGeometry(.4,.14,6,12),rb);bow.position.y=1.15;g.add(bow)}
    else{const cone=new THREE.Mesh(new THREE.ConeGeometry(.9,2.6,14),L({map:waffle}));cone.rotation.x=Math.PI;cone.position.y=-1.1;g.add(cone);
      const sc=new THREE.Mesh(new THREE.SphereGeometry(1.15,16,12),L(['#ff9ec7','#9df0cf','#fff1c9','#c9a6ff','#ffd3a8','#a8e0ff'][i%6]));sc.position.y=.55;g.add(sc);const ch=new THREE.Mesh(new THREE.SphereGeometry(.3,8,6),L('#e8364f'));ch.position.y=1.65;g.add(ch)}
    const wings=[];for(const s2 of[-1,1]){const w=new THREE.Mesh(P.flyer==='bat'?new THREE.CircleGeometry(1.8,5,0,Math.PI):new THREE.CircleGeometry(1.4,16,0,Math.PI),wingM);w.position.set(s2*.8,.4,0);w.rotation.z=s2*Math.PI/2;g.add(w);wings.push(w)}
    g.scale.setScalar(1.3);SK.add(g);const R0=14+i*6,H=14+(i%4)*5,w0=i*1.1,sp=(i%2?1:-1)*(.12+i*.015);
    WORLD.anims.push(t=>{const a=w0+t*sp;g.position.set(W/2+Math.cos(a)*R0,H+Math.sin(t*1.3+i)*2.2,W/2+Math.sin(a)*R0);g.rotation.y=-a+(sp>0?0:Math.PI);g.rotation.z=Math.sin(t*1.3+i)*.15;const f=Math.sin(t*(P.flyer==='bat'?14:9)+i)*.6;wings[0].rotation.y=f;wings[1].rotation.y=-f})}
  // 낮게 뜬 구름
  const clouds=[];for(let i=0;i<12;i++){const cl=new THREE.Group(),c=P.cloud[i%P.cloud.length];for(let k=0;k<5;k++){const p2=new THREE.Mesh(new THREE.SphereGeometry(4+k%3*1.6,12,9),new THREE.MeshBasicMaterial({color:c,fog:false}));p2.position.set(k*4.5-9,(k%2)*1.8,(k%3)*2);cl.add(p2)}
    const a=i/12*Math.PI*2,r=20+(i*13%50);cl.position.set(W/2+Math.cos(a)*r,42+(i%4)*7,W/2+Math.sin(a)*r);SK.add(cl);clouds.push(cl)}
  WORLD.anims.push((t,dt)=>{for(const c of clouds){c.position.x+=dt*1.2;if(c.position.x>W+90)c.position.x=-90}});
  // 북쪽 하늘: 무지개 / 달 / 큰 별
  if(P.arc==='rainbow')['#ff6b8b','#ffb36b','#ffe66b','#7ee8a8','#7cc6ff','#b98cff'].forEach((c,i)=>{const r=new THREE.Mesh(new THREE.TorusGeometry(120-i*3.2,1.6,8,64,Math.PI),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.55,fog:false,depthWrite:false}));r.position.set(W/2,0,-150);SK.add(r)});
  else if(P.arc==='moon'){const moon=new THREE.Mesh(new THREE.SphereGeometry(22,24,16),new THREE.MeshBasicMaterial({color:'#fff2b8',fog:false}));moon.position.set(W/2+40,120,-240);SK.add(moon);const halo=new THREE.Mesh(new THREE.CircleGeometry(40,32),new THREE.MeshBasicMaterial({color:'#fff2b8',transparent:true,opacity:.18,fog:false,depthWrite:false}));halo.position.copy(moon.position);halo.position.z+=5;halo.lookAt(W/2,0,W/2);SK.add(halo);
    for(let i=0;i<4;i++){const gh=new THREE.Group();const body=new THREE.Mesh(new THREE.SphereGeometry(2.2,14,10),new THREE.MeshLambertMaterial({color:'#ffffff',transparent:true,opacity:.85}));body.scale.y=1.4;gh.add(body);for(const s2 of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.35,8,6),L('#2a1a2e'));e.position.set(s2*.7,.8,1.9);gh.add(e)}const mo=new THREE.Mesh(new THREE.SphereGeometry(.4,8,6),L('#2a1a2e'));mo.scale.y=1.4;mo.position.set(0,-.2,2);gh.add(mo);
      SK.add(gh);const x0=i*25-10,z0=10+i*18,h0=26+i*6;WORLD.anims.push(t=>{gh.position.set(x0+Math.sin(t*.09+i)*30,h0+Math.sin(t*.8+i)*2.5,z0+Math.cos(t*.07+i)*20);gh.rotation.y=t*.3})}}
  else if(P.arc==='star'){const sh=new THREE.Shape();for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=i%2?9:20;i?sh.lineTo(Math.cos(a)*r,Math.sin(a)*r):sh.moveTo(Math.cos(a)*r,Math.sin(a)*r)}const st=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshBasicMaterial({color:'#ffe066',fog:false,side:THREE.DoubleSide}));st.position.set(W/2,110,-170);st.rotation.z=Math.PI;SK.add(st);WORLD.anims.push(t=>{st.rotation.y=Math.sin(t*.4)*.4})}
  // 풍선
  if(P.balloon==='swirl')for(let i=0;i<4;i++){const b=new THREE.Group();const ball=new THREE.Mesh(new THREE.SphereGeometry(4,18,14),new THREE.MeshPhongMaterial({map:swirlT(P.swirl[0],P.swirl[1]),shininess:60}));ball.scale.y=1.15;b.add(ball);
    const bk=new THREE.Mesh(new THREE.CylinderGeometry(1.1,.9,1.4,10),L('#c97a3a'));bk.position.y=-6.5;b.add(bk);for(const[dx,dz]of[[1,1],[-1,1],[1,-1],[-1,-1]]){const rp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,3.2,4),stick);rp.position.set(dx*.8,-5,dz*.8);b.add(rp)}
    SK.add(b);const x0=i*25-10,z0=10+i*18,h0=30+i*6;WORLD.anims.push(t=>{b.position.set(x0+Math.sin(t*.07+i)*30,h0+Math.sin(t*.5+i)*2,z0+Math.cos(t*.05+i)*20);b.rotation.y=t*.2})}
  // 눈 (도둑 하늘에만)
  if(P.snow){const n=700,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=Math.random()*(W+120)-60;pos[i*3+1]=Math.random()*60;pos[i*3+2]=Math.random()*(W+120)-60}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:'#ffffff',size:.45,transparent:true,opacity:.9,depthWrite:false}));SK.add(pts);
    WORLD.anims.push((t,dt)=>{const a=geo.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]-=(dt||0)*(2.2+(i%5)*.4);a[i*3]+=Math.sin(t+i)*(dt||0)*.6;if(a[i*3+1]<0)a[i*3+1]=60}geo.attributes.position.needsUpdate=true})}}
