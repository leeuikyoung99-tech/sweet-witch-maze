/* ================= 5차: 새 캐릭터 4 · 도둑 두건 · 눈 띠 · 과자 머리띠 ================= */
// 몸은 KayKit(CC0) 캐릭터. 원래 투구·모자·무기는 떼고, 모두 도둑 두건과 눈 띠를 둘러요
const BODY={
 rogue:{pool:'hero',head:'Rogue_Head_Hooded',band:[1.5,1.715,.5,.475,0]},
 knight:{pool:'b_knight',head:'Knight_Head',hide:/Helmet|Shield|Sword/,prim:[[328,360],[0,8]],hs:[1.1,1.13,1.1,0],band:[1.5,1.715,.5,.49,0]},
 barb:{pool:'b_barb',head:'Barbarian_Head',hide:/Hat|Shield|Axe|Mug/,prim:[[185,225]],hs:[1.07,1.05,1.08,0],band:[1.5,1.715,.5,.5,0]},
 mage:{pool:'b_mage',head:'Mage_Head',hide:/Hat|Spellbook|Wand|Staff/,prim:[[228,345]],hs:[1.08,1.06,1.16,-.05],band:[1.5,1.715,.5,.48,0]},
 skel:{pool:'b_skel',head:'Skeleton_Warrior_Head',hide:/Helmet/,prim:[[225,358]],hs:[1,1,1,0],band:[1.5,1.715,.45,.47,0]}};
const BODYK=Object.keys(BODY);
Object.assign(ASSETS,{b_knight:'models/b_knight.glb.txt',b_barb:'models/b_barb.glb.txt',b_mage:'models/b_mage.glb.txt',b_skel:'models/b_skel.glb.txt'},window.__ASSETS||{});
const byName=(root,n)=>root.getObjectByName(n)||root.getObjectByName(n.replace(/[\[\]\.:\/]/g,''));
function texPix(tex){const img=tex.image,cv=document.createElement('canvas');cv.width=img.width;cv.height=img.height;const g=cv.getContext('2d');g.drawImage(img,0,0);return{cv,g,d:g.getImageData(0,0,cv.width,cv.height)}}
function rgb2hsv(r,g,b){const mx=Math.max(r,g,b),mn=Math.min(r,g,b),dl=mx-mn;let h=0;if(dl>0){h=mx===r?((g-b)/dl)%6:mx===g?(b-r)/dl+2:(r-g)/dl+4;h*=60;if(h<0)h+=360}return[h,mx?dl/mx:0,mx]}
function hsv2rgb(h,s,v){const H=((h%360)+360)%360/60,c=v*s,x=c*(1-Math.abs(H%2-1)),m=v-c;let r=0,g=0,b=0;if(H<1){r=c;g=x}else if(H<2){r=x;g=c}else if(H<3){g=c;b=x}else if(H<4){g=x;b=c}else if(H<5){r=x;b=c}else{r=c;b=x}return[(r+m)*255,(g+m)*255,(b+m)*255]}
function copyTexOpts(t,src){t.flipY=src.flipY;t.encoding=src.encoding;t.wrapS=src.wrapS;t.wrapT=src.wrapT;t.magFilter=src.magFilter;t.minFilter=src.minFilter;keepTex(t);return t}
// 새 캐릭터 옷: 대표 색은 '옷 색'으로, 회색 쇠붙이는 비스킷 크림색으로 바꿔요
const BODYTEX={};
function bodyTex(bk,cl){const key=bk+':'+cl;if(BODYTEX[key])return BODYTEX[key];let src=null;POOL[BODY[bk].pool].scene.traverse(o=>{if(!src&&o.isMesh&&o.material&&o.material.map)src=o.material.map});
  const{cv,g,d}=texPix(src),a=d.data,P=CLOTH_HSV[cl]||[162,.95,.82],R=BODY[bk].prim||[];
  for(let i=0;i<a.length;i+=4){const[h,s,v]=rgb2hsv(a[i]/255,a[i+1]/255,a[i+2]/255);let o=null;
    if(s>.22&&v>.08&&R.some(([lo,hi])=>h>=lo&&h<=hi))o=hsv2rgb(P[0],Math.min(1,s*P[1]),Math.min(1,v*P[2]));
    else if(s<.16&&v>.24&&v<.97)o=hsv2rgb(34,.2+.12*(1-v),Math.min(1,v*1.05+.1));
    if(o){a[i]=o[0];a[i+1]=o[1];a[i+2]=o[2]}}
  g.putImageData(d,0,0);return BODYTEX[key]=copyTexOpts(new THREE.CanvasTexture(cv),src)}
