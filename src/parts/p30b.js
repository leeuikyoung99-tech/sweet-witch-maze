/* ================= 30차 (나): 새 도둑 머리에 맞춘 모자 · 신발 ================= */
// 모자는 머리 중심 기준. 머리카락 반지름 CK.R*1.045(세로 .96배). 모자 밑면(base) 위쪽 머리카락은 모두 모자 안에 들어가야 해요
function knitTex(c1,c2,n){return canvasTex(64,16,(g,w,h)=>{g.fillStyle=c1;g.fillRect(0,0,w,h);g.fillStyle=c2;for(let i=0;i<n;i++)g.fillRect(i*w/n,0,w/n*.35,h)},[1,1])}
const CKL=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c},o||{}));
// 위로 갈수록 휘어지는 끝 (원뿔이 그대로 보이지 않게): y>y0인 점을 뒤(-z)·아래로 둥글게 꺾어요
function bendTip(geo,y0,k,side){const p=geo.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);if(y<=y0)continue;const d=y-y0,a=k*d*d;const z=p.getZ(i),x=p.getX(i);
  const ny=y0+d*Math.cos(a)-z*Math.sin(a)*0,nz=z*Math.cos(a)-d*Math.sin(a);p.setXYZ(i,x+(side||0)*a*.1,y0+(y-y0)*Math.cos(a)+z*Math.sin(a),nz)}geo.computeVertexNormals();return geo}
