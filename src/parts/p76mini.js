// ===== 76차: 미니게임 · 거대 몬스터 =====
// 한쪽은 거대 몬스터(슬라임·박쥐·유령·병사·곰·거미 중 하나), 한쪽은 별 사탕 5개를 모으는 쿠키 도둑.
// 미로 없는 둥근 광장 · 90초 한 판 · 보상과 등급 없음. 둘 다 조이스틱으로 움직여요.
// 도둑: 대시(무적). 몬스터: 밟기 · 휘두르기 · 몬스터별 특기. 모든 공격은 바닥에 예고가 먼저 떠요.
// 카메라는 광장 전체가 보이게 고정이에요 (저절로 움직이지 않아요).
const MG={on:false,role:'thief',kind:'skel',T:90,R:17,cx:0,cz:0,g:null,hidden:[],pause:false,over:false,cdn:0,t:0};
const MGK=['skel','bat','ghost','soldier','bear','spider'];
const MGN={skel:'포도 슬라임',bat:'사탕 박쥐',ghost:'솜사탕 유령',soldier:'진저 병사',bear:'젤리 곰',spider:'민트 거미'};
const MGSP={skel:['분열','작은 슬라임 넷이 쫓아가요'],bat:['초음파','앞으로 길게 쏘아요'],ghost:['순간이동','앞으로 휙 날아가 쿵'],soldier:['사탕 창','앞으로 창을 던져요'],bear:['돌진','앞으로 힘껏 달려요'],spider:['거미줄','밟으면 느려지는 거미줄']};
const MGP={thSpd:6.4,dashSpd:17,dashT:.26,dashCd:3,thR:.55,hp:3,inv:1.5,moSpd:5,moR:2.4,stars:5,hold:1,
  stomp:{w:.8,r:5,cd:4},swipe:{w:.6,r:6.2,a:Math.PI*.28,cd:2.8},sp:{cd:7}};
// ---------- 아이콘 ----------
const MGI={
 dash:'<svg viewBox="0 0 24 24"><path d="M3 15h7l-1.5 4 9-9h-7l1.5-4z" fill="#fff" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 stomp:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="18" rx="9" ry="3" fill="none" stroke="#fff" stroke-width="2"/><path d="M8 4h8v7a4 4 0 0 1-8 0z" fill="#fff" stroke="#4a2a1a" stroke-width="1.8"/><path d="M12 15v3M6 14l-2 2M18 14l2 2" stroke="#4a2a1a" stroke-width="1.8" stroke-linecap="round"/></svg>',
 swipe:'<svg viewBox="0 0 24 24"><path d="M4 18A11 11 0 0 1 18 5" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/><path d="M4 18A11 11 0 0 1 18 5" fill="none" stroke="#4a2a1a" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="1 4"/><path d="M15 3l4 2-2 4" fill="none" stroke="#4a2a1a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 pause:'<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1.5" fill="#4a2a1a"/><rect x="14" y="5" width="4" height="14" rx="1.5" fill="#4a2a1a"/></svg>',
 play:'<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="#fff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="M3.5 11.5 12 4l8.5 7.5" fill="none" stroke="#4a2a1a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9.5h4.5V15h3v4.5H18V10" fill="#fff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>',
 again:'<svg viewBox="0 0 24 24"><path d="M19 12a7 7 0 1 1-2.1-5" fill="none" stroke="#fff" stroke-width="4.2" stroke-linecap="round"/><path d="M19 12a7 7 0 1 1-2.1-5" fill="none" stroke="#4a2a1a" stroke-width="1.6" stroke-linecap="round"/><path d="M18.5 3v4.5H14" fill="none" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 star:'<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M12 20.5S3 14.8 3 8.9A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 9 2.3c0 5.9-9 11.6-9 11.6z" fill="#ff5f8f" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/></svg>',
 sp:{skel:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4.5" fill="#b98cff" stroke="#4a2a1a" stroke-width="1.6"/><circle cx="6" cy="17" r="3.5" fill="#b98cff" stroke="#4a2a1a" stroke-width="1.6"/><circle cx="18" cy="17" r="3.5" fill="#b98cff" stroke="#4a2a1a" stroke-width="1.6"/></svg>',
  bat:'<svg viewBox="0 0 24 24"><path d="M5 12a3 3 0 0 1 0-6M5 18a9 9 0 0 1 0-18" transform="translate(4 3) scale(.8)" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M11 12h10M16 8l5 4-5 4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 12h10M16 8l5 4-5 4" fill="none" stroke="#4a2a1a" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ghost:'<svg viewBox="0 0 24 24"><path d="M6 20V11a6 6 0 0 1 12 0v9l-2-1.6-2 1.6-2-1.6-2 1.6-2-1.6z" fill="#fff" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/><path d="M2 8h3M2 12h2M2 16h3" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="10" cy="11" r="1.2" fill="#4a2a1a"/><circle cx="14" cy="11" r="1.2" fill="#4a2a1a"/></svg>',
  soldier:'<svg viewBox="0 0 24 24"><path d="M4 20 18 6" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M4 20 18 6" stroke="#4a2a1a" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="2 2"/><path d="M14 4l6 0 0 6z" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  bear:'<svg viewBox="0 0 24 24"><path d="M2 9h6M2 13h8M2 17h6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="16" cy="13" r="6" fill="#ff9e5f" stroke="#4a2a1a" stroke-width="1.6"/><circle cx="12.5" cy="7.5" r="2" fill="#ff9e5f" stroke="#4a2a1a" stroke-width="1.4"/><circle cx="19.5" cy="7.5" r="2" fill="#ff9e5f" stroke="#4a2a1a" stroke-width="1.4"/></svg>',
  spider:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="5" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" stroke="#fff" stroke-width="1.6"/></svg>'},
 thief:'<svg viewBox="0 0 48 48"><path d="M24 6c-9 0-15 7-15 16v6c0 8 6 13 15 13s15-5 15-13v-6c0-9-6-16-15-16z" fill="#5fcf9f" stroke="#4a2a1a" stroke-width="2.4"/><path d="M10 21h28v6H10z" fill="#2f6b55" stroke="#4a2a1a" stroke-width="2"/><circle cx="18" cy="24" r="2" fill="#fff"/><circle cx="30" cy="24" r="2" fill="#fff"/><path d="M18 33q6 4 12 0" fill="none" stroke="#4a2a1a" stroke-width="2.2" stroke-linecap="round"/><path d="M33 8l6-3" stroke="#4a2a1a" stroke-width="2.2" stroke-linecap="round"/><circle cx="40" cy="5" r="3.5" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.8"/></svg>'};
// ---------- 무대 ----------
function mgSpot(){const W=N*C;return[W/2,W/2]}
function mgBuild(){const g=new THREE.Group();const R=MG.R;const T=THEMES[THEMEID]||THEMES.candy;
  const plaza=new THREE.Mesh(new THREE.CircleGeometry(R,64),new THREE.MeshBasicMaterial({color:(T.plaza&&T.plaza[0])||'#fff1dc',transparent:true,opacity:.28,depthWrite:false}));plaza.rotation.x=-Math.PI/2;plaza.position.y=.06;g.add(plaza);
  const edge=new THREE.Mesh(new THREE.RingGeometry(R-.35,R+.15,96),new THREE.MeshBasicMaterial({color:'#fff8ee',depthWrite:false}));edge.rotation.x=-Math.PI/2;edge.position.y=.08;g.add(edge);
  const cols=(T.cane||['#ff5f9e','#ffffff']).concat(T.lamp||[]);const n=40;
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const post=new THREE.Mesh(new THREE.CylinderGeometry(.32,.38,1.5,10),new THREE.MeshLambertMaterial({color:cols[i%cols.length]}));post.position.set(Math.cos(a)*(R+.6),.75,Math.sin(a)*(R+.6));g.add(post);
    const ball=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),new THREE.MeshLambertMaterial({color:cols[(i+1)%cols.length]}));ball.position.set(post.position.x,1.6,post.position.z);g.add(ball)}
  g.position.set(MG.cx,0,MG.cz);scene.add(g);MG.g=g;
  MG.fx=new THREE.Group();g.add(MG.fx)}
