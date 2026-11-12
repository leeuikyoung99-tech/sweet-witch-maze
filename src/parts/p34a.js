/* ================= 34차 (가): 마녀 상점 스킨 다시 — 종류마다 7개 · 기본은 민무늬 · 유료는 무늬 + 작은 장식 ================= */
// ----- 슬라임 모자 없애기 (산 사람에게는 코인 돌려주기) -----
{let back=0;for(const id of['party','ribbon'])if(SAVE.own['slimehat:'+id]){back+=250;delete SAVE.own['slimehat:'+id]}if(SAVE.eq.slimehat&&SAVE.eq.slimehat!=='none')SAVE.eq.slimehat='none';
  if(back){SAVE.coins+=back;saveGame();setTimeout(()=>{try{tMsg(`슬라임 모자가 없어져서 ${back}코인을 돌려드렸어요`)}catch(e){}},3000)}}
SHOPTAB.witch=SHOPTAB.witch.filter(k=>k!=='slimehat');
// ----- 무늬 그림 -----
const PT2={};
function patT(kind,a,b,rep){const key=kind+a+b+(rep||'');if(PT2[key])return PT2[key];
  const star=(g,x,y,r1,r2)=>{g.beginPath();for(let i=0;i<10;i++){const q=-Math.PI/2+i*Math.PI/5,r=i%2?r2:r1;g.lineTo(x+Math.cos(q)*r,y+Math.sin(q)*r)}g.closePath();g.fill()};
  const heart=(g,x,y,s)=>{g.beginPath();g.moveTo(x,y+s*.9);g.bezierCurveTo(x-s*1.2,y,x-s*.9,y-s*.9,x,y-s*.35);g.bezierCurveTo(x+s*.9,y-s*.9,x+s*1.2,y,x,y+s*.9);g.fill()};
  const t=keepTex(canvasTex(128,128,(g,w,h)=>{g.fillStyle=a;g.fillRect(0,0,w,h);g.fillStyle=b;g.strokeStyle=b;
    if(kind==='dots'){for(const[x,y]of[[32,32],[96,96],[96,-32],[-32,96],[160,96],[96,160]]){g.beginPath();g.arc(x,y,13,0,7);g.fill()}}
    else if(kind==='stripes'){for(let k=-2;k<4;k++){g.beginPath();g.moveTo(k*64,0);g.lineTo(k*64+32,0);g.lineTo(k*64+32+h,h);g.lineTo(k*64+h,h);g.fill()}}
    else if(kind==='hstripes'){g.fillRect(0,0,w,h/2)}
    else if(kind==='stars'){star(g,34,34,18,8);star(g,98,96,14,6);star(g,98,-32,14,6);star(g,-30,96,14,6)}
    else if(kind==='hearts'){heart(g,34,36,16);heart(g,98,98,13);heart(g,98,-30,13);heart(g,-30,98,13)}
    else if(kind==='check'){g.globalAlpha=.85;g.fillRect(0,0,64,64);g.fillRect(64,64,64,64)}
    else if(kind==='seeds'){for(const[x,y,r]of[[20,22,.3],[60,14,-.4],[100,28,.2],[36,62,-.2],[82,70,.5],[118,96,-.3],[18,104,.4],[58,112,0],[100,120,.3]]){g.save();g.translate(x,y);g.rotate(r);g.beginPath();g.ellipse(0,0,4,7,0,0,7);g.fill();g.restore()}}
    else if(kind==='chips'){for(const[x,y,r]of[[22,20,.3],[70,16,1],[110,40,.2],[40,58,.7],[88,76,1.4],[18,98,.4],[64,108,1.1],[112,110,.6]]){g.save();g.translate(x,y);g.rotate(r);g.fillRect(-6,-5,12,9);g.restore()}}
    else if(kind==='clouds'){for(const[x,y]of[[34,40],[98,104],[98,-24],[-30,104]]){for(const[dx,dy,r]of[[-12,4,12],[0,-4,15],[13,4,11],[0,8,12]]){g.beginPath();g.arc(x+dx,y+dy,r,0,7);g.fill()}}}
    else if(kind==='curls'){g.lineWidth=5;for(let y=8;y<h+16;y+=22)for(let x=(y/22%2)*11;x<w+16;x+=22){g.beginPath();g.arc(x,y,7,.4,5.8);g.stroke()}}
    else if(kind==='bubbles'){g.lineWidth=4;for(const[x,y,r]of[[30,30,13],[92,26,8],[70,76,16],[22,100,9],[112,104,11]]){g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.globalAlpha=.6;g.beginPath();g.arc(x-r*.35,y-r*.35,r*.25,0,7);g.fill();g.globalAlpha=1}}
    else if(kind==='rainbow'){const cs=['#ff6b8b','#ffb36b','#ffe66b','#7ee8a8','#7cc6ff','#b98cff'];for(let i=0;i<6;i++){g.fillStyle=cs[i];g.fillRect(0,i*h/6,w,h/6+1)}}
    else if(kind==='melon'){g.lineWidth=10;for(let x=10;x<w;x+=32){g.beginPath();for(let y=0;y<=h;y+=8)g.lineTo(x+Math.sin(y/14)*5,y);g.stroke()}}
  },rep||[3,2]));return PT2[key]=t}