function lathe(pts,seg){return new THREE.LatheGeometry(pts.map(([r,y])=>new THREE.Vector2(r,y)),seg||40)}
function headband(col){const b=new THREE.Mesh(new THREE.TorusGeometry(CK.R*1.07,.032,10,40,Math.PI),CKL(col));b.scale.y=.96;b.rotation.y=0;return b}
function ckHat(id){const g=new THREE.Group(),R=CK.R;g.userData.base=.2;
  if(id==='beanie'){const cm=CKL('#ffffff',{map:knitTex('#2fae74','#26935f',12)});
    const crown=new THREE.Mesh(new THREE.SphereGeometry(R*1.1,32,16,0,Math.PI*2,0,Math.PI*.5),cm);crown.scale.y=.92;crown.position.y=.16;g.add(crown);
    const bm=CKL('#ffffff',{map:knitTex('#2a9a66','#1f7f52',40)});const brim=new THREE.Mesh(new THREE.TorusGeometry(R*1.07,.065,12,40),bm);brim.rotation.x=Math.PI/2;brim.position.y=.17;g.add(brim);
    const fill=new THREE.Mesh(new THREE.CylinderGeometry(R*1.07,R*1.07,.13,40,1,true),bm);fill.position.y=.17;g.add(fill);
    const nub=new THREE.Mesh(new THREE.SphereGeometry(.07,12,10),CKL('#26935f'));nub.scale.y=.75;nub.position.y=.16+R*1.1*.92+.01;g.add(nub);g.rotation.x=-.08}
  else if(id==='ears'){g.userData.base=9;g.add(headband('#c98a4a'));
    for(const s of[-1,1]){const e=new THREE.Group(),a=.62;e.position.set(s*Math.sin(a)*R*1.07,Math.cos(a)*R*1.07*.96,0);e.rotation.z=-s*a;
      const c=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.06,24),CKL('#d99a55'));c.rotation.x=Math.PI/2;c.position.y=.1;e.add(c);
      const inr=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.02,20),CKL('#ffb3c6'));inr.rotation.x=Math.PI/2;inr.position.set(0,.1,.035);e.add(inr);
      for(const[x,y]of[[-.08,.16],[.08,.05],[.05,.18]]){const ch=new THREE.Mesh(new THREE.SphereGeometry(.018,6,4),CKL('#4a2a1a'));ch.position.set(x,y,.03);e.add(ch)}g.add(e)}}
  else if(id==='bunny'){g.userData.base=9;g.add(headband('#ffd6ea'));
    for(const s of[-1,1]){const e=new THREE.Group(),a=.32;e.position.set(s*Math.sin(a)*R*1.07,Math.cos(a)*R*1.07*.96,0);e.rotation.z=-s*(a+.12);
      const o=new THREE.Mesh(new THREE.SphereGeometry(.1,16,12),CKL('#fff8f2'));o.scale.set(1,3,.55);o.position.y=.27;e.add(o);
      const i=new THREE.Mesh(new THREE.SphereGeometry(.06,14,10),CKL('#ffb3d6'));i.scale.set(1,3.5,.4);i.position.set(0,.26,.035);e.add(i);g.add(e)}}
  else if(id==='beret'){g.userData.base=.27;const b=new THREE.Mesh(new THREE.SphereGeometry(.52,32,16),CKL('#fff6ee'));b.scale.set(1,.34,1);b.position.set(.04,.34,-.02);b.rotation.z=-.14;g.add(b);
    const sw=new THREE.Mesh(new THREE.TorusGeometry(.07,.035,10,20),CKL('#ffe0ef'));sw.rotation.x=Math.PI/2;sw.position.set(-.12,.48,.12);g.add(sw);
    const sw2=new THREE.Mesh(new THREE.SphereGeometry(.06,12,10),CKL('#ffe0ef'));sw2.position.set(-.12,.52,.12);g.add(sw2);
    const ch=new THREE.Mesh(new THREE.SphereGeometry(.05,12,10),CKL('#e8364f'));ch.position.set(-.12,.59,.12);g.add(ch);
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.015,.03,.08,8),CKL('#fff6ee'));st.position.set(.07,.52,-.02);st.rotation.z=-.3;g.add(st)}
  else if(id==='cupcake'){g.userData.base=.16;const lt=canvasTex(64,8,(c,w,h)=>{c.fillStyle='#ff9ec7';c.fillRect(0,0,w,h);c.fillStyle='#ff7eb6';for(let i=0;i<16;i++)c.fillRect(i*4,0,2,h)},[1,1]);
    const liner=new THREE.Mesh(new THREE.CylinderGeometry(.51,.47,.2,40),CKL('#ffffff',{map:lt}));liner.position.y=.24;g.add(liner);
    const fr=new THREE.Mesh(lathe([[.53,.33],[.54,.37],[.5,.43],[.42,.48],[.36,.5],[.33,.55],[.24,.6],[.17,.62],[.1,.67],[0,.69]]),CKL('#fff3e6'));g.add(fr);
    const ch=new THREE.Mesh(new THREE.SphereGeometry(.07,14,10),CKL('#e8364f'));ch.position.y=.74;g.add(ch);
    const cols=['#ff5f9e','#7cc6ff','#ffd35f','#7ee8c8'];for(let k=0;k<14;k++){const a=k*2.4,r=.18+(k%3)*.1,y=k%3===2?.47:k%3?.55:.62;const sp=new THREE.Mesh(new THREE.BoxGeometry(.05,.016,.016),CKL(cols[k%4]));sp.position.set(Math.cos(a)*r,y,Math.sin(a)*r);sp.rotation.y=a*1.7;g.add(sp)}}
  else if(id==='cone'){g.userData.base=.18;const sc=new THREE.Mesh(lathe([[0,.06],[.36,.1],[.49,.2],[.5,.3],[.45,.42],[.32,.52],[.17,.57],[0,.58]]),CKL('#ffb3d6'));g.add(sc);
    for(let k=0;k<9;k++){const a=k/9*Math.PI*2+.3,d=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),CKL('#ffb3d6'));d.scale.set(1,1.5,1);d.position.set(Math.cos(a)*.47,.16-(k%3)*.03,Math.sin(a)*.47);g.add(d)}
    const wt=waffleT?waffleT():null;const cone=new THREE.Mesh(lathe([[.2,.54],[.19,.6],[.1,.82],[.02,.93],[0,.94]],24),wt?CKL('#ffffff',{map:wt}):CKL('#e3a659'));g.add(cone);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(.2,.03,8,24),CKL('#d99a55'));rim.rotation.x=Math.PI/2;rim.position.y=.55;g.add(rim)}
  else if(id==='crown'){g.userData.base=.3;const gold=CKL('#e9b04a',{side:THREE.DoubleSide});const geo=new THREE.CylinderGeometry(.36,.36,.14,60,1,true);const p=geo.attributes.position;
    for(let i=0;i<p.count;i++){if(p.getY(i)>0){const a=Math.atan2(p.getZ(i),p.getX(i)),t=Math.abs(((a/(Math.PI*2)*6)%1+1)%1-.5)*2;p.setY(i,.07+.13*(1-t))}}geo.computeVertexNormals();
    const band=new THREE.Mesh(geo,gold);band.position.y=.37;g.add(band);
    const cu=new THREE.Mesh(new THREE.SphereGeometry(.355,32,16,0,Math.PI*2,0,Math.PI*.5),CKL('#e8364f'));cu.scale.y=.55;cu.position.y=.31;g.add(cu);
    for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.PI/12;const gm=new THREE.Mesh(new THREE.SphereGeometry(.035,10,8),CKL(['#ff5f9e','#7cc6ff','#7ee8c8'][k%3]));gm.position.set(Math.cos(a)*.36,.58,Math.sin(a)*.36);g.add(gm);
      const jw=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),CKL('#4a2a1a'));jw.scale.z=.5;jw.position.set(Math.cos(a+.5)*.365,.36,Math.sin(a+.5)*.365);jw.lookAt(0,.36,0);g.add(jw)}}
  else if(id==='witch'){g.userData.base=.2;const br=new THREE.Mesh(new THREE.CylinderGeometry(.66,.66,.03,40),CKL('#5a2fc0'));br.position.y=.19;g.add(br);
    const geo=bendTip(lathe([[.46,.2],[.44,.27],[.36,.4],[.27,.55],[.19,.7],[.11,.85],[.05,.97],[0,1.02]],32),.62,7);const c=new THREE.Mesh(geo,CKL('#7a45e0'));g.add(c);
    const bd=new THREE.Mesh(new THREE.CylinderGeometry(.455,.465,.08,40),CKL('#ff7eb6'));bd.position.y=.25;g.add(bd);
    const st=shapeMesh(starShape(.06,.03),'#ffd35f',.015);st.position.set(0,.22,.45);g.add(st)}
  else if(id==='santa'){g.userData.base=.2;const red=CKL('#d61f32');
    const geo=bendTip(lathe([[.45,.2],[.44,.3],[.38,.42],[.3,.54],[.22,.66],[.14,.78],[.07,.9],[0,.98]],32),.42,4.2);const c=new THREE.Mesh(geo,red);g.add(c);
    const fur=new THREE.Mesh(new THREE.TorusGeometry(.46,.08,12,40),CKL('#ffffff'));fur.rotation.x=Math.PI/2;fur.position.y=.21;g.add(fur);
    const tp=new THREE.Vector3(0,.98,0);{const y0=.42,d=tp.y-y0,a=4.2*d*d;tp.set(0,y0+d*Math.cos(a),-d*Math.sin(a))}const pom=new THREE.Mesh(new THREE.SphereGeometry(.1,14,12),CKL('#ffffff'));pom.position.copy(tp);g.add(pom)}
  else if(id==='berry'){g.userData.base=.16;const st=canvasTex(64,64,(c,w,h)=>{c.fillStyle='#ff4f6d';c.fillRect(0,0,w,h);c.fillStyle='#ffe08a';for(let i=0;i<4;i++)for(let j=0;j<4;j++){c.beginPath();c.ellipse(i*16+8+(j%2)*8,j*16+8,1.8,2.8,0,0,7);c.fill()}},[6,3]);
    const cap=new THREE.Mesh(lathe([[.5,.12],[.52,.2],[.5,.3],[.43,.42],[.3,.52],[.15,.57],[0,.58]]),CKL('#ffffff',{map:st}));g.add(cap);
    for(let k=0;k<7;k++){const a=k/7*Math.PI*2;const lf=new THREE.Mesh(new THREE.SphereGeometry(.2,14,8),CKL(k%2?'#3fbf6f':'#2fa85a'));lf.scale.set(.42,.1,1);lf.position.set(Math.cos(a)*.17,.56,Math.sin(a)*.17);lf.rotation.y=-a+Math.PI/2;lf.rotation.x=0;lf.rotateX(.28);g.add(lf)}
    const sm=new THREE.Mesh(new THREE.CylinderGeometry(.03,.045,.18,10),CKL('#2f8a4a'));sm.position.set(.02,.66,0);sm.rotation.z=-.25;g.add(sm)}
  else if(id==='pudding'){g.userData.base=.3;const p=new THREE.Mesh(lathe([[0,.29],[.37,.29],[.36,.33],[.3,.56],[.28,.6],[0,.6]]),CKL('#ffd86a'));g.add(p);
    const top=new THREE.Mesh(lathe([[0,.6],[.285,.6],[.29,.62],[.25,.65],[0,.66]]),CKL('#8a4a1a'));g.add(top);
    for(let k=0;k<6;k++){const a=k/6*Math.PI*2+.4,d=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),CKL('#8a4a1a'));d.scale.set(1,1.8,.6);const r=.29+.0;d.position.set(Math.cos(a)*r,.55,Math.sin(a)*r);d.lookAt(0,.55,0);g.add(d)}
    const cr=new THREE.Mesh(new THREE.SphereGeometry(.09,14,10),CKL('#fff6ee'));cr.scale.y=.8;cr.position.y=.7;g.add(cr);const ch=new THREE.Mesh(new THREE.SphereGeometry(.055,12,10),CKL('#e8364f'));ch.position.y=.79;g.add(ch)}
  return g}