function mgHideWorld(on){if(on){MG.hidden=[];const hide=o=>{if(o&&o.visible){o.visible=false;MG.hidden.push(o)}};
    try{if(G.hero&&G.hero.m)hide(G.hero.m.g)}catch(e){}try{for(const e of G.ents||[])hide(e.g||e.m&&e.m.g)}catch(e){}try{for(const o of X28.list||[])hide(o)}catch(e){}
    try{hide(WORLD.startFlag);hide(WORLD.exitPillar)}catch(e){}try{if(G.decoy)hide(G.decoy.g||G.decoy.m&&G.decoy.m.g)}catch(e){}try{for(const c of G.candies||[])hide(c.g)}catch(e){}
    B.walls=[];syncWallMeshes()}
  else{for(const o of MG.hidden)o.visible=true;MG.hidden=[]}}
// ---------- 캐릭터 ----------
function mgFit(m,h){const b=new THREE.Box3().setFromObject(m.g);const H=Math.max(.1,b.max.y-b.min.y);m.g.scale.multiplyScalar(h/H);return m}
function mgThiefModel(){const m=makeChar('hero',1.85,heroLook());m.g.scale.setScalar(2.1);try{play(m,'Idle')}catch(e){}return m}
function mgMonModel(k){let m;if(k==='skel')m=makeSlime(witchLook().slime);else m=monModel(k);
  m.g.position.set(0,0,0);mgFit(m,k==='bat'?7.5:k==='spider'?6.2:k==='ghost'?8.5:9.5);try{play(m,'Idle')}catch(e){}return m}
function mgUpdModel(m,dt){try{if(m&&m.mixer)m.mixer.update(dt)}catch(e){}}
// ---------- 예고 모양 ----------
const MGCOL='#ff3d7f';
function mgTele(kind,o){const g=new THREE.Group();let edge,fill;
  const M=(op)=>new THREE.MeshBasicMaterial({color:MGCOL,transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide});
  if(kind==='circle'){edge=new THREE.Mesh(new THREE.RingGeometry(o.r-.3,o.r,48),M(.85));fill=new THREE.Mesh(new THREE.CircleGeometry(o.r,48),M(.28))}
  else if(kind==='cone'){edge=new THREE.Mesh(new THREE.RingGeometry(o.r-.3,o.r,24,1,-o.a,2*o.a),M(.85));fill=new THREE.Mesh(new THREE.CircleGeometry(o.r,24,-o.a,2*o.a),M(.28))}
  else{edge=new THREE.Mesh(new THREE.PlaneGeometry(o.w,o.len),M(.18));fill=new THREE.Mesh(new THREE.PlaneGeometry(o.w,o.len),M(.32));edge.position.z=-o.len/2;fill.position.z=-o.len/2;
}
  for(const m of[edge,fill]){m.rotation.x=-Math.PI/2;m.position.y=.14;g.add(m)}
  if(kind!=='rect'){edge.rotation.z=0;fill.rotation.z=0}
  g.position.set(o.x-MG.cx,0,o.z-MG.cz);
  // 방향: cone 은 +x 기준 → 바라보는 각도로, rect 는 -z 기준 → 바라보는 각도로
  if(kind==='cone')g.rotation.y=-o.dir;if(kind==='rect')g.rotation.y=-o.dir-Math.PI/2;
  MG.fx.add(g);return{g,fill,kind,o}}
function mgTeleSet(t,k){if(t.kind==='rect'){t.fill.scale.set(1,Math.max(.02,k),1);t.fill.position.z=-t.o.len*k/2}else t.fill.scale.setScalar(Math.max(.02,k))}
function mgInside(kind,o,x,z,pad){pad=pad||MGP.thR;const dx=x-o.x,dz=z-o.z;
  if(kind==='circle')return Math.hypot(dx,dz)<o.r+pad;
  if(kind==='cone'){const d=Math.hypot(dx,dz);if(d>o.r+pad)return false;if(d<1.5)return true;let a=Math.atan2(dz,dx)-o.dir;a=Math.atan2(Math.sin(a),Math.cos(a));return Math.abs(a)<o.a+pad/d}
  const ux=Math.cos(o.dir),uz=Math.sin(o.dir);const t=dx*ux+dz*uz,p=Math.abs(-dx*uz+dz*ux);return t>-pad&&t<o.len+pad&&p<o.w/2+pad}
function mgDrop(o){if(!o)return;try{o.parent&&o.parent.remove(o);o.traverse(c=>{if(c.geometry)c.geometry.dispose();if(c.material&&c.material.dispose)c.material.dispose()})}catch(e){}}
// ---------- 별 사탕 ----------
function mgStarMesh(){const s=new THREE.Shape();for(let i=0;i<10;i++){const r=i%2?0.55:1.25,a=i/10*Math.PI*2-Math.PI/2;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y)}s.closePath();
  const g=new THREE.Group();const st=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:.45,bevelEnabled:true,bevelSize:.12,bevelThickness:.12,bevelSegments:2}),new THREE.MeshLambertMaterial({color:'#ffd23a',emissive:'#7a5a00'}));st.position.y=1.9;g.add(st);
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.2,1.6,32),new THREE.MeshBasicMaterial({color:'#ffd23a',transparent:true,opacity:.8,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.12;g.add(ring);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,7,16,1,true),new THREE.MeshBasicMaterial({color:'#fff1a8',transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide}));beam.position.y=3.5;g.add(beam);
  g.userData.st=st;return g}
function mgSpawnStar(){const th=MG.th,mo=MG.mo;let best=null;
  for(let i=0;i<40;i++){const a=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*(MG.R-3);const x=MG.cx+Math.cos(a)*r,z=MG.cz+Math.sin(a)*r;
    const dm=Math.hypot(x-mo.x,z-mo.z),dt=Math.hypot(x-th.x,z-th.z);const sc=Math.min(dm,8)*.5+Math.min(dt,20)+Math.random()*3;if(dm<6||dt<12)continue;if(!best||sc>best[2])best=[x,z,sc]}
  if(!best)best=[MG.cx,MG.cz,0];const g=mgStarMesh();g.position.set(best[0]-MG.cx,0,best[1]-MG.cz);MG.g.add(g);MG.star={x:best[0],z:best[1],g}}