// 도둑 두건: 도둑 머리에서 민트 천 부분만 떼어 다른 캐릭터에게 씌워요
const HOODG={};let HOODTRI=null;
function hoodGeo(bk){if(HOODG[bk])return HOODG[bk];const src=byName(POOL.hero.scene,'Rogue_Head_Hooded'),g0=src.geometry;
  if(!HOODTRI){const{cv,d}=texPix(src.material.map),W=cv.width,H=cv.height,a=d.data,uv=g0.attributes.uv,ix=g0.index.array;HOODTRI=[];
    for(let t=0;t<ix.length;t+=3){let u=0,v=0;for(let q=0;q<3;q++){u+=uv.getX(ix[t+q]);v+=uv.getY(ix[t+q])}u/=3;v/=3;
      const px=Math.min(W-1,Math.max(0,u*W|0)),py=Math.min(H-1,Math.max(0,v*H|0)),p=(py*W+px)*4,[h,s]=rgb2hsv(a[p]/255,a[p+1]/255,a[p+2]/255);
      if(h>72&&h<190&&s>.45)HOODTRI.push(ix[t],ix[t+1],ix[t+2])}}
  const g=g0.clone();g.setIndex(HOODTRI.slice());const s=BODY[bk].hs||[1,1,1,0],pa=g.attributes.position;
  for(let i=0;i<pa.count;i++)pa.setXYZ(i,pa.getX(i)*s[0],1.62+(pa.getY(i)-1.62)*s[1],pa.getZ(i)*s[2]+s[3]);
  pa.needsUpdate=true;g.computeBoundingBox();g.computeBoundingSphere();return HOODG[bk]=g}
