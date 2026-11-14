/* ================= 88차: 관문 눈보라가 하얀 판만 보이던 것 · 벽 퍼즐이 너무 쉽던 것 ================= */
// ----- (1) 눈보라: 진한 파란 경고 띠 + 가장자리 선 + 진행 방향 화살표 → 눈 벽(반투명 하얀 벽 + 휘날리는 눈송이)이 띠를 따라 지나가요 -----
// 예전: 연한 하늘색 띠(얼음 맵 바닥과 같은 색이라 안 보였어요)와 바닥에 깔린 하얀 판뿐이었어요. 판정·시간은 그대로예요.
const BLZ={};
function blzTex(){if(BLZ.tex)return BLZ.tex;const c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d'),r=g.createRadialGradient(16,16,0,16,16,16);
  r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.45,'rgba(255,255,255,.85)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,32,32);BLZ.tex=new THREE.CanvasTexture(c);return BLZ.tex}
function blzArrow(x,z,ax,dir){const s=new THREE.Shape();s.moveTo(0,1.3);s.lineTo(1.1,-.5);s.lineTo(.35,-.5);s.lineTo(.35,-1.3);s.lineTo(-.35,-1.3);s.lineTo(-.35,-.5);s.lineTo(-1.1,-.5);s.closePath();
  const m=new THREE.Mesh(new THREE.ShapeGeometry(s),gMat('#ffffff',.92));m.rotation.x=-Math.PI/2;m.rotation.z=ax==='x'?(dir>0?-Math.PI/2:Math.PI/2):(dir>0?Math.PI:0);m.position.set(x,.38,z);m.renderOrder=4;return bAdd(m)}
function blzFront(ax,a0,a1){const g=new THREE.Group(),L=a1-a0,T=C*1.4,H=5.2;
  const wall=new THREE.Mesh(new THREE.BoxGeometry(ax==='x'?T:L,H,ax==='x'?L:T),new THREE.MeshBasicMaterial({color:'#e4f4ff',transparent:true,opacity:.62,depthWrite:false}));wall.position.y=H/2;g.add(wall);
  const core=new THREE.Mesh(new THREE.BoxGeometry(ax==='x'?T*.45:L,H*.9,ax==='x'?L:T*.45),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.45,depthWrite:false}));core.position.y=H*.45;g.add(core);
  const n=320,pos=new Float32Array(n*3),seed=[];for(let i=0;i<n;i++)seed.push({u:(Math.random()-.5)*T*1.3,c:(Math.random()-.5)*L,y:Math.random()*H*1.1,a:Math.random()*6.3,w:2+Math.random()*3,v:1.5+Math.random()*2.5});
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));const pts=new THREE.Points(geo,new THREE.PointsMaterial({map:blzTex(),size:.95,transparent:true,depthWrite:false,color:'#ffffff'}));g.add(pts);
  g.userData={pts,seed,ax,H};if(ax==='x')g.position.z=(a0+a1)/2;else g.position.x=(a0+a1)/2;g.visible=false;return bAdd(g)}
function blzAnim(g,dt){const u=g.userData,p=u.pts.geometry.attributes.position;for(let i=0;i<u.seed.length;i++){const s=u.seed[i];s.a+=dt*s.w;s.y-=dt*s.v;if(s.y<0)s.y+=u.H*1.1;
    const a=s.u+Math.cos(s.a)*.6,b=s.c+Math.sin(s.a)*.7;if(u.ax==='x')p.setXYZ(i,a,s.y,b);else p.setXYZ(i,b,s.y,a)}p.needsUpdate=true}
