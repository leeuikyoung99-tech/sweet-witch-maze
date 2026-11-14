/* ================= 87차: 거대 마녀 도둑 지도 안개 · 일시정지 '다시 하기' · 미니 시간 칸 자리 ================= */
// ----- (1) 거대 마녀: 도둑 미니맵은 보이는 곳·가 본 곳만 -----
// 예전엔 미로 전체 벽이 다 보여서 하늘 보기·벽 투시·길 안내 스킬이 쓸모없었어요.
// 이제 도둑 둘레 2칸(벽을 돌아서) + 곧게 뚫린 복도 끝까지만 밝혀지고, 한 번 본 곳은 지도에 남아요.
// 벽 투시 중엔 4칸, 하늘 보기 중엔 둘레 4.5칸을 한꺼번에 밝혀요. 사탕·출구·마녀(거인이라 벽 너머로도 보여요)는 그대로 보여요.
function mgSeeTick(){const th=MG.th;if(!th)return;if(MG.seenFor!==th){MG.seen=new Uint8Array(N*N);MG.seenFor=th}const S=MG.seen;
  const[cx,cz]=cellOf(th.x,th.z);if(cx<0||cz<0||cx>=N||cz>=N)return;const D=th.xrayT>0?4:2,d=new Int8Array(N*N).fill(-1),q=[idx(cx,cz)];d[q[0]]=0;S[q[0]]=1;
  while(q.length){const i=q.shift(),x=i%N,z=(i/N)|0,k=d[i];if(k>=D)continue;for(const[dx,dz]of DIRS){const nx=x+dx,nz=z+dz;if(nx<0||nz<0||nx>=N||nz>=N||!canStep(x,z,dx,dz))continue;const j=idx(nx,nz);if(d[j]>=0)continue;d[j]=k+1;S[j]=1;q.push(j)}}
  for(const[dx,dz]of DIRS){let x=cx,z=cz;for(let i=0;i<N;i++){if(!canStep(x,z,dx,dz))break;x+=dx;z+=dz;if(x<0||z<0||x>=N||z>=N)break;S[idx(x,z)]=1}}
  if(th.scopeT>0)for(let z=0;z<N;z++)for(let x=0;x<N;x++)if(Math.hypot(x-cx,z-cz)<=4.5)S[idx(x,z)]=1}
{const dm=mgDrawMap;mgDrawMap=function(){if(!MG.on||MG.role!=='thief'||!MG.th)return dm.apply(this,arguments);mgSeeTick();const S=MG.seen;
  const cv=$('mgMap');if(!cv)return;const x=cv.getContext('2d'),Z=cv.width,W=MGW(),k=Z/W,ck=C*k;x.clearRect(0,0,Z,Z);
  for(let i=0;i<N*N;i++){x.fillStyle=!MASK[i]?'#e9d6bd':S[i]?'#fff8ee':'#b9a58e';x.fillRect((i%N)*ck,((i/N)|0)*ck,ck+.5,ck+.5)}
  // 안 본 칸에 옅은 구름 무늬
  x.fillStyle='#cdbba5';for(let i=0;i<N*N;i++)if(MASK[i]&&!S[i]){const px=(i%N+.5)*ck,pz=(((i/N)|0)+.5)*ck;x.beginPath();x.arc(px-ck*.14,pz+ck*.05,ck*.17,0,7);x.arc(px+ck*.14,pz+ck*.05,ck*.17,0,7);x.arc(px,pz-ck*.1,ck*.2,0,7);x.fill()}
  const seen=(a,b)=>a>=0&&b>=0&&a<N&&b<N&&S[idx(a,b)];
  x.strokeStyle='#4a2a1a';x.lineWidth=Math.max(2,Z/70);x.lineCap='round';x.beginPath();
  for(const w of B.walls){if(w.gone)continue;if(!(seen(w.x-1,w.z-1)||seen(w.x,w.z-1)||seen(w.x-1,w.z)||seen(w.x,w.z)))continue;
    if(w.o==='H'){x.moveTo((w.x-1)*ck,w.z*ck);x.lineTo((w.x+1)*ck,w.z*ck)}else{x.moveTo(w.x*ck,(w.z-1)*ck);x.lineTo(w.x*ck,(w.z+1)*ck)}}x.stroke();
  const dot=(px,pz,r,f,s)=>{x.beginPath();x.arc(px*k,pz*k,r,0,7);x.fillStyle=f;x.fill();if(s){x.lineWidth=2;x.strokeStyle=s;x.stroke()}};
  for(const it of MG.items)if(it.type==='fake')dot(it.x,it.z,Z/26,'#ffd23a','#4a2a1a');
  if(MG.cand)dot(MG.cand.x,MG.cand.z,Z/26,'#ffd23a','#4a2a1a');
  if(MG.exitOpen){x.fillStyle='#7ee8c8';x.fillRect(EXIT[0]*ck,EXIT[1]===0?0:Z-ck*.5,ck,ck*.5)}
  const th=MG.th,mo=MG.mo;if(!(mo.ghostT>0))dot(mo.x,mo.z,Z/17,'#8a4dff','#4a2a1a');
  dot(th.x,th.z,Z/30,'#3fbf9f','#ffffff');const fx=-Math.sin(th.yaw),fz=-Math.cos(th.yaw),r=Z/30;x.beginPath();x.moveTo(th.x*k+fx*r*1.9,th.z*k+fz*r*1.9);x.lineTo(th.x*k-fz*r*.9,th.z*k+fx*r*.9);x.lineTo(th.x*k+fz*r*.9,th.z*k-fx*r*.9);x.closePath();x.fillStyle='#2f6b55';x.fill()}}

