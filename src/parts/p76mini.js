// ===== 76차: 미니게임 · 거대 마녀 =====
// 쿠키 도둑 대 거대 마녀. 둘 다 1인칭이에요. 맵은 메인 미로 판 크기.
// 처음엔 안쪽 벽이 없고, 도둑이 사탕을 하나 먹을 때마다 벽이 10개씩 무작위로 솟아요(길은 늘 이어져요).
// 사탕 6개를 다 먹으면 출발한 쪽의 반대편 끝에 출구가 열리고, 도둑이 넘어가면 도둑 승리.
// 거대 마녀(키 8.5m, 벽이 허리)는 느리고 벽을 몸으로 부숴요. 스킬은 마녀 덱 5장(쿨타임 김) + 늘 쓰는 밟기.
// 도둑은 대시 + 고른 스킬 2개(미니게임에 맞게 바뀐 효과). 둘 다 판 전에 스킬을 골라요.
// 모든 공격은 바닥 예고가 먼저 떠서 피할 수 있고, 남는 효과(덫·거미줄·가짜 사탕)는 시간이 지나면 사라져요.
// 3분 한 판 · 도둑 체력 3(하트 반 칸씩) · 미니맵에 서로의 위치가 늘 보여요(망토·투명 때만 빼고) · 보상과 등급 없음.
const MG={on:false,role:'thief',T:180,cx:0,cz:0,g:null,hidden:[],pause:false,over:false,cdn:0,t:0,rise:[],parts:[],hits:[],items:[]};
const MGP={thSpd:6.4,dashSpd:17,dashT:.26,dashCd:3,thR:.45,hp:3,inv:2.1,moSpd:4,moR:1.9,moH:8.5,eyeTh:1.62,eyeMo:7.7,candies:6,wallsPer:10,stomp:{cd:1,dmg:.5,spd:9,r:.6,range:30}};
// 마녀 카드 → 거대 마녀 스킬 (cd 쿨타임 초)
const MGWS={
 tower:{n:'사탕 폭탄',d:'조준한 곳에 큰 사탕 폭탄을 내리꽂아요',cd:14,range:28},
 ice:{n:'얼음 우박',d:'얼음 사탕 우박을 넓게 뿌려요 · 맞으면 느려져요',cd:14,range:28},
 magnet:{n:'자석 사탕',d:'자석 사탕을 꽂아 주변 도둑을 끌어당겨요',cd:16,range:26},
 spin:{n:'회오리 날',d:'거대 막대사탕을 휘둘러 주위를 크게 쓸어요',cd:12,range:0},
 slip:{n:'미끄럼 덫',d:'조준한 곳에 미끄럼 발판 6개를 흩뿌려요',cd:13,range:26},
 rev:{n:'거꾸로 덫',d:'조준한 곳에 거꾸로 발판 6개를 흩뿌려요',cd:13,range:26},
 trap:{n:'젤리 덫',d:'조준한 곳에 젤리 덫 6개를 흩뿌려요',cd:13,range:26},
 fake:{n:'가짜 사탕',d:'진짜와 똑같은 가짜 사탕 2개를 뿌려요',cd:22,range:0},
 fog:{n:'지도 가리기',d:'도둑 미니맵을 10초 동안 가려요',cd:20,range:0},
 eye:{n:'마녀의 눈',d:'6초 동안 마녀가 빨라져요',cd:16,range:0},
 skel:{n:'마녀 점프',d:'뛰어올라 조준한 곳에 쿵 착지해요',cd:14,range:18},
 spider:{n:'거미줄',d:'거미줄을 쏴서 묶고 바닥에 거미줄을 남겨요',cd:13,range:24},
 ghost:{n:'투명 마녀',d:'5초 동안 투명해지고 미니맵에서 사라져요',cd:20,range:0},
 bat:{n:'박쥐 떼',d:'박쥐 떼가 앞쪽을 길게 휩쓸어요',cd:14,range:0},
 bear:{n:'곰 돌진',d:'앞으로 돌진하며 벽을 다 부숴요',cd:15,range:0},
 soldier:{n:'사탕 창 비',d:'사탕 창을 한 줄로 차례차례 내리꽂아요',cd:13,range:24}};
const MGWK=Object.keys(MGWS),MGWN=3; // 마녀 스킬은 3개 (하나하나 강하게)
// 도둑 스킬 (미니게임 효과)
const MGTS={
 decoy:{d:'분신이 반대쪽으로 달려요 · 마녀 미니맵에 점이 둘',cd:18},cloak:{d:'5초 동안 투명 · 마녀 미니맵에서 사라져요',cd:20},
 gum:{d:'뒤에 큰 껌 · 밟은 마녀는 3초 느려져요',cd:12},sprint:{d:'5초 동안 40% 빨라져요',cd:14},dash2:{d:'대시를 2번 연속 써요',cd:0},
 clean:{d:'느려짐·묶임을 풀고 근처 덫·거미줄을 지워요',cd:14},scope:{d:'6초 동안 높은 곳에서 내려다봐요',cd:18},heal:{d:'체력 1 회복 · 한 판에 한 번',cd:999},
 lure:{d:'미끼를 던져요 · 밟은 마녀는 3초 동안 멈춰 먹어요',cd:16},xray:{d:'6초 동안 벽이 반투명해져요',cd:16},compass:{d:'다음 사탕·출구 가는 길이 5초 빛나요',cd:12},
 smoke:{d:'마녀 화면을 4초 동안 연기로 가려요',cd:18},freeze:{d:'마녀 스킬 쿨타임을 5초 멈춰요',cd:18},tele:{d:'바라보는 쪽으로 3칸 휙 · 벽도 넘어요',cd:14},jump:{d:'바라보는 쪽으로 3칸 휙 · 벽도 넘어요',cd:14}};
const MGTK=Object.keys(MGTS).filter(k=>k!=='jump');
const mgSkName=k=>{try{return SKN[k][0]}catch(e){return k}};
// 젤리 순간이동은 원래 아이콘이 하얀색이라 크림 바탕에서 안 보여서 미니게임용으로 새로 그려요
const MGI_TELE='<svg viewBox="0 0 24 24"><ellipse cx="7.5" cy="18" rx="5.3" ry="2.4" fill="#ff9ec7" stroke="#4a2a1a" stroke-width="1.6"/><ellipse cx="7.5" cy="17.6" rx="2.8" ry="1" fill="#fff" opacity=".7"/><ellipse cx="16.8" cy="7.2" rx="4.8" ry="2.2" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="1.6"/><path d="M7.5 15.2C7.5 11 10 8.6 13.4 8.2" fill="none" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round" stroke-dasharray="2.2 2.4"/><path d="M11.6 5.9l2.7 2.3-2.3 2.6" fill="none" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.5 13.5l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z" fill="#ffd23a" stroke="#4a2a1a" stroke-width=".8" stroke-linejoin="round"/></svg>';
const mgSkSvg=k=>{if(k==='tele'||k==='jump')return MGI_TELE;try{return $(SKB[k]).querySelector('svg').outerHTML}catch(e){return ''}};

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

// ---------- 무대: 메인 미로 판을 그대로 쓰고 안쪽 벽만 비워요 ----------
const MGW=()=>N*C;
function mgBuild(){const g=new THREE.Group();scene.add(g);MG.g=g;MG.fx=new THREE.Group();g.add(MG.fx)}
function mgHideWorld(on){if(on){MG.hidden=[];const hide=o=>{if(o&&o.visible){o.visible=false;MG.hidden.push(o)}};
    try{if(G.hero&&G.hero.m)hide(G.hero.m.g)}catch(e){}try{for(const e of G.ents||[])hide(e.g||e.m&&e.m.g)}catch(e){}try{for(const o of X28.list||[])hide(o)}catch(e){}
    try{hide(WORLD.startFlag);hide(WORLD.exitPillar);hide(WORLD.startG);hide(WORLD.arch)}catch(e){}try{if(G.decoy)hide(G.decoy.g||G.decoy.m&&G.decoy.m.g)}catch(e){}try{for(const c of G.candies||[])hide(c.g)}catch(e){}
    try{if(INV75.g)INV75.g.visible=false}catch(e){}
    B.walls=[];rebuildEdges();syncWallMeshes()}
  else{for(const o of MG.hidden)o.visible=true;MG.hidden=[]}}
const mgOpen=(x,z)=>x>=0&&z>=0&&x<N&&z<N&&!!MASK[idx(x,z)];
// 도둑 칸에서 모든 칸으로 길이 이어져 있는지
function mgAllReach(sx,sz){const seen=new Uint8Array(N*N);const q=[[sx,sz]];seen[idx(sx,sz)]=1;let n=1;
  while(q.length){const[x,z]=q.shift();for(const[dx,dz]of DIRS){const nx=x+dx,nz=z+dz;if(!mgOpen(nx,nz)||seen[idx(nx,nz)]||!canStep(x,z,dx,dz))continue;seen[idx(nx,nz)]=1;n++;q.push([nx,nz])}}
  let tot=0;for(let i=0;i<N*N;i++)tot+=MASK[i]?1:0;return n>=tot}
function mgSegDist(px,pz,w){const L=w.o==='H'?[(w.x-1)*C,w.z*C,(w.x+1)*C,w.z*C]:[w.x*C,(w.z-1)*C,w.x*C,(w.z+1)*C];const qx=clamp(px,L[0],L[2]),qz=clamp(pz,L[1],L[3]);return Math.hypot(px-qx,pz-qz)}
function mgAddWalls(n){const th=MG.th,mo=MG.mo;const[tx,tz]=cellOf(th.x,th.z);let added=0;const fresh=[];
  for(let tries=0;tries<400&&added<n;tries++){const x=1+((Math.random()*(N-1))|0),z=1+((Math.random()*(N-1))|0),o=Math.random()<.5?'H':'V';
    if(![[x-1,z-1],[x,z-1],[x-1,z],[x,z]].every(([a,b])=>mgOpen(a,b)))continue;
    if(B.walls.some(w=>w.x===x&&w.z===z))continue;
    if(o==='H'?(B.S[idx(x-1,z-1)]||B.S[idx(x,z-1)]):(B.E[idx(x-1,z-1)]||B.E[idx(x-1,z)]))continue;
    const w={x,z,o};if(mgSegDist(th.x,th.z,w)<2.2||mgSegDist(mo.x,mo.z,w)<MGP.moR+1.5)continue;
    if(MG.cand&&mgSegDist(MG.cand.x,MG.cand.z,w)<1.6)continue;
    B.walls.push(w);rebuildEdges();if(!mgAllReach(tx,tz)){B.walls.pop();rebuildEdges();continue}added++;fresh.push(w)}
  syncWallMeshes();for(const w of fresh){const m=WORLD.wallMeshes.get(w);if(m){const y=m.position.y;m.position.y=y-8;MG.rise.push({m,y,t:0})}}
  B.ver=(B.ver||0)+1;return added}
function mgSmash(o,r){let hit=false;for(const w of B.walls.slice()){if(mgSegDist(o.x,o.z,w)<r+WT/2){B.walls.splice(B.walls.indexOf(w),1);hit=true;
    try{mgWallCrumb(w)}catch(e){}}}
  if(hit){rebuildEdges();syncWallMeshes();B.ver=(B.ver||0)+1;try{SFX.crunch()}catch(e){}MG.shake=Math.max(MG.shake||0,.25)}return hit}