blizTick=function(dt){const h=G.hero,W=N*C;if(bossInit('bliz','서리: 눈보라야, 모든 걸 덮어 버려!')){BOSS.next=3;BOSS.wave=null;BOSS.ice=[]}
  if(!BOSS.wave){BOSS.next-=dt;if(BOSS.next<=0){const k=G.stage.d>.5?4:3,ax=Math.random()<.5?'x':'z';const r0=Math.floor(Math.random()*(N-k));const a0=r0*C,a1=(r0+k)*C,dir=Math.random()<.5?1:-1;
      const warn=ax==='x'?gRect(0,a0,W,a1,'#14286e',.55,.11):gRect(a0,0,a1,W,'#14286e',.55,.11);
      const ed=[];for(const e of[a0,a1])ed.push(ax==='x'?gRect(0,e-.3,W,e+.3,'#ffffff',.95,.12):gRect(e-.3,0,e+.3,W,'#ffffff',.95,.12));
      const ar=[];const mid=(a0+a1)/2;for(let q=C;q<W;q+=C*2)ar.push(ax==='x'?blzArrow(q,mid,ax,dir):blzArrow(mid,q,ax,dir));
      const front=blzFront(ax,a0,a1);BOSS.wave={ax,a0,a1,warn,ed,ar,front,t:-2,dir};say('눈보라가 몰려와요! 진한 파란 띠 밖으로 피해요',true,1.4)}}
  else{const w=BOSS.wave;w.t+=dt;if(w.t<0){const o=.42+.25*Math.abs(Math.sin(w.t*6));w.warn.material.opacity=o;for(const a of w.ar)a.material.opacity=.55+.4*Math.abs(Math.sin(w.t*6))}
    else{w.front.visible=true;blzAnim(w.front,dt);const p=w.t*(W/2.6),pos=w.dir>0?p:W-p;const lo=Math.max(0,Math.min(pos,W)-C*.7),hi=Math.min(W,lo+C*1.4);
      if(w.ax==='x')w.front.position.x=(lo+hi)/2;else w.front.position.z=(lo+hi)/2;w.warn.material.opacity=.4;
      const inBand=w.ax==='x'?(h.z>w.a0&&h.z<w.a1):(h.x>w.a0&&h.x<w.a1),hp=w.ax==='x'?h.x:h.z;
      if(inBand&&Math.abs(hp-pos)<C*.8&&hurt({x:w.ax==='x'?pos:h.x,z:w.ax==='x'?h.z:pos},12,'눈보라에 휩쓸렸어요! 느려졌어요'))h.slowT=Math.max(h.slowT||0,2.2);
      if(p>W+C){bDrop(w.warn);bDrop(w.front);for(const e of w.ed)bDrop(e);for(const a of w.ar)bDrop(a);
        const ice=w.ax==='x'?gRect(0,w.a0,W,w.a1,'#a9e2ff',.55,.1):gRect(w.a0,0,w.a1,W,'#a9e2ff',.55,.1);BOSS.ice.push({m:ice,ax:w.ax,a0:w.a0,a1:w.a1,life:4});BOSS.wave=null;BOSS.next=Math.max(1.6,3.2-G.stage.d)}}}
  for(let i=BOSS.ice.length-1;i>=0;i--){const q=BOSS.ice[i];q.life-=dt;q.m.material.opacity=.55*Math.min(1,q.life);const inB=q.ax==='x'?(h.z>q.a0&&h.z<q.a1):(h.x>q.a0&&h.x<q.a1);if(inB)h.slowT=Math.max(h.slowT||0,.25);if(q.life<=0){bDrop(q.m);BOSS.ice.splice(i,1)}}};

// ----- (2) 벽 퍼즐 다시 만들기 -----
// 예전: 5x5 칸에 밀어야 할 벽 2개가 길 위에 그대로 있어서 보이는 대로 누르면 끝났어요.
// 이제: 길이 여러 갈래인 더 큰 미로에 분홍 벽을 많이 두고, 모든 조합을 다 따져 봐서
//  - 처음엔 길이 막혀 있고 · 가장 적게 미는 답이 K번(장마다 3~5) · 그 답이 2가지 이하 · 아무렇게나 눌러서 열리는 조합이 드문 퍼즐만 써요.
//  - 분홍 벽은 옆 칸으로 밀리는데, 민 자리가 다른 길을 막을 수도 있어요(잘못 밀면 오히려 막혀요).
const PZCFG={2:{n:6,W:7,K:3,fr:.12},3:{n:7,W:8,K:4,fr:.08},5:{n:7,W:9,K:4,fr:.06},6:{n:8,W:10,K:5,fr:.05},8:{n:8,W:11,K:5,fr:.04}};
const PZCACHE={};
// 장마다 좋은 퍼즐이 나오는 시도 번호를 미리 찾아 둬서 화면을 열 때 버벅이지 않아요 (바꾸면 다시 찾기: PZHINT 를 0으로 두고 .tries 확인)
const PZHINT={2:10,3:137,5:49,6:56,8:842};
// 상태 m(벽마다 0/1)에서 출발→출구 길이 있는지 빠르게
function pzFastMaker(P){const n=P.n,N2=n*n,bE0=new Uint8Array(N2),bS0=new Uint8Array(N2);for(let x=0;x<n;x++)for(let z=0;z<n;z++){if(x<n-1&&P.E[x][z])bE0[z*n+x]=1;if(z<n-1&&P.S[x][z])bS0[z*n+x]=1}
  const bE=new Uint8Array(N2),bS=new Uint8Array(N2),seen=new Uint8Array(N2),q=new Int16Array(N2),st=P.s[1]*n+P.s[0],en=P.e[1]*n+P.e[0],W=P.walls;
  return m=>{bE.set(bE0);bS.set(bS0);for(let i=0;i<W.length;i++){const w=W[i],c=w.p[(m>>i)&1];(w.t==='E'?bE:bS)[c[1]*n+c[0]]=1}seen.fill(0);let h=0,t=0;q[t++]=st;seen[st]=1;
    while(h<t){const i=q[h++];if(i===en)return true;const x=i%n,z=(i/n)|0;
      if(x<n-1&&!bE[i]&&!seen[i+1]){seen[i+1]=1;q[t++]=i+1}if(x>0&&!bE[i-1]&&!seen[i-1]){seen[i-1]=1;q[t++]=i-1}
      if(z<n-1&&!bS[i]&&!seen[i+n]){seen[i+n]=1;q[t++]=i+n}if(z>0&&!bS[i-n]&&!seen[i-n]){seen[i-n]=1;q[t++]=i-n}}return false}}
