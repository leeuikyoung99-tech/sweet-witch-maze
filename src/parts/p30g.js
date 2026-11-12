/* ================= 30차 (사): 거미줄 거미 · 슈퍼 가짜 사탕 · 시작 때 상대 증강체 · 마지막 판엔 다음 판용 증강체 안 나와요 ================= */
// 젤리 거미: 2소다, 소환된 곳 근처 한 칸 통로에 거미줄
CARDS.spider.cost=2;CBASE.spider=2;
CARD_DESC.spider='근처 벽과 벽 사이 한 칸 통로에 거미줄을 쳐요 · 지나가면 느려져요';
let WEBTEX=null;
function webTex(){if(WEBTEX)return WEBTEX;WEBTEX=canvasTex(256,256,(g,w,h)=>{g.clearRect(0,0,w,h);g.strokeStyle='rgba(255,255,255,.95)';g.lineWidth=3;const cx=w/2,cy=h/2;
  for(let k=0;k<12;k++){const a=k/12*Math.PI*2;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*w*.7,cy+Math.sin(a)*h*.7);g.stroke()}
  g.lineWidth=2.2;for(let r=14;r<w*.7;r+=17){g.beginPath();for(let k=0;k<=12;k++){const a=k/12*Math.PI*2,rr=r*(1+.06*Math.sin(k*2.3));const x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;k?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}});
  WEBTEX.wrapS=WEBTEX.wrapT=THREE.ClampToEdgeWrapping;return WEBTEX}
function webMesh(o){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.PlaneGeometry(C-WT,WH*.92),new THREE.MeshBasicMaterial({map:webTex(),transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false,color:'#e9fff8'}));m.position.y=WH*.46;g.add(m);if(o==='ew')g.rotation.y=Math.PI/2;return g}
// 'ns' = 남북으로 가는 통로(동서가 벽) → 거미줄은 동서로 걸쳐요 / 'ew' = 동서로 가는 통로
function corridorDir(x,z){if(!inM(x,z))return null;const ns=wallE(x-1,z)&&wallE(x,z)&&!wallS(x,z-1)&&!wallS(x,z),ew=wallS(x,z-1)&&wallS(x,z)&&!wallE(x-1,z)&&!wallE(x,z);return ns?'ns':ew?'ew':null}
function spiderNest(e){const[sx,sz]=cellOf(e.x,e.z);const h=G.hero,[hx,hz]=cellOf(h.x,h.z);G.sweb=G.sweb||[];
  const seen=new Map([[idx(sx,sz),0]]),q=[[sx,sz]];let best=null,bd=1e9;
  for(let i=0;i<q.length;i++){const[x,z]=q[i],d=seen.get(idx(x,z));const o=corridorDir(x,z);
    if(o&&!(x===hx&&z===hz)&&!(x===START[0]&&z===START[1])&&!(x===EXIT[0]&&z===EXIT[1])&&!G.sweb.some(w=>w.cx===x&&w.cz===z)){const sc=d+Math.random()*.5;if(sc<bd){bd=sc;best={x,z,o}}}
    if(best&&d>=4)continue;for(const[dx,dz]of DIRS){const a=x+dx,b=z+dz;if(!inB(a,b)||!canStep(x,z,dx,dz))continue;const k=idx(a,b);if(seen.has(k))continue;seen.set(k,d+1);q.push([a,b])}}
  if(!best){const o=wallE(sx-1,sz)||wallE(sx,sz)?'ns':'ew';best={x:sx,z:sz,o}}
  if(best.x===hx&&best.z===hz){spiderNest.retry=(spiderNest.retry||0);e.web=null;return}
  const w={cx:best.x,cz:best.z,x:cx2x(best.x),z:cx2x(best.z),o:best.o,owner:e,id:++G.eid,g:webMesh(best.o),warn:0};w.g.position.set(w.x,0,w.z);x28add(w.g);G.sweb.push(w);e.web=w;e.walkT=0;e.life=Math.max(e.life,40)}
