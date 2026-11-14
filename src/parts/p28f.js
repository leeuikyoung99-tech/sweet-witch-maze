/* ================= 28차 (바): 새 맵 4개 · 맵별 음악 · 스토리 8장×10단계 ================= */
const TB=THEMES.candy;
THEMES.choco=Object.assign({},TB,{shape:'factory',icon:'#7a4526',bg:'#f6e0c8',fog:'#f3dcc4',sky:['#c98d5f','#e9c49a','#ffe6cc','#fff3e0'],hemi:['#fff3e6','#a87a50',.85],sun:['#fff0d8',.75],
  ground:'#a8693d',grass:['#9a5c36','#b97a4e','#8d5432'],spr:['#ff7eb6','#ffd35f','#ffffff','#7cc6ff','#ff9e5f'],river:['#5a3220','#3a1d10','#4e2a17','#7a4526'],plaza:['#f6e3c3','#c98d5f'],road:['#5a3220','#8d5432','#7a4526','#3a1d10'],
  floor:{bg:'#3a1d10',t:['#8a5030','#7a4526','#5e3220'],i1:'#9a5c36',i2:'#6e3e22',sp:['#ffffff22','#00000033']},
  wall:{style:'chocobar',face:['#b97a4e','#8a5030'],frame:'#4e2a17',rim:'#e0a060',edge:'#7a4526',joint:'#3a1d10'},
  hillC:['#8a5030','#9a5c36','#7a4526','#ff7eb6','#ffd35f'],castle:'choco',tower:'icecream',scoops:['#7a4526','#f6e3c3','#ffb3d6'],houses:[2,0,2],cup:['#7a4526','#ffb3d6','#f6e3c3'],frost:['#f6e3c3','#ffb3d6','#f6e3c3'],cake:['#7a4526','#f6e3c3','#ffb3d6'],roof:'#7a4526',
  tree:'cotton',puff:['#c98d5f','#e0a060','#7a4526','#f6e3c3'],trunk:'#fff8ee',ring:'lolli',lamp:['#ffd35f','#ff7eb6','#7cc6ff','#ffffff','#ff9e5f'],drops:['#7a4526','#ffd35f','#ff7eb6','#f6e3c3','#5a3220'],cane:['#7a4526','#f6e3c3'],rail:'#c98d5f',
  swirl:['#7a4526','#f6e3c3'],cloud:['#f6e3c3','#ffe6cc','#fff3e0','#e9c49a'],wheel:['#7a4526','#ffd35f','#ff7eb6'],tube:'#f6e3c3',flyer:'icecream',arc:'rainbow',balloon:'swirl',snow:false,path:['#ff3d8b','#ffd35f']});
THEMES.cloud=Object.assign({},TB,{shape:'cloud',icon:'#9fb8ff',bg:'#eef4ff',fog:'#f4f0ff',sky:['#a8c8ff','#d6e4ff','#ffe0f0','#fff6fb'],hemi:['#ffffff','#a898d8',.76],sun:['#fff4f8',.6],
  ground:'#ddd0f8',grass:['#cfc0f4','#e6dcfb','#c4b2ee'],spr:['#ffb3d6','#a8e0ff','#d9c2ff','#fff3a8','#b8f0d0'],river:['#c8d8ff','#a8c0f0','#d8e4ff','#ffffff'],plaza:['#ffffff','#d9c2ff'],road:['#d9c2ff','#ffffff','#c8b0f0','#b8a0e0'],
  floor:{bg:'#6a52c0',t:['#a690ec','#9883e6','#8a74de'],alt:['#f7a8cc','#f296c0','#ec84b4'],i1:'#b4a0f0',i2:'#a28ce8',alti1:'#f9b8d6',alti2:'#f4a2c6',sp:['#ffffff55','#5a40b044']},
  wall:{style:'wafer',face:['#d9c2ff','#b9a0f0'],frame:'#9b80e0',rim:'#c8b0ff',cream:'#ffffff',edge:'#c8b8f0',joint:'#8a70d0'},
  hillC:['#ffffff','#f4f0ff','#ffffff','#ffb3d6','#a8e0ff'],castle:'ice',tower:'icecream',scoops:['#ffb3d6','#d9c2ff','#a8e0ff'],houses:[3,1,3],cup:['#d9c2ff','#ffb3d6','#a8e0ff'],frost:['#ffffff','#ffe0f0','#ffffff'],cake:['#ffffff','#ffd6ea','#d9c2ff'],roof:'#ffb3d6',
  tree:'cotton',puff:['#ffd6ea','#e0f2ff','#f0e0ff','#fff6fb','#ffe0ef'],trunk:'#fff8ee',ring:'lolli',lamp:['#ffb3d6','#a8e0ff','#d9c2ff','#fff3a8','#b8f0d0'],drops:['#ffb3d6','#a8e0ff','#d9c2ff','#fff3a8','#b8f0d0'],cane:['#d9c2ff','#ffffff'],rail:'#ffb3d6',
  swirl:['#ffb3d6','#a8e0ff'],cloud:['#ffffff','#fff0f8','#f4f0ff','#ffffff'],wheel:['#ffffff','#ffb3d6','#a8e0ff'],tube:'#ffe0f0',flyer:'gift',arc:'rainbow',balloon:'swirl',snow:false,path:['#ff3d8b','#5fa8ff']});