// ---------- 시작 · 끝 ----------
function mgStart(role,kind){MG.role=role;MG.kind=kind||MGK[(Math.random()*MGK.length)|0];MG.on=true;MG.over=false;MG.pause=false;MG.t=0;MG.cdn=3;MG.stars=0;
  camPreview=false;mgSkyHook();try{clearStage();STAGE.on=false}catch(e){}
  const [cx,cz]=mgSpot();MG.cx=cx;MG.cz=cz;mgHideWorld(true);mgBuild();
  const tm=mgThiefModel();const mm=mgMonModel(MG.kind);MG.g.add(tm.g);MG.g.add(mm.g);
  MG.th={x:cx,z:cz+MG.R-4,face:Math.PI,hp:MGP.hp,inv:0,dashT:0,dashCd:0,dx:0,dz:-1,kx:0,kz:0,slow:0,m:tm,moving:false};
  MG.mo={x:cx,z:cz-MG.R+6,face:Math.PI/2,cd:{stomp:1.5,swipe:1,sp:3},act:null,m:mm,moving:false,fade:1};
  MG.minis=[];MG.webs=[];MG.shots=[];MG.stat={atk:{},hit:0,star:0};MG.ai={t:0,tx:0,tz:0,react:[.45,.25,.1][AIL==null?1:AIL]};
  mgFacing();mgSpawnStar();mgPlace();
  show('mini');mgHud(true);mgHudSync();SFX.click();try{musicGame()}catch(e){}}
function mgEnd(win,why){if(MG.over)return;MG.over=true;MG.why=why;const me=(MG.role==='thief')===(win==='thief');
  try{(me?SFX.win:SFX.lose)()}catch(e){}
  setTimeout(()=>{if(!MG.on)return;const r=$('mgRes');r.hidden=false;
    r.querySelector('.mg-rk').textContent=me?'이겼어요!':'졌어요';r.querySelector('.mg-rk').className='mg-rk '+(me?'win':'lose');
    r.querySelector('.mg-rt').textContent=win==='thief'?'쿠키 도둑이 별 사탕을 다 모았어요':why==='hp'?MGN[MG.kind]+'이(가) 도둑을 잡았어요':'시간이 다 됐어요 · 몬스터 승리';
    r.querySelector('.mg-rs').innerHTML=Array.from({length:MGP.stars},(_,i)=>`<i class="${i<MG.stars?'on':''}">${MGI.star}</i>`).join('')},900)}
function mgExit(){MG.on=false;$('mgRes').hidden=true;$('mgPauseM').hidden=true;mgHud(false);
  try{for(const o of[MG.th&&MG.th.m.g,MG.mo&&MG.mo.m.g])if(o)o.parent&&o.parent.remove(o)}catch(e){}for(const m of MG.minis||[])mgDrop(m.m.g);
  mgDrop(MG.g);MG.g=null;mgHideWorld(false);try{titleScreen()}catch(e){show('title')}}
function mgAgain(){const r=MG.role,k=MG.kind;$('mgRes').hidden=true;try{for(const m of MG.minis||[])mgDrop(m.m.g)}catch(e){}mgDrop(MG.g);MG.g=null;MG.on=false;mgStart(r,k)}
// ---------- 입력 ----------
const MGIN={jx:0,jy:0,id:null,ox:0,oy:0};
function mgMove(){const K=IN.keys||{};let x=MGIN.jx+((K.KeyD||K.ArrowRight)?1:0)-((K.KeyA||K.ArrowLeft)?1:0),y=MGIN.jy+((K.KeyS||K.ArrowDown)?1:0)-((K.KeyW||K.ArrowUp)?1:0);const L=Math.hypot(x,y);if(L>1){x/=L;y/=L}return[x,y]}
function mgAct(a){if(!MG.on||MG.over||MG.pause||MG.cdn>0)return;if(MG.role==='thief'){if(a==='dash')mgDash(MG.th)}else mgAttack(a)}
// ---------- 도둑 ----------
function mgDash(th){if(th.dashCd>0||th.dashT>0)return;let[dx,dz]=[th.dx,th.dz];const L=Math.hypot(dx,dz)||1;th.ddx=dx/L;th.ddz=dz/L;th.dashT=MGP.dashT;th.dashCd=MGP.dashCd;try{SFX.dash()}catch(e){}}
function mgHurt(src,why){const th=MG.th;if(MG.over||th.inv>0||th.dashT>0)return false;th.hp--;MG.stat.hit++;MG.stat.src=MG.stat.src||{};MG.stat.src[why||'?']=(MG.stat.src[why||'?']||0)+1;th.inv=MGP.inv;try{SFX.bonk()}catch(e){}
  const dx=th.x-(src?src.x:MG.mo.x),dz=th.z-(src?src.z:MG.mo.z),L=Math.hypot(dx,dz)||1;th.kx=dx/L*9;th.kz=dz/L*9;MG.shake=.5;mgFlash();
  if(th.hp<=0)mgEnd('mon','hp');return true}
function mgThTick(dt,mv){const th=MG.th;th.inv=Math.max(0,th.inv-dt);th.dashCd=Math.max(0,th.dashCd-dt);
  let[mx,mz]=mv;let sp=MGP.thSpd;let slow=1;for(const w of MG.webs)if(Math.hypot(th.x-w.x,th.z-w.z)<w.r)slow=.5;
  if(th.dashT>0){th.dashT-=dt;th.x+=th.ddx*MGP.dashSpd*dt;th.z+=th.ddz*MGP.dashSpd*dt}
  else{const L=Math.hypot(mx,mz);if(L>.05){th.dx=mx/L;th.dz=mz/L;th.x+=mx*sp*slow*dt;th.z+=mz*sp*slow*dt}th.moving=L>.05}
  th.x+=th.kx*dt;th.z+=th.kz*dt;th.kx*=Math.pow(.02,dt);th.kz*=Math.pow(.02,dt);
  mgClamp(th,MGP.thR+.4);
  // 몬스터와 부딪힘
  const mo=MG.mo;if(Math.hypot(th.x-mo.x,th.z-mo.z)<MGP.moR+MGP.thR&&mo.fade>.5)mgHurt(mo,'body');
  // 별 사탕
  const s=MG.star;if(s){if(Math.hypot(th.x-s.x,th.z-s.z)<1.9&&!(th.dashT>0))s.hold=(s.hold||0)+dt;else s.hold=Math.max(0,(s.hold||0)-dt*2);
    if(s.hold>=MGP.hold){mgDrop(s.g);MG.star=null;MG.stars++;MG.stat.star++;try{SFX.candy()}catch(e){}mgPop(s.x,s.z);if(MG.stars>=MGP.stars)mgEnd('thief','stars');else mgSpawnStar()}}}
function mgClamp(o,r){const dx=o.x-MG.cx,dz=o.z-MG.cz,L=Math.hypot(dx,dz),M=MG.R-r;if(L>M){o.x=MG.cx+dx/L*M;o.z=MG.cz+dz/L*M}}
// ---------- 몬스터 ----------
function mgFacing(){const mo=MG.mo,th=MG.th;mo.face=Math.atan2(th.z-mo.z,th.x-mo.x)}
function mgAttack(a){const mo=MG.mo;if(mo.act||mo.charge||MG.over)return;if(!(mo.cd[a]>0))MG.stat.atk[a]=(MG.stat.atk[a]||0)+1;
  if(a==='stomp'){if(mo.cd.stomp>0)return;mo.cd.stomp=MGP.stomp.cd;const o={x:mo.x,z:mo.z,r:MGP.stomp.r};mo.act={a,t:0,T:MGP.stomp.w,tele:mgTele('circle',o),kind:'circle',o};try{play(mo.m,'1H_Melee_Attack_Chop',.1,true)}catch(e){}}
  else if(a==='swipe'){if(mo.cd.swipe>0)return;mo.cd.swipe=MGP.swipe.cd;const o={x:mo.x,z:mo.z,r:MGP.swipe.r,a:MGP.swipe.a,dir:mo.face};mo.act={a,t:0,T:MGP.swipe.w,tele:mgTele('cone',o),kind:'cone',o};try{play(mo.m,'1H_Melee_Attack_Chop',.1,true)}catch(e){}}
  else if(a==='sp'){if(mo.cd.sp>0)return;mo.cd.sp=MGP.sp.cd;mgSpecial()}}
