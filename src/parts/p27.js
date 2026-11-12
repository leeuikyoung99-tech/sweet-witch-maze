/* ================= 7차: 과자 몬스터 다시 만들기 · 특별 옷 ================= */
function monShadow(g,s){if(!GUMSHADOW)gumShadow();const sh=new THREE.Mesh(new THREE.PlaneGeometry(3.6*(s||1),3.6*(s||1)),new THREE.MeshBasicMaterial({map:GUMSHADOW,transparent:true,depthWrite:false,opacity:.5,polygonOffset:true,polygonOffsetFactor:-2}));sh.rotation.x=-Math.PI/2;sh.position.y=.03;g.add(sh);return sh}
function monFace(body,y,z,sc,mouth){const eyeM=new THREE.MeshBasicMaterial({color:'#2a1640'}),hiM=new THREE.MeshBasicMaterial({color:'#ffffff'});
  for(const sx of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.17*sc,14,10),eyeM);e.scale.set(1,1.35,.6);e.position.set(sx*.36*sc,y,z);body.add(e);const hi=new THREE.Mesh(new THREE.SphereGeometry(.055*sc,8,6),hiM);hi.position.set(sx*.36*sc-.05*sc,y+.09*sc,z+.08*sc);body.add(hi);
    const ch=new THREE.Mesh(new THREE.CircleGeometry(.16*sc,16),new THREE.MeshBasicMaterial({color:'#ff7eb6',transparent:true,opacity:.75}));ch.position.set(sx*.66*sc,y-.25*sc,z-.06*sc);ch.rotation.y=sx*.5;body.add(ch)}
  if(mouth==='o'){const mo=new THREE.Mesh(new THREE.SphereGeometry(.13*sc,10,8),eyeM);mo.scale.set(1,1.25,.4);mo.position.set(0,y-.32*sc,z-.01);body.add(mo)}
  else{const mo=new THREE.Mesh(new THREE.TorusGeometry(.11*sc,.03*sc,6,14,Math.PI),eyeM);mo.rotation.z=Math.PI;mo.position.set(0,y-.28*sc,z+.01);body.add(mo)}}
function mkMon(g,body,mats){const m={g,body,slime:true,state:'run',t:0,acts:{},mats,grow:0};m.mixer={update:dt=>animSlime(m,dt)};return m}
let WAFERT=null;const waferT=()=>WAFERT||(WAFERT=keepTex(canvasTex(128,128,(c,w,h)=>{c.fillStyle='#e9b874';c.fillRect(0,0,w,h);c.strokeStyle='#c98f4a';c.lineWidth=5;for(let i=-w;i<w*2;i+=22){c.beginPath();c.moveTo(i,0);c.lineTo(i+h,h);c.stroke();c.beginPath();c.moveTo(i+h,0);c.lineTo(i,h);c.stroke()}},[2,2])));
// 솜사탕 유령: 몽실몽실한 솜사탕으로 된 이불 유령 · 아래엔 솜사탕 막대
function ghostModel(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);monShadow(g,.8);
  const mat=new THREE.MeshLambertMaterial({color:C[0],emissive:new THREE.Color(C[1]),emissiveIntensity:.18,transparent:true,opacity:.88});
  const prof=[];for(let i=0;i<=10;i++){const a=i/10*Math.PI/2;prof.push(new THREE.Vector2(Math.sin(a)*1.15+.001,2.0+Math.cos(a)*1.05))}prof.push(new THREE.Vector2(1.2,1.4),new THREE.Vector2(1.32,.75),new THREE.Vector2(1.38,.5));
  const shell=new THREE.Mesh(new THREE.LatheGeometry(prof,28),mat);shell.material.side=THREE.DoubleSide;body.add(shell);
  // 물결 치맛자락
  for(let k=0;k<8;k++){const a=k/8*Math.PI*2,p=new THREE.Mesh(new THREE.SphereGeometry(.36,12,8),mat);p.scale.set(1,.8,1);p.position.set(Math.sin(a)*1.22,.5,Math.cos(a)*1.22);body.add(p)}
  // 솜사탕 뭉치
  const puffM=new THREE.MeshLambertMaterial({color:C[1],transparent:true,opacity:.8});
  [[0,3.05,0,.5],[.62,2.8,-.2,.42],[-.6,2.82,-.15,.44],[.2,2.75,-.6,.4],[-.3,2.6,-.75,.38],[.85,2.3,-.5,.36],[-.9,2.25,-.45,.36]].forEach(([x,y,z,r],i)=>{const p=new THREE.Mesh(new THREE.SphereGeometry(r,12,10),i%2?puffM:mat);p.position.set(x,y,z);body.add(p)});
  // 팔: '우와~' 하고 든 손
  for(const s of[-1,1]){const a=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),mat);a.scale.set(1.5,.75,.8);a.position.set(s*1.3,1.7,.2);a.rotation.z=s*-.6;body.add(a)}
  const stick=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,1.1,8),LM('#fff8ee'));stick.position.y=-.1;body.add(stick);
  monFace(body,2.1,1.12,1.1,'o');return mkMon(g,body,[mat])}