THEMES.sea=Object.assign({},TB,{shape:'shell',icon:'#2f9cc8',bg:'#cdeeff',fog:'#8fd0f0',sky:['#0b4a7e','#1f86c0','#5fc8e8','#bff0ff'],hemi:['#dff6ff','#2f6a90',1.0],sun:['#e0fbff',.65],
  ground:'#f2dcae',grass:['#ecd2a0','#f8e6c0','#e2c48e'],spr:['#ff7ea8','#ffd35f','#7ee8c8','#ffffff','#b98cff'],river:['#1f86c0','#0b5a8e','#3fa8d8','#8fd8ff'],plaza:['#fff3d6','#7ee8c8'],road:['#e2c48e','#fff3d6','#ecd2a0','#c8a870'],
  floor:{bg:'#1f6a8e',t:['#7ee8d8','#5fd8c8','#3fc0b0'],alt:['#ffc2d6','#ffaec8','#ff9ab8'],i1:'#a8f4e8',i2:'#7ee0d0',alti1:'#ffd6e4',alti2:'#ffbcd0',sp:['#ffffff55','#1f86c044']},
  wall:{style:'wafer',face:['#ff9ab8','#ff7ea8'],frame:'#d8507e',rim:'#ffb3c8',cream:'#fff6ee',edge:'#ff9ab8',joint:'#c0406a'},
  hillC:['#f2dcae','#ecd2a0','#f8e6c0','#ff7ea8','#7ee8c8'],castle:'ice',tower:'icecream',scoops:['#7ee8c8','#ff9ab8','#ffd35f'],houses:[3,1,3],cup:['#7ee8c8','#ff9ab8','#a8e0ff'],frost:['#fff6ee','#7ee8c8','#fff6ee'],cake:['#a8e0ff','#ff9ab8','#7ee8c8'],roof:'#ff7ea8',
  tree:'cotton',puff:['#ff7ea8','#ff9e5f','#ffd35f','#b98cff','#7ee8c8'],trunk:'#fff3d6',ring:'popsicle',lamp:['#7ee8c8','#ff9ab8','#ffd35f','#a8e0ff','#b98cff'],drops:['#7ee8c8','#ff9ab8','#ffd35f','#a8e0ff','#b98cff'],cane:['#7ee8c8','#ffffff'],rail:'#ff7ea8',
  swirl:['#ff7ea8','#7ee8c8'],cloud:['#bff0ff','#a8e0ff','#dff8ff','#8fd8ff'],wheel:['#7ee8c8','#ff9ab8','#ffd35f'],tube:'#bff0ff',flyer:'icecream',arc:'moon',balloon:'swirl',snow:false,path:['#ff3d8b','#ffd35f']});
