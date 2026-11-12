// ===== 74차: 슈퍼 가짜 사탕을 마녀가 직접 놓아요 =====
// 예전: 증강체를 고르면 판 시작 때 아무 곳에나 저절로 놓였어요.
// 이제: 사람 마녀는 칩 옆 사탕 버튼 → 미로의 한 칸을 눌러 한 판에 한 번 놓아요. 안 놓으면 안 놓여요.
// AI 마녀(혼자 하기·스토리에서 내가 도둑일 때)는 예전처럼 알맞은 자리에 저절로 놓아요.
const FC74={on:false};
function fc74Human(){return G.mode==='devil'||(typeof NET!=='undefined'&&NET.on)}
{const as0=augStart;augStart=function(){const A=G.aug,D=G.devil;FC74.on=false;if(D)D.fcReady=false;
  if(A&&A.fakeexit&&fc74Human()){A.fakeexit=false;try{as0.apply(this,arguments)}finally{A.fakeexit=true}if(D&&G.mode==='devil')D.fcReady=true;try{augHud()}catch(e){}return}
  return as0.apply(this,arguments)}}
function fc74Why(cx,cz){if(!inB(cx,cz)||!MASK[idx(cx,cz)])return '미로 안의 길을 눌러요';
  if(cx===START[0]&&cz===START[1])return '출발점에는 놓을 수 없어요';if(cx===EXIT[0]&&cz===EXIT[1])return '출구에는 놓을 수 없어요';
  const h=G.hero;if(h){const[hx,hz]=cellOf(h.x,h.z);if(Math.abs(hx-cx)+Math.abs(hz-cz)<2)return '도둑 바로 옆에는 놓을 수 없어요'}return ''}
function fc74Put(cx,cz){if(G.fexit||G.fcandy)return false;const px=cx2x(cx),pz=cx2x(cz);G.fexit={x:cx,z:cz,px,pz};
  addCandy(px,pz,true);const c=G.candies.pop();X28.list.push(c.g);G.fcandy=c.g;G.fcandy.userData.ph=c.ph;burstFx(px,pz,'smoke');
  if(G.mode==='devil')fc74Mark(px,pz);return true}