// ----- (2) 일시정지에 '다시 하기' (AI 판만: 스토리 · 혼자 하기 · 친구 미로 도전 · 거대 마녀 혼자) -----
{const r=document.querySelector('#pause .row'),b=document.createElement('button');b.className='sbtn';b.id='bRestart';b.textContent='다시 하기';r.insertBefore(b,$('bResume'));
  b.onclick=()=>{SFX.click();if(NET.on)return;const st=G.stage;G.over=true;show(null);
    if(st&&st.story){startStage(st.n);return}if(G.chal){startChal(G.chal.raw);return}if(G.mode==='devil')startDesign();else beginMatch('hero')}}
function mgRestartAdd(){const row=document.querySelector('#mgPauseM .mg-prow');if(!row||$('mgRestart'))return;const b=document.createElement('button');b.className='mg-big';b.id='mgRestart';b.setAttribute('aria-label','다시 하기');b.innerHTML=MGI.again;row.insertBefore(b,$('mgResume'));
  b.onclick=()=>{SFX.click();if(NET.on)return;MG.pause=false;$('mgPauseM').hidden=true;mgAgain()}}
setInterval(()=>{try{mgRestartAdd();const on=!!NET.on,tu=typeof TU!=='undefined'&&TU.on;const a=$('bRestart');if(a)a.hidden=on||tu;const b=$('mgRestart');if(b)b.hidden=on}catch(e){}},300);

// ----- (3) 거대 마녀 위 가운데 시간 칸이 좁은 화면(640)에서 '1인칭 | 3인칭' 칸과 겹쳤어요 → 겹치면 하트 칸과 시점 칸 사이 가운데로 -----
function mgTimePlace(){const m=document.querySelector('#mgHud .mg-mid');if(!m||!MG.on)return;m.style.left='';m.style.transform='';
  const v=$('mgViewB'),hp=$('mgHp');if(!v||!hp)return;const a=m.getBoundingClientRect(),b=v.getBoundingClientRect(),h=hp.getBoundingClientRect();
  if(a.right>b.left-8&&a.left<b.right){const cx=(h.right+b.left)/2,top=m.offsetParent?m.offsetParent.getBoundingClientRect().left:0;m.style.left=(cx-top)+'px'}}
setInterval(()=>{try{mgTimePlace()}catch(e){}},300);addEventListener('resize',()=>{try{mgTimePlace()}catch(e){}});