// ---------- 캐릭터 ----------
function mgThiefModel(){const m=makeChar('hero',1.85,heroLook());try{play(m,'Idle')}catch(e){}return m}
// 거대 마녀: 보라 드레스 · 큰 모자 · 막대사탕 지팡이. 키 MGP.moH (벽이 허리쯤)
function mgWitchModel(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const mats=[];
  const M=(c,e)=>{const m=new THREE.MeshLambertMaterial({color:c,emissive:e||'#000000'});mats.push(m);return m};
  const dress=new THREE.Mesh(new THREE.ConeGeometry(2.3,5.2,24,1,true),M('#8a4dff'));dress.position.y=2.6;body.add(dress);
  const hem=new THREE.Mesh(new THREE.TorusGeometry(2.25,.22,8,32),M('#ff8cc6'));hem.rotation.x=Math.PI/2;hem.position.y=.15;body.add(hem);
  const belt=new THREE.Mesh(new THREE.CylinderGeometry(1.02,1.02,.35,20),M('#ffd23a'));belt.position.y=4.55;body.add(belt);
  const chest=new THREE.Mesh(new THREE.CylinderGeometry(.85,1.05,1.3,20),M('#7a3ff0'));chest.position.y=5.25;body.add(chest);
  const head=new THREE.Mesh(new THREE.SphereGeometry(1.05,24,18),M('#ffe6d6'));head.position.y=6.55;body.add(head);
  const hair=new THREE.Mesh(new THREE.SphereGeometry(1.12,20,14,0,Math.PI*2,0,Math.PI*.62),M('#b98cff'));hair.position.y=6.62;hair.rotation.x=-.25;body.add(hair);
  for(const sx of[-1,1]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.14,10,8),M('#3a1d50'));eye.position.set(sx*.38,6.62,.93);body.add(eye);
    const ck=new THREE.Mesh(new THREE.CircleGeometry(.2,12),new THREE.MeshBasicMaterial({color:'#ff9ec7',transparent:true,opacity:.8}));mats.push(ck.material);ck.position.set(sx*.62,6.35,.88);ck.rotation.y=sx*.5;body.add(ck)}
  const brim=new THREE.Mesh(new THREE.CylinderGeometry(2.1,2.1,.16,28),M('#5a2db0'));brim.position.y=7.35;body.add(brim);
  const hat=new THREE.Mesh(new THREE.ConeGeometry(1.15,2.3,22),M('#6a35d0'));hat.position.set(0,8.55,-.15);hat.rotation.x=-.18;body.add(hat);
  const band=new THREE.Mesh(new THREE.CylinderGeometry(1.08,1.12,.3,22),M('#ff5f9e'));band.position.y=7.6;body.add(band);
  const star=new THREE.Mesh(new THREE.OctahedronGeometry(.32),M('#ffd23a','#6a5000'));star.position.set(0,7.65,1.12);body.add(star);
  const arms=[];for(const sx of[-1,1]){const a=new THREE.Group();a.position.set(sx*1.05,5.6,0);const arm=new THREE.Mesh(new THREE.CylinderGeometry(.24,.3,2.2,10),M('#7a3ff0'));arm.position.y=-1;a.add(arm);
    const hand=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),M('#ffe6d6'));hand.position.y=-2.15;a.add(hand);a.rotation.z=sx*.35;body.add(a);arms.push(a)}
  // 오른손 막대사탕 지팡이
  const staff=new THREE.Group();const stick=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,4.2,8),M('#fff8ee'));stick.position.y=.2;staff.add(stick);
  const lol=new THREE.Mesh(new THREE.CylinderGeometry(.85,.85,.22,24),M('#ff5f9e'));lol.rotation.x=Math.PI/2;lol.position.y=2.5;staff.add(lol);
  const sw=new THREE.Mesh(new THREE.TorusGeometry(.5,.12,6,20),M('#ffffff'));sw.position.set(0,2.5,.13);staff.add(sw);
  staff.position.set(0,-2.1,0);arms[1].add(staff);
  const k=MGP.moH/9.2;g.scale.setScalar(k);
  const m={g,body,arms,staff,mats,t:0,state:'idle',atkT:0,mixer:{update:dt=>mgWitchAnim(m,dt)}};return m}
function mgWitchAnim(m,dt){m.t+=dt;const b=m.body;const w=m.state==='run';const s=w?Math.sin(m.t*6):0;
  b.position.y=w?Math.abs(s)*.25:Math.sin(m.t*2)*.06;b.rotation.z=w?s*.05:0;
  if(m.atkT>0){m.atkT-=dt;const k=1-Math.max(0,m.atkT)/.6;m.arms[1].rotation.x=-2.6*Math.sin(Math.min(1,k)*Math.PI);m.arms[0].rotation.x=-1.2*Math.sin(Math.min(1,k)*Math.PI)}
  else{m.arms[1].rotation.x=w?-s*.4:0;m.arms[0].rotation.x=w?s*.4:0}}
function mgOpacity(m,o){for(const mt of m.mats){mt.transparent=o<1||mt.opacity<1&&mt.type==='MeshBasicMaterial';if(mt.type!=='MeshBasicMaterial'){mt.opacity=o;mt.depthWrite=o>=1}}}
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

// ---------- 효과음 (격투 느낌) ----------
// 듣는 사람(내 캐릭터)과의 거리로 크기를 줄여요. A.sfx 로 나가서 설정의 효과음 크기를 따라요.
const MGS={};
function mgEar(x,z){if(x==null||!MG.on)return 1;const me=MG.role==='thief'?MG.th:MG.mo;if(!me)return 1;const d=Math.hypot(x-me.x,z-me.z);return Math.max(.12,Math.min(1,14/(d+6)))}
function mgOsc(type,f0,f1,dur,vol,t0=0){if(!A.ctx||!A.sfx)return;const c=A.ctx,t=c.currentTime+t0,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1)o.frequency.exponentialRampToValueAtTime(Math.max(18,f1),t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0004,t+dur);o.connect(g);g.connect(A.sfx);o.start(t);o.stop(t+dur+.05)}
function mgNoise(dur,f0,f1,q,vol,type='lowpass',t0=0){if(!A.ctx||!A.sfx||!A.noise)return;const c=A.ctx,t=c.currentTime+t0,s=c.createBufferSource();s.buffer=A.noise;s.loop=true;const fl=c.createBiquadFilter();fl.type=type;fl.Q.value=q;fl.frequency.setValueAtTime(f0,t);if(f1)fl.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t+dur);
  const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0004,t+dur);s.connect(fl);fl.connect(g);g.connect(A.sfx);s.start(t);s.stop(t+dur+.05)}
Object.assign(MGS,{
 step(x,z){const v=mgEar(x,z);mgOsc('sine',70,32,.32,.5*v);mgNoise(.22,380,90,.7,.22*v)},                       // 거대 마녀 발소리 쿵
 boom(x,z,big){const v=mgEar(x,z)*(big?1:.75);mgOsc('sine',95,26,big?.9:.6,.75*v);mgNoise(big?.9:.55,1800,120,.6,.55*v);mgOsc('square',140,40,.18,.12*v)}, // 폭발
 warn(x,z){const v=Math.max(.35,mgEar(x,z));mgOsc('triangle',520,880,.16,.12*v);mgOsc('triangle',780,1320,.12,.06*v,.05)},  // 예고 경고
 swing(x,z){const v=mgEar(x,z);mgNoise(.38,500,2600,1.4,.35*v,'bandpass')},                                            // 휘두르는 바람
 crunch(x,z){const v=mgEar(x,z);mgNoise(.35,2600,300,.8,.45*v);mgOsc('square',220,60,.12,.12*v);for(let i=0;i<4;i++)mgOsc('square',600+i*170,300,.05,.06*v,.03*i)}, // 벽 부서짐
 rise(){mgOsc('sawtooth',48,90,.7,.07);mgNoise(.7,200,600,.6,.12)},                                                     // 벽 솟음
 candy(){[784,988,1175,1568].forEach((f,i)=>mgOsc('triangle',f,0,.2,.16,i*.06))},                                       // 사탕
 fakeC(){[880,700,520,380].forEach((f,i)=>mgOsc('square',f,0,.14,.08,i*.07))},                                          // 가짜 사탕
 hurt(){mgOsc('sine',180,60,.3,.5);mgNoise(.2,1600,300,.8,.3);mgOsc('square',900,500,.12,.07,.04)},                     // 맞음
 dash(){mgNoise(.25,800,3200,1.6,.25,'bandpass')},
 ice(x,z){const v=mgEar(x,z);for(let i=0;i<5;i++)mgOsc('sine',2200+Math.random()*1800,0,.18,.07*v,i*.03);mgNoise(.15,6000,3000,.6,.12*v,'highpass')},
 zap(x,z){const v=mgEar(x,z);mgOsc('sawtooth',60,120,.9,.12*v);mgOsc('sine',240,480,.9,.08*v)},                         // 자석 윙윙
 web(x,z){const v=mgEar(x,z);mgOsc('square',900,120,.22,.1*v);mgNoise(.2,3000,600,1,.18*v,'bandpass')},
 bats(x,z){const v=mgEar(x,z);for(let i=0;i<10;i++)mgNoise(.06,2500+Math.random()*2000,0,3,.12*v,'bandpass',i*.05)},
 whoosh(x,z){const v=mgEar(x,z);mgNoise(.6,300,1800,1,.3*v,'bandpass')},
 magic(){mgOsc('sine',660,1320,.35,.12);mgOsc('triangle',990,1980,.3,.06,.05)},
 jump(x,z){const v=mgEar(x,z);mgNoise(.5,200,2000,1,.25*v,'bandpass');mgOsc('sine',120,300,.4,.15*v)},
 fanfare(){[523,659,784,1047,1319].forEach((f,i)=>mgOsc('square',f,0,.22,.07,i*.09));mgOsc('triangle',1047,0,.6,.1,.45)},
 tick(){mgOsc('square',1200,0,.05,.06)},go(){mgOsc('square',880,0,.25,.1);mgOsc('square',1320,0,.25,.07)}});
// ---------- 조각(파티클) ----------
const MGPG={};function mgPGeo(k){return MGPG[k]||(MGPG[k]=k==='box'?new THREE.BoxGeometry(.5,.5,.5):k==='tet'?new THREE.TetrahedronGeometry(.45):new THREE.SphereGeometry(.4,6,5))}
function mgBurst(x,z,cols,n,spd,size,y0){for(let i=0;i<n&&MG.parts.length<260;i++){const m=new THREE.Mesh(mgPGeo(['box','tet','ball'][i%3]),new THREE.MeshBasicMaterial({color:cols[i%cols.length],transparent:true}));
  const a=Math.random()*Math.PI*2,u=Math.random();m.position.set(x,(y0||.5)+Math.random(),z);m.scale.setScalar(size*(.6+Math.random()*.8));MG.g.add(m);
  MG.parts.push({m,vx:Math.cos(a)*spd*(.4+u),vz:Math.sin(a)*spd*(.4+u),vy:spd*(.5+Math.random()),life:.8+Math.random()*.6,t:0,spin:Math.random()*8})}}
function mgRing(x,z,r,col,life){const m=new THREE.Mesh(new THREE.RingGeometry(.8,1,40),new THREE.MeshBasicMaterial({color:col||'#ffffff',transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}));
  m.rotation.x=-Math.PI/2;m.position.set(x,.2,z);MG.g.add(m);MG.parts.push({m,ring:r,life:life||.5,t:0})}
function mgPartTick(dt){for(const p of MG.parts){p.t+=dt;const k=p.t/p.life;if(p.ring){const s=.5+p.ring*k;p.m.scale.set(s,s,s);p.m.material.opacity=.9*(1-k)}
    else{p.vy-=22*dt;p.m.position.x+=p.vx*dt;p.m.position.y=Math.max(.15,p.m.position.y+p.vy*dt);p.m.position.z+=p.vz*dt;p.m.rotation.x+=p.spin*dt;p.m.rotation.y+=p.spin*dt;p.m.material.opacity=Math.min(1,(1-k)*2)}}
  for(const p of MG.parts.filter(p=>p.t>=p.life)){MG.g.remove(p.m);p.m.material.dispose();if(p.ring)p.m.geometry.dispose()}MG.parts=MG.parts.filter(p=>p.t<p.life)}
// ---------- 공격 예고 → 맞기 ----------
// h={kind:'circle'|'cone'|'rect', o:{x,z,r|a,dir|w,len}, T, t, dmg, eff, fall:{mesh,y0}, end()}
function mgHit(kind,o,T,opt){opt=opt||{};const h=Object.assign({kind,o,T,t:0,dmg:1},opt);h.tele=mgTele(kind,o);MG.hits.push(h);if(!opt.quiet)MGS.warn(o.x,o.z);
  if(opt.fall){const f=opt.fall;f.mesh.position.set(o.x,f.y0,o.z);MG.g.add(f.mesh)}return h}
function mgHitTick(dt){const th=MG.th;for(const h of MG.hits){h.t+=dt;const k=Math.min(1,h.t/h.T);mgTeleSet(h.tele,k);
    const e=h.tele.g.children[0];if(e&&e.material)e.material.opacity=.55+.4*Math.abs(Math.sin(h.t*(k>.7?22:9)));
    if(h.fall){const f=h.fall;f.mesh.position.y=f.y0*(1-k*k);f.mesh.rotation.y+=dt*3;f.mesh.rotation.x+=dt*(f.spin||0)}
    if(h.t>=h.T){h.done=1;const hit=mgInside(h.kind,h.o,th.x,th.z);
      if(hit){if(h.eff)mgThEffect(h.eff,h);if(h.dmg)mgHurt(h.o,h.why||'hit',h.dmg)}
      if(h.decoyHit&&MG.decoy)for(const dd of[MG.decoy])if(mgInside(h.kind,h.o,dd.x,dd.z))dd.t=0;
      if(h.end)h.end(hit);try{mgImpactFx(h)}catch(e){}if(h.fall)mgDrop(h.fall.mesh);mgDrop(h.tele.g)}}
  MG.hits=MG.hits.filter(h=>!h.done)}

// ---------- 모양 만들기 ----------
function mgCandyMesh(){const g=new THREE.Group();const cols=['#ff5f9e','#7cc6ff','#ffd23a','#7ee8c8','#b98cff'];const c=cols[(Math.random()*cols.length)|0];
  const ball=new THREE.Mesh(new THREE.SphereGeometry(.75,18,14),new THREE.MeshLambertMaterial({color:c,emissive:'#3a2a10'}));ball.scale.set(1.25,1,1);
  const s=new THREE.Mesh(new THREE.TorusGeometry(.62,.12,6,20),new THREE.MeshLambertMaterial({color:'#ffffff'}));s.rotation.y=Math.PI/2;ball.add(s);
  for(const sx of[-1,1]){const w=new THREE.Mesh(new THREE.ConeGeometry(.55,.8,10),new THREE.MeshLambertMaterial({color:c}));w.rotation.z=sx*Math.PI/2;w.position.x=sx*1.2;ball.add(w)}
  const hold=new THREE.Group();hold.add(ball);hold.position.y=1.6;g.add(hold);
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.1,1.5,32),new THREE.MeshBasicMaterial({color:'#ffd23a',transparent:true,opacity:.85,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.12;g.add(ring);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.7,.7,40,16,1,true),new THREE.MeshBasicMaterial({color:'#fff1a8',transparent:true,opacity:.25,depthWrite:false,side:THREE.DoubleSide,fog:false}));beam.position.y=20;g.add(beam);
  g.userData.hold=hold;return g}