function webDrop(w){drop(w.g);const j=X28.list.indexOf(w.g);if(j>=0)X28.list.splice(j,1)}
{const ue6=updEnts;updEnts=function(dt){ue6(dt);if(!G.sweb||!G.sweb.length)return;const h=G.hero;
  for(let i=G.sweb.length-1;i>=0;i--){const w=G.sweb[i];const alive=w.owner&&G.ents.includes(w.owner)&&!w.owner.dead;if(!alive){webDrop(w);G.sweb.splice(i,1);continue}
    if(G.mirror||!h||G.over||h.jump)continue;const[cx,cz]=cellOf(h.x,h.z);if(cx!==w.cx||cz!==w.cz)continue;const off=w.o==='ns'?Math.abs(h.z-w.z):Math.abs(h.x-w.x);
    if(off<1.4){h.slowT=Math.max(h.slowT||0,2.5);w.warn-=dt;if(w.warn<=0){w.warn=3;SFX.squish();if(meLoud())say('거미줄에 걸렸어요! 느려져요',true,1.2)}}}}}
{const cw7=clearWorld;clearWorld=function(){cw7();if(G.sweb)for(const w of G.sweb)webDrop(w);G.sweb=[];if(G.msweb){for(const g of G.msweb.values())drop(g);G.msweb.clear()}}}
// 온라인: 거미줄 위치를 같이 보내요
{const ns7=netSend;netSend=function(m){if(m&&m.t==='s'&&G&&G.sweb)m.sw=G.sweb.map(w=>[w.id,r1(w.x),r1(w.z),w.o==='ns'?0:1]);return ns7(m)}}
{const as7=applySnap;applySnap=function(s){as7(s);G.msweb=G.msweb||new Map();const seen=new Set();for(const[id,x,z,o]of s.sw||[]){seen.add(id);if(!G.msweb.has(id)){const g=webMesh(o?'ew':'ns');g.position.set(x,0,z);x28add(g);G.msweb.set(id,g)}}for(const[id,g]of G.msweb)if(!seen.has(id)){drop(g);G.msweb.delete(id)}}}

