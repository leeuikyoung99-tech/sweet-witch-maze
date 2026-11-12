/* ================= 44차: 처음 켰을 때 배경음악이 한 번 누르면 바로 나오게 ================= */
// 폰에서는 손가락을 '뗄 때'(touchend·click)만 소리를 켤 수 있어서, 누르기 시작할 때만 켜던 예전 방식은 두 번째 터치에서야 소리가 났어요.
// 화면 어디를 눌러도(버튼이 아니어도) 손을 떼는 순간 소리를 켜고, 제목 음악은 미리 받아 둬요.
const MUSIC_PRE={};
try{const u=ASSETS.music+'title'+(ASSETS.musicExt||'.mp3');MUSIC_PRE.title=loadBuf(u).catch(()=>null)}catch(e){}
{const lb=loadBuf;loadBuf=function(url){try{const u=ASSETS.music+'title'+(ASSETS.musicExt||'.mp3');if(url===u&&MUSIC_PRE.title){const p=MUSIC_PRE.title;MUSIC_PRE.title=null;return p.then(b=>b?b.slice(0):lb(url))}}catch(e){}return lb(url)}}
function audioWake(){const first=!A.ctx;const p=initAudio();try{A.ctx&&A.ctx.state!=='running'&&A.ctx.resume()}catch(e){}
  Promise.resolve(p).then(()=>audioMenuMusic());
  if(A.ctx&&A.ctx.state==='running'&&!first)for(const ev of AW_EV)document.removeEventListener(ev,audioWake,true)}
const AW_EV=['touchend','pointerup','click','keydown'];
for(const ev of AW_EV)document.addEventListener(ev,audioWake,true);
const menuScr=()=>!['play','design','pause','result','lobby'].includes(screen);
function audioMenuMusic(){if(menuScr()&&A.ctx&&A.buf&&A.buf.title&&!A.tracks.title&&!Object.keys(A.tracks).some(n=>n.startsWith('m_')))try{musicTitle()}catch(e){}}
// 제목 음악을 다 받았을 때 메뉴 화면(스토리·상점·카드 등)에 있어도 바로 틀어요
setInterval(audioMenuMusic,700);
// ----- 얼굴이 까맣게 되는 문제: 투명하게 했다가 되돌릴 때, 원래 투명한 재질(얼굴·가면 그림)까지 불투명으로 바꿔서 빈 곳이 검게 보였어요 -----
setOpacity=function(m,o){for(const mt of m.mats){if(!mt.userData)mt.userData={};const b=mt.userData.op0||(mt.userData.op0={t:mt.transparent,o:mt.opacity,d:mt.depthWrite});
  const t0=mt.transparent;if(o>=1){mt.transparent=b.t;mt.opacity=b.o;mt.depthWrite=b.d}else{mt.transparent=true;mt.opacity=b.o*o;mt.depthWrite=false}if(t0!==mt.transparent)mt.needsUpdate=true}};
// ----- 거인 쿠키: 진짜로 크게 (모델 1.4배) -----
{const uh=updHero;updHero=function(dt){const r=uh.apply(this,arguments);const h=G.hero;const g=h&&h.m&&h.m.g;if(g){const big=!!(G.aug&&G.aug.tp_giant);if(big!==!!g.userData.giant){g.scale.multiplyScalar(big?1.4:1/1.4);g.userData.giant=big}}return r}}
// 거인일 때 카메라: 3인칭은 더 뒤·위에서, 1인칭은 눈높이를 높게
{const uc=updCamera;updCamera=function(dt){const r=uc.apply(this,arguments);const h=G.hero;try{if(h&&G.aug&&G.aug.tp_giant&&G.mode==='hero'&&!G.reveal&&!camPreview&&isPlaying()){
  if(VIEW===3){const dx=camera.position.x-h.x,dz=camera.position.z-h.z,L=Math.hypot(dx,dz)||1;let add=0;for(let d=.15;d<=1.2;d+=.15){if(camHit(camera.position.x+dx/L*d,camera.position.z+dz/L*d))break;add=d}
    camera.position.x+=dx/L*add;camera.position.z+=dz/L*add;camera.position.y+=.95;camera.rotation.x-=.12}
  else camera.position.y+=.6}}catch(e){}return r}}
