/* ================= 30차 (너): 도둑 옷은 상의·하의 한 벌 (바지도 옷 색) ================= */
for(const id in CKCL){const c=new THREE.Color(CKCL[id].m).lerp(new THREE.Color('#000000'),.15);CKCL[id].p='#'+c.getHexString()}
// 바지도 셔츠와 같은 방식(그림)으로 칠해서 색이 똑같이 보여요
function ckSolidTex(c){const k='solid:'+c;return CKTEX[k]||(CKTEX[k]=canvasTex(4,4,(g,w,h)=>{g.fillStyle=c;g.fillRect(0,0,w,h)}))}
// 초코 로켓: 머리에 닿지 않게 낮고 뒤로, 매끈한 몸통·둥근 날개·불꽃
// 웨이퍼 나비 날개: 위아래 날개 모양 웨이퍼 두 장 사이에 크림, 가장자리를 둥글게
{const bm8=backMesh;backMesh=function(id){
  if(id==='rocket'){const g=new THREE.Group(),L=(c,o)=>new THREE.MeshPhongMaterial(Object.assign({color:c,shininess:50},o||{}));
    const body=new THREE.Mesh(lathe([[0,-.24],[.1,-.23],[.13,-.16],[.135,.1],[.12,.2],[.08,.3],[.035,.37],[0,.39]],32),L('#7a4526'));g.add(body);
    const nose=new THREE.Mesh(lathe([[0,.18],[.123,.19],[.09,.29],[.04,.36],[0,.385]],32),L('#ff7eb6'));g.add(nose);
    for(let k=0;k<2;k++){const s=new THREE.Mesh(new THREE.TorusGeometry(.136,.014,10,32),L('#fff6ee'));s.rotation.x=Math.PI/2;s.position.y=-.1+k*.16;g.add(s)}
    const win=new THREE.Mesh(new THREE.SphereGeometry(.05,16,12),L('#a8e0ff',{shininess:120}));win.scale.z=.4;win.position.set(0,.06,-.13);g.add(win);
    const fs=new THREE.Shape();fs.moveTo(0,.1);fs.quadraticCurveTo(.1,.06,.13,-.08);fs.lineTo(0,-.06);fs.lineTo(0,.1);
    const fg=new THREE.ExtrudeGeometry(fs,{depth:.02,bevelEnabled:true,bevelThickness:.01,bevelSize:.01,bevelSegments:2,curveSegments:10});fg.translate(0,0,-.01);
    for(const a of[Math.PI/2,Math.PI*7/6,Math.PI*11/6]){const f=new THREE.Mesh(fg,L('#ffd35f'));f.position.set(Math.cos(a)*.12,-.16,Math.sin(a)*.12);f.rotation.y=-a;g.add(f)}
    const fl=new THREE.Mesh(lathe([[0,0],[.07,-.03],[.06,-.1],[.03,-.17],[0,-.2]],20),new THREE.MeshBasicMaterial({color:'#ffb347'}));fl.position.y=-.24;g.add(fl);
    const fl2=new THREE.Mesh(lathe([[0,0],[.04,-.02],[.03,-.07],[0,-.11]],16),new THREE.MeshBasicMaterial({color:'#fff1a8'}));fl2.position.y=-.24;g.add(fl2);
    g.position.set(0,-.14,-.07);const w=new THREE.Group();w.add(g);return w}
  if(id==='wafer'){const g=new THREE.Group(),t=waffleT();
    const wm=new THREE.MeshPhongMaterial({map:t,shininess:20}),cm=new THREE.MeshPhongMaterial({color:'#ffd6ea',shininess:40});
    const up=new THREE.Shape();up.moveTo(0,0);up.bezierCurveTo(.05,.22,.3,.42,.46,.36);up.bezierCurveTo(.58,.3,.52,.1,.4,.02);up.bezierCurveTo(.3,-.03,.12,-.02,0,0);
    const lo=new THREE.Shape();lo.moveTo(0,0);lo.bezierCurveTo(.12,-.02,.3,-.06,.34,-.18);lo.bezierCurveTo(.36,-.3,.22,-.34,.12,-.26);lo.bezierCurveTo(.05,-.2,.01,-.1,0,0);
    const ex=(sh,d)=>{const geo=new THREE.ExtrudeGeometry(sh,{depth:d,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:2,curveSegments:20});const p=geo.attributes.position,uv=geo.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,p.getX(i)*2.2,p.getY(i)*2.2);return geo};
    for(const s of[-1,1]){const side=new THREE.Group();side.scale.x=s;side.rotation.y=s*.28;
      for(const sh of[up,lo]){const a=new THREE.Mesh(ex(sh,.025),wm);a.position.z=.02;side.add(a);const c=new THREE.Mesh(ex(sh,.02),cm);c.scale.set(.96,.96,1);c.position.z=-.012;side.add(c);const b=new THREE.Mesh(ex(sh,.025),wm);b.position.z=-.045;side.add(b)}
      side.position.set(s*.05,.12,0);g.add(side)}
    const bar=new THREE.Mesh(lathe([[0,-.2],[.04,-.19],[.05,-.12],[.05,.12],[.04,.19],[0,.2]],20),new THREE.MeshPhongMaterial({color:'#7a4526',shininess:60}));bar.position.set(0,.1,0);g.add(bar);
    g.position.z=-.03;return g}
  return bm8(id)}}
