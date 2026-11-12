/* ================= 29차 (자): 맵마다 고유한 풍경 — 랜드마크·탑·둘레 장식·나무·날아다니는 것 ================= */
Object.assign(THEMES.candy,{castle:'candy',tower:'giantlolli',tree:'lollitree',flyer:'candy'});
Object.assign(THEMES.pumpkin,{ring:'candycorn'});
Object.assign(THEMES.choco,{castle:'factory',tower:'fountain',tree:'truffle',ring:'chocobar',flyer:'truffle',wheel:['#5a3220','#f6e3c3','#3a1d10'],cloud:['#f6e3c3','#ead2b4','#fff3e0','#e9c49a']});
Object.assign(THEMES.cloud,{castle:'cloudcastle',tower:'airballoon',tree:'cotton',ring:'cottonstick',flyer:'cotton'});
Object.assign(THEMES.sea,{castle:'shellpalace',tower:'bigjelly',tree:'coral',ring:'seaweed',flyer:'jellyfish'});
Object.assign(THEMES.cake,{castle:'cakecastle',tower:'bigcupcake',tree:'macaron',ring:'candle',flyer:'cupcake'});
const PM=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:60},o||{}));
const SPR=['#ff5f9e','#ffd35f','#7cc6ff','#7ee8a8','#ffffff','#b98cff'];
function sprinkles(g,L,r,y,n,spread){for(let k=0;k<n;k++){const a=k*2.399,rr=r*(.35+.6*((k*37)%10)/10),s=new THREE.Mesh(new THREE.BoxGeometry(r*.05,r*.05,r*.16),L(SPR[k%SPR.length]));s.position.set(Math.cos(a)*rr,y,Math.sin(a)*rr);s.rotation.set(k,k*2,0);g.add(s)}}
function flame(L){const f=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),new THREE.MeshBasicMaterial({color:'#ffd35f'}));f.scale.set(.6,1.2,.6);return f}