// 신발 (발바닥 y=0, 앞 +z)
function ckShoe(id){const g=new THREE.Group(),L=CKL;const toe=(c,sx,sy,sz)=>{const t=new THREE.Mesh(new THREE.SphereGeometry(.105,16,12),L(c));t.scale.set(sx||1,sy||.7,sz||1.45);t.position.set(0,.06,.04);return t};
  const sole=(c,h)=>{const s=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,h||.03,18),L(c));s.scale.set(1.08,1,1.55);s.position.set(0,(h||.03)/2,.04);return s};
  if(id==='macaron'){g.add(toe('#ffb3d6'));g.add(sole('#ffffff',.045));const ln=new THREE.Mesh(new THREE.TorusGeometry(.05,.012,6,14,Math.PI),L('#7ee8c8'));ln.position.set(0,.11,.07);ln.rotation.x=-.9;g.add(ln);
    const st=new THREE.Mesh(new THREE.TorusGeometry(.098,.012,6,24),L('#c9a6ff'));st.rotation.x=Math.PI/2;st.scale.set(1.05,1.5,1);st.position.set(0,.05,.04);g.add(st)}
  else if(id==='choco'){g.add(toe('#5a3220'));const sh=new THREE.Mesh(new THREE.CylinderGeometry(.098,.09,.2,16),L('#5a3220'));sh.position.y=.15;g.add(sh);
    const ic=new THREE.Mesh(new THREE.TorusGeometry(.098,.025,8,20),L('#fff3e6'));ic.rotation.x=Math.PI/2;ic.position.y=.25;g.add(ic);
    for(let k=0;k<5;k++){const a=k*1.25,d=new THREE.Mesh(new THREE.SphereGeometry(.022,8,6),L('#fff3e6'));d.scale.y=1.6;d.position.set(Math.cos(a)*.1,.22,Math.sin(a)*.1);g.add(d)}g.add(sole('#3a1d10'))}
  else if(id==='jelly'){g.add(sole('#7ee8c8',.04));const jm=L('#ff7eb6',{transparent:true,opacity:.8});for(const z of[.0,.1]){const s=new THREE.Mesh(new THREE.TorusGeometry(.085,.022,8,18,Math.PI),jm);s.position.set(0,.04,z);s.scale.y=.8;g.add(s)}
    const ft=new THREE.Mesh(new THREE.SphereGeometry(.09,12,10),CKL(CK.SKIN));ft.scale.set(.95,.55,1.3);ft.position.set(0,.07,.04);g.add(ft)}
  else if(id==='cookie'){g.add(toe('#d99a55',1.12,.8,1.5));for(const[x,z]of[[-.05,.12],[.05,.06],[0,-.02],[.06,.16],[-.06,.02]]){const c=new THREE.Mesh(new THREE.SphereGeometry(.018,6,4),L('#4a2a1a'));c.position.set(x,.12,z);g.add(c)}
    const fur=new THREE.Mesh(new THREE.TorusGeometry(.085,.03,8,18),L('#fff3e6'));fur.rotation.x=Math.PI/2;fur.position.y=.12;g.add(fur)}
  else if(id==='candy'){g.add(toe('#e8364f',1,.66,1.45));g.add(sole('#7a1a2a',.04));const k=new THREE.Group();k.position.set(0,.12,.1);
    const c=new THREE.Mesh(new THREE.SphereGeometry(.03,10,8),L('#ffffff'));k.add(c);for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),L(s<0?'#ffffff':'#ffd35f'));w.scale.set(1.3,.6,.5);w.position.x=s*.05;k.add(w)}g.add(k)}
  else if(id==='cotton'){g.add(toe('#c9a6ff'));for(let k=0;k<9;k++){const a=k/9*Math.PI*2,p=new THREE.Mesh(new THREE.SphereGeometry(.045,10,8),L(['#ffd6ea','#d9c2ff','#a8e0ff'][k%3]));p.position.set(Math.cos(a)*.1,.13,Math.sin(a)*.1+.0);g.add(p)}g.add(sole('#ffffff'))}
  else{g.add(toe('#4a2f22'));g.add(sole('#2a1a12'))}
  return g}