// 사탕 박쥐: 초콜릿 트러플 몸 · 웨이퍼 과자 날개
function batModel(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);monShadow(g,.7);
  const mat=new THREE.MeshPhongMaterial({color:C[0],shininess:70,specular:new THREE.Color('#ffffff'),transparent:true,opacity:1});
  const ball=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),mat);ball.position.y=1.5;body.add(ball);
  const sp=['#ff7eb6','#ffd84a','#7ee8c8','#ffffff','#7cc6ff'];for(let k=0;k<16;k++){const th=k*2.4,ph=.35+(k%5)*.18,d=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.2,6),LM(sp[k%5]));const p=new THREE.Vector3(Math.sin(ph)*Math.sin(th),Math.cos(ph),Math.sin(ph)*Math.cos(th));if(p.z>.45&&Math.abs(p.x)<.6&&p.y<.5)continue;d.position.copy(p.multiplyScalar(1.01)).add(new THREE.Vector3(0,1.5,0));d.rotation.set(k,k*1.7,k*.6);body.add(d)}
  for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.ConeGeometry(.28,.65,4),mat);e.position.set(s*.5,2.45,0);e.rotation.z=s*-.3;body.add(e)}
  // 날개 (어깨를 축으로 위아래로 펄럭)
  const sh=new THREE.Shape();sh.moveTo(0,.35);sh.quadraticCurveTo(1.2,1.05,2.4,.85);sh.lineTo(2.25,.1);sh.quadraticCurveTo(1.95,-.15,1.7,.0);sh.quadraticCurveTo(1.4,-.3,1.1,-.1);sh.quadraticCurveTo(.75,-.4,.4,-.25);sh.lineTo(0,-.3);sh.lineTo(0,.35);
  const wg=new THREE.ExtrudeGeometry(sh,{depth:.14,bevelEnabled:false});const uv=wg.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*.5,uv.getY(i)*.5);
  const wm=new THREE.MeshLambertMaterial({map:waferT()}),edge=LM(C[2]);
  const wgs=[];for(const s of[-1,1]){const piv=new THREE.Group();piv.position.set(s*.8,1.6,-.1);const w=new THREE.Mesh(wg,wm);w.position.z=-.07;w.scale.x=s;piv.add(w);
    for(const[x,y]of[[1.1,.55],[1.7,.6]]){const r=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1.0,6),edge);r.position.set(s*x,y-.15,.02);r.rotation.z=s*.35;piv.add(r)}
    const top=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,2.4,6),edge);top.rotation.z=s*(Math.PI/2-.25);top.position.set(s*1.2,.68,.02);piv.add(top);body.add(piv);wgs.push(piv)}
  // 눈 · 송곳니
  const wE=new THREE.MeshBasicMaterial({color:'#ffffff'}),pE=new THREE.MeshBasicMaterial({color:'#2a1640'});
  for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.22,12,10),wE);e.scale.set(1,1.2,.5);e.position.set(s*.33,1.75,.9);body.add(e);const p=new THREE.Mesh(new THREE.SphereGeometry(.11,10,8),pE);p.position.set(s*.31,1.72,1.0);body.add(p);
    const f=new THREE.Mesh(new THREE.ConeGeometry(.08,.22,6),wE);f.position.set(s*.16,1.2,.93);f.rotation.x=Math.PI;body.add(f)}
  const ch=new THREE.Mesh(new THREE.CircleGeometry(.14,14),new THREE.MeshBasicMaterial({color:'#ff7eb6',transparent:true,opacity:.7}));for(const s of[-1,1]){const c=ch.clone();c.position.set(s*.62,1.4,.8);c.rotation.y=s*.6;body.add(c)}
  const m=mkMon(g,body,[mat]);m.wing=wgs;return m}
// 젤리 곰: 말랑한 곰젤리 그대로
function bearModel(C){const g=new THREE.Group(),body=new THREE.Group();g.add(body);monShadow(g,1);
  const mat=new THREE.MeshPhongMaterial({color:C[0],emissive:new THREE.Color(C[1]),emissiveIntensity:.2,shininess:110,specular:new THREE.Color('#ffffff'),transparent:true,opacity:.9});
  const add=(geo,x,y,z,sx,sy,sz,mt)=>{const o=new THREE.Mesh(geo,mt||mat);o.position.set(x,y,z);o.scale.set(sx,sy,sz);body.add(o);return o};const S=new THREE.SphereGeometry(1,24,18);
  add(S,0,1.15,0,.95,1.1,.8);add(S,0,2.45,0,.85,.78,.74);
  for(const s of[-1,1]){add(S,s*.62,3.08,0,.3,.3,.22);add(S,s*.62,3.08,.12,.17,.17,.1,LM(C[2]));add(S,s*.88,1.55,.35,.3,.42,.3).rotation.z=s*.5;add(S,s*.5,.3,.25,.35,.3,.42)}
  add(S,0,2.25,.62,.32,.24,.2,new THREE.MeshPhongMaterial({color:C[2],shininess:60}));const nose=add(S,0,2.36,.8,.1,.07,.06,new THREE.MeshBasicMaterial({color:'#4a2a1a'}));
  add(S,0,1.1,.62,.48,.55,.2,new THREE.MeshPhongMaterial({color:C[2],transparent:true,opacity:.55}));
  const shine=add(new THREE.SphereGeometry(.2,10,8),-.42,2.78,.45,1,.5,.4,new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.7}));shine.rotation.z=.6;
  monFace(body,2.52,.66,.95,'smile');return mkMon(g,body,[mat])}