/* ----- 북쪽 랜드마크 ----- */
const CASTLES={
 candy(P,L){const g=new THREE.Group(),pink=L('#ffb3d6'),white=L('#fffaf2');const keep=new THREE.Mesh(new THREE.BoxGeometry(46,30,28),pink);keep.position.y=15;g.add(keep);
   for(let i=0;i<10;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(2.4,10,8),white);d.scale.y=1.5;d.position.set(-21+i*4.7,29,14.4);g.add(d)}
   const gate=new THREE.Mesh(new THREE.CylinderGeometry(6,6,1,20,1,false,0,Math.PI),L('#e8364f'));gate.rotation.x=Math.PI/2;gate.position.set(0,7,14.2);g.add(gate);
   for(const[x,z,h,c]of[[-26,-10,50,'#ff5f9e'],[26,-10,50,'#7cc6ff'],[-26,14,42,'#ffd35f'],[26,14,42,'#7ee8a8'],[0,-6,64,'#b98cff']]){const st=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,h,10),white);st.position.set(x,h/2,z);g.add(st);
     const top=new THREE.MeshLambertMaterial({map:swirlT(c,'#ffffff')});const d=new THREE.Mesh(new THREE.CylinderGeometry(9,9,2.6,32),[L(c),top,top]);d.rotation.x=Math.PI/2;d.position.set(x,h+6,z);g.add(d)}
   return g},
 factory(P,L){const g=new THREE.Group(),choc=L('#5a3220'),milk=L('#7a4526'),hi=L('#8d5432');
   const body=new THREE.Mesh(new THREE.BoxGeometry(60,34,26),choc);body.position.y=17;g.add(body);
   for(let r=0;r<3;r++)for(let c=0;c<6;c++){const b=new THREE.Mesh(new THREE.BoxGeometry(8.6,9,1.6),hi);b.position.set(-25+c*10,6+r*11,13.6);g.add(b)}
   const wr=new THREE.Mesh(new THREE.BoxGeometry(62,12,28),L('#e8364f'));wr.position.y=6;g.add(wr);const gold=new THREE.Mesh(new THREE.BoxGeometry(62.4,2.4,28.4),L('#ffd35f'));gold.position.y=12.4;g.add(gold);
   const smokes=[];for(const x of[-18,18]){const ch=new THREE.Mesh(new THREE.CylinderGeometry(4,5,30,14),milk);ch.position.set(x,49,-4);g.add(ch);const rim=new THREE.Mesh(new THREE.TorusGeometry(4.6,1,8,18),L('#f6e3c3'));rim.rotation.x=Math.PI/2;rim.position.set(x,64,-4);g.add(rim);
     for(let k=0;k<4;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(4,12,10),L('#f6e3c3'));p.position.set(x,68+k*7,-4);g.add(p);smokes.push({p,x,k})}}
   const pipe=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,18,12),L('#c0c0c8'));pipe.rotation.z=Math.PI/2;pipe.position.set(36,30,6);g.add(pipe);
   const pour=new THREE.Mesh(new THREE.CylinderGeometry(1.8,2.4,28,12),milk);pour.position.set(45,16,6);g.add(pour);const pool=new THREE.Mesh(new THREE.CylinderGeometry(12,12,1.4,24),milk);pool.position.set(45,1,6);g.add(pool);
   WORLD.anims.push((t)=>{for(const s of smokes){const u=((t*.25+s.k/4)%1);s.p.position.y=66+u*30;s.p.scale.setScalar(.6+u*1.2)}});return g},
 cakecastle(P,L){const g=new THREE.Group();const tiers=[[34,22,'#fff3e6'],[25,18,'#ffd6ea'],[16,15,'#fff3e6']];let y=0;
   tiers.forEach(([r,h,c],i)=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,40),L(c));t.position.y=y+h/2;g.add(t);const cr=new THREE.Mesh(new THREE.TorusGeometry(r,2,10,40),L(i===1?'#fff3e6':'#ff9ec7'));cr.rotation.x=Math.PI/2;cr.position.y=y+h;g.add(cr);
     for(let k=0;k<14;k++){const a=k/14*Math.PI*2,d=new THREE.Mesh(new THREE.SphereGeometry(2.2,10,8),L(i===1?'#fff3e6':'#ff9ec7'));d.scale.y=1.8;d.position.set(Math.cos(a)*r,y+h-3,Math.sin(a)*r);g.add(d)}
     for(let k=0;k<8;k++){const a=k/8*Math.PI*2+.2,s=new THREE.Mesh(new THREE.SphereGeometry(2.4,12,10),L('#e8364f'));s.scale.y=1.25;s.position.set(Math.cos(a)*(r-4),y+h+2.4,Math.sin(a)*(r-4));g.add(s)}y+=h});
   for(let k=0;k<6;k++){const a=k/6*Math.PI*2,c=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,12,10),L(SPR[k%5]));c.position.set(Math.cos(a)*8,y+6,Math.sin(a)*8);g.add(c);const f=flame(L);f.scale.multiplyScalar(2);f.position.set(Math.cos(a)*8,y+14,Math.sin(a)*8);g.add(f)}
   return g},
 cloudcastle(P,L){const g=new THREE.Group(),w=L('#ffffff');for(const[x,z,h]of[[-24,-6,40],[24,-6,40],[0,-12,58],[-12,12,30],[12,12,30]]){for(let k=0;k<Math.round(h/8);k++){const s=new THREE.Mesh(new THREE.SphereGeometry(8-k*.25,16,12),w);s.position.set(x,4+k*7,z);g.add(s)}
     const roof=new THREE.Mesh(new THREE.ConeGeometry(7,16,18),L(['#ffb3d6','#a8e0ff','#d9c2ff'][Math.abs(x)%3]));roof.position.set(x,h+8,z);g.add(roof);const st=new THREE.Mesh(new THREE.SphereGeometry(1.6,10,8),L('#ffd35f'));st.position.set(x,h+17,z);g.add(st)}
   const cols=['#ff6b8b','#ffb347','#ffe66b','#7ee8a8','#7cc6ff','#b98cff'];cols.forEach((c,i)=>{const a=new THREE.Mesh(new THREE.TorusGeometry(40-i*2.4,1.2,8,40,Math.PI),new THREE.MeshBasicMaterial({color:c}));a.position.set(0,0,-20);g.add(a)});return g},
 shellpalace(P,L){const g=new THREE.Group();const st=stripeT('#ffd6e4','#ff9ab8',[1,8]);for(const[x,z,h,r]of[[0,-8,70,14],[-26,0,46,10],[26,0,46,10],[-14,16,34,8],[14,16,34,8]]){const c=new THREE.Mesh(new THREE.ConeGeometry(r,h,20,1),new THREE.MeshLambertMaterial({map:st}));c.position.set(x,h/2,z);c.rotation.y=x*.1;g.add(c);
     const pearl=new THREE.Mesh(new THREE.SphereGeometry(r*.32,16,12),PM('#fff6ee',{shininess:120,specular:new THREE.Color('#ffffff')}));pearl.position.set(x,h+r*.25,z);g.add(pearl)}
   const base=new THREE.Mesh(new THREE.SphereGeometry(30,24,12,0,Math.PI*2,0,Math.PI/2),L('#7ee8d8'));base.scale.y=.3;g.add(base);
   for(let k=0;k<6;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(4,14,10,0,Math.PI*2,0,Math.PI/2),L('#ffc2d6'));s.scale.set(1,.5,1.2);s.position.set(-25+k*10,7,24);s.rotation.x=-.4;g.add(s)}return g}};
{const cg0=castleGroup;castleGroup=function(P,L){const f=CASTLES[P.castle];if(!f)return cg0(P,L);const g=f(P,L);g.position.set(N*C/2,0,-56);g.scale.setScalar(.8);return g}}