THEMES.cake=Object.assign({},TB,{shape:'cake',icon:'#ff7eb6',bg:'#fff0f6',fog:'#ffe6f0',sky:['#ff9ec7','#ffc6dc','#ffe6f0','#fff6e6'],hemi:['#fff6fb','#d89aa8',.9],sun:['#fff3e6',.75],
  ground:'#fff3e6',grass:['#ffe6ee','#fff6f8','#ffd8e4'],spr:['#ff5f9e','#ffd35f','#7cc6ff','#ffffff','#7ee8a8'],river:['#ff9ec7','#ff7eb6','#ffb3d6','#ffe0ef'],plaza:['#fff6e6','#ff9ec7'],road:['#ffb3d6','#fff6e6','#ff9ec7','#e8708f'],
  floor:{bg:'#c0406a',t:['#fff3e6','#ffe9d6','#ffdcc4'],alt:['#ffc2d6','#ffb0c8','#ff9ab8'],i1:'#ffffff',i2:'#fff3e6',alti1:'#ffd6e4',alti2:'#ffc2d6',sp:['#ffffff66','#ff5f9e33']},
  wall:{style:'cracker',face:['#fff3e6','#ffd6c0'],frame:'#ff7eb6',rim:'#ffb3d6',hole:'#e8364f',holeHi:'#ffe0e8',sugar:['#ffffffcc','#ff9ec7'],edge:'#ffb3d6',joint:'#e8708f'},
  hillC:['#fff3e6','#ffe6ee','#ffffff','#ff5f9e','#ffd35f'],castle:'choco',tower:'icecream',scoops:['#ffb3d6','#fff3e6','#ff7eb6'],houses:[2,1,2],cup:['#ff7eb6','#ffd35f','#7cc6ff'],frost:['#ffffff','#ffb3d6','#ffffff'],cake:['#fff3e6','#ff7eb6','#ffd35f'],roof:'#ff5f9e',
  tree:'cotton',puff:['#ffb3d6','#ffffff','#ffd6ea','#fff3a8'],trunk:'#fff8ee',ring:'lolli',lamp:['#ff5f9e','#ffd35f','#7cc6ff','#7ee8a8','#ffffff'],drops:['#ff5f9e','#ffd35f','#7cc6ff','#7ee8a8','#ffffff'],cane:['#ff5f9e','#ffffff'],rail:'#ff5f9e',
  swirl:['#ff5f9e','#ffffff'],cloud:['#ffffff','#fff0f6','#ffe6f0','#ffffff'],wheel:['#ff7eb6','#ffd35f','#7cc6ff'],tube:'#ffe0ef',flyer:'gift',arc:'star',balloon:'swirl',snow:false,path:['#e8364f','#1fae8c']});
SHAPES.factory=(x,z)=>{if(z<=1)return Math.abs(x-MID)<=2;if(z>=11)return true;return !((x<=1||x>=11)&&(z===4||z===5||z===8))};
SHAPES.cloud=(x,z)=>{if(z<=1)return Math.abs(x-MID)<=1+(z===1?2:0);const c=(a,b,r)=>(x-a)**2+(z-b)**2<=r*r;return c(6,7.3,5.6)||c(2.6,5.2,2.9)||c(9.4,5.2,2.9)||c(6,3.2,3.3)||c(2.4,9.6,2.6)||c(9.6,9.6,2.6)||(z>=11&&Math.abs(x-MID)<=4)};
SHAPES.shell=(x,z)=>{if(z<=1)return Math.abs(x-MID)<=1;return Math.abs(x-MID)<=Math.min(6,1+Math.round((z-1)*.62))};
SHAPES.cake=(x,z)=>Math.abs(x-MID)<=(z<=1?1:z<=4?3:z<=8?5:6);
Object.assign(SHAPEN,{factory:13,cloud:13,shell:13,cake:13});Object.assign(SYMS,{factory:'square',cloud:'square',shell:'square',cake:'square'});
Object.assign(SHOP.theme.items,{choco:['초콜릿 공장',400],cloud:['구름 솜사탕 하늘',400],sea:['바닷속 젤리',400],cake:['생일 케이크 성',400]});
Object.assign(THC,{choco:'#8d5432',cloud:'#9fb8ff',sea:'#2f9cc8',cake:'#ff7eb6'});Object.assign(THN,{choco:'초콜릿 공장',cloud:'구름 솜사탕 하늘',sea:'바닷속 젤리',cake:'생일 케이크 성'});Object.assign(MAPN,{choco:'초콜릿 공장',cloud:'구름 하늘',sea:'바닷속',cake:'케이크 성'});
{const box=$('chMap');for(const k of['choco','cloud','sea','cake']){const b=document.createElement('button');b.dataset.v=k;b.textContent=MAPN[k];box.appendChild(b)}}
// 맵 장식 (바닷속 거품 · 구름 · 케이크 촛불 · 초콜릿 톱니)
function mapDeco(id){if(WORLD.deco28){scene.remove(WORLD.deco28);WORLD.deco28=null}if(WORLD.anims&&WORLD.decoAnim){const i=WORLD.anims.indexOf(WORLD.decoAnim);if(i>=0)WORLD.anims.splice(i,1);WORLD.decoAnim=null}const g=new THREE.Group(),W=N*C;
  if(id==='sea'){const m=new THREE.MeshLambertMaterial({color:'#dff8ff',transparent:true,opacity:.55});const bs=[];for(let i=0;i<40;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.4+Math.random()*1.2,10,8),m);b.position.set(-30+Math.random()*(W+60),2+Math.random()*30,-30+Math.random()*(W+60));if(b.position.x>0&&b.position.x<W&&b.position.z>0&&b.position.z<W)b.position.y+=14;g.add(b);bs.push(b)}
    for(let i=0;i<14;i++){const a=i/14*Math.PI*2,r=W*.75;const s=new THREE.Group();const st=new THREE.Mesh(new THREE.ConeGeometry(1.2,6+Math.random()*6,6),LM(['#ff7ea8','#ff9e5f','#b98cff'][i%3]));st.position.y=4;s.add(st);s.position.set(W/2+Math.cos(a)*r,0,W/2+Math.sin(a)*r);g.add(s)}
    WORLD.decoAnim=(t,dt)=>{for(const b of bs){b.position.y+=dt*1.5;if(b.position.y>40)b.position.y=2}};(WORLD.anims=WORLD.anims||[]).push(WORLD.decoAnim)}
  if(id==='cloud'){const m=LM('#ffffff');for(let i=0;i<18;i++){const a=i/18*Math.PI*2,r=W*.7+Math.random()*30;const c=new THREE.Group();for(let k=0;k<4;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(3+Math.random()*3,12,10),m);p.position.set(k*4-6,Math.random()*2,Math.random()*3);c.add(p)}c.position.set(W/2+Math.cos(a)*r,-2,W/2+Math.sin(a)*r);g.add(c)}}
  if(id==='cake'){for(let i=0;i<12;i++){const a=i/12*Math.PI*2,r=W*.72;const c=new THREE.Group();const can=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,9,12),new THREE.MeshLambertMaterial({map:stripeT(['#ff7eb6','#7cc6ff','#ffd35f'][i%3],'#ffffff',[1,3])}));can.position.y=4.5;c.add(can);const f=new THREE.Mesh(new THREE.SphereGeometry(.7,10,8),new THREE.MeshBasicMaterial({color:'#ffd35f'}));f.scale.y=1.6;f.position.y=9.8;c.add(f);c.position.set(W/2+Math.cos(a)*r,0,W/2+Math.sin(a)*r);g.add(c)}}
  if(id==='choco'){const gs=[];for(let i=0;i<8;i++){const a=i/8*Math.PI*2,r=W*.78;const gear=new THREE.Mesh(new THREE.TorusGeometry(4,1.2,8,12),LM(i%2?'#7a4526':'#c98d5f'));gear.position.set(W/2+Math.cos(a)*r,5,W/2+Math.sin(a)*r);gear.lookAt(W/2,5,W/2);g.add(gear);gs.push(gear)}
    WORLD.decoAnim=(t,dt)=>{for(const q of gs)q.rotation.z+=dt*.6};(WORLD.anims=WORLD.anims||[]).push(WORLD.decoAnim)}
  scene.add(g);WORLD.deco28=g}
{const at0=applyTheme;applyTheme=function(id,force){const r=at0(id,force);if(r!==false)try{mapDeco(THEMEID)}catch(e){}return r}}

