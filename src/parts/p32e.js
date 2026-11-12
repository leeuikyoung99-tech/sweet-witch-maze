/* ================= 32차 (마): 벽 퍼즐 미니게임 (분홍 벽을 눌러 옆 칸으로 밀어서 쿠키 길 열기 · 시간 제한 없음) ================= */
MINI3[2]=['puzzle','surv'];MINI3[3]=['candy','puzzle'];MINI3[5]=['puzzle','surv'];MINI3[6]=['candy','puzzle'];MINI3[8]=['puzzle','surv'];
{const sd=stDef;stDef=function(c,s){const st=sd(c,s);if(st.type==='puzzle'){st.n2=5+Math.round(st.d*2);st.k=2+Math.round(st.d*2);st.fastP=20+st.k*12}return st}}
{const g=stGoals3;stGoals3=function(st){if(st.type==='puzzle')return['길 열기',`${st.k}번만 밀어서 열기`,`${st.fastP}초 안에 열기`];return g(st)}}
{const m=document.createElement('div');m.className='scr';m.id='pzM';m.hidden=true;
  m.innerHTML=`<button class="ic-back" id="bPzX" aria-label="나가기"></button><div class="pz-top"><span class="pz-chip" id="pzMv"></span><button class="sbtn pz-rs" id="bPzR">처음부터</button></div><canvas id="pzC"></canvas><div class="pz-res" id="pzRes" hidden></div>`;document.body.appendChild(m);
  $('bPzX').onclick=()=>{SFX.click();pzClose();openStages()};$('bPzR').onclick=()=>{SFX.click();pzReset()}}