/* ----- 서쪽 탑 ----- */
const TOWERS={
 giantlolli(P,L){const g=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,80,12),L('#fffaf2'));st.position.y=40;g.add(st);const top=new THREE.MeshLambertMaterial({map:swirlT('#ff5f9e','#7cc6ff')});const d=new THREE.Mesh(new THREE.CylinderGeometry(26,26,7,40),[L('#ff7eb6'),top,top]);d.rotation.x=Math.PI/2;d.position.y=100;g.add(d);const bow=new THREE.Mesh(new THREE.TorusGeometry(5,1.6,8,16),L('#ffd35f'));bow.position.y=72;g.add(bow);
   WORLD.anims.push(t=>{d.rotation.y=Math.sin(t*.5)*.25});return g},
 fountain(P,L){const g=new THREE.Group(),c=L('#7a4526'),gold=L('#ffd35f');[[40,8],[28,30],[18,52],[10,70]].forEach(([r,y],i)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(r,r*.8,6,32),i%2?gold:c);b.position.y=y;g.add(b);const lip=new THREE.Mesh(new THREE.TorusGeometry(r,2.2,10,36),L('#5a3220'));lip.rotation.x=Math.PI/2;lip.position.y=y+3;g.add(lip);
     for(let k=0;k<12;k++){const a=k/12*Math.PI*2,dr=new THREE.Mesh(new THREE.CylinderGeometry(1.4,2.2,12,8),L('#5a3220'));dr.position.set(Math.cos(a)*r,y-4,Math.sin(a)*r);g.add(dr)}});
   const col=new THREE.Mesh(new THREE.CylinderGeometry(4,5,70,14),gold);col.position.y=40;g.add(col);const top=new THREE.Mesh(new THREE.SphereGeometry(8,16,12),L('#5a3220'));top.position.y=78;g.add(top);
   const strawb=[];for(let k=0;k<6;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(3.4,12,10),L('#e8364f'));s.scale.y=1.3;g.add(s);strawb.push(s)}WORLD.anims.push(t=>{strawb.forEach((s,k)=>{const a=t*.4+k;s.position.set(Math.cos(a)*48,4+Math.sin(t*2+k)*1.5,Math.sin(a)*48)})});return g},
 airballoon(P,L){const g=new THREE.Group();const st=stripeT('#ffb3d6','#ffffff',[8,1]);const b=new THREE.Mesh(new THREE.SphereGeometry(26,28,20),new THREE.MeshLambertMaterial({map:st}));b.scale.y=1.2;b.position.y=80;g.add(b);
   const bk=new THREE.Mesh(new THREE.CylinderGeometry(8,6,9,14),L('#c98d5f'));bk.position.y=38;g.add(bk);for(const[x,z]of[[-6,-6],[6,-6],[-6,6],[6,6]]){const r=new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,24,6),L('#7a4526'));r.position.set(x,52,z);g.add(r)}
   const base=g.position.clone();WORLD.anims.push(t=>{g.position.y=Math.sin(t*.6)*6});return g},
 bigjelly(P,L){const g=new THREE.Group();const m=new THREE.MeshPhongMaterial({color:'#ff9ec7',transparent:true,opacity:.75,shininess:100});const d=new THREE.Mesh(new THREE.SphereGeometry(30,28,16,0,Math.PI*2,0,Math.PI/2),m);d.position.y=80;g.add(d);
   const ten=[];for(let k=0;k<10;k++){const a=k/10*Math.PI*2,t=new THREE.Mesh(new THREE.CylinderGeometry(1.6,.6,60,8),new THREE.MeshPhongMaterial({color:'#ffc2d6',transparent:true,opacity:.8}));t.position.set(Math.cos(a)*18,50,Math.sin(a)*18);g.add(t);ten.push({t,a})}
   WORLD.anims.push(t=>{g.position.y=Math.sin(t*.8)*5;d.scale.set(1+Math.sin(t*1.6)*.05,1-Math.sin(t*1.6)*.05,1+Math.sin(t*1.6)*.05);for(const q of ten)q.t.rotation.z=Math.sin(t*1.4+q.a*2)*.15});return g},
 bigcupcake(P,L){const g=new THREE.Group();const cup=new THREE.Mesh(new THREE.CylinderGeometry(30,22,34,32),new THREE.MeshLambertMaterial({map:stripeT('#ff9ec7','#ffd6e6',[8,1])}));cup.position.y=17;g.add(cup);
   for(let k=0;k<3;k++){const f=new THREE.Mesh(new THREE.SphereGeometry(30-k*8,28,16),L(['#fff3e6','#ffd6ea','#fff3e6'][k]));f.scale.y=.5;f.position.y=36+k*10;g.add(f)}sprinkles(g,L,24,46,24);
   const ch=new THREE.Mesh(new THREE.SphereGeometry(6,16,12),L('#e8364f'));ch.position.y=66;g.add(ch);const can=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,22,10),new THREE.MeshLambertMaterial({map:stripeT('#7cc6ff','#ffffff',[1,4])}));can.position.set(10,62,4);g.add(can);const f=flame(L);f.scale.multiplyScalar(2.6);f.position.set(10,76,4);g.add(f);return g}};
{const tg0=towerGroup;towerGroup=function(P,L,w){const f=TOWERS[P.tower];if(!f)return tg0(P,L,w);const g=f(P,L);const h=new THREE.Group();h.add(g);h.scale.setScalar(.55);h.position.set(-46,0,26);return h}}

