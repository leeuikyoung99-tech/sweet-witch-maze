/* ================= 29차 (가): 몬스터는 예고 없이 원래 행동 · 닿으면 피해 후 사라짐 · 버닝 30초 · 맵 정사각형 ================= */
// 맵은 모두 13×13 정사각형 (장식만 달라요)
for(const k in THEMES)THEMES[k].shape='square';
// 몬스터 수치
const CDMG={skel:13,bat:11,bear:27,soldier:16,ginger:25};
Object.assign(MONP.bear,{spd:2.1});
function contactHit(e){const h=G.hero,A=G.aug||{};if(G.mirror||G.over)return false;
  if(e.type==='ghost'){if(h.inv>0||h.dashT>0)return false;h.root=Math.max(h.root,.6);h.dashCd=Math.max(h.dashCd,.6);h.inv=Math.max(h.inv,.4);SFX.bonk();netEv('boo');if(meLoud())say('유령에 닿아 잠깐 멈췄어요',true,1.2);G.stats.hits++;return true}
  const dmg=Math.round(CDMG[e.type]||20);const msg={skel:'슬라임에게 부딪혔어요!',bat:'사탕 박쥐에게 쪼였어요!',bear:'젤리 곰에게 튕겨 나갔어요!',soldier:'쿠키 병정의 창에 찔렸어요!',ginger:'인간쿠키에게 맞았어요!'}[e.type]||'몬스터에게 맞았어요!';
  const ok=hurt(e,dmg,msg);if(ok&&e.type==='bear'){h.kx*=2;h.kz*=2}return ok}
