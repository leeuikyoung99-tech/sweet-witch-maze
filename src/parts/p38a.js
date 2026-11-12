/* ================= 38차: 도둑 옷 새로 만들기 (기본 초록 줄무늬만 남기고, 나머지는 캐릭터·멜빵 등 개성 있는 옷) · 왼손 쿠키 빼기 ================= */
// 몸통은 원통처럼 감싼 그림 한 장(앞 가운데 = 그림 가운데)에 옷을 그리고, 단추·벨트·꼬리 같은 건 작은 입체로 붙여요
const OFY=[[.42,.125],[.45,.25],[.6,.375],[.76,.5],[.9,.625],[.98,.75],[1.0,.875]];
const OFR=[[.42,.27],[.45,.29],[.6,.29],[.76,.27],[.9,.23],[.98,.16],[1.0,.1]];
const ofLerp=(T,y)=>{if(y<=T[0][0])return T[0][1];for(let i=1;i<T.length;i++)if(y<=T[i][0]){const[a,va]=T[i-1],[b,vb]=T[i];return va+(vb-va)*(y-a)/(b-a)}return T[T.length-1][1]};
const ofR=y=>ofLerp(OFR,y);
const OW=512,OH=256;
const oY=y=>(1-ofLerp(OFY,y))*OH;                       // 몸 높이 → 그림 세로 위치
const oX=(dx,y)=>OW/2+dx/(2*Math.PI*ofR(y))*OW;          // 앞에서 옆으로 dx 만큼 → 그림 가로 위치
const oXb=(dx,y)=>dx/(2*Math.PI*ofR(y))*OW;              // 등 가운데 기준 (그림 가장자리)
function ofPoly(g,pts,fill,stroke,lw){g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw||3;g.stroke()}}
function ofEll(g,cx,cy,rx,ry,fill,stroke,lw){g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw||3;g.stroke()}}
function ofStar(g,cx,cy,r,fill){g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;g.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}g.closePath();g.fillStyle=fill;g.fill()}
// 앞판 가운데 세로 길이 (y0~y1) 에서 폭 w 인 판
const ofPanel=(g,w,y0,y1,fill,stroke)=>ofPoly(g,[[oX(-w,y1),oY(y1)],[oX(w,y1),oY(y1)],[oX(w,y0),oY(y0)],[oX(-w,y0),oY(y0)]],fill,stroke);
const OUT='#4a2a1a';
// 소매: 위(어깨)부터 아래(손목)까지 / 바지: 위(엉덩이)부터 아래(발목)까지
const sleeveTex=(top,bot,split,cuff)=>(g,w,h)=>{g.fillStyle=top;g.fillRect(0,0,w,h);if(bot){g.fillStyle=bot;g.fillRect(0,h*split,w,h)}if(cuff){g.fillStyle=cuff[0];g.fillRect(0,h*cuff[1],w,h*cuff[2])}};
const pantsTex=(c,cuff)=>(g,w,h)=>{g.fillStyle=c;g.fillRect(0,0,w,h);if(cuff){g.fillStyle=cuff[0];g.fillRect(0,h*cuff[1],w,h)}};
const OF={
  overall:{n:'멜빵바지',pr:300,c:{m:'#3f7fc9',w:'#fff6ea',p:'#3f7fc9'},
    t(g){g.fillStyle='#fff6ea';g.fillRect(0,0,OW,OH);
      g.fillStyle='#3f7fc9';g.fillRect(0,oY(.5),OW,OH);
      ofPanel(g,.135,.48,.79,'#3f7fc9');ofPanel(g,.135,.48,.79,null,'#2a5c9a');
      g.strokeStyle='#3f7fc9';g.lineWidth=20;g.lineCap='round';for(const s of[-1,1]){g.beginPath();g.moveTo(oX(s*.1,.78),oY(.78));g.lineTo(oX(s*.11,.97),oY(.99));g.stroke();g.beginPath();g.moveTo(oXb(s*.1,.97)+(s<0?OW:0),oY(.99));g.lineTo(oXb(s*.1,.55)+(s<0?OW:0),oY(.52));g.stroke()}
      g.fillStyle='#3573b8';g.fillRect(oX(-.07,.7),oY(.7),oX(.07,.7)-oX(-.07,.7),oY(.58)-oY(.7));g.setLineDash([5,4]);g.strokeStyle='#ffd36b';g.lineWidth=2;g.strokeRect(oX(-.07,.7)+3,oY(.7)+3,oX(.07,.7)-oX(-.07,.7)-6,oY(.58)-oY(.7)-6);g.setLineDash([])},
    s:sleeveTex('#fff6ea','#f7c59f',.5),p:pantsTex('#3f7fc9',['#6aa0de',.84]),
    deco(P,M){for(const s of[-1,1]){const b=new THREE.Mesh(new THREE.SphereGeometry(.028,10,8),M('#ffcf3a'));b.scale.z=.5;b.position.set(s*.105,.775,ofR(.775)+.005);P.torso.add(b)}}},
  bear:{n:'곰돌이 잠옷',pr:300,c:{m:'#a8703f',w:'#f6dcb5',p:'#a8703f'},
    t(g){g.fillStyle='#a8703f';g.fillRect(0,0,OW,OH);ofEll(g,OW/2,oY(.62),oX(.15,.62)-OW/2,(oY(.5)-oY(.76))/2+6,'#f6dcb5');
      ofEll(g,OW/2,oY(.62),oX(.15,.62)-OW/2,(oY(.5)-oY(.76))/2+6,null,'#8a5a30',3);
      g.fillStyle='#ff9ec7';ofEll(g,OW/2,oY(.66),10,9,'#ff9ec7');for(const s of[-1,1])ofEll(g,OW/2+s*12,oY(.7),5,5,'#ff9ec7')},
    s:sleeveTex('#a8703f',null,0,['#f6dcb5',.86,.14]),p:pantsTex('#a8703f',['#f6dcb5',.88]),
    deco(P,M){const t=new THREE.Mesh(new THREE.SphereGeometry(.085,14,12),M('#f6dcb5'));t.position.set(0,.5,-.27);P.body.add(t)}},
  dino:{n:'아기 공룡',pr:300,c:{m:'#5cc46a',w:'#ffe9a0',p:'#5cc46a'},
    t(g){g.fillStyle='#5cc46a';g.fillRect(0,0,OW,OH);const cy=oY(.64),rx=oX(.13,.64)-OW/2,ry=(oY(.47)-oY(.86))/2;ofEll(g,OW/2,cy,rx,ry,'#ffe9a0');
      g.strokeStyle='#e8c860';g.lineWidth=3;for(let i=-2;i<=2;i++){const y=cy+i*ry*.36,hw=rx*Math.sqrt(Math.max(0,1-Math.pow(i*.36,2)))*.85;g.beginPath();g.moveTo(OW/2-hw,y);g.quadraticCurveTo(OW/2,y+6,OW/2+hw,y);g.stroke()}
      for(const[x,y,r]of[[.2,.84,9],[.29,.7,7],[.33,.5,8]])for(const s of[-1,1])ofEll(g,OW/2+s*(oX(x,y)-OW/2),oY(y),r,r*.8,'#3fa452')},
    s:sleeveTex('#5cc46a'),p:pantsTex('#5cc46a'),
    deco(P,M){const sp=M('#ff8a3d');for(const[y,h]of[[.94,.1],[.83,.13],[.7,.14],[.57,.12]]){const c=new THREE.Mesh(new THREE.ConeGeometry(.05,h,10),sp);c.rotation.x=-Math.PI/2;c.position.set(0,y,-ofR(y)-h*.35);P.torso.add(c)}
      const tl=new THREE.Mesh(new THREE.ConeGeometry(.1,.42,14),M('#5cc46a'));tl.rotation.x=-Math.PI*.62;tl.position.set(0,.4,-.42);P.body.add(tl)}},
  penguin:{n:'펭귄',pr:300,c:{m:'#2f3a5c',w:'#ffffff',p:'#2f3a5c'},
    t(g){g.fillStyle='#2f3a5c';g.fillRect(0,0,OW,OH);ofEll(g,OW/2,oY(.66),oX(.17,.66)-OW/2,(oY(.43)-oY(.95))/2,'#ffffff')},
    s:sleeveTex('#2f3a5c'),p:pantsTex('#2f3a5c'),
    deco(P,M){const o=M('#ff8a1e'),z=ofR(.95)+.02;for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.ConeGeometry(.045,.09,10),o);w.rotation.z=s*Math.PI/2;w.position.set(s*.045,.95,z);P.torso.add(w)}const k=new THREE.Mesh(new THREE.SphereGeometry(.028,10,8),o);k.position.set(0,.95,z+.005);P.torso.add(k)}},
  chef:{n:'꼬마 요리사',pr:300,c:{m:'#ffffff',w:'#ffffff',p:'#3a3a40'},
    t(g){g.fillStyle='#ffffff';g.fillRect(0,0,OW,OH);g.strokeStyle='#d6dbe4';g.lineWidth=3;g.beginPath();g.moveTo(oX(.05,.95),oY(.95));g.lineTo(oX(.05,.46),oY(.46));g.stroke();
      g.beginPath();g.moveTo(oX(-.09,.97),oY(.97));g.lineTo(oX(.05,.86),oY(.86));g.stroke();g.fillStyle='#eef1f6';g.fillRect(0,oY(.47),OW,6)},
    s:sleeveTex('#ffffff',null,0,['#e6eaf0',.82,.1]),
    p:(g,w,h)=>{const n=8,cw=w/n,chh=h/8;for(let i=0;i<n;i++)for(let j=0;j<8;j++){g.fillStyle=(i+j)%2?'#2a2a30':'#f4f4f4';g.fillRect(i*cw,j*chh,cw+1,chh+1)}},
    deco(P,M){const b=M('#3a3a40');for(const x of[-.07,.09])for(const y of[.56,.68,.8]){const s=new THREE.Mesh(new THREE.SphereGeometry(.022,8,6),b);s.scale.z=.5;s.position.set(x,y,ofR(y)+.004);P.torso.add(s)}
      const r=M('#e8364f');const ring=new THREE.Mesh(new THREE.TorusGeometry(.105,.03,8,20),r);ring.rotation.x=Math.PI/2;ring.position.y=1.0;P.torso.add(ring);
      const kn=new THREE.Mesh(new THREE.ConeGeometry(.06,.12,3),r);kn.rotation.x=Math.PI;kn.position.set(0,.93,ofR(.93)+.03);P.torso.add(kn)}},
  astro:{n:'우주 비행사',pr:350,c:{m:'#f4f6fa',w:'#f4f6fa',p:'#e4e8f0'},
    t(g){g.fillStyle='#f4f6fa';g.fillRect(0,0,OW,OH);const x0=oX(-.1,.78),x1=oX(.1,.78),y0=oY(.8),y1=oY(.6);g.fillStyle='#c9d1dc';g.beginPath();g.roundRect(x0,y0,x1-x0,y1-y0,10);g.fill();g.strokeStyle='#8a96a8';g.lineWidth=3;g.stroke();
      [['#ff5f6e',.35],['#ffd35f',.5],['#4ab3f4',.65]].forEach(([c,f])=>ofEll(g,x0+(x1-x0)*f,y0+(y1-y0)*.35,6,6,c));g.fillStyle='#8a96a8';g.fillRect(x0+10,y0+(y1-y0)*.62,x1-x0-20,6);
      const fx=oX(.2,.86),fy=oY(.88);g.fillStyle='#ff8a3d';g.beginPath();g.roundRect(fx-14,fy,28,18,4);g.fill();ofStar(g,fx,fy+9,6,'#fff')},
    s:sleeveTex('#f4f6fa',null,0,['#ff8a3d',.78,.1]),p:(g,w,h)=>{g.fillStyle='#f4f6fa';g.fillRect(0,0,w,h);g.fillStyle='#c9d1dc';for(const x of[0,w]){g.beginPath();g.roundRect(x-w*.12,h*.42,w*.24,h*.18,6);g.fill()}g.fillStyle='#8a96a8';g.fillRect(0,h*.9,w,h*.1)},
    deco(P,M){const belt=new THREE.Mesh(new THREE.TorusGeometry(.29,.035,8,28),M('#8a96a8'));belt.rotation.x=Math.PI/2;belt.position.y=.5;P.torso.add(belt);
      const col=new THREE.Mesh(new THREE.TorusGeometry(.13,.04,10,24),M('#c9d1dc'));col.rotation.x=Math.PI/2;col.position.y=.99;P.torso.add(col)}},
  detective:{n:'탐정 코트',pr:350,c:{m:'#d8b47a',w:'#ffffff',p:'#4a4a52'},
    t(g){g.fillStyle='#d8b47a';g.fillRect(0,0,OW,OH);ofPoly(g,[[oX(-.1,.99),oY(.99)],[oX(.1,.99),oY(.99)],[OW/2,oY(.72)]],'#ffffff');
      g.fillStyle='#e8364f';ofPoly(g,[[OW/2-5,oY(.96)],[OW/2+5,oY(.96)],[OW/2+7,oY(.78)],[OW/2,oY(.73)],[OW/2-7,oY(.78)]],'#c8304a');
      for(const s of[-1,1])ofPoly(g,[[oX(s*.1,.99),oY(.99)],[oX(s*.16,.93),oY(.93)],[oX(s*.08,.8),oY(.8)],[OW/2,oY(.72)]],'#c49e62','#a8844c',2);
      g.strokeStyle='#b8925a';g.lineWidth=3;g.beginPath();g.moveTo(oX(.04,.72),oY(.72));g.lineTo(oX(.04,.42),oY(.42));g.stroke()},
    s:sleeveTex('#d8b47a',null,0,['#b8925a',.8,.08]),p:pantsTex('#4a4a52'),
    deco(P,M){const br=M('#5a3a2a');for(const x of[-.08,.1])for(const y of[.62,.7]){const s=new THREE.Mesh(new THREE.SphereGeometry(.022,8,6),br);s.scale.z=.5;s.position.set(x,y,ofR(y)+.004);P.torso.add(s)}
      const belt=new THREE.Mesh(new THREE.TorusGeometry(.295,.03,8,28),M('#8a6438'));belt.rotation.x=Math.PI/2;belt.position.y=.53;P.torso.add(belt);
      const bk=new THREE.Mesh(new THREE.BoxGeometry(.08,.06,.02),M('#ffcf3a'));bk.position.set(0,.53,ofR(.53)+.03);P.torso.add(bk);
      const sk=new THREE.Mesh(new THREE.CylinderGeometry(.285,.335,.24,28,1,true),M('#d8b47a',{side:THREE.DoubleSide}));sk.position.y=.36;P.body.add(sk)}},
  pirate:{n:'해적',pr:350,c:{m:'#2a2230',w:'#fffaf0',p:'#5a3a2a'},
    t(g){g.fillStyle='#2a2230';g.fillRect(0,0,OW,OH);ofPoly(g,[[oX(-.12,.99),oY(.99)],[oX(.12,.99),oY(.99)],[oX(.08,.42),oY(.42)],[oX(-.08,.42),oY(.42)]],'#fffaf0');
      ofPoly(g,[[oX(-.06,.99),oY(.99)],[oX(.06,.99),oY(.99)],[OW/2,oY(.84)]],'#f7c59f');g.strokeStyle='#c8b8a0';g.lineWidth=2;g.beginPath();g.moveTo(oX(-.06,.99),oY(.99));g.lineTo(OW/2,oY(.84));g.lineTo(oX(.06,.99),oY(.99));g.stroke()},
    s:sleeveTex('#fffaf0',null,0,['#e8dcc8',.84,.1]),p:pantsTex('#5a3a2a',['#3a2418',.86]),
    deco(P,M){const gd=M('#ffcf3a');for(const s of[-1,1])for(const y of[.6,.72,.84]){const b=new THREE.Mesh(new THREE.SphereGeometry(.02,8,6),gd);b.position.set(s*.095,y,ofR(y)+.004);P.torso.add(b)}
      const sash=new THREE.Mesh(new THREE.TorusGeometry(.3,.045,8,28),M('#e8364f'));sash.rotation.x=Math.PI/2;sash.position.y=.47;P.torso.add(sash);
      const tl=new THREE.Mesh(new THREE.BoxGeometry(.07,.2,.03),M('#e8364f'));tl.position.set(.2,.37,ofR(.47)-.06);tl.rotation.z=.25;tl.rotation.y=.6;P.torso.add(tl)}},
  halloween:{n:'잭오랜턴',pr:300,c:{m:'#ff8a1e',w:'#2a1a2e',p:'#3a2a4a'},
    t(g){g.fillStyle='#ff8a1e';g.fillRect(0,0,OW,OH);const cy=oY(.66);for(const s of[-1,1])ofPoly(g,[[OW/2+s*14,cy-6],[OW/2+s*42,cy-6],[OW/2+s*28,cy-30]],'#2a1a2e');
      ofPoly(g,[[OW/2-6,cy+2],[OW/2+6,cy+2],[OW/2,cy-8]],'#2a1a2e');const my=oY(.55);g.beginPath();g.moveTo(OW/2-48,my-8);for(let i=0;i<=8;i++)g.lineTo(OW/2-48+i*12,my+(i%2?10:0));g.lineTo(OW/2+48,my-8);g.quadraticCurveTo(OW/2,my-2,OW/2-48,my-8);g.fillStyle='#2a1a2e';g.fill()},
    s:sleeveTex('#ff8a1e',null,0,['#3a2a4a',.86,.14]),p:pantsTex('#3a2a4a'),
    deco(P,M){const lf=M('#3fa452');for(let i=0;i<5;i++){const a=i/5*Math.PI*2,l=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),lf);l.scale.set(1,.35,.6);l.position.set(Math.sin(a)*.14,.985,Math.cos(a)*.14);l.rotation.y=a;l.rotation.x=.4;P.torso.add(l)}}},
  xmas:{n:'산타',pr:300,c:{m:'#e8364f',w:'#ffffff',p:'#e8364f'},
    t(g){g.fillStyle='#e8364f';g.fillRect(0,0,OW,OH);g.fillStyle='#ffffff';g.fillRect(OW/2-14,oY(.99),28,oY(.42)-oY(.99));g.fillStyle='#f2f2f2';for(let y=oY(.98);y<oY(.43);y+=12)ofEll(g,OW/2+(y%24?-5:5),y,6,5,'#f2f2f2')},
    s:sleeveTex('#e8364f',null,0,['#ffffff',.8,.2]),p:pantsTex('#e8364f',['#ffffff',.86]),
    deco(P,M){const fur=M('#ffffff');const hem=new THREE.Mesh(new THREE.TorusGeometry(.285,.05,10,30),fur);hem.rotation.x=Math.PI/2;hem.position.y=.44;P.torso.add(hem);
      const belt=new THREE.Mesh(new THREE.TorusGeometry(.295,.032,8,28),M('#2a1a1a'));belt.rotation.x=Math.PI/2;belt.position.y=.56;P.torso.add(belt);
      const bk=new THREE.Mesh(new THREE.BoxGeometry(.09,.07,.02),M('#ffcf3a'));bk.position.set(0,.56,ofR(.56)+.032);P.torso.add(bk);
      const col=new THREE.Mesh(new THREE.TorusGeometry(.12,.045,10,24),fur);col.rotation.x=Math.PI/2;col.position.y=.99;P.torso.add(col)}},
  star:{n:'별빛 마법사',pr:0,c:{m:'#2c2f6e',w:'#ffcf3a',p:'#2c2f6e'},
    t(g){g.fillStyle='#2c2f6e';g.fillRect(0,0,OW,OH);const R=seededRnd(42);for(let i=0;i<40;i++){const x=R()*OW,y=oY(.97)+R()*(oY(.43)-oY(.97));ofStar(g,x,y,4+R()*5,R()<.3?'#ffe9a8':'#ffcf3a')}
      ofPoly(g,[[oX(-.1,.99),oY(.99)],[oX(.1,.99),oY(.99)],[OW/2,oY(.82)]],'#ffcf3a')},
    s:(g,w,h)=>{g.fillStyle='#2c2f6e';g.fillRect(0,0,w,h);ofStar(g,w*.25,h*.4,5,'#ffcf3a');ofStar(g,w*.75,h*.25,4,'#ffcf3a');g.fillStyle='#ffcf3a';g.fillRect(0,h*.84,w,h*.1)},
    p:pantsTex('#2c2f6e'),
    deco(P,M){const gd=M('#ffcf3a');const sash=new THREE.Mesh(new THREE.TorusGeometry(.295,.028,8,28),gd);sash.rotation.x=Math.PI/2;sash.position.y=.52;P.torso.add(sash);
      const sk=new THREE.Mesh(new THREE.CylinderGeometry(.285,.35,.3,28,1,true),M('#ffffff',{map:ofTex('star','t'),side:THREE.DoubleSide}));sk.position.y=.33;P.body.add(sk)}}};