const setPat=(mat,tex)=>{mat.map=tex;mat.color=new THREE.Color('#ffffff');mat.needsUpdate=true};
const PM2=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:80},o||{}));
// ----- 작은 장식 -----
function decoBow(col,sc){const g=new THREE.Group();for(const s of[-1,1]){const l=new THREE.Mesh(new THREE.SphereGeometry(.32,12,8),PM2(col));l.scale.set(1.25,.75,.45);l.position.x=s*.34;l.rotation.z=s*.35;g.add(l)}const k=new THREE.Mesh(new THREE.SphereGeometry(.15,10,8),PM2(col));k.scale.z=.7;g.add(k);g.scale.setScalar(sc||1);return g}
function decoStar(col,sc){const m=new THREE.Mesh(new THREE.ExtrudeGeometry(starShape(.5,.22),{depth:.14,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2}),PM2(col,{emissive:new THREE.Color(col),emissiveIntensity:.25}));m.geometry.center();m.scale.setScalar(sc||1);return m}
function decoHeart(col,sc){const m=new THREE.Mesh(new THREE.ExtrudeGeometry(heartShape(.45),{depth:.16,bevelEnabled:true,bevelSize:.05,bevelThickness:.05,bevelSegments:2}),PM2(col));m.geometry.center();m.scale.setScalar(sc||1);return m}
function decoFlower(col,sc){const g=new THREE.Group();for(let i=0;i<5;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),PM2(col));const a=i/5*Math.PI*2;p.position.set(Math.cos(a)*.22,Math.sin(a)*.22,0);p.scale.z=.5;g.add(p)}const c=new THREE.Mesh(new THREE.SphereGeometry(.15,10,8),PM2('#ffd84a'));c.position.z=.06;g.add(c);g.scale.setScalar(sc||1);return g}
function decoCrown(sc){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.28,16,1,true),PM2('#ffcf3a',{side:THREE.DoubleSide,shininess:120}));g.add(b);for(let i=0;i<5;i++){const a=i/5*Math.PI*2,c=new THREE.Mesh(new THREE.ConeGeometry(.1,.3,6),PM2('#ffcf3a'));c.position.set(Math.cos(a)*.42,.27,Math.sin(a)*.42);g.add(c);const j=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),PM2(['#ff5f8a','#7cc6ff'][i%2]));j.position.set(Math.cos(a)*.43,0,Math.sin(a)*.43);g.add(j)}g.scale.setScalar(sc||1);return g}
function decoLeaf(sc){const g=new THREE.Group();for(let i=0;i<5;i++){const l=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),PM2('#4fbf5a'));l.scale.set(.5,.12,1.1);const a=i/5*Math.PI*2;l.position.set(Math.cos(a)*.22,0,Math.sin(a)*.22);l.rotation.y=-a;l.rotation.z=.25;g.add(l)}const st=new THREE.Mesh(new THREE.CylinderGeometry(.04,.05,.25,6),PM2('#3a8a3a'));st.position.y=.12;g.add(st);g.scale.setScalar(sc||1);return g}
const at2=(o,x,y,z,ry)=>{o.position.set(x,y,z);if(ry!=null)o.rotation.y=ry;return o};
// ----- 몬스터 스킨 -----
const SK2={
 ghost:{cotton:{n:'솜사탕',p:0},witch:{n:'마녀 모자 유령',p:250,keep:'witch'},
   sheep:{n:'양 구름 유령',p:250,C:['#ffffff','#efe6d4'],pat:['curls','#ffffff','#e2d6c0',[6,3]],deco:'sheep'},
   star:{n:'별사탕 유령',p:200,C:['#fff6c8','#ffd84a'],pat:['stars','#fff6c8','#ffc93a',[4,2]],deco:'star'},
   berry:{n:'딸기 우유 유령',p:250,C:['#ffd6e6','#ff9ec7'],pat:['dots','#ffd6e6','#ffffff',[4,2]],deco:'berry'},
   mint:{n:'박하 유령',p:200,C:['#c9f5e6','#7ee8c8'],pat:['stripes','#c9f5e6','#ffffff',[3,1]],deco:'bow:#2fbf93'},
   night:{n:'밤하늘 유령',p:350,C:['#5a5aa8','#2e2e72'],pat:['stars','#5a5aa8','#ffe48a',[5,3]],deco:'moon'}},
 bat:{grape:{n:'포도',p:0},pumpkin:{n:'호박 박쥐',p:250,keep:'pumpkin'},
   santa:{n:'산타 박쥐',p:300,C:['#e8364f','#7a1020','#ffffff'],wing:['#e8364f'],deco:'santa'},
   cotton:{n:'솜사탕 박쥐',p:250,C:['#ffc4de','#ff7eb6','#ffffff'],wing:['stripes','#bfe6ff','#ffd6ea']},
   lemon:{n:'레몬 박쥐',p:200,C:['#ffe14d','#c99a10','#ffffff'],wing:['stripes','#ffe88a','#fff8d0']},
   choco:{n:'초코 박쥐',p:200,C:['#8a5230','#3a1e10','#fff6ee'],wing:['dots','#b07a4a','#fff6ee']},
   star:{n:'별빛 박쥐',p:350,C:['#3a3a8a','#1a1a4a','#ffe48a'],wing:['stars','#4a4aa0','#ffe48a'],deco:'star'}},
 bear:{peach:{n:'복숭아',p:0},swim:{n:'바다 수영모 곰',p:250,keep:'swim'},
   chef:{n:'요리사 곰',p:300,deco:'chef'},
   berry:{n:'딸기 곰',p:250,C:['#ff5a6e','#c0203a','#ffd0d8'],pat:['seeds','#ff5a6e','#fff3a8',[4,2]],deco:'leaf'},
   mintchoco:{n:'민트초코 곰',p:250,C:['#9eecd4','#2f9c7c','#e0fff4'],pat:['chips','#9eecd4','#5a3220',[3,2]]},
   honey:{n:'꿀 곰',p:300,C:['#ffbf3a','#c07a10','#fff0b0'],deco:'honey'},
   rainbow:{n:'무지개 곰',p:350,C:['#fff2f8','#ffb3d6','#ffffff'],belly:'rainbow',deco:'bow:#7cc6ff'}},
 soldier:{ginger:{n:'진저 병정',p:0},snow:{n:'눈사람 병정',p:250,keep:'snow'},
   nut:{n:'호두까기 병정',p:350,deco:'nut'},macaron:{n:'마카롱 근위병',p:300,deco:'macaron'},
   mint:{n:'민트 병정',p:250,deco:'mint'},knight:{n:'초코 기사',p:350,deco:'knight'},drum:{n:'딸기 악대',p:300,deco:'drum'}},
 spider:{mint:{n:'민트 거미',p:0},
   cloud:{n:'구름 거미',p:250,C:['#8cc4ff','#4a8ad8'],pat:['clouds','#8cc4ff','#ffffff',[3,2]]},
   jelly:{n:'해파리 거미',p:250,C:['#b98cff','#7a45e0'],pat:['bubbles','#b98cff','#ffffff',[3,2]]},
   berry:{n:'딸기 거미',p:200,C:['#ff5a6e','#7a1020'],pat:['seeds','#ff5a6e','#fff3a8',[4,2]],deco:'leaf'},
   bee:{n:'꿀벌 거미',p:250,C:['#ffd84a','#3a2a10'],pat:['hstripes','#ffd84a','#3a2a10',[1,4]],deco:'wings'},
   melon:{n:'수박 거미',p:250,C:['#7ee8a8','#2f7a4a'],pat:['melon','#7ee8a8','#2f9c5a',[3,1]]},
   star:{n:'별빛 거미',p:350,C:['#4a4a9a','#ffe48a'],pat:['stars','#4a4a9a','#ffe48a',[4,2]]}}};