// 슈퍼 가짜 사탕 (예전 가짜 출구): 진짜 같은 큰 사탕 하나, 한 번 닿으면 출발점으로 보내고 사라져요
if(AUGI2.wp_fake){AUGI2.wp_fake.n='슈퍼 가짜 사탕';AUGI2.wp_fake.d='진짜 사탕과 똑같이 생긴 사탕|먹으면 출발점으로';AUGI2.wp_fake.ic='candy'}
{const i=AUGW2.findIndex(q=>q[0]==='wp_fake');if(i>=0){AUGW2[i][2]='슈퍼 가짜 사탕';AUGW2[i][3]='진짜 사탕과 똑같이 생긴 사탕|먹으면 출발점으로';AUGW2[i][4]='candy'}}
function superCandyMesh(){const g=new THREE.Group(),b=new THREE.Group();g.add(b);const st=canvasTex(128,64,(c,w,h)=>{c.fillStyle='#fff6fb';c.fillRect(0,0,w,h);c.fillStyle='#ff5f9e';for(let i=0;i<8;i++){c.save();c.translate(i*16,0);c.transform(1,0,.6,1,0,0);c.fillRect(0,0,8,h);c.restore()}},[2,1]);
  const ball=new THREE.Mesh(new THREE.SphereGeometry(1.05,24,16),new THREE.MeshLambertMaterial({map:st}));ball.scale.set(1.25,1,1);b.add(ball);
  for(const s of[-1,1]){const k=new THREE.Mesh(new THREE.SphereGeometry(.42,14,10),LM('#ffd35f'));k.scale.set(.55,1.1,1.1);k.position.x=s*1.55;b.add(k);const tw=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),LM('#ffb347'));tw.position.x=s*1.28;b.add(tw)}
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.4,1.8,32),new THREE.MeshBasicMaterial({color:'#ffd35f',transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.05;g.add(ring);
  b.position.y=1.5;g.userData.spin=b;return g}
function superCandyGone(){const f=G.fexit;if(G.fcandy){drop(G.fcandy);const j=X28.list.indexOf(G.fcandy);if(j>=0)X28.list.splice(j,1);G.fcandy=null}if(f)f.used=true;if(!G.mirror)G.fexit=null}
{const nm8=newMatch;newMatch=function(mode){nm8(mode);G.fcandy=null;if(!G.fexit)return;const fx=cx2x(G.fexit.x),fz=cx2x(G.fexit.z);
  for(let i=X28.list.length-1;i>=0;i--){const o=X28.list[i];if(o&&o.position&&Math.abs(o.position.x-fx)<.01&&Math.abs(o.position.z-fz)<.01){drop(o);X28.list.splice(i,1)}}
  const px=fx+(Math.random()-.5)*2.2,pz=fz+(Math.random()-.5)*2.2;G.fexit.px=px;G.fexit.pz=pz;
  addCandy(px,pz,true);const c=G.candies.pop();X28.list.push(c.g);G.fcandy=c.g;G.fcandy.userData.ph=c.ph}}
{const uh5=updHero;updHero=function(dt){const was=G.fexit&&!G.fexit.used,h=G.hero,t0=h?h.fexT||0:0;uh5(dt);if(G.fcandy){const u=G.fcandy.userData;u.ph=(u.ph||0)+dt*2;G.fcandy.position.y=1+Math.sin(u.ph)*.18;G.fcandy.rotation.y+=dt}if(was&&h&&(h.fexT||0)>t0+1)superCandyGone()}}
{const sy0=say;say=function(t,...r){if(typeof t==='string'){if(t.startsWith('가짜 출구였어요')){t='슈퍼 가짜 사탕이었어요! 출발점으로 돌아왔어요';superCandyGone()}else if(t.startsWith('도둑이 가짜 출구에 속았어요')){t='도둑이 슈퍼 가짜 사탕에 속았어요!';superCandyGone()}}return sy0(t,...r)}}

// 마지막 판(3판)에는 다음 판에 쓰는 증강체(저금통)가 나오지 않아요
const NEXTONLY=['tn_piggy','wn_piggy'];
{const ac3=augChoices3;augChoices3=function(side,tier,have,ctx){const S=curSer();const last=S&&S.on&&S.r>=3;if(!last)return ac3(side,tier,have,ctx);return ac3(side,tier,have.concat(NEXTONLY),ctx)}}

// 판이 시작될 때 3초 동안 상대 증강체를 보여 줘요
function showOpAugs(){const S=(G.chal||G.duo||G.stage)?null:curSer();const el=$('opAugShow');if(!el)return;if(!S||!S.on||!S.aug||!S.aug.op.length){el.hidden=true;return}
  const ids=S.aug.op.filter(id=>AUGI2[id]);if(!ids.length){el.hidden=true;return}
  el.innerHTML=`<b>${S.kind==='ai'?'AI':'상대'} 증강체</b><div>${ids.map(id=>`<span class="oa">${augIcon(id,true)}<em>${AUGI2[id].n}</em></span>`).join('')}</div>`;el.hidden=false;el.classList.remove('out');
  clearTimeout(showOpAugs.t);showOpAugs.t=setTimeout(()=>{el.classList.add('out');setTimeout(()=>{el.hidden=true},350)},3000)}
{const d=document.createElement('div');d.id='opAugShow';d.hidden=true;d.addEventListener('pointerdown',()=>{d.hidden=true});document.body.appendChild(d)}
{const bm7=beginMatch;beginMatch=function(m,k){const r=bm7(m,k);try{showOpAugs()}catch(e){}return r}}
{const ts8=titleScreen;titleScreen=function(){ts8();const el=$('opAugShow');if(el)el.hidden=true}}