/* ----- 맵마다 음악 ----- */
const MAPMUS={candy:1,ice:1,pumpkin:1,xmas:1,choco:1,cloud:1,sea:1,cake:1};
function loadMapMusic(th){const k='m_'+th;if(!A.ctx||A.buf[k]||A.loading===k||!MAPMUS[th]||window.__noMapMusic)return;A.loading=k;loadBuf(ASSETS.music+k+(ASSETS.musicExt||'.mp3')).then(b=>A.ctx.decodeAudioData(b)).then(ab=>{A.buf[k]=ab;A.loading=null;if(isPlaying()&&THEMEID===th)musicGame()}).catch(()=>{A.loading=null;MAPMUS[th]=0})}
function curGameTrack(){const k='m_'+THEMEID;return A.buf[k]?k:'game'}
musicGame=function(){stopTrack('title');stopTrack('design');const k=curGameTrack();for(const n of Object.keys(A.tracks))if(n!==k&&(n==='game'||n.startsWith('m_')))stopTrack(n);track(k,.5);hurryMusic(false);loadMapMusic(THEMEID)};
hurryMusic=function(on){const t=A.tracks[curGameTrack()]||A.tracks.game;if(!t||!A.ctx)return;const r=t.s.playbackRate,now=A.ctx.currentTime;r.cancelScheduledValues(now);r.setValueAtTime(r.value,now);r.linearRampToValueAtTime(on?1.08:1,now+1.2)};
{const mt0=musicTitle;musicTitle=function(){for(const n of Object.keys(A.tracks))if(n.startsWith('m_'))stopTrack(n);mt0()}}
{const md0=musicDesign;musicDesign=function(){for(const n of Object.keys(A.tracks))if(n.startsWith('m_'))stopTrack(n);md0();loadMapMusic(THEMEID)}}