function pz2Gen(st){if(PZCACHE[st.seed])return PZCACHE[st.seed];const cf=PZCFG[st.c]||{n:7,W:8,K:4,fr:.08},n=cf.n;let seed=st.seed*7+11+31*((PZHINT[st.c]|0));
  const t0=performance.now();let best=null;
  for(let tries=0;tries<2000&&performance.now()-t0<2500;tries++,seed+=31){const R=mulberry(seed);
    const E=[...Array(n)].map(()=>Array(n).fill(1)),S=[...Array(n)].map(()=>Array(n).fill(1)),vis=[...Array(n)].map(()=>Array(n).fill(0));
    const stack=[[Math.floor(R()*n),Math.floor(R()*n)]];vis[stack[0][0]][stack[0][1]]=1;
    while(stack.length){const[x,z]=stack[stack.length-1];const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>[x+a,z+b,a,b]).filter(([a,b])=>a>=0&&b>=0&&a<n&&b<n&&!vis[a][b]);
      if(!nb.length){stack.pop();continue}const[a,b,dx,dz]=nb[Math.floor(R()*nb.length)];if(dx===1)E[x][z]=0;if(dx===-1)E[a][b]=0;if(dz===1)S[x][z]=0;if(dz===-1)S[a][b]=0;vis[a][b]=1;stack.push([a,b])}
    // 길을 여러 갈래로: 벽을 꽤 많이 뚫어요
    for(let i=0;i<Math.round(n*1.6);i++){if(R()<.5){E[Math.floor(R()*(n-1))][Math.floor(R()*n)]=0}else{S[Math.floor(R()*n)][Math.floor(R()*(n-1))]=0}}
    const sx=Math.floor(n/2),P={n,E,S,mv:[],walls:[],s:[sx,n-1],e:[sx,0]},occ=new Set(),K=(t,x,z)=>t+x+','+z;
    const free=(t,x,z)=>x>=0&&z>=0&&(t==='E'?x<n-1&&z<n:x<n&&z<n-1)&&!(t==='E'?E[x][z]:S[x][z])&&!occ.has(K(t,x,z));
    const alts=(t,x,z)=>(t==='E'?[[x,z-1],[x,z+1]]:[[x-1,z],[x+1,z]]).filter(([a,b])=>free(t,a,b));
    const put=(t,x,z)=>{const al=alts(t,x,z);if(!al.length)return false;const[a,b]=al[Math.floor(R()*al.length)];P.walls.push({t,p:[[x,z],[a,b]],at:0});occ.add(K(t,x,z));occ.add(K(t,a,b));return true};
    // 지금 열린 길 위에 분홍 벽을 하나씩 놓아 모든 길을 막고, 남은 수는 길 근처 아무 데나
    for(let g=0;g<40&&P.walls.length<cf.W;g++){const path=pzPath(P);if(!path)break;const pe=[];for(let i=0;i+1<path.length;i++){const[a,b]=path[i],[c,d]=path[i+1];pe.push(c!==a?['E',Math.min(a,c),b]:['S',a,Math.min(b,d)])}
      let ok=false;for(const[t,x,z]of shuffleR(pe,R)){if(occ.has(K(t,x,z)))continue;if(put(t,x,z)){ok=true;break}}if(!ok)break}
    if(pzPath(P))continue;
    for(let g=0;g<200&&P.walls.length<cf.W;g++){const t=R()<.5?'E':'S',x=Math.floor(R()*n),z=Math.floor(R()*n);if(free(t,x,z))put(t,x,z)}
    if(P.walls.length<cf.W)continue;
    // 모든 조합 따져 보기 (빠른 길 찾기)
    const W=P.walls.length,fast=pzFastMaker(P);let minK=99,minCnt=0,cnt=0;for(let m=1;m<(1<<W);m++){let pc=0;for(let i=0;i<W;i++)pc+=(m>>i)&1;if(pc>cf.K+1&&pc>minK)continue;if(fast(m)){cnt++;if(pc<minK){minK=pc;minCnt=1}else if(pc===minK)minCnt++}}
    let all=0;for(let m=1;m<(1<<W);m++){let pc=0;for(let i=0;i<W;i++)pc+=(m>>i)&1;if(pc<=cf.K+1)all++}
    for(const w of P.walls)w.at=0;if(minK===99)continue;const fr=cnt/all;
    // 헷갈리는 벽이 실제로 길을 막을 수 있어야 해요(아무 상관 없는 벽만 있으면 답 벽 K개만 찾으면 끝): 2장은 빼고
    let cntAll=0;if(minK<99)for(let m=1;m<(1<<W);m++)if(fast(m))cntAll++;const trap=minK<99&&cntAll<(1<<(W-minK))*.75,needTrap=st.c>2;
    const sc=(minK===cf.K?0:minK>cf.K?2:9)+(minCnt>2?3:0)+(fr>cf.fr?4:0)+(needTrap&&!trap?3:0)+fr;
    if(!best||sc<best.sc)best={sc,P,k:minK,tries};if(minK===cf.K&&minCnt<=2&&fr<=cf.fr&&(trap||!needTrap))break}
  if(!best)return null;best.P.k=best.k;best.P.tries=best.tries;PZCACHE[st.seed]=best.P;return best.P}
{const g0=pzGen;pzGen=function(st){const P=pz2Gen(st);return P||g0(st)}}
{const sd=stDef;stDef=function(c,s){const st=sd(c,s);if(st.type==='puzzle'){const P=pz2Gen(st);if(P){st.n2=P.n;st.k=P.k;st.fastP=30+st.k*15}}return st}}