function mgBombMesh(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(1.9,20,16),new THREE.MeshLambertMaterial({color:'#ff5f9e',emissive:'#401020'}));g.add(b);
  for(let i=0;i<3;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(1.92,.18,6,28),new THREE.MeshLambertMaterial({color:'#ffffff'}));t.rotation.set(Math.PI/2,i*1.05,0);g.add(t)}
  for(const sx of[-1,1]){const w=new THREE.Mesh(new THREE.ConeGeometry(1.1,1.6,10),new THREE.MeshLambertMaterial({color:'#ff5f9e'}));w.rotation.z=sx*Math.PI/2;w.position.x=sx*2.6;g.add(w)}return g}
function mgIceMesh(){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.9),new THREE.MeshLambertMaterial({color:'#bfeaff',emissive:'#1a4a6a',transparent:true,opacity:.92}));m.scale.set(.8,1.6,.8);return m}
function mgSpearMesh(){const g=new THREE.Group();const s=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,4.4,8),new THREE.MeshLambertMaterial({color:'#fff8ee'}));s.position.y=2.4;g.add(s);
  for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.35,8),new THREE.MeshLambertMaterial({color:'#ff5f9e'}));r.position.y=.9+i*1;g.add(r)}
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.42,1,8),new THREE.MeshLambertMaterial({color:'#ffd23a'}));tip.rotation.x=Math.PI;tip.position.y=-.3;g.add(tip);return g}
function mgMagnetMesh(){const g=new THREE.Group();const u=new THREE.Mesh(new THREE.TorusGeometry(1.2,.45,10,24,Math.PI),new THREE.MeshLambertMaterial({color:'#ff4a4a'}));u.rotation.z=Math.PI;u.position.y=1.6;g.add(u);
  for(const sx of[-1,1]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.46,.46,.6,12),new THREE.MeshLambertMaterial({color:'#e8eef5'}));t.position.set(sx*1.2,.3,0);g.add(t)}return g}
function mgFlat(r,col,op,y){const m=new THREE.Mesh(new THREE.CircleGeometry(r,28),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=y||.11;return m}
function mgWebMesh(r){const w=new THREE.Group();w.add(mgFlat(r,'#ffffff',.3,.1));
  for(let i=0;i<8;i++){const s=new THREE.Mesh(new THREE.PlaneGeometry(.14,r*2),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}));s.rotation.set(-Math.PI/2,0,i*Math.PI/8);s.position.y=.13;w.add(s)}
  for(const k of[.35,.65,.95]){const c=new THREE.Mesh(new THREE.RingGeometry(r*k-.08,r*k+.08,28),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}));c.rotation.x=-Math.PI/2;c.position.y=.13;w.add(c)}return w}
function mgPadMesh(k){let tex=null;try{tex=trapTex73(k)}catch(e){}const m=new THREE.Mesh(new THREE.PlaneGeometry(3.2,3.2),new THREE.MeshBasicMaterial({map:tex,color:tex?'#ffffff':'#ffc23a',transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4}));m.rotation.x=-Math.PI/2;m.position.y=.14;const g=new THREE.Group();g.add(m);return g}
// ---------- 놓는 것(덫·거미줄·껌·미끼·자석·가짜 사탕) ----------
function mgItem(type,x,z,t,r,g,extra){const it=Object.assign({type,x,z,t,T:t,r,g},extra||{});if(g){g.position.set(x,0,z);MG.g.add(g)}MG.items.push(it);return it}
function mgItemTick(dt){const th=MG.th,mo=MG.mo;
  for(const it of MG.items){it.t-=dt;const dT=Math.hypot(th.x-it.x,th.z-it.z),dM=Math.hypot(mo.x-it.x,mo.z-it.z);
    if(it.g&&it.t<1.2)it.g.traverse(c=>{if(c.material&&c.material.opacity!=null){c.material.transparent=true;c.material.opacity*=.94}});
    if(it.type==='slip'&&dT<it.r&&!(th.dashT>0)){if(!(th.slipT>0)){mgMsg('미끄러워요!',1);MGS.whoosh(th.x,th.z)}th.slipT=1.2}
    else if(it.type==='rev'&&dT<it.r&&!(th.dashT>0)){if(!(th.revT>0)){mgMsg('방향이 거꾸로!',1.2);MGS.magic()}th.revT=4}
    else if(it.type==='trap'&&dT<it.r&&!(th.dashT>0)){th.rootT=1.5;it.t=0;mgMsg('젤리 덫에 걸렸어요!',1.2);MGS.web(it.x,it.z)}
    else if(it.type==='web'&&dT<it.r)th.webIn=1;
    else if(it.type==='magnet'){if(dT<it.r&&dT>.6){const k=3.2*dt;th.x+=(it.x-th.x)/dT*k;th.z+=(it.z-th.z)/dT*k}it.g.rotation.y+=dt*4;it.zt=(it.zt||0)-dt;if(it.zt<=0){it.zt=.6;MGS.zap(it.x,it.z)}}
    else if(it.type==='gum'&&dM<it.r+MGP.moR*.6){if(!(mo.slowT>0)){mgMsg(MG.role==='mon'?'껌을 밟았어요! 느려져요':'마녀가 껌을 밟았어요!',1.2);MGS.web(it.x,it.z)}mo.slowT=3}
    else if(it.type==='lure'&&dM<it.r+MGP.moR*.6&&!(mo.eatT>0)){mo.eatT=3;it.t=0;mgMsg(MG.role==='mon'?'미끼를 먹느라 멈췄어요!':'마녀가 미끼를 먹어요!',1.4);MGS.candy()}
    else if(it.type==='fake'&&dT<1.7){it.t=0;MGS.fakeC();mgBurst(it.x,it.z,['#b98cff','#3a1d50','#ffffff'],18,7,.6,1.5);mgMsg(MG.role==='thief'?'가짜 사탕이었어요! 벽이 생겨요':'도둑이 가짜 사탕을 먹었어요!',1.6);if(mgAddWalls(MGP.wallsPer))MGS.rise()}
    if(it.type==='fake'&&it.g){const hd=it.g.userData.hold;hd.rotation.y+=dt*2;hd.position.y=1.6+Math.sin(performance.now()/300)*.2}}
  for(const it of MG.items.filter(i=>i.t<=0))if(it.g)mgDrop(it.g);MG.items=MG.items.filter(i=>i.t>0)}
// ---------- 거대 마녀 스킬 ----------
function mgAim(){const mo=MG.mo;const fx=-Math.sin(mo.yaw),fz=-Math.cos(mo.yaw);const cp=Math.cos(mo.pitch),sp=Math.sin(mo.pitch);
  // 눈높이에서 바라보는 방향으로 땅에 닿는 곳
  let d=sp<-.03?MGP.eyeMo/(-sp)*cp:40;return{x:mo.x+fx*d,z:mo.z+fz*d,d}}