function monGone(e){if(e.dead)return;e.dead=.5;burstFx(e.x,e.z,e.type==='ghost'?'smoke':e.type);play(e.m,'Death_A',.15,true)}
monTick=function(e,dt,i){const h=G.hero,A=G.aug||{};e.m.mixer.update(dt);
  if(e.dead){e.dead-=dt;if(e.dead<=0){drop(e.g);G.ents.splice(i,1)}return 0}
  if(e.life<=0){monGone(e);return 0}
  e.clack-=dt;if(e.clack<=0){e.clack=1.6+Math.random()*2;if(meLoud()&&Math.hypot(e.x-h.x,e.z-h.z)<22)SFX.clack()}
  if(e.stun>0){e.stun-=dt;if(e.stun<=0)play(e.m,'Running_A');e.g.position.set(e.x,e.hy||0,e.z);monFly(e);return 0}
  if(e.hitCd>0)e.hitCd-=dt;
  const hv=heroVisible(h);let sp=e.spd*(A.wswift?1.12:1)*(G.hasteT>0?1.4:1);
  // 젤리 거미: 소환된 곳 근처, 벽과 벽 사이 한 칸 통로에 자리를 잡고 거미줄을 쳐요 (닿으면 느려져요 · 공격은 안 해요)
  if(e.type==='spider'){if(!e.web&&!G.mirror)spiderNest(e);
    if(e.web){spiderWalk(e,dt)}
    e.g.position.set(e.x,0,e.z);monFly(e);e.g.rotation.y=e.face;return 0}
  // 쿠키 병정: 통로를 왔다 갔다 순찰
  if(e.type==='soldier'){if(e.vis){e.g.remove(e.vis);e.vis=null}
    // 도둑을 알아차리면 머리 위에 느낌표! 잠깐 멈췄다가 빠르게 달려들어요
    const dh0=Math.hypot(h.x-e.x,h.z-e.z);
    if(!(e.alert>0)&&!(e.chg>0)){if(e.rest>0)e.rest-=dt;else if(dh0<15&&hv&&!h.isRival){let a0=Math.atan2(h.x-e.x,h.z-e.z)-e.face;a0=Math.atan2(Math.sin(a0),Math.cos(a0));if(Math.abs(a0)<1.25&&los(e.x,e.z,h.x,h.z)){e.alert=.55;bangOn(e,true);if(meLoud())SFX.bell()}}}
    if(e.alert>0){e.alert-=dt;e.face=Math.atan2(h.x-e.x,h.z-e.z);e.g.position.set(e.x,0,e.z);e.g.rotation.y=e.face;if(e.alert<=0){e.chg=3.5;e.target='hero';e.retarget=9;e.lostT=0}return 0}
    if(e.chg>0){e.chg-=dt;sp*=2.4;e.target='hero';e.retarget=9;if(e.chg<=0||e.lostT>1.5){e.chg=0;e.rest=2.5;e.lostT=0;bangOn(e,false);soldierPath(e)}}
    else{
    if(e.pat){const p=e.pat[e.patI],tx=cx2x(p[0]),tz=cx2x(p[1]),dx=tx-e.x,dz=tz-e.z,L=Math.hypot(dx,dz);if(L<.3){e.patI=1-e.patI;e.wait=.6}else if(!(e.wait>0)){const st=sp*dt;e.x+=dx/L*Math.min(st,L);e.z+=dz/L*Math.min(st,L);e.face=Math.atan2(dx,dz)}if(e.wait>0)e.wait-=dt}else e.face+=dt*.8;
    collide(e,e.r);e.g.position.set(e.x,0,e.z);e.g.rotation.y=e.face;
    const d=Math.hypot(h.x-e.x,h.z-e.z);if(d<e.r+HERO.r+.25&&!(e.hitCd>0)){let a=Math.atan2(h.x-e.x,h.z-e.z)-e.face;a=Math.atan2(Math.sin(a),Math.cos(a));
      if(Math.abs(a)<1.05){if(contactHit(e))monGone(e)}else{const L=d||1;h.x=e.x+(h.x-e.x)/L*(e.r+HERO.r+.3);h.z=e.z+(h.z-e.z)/L*(e.r+HERO.r+.3);collide(h,HERO.r)}}
    if(G.decoy&&Math.hypot(G.decoy.x-e.x,G.decoy.z-e.z)<e.r+.6){popDecoy(true);monGone(e)}
    return 0}}
  // 대상 정하기 (곰만 분신에 안 속아요 · 유령도 분신을 쫓아가요)
  e.retarget-=dt;const figs=figures();if(e.target==='decoy'&&!G.decoy)e.target=null;if(e.target==='hero'&&e.type!=='ghost'&&!hv)e.target=null;
  if(e.type==='ghost'&&!G.decoy)e.target='hero';else if(e.retarget<=0){e.retarget=.4;let best=null,bd=1e9;for(const f of figs){if(e.type==='bear'&&!f.real)continue;const d=Math.hypot(f.x-e.x,f.z-e.z)-(f.real&&e.target==='hero'?1:0)-(!f.real&&e.target==='decoy'?1:0);if(d<bd){bd=d;best=f}}if(best)e.target=best.real?'hero':'decoy'}
  if(G.lure&&e.type!=='ghost'&&e.type!=='bear'&&Math.hypot(G.lure.x-e.x,G.lure.z-e.z)<22){if(Math.hypot(G.lure.x-e.x,G.lure.z-e.z)<1.6){monGone(e);return 0}e.target='lure'}
  let t=null;if(e.target==='hero')t={x:h.x,z:h.z,real:true};else if(e.target==='decoy'&&G.decoy)t={x:G.decoy.x,z:G.decoy.z};else if(e.target==='lure'&&G.lure)t={x:G.lure.x,z:G.lure.z};
  if(!t){e.lostT+=dt;const lk=h.lastSeen||h;t={x:lk.x,z:lk.z,lost:true}}else e.lostT=0;
  let tx=t.x,tz=t.z;const[cx,cz]=cellOf(e.x,e.z),[gx,gz]=cellOf(t.x,t.z),dTo=Math.hypot(t.x-e.x,t.z-e.z);
  if(e.type!=='ghost'&&!(dTo<8&&los(e.x,e.z,t.x,t.z))){const f=field(gx,gz),here=f[idx(cx,cz)];if(here>0)for(const[dx,dz]of DIRS){const a=cx+dx,b=cz+dz;if(a<0||b<0||a>=N||b>=N||!canStep(cx,cz,dx,dz))continue;if(f[idx(a,b)]===here-1){tx=cx2x(a);tz=cx2x(b);break}}}
  let dx=tx-e.x,dz=tz-e.z;const L=Math.hypot(dx,dz)||1;dx/=L;dz/=L;
  // 박쥐: 지그재그
  if(e.type==='bat'){e.zz=(e.zz||Math.random()*6)+dt*5;const s=Math.sin(e.zz)*.85;const px=-dz,pz=dx;dx+=px*s;dz+=pz*s;const l2=Math.hypot(dx,dz)||1;dx/=l2;dz/=l2}
  if(e.type!=='ghost')for(const j of G.ents)if((j.type==='jelly'||j.type==='gum')&&Math.hypot(j.x-e.x,j.z-e.z)<j.r)sp*=j.type==='gum'?.35:.7;if(e.slick>0){e.slick-=dt;sp*=.5}
  // 슬라임: 아무 때나 불규칙하게 높이 뛰어요 (떠 있을 땐 밑으로 지나갈 수 있어요)
  // 슬라임: 낮게 통통 뛰며 천천히 다가와요
  if(e.type==='skel'){sp*=.85;e.hop=(e.hop||0)+dt*2.4;e.hy=Math.abs(Math.sin(e.hop*Math.PI))*.55}
  if(L>.05){e.x+=dx*sp*dt;e.z+=dz*sp*dt;e.face=Math.atan2(dx,dz)}
  for(const o of G.ents){if(o===e||!isMon(o)||o.dead)continue;const ox=e.x-o.x,oz=e.z-o.z,d=Math.hypot(ox,oz),m=e.r+o.r;if(d<m&&d>1e-4){e.x+=ox/d*(m-d)*.5;e.z+=oz/d*(m-d)*.5}}
  if(e.type!=='ghost')collide(e,e.r);else{e.x=clamp(e.x,1,N*C-1);e.z=clamp(e.z,1,N*C-1)}
  e.g.position.set(e.x,0,e.z);monFly(e);if(e.type==='skel'&&e.hy)e.g.position.y=e.hy;e.g.rotation.y=e.face;
  // 닿으면 피해 → 사라짐 (질긴 몬스터 증강체면 두 번째에)
  const air=e.type==='skel'&&(e.hy||0)>1.4;
  if(!air&&!(e.hitCd>0)&&Math.hypot(h.x-e.x,h.z-e.z)<e.r+HERO.r+.2){if(contactHit(e)){if(A.wtough&&!e.toughUsed){e.toughUsed=true;e.hitCd=1.2;e.stun=.6}else monGone(e);if(A.whitbonus&&!G.mirror)G.devil.pt=Math.min(ptMax(),G.devil.pt+1)}}
  if(G.decoy&&!air&&e.type!=='bear'&&Math.hypot(G.decoy.x-e.x,G.decoy.z-e.z)<e.r+.6){popDecoy(true);monGone(e)}
  return t.real&&dTo<14?1-dTo/14:0};
