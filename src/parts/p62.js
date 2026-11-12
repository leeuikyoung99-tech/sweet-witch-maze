// ===== AI 대결 코인: 하루 횟수 제한 =====
const AICAP=20;
function aiCoinSt(){const d=adDay();let a=SAVE.aiCoin;if(!a||a.d!==d)a=SAVE.aiCoin={d,n:0};return a}
function aiCoinLeft(){return Math.max(0,AICAP-aiCoinSt().n)}
const AICAP_T='오늘 AI 대결 코인은 다 받았어요 · 내일 다시 받아요';
{const e=earnCoins;earnCoins=function(w){const isAI=!NET.on&&!G.stage&&!G.chal&&!(typeof TU!=='undefined'&&TU.on);if(!isAI)return e.apply(this,arguments);
  if(w&&aiCoinLeft()<=0)return{n:0,t:'aicap'};const c0=SAVE.coins;const r=e.apply(this,arguments);if(SAVE.coins>c0){aiCoinSt().n++;saveGame()}return r}}
{const ct=coinText;coinText=function(x){if(x&&x.t==='aicap')return COIN_SVG+AICAP_T;
  if(x&&x.t==='ailose'&&aiCoinLeft()<=0)return COIN_SVG+AICAP_T;
  const s=ct.apply(this,arguments);if(x&&x.t==='ai')return s+` <small class="aicap-n">(오늘 ${aiCoinLeft()}번 더)</small>`;return s}}
{const st=document.createElement('style');st.textContent=`.aicap-n{font-size:.82em;opacity:.8;white-space:nowrap}`;document.head.appendChild(st)}

// ===== 미로: 사탕 대포 사거리를 네모 칸 대신 둥근 원으로 (벽에 가리는 곳은 잘려요) =====
function trgRay(ax,az,ang,R){const ux=Math.sin(ang),uz=Math.cos(ang),st=.3,n=Math.ceil(R/st);let[px,pz]=cellOf(ax,az),last=0;
  for(let i=1;i<=n;i++){const d=Math.min(R,i*st),x=ax+ux*d,z=az+uz*d,[qx,qz]=cellOf(x,z);
    if(qx!==px||qz!==pz){if(!inM(qx,qz)||(typeof MASK!=='undefined'&&!MASK[idx(qx,qz)]))return last;const dx=qx-px,dz=qz-pz;
      if(Math.abs(dx)+Math.abs(dz)>1){if(!(canStep(px,pz,dx,0)&&canStep(qx,pz,0,dz))&&!(canStep(px,pz,0,dz)&&canStep(px,qz,dx,0)))return last}else if(!canStep(px,pz,dx,dz))return last;px=qx;pz=qz}
    last=d}return R}
function trgR(){return 22*((G.aug||{}).wg_range?1.3:1)}
function trgUpdate(dt){const show=G.mode==='devil'&&screen==='play'&&!window.__aiBoth&&!window.__simFast;
  if(!show){if(TRG.mesh)TRG.mesh.visible=false;return}TRG.t-=dt;
  const D=G.devil,selT=D&&D.sel!=null&&TURK.includes(D.hand[D.sel]);for(const k in TRGM)TRGM[k].opacity=selT?.42:.26;if(TRG.ringM)TRG.ringM.opacity=selT?.9:.6;if(TRG.mesh)TRG.mesh.visible=true;
  if(TRG.t>0)return;TRG.t=.3;const R=trgR();
  const T=G.ents.filter(e=>e.type==='tower'&&!e.dead);const key=R+'|'+T.map(e=>e.id+'@'+e.x.toFixed(1)+','+e.z.toFixed(1)).join(',')+'|'+B.walls.map(w=>w.o+w.x+'_'+w.z).join(',');if(key===TRG.key&&TRG.mesh&&TRG.mesh.parent)return;TRG.key=key;
  if(TRG.mesh){scene.remove(TRG.mesh);TRG.mesh.traverse(o=>{if(o.geometry)o.geometry.dispose()});TRG.mesh=null}
  if(!TRG.ringM)TRG.ringM=new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.6,depthWrite:false,fog:false});
  const grp=new THREE.Group(),y=.4,NR=144;
  for(const e of T){const col=TRGC[e.tk||'tower']||TRGC.tower,P=[],L=[];for(let i=0;i<=NR;i++)L.push(trgRay(e.x,e.z,i/NR*Math.PI*2,R));
    for(let i=0;i<NR;i++){const a0=i/NR*Math.PI*2,a1=(i+1)/NR*Math.PI*2,l0=L[i],l1=L[i+1];P.push(e.x,y,e.z, e.x+Math.sin(a0)*l0,y,e.z+Math.cos(a0)*l0, e.x+Math.sin(a1)*l1,y,e.z+Math.cos(a1)*l1)}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));const m=new THREE.Mesh(g,trgMat(col));m.material.side=THREE.DoubleSide;m.renderOrder=2;m.frustumCulled=false;grp.add(m);
    // 사거리 끝을 알려 주는 둥근 테 (전체 원)
    const rg=new THREE.Mesh(new THREE.RingGeometry(R-.32,R,96),TRG.ringM);rg.rotation.x=-Math.PI/2;rg.position.set(e.x,y+.02,e.z);rg.renderOrder=3;rg.frustumCulled=false;grp.add(rg)}
  scene.add(grp);TRG.mesh=grp}