const OFTX={};
function ofTex(id,k){const key=id+':'+k;if(OFTX[key])return OFTX[key];const O=OF[id];
  if(k==='t'){return OFTX[key]=canvasTex(OW,OH,(g)=>O.t(g))}
  const fn=O[k]||sleeveTex(O.c.m);return OFTX[key]=canvasTex(128,64,fn)}
// 옷 목록: 기본 초록 줄무늬(mint)는 그대로, 나머지 줄무늬 옷은 빼고 새 옷으로
for(const id in OF)CKCL[id]=Object.assign({},OF[id].c);
{const ct=ckClothTex;ckClothTex=function(id,rep){if(OF[id])return rep===5?ofTex(id,'t'):ofTex(id,'s');return ct(id,rep)}}
{const items={mint:['도둑 줄무늬',0]};for(const id in OF)items[id]=[OF[id].n,OF[id].pr];SHOP.cloth.items=items}
// 없어진 줄무늬 옷은 코인으로 돌려드려요
{const gone={cake:300,mintchoco:300,macaron:300,cloud:300};let back=0;
  for(const k in gone)if(SAVE.own['cloth:'+k]){delete SAVE.own['cloth:'+k];back+=gone[k]}
  if(!OF[SAVE.eq.cloth]&&SAVE.eq.cloth!=='mint')SAVE.eq.cloth='mint';
  if(back){SAVE.coins+=back;try{saveGame()}catch(e){}setTimeout(()=>{try{tMsg(`줄무늬 옷이 새 옷으로 바뀌어서 ${back}코인을 돌려드렸어요`)}catch(e){}},2500)}}