// 거미줄
function dropWeb(x,z){const g=new THREE.Group();const th=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,WH,4),LM('#ffffff'));th.position.y=WH/2;g.add(th);const net=new THREE.Mesh(new THREE.CircleGeometry(1.3,12),new THREE.MeshBasicMaterial({color:'#e9fff8',transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false}));net.rotation.x=-Math.PI/2;net.position.y=.12;g.add(net);g.position.set(x,0,z);x28add(g);(G.webZ=G.webZ||[]).push({x,z,t:4,g,id:++G.eid})}
{const ug1=updEnts;updEnts=function(dt){ug1(dt);const h=G.hero;if(G.webZ)for(let i=G.webZ.length-1;i>=0;i--){const w=G.webZ[i];w.t-=dt;let hit=false;if(!G.mirror&&!(h.dashT>0)&&Math.hypot(h.x-w.x,h.z-w.z)<1.3){h.slowT=Math.max(h.slowT||0,2);hit=true;SFX.squish();if(meLoud())say('거미줄에 걸렸어요! 2초 느려져요',true,1.2)}if(w.t<=0||hit){drop(w.g);const j=X28.list.indexOf(w.g);if(j>=0)X28.list.splice(j,1);G.webZ.splice(i,1)}}}}
// 인간쿠키도 같은 규칙으로 (예고 없이 쫓아와 닿으면 피해)
// 온라인: 슬라임 높이·거미줄
{const ns6=netSend;netSend=function(m){if(m&&m.t==='s'&&G&&G.ents){m.hj=G.ents.filter(e=>e.type==='skel'&&e.hy>.02).map(e=>[e.id,r1(e.hy)]);m.wz=(G.webZ||[]).map(w=>[w.id,r1(w.x),r1(w.z)])}return ns6(m)}}
{const as2=applySnap;applySnap=function(s){as2(s);const hj=new Map(s.hj||[]);for(const e of G.ents)if(e.type==='skel')e.hy=hj.get(e.id)||0;
  G.mweb=G.mweb||new Map();const seen=new Set();for(const[id,x,z]of s.wz||[]){seen.add(id);if(!G.mweb.has(id)){const g=new THREE.Group();const net=new THREE.Mesh(new THREE.CircleGeometry(1.3,12),new THREE.MeshBasicMaterial({color:'#e9fff8',transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false}));net.rotation.x=-Math.PI/2;net.position.y=.12;g.add(net);g.position.set(x,0,z);x28add(g);G.mweb.set(id,g)}}for(const[id,g]of G.mweb)if(!seen.has(id)){drop(g);G.mweb.delete(id)}}}
{const mu1=mirrorUpdate;mirrorUpdate=function(dt){mu1(dt);for(const e of G.ents)if(e.type==='skel'&&e.hy)e.g.position.y=e.hy}}
{const cw2=clearWorld;clearWorld=function(){cw2();G.webZ=[];if(G.mweb)G.mweb.clear()}}

