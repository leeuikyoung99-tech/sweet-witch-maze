/* ================= 4차: 새 몬스터 3 · 새 포탑 2 · 정화 사탕 ================= */
const MONK=['skel','ghost','bat','bear'],TURK=['tower','ice','magnet'];
const monCount=()=>G.ents.filter(e=>MONK.includes(e.type)&&!e.dead).length+G.sigils.filter(s=>s.kind==='skel').length;
Object.assign(SLIMEC,{_ghost:['#fff6fb','#d9c2ff'],_bat:['#8a5ccc','#2a1640'],_bear:['#ff8a5a','#c0401a']});
const MONP={ghost:{dmg:10,reach:2.4,r:1.1,spd:2.6,life:22,msg:'솜사탕 유령에 닿아 느려졌어요!',fly:.7},bat:{dmg:18,reach:1.9,r:.8,spd:5.2,life:18,msg:'사탕 박쥐에게 쪼였어요!',fly:1.5},bear:{dmg:30,reach:3.2,r:1.7,spd:2.9,life:30,msg:'젤리 곰에게 튕겨 나갔어요!'}};
function monModel(k){const m=makeSlime('_'+k),g=m.g,body=g.children[0];
  if(k==='ghost')g.traverse(o=>{if(o.material&&o.material.type==='MeshPhongMaterial'){o.material.opacity=.55}});
  if(k==='bat'){g.scale.setScalar(.62);const wm=new THREE.MeshLambertMaterial({color:'#4a2a6a',side:THREE.DoubleSide});m.wg=[];for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.CircleGeometry(1.4,3),wm);w.position.set(s*1.7,1.5,0);w.rotation.set(Math.PI/2,0,s>0?0:Math.PI);body.add(w);m.wg.push(w)}
    for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.ConeGeometry(.18,.4,6),new THREE.MeshBasicMaterial({color:'#ffffff'}));f.position.set(s*.25,.95,1.25);f.rotation.x=Math.PI;body.add(f)}}
  if(k==='bear'){g.scale.setScalar(1.25);const em=new THREE.MeshPhongMaterial({color:'#ff8a5a',shininess:80});for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.45,12,8),em);e.position.set(s*.95,2.35,0);body.add(e)}
    const sn=new THREE.Mesh(new THREE.SphereGeometry(.38,12,8),new THREE.MeshPhongMaterial({color:'#ffd0b8'}));sn.scale.set(1,.7,.6);sn.position.set(0,1.05,1.25);body.add(sn)}
  return m}
function spawnMon(k,x,z){if(k==='skel')return spawnSkel(x,z);const P=MONP[k],m=monModel(k);addRing(m,'#8a4dff');m.g.position.set(x,0,z);scene.add(m.g);
  const e={id:++G.eid,type:k,dmg:P.dmg,reach:P.reach,hitMsg:P.msg,x,z,r:P.r,spd:P.spd,life:P.life,m,g:m.g,atk:0,stun:.4,target:null,retarget:0,lostT:0,dead:0,face:0,clack:1,fly:P.fly||0};
  if(k!=='bear'&&G.decoy&&Math.random()<.6)e.target='decoy';G.ents.push(e);SFX.clack();return e}
function monFly(e){if(e.fly)e.g.position.y=e.fly+Math.sin(G.t*3+e.id)*.25;if(e.m.wg){const a=Math.sin(G.t*22+e.id)*.7;e.m.wg[0].rotation.y=a;e.m.wg[1].rotation.y=-a}}
// 포탑: 사탕 대포 · 얼음 사탕 포탑(맞으면 느려져요) · 자석 사탕 포탑(보이는 도둑을 끌어당겨요)
function turretMesh(tk){const g=towerMesh(tk==='ice'?'mint':tk==='magnet'?'choco':witchLook().cannon);
  if(tk==='ice'){const m=new THREE.MeshLambertMaterial({color:'#e0f6ff'});for(let i=0;i<5;i++){const c=new THREE.Mesh(new THREE.ConeGeometry(.16,.6,6),m);const a=i/5*Math.PI*2;c.position.set(Math.cos(a)*.6,3.75,Math.sin(a)*.6);c.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5);g.add(c)}g.userData.head.material=new THREE.MeshLambertMaterial({color:'#a8e8ff'})}
  if(tk==='magnet'){const t=new THREE.Mesh(new THREE.TorusGeometry(.55,.18,8,18,Math.PI),new THREE.MeshLambertMaterial({color:'#e8364f'}));t.position.set(0,4.25,0);g.add(t);for(const s of[-1,1]){const tip=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.3,10),new THREE.MeshLambertMaterial({color:'#e9eef5'}));tip.position.set(s*.55,4.12,0);g.add(tip)}g.userData.head.material=new THREE.MeshLambertMaterial({color:'#ff7a8a'})}
  return g}
// 정화 사탕: 나쁜 효과를 모두 풀고, 근처(약 8m)의 덫·발판·껌·종 줄을 지워요
function doClean(ai){if(!skReady('clean',ai))return;const h=G.hero;skPay('clean');h.rev=0;h.slide=null;h.slowT=0;h.jellyT=0;if(h.root>0){h.root=0;if(h.rootMesh){drop(h.rootMesh);h.rootMesh=null}}if(!h.isRival)G.mapFog=0;
  let n=0;for(const e of G.ents){if((TRAPS.includes(e.type)||e.type==='jelly'||e.type==='bell')&&e.life>0&&Math.hypot(e.x-h.x,e.z-h.z)<8){e.life=0;n++}}
  burstFx(h.x,h.z,'smoke');SFX.magic();netEv('clean');if(meLoud())say('✨ 정화! 나쁜 효과가 풀렸어요'+(n?` · 덫 ${n}개 지움`:''),false,1.5)}
/* ----- 등급표: 처음 화면 등급을 누르면 다섯 등급이 좌우로 펼쳐져요 ----- */
function openRank(){const s=SAVE.rank.s|0,t=tierOf(s);
  $('rankRow').innerHTML=TIERS.map(([n],i)=>{const lo=i*5,hi=i===4?'':` ~ ★${4}`;const cur=i===t,done=i<t;
    const stars=i===4?(cur?`★ ${s-20}`:'★ 끝없이'):[0,1,2,3,4].map(j=>`<i class="${cur&&j<s%5||done?'on':''}">★</i>`).join('');
    return`<div class="rk${cur?' cur':''}${done?' done':''}">${cur?'<span class="me">지금 여기</span>':''}${tierIcon(i)}<b>${n}</b><span class="rk-s">${stars}</span><small>${i===0?'시작':TIER_REW[i]+'코인 보상'}</small></div>`+(i<4?'<span class="rk-ar">▶</span>':'')}).join('');
  $('rankNow').innerHTML=`지금 <b>${rankTxt(s)}</b>`+(t<4?` · 다음 등급까지 별 ${5-s%5}개`:'');
  $('rankHow').innerHTML=t<1?'쿠키 → 마카롱: <b>혼자 하기 메인 게임</b>에서 AI(보통·어려움)를 이기면 별 +1<br>마카롱부터: <b>아무나와 하기 메인 게임</b>에서 이기면 +1, 지면 -1':'<b>아무나와 하기 메인 게임</b>에서 이기면 별 +1, 지면 -1<br>등급이 막 오른 자리(별 0개)에서는 져도 내려가지 않아요';
  $('rankM').hidden=false}
