// ===== 75차: 무적일 때 도둑 몸에 표시 =====
// 대시·맞은 뒤·두 번째 목숨·젤리 보호막 등 모든 무적에서: 몸을 감싼 금빛 방울막 + 발밑 고리.
// 고리는 시계처럼 줄어들어 남은 시간을 보여 주고, 끝나기 0.4초 전부터 깜빡여요.
// 도둑 몸이 안 보일 때(망토 등)는 표시도 안 보여요.
const INV75={g:null,ring:null,bub:null,rim:null,tot:0,last:0,segs:48};
function inv75Make(){const g=new THREE.Group();
  const bub=new THREE.Mesh(new THREE.SphereGeometry(1.45,24,16),new THREE.MeshBasicMaterial({color:'#ffd35f',transparent:true,opacity:.2,depthWrite:false,toneMapped:false}));bub.position.y=1.15;bub.scale.set(1,1.18,1);g.add(bub);
  const rim=new THREE.Mesh(new THREE.SphereGeometry(1.52,24,16),new THREE.MeshBasicMaterial({color:'#fff3b0',transparent:true,opacity:.35,side:THREE.BackSide,depthWrite:false,toneMapped:false}));rim.position.y=1.15;rim.scale.set(1,1.18,1);g.add(rim);
  const back=new THREE.Mesh(new THREE.RingGeometry(1.55,1.9,INV75.segs),new THREE.MeshBasicMaterial({color:'#4a2a1a',transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false}));back.rotation.x=-Math.PI/2;back.position.y=.07;g.add(back);
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.55,1.9,INV75.segs,1,Math.PI/2,Math.PI*2),new THREE.MeshBasicMaterial({color:'#ffc23a',side:THREE.DoubleSide,depthWrite:false,toneMapped:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.09;ring.renderOrder=3;g.add(ring);
  g.visible=false;scene.add(g);Object.assign(INV75,{g,ring,bub,rim})}
// 1인칭(내 몸이 안 보일 때): 체력 바 옆 방패 표시(남은 시간만큼 고리가 줄어요) + 화면 테두리 금빛
const INV75_SH='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8 L19.5 5.6 V11.2 C19.5 16 16.3 19.6 12 21.2 C7.7 19.6 4.5 16 4.5 11.2 V5.6 Z" fill="#ffd35f" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/><path d="M12 6.5 L13.4 9.7 L16.8 10 L14.2 12.2 L15 15.5 L12 13.8 L9 15.5 L9.8 12.2 L7.2 10 L10.6 9.7 Z" fill="#fff"/></svg>';
function inv75Hud(){let b=$('inv75b');if(!b){b=document.createElement('div');b.id='inv75b';b.innerHTML=`<i></i><span>${INV75_SH}</span>`;document.body.appendChild(b);
  const v=document.createElement('div');v.id='inv75v';document.body.appendChild(v);
  const st=document.createElement('style');st.textContent=`#inv75b{position:fixed;width:30px;height:30px;z-index:30;pointer-events:none;display:none}
#inv75b i{position:absolute;inset:0;border-radius:50%;background:conic-gradient(#ffc23a calc(var(--f)*360deg),#4a2a1a40 0);-webkit-mask:radial-gradient(circle,transparent 9px,#000 10px);mask:radial-gradient(circle,transparent 9px,#000 10px)}
#inv75b span{position:absolute;inset:4px;border-radius:50%;background:#fff8ee;border:2px solid #4a2a1a;display:grid;place-items:center}#inv75b svg{width:16px;height:16px}
#inv75v{position:fixed;inset:0;pointer-events:none;z-index:2;display:none;box-shadow:inset 0 0 26px 8px #ffd35fa8,inset 0 0 0 3px #ffc23acc}`;document.head.appendChild(st)}
  return [b,$('inv75v')]}
function inv75Tick(){requestAnimationFrame(inv75Tick);try{const h=G&&G.hero;const [hb,hv]=inv75Hud();
  const off=()=>{if(INV75.g)INV75.g.visible=false;hb.style.display='none';hv.style.display='none'};
  if(!h||!h.m||!h.m.g||G.over||G.cdn||screen!=='play'||typeof scene==='undefined'){off();INV75.tot=0;INV75.last=0;return}
  if(!INV75.g||INV75.g.parent!==scene){INV75.g=null;inv75Make()}
  const rem=Math.max(h.inv||0,h.dashT||0);
  if(rem<=0.02){off();INV75.tot=0;INV75.last=0;return}
  if(rem>INV75.last+.03||INV75.tot<=0)INV75.tot=rem;INV75.last=rem;
  const f=Math.max(0,Math.min(1,rem/INV75.tot)),t=performance.now()/1000,blink=rem<.4?(Math.sin(t*40)>0?1:.25):1;
  // 몸 표시 (마녀 화면, 도둑 3인칭)
  const g=INV75.g,body=h.m.g.visible&&!(h.cloak>0&&G.mode==='devil');g.visible=body;
  if(body){g.position.set(h.m.g.position.x,0,h.m.g.position.z);INV75.ring.geometry.setDrawRange(0,Math.max(1,Math.ceil(INV75.segs*f))*6);
    const dv=G.mode==='devil';g.scale.setScalar(dv?1.9:1);const near=!dv&&camera.position.distanceTo(new THREE.Vector3(g.position.x,1.15,g.position.z))<2.6;INV75.bub.visible=INV75.rim.visible=!near;INV75.bub.material.opacity=((dv?.3:.16)+.06*Math.sin(t*6))*blink;INV75.rim.material.opacity=(dv?.55:.35)*blink;INV75.ring.material.opacity=blink;INV75.ring.material.transparent=blink<1;INV75.rim.rotation.y=t*.8}
  // 화면 표시 (내가 도둑일 때)
  if(G.mode==='hero'&&!h.remote&&!h.isRival){const w=document.querySelector('#hudH .hpw');const r=w&&w.getClientRects().length?w.getBoundingClientRect():null;
    if(r){hb.style.display='block';hb.style.left=Math.round(r.right+6)+'px';hb.style.top=Math.round(r.top+r.height/2-15)+'px';hb.style.setProperty('--f',f.toFixed(3));hb.style.opacity=blink}else hb.style.display='none';
    hv.style.display=body?'none':'block';hv.style.opacity=blink*(.75+.25*Math.sin(t*6))}else{hb.style.display='none';hv.style.display='none'}
  }catch(e){INV75.err=String(e)}}
requestAnimationFrame(inv75Tick);
// 긴 무적: 대시가 끝난 뒤 무적 +0.4초 → +0.8초 (대시 0.26초와 합쳐 약 1초)
{const d='대시 무적|+0.8초';if(AUGI2.t_iframe)AUGI2.t_iframe.d=d;const q=AUGT2.find(x=>x[0]==='t_iframe');if(q)q[3]=d}
try{I18N.x['+0.8초']='+0.8s'}catch(e){}