// 이름·가격 · 색 맞추기
for(const k in SK2){const S=SHOP[k];const old=S.items;S.items={};for(const id in SK2[k]){const d=SK2[k][id];S.items[id]=[d.n,d.p];if(d.C)MSKIN[k][id]=d.C;else if(!MSKIN[k][id])MSKIN[k][id]=Object.values(MSKIN[k])[0]}
  for(const id in old)if(!S.items[id]&&SAVE.own[k+':'+id]){delete SAVE.own[k+':'+id]}if(!S.items[SAVE.eq[k]])SAVE.eq[k]=DEF_EQ[k]}
MSKIN.bear.chef=MSKIN.bear.peach;
// 장식 달기
function monDeco(k,id,m){const d=SK2[k]&&SK2[k][id];if(!d)return;const b=m.body||m.g;
  if(d.pat&&m.mats)for(const mt of m.mats)setPat(mt,patT(...d.pat));
  if(k==='bat'&&d.wing&&m.wing)for(const piv of m.wing){const w=piv.children[0];if(!w)continue;w.material=d.wing.length===1?new THREE.MeshLambertMaterial({color:d.wing[0]}):new THREE.MeshLambertMaterial({map:patT(d.wing[0],d.wing[1],d.wing[2],[2,2])})}
  if(k==='bear'&&d.belly==='rainbow')b.traverse(o=>{if(o.isMesh&&o.material&&o.material.opacity===.55){o.material=new THREE.MeshPhongMaterial({map:patT('rainbow','#fff','#fff',[1,1]),transparent:true,opacity:.85,shininess:80})}});
  const dc=d.deco||'';
  if(d.keep){HATON0(b,{witch:3.25,pumpkin:2.6,swim:2.85,snow:2.7}[d.keep],d.keep,{witch:.8,pumpkin:.9,swim:.9,snow:1}[d.keep])}
  if(dc.startsWith('bow:')){const y={ghost:3.05,bear:2.95}[k]||2.6;b.add(at2(decoBow(dc.slice(4),.9),.55,y,.35))}
  if(k==='ghost'){
    if(dc==='sheep'){for(const s of[-1,1]){const h=new THREE.Mesh(new THREE.TorusGeometry(.28,.11,8,16,Math.PI*1.4),PM2('#c9a27a'));h.position.set(s*.85,2.75,.25);h.rotation.set(0,s*.4,s>0?-.4:Math.PI+.4);b.add(h);const e=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),PM2('#ffd0c0'));e.scale.set(1.5,.6,.7);e.position.set(s*1.15,2.35,.15);e.rotation.z=s*-.4;b.add(e)}}
    if(dc==='star')b.add(at2(decoStar('#ffcf3a',.75),0,3.75,0));
    if(dc==='berry'){const s=new THREE.Mesh(new THREE.SphereGeometry(.42,14,10),PM2('#ff4f6d'));s.scale.set(1,1.15,1);s.position.set(.1,3.65,0);b.add(s);b.add(at2(decoLeaf(.9),.1,4.05,0))}
    if(dc==='moon'){const mm=new THREE.Mesh(new THREE.TorusGeometry(.38,.15,10,20,Math.PI*1.25),PM2('#ffe48a',{emissive:new THREE.Color('#ffcf3a'),emissiveIntensity:.4}));mm.position.set(.3,3.75,0);mm.rotation.z=.6;b.add(mm)}}
  if(k==='bat'){
    if(dc==='santa'){HATON0(b,2.45,'santa',.85);const bell=new THREE.Mesh(new THREE.SphereGeometry(.2,12,10),PM2('#2fae5a'));bell.position.set(0,.85,.75);b.add(bell);const r=new THREE.Mesh(new THREE.TorusGeometry(.2,.05,6,14),PM2('#ffcf3a'));r.position.set(0,.98,.72);b.add(r);
      if(m.wing)for(const piv of m.wing)piv.traverse(o=>{if(o.isMesh&&o.geometry.type==='CylinderGeometry')o.material=PM2('#ffffff')})}
    if(dc==='star')b.add(at2(decoStar('#ffe48a',.6),0,2.85,0))}
  if(k==='bear'){
    if(dc==='chef'){HATON0(b,3.05,'chef',.9);const ap=new THREE.Mesh(new THREE.SphereGeometry(1,24,16,Math.PI*.12,Math.PI*.76,Math.PI*.38,Math.PI*.42),PM2('#ffffff',{side:THREE.DoubleSide}));ap.scale.set(.99,1.12,.83);ap.position.y=1.15;b.add(ap);
      const pk=new THREE.Mesh(new THREE.BoxGeometry(.4,.26,.05),PM2('#ff9ec7'));pk.position.set(0,.95,.82);b.add(pk);const tie=new THREE.Mesh(new THREE.TorusGeometry(.62,.05,6,24,Math.PI),PM2('#ffffff'));tie.position.set(0,2.0,0);tie.rotation.set(-Math.PI/2,0,0);b.add(tie);
      const ld=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1.1,8),PM2('#c9a27a'));st.position.y=.5;ld.add(st);const cup=new THREE.Mesh(new THREE.SphereGeometry(.22,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),PM2('#e9eef5',{side:THREE.DoubleSide}));ld.add(cup);ld.position.set(1.05,1.25,.45);ld.rotation.z=.4;b.add(ld)}
    if(dc==='leaf')b.add(at2(decoLeaf(1.1),0,3.25,0));
    if(dc==='honey'){const pot=new THREE.Mesh(new THREE.SphereGeometry(.32,14,10),PM2('#e09a3a'));pot.scale.y=.85;pot.position.set(0,1.75,.82);b.add(pot);const lid=new THREE.Mesh(new THREE.CylinderGeometry(.2,.24,.12,12),PM2('#fff0b0'));lid.position.set(0,2.02,.8);b.add(lid);
      const str=new THREE.Mesh(new THREE.TorusGeometry(.6,.04,6,24),PM2('#a0602e'));str.rotation.x=Math.PI/2;str.position.set(0,2.05,0);b.add(str);const drip=new THREE.Mesh(new THREE.SphereGeometry(.08,8,6),PM2('#ffbf3a'));drip.scale.y=1.5;drip.position.set(.12,1.48,.92);b.add(drip)}}
  if(k==='spider'){
    if(dc==='leaf')b.add(at2(decoLeaf(.8),0,1.3,-.1));
    if(dc==='wings')for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.SphereGeometry(.4,12,8),PM2('#e0f6ff',{transparent:true,opacity:.6}));w.scale.set(1.2,.15,.6);w.position.set(s*.55,1.35,-.2);w.rotation.z=s*.5;b.add(w)}}
  if(k==='soldier')soldierDeco(m,dc)}