/* ----- 스토리: 레시피 되찾기 ----- */
const STORY=[
 {n:1,th:'candy',w:'막대사탕 마녀 롤리',rc:'무지개 사탕',cards:['skel','move','fake','slip','tower','trap','soldier'],unl:[[3,['c','bat']],[5,['s','dash2']],[7,['c','jelly']],[10,['c','soldier']]]},
 {n:2,th:'ice',w:'빙수 마녀 서리',rc:'눈꽃 빙수',cards:['ghost','slip','trap','fake','ice','move','skel'],unl:[[3,['s','compass']],[5,['s','freeze']],[7,['c','ice']],[10,['s','flag']]]},
 {n:3,th:'pumpkin',w:'호박파이 마녀 펌킨',rc:'호박 파이',cards:['ghost','bat','fake','rev','tower','skel','eye'],unl:[[3,['c','rev']],[5,['s','lure']],[7,['s','smoke']],[10,['c','eye']]]},
 {n:4,th:'xmas',w:'진저 마녀 진저',rc:'진저브레드 집',cards:['skel','bear','trap','jelly','tower','move','fog'],unl:[[3,['c','bear']],[5,['s','echo']],[7,['c','fog']],[10,['o','cake']]]},
 {n:5,th:'choco',w:'초코 마녀 카카오',rc:'녹는 초코',cards:['skel','magnet','choco','tower','soldier','spin','move'],unl:[[3,['c','magnet']],[5,['s','brick']],[7,['s','clean']],[10,['c','spin']]]},
 {n:6,th:'cloud',w:'솜사탕 마녀 몽글',rc:'구름 솜사탕',cards:['ghost','bat','whirl','choco','fog','ice','move'],unl:[[3,['c','choco']],[5,['s','scope']],[7,['c','whirl']],[10,['o','cloud']]]},
 {n:7,th:'sea',w:'젤리 마녀 말랑',rc:'해파리 젤리',cards:['skel','jelly','spider','trap','magnet','ice','bear'],unl:[[5,['s','xray']],[10,['c','spider']]]},
 {n:8,th:'cake',w:'케이크 여왕',rc:'할머니의 생일 케이크',cards:['bear','soldier','spider','spin','eye','whirl','move','choco'],unl:[[5,['s','heal']],[10,['s','tele']]]}];
const G3S={candy:'사탕 5개 넘게 줍기',nohit:'한 대도 안 맞기',hp:'체력 60 넘게 남기기',noskill:'스킬 없이 탈출 (대시는 돼요)'};
SAVE.st2=SAVE.st2&&typeof SAVE.st2==='object'?SAVE.st2:{};
// 86차: 장마다 6단계. 예전 10단계 기록은 장 단위로 옮겨요 (깬 장 = 6단계 모두 별 1개, 하다 만 장 = 간 만큼 열기)
const STN=6;
if(SAVE.stV!==6){const o=SAVE.st2,n={};for(let c=1;c<=8;c++){if((o[c+'-10']|0)&1){for(let s=1;s<=STN;s++)n[c+'-'+s]=1}else{let k=0;for(let s=1;s<=9;s++)if((o[c+'-'+s]|0)&1)k=s;const m=Math.floor(k*5/9);for(let s=1;s<=m;s++)n[c+'-'+s]=1}}
  if(Object.keys(o).length)SAVE.st2old=o;SAVE.st2=n;SAVE.stV=6;SAVE.st3Seen={};SAVE.stSeen={}}
const sb2=(c,s)=>SAVE.st2[c+'-'+s]|0,ss2=(c,s)=>{const b=sb2(c,s);return(b&1)+((b>>1)&1)+((b>>2)&1)};
const chOpen=c=>c===1||(sb2(c-1,STN)&1)===1||SAVE.dev,stOpen2=(c,s)=>chOpen(c)&&(s===1||(sb2(c,s-1)&1)===1||SAVE.dev);
const recipes=()=>{let n=0;for(const ch of STORY)for(let s=1;s<=STN;s++)if(sb2(ch.n,s)&1)n++;return n},stars2=()=>{let n=0;for(const ch of STORY)for(let s=1;s<=STN;s++)n+=ss2(ch.n,s);return n};
function stDef(c,s){const ch=STORY[c-1],i=(c-1)*10+s-1,boss=s===10;const ai=boss?2:c<=2?(s<=5?0:1):c<=5?1:(s<=4?1:2);
  const k=Math.min(ch.cards.length,boss?ch.cards.length:3+Math.ceil(s/2));const deck=ch.cards.slice(0,k);for(const q of['skel','tower','slip','trap','fake','move','ghost'])if(deck.length<6&&!deck.includes(q))deck.push(q);
  return{story:true,c,s,n:c*100+s,witch:false,boss,th:ch.th,ai,walls:Math.min(60,32+c*3+s),g3:['candy','nohit','hp','noskill'][i%4],fast:Math.max(70,140-c*6-s*2),seed:5000+c*131+s*7919,deck:deck.slice(0,boss?8:6),aug:boss?[['moving','fakeexit','party','reuse','tax','nomap','castle','burnearly'][c-1]]:[]}}