// 스토리 보상으로 주던 줄무늬 옷도 새 옷으로
try{for(const st of STORY)for(const u of(st.unl||[])){const v=u[1];if(Array.isArray(v)&&v[0]==='o'){if(v[1]==='cake')v[1]='overall';if(v[1]==='cloud')v[1]='bear'}}}catch(e){}
{const ck=ckBuild;ckBuild=function(look){look=look||DEF_EQ;const m=ck(look),id=look.cloth,O=OF[id];if(!O)return m;const P=m.P;
  P.torso.rotation.y=Math.PI;try{m.mats[3].map=ofTex(id,'p');m.mats[3].needsUpdate=true}catch(e){}
  const M=(c,o)=>{const x=new THREE.MeshLambertMaterial(Object.assign({color:c},o||{}));m.mats.push(x);return x};
  const dg=new THREE.Group();P.body.add(dg);try{O.deco&&O.deco(Object.assign({},P,{torso:dg}),M)}catch(e){console.warn(e)}return m}}
// 왼손 쿠키는 빼요
{const ch=ckHero;ckHero=function(h,look){const m=ch(h,look);const P=m.P;if(P.cookie){P.cookie.parent&&P.cookie.parent.remove(P.cookie);P.cookie=null}return m}}
// 상점 그림
{const ii=itemIcon;itemIcon=function(cat,id){if(cat!=='cloth'||!OF[id])return ii(cat,id);const O=OF[id],K='stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"',sh='M14 9 L8 13 L4 22 L10 25 L13 20 V41 H35 V20 L38 25 L44 22 L40 13 L34 9 Q24 15 14 9z';
  const ins={overall:`<rect x="0" y="30" width="48" height="20" fill="#3f7fc9"/><rect x="17" y="19" width="14" height="13" fill="#3f7fc9"/><path d="M18 20 L15 9 M30 20 L33 9" stroke="#3f7fc9" stroke-width="4"/><circle cx="18.5" cy="21" r="1.6" fill="#ffcf3a"/><circle cx="29.5" cy="21" r="1.6" fill="#ffcf3a"/>`,
    bear:`<ellipse cx="24" cy="27" rx="8" ry="9" fill="#f6dcb5"/><circle cx="24" cy="25" r="2.2" fill="#ff9ec7"/>`,
    dino:`<ellipse cx="24" cy="28" rx="7" ry="10" fill="#ffe9a0"/><path d="M19 24 Q24 26 29 24 M18 29 Q24 31 30 29 M19 34 Q24 36 29 34" stroke="#e8c860" stroke-width="1.5" fill="none"/>`,
    penguin:`<ellipse cx="24" cy="27" rx="9" ry="14" fill="#fff"/><path d="M19 13 L24 15 L19 17z M29 13 L24 15 L29 17z" fill="#ff8a1e"/>`,
    chef:`<path d="M18 9 L24 15 L30 9" fill="none" stroke="#e8364f" stroke-width="3"/><g fill="#3a3a40"><circle cx="20" cy="22" r="1.5"/><circle cx="20" cy="29" r="1.5"/><circle cx="20" cy="36" r="1.5"/><circle cx="28" cy="22" r="1.5"/><circle cx="28" cy="29" r="1.5"/><circle cx="28" cy="36" r="1.5"/></g>`,
    astro:`<rect x="17" y="17" width="14" height="10" rx="2" fill="#c9d1dc" stroke="#8a96a8"/><circle cx="20.5" cy="21" r="1.5" fill="#ff5f6e"/><circle cx="24" cy="21" r="1.5" fill="#ffd35f"/><circle cx="27.5" cy="21" r="1.5" fill="#4ab3f4"/><rect x="0" y="33" width="48" height="3.5" fill="#8a96a8"/><rect x="5" y="20" width="5" height="3" fill="#ff8a3d"/>`,
    detective:`<path d="M18 9 L24 26 L30 9z" fill="#fff"/><path d="M23 12 h2 l1 10 l-2 3 l-2 -3z" fill="#e8364f"/><rect x="0" y="30" width="48" height="3" fill="#8a6438"/><rect x="21" y="29" width="6" height="5" fill="#ffcf3a"/>`,
    pirate:`<path d="M18 9 L21 41 H27 L30 9z" fill="#fffaf0"/><rect x="0" y="36" width="48" height="4" fill="#e8364f"/><g fill="#ffcf3a"><circle cx="19" cy="22" r="1.3"/><circle cx="19.5" cy="29" r="1.3"/><circle cx="29" cy="22" r="1.3"/><circle cx="28.5" cy="29" r="1.3"/></g>`,
    halloween:`<path d="M17 21 L21 21 L19 17z M27 21 L31 21 L29 17z" fill="#2a1a2e"/><path d="M16 28 L19 31 L22 28 L25 31 L28 28 L31 31 L32 28 Q24 33 16 28z" fill="#2a1a2e"/>`,
    xmas:`<rect x="21" y="8" width="6" height="34" fill="#fff"/><rect x="0" y="30" width="48" height="3.5" fill="#2a1a1a"/><rect x="20.5" y="29" width="7" height="5.5" fill="#ffcf3a"/><rect x="0" y="38" width="48" height="5" fill="#fff"/>`,
    star:`<path d="M18 9 L24 18 L30 9z" fill="#ffcf3a"/><g fill="#ffcf3a"><path d="M15 26 l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.5-2.5 1.5.6-2.8-2.1-1.9 2.8-.3z"/><path d="M31 21 l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.5 2.2-.3z"/><path d="M27 33 l.9 1.9 2 .2-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.2z"/></g>`}[id]||'';
  return`<svg viewBox="0 0 48 48" aria-hidden="true"><defs><clipPath id="ofc${id}"><path d="${sh}"/></clipPath></defs><g clip-path="url(#ofc${id})"><rect width="48" height="48" fill="${O.c.m}"/>${ins}</g><path d="${sh}" fill="none" ${K}/></svg>`}}