function mgClampPt(p,max){const mo=MG.mo;const dx=p.x-mo.x,dz=p.z-mo.z,L=Math.hypot(dx,dz);if(max&&L>max){p.x=mo.x+dx/L*max;p.z=mo.z+dz/L*max}const W=MGW();p.x=clamp(p.x,1.5,W-1.5);p.z=clamp(p.z,1.5,W-1.5);return p}
function mgScatter(p,r,n){const out=[{x:p.x,z:p.z}];for(let i=1;i<n;i++){const a=i/(n-1)*Math.PI*2+Math.random()*.6,rr=r*(.45+Math.random()*.55);const q={x:p.x+Math.cos(a)*rr,z:p.z+Math.sin(a)*rr};mgClampPt(q,0);out.push(q)}return out}
function mgCast(k,aim){const mo=MG.mo,S=MGWS[k];if(!S||mo.cd[k]>0||MG.over)return false; // 쿨타임만 아니면 언제든 (점프·돌진·먹는 중에도)
  let f=Math.atan2(-Math.cos(mo.yaw),-Math.sin(mo.yaw));let P=aim?{x:aim.x,z:aim.z}:mgAim();if(aim&&aim.drag&&(k==='bat'||k==='bear'))f=Math.atan2(P.z-mo.z,P.x-mo.x);const ux=Math.cos(f),uz=Math.sin(f);mgClampPt(P,S.range||40);
  mo.cd[k]=S.cd;mo.lockT=.45;mo.m.atkT=.6;MG.stat.atk[k]=(MG.stat.atk[k]||0)+1;
  if(typeof MGCAST!=='undefined'&&MGCAST[k]){MGCAST[k]({P,f,ux,uz,mo,S,aim});return true}
  if(k==='tower'){mgHit('circle',{x:P.x,z:P.z,r:4.5},1.5,{fall:{mesh:mgBombMesh(),y0:42,spin:2},why:k,end:()=>{MGS.boom(P.x,P.z,1);mgBurst(P.x,P.z,['#ff5f9e','#ffffff','#ffd23a','#7cc6ff'],40,13,.9);mgRing(P.x,P.z,11,'#ffd6ea',.6);mgRing(P.x,P.z,7,'#ffffff',.45);MG.shake=Math.max(MG.shake||0,.5)}})}
  else if(k==='ice'){mgScatter(P,7.5,7).forEach((q,i)=>mgHit('circle',{x:q.x,z:q.z,r:2.4},1.1+i*.14,{dmg:0,eff:'slow',quiet:i>0,why:k,fall:{mesh:mgIceMesh(),y0:34,spin:4},end:()=>{MGS.ice(q.x,q.z);mgBurst(q.x,q.z,['#bfeaff','#ffffff','#7cc6ff'],10,8,.5);mgRing(q.x,q.z,3.5,'#bfeaff',.35)}}))}
  else if(k==='magnet'){mgHit('circle',{x:P.x,z:P.z,r:2.6},1.2,{why:k,fall:{mesh:mgMagnetMesh(),y0:36},end:()=>{MGS.boom(P.x,P.z);const g=mgMagnetMesh();g.add(mgFlat(13,'#ff4a4a',.08,.09));const rg=new THREE.Mesh(new THREE.RingGeometry(12.6,13,48),new THREE.MeshBasicMaterial({color:'#ff4a4a',transparent:true,opacity:.6,depthWrite:false,side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.y=.12;g.add(rg);mgItem('magnet',P.x,P.z,3.5,13,g);mgMsg(MG.role==='thief'?'자석에 끌려가요! 반대로 달려요':'자석 사탕!',1.4)}})}
  else if(k==='spin'){const c={x:mo.x,z:mo.z};mo.lockT=1.5;mo.spinT=1.5;MGS.whoosh(c.x,c.z);mgHit('circle',{x:c.x,z:c.z,r:7.5},1.5,{why:k,end:()=>{MGS.swing(c.x,c.z);MGS.boom(c.x,c.z);mgRing(c.x,c.z,10,'#ff9ec7',.5);mgBurst(c.x,c.z,['#ff5f9e','#ffffff'],24,12,.6,3)}})}
  else if(k==='slip'||k==='rev'||k==='trap'){mgScatter(P,6.5,6).forEach((q,i)=>mgHit('circle',{x:q.x,z:q.z,r:1.6},.7+i*.06,{dmg:0,quiet:i>0,why:k,fall:{mesh:mgBlobMesh(k),y0:22,spin:3},end:()=>{mgItem(k,q.x,q.z,12,1.6,mgPadMesh(k));mgBurst(q.x,q.z,['#ffffff','#ffd23a'],5,5,.4)}}));MGS.whoosh(P.x,P.z)}
  else if(k==='fake'){for(let i=0;i<2;i++){const c=mgFarCell(16);if(c){const g=mgCandyMesh();mgItem('fake',c.x,c.z,30,1.7,g)}}MGS.magic();mgMsg(MG.role==='mon'?'가짜 사탕 2개를 뿌렸어요':'사탕 냄새가 나요…',1.4)}
  else if(k==='fog'){MG.th.fogT=10;MGS.magic();mgMsg(MG.role==='thief'?'지도가 가려졌어요!':'도둑 지도를 가렸어요',1.4)}
  else if(k==='eye'){mo.fastT=6;MGS.magic();mgMsg(MG.role==='mon'?'빨라졌어요!':'마녀가 빨라졌어요!',1.2)}
  else if(k==='skel'){const p=mgClampPt({x:P.x,z:P.z},18);mo.jump={x0:mo.x,z0:mo.z,x1:p.x,z1:p.z,t:0,T:1.3};MGS.jump(mo.x,mo.z);
    mgHit('circle',{x:p.x,z:p.z,r:5.2},1.3,{why:k,end:()=>{MGS.boom(p.x,p.z,1);mgSmash({x:p.x,z:p.z},3.5);mgRing(p.x,p.z,10,'#b98cff',.55);mgBurst(p.x,p.z,['#b98cff','#ffffff','#7a3ff0'],30,11,.8);MG.shake=Math.max(MG.shake||0,.6)}})}
  else if(k==='spider'){const L=Math.max(6,Math.hypot(P.x-mo.x,P.z-mo.z)),dir=Math.atan2(P.z-mo.z,P.x-mo.x);mgHit('rect',{x:mo.x,z:mo.z,w:2.8,len:L,dir},.8,{dmg:0,eff:'root',why:k,end:()=>{MGS.web(P.x,P.z);mgItem('web',P.x,P.z,10,3.4,mgWebMesh(3.4));mgBurst(P.x,P.z,['#ffffff','#e0ffe8'],12,6,.4)}})}
  else if(k==='ghost'){mo.ghostT=5;MGS.magic();mgMsg(MG.role==='mon'?'투명해졌어요':'마녀가 사라졌어요!',1.4)}
  else if(k==='bat'){const bx0=mo.x,bz0=mo.z;mgHit('rect',{x:mo.x,z:mo.z,w:5,len:26,dir:f},1.1,{why:k,dmg:0,end:()=>{mgSweep(bx0,bz0,ux,uz,5,26,30,'bat');MGS.bats(mo.x+ux*10,mo.z+uz*10);for(let i=0;i<30;i++){const sx=(Math.random()-.5)*4.4,sp=26+Math.random()*9;mgP('bat',i%4?'#3a1d50':'#7a5cc0',mo.x-uz*sx,1.4+Math.random()*3.2,mo.z+ux*sx,{vx:ux*sp,vz:uz*sp,vy:(Math.random()-.5)*2,life:.95+Math.random()*.15,s0:1.5+Math.random()*.6,s1:1.6,flap:18+Math.random()*8,rot:false,fin:.05,pow:6})}}})}
  else if(k==='bear'){mo.lockT=1;mgHit('rect',{x:mo.x,z:mo.z,w:4.6,len:18,dir:f},1,{dmg:0,why:k,end:()=>{mo.charge={ux,uz,d:18};MGS.whoosh(mo.x,mo.z)}})}
  else if(k==='soldier'){const dir=Math.atan2(P.z-mo.z,P.x-mo.x),cx=Math.cos(dir),cz=Math.sin(dir);for(let i=0;i<6;i++){const q=mgClampPt({x:mo.x+cx*(5+i*3.8),z:mo.z+cz*(5+i*3.8)},0);
      mgHit('circle',{x:q.x,z:q.z,r:2.3},1+i*.2,{quiet:i>0,why:k,fall:{mesh:mgSpearMesh(),y0:30},end:()=>{MGS.boom(q.x,q.z);mgBurst(q.x,q.z,['#ff5f9e','#fff8ee'],8,7,.45);mgRing(q.x,q.z,3.5,'#ffffff',.3)}})}}
  return true}
function mgStomp(){const mo=MG.mo;if(mo.cd.stomp>0||mo.lockT>0||mo.jump||mo.charge||mo.eatT>0||MG.over)return false;mo.cd.stomp=MGP.stomp.cd;mo.lockT=MGP.stomp.w;mo.m.atkT=.6;MG.stat.atk.stomp=(MG.stat.atk.stomp||0)+1;const c={x:mo.x,z:mo.z};
  mgHit('circle',{x:c.x,z:c.z,r:MGP.stomp.r},MGP.stomp.w,{why:'stomp',dmg:MGP.stomp.dmg,end:()=>{MGS.boom(c.x,c.z);mgRing(c.x,c.z,7,'#ffffff',.4);mgBurst(c.x,c.z,['#e8c48a','#ffffff'],16,8,.55);MG.shake=Math.max(MG.shake||0,.35)}});return true}
// ---------- 도둑 스킬 ----------
function mgThEffect(e){const th=MG.th;if(th.dashT>0)return;if(e==='slow'){th.slowT=3;mgMsg(MG.role==='thief'?'얼어서 느려졌어요!':'도둑이 느려졌어요!',1.2)}if(e==='root'){th.rootT=2;mgMsg(MG.role==='thief'?'거미줄에 묶였어요!':'도둑을 묶었어요!',1.2)}}
function mgThSkill(k,aim){const th=MG.th,mo=MG.mo;if(MG.over||!(k in MGTS))return false;if(th.cd[k]>0)return false;
  let fx=-Math.sin(th.yaw),fz=-Math.cos(th.yaw);let ok=true;if(aim){const ax=aim.x-th.x,az=aim.z-th.z,L=Math.hypot(ax,az);if(L>.3){fx=ax/L;fz=az/L}}
  if(k==='decoy'){const dx=th.x-mo.x,dz=th.z-mo.z,L=Math.hypot(dx,dz)||1;if(MG.decoy)mgDrop(MG.decoy.m.g);const m=mgThiefModel();MG.g.add(m.g);MG.decoy=aim?{x:th.x,z:th.z,dx:fx,dz:fz,t:6,m}:{x:th.x,z:th.z,dx:-dz/L,dz:dx/L,t:6,m};MGS.magic()}
  else if(k==='cloak'){th.cloakT=5;MGS.magic()}
  else if(k==='gum'){const g=new THREE.Group();g.add(mgFlat(2.6,'#ff9ec7',.75,.12));for(let i=0;i<6;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.4+Math.random()*.3,10,8),new THREE.MeshLambertMaterial({color:'#ff9ec7'}));b.position.set((Math.random()-.5)*3,.2,(Math.random()-.5)*3);b.scale.y=.5;g.add(b)}
    {const gp=aim?mgClampPt({x:aim.x,z:aim.z},0):{x:th.x-fx*2.5,z:th.z-fz*2.5};mgItem('gum',gp.x,gp.z,10,2.6,g)}MGS.web(th.x,th.z)}
  else if(k==='sprint'){th.sprintT=5;MGS.dash()}
  else if(k==='dash2'){ok=false}
  else if(k==='clean'){th.slowT=th.rootT=th.revT=th.slipT=th.fogT=0;for(const it of MG.items)if(['slip','rev','trap','web','magnet'].includes(it.type)&&Math.hypot(it.x-th.x,it.z-th.z)<9)it.t=0;mgBurst(th.x,th.z,['#7ee8c8','#ffffff'],16,7,.4);MGS.magic()}
  else if(k==='scope'){th.scopeT=6;MGS.magic()}
  else if(k==='heal'){if(th.healed||th.hp>=MGP.hp)return false;th.healed=1;th.hp=Math.min(MGP.hp,th.hp+1);MGS.candy();mgBurst(th.x,th.z,['#ff5f8f','#ffffff'],12,5,.4)}
  else if(k==='lure'){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.9,14,10),new THREE.MeshLambertMaterial({color:'#7ee8c8',emissive:'#103a2a'}));b.position.y=.8;g.add(b);g.add(mgFlat(1.8,'#7ee8c8',.35));
    const p=mgClampPt(aim?{x:aim.x,z:aim.z}:{x:th.x+fx*5,z:th.z+fz*5},0);mgItem('lure',p.x,p.z,12,1.6,g);MGS.whoosh(th.x,th.z)}
  else if(k==='xray'){th.xrayT=6;MGS.magic()}
  else if(k==='compass'){th.compT=5;MGS.magic()}
  else if(k==='smoke'){mo.smokeT=4;MGS.whoosh(mo.x,mo.z)}
  else if(k==='freeze'){mo.freezeT=5;MGS.ice(mo.x,mo.z)}
  else if(k==='tele'||k==='jump'){let best=null;for(let d=18;d>=4;d-=1){const p={x:th.x+fx*d,z:th.z+fz*d};const W=MGW();if(p.x<1||p.z<1||p.x>W-1||p.z>W-1)continue;const[cx,cz]=cellOf(p.x,p.z);if(!mgOpen(cx,cz))continue;best=p;break}
    if(!best)return false;th.x=best.x;th.z=best.z;collide(th,MGP.thR);th.inv=Math.max(th.inv,.3);MGS.whoosh(th.x,th.z);MGS.magic()}
  if(ok){th.cd[k]=MGTS[k].cd;MG.stat.sk[k]=(MG.stat.sk[k]||0)+1}return ok}
// ---------- 사탕 · 출구 ----------
function mgFarCell(minD){const th=MG.th,mo=MG.mo;let best=null;for(let i=0;i<80;i++){const x=(Math.random()*N)|0,z=(Math.random()*N)|0;if(!mgOpen(x,z))continue;const px=cx2x(x),pz=cx2x(z);
    const dT=Math.hypot(px-th.x,pz-th.z),dM=Math.hypot(px-mo.x,pz-mo.z);if(x===EXIT[0]&&z===EXIT[1])continue;const sc=Math.min(dT,minD+8)+Math.min(dM,10)*.4+Math.random()*4-(dT<minD?100:0);if(!best||sc>best.sc)best={x:px,z:pz,sc}}return best}
function mgSpawnCandy(){const c=mgFarCell(20);const g=mgCandyMesh();g.position.set(c.x,0,c.z);MG.g.add(g);MG.cand={x:c.x,z:c.z,g}}
function mgEatCandy(){const c=MG.cand;mgDrop(c.g);MG.cand=null;MG.got++;MG.stat.cand++;MGS.candy();mgBurst(c.x,c.z,['#ffd23a','#ff5f9e','#ffffff','#7cc6ff'],26,8,.6,1.5);
  const n=mgAddWalls(MGP.wallsPer);if(n)MGS.rise();
  if(MG.got>=MGP.candies){mgOpenExit();return}
  mgMsg(MG.role==='thief'?`사탕 ${MG.got}/${MGP.candies} · 벽이 솟았어요!`:`도둑이 사탕을 먹었어요 (${MG.got}/${MGP.candies}) · 벽이 솟았어요`,1.6);mgSpawnCandy()}
function mgOpenExit(){MG.exitOpen=true;const x=cx2x(EXIT[0]),z=cx2x(EXIT[1]);const g=new THREE.Group();
  const arch=new THREE.Mesh(new THREE.TorusGeometry(2.6,.45,10,28,Math.PI),new THREE.MeshLambertMaterial({color:'#7ee8c8',emissive:'#1a5a40'}));arch.position.y=2.4;g.add(arch);
  for(const sx of[-1,1]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,2.4,12),new THREE.MeshLambertMaterial({color:'#7ee8c8',emissive:'#1a5a40'}));p.position.set(sx*2.6,1.2,0);g.add(p)}
  g.add(mgFlat(2.8,'#7ee8c8',.45));const beam=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,60,20,1,true),new THREE.MeshBasicMaterial({color:'#7ee8c8',transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide,fog:false}));beam.position.y=30;g.add(beam);
  g.position.set(x,0,z+(EXIT[1]===0?-C*.35:C*.35));MG.g.add(g);MG.exitG=g;MGS.fanfare();mgMsg(MG.role==='thief'?'출구가 열렸어요! 반대편 끝으로!':'출구가 열렸어요! 막아요!',2.2)}
function mgAtExit(){const th=MG.th;const[cx,cz]=cellOf(th.x,th.z);if(cx!==EXIT[0]||cz!==EXIT[1])return false;return EXIT[1]===0?th.z<C*.42:th.z>MGW()-C*.42}

// ---------- 시작 · 끝 ----------
let MGSEL={thief:null,witch:null};
function mgDefThief(){const s=(SAVE.skills||['decoy','cloak']).filter(k=>k in MGTS);while(s.length<2)for(const k of MGTK)if(!s.includes(k)){s.push(k);break}return s.slice(0,2)}
function mgDefWitch(){const s=(SAVE.deck||[]).filter(k=>k in MGWS);while(s.length<MGWN)for(const k of MGWK)if(!s.includes(k)){s.push(k);break}return s.slice(0,MGWN)}
function mgRandWitch(){const a=MGWK.slice().sort(()=>Math.random()-.5);return a.slice(0,MGWN)}
function mgRandThief(){const a=MGTK.filter(k=>k!=='heal'||Math.random()<.5).sort(()=>Math.random()-.5);return a.slice(0,2)}
function mgStart(role,thSk,woSk){MG.role=role;MG.on=true;MG.over=false;MG.pause=false;MG.t=0;MG.cdn=3.2;MG.got=0;MG.exitOpen=false;MG.rise=[];MG.parts=[];MG.hits=[];MG.items=[];MG.decoy=null;MG.cand=null;MG.exitG=null;MG.msgQ=null;
  MG.stat={atk:{},sk:{},hit:0,cand:0,src:{}};MG.compG=null;MG.compKey='';camPreview=false;try{clearStage();STAGE.on=false}catch(e){}
  mgHideWorld(true);mgBuild();camera.rotation.order='YXZ';
  const W=MGW(),tm=mgThiefModel(),wm=mgWitchModel();MG.g.add(tm.g);MG.g.add(wm.g);
  MG.th={x:cx2x(START[0]),z:cx2x(START[1]),yaw:EXIT[1]===0?0:Math.PI,pitch:-.08,hp:MGP.hp,inv:0,dashT:0,dashCd:0,charges:0,dx:0,dz:-1,kx:0,kz:0,m:tm,moving:false,cd:{},sk:thSk||mgDefThief(),bob:0};
  MG.th.sk.forEach(k=>MG.th.cd[k]=0);MG.th.dash2=MG.th.sk.includes('dash2');MG.th.charges=MG.th.dash2?2:1;
  MG.mo={x:cx2x(MID),z:cx2x(EXIT[1]===0?3:N-4),yaw:EXIT[1]===0?Math.PI:0,pitch:-.42,m:wm,moving:false,cd:{stomp:2},sk:woSk||mgDefWitch(),lockT:0,stepT:0};
  MG.mo.sk.forEach((k,i)=>MG.mo.cd[k]=4+i*1.5);
  MG.ai={tt:0,mt:0,react:[.5,.3,.15][AIL==null?1:AIL],path:null,pathT:0};
  mgSpawnCandy();show('mini');mgHud(true);mgHudSync();try{musicGame()}catch(e){}mgMsg(role==='thief'?'사탕 6개를 먹고 반대편으로 넘어가요':'도둑을 잡아요 · 도둑이 사탕을 먹으면 벽이 솟아요',2.6)}