// ----- (3) 버티기 다시 만들기: 하트 3개 + 몬스터 떼 -----
// 예전: 출구만 잠긴 보통 판이라 긴장감이 없었어요.
// 이제: 체력 대신 하트 3개(어떤 공격이든 한 번 맞으면 하트 하나, 세 번이면 실패, 회복 없음),
//  8초마다 몬스터 떼가 도둑 둘레 4~8칸 떨어진 곳에서 몰려와요(갈수록 많이: 2 → 3 → 4 … 최대 5마리씩, 한꺼번에 최대 8+장/2).
//  몬스터 종류는 그 장 마녀 덱의 몬스터(없으면 해골·박쥐). 시간은 40~65초.
const SVH=34;
{const sd=stDef;stDef=function(c,s){const st=sd(c,s);if(st.type==='surv')st.secs=40+Math.round(25*st.d);return st}}
{const g=stGoals3;stGoals3=function(st){if(st.type==='surv')return[`${st.secs}초 버티기`,'하트 2개 넘게 남기기','한 대도 안 맞기'];return g(st)}}
const svOn=()=>{const st=G.stage;return!!(st&&st.story&&st.type==='surv'&&G.mode==='hero'&&!G.duo)};
{const hu=hurt;hurt=function(src,amount,why){if(!svOn()||!(amount>0))return hu.apply(this,arguments);const h=G.hero;const a=Math.max(1,h.hp-Math.max(0,100-SVH*((G.svHits|0)+1)));
  const r=hu.call(this,src,a,why);if(r)G.svHits=(G.svHits|0)+1;return r}}