// 쿠키 병정: 몸 색·모자 다시 칠하기
function soldierDeco(m,dc){if(!dc)return;const b=m.body;const parts={torso:null,head:null,hat:null,brim:null,pom:null,legs:[],arms:[],btn:[]};
  b.traverse(o=>{if(!o.isMesh)return;const t=o.geometry.type,y=o.position.y,P=o.geometry.parameters||{},top=o.parent===b;
    if(t==='LatheGeometry'&&top&&y<1.5)parts.torso=o;else if(t==='LatheGeometry'&&top&&y>=2)parts.hat=o;else if(t==='SphereGeometry'&&top&&Math.abs(P.radius-.6)<.01)parts.head=o;
    else if(t==='TorusGeometry'&&top&&y>2.5)parts.brim=o;else if(t==='SphereGeometry'&&top&&y>3.6)parts.pom=o;else if(t==='SphereGeometry'&&top&&Math.abs(P.radius-.27)<.01)parts.legs.push(o);
    else if(t==='SphereGeometry'&&!top&&(Math.abs(P.radius-.18)<.01||Math.abs(P.radius-.2)<.01))parts.arms.push(o);else if(t==='SphereGeometry'&&top&&Math.abs(P.radius-.09)<.01&&y>1)parts.btn.push(o)});
  const paint=(o,c)=>{if(o)o.material=typeof c==='string'?PM2(c,{shininess:30}):c};const H=parts.hat;if(H){H.visible=true}
  if(dc==='nut'){paint(parts.torso,'#e8364f');for(const a of parts.arms)paint(a,'#e8364f');for(const l of parts.legs)paint(l,'#2a2a3a');paint(parts.head,'#f6d6b0');for(const x of parts.btn)paint(x,'#ffcf3a');
    if(H){paint(H,'#2a1a2e');H.scale.set(1.12,1.35,1.12)}paint(parts.brim,'#ffcf3a');if(parts.pom){paint(parts.pom,'#e8364f');parts.pom.position.y=4.75}
    const plate=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.06,6),PM2('#ffcf3a',{shininess:120}));plate.rotation.x=Math.PI/2;plate.position.set(0,3.25,.68);b.add(plate);
    const beard=new THREE.Mesh(new THREE.SphereGeometry(.42,14,10),PM2('#ffffff'));beard.scale.set(1.15,.8,.6);beard.position.set(0,2.0,.42);b.add(beard);
    for(const s of[-1,1]){const ep=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.1,12),PM2('#ffcf3a'));ep.position.set(s*.66,1.92,0);ep.rotation.z=s*.3;b.add(ep);for(let i=0;i<5;i++){const f=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.2,4),PM2('#ffcf3a'));f.position.set(s*(.5+i*.08),1.8,.12);b.add(f)}}
    const belt=new THREE.Mesh(new THREE.TorusGeometry(.67,.08,6,20),PM2('#2a2a3a'));belt.rotation.x=Math.PI/2;belt.position.y=.95;b.add(belt)}
  if(dc==='macaron'){paint(parts.torso,'#ffc4de');for(const a of parts.arms)paint(a,'#ffc4de');for(const l of parts.legs)paint(l,'#fff6ee');for(const x of parts.btn)paint(x,'#7ee8c8');
    if(H){paint(H,'#c9a6ff');H.scale.set(1.05,1.25,1.05)}paint(parts.brim,'#7ee8c8');if(parts.pom){paint(parts.pom,'#ff7eb6');parts.pom.position.y=4.55}
    const sash=new THREE.Mesh(new THREE.TorusGeometry(.72,.08,6,24),PM2('#7ee8c8'));sash.position.y=1.25;sash.rotation.set(Math.PI/2,.55,0);b.add(sash);for(const y of[3.05,3.6]){const r=new THREE.Mesh(new THREE.TorusGeometry(.62,.05,6,20),PM2('#fff6ee'));r.rotation.x=Math.PI/2;r.position.y=y;b.add(r)}}
  if(dc==='mint'){const st=new THREE.MeshLambertMaterial({map:patT('stripes','#9eecd4','#ffffff',[2,1])});paint(parts.torso,st);for(const a of parts.arms)paint(a,'#9eecd4');for(const l of parts.legs)paint(l,'#2fbf93');paint(parts.head,'#c9f5e6');
    if(H)paint(H,'#2fbf93');paint(parts.brim,'#ffffff');if(parts.pom)paint(parts.pom,'#ffffff');b.add(at2(decoBow('#ff7eb6',.6),0,1.95,.55))}
  if(dc==='knight'){paint(parts.torso,'#8a5a3a');for(const a of parts.arms)paint(a,'#8a5a3a');for(const l of parts.legs)paint(l,'#5a3220');paint(parts.head,'#c89060');
    if(H)H.visible=false;if(parts.brim)parts.brim.visible=false;if(parts.pom)parts.pom.visible=false;
    const hm=new THREE.Mesh(new THREE.SphereGeometry(.7,18,12,0,Math.PI*2,0,Math.PI*.55),PM2('#d9dee8',{shininess:140}));hm.position.y=2.4;b.add(hm);const vz=new THREE.Mesh(new THREE.BoxGeometry(.9,.1,.1),PM2('#9aa4b8'));vz.position.set(0,2.5,.6);b.add(vz);
    const pl=new THREE.Mesh(new THREE.SphereGeometry(.3,12,8),PM2('#ff7eb6'));pl.scale.set(.5,1.2,1.4);pl.position.set(0,3.25,-.1);b.add(pl);
    const sh=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.1,6),PM2('#d9dee8',{shininess:140}));sh.rotation.set(Math.PI/2,0,0);sh.position.set(-.85,1.25,.35);b.add(sh);const hc=decoHeart('#ff5f8a',.45);hc.position.set(-.85,1.25,.42);b.add(hc)}
  if(dc==='drum'){paint(parts.torso,'#ff5a6e');for(const a of parts.arms)paint(a,'#ff5a6e');for(const l of parts.legs)paint(l,'#ffffff');for(const x of parts.btn)paint(x,'#ffcf3a');if(H)paint(H,'#ff5a6e');paint(parts.brim,'#ffffff');if(parts.pom)paint(parts.pom,'#ffffff');
    const dr=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.5,18),new THREE.MeshLambertMaterial({map:patT('stripes','#ffffff','#ff5a6e',[3,1])}));dr.position.set(0,1.0,.75);dr.rotation.x=Math.PI/2.2;b.add(dr);
    for(const s of[-1,1]){const st=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.6,6),PM2('#fff6ee'));st.position.set(s*.3,1.45,.95);st.rotation.z=s*.6;b.add(st)}
    b.add(at2(decoLeaf(.7),0,3.75,0))}}