/* ----- 버닝: 마지막 30초 · 마녀 카드 소다 -1 ----- */
const CBASE={};for(const k in CARDS)CBASE[k]=CARDS[k].cost;
function cardDisc(k){const A=G.aug||{};let d=0;if(A.wmondisc&&(MONK.includes(k)||k==='skel')&&(CBASE[k]||CARDS[k].cost)>2)d++;if(A.wtrapdisc&&TRAPS.includes(k))d++;return d}
function applyCosts(){let key='';for(const k in CARDS){if(CBASE[k]==null)CBASE[k]=CARDS[k].cost;const c=Math.max(1,CBASE[k]-cardDisc(k));if(CARDS[k].cost!==c)CARDS[k].cost=c;key+=c}if(applyCosts.key!==key){applyCosts.key=key;try{if(G.devil&&G.mode==='devil')buildHand()}catch(e){}}}
setInterval(applyCosts,250);
{const ac5=applyCard;applyCard=function(k,x,z,extra){applyCosts();return ac5(k,x,z,extra)}}
const ptMax=()=>((G.aug||{}).wbank?14:10);

// 쿠키 병정 머리 위 느낌표
let BANGT=null;function bangTex(){if(BANGT)return BANGT;BANGT=canvasTex(64,128,(c,w,h)=>{c.font='bold 108px sans-serif';c.textAlign='center';c.textBaseline='middle';c.lineWidth=14;c.strokeStyle='#4a2a1a';c.strokeText('!',w/2,h/2+6);c.fillStyle='#ffd35f';c.fillText('!',w/2,h/2+6)});keepTex&&keepTex(BANGT);return BANGT}
function bangOn(e,on){if(on){if(!e.bang){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:bangTex(),depthTest:false,transparent:true}));const k=e.g.scale.y||1;sp.scale.set(1.3/k,2.6/k,1);sp.position.set(0,4.9/k,0);sp.renderOrder=9;e.g.add(sp);e.bang=sp}e.bang.visible=true}else if(e.bang)e.bang.visible=false}