function svCell(){const h=G.hero,[hx,hz]=cellOf(h.x,h.z),D=new Int16Array(N*N).fill(-1),q=[idx(hx,hz)];D[q[0]]=0;
  for(let i=0;i<q.length;i++){const c=q[i],x=c%N,z=(c/N)|0;for(const[dx,dz]of DIRS){const nx=x+dx,nz=z+dz;if(nx<0||nz<0||nx>=N||nz>=N||!MASK[idx(nx,nz)]||D[idx(nx,nz)]>=0||!canStep(x,z,dx,dz))continue;D[idx(nx,nz)]=D[c]+1;q.push(idx(nx,nz))}}
  const L=[];for(let i=0;i<N*N;i++)if(D[i]>=4&&D[i]<=8)L.push(i);if(!L.length)for(let i=0;i<N*N;i++)if(D[i]>=3)L.push(i);if(!L.length)return null;const c=L[(Math.random()*L.length)|0];return[cx2x(c%N),cx2x((c/N)|0)]}
function svTick(dt){const st=G.stage,h=G.hero;h.hp=Math.max(0,Math.min(h.hp,100-SVH*(G.svHits|0)));if(G.svHits>=3)return;
  G.svT=(G.svT==null?3:G.svT)-dt;if(G.svT>0)return;G.svT=8;G.svW=(G.svW|0)+1;
  const kinds=st.deck.filter(k=>k==='skel'||MONP[k]);const pool=kinds.length?kinds:['skel','bat'];const cap=8+Math.floor(st.c/2);let alive=monCount();
  const n=Math.min(5,1+G.svW);let made=0;for(let i=0;i<n&&alive<cap;i++){const p=svCell();if(!p)break;try{spawnMon(pool[(Math.random()*pool.length)|0],p[0]+(Math.random()-.5)*2,p[1]+(Math.random()-.5)*2);made++;alive++}catch(e){}}
  if(made)say(G.svW===1?'몬스터 떼가 몰려와요! 하트를 지켜요':`몬스터 ${made}마리가 더 왔어요!`,false,1.2)}
{const t0=storyTick;storyTick=function(dt){t0.apply(this,arguments);if(svOn()&&!G.over)svTick(dt)}}
{const ss=startStory;startStory=function(){G.svHits=0;G.svT=null;G.svW=0;return ss.apply(this,arguments)}}
// 하트 표시: 왼쪽 위 진행 칸(사탕 모으기에 쓰던 자리)에 하트 3개
const SV_HEART=f=>`<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 21 C5 15 2 12 2 8 A5 5 0 0 1 12 6 A5 5 0 0 1 22 8 C22 12 19 15 12 21Z" fill="${f?'#ff5a7e':'#e8d6c4'}" stroke="#4a2a1a" stroke-width="2"/></svg>`;
{const gs=stGoalSync;stGoalSync=function(){const r=gs.apply(this,arguments);const el=$('stgGoal');if(!el)return r;if(svOn()&&screen==='play'&&!G.over){el.hidden=false;const k=Math.max(0,3-(G.svHits|0));el.innerHTML=[0,1,2].map(i=>SV_HEART(i<k)).join('')}return r}}

// ----- (4) 메인 도둑 화면: 좁은 화면(640)에서 가운데 위 나침반·시간 칸(#tc)이 '1인칭 | 3인칭' 칸과 겹쳤어요 → 겹치면 왼쪽 위 칸(#tl)과 시점 칸 사이 가운데로 -----
function tcPlace(){const t=document.querySelector('#hud .tc')||document.querySelector('.tc'),v=$('bView'),l=document.querySelector('.tl');if(!t)return;t.style.removeProperty('left');t.style.removeProperty('transform');if(!v||!l||!v.offsetParent||!t.offsetParent)return;
  const a=t.getBoundingClientRect(),b=v.getBoundingClientRect(),c=l.getBoundingClientRect();if(a.right>b.left-6&&a.left<b.right&&a.top<b.bottom&&a.bottom>b.top){const cx=(c.right+b.left)/2;t.style.setProperty('left',cx+'px','important');t.style.setProperty('transform','translateX(-50%)','important')}}
setInterval(()=>{try{tcPlace()}catch(e){}},300);addEventListener('resize',()=>{try{tcPlace()}catch(e){}});