// 눈 띠: 처음 화면 아이콘처럼 진한 민트 띠에 하얀 눈 두 개
const BANDG={},BANDT={};
function bandGeo(bk,hi){if(BANDG[bk])return BANDG[bk];const[y0,y1,rx,rz,cz]=BODY[bk].band,A=1.9,n=40,ex=2.6,pts=[];
  for(let i=0;i<=n;i++){const a=-A+2*A*i/n,sa=Math.sin(a),ca=Math.cos(a);pts.push([rx*Math.sign(sa)*Math.pow(Math.abs(sa),2/ex),cz+rz*Math.sign(ca)*Math.pow(Math.abs(ca),2/ex)])}
  const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const T=L[L.length-1];
  const pos=[],uv=[],idx=[],si=[],sw=[];
  for(let i=0;i<pts.length;i++){for(const[y,v]of[[y0,0],[y1,1]]){pos.push(pts[i][0],y,pts[i][1]);uv.push(L[i]/T,v);si.push(hi,0,0,0);sw.push(1,0,0,0)}}
  for(let i=0;i<n;i++){const a=i*2,b=a+1,c=a+2,d=a+3;idx.push(a,c,b,b,c,d)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  g.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(si,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(sw,4));g.setIndex(idx);g.computeVertexNormals();g.userData.len=T;g.userData.h=y1-y0;return BANDG[bk]=g}
function bandTex(bk,g){if(BANDT[bk])return BANDT[bk];const T=g.userData.len,hh=g.userData.h,H=64,W=Math.round(H*T/hh/8)*8,ppu=H/hh,mid=W/2,ex=.19*ppu,er=.072*ppu;
  const t=canvasTex(W,H,(c)=>{c.fillStyle='#2f5d55';c.fillRect(0,0,W,H);c.fillStyle='#24483f';c.fillRect(0,0,W,4);c.fillRect(0,H-4,W,4);c.fillStyle='#4f8a7d';c.fillRect(0,6,W,3);
    for(const s of[-1,1]){const x=mid+s*ex,y=H/2;c.fillStyle='#fff';c.beginPath();c.arc(x,y,er,0,7);c.fill();c.fillStyle='#2a1640';c.beginPath();c.arc(x+er*.18,y+er*.08,er*.52,0,7);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(x+er*.02,y-er*.18,er*.17,0,7);c.fill()}});
  return BANDT[bk]=t}
// 두건 밖으로 삐져나오는 머리카락(정수리·뒤통수)은 잘라 내요
const HEADG={};
function headTrim(bk,g0){if(HEADG[bk])return HEADG[bk];const pa=g0.attributes.position,ix=g0.index.array,keep=[];
  for(let t=0;t<ix.length;t+=3){let x=0,y=0,z=0;for(let q=0;q<3;q++){x+=pa.getX(ix[t+q]);y+=pa.getY(ix[t+q]);z+=pa.getZ(ix[t+q])}x/=3;y/=3;z/=3;if((y>1.86&&!(z>.42&&y<1.93))||z<-.22||(Math.abs(x)>.43&&y>1.55))continue;keep.push(ix[t],ix[t+1],ix[t+2])}
  const g=g0.clone();g.setIndex(keep);return HEADG[bk]=g}
function addHeadGear(root,bk,clothMap){const src=byName(POOL.hero.scene,'Rogue_Head_Hooded'),head=byName(root,BODY[bk].head);if(!head||!src)return;
  const bones=src.skeleton.bones.map(b=>byName(root,b.name));if(bones.some(b=>!b))return;const skel=()=>new THREE.Skeleton(bones,src.skeleton.boneInverses);
  if(bk!=='rogue')head.geometry=headTrim(bk,head.geometry);
  if(bk!=='rogue'){const mat=src.material.clone();if(clothMap)mat.map=clothMap;mat.skinning=true;const hm=new THREE.SkinnedMesh(hoodGeo(bk),mat);hm.name='Hood';hm.frustumCulled=false;head.parent.add(hm);hm.bind(skel(),src.bindMatrix)}
  const hi=Math.max(0,src.skeleton.bones.findIndex(b=>b.name==='head')),g=bandGeo(bk,hi);
  const bm=new THREE.SkinnedMesh(g,new THREE.MeshLambertMaterial({map:bandTex(bk,g),skinning:true}));bm.name='EyeBand';bm.frustumCulled=false;head.parent.add(bm);bm.bind(skel(),src.bindMatrix)}
function makeHero(height,look){look=look||DEF_EQ;const bk=BODY[look.body]&&POOL[BODY[look.body].pool]?look.body:'rogue',BD=BODY[bk];
  const root=cloneSkinned(POOL[BD.pool].scene),ct=bk==='rogue'?clothTex(look.cloth):bodyTex(bk,look.cloth),hands=[];
  if(BD.hide){const rm=[];root.traverse(o=>{if(o.isMesh&&BD.hide.test(o.name))rm.push(o)});for(const o of rm)o.parent.remove(o)}
  root.traverse(o=>{if(o.isMesh){o.frustumCulled=false;o.material=o.material.clone();if(ct)o.material.map=ct;
    if(bk==='rogue'){if(/Crossbow|Throwable/.test(o.name))o.visible=false;else if(o.name==='Knife'||o.name==='Knife_Offhand'){o.material.visible=false;hands.push(o)}}}});
  if(bk==='rogue'){for(const o of hands)o.add(o.name==='Knife'?handItem(look.hand):heldCookie())}
  else for(const[bn,r]of[['handslot.r',1],['handslot.l',0]]){const b=byName(root,bn);if(!b)continue;const hd=new THREE.Group();if(r)hd.quaternion.set(0,-1,0,0);b.add(hd);hd.add(r?handItem(look.hand):heldCookie())}
  addHeadGear(root,bk,bk==='rogue'?ct:clothTex(look.cloth));
  const box=new THREE.Box3().setFromObject(root),h=box.max.y-box.min.y||1,k=height/h;root.scale.setScalar(k);root.position.y=-box.min.y*k;const g=new THREE.Group();g.add(root);
  root.updateMatrixWorld(true);const ws=new THREE.Vector3();const att=(bone,obj,y,z)=>{const b=byName(root,bone);if(!b)return;b.getWorldScale(ws);const holder=new THREE.Group();holder.scale.setScalar(1/(ws.x||1));obj.position.set(0,y,z);holder.add(obj);b.add(holder)};
  if(look.hat&&look.hat!=='none')att('head',hatMesh(look.hat),.68,0);if(look.back&&look.back!=='none')att('chest',backMesh(look.back),.02,-.36);if(typeof clothDeco==='function')clothDeco(look.cloth,att);
  const mixer=new THREE.AnimationMixer(root),acts={};for(const c of ANIMS)acts[c.name]=mixer.clipAction(c);const m={g,mixer,acts,cur:null,mats:[],body:bk};g.traverse(o=>{if(o.isMesh){if(Array.isArray(o.material))m.mats.push(...o.material);else m.mats.push(o.material)}});return m}
{const mc0=makeChar;makeChar=function(kind,height,look){return kind==='hero'?makeHero(height,look):mc0(kind,height,look)}}
/* ----- 과자 머리띠 (두건 위에 써요) ----- */
function hbBand(col){const b=new THREE.Mesh(new THREE.TorusGeometry(.42,.032,8,28,Math.PI),LM(col));b.position.y=-.22;return b}
function stripeV(cols){return canvasTex(8,96,(c,w,h)=>{const n=cols.length;cols.forEach((cl,i)=>{c.fillStyle=cl;c.fillRect(0,i*h/n,w,h/n+1)})})}
{const hm0=hatMesh;hatMesh=function(id){if(id==='ears')return hm0(id);const g=new THREE.Group();
  if(id==='bunny'){g.add(hbBand('#ffd6ea'));for(const s of[-1,1]){const e=new THREE.Group();const o=new THREE.Mesh(new THREE.SphereGeometry(.1,14,10),LM('#fff8f2'));o.scale.set(1,3.1,.55);e.add(o);const i=new THREE.Mesh(new THREE.SphereGeometry(.06,12,8),LM('#ffb3d6'));i.scale.set(1,3.6,.4);i.position.set(0,-.02,.035);e.add(i);e.position.set(s*.15,.4,0);e.rotation.z=-s*.22;g.add(e)}}
  else if(id==='ribbon'){g.add(hbBand('#ff5f9e'));const bow=new THREE.Group(),m=LM('#ff7eb6');for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.ConeGeometry(.13,.26,4),m);w.rotation.z=s*Math.PI/2;w.position.x=s*.13;bow.add(w);for(let k=0;k<2;k++){const d=new THREE.Mesh(new THREE.SphereGeometry(.022,6,4),LM('#fff'));d.position.set(s*(.11+k*.06),k?.03:-.03,.07);bow.add(d)}}
    const kn=new THREE.Mesh(new THREE.SphereGeometry(.065,10,8),LM('#e8364f'));bow.add(kn);bow.position.set(.2,.16,.02);bow.rotation.z=-.5;g.add(bow)}
  else if(id==='antenna'){g.add(hbBand('#7ee8a8'));for(const s of[-1,1]){const st=new THREE.Mesh(new THREE.CylinderGeometry(.016,.016,.34,6),LM('#fff8ee'));st.position.set(s*.16,.3,0);st.rotation.z=-s*.32;g.add(st);
      const lp=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,.04,20),[LM('#ffb3d6'),new THREE.MeshLambertMaterial({map:swirlTex()}),new THREE.MeshLambertMaterial({map:swirlTex()})]);lp.rotation.x=Math.PI/2;lp.position.set(s*.22,.5,0);g.add(lp)}}
  else if(id==='horn'){g.add(hbBand('#ffb347'));const t=stripeV(['#fff8ee','#ff9d2e','#ffd84a']);for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.ConeGeometry(.085,.28,14),new THREE.MeshLambertMaterial({map:t}));c.position.set(s*.2,.24,.03);c.rotation.z=-s*.38;g.add(c)}}
  else if(id==='star'){g.add(hbBand('#a8e0ff'));const C=['#ff7eb6','#ffd84a','#7ee8c8','#b98cff','#7cc6ff'];for(let k=0;k<5;k++){const a=Math.PI*(.18+k*.16),st=new THREE.Mesh(new THREE.IcosahedronGeometry(.07,0),LM(C[k]));st.position.set(Math.cos(a)*.42,-.22+Math.sin(a)*.42+.03,0);st.rotation.set(k,k*2,0);g.add(st)}}
  else return hm0(id);return g}}