monModel=function(k,skin){const id=skin||wl(k),C=(MSKIN[k]&&MSKIN[k][id])||Object.values(MSKIN[k])[0];
  if(k==='ghost')return ghostModel(C);if(k==='bat'){const m=batModel(C);m.g.scale.setScalar(.7);return m}
  const m=bearModel(C);m.walk=true;m.g.scale.setScalar(1.5);return m};
monFly=function(e){if(e.fly)e.g.position.y=e.fly+Math.sin(G.t*3+e.id)*.25;const w=e.m.wing;if(w){const a=Math.sin(G.t*18+e.id)*.55;w[0].rotation.z=-a;w[1].rotation.z=a}};
// 상점 무대에서도 박쥐 날개가 펄럭이게
{const as0=animSlime;animSlime=function(m,dt){as0(m,dt);if(m.wing){const a=Math.sin(m.t*14)*.5;m.wing[0].rotation.z=-a;m.wing[1].rotation.z=a}
  // 젤리 곰은 통통 뛰지 않고 뒤뚱뒤뚱 걸어와요
  if(m.walk&&m.state!=='die'){const b=m.body,gr=m.grow*(2-m.grow);b.scale.set(gr,gr,gr);b.rotation.set(0,0,0);
    if(m.state==='run'){b.position.y=Math.abs(Math.sin(m.t*4))*.08;b.rotation.z=Math.sin(m.t*4)*.09}
    else if(m.state==='atk'){b.position.y=0;b.rotation.x=Math.sin(Math.min(1,m.t/.45)*Math.PI)*.45}
    else{b.position.y=0;b.scale.y=gr*(1+.02*Math.sin(m.t*3))}}}}
/* ----- 특별 옷: 할로윈 호박 · 크리스마스 ----- */
Object.assign(CLOTH_HSV,{halloween:[26,1,1.25],xmas:[356,1,1.02]});
function clothDeco(id,att){if(id==='halloween'){const b=new THREE.Group(),p=new THREE.Mesh(new THREE.SphereGeometry(.085,12,10),LM('#ff8a1e'));p.scale.set(1.15,.85,.7);b.add(p);for(let k=-1;k<=1;k++){const r=new THREE.Mesh(new THREE.TorusGeometry(.06,.008,4,10,Math.PI),LM('#e06a0a'));r.rotation.y=k*.6;b.add(r)}
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.012,.016,.05,6),LM('#4f9a3a'));st.position.y=.08;b.add(st);const fM=new THREE.MeshBasicMaterial({color:'#3a1f10'});for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.ConeGeometry(.018,.026,3),fM);e.position.set(s*.032,.015,.058);e.rotation.x=Math.PI/2;b.add(e)}
    const mo=new THREE.Mesh(new THREE.BoxGeometry(.06,.012,.01),fM);mo.position.set(0,-.025,.06);b.add(mo);const w=new THREE.Group();b.position.x=.1;w.add(b);att('chest',w,.1,.3);
    const pom=new THREE.Mesh(new THREE.SphereGeometry(.08,10,8),LM('#8a4dff'));att('head',pom,.74,-.3)}
  if(id==='xmas'){const pom=new THREE.Mesh(new THREE.SphereGeometry(.11,12,10),LM('#ffffff'));att('head',pom,.74,-.3);
    const b=new THREE.Group(),lf=LM('#2fa84f');for(const s of[-1,1]){const l=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),lf);l.scale.set(1.6,.6,.3);l.position.set(s*.06,.01,0);l.rotation.z=s*.35;b.add(l)}
    for(const[x,y]of[[-.015,-.02],[.02,-.025],[0,.012]]){const r=new THREE.Mesh(new THREE.SphereGeometry(.026,8,6),LM('#e8364f'));r.position.set(x,y,.02);b.add(r)}const w=new THREE.Group();b.position.x=.1;w.add(b);att('chest',w,.1,.3)}}
{const ii0=itemIcon;itemIcon=function(cat,id){const s=b=>'<svg viewBox="0 0 48 48" aria-hidden="true">'+b+'</svg>';
  if(cat==='cloth'&&(id==='halloween'||id==='xmas')){const c=id==='halloween'?'#ff8a1e':'#e8364f',hood=`<path d="M24 6 q-14 0-15 16 l-3 20 q18 6 36 0 l-3-20 q-1-16-15-16z" fill="${c}" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><ellipse cx="24" cy="26" rx="9" ry="8" fill="#ffd9c0" stroke="#4a2a1a" stroke-width="2.5"/>`;
    return s(hood+(id==='halloween'?'<circle cx="34" cy="8" r="4.5" fill="#8a4dff" stroke="#4a2a1a" stroke-width="2"/><ellipse cx="31" cy="39" rx="5.5" ry="4.5" fill="#ff8a1e" stroke="#4a2a1a" stroke-width="2"/><path d="M31 34.5 v-2" stroke="#4f9a3a" stroke-width="2"/><path d="M29 38.5 l1-1 1 1 M32 38.5 l1-1 1 1" stroke="#3a1f10" stroke-width="1.2" fill="none"/>':'<circle cx="34" cy="8" r="5" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><ellipse cx="28" cy="38" rx="4" ry="2" fill="#2fa84f"/><ellipse cx="35" cy="38" rx="4" ry="2" fill="#2fa84f"/><circle cx="31.5" cy="37" r="2.2" fill="#e8364f"/>'))}
  if(cat==='ghost'||cat==='bat'||cat==='bear')return s(monIcon2(cat,id));return ii0(cat,id)}}