const PZ3={};
function pzGen(st){const n=st.n2,K=st.k;let seed=st.seed;for(let tries=0;tries<80;tries++,seed+=17){const R=mulberry(seed);
    // 칸 사이 벽: E[x][z] = (x,z)-(x+1,z) · S[x][z] = (x,z)-(x,z+1) · 1 = 벽
    const E=[...Array(n)].map(()=>Array(n).fill(1)),S=[...Array(n)].map(()=>Array(n).fill(1)),vis=[...Array(n)].map(()=>Array(n).fill(0));
    const stack=[[Math.floor(R()*n),Math.floor(R()*n)]];vis[stack[0][0]][stack[0][1]]=1;
    while(stack.length){const[x,z]=stack[stack.length-1];const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>[x+a,z+b,a,b]).filter(([a,b])=>a>=0&&b>=0&&a<n&&b<n&&!vis[a][b]);
      if(!nb.length){stack.pop();continue}const[a,b,dx,dz]=nb[Math.floor(R()*nb.length)];if(dx===1)E[x][z]=0;if(dx===-1)E[a][b]=0;if(dz===1)S[x][z]=0;if(dz===-1)S[a][b]=0;vis[a][b]=1;stack.push([a,b])}
    // 길을 조금 더 열어 막다른 길을 줄여요
    for(let i=0;i<n;i++){const x=Math.floor(R()*(n-1)),z=Math.floor(R()*n);E[x][z]=0}
    const P={n,E,S,mv:[],walls:[]},sx=Math.floor(n/2);P.s=[sx,n-1];P.e=[sx,0];
    const path=pzPath(P);if(!path)continue;const pe=[];for(let i=0;i+1<path.length;i++){const[a,b]=path[i],[c,d]=path[i+1];pe.push(c!==a?['E',Math.min(a,c),b]:['S',a,Math.min(b,d)])}
    const onPath=(t,x,z)=>pe.some(q=>q[0]===t&&q[1]===x&&q[2]===z);const used=new Set();const walls=[];
    for(const idx of shuffleR([...pe.keys()],R)){if(walls.length>=K)break;const[t,x,z]=pe[idx];if([...used].some(u=>Math.abs(u-idx)<2))continue;
      const alts=t==='E'?[[x,z-1],[x,z+1]]:[[x-1,z],[x+1,z]];const ok=alts.filter(([a,b])=>a>=0&&b>=0&&(t==='E'?a<n-1&&b<n:a<n&&b<n-1)&&!(t==='E'?E[a][b]:S[a][b])&&!onPath(t,a,b));if(!ok.length)continue;
      const[a,b]=ok[Math.floor(R()*ok.length)];walls.push({t,p:[[x,z],[a,b]],at:0});used.add(idx)}
    if(walls.length<K)continue;
    // 헷갈리게 하는 벽 (밀어도 되고 안 밀어도 되는 벽)
    const decoy=1+Math.round(st.d*2);for(let i=0,g=0;i<decoy&&g<60;g++){const t=R()<.5?'E':'S',x=Math.floor(R()*(t==='E'?n-1:n)),z=Math.floor(R()*(t==='E'?n:n-1));if(!(t==='E'?E[x][z]:S[x][z]))continue;if(walls.some(w=>w.t===t&&w.p.some(([a,b])=>a===x&&b===z)))continue;
      const alts=t==='E'?[[x,z-1],[x,z+1]]:[[x-1,z],[x+1,z]];const ok=alts.filter(([a,b])=>a>=0&&b>=0&&(t==='E'?a<n-1&&b<n:a<n&&b<n-1)&&!(t==='E'?E[a][b]:S[a][b])&&!walls.some(w=>w.t===t&&w.p.some(([c,d])=>c===a&&d===b)));if(!ok.length)continue;
      if(t==='E')E[x][z]=0;else S[x][z]=0;walls.push({t,p:[[x,z],ok[Math.floor(R()*ok.length)]],at:0,decoy:1});i++}
    P.walls=walls;if(pzPath(P))continue;return P}return null}
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffleR(a,R){for(let i=a.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function pzWall(P,t,x,z){if(t==='E'?P.E[x][z]:P.S[x][z])return true;return P.walls.some(w=>w.t===t&&w.p[w.at][0]===x&&w.p[w.at][1]===z)}
function pzPath(P){const n=P.n,prev=new Map(),q=[P.s],k=c=>c[0]+','+c[1];prev.set(k(P.s),null);
  while(q.length){const[x,z]=q.shift();if(x===P.e[0]&&z===P.e[1]){const out=[];let c=[x,z];while(c){out.unshift(c);c=prev.get(k(c))}return out}
    const nb=[];if(x<n-1&&!pzWall(P,'E',x,z))nb.push([x+1,z]);if(x>0&&!pzWall(P,'E',x-1,z))nb.push([x-1,z]);if(z<n-1&&!pzWall(P,'S',x,z))nb.push([x,z+1]);if(z>0&&!pzWall(P,'S',x,z-1))nb.push([x,z-1]);
    for(const c of nb)if(!prev.has(k(c))){prev.set(k(c),[x,z]);q.push(c)}}return null}
function pzStart(st){const P=pzGen(st);if(!P){tMsg('퍼즐을 만들지 못했어요');return}Object.assign(PZ3,{st,P,moves:0,t0:performance.now(),done:false,anim:null});
  for(const w of P.walls)w.at=0;for(const el of document.querySelectorAll('.scr'))el.hidden=true;screen='puzzle';$('pzM').hidden=false;$('pzRes').hidden=true;pzDraw();if(!PZ3.loop)PZ3.loop=requestAnimationFrame(pzFrame)}
function pzReset(){if(!PZ3.P||PZ3.done)return;for(const w of PZ3.P.walls)w.at=0;PZ3.moves=0;pzDraw()}
function pzClose(){$('pzM').hidden=true;PZ3.done=true}
function pzGeom(){const cv=$('pzC'),r=cv.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);if(cv.width!==Math.round(r.width*dpr)){cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr)}
  const n=PZ3.P.n,pad=cv.width*.08,s=(Math.min(cv.width,cv.height)-pad*2)/n,ox=(cv.width-s*n)/2,oy=(cv.height-s*n)/2;return{cv,dpr,s,ox,oy,n}}