/* ----- 상점 그림 ----- */
const HOODI=(face,extra)=>`<path d="M7 29 Q7 7 24 6 Q41 7 41 29 Q41 44 24 45 Q7 44 7 29Z" fill="#3fbf9f" stroke="#4a2a1a" stroke-width="3"/><path d="M24 6 Q29 0 36 1 Q32 5 32 10" fill="#3fbf9f" stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"/><ellipse cx="24" cy="30" rx="12.5" ry="11.5" fill="${face}" stroke="#4a2a1a" stroke-width="2.5"/>${extra||''}<rect x="11" y="23.5" width="26" height="6.5" rx="3.2" fill="#2f5d55"/><circle cx="19" cy="26.7" r="2.4" fill="#fff"/><circle cx="29" cy="26.7" r="2.4" fill="#fff"/>`;
const BODYI={rogue:HOODI('#ffd9c0','<path d="M20 36 q4 3 8 0" fill="none" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round"/>'),
 knight:HOODI('#ffd9c0','<path d="M20 36 q4 3 8 0" fill="none" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round"/>')+'<path d="M10 46 q14-9 28 0" fill="#f3dfc4" stroke="#4a2a1a" stroke-width="2.5"/><path d="M24 40 v6 M21 43 h6" stroke="#e8364f" stroke-width="2"/>',
 barb:HOODI('#f2b98d','<path d="M13 31 q11 18 22 0 q-4 5-11 5 q-7 0-11-5z" fill="#c8732e" stroke="#4a2a1a" stroke-width="2"/>'),
 mage:HOODI('#ffd9c0','<path d="M20 36 q4 3 8 0" fill="none" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round"/>')+'<path d="M40 9 l1.6 3.4 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z" fill="#ffd84a" stroke="#4a2a1a" stroke-width="1.2"/>',
 skel:HOODI('#fff6e6','<path d="M22.5 33 l1.5-2.5 1.5 2.5z" fill="#4a2a1a"/><path d="M19 37 h10 M21 35.5 v3 M24 35.5 v3 M27 35.5 v3" stroke="#4a2a1a" stroke-width="1.6"/>')};