function mgSpecial(){const mo=MG.mo,k=MG.kind,f=mo.face,ux=Math.cos(f),uz=Math.sin(f);
  if(k==='skel'){mo.act={a:'sp',t:0,T:.5,kind:'none',o:{}};mo.act.end=()=>{for(let i=0;i<4;i++){const a=f+(i-1.5)*.75;const m=makeSlime(witchLook().slime);m.g.scale.setScalar(1.2);MG.g.add(m.g);
      MG.minis.push({x:mo.x+Math.cos(a)*3,z:mo.z+Math.sin(a)*3,t:7,m})}try{SFX.squish()}catch(e){}}}
  else if(k==='bat'){const o={x:mo.x,z:mo.z,w:3.2,len:19,dir:f};mo.act={a:'sp',t:0,T:.65,tele:mgTele('rect',o),kind:'rect',o}}
  else if(k==='ghost'){let tx=mo.x+ux*10,tz=mo.z+uz*10;const p={x:tx,z:tz};mgClamp(p,MGP.moR);const o={x:p.x,z:p.z,r:3.3};mo.act={a:'sp',t:0,T:.85,tele:mgTele('circle',o),kind:'circle',o,warp:p}}
  else if(k==='soldier'){const o={x:mo.x,z:mo.z,w:1.6,len:24,dir:f};mo.act={a:'sp',t:0,T:.4,tele:mgTele('rect',o),kind:'none',o};mo.act.end=()=>{const sp=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,3.4,8),new THREE.MeshLambertMaterial({color:'#ff5f9e'}));sp.rotation.set(Math.PI/2,0,0);const g=new THREE.Group();g.add(sp);g.rotation.y=-f+Math.PI/2;g.position.set(mo.x-MG.cx,1.6,mo.z-MG.cz);MG.g.add(g);MG.shots.push({x:mo.x,z:mo.z,ux,uz,d:0,g});try{SFX.pew()}catch(e){}}}
  else if(k==='bear'){const o={x:mo.x,z:mo.z,w:4,len:13,dir:f};mo.act={a:'sp',t:0,T:.55,tele:mgTele('rect',o),kind:'none',o};mo.act.end=()=>{mo.charge={ux,uz,d:13};try{play(mo.m,'Running_A')}catch(e){}}}
  else if(k==='spider'){const p={x:mo.x+ux*8,z:mo.z+uz*8};mgClamp(p,1);const o={x:p.x,z:p.z,r:3.8};mo.act={a:'sp',t:0,T:.55,tele:mgTele('circle',o),kind:'none',o};mo.act.end=()=>{const w=new THREE.Group();
      const web=new THREE.Mesh(new THREE.CircleGeometry(o.r,24),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.45,depthWrite:false}));web.rotation.x=-Math.PI/2;web.position.y=.1;w.add(web);
      for(let i=0;i<8;i++){const s=new THREE.Mesh(new THREE.PlaneGeometry(.12,o.r*2),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide}));s.rotation.set(-Math.PI/2,0,i*Math.PI/8);s.position.y=.12;w.add(s)}
      for(const rr of[1.3,2.6,3.6]){const c=new THREE.Mesh(new THREE.RingGeometry(rr-.07,rr+.07,24),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide}));c.rotation.x=-Math.PI/2;c.position.y=.12;w.add(c)}
      w.position.set(o.x-MG.cx,0,o.z-MG.cz);MG.g.add(w);MG.webs.push({x:o.x,z:o.z,r:o.r,t:6,g:w});try{SFX.squish()}catch(e){}}}}
function mgMoTick(dt,mv){const mo=MG.mo,th=MG.th;for(const k in mo.cd)mo.cd[k]=Math.max(0,mo.cd[k]-dt);
  if(mo.charge){const c=mo.charge,st=Math.min(c.d,20*dt);mo.x+=c.ux*st;mo.z+=c.uz*st;c.d-=st;mgClamp(mo,MGP.moR);if(Math.hypot(th.x-mo.x,th.z-mo.z)<MGP.moR+1)mgHurt(mo,'charge');if(c.d<=0.01||Math.hypot(mo.x-MG.cx,mo.z-MG.cz)>=MG.R-MGP.moR-.05){mo.charge=null}}
  else if(mo.act){const A=mo.act;A.t+=dt;const k=Math.min(1,A.t/A.T);if(A.tele)mgTeleSet(A.tele,k);
    if(A.a==='sp'&&MG.kind==='ghost')mo.fade=1-k*.85;
    if(A.t>=A.T){if(A.kind!=='none'&&mgInside(A.kind,A.o,th.x,th.z))mgHurt(A.o,A.a==='sp'?MG.kind:A.a);
      if(A.warp){mo.x=A.warp.x;mo.z=A.warp.z;mo.fade=1}
      if(A.end)A.end();if(A.a==='stomp'){MG.shake=.35;mgPop(A.o.x,A.o.z,'#ff9ec7')}
      if(A.tele)mgDrop(A.tele.g);mo.act=null;try{play(mo.m,'Idle')}catch(e){}}}
  else{const[mx,mz]=mv;const L=Math.hypot(mx,mz);if(L>.05){mo.x+=mx*MGP.moSpd*dt;mo.z+=mz*MGP.moSpd*dt;mo.face=Math.atan2(mz,mx)}mo.moving=L>.05;mgClamp(mo,MGP.moR)}
  // 작은 슬라임
  for(const s of MG.minis){s.t-=dt;const dx=th.x-s.x,dz=th.z-s.z,L=Math.hypot(dx,dz)||1;s.x+=dx/L*5.1*dt;s.z+=dz/L*5.1*dt;s.face=Math.atan2(dx,dz);if(L<1.4&&mgHurt(s,'mini'))s.t=0}
  for(const s of MG.minis.filter(s=>s.t<=0))mgDrop(s.m.g);MG.minis=MG.minis.filter(s=>s.t>0);
  for(const w of MG.webs){w.t-=dt;if(w.t<1)w.g.traverse(c=>{if(c.material)c.material.opacity*=.95})}for(const w of MG.webs.filter(w=>w.t<=0))mgDrop(w.g);MG.webs=MG.webs.filter(w=>w.t>0);
  for(const s of MG.shots){const st=16*dt;s.x+=s.ux*st;s.z+=s.uz*st;s.d+=st;s.g.position.set(s.x-MG.cx,1.6,s.z-MG.cz);if(Math.hypot(th.x-s.x,th.z-s.z)<1.3&&mgHurt(s,'spear'))s.d=99;if(Math.hypot(s.x-MG.cx,s.z-MG.cz)>MG.R)s.d=99}
  for(const s of MG.shots.filter(s=>s.d>=24))mgDrop(s.g);MG.shots=MG.shots.filter(s=>s.d<24)}