let HATON0=null;
{const mm=monModel;monModel=function(k,skin){if(!HATON0)HATON0=hatOn;const id=skin||wl(k);const ho=hatOn;hatOn=function(){return new THREE.Group()};let m;try{m=mm.apply(this,arguments)}finally{hatOn=ho}
  try{monDeco(k,id,m)}catch(e){console.warn(e)}return m}}
// ----- 사탕 대포: 기본은 민무늬 -----
Object.assign(CANNONC,{plain:{s:['#ff9ec7','#ff9ec7'],head:'#fff3e6',bow:'#ff5f9e'},dots:{s:['#ff9ec7','#ffffff'],head:'#fff3e6',bow:'#e8364f'},stars:{s:['#4a4aa0','#ffe48a'],head:'#e8eaff',bow:'#ffcf3a'},check:{s:['#7ee8c8','#ffffff'],head:'#f0fff8',bow:'#ff7eb6'},hearts:{s:['#ffffff','#ff5f8a'],head:'#fff0f3',bow:'#ff5f8a'}});
SHOP.cannon.items={plain:['기본 대포',0],stripe:['딸기 줄무늬',150],dots:['물방울 리본',200],check:['체크 꽃',250],stars:['별빛 대포',300],hearts:['하트 왕관',350],cake:['케이크 대포',300]};
DEF_EQ.cannon='plain';SAVE.own['cannon:plain']=1;if(!SHOP.cannon.items[SAVE.eq.cannon])SAVE.eq.cannon='plain';
{const tw=towerMesh;towerMesh=function(skin){const id=skin||'plain';if(!['plain','dots','stars','check','hearts'].includes(id))return tw.apply(this,arguments);const g=tw('stripe');const C=CANNONC[id];
  const body=g.children[0];body.material=id==='plain'?PM2('#ff9ec7',{shininess:40}):new THREE.MeshLambertMaterial({map:patT(id==='check'?'check':id,C.s[0],C.s[1],id==='check'?[3,3]:[2,3])});
  g.userData.head.material=PM2(C.head);
  const bow=g.children.find(o=>o.geometry&&o.geometry.type==='TorusGeometry');if(bow){if(id==='plain')bow.visible=false;else bow.material=PM2(C.bow)}
  if(id==='dots')g.add(at2(decoBow('#e8364f',.9),0,2.75,.55));
  if(id==='stars')g.add(at2(decoStar('#ffe48a',.7),0,4.35,0));
  if(id==='check')g.add(at2(decoFlower('#ff7eb6',.9),.45,3.85,.35));
  if(id==='hearts'){g.add(at2(decoCrown(.9),0,4.05,0));const h=decoHeart('#ff5f8a',.5);h.position.set(0,2.6,.62);g.add(h)}
  return g}}