function startStory(c,s){if(!stOpen2(c,s))return;const st=stDef(c,s);SER.on=false;resetDuo();if(!STG_SAVE)STG_SAVE={AIL,PT:PT_SEC};AIL=st.ai;PT_SEC=2.5;G.stage=st;G.chal=null;G.bonus=0;netLeave();window.__deck=st.deck;
  clearWorld();applyTheme(st.th);withSeed(st.seed,()=>autoWalls(st.walls));rebuildEdges();FIELD.clear();syncWallMeshes();if(!isFull())goFull(true);beginMatch('hero',true)}
{const rs1=restoreStage;restoreStage=function(){if(STG_SAVE)window.__deck=null;rs1()}}
{const ss4=startStage;startStage=function(n){if(n>=100){storyIntro(Math.floor(n/100),n%100,()=>startStory(Math.floor(n/100),n%100));return}ss4(n)}}
{const se0=stageEnd;stageEnd=function(win,why,t){const st=G.stage;if(!st||!st.story)return se0(win,why,t);const h=G.hero;let b=0;
  if(win){b|=1;if(t<=st.fast)b|=4;const g=st.g3;if((g==='candy'&&h.manaGot>=5)||(g==='nohit'&&!G.stats.hits)||(g==='hp'&&h.hp>60)||(g==='noskill'&&!h.skills))b|=2}
  const key=st.c+'-'+st.s,old=SAVE.st2[key]|0,nb=b&~old,news=(nb&1)+((nb>>1)&1)+((nb>>2)&1);SAVE.st2[key]=old|b;let coins=news*10+((nb&1)?20:0);const unl=[];
  if(nb&1){for(const[sn,u]of STORY[st.c-1].unl)if(sn===st.s){const[kind,k]=u;const had=kind==='o'?owns('cloth',k):!!SAVE.unl[kind+':'+k];if(!had){unlockItem(kind,k);unl.push(u)}}}
  if(coins){SAVE.coins+=coins;syncCoins()}saveGame();if(news)misAdd('stage',news);return{b,news,coins,unl}}}
{const re1=resExtra;resExtra=function(win,why,t){re1(win,why,t);const st=G.stage;if(!st||!st.story)return;const x=G.extra&&G.extra.stage||{b:0,news:0,coins:0,unl:[]},all=sb2(st.c,st.s);
  let html=`<span class="rs-stars">${starRow(all,'big')}</span>`+(x.news?`새 별 ${x.news}개 · ${COIN_SVG}+${x.coins}`:(x.b?'이미 받은 별이에요':'별을 못 받았어요'));
  if(win&&(x.b&1))html+=`<div class="rc-got">📜 레시피 '${STORY[st.c-1].rc}' ${st.s}/10쪽</div>`;
  for(const[kind,k]of x.unl||[])html+=`<div class="unl-got">🎉 새로 열렸어요! ${kind==='c'?'마녀 카드':kind==='s'?'도둑 스킬':'특별 옷'} <b>${unlName(kind,k)}</b></div>`;
  $('resCoin').innerHTML=html;$('bHome').textContent='목록';const nx=st.s<STN?[st.c,st.s+1]:st.c<8?[st.c+1,1]:null;$('bNext').hidden=!(nx&&stOpen2(nx[0],nx[1]));$('resLede').textContent=`${st.c}장 ${st.s}단계 · `+$('resLede').textContent.replace(/^.*단계 · /,'');
  if(win&&st.boss&&(x.b&1)&&x.news)setTimeout(()=>storyOutro(st.c),900)}}