/* ----- 둘레 장식 (26개) ----- */
const RINGS={
 chocobar(P,L,i){const tr=new THREE.Group();if(i%2){const b=new THREE.Mesh(new THREE.BoxGeometry(9,16,2),L('#5a3220'));b.position.y=8;tr.add(b);for(let r=0;r<4;r++)for(let c=0;c<2;c++){const s=new THREE.Mesh(new THREE.BoxGeometry(3.6,3.2,.8),L('#7a4526'));s.position.set(-2.1+c*4.2,2.4+r*3.8,1.2);tr.add(s)}
     const wr=new THREE.Mesh(new THREE.BoxGeometry(9.6,6,2.6),L(['#e8364f','#2f6aa0','#7a3fa0'][i%3]));wr.position.y=3;tr.add(wr);const gl=new THREE.Mesh(new THREE.BoxGeometry(9.8,.8,2.8),L('#ffd35f'));gl.position.y=6;tr.add(gl)}
   else{const st=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,10,8),L('#fff8ee'));st.position.y=5;tr.add(st);for(let k=0;k<3;k++){const t=new THREE.Mesh(new THREE.SphereGeometry(3-k*.5,16,12),L(['#5a3220','#7a4526','#3a1d10'][k]));t.position.y=12+k*5;tr.add(t);const dz=new THREE.Mesh(new THREE.TorusGeometry(2.6-k*.5,.35,6,16),L(k===1?'#f6e3c3':'#ff9ec7'));dz.rotation.x=Math.PI/2;dz.position.y=13+k*5;tr.add(dz)}}return tr},
 cottonstick(P,L,i){const tr=new THREE.Group();const st=new THREE.Mesh(new THREE.ConeGeometry(1.4,9,10),L('#fff3a8'));st.rotation.x=Math.PI;st.position.y=4.5;tr.add(st);const c=['#ffb3d6','#a8e0ff','#d9c2ff'][i%3];for(let k=0;k<6;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(3.2-k*.2,14,10),L(k%2?c:'#ffffff'));p.position.set(Math.cos(k*1.3)*2.6,12+(k%3)*2.2,Math.sin(k*1.3)*2.6);tr.add(p)}return tr},
 seaweed(P,L,i){const tr=new THREE.Group();if(i%2){const g=L(['#3fbf8f','#2fa87a','#7ee8a8'][i%3]),segs=[];for(let k=0;k<6;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(1.4,10,8),g);s.scale.set(1.6,2.4,.6);s.position.y=2+k*3.2;tr.add(s);segs.push(s)}WORLD.anims.push(t=>{segs.forEach((s,k)=>{s.position.x=Math.sin(t*1.5+k*.6+i)*k*.35})})}
   else{const c=L(['#ff7ea8','#ff9e5f','#b98cff'][i%3]);const tw=(x,y,z,l,rz,rx)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.6,.9,l,8),c);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);tr.add(m);const b=new THREE.Mesh(new THREE.SphereGeometry(.9,8,6),c);b.position.set(x-Math.sin(rz||0)*l/2,y+Math.cos(rz||0)*l/2,z);tr.add(b)};tw(0,5,0,10,0);tw(-2,9,0,6,.6);tw(2,10,0,6,-.6);tw(0,11,1.5,5,0,.5)}return tr},
 candle(P,L,i){const tr=new THREE.Group();if(i%2){const c=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,16,12),new THREE.MeshLambertMaterial({map:stripeT(SPR[i%5],'#ffffff',[1,5])}));c.position.y=8;tr.add(c);const f=flame(L);f.scale.multiplyScalar(1.6);f.position.y=18;tr.add(f)}
   else{const sl=new THREE.Mesh(new THREE.CylinderGeometry(8,8,9,24,1,false,0,Math.PI/3),L('#fff3e6'));sl.position.y=4.5;tr.add(sl);const ly=new THREE.Mesh(new THREE.CylinderGeometry(8.02,8.02,1.2,24,1,false,0,Math.PI/3),L('#ff9ec7'));ly.position.y=4.5;tr.add(ly);const tp=new THREE.Mesh(new THREE.CylinderGeometry(8.05,8.05,1.2,24,1,false,0,Math.PI/3),L('#ffffff'));tp.position.y=9.4;tr.add(tp);const s=new THREE.Mesh(new THREE.SphereGeometry(1.6,12,10),L('#e8364f'));s.position.set(4,11,2.5);tr.add(s)}return tr},
 candycorn(P,L,i){const tr=new THREE.Group();[['#ffffff',3,0],['#ff9a2e',5.5,3],['#ffd35f',7,8]].forEach(([c,r,y],k)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(k===0?0:[0,3,5.5][k],r,k===0?3:5,16),L(c));m.position.y=17-y-1.5;tr.add(m)});const top=new THREE.Mesh(new THREE.ConeGeometry(3,5,16),L('#ffffff'));top.position.y=17.5;tr.add(top);return tr}};
{const ri0=ringItem;ringItem=function(P,L,i){const f=RINGS[P.ring];return f?f(P,L,i):ri0(P,L,i)}}