const HATI={bunny:'<ellipse cx="17" cy="16" rx="5" ry="13" fill="#fff8f2" stroke="#4a2a1a" stroke-width="2.5" transform="rotate(-12 17 16)"/><ellipse cx="31" cy="16" rx="5" ry="13" fill="#fff8f2" stroke="#4a2a1a" stroke-width="2.5" transform="rotate(12 31 16)"/><ellipse cx="17" cy="17" rx="2.2" ry="8" fill="#ffb3d6" transform="rotate(-12 17 17)"/><ellipse cx="31" cy="17" rx="2.2" ry="8" fill="#ffb3d6" transform="rotate(12 31 17)"/><path d="M8 40 q16-12 32 0" fill="none" stroke="#ffb3d6" stroke-width="3.5" stroke-linecap="round"/>',
 ribbon:'<path d="M24 22 L8 12 L9 32 Z" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 22 L40 12 L39 32 Z" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="22" r="5" fill="#e8364f" stroke="#4a2a1a" stroke-width="2.5"/><circle cx="14" cy="19" r="1.6" fill="#fff"/><circle cx="34" cy="25" r="1.6" fill="#fff"/><path d="M8 42 q16-10 32 0" fill="none" stroke="#ff5f9e" stroke-width="3.5" stroke-linecap="round"/>',
 antenna:'<path d="M18 38 L13 16 M30 38 L35 16" stroke="#c9b6a4" stroke-width="2.5"/><circle cx="12" cy="12" r="7" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="2.5"/><circle cx="36" cy="12" r="7" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="2.5"/><path d="M12 12 m-3 0 a3 3 0 1 1 3 3" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M36 12 m-3 0 a3 3 0 1 1 3 3" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M8 42 q16-10 32 0" fill="none" stroke="#7ee8a8" stroke-width="3.5" stroke-linecap="round"/>',
 horn:'<path d="M10 34 L6 8 L19 30 Z" fill="#ffd84a" stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"/><path d="M38 34 L42 8 L29 30 Z" fill="#ffd84a" stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"/><path d="M8 21 L14 30 M40 21 L34 30" stroke="#ff9d2e" stroke-width="5"/><path d="M7 13 L9 16 M41 13 L39 16" stroke="#fff8ee" stroke-width="3"/><path d="M8 42 q16-10 32 0" fill="none" stroke="#ffb347" stroke-width="3.5" stroke-linecap="round"/>',
 star:'<path d="M6 36 q18-22 36 0" fill="none" stroke="#a8e0ff" stroke-width="3.5" stroke-linecap="round"/>'+[[9,30,'#ff7eb6'],[16,21,'#ffd84a'],[24,18,'#7ee8c8'],[32,21,'#b98cff'],[39,30,'#7cc6ff']].map(([x,y,c])=>`<path d="M${x} ${y-5} l1.6 3.4 3.6.4-2.7 2.4.8 3.6-3.3-1.9-3.3 1.9.8-3.6-2.7-2.4 3.6-.4z" fill="${c}" stroke="#4a2a1a" stroke-width="1.4" stroke-linejoin="round"/>`).join('')};
{const ii0=itemIcon;itemIcon=function(cat,id){const s=b=>'<svg viewBox="0 0 48 48" aria-hidden="true">'+b+'</svg>';if(cat==='body')return s(BODYI[id]||BODYI.rogue);if(cat==='hat'&&HATI[id])return s(HATI[id]);return ii0(cat,id)}}
// 없어진 모자(컵케이크·아이스크림·사탕 왕관)는 산 값만큼 코인으로 돌려줘요
{const RM={cupcake:200,cone:200,crown:300};let r=0;for(const k in RM)if(SAVE.own['hat:'+k]){r+=RM[k];delete SAVE.own['hat:'+k]}if(r){SAVE.coins+=r;SAVE.hatRefund=r;saveGame()}}
// 캐릭터는 모두 무료예요
for(const k in SHOP.body.items)SAVE.own['body:'+k]=1;