// ----- (5) 관문 바닥 표시가 안 보이던 것: 얼음·바다처럼 바닥 타일이 도톰한 맵에선 높이 0.09 판이 타일 속에 묻혔어요 → 모든 관문 바닥 표시를 0.22 올려요 -----
gRect=function(x0,z0,x1,z1,col,op,y){const m=new THREE.Mesh(new THREE.PlaneGeometry(Math.max(.1,x1-x0),Math.max(.1,z1-z0)),gMat(col,op));m.rotation.x=-Math.PI/2;m.position.set((x0+x1)/2,(y||.09)+.22,(z0+z1)/2);m.renderOrder=3;return bAdd(m)};
gCirc=function(x,z,r,col,op,y){const m=new THREE.Mesh(new THREE.CircleGeometry(r,40),gMat(col,op));m.rotation.x=-Math.PI/2;m.position.set(x,(y||.1)+.22,z);m.renderOrder=3;return bAdd(m)};

// ----- (6) 거대 마녀 '창 울타리': 창과 창 사이로 도둑이 빠져나갈 수 있었어요 → 이웃한 창 사이를 사탕 막대 가로대로 잇고, 가로대도 막아요 -----
// 같은 울타리(아이디 앞부분이 같은 기둥)에서 차례로 꽂힌 이웃 창(2.6m 안) 사이가 막혀요. 대시로 부딪히면 가까운 창 하나가 깨져 그 옆 칸이 열려요(길은 늘 남게).
function mgFencePairs(){const by={},out=[];for(const p of MG.posts){if(p.dead)continue;const g=p.id.split(':')[0];if(!/^fe/.test(g))continue;(by[g]||(by[g]=[])).push(p)}
  for(const g in by){const L=by[g];for(let i=0;i+1<L.length;i++){const a=L[i],b=L[i+1];if(Math.hypot(a.x-b.x,a.z-b.z)<=2.6)out.push([a,b])}}return out}
function mgRailMesh(a,b){const g=new THREE.Group(),L=Math.hypot(b.x-a.x,b.z-a.z);for(const[y,c]of[[1.0,'#ff7eb6'],[2.0,'#fff8ee']]){const m=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,L,8),new THREE.MeshLambertMaterial({color:c}));m.rotation.z=Math.PI/2;m.position.y=y;g.add(m)}
  g.position.set((a.x+b.x)/2,0,(a.z+b.z)/2);g.rotation.y=-Math.atan2(b.z-a.z,b.x-a.x);return g}
function mgRailSync(){MG.rails=MG.rails||{};const want={};for(const[a,b]of mgFencePairs()){const k=a.id+'|'+b.id;want[k]=1;if(!MG.rails[k]&&MG.g){const m=mgRailMesh(a,b);MG.g.add(m);MG.rails[k]=m}}
  for(const k in MG.rails)if(!want[k]){try{mgDrop(MG.rails[k])}catch(e){try{MG.g.remove(MG.rails[k])}catch(_){}}delete MG.rails[k]}}
{const pc=mgPostCollide;mgPostCollide=function(o,dash,isTh){pc.apply(this,arguments);const R=.35+MGP.thR;
  for(const[a,b]of mgFencePairs()){if(a.dead||b.dead)continue;const ex=b.x-a.x,ez=b.z-a.z,L2=ex*ex+ez*ez||1;let t=((o.x-a.x)*ex+(o.z-a.z)*ez)/L2;t=Math.max(0,Math.min(1,t));
    const cx=a.x+ex*t,cz=a.z+ez*t,dx=o.x-cx,dz=o.z-cz,d=Math.hypot(dx,dz);if(d>=R)continue;
    if(dash&&isTh){mgPostBreak(t<.5?a:b,true);mgMsg(MG.role==='thief'?'쾅! 깨고 나왔어요':'도둑이 기둥을 깼어요!',1);continue}
    let nx,nz;if(d>.01){nx=dx/d;nz=dz/d}else{nx=-ez/Math.sqrt(L2);nz=ex/Math.sqrt(L2)}o.x=cx+nx*R;o.z=cz+nz*R}}}
{const st=mgSkTick;mgSkTick=function(){const r=st.apply(this,arguments);try{mgRailSync()}catch(e){}return r}}
{const cl=mgClean;mgClean=function(){try{for(const k in MG.rails||{})try{MG.g.remove(MG.rails[k])}catch(e){}}catch(e){}MG.rails={};return cl.apply(this,arguments)}}