// ----- 얼음 포탑 · 자석 포탑 -----
Object.assign(TSKIN.ice,{strawberry:{s:['#ff9ec7','#fff0f6'],head:'#ffc4de',acc:'#ff5f8a'},mango:{s:['#ffc94a','#fff6dc'],head:'#ffe08a',acc:'#ffa51f'},matcha:{s:['#8fcf7a','#f2fff0'],head:'#c8ecb0',acc:'#5aa04a'},redbean:{s:['#c99a8a','#fff6ee'],head:'#efe0d8',acc:'#7a2a2a'},rainbow:{s:['#b98cff','#ffffff'],head:'#ffffff',acc:'#7cc6ff'}});
Object.assign(TSKIN.magnet,{heart:{s:['#ff7a8a','#fff0f3'],head:'#ffd6dc',acc:'#ff4f6d'},star:{s:['#7cc6ff','#eaf6ff'],head:'#cfeaff',acc:'#ffcf3a'},stripe:{s:['#e8364f','#ffffff'],head:'#ff9eaa',acc:'#e8364f'},gold:{s:['#ffcf3a','#fff3c4'],head:'#ffe48a',acc:'#e0a020'},mint:{s:['#7ee8c8','#effffa'],head:'#c9f5e6',acc:'#2fbf93'}});
for(const k of['ice','magnet'])for(const id in TSKIN[k])CANNONC[k+'_'+id]={s:TSKIN[k][id].s,head:TSKIN[k][id].head,bow:TSKIN[k][id].acc};
SHOP.ice.items={snow:['눈꽃 빙수',0],strawberry:['딸기 빙수',150],mango:['망고 빙수',200],matcha:['녹차 빙수',200],redbean:['팥빙수',250],macaron:['마카롱 빙수',250],rainbow:['무지개 빙수',350]};
SHOP.magnet.items={red:['빨강 자석',0],stripe:['줄무늬 자석',150],mint:['민트 자석',200],choco:['초코 자석',200],heart:['하트 자석',250],star:['별 자석',300],gold:['황금 자석',350]};
{const tm=turretMesh;turretMesh=function(tk,skin){const g=tm.apply(this,arguments);const id=skin||wl(tk);
  if(tk==='ice'){const top=(o,y)=>{o.position.y+=y;g.add(o)};
    if(id==='strawberry'){const s=new THREE.Mesh(new THREE.SphereGeometry(.3,12,10),PM2('#ff4f6d'));s.scale.set(1,1.2,1);s.position.set(0,4.45,0);g.add(s);g.add(at2(decoLeaf(.6),0,4.75,0))}
    if(id==='mango')for(let i=0;i<6;i++){const c=new THREE.Mesh(new THREE.BoxGeometry(.22,.22,.22),PM2('#ffb31f'));const a=i;c.position.set(Math.cos(a)*.3,4.3+(i%2)*.15,Math.sin(a)*.3);c.rotation.set(a,a*.7,0);g.add(c)}
    if(id==='matcha'){const p=new THREE.Mesh(new THREE.SphereGeometry(.45,14,10,0,Math.PI*2,0,Math.PI/2),PM2('#6fb35a'));p.position.y=4.15;g.add(p);const d=new THREE.Mesh(new THREE.SphereGeometry(.16,10,8),PM2('#fff6ee'));d.position.y=4.55;g.add(d)}
    if(id==='redbean')for(let i=0;i<9;i++){const bn=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),PM2('#7a2a2a'));bn.scale.set(1,.8,1.3);const a=i*.7,r=.12+(i%3)*.12;bn.position.set(Math.cos(a)*r,4.25+(i%3)*.05,Math.sin(a)*r);g.add(bn)}
    if(id==='rainbow')for(let i=0;i<14;i++){const sp=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.18,6),PM2(['#ff6b8b','#ffb36b','#ffe66b','#7ee8a8','#7cc6ff','#b98cff'][i%6]));const a=i*2.3,r=.15+(i%4)*.08;sp.position.set(Math.cos(a)*r,4.18,Math.sin(a)*r);sp.rotation.set(a,0,a);g.add(sp)}
    if(id!=='snow'&&id!=='macaron'){const body=g.children[0];if(body&&body.material)body.material=new THREE.MeshLambertMaterial({map:patT(id==='rainbow'?'rainbow':'stripes',TSKIN.ice[id].s[1],TSKIN.ice[id].s[0],[2,3])})}}
  if(tk==='magnet'){const T=TSKIN.magnet[id]||TSKIN.magnet.red;
    if(id==='heart'){const h=decoHeart('#ff4f6d',.5);h.position.set(0,4.85,0);g.add(h);g.children[0].material=new THREE.MeshLambertMaterial({map:patT('hearts','#fff0f3','#ff7a8a',[2,3])})}
    if(id==='star'){g.add(at2(decoStar('#ffcf3a',.55),0,4.85,0));g.children[0].material=new THREE.MeshLambertMaterial({map:patT('stars','#eaf6ff','#7cc6ff',[2,3])})}
    if(id==='stripe')g.children[0].material=new THREE.MeshLambertMaterial({map:patT('stripes','#ffffff','#e8364f',[2,2])});
    if(id==='mint')g.children[0].material=new THREE.MeshLambertMaterial({map:patT('dots','#effffa','#7ee8c8',[2,3])});
    if(id==='gold'){g.traverse(o=>{if(o.isMesh&&o.geometry.type==='TorusGeometry')o.material=PM2('#ffcf3a',{shininess:160,specular:new THREE.Color('#fff6c8'),emissive:new THREE.Color('#a06a00'),emissiveIntensity:.25})});g.children[0].material=PM2('#ffd84a',{shininess:140});g.add(at2(decoCrown(.7),0,4.75,0))}}
  return g}}