/* ----- 둘레 나무 (instanced) ----- */
const TREES={
 truffle(S,sp,IM,put,L,P,stickM,white){const n=sp.length,tr=IM(new THREE.CylinderGeometry(.3,.4,5,8),stickM,n),ball=IM(new THREE.SphereGeometry(1,14,10),white(),n),dz=IM(new THREE.TorusGeometry(1,.12,6,16),white(),n);
   sp.forEach(([x,z],i)=>{const s=.9+(i%5)*.15;put(tr,i,x,2.5*s,z,s);put(ball,i,x,6.4*s,z,2.4*s,['#5a3220','#7a4526','#3a1d10','#8d5432'][i%4]);put(dz,i,x,6.9*s,z,2.1*s,['#f6e3c3','#ff9ec7','#ffd35f'][i%3])});S.add(tr);S.add(ball);S.add(dz)},
 coral(S,sp,IM,put,L,P,stickM,white){const n=sp.length,st=IM(new THREE.CylinderGeometry(.5,.8,5,8),white(),n*3),tip=IM(new THREE.SphereGeometry(.9,10,8),white(),n*3);const C2=['#ff7ea8','#ff9e5f','#b98cff','#7ee8c8'];
   const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),SC=new THREE.Vector3(),E=new THREE.Euler(),COL=new THREE.Color();
   sp.forEach(([x,z],i)=>{const s=.9+(i%5)*.15,c=C2[i%4];for(let k=0;k<3;k++){const rz=(k-1)*.55,ry=i;Q.setFromEuler(E.set(0,ry,rz));const h=5*s*(k===1?1.2:.85);const ox=-Math.sin(rz)*h/2;M.compose(V.set(x+ox*Math.cos(ry),h/2,z-ox*Math.sin(ry)),Q,SC.set(s,s*(k===1?1.2:.85),s));st.setMatrixAt(i*3+k,M);st.setColorAt(i*3+k,COL.set(c));
     M.compose(V.set(x+ox*2*Math.cos(ry),h,z-ox*2*Math.sin(ry)),Q,SC.set(s,s,s));tip.setMatrixAt(i*3+k,M);tip.setColorAt(i*3+k,COL.set(c))}});S.add(st);S.add(tip)},
 macaron(S,sp,IM,put,L,P,stickM,white){const n=sp.length,sh=IM(new THREE.CylinderGeometry(1.6,1.6,.9,20),white(),n*6),cr=IM(new THREE.CylinderGeometry(1.45,1.45,.45,20),L('#fff6ee'),n*3);const MC=['#ffb3d6','#a8e0ff','#fff3a8','#c9f2c9','#d9c2ff'];
   sp.forEach(([x,z],i)=>{const s=1+(i%4)*.18;for(let k=0;k<3;k++){const y=(.5+k*2.1)*s,c=MC[(i+k)%5];put(sh,i*6+k*2,x,y,z,s,c);put(sh,i*6+k*2+1,x,y+.95*s,z,s,c);put(cr,i*3+k,x,y+.48*s,z,s)}});S.add(sh);S.add(cr)},
 lollitree(S,sp,IM,put,L,P,stickM,white){const n=sp.length,st=IM(new THREE.CylinderGeometry(.3,.3,7,8),stickM,n),d=IM(new THREE.CylinderGeometry(2.6,2.6,.7,20),white(),n),r=IM(new THREE.TorusGeometry(1.5,.32,6,18),L('#ffffff'),n);
   const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),V=new THREE.Vector3(),SC=new THREE.Vector3(),E=new THREE.Euler(),COL=new THREE.Color();
   sp.forEach(([x,z],i)=>{const s=.9+(i%5)*.13,ry=i*1.3;put(st,i,x,3.5*s,z,s);Q.setFromEuler(E.set(Math.PI/2,ry,0,'YXZ'));M.compose(V.set(x,8*s,z),Q,SC.set(s,s,s));d.setMatrixAt(i,M);d.setColorAt(i,COL.set(SPR[i%5]));Q.setFromEuler(E.set(0,ry,0));M.compose(V.set(x,8*s,z),Q,SC.set(s,s,s));r.setMatrixAt(i,M)});S.add(st);S.add(d);S.add(r)}};