// ---------- AI ----------
function mgDanger(x,z){const mo=MG.mo;let d=0;const A=mo.act;if(A&&A.kind!=='none'&&mgInside(A.kind,A.o,x,z,1.2))d+=2+(A.T-A.t<.35?2:0);
  if(A&&A.o&&A.kind==='none'&&A.o.len&&mgInside('rect',A.o,x,z,1.2))d+=2;if(mo.charge&&mgInside('rect',{x:mo.x,z:mo.z,w:4.5,len:mo.charge.d+2,dir:Math.atan2(mo.charge.uz,mo.charge.ux)},x,z))d+=3;
  for(const s of MG.shots)if(mgInside('rect',{x:s.x,z:s.z,w:2.4,len:8,dir:Math.atan2(s.uz,s.ux)},x,z))d+=2;
  const dm=Math.hypot(x-mo.x,z-mo.z);if(dm<MGP.moR+2.5)d+=1.5*(MGP.moR+2.5-dm);for(const s of MG.minis){const q=Math.hypot(x-s.x,z-s.z);if(q<2.4)d+=1.2}
  for(const w of MG.webs)if(Math.hypot(x-w.x,z-w.z)<w.r+.4)d+=.6;
  const dc=Math.hypot(x-MG.cx,z-MG.cz);if(dc>MG.R-1.2)d+=1;return d}
function mgThiefAI(dt){const th=MG.th,ai=MG.ai,s=MG.star;ai.tt=(ai.tt||0)-dt;if(ai.tt>0&&ai.mv)return ai.mv;ai.tt=ai.react;
  const goal=s?[s.x-th.x,s.z-th.z]:[MG.cx-th.x,MG.cz-th.z];const gl=Math.hypot(...goal)||1;let best=null;
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2,ux=Math.cos(a),uz=Math.sin(a);let dg=0;for(const k of[1.4,3,4.6])dg+=mgDanger(th.x+ux*k,th.z+uz*k)*(k<2?1.3:1);
    const sc=(ux*goal[0]+uz*goal[1])/gl*1.0-dg*1.6;if(!best||sc>best[0])best=[sc,ux,uz]}
  const here=mgDanger(th.x,th.z);if(here>=3&&th.dashCd<=0&&Math.random()<[.4,.75,.95][AIL==null?1:AIL]){th.dx=best[1];th.dz=best[2];mgDash(th)}
  ai.mv=[best[1],best[2]];return ai.mv}
function mgMonAI(dt){const mo=MG.mo,th=MG.th,ai=MG.ai;const dx=th.x-mo.x,dz=th.z-mo.z,d=Math.hypot(dx,dz);const lvl=AIL==null?1:AIL;
  if(!mo.act&&!mo.charge){ai.mt=(ai.mt||0)-dt;if(ai.mt<=0){ai.mt=ai.react*.8;
      const f=Math.atan2(dz,dx);
      if(d<MGP.stomp.r-.4&&mo.cd.stomp<=0&&Math.random()<.7){mgAttack('stomp');return[0,0]}
      if(d<MGP.swipe.r-.5&&mo.cd.swipe<=0){mo.face=f;mgAttack('swipe');return[0,0]}
      if(mo.cd.sp<=0){const k=MG.kind;let ok=false;
        if(k==='skel')ok=d<16;else if(k==='ghost')ok=d>8&&d<13&&Math.random()<.5;else if(k==='spider'){if(MG.star){const sx=MG.star.x-th.x,sz=MG.star.z-th.z;mo.face=Math.atan2(th.z+sz*.45-mo.z,th.x+sx*.45-mo.x);ok=Math.hypot(th.x+sx*.45-mo.x,th.z+sz*.45-mo.z)<11}}
        else ok=d<(k==='bat'?17:k==='soldier'?20:12);
        if(ok){if(k!=='spider'){const lead=lvl>=1?.35:0;mo.face=Math.atan2(th.z+th.dz*MGP.thSpd*lead-mo.z,th.x+th.dx*MGP.thSpd*lead-mo.x)}mgAttack('sp');return[0,0]}}}
    // 별 사탕과 도둑 사이를 지키며 다가가요
    let tx=th.x,tz=th.z;if(MG.star&&d>8){tx=(th.x*2+MG.star.x)/3;tz=(th.z*2+MG.star.z)/3}
    const ex=tx-mo.x,ez=tz-mo.z,L=Math.hypot(ex,ez)||1;const sp=[.75,.9,1][lvl];return[ex/L*sp,ez/L*sp]}
  return[0,0]}
// ---------- 한 프레임 ----------
function mgTick(dt){if(!MG.on||!MG.g)return;
  if(!MG.pause&&!MG.over){if(MG.cdn>0){const p=Math.ceil(MG.cdn);MG.cdn-=dt;if(Math.ceil(MG.cdn)!==p&&MG.cdn>0)try{SFX.click()}catch(e){}}
    else{MG.t+=dt;const mine=mgMove();const thMv=MG.role==='thief'&&!MG.both?mine:mgThiefAI(dt),moMv=MG.role==='mon'&&!MG.both?mine:mgMonAI(dt);
      mgThTick(dt,thMv);mgMoTick(dt,moMv);if(MG.t>=MG.T)mgEnd('mon','time')}}
  // 모습
  const th=MG.th,mo=MG.mo;const tg=th.m.g;tg.position.set(th.x-MG.cx,0,th.z-MG.cz);tg.rotation.y=Math.atan2(th.dx,th.dz);
  try{play(th.m,th.dashT>0||th.moving?'Running_A':'Idle')}catch(e){}mgUpdModel(th.m,dt*(th.dashT>0?1.8:1));
  tg.visible=!(th.inv>0&&!(th.dashT>0)&&Math.floor(performance.now()/90)%2);
  const mg=mo.m.g;mg.position.set(mo.x-MG.cx,0,mo.z-MG.cz);mg.rotation.y=Math.atan2(Math.cos(mo.face),Math.sin(mo.face));
  if(!mo.act&&!mo.charge)try{play(mo.m,mo.moving?'Running_A':'Idle')}catch(e){}mgUpdModel(mo.m,dt);try{setOpacity(mo.m,mo.fade)}catch(e){}
  for(const s of MG.minis){s.m.g.position.set(s.x-MG.cx,0,s.z-MG.cz);s.m.g.rotation.y=s.face||0;mgUpdModel(s.m,dt)}
  if(MG.star){const t=performance.now()/1000,S=MG.star;const st=S.g.userData.st;st.rotation.y=t*2;st.position.y=1.9+Math.sin(t*3)*.25;
    if(!S.g.userData.hr){const hr=new THREE.Mesh(new THREE.RingGeometry(1.75,2.25,40,1,Math.PI/2,Math.PI*2),new THREE.MeshBasicMaterial({color:'#ff5f9e',depthWrite:false,side:THREE.DoubleSide}));hr.rotation.x=-Math.PI/2;hr.position.y=.13;S.g.add(hr);S.g.userData.hr=hr}
    const k=Math.min(1,(S.hold||0)/MGP.hold);S.g.userData.hr.visible=k>0;S.g.userData.hr.geometry.setDrawRange(0,Math.max(1,Math.ceil(40*k))*6)}
  mgPlace();mgHudSync()}
function mgPlace(){// 몬스터 앞 방향 표시
  const mo=MG.mo;if(!MG.arrow){const s=new THREE.Shape();s.moveTo(0,1.1);s.lineTo(.8,-.3);s.lineTo(0,.1);s.lineTo(-.8,-.3);s.closePath();
    MG.arrow=new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide}));MG.arrow.rotation.x=-Math.PI/2;}
  if(MG.arrow.parent!==MG.g)MG.g.add(MG.arrow);const d=MGP.moR+1.2;MG.arrow.position.set(mo.x-MG.cx+Math.cos(mo.face)*d,.13,mo.z-MG.cz+Math.sin(mo.face)*d);MG.arrow.rotation.z=-mo.face-Math.PI/2}