// ----- 안경: 눈보다 크게, 앞에서 보면 눈이 가려지게 (렌즈에 색을 넣고 반짝이 하나) -----
{const ce=ckEye;ckEye=function(id){if(!['heart','star','round','goggle','mono','donut'].includes(id))return ce(id);
  const g=new THREE.Group(),L=CKL,R=CK.R,X=CKEX,Z=CKEZ+.03;
  const lens=c=>new THREE.MeshLambertMaterial({color:c,side:THREE.DoubleSide});
  const place=(m,x,y,dz)=>{m.position.set(x,y==null?-.015:y,Z+(dz||0));m.rotation.y=x*.9;return m};
  const shine=(x,r)=>{const s=new THREE.Mesh(new THREE.CircleGeometry(r*.22,14),new THREE.MeshBasicMaterial({color:'#ffffff'}));place(s,x+(x>0?-1:1)*0+r*.35,-.015+r*.38,.024);s.position.x+= (x>0?-1:1)*0;s.position.x=x-r*.35;return s};
  const bridge=(c,w)=>g.add(rod(new THREE.Vector3(-w,.0,Z+.012),new THREE.Vector3(w,.0,Z+.012),.013,c));
  if(id==='heart'){const fm=L('#ff5f9e');for(const s of[-1,1]){const fr=shapeMesh(heartShape(.175),'#ff5f9e',.022);place(fr,s*X,.012,-.01);g.add(fr);const ln=new THREE.Mesh(new THREE.ShapeGeometry(heartShape(.15)),lens('#d62f76'));place(ln,s*X,.012,.016);g.add(ln);g.add(shine(s*X,.11))}bridge(fm,.04);temples(g,fm,.29,.33)}
  else if(id==='star'){const fm=L('#ffd35f');for(const s of[-1,1]){const fr=shapeMesh(starShape(.19,.105),'#ffd35f',.022);place(fr,s*X,-.01,-.01);g.add(fr);const ln=new THREE.Mesh(new THREE.ShapeGeometry(starShape(.165,.09)),lens('#e8a91a'));place(ln,s*X,-.01,.016);g.add(ln);g.add(shine(s*X,.1))}bridge(fm,.04);temples(g,fm,.3,.32)}
  else if(id==='round'){const fm=L('#8a4a1a');for(const s of[-1,1]){const t=new THREE.Mesh(new THREE.TorusGeometry(.118,.02,8,32),fm);place(t,s*X);g.add(t);const ln=new THREE.Mesh(new THREE.CircleGeometry(.118,28),lens('#5a8fb8'));place(ln,s*X,null,-.002);g.add(ln);g.add(shine(s*X,.118))}
    const br=new THREE.Mesh(new THREE.TorusGeometry(.03,.012,6,12,Math.PI),fm);br.position.set(0,.0,Z+.01);g.add(br);temples(g,fm,.27,.34)}
  else if(id==='goggle'){const fm=L('#ffd35f'),st=L('#7cc6ff',{side:THREE.DoubleSide});for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.125,.115,.06,28),fm);c.rotation.x=Math.PI/2;c.position.set(s*X,-.015,Z-.035);g.add(c);const ln=new THREE.Mesh(new THREE.CircleGeometry(.108,28),lens('#2f8fd0'));ln.position.set(s*X,-.015,Z-.003);g.add(ln);const sh=shine(s*X,.108);sh.rotation.y=0;sh.position.z=Z;g.add(sh)}
    const strap=new THREE.Mesh(new THREE.CylinderGeometry(R*1.075,R*1.075,.06,48,1,true,1.2,Math.PI*2-2.4),st);strap.position.y=-.015;strap.scale.z=.98;g.add(strap);
    for(const s of[-1,1]){const a=1.2;g.add(rod(new THREE.Vector3(s*.27,-.015,Z-.06),new THREE.Vector3(s*Math.sin(a)*R*1.075,-.015,Math.cos(a)*R*1.075*.98),.03,st))}
    g.add(rod(new THREE.Vector3(-.035,-.015,Z-.03),new THREE.Vector3(.035,-.015,Z-.03),.016,fm))}
  else if(id==='mono'){const fm=L('#e9b04a');const t=new THREE.Mesh(new THREE.TorusGeometry(.12,.018,8,32),fm);place(t,-X);g.add(t);const ln=new THREE.Mesh(new THREE.CircleGeometry(.12,28),lens('#7fa8c8'));place(ln,-X,null,-.002);g.add(ln);g.add(shine(-X,.12));
    let p=new THREE.Vector3(-X-.09,-.1,Z-.03);for(let k=0;k<6;k++){const q=new THREE.Vector3(-X-.11-k*.035,-.13-k*.05+k*k*.004,Z-.07-k*.05);g.add(rod(p,q,.007,fm));p=q}}
  else if(id==='donut'){for(const s of[-1,1]){const d=new THREE.Mesh(new THREE.TorusGeometry(.105,.042,10,28),L('#e3a659'));place(d,s*X);g.add(d);
      const ic=new THREE.Mesh(new THREE.TorusGeometry(.105,.044,10,28,Math.PI*1.4),L(s<0?'#ff9ec7':'#8a4a1a'));place(ic,s*X,null,.008);ic.rotation.z=.6;ic.scale.z=.7;g.add(ic);
      const ln=new THREE.Mesh(new THREE.CircleGeometry(.075,24),lens('#4a2a1a'));place(ln,s*X,null,-.004);g.add(ln);g.add(shine(s*X,.07));
      for(let k=0;k<7;k++){const a=k*.8,sp=new THREE.Mesh(new THREE.BoxGeometry(.024,.009,.009),L(['#7cc6ff','#ffd35f','#7ee8c8','#ffffff'][k%4]));sp.position.set(s*X+Math.cos(a)*.105,-.015+Math.sin(a)*.105,Z+.045);sp.rotation.z=a*2;g.add(sp)}}
    const fm=L('#e3a659');bridge(fm,.03);temples(g,fm,.29,.33)}
  return g}}