function mgEnd(win,why){if(MG.over)return;MG.over=true;MG.why=why;const me=(MG.role==='thief')===(win==='thief');
  try{(me?SFX.win:SFX.lose)()}catch(e){}
  setTimeout(()=>{if(!MG.on)return;const r=$('mgRes');r.hidden=false;
    r.querySelector('.mg-rk').textContent=me?'이겼어요!':'졌어요';r.querySelector('.mg-rk').className='mg-rk '+(me?'win':'lose');
    r.querySelector('.mg-rt').textContent=win==='thief'?'쿠키 도둑이 반대편으로 넘어갔어요':why==='hp'?'거대 마녀가 도둑을 잡았어요':'시간이 다 됐어요 · 마녀 승리';
    r.querySelector('.mg-rs').innerHTML=Array.from({length:MGP.candies},(_,i)=>`<i class="${i<MG.got?'on':''}">${MGI.candy}</i>`).join('')},900)}
function mgClean(){try{for(const o of MG.g?[...MG.g.children]:[])mgDrop(o)}catch(e){}mgDrop(MG.g);MG.g=null;mgXray(false)}
function mgExit(){MG.on=false;$('mgRes').hidden=true;$('mgPauseM').hidden=true;mgHud(false);mgClean();mgHideWorld(false);try{titleScreen()}catch(e){show('title')}}
function mgAgain(){const r=MG.role,a=MG.th.sk,b=MG.mo.sk;$('mgRes').hidden=true;mgClean();MG.on=false;
  mgStart(r,r==='thief'?a:mgRandThief(),r==='mon'?b:mgRandWitch())}
// ---------- 입력 ----------
const MGIN={jx:0,jy:0,id:null,ox:0,oy:0,lid:null,lx:0,ly:0};
function mgMoveIn(){const K=IN.keys||{};let x=MGIN.jx+((K.KeyD)?1:0)-((K.KeyA)?1:0),y=MGIN.jy+((K.KeyS)?1:0)-((K.KeyW)?1:0);const L=Math.hypot(x,y);if(L>1){x/=L;y/=L}return[x,y]}
function mgWorld(o,mx,my){const f=[-Math.sin(o.yaw),-Math.cos(o.yaw)],r=[Math.cos(o.yaw),-Math.sin(o.yaw)];return[f[0]*-my+r[0]*mx,f[1]*-my+r[1]*mx]}
function mgAct(a){if(!MG.on||MG.over||MG.pause||MG.cdn>0)return;if(MG.role==='thief'){if(a==='dash')mgDash(MG.th);else mgThSkill(a)}else{if(a==='stomp')mgStomp();else mgCast(a)}}
// ---------- 도둑 ----------
function mgDash(th){if(th.dashT>0||th.rootT>0)return;if(th.charges<=0)return;th.charges--;if(th.dashCd<=0)th.dashCd=MGP.dashCd;
  let dx=th.dx,dz=th.dz;if(!th.moving){dx=-Math.sin(th.yaw);dz=-Math.cos(th.yaw)}const L=Math.hypot(dx,dz)||1;th.ddx=dx/L;th.ddz=dz/L;th.dashT=MGP.dashT;MGS.dash()}
function mgHurt(src,why,dmg){const th=MG.th;if(MG.over||th.inv>0||th.dashT>0)return false;th.hp=Math.max(0,Math.round((th.hp-(dmg||1))*2)/2);MG.stat.hit++;MG.stat.src[why||'?']=(MG.stat.src[why||'?']||0)+1;th.inv=MGP.inv;MGS.hurt();
  const dx=th.x-(src?src.x:MG.mo.x),dz=th.z-(src?src.z:MG.mo.z),L=Math.hypot(dx,dz)||1;th.kx=dx/L*10;th.kz=dz/L*10;MG.shake=Math.max(MG.shake||0,.5);mgFlash();
  mgBurst(th.x,th.z,['#ff5f8f','#ffffff'],10,6,.35,1);if(th.hp<=0)mgEnd('mon','hp');else mgMsg(MG.role==='thief'?(why==='orb'?'사탕 구슬에 맞았어요!':'아야!'):'맞혔어요!',1);return true}
function mgThTick(dt,mv){const th=MG.th;th.inv=Math.max(0,th.inv-dt);for(const k in th.cd)th.cd[k]=Math.max(0,th.cd[k]-dt);
  th.dashCd=Math.max(0,th.dashCd-dt);const maxC=th.dash2?2:1;if(th.dashCd<=0&&th.charges<maxC){th.charges++;if(th.charges<maxC)th.dashCd=MGP.dashCd}
  for(const k of['slowT','rootT','revT','slipT','fogT','cloakT','sprintT','scopeT','xrayT','compT'])if(th[k]>0)th[k]-=dt;
  if(th.xrayT>0)mgXray(true);else mgXray(false);
  let[mx,mz]=mv;if(th.revT>0){mx=-mx;mz=-mz}
  let sp=MGP.thSpd*(th.sprintT>0?1.4:1)*(th.slowT>0?.55:1)*(th.webIn?.5:1);th.webIn=0;const ox=th.x,oz=th.z;
  if(th.dashT>0){th.dashT-=dt;th.x+=th.ddx*MGP.dashSpd*dt;th.z+=th.ddz*MGP.dashSpd*dt}
  else if(th.rootT>0){th.moving=false}
  else{const L=Math.hypot(mx,mz);if(th.slipT>0){th.vx=(th.vx||0)*.985+mx*sp*dt*1.2;th.vz=(th.vz||0)*.985+mz*sp*dt*1.2;const v=Math.hypot(th.vx,th.vz),vm=sp*1.15;if(v>vm){th.vx*=vm/v;th.vz*=vm/v}th.x+=th.vx*dt;th.z+=th.vz*dt}
    else{th.vx=mx*sp;th.vz=mz*sp;if(L>.05){th.x+=mx*sp*dt;th.z+=mz*sp*dt}}
    if(L>.05){th.dx=mx/L;th.dz=mz/L}th.moving=L>.05}
  th.x+=th.kx*dt;th.z+=th.kz*dt;th.kx*=Math.pow(.02,dt);th.kz*=Math.pow(.02,dt);
  mgBound(th,MGP.thR,ox,oz,true);
  if(th.moving&&th.dashT<=0)th.bob+=dt*10;
  const mo=MG.mo;{const bx=th.x-mo.x,bz=th.z-mo.z,bd=Math.hypot(bx,bz);if(!mo.jump&&bd<MGP.moR+MGP.thR+.2&&!(th.dashT>0)){const L=bd||1;th.kx=bx/L*7;th.kz=bz/L*7}} // 마녀 몸에 닿으면 밀려나기만 (피해 없음)
  const c=MG.cand;if(c&&Math.hypot(th.x-c.x,th.z-c.z)<1.7)mgEatCandy();
  if(MG.exitOpen&&mgAtExit())mgEnd('thief','exit');
  // 분신
  const d=MG.decoy;if(d){d.t-=dt;const ox2=d.x,oz2=d.z;d.x+=d.dx*MGP.thSpd*dt;d.z+=d.dz*MGP.thSpd*dt;const before=[d.x,d.z];collide(d,MGP.thR);mgBound(d,MGP.thR,ox2,oz2,true);
    if(Math.hypot(d.x-before[0],d.z-before[1])>.01){const a=Math.atan2(d.dz,d.dx)+(Math.random()<.5?1.4:-1.4);d.dx=Math.cos(a);d.dz=Math.sin(a)}
    if(d.t<=0){mgBurst(d.x,d.z,['#ffffff','#7ee8c8'],12,6,.4);mgDrop(d.m.g);MG.decoy=null}}}
function mgBound(o,r,ox,oz,walls){if(walls)collide(o,r);const W=MGW();o.x=clamp(o.x,r,W-r);o.z=clamp(o.z,r,W-r);const[cx,cz]=cellOf(o.x,o.z);if(!mgOpen(cx,cz)){o.x=ox;o.z=oz}}
// ---------- 거대 마녀 ----------
function mgMoTick(dt,mv){const mo=MG.mo,th=MG.th;const fr=mo.freezeT>0;for(const k in mo.cd)if(!fr)mo.cd[k]=Math.max(0,mo.cd[k]-dt);
  for(const k of['lockT','fastT','slowT','ghostT','smokeT','freezeT','eatT','spinT'])if(mo[k]>0)mo[k]-=dt;
  if(mo.jump){const J=mo.jump;J.t+=dt;const k=Math.min(1,J.t/J.T);mo.x=J.x0+(J.x1-J.x0)*k;mo.z=J.z0+(J.z1-J.z0)*k;mo.hy=Math.sin(k*Math.PI)*9;if(k>=1){mo.jump=null;mo.hy=0}}
  else if(mo.charge){const c=mo.charge,st=Math.min(c.d,24*dt);mo.x+=c.ux*st;mo.z+=c.uz*st;c.d-=st;mgSmash(mo,MGP.moR+.4);
    if(Math.hypot(th.x-mo.x,th.z-mo.z)<MGP.moR+1.1)mgHurt(mo,'bear');const W=MGW();if(c.d<=.01||mo.x<MGP.moR||mo.z<MGP.moR||mo.x>W-MGP.moR||mo.z>W-MGP.moR){mo.charge=null;MGS.boom(mo.x,mo.z)}
    mo.x=clamp(mo.x,MGP.moR,W-MGP.moR);mo.z=clamp(mo.z,MGP.moR,W-MGP.moR);mo.stepT-=dt*3}
  else if(mo.lockT>0||mo.eatT>0){mo.moving=false}
  else{const[mx,mz]=mv;const L=Math.hypot(mx,mz);let sp=MGP.moSpd*(mo.fastT>0?1.7:1)*(mo.slowT>0?.5:1)*(mo.smashT>0?.4:1);const ox=mo.x,oz=mo.z;
    if(L>.05){mo.x+=mx*sp*dt;mo.z+=mz*sp*dt}mo.moving=L>.05;if(mo.moving&&mgSmash(mo,MGP.moR))mo.smashT=.45;
    const W=MGW();mo.x=clamp(mo.x,MGP.moR,W-MGP.moR);mo.z=clamp(mo.z,MGP.moR,W-MGP.moR);const[cx,cz]=cellOf(mo.x,mo.z);if(!mgOpen(cx,cz)){mo.x=ox;mo.z=oz}}
  if(mo.smashT>0)mo.smashT-=dt;
  if(mo.moving||mo.charge){mo.stepT-=dt;if(mo.stepT<=0){mo.stepT=mo.charge?.18:.62/(mo.fastT>0?1.5:1);MGS.step(mo.x,mo.z);if(MG.role==='thief')MG.shake=Math.max(MG.shake||0,Math.min(.18,6/(Math.hypot(th.x-mo.x,th.z-mo.z)+4)))}}}
// ---------- AI ----------
function mgDangerAt(x,z){let d=0;for(const h of MG.hits){if(!h.dmg&&!h.eff)continue;if(mgInside(h.kind,h.o,x,z,1.1))d+=2+(h.T-h.t<.45?2.5:0)}const mo=MG.mo;
  if(mo.charge&&mgInside('rect',{x:mo.x,z:mo.z,w:5.5,len:mo.charge.d+2,dir:Math.atan2(mo.charge.uz,mo.charge.ux)},x,z))d+=4;
  const dm=Math.hypot(x-mo.x,z-mo.z);if(dm<MGP.moR+4.5)d+=1.3*(MGP.moR+4.5-dm);
  for(const it of MG.items){if(['slip','rev','trap','web'].includes(it.type)&&Math.hypot(x-it.x,z-it.z)<it.r+.6)d+=it.type==='trap'?2.5:1.2;if(it.type==='magnet'&&Math.hypot(x-it.x,z-it.z)<it.r)d+=.4}return d}
function mgPathTo(sx,sz,gx,gz){const prev=new Int16Array(N*N).fill(-1);const q=[idx(sx,sz)];prev[idx(sx,sz)]=idx(sx,sz);
  while(q.length){const i=q.shift();const x=i%N,z=(i/N)|0;if(x===gx&&z===gz)break;for(const[dx,dz]of DIRS){const nx=x+dx,nz=z+dz;if(!mgOpen(nx,nz)||prev[idx(nx,nz)]>=0||!canStep(x,z,dx,dz))continue;prev[idx(nx,nz)]=i;q.push(idx(nx,nz))}}
  if(prev[idx(gx,gz)]<0)return null;const out=[];let i=idx(gx,gz);while(i!==idx(sx,sz)){out.push([i%N,(i/N)|0]);i=prev[i]}return out.reverse()}