// 마녀에게만 보이는 표시: 금색 고리 + 위로 솟은 빛기둥 + 사탕 아이콘 (도둑 화면에는 안 그려요)
function fc74Mark(px,pz){fc74Unmark();const g=new THREE.Group();
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.9,2.5,32),new THREE.MeshBasicMaterial({color:'#ffc23a',side:THREE.DoubleSide,depthWrite:false,toneMapped:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.12;g.add(ring);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,6,20,1,true),new THREE.MeshBasicMaterial({color:'#ffd35f',transparent:true,opacity:.28,side:THREE.DoubleSide,depthWrite:false}));beam.position.y=3;g.add(beam);
  const cv=document.createElement('canvas');cv.width=cv.height=128;const x=cv.getContext('2d');x.fillStyle='#4a2a1a';x.beginPath();x.arc(64,64,60,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(64,64,51,0,7);x.fill();x.fillStyle='#ffc23a';x.beginPath();x.arc(64,64,43,0,7);x.fill();
  const tex=new THREE.CanvasTexture(cv);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,depthTest:false,toneMapped:false}));sp.scale.set(2.6,2.6,1);sp.position.y=6.6;sp.renderOrder=5;g.add(sp);
  try{const img=new Image();img.onload=()=>{x.drawImage(img,24,24,80,80);tex.needsUpdate=true};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(augIcon('wp_fake',true).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" '))}catch(e){}
  g.position.set(px,0,pz);scene.add(g);X28.list.push(g);FC74.mark=g;g.userData.ph=0}
function fc74Unmark(){const g=FC74.mark;if(!g)return;FC74.mark=null;drop(g);const j=X28.list.indexOf(g);if(j>=0)X28.list.splice(j,1)}
{const sg=superCandyGone;superCandyGone=function(){fc74Unmark();return sg.apply(this,arguments)}}
{const nm=newMatch;newMatch=function(){FC74.mark=null;return nm.apply(this,arguments)}}
setInterval(()=>{const g=FC74.mark;if(g&&g.children[2]){g.userData.ph+=.4;g.children[2].position.y=6.6+Math.sin(g.userData.ph)*.3}},60);
function fc74Place(x,z){const D=G.devil;const[cx,cz]=cellOf(x,z);const why=fc74Why(cx,cz);if(why){say(why,false,1.2);SFX.deny();return}
  FC74.on=false;D.fcReady=false;$('dhint').textContent='';
  if(G.mirror){try{netSend({t:'card',i:-1,k:'fcandy',x:+x.toFixed(2),z:+z.toFixed(2)})}catch(e){}}
  fc74Put(cx,cz);SFX.magic();say('슈퍼 가짜 사탕을 놓았어요',false,1.2);augHud()}
{const aa=augAct;augAct=function(a){if(a!=='fcandy')return aa.apply(this,arguments);const D=G.devil;if(G.over||G.cdn||!D||!D.fcReady)return;
  FC74.on=!FC74.on;if(FC74.on){D.sel=null;try{buildHand()}catch(e){}$('dhint').textContent='미로를 눌러 슈퍼 가짜 사탕을 놓아요'}else $('dhint').textContent='';SFX.card();fc74Btn()}}
{const dt=devilTap;devilTap=function(x,z,picked){const D=G.devil;if(FC74.on){if(D&&D.sel!=null){FC74.on=false;fc74Btn();return dt.apply(this,arguments)}fc74Place(x,z);return}return dt.apply(this,arguments)}}
// 온라인: 마녀(거울 쪽)가 보낸 자리를 도둑(진행 쪽)도 똑같이 놓아요
{const hc=handleCard;handleCard=function(d){if(d&&d.k==='fcandy'){if(G.aug&&G.aug.fakeexit&&!G.fexit){const[cx,cz]=cellOf(d.x,d.z);fc74Put(cx,cz)}return}return hc.apply(this,arguments)}}
function fc74Btn(){const b=document.querySelector('#augBtnD [data-a="fcandy"]');if(b)b.classList.toggle('fc74on',FC74.on)}
setInterval(()=>{try{fc74Btn()}catch(e){}},400);
// 아이콘 버튼(p70fix 의 AB70)
try{AB70.fcandy=['candy','슈퍼 가짜 사탕','p']}catch(e){}
// 증강체 설명
{const d='버튼을 누르고 미로를 눌러|진짜 같은 사탕 하나 놓기';if(AUGI2.wp_fake)AUGI2.wp_fake.d=d;const q=AUGW2.find(x=>x[0]==='wp_fake');if(q)q[3]=d}
// 첫 수: 처음 쓰는 카드 1장 → 3장 공짜
{const d='판마다 처음 쓰는|카드 3장은 공짜';if(AUGI2.wn_first)AUGI2.wn_first.d=d;const q=AUGW2.find(x=>x[0]==='wn_first');if(q)q[3]=d}
try{Object.assign(I18N.x,{'버튼을 누르고 미로를 눌러':'Tap the button, then the maze','진짜 같은 사탕 하나 놓기':'to place a real-looking candy','카드 3장은 공짜':'3 cards are free',
  '미로를 눌러 슈퍼 가짜 사탕을 놓아요':'Tap the maze to place the super fake candy','슈퍼 가짜 사탕을 놓았어요':'Super fake candy placed','미로 안의 길을 눌러요':'Tap a path inside the maze',
  '출발점에는 놓을 수 없어요':"Can't place on the start",'출구에는 놓을 수 없어요':"Can't place on the exit",'도둑 바로 옆에는 놓을 수 없어요':"Can't place right next to the thief"})}catch(e){}
{const st=document.createElement('style');st.textContent='#augBtnD button.fc74on{background:#fff1b8;box-shadow:0 0 0 3px #fff,0 0 0 6px #ff5f9e}';document.head.appendChild(st)}