function monIcon2(k,id){const C=MSKIN[k][id];
  if(k==='ghost')return `<line x1="24" y1="40" x2="24" y2="47" stroke="#c9b6a4" stroke-width="3" stroke-linecap="round"/><path d="M10 40 V22 a14 14 0 0 1 28 0 V40 q-3.5 3-7 0 q-3.5 3-7 0 q-3.5 3-7 0 q-3.5 3-7 0z" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.6" stroke-linejoin="round"/><circle cx="17" cy="11" r="5" fill="${C[1]}" stroke="#4a2a1a" stroke-width="2"/><circle cx="29" cy="9" r="5.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2"/><path d="M10 26 q-5-2-6-7 M38 26 q5-2 6-7" stroke="#4a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/><ellipse cx="19" cy="23" rx="2.4" ry="3" fill="#2a1640"/><ellipse cx="29" cy="23" rx="2.4" ry="3" fill="#2a1640"/><ellipse cx="24" cy="30" rx="2.4" ry="3" fill="#2a1640"/>`;
  if(k==='bat')return `<path d="M24 22 Q14 12 3 15 l1.5 8 q3-2 5 1 q3-2 5 1.5 q3-1.5 5 1.5z M24 22 Q34 12 45 15 l-1.5 8 q-3-2-5 1 q-3-2-5 1.5 q-3-1.5-5 1.5z" fill="#e9b874" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/><path d="M8 17 l8 6 M40 17 l-8 6" stroke="#c98f4a" stroke-width="1.6"/><path d="M17 15 l3-8 4 6 4-6 3 8" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/><circle cx="24" cy="25" r="10" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.6"/><circle cx="20.5" cy="23" r="2.6" fill="#fff"/><circle cx="27.5" cy="23" r="2.6" fill="#fff"/><circle cx="20.8" cy="23.4" r="1.3" fill="#2a1640"/><circle cx="27.3" cy="23.4" r="1.3" fill="#2a1640"/><path d="M22 29 l1 2.4 1-2.4 M24.5 29 l1 2.4 1-2.4" fill="#fff" stroke="#fff" stroke-width="1"/><path d="M16 30 l2 1 M31 20 l1.5 1.5 M18 19 l-1.5 1.5" stroke="#ffd84a" stroke-width="1.8" stroke-linecap="round"/>`;
  return `<circle cx="15" cy="9" r="4.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2"/><circle cx="33" cy="9" r="4.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2"/><ellipse cx="11" cy="28" rx="4" ry="5.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2" transform="rotate(30 11 28)"/><ellipse cx="37" cy="28" rx="4" ry="5.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2" transform="rotate(-30 37 28)"/><ellipse cx="17" cy="43" rx="5" ry="3.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2"/><ellipse cx="31" cy="43" rx="5" ry="3.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2"/><ellipse cx="24" cy="32" rx="11" ry="12" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2"/><ellipse cx="24" cy="15" rx="11" ry="9.5" fill="${C[0]}" stroke="#4a2a1a" stroke-width="2.2"/><ellipse cx="24" cy="18.5" rx="4.2" ry="3" fill="${C[2]}"/><circle cx="24" cy="17.5" r="1.3" fill="#4a2a1a"/><circle cx="19.5" cy="13.5" r="1.8" fill="#2a1640"/><circle cx="28.5" cy="13.5" r="1.8" fill="#2a1640"/><ellipse cx="18" cy="27" rx="2.5" ry="1.3" fill="#fff" opacity=".6"/>`}
/* ----- 사탕 나침반: 출구로 가는 다음 4칸이 5초 동안 바닥에서 반짝여요 (젤리 점프 대신) ----- */
let STARG=null;const starGeo=()=>{if(STARG)return STARG;const s=new THREE.Shape();for(let i=0;i<10;i++){const r=i%2?.38:.9,a=i/10*Math.PI*2+Math.PI/2;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y)}s.closePath();return STARG=new THREE.ShapeGeometry(s)};
function compassPath(n){const h=G.hero,f=exitField();let[cx,cz]=cellOf(h.x,h.z);const out=[];
  for(let i=0;i<n;i++){const cur=f[idx(cx,cz)];if(!(cur>0))break;let nx=null;for(const[dx,dz]of DIRS){const a=cx+dx,b=cz+dz;if(a<0||b<0||a>=N||b>=N||!canStep(cx,cz,dx,dz))continue;const v=f[idx(a,b)];if(v>=0&&v<cur){nx=[a,b];break}}if(!nx)break;cx=nx[0];cz=nx[1];out.push(nx)}return out}