function ckDress(m,look){const P=m.P;const hat=look.hat&&look.hat!=='none'?look.hat:null;
  if(hat){const h=ckHat(hat);P.head.add(h);P.hatG=h}
  const eye=look.eye||'band';if(eye!=='band'&&eye!=='none'){const e=ckEye(eye);P.head.add(e);P.eyeG=e}
  if(look.back&&look.back!=='none'){try{const b=ckBack(look.back);P.body.add(b);P.backG=b}catch(_){}}
  for(const f of[P.footL,P.footR])f.add(ckShoe(look.shoe||'basic'))}
let CKEYE={s:1.29,y:-.01,z:.43},CKBACK={s:1,y:.72,z:-.3};
// 눈 장식 (머리 중심 기준). 안경다리는 머리 겉을 따라 귀까지 가요
function rod(a,b,r,mat){const d=new THREE.Vector3().subVectors(b,a),L=d.length();const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,L,8),mat);m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m}
function temples(g,mat,x0,z0){for(const s of[-1,1]){const p0=new THREE.Vector3(s*x0,-.01,z0),p1=new THREE.Vector3(s*.448,-.01,.19),p2=new THREE.Vector3(s*.45,-.03,-.03);g.add(rod(p0,p1,.013,mat));g.add(rod(p1,p2,.013,mat));const j=new THREE.Mesh(new THREE.SphereGeometry(.014,8,6),mat);j.position.copy(p1);g.add(j)}}
const CKEX=.155,CKEZ=.425;
function ckEye(id){const g=new THREE.Group(),L=CKL,R=CK.R;
  const lens=(c,o)=>new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:o,side:THREE.DoubleSide});
  const flat=(sh,mat,x,dz)=>{const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),mat);m.position.set(x,-.01,CKEZ+(dz||0));m.rotation.y=x*.9;return m};
  const ext=(sh,col,x,d)=>{const m=shapeMesh(sh,col,d||.02);m.position.set(x,-.01,CKEZ-.005);m.rotation.y=x*.9;return m};
  if(id==='heart'){const fm=L('#ff5f9e');for(const s of[-1,1]){const fr=ext(heartShape(.105),'#ff5f9e',s*CKEX);g.add(fr);const ln=flat(heartShape(.085),lens('#ff3d8b',.75),s*CKEX,.025);g.add(ln)}g.add(rod(new THREE.Vector3(-.06,0,CKEZ+.02),new THREE.Vector3(.06,0,CKEZ+.02),.012,fm));temples(g,fm,.26,.36)}
  else if(id==='star'){const fm=L('#ffd35f');for(const s of[-1,1]){g.add(ext(starShape(.13,.065),'#ffd35f',s*CKEX));g.add(flat(starShape(.1,.05),lens('#fff6c0',.55),s*CKEX,.025))}g.add(rod(new THREE.Vector3(-.06,0,CKEZ+.02),new THREE.Vector3(.06,0,CKEZ+.02),.012,fm));temples(g,fm,.27,.35)}
  else if(id==='round'){const fm=L('#8a4a1a');for(const s of[-1,1]){const t=new THREE.Mesh(new THREE.TorusGeometry(.085,.016,8,28),fm);t.position.set(s*CKEX,-.01,CKEZ);t.rotation.y=s*CKEX*.9;g.add(t);const ln=new THREE.Mesh(new THREE.CircleGeometry(.085,24),lens('#dff3ff',.3));ln.position.copy(t.position);ln.rotation.copy(t.rotation);g.add(ln)}
    const br=new THREE.Mesh(new THREE.TorusGeometry(.04,.012,6,12,Math.PI),fm);br.position.set(0,.0,CKEZ+.03);g.add(br);temples(g,fm,.24,.37)}
  else if(id==='goggle'){const fm=L('#ffd35f'),st=L('#7cc6ff',{side:THREE.DoubleSide});for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.095,.085,.06,24),fm);c.rotation.x=Math.PI/2;c.position.set(s*CKEX,-.01,CKEZ-.01);c.rotation.z=0;g.add(c);const ln=new THREE.Mesh(new THREE.CircleGeometry(.08,24),lens('#9fe0ff',.5));ln.position.set(s*CKEX,-.01,CKEZ+.022);g.add(ln)}
    const strap=new THREE.Mesh(new THREE.CylinderGeometry(R*1.075,R*1.075,.06,48,1,true,1.15,Math.PI*2-2.3),st);strap.position.y=-.01;strap.scale.z=.98;g.add(strap);
    for(const s of[-1,1]){const a=1.15;g.add(rod(new THREE.Vector3(s*.235,-.01,CKEZ-.04),new THREE.Vector3(s*Math.sin(a)*R*1.075,-.01,Math.cos(a)*R*1.075*.98),.03,st))}
    g.add(rod(new THREE.Vector3(-.06,-.01,CKEZ+.0),new THREE.Vector3(.06,-.01,CKEZ+.0),.015,fm))}
  else if(id==='mono'){const fm=L('#e9b04a');const t=new THREE.Mesh(new THREE.TorusGeometry(.09,.016,8,28),fm);t.position.set(-CKEX,-.01,CKEZ);t.rotation.y=-CKEX*.9;g.add(t);const ln=new THREE.Mesh(new THREE.CircleGeometry(.09,24),lens('#dff3ff',.3));ln.position.copy(t.position);ln.rotation.copy(t.rotation);g.add(ln);
    let p=new THREE.Vector3(-CKEX-.07,-.07,CKEZ-.02);for(let k=0;k<6;k++){const q=new THREE.Vector3(-CKEX-.09-k*.035,-.1-k*.05+k*k*.004,CKEZ-.06-k*.05);g.add(rod(p,q,.007,fm));p=q}}
  else if(id==='donut'){for(const s of[-1,1]){const d=new THREE.Mesh(new THREE.TorusGeometry(.085,.035,10,26),L('#e3a659'));d.position.set(s*CKEX,-.01,CKEZ);d.rotation.y=s*CKEX*.9;g.add(d);
      const ic=new THREE.Mesh(new THREE.TorusGeometry(.085,.037,10,26,Math.PI*1.4),L(s<0?'#ff9ec7':'#8a4a1a'));ic.position.copy(d.position);ic.position.z+=.008;ic.rotation.set(0,s*CKEX*.9,.6);ic.scale.z=.7;g.add(ic);
      for(let k=0;k<7;k++){const a=k*.8,sp=new THREE.Mesh(new THREE.BoxGeometry(.022,.008,.008),L(['#7cc6ff','#ffd35f','#7ee8c8','#ffffff'][k%4]));sp.position.set(s*CKEX+Math.cos(a)*.085,-.01+Math.sin(a)*.085,CKEZ+.04);sp.rotation.z=a*2;g.add(sp)}}
    const fm=L('#e3a659');g.add(rod(new THREE.Vector3(-.07,0,CKEZ+.01),new THREE.Vector3(.07,0,CKEZ+.01),.013,fm));temples(g,fm,.26,.36)}
  else if(id==='masq'){const face=new THREE.Mesh(ckFaceGeo(),new THREE.MeshLambertMaterial({map:ckMasqTex(),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3}));face.scale.set(1.012,.96*1.012,.97*1.012);g.add(face);
    const fe=new THREE.Group();fe.position.set(.33,.1,.27);fe.rotation.set(0,.6,-.5);for(let k=0;k<3;k++){const f=new THREE.Mesh(new THREE.SphereGeometry(.05,10,8),L(['#9b6bff','#ff7eb6','#ffd35f'][k]));f.scale.set(.5,2.2,.25);f.position.set((k-1)*.04,.1,0);f.rotation.z=(k-1)*.35;fe.add(f)}g.add(fe)}
  return g}