function mgPop(x,z,col){try{burstFx(x,z)}catch(e){}}
function mgFlash(){const f=$('mgFlash');if(!f)return;f.style.transition='none';f.style.opacity=MG.role==='thief'?.6:.25;requestAnimationFrame(()=>{f.style.transition='opacity .5s';f.style.opacity=0})}
// ---------- 카메라 (고정) ----------
// 광장 전체가 위 HUD(시간·별) 아래, 화면 아래 끝 위에 딱 들어오게 거리와 바라보는 점을 찾아요 (화면 크기가 바뀔 때만)
const MGCAM={key:'',d:40,t:0,pitch:.93};
function mgCamPut(d,t){const p=MGCAM.pitch;camera.position.set(MG.cx,Math.sin(p)*d,MG.cz+t+Math.cos(p)*d);camera.lookAt(MG.cx,0,MG.cz+t);camera.updateMatrixWorld();camera.matrixWorldInverse.copy(camera.matrixWorld).invert()}
function mgCamFit(){const W=innerWidth,H=innerHeight,key=W+'x'+H+':'+MG.R;if(MGCAM.key===key)return;MGCAM.key=key;camera.fov=45;camera.aspect=W/H;camera.updateProjectionMatrix();
  const top=Math.min(70,H*.19),bot=H-4,R=MG.R+.8,v=new THREE.Vector3();let best=null;
  const pts=[[0,-R,0],[0,R,0],[-R,0,0],[R,0,0],[-R*.7,-R*.7,0],[R*.7,-R*.7,0],[0,-R+3,5]];
  for(let d=18;d<=140&&!best;d+=.5)for(let t=-10;t<=10;t+=.5){mgCamPut(d,t);let ok=true,ys=[];
    for(const[x,z,y]of pts){v.set(MG.cx+x,y,MG.cz+z).project(camera);const sx=(v.x+1)/2*W,sy=(1-v.y)/2*H;if(z<0)ys.push(sy);if(sy<top||sy>bot||sx<4||sx>W-4){ok=false;break}}
    if(ok){best=[d,t];break}}
  if(best){MGCAM.d=best[0];MGCAM.t=best[1]}}
function mgCam(dt){MG.shake=Math.max(0,(MG.shake||0)-dt*1.5);mgCamFit();mgCamPut(MGCAM.d,MGCAM.t);
  if(MG.shake>0){camera.position.x+=(Math.random()-.5)*MG.shake*.6;camera.position.z+=(Math.random()-.5)*MG.shake*.3}
  scene.fog.near=200;scene.fog.far=700}
{const uc=updCamera;updCamera=function(dt){if(screen==='mini'&&MG.on){mgTick(dt);mgCam(dt);return}return uc.apply(this,arguments)}}
{const vm=updViewModel;updViewModel=function(){if(screen==='mini'){try{if(typeof VM!=='undefined'&&VM&&VM.g)VM.g.visible=false}catch(e){}return}return vm.apply(this,arguments)}}
// ---------- 화면 (HUD) ----------
function mgHud(on){let h=$('mgHud');if(!h){h=document.createElement('div');h.id='mgHud';h.hidden=true;h.innerHTML=`
<div id="mgFlash"></div>
<div class="mg-top"><div class="mg-hp" id="mgHp"></div><div class="mg-mid"><div class="mg-time" id="mgTime">1:30</div><div class="mg-stars" id="mgStars"></div></div><button class="mg-ib" id="mgPauseB" aria-label="일시정지">${MGI.pause}</button></div>
<div class="mg-who" id="mgWho"></div>
<div class="mg-joy" id="mgJoy"><div class="mg-stick" id="mgStick"><i></i></div><span class="mg-jhint"><i></i></span></div>
<div class="mg-btns" id="mgBtns"></div>
<div class="mg-cdn" id="mgCdn"></div>
<div class="mg-pause" id="mgPauseM" hidden><div class="slab mg-pslab"><b>일시정지</b><div class="mg-prow"><button class="mg-big" id="mgHome" aria-label="그만하기">${MGI.home}</button><button class="mg-big go" id="mgResume" aria-label="계속하기">${MGI.play}</button></div></div></div>
<div class="mg-res" id="mgRes" hidden><div class="slab mg-rslab"><div class="mg-rk"></div><p class="mg-rt"></p><div class="mg-rs"></div><div class="mg-prow"><button class="mg-big" id="mgResHome" aria-label="처음으로">${MGI.home}</button><button class="mg-big go" id="mgResAgain" aria-label="다시 하기">${MGI.again}</button></div></div></div>`;
    document.body.appendChild(h);mgWire()}
  h.hidden=!on;if(on){const b=$('mgBtns');b.innerHTML=MG.role==='thief'?`<button class="mg-ab big" data-a="dash" aria-label="대시">${MGI.dash}<i class="cd"></i></button>`:
      `<button class="mg-ab sp" data-a="sp" aria-label="${MGSP[MG.kind][0]}">${MGI.sp[MG.kind]}<i class="cd"></i></button><button class="mg-ab" data-a="swipe" aria-label="휘두르기">${MGI.swipe}<i class="cd"></i></button><button class="mg-ab big" data-a="stomp" aria-label="밟기">${MGI.stomp}<i class="cd"></i></button>`;
    $('mgWho').innerHTML=MG.role==='thief'?`<span class="mg-tag th">${MGI.thief}</span><span>별 사탕 ${MGP.stars}개를 모아요</span>`:`<span class="mg-tag mo">${ART[MG.kind]||''}</span><span>${MGN[MG.kind]} · 도둑을 잡아요</span>`;
    $('mgRes').hidden=true;$('mgPauseM').hidden=true}}
function mgWire(){const joy=$('mgJoy'),stick=$('mgStick'),knob=stick.querySelector('i');
  joy.addEventListener('pointerdown',e=>{e.preventDefault();if(MGIN.id!=null)return;MGIN.id=e.pointerId;MGIN.ox=e.clientX;MGIN.oy=e.clientY;MGIN.jx=MGIN.jy=0;try{joy.setPointerCapture(e.pointerId)}catch(_){}
    stick.style.display='block';stick.style.left=e.clientX+'px';stick.style.top=e.clientY+'px';knob.style.transform='translate(0,0)';joy.classList.add('on')});
  joy.addEventListener('pointermove',e=>{if(e.pointerId!==MGIN.id)return;let dx=e.clientX-MGIN.ox,dy=e.clientY-MGIN.oy;const L=Math.hypot(dx,dy),R=44;if(L>R){MGIN.ox+=dx*(1-R/L);MGIN.oy+=dy*(1-R/L);dx*=R/L;dy*=R/L;stick.style.left=MGIN.ox+'px';stick.style.top=MGIN.oy+'px'}
    const dz=Math.hypot(dx,dy)<6?0:1;MGIN.jx=dz*dx/R;MGIN.jy=dz*dy/R;knob.style.transform=`translate(${dx}px,${dy}px)`});
  const je=e=>{if(e&&e.pointerId!==MGIN.id)return;MGIN.id=null;MGIN.jx=MGIN.jy=0;stick.style.display='none';joy.classList.remove('on')};
  for(const ev of['pointerup','pointercancel','lostpointercapture'])joy.addEventListener(ev,je);
  $('mgBtns').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-a]');if(!b)return;e.preventDefault();mgAct(b.dataset.a)});
  $('mgPauseB').onclick=()=>{if(MG.over)return;MG.pause=true;$('mgPauseM').hidden=false;SFX.click()};
  $('mgResume').onclick=()=>{MG.pause=false;$('mgPauseM').hidden=true;SFX.click()};
  $('mgHome').onclick=()=>{SFX.click();mgExit()};$('mgResHome').onclick=()=>{SFX.click();mgExit()};$('mgResAgain').onclick=()=>{SFX.click();mgAgain()};
  addEventListener('keydown',e=>{if(!MG.on||screen!=='mini')return;if(e.code==='Space')mgAct(MG.role==='thief'?'dash':'stomp');if(e.code==='KeyJ')mgAct('swipe');if(e.code==='KeyK')mgAct('sp');if(e.code==='KeyL')mgAct('dash')})}