function pzSeg(t,x,z,G2){const{s,ox,oy}=G2;return t==='E'?[ox+(x+1)*s,oy+z*s,ox+(x+1)*s,oy+(z+1)*s]:[ox+x*s,oy+(z+1)*s,ox+(x+1)*s,oy+(z+1)*s]}
function pzDraw(){if(!PZ3.P)return;const P=PZ3.P,G2=pzGeom(),{cv,s,ox,oy,n}=G2,g=cv.getContext('2d');g.clearRect(0,0,cv.width,cv.height);
  g.fillStyle='#f6dcb8';g.strokeStyle='#4a2a1a';g.lineWidth=s*.08;g.beginPath();g.roundRect(ox-s*.12,oy-s*.12,s*n+s*.24,s*n+s*.24,s*.25);g.fill();g.stroke();
  for(let x=0;x<n;x++)for(let z=0;z<n;z++){g.fillStyle=(x+z)%2?'#efcfa2':'#f6dcb8';g.fillRect(ox+x*s,oy+z*s,s,s)}
  const ln=(seg,col,w,dash)=>{g.save();g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';if(dash)g.setLineDash(dash);g.beginPath();g.moveTo(seg[0],seg[1]);g.lineTo(seg[2],seg[3]);g.stroke();g.restore()};
  // 바깥 테두리 (출발·출구만 뚫림)
  g.strokeStyle='#4a2a1a';g.lineWidth=s*.14;g.lineCap='round';for(let x=0;x<n;x++){if(x!==P.e[0])ln([ox+x*s,oy,ox+(x+1)*s,oy],'#4a2a1a',s*.14);if(x!==P.s[0])ln([ox+x*s,oy+n*s,ox+(x+1)*s,oy+n*s],'#4a2a1a',s*.14)}
  ln([ox,oy,ox,oy+n*s],'#4a2a1a',s*.14);ln([ox+n*s,oy,ox+n*s,oy+n*s],'#4a2a1a',s*.14);
  for(let x=0;x<n;x++)for(let z=0;z<n;z++){if(x<n-1&&P.E[x][z])ln(pzSeg('E',x,z,G2),'#7a4526',s*.14);if(z<n-1&&P.S[x][z])ln(pzSeg('S',x,z,G2),'#7a4526',s*.14)}
  for(const w of P.walls){const o=w.p[1-w.at],c=w.p[w.at];ln(pzSeg(w.t,o[0],o[1],G2),'#ff7eb6',s*.06,[s*.1,s*.1]);const sg=pzSeg(w.t,c[0],c[1],G2);ln(sg,'#4a2a1a',s*.24);ln(sg,'#ff6fae',s*.15);ln(sg,'#ffd0e4',s*.05)}
  // 출구 · 쿠키
  g.fillStyle='#7cdcb0';g.strokeStyle='#4a2a1a';g.lineWidth=s*.05;g.beginPath();g.roundRect(ox+P.e[0]*s+s*.2,oy-s*.5,s*.6,s*.42,s*.1);g.fill();g.stroke();
  const ck=PZ3.anim?PZ3.anim.pos:[P.s[0],P.s[1]];g.fillStyle='#f2b56b';g.beginPath();g.arc(ox+(ck[0]+.5)*s,oy+(ck[1]+.5)*s,s*.3,0,7);g.fill();g.stroke();g.fillStyle='#5a3220';for(const[a,b]of[[-.1,-.08],[.1,-.05],[0,.1]]){g.beginPath();g.arc(ox+(ck[0]+.5+a)*s,oy+(ck[1]+.5+b)*s,s*.05,0,7);g.fill()}
  $('pzMv').innerHTML=`밀기 <b>${PZ3.moves}</b> / ${PZ3.st.k}`}
function pzFrame(){PZ3.loop=null;if($('pzM').hidden)return;const A=PZ3.anim;const now=performance.now(),fdt=Math.min(.1,(now-(PZ3.last||now))/1000);PZ3.last=now;if(A){A.t+=fdt||1/60;const i=Math.min(A.path.length-1,Math.floor(A.t*7));const f=Math.min(1,A.t*7-i),a=A.path[i],b=A.path[Math.min(A.path.length-1,i+1)];A.pos=[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];if(i>=A.path.length-1){A.pos=[A.path[A.path.length-1][0],-1];pzDraw();PZ3.anim=null;pzWin();return}pzDraw()}
  PZ3.loop=requestAnimationFrame(pzFrame)}
$('pzC').addEventListener('pointerdown',e=>{if(!PZ3.P||PZ3.done||PZ3.anim)return;const G2=pzGeom(),r=$('pzC').getBoundingClientRect(),px=(e.clientX-r.left)*G2.dpr,py=(e.clientY-r.top)*G2.dpr;let best=null,bd=G2.s*.42;
  for(const w of PZ3.P.walls)for(const at of[0,1]){const[x1,y1,x2,y2]=pzSeg(w.t,w.p[at][0],w.p[at][1],G2),mx=(x1+x2)/2,my=(y1+y2)/2,d=Math.hypot(px-mx,py-my);if(d<bd){bd=d;best=w}}
  if(!best){SFX.deny();return}best.at=1-best.at;PZ3.moves++;SFX.card();pzDraw();const path=pzPath(PZ3.P);if(path){PZ3.done=true;PZ3.tEnd=(performance.now()-PZ3.t0)/1000;PZ3.anim={path:path.concat([[path[path.length-1][0],-1]]),t:0,pos:path[0]};if(!PZ3.loop)PZ3.loop=requestAnimationFrame(pzFrame)}});
function pzWin(){const st=PZ3.st;let b=1;if(PZ3.moves<=st.k)b|=2;if(PZ3.tEnd<=st.fastP)b|=4;SFX.win&&SFX.win();
  const key=st.c+'-'+st.s,old=SAVE.st2[key]|0,nb=b&~old,news=(nb&1)+((nb>>1)&1)+((nb>>2)&1);SAVE.st2[key]=old|b;const coins=news*5+((nb&1)?stFirst(st.c):0);if(coins){SAVE.coins+=coins;syncCoins()}saveGame();if(news)misAdd('stage',news);
  const nx=st.s<10?[st.c,st.s+1]:st.c<8?[st.c+1,1]:null,nxOk=!!(nx&&stOpen2(nx[0],nx[1]));
  $('pzRes').innerHTML=`<div class="slab pz-slab"><h2>길을 열었어요!</h2><span class="rs-stars">${starRow(sb2(st.c,st.s),'big')}</span><p class="pz-rw">${news?`새 별 ${news}개 · ${COIN_SVG}+${coins}`:'이미 받은 별이에요'}</p><div class="row"><button class="sbtn" id="bPzL">목록</button><button class="sbtn" id="bPzA">다시 하기</button>${nxOk?'<button class="mbtn berry small" id="bPzN"><span class="mt"><b>다음</b></span></button>':''}</div></div>`;
  $('pzRes').hidden=false;$('bPzL').onclick=()=>{SFX.click();pzClose();openStages()};$('bPzA').onclick=()=>{SFX.click();startStage(st.n)};if(nxOk)$('bPzN').onclick=()=>{SFX.click();pzClose();startStage(nx[0]*100+nx[1])}}
{const ss=startStory;startStory=function(c,s){if(!stOpen2(c,s))return;const st=stDef(c,s);if(st.type==='puzzle'){restoreStage();G.stage=null;pzStart(st);return}$('pzM').hidden=true;return ss.apply(this,arguments)}}
{const ts=titleScreen;titleScreen=function(){$('pzM').hidden=true;return ts.apply(this,arguments)}}
{const os=openStages;openStages=function(){$('pzM').hidden=true;return os.apply(this,arguments)}}
window.addEventListener('resize',()=>{if(!$('pzM').hidden)pzDraw()});
{const st=document.createElement('style');st.textContent=`
#pzM:not([hidden]){display:grid!important;place-items:center}#pzM{z-index:40;background:radial-gradient(ellipse at 50% 40%,#fff4f8 0 22%,#ffd3e5 60%,#f6aecb 100%)!important;flex-direction:column;padding:0!important}
#pzC{display:block;width:min(96vw,calc(100dvh - 20px));height:calc(100dvh - 20px);max-height:100dvh;touch-action:none}
.pz-top{position:absolute;right:max(12px,env(safe-area-inset-right,0px));top:max(10px,env(safe-area-inset-top,0px));display:flex;flex-direction:column;align-items:flex-end;gap:8px;z-index:3}
.pz-chip{font:17px var(--f-display);color:var(--choco);background:#fff8ee;border:3px solid var(--choco);border-radius:14px;padding:4px 12px;box-shadow:0 3px 0 var(--choco)}.pz-chip b{color:var(--berry);font-size:20px}
.pz-rs{min-height:40px;padding:4px 14px;font-size:15px}
.pz-res{position:absolute;inset:0;display:grid;place-items:center;background:#2b160b88;z-index:5}.pz-res[hidden]{display:none}
.pz-slab{gap:10px!important;padding:18px 24px!important}.pz-slab h2{margin:0}.pz-rw{margin:0;font:16px var(--f-display);display:flex;align-items:center;gap:4px}.pz-rw svg{width:20px;height:20px}
`;document.head.appendChild(st)}