// 가면무도회 가면: 얼굴 겉면에 그려요
let CKMQ=null;
function ckMasqTex(){if(CKMQ)return CKMQ;const R=CK.R,{p0,pl,t0,tl,W,H}=CKF;const ang=(x,y)=>{const z=Math.sqrt(Math.max(1e-6,R*R-x*x-y*y));return[Math.atan2(z,-x),Math.acos(y/R)]};const P=(x,y)=>{const[ph,th]=ang(x,y);return[(ph-p0)/pl*W,(th-t0)/tl*H]};
  CKMQ=canvasTex(W,H,g=>{g.clearRect(0,0,W,H);const pts=[[-.33,.06],[-.25,.11],[-.12,.09],[0,.05],[.12,.09],[.25,.11],[.33,.06],[.3,-.06],[.2,-.12],[.08,-.08],[0,-.06],[-.08,-.08],[-.2,-.12],[-.3,-.06]];
    g.beginPath();pts.forEach(([x,y],i)=>{const[a,b]=P(x,y);i?g.lineTo(a,b):g.moveTo(a,b)});g.closePath();g.fillStyle='#7a45e0';g.fill();g.lineWidth=7;g.strokeStyle='#ffd35f';g.stroke();
    g.fillStyle='#ffd35f';for(const[x,y]of[[-.28,.02],[.28,.02],[0,.02]]){const[a,b]=P(x,y);g.beginPath();g.arc(a,b,6,0,7);g.fill()}
    g.globalCompositeOperation='destination-out';for(const s of[-1,1]){const[a,b]=P(s*.155,-.01);g.beginPath();g.ellipse(a,b,P(s*.155+.084,0)[0]-a,(P(0,-.1)[1]-P(0,-.01)[1]),0,0,7);g.fill()}g.globalCompositeOperation='source-over'});
  CKMQ.wrapS=CKMQ.wrapT=THREE.ClampToEdgeWrapping;return CKMQ}