function compassFx(){const cells=compassPath(4),objs=[];cells.forEach(([a,b],i)=>{const g=new THREE.Group();g.position.set(cx2x(a),0,cx2x(b));
    const st=new THREE.Mesh(starGeo(),new THREE.MeshBasicMaterial({color:['#ffe066','#ffd35f','#ffc23a','#ffb020'][i],transparent:true,opacity:.95,depthWrite:false,fog:false}));st.rotation.x=-Math.PI/2;st.position.y=.12+i*.01;st.scale.setScalar(2.3);g.add(st);
    const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.5,0),new THREE.MeshBasicMaterial({color:'#fff6b0',fog:false}));gem.position.y=1.5;g.add(gem);scene.add(g);objs.push(g);
    const t0=performance.now();const spin=()=>{if(!g.parent)return;const t=(performance.now()-t0)/1000;gem.rotation.y=t*3;gem.position.y=1.5+Math.sin(t*4+i)*.15;st.rotation.z=t*.8;requestAnimationFrame(spin)};spin()});
  setTimeout(()=>objs.forEach(o=>drop(o)),5000);return cells.length}
function doCompass(ai){if(!skReady('compass',ai))return;if(G.rguest&&!ai){remoteSkill('compass');compassFx();return}skPay('compass');SFX.magic();if(G.hero.isAI||G.hero.isRival)return;const n=compassFx();if(meLoud())say(n?'🧭 사탕 나침반! 반짝이는 별을 따라가요':'🧭 출구가 바로 앞이에요!',false,1.4)}
/* ----- 마녀 대 마녀: 누가 누군지 · 내가 벽을 밀 수 있는 곳 ----- */
function nameTag(text,bg){const W=256,H=96;const t=canvasTex(W,H,(c)=>{c.clearRect(0,0,W,H);c.fillStyle=bg;c.strokeStyle='#4a2a1a';c.lineWidth=8;const r=36;c.beginPath();c.moveTo(r+6,6);c.arcTo(W-6,6,W-6,H-6,r);c.arcTo(W-6,H-6,6,H-6,r);c.arcTo(6,H-6,6,6,r);c.arcTo(6,6,W-6,6,r);c.closePath();c.fill();c.stroke();c.fillStyle='#fff';c.font='bold 46px Jua, sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineWidth=7;c.strokeText(text,W/2,H/2+3);c.fillText(text,W/2,H/2+3)});
  t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false,transparent:true}));s.renderOrder=20;s.scale.set(13,4.9,1);s.position.y=7;return s}
function wwDecor(){G.wwDeco=G.wwDeco||[];if(G.duo!=='ww')return;
  const mine=G.rv&&G.rv.hero,theirs=G.ph;if(mine&&mine.m)mine.m.g.add(nameTag('내 쿠키','#2fbf93'));if(theirs&&theirs.m)theirs.m.g.add(nameTag('상대 쿠키','#ff5f9e'));
  // 내가 벽을 밀 수 있는 절반: 노란 빗금 판
  const top=CURW===0,half=N*C/2;const tex=canvasTex(64,64,(c,w,h)=>{c.fillStyle='rgba(255,211,95,.45)';c.fillRect(0,0,w,h);c.strokeStyle='rgba(255,180,40,.55)';c.lineWidth=6;for(let i=-64;i<128;i+=22){c.beginPath();c.moveTo(i,0);c.lineTo(i+64,64);c.stroke()}},[N,N/2]);
  const pl=new THREE.Mesh(new THREE.PlaneGeometry(N*C,half),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,fog:false}));pl.rotation.x=-Math.PI/2;pl.position.set(N*C/2,.09,top?half/2:half+half/2);scene.add(pl);G.wwDeco.push(pl);
  const line=new THREE.Mesh(new THREE.PlaneGeometry(N*C+4,.7),new THREE.MeshBasicMaterial({color:'#ffb020',fog:false,depthWrite:false}));line.rotation.x=-Math.PI/2;line.position.set(N*C/2,.12,half);scene.add(line);G.wwDeco.push(line);
  $('dhint').textContent='상대 쿠키를 막아요 · 노란 빗금 쪽 벽만 밀 수 있어요'}
{const sw0=startWW;startWW=function(o){sw0(o);wwDecor()}}
// 도둑 대 도둑: 지도는 내 쪽이 아래로 오게 (위에서 출발하면 지도를 뒤집어요)
function mapFlip(){const f=G.duo==='race'&&G.mySide===1;for(const id of['map','map2'])$(id).classList.toggle('flip',f);return f}
{const sr0=startRace;startRace=function(o){sr0(o);mapFlip()}}
{const rd0=resetDuo;resetDuo=function(){rd0();try{mapFlip()}catch(e){}}}
/* ----- 시작 전에 도둑 스킬 2개 고르기 (게임 설정 화면) ----- */
const SKCOL={decoy:['#8ff0d2','#2fbf93'],cloak:['#cdb6ff','#8a63e8'],sprint:['#ffc28a','#ff7a2e'],compass:['#bfe6ff','#4a9be8'],smoke:['#eeeaff','#a99ce0'],gum:['#ffd0e4','#ff7eb6'],clean:['#b8ffe6','#2fbf93'],jump:['#ffe08a','#f2a93b']};
// 도둑 대 도둑 전용 스킬 (이 판에 쓸모 있는 것만)
const RACE_SKP=['sprint','compass','gum'],RACE_DESC={sprint:'5초 동안 40% 빨라져요',compass:'출구로 가는 다음 4칸이 반짝여요',gum:'뒤에 껌을 뿌려 상대 쿠키·몬스터를 느리게'};
const cleanRace=v=>{const ok=Array.isArray(v)?[...new Set(v.filter(k=>RACE_SKP.includes(k)))]:[];return ok.length===2?ok:['sprint','compass']};
SAVE.raceSkills=cleanRace(SAVE.raceSkills);
function skillPickOn(){return SET.net?SET.gmode==='race':SET.mode==='race'}
function renderSkillPick(){const el=$('optSkill');if(!el)return;const on=skillPickOn();el.hidden=!on||!SET.net;const S=SAVE.raceSkills;
  $('chSkill').innerHTML=$('chSkill2').innerHTML=RACE_SKP.map(k=>{const i=S.indexOf(k);const t=dkTile(k,false,'race').replace('class="dk ','class="dk '+(i>=0?'pk ':''));return`<div class="rc-sk${i>=0?' on':''}" data-k="${k}">${t}${i>=0?`<i class="spn">${i+1}</i>`:''}<em class="sd">${RACE_DESC[k]||''}</em></div>`}).join('');
  $('skillHint').textContent=$('skillHint2').textContent=S.map(k=>SKN[k][0]).join(' · ')+' + 대시'}
