// ===== 73차: 덫 발판(미끄럼·거꾸로·젤리 덫)이 마녀에게 잘 보이게 =====
// 예전엔 35% 투명한 색 네모 + 작은 그림이라, 미끄럼 발판(갈색)은 과자 마을·초콜릿 공장의 갈색 바닥에 묻혀 안 보였어요.
// 이제 어느 바닥에서도 보이게: 진한 외곽선 + 하얀 테두리 + 밝은 색 판 + 큰 그림.
const TRAP73={slip:'#ffc23a',rev:'#9b86ff',trap:'#55d68a'},TRAPTEX73={};
function trapTex73(k){if(TRAPTEX73[k])return TRAPTEX73[k];const S=256,cv=document.createElement('canvas');cv.width=cv.height=S;const x=cv.getContext('2d');
  const rr=(p,r)=>{x.beginPath();x.moveTo(p+r,p);x.arcTo(S-p,p,S-p,S-p,r);x.arcTo(S-p,S-p,p,S-p,r);x.arcTo(p,S-p,p,p,r);x.arcTo(p,p,S-p,p,r);x.closePath()};
  const base=()=>{x.clearRect(0,0,S,S);rr(8,46);x.fillStyle='#4a2a1a';x.fill();rr(20,36);x.fillStyle='#ffffff';x.fill();rr(34,26);x.fillStyle=TRAP73[k]||'#ffd35f';x.fill();
    x.globalAlpha=.35;rr(34,26);x.save();x.clip();x.fillStyle='#ffffff';x.beginPath();x.ellipse(S*.36,S*.3,S*.3,S*.14,-.5,0,Math.PI*2);x.fill();x.restore();x.globalAlpha=1};
  base();const t=new THREE.CanvasTexture(cv);t.anisotropy=4;try{if(THREE.sRGBEncoding!=null)t.encoding=THREE.sRGBEncoding}catch(e){}
  try{const img=new Image();img.onload=()=>{base();x.drawImage(img,S*.17,S*.17,S*.66,S*.66);t.needsUpdate=true};
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(ART[k].replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" '))}catch(e){}
  return TRAPTEX73[k]=t}
{const st0=spawnTrap;spawnTrap=function(k,x,z){const e=st0.apply(this,arguments);try{if(e&&e.g&&TRAP73[k]){
    for(const c of[...e.g.children]){e.g.remove(c);try{c.geometry.dispose();c.material.dispose()}catch(_){}}
    const m=new THREE.Mesh(new THREE.PlaneGeometry(4.7,4.7),new THREE.MeshBasicMaterial({map:trapTex73(k),transparent:true,toneMapped:false,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4}));
    m.rotation.x=-Math.PI/2;m.position.y=.14;m.renderOrder=2;e.g.add(m)}}catch(_){}return e}}