// ----- 막대사탕 회전날: 크고 반짝이는 사탕 -----
SHOP.spin.items={lolli:['막대사탕',0],rainbow:['무지개 회전날',200],heart:['하트 사탕',250],star:['별 사탕',250],cane:['지팡이 사탕',300],cotton:['솜사탕 회전날',300],pretzel:['초코 프레첼',350]};
const SPINC={lolli:['#ff7eb6','#7cc6ff'],rainbow:['rainbow','rainbow'],heart:['#ff4f6d','#ff9ec7'],star:['#ffcf3a','#7cc6ff'],cane:['#e8364f','#e8364f'],cotton:['#ffc4de','#bfe6ff'],pretzel:['#8a4a26','#8a4a26']};
spinMesh=function(){const id=SHOP.spin.items[wl('spin')]?wl('spin'):'lolli',C=SPINC[id];const g=new THREE.Group();
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.75,1.0,1.0,20),new THREE.MeshLambertMaterial({map:patT('stripes','#fff6ee','#ff9ec7',[3,1])}));base.position.y=.5;g.add(base);
  const lip=new THREE.Mesh(new THREE.TorusGeometry(.8,.12,8,24),PM2('#ffffff'));lip.rotation.x=Math.PI/2;lip.position.y=1.0;g.add(lip);
  const piv=new THREE.Group();piv.position.y=1.35;g.add(piv);
  const barM=id==='cane'?new THREE.MeshLambertMaterial({map:stripeT('#e8364f','#ffffff',[1,6])}):id==='pretzel'?PM2('#a0602e'):new THREE.MeshLambertMaterial({map:stripeT(id==='rainbow'?'#b98cff':C[0],'#ffffff',[1,6])});
  const bar=new THREE.Mesh(new THREE.CylinderGeometry(.17,.17,5.4,12),barM);bar.rotation.z=Math.PI/2;piv.add(bar);
  for(const s of[-1,1]){const col=s<0?C[0]:C[1];let head;
    if(id==='heart'){head=decoHeart(col,1.6)}
    else if(id==='star'){head=decoStar(col,1.75)}
    else if(id==='cotton'){head=new THREE.Group();for(const[x,y,z,r]of[[0,0,0,.6],[.35,.3,.1,.45],[-.35,.25,.1,.45],[.3,-.3,0,.42],[-.3,-.32,0,.42],[0,.45,-.1,.4]]){const p=new THREE.Mesh(new THREE.SphereGeometry(r,14,10),PM2(col,{shininess:20}));p.position.set(x,y,z);head.add(p)}}
    else if(id==='cane'){head=new THREE.Mesh(new THREE.TorusGeometry(.55,.17,10,24,Math.PI),new THREE.MeshLambertMaterial({map:stripeT('#e8364f','#ffffff',[4,1])}));head.rotation.z=s<0?Math.PI/2:-Math.PI/2;head.position.y=.55}
    else if(id==='pretzel'){head=new THREE.Group();const pm=PM2('#9a5228',{shininess:60});for(const[x,y,r]of[[-.3,.1,.36],[.3,.1,.36],[0,-.25,.42]]){const t=new THREE.Mesh(new THREE.TorusGeometry(r,.12,8,22),pm);t.position.set(x,y,0);head.add(t)}for(let i=0;i<10;i++){const sa=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,.06),PM2('#ffffff'));const a=i*.63;sa.position.set(Math.cos(a)*.45,Math.sin(a)*.4,.12);head.add(sa)}const dip=new THREE.Mesh(new THREE.TorusGeometry(.42,.13,8,22,Math.PI),PM2('#4a2a1a'));dip.position.set(0,-.25,0);dip.rotation.z=Math.PI;head.add(dip)}
    else{head=new THREE.Group();const disc=new THREE.Mesh(new THREE.CylinderGeometry(.95,.95,.36,32),[PM2('#ffffff'),new THREE.MeshPhongMaterial({map:col==='rainbow'?patT('rainbow','#fff','#fff',[1,1]):swirlT(col,'#ffffff'),shininess:110}),new THREE.MeshPhongMaterial({map:col==='rainbow'?patT('rainbow','#fff','#fff',[1,1]):swirlT(col,'#ffffff'),shininess:110})]);disc.rotation.x=Math.PI/2;head.add(disc);
      const rim=new THREE.Mesh(new THREE.TorusGeometry(.95,.1,8,32),PM2('#ffffff',{shininess:120}));head.add(rim);const gl=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.7}));gl.scale.set(1,.5,.3);gl.position.set(-.4,.45,.2);head.add(gl)}
    head.position.x=s*2.75;head.rotation.y=Math.PI/2*0;piv.add(head)}
  const hub=new THREE.Mesh(new THREE.SphereGeometry(.5,16,12),PM2('#ffd35f',{shininess:120}));hub.position.y=1.35;g.add(hub);const bw=decoBow(id==='pretzel'?'#ff9ec7':'#ff5f9e',.55);bw.position.set(0,1.85,0);g.add(bw);
  g.userData.head=hub;g.userData.piv=piv;if((G.aug||{}).dualspin){const c=piv.clone();c.rotation.y=Math.PI/2;piv.add(c)}return g};