// ----- 스토리 단계: 작은 그림 표시 대신 칸 색으로 종류를 나누고, 옆 칸에서 설명해요 · 단계를 바꿔도 화면 크기가 그대로 -----
const LOCK_SVG='<svg viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="#fff" stroke="#4a2a1a" stroke-width="2.2"/><path d="M8.5 10.5 V8 a3.5 3.5 0 0 1 7 0 V10.5" fill="none" stroke="#4a2a1a" stroke-width="2.2"/><circle cx="12" cy="15.3" r="1.6" fill="#4a2a1a"/></svg>';
function ofShade(hex,a){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.round(a>0?v+(255-v)*a:v*(1+a));return'#'+[f(r),f(g),f(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}
const STT_COL={esc:'#c98d5f',race:'#3f97e8',surv:'#f0872a',candy:'#ff5f9e',witch:'#8f5fe8',puzzle:'#22a98c',boss:'#ffc23a'};
const STT_D={esc:'출구를 찾아 미로를 빠져나가요',race:'상대 쿠키보다 먼저 반대편에 닿아요',surv:'정해진 시간 동안 잡히지 않고 버텨요',candy:'시간 안에 사탕을 모두 모아요',witch:'과자 마녀가 되어 도둑을 막아요',puzzle:'벽을 밀어 쿠키가 나갈 길을 열어요',boss:'보스 마녀의 큰 마법을 피해 탈출해요'};
{const rs=renderStages;renderStages=function(){rs.apply(this,arguments);const G2=$('stgGrid');if(!G2.querySelector('.ch-t'))return;const ch=STORY[STV.c-1];
  for(const b of G2.querySelectorAll('.st')){const s=(+b.dataset.n)%100,ty=stType(ch.n,s);for(const t of b.querySelectorAll('.ty'))t.remove();const bits=sb2(ch.n,s),stars=[0,1,2].map(k=>`<i class="${(bits>>k)&1?'on':''}">★</i>`).join('');
    if(ty==='boss'){b.classList.add('jl');const ss=b.querySelector('.ss');if(ss)ss.innerHTML=stars;continue}
    const c=STT_COL[ty]||'#c98d5f';b.classList.add('jl');b.style.background='';b.style.setProperty('--c',c);b.style.setProperty('--c1',ofShade(c,.28));b.style.setProperty('--c2',ofShade(c,-.22));
    b.innerHTML=(b.classList.contains('lock')?`<span class="lk">${LOCK_SVG}</span>`:`<b>${s}</b>`)+`<span class="ss">${stars}</span>`}
  const ty=stType(ch.n,STV.s),h=$('stgInfo').querySelector('.si-h');if(h&&STT_D[ty])h.insertAdjacentHTML('afterend',`<div class="si-ty"><i style="background:${STT_COL[ty]}"></i><span>${STT_D[ty]}</span></div>`)}}
{const st=document.createElement('style');st.textContent=`
#stages .pane{height:calc(100dvh - 24px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px))}#stages .stg{flex:1 1 auto;min-height:0;align-items:stretch}#stages .stg-grid{min-height:0}
#stgGrid .st .ty{display:none}
#stgGrid .st.jl{border-radius:18px!important;border:3px solid #4a2a1a!important;background:linear-gradient(var(--c1),var(--c) 55%)!important;box-shadow:0 5px 0 #4a2a1a,inset 0 -6px 0 var(--c2)!important;overflow:hidden;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0!important}
#stgGrid .st.jl::before{content:"";position:absolute;left:12%;right:12%;top:6%;height:22%;border-radius:12px;background:linear-gradient(#ffffffb0,#ffffff20);pointer-events:none;z-index:1}
#stgGrid .st.jl b{position:relative;z-index:2;font:clamp(22px,7vh,32px)/1 var(--f-display)!important;color:#fff;-webkit-text-stroke:3px #4a2a1a;paint-order:stroke;margin-top:2px}
#stgGrid .st.jl .ss{position:relative!important;inset:auto!important;transform:none!important;z-index:2;display:flex;gap:1px;font-size:clamp(10px,3vh,13px)!important;line-height:1;margin-bottom:2px;bottom:auto!important}
#stgGrid .st.jl .ss i{font-style:normal;color:#00000038}#stgGrid .st.jl .ss i.on{color:#ffd23a;text-shadow:0 1px 0 #4a2a1a}
#stgGrid .st.jl .lk{position:relative;z-index:2;width:44%;max-width:30px;aspect-ratio:1}#stgGrid .st.jl .lk svg{width:100%;height:100%}
#stgGrid .st.jl.lock{filter:grayscale(.85) brightness(1.05)!important;opacity:.75!important}
#stgGrid .st.jl.sel{outline:4px solid #fff;outline-offset:2px;box-shadow:0 5px 0 #4a2a1a,0 0 0 9px #ff5f9e,inset 0 -6px 0 var(--c2)!important}
#stgGrid .st.jl.boss31{background:linear-gradient(#fff3c4,#ffc94a 60%)!important;box-shadow:0 5px 0 #4a2a1a,inset 0 -6px 0 #e0a020,0 0 14px 3px #ffc23acc!important;overflow:visible}
#stgGrid .st.jl.boss31.sel{box-shadow:0 5px 0 #4a2a1a,0 0 0 9px #ff5f9e,inset 0 -6px 0 #e0a020!important}
#stgGrid .st.jl.boss31 .ss{position:absolute!important;bottom:4px!important;left:0;right:0;justify-content:center}
@media (max-width:720px){#stages .stg{grid-template-columns:minmax(0,1fr) 205px;gap:10px}#stgInfo .si-g li{font-size:12px}.si-ty{font-size:12px}html[lang=en] #stgGrid .ch-t{padding-left:6px!important;padding-right:6px!important;font-size:12px!important}}
#stgInfo #bStgGo{position:sticky;bottom:0;z-index:3;flex-shrink:0}
.si-ty{display:flex;align-items:flex-start;gap:7px;font:13px/1.35 var(--f-ui);color:#7a5236;margin:-2px 0 2px}.si-ty i{flex:0 0 14px;height:14px;border-radius:5px;border:2px solid var(--choco);margin-top:1px}`;document.head.appendChild(st)}