function mgHudSync(){if(!MG.on)return;const th=MG.th,mo=MG.mo;
  const hp=$('mgHp'),hk=th.hp+'';if(hp.dataset.k!==hk){hp.dataset.k=hk;hp.innerHTML=Array.from({length:MGP.hp},(_,i)=>`<i class="${i<th.hp?'on':''}">${MGI.heart}</i>`).join('')}
  const sk=MG.stars+'';const se=$('mgStars');if(se.dataset.k!==sk){se.dataset.k=sk;se.innerHTML=Array.from({length:MGP.stars},(_,i)=>`<i class="${i<MG.stars?'on':''}">${MGI.star}</i>`).join('')}
  const left=Math.max(0,Math.ceil(MG.T-MG.t));const ts=Math.floor(left/60)+':'+String(left%60).padStart(2,'0');if($('mgTime').textContent!==ts)$('mgTime').textContent=ts;$('mgTime').classList.toggle('hurry',left<=15);
  const c=$('mgCdn');const n=MG.cdn>0?Math.ceil(MG.cdn)+'':'';if(c.textContent!==n){c.textContent=n;c.classList.toggle('on',!!n)}
  for(const b of document.querySelectorAll('#mgBtns [data-a]')){const a=b.dataset.a;let f=0,T=1;if(a==='dash'){f=th.dashCd;T=MGP.dashCd}else{f=mo.cd[a];T=a==='sp'?MGP.sp.cd:MGP[a].cd}
    const k=Math.max(0,Math.min(1,f/T));b.querySelector('.cd').style.setProperty('--k',k.toFixed(3));b.classList.toggle('wait',k>0||!!mo.act&&a!=='dash')}}
{const st=document.createElement('style');st.textContent=`
#mgHud{position:fixed;inset:0;z-index:20;pointer-events:none;font-family:var(--f-display);color:var(--choco)}
#mgHud>*{pointer-events:auto}#mgHud #mgFlash{position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle,transparent 45%,#ff3d6f 120%);opacity:0}
.mg-top{position:fixed;left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));top:8px;display:flex;align-items:flex-start;justify-content:space-between;pointer-events:none}
.mg-top>*{pointer-events:auto}.mg-hp{display:flex;gap:2px;background:#fff8eecc;border:2.5px solid var(--choco);border-radius:14px;padding:3px 7px;box-shadow:0 3px 0 var(--choco)}
.mg-hp i{width:24px;height:24px;display:block;filter:grayscale(1) opacity(.35)}.mg-hp i.on{filter:none}.mg-hp svg,.mg-stars svg{width:100%;height:100%}
.mg-mid{position:absolute;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:3px}
.mg-time{min-width:64px;text-align:center;font-size:20px;background:#fff8ee;border:2.5px solid var(--choco);border-radius:14px;padding:1px 10px;box-shadow:0 3px 0 var(--choco)}.mg-time.hurry{background:#ffd0dc;color:#c0264f}
.mg-stars{display:flex;gap:1px;background:#4a2a1ab0;border-radius:12px;padding:2px 6px}.mg-stars i{width:20px;height:20px;display:block;filter:grayscale(1) brightness(1.5) opacity(.55)}.mg-stars i.on{filter:none}
.mg-ib{width:42px;height:42px;border-radius:50%;border:2.5px solid var(--choco);background:#fff8ee;box-shadow:0 3px 0 var(--choco);display:grid;place-items:center;padding:8px;cursor:pointer}.mg-ib svg{width:100%;height:100%}
.mg-who{position:fixed;left:max(10px,env(safe-area-inset-left));top:52px;display:flex;align-items:center;gap:6px;font-size:13px;background:#fff8eecc;border-radius:12px;padding:2px 9px 2px 3px;pointer-events:none}
.mg-tag{width:26px;height:26px;display:grid;place-items:center}.mg-tag svg{width:100%;height:100%}
.mg-joy{position:fixed;left:0;bottom:0;width:46vw;height:62vh;touch-action:none}.mg-jhint{position:absolute;left:max(24px,env(safe-area-inset-left));bottom:22px;width:84px;height:84px;border-radius:50%;border:2.5px dashed #4a2a1a66;display:grid;place-items:center;font-size:11px;color:#4a2a1a99;pointer-events:none}
.mg-jhint i{width:34px;height:34px;border-radius:50%;background:#ffffff88;border:2.5px solid #4a2a1a55}.mg-joy.on .mg-jhint{opacity:0}.mg-stick{position:fixed;display:none;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;background:#ffffff55;border:3px solid #ffffffcc;pointer-events:none}
.mg-stick i{position:absolute;left:50%;top:50%;width:42px;height:42px;margin:-21px 0 0 -21px;border-radius:50%;background:#fff;border:3px solid var(--choco);box-shadow:0 3px 0 var(--choco)}
.mg-btns{position:fixed;right:max(14px,env(safe-area-inset-right));bottom:14px;display:flex;align-items:flex-end;gap:10px;touch-action:none}
.mg-ab{position:relative;width:58px;height:58px;border-radius:50%;border:3px solid var(--choco);background:#7cc6ff;box-shadow:0 4px 0 var(--choco);display:grid;place-items:center;padding:11px;cursor:pointer;touch-action:none}
.mg-ab.big{width:76px;height:76px;padding:15px;background:#ff5f9e}.mg-ab.sp{background:#b98cff}.mg-ab svg{width:100%;height:100%;position:relative;z-index:1}
.mg-ab .cd{position:absolute;inset:-3px;border-radius:50%;background:conic-gradient(#4a2a1aa8 calc(var(--k,0)*360deg),transparent 0);pointer-events:none;z-index:2}
.mg-ab:active{transform:translateY(2px);box-shadow:0 2px 0 var(--choco)}
.mg-cdn{position:fixed;left:50%;top:44%;transform:translate(-50%,-50%);font-size:96px;color:#fff;-webkit-text-stroke:6px var(--choco);paint-order:stroke;pointer-events:none;opacity:0}.mg-cdn.on{opacity:1}
.mg-pause,.mg-res{position:fixed;inset:0;display:grid;place-items:center;background:#4a2a1a66;z-index:3}
.mg-pslab,.mg-rslab{display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px 26px!important;min-width:260px;max-width:86vw}
.mg-pslab b{font-size:20px}.mg-prow{display:flex;gap:18px;margin-top:4px}
.mg-big{width:64px;height:64px;border-radius:50%;border:3px solid var(--choco);background:#fff8ee;box-shadow:0 4px 0 var(--choco);display:grid;place-items:center;padding:13px;cursor:pointer}.mg-big.go{background:#ff5f9e}.mg-big svg{width:100%;height:100%}
.mg-rk{font-size:30px;-webkit-text-stroke:5px var(--choco);paint-order:stroke;color:#fff}.mg-rk.win{color:#ffd23a}.mg-rk.lose{color:#9ec3ff}
.mg-rt{margin:0;font-size:15px;text-align:center}.mg-rs{display:flex;gap:3px}.mg-rs i{width:28px;height:28px;filter:grayscale(1) opacity(.35)}.mg-rs i.on{filter:none}.mg-rs svg{width:100%;height:100%}
@media (max-height:340px){.mg-ab{width:50px;height:50px;padding:9px}.mg-ab.big{width:66px;height:66px;padding:13px}.mg-big{width:56px;height:56px}.mg-rk{font-size:24px}.mg-who{top:46px}.mg-hp i{width:20px;height:20px}}`;
document.head.appendChild(st)}