function mgThiefAI(dt){const th=MG.th,ai=MG.ai,mo=MG.mo;ai.tt-=dt;if(ai.tt>0&&ai.mv)return ai.mv;ai.tt=ai.react*.6;const lvl=AIL==null?1:AIL;
  const goal=MG.exitOpen?[cx2x(EXIT[0]),EXIT[1]===0?.3:MGW()-.3]:MG.cand?[MG.cand.x,MG.cand.z]:[th.x,th.z];
  const[cx,cz]=cellOf(th.x,th.z),[gx,gz]=cellOf(goal[0],goal[1]);let tgt=goal;
  if(cx!==gx||cz!==gz){const p=mgPathTo(cx,cz,gx,gz);if(p&&p.length){tgt=[cx2x(p[0][0]),cx2x(p[0][1])];if(p.length>1&&canStep(cx,cz,p[0][0]-cx,p[0][1]-cz)){const n2=[cx2x(p[1][0]),cx2x(p[1][1])];if(Math.hypot(th.x-tgt[0],th.z-tgt[1])<C*.35)tgt=n2}}}
  let gxv=tgt[0]-th.x,gzv=tgt[1]-th.z;const gl=Math.hypot(gxv,gzv)||1;gxv/=gl;gzv/=gl;
  const here=mgDangerAt(th.x,th.z);let best=[1e9,gxv,gzv];
  if(here>.2||mgDangerAt(th.x+gxv*2.5,th.z+gzv*2.5)>.2){best=null;for(let i=0;i<16;i++){const a=i/16*Math.PI*2,ux=Math.cos(a),uz=Math.sin(a);let dg=0;
      for(const k of[1.3,2.8,4.4]){const px=th.x+ux*k,pz=th.z+uz*k;const[qx,qz]=cellOf(px,pz);if(!mgOpen(qx,qz)||(Math.abs(qx-cx)+Math.abs(qz-cz)===1&&!canStep(cx,cz,qx-cx,qz-cz))){dg+=6;break}dg+=mgDangerAt(px,pz)}
      const sc=dg*1.7-(ux*gxv+uz*gzv);if(!best||sc<best[0])best=[sc,ux,uz]}}
  if(here>=3.5&&th.charges>0&&Math.random()<[.45,.8,.95][lvl]){th.dx=best[1];th.dz=best[2];th.moving=true;mgDash(th)}
  // 스킬
  const dm=Math.hypot(th.x-mo.x,th.z-mo.z);for(const k of th.sk){if(th.cd[k]>0)continue;let use=false;
    if(k==='sprint')use=dm<12||MG.exitOpen;else if(k==="heal")use=th.hp<=2.5;else if(k==='decoy'||k==='cloak'||k==='smoke'||k==='freeze')use=dm<11;else if(k==='gum'||k==='lure')use=dm<10;
    else if(k==='clean')use=th.slowT>0||th.rootT>0||th.revT>0;else if(k==='tele')use=here>=3.5&&th.charges<=0;
    if(use&&Math.random()<.5+lvl*.2){th.yaw=Math.atan2(-best[1],-best[2]);mgThSkill(k);break}}
  th.yaw=Math.atan2(-best[1],-best[2]);ai.mv=[best[1],best[2]];return ai.mv}
function mgMonAI(dt){const mo=MG.mo,th=MG.th,ai=MG.ai,lvl=AIL==null?1:AIL;let tx=th.x,tz=th.z;
  if(MG.decoy&&ai.fooled)({x:tx,z:tz}=MG.decoy);if(th.cloakT>0){tx=th.lx??tx;tz=th.lz??tz}else{th.lx=th.x;th.lz=th.z}
  const lure=MG.items.find(i=>i.type==='lure'&&Math.hypot(i.x-mo.x,i.z-mo.z)<12);if(lure){tx=lure.x;tz=lure.z}
  if(MG.decoy&&ai.fooled==null)ai.fooled=Math.random()<.6;if(!MG.decoy)ai.fooled=null;
  const dx=tx-mo.x,dz=tz-mo.z,d=Math.hypot(dx,dz);mo.yaw=Math.atan2(-dx,-dz);
  if(!mo.jump&&!mo.charge&&!(mo.lockT>0)&&!(mo.eatT>0)&&!(mo.smokeT>0)){ai.mt-=dt;if(ai.mt<=0){ai.mt=ai.react*1.3;
      const lead=[.15,.45,.7][lvl];const px=tx+th.dx*(th.moving?MGP.thSpd:0)*lead,pz=tz+th.dz*(th.moving?MGP.thSpd:0)*lead;const err=[3.5,2,.8][lvl];
      const aim={x:px+(Math.random()-.5)*err,z:pz+(Math.random()-.5)*err};
      const ready=mo.sk.filter(k=>mo.cd[k]<=0).sort(()=>Math.random()-.5);
      for(const k of ready){const S=MGWS[k];const ok=mgAiOk(k,d,aim,px,pz);
        if(ok&&Math.random()<[.35,.6,.85][lvl]){if(k==='spider'||k==='bear'){const a=Math.atan2(pz-mo.z,px-mo.x);mo.yaw=Math.atan2(-Math.cos(a),-Math.sin(a))}if(mgCast(k,aim))return[0,0]}}
      // 평타: 느린 사탕 구슬을 도둑이 갈 곳으로 던져요
      if(mo.cd.stomp<=0&&d<26&&!(th.cloakT>0)&&Math.random()<[.22,.35,.6][lvl]){const tt=d/MGP.stomp.spd*[.3,.6,.9][lvl];const ax=tx+th.dx*(th.moving?MGP.thSpd:0)*tt+(Math.random()-.5)*err,az=tz+th.dz*(th.moving?MGP.thSpd:0)*tt+(Math.random()-.5)*err;if(mgStomp({x:ax,z:az}))return[0,0]}}
    const L=d||1;return d>MGP.moR+.6?[dx/L,dz/L]:[0,0]}
  return[0,0]}
// ---------- 한 프레임 ----------
function mgTick(dt){if(!MG.on||!MG.g)return;
  if(!MG.pause&&!MG.over){if(MG.cdn>0){const p=Math.ceil(MG.cdn);MG.cdn-=dt;if(Math.ceil(MG.cdn)!==p){if(MG.cdn>0)MGS.tick();else MGS.go()}}
    else{MG.t+=dt;const[ix,iy]=mgMoveIn();const me=MG.role==='thief'?MG.th:MG.mo;const mine=mgWorld(me,ix,iy);
      const thMv=MG.role==='thief'&&!MG.both?mine:mgThiefAI(dt),moMv=MG.role==='mon'&&!MG.both?mine:mgMonAI(dt);
      mgThTick(dt,thMv);mgMoTick(dt,moMv);mgHitTick(dt);mgItemTick(dt);if(MG.t>=MG.T)mgEnd('mon','time')}}
  mgPartTick(dt);for(const r of MG.rise){r.t+=dt;const k=Math.min(1,r.t/.55);r.m.position.y=r.y-8*(1-k)*(1-k)}MG.rise=MG.rise.filter(r=>r.t<.55);
  // 모습
  const th=MG.th,mo=MG.mo;const tg=th.m.g;tg.position.set(th.x,0,th.z);tg.rotation.y=Math.atan2(th.dx,th.dz);
  try{play(th.m,th.dashT>0||th.moving?'Running_A':'Idle')}catch(e){}mgUpdModel(th.m,dt*(th.dashT>0?1.8:1));
  if(MG.decoy){const d=MG.decoy;d.m.g.position.set(d.x,0,d.z);d.m.g.rotation.y=Math.atan2(d.dx,d.dz);try{play(d.m,'Running_A')}catch(e){}mgUpdModel(d.m,dt)}
  const wg=mo.m.g;wg.position.set(mo.x,mo.hy||0,mo.z);wg.rotation.y=mo.yaw+Math.PI+(mo.spinT>0?(1.5-mo.spinT)*Math.PI*4:0);
  mo.m.state=mo.moving||mo.charge?'run':'idle';mgUpdModel(mo.m,dt);
  if(MG.cand){const hd=MG.cand.g.userData.hold;hd.rotation.y+=dt*2;hd.position.y=1.6+Math.sin(performance.now()/300)*.2}
  if(MG.exitG)MG.exitG.children[0].rotation.y+=dt;
  mgCompass();mgHudSync()}
// ---------- 카메라 (1인칭, 내가 돌릴 때만 돌아가요) ----------
function mgCam(dt){MG.shake=Math.max(0,(MG.shake||0)-dt*1.4);const s=MG.shake;const me=MG.role==='thief'?MG.th:MG.mo;
  if(MG.role==='thief'&&MG.th.scopeT>0){camera.fov=60;camera.position.set(me.x,30,me.z+12);camera.rotation.set(-1.15,0,0);camera.updateProjectionMatrix();scene.fog.near=200;scene.fog.far=700;return}
  const eye=MG.role==='thief'?MGP.eyeTh+(me.moving&&!(me.dashT>0)?Math.sin(me.bob)*.06:0)-(me.dashT>0?.1:0):MGP.eyeMo+(MG.mo.hy||0)+(MG.mo.moving?Math.abs(Math.sin(MG.mo.stepT*5))*.12:0);
  const fov=MG.role==='thief'?(me.dashT>0?80:72):78;if(camera.fov!==fov){camera.fov=fov;camera.updateProjectionMatrix()}
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  camera.position.set(me.x+(Math.random()-.5)*s*.5,eye+(Math.random()-.5)*s*.3,me.z+(Math.random()-.5)*s*.5);camera.rotation.set(me.pitch,me.yaw,0);
  scene.fog.near=MG.role==='thief'?40:70;scene.fog.far=MG.role==='thief'?230:320}
{const uc=updCamera;updCamera=function(dt){if(screen==='mini'){if(MG.on&&MG.th){mgTick(dt);mgCam(dt)}return}return uc.apply(this,arguments)}}
{const vm=updViewModel;updViewModel=function(){if(screen==='mini'){try{if(typeof VM!=='undefined'&&VM&&VM.g)VM.g.visible=false}catch(e){}return}return vm.apply(this,arguments)}}
// 투시 사탕: 벽 반투명
const MGX={on:false,mats:new Set()};
function mgXray(on){if(MGX.on===on)return;MGX.on=on;if(on){for(const m of WORLD.wallMeshes.values())m.traverse(c=>{if(c.material){const ms=Array.isArray(c.material)?c.material:[c.material];for(const mt of ms){if(!MGX.mats.has(mt)){mt.userData.__op=[mt.transparent,mt.opacity,mt.depthWrite];MGX.mats.add(mt)}mt.transparent=true;mt.opacity=.28;mt.depthWrite=false}}})}
  else{for(const mt of MGX.mats){const o=mt.userData.__op;if(o){mt.transparent=o[0];mt.opacity=o[1];mt.depthWrite=o[2]}}MGX.mats.clear()}}
// 사탕 나침반: 가는 길에 빛 점
function mgCompass(){const th=MG.th;if(!MG.compG){MG.compG=new THREE.Group();MG.g.add(MG.compG)}const show=th.compT>0;MG.compG.visible=show;if(!show){MG.compKey='';return}
  const goal=MG.exitOpen?EXIT:MG.cand?cellOf(MG.cand.x,MG.cand.z):null;if(!goal)return;const[cx,cz]=cellOf(th.x,th.z);const key=cx+','+cz+'>'+goal+':'+B.ver;if(key===MG.compKey)return;MG.compKey=key;
  for(const c of[...MG.compG.children])mgDrop(c);const p=mgPathTo(cx,cz,goal[0],goal[1])||[];for(const[x,z]of p){const d=new THREE.Mesh(new THREE.SphereGeometry(.35,10,8),new THREE.MeshBasicMaterial({color:'#ffd23a',fog:false}));d.position.set(cx2x(x),.6,cx2x(z));MG.compG.add(d)}}

