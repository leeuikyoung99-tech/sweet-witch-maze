/* ================= 34차 (나): 포탑 — 매달린 리본 고리 없애고, 대포·얼음 포탑에 포신 달기 (자석은 그대로) ================= */
SHOP.cannon.items.dots=['물방울 대포',200];
{const tw=towerMesh;towerMesh=function(skin){const g=tw.apply(this,arguments);const id=String(skin||'plain');
  for(const o of g.children.slice()){const P=o.geometry&&o.geometry.parameters;if(o.geometry&&o.geometry.type==='TorusGeometry'&&P&&Math.abs(P.arc-Math.PI)<.01&&Math.abs(o.position.y-2.6)<.05)g.remove(o)}
  if(id==='dots')for(const o of g.children.slice())if(o.isGroup&&Math.abs(o.position.y-2.75)<.05)g.remove(o);
  if(id.startsWith('magnet_')){const ey=g.children.find(o=>o.geometry&&o.geometry.type==='SphereGeometry'&&Math.abs(o.geometry.parameters.radius-.22)<.01);if(ey)g.remove(ey);
    const em=new THREE.MeshBasicMaterial({color:'#2a1640'}),hm=new THREE.MeshBasicMaterial({color:'#ffffff'}),cm=new THREE.MeshBasicMaterial({color:'#ff7eb6',transparent:true,opacity:.75});
    for(const x of[-.27,.27]){const e=new THREE.Mesh(new THREE.SphereGeometry(.14,12,10),em);e.scale.set(1,1.3,.55);e.position.set(x,3.42,.66);g.add(e);const h=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),hm);h.position.set(x-.04,3.49,.73);g.add(h);
      const c=new THREE.Mesh(new THREE.CircleGeometry(.13,16),cm);c.position.set(x*1.75,3.2,.58);c.rotation.y=x>0?.75:-.75;g.add(c)}
    const sm=new THREE.Mesh(new THREE.TorusGeometry(.13,.035,6,16,Math.PI),em);sm.rotation.z=Math.PI;sm.position.set(0,3.2,.72);g.add(sm);return g}
  const eye=g.children.find(o=>o.geometry&&o.geometry.type==='SphereGeometry'&&Math.abs(o.geometry.parameters.radius-.22)<.01);if(eye)g.remove(eye);
  const C=CANNONC[id]||CANNONC.stripe,ice=id.startsWith('ice_');const s=C.s||['#ff9ec7','#ffffff'];
  const em=new THREE.MeshBasicMaterial({color:'#2a1640'}),hm=new THREE.MeshBasicMaterial({color:'#ffffff'});
  for(const x of[-.26,.26]){const e=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),em);e.scale.set(1,1.3,.6);e.position.set(x,3.62,.62);g.add(e);const h=new THREE.Mesh(new THREE.SphereGeometry(.045,6,4),hm);h.position.set(x-.04,3.68,.69);g.add(h)}
  const bar=new THREE.Group();bar.position.set(0,3.2,.55);
  const tex=s[0]===s[1]?null:stripeT(s[0],s[1],[1,1]);const tm=tex?new THREE.MeshLambertMaterial({map:tex}):new THREE.MeshLambertMaterial({color:s[0]});
  const tube=new THREE.Mesh(new THREE.CylinderGeometry(.3,.36,1.0,18),tm);tube.rotation.x=Math.PI/2;tube.position.z=.45;bar.add(tube);
  const lip=new THREE.Mesh(new THREE.TorusGeometry(.32,.09,8,20),new THREE.MeshLambertMaterial({color:ice?'#e0f6ff':C.head||'#fff3e6'}));lip.position.z=.95;bar.add(lip);
  const hole=new THREE.Mesh(new THREE.CircleGeometry(.24,18),new THREE.MeshBasicMaterial({color:'#3a1e10'}));hole.position.z=.96;bar.add(hole);
  if(ice)for(let i=0;i<5;i++){const a=i/5*Math.PI*2,c=new THREE.Mesh(new THREE.ConeGeometry(.08,.3,5),new THREE.MeshLambertMaterial({color:'#e0f6ff'}));c.position.set(Math.cos(a)*.36,Math.sin(a)*.36,.98);c.rotation.set(Math.PI/2,0,0);c.rotateZ(a);bar.add(c)}
  g.add(bar);g.userData.barrel=bar;return g}}
// 쏠 때 포신이 살짝 뒤로 밀렸다 돌아와요
{const sh=shoot;shoot=function(e){const r=sh.apply(this,arguments);try{const b=e&&e.g&&e.g.userData&&e.g.userData.barrel;if(b)b.position.z=.3}catch(x){}return r}}
{const ue=updEnts;updEnts=function(dt){ue.apply(this,arguments);for(const e of G.ents){const b=e.g&&e.g.userData&&e.g.userData.barrel;if(b&&b.position.z<.55)b.position.z=Math.min(.55,b.position.z+dt*1.5)}}}