// ---------- 들어가는 곳: 혼자 하기 화면의 '마녀의 미로 | 미니게임' 탭 ----------
let MGTAB='main';
const MGI_MAZE='<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="#fff8ee" stroke="#4a2a1a" stroke-width="1.8"/><path d="M7 3v6h5M17 21v-6h-5v-3M3 15h4M21 9h-5" fill="none" stroke="#4a2a1a" stroke-width="1.8" stroke-linecap="round"/></svg>';
const MGI_MON='<svg viewBox="0 0 24 24"><path d="M4 20c0-8 3.5-14 8-14s8 6 8 14z" fill="#b98cff" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 7 5 3l4 2M17 7l2-4-4 2" fill="#b98cff" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/><circle cx="9.5" cy="12" r="1.5" fill="#4a2a1a"/><circle cx="14.5" cy="12" r="1.5" fill="#4a2a1a"/><path d="M9 16h6" stroke="#4a2a1a" stroke-width="1.6" stroke-linecap="round"/></svg>';
function mgEnsureRole(){if($('mgTabs'))return;const mid=document.querySelector('#role .uni-mid');const seg=document.createElement('div');seg.className='seg mg-tabs';seg.id='mgTabs';
  seg.innerHTML=`<button data-t="main" aria-label="메인 게임">${MGI_MAZE}<b>마녀의 미로</b></button><button data-t="mini" aria-label="미니게임">${MGI_MON}<b>미니게임</b></button>`;
  (mid||$('role').querySelector('.pane-top')).appendChild(seg);
  seg.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b||MGTAB===b.dataset.t)return;MGTAB=b.dataset.t;SFX.card();showRole()});
  const row=$('role').querySelector('.row.roles');
  row.insertAdjacentHTML('beforeend',`<button class="rcard mint" id="mgTh" hidden><span class="mg-rart">${MGI.thief}</span><b>쿠키 도둑</b><small>별 사탕 ${MGP.stars}개 모으기</small></button><button class="rcard grape" id="mgMo" hidden><span class="mg-rart">${MGI_MON}</span><b>거대 몬스터</b><small>도둑 잡기</small></button>`);
  $('mgTh').onclick=async()=>{SFX.click();try{await initAudio()}catch(e){}mgStart('thief')};
  $('mgMo').onclick=()=>{SFX.click();mgPickOpen()}}
{const sr=showRole;showRole=function(){const r=sr.apply(this,arguments);try{mgEnsureRole();const ok=ROLECTX==='ai';$('mgTabs').hidden=!ok;if(!ok)MGTAB='main';const mini=MGTAB==='mini';
    for(const b of $('mgTabs').children)b.classList.toggle('on',b.dataset.t===MGTAB);
    $('mgTh').hidden=$('mgMo').hidden=!mini;
    if(mini){for(const id of['bHero','bDevil','bRankGo'])if($(id))$(id).hidden=true;if($('aiLvl'))$('aiLvl').hidden=false;$('roleNote').textContent='미니게임 · 90초 한 판 · 보상과 등급은 없어요';$('roleKick').textContent='혼자 하기 · 미니게임 · 거대 몬스터'}
  }catch(e){}return r}}
function mgPickOpen(){let m=$('mgPick');if(!m){m=document.createElement('div');m.id='mgPick';m.className='mg-pick';document.body.appendChild(m);
    m.addEventListener('click',async e=>{if(e.target.closest('#mgPickX')){SFX.click();m.hidden=true;return}const b=e.target.closest('[data-k]');if(!b)return;SFX.click();m.hidden=true;try{await initAudio()}catch(_){}mgStart('mon',b.dataset.k)})}
  m.innerHTML=`<div class="slab mg-pk"><div class="mg-pk-top"><b>어떤 몬스터가 될까요?</b><button class="mg-ib" id="mgPickX" aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/></svg></button></div>
    <div class="mg-pk-grid">${MGK.map(k=>`<button class="mg-pk-c" data-k="${k}" aria-label="${MGN[k]}"><span class="mg-pk-art">${ART[k]||''}</span><b>${MGN[k]}</b><small><i>${MGI.sp[k]}</i>${MGSP[k][0]}</small></button>`).join('')}</div></div>`;m.hidden=false}
{const st=document.createElement('style');st.textContent=`
#mgTabs{display:flex;gap:4px}#mgTabs[hidden]{display:none}#mgTabs button{display:flex;align-items:center;gap:5px;padding:3px 10px 3px 5px}#mgTabs svg{width:22px;height:22px;flex:0 0 auto}#mgTabs b{font-size:14px;white-space:nowrap}
.mg-rart{display:grid;place-items:center;width:58%;aspect-ratio:1;max-height:52%}.mg-rart svg{width:100%;height:100%}
.mg-pick{position:fixed;inset:0;z-index:40;display:grid;place-items:center;background:#4a2a1a66}.mg-pick[hidden]{display:none}
.mg-pk{width:min(92vw,560px)!important;max-height:94vh;display:flex;flex-direction:column;gap:8px;padding:10px 14px!important;box-sizing:border-box}
.mg-pk-top{display:flex;align-items:center;justify-content:space-between;font-family:var(--f-display);font-size:17px;color:var(--choco)}
.mg-pk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;min-height:0}
.mg-pk-c{display:flex;flex-direction:column;align-items:center;gap:1px;padding:5px 4px 6px;border-radius:14px;border:2.5px solid var(--choco);background:#fff8ee;box-shadow:0 3px 0 var(--choco);cursor:pointer;font-family:var(--f-display);color:var(--choco);min-width:0}
.mg-pk-art{width:min(56px,11vh);height:min(56px,11vh);display:grid;place-items:center}.mg-pk-art svg{width:100%;height:100%}
.mg-pk-c b{font-size:14px;white-space:nowrap}.mg-pk-c small{display:flex;align-items:center;gap:3px;font-size:12px;background:#b98cff;color:#fff;border-radius:9px;padding:1px 7px 1px 3px;white-space:nowrap}
.mg-pk-c small i{width:16px;height:16px;display:grid;place-items:center}.mg-pk-c small svg{width:100%;height:100%}
@media (max-height:340px){.mg-pk-c b{font-size:13px}.mg-pk{gap:5px;padding:8px 12px!important}}`;document.head.appendChild(st)}

// 하늘 장식(떠다니는 사탕·빛줄기)이 위에서 내려다보는 카메라 앞을 가려서 미니게임에선 숨겨요
function mgSkyHook(){if(!renderer||renderer.__mg)return;renderer.__mg=1;const r0=renderer.render.bind(renderer);renderer.render=function(sc,cam){if(screen==='mini'&&WORLD.sky)WORLD.sky.visible=false;return r0(sc,cam)}}
