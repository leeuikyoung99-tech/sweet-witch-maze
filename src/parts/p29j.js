/* ================= 29차 (자): 맵 사진 · 맵은 첫 판에만 고르기 · 새 판 미니맵 바로 비우기 ================= */
// 맵 고르기: 색 칸 대신 그 맵 사진. 한 번의 3판 대결에서는 첫 판에 고른 맵을 계속 써요
{const mp0=mapPick;mapPick=function(go,who){const S=curSer();
  if(S&&S.on&&S.map&&THEMES[S.map]){clearInterval(mapPick.h);$('mapM').hidden=true;MAPPICK=S.map;try{loadMapMusic(S.map)}catch(e){}if(NET.on)netSend({t:'map',k:S.map});go();return}
  mp0(()=>{if(S&&S.on&&MAPPICK)S.map=MAPPICK;go()},who);
  for(const b of $('mapM').querySelectorAll('.map-b')){const im=MAPIMG[b.dataset.k],i=b.querySelector('i');if(im&&i){i.className='pic';i.style.backgroundImage=`url(${im})`}}
  const kk=$('mapM').querySelector('.kicker');if(kk&&S&&S.on)kk.insertAdjacentHTML('beforeend',' · 3판 모두 이 맵에서 해요')}}
// 온라인: 상대(마녀)가 고른 맵을 기억해 두면, 다음 판에 내가 마녀가 돼도 같은 맵이에요
{const nm10=netMsg;netMsg=function(d){if(d&&d.t==='map'&&THEMES[d.k]&&NET.ser&&NET.ser.on)NET.ser.map=d.k;return nm10(d)}}
// 상점: 맵도 사진으로
{const ii0=itemIcon;itemIcon=function(cat,id){if(cat==='theme'&&MAPIMG[id])return`<img class="th-pic" src="${MAPIMG[id]}" alt="">`;return ii0(cat,id)}}
// 새 판이 시작되면 미니맵·시간을 바로 새 판 것으로 (카운트다운 동안 이전 판 미니맵이 남지 않게)
function hudFresh(){try{if(G&&G.hero&&!G.over){updHUD()}else{const cv=$('map');if(cv){const g=cv.getContext('2d');g.fillStyle='#fff8ee';g.fillRect(0,0,cv.width,cv.height)}}}catch(e){}}
{const bm5=beginMatch;beginMatch=function(m,k){const cv=$('map');if(cv){const g=cv.getContext('2d');g.fillStyle='#fff8ee';g.fillRect(0,0,cv.width,cv.height)}const r=bm5(m,k);hudFresh();setTimeout(hudFresh,0);return r}}
