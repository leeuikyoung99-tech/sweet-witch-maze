/* ================= 30차 (마): 망토 중엔 몬스터가 못 때려요 · 도둑 길은 절대 안 막혀요 ================= */
// 망토(투명)인 동안엔 이미 날아오던 몬스터 공격도 빗나가요 (유령은 원래대로 투명해도 알아봐요)
{const hu0=hurt;hurt=function(src,amount,why){const h=G.hero;if(h&&src&&typeof src==='object'&&src.type&&isMon(src)&&src.type!=='ghost'&&!heroVisible(h))return false;return hu0(src,amount,why)}}
// 도둑 길 지킴이: 벽이 바뀌거나 도둑이 다른 칸으로 가면, 도둑 칸·출발 칸에서 출구까지 길이 있는지 다시 봐요.
// 길이 없으면 방금 바뀐 벽부터 되돌리거나 치워서 반드시 길을 열어요.
function pathOpen(){const h=G.hero;if(!h)return true;const f=exitField();if(f[idx(...START)]<0)return false;const[hx,hz]=cellOf(h.x,h.z);if(inM(hx,hz)&&f[idx(hx,hz)]<0)return false;
  if(G.duo&&G.rv&&G.rv.hero){const[rx,rz]=cellOf(G.rv.hero.x,G.rv.hero.z);if(inM(rx,rz)&&f[idx(rx,rz)]<0)return false}return true}
function wallsChanged(){rebuildEdges();FIELD.clear();try{syncWallMeshes()}catch(e){}try{syncPosts()}catch(e){}}
function openPath(){if(pathOpen())return 0;let fixed=0;const h=G.hero;
  const recent=B.walls.slice().sort((a,b)=>((b.temp?1e6:0)+(b.lockUntil||0)+(b.anim?1e3:0))-((a.temp?1e6:0)+(a.lockUntil||0)+(a.anim?1e3:0)));
  for(let guard=0;guard<12&&!pathOpen();guard++){let done=false;
    for(const w of recent){if(!B.walls.includes(w))continue;
      // 옮긴 벽은 옛 자리로 되돌려 보기
      if(w.prev&&!w.temp){const cur={x:w.x,z:w.z};w.x=w.prev.x;w.z=w.prev.z;rebuildEdges();if(pathOpen()&&!overlaps(w.o,w.x,w.z,w)){w.prev=null;w.anim={t:0,from:{o:w.o,x:cur.x,z:cur.z}};wallsChanged();fixed++;done=true;break}w.x=cur.x;w.z=cur.z;rebuildEdges()}
      // 치워 보기
      w.gone=true;rebuildEdges();const ok=pathOpen();w.gone=false;rebuildEdges();if(ok){B.walls.splice(B.walls.indexOf(w),1);wallsChanged();fixed++;done=true;break}}
    if(!done){// 하나로 안 되면 도둑에서 가장 가까운 벽부터 하나씩 치워요
      const near=B.walls.slice().sort((a,b)=>Math.hypot(a.x*C-h.x,a.z*C-h.z)-Math.hypot(b.x*C-h.x,b.z*C-h.z))[0];if(!near)break;B.walls.splice(B.walls.indexOf(near),1);wallsChanged();fixed++}}
  if(fixed){try{say('길이 막혀서 쿠키 벽을 치웠어요',false,1.4)}catch(e){}}return fixed}
{let lastKey='';const ue7=updEnts;updEnts=function(dt){ue7(dt);if(G.mirror||G.over||!G.hero)return;const h=G.hero;const k=B.ver+':'+cellOf(h.x,h.z).join(',');if(k===lastKey)return;lastKey=k;openPath()}}
// 디자인(미로 만들기)이 끝날 때도 한 번
{const fd0=finishDesign;finishDesign=function(){const r=fd0.apply(this,arguments);try{if(G.hero&&!G.mirror)openPath()}catch(e){}return r}}