// 등 장식: 우산·풍선은 새 머리 높이에 맞춰 다시 (모자·머리를 지나가지 않게 뒤로 기울여요)
function ckBack(id){const L=CKL;
  if(id==='umbrella'){const g=new THREE.Group();const a=new THREE.Vector3(0,.78,-.33),b=new THREE.Vector3(0,2.02,-1.0);g.add(rod(a,b,.022,L('#fff8ee')));
    const hk=new THREE.Mesh(new THREE.TorusGeometry(.06,.022,6,12,Math.PI),L('#e8364f'));hk.position.set(0,.74,-.3);hk.rotation.set(0,Math.PI/2,Math.PI);g.add(hk);
    const top=new THREE.MeshLambertMaterial({map:swirlT('#ff5f9e','#ffffff'),side:THREE.DoubleSide});const c=new THREE.Mesh(new THREE.SphereGeometry(.55,32,12,0,Math.PI*2,0,Math.PI*.42),top);c.scale.y=.55;c.position.copy(b).add(new THREE.Vector3(0,-.16,.04));c.rotation.x=-.45;g.add(c);
    const tip=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),L('#e8364f'));tip.position.copy(b).add(new THREE.Vector3(0,.18,-.05));g.add(tip);return g}
  if(id==='balloon'){const g=new THREE.Group();const o=new THREE.Vector3(0,.8,-.35);[['#ff5f9e',-.22,2.28],['#7cc6ff',0,2.45],['#ffd35f',.22,2.28]].forEach(([c,x,y])=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.17,16,12),new THREE.MeshPhongMaterial({color:c,shininess:80}));b.scale.y=1.18;b.position.set(x,y,-1.05);g.add(b);
      const kn=new THREE.Mesh(new THREE.SphereGeometry(.025,6,4),L(c));kn.position.set(x,y-.21,-1.05);g.add(kn);
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([o,new THREE.Vector3(x,y-.22,-1.05)]),new THREE.LineBasicMaterial({color:'#ffffff'})))});return g}
  const b=backMesh(id);b.scale.setScalar(CKBACK.s);b.position.set(0,CKBACK.y,CKBACK.z);return b}
