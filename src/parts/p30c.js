/* ================= 30차 (다): 상점 — 기본 비니 · 신발 칸 · 새 그림 · 스킬·카드 사탕 순 ================= */
{const it=SHOP.hat.items,o={none:it.none,beanie:['도둑 비니',0]};for(const k in it)if(!o[k])o[k]=it[k];SHOP.hat.items=o}
SHOP.shoe={t:'신발',items:{basic:['기본 신발',0],macaron:['마카롱 운동화',250],choco:['초코 장화',250],jelly:['젤리 샌들',250],cookie:['쿠키 슬리퍼',250],candy:['사탕 구두',250],cotton:['솜사탕 털신',250]}};
DEF_EQ.hat='beanie';DEF_EQ.shoe='basic';
SAVE.own['hat:beanie']=1;SAVE.own['shoe:basic']=1;
if(!SAVE.eq.shoe||!SHOP.shoe.items[SAVE.eq.shoe])SAVE.eq.shoe='basic';
if(!SAVE.ck30){SAVE.ck30=1;if(!SAVE.eq.hat||SAVE.eq.hat==='none')SAVE.eq.hat='beanie'}
try{saveGame()}catch(e){}
SHOPTAB.thief=['hat','eye','cloth','back','shoe'];
// 상점 그림: 비니 · 신발 · 줄무늬 옷
{const ii=itemIcon;itemIcon=function(cat,id){const s=b=>'<svg viewBox="0 0 48 48" aria-hidden="true">'+b+'</svg>',K='stroke="#4a2a1a" stroke-width="2.5" stroke-linejoin="round"';
  if(cat==='hat'&&id==='beanie')return s(`<path d="M8 32 Q8 10 24 10 Q40 10 40 32z" fill="#2fae74" ${K}/><path d="M14 14 V31 M20 11 V31 M28 11 V31 M34 14 V31" stroke="#26935f" stroke-width="2"/><rect x="6" y="29" width="36" height="9" rx="4.5" fill="#26935f" ${K}/><circle cx="24" cy="9" r="3.5" fill="#26935f" ${K}/>`);
  if(cat==='cloth'&&CKCL[id]){const C=CKCL[id];return s(`<defs><clipPath id="cl${id}"><path d="M14 9 L8 13 L4 22 L10 25 L13 20 V41 H35 V20 L38 25 L44 22 L40 13 L34 9 Q24 15 14 9z"/></clipPath></defs><g clip-path="url(#cl${id})"><rect x="0" y="0" width="48" height="48" fill="${C.w}"/>${[0,1,2,3,4,5].map(i=>`<rect x="0" y="${8+i*6}" width="48" height="3.4" fill="${C.m}"/>`).join('')}</g><path d="M14 9 L8 13 L4 22 L10 25 L13 20 V41 H35 V20 L38 25 L44 22 L40 13 L34 9 Q24 15 14 9z" fill="none" ${K}/>`)}
  if(cat==='shoe'){const sh=(c,extra,sole)=>s(`<path d="M8 34 Q8 22 18 22 V14 H28 V24 Q40 25 42 33 Q42 38 36 38 H12 Q8 38 8 34z" fill="${c}" ${K}/><rect x="7" y="36" width="36" height="5" rx="2.5" fill="${sole||'#4a2a1a'}" ${K}/>${extra||''}`);
    if(id==='macaron')return sh('#ffb3d6','<path d="M20 27 l5 -3 M22 31 l5 -3" stroke="#7ee8c8" stroke-width="2.5" stroke-linecap="round"/>','#ffffff');
    if(id==='choco')return s(`<path d="M12 36 V10 H26 V26 Q40 27 40 34 Q40 38 35 38 H14 Q12 38 12 36z" fill="#5a3220" ${K}/><path d="M12 12 Q15 17 17 12 Q19 17 21 12 Q23 17 26 12 V9 H12z" fill="#fff3e6" ${K}/><rect x="11" y="36" width="31" height="5" rx="2.5" fill="#3a1d10" ${K}/>`);
    if(id==='jelly')return s(`<rect x="7" y="34" width="36" height="6" rx="3" fill="#7ee8c8" ${K}/><path d="M12 34 Q18 20 24 34 M22 34 Q30 20 38 34" fill="none" stroke="#ff7eb6" stroke-width="4" stroke-linecap="round"/>`);
    if(id==='cookie')return s(`<ellipse cx="25" cy="31" rx="17" ry="9" fill="#d99a55" ${K}/><ellipse cx="18" cy="24" rx="9" ry="3.5" fill="#fff3e6" ${K}/><circle cx="26" cy="30" r="1.8" fill="#4a2a1a"/><circle cx="33" cy="33" r="1.8" fill="#4a2a1a"/><circle cx="20" cy="34" r="1.8" fill="#4a2a1a"/>`);
    if(id==='candy')return sh('#e8364f','<circle cx="30" cy="27" r="2.6" fill="#fff"/><ellipse cx="25" cy="27" rx="4" ry="2.4" fill="#fff"/><ellipse cx="35" cy="27" rx="4" ry="2.4" fill="#ffd35f"/>','#7a1a2a');
    if(id==='cotton')return sh('#c9a6ff','<circle cx="19" cy="15" r="4" fill="#ffd6ea"/><circle cx="24" cy="13" r="4" fill="#a8e0ff"/><circle cx="29" cy="15" r="4" fill="#ffd6ea"/>','#ffffff');
    return sh('#5a3a2a')}
  return ii(cat,id)}}
// 캐릭터 고르기 ◀ ▶ 는 이제 없어요 (직접 만든 쿠키 도둑 하나)
{const pb=typeof placeBodyPick==='function'?placeBodyPick:null;if(pb)placeBodyPick=function(){const el=$('bodyPick');if(el)el.hidden=true}}
// 덱 화면: 스킬·카드를 사탕(소다) 적은 순으로
SKP.sort((a,b)=>(SK[a].cost-SK[b].cost)||SKN[a][0].localeCompare(SKN[b][0]));
CPOOL.sort((a,b)=>(CARDS[a].cost-CARDS[b].cost)||CARDS[a].n.localeCompare(CARDS[b].n));
// 1인칭 손 소매는 지금 옷 무늬로: 판이 시작될 때마다 새로 만들어요
{const bm6=beginMatch;beginMatch=function(m,k){try{if(VM.obj){camera.remove(VM.obj);VM.obj=null;VM.key=''}}catch(e){}return bm6(m,k)}}