function skillPickTap(k){const S=SAVE.raceSkills;if(S.includes(k)){SFX.deny();return}S.shift();S.push(k);SAVE.raceSkills=cleanRace(S);saveGame();SFX.card();renderSkillPick()}
{const sc0=syncChips;syncChips=function(){sc0();try{renderSkillPick()}catch(e){}}}
for(const id of['chSkill','chSkill2'])$(id).addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b)skillPickTap(b.dataset.k)});
// 혼자 하기: 설정을 고른 다음 창에서 스킬을 골라요
let SKGO=null;function openSkillPick(go){SKGO=go;renderSkillPick();show('skillS')}
$('bSkBack').onclick=()=>show('setup');$('bSkGo').onclick=()=>{const g=SKGO;SKGO=null;if(g)g()};

// 혼자 하기 도둑 대 도둑: 설정 화면 버튼은 '스킬 고르기'
{const os0=openSetup;openSetup=function(back,showTime,go,online){os0(back,showTime,go,online);if(!online&&skillPickOn())$('bSetupGo').querySelector('b').textContent='스킬 고르기 ▶'}}
// 마녀 대 마녀: 쿠키들은 스킬을 쓰지 않아요 (대시만)
{const sw1=startWW;startWW=function(o){sw1(o);G.heroSkills=[];if(G.rv)G.rv.heroSkills=[]}}
// 도둑 대 도둑 껌: 상대 쿠키가 밟으면 느려져요
function gumFoe(e,h){if(e.type!=='gum'||G.duo!=='race')return false;if(e.own!=null)return e.own!==h.side;if(G.rguest)return!(G.myGums||[]).some(g=>Math.hypot(g.x-e.x,g.z-e.z)<1.6);return false}
{const au0=aiSkillUse;aiSkillUse=function(near,seen,aimed){au0(near,seen,aimed);const h=G.hero,HS=G.heroSkills||[];if(G.duo==='race'&&HS.includes('gum')&&G.ph&&G.ph!==h){const o=G.ph,d=Math.hypot(o.x-h.x,o.z-h.z);if(d<8&&d>2)doGum(true)}}}
/* ----- 처음 불러오는 화면 꾸미기 ----- */
{const d=document.querySelector('#title .duo'),ld=$('ldDuo');if(d&&ld)ld.innerHTML=d.innerHTML.replace(/id="tf"/g,'id="tf2"').replace(/url\(#tf\)/g,'url(#tf2)');
  const sp=$('ldSprk');if(sp){const C=['#ff7eb6','#7cc6ff','#ffd35f','#7ee8c8','#b98cff','#ff9d5c'];let h='';for(let i=0;i<34;i++){const x=(i*37)%100,y=(i*53+11)%100,r=(i*29)%180,c=C[i%6],dl=(i%7)*.4;h+=`<i style="left:${x}%;top:${y}%;background:${c};transform:rotate(${r}deg);animation-delay:${dl}s"></i>`}
    for(let i=0;i<7;i++){const x=6+i*14,c=C[i%6];h+=`<b style="left:${x}%;animation-delay:${i*.35}s;--c:${c}"></b>`}sp.innerHTML=h}
  const TIPS=['도둑은 사탕이 6초마다 1개씩 차요','버닝 타임(마지막 45초)엔 마녀가 벽을 못 밀어요','몬스터는 한 번 닿으면 사라져요','작은 지도에 ✕를 쳐서 막힌 길을 기억해요','솜사탕 유령엔 분신·망토가 안 통해요','사탕 나침반은 출구로 가는 다음 4칸을 보여 줘요','마녀는 꼭 지나야 하는 길목엔 덫을 못 놔요','꾸미기에서 캐릭터를 ◀ ▶로 바꿀 수 있어요'];
  let ti=Math.floor(Math.random()*TIPS.length);const tip=()=>{const e=$('ldTip');if(!e||$('loading').hidden){clearInterval(tip.h);return}e.textContent='💡 '+TIPS[ti++%TIPS.length]};tip();tip.h=setInterval(tip,2600)}
/* ================= 친구 방: 판 사이에 처음 화면·상점·덱을 쓸 수 있어요 ================= */
const inRoom=()=>!!(NET.on&&NET.room&&!NET.rand);
NET.games=0;NET.peerReady=false;NET.roomWait=false;
function syncRoomBar(){const on=inRoom()&&!['play','design','loading'].includes(screen);document.body.classList.toggle('inroom',on);$('roomBar').hidden=!on;
  if(on)$('roomTxt').textContent='👫 친구와 같은 방'+(NET.host?(NET.peerReady||!NET.games?' · 친구 준비 완료 ✓':' · 친구가 준비하면 시작해요'):(NET.roomWait?' · 준비 완료 ✓':' · 방장이 다음 판을 정해요'));
  const b=$('bOnline');if(b){const t=b.querySelector('b'),s=b.querySelector('small');if(inRoom()){t.textContent='방으로 돌아가기';s.textContent=NET.host?'다음 판 정하기':'준비 완료 누르기'}else{t.textContent='친구랑 하기';s.textContent='코드로 방 만들기'}}}
{const sh0=show;show=function(id){sh0(id);try{syncRoomBar()}catch(e){}}}
function roomReady(){NET.roomWait=true;netSend({t:'rdy',on:1,look:SAVE.eq,deck:SAVE.deck,skills:SAVE.skills,rskills:SAVE.raceSkills,coins:SAVE.coins});lobby('준비 완료!','방장이 다음 판을 시작하면 바로 시작해요. 그동안 처음 화면으로 가도 방은 그대로예요.','처음으로')}
function roomHostSetup(){netSend({t:'setting'});openSetup('result',true,()=>hostNext(),'friend')}
function roomLeave(){netLeave();NET.roomWait=false;NET.peerReady=false;NET.games=0;if(['lobby','setup','result','skillS'].includes(screen))titleScreen();else syncRoomBar();tMsg('친구 방에서 나왔어요')}
{const nm0=netMsg;netMsg=function(d){if(d&&d.t==='rdy'){NET.peerReady=!!d.on;if(d.look)NET.peerLook=cleanLook(d.look);if(d.deck)NET.peerDeck=d.deck;if(d.skills){NET.peerSkills=d.skills}if(d.rskills){NET.peerRaceSkills=d.rskills}if(d.coins!=null)NET.peerCoins=+d.coins;
    if(screen==='setup')syncChips();syncRoomBar();return}nm0(d)}}
{const pl0=netPeerLeft;netPeerLeft=function(){if(NET.on&&inRoom()&&!['play','design'].includes(screen)&&G.over&&!(screen==='lobby'&&!NET.roomWait&&!NET.games)){netLeave();NET.roomWait=false;NET.peerReady=false;NET.games=0;if(['lobby','setup','result','skillS'].includes(screen))titleScreen();syncRoomBar();tMsg('친구가 방에서 나갔어요');return}pl0()}}
{const ns0=netStart;netStart=function(d){NET.games=(NET.games|0)+1;NET.peerReady=false;NET.roomWait=false;
  const r=d&&d.round||1;if(NET.rand&&!d.duo){if(r===1||!NET.series)NET.series={r:1,res:[]};else NET.series.r=2}else NET.series=null;
  if(r===2&&NET.series){const k=NET.stake;delete d.stake;ns0(d);NET.stake=k}else ns0(d)}}
{const hn0=hostNext;hostNext=function(hr){if(inRoom()&&NET.games>0&&!NET.peerReady){SFX.deny();return}hn0(hr)}}
{const sc1=syncChips;syncChips=function(){sc1();try{if(SET.net==='friend'&&SET.back==='result'){const ok=NET.peerReady||!NET.games;$('bSetupGo').disabled=!ok;$('bSetupGo').querySelector('b').textContent=ok?'다음 판 시작!':'친구 준비를 기다려요…'}else $('bSetupGo').disabled=false}catch(e){}}}
{const ts0=titleScreen;titleScreen=function(){ts0();syncRoomBar()}}
// 방에 있는 동안엔 혼자 하기·스테이지·아무나와 하기를 막고, 친구랑 하기는 '방으로 돌아가기'
document.addEventListener('click',e=>{if(!inRoom())return;const b=e.target.closest('#bAI,#bStage,#bRandT,#bOnline');if(!b)return;e.stopImmediatePropagation();e.preventDefault();
  if(b.id==='bOnline'){if(NET.host)roomHostSetup();else roomReady();return}tMsg('친구 방에 있는 동안엔 할 수 없어요 · 위쪽 \'나가기\'를 누르면 돼요');SFX.deny()},true);
$('bRoomX').onclick=()=>roomLeave();
/* ================= 아무나와 하기(메인): 도둑·마녀를 한 번씩, 두 판 합계로 ================= */
function thiefLeft(){const h=G.hero,ef=exitField(),x=h.tx!==undefined&&G.mirror?h.tx:h.x,z=h.tz!==undefined&&G.mirror?h.tz:h.z,[cx,cz]=cellOf(x,z);return Math.max(0,ef[idx(cx,cz)]|0)}
{const ec0=earnCoins;earnCoins=function(iWon){if(NET.on&&NET.series)return{n:0,t:'series'};return ec0(iWon)}}
{const ct0=coinText;coinText=function(e){if(e&&e.t==='series')return'';return ct0(e)}}
{const em0=endMatch;endMatch=function(win,why){if(G.over)return;const S=NET.on&&NET.series;let rec=null;$('bAgain').hidden=false;
  if(S){const left=win?0:(G.mirror&&G.endLeft!=null?G.endLeft:thiefLeft());rec={thiefMe:G.mode==='hero',esc:!!win,t:+G.t.toFixed(2),left}}G.endLeft=null;
  em0(win,why);if(!S)return;S.res[S.r-1]=rec;const r1=S.r;
  if(r1===1){setTimeout(()=>{if(!NET.series||NET.series.r!==1)return;$('resCoin').innerHTML='🔁 1판 끝! 곧 역할을 바꿔 2판을 시작해요 · 등급과 판돈은 두 판 합계로 정해요';$('bAgain').hidden=true},2700);
    if(NET.host)setTimeout(()=>{if(NET.on&&NET.series&&NET.series.r===1){NET.nextRound=2;try{hostNext(NET.role==='devil'?'hero':'devil')}finally{NET.nextRound=1}}},9000);return}
  // 두 판 합계
  const iW=q=>q?(q.thiefMe?q.esc:!q.esc):false,a=S.res[0],b=S.res[1];let me=(iW(a)?1:0)+(iW(b)?1:0),op=2-me,res,why2='';
  if(me>op)res='win';else if(me<op)res='lose';else{const mine=[a,b].find(q=>q&&q.thiefMe),his=[a,b].find(q=>q&&!q.thiefMe);
    if(mine&&his){if(mine.esc&&his.esc){res=mine.t<his.t?'win':mine.t>his.t?'lose':'draw';why2=`둘 다 탈출 · 내가 ${mine.t.toFixed(1)}초, 상대가 ${his.t.toFixed(1)}초`}
      else{res=mine.left<his.left?'win':mine.left>his.left?'lose':'draw';why2=`둘 다 막힘 · 출구까지 나 ${mine.left}칸, 상대 ${his.left}칸`}}else res='draw'}
  S.done=true;let coin='';const st=NET.stake|0;
  if(NET.staked){NET.staked=false;if(res==='win'){SAVE.coins+=st*2;coin=COIN_SVG+'상금 +'+st*2+' 코인'}else if(res==='draw'){SAVE.coins+=st;coin=COIN_SVG+'무승부라 판돈을 돌려받았어요'}else coin=COIN_SVG+'판돈 '+st+'코인을 잃었어요';saveGame();syncCoins();netSend({t:'coins',n:SAVE.coins})}
  const rk=res==='draw'?null:rankUpdate(res==='win');
  setTimeout(()=>{$('resKick').textContent=res==='win'?'최종 승리!':res==='lose'?'최종 패배':'무승부';$('resKick').className='res-rib'+(res==='lose'?' lose':'');
    $('resCoin').innerHTML=`<b>두 판 합계 나 ${me} : ${op} 상대</b>${why2?` · ${why2}`:''}<br>${coin}`+(rk?`<span class="rs-rank">${tierIcon(tierOf(rk.s))}${rk.d>0?'등급 별 +1':rk.d<0?'등급 별 -1':'등급 그대로'} · ${rankTxt(rk.s)}${rk.up?` · 올랐어요! ${COIN_SVG}+${rk.rew}`:''}</span>`:'')},2700)}}
/* ----- 아무나와 하기 메인: 역할을 고르지 않아요 (도둑·마녀 한 번씩, 첫 판은 무작위) ----- */
{const b=document.createElement('button');b.className='rcard rank-go';b.id='bRankGo';b.hidden=true;
  const sv=id=>$(id).querySelector('svg').outerHTML.replace(/id="(tf|wf)"/g,'id="$1R"').replace(/url\(#(tf|wf)\)/g,'url(#$1R)');
  b.innerHTML=`<span class="rk-duo">${sv('bHero')}${sv('bDevil')}</span><b>랭크 대결</b><small>도둑·마녀 한 번씩 · 두 판 합계</small>`;$('bDevil').after(b);
  b.onclick=async()=>{await initAudio();SET.mode='hero';SET.gmode='classic';SET.role='rand';NET.peerCoins=null;openSetup('role',true,()=>randomMatch(),'rand')}}
{const sr1=showRole;showRole=function(tab){sr1(tab);const rk=ROLECTX==='rand'&&ROLETAB==='main';$('bRankGo').hidden=!rk;if(rk){$('bHero').hidden=$('bDevil').hidden=true;$('roleNote').textContent='역할은 고르지 않아요 · 첫 판은 무작위, 다음 판은 바꿔서 · 두 판 합계로 등급 별 +1 / -1'}}}