MGI.candy='<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="5.2" ry="4.4" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="1.6"/><path d="M6.9 12 2.5 8.6v6.8zM17.1 12l4.4-3.4v6.8z" fill="#ff9ec7" stroke="#4a2a1a" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 9.5q2 2.5 0 5M13.5 9.2q2 2.8 0 5.6" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/></svg>';
MGI.door='<svg viewBox="0 0 24 24"><path d="M5 21V9a7 7 0 0 1 14 0v12z" fill="#7ee8c8" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 21v-8h6v8" fill="#fff" stroke="#4a2a1a" stroke-width="1.6"/></svg>';
MGI.witch='<svg viewBox="0 0 48 48"><path d="M24 3 15 22h18z" fill="#6a35d0" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/><ellipse cx="24" cy="22" rx="16" ry="3.5" fill="#5a2db0" stroke="#4a2a1a" stroke-width="2.2"/><circle cx="24" cy="31" r="9" fill="#ffe6d6" stroke="#4a2a1a" stroke-width="2.2"/><circle cx="20.5" cy="31" r="1.6" fill="#3a1d50"/><circle cx="27.5" cy="31" r="1.6" fill="#3a1d50"/><path d="M20.5 35.5q3.5 2.5 7 0" fill="none" stroke="#4a2a1a" stroke-width="1.8" stroke-linecap="round"/><path d="M24 14l1.4 2.8 3 .4-2.2 2 .5 3-2.7-1.4-2.7 1.4.5-3-2.2-2 3-.4z" fill="#ffd23a"/></svg>';
// ---------- 화면 (HUD) ----------
function mgHud(on){let h=$('mgHud');if(!h){h=document.createElement('div');h.id='mgHud';h.hidden=true;h.innerHTML=`
<div id="mgFlash"></div><div id="mgSmoke"></div><div id="mgTint"></div>
<div class="mg-look" id="mgLook"></div>
<div class="mg-top"><div class="mg-hp" id="mgHp"></div><div class="mg-mid"><div class="mg-time" id="mgTime">3:00</div><div class="mg-stars" id="mgStars"></div></div><button class="mg-ib" id="mgPauseB" aria-label="일시정지">${MGI.pause}</button></div>
<div class="mg-map"><canvas id="mgMap" width="200" height="200"></canvas><div class="mg-mapfog" id="mgMapFog">${MGI.sp?'':''}</div></div>
<div class="mg-st" id="mgSt"></div>
<div class="mg-msg" id="mgMsg"></div>
<div class="mg-cross" id="mgCross"></div>
<div class="mg-joy" id="mgJoy"><div class="mg-stick" id="mgStick"><i></i></div><span class="mg-jhint"><i></i></span></div>
<div class="mg-btns" id="mgBtns"></div>
<div class="mg-cdn" id="mgCdn"></div>
<div class="mg-pause" id="mgPauseM" hidden><div class="slab mg-pslab"><b>일시정지</b><div class="mg-prow"><button class="mg-big" id="mgHome" aria-label="그만하기">${MGI.home}</button><button class="mg-big go" id="mgResume" aria-label="계속하기">${MGI.play}</button></div></div></div>
<div class="mg-res" id="mgRes" hidden><div class="slab mg-rslab"><div class="mg-rk"></div><p class="mg-rt"></p><div class="mg-rs"></div><div class="mg-prow"><button class="mg-big" id="mgResHome" aria-label="처음으로">${MGI.home}</button><button class="mg-big go" id="mgResAgain" aria-label="다시 하기">${MGI.again}</button></div></div></div>`;
    document.body.appendChild(h);mgWire()}
  h.hidden=!on;if(on){const b=$('mgBtns');
    if(MG.role==='thief')b.innerHTML=`<div class="mg-row">${MG.th.sk.map(k=>`<button class="mg-ab mgsk" data-a="${k}" aria-label="${mgSkName(k)}">${mgSkSvg(k)||MGI.star}<i class="cd"></i></button>`).join('')}</div><button class="mg-ab big" data-a="dash" aria-label="대시">${MGI.dash}<i class="cd"></i><b class="ch"></b></button>`;
    else b.innerHTML=`<div class="mg-grid">${MG.mo.sk.map(k=>`<button class="mg-ab mgcard" data-a="${k}" aria-label="${MGWS[k].n}">${ART[k]||''}<i class="cd"></i></button>`).join('')}</div><button class="mg-ab big" data-a="stomp" aria-label="사탕 구슬">${MGI.stomp}<i class="cd"></i></button>`;
    h.classList.toggle('witch',MG.role==='mon');$('mgRes').hidden=true;$('mgPauseM').hidden=true}}
function mgWire(){const joy=$('mgJoy'),stick=$('mgStick'),knob=stick.querySelector('i'),look=$('mgLook');
  joy.addEventListener('pointerdown',e=>{e.preventDefault();if(MGIN.id!=null)return;MGIN.id=e.pointerId;MGIN.ox=e.clientX;MGIN.oy=e.clientY;MGIN.jx=MGIN.jy=0;try{joy.setPointerCapture(e.pointerId)}catch(_){}
    stick.style.display='block';stick.style.left=e.clientX+'px';stick.style.top=e.clientY+'px';knob.style.transform='translate(0,0)';joy.classList.add('on')});
  joy.addEventListener('pointermove',e=>{if(e.pointerId!==MGIN.id)return;let dx=e.clientX-MGIN.ox,dy=e.clientY-MGIN.oy;const L=Math.hypot(dx,dy),R=44;if(L>R){MGIN.ox+=dx*(1-R/L);MGIN.oy+=dy*(1-R/L);dx*=R/L;dy*=R/L;stick.style.left=MGIN.ox+'px';stick.style.top=MGIN.oy+'px'}
    const dz=Math.hypot(dx,dy)<6?0:1;MGIN.jx=dz*dx/R;MGIN.jy=dz*dy/R;knob.style.transform=`translate(${dx}px,${dy}px)`});
  const je=e=>{if(e&&e.pointerId!==MGIN.id)return;MGIN.id=null;MGIN.jx=MGIN.jy=0;stick.style.display='none';joy.classList.remove('on')};
  for(const ev of['pointerup','pointercancel','lostpointercapture'])joy.addEventListener(ev,je);
  // 시점 돌리기: 오른쪽 빈 곳을 끌어요
  look.addEventListener('pointerdown',e=>{e.preventDefault();if(MGIN.lid!=null)return;MGIN.lid=e.pointerId;MGIN.lx=e.clientX;MGIN.ly=e.clientY;try{look.setPointerCapture(e.pointerId)}catch(_){}});
  look.addEventListener('pointermove',e=>{if(e.pointerId!==MGIN.lid||!MG.on)return;const me=MG.role==='thief'?MG.th:MG.mo;const sens=(SAVE.sens||1)*.0065;me.yaw-=(e.clientX-MGIN.lx)*sens;me.pitch=clamp(me.pitch-(e.clientY-MGIN.ly)*sens*.8,MG.role==='thief'?-1:-1.25,.5);MGIN.lx=e.clientX;MGIN.ly=e.clientY});
  const le=e=>{if(e&&e.pointerId!==MGIN.lid)return;MGIN.lid=null};for(const ev of['pointerup','pointercancel','lostpointercapture'])look.addEventListener(ev,le);
  $('mgBtns').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-a]');if(!b)return;e.preventDefault();e.stopPropagation();mgAct(b.dataset.a)});
  $('mgPauseB').onclick=()=>{if(MG.over)return;MG.pause=true;$('mgPauseM').hidden=false;SFX.click()};
  $('mgResume').onclick=()=>{MG.pause=false;$('mgPauseM').hidden=true;SFX.click()};
  $('mgHome').onclick=()=>{SFX.click();mgExit()};$('mgResHome').onclick=()=>{SFX.click();mgExit()};$('mgResAgain').onclick=()=>{SFX.click();mgAgain()};
  addEventListener('keydown',e=>{if(!MG.on||screen!=='mini')return;const me=MG.role==='thief'?MG.th:MG.mo;if(e.code==='ArrowLeft')me.yaw+=.12;if(e.code==='ArrowRight')me.yaw-=.12;if(e.code==='ArrowUp')me.pitch=Math.min(.5,me.pitch+.08);if(e.code==='ArrowDown')me.pitch=Math.max(-1.2,me.pitch-.08);
    if(e.code==='Space')mgAct(MG.role==='thief'?'dash':'stomp');const n=+e.key;if(n>=1&&n<=5){const sk=MG.role==='thief'?MG.th.sk:MG.mo.sk;if(sk[n-1])mgAct(sk[n-1])}})}
function mgMsg(t,s){MG.msgT=s||1.5;const m=$('mgMsg');if(!m)return;m.textContent=t;m.classList.add('on')}
function mgFlash(){const f=$('mgFlash');if(!f)return;f.style.transition='none';f.style.opacity=MG.role==='thief'?.65:.25;requestAnimationFrame(()=>{f.style.transition='opacity .5s';f.style.opacity=0})}
function mgHudSync(){if(!MG.on)return;const th=MG.th,mo=MG.mo;
  
  const sk=MG.got+(MG.exitOpen?'x':'');const se=$('mgStars');if(se.dataset.k!==sk){se.dataset.k=sk;se.innerHTML=Array.from({length:MGP.candies},(_,i)=>`<i class="${i<MG.got?'on':''}">${MGI.candy}</i>`).join('')+(MG.exitOpen?`<i class="on door">${MGI.door}</i>`:'')}
  const left=Math.max(0,Math.ceil(MG.T-MG.t));const ts=Math.floor(left/60)+':'+String(left%60).padStart(2,'0');if($('mgTime').textContent!==ts)$('mgTime').textContent=ts;$('mgTime').classList.toggle('hurry',left<=20);
  const c=$('mgCdn');const n=MG.cdn>0?Math.ceil(MG.cdn)+'':'';if(c.textContent!==n){c.textContent=n;c.classList.toggle('on',!!n)}
  if(MG.msgT>0){MG.msgT-=1/60;if(MG.msgT<=0)$('mgMsg').classList.remove('on')}
  for(const b of document.querySelectorAll('#mgBtns [data-a]')){const a=b.dataset.a;let f=0,T=1;
    if(a==='dash'){f=th.charges>0?0:th.dashCd;T=MGP.dashCd;const ch=b.querySelector('.ch');if(ch)ch.textContent=th.dash2?th.charges:''}else if(a==='stomp'){f=mo.cd.stomp;T=MGP.stomp.cd}
    else if(MG.role==='thief'){f=th.cd[a]||0;T=MGTS[a].cd||1;if(a==='heal'&&th.healed)f=T;if(a==='dash2'){f=0}}else{f=mo.cd[a]||0;T=MGWS[a].cd}
    const k=Math.max(0,Math.min(1,f/T));b.querySelector('.cd').style.setProperty('--k',k.toFixed(3));b.classList.toggle('wait',k>0);b.classList.toggle('frz',MG.role==='mon'&&mo.freezeT>0)}
  // 상태
  const st=[];if(MG.role==='thief'){if(th.slowT>0)st.push('느림');if(th.rootT>0)st.push('묶임');if(th.revT>0)st.push('거꾸로');if(th.slipT>0)st.push('미끄럼');if(th.cloakT>0)st.push('투명');if(th.sprintT>0)st.push('질주')}
  else{if(mo.fastT>0)st.push('빠름');if(mo.slowT>0)st.push('느림');if(mo.ghostT>0)st.push('투명');if(mo.freezeT>0)st.push('쿨타임 멈춤');if(mo.eatT>0)st.push('먹는 중');if(mo.smokeT>0)st.push('연기')}
  const sj=st.join(' · ');const sn=$('mgSt');if(sn.textContent!==sj){sn.textContent=sj;sn.hidden=!sj}
  $('mgSmoke').style.opacity=MG.role==='mon'&&mo.smokeT>0?Math.min(1,mo.smokeT):0;
  $('mgTint').className=MG.role==='thief'&&th.cloakT>0?'cl':MG.role==='thief'&&th.inv>0?'iv':'';
  $('mgMapFog').classList.toggle('on',MG.role==='thief'&&th.fogT>0);$('mgCross').hidden=MG.role!=='mon';
  mgDrawMap()}
function mgDrawMap(){const cv=$('mgMap');if(!cv)return;const x=cv.getContext('2d'),S=cv.width,W=MGW(),k=S/W;x.clearRect(0,0,S,S);
  x.fillStyle='#fff8eedd';x.fillRect(0,0,S,S);x.fillStyle='#e9d6bd';for(let i=0;i<N*N;i++)if(!MASK[i])x.fillRect((i%N)*C*k,((i/N)|0)*C*k,C*k+.5,C*k+.5);
  x.strokeStyle='#4a2a1a';x.lineWidth=Math.max(2,S/70);x.lineCap='round';x.beginPath();for(const w of B.walls){if(w.o==='H'){x.moveTo((w.x-1)*C*k,w.z*C*k);x.lineTo((w.x+1)*C*k,w.z*C*k)}else{x.moveTo(w.x*C*k,(w.z-1)*C*k);x.lineTo(w.x*C*k,(w.z+1)*C*k)}}x.stroke();
  const dot=(px,pz,r,f,s)=>{x.beginPath();x.arc(px*k,pz*k,r,0,7);x.fillStyle=f;x.fill();if(s){x.lineWidth=2;x.strokeStyle=s;x.stroke()}};
  const mine=MG.role==='mon';for(const it of MG.items)if(it.type==='fake'){dot(it.x,it.z,S/26,'#ffd23a','#4a2a1a');if(mine){x.strokeStyle='#b98cff';x.lineWidth=2.5;x.beginPath();x.moveTo(it.x*k-5,it.z*k-5);x.lineTo(it.x*k+5,it.z*k+5);x.moveTo(it.x*k+5,it.z*k-5);x.lineTo(it.x*k-5,it.z*k+5);x.stroke()}}
  if(MG.cand)dot(MG.cand.x,MG.cand.z,S/26,'#ffd23a','#4a2a1a');
  if(MG.exitOpen){x.fillStyle='#7ee8c8';x.fillRect((EXIT[0])*C*k,EXIT[1]===0?0:S-C*k*.5,C*k,C*k*.5)}
  const th=MG.th,mo=MG.mo;const arrow=(o,col,r)=>{const fx=-Math.sin(o.yaw),fz=-Math.cos(o.yaw);x.beginPath();x.moveTo(o.x*k+fx*r*1.9,o.z*k+fz*r*1.9);x.lineTo(o.x*k-fz*r*.9,o.z*k+fx*r*.9);x.lineTo(o.x*k+fz*r*.9,o.z*k-fx*r*.9);x.closePath();x.fillStyle=col;x.fill()};
  const showMo=!(MG.role==='thief'&&mo.ghostT>0);if(showMo){dot(mo.x,mo.z,S/17,'#8a4dff','#4a2a1a');if(mine)arrow(mo,'#4a2a1a',S/17)}
  const showTh=!(MG.role==='mon'&&th.cloakT>0);if(showTh){dot(th.x,th.z,S/30,'#3fbf9f','#ffffff');if(!mine)arrow(th,'#2f6b55',S/30)}
  if(MG.decoy&&MG.role==='mon')dot(MG.decoy.x,MG.decoy.z,S/30,'#3fbf9f','#ffffff')}