// ----- 미리보기: 처음엔 슬라임만 · 고른 것 하나만 크게 -----
{const ss=shopStage;shopStage=function(){ss.apply(this,arguments);if(SHOPV.tab!=='witch'||STAGE.theme)return;const P=SHOPV.prev,f=SHOPV.sel&&SHOPV.sel[0];clearStage();
  const save=Object.assign({},SAVE.eq);Object.assign(SAVE.eq,P);let o;
  try{if(!f||f==='slime'){o=makeSlime(P.slime);STAGE.d=7.4}
    else if(f==='cannon'){o={g:towerMesh(P.cannon)};STAGE.d=9}
    else if(f==='ice'||f==='magnet'){o={g:turretMesh(f,P[f])};STAGE.d=9.4}
    else if(f==='spin'){o={g:spinMesh()};o.g.scale.setScalar(.85);STAGE.d=8.2}
    else{o=monModel(f,P[f]);STAGE.d={bear:11,soldier:9,ghost:8.4,bat:7.6,spider:7}[f]||8;if(f==='spider')o.g.position.y=.6;if(f==='bat')o.g.position.y=.8}}finally{Object.assign(SAVE.eq,save)}
  o.g.position.x=STAGE.x;o.g.position.z=STAGE.z;o.state='idle';scene.add(o.g);STAGE.objs.push(o.mixer?o:o.g);STAGE.spin=o.g}}
// ----- 상점 그림 -----
{const ii=itemIcon;itemIcon=function(cat,id){const d=SK2[cat]&&SK2[cat][id];let svg=ii(cat,id);
  const mot=d&&(d.pat||d.wing)?(d.pat||d.wing):cat==='cannon'&&['dots','stars','check','hearts'].includes(id)?[id,'',CANNONC[id].s[1]]:null;
  if(mot&&typeof svg==='string'&&svg.includes('</svg>')){const k=mot[0],c=mot[2]||'#fff';const m={dots:`<circle cx="38" cy="38" r="3" fill="${c}"/><circle cx="43" cy="31" r="2.2" fill="${c}"/>`,stars:`<path d="M39 30 l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" fill="${c}" stroke="#4a2a1a" stroke-width="1"/>`,hearts:`<path d="M40 44 c-6-4-6-9-3-10 c2-.7 3 1 3 1 s1-1.7 3-1 c3 1 3 6-3 10z" fill="${c}" stroke="#4a2a1a" stroke-width="1"/>`}[k];
    if(m)svg=svg.replace('</svg>',m+'</svg>')}
  return svg}}