/* ----- 날아다니는 것 ----- */
const FLYK={
 candy(g,L,i){const c=SPR[i%5];const b=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),L(c));b.scale.x=1.3;g.add(b);for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.ConeGeometry(.7,1,10),L(c));w.rotation.z=s*Math.PI/2;w.position.x=s*1.6;g.add(w)}},
 truffle(g,L,i){const b=new THREE.Mesh(new THREE.SphereGeometry(1.1,14,10),L(['#5a3220','#7a4526','#3a1d10'][i%3]));g.add(b);const d=new THREE.Mesh(new THREE.TorusGeometry(.9,.15,6,16),L(['#f6e3c3','#ff9ec7','#ffd35f'][i%3]));d.rotation.x=Math.PI/2;d.position.y=.45;g.add(d)},
 cotton(g,L,i){g.userData.nw=1;const c=['#ffb3d6','#a8e0ff','#d9c2ff'][i%3];for(let k=0;k<5;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(.9,12,10),L(k%2?c:'#ffffff'));p.position.set(Math.cos(k*1.3)*.9,Math.sin(k*2)*.4,Math.sin(k*1.3)*.9);g.add(p)}const st=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,2.2,6),L('#fff3a8'));st.position.y=-1.4;g.add(st)},
 jellyfish(g,L,i){g.userData.nw=1;const c=['#ff9ec7','#b98cff','#7ee8d8'][i%3];const m=new THREE.MeshPhongMaterial({color:c,transparent:true,opacity:.75,shininess:90});const d=new THREE.Mesh(new THREE.SphereGeometry(1.3,16,10,0,Math.PI*2,0,Math.PI/2),m);g.add(d);for(let k=0;k<5;k++){const t=new THREE.Mesh(new THREE.CylinderGeometry(.1,.04,2.2,5),m);const a=k/5*Math.PI*2;t.position.set(Math.cos(a)*.7,-1.1,Math.sin(a)*.7);g.add(t)}},
 cupcake(g,L,i){const cup=new THREE.Mesh(new THREE.CylinderGeometry(1,.75,1.1,14),new THREE.MeshLambertMaterial({map:stripeT(SPR[i%5],'#ffffff',[4,1])}));cup.position.y=-.5;g.add(cup);const f=new THREE.Mesh(new THREE.SphereGeometry(1.05,14,10),L('#fff3e6'));f.scale.y=.7;f.position.y=.3;g.add(f);const ch=new THREE.Mesh(new THREE.SphereGeometry(.3,8,6),L('#e8364f'));ch.position.y=1;g.add(ch)}};

