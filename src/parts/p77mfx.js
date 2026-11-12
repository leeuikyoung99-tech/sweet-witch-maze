// ===== 77차: 미니게임 '거대 마녀' 다듬기 =====
// 1) 스킬 효과: 부드러운 빛 알갱이·솜사탕 구름·포털·오라(상태가 이어지는 동안 계속 나오는 효과)
// 2) 3인칭 (일시정지 옆 버튼으로 1인칭/3인칭, SAVE.mgView 에 기억)
// 3) 투명: 장식까지 통째로 투명. 상대 화면에선 아예 안 보이고, 내 3인칭에선 반투명
// 4) 스킬 버튼: 스킬마다 고유 색 + 크림색 안쪽 판 + 남은 초
// 5) 스킬 끌어서 조준: 끌면 바닥에 조준 표시, 놓으면 그곳에. 버튼 위로 되돌리면 취소. 짧게 누르면 예전처럼
// ---------- 그림 재료(캔버스 텍스처) ----------
const MGFX={tex:{},max:420,em:{}};
function mgTex(k){if(MGFX.tex[k])return MGFX.tex[k];let t;
  const rg=(g,x,y,r,a)=>{const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(255,255,255,${a})`);q.addColorStop(.45,`rgba(255,255,255,${a*.7})`);q.addColorStop(1,'rgba(255,255,255,0)');return q};
  if(k==='glow')t=canvasTex(64,64,g=>{g.fillStyle=rg(g,32,32,32,1);g.fillRect(0,0,64,64)});
  else if(k==='puff')t=canvasTex(128,128,g=>{for(const[x,y,r]of[[64,72,38],[40,66,28],[88,64,30],[60,46,28],[80,84,24],[46,86,22]]){const q=g.createRadialGradient(x,y,r*.15,x,y,r);q.addColorStop(0,'rgba(255,255,255,1)');q.addColorStop(.72,'rgba(255,255,255,.96)');q.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=q;g.beginPath();g.arc(x,y,r,0,7);g.fill()}});
  else if(k==='star')t=canvasTex(64,64,g=>{g.fillStyle=rg(g,32,32,20,.8);g.fillRect(0,0,64,64);g.fillStyle='#fff';g.beginPath();g.moveTo(32,2);g.quadraticCurveTo(35,29,62,32);g.quadraticCurveTo(35,35,32,62);g.quadraticCurveTo(29,35,2,32);g.quadraticCurveTo(29,29,32,2);g.fill()});
  else if(k==='heart')t=canvasTex(64,64,g=>{g.fillStyle='#fff';g.beginPath();g.moveTo(32,56);g.bezierCurveTo(4,38,4,10,22,10);g.bezierCurveTo(28,10,32,16,32,20);g.bezierCurveTo(32,16,36,10,42,10);g.bezierCurveTo(60,10,60,38,32,56);g.fill()});
  else if(k==='bat')t=canvasTex(96,48,g=>{g.fillStyle='#fff';g.beginPath();g.moveTo(48,14);g.quadraticCurveTo(30,0,4,8);g.quadraticCurveTo(14,16,10,26);g.quadraticCurveTo(20,22,24,32);g.quadraticCurveTo(32,24,40,34);g.lineTo(48,40);g.lineTo(56,34);g.quadraticCurveTo(64,24,72,32);g.quadraticCurveTo(76,22,86,26);g.quadraticCurveTo(82,16,92,8);g.quadraticCurveTo(66,0,48,14);g.fill();
    g.fillStyle='#ff5f9e';g.beginPath();g.arc(43,22,2.6,0,7);g.arc(53,22,2.6,0,7);g.fill()});
  else if(k==='web')t=canvasTex(128,128,g=>{g.strokeStyle='#fff';g.lineWidth=5;g.lineCap='round';g.translate(64,64);for(let i=0;i<8;i++){g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(i*Math.PI/4)*60,Math.sin(i*Math.PI/4)*60);g.stroke()}
    g.lineWidth=4;for(const r of[18,34,52]){g.beginPath();for(let i=0;i<=8;i++){const a=i*Math.PI/4;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.stroke()}});
  else if(k==='swirl')t=canvasTex(128,128,g=>{g.translate(64,64);g.lineCap='round';for(let i=0;i<3;i++){g.rotate(Math.PI*2/3);g.strokeStyle='#fff';g.lineWidth=9-i*2;g.beginPath();for(let a=0;a<4.4;a+=.1)g.lineTo(Math.cos(a)*(10+a*11),Math.sin(a)*(10+a*11));g.stroke()}});
  t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;MGFX.tex[k]=t;return t}
// ---------- 알갱이 하나 ----------
// o: {life,vx,vy,vz,grav,drag,s0,s1,op,add,spin,follow(ent),flap,blend}
function mgP(tex,col,x,y,z,o){if(!MG.g||MG.parts.length>=MGFX.max)return null;o=o||{};
  const mat=new THREE.SpriteMaterial({map:mgTex(tex),color:col,transparent:true,depthWrite:false,fog:false,blending:o.add?THREE.AdditiveBlending:THREE.NormalBlending});if(o.rot!==false)mat.rotation=Math.random()*6.28;
  const m=new THREE.Sprite(mat);m.renderOrder=3;const p=Object.assign({m,fx:1,t:0,life:1,vx:0,vy:0,vz:0,grav:0,drag:0,s0:1,s1:1,op:1,spin:0,lx:x,ly:y,lz:z},o);
  if(p.follow){p.lx=x-p.follow.x;p.lz=z-p.follow.z}m.scale.setScalar(p.s0);MG.g.add(m);MG.parts.push(p);mgFxStep(p,0);return p}
function mgFxStep(p,dt){const k=Math.min(1,p.t/p.life);
  if(p.path){const q=p.path,e=p.ease?1-(1-k)*(1-k):k;p.lx=q[0]+(q[3]-q[0])*e;p.ly=q[1]+(q[4]-q[1])*e+(q[6]||0)*Math.sin(k*Math.PI);p.lz=q[2]+(q[5]-q[2])*e}
  else{if(p.drag){const d=Math.max(0,1-p.drag*dt);p.vx*=d;p.vy*=d;p.vz*=d}p.vy-=p.grav*dt;p.lx+=p.vx*dt;p.ly+=p.vy*dt;p.lz+=p.vz*dt;if(p.ly<.08){p.ly=.08;p.vy=Math.abs(p.vy)*.3}}
  const f=p.follow;p.m.position.set(p.lx+(f?f.x:0),p.ly+(f&&f.hy?f.hy:0),p.lz+(f?f.z:0));
  const s=p.s0+(p.s1-p.s0)*(1-(1-k)*(1-k));if(p.flap){p.m.scale.set(s,s*(.55+.45*Math.abs(Math.sin(p.t*p.flap))),1)}else p.m.scale.set(s,s,1);
  p.m.material.opacity=p.op*Math.min(1,k/(p.fin||.08))*(1-Math.pow(k,p.pow||2.2));if(p.spin)p.m.material.rotation+=p.spin*dt}
// ---------- 묶음 효과 ----------
const mgR=(a,b)=>a+Math.random()*(b-a);
function mgSpark(x,y,z,cols,n,o){o=o||{};for(let i=0;i<n;i++){const a=Math.random()*6.28,e=mgR(-.2,1),sp=(o.spd||6)*mgR(.4,1);
  mgP(o.tex||(i%3?'star':'glow'),cols[i%cols.length],x+mgR(-.3,.3)*(o.r||1),y+mgR(-.3,.3)*(o.r||1),z+mgR(-.3,.3)*(o.r||1),{vx:Math.cos(a)*sp*Math.cos(e),vz:Math.sin(a)*sp*Math.cos(e),vy:sp*Math.sin(e)+(o.up||0),grav:o.grav??6,drag:o.drag??1.5,life:mgR(.5,1)*(o.life||.9),s0:(o.size||.7)*mgR(.7,1.3),s1:(o.size||.7)*(o.shrink??.3),op:1,add:o.add,follow:o.follow,spin:mgR(-4,4)})}}
function mgPuffs(x,y,z,cols,n,o){o=o||{};if(!o.keep)return; // 흰 구름 덩어리는 연막·지도 가리기에만 (다른 곳에선 이상해 보여서 뺐어요)
  for(let i=0;i<n;i++){const a=Math.random()*6.28,r=mgR(0,o.r||1.5),sp=o.spd??1.5;
  mgP('puff',cols[i%cols.length],x+Math.cos(a)*r,y+mgR(-.3,.6)*(o.h||1),z+Math.sin(a)*r,{vx:Math.cos(a)*sp*mgR(.5,1.2),vz:Math.sin(a)*sp*mgR(.5,1.2),vy:o.rise??.8,drag:1.2,life:mgR(.75,1.2)*(o.life||1.1),s0:(o.size||2)*.6,s1:(o.size||2)*mgR(1,1.4),op:o.op||.95,fin:.15,pow:1.6,follow:o.follow,spin:mgR(-.6,.6)})}}
function mgGlowAt(x,y,z,col,size,life,o){return mgP('glow',col,x,y,z,Object.assign({life:life||.35,s0:size*.4,s1:size,op:1,add:true,fin:.05,pow:1.4},o||{}))}
function mgHearts(x,z,n){for(let i=0;i<n;i++)mgP('heart',i%2?'#ff5f8f':'#ff9ec7',x+mgR(-.8,.8),mgR(.6,1.6),z+mgR(-.8,.8),{vy:mgR(2,3.5),vx:mgR(-.6,.6),vz:mgR(-.6,.6),life:mgR(1,1.4),s0:.5,s1:.9,rot:false,fin:.1,pow:3})}
// 빛기둥 (원통이 위로 늘어나며 사라져요)
function mgBeam(x,z,col,r,h,life){if(!MG.g)return;const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,1,24,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.55,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,fog:false}));
  m.position.set(x,h/2,z);m.scale.set(1,h,1);MG.g.add(m);MG.parts.push({m,beam:1,h,life:life||.6,t:0,r})}
// 포털 (서 있는 고리가 돌며 빛을 빨아들여요)
function mgPortal(x,z,col,life){if(!MG.g)return;const g=new THREE.Group();g.position.set(x,0,z);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.3,.16,8,36),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:1,fog:false}));ring.position.y=1.3;g.add(ring);
  const disc=new THREE.Mesh(new THREE.CircleGeometry(1.25,32),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.75,side:THREE.DoubleSide,depthWrite:false,fog:false}));disc.position.y=1.3;g.add(disc);
  const pad=new THREE.Mesh(new THREE.RingGeometry(.9,1.6,32),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.8,side:THREE.DoubleSide,depthWrite:false}));pad.rotation.x=-Math.PI/2;pad.position.y=.13;g.add(pad);
  MG.g.add(g);MG.parts.push({m:g,portal:1,life:life||.7,t:0});
  for(let i=0;i<14;i++){const a=i/14*6.28;mgP('star',i%2?col:'#ffffff',x+Math.cos(a)*2.4,1.3+Math.sin(a)*1.6,z+Math.sin(a)*.6,{path:[x+Math.cos(a)*2.4,1.3+Math.sin(a)*1.6,z+Math.sin(a)*.6,x,1.3,z],life:.45,s0:.55,s1:.2,ease:1,fin:.1})}}
// ---------- 지난 판 조각 움직임(빛기둥·포털 포함) ----------
{const pt=mgPartTick;mgPartTick=function(dt){for(const p of MG.parts){if(p.fx){p.t+=dt;mgFxStep(p,dt);continue}
    if(p.beam){p.t+=dt;const k=Math.min(1,p.t/p.life);p.m.scale.set(1-k*.6,p.h*(.4+.6*k),1-k*.6);p.m.position.y=p.h*(.4+.6*k)/2;p.m.material.opacity=.55*(1-k);continue}
    if(p.portal){p.t+=dt;const k=Math.min(1,p.t/p.life);const sc=Math.max(.01,k<.2?k/.2:k>.8?(1-k)/.2:1);p.m.scale.set(sc,sc,sc);p.m.children[0].rotation.z+=dt*8;p.m.children[0].rotation.y=performance.now()/400;p.m.children[1].rotation.y=performance.now()/400;continue}}
  const fx=MG.parts.filter(p=>p.fx||p.beam||p.portal);MG.parts=MG.parts.filter(p=>!(p.fx||p.beam||p.portal));pt(dt);
  for(const p of fx){if(p.t>=p.life){if(p.fx){MG.g&&MG.g.remove(p.m);p.m.material.dispose()}else mgDrop(p.m)}else MG.parts.push(p)}}}

// ---------- 상태가 이어지는 동안 나오는 효과 ----------
function mgEmit(k,rate,dt,fn){const e=MGFX.em;e[k]=(e[k]||0)+rate*dt;while(e[k]>=1){e[k]--;fn()}}
function mgAuraTick(dt){if(!MG.on||!MG.g||MG.pause)return;const th=MG.th,mo=MG.mo,me=MG.role==='thief',k3=MG.view===3;const tv=!me||k3,wv=me||k3; // 각 모습이 화면에 보이는지
  const H=MGP.moH/9.2,head=6.4*H;
  // 도둑
  if(th.sprintT>0&&th.moving&&!(th.cloakT>0&&!me))mgEmit('spr',36,dt,()=>mgP(Math.random()<.5?'star':'glow',Math.random()<.6?'#ffd23a':'#ffffff',th.x-th.dx*.4+mgR(-.3,.3),mgR(.2,1.2),th.z-th.dz*.4+mgR(-.3,.3),{life:.45,s0:.55,s1:.1,vy:.8,grav:0}));
  if(th.slowT>0)mgEmit('slw',10,dt,()=>mgP('star',Math.random()<.5?'#bfeaff':'#ffffff',th.x+mgR(-.5,.5),mgR(.1,1.6),th.z+mgR(-.5,.5),{life:.6,s0:.45,s1:.1,vy:-.4}));
  if(th.rootT>0)mgEmit('rot',8,dt,()=>mgP('web','#ffffff',th.x+mgR(-.3,.3),mgR(.4,1.5),th.z+mgR(-.3,.3),{life:.5,s0:.9,s1:1.3,op:.8}));
  if(th.revT>0)mgEmit('rev',10,dt,()=>{const a=MG.t*6+Math.random();mgP('star','#b98cff',Math.cos(a)*.7,2.25,Math.sin(a)*.7,{follow:th,life:.5,s0:.45,s1:.1,vy:.3})});
  if(th.fogT>0)mgEmit('fog',3,dt,()=>mgP('puff','#c9b3ff',mgR(-.4,.4),2.5,mgR(-.4,.4),{follow:th,life:1.2,s0:.6,s1:1.3,op:.85,vy:.25}));
  if(th.xrayT>0)mgEmit('xr',7,dt,()=>mgP('glow','#a98bff',th.x+mgR(-.6,.6),mgR(.2,1.8),th.z+mgR(-.6,.6),{life:.8,s0:.5,s1:.1,vy:1}));
  if(th.compT>0)mgEmit('cp',6,dt,()=>mgP('star','#ffd23a',th.x+mgR(-.6,.6),mgR(.2,1.8),th.z+mgR(-.6,.6),{life:.8,s0:.5,s1:.1,vy:1}));
  if(th.cloakT>0&&me&&k3)mgEmit('clk',5,dt,()=>mgP('star','#d9c2ff',th.x+mgR(-.5,.5),mgR(.3,1.7),th.z+mgR(-.5,.5),{life:.6,s0:.35,s1:.05,op:.8}));
  if(th.dashT>0&&!(th.cloakT>0&&!me))mgEmit('dsh',60,dt,()=>mgP('glow','#ffffff',th.x+mgR(-.2,.2),mgR(.3,1.3),th.z+mgR(-.2,.2),{life:.3,s0:.7,s1:.1,op:.7}));
  // 마녀
  const vis=!(mo.ghostT>0&&me);
  if(mo.fastT>0&&vis){mgEmit('fst',16,dt,()=>mgP('glow',Math.random()<.5?'#a98bff':'#d9c2ff',mo.x+mgR(-1.6,1.6),mgR(.2,1.2),mo.z+mgR(-1.6,1.6),{life:.6,s0:1.3,s1:.3,vy:1.5,op:.85}));
    mgEmit('fsE',5,dt,()=>mgP('star','#ffd23a',mgR(-1.2,1.2),head+mgR(-.5,.6),mgR(-1.2,1.2),{follow:mo,life:.5,s0:.6,s1:.1}))}
  if(mo.slowT>0&&vis)mgEmit('gm',8,dt,()=>mgP('glow','#ff8cc6',mo.x+mgR(-1.8,1.8),mgR(.1,.5),mo.z+mgR(-1.8,1.8),{life:.6,s0:.7,s1:.2,op:.8}));
  if(mo.smokeT>0){if(!MG.smk)MG.smk=0;mgEmit('smk',me?14:20,dt,()=>{const a=Math.random()*6.28,r=mgR(.3,3.2);
    mgP('puff',['#ffffff','#ffe0ef','#e0f2ff','#ffd6ea'][(Math.random()*4)|0],Math.cos(a)*r,head+mgR(-1.2,1.6),Math.sin(a)*r,{follow:mo,life:mgR(1,1.5),s0:2,s1:mgR(4,6),op:.96,fin:.2,pow:1.5,vy:.15,spin:mgR(-.4,.4)})})}
  if(mo.freezeT>0)mgEmit('frz',14,dt,()=>{const a=Math.random()*6.28,r=mgR(1.6,2.6);mgP('star',Math.random()<.6?'#9fdcff':'#ffffff',Math.cos(a)*r,mgR(.5,head),Math.sin(a)*r,{follow:mo,life:.7,s0:.8,s1:.15,vy:-.2})});
  if(mo.eatT>0)mgEmit('eat',10,dt,()=>mgP('star','#7ee8c8',mgR(-.8,.8),head-.6,mgR(-.8,.8),{follow:mo,life:.6,s0:.5,s1:.1,vy:1.5,vx:mgR(-1,1)}));
  if(mo.charge&&vis)mgEmit('chg',30,dt,()=>mgP(Math.random()<.5?'star':'glow',Math.random()<.5?'#ff9e5f':'#ffd23a',mo.x-mo.charge.ux*1.5+mgR(-1.2,1.2),mgR(.2,1.4),mo.z-mo.charge.uz*1.5+mgR(-1.2,1.2),{life:.4,s0:.8,s1:.15,op:.9}));
  if(mo.jump&&vis)mgEmit('jmp',26,dt,()=>mgP('glow',Math.random()<.5?'#b98cff':'#ffffff',mo.x+mgR(-1,1),(mo.hy||0)+mgR(.5,3),mo.z+mgR(-1,1),{life:.5,s0:1,s1:.2,op:.85}));
  // 떨어지는 공격의 빛 꼬리
  for(const h of MG.hits)if(h.fall&&h.t<h.T){const fm=h.fall.mesh;mgEmit('fl'+(h.id||(h.id=Math.random())),24,dt,()=>mgP('glow',h.why==='ice'?'#bfeaff':h.why==='magnet'?'#ff8a8a':'#ffd6ea',fm.position.x+mgR(-.4,.4),fm.position.y+1,fm.position.z+mgR(-.4,.4),{life:.35,s0:1.2,s1:.2,op:.8}))}
  // 회오리 날
  mgSpinTick(dt);
  // 자석: 빛이 가운데로 빨려 들어가요
  for(const it of MG.items)if(it.type==='magnet')mgEmit('mg'+it.x.toFixed(1),14,dt,()=>{const a=Math.random()*6.28,r=it.r;mgP('glow',Math.random()<.5?'#ff6b6b':'#ffffff',it.x+Math.cos(a)*r,.4,it.z+Math.sin(a)*r,{path:[it.x+Math.cos(a)*r,.4,it.z+Math.sin(a)*r,it.x,1.2,it.z],life:.8,s0:.6,s1:.3,op:.8})})}
// 회오리 날: 큰 막대사탕 날 4개가 마녀 둘레를 돌아요
function mgSpinTick(dt){const mo=MG.mo;if(mo.spinT>0){if(!MG.spinG){const g=new THREE.Group();for(let i=0;i<4;i++){const b=new THREE.Group();
      const sw=swirlTex(),d=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,.3,28),[new THREE.MeshLambertMaterial({color:'#ff5f9e'}),new THREE.MeshLambertMaterial({map:sw}),new THREE.MeshLambertMaterial({map:sw})]);
      const disc=new THREE.Mesh(new THREE.TorusGeometry(1.5,.14,8,28),new THREE.MeshLambertMaterial({color:'#ffffff'}));
      const st=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,5,8),new THREE.MeshLambertMaterial({color:'#fff8ee'}));st.rotation.z=Math.PI/2;st.position.x=-3;
      b.add(d);b.add(disc);b.add(st);d.rotation.x=Math.PI/2;b.position.set(Math.cos(i*Math.PI/2)*6.5,2.2,Math.sin(i*Math.PI/2)*6.5);b.rotation.y=-i*Math.PI/2;g.add(b)}
      MG.g.add(g);MG.spinG=g}
    const g=MG.spinG;g.position.set(mo.x,0,mo.z);const k=1-mo.spinT/1.5;g.rotation.y-=dt*(4+k*10);const s=Math.min(1,k*4+.2);g.scale.set(s,s,s);
    if(MG.view===3||MG.role==='thief')for(const b of g.children){const p=new THREE.Vector3();b.children[0].getWorldPosition(p);mgEmit('sp'+b.id,18,dt,()=>mgP('glow',Math.random()<.5?'#ff9ec7':'#ffffff',p.x,p.y,p.z,{life:.35,s0:1.4,s1:.3,op:.8}))}}
  else if(MG.spinG){mgDrop(MG.spinG);MG.spinG=null}}

// ---------- 스킬 쓸 때 한 번 나오는 효과 ----------
const MGCOLS={ // 스킬마다 고유 색 (버튼·효과 같이 써요)
  decoy:'#5fd3b8',cloak:'#b98cff',gum:'#ff8cc6',sprint:'#ffc93a',dash2:'#ff8a65',clean:'#62d68a',scope:'#5fb4f0',heal:'#ff6f91',lure:'#3fc4b0',xray:'#9b7bff',compass:'#ffa94d',smoke:'#c4b0f0',freeze:'#7ccbf5',tele:'#ff7eb6',jump:'#ff7eb6',
  tower:'#ff5f9e',ice:'#7ccbf5',magnet:'#ff6b6b',spin:'#ff9ec7',slip:'#ffc93a',rev:'#b98cff',trap:'#62d68a',fake:'#ffb347',fog:'#a99be0',eye:'#9b7bff',skel:'#c99cff',spider:'#5fd3b8',ghost:'#c8c0f0',bat:'#7a5cc0',bear:'#ff9e5f',soldier:'#f0b030',
  dash:'#ff5f9e',stomp:'#ff5f9e'};
function mgThFx(k,ox,oz){const th=MG.th,mo=MG.mo,c=MGCOLS[k]||'#ffffff',hide=th.cloakT>0&&MG.role==='mon'&&k!=='cloak';if(hide&&!['smoke','freeze'].includes(k))return;
  if(k==='decoy'){mgPuffs(ox,1,oz,['#ffffff','#d6fff3'],10,{r:.8,size:1.8});mgSpark(ox,1,oz,[c,'#ffffff'],12,{spd:5})}
  else if(k==='cloak'){mgPuffs(th.x,1,th.z,['#e6dcff','#ffffff'],8,{r:.6,size:1.6});for(let i=0;i<16;i++){const a=i/16*6.28;mgP('star',i%2?c:'#ffffff',th.x+Math.cos(a)*2.2,mgR(.3,2),th.z+Math.sin(a)*2.2,{path:[th.x+Math.cos(a)*2.2,mgR(.3,2),th.z+Math.sin(a)*2.2,th.x,1,th.z],life:.5,s0:.6,s1:.15,ease:1})}}
  else if(k==='gum'){const it=MG.items[MG.items.length-1];if(it){mgSpark(it.x,.5,it.z,[c,'#ffffff','#ffd6ea'],16,{spd:6});mgPuffs(it.x,.4,it.z,['#ffb3d6'],5,{r:1.2,size:1.6})}}
  else if(k==='sprint'){mgSpark(th.x,1,th.z,[c,'#ffffff','#fff1a8'],18,{spd:7});mgGlowAt(th.x,1,th.z,c,4)}
  else if(k==='clean'){mgRing(th.x,th.z,9,c,.6);mgBeam(th.x,th.z,c,1.2,6,.6);mgSpark(th.x,.5,th.z,[c,'#ffffff'],20,{spd:4,up:4,grav:2})}
  else if(k==='scope'){mgBeam(th.x,th.z,c,.8,12,.8);mgSpark(th.x,2,th.z,[c,'#ffffff'],12,{spd:3,up:5,grav:1})}
  else if(k==='heal'){mgHearts(th.x,th.z,7);mgBeam(th.x,th.z,c,1,5,.7);mgSpark(th.x,1,th.z,[c,'#ffffff'],12,{spd:3,up:3,grav:1})}
  else if(k==='lure'){const it=MG.items[MG.items.length-1];if(it){for(let i=0;i<8;i++)mgP('glow',c,th.x,1.2,th.z,{path:[th.x,1.2,th.z,it.x,.8,it.z,3],life:.35+i*.03,s0:.8,s1:.4});mgBeam(it.x,it.z,c,.9,8,1);mgSpark(it.x,.8,it.z,[c,'#ffffff'],12,{spd:4})}}
  else if(k==='xray'){mgRing(th.x,th.z,26,c,.9);mgRing(th.x,th.z,16,'#ffffff',.7);mgGlowAt(th.x,1,th.z,c,5)}
  else if(k==='compass'){mgRing(th.x,th.z,7,c,.6);mgSpark(th.x,1,th.z,[c,'#ffd23a','#ffffff'],14,{spd:4,up:2})}
  else if(k==='smoke'){const H=MGP.moH/9.2*6.4;for(let i=0;i<10;i++)mgP('puff','#ffffff',th.x,1.4,th.z,{path:[th.x,1.4,th.z,mo.x+mgR(-1,1),H+mgR(-1,1),mo.z+mgR(-1,1),3],life:.3+i*.04,s0:.8,s1:2.4,op:.95});
    mgPuffs(mo.x,H,mo.z,['#ffffff','#ffe0ef','#e0f2ff'],16,{keep:1,r:2.6,size:4.5,h:2,follow:null,life:1.4})}
  else if(k==='freeze'){mgSpark(mo.x,4,mo.z,[c,'#ffffff','#bfeaff'],34,{spd:9,r:2,grav:3});mgRing(mo.x,mo.z,9,c,.7);mgBeam(mo.x,mo.z,'#bfeaff',2.6,10,.7)}
  else if(k==='tele'||k==='jump'){mgPortal(ox,oz,c,.7);mgPortal(th.x,th.z,c,.7);const n=10;for(let i=0;i<=n;i++){const x=ox+(th.x-ox)*i/n,z=oz+(th.z-oz)*i/n;mgP('star',i%2?c:'#ffffff',x,1.2+Math.sin(i/n*Math.PI)*1.5,z,{life:.35+i*.04,s0:.8,s1:.1,fin:.2})}
    mgGlowAt(th.x,1.2,th.z,'#ffffff',4,.3);if(MG.role==='thief'){mgFlashW();MG.fovKick=1}}}
function mgWiFx(k){const mo=MG.mo,c=MGCOLS[k]||'#ffffff',H=MGP.moH/9.2,head=6.4*H,hand={x:mo.x,z:mo.z};if(mo.ghostT>0&&MG.role==='thief'&&k!=='ghost')return;
  // 지팡이 끝에서 반짝
  const fx=-Math.sin(mo.yaw),fz=-Math.cos(mo.yaw),sx=mo.x+fx*1.2-fz*1.4,sz=mo.z+fz*1.2+fx*1.4;
  if(!['spin','bear','ghost'].includes(k)){mgGlowAt(sx,head+1.5,sz,c,4,.4);mgSpark(sx,head+1.5,sz,[c,'#ffffff'],10,{spd:5,grav:2})}
  if(k==='eye'){mgRing(mo.x,mo.z,8,c,.6);mgGlowAt(mo.x,head,mo.z,c,7,.5);mgSpark(mo.x,head,mo.z,['#ffd23a',c,'#ffffff'],18,{spd:6,r:1.2})}
  else if(k==='ghost'){mgPuffs(mo.x,head*.6,mo.z,['#e6dcff','#ffffff','#d9c2ff'],14,{r:2.2,size:3.5,h:3})}
  else if(k==='fog'){const th=MG.th;mgPuffs(th.x,2.6,th.z,['#c9b3ff','#e6dcff'],8,{keep:1,r:.8,size:1.8})}
  else if(k==='fake'){for(const it of MG.items)if(it.type==='fake'&&it.T-it.t<.05){mgPuffs(it.x,1.2,it.z,['#ffffff','#ffe0ef'],8,{r:1,size:2});mgSpark(it.x,1.6,it.z,['#ffd23a','#ffffff'],10,{spd:4})}}
  else if(k==='skel'){mgPuffs(mo.x,.4,mo.z,['#e8c48a','#fff1dd'],12,{r:2.6,size:2.6,spd:4,rise:.5})}
  else if(k==='bear'){mgGlowAt(mo.x,head,mo.z,c,6,.4);mgRing(mo.x,mo.z,7,c,.5);mgPuffs(mo.x,.4,mo.z,['#e8c48a'],8,{r:2,size:2.4,spd:3})}
  else if(k==='spin'){mgPuffs(mo.x,1,mo.z,['#ffffff','#ffe0ef'],12,{r:4,size:2.4,spd:5,rise:.3})}
  else if(k==='spider'){const h=MG.hits[MG.hits.length-1];if(h&&h.why==='spider'){const L=h.o.len,ux=Math.cos(h.o.dir),uz=Math.sin(h.o.dir);
      const p=mgP('web','#ffffff',sx,head+1,sz,{path:[sx,head+1,sz,mo.x+ux*L,.6,mo.z+uz*L,2],life:h.T,s0:1,s1:3.4,op:1,fin:.05,pow:8,rot:false});
      for(let i=0;i<8;i++)mgP('glow','#ffffff',sx,head+1,sz,{path:[sx,head+1,sz,mo.x+ux*L*(i+1)/8,.6+(head+1)*(1-(i+1)/8),mo.z+uz*L*(i+1)/8],life:h.T*(i+1)/8+.3,s0:.5,s1:.3,op:.9})}}}
// 떨어지는 공격·밟기가 땅에 닿을 때
function mgImpactFx(h){const o=h.o,w=h.why,c=MGCOLS[w]||'#ffffff';
  if(w==='tower'){mgGlowAt(o.x,2,o.z,'#fff1a8',16,.35);mgPuffs(o.x,1,o.z,['#ffffff','#ffd6ea','#ffe9b0'],18,{r:3,size:4,spd:6,rise:1.5});mgSpark(o.x,1.5,o.z,['#ff5f9e','#ffd23a','#7cc6ff','#ffffff'],30,{spd:14,size:.9,grav:14})}
  else if(w==='ice'){mgPuffs(o.x,.6,o.z,['#e0f2ff','#ffffff'],5,{r:1.4,size:2,spd:2});mgSpark(o.x,1,o.z,['#bfeaff','#ffffff'],8,{spd:6,grav:10})}
  else if(w==='magnet'){mgGlowAt(o.x,1.5,o.z,'#ff8a8a',8,.35);mgPuffs(o.x,.6,o.z,['#ffffff','#ffd6d6'],8,{r:1.6,size:2.4,spd:3})}
  else if(w==='soldier'){mgPuffs(o.x,.5,o.z,['#fff1dd','#ffffff'],5,{r:1.2,size:1.8,spd:3});mgSpark(o.x,1,o.z,['#ffd23a','#ff5f9e'],8,{spd:7,grav:12})}
  else if(w==='stomp'){mgPuffs(o.x,.4,o.z,['#e8c48a','#fff1dd'],14,{r:o.r*.7,size:2.6,spd:5,rise:.4})}
  else if(w==='skel'){mgGlowAt(o.x,1.5,o.z,'#e6dcff',12,.3);mgPuffs(o.x,.5,o.z,['#e8c48a','#fff1dd','#e6dcff'],20,{r:o.r*.8,size:3.4,spd:7,rise:.5})}
  else if(w==='spin'){mgPuffs(o.x,1,o.z,['#ffffff','#ffd6ea'],16,{r:o.r*.8,size:2.6,spd:6,rise:.3})}
  else if(w==='slip'||w==='rev'||w==='trap'){mgSpark(o.x,.6,o.z,[c,'#ffffff'],8,{spd:5,grav:10});mgPuffs(o.x,.3,o.z,[c,'#ffffff'],3,{r:.8,size:1.4,spd:2,op:.7})}
  else if(w==='spider'){mgSpark(o.x+Math.cos(o.dir)*o.len,.6,o.z+Math.sin(o.dir)*o.len,['#ffffff','#d6fff3'],10,{spd:5})}}
// 떨어지는 덫 방울
function mgBlobMesh(k){const m=new THREE.Mesh(new THREE.SphereGeometry(.7,14,10),new THREE.MeshLambertMaterial({color:MGCOLS[k]||'#ffffff',emissive:'#302010'}));m.scale.y=.8;return m}
function mgFlashW(){const f=$('mgFlash');if(!f)return;f.classList.add('w');f.style.transition='none';f.style.opacity=.85;requestAnimationFrame(()=>{f.style.transition='opacity .35s';f.style.opacity=0;setTimeout(()=>f.classList.remove('w'),400)})}

// 스킬 함수 감싸기: 쓰고 나면 효과
{const ts=mgThSkill;mgThSkill=function(k,aim){const ox=MG.th.x,oz=MG.th.z;const r=ts.call(this,k,aim);if(r)try{mgThFx(k,ox,oz)}catch(e){console.warn(e)}return r}}
{const cs=mgCast;mgCast=function(k,aim){const r=cs.call(this,k,aim);if(r)try{mgWiFx(k)}catch(e){console.warn(e)}return r}}
{const hu=mgHurt;mgHurt=function(src,why,dmg){const r=hu.call(this,src,why,dmg);if(r){const th=MG.th;mgSpark(th.x,1.6,th.z,['#ffd23a','#ffffff','#ff5f8f'],14,{spd:6,size:.8,grav:4})}return r}}
{const ec=mgEatCandy;mgEatCandy=function(){const c=MG.cand;if(c){mgBeam(c.x,c.z,'#ffd23a',1.2,10,.7);mgSpark(c.x,1.6,c.z,['#ffd23a','#ff5f9e','#7cc6ff','#ffffff'],24,{spd:7,up:3,grav:6})}const n0=MG.rise.length;const r=ec.apply(this,arguments);
    for(const q of MG.rise.slice(n0)){const p=q.m.position;mgPuffs(p.x,.4,p.z,['#e8c48a','#fff1dd'],4,{r:2,size:2.2,spd:2,rise:.6})}return r}}
// ---------- 마녀 평타: 사탕 구슬 (원거리 · 느리고 약해요) ----------
// 지팡이 끝에서 조준한 쪽으로 천천히 날아가요(초속 11m, 도둑 6.4m). 맞으면 하트 반 칸. 벽에 막히면 터져요. 대시 중엔 안 맞아요.
MGI.stomp='<svg viewBox="0 0 24 24"><path d="M3 20 9.5 13.5" stroke="#fff8ee" stroke-width="3.2" stroke-linecap="round"/><path d="M3 20 9.5 13.5" stroke="#4a2a1a" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="1.6 1.6"/><circle cx="14.5" cy="9.5" r="5.6" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="1.8"/><path d="M11.5 9.5a3 3 0 0 1 5.4-1.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M20.5 3.2l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" fill="#ffd23a" stroke="#4a2a1a" stroke-width=".7"/></svg>';
MGS.shoot=(x,z)=>{const v=mgEar(x,z);mgOsc('triangle',1100,380,.28,.14*v);mgOsc('sine',520,260,.3,.1*v);mgNoise(.2,2400,900,1.2,.1*v,'bandpass')};
MGS.pop=(x,z)=>{const v=mgEar(x,z);mgOsc('sine',420,90,.22,.22*v);mgNoise(.18,2600,400,.8,.2*v)};
function mgOrbMesh(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.8,16,12),new THREE.MeshLambertMaterial({color:'#ff5f9e',emissive:'#7a1040'}));g.add(b);
  const r=new THREE.Mesh(new THREE.TorusGeometry(.83,.12,6,20),new THREE.MeshBasicMaterial({color:'#ffffff'}));g.add(r);
  const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:mgTex('glow'),color:'#ffb3d6',transparent:true,depthWrite:false,fog:false}));gl.scale.setScalar(3.4);g.add(gl);return g}
mgStomp=function(aim){const mo=MG.mo;if(mo.cd.stomp>0||MG.over)return false;
  const P=aim?{x:aim.x,z:aim.z}:mgAim();const fx=-Math.sin(mo.yaw),fz=-Math.cos(mo.yaw),H=MGP.moH/9.2;
  const sx=mo.x+fx*1.4+Math.cos(mo.yaw)*1.3,sz=mo.z+fz*1.4-Math.sin(mo.yaw)*1.3,sy=6.3*H;
  let dx=P.x-sx,dz=P.z-sz,L=Math.hypot(dx,dz);if(L<.5){dx=fx;dz=fz;L=1}
  mo.cd.stomp=MGP.stomp.cd;mo.lockT=.12;mo.m.atkT=.6;MG.stat.atk.orb=(MG.stat.atk.orb||0)+1;
  const m=mgOrbMesh();m.position.set(sx,sy,sz);MG.g.add(m);(MG.orbs||(MG.orbs=[])).push({x:sx,y:sy,z:sz,ux:dx/L,uz:dz/L,d:0,m,id:Math.random()});
  MGS.shoot(sx,sz);if(!(mo.ghostT>0&&MG.role==='thief')){mgGlowAt(sx,sy,sz,'#ffb3d6',3.5,.3);mgSpark(sx,sy,sz,['#ff5f9e','#ffffff'],8,{spd:4,grav:2})}return true};
function mgOrbBoom(o,hit){MGS.pop(o.x,o.z);mgGlowAt(o.x,o.y,o.z,'#ffb3d6',hit?5:3.5,.3);mgSpark(o.x,o.y,o.z,['#ff5f9e','#ffffff','#ffd23a'],hit?14:9,{spd:6,grav:8});mgPuffs(o.x,o.y,o.z,['#ffd6ea','#ffffff'],3,{r:.4,size:1.4,spd:2,op:.8});mgDrop(o.m);o.dead=1}
function mgOrbTick(dt){if(!MG.orbs||!MG.orbs.length)return;const th=MG.th,W=MGW(),sp=MGP.stomp.spd;
  for(const o of MG.orbs){if(o.dead)continue;const st=sp*dt;o.x+=o.ux*st;o.z+=o.uz*st;o.d+=st;
    o.y=Math.max(1.1,o.y-Math.max(0,(o.y-1.1))*Math.min(1,dt*2.6)-dt*.6);o.m.position.set(o.x,o.y,o.z);o.m.children[1].rotation.x+=dt*9;o.m.children[1].rotation.y+=dt*6;
    mgEmit('ob'+o.id,26,dt,()=>mgP('glow',Math.random()<.5?'#ff9ec7':'#ffffff',o.x+mgR(-.2,.2),o.y+mgR(-.2,.2),o.z+mgR(-.2,.2),{life:.35,s0:.9,s1:.15,op:.85}));
    if(Math.hypot(th.x-o.x,th.z-o.z)<MGP.stomp.r+MGP.thR&&o.y<2.6&&!(th.dashT>0)){if(mgHurt(o,'orb',MGP.stomp.dmg)){mgOrbBoom(o,1);continue}}
    if(MG.decoy&&Math.hypot(MG.decoy.x-o.x,MG.decoy.z-o.z)<MGP.stomp.r+MGP.thR){MG.decoy.t=0;mgOrbBoom(o,1);continue}
    if(o.d>MGP.stomp.range||o.x<.5||o.z<.5||o.x>W-.5||o.z>W-.5||(o.y<WH&&mgPtInWall(o.x,o.z,.15)))mgOrbBoom(o,0)}
  MG.orbs=MG.orbs.filter(o=>!o.dead)}
// 휩쓸기(박쥐 떼): 예고가 끝나면 박쥐 떼 앞머리가 실제로 날아가며, 지나갈 때 닿으면 맞아요
function mgSweep(x,z,ux,uz,w,len,spd,why,dmg){(MG.sweeps||(MG.sweeps=[])).push({x,z,ux,uz,w,len,spd,why,d:0,dmg:dmg||1})}
function mgSweepTick(dt){if(!MG.sweeps||!MG.sweeps.length)return;const th=MG.th;
  for(const s of MG.sweeps){const d0=s.d;s.d=Math.min(s.len,s.d+s.spd*dt);const dx=th.x-s.x,dz=th.z-s.z,t=dx*s.ux+dz*s.uz,p=Math.abs(-dx*s.uz+dz*s.ux);
    if(!s.hit&&p<s.w/2+MGP.thR&&t>d0-2.2&&t<s.d+.6){if(mgHurt({x:s.x,z:s.z},s.why,s.dmg))s.hit=1}
    if(MG.decoy&&!s.dh){const q=MG.decoy,ex=q.x-s.x,ez=q.z-s.z,tt=ex*s.ux+ez*s.uz,pp=Math.abs(-ex*s.uz+ez*s.ux);if(pp<s.w/2+MGP.thR&&tt>d0-2.2&&tt<s.d+.6){q.t=0;s.dh=1}}}
  MG.sweeps=MG.sweeps.filter(s=>s.d<s.len)}
{const cl=mgClean;mgClean=function(){MG.sweeps=[];return cl.apply(this,arguments)}}
// AI 도둑: 날아오는 구슬 길을 피해요
{const dg=mgDangerAt;mgDangerAt=function(x,z){let d=dg(x,z);for(const o of MG.orbs||[])for(let t=0;t<=1.2;t+=.2){const ox=o.x+o.ux*MGP.stomp.spd*t,oz=o.z+o.uz*MGP.stomp.spd*t;if(Math.hypot(x-ox,z-oz)<MGP.stomp.r+1.1){d+=t<.5?3.5:2;break}}return d}}
{const cl=mgClean;mgClean=function(){for(const o of MG.orbs||[])mgDrop(o.m);MG.orbs=[];return cl.apply(this,arguments)}}

// ---------- 투명: 장식까지 통째로 ----------
function mgFade(g,o){if(!g||g.userData.__fo===o)return;g.userData.__fo=o;g.traverse(c=>{const ms=c.material?(Array.isArray(c.material)?c.material:[c.material]):[];for(const mt of ms){
    if(!mt.userData.__b)mt.userData.__b={t:mt.transparent,o:mt.opacity,d:mt.depthWrite};const b=mt.userData.__b;
    if(o>=1){mt.transparent=b.t;mt.opacity=b.o;mt.depthWrite=b.d}else{mt.transparent=true;mt.opacity=b.o*o;mt.depthWrite=false}mt.needsUpdate=true}})}
// 모습 보이기 (mgTick 끝에서 불러요)
function mgLooks(){const th=MG.th,mo=MG.mo,me=MG.role==='thief',k3=MG.view===3;
  const tg=th.m.g;let tvis=me?(k3||th.scopeT>0):true,top=1;
  if(th.cloakT>0){if(me)top=.3;else tvis=false}else if(th.inv>0&&Math.floor(performance.now()/90)%2)top=.45;
  tg.visible=tvis;if(tvis)mgFade(tg,top);
  const wg=mo.m.g;let wvis=me?true:k3,wop=1;if(mo.ghostT>0){if(me)wvis=false;else wop=.3}
  wg.visible=wvis;if(wvis)mgFade(wg,wop);
  if(MG.decoy)MG.decoy.m.g.visible=true}

// ---------- 3인칭 ----------
function mgPtInWall(x,z,pad){for(const w of B.walls){if(w.o==='H'){if(Math.abs(z-w.z*C)<WT/2+pad&&x>(w.x-1)*C-pad&&x<(w.x+1)*C+pad)return true}else if(Math.abs(x-w.x*C)<WT/2+pad&&z>(w.z-1)*C-pad&&z<(w.z+1)*C+pad)return true}return false}
function mgCamFree(x0,y0,z0,x1,y1,z1){const n=28,W=MGW(),E=WT/2+.45;for(let i=1;i<=n;i++){const t=i/n,y=y0+(y1-y0)*t,x=x0+(x1-x0)*t,z=z0+(z1-z0)*t;if(y>WH+.4)continue;if(x<E||z<E||x>W-E||z>W-E||mgPtInWall(x,z,.35))return Math.max(0,(i-1.5)/n)}return 1}
{const c1=mgCam;mgCam=function(dt){MG.fovKick=Math.max(0,(MG.fovKick||0)-dt*3);
  if(MG.view!==3||(MG.role==='thief'&&MG.th.scopeT>0)){c1.call(this,dt);if(MG.fovKick>0){camera.fov+=MG.fovKick*14;camera.updateProjectionMatrix()}return}
  MG.shake=Math.max(0,(MG.shake||0)-dt*1.4);const s=MG.shake,th=MG.role==='thief',me=th?MG.th:MG.mo;
  let p=th?clamp(me.pitch-.2,-1.3,.3):clamp(me.pitch-.1,-1.35,.3);const dist=th?6.4:15,ty=th?1.5:MGP.moH*.82+(me.hy||0);
  // 도둑 뒤가 벽에 막히면 조금 더 위에서 내려다봐요
  if(th){let best=null;for(const up of[0,.15,.3]){const q=clamp(p-up,-1.3,.3),ex=-Math.sin(me.yaw)*Math.cos(q),ey=Math.sin(q),ez=-Math.cos(me.yaw)*Math.cos(q);const ff=mgCamFree(me.x,ty,me.z,me.x-ex*dist,ty-ey*dist,me.z-ez*dist),sc=ff*dist-up*3;if(!best||sc>best[1])best=[q,sc];if(ff>=.8)break}p=best[0]}
  const dx=-Math.sin(me.yaw)*Math.cos(p),dy=Math.sin(p),dz=-Math.cos(me.yaw)*Math.cos(p);
  // 마녀는 어깨 너머(오른쪽)에서 봐요: 가운데 조준점이 몸에 가리지 않게
  const sh=th?0:3.6,bx=me.x+Math.cos(me.yaw)*sh,bz=me.z-Math.sin(me.yaw)*sh;
  let cx=bx-dx*dist,cy=ty-dy*dist,cz=bz-dz*dist;const f=th?Math.max(.18,mgCamFree(me.x,ty,me.z,cx,cy,cz)):1;
  // 벽에 막히면 가까이 당겨요 (내가 돌린 방향은 그대로)
  cx=bx-dx*dist*f;cy=ty-dy*dist*f;cz=bz-dz*dist*f;cy=Math.max(th?.45:1.2,cy);
  const fov=(th?(me.dashT>0?76:68):72)+(MG.fovKick||0)*14;camera.fov=fov;camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  camera.position.set(cx+(Math.random()-.5)*s*.5,cy+(Math.random()-.5)*s*.3,cz+(Math.random()-.5)*s*.5);camera.rotation.set(p,me.yaw,0);
  scene.fog.near=th?45:80;scene.fog.far=th?240:340}}
// 3인칭 마녀 조준: 화면 가운데에서 땅으로
{const am=mgAim;mgAim=function(){if(MG.view!==3)return am.apply(this,arguments);const v=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion),o=camera.position;
  if(v.y<-.02){const t=-o.y/v.y;return{x:o.x+v.x*t,z:o.z+v.z*t,d:t}}const mo=MG.mo;return{x:mo.x+v.x*40,z:mo.z+v.z*40,d:40}}}
const MGI_VIEW1='<svg viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" fill="#fff" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="12" r="3.6" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="1.6"/><circle cx="12" cy="12" r="1.4" fill="#4a2a1a"/></svg>';
const MGI_VIEW3='<svg viewBox="0 0 24 24"><rect x="2.5" y="6.5" width="11" height="9" rx="2" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="1.7"/><path d="M13.5 9.5 17 7.5v7l-3.5-2" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/><circle cx="19.5" cy="9" r="2" fill="#5fcf9f" stroke="#4a2a1a" stroke-width="1.4"/><path d="M17 20q2.5-6 5 0" fill="#5fcf9f" stroke="#4a2a1a" stroke-width="1.4"/></svg>';
function mgViewSync(){const b=$('mgViewB');if(!b)return;b.innerHTML=MG.view===3?MGI_VIEW3:MGI_VIEW1;b.setAttribute('aria-label',MG.view===3?'3인칭':'1인칭')}
function mgViewToggle(){MG.view=MG.view===3?1:3;SAVE.mgView=MG.view;try{saveGame()}catch(e){}mgViewSync();try{SFX.click()}catch(e){}mgMsg(MG.view===3?'3인칭':'1인칭',.9)}

// ---------- 스킬 끌어서 조준 ----------
// 끌 수 있는 스킬: 마녀는 거리 있는 스킬 + 박쥐·곰(방향), 도둑은 분신(방향)·껌·미끼(자리)·순간이동(방향)
const MGAIM={w:{stomp:'dir',tower:'pt',ice:'pt',magnet:'pt',slip:'pt',rev:'pt',trap:'pt',skel:'pt',spider:'line',soldier:'line',bat:'dir',bear:'dir'},t:{decoy:'dir',gum:'pt',lure:'pt',tele:'dir',jump:'dir'}};
const MGAR={tower:4.5,ice:7.5,magnet:13,slip:6.5,rev:6.5,trap:6.5,skel:5.2,gum:2.6,lure:1.6};
const MGDR={a:null};
function mgAimKind(a){return MG.role==='thief'?MGAIM.t[a]:MGAIM.w[a]}
function mgAimRange(a){if(MG.role==='thief')return a==='gum'?6:a==='lure'?12:a==='decoy'?8:18;if(a==='stomp')return MGP.stomp.range;const S=MGWS[a];return a==='bat'?26:a==='bear'?18:(S&&S.range)||20}
function mgDragAim(){const d=MGDR,me=MG.role==='thief'?MG.th:MG.mo,R=Math.min(110,innerHeight*.28);let dx=d.cx-d.x0,dy=d.cy-d.y0;const L=Math.hypot(dx,dy);const f=Math.min(1,L/R);
  const fx=-Math.sin(me.yaw),fz=-Math.cos(me.yaw),rx=Math.cos(me.yaw),rz=-Math.sin(me.yaw);const ux=(fx*-dy+rx*dx)/(L||1),uz=(fz*-dy+rz*dx)/(L||1);
  const range=mgAimRange(d.a),kind=mgAimKind(d.a);const dist=kind==='dir'?range:Math.max(2,range*f);const W=MGW();
  return{x:clamp(me.x+ux*dist,1.5,W-1.5),z:clamp(me.z+uz*dist,1.5,W-1.5),ux,uz,dist}}
function mgPrevMake(){mgPrevDrop();const g=new THREE.Group();const M=op=>new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide,fog:false});
  const ring=new THREE.Mesh(new THREE.RingGeometry(.86,1,48),M(.95)),fill=new THREE.Mesh(new THREE.CircleGeometry(1,48),M(.22)),bar=new THREE.Mesh(new THREE.PlaneGeometry(1,1),M(.3)),dot=new THREE.Mesh(new THREE.CircleGeometry(.5,20),M(.95));
  for(const m of[ring,fill,bar,dot]){m.rotation.x=-Math.PI/2;g.add(m)}ring.position.y=.17;fill.position.y=.16;bar.position.y=.15;dot.position.y=.18;g.userData={ring,fill,bar,dot};MG.g.add(g);MGDR.g=g}
function mgPrevDrop(){if(MGDR.g){mgDrop(MGDR.g);MGDR.g=null}}
function mgPrevSync(){const d=MGDR;if(!d.a||!d.g)return;const P=mgDragAim();d.P=P;const me=MG.role==='thief'?MG.th:MG.mo,u=d.g.userData,kind=mgAimKind(d.a),cancel=d.cancel;
  const col=cancel?'#ff5f5f':(MGCOLS[d.a]||'#ffffff');for(const k of['ring','fill','bar','dot'])u[k].material.color.set(col);
  const r=MGAR[d.a]||2;const ang=Math.atan2(P.z-me.z,P.x-me.x),len=Math.hypot(P.x-me.x,P.z-me.z);
  if(kind==='pt'){u.ring.visible=u.fill.visible=true;u.ring.scale.set(r,r,1);u.fill.scale.set(r,r,1);u.ring.position.x=u.fill.position.x=P.x-me.x;u.ring.position.z=u.fill.position.z=P.z-me.z;u.dot.visible=false}
  else{u.ring.visible=u.fill.visible=false;u.dot.visible=true;u.dot.position.set(P.x-me.x,.18,P.z-me.z)}
  const w=d.a==='stomp'?1.7:kind==='dir'&&MG.role==='mon'?(d.a==='bat'?5:4.6):kind==='line'?2.6:.5;u.bar.scale.set(len,w,1);u.bar.position.set((P.x-me.x)/2,.15,(P.z-me.z)/2);u.bar.rotation.set(-Math.PI/2,0,-ang);
  d.g.position.set(me.x,0,me.z)}
function mgBtnDown(e,b){const a=b.dataset.a;e.preventDefault();e.stopPropagation();if(!MG.on||MG.over||MG.pause||MG.cdn>0)return;
  const kind=a==='dash'?null:mgAimKind(a);
  if(!kind){mgAct(a);b.classList.add('prs');setTimeout(()=>b.classList.remove('prs'),120);return}
  // 쿨타임 중이면 그냥 막혀요
  const me=MG.role==='thief'?MG.th:MG.mo;if((me.cd[a]||0)>0){mgAct(a);return}
  MGDR.a=a;MGDR.id=e.pointerId;MGDR.b=b;MGDR.x0=MGDR.cx=e.clientX;MGDR.y0=MGDR.cy=e.clientY;MGDR.moved=false;MGDR.cancel=false;b.classList.add('prs');try{b.setPointerCapture(e.pointerId)}catch(_){}}
function mgBtnMove(e){const d=MGDR;if(!d.a||e.pointerId!==d.id)return;d.cx=e.clientX;d.cy=e.clientY;const L=Math.hypot(d.cx-d.x0,d.cy-d.y0);
  if(!d.moved&&L>14){d.moved=true;mgPrevMake();$('mgHud').classList.add('aiming')}
  if(d.moved){const r=d.b.getBoundingClientRect();d.cancel=d.cx>r.left-6&&d.cx<r.right+6&&d.cy>r.top-6&&d.cy<r.bottom+6;d.b.classList.toggle('cx',d.cancel);mgPrevSync()}}
function mgBtnUp(e){const d=MGDR;if(!d.a||(e&&e.pointerId!==d.id))return;const a=d.a,b=d.b;b.classList.remove('prs','cx');$('mgHud').classList.remove('aiming');
  if(d.moved&&!d.cancel&&MG.on&&!MG.over&&!MG.pause){mgPrevSync();mgActAim(a,d.P)}else if(!d.moved)mgAct(a);
  d.a=null;mgPrevDrop()}
function mgActAim(a,P){if(!MG.on||MG.over||MG.pause||MG.cdn>0)return;if(MG.role==='thief')mgThSkill(a,P);else if(a==='stomp')mgStomp({x:P.x,z:P.z});else mgCast(a,{x:P.x,z:P.z,drag:1})}

// ---------- 화면 붙이기 ----------
{const hd=mgHud;mgHud=function(on){const first=!$('mgHud');hd.call(this,on);const h=$('mgHud');
  if(first){const top=h.querySelector('.mg-top'),pb=$('mgPauseB');const grp=document.createElement('div');grp.className='mg-tr';top.insertBefore(grp,pb);grp.appendChild(document.createElement('button'));grp.firstChild.className='mg-ib';grp.firstChild.id='mgViewB';grp.appendChild(pb);
    $('mgViewB').addEventListener('click',e=>{e.stopPropagation();mgViewToggle()});
    const bt=$('mgBtns');const nb=bt.cloneNode(false);while(bt.firstChild)nb.appendChild(bt.firstChild);bt.parentNode.replaceChild(nb,bt);// 예전 바로 쓰기를 떼어내요
    nb.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-a]');if(b)mgBtnDown(e,b)});nb.addEventListener('pointermove',mgBtnMove);
    for(const ev of['pointerup','pointercancel','lostpointercapture'])nb.addEventListener(ev,mgBtnUp)}
  if(on){MG.view=SAVE.mgView===3?3:1;mgViewSync();mgBtnPaint()}}}
// 버튼 칠하기: 스킬 색 테두리 + 크림 판 + 남은 초
function mgBtnPaint(){for(const b of document.querySelectorAll('#mgBtns [data-a]')){const a=b.dataset.a;b.style.setProperty('--c',MGCOLS[a]||'#7cc6ff');if(!b.querySelector('.sec')){const s=document.createElement('b');s.className='sec';b.appendChild(s)}}}
{const hs=mgHudSync;mgHudSync=function(){hs.apply(this,arguments);if(!MG.on)return;const th=MG.th,mo=MG.mo;
  for(const b of document.querySelectorAll('#mgBtns [data-a]')){const a=b.dataset.a,s=b.querySelector('.sec');if(!s)continue;let f=0;
    if(a==='dash')f=th.charges>0?0:th.dashCd;else if(a==='stomp')f=mo.cd.stomp;else if(MG.role==='thief')f=a==='heal'&&th.healed?0:(th.cd[a]||0);else f=mo.cd[a]||0;
    const t=f>0?Math.ceil(f)+'':'';if(s.textContent!==t)s.textContent=t;b.classList.toggle('used',MG.role==='thief'&&a==='heal'&&!!th.healed)}
  // 하트 반 칸
  const hp=$('mgHp'),hk='h'+th.hp;if(hp.dataset.k!==hk){hp.dataset.k=hk;hp.innerHTML=Array.from({length:MGP.hp},(_,i)=>{const v=Math.max(0,Math.min(1,th.hp-i));return`<i class="${v>=1?'on':v>0?'half':''}">${MGI.heart}<s>${MGI.heart}</s></i>`}).join('')}
  $('mgHud').classList.toggle('fast',MG.role==='mon'&&mo.fastT>0||MG.role==='thief'&&(th.sprintT>0||th.dashT>0));$('mgHud').classList.toggle('frost',MG.role==='mon'&&mo.freezeT>0);
  $('mgCross').hidden=MG.role!=='mon'||!!MGDR.a&&MGDR.moved}}
// 상태 효과 + 모습은 매 프레임
{const tk=mgTick;mgTick=function(dt){tk.apply(this,arguments);if(!MG.on||!MG.g)return;try{if(!MG.pause&&!MG.over&&MG.cdn<=0){mgOrbTick(dt);mgSweepTick(dt)}mgLooks();mgAuraTick(dt);if(MGDR.a&&MGDR.moved)mgPrevSync()}catch(e){console.warn(e)}}}
{const cl=mgClean;mgClean=function(){MGDR.a=null;MGDR.g=null;MG.spinG=null;MGFX.em={};return cl.apply(this,arguments)}}

{const st=document.createElement('style');st.textContent=`
.mg-tr{display:flex;gap:8px}
#mgHud #mgFlash.w{background:radial-gradient(circle,#ffffffcc 30%,#e6fff6 100%)}
#mgHud::before{content:'';position:fixed;inset:0;pointer-events:none;opacity:0;transition:opacity .25s;z-index:0;background:repeating-conic-gradient(from 0deg at 50% 50%,#ffffff00 0deg 5deg,#ffffff55 5deg 6deg);-webkit-mask:radial-gradient(circle,transparent 42%,#000 75%);mask:radial-gradient(circle,transparent 42%,#000 75%)}
#mgHud.fast::before{opacity:1}
#mgHud::after{content:'';position:fixed;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;z-index:0;box-shadow:inset 0 0 60px 24px #9fdcffcc;border:6px solid #e0f6ff}
#mgHud.frost::after{opacity:1}
.mg-hp i{position:relative;filter:none!important}.mg-hp i>svg{filter:grayscale(1) opacity(.35)}.mg-hp i s{position:absolute;inset:0;display:none;text-decoration:none}.mg-hp i s svg{width:100%;height:100%}
.mg-hp i.on>svg{filter:none}.mg-hp i.half s{display:block;clip-path:inset(0 50% 0 0)}
.mg-ab{--c:#7cc6ff;background:radial-gradient(circle at 50% 38%,#fffdf8 0 52%,transparent 53%),linear-gradient(160deg,color-mix(in srgb,var(--c) 55%,#fff) 0%,var(--c) 55%,color-mix(in srgb,var(--c) 75%,#4a2a1a) 100%)!important;padding:12px!important;transition:transform .08s}
.mg-ab::before{content:'';position:absolute;inset:3px;border-radius:50%;border:2px solid #ffffff99;pointer-events:none}
.mg-ab.big{padding:17px!important}
.mg-ab.mgcard{border-radius:16px;padding:6px!important;background:radial-gradient(ellipse at 50% 45%,#fffdf8 0 58%,transparent 60%),linear-gradient(160deg,color-mix(in srgb,var(--c) 55%,#fff) 0%,var(--c) 55%,color-mix(in srgb,var(--c) 75%,#4a2a1a) 100%)!important}
.mg-ab.mgcard::before{border-radius:12px}.mg-ab.mgcard .cd{border-radius:16px}
.mg-ab .cd{background:conic-gradient(#3a1d10b8 calc(var(--k,0)*360deg),transparent 0)!important}
.mg-ab .sec{position:absolute;inset:0;display:grid;place-items:center;z-index:3;font:20px var(--f-display);color:#fff;-webkit-text-stroke:4px var(--choco);paint-order:stroke;pointer-events:none}.mg-ab .sec:empty{display:none}
.mg-ab.big .sec{font-size:24px}
.mg-ab:not(.wait)::after{content:'';position:absolute;inset:-6px;border-radius:inherit;box-shadow:0 0 0 3px color-mix(in srgb,var(--c) 70%,#fff);opacity:.0;animation:mgReady 1.8s ease-in-out infinite;pointer-events:none}
@keyframes mgReady{0%,100%{opacity:0}50%{opacity:.75}}
.mg-ab.wait svg{filter:saturate(.5)}.mg-ab.used{filter:grayscale(1);opacity:.6}
.mg-ab.prs{transform:translateY(3px) scale(.95);box-shadow:0 1px 0 var(--choco)}
.mg-ab.cx{background:#ff8a8a!important}.mg-ab.cx svg{opacity:.35}
#mgHud.aiming .mg-ab:not(.prs){opacity:.45}
.mg-sel{align-items:stretch!important}.mg-sel .mg-pk-top{align-self:stretch;width:100%;display:flex;gap:8px;justify-content:flex-start;box-sizing:border-box}
.mg-sel .mg-pk-top b{flex:1;min-width:0;text-align:left;white-space:nowrap}.mg-sel .mg-pk-top .mg-ib{flex:0 0 auto;position:static;margin:0}
.mg-sel-grid{overflow-x:hidden!important;overflow-y:auto;padding:7px 7px 4px;margin:-7px -7px 0}
.mg-go{flex:0 0 auto;min-width:104px;height:50px;padding:0 20px;border-radius:25px;border:3px solid var(--choco);background:#ff5f9e;box-shadow:0 4px 0 var(--choco);font:22px var(--f-display);color:#fff;-webkit-text-stroke:4px var(--choco);paint-order:stroke;cursor:pointer;letter-spacing:2px}
.mg-go:active{transform:translateY(2px);box-shadow:0 2px 0 var(--choco)}.mg-go.off{filter:grayscale(.8);opacity:.6}
.mg-sel-c span{border-radius:50%;background:radial-gradient(circle,#fffdf8 0 63%,transparent 65%),var(--c,#e3c9a8);padding:3px;box-sizing:border-box}
@media (max-height:340px){.mg-go{height:42px;min-width:88px;font-size:19px}}
`;document.head.appendChild(st)}
{const dg=mgDangerAt;mgDangerAt=function(x,z){let d=dg(x,z);for(const s of MG.sweeps||[]){const dx=x-s.x,dz=z-s.z,t=dx*s.ux+dz*s.uz,p=Math.abs(-dx*s.uz+dz*s.ux);if(p<s.w/2+1.2&&t>s.d-1)d+=3.5}return d}}
// ---------- 스킬 끌다가 취소: 위쪽 가운데 '취소' 칸에 놓으면 안 써요 ----------
const MGI_CX='<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7 7 17" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/><path d="M7 7l10 10M17 7 7 17" stroke="#4a2a1a" stroke-width="1.4" stroke-linecap="round"/></svg>';
{const hd=mgHud;mgHud=function(on){const first=!$('mgHud');const r=hd.apply(this,arguments);if(first){const c=document.createElement('div');c.id='mgCancel';c.innerHTML=`<i>${MGI_CX}</i><b>취소</b>`;$('mgHud').appendChild(c)}return r}}
{const mv=mgBtnMove;mgBtnMove=function(e){mv.apply(this,arguments);const d=MGDR;if(!d.a||!d.moved)return;const c=$('mgCancel'),r=c.getBoundingClientRect();const inC=e.clientX>r.left-10&&e.clientX<r.right+10&&e.clientY>r.top-10&&e.clientY<r.bottom+14;
  c.classList.toggle('hot',inC);if(inC&&!d.cancel){d.cancel=true;d.b.classList.add('cx');mgPrevSync()}}}
{const up=mgBtnUp;mgBtnUp=function(e){const r=up.apply(this,arguments);const c=$('mgCancel');if(c)c.classList.remove('hot');return r}}
// ---------- 마녀 지도: 도둑이 다음 사탕(또는 출구)까지 가는 가장 빠른 길이 늘 보여요 ----------
function mgThiefRoute(){const th=MG.th;const sx=th.cloakT>0&&th.lx!=null?th.lx:th.x,sz=th.cloakT>0&&th.lz!=null?th.lz:th.z;const[cx,cz]=cellOf(sx,sz);
  const goal=MG.exitOpen?EXIT:MG.cand?cellOf(MG.cand.x,MG.cand.z):null;if(!goal||!mgOpen(cx,cz))return null;
  const key=cx+','+cz+'>'+goal+':'+B.walls.length+':'+(B.ver||0);if(MG.routeKey===key)return MG.route;MG.routeKey=key;const p=mgPathTo(cx,cz,goal[0],goal[1]);MG.route=p?[[cx,cz],...p]:null;return MG.route}
{const dm=mgDrawMap;mgDrawMap=function(){dm.apply(this,arguments);if(!MG.on||MG.role!=='mon')return;const th=MG.th;if(!(th.cloakT>0)){th.lx=th.x;th.lz=th.z}const R=mgThiefRoute();if(!R||R.length<2)return;
  const cv=$('mgMap'),x=cv.getContext('2d'),S=cv.width,k=S/MGW();x.save();x.lineCap='round';x.lineJoin='round';
  x.beginPath();R.forEach(([a,b],i)=>{const px=cx2x(a)*k,pz=cx2x(b)*k;i?x.lineTo(px,pz):x.moveTo(px,pz)});
  x.strokeStyle='#ffffffcc';x.lineWidth=Math.max(5,S/26);x.stroke();x.strokeStyle='#ff5f9e';x.lineWidth=Math.max(2.5,S/60);x.setLineDash([S/30,S/50]);x.stroke();x.restore()}}
{const st=document.createElement('style');st.textContent=`
#mgCancel{position:fixed;left:50%;top:44px;transform:translateX(-50%);display:none;align-items:center;gap:6px;padding:5px 16px 5px 6px;border-radius:26px;border:3px solid var(--choco);background:#fff8eee6;box-shadow:0 3px 0 var(--choco);font:16px var(--f-display);color:var(--choco);z-index:4;pointer-events:none}
#mgCancel i{width:34px;height:34px;border-radius:50%;background:#ff8a8a;border:2.5px solid var(--choco);display:grid;place-items:center;padding:4px;box-sizing:border-box}#mgCancel i svg{width:100%;height:100%}
#mgHud.aiming #mgCancel{display:flex}#mgCancel.hot{background:#ff8a8a;color:#fff;transform:translateX(-50%) scale(1.12)}
#mgHud.aiming .mg-mid,#mgHud.aiming .mg-msg{visibility:hidden}`;document.head.appendChild(st)}
// ---------- 스킬 버튼은 평타(도둑 대시 · 마녀 사탕 구슬)를 둘러싸요 ----------
// 평타가 오른쪽 아래 큰 버튼, 스킬은 그 둘레 원호(왼쪽 → 위). 마녀 5개는 안쪽 3 + 바깥 2.
function mgBtnLayout(){const box=$('mgBtns');if(!box||!MG.on)return;const big=box.querySelector('.mg-ab.big');if(!big)return;const sk=[...box.querySelectorAll('.mg-ab:not(.big)')];box.classList.add('arc');
  const W=innerWidth,H=innerHeight,small=H<345;const Bs=small?68:80,s=small?48:56,pad=small?10:14;let sr=0;try{sr=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sar'))||0}catch(e){}
  const cx=W-Math.max(pad,sr)-Bs/2-4,cy=H-pad-Bs/2-4;const put=(b,x,y,z)=>{b.style.position='fixed';b.style.left=(x-z/2)+'px';b.style.top=(y-z/2)+'px';b.style.width=b.style.height=z+'px';b.style.margin='0'};
  put(big,cx,cy,Bs);const n=sk.length,R1=Math.max(Bs/2+s/2+10,(s+6)/(2*Math.sin(Math.PI/8))),R2=R1+s+6;
  const inner=n<=1?[225]:n===2?[192,258]:[180,225,270];let outer=n===4?[225]:n>=5?[202,248]:[];
  const map=$('mgMap')?$('mgMap').parentNode.getBoundingClientRect():null;const hitMap=(x,y)=>map&&x+s/2>map.left-4&&x-s/2<map.right+4&&y-s/2<map.bottom+6&&y+s/2>map.top-4;
  // 미니맵에 닿으면 바깥 줄을 왼쪽으로 돌려요
  const bad=o=>o.some(a=>hitMap(cx+R2*Math.cos(a*Math.PI/180),cy+R2*Math.sin(a*Math.PI/180))||cy+R2*Math.sin(a*Math.PI/180)-s/2<56);
  if(n>=5&&bad(outer))outer=[192,228];for(let t=0;t<4&&bad(outer);t++)outer=outer.map(a=>a-4);
  sk.forEach((b,i)=>{const R=i<3?R1:R2,a=(i<3?inner[i]:outer[i-3])*Math.PI/180;put(b,cx+R*Math.cos(a),cy+R*Math.sin(a),s)})}
{const hd=mgHud;mgHud=function(on){const r=hd.apply(this,arguments);if(on)requestAnimationFrame(mgBtnLayout);return r}}
addEventListener('resize',()=>{if(MG.on)setTimeout(mgBtnLayout,60)});
{const st=document.createElement('style');st.textContent=`
.mg-btns.arc{position:fixed;right:0;bottom:0;width:0;height:0;display:block;gap:0}.mg-btns.arc .mg-row,.mg-btns.arc .mg-grid{display:contents}
.mg-btns.arc .mg-ab{padding:10px!important}.mg-btns.arc .mg-ab.big{padding:16px!important}
.mg-btns.arc .mg-ab.mgcard{border-radius:50%;padding:7px!important;background:radial-gradient(circle at 50% 45%,#fffdf8 0 56%,transparent 58%),linear-gradient(160deg,color-mix(in srgb,var(--c) 55%,#fff) 0%,var(--c) 55%,color-mix(in srgb,var(--c) 75%,#4a2a1a) 100%)!important}
.mg-btns.arc .mg-ab.mgcard::before,.mg-btns.arc .mg-ab.mgcard .cd{border-radius:50%}`;document.head.appendChild(st)}