setTimeout(()=>{$('bNext').onclick=()=>{const st=G.stage;if(st&&st.story){const nx=st.s<STN?[st.c,st.s+1]:[st.c+1,1];if(nx[0]<=8&&stOpen2(nx[0],nx[1]))startStage(nx[0]*100+nx[1]);return}if(G.stage){const n=G.stage.n+1;if(STG[n-1]&&stOpen(n))startStage(n)}}},0);
// 목록 화면
const STV={c:1,s:1};
openStages=function(){restoreStage();G.stage=null;G.chal=null;SER.on=false;titleBoardIfNeeded();show('stages');let c=1;for(const ch of STORY)if(chOpen(ch.n))c=ch.n;STV.c=c;let s=1;for(let i=1;i<=STN;i++)if(stOpen2(c,i))s=i;STV.s=s;applyTheme(STORY[c-1].th);renderStages()};
renderStages=function(){const ch=STORY[STV.c-1];$('stages').querySelector('.pane-top b').textContent='스토리 · 레시피 되찾기';$('stgTot').innerHTML=`📜 ${recipes()} / 80 · ★ ${stars2()} / 240`;
  const tabs=STORY.map(q=>`<button class="ch-t${q.n===STV.c?' on':''}${chOpen(q.n)?'':' lock'}" data-c="${q.n}" style="--tc:${THC[q.th]}">${chOpen(q.n)?q.n+'장':'🔒'}</button>`).join('');
  const sts=Array.from({length:10},(_,i)=>{const s=i+1,open=stOpen2(ch.n,s),boss=s===10;return`<button class="st${open?'':' lock'}${s===STV.s?' sel':''}${boss?' boss':''}" data-n="${ch.n*100+s}" style="background:${THC[ch.th]}" aria-label="${s}단계">${boss?'<span class="wh">'+HAT_SVG+'</span>':''}<b>${s}</b><span class="ss">${starRow(sb2(ch.n,s))}</span></button>`}).join('');
  $('stgGrid').innerHTML=`<div class="ch-tabs">${tabs}</div><div class="ch-name">${ch.n}장 · ${THN[ch.th]} · <span>${ch.w}</span></div><div class="st-row">${sts}</div>`;
  const st=stDef(ch.n,STV.s),b=sb2(ch.n,STV.s),open=stOpen2(ch.n,STV.s);const goals=['탈출해서 레시피 되찾기',G3S[st.g3],`${st.fast}초 안에 탈출`];
  const u=ch.unl.find(q=>q[0]===STV.s);const uTxt=u?`<div class="si-unl">🎁 깨면 열려요: ${u[1][0]==='c'?'마녀 카드':u[1][0]==='s'?'도둑 스킬':'특별 옷'} <b>${unlName(u[1][0],u[1][1])}</b></div>`:'';
  $('stgInfo').innerHTML=`<div class="si-h"><b>${ch.n}장 ${STV.s}단계${st.boss?' · 보스':''}</b><span>${st.boss?ch.w+'와 대결!':'레시피 '+STV.s+'쪽 되찾기'}</span></div><div class="si-sub">AI ${AIL_N[st.ai]} · 마녀 카드 ${st.deck.slice(0,6).map(k=>CARDS[k].ic).join('')}</div>`+
    `<ul class="si-g">${goals.map((g,i)=>`<li class="${(b>>i)&1?'ok':''}"><i>★</i>${g}</li>`).join('')}</ul>${uTxt}<div class="si-rw">${COIN_SVG}처음 깨면 20 · 새 별마다 10코인</div>`+
    `<button class="mbtn berry small" id="bStgGo"${open?'':' disabled'}><span class="mt"><b>${open?'시작!':'앞 단계를 깨요'}</b></span></button>`;
  const go=$('bStgGo');if(go)go.onclick=async()=>{await initAudio();startStage(ch.n*100+STV.s)}};
$('stgGrid').addEventListener('click',e=>{const t=e.target.closest('.ch-t');if(t){e.stopImmediatePropagation();const c=+t.dataset.c;if(!chOpen(c)){SFX.deny();tMsg('앞 장의 보스를 이기면 열려요');return}STV.c=c;STV.s=1;for(let i=1;i<=STN;i++)if(stOpen2(c,i))STV.s=i;applyTheme(STORY[c-1].th);SFX.card();renderStages();return}
  const b=e.target.closest('.st');if(b&&+b.dataset.n>=100){e.stopImmediatePropagation();STV.s=(+b.dataset.n)%100;SFX.card();renderStages()}},true);