/* ----- 마을 집 ----- */
const HOUSES={
 choco(kind,i,L){const h=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(8,7,7),L(['#7a4526','#5a3220','#8d5432'][i%3]));b.position.y=3.5;h.add(b);for(let r=0;r<2;r++)for(let c=0;c<2;c++){const s=new THREE.Mesh(new THREE.BoxGeometry(3.2,2.8,.4),L('#9a5c36'));s.position.set(-1.8+c*3.6,2+r*3.2,3.6);h.add(s)}
   const roof=new THREE.Mesh(new THREE.BoxGeometry(9.6,1.6,8.6),L('#3a1d10'));roof.position.y=7.6;roof.rotation.z=.12;h.add(roof);const drip=new THREE.Mesh(new THREE.BoxGeometry(9.8,.6,8.8),L(['#f6e3c3','#ff9ec7'][i%2]));drip.position.y=8.5;drip.rotation.z=.12;h.add(drip);
   const d=new THREE.Mesh(new THREE.BoxGeometry(2,3.4,.3),L('#ff7eb6'));d.position.set(0,1.7,3.7);h.add(d);return h},
 cloud(kind,i,L){const h=new THREE.Group(),w=L('#ffffff');for(const[x,y,z,r]of[[0,3,0,4],[-3,2.4,1,3],[3,2.4,1,3],[0,5.6,0,3]]){const s=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),w);s.position.set(x,y,z);h.add(s)}
   const roof=new THREE.Mesh(new THREE.ConeGeometry(2.4,4,12),L(['#ffb3d6','#a8e0ff','#d9c2ff'][i%3]));roof.position.y=9.4;h.add(roof);const d=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,.3,14,1,false,0,Math.PI),L(['#ffd35f','#ff9ec7'][i%2]));d.rotation.x=Math.PI/2;d.position.set(0,1.6,4);h.add(d);return h},
 sea(kind,i,L){const h=new THREE.Group();if(i%2){const st=stripeT('#ffd6e4','#ff9ab8',[1,6]);const c=new THREE.Mesh(new THREE.ConeGeometry(4,11,18),new THREE.MeshLambertMaterial({map:st}));c.position.y=5.5;h.add(c)}
   else{const lo=new THREE.Mesh(new THREE.SphereGeometry(4.4,18,10,0,Math.PI*2,0,Math.PI/2),L('#ffc2d6'));h.add(lo);for(let k=0;k<7;k++){const r=new THREE.Mesh(new THREE.BoxGeometry(.4,.4,8.8),L('#ff9ab8'));r.position.y=4.4*Math.cos(0)*.0+ .2;r.rotation.y=k/7*Math.PI;r.position.y=.2;}const pearl=new THREE.Mesh(new THREE.SphereGeometry(1.2,12,10),PM('#fff6ee',{shininess:120}));pearl.position.set(0,5,0);h.add(pearl)}
   const d=new THREE.Mesh(new THREE.CircleGeometry(1.3,16),L('#1f6a8e'));d.position.set(0,1.4,i%2?3.2:4.1);h.add(d);return h}};
{const mh0=makeHouse;makeHouse=function(kind,i,L,P){const f=HOUSES[THEMEID];return f?f(kind,i,L):mh0(kind,i,L,P)}}
Object.assign(THEMES.cloud,{noWheel:true});Object.assign(THEMES.sea,{noWheel:true});
HOUSES.ice=function(kind,i,L){const h=new THREE.Group();const c=['#ffb3d6','#a8e0ff','#fff3c9','#c9f2c9'][i%4];const dome=new THREE.Mesh(new THREE.SphereGeometry(4.4,20,12,0,Math.PI*2,0,Math.PI/2),L(c));h.add(dome);
  for(let k=0;k<8;k++){const a=k/8*Math.PI*2,d=new THREE.Mesh(new THREE.SphereGeometry(.7,8,6),L(c));d.scale.y=1.6;d.position.set(Math.cos(a)*4.3,.3,Math.sin(a)*4.3);h.add(d)}
  const cone=new THREE.Mesh(new THREE.ConeGeometry(1.6,4.6,14),new THREE.MeshLambertMaterial({map:waffleT()}));cone.position.y=6;h.add(cone);const ch=new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),L('#e8364f'));ch.position.y=8.6;h.add(ch);
  const d=new THREE.Mesh(new THREE.CircleGeometry(1.3,16,0,Math.PI),L('#7a4526'));d.position.set(0,0,4.35);h.add(d);return h};