// ---------- 판 전에 스킬 고르기 ----------
function mgSelOpen(role){let m=$('mgSel');if(!m){m=document.createElement('div');m.id='mgSel';m.className='mg-pick';document.body.appendChild(m);
    m.addEventListener('click',async e=>{const R=m.dataset.role;if(e.target.closest('#mgSelX')){SFX.click();m.hidden=true;return}
      const go=e.target.closest('#mgSelGo');if(go){const sel=R==='thief'?MGSEL.thief:MGSEL.witch;if(sel.length!==(R==='thief'?2:MGWN)){SFX.deny();return}SFX.click();m.hidden=true;try{await initAudio()}catch(_){}
        if(R==='thief'){SAVE.mgTh=sel.slice();saveGame();mgStart('thief',sel.slice(),mgRandWitch())}else{SAVE.mgWi=sel.slice();saveGame();mgStart('mon',mgRandThief(),sel.slice())}return}
      const c=e.target.closest('[data-k]');if(!c)return;const k=c.dataset.k,sel=R==='thief'?MGSEL.thief:MGSEL.witch,max=R==='thief'?2:MGWN;const i=sel.indexOf(k);
      if(i>=0)sel.splice(i,1);else{if(sel.length>=max)sel.shift();sel.push(k)}MGSEL.last=k;SFX.card();mgSelDraw()})}
  m.dataset.role=role;if(role==='thief')MGSEL.thief=(SAVE.mgTh||mgDefThief()).filter(k=>k in MGTS).slice(0,2);else MGSEL.witch=(SAVE.mgWi||mgDefWitch()).filter(k=>k in MGWS).slice(0,MGWN);MGSEL.last=null;mgSelDraw();m.hidden=false}
function mgSelDraw(){const m=$('mgSel'),R=m.dataset.role,th=R==='thief',sel=th?MGSEL.thief:MGSEL.witch,max=th?2:MGWN,keys=th?MGTK:MGWK;
  const nm=k=>th?mgSkName(k):MGWS[k].n,ic=k=>th?mgSkSvg(k):(ART[k]||''),ds=k=>th?MGTS[k].d:MGWS[k].d;const last=MGSEL.last||sel[sel.length-1];
  m.innerHTML=`<div class="slab mg-pk mg-sel"><div class="mg-pk-top"><span class="mg-tag">${th?MGI.thief:MGI.witch}</span><b>${th?'쿠키 도둑 스킬':'거대 마녀 스킬'} <em>${sel.length}/${max}</em></b><button class="mg-ib" id="mgSelX" aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/></svg></button></div>
    <div class="mg-sel-grid ${th?'t':'w'}">${keys.map(k=>`<button class="mg-sel-c${sel.includes(k)?' on':''}" data-k="${k}" style="--c:${MGCOLS[k]||'#e3c9a8'}" aria-label="${nm(k)}"><span>${ic(k)}</span><b>${nm(k)}</b>${sel.includes(k)?`<i>${sel.indexOf(k)+1}</i>`:''}</button>`).join('')}</div>
    <div class="mg-sel-bot"><p>${last?`<b>${nm(last)}</b> · ${ds(last)}`:(th?'대시는 늘 있어요 · 스킬 2개를 골라요':'사탕 구슬(평타)은 늘 있어요 · 스킬 3개를 골라요')}</p><button class="mg-go${sel.length===max?'':' off'}" id="mgSelGo" aria-label="시작">시작</button></div></div>`}

{const st=document.createElement('style');st.textContent=`
#mgHud{position:fixed;inset:0;z-index:20;pointer-events:none;font-family:var(--f-display);color:var(--choco)}
#mgHud>*{pointer-events:auto}#mgHud #mgFlash{position:fixed;inset:0;pointer-events:none;background:radial-gradient(circle,transparent 45%,#ff3d6f 120%);opacity:0}
.mg-top{z-index:3;position:fixed;left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));top:8px;display:flex;align-items:flex-start;justify-content:space-between;pointer-events:none}
.mg-top>*{pointer-events:auto}.mg-hp{display:flex;gap:2px;background:#fff8eecc;border:2.5px solid var(--choco);border-radius:14px;padding:3px 7px;box-shadow:0 3px 0 var(--choco)}
.mg-hp i{width:24px;height:24px;display:block;filter:grayscale(1) opacity(.35)}.mg-hp i.on{filter:none}.mg-hp svg,.mg-stars svg{width:100%;height:100%}
.mg-mid{position:absolute;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:3px}
.mg-time{min-width:64px;text-align:center;font-size:20px;background:#fff8ee;border:2.5px solid var(--choco);border-radius:14px;padding:1px 10px;box-shadow:0 3px 0 var(--choco)}.mg-time.hurry{background:#ffd0dc;color:#c0264f}
.mg-stars{display:flex;gap:1px;background:#4a2a1ab0;border-radius:12px;padding:2px 6px}.mg-stars i{width:20px;height:20px;display:block;filter:grayscale(1) brightness(1.5) opacity(.55)}.mg-stars i.on{filter:none}
.mg-ib{width:42px;height:42px;border-radius:50%;border:2.5px solid var(--choco);background:#fff8ee;box-shadow:0 3px 0 var(--choco);display:grid;place-items:center;padding:8px;cursor:pointer}.mg-ib svg{width:100%;height:100%}
.mg-who-old{position:fixed;left:max(10px,env(safe-area-inset-left));top:52px;display:flex;align-items:center;gap:6px;font-size:13px;background:#fff8eecc;border-radius:12px;padding:2px 9px 2px 3px;pointer-events:none}
.mg-tag{width:26px;height:26px;display:grid;place-items:center}.mg-tag svg{width:100%;height:100%}
.mg-joy{position:fixed;left:0;bottom:0;width:42vw;height:66vh;touch-action:none;z-index:2}.mg-jhint{position:absolute;left:max(24px,env(safe-area-inset-left));bottom:22px;width:84px;height:84px;border-radius:50%;border:2.5px dashed #4a2a1a66;display:grid;place-items:center;font-size:11px;color:#4a2a1a99;pointer-events:none}
.mg-jhint i{width:34px;height:34px;border-radius:50%;background:#ffffff88;border:2.5px solid #4a2a1a55}.mg-joy.on .mg-jhint{opacity:0}.mg-stick{position:fixed;display:none;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;background:#ffffff55;border:3px solid #ffffffcc;pointer-events:none}
.mg-stick i{position:absolute;left:50%;top:50%;width:42px;height:42px;margin:-21px 0 0 -21px;border-radius:50%;background:#fff;border:3px solid var(--choco);box-shadow:0 3px 0 var(--choco)}
.mg-btns{position:fixed;right:max(12px,env(safe-area-inset-right));bottom:12px;display:flex;align-items:flex-end;gap:8px;touch-action:none;z-index:3}
.mg-row{display:flex;gap:8px;align-items:flex-end}.mg-grid{display:grid;grid-template-columns:repeat(3,auto);gap:6px;direction:rtl}.mg-grid>*{direction:ltr}
.mg-ab.mgcard{width:50px;height:50px;padding:4px;background:#fff8ee}.mg-ab.mgsk{background:#7ee8c8}.mg-ab.frz .cd{background:conic-gradient(#7cc6ffcc calc(var(--k,0)*360deg),transparent 0)}
.mg-ab .ch{position:absolute;right:-4px;top:-4px;min-width:20px;height:20px;border-radius:10px;background:#fff;border:2px solid var(--choco);font:12px/16px var(--f-display);color:var(--choco);z-index:3}.mg-ab .ch:empty{display:none}
.mg-look{position:fixed;inset:0;touch-action:none;z-index:1}
.mg-map{position:fixed;right:max(10px,env(safe-area-inset-right));top:56px;width:min(28vh,124px);height:min(28vh,124px);border:2.5px solid var(--choco);border-radius:12px;overflow:hidden;box-shadow:0 3px 0 var(--choco);pointer-events:none;z-index:2;background:#fff8ee}
.mg-map canvas{width:100%;height:100%;display:block}.mg-mapfog{position:absolute;inset:0;background:repeating-linear-gradient(45deg,#d9c2ff,#d9c2ff 6px,#b98cff 6px,#b98cff 12px);opacity:0;transition:opacity .3s}.mg-mapfog.on{opacity:.96}
.mg-st{position:fixed;left:max(10px,env(safe-area-inset-left));top:50px;font-size:13px;background:#4a2a1ad0;color:#fff;border-radius:10px;padding:2px 9px;pointer-events:none;z-index:2}.mg-st[hidden]{display:none}
.mg-msg{position:fixed;left:50%;top:74px;transform:translateX(-50%);max-width:70vw;text-align:center;font-size:16px;color:#fff;-webkit-text-stroke:4px var(--choco);paint-order:stroke;pointer-events:none;opacity:0;transition:opacity .2s;z-index:2;white-space:nowrap}.mg-msg.on{opacity:1}
.mg-cross{position:fixed;left:50%;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 2px #4a2a1a88;pointer-events:none;z-index:2}.mg-cross::after{content:'';position:absolute;left:50%;top:50%;width:6px;height:6px;margin:-3px;border-radius:50%;background:#ff5f9e}.mg-cross[hidden]{display:none}
#mgSmoke{position:fixed;inset:0;pointer-events:none;opacity:0;background:radial-gradient(circle at 30% 40%,#fffffff0 0 30%,transparent 55%),radial-gradient(circle at 70% 60%,#ffe6f2f0 0 30%,transparent 58%),#ffffffd0;transition:opacity .3s}
#mgTint{position:fixed;inset:0;pointer-events:none;transition:box-shadow .2s}#mgTint.cl{box-shadow:inset 0 0 70px 20px #b98cffaa}#mgTint.iv{box-shadow:inset 0 0 40px 10px #ffd35faa}
.mg-stars i.door{width:22px;height:22px}
.mg-sel{width:min(94vw,640px)!important}.mg-pk-top b em{font-style:normal;color:#ff5f9e;margin-left:4px}.mg-pk-top .mg-tag{width:30px;height:30px}
.mg-sel-grid{display:grid;gap:5px;min-height:0;overflow:auto}.mg-sel-grid.w{grid-template-columns:repeat(8,minmax(0,1fr))}.mg-sel-grid.t{grid-template-columns:repeat(7,minmax(0,1fr))}
.mg-sel-c{position:relative;display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 2px;border-radius:12px;border:2.5px solid #e3c9a8;background:#fff8ee;cursor:pointer;font-family:var(--f-display);color:var(--choco);min-width:0}
.mg-sel-c.on{border-color:var(--choco);background:#ffe0ef;box-shadow:0 3px 0 var(--choco)}.mg-sel-c span{width:min(40px,10vh);height:min(40px,10vh);display:grid;place-items:center}.mg-sel-c span svg{width:100%;height:100%}
.mg-sel-c b{font-size:11px;line-height:1.15;text-align:center;word-break:keep-all;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mg-sel-c i{position:absolute;right:-5px;top:-5px;width:20px;height:20px;border-radius:50%;background:#ff5f9e;color:#fff;font:12px/20px var(--f-display);font-style:normal}
.mg-sel-bot{display:flex;align-items:center;gap:10px}.mg-sel-bot p{flex:1;margin:0;font-size:13px;color:var(--choco);min-height:2.4em;display:flex;align-items:center}.mg-big.off{filter:grayscale(.8);opacity:.6}
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
@media (max-height:340px){.mg-ab{width:50px;height:50px;padding:9px}.mg-ab.big{width:66px;height:66px;padding:13px}.mg-big{width:56px;height:56px}.mg-rk{font-size:24px}.mg-who-old{top:46px}.mg-hp i{width:20px;height:20px}}`;
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
  row.insertAdjacentHTML('beforeend',`<button class="rcard mint" id="mgTh" hidden><span class="mg-rart">${MGI.thief}</span><b>쿠키 도둑</b><small>사탕 6개 먹고 넘어가기</small></button><button class="rcard grape" id="mgMo" hidden><span class="mg-rart">${MGI.witch}</span><b>거대 마녀</b><small>도둑 잡기</small></button>`);
  $('mgTh').onclick=()=>{SFX.click();mgSelOpen('thief')};
  $('mgMo').onclick=()=>{SFX.click();mgSelOpen('mon')}}
{const sr=showRole;showRole=function(){const r=sr.apply(this,arguments);try{mgEnsureRole();const ok=ROLECTX==='ai';$('mgTabs').hidden=!ok;if(!ok)MGTAB='main';const mini=MGTAB==='mini';
    for(const b of $('mgTabs').children)b.classList.toggle('on',b.dataset.t===MGTAB);
    $('mgTh').hidden=$('mgMo').hidden=!mini;
    if(mini){for(const id of['bHero','bDevil','bRankGo'])if($(id))$(id).hidden=true;if($('aiLvl'))$('aiLvl').hidden=false;$('roleNote').textContent='미니게임 · 1인칭 3분 한 판 · 판 전에 스킬을 골라요 · 보상과 등급은 없어요';$('roleKick').textContent='혼자 하기 · 미니게임 · 거대 마녀'}
  }catch(e){}return r}}
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