// 말풍선 이야기
const STLINE={
 1:[['g','쿠키야! 내 비밀 레시피 책을 마녀들이 훔쳐 갔단다'],['t','걱정 마요, 할머니! 제가 한 장씩 다 되찾아 올게요!'],['w','히히, 내 막대사탕 미로를 빠져나갈 수 있을까?']],
 2:[['w','빙수처럼 차갑게 얼려 주지! 꽁꽁~'],['t','미끄러워도 괜찮아. 눈꽃 빙수 레시피는 내 거야!']],
 3:[['w','호박 숲은 밤이 길단다~ 유령들이 기다리고 있어'],['t','으스스해도… 호박 파이를 위해서라면!']],
 4:[['w','진저 마녀의 크리스마스 미로에 온 걸 환영해!'],['t','선물 대신 레시피를 돌려받으러 왔어요!']],
 5:[['w','초콜릿 공장의 톱니는 쉬지 않고 돌아간다구'],['t','녹기 전에 빨리 빠져나가야지!']],
 6:[['w','몽글몽글~ 구름 위에서 길을 잃어 봐'],['t','솜사탕 구름 레시피, 꼭 찾을 거야!']],
 7:[['w','바닷속 젤리 미로에선 숨이 막힐걸?'],['t','거품 따라 쭉쭉 헤엄쳐 갈게요!']],
 8:[['w','내가 바로 케이크 여왕! 마지막 레시피는 못 줘!'],['g','쿠키야, 할머니 생일 케이크… 부탁한다!'],['t','이번이 마지막이에요. 가자!']]};
const STMID=[['w','또 왔어? 이번엔 더 어려울걸!'],['t','레시피 한 장 더! 좋아, 가 보자'],['w','후후, 내 카드가 하나 더 늘었지'],['t','길이 꼬불꼬불… 지도를 잘 봐야지']];
const STEND={1:'무지개 사탕 레시피 완성! 다음은 얼음 동굴이야',2:'눈꽃 빙수 완성! 호박 숲으로 가 볼까?',3:'호박 파이 완성! 크리스마스 마을로!',4:'진저브레드 집 완성! 초콜릿 공장이 보여',5:'녹는 초코 완성! 구름 위로 올라가자',6:'구름 솜사탕 완성! 이제 바닷속으로',7:'해파리 젤리 완성! 마지막은 케이크 성이야',8:'할머니의 생일 케이크 완성! 할머니, 생신 축하해요! 🎂'};
function stSpeak(who,c){const ch=STORY[c-1];return who==='t'?['쿠키 도둑',$('bHero').querySelector('svg').outerHTML]:who==='g'?['할머니','<span class="st-gm">👵</span>']:[ch.w,$('bDevil').querySelector('svg').outerHTML]}
function storyTalk(lines,c,done){const M=$('storyM');let i=0;const step=()=>{if(i>=lines.length){M.hidden=true;done&&done();return}const[who,txt]=lines[i],[nm,art]=stSpeak(who,c);
    M.innerHTML=`<div class="st-box ${who}"><span class="st-art">${art.replace(/id="(tf|wf)"/g,'id="$1S"').replace(/url\(#(tf|wf)\)/g,'url(#$1S)')}</span><div class="st-bub"><b>${nm}</b><p>${txt}</p><small>눌러서 계속 ▶</small></div><button class="sbtn st-skip">건너뛰기</button></div>`;M.hidden=false;
    M.querySelector('.st-skip').onclick=e=>{e.stopPropagation();i=lines.length;step()};i++};M.onclick=()=>{SFX.card();step()};step()}
function storyIntro(c,s,go){if(!SAVE.stSeen)SAVE.stSeen={};const key=c+'-'+s;let lines;if(s===1&&!SAVE.stSeen[key])lines=STLINE[c].slice(0,s===1?3:2);else if(s===10)lines=[['w',`${STORY[c-1].w}: 여기까지 오다니! 마지막 레시피는 내가 지킨다!`],['t','보스 마녀다… 집중!']];else if(!SAVE.stSeen[key])lines=[STMID[(c+s)%STMID.length]];
  SAVE.stSeen[key]=1;saveGame();if(!lines){go();return}storyTalk(lines,c,go)}
function storyOutro(c){storyTalk([['t',STEND[c]]].concat(c===8?[['g','고맙다 쿠키야! 우리 다 같이 케이크 먹자꾸나 🎂']]:[]),c,()=>{})}
// 처음 화면: 스토리 버튼 · 할머니 케이크
{const b=$('bStage');const t=b.querySelector('b'),sm=b.querySelector('small');if(t)t.textContent='스토리';if(sm)sm.textContent='레시피 되찾기'}
{const ts2=titleScreen;titleScreen=function(){ts2();const c=$('gmCake');if(c)c.hidden=recipes()<8*STN}}
{const sl=document.querySelector('#title .title-slab');if(sl){const c=document.createElement('div');c.id='gmCake';c.hidden=true;c.title='할머니의 생일 케이크';c.textContent='🎂';sl.appendChild(c)}}