THEMES.xmas.houses=[0,6,0];

/* ----- 미로 벽 무늬: 케이크(스펀지·크림·잼) · 구름(마시멜로) · 바다(젤리 블록) ----- */
{const wt0=wallTex;wallTex=function(Wl,w2,h2,cols,rows){
  const rr=(g,x,y,a,b,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+a,y,x+a,y+b,r);g.arcTo(x+a,y+b,x,y+b,r);g.arcTo(x,y+b,x,y,r);g.arcTo(x,y,x+a,y,r);g.closePath()};
  if(Wl.style==='cake')return canvasTex(w2,h2,(g,w,h)=>{g.fillStyle='#ffe2b8';g.fillRect(0,0,w,h);g.fillStyle='#f3c98f';for(let i=0;i<w*h/900;i++){g.beginPath();g.arc(Math.random()*w,Math.random()*h,1+Math.random()*2.5,0,7);g.fill()}
    const L1=h*.36,L2=h*.66;g.fillStyle='#fffaf2';g.fillRect(0,L1-h*.05,w,h*.1);g.fillStyle='#ff7ea8';g.fillRect(0,L2-h*.045,w,h*.09);g.fillStyle='#fffaf2';g.fillRect(0,0,w,h*.12);
    g.fillStyle='#fffaf2';for(let x=0;x<w;x+=h*.16){g.beginPath();g.arc(x+h*.08,h*.12,h*.08,0,Math.PI);g.fill()}g.fillStyle='#e8364f';for(let x=h*.2;x<w;x+=h*.55){g.beginPath();g.ellipse(x,h*.07,h*.05,h*.06,0,0,7);g.fill()}});
  if(Wl.style==='marsh')return canvasTex(w2,h2,(g,w,h)=>{g.fillStyle='#e6dcff';g.fillRect(0,0,w,h);const cw=w/cols,ch=h/rows,C=['#ffffff','#ffe0ef','#e0f2ff','#fff6d6'];
    for(let r=0;r<rows;r++)for(let c=0;c<cols+1;c++){const x=c*cw-(r%2)*cw/2+3,y=r*ch+3;const gr=g.createLinearGradient(0,y,0,y+ch);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,C[(r*3+c)%4]);g.fillStyle=gr;rr(g,x,y,cw-6,ch-6,Math.min(cw,ch)*.38);g.fill();g.fillStyle='#ffffffaa';g.beginPath();g.ellipse(x+cw*.3,y+ch*.3,cw*.12,ch*.08,0,0,7);g.fill()}});
  if(Wl.style==='jelly')return canvasTex(w2,h2,(g,w,h)=>{g.fillStyle='#1f6a8e';g.fillRect(0,0,w,h);const cw=w/cols,ch=h/rows,C=['#7ee8d8','#ff9ab8','#b98cff','#ffd35f'];
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=c*cw+3,y=r*ch+3,col=C[(r+c*2)%4];const gr=g.createLinearGradient(0,y,0,y+ch);gr.addColorStop(0,col);gr.addColorStop(1,col+'aa');g.fillStyle=gr;rr(g,x,y,cw-6,ch-6,Math.min(cw,ch)*.3);g.fill();
      g.fillStyle='#ffffffb0';g.beginPath();g.ellipse(x+cw*.28,y+ch*.28,cw*.1,ch*.07,-.5,0,7);g.fill();g.beginPath();g.arc(x+cw*.7,y+ch*.66,Math.min(cw,ch)*.06,0,7);g.fill()}});
  return wt0(Wl,w2,h2,cols,rows)}}
Object.assign(THEMES.cake.wall,{style:'cake',edge:'#ffd6ea',joint:'#e8a070'});
Object.assign(THEMES.cloud.wall,{style:'marsh',edge:'#ffffff',joint:'#c8b8f0'});
Object.assign(THEMES.sea.wall,{style:'jelly',edge:'#7ee8d8',joint:'#1f6a8e'});
THEMES.sea.hillC=['#f2dcae','#ecd2a0','#f8e6c0','#e2c48e','#fff3d6'];
