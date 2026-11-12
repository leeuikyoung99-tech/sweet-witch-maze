/* ================= 52차: 과자 마녀 꾸미기 그림 — 스킨마다 특징을 살린 2D 그림 ================= */
const WI=(()=>{const K='stroke="#4a2a1a" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"',k='stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';
const eye=(x,y,r=2.5)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#2a1640"/><circle cx="${x-.8}" cy="${y-.9}" r=".8" fill="#fff"/>`;
const blush=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="2.4" ry="1.5" fill="#ff8ab5" opacity=".75"/>`;
const shine=(x,y,rx=3.5,ry=1.8)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".7" transform="rotate(-25 ${x} ${y})"/>`;
const star=(x,y,r,f,s='#4a2a1a',sw=1.4)=>{let p='';for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;p+=(i?'L':'M')+(x+Math.cos(a)*rr).toFixed(1)+' '+(y+Math.sin(a)*rr).toFixed(1)}return`<path d="${p}Z" fill="${f}" stroke="${s}" stroke-width="${sw}" stroke-linejoin="round"/>`};
const heart=(x,y,s,f,st='#4a2a1a',sw=1.6)=>`<path d="M${x} ${y+s*.9} C${x-s*1.4} ${y} ${x-s} ${y-s*.9} ${x} ${y-s*.35} C${x+s} ${y-s*.9} ${x+s*1.4} ${y} ${x} ${y+s*.9}Z" fill="${f}" stroke="${st}" stroke-width="${sw}" stroke-linejoin="round"/>`;
const pat=(id,kind,bg,fg)=>{let p='';if(kind==='dots')p=`<rect width="8" height="8" fill="${bg}"/><circle cx="2" cy="2" r="1.4" fill="${fg}"/><circle cx="6" cy="6" r="1.4" fill="${fg}"/>`;
  else if(kind==='stripes')p=`<rect width="6" height="6" fill="${bg}"/><rect width="3" height="6" fill="${fg}"/>`;else if(kind==='hstripes')p=`<rect width="6" height="8" fill="${bg}"/><rect width="6" height="4" fill="${fg}"/>`;
  else if(kind==='stars')p=`<rect width="10" height="10" fill="${bg}"/>${star(3,3,2,fg,'none',0)}${star(8,8,1.4,fg,'none',0)}`;else if(kind==='seeds')p=`<rect width="7" height="7" fill="${bg}"/><ellipse cx="2" cy="2" rx=".8" ry="1.2" fill="${fg}"/><ellipse cx="5.5" cy="5.5" rx=".8" ry="1.2" fill="${fg}"/>`;
  else if(kind==='chips')p=`<rect width="8" height="8" fill="${bg}"/><rect x="1" y="1" width="2" height="1.6" rx=".4" fill="${fg}"/><rect x="5" y="5" width="2" height="1.6" rx=".4" fill="${fg}"/>`;
  else if(kind==='check')p=`<rect width="8" height="8" fill="${bg}"/><rect width="4" height="4" fill="${fg}"/><rect x="4" y="4" width="4" height="4" fill="${fg}"/>`;
  else if(kind==='curls')p=`<rect width="8" height="8" fill="${bg}"/><path d="M1 4 q2-3 4 0 q-2 3-4 0" fill="none" stroke="${fg}" stroke-width="1"/>`;
  else if(kind==='clouds')p=`<rect width="12" height="10" fill="${bg}"/><path d="M2 6 a2 2 0 0 1 3-2 a2 2 0 0 1 4 1 a1.5 1.5 0 0 1 0 3 h-6 a1.5 1.5 0 0 1 -1-2z" fill="${fg}"/>`;
  else if(kind==='bubbles')p=`<rect width="9" height="9" fill="${bg}"/><circle cx="3" cy="3" r="1.6" fill="none" stroke="${fg}" stroke-width=".9"/><circle cx="7" cy="7" r="1" fill="${fg}" opacity=".8"/>`;
  else if(kind==='melon')p=`<rect width="6" height="6" fill="${bg}"/><path d="M1.5 0 q1.5 3 0 6" fill="none" stroke="${fg}" stroke-width="1.6"/>`;
  else if(kind==='rainbow')p=`<rect width="6" height="3" y="0" fill="#ffb3c8"/><rect width="6" height="3" y="3" fill="#fff3a8"/><rect width="6" height="3" y="6" fill="#c8f5c0"/><rect width="6" height="3" y="9" fill="#b8e4ff"/><rect width="6" height="3" y="12" fill="#dccbff"/>`;
  const sz={dots:8,stripes:6,hstripes:8,stars:10,seeds:7,chips:8,check:8,curls:8,clouds:12,bubbles:9,melon:6,rainbow:15}[kind]||8;const w=kind==='hstripes'?6:kind==='clouds'?12:kind==='rainbow'?6:sz;
  return`<defs><pattern id="${id}" width="${w}" height="${sz}" patternUnits="userSpaceOnUse">${p}</pattern></defs>`};
const rb=id=>`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb3c8"/><stop offset=".3" stop-color="#fff3a8"/><stop offset=".55" stop-color="#c8f5c0"/><stop offset=".8" stop-color="#b8e4ff"/><stop offset="1" stop-color="#dccbff"/></linearGradient></defs>`;
// ----- 유령 -----
const GB='M11 43 V22 a13 13 0 0 1 26 0 V43 l-4.3-3.6 -4.3 3.6 -4.4-3.6 -4.4 3.6 -4.3-3.6z';
const gface=`${eye(19.5,24)}${eye(28.5,24)}${blush(16.5,29)}${blush(31.5,29)}<ellipse cx="24" cy="31" rx="2.2" ry="2.6" fill="#2a1640"/>`;
const ghost=id=>{const C={cotton:['#fff6fb'],witch:['#fff6fb'],sheep:['url(#gs_sheep)'],star:['url(#gs_star)'],berry:['url(#gs_berry)'],mint:['url(#gs_mint)'],night:['url(#gs_night)']}[id]||['#fff6fb'];let d='',top='';
  if(id==='sheep')d=pat('gs_sheep','curls','#ffffff','#e2d6c0');if(id==='star')d=pat('gs_star','stars','#fff6c8','#ffc93a');if(id==='berry')d=pat('gs_berry','dots','#ffd6e6','#ffffff');if(id==='mint')d=pat('gs_mint','stripes','#c9f5e6','#ffffff');if(id==='night')d=pat('gs_night','stars','#5a5aa8','#ffe48a');
  if(id==='cotton')top=`<circle cx="17" cy="11" r="4.5" fill="#d9c2ff" ${k}/><circle cx="23" cy="8.5" r="4.8" fill="#ffd6ea" ${k}/><circle cx="29" cy="11" r="4.2" fill="#bfe6ff" ${k}/>`;
  if(id==='witch')top=`<path d="M12 14 h24" stroke="#4a2a1a" stroke-width="4.4" stroke-linecap="round"/><path d="M12 14 h24" stroke="#7a45e0" stroke-width="2"/><path d="M17 13 L25 2.5 L31 13z" fill="#7a45e0" ${k}/><path d="M18.5 10.5 h11" stroke="#ffd23a" stroke-width="2"/>`;
  if(id==='sheep')top=`<path d="M11 18 a4 4 0 0 1 4-6 a4 4 0 0 1 6-3 a4 4 0 0 1 6 0 a4 4 0 0 1 6 3 a4 4 0 0 1 4 6" fill="#fff" ${k}/><path d="M10 22 q-4 0 -3 4 q2 2 4 0" fill="#e2d6c0" ${k}/><path d="M38 22 q4 0 3 4 q-2 2 -4 0" fill="#e2d6c0" ${k}/>`;
  if(id==='star')top=star(24,6,6,'#ffd23a');if(id==='berry')top=`<path d="M24 12 c-6 0 -7 -8 0 -9 c7 1 6 9 0 9z" fill="#e8364f" ${k}/><path d="M20 4 l4 2 4-2 -2 3.5 -2-1 -2 1z" fill="#3fbf6f" ${k}/><circle cx="22" cy="7" r=".7" fill="#fff3a8"/><circle cx="26" cy="8" r=".7" fill="#fff3a8"/>`;
  if(id==='mint')top=`<path d="M24 10 l-7-4 v8z M24 10 l7-4 v8z" fill="#2fbf93" ${k}/><circle cx="24" cy="10" r="2.2" fill="#2fbf93" ${k}/>`;
  if(id==='night')top=`<path d="M27 3 a7 7 0 1 0 6 10 a5.5 5.5 0 1 1 -6 -10z" fill="#ffe48a" ${k}/>`;
  return d+`<path d="${GB}" fill="${C[0]}" ${K}/>`+gface+shine(16,17)+top};
// ----- 박쥐 -----
const bat=id=>{const C={grape:['#8a5ccc','#4a2a6a'],pumpkin:['#ff9a3d','#7a3a0a'],santa:['#e8364f','#e8364f'],cotton:['#ffc4de','url(#bw_cotton)'],lemon:['#ffe14d','url(#bw_lemon)'],choco:['#8a5230','url(#bw_choco)'],star:['#3a3a8a','url(#bw_star)']}[id]||['#8a5ccc','#4a2a6a'];let d='',top='',body='';
  if(id==='cotton')d=pat('bw_cotton','stripes','#bfe6ff','#ffd6ea');if(id==='lemon')d=pat('bw_lemon','stripes','#ffe88a','#fff8d0');if(id==='choco')d=pat('bw_choco','dots','#b07a4a','#fff6ee');if(id==='star')d=pat('bw_star','stars','#4a4aa0','#ffe48a');
  const wing=`<path d="M24 26 L3 15 l4.5 10 -3 8 9-4.5 5 6z M24 26 L45 15 l-4.5 10 3 8 -9-4.5 -5 6z" fill="${C[1]}" ${K}/>`;
  if(id==='pumpkin')body=`<path d="M19 21 q-2 7 0 13 M29 21 q2 7 0 13 M24 18.5 v17" fill="none" stroke="#c96a1a" stroke-width="1.6"/>`,top=`<path d="M24 18 q0-4 3-5" fill="none" stroke="#3f8a1a" stroke-width="2.6" stroke-linecap="round"/>`;
  if(id==='santa')top=`<path d="M16 20 q8-12 15-4 l4 -4" fill="#e8364f" ${k}/><path d="M15 21 q9 -4 17 0" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/><circle cx="35.5" cy="12" r="2.6" fill="#fff" ${k}/>`;
  if(id==='lemon')top=`<circle cx="24" cy="14" r="4.4" fill="#fff8d0" ${k}/><path d="M24 10 v8 M20 14 h8 M21 11 l6 6 M27 11 l-6 6" stroke="#ffd23a" stroke-width="1"/>`;
  if(id==='star')top=star(24,13,4.5,'#ffe48a');if(id==='choco')top=`<path d="M18 19 q6 -4 12 0" fill="none" stroke="#fff6ee" stroke-width="2.4" stroke-linecap="round"/>`;
  if(id==='cotton')top=`<circle cx="21" cy="16.5" r="3" fill="#ffd6ea" ${k}/><circle cx="26" cy="15.5" r="3.2" fill="#bfe6ff" ${k}/>`;
  const ears=`<path d="M17.5 21 l-1-6 5 3.5z M30.5 21 l1-6 -5 3.5z" fill="${C[0]}" ${k}/>`;
  return d+wing+ears+`<circle cx="24" cy="27" r="9" fill="${C[0]}" ${K}/>`+body+`<circle cx="20.5" cy="25.5" r="2.2" fill="#fff"/><circle cx="27.5" cy="25.5" r="2.2" fill="#fff"/><circle cx="20.8" cy="25.8" r="1.2" fill="#2a1640"/><circle cx="27.2" cy="25.8" r="1.2" fill="#2a1640"/><path d="M21.5 31 l1.2 2.4 1.2-2.4 M24.2 31 l1.2 2.4 1.2-2.4" fill="#fff" stroke="#fff" stroke-width=".8"/>`+top};
// ----- 젤리 곰 -----
const bear=id=>{const C={peach:['#ff8a5a','#ffd0b8'],swim:['#7cc6ff','#e0f2ff'],chef:['#ff8a5a','#ffd0b8'],berry:['url(#bb_berry)','#ffd0d8'],mintchoco:['url(#bb_mc)','#e0fff4'],honey:['#ffbf3a','#fff0b0'],rainbow:['#fff2f8','url(#bb_rb)']}[id]||['#ff8a5a','#ffd0b8'];let d='',top='',ear=C[0];
  if(id==='berry'){d=pat('bb_berry','seeds','#ff5a6e','#fff3a8');ear='#ff5a6e'}if(id==='mintchoco'){d=pat('bb_mc','chips','#9eecd4','#5a3220');ear='#9eecd4'}if(id==='rainbow')d=rb('bb_rb');
  if(id==='swim')top=`<path d="M10 22 a14 13 0 0 1 28 0z" fill="#ff5f9e" ${k}/><path d="M13 15 q11 -5 22 0" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="18.5" cy="25" r="4" fill="#bfe6ff" ${k}/><circle cx="29.5" cy="25" r="4" fill="#bfe6ff" ${k}/><path d="M22.5 25 h3" ${k}/>`;
  if(id==='chef')top=`<path d="M15 13.5 a5 5 0 0 1 3-8 a6 6 0 0 1 12 0 a5 5 0 0 1 3 8 z" fill="#fff" ${k}/><rect x="15" y="12.5" width="18" height="5" rx="1.5" fill="#fff" ${k}/>`;
  if(id==='berry')top=`<path d="M19 8 l5 3 5-3 -2 4.5 -3-1 -3 1z" fill="#3fbf6f" ${k}/>`;
  if(id==='honey')top=`<path d="M12 15 q12 -8 24 0 v3 q-2 3 -3 0 q-2 4 -4 0 q-3 4 -5 0 q-2 4 -4 0 q-2 3 -4 0 q-2 3 -4 0z" fill="#ffa51f" ${k}/>`;
  if(id==='rainbow')top=`<path d="M24 12 l-7-4 v8z M24 12 l7-4 v8z" fill="#7cc6ff" ${k}/><circle cx="24" cy="12" r="2.2" fill="#7cc6ff" ${k}/>`;
  const eyes=id==='swim'?`<circle cx="18.5" cy="25" r="1.6" fill="#2a1640"/><circle cx="29.5" cy="25" r="1.6" fill="#2a1640"/>`:eye(18.5,24.5)+eye(29.5,24.5);
  return d+`<circle cx="13" cy="13.5" r="6.2" fill="${ear}" ${K}/><circle cx="35" cy="13.5" r="6.2" fill="${ear}" ${K}/><ellipse cx="24" cy="28" rx="16.5" ry="15.5" fill="${C[0]}" ${K}/><ellipse cx="24" cy="33" rx="7.5" ry="5.4" fill="${C[1]}" ${id==='rainbow'?k:''}/><ellipse cx="24" cy="30.6" rx="2.2" ry="1.6" fill="#4a2a1a"/>`+(id==='swim'?'':shine(16,19))+top+eyes+blush(13.5,30)+blush(34.5,30)};
// ----- 쿠키 병정 -----
const soldier=id=>{const S={ginger:{sk:'#d99a55',coat:'#e8364f',hat:'#e8364f',band:'#ffd35f'},snow:{sk:'#ffffff',coat:'#ffffff',hat:'#e8364f',band:'#ffd35f'},nut:{sk:'#c98d5f',coat:'#2f6aa0',hat:'#2a1a12',band:'#ffd35f'},macaron:{sk:'#d99a55',coat:'#ff9ec7',hat:'mac',band:'#ffd35f'},
    mint:{sk:'#d99a55',coat:'#4fc9a8',hat:'#4fc9a8',band:'#ffffff'},knight:{sk:'#d99a55',coat:'#7a4526',hat:'helm',band:'#ffd35f'},drum:{sk:'#d99a55',coat:'#ff5f8a',hat:'#ff5f8a',band:'#ffd35f'}}[id]||{sk:'#d99a55',coat:'#e8364f',hat:'#e8364f',band:'#ffd35f'};
  let h='';const coat=`<path d="M13 44 v-7 q0-7 11-7 q11 0 11 7 v7z" fill="${S.coat}" ${K}/>`+(id==='snow'?`<circle cx="24" cy="36" r="1.3" fill="#2a1640"/><circle cx="24" cy="40.5" r="1.3" fill="#2a1640"/>`:`<path d="M24 31 v13" stroke="${id==='nut'?'#ffd35f':'#fff'}" stroke-width="1.6"/><circle cx="21" cy="36" r="1.1" fill="#ffd35f"/><circle cx="27" cy="36" r="1.1" fill="#ffd35f"/>`);
  const head=`<circle cx="24" cy="23" r="8.5" fill="${S.sk}" ${K}/>`+eye(21,23,2)+eye(27,23,2)+(id==='snow'?`<path d="M24 25 l4.5 1.2 -4.5 1.2z" fill="#ff8a3d" stroke="#4a2a1a" stroke-width="1"/>`:id==='nut'?`<path d="M18 27 q6 5 12 0 v3 q-6 4 -12 0z" fill="#fff" ${k}/><path d="M20 26.5 q4 -2 8 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`:`<path d="M21.5 27 q2.5 2 5 0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`)+blush(19,26.5)+blush(29,26.5);
  if(S.hat==='mac')h=`<g ${k}><rect x="16" y="11" width="16" height="4" rx="2" fill="#ffd6ea"/><rect x="16.6" y="7.2" width="14.8" height="3.8" rx="1.9" fill="#bfe6ff"/><rect x="17.2" y="3.4" width="13.6" height="3.8" rx="1.9" fill="#fff3a8"/></g>`;
  else if(S.hat==='helm')h=`<path d="M15 18 v-5 a9 9 0 0 1 18 0 v5z" fill="#8a5534" ${k}/><path d="M17 17 h14" stroke="#4a2a1a" stroke-width="1.6"/><path d="M24 4 q4 -3 6 1" fill="none" stroke="#e8364f" stroke-width="2.6" stroke-linecap="round"/>`;
  else h=`<path d="M16.5 15 v-8 a7.5 6 0 0 1 15 0 v8z" fill="${S.hat}" ${k}/><rect x="15.5" y="13.5" width="17" height="3" rx="1.5" fill="${S.band}" ${k}/>`+(id==='nut'?'':`<circle cx="24" cy="3.5" r="1.8" fill="${S.band}" ${k}/>`);
  let x='';if(id==='drum')x=`<ellipse cx="34.5" cy="40" rx="6" ry="4.5" fill="#ff5f8a" ${k}/><ellipse cx="34.5" cy="37.6" rx="6" ry="2.2" fill="#fff" ${k}/><path d="M29 33 l5 4 M40 32 l-5 5" ${k}/>`;
  if(id==='knight')x=`<path d="M8 36 l4 -3 4 3 v4 q-4 3 -8 0z" fill="#c9d3e6" ${k}/>`;
  if(id!=='knight'&&id!=='drum')x=`<path d="M38 44 V12" stroke="#fff8ee" stroke-width="3" stroke-linecap="round"/><path d="M38 44 V12" stroke="#4a2a1a" stroke-width="1" opacity=".3"/><path d="M38 6 l3 6 h-6z" fill="#ffd35f" ${k}/>`;
  return coat+head+h+x};
// ----- 젤리 거미 -----
const spider=id=>{const C={mint:['#9eecd4','#2f9c7c'],cloud:['url(#sp_cloud)','#4a8ad8'],jelly:['url(#sp_jelly)','#7a45e0'],berry:['url(#sp_berry)','#7a1020'],bee:['url(#sp_bee)','#3a2a10'],melon:['url(#sp_melon)','#2f7a4a'],star:['url(#sp_star)','#2a2a6a']}[id]||['#9eecd4','#2f9c7c'];let d='',top='',ext='';
  if(id==='cloud')d=pat('sp_cloud','clouds','#8cc4ff','#ffffff');if(id==='jelly')d=pat('sp_jelly','bubbles','#b98cff','#ffffff');if(id==='berry')d=pat('sp_berry','seeds','#ff5a6e','#fff3a8');if(id==='bee')d=pat('sp_bee','hstripes','#ffd84a','#3a2a10');if(id==='melon')d=pat('sp_melon','melon','#7ee8a8','#2f9c5a');if(id==='star')d=pat('sp_star','stars','#4a4a9a','#ffe48a');
  let legs='';for(const s of[-1,1])for(let i=0;i<4;i++){const y=22+i*4.2,x0=24+s*8,x1=24+s*(17+(i===1||i===2?3:0)),x2=24+s*(20+(i===1||i===2?2:0));legs+=`<path d="M${x0} ${y} Q${x1} ${y-6+i*1.5} ${x2} ${y+5}" fill="none" stroke="${C[1]}" stroke-width="2.6" stroke-linecap="round"/>`}
  if(id==='bee')ext=`<ellipse cx="17" cy="14" rx="5" ry="3.2" fill="#e0f6ff" ${k} transform="rotate(-30 17 14)"/><ellipse cx="31" cy="14" rx="5" ry="3.2" fill="#e0f6ff" ${k} transform="rotate(30 31 14)"/>`;
  if(id==='berry')top=`<path d="M19 15 l5 3 5-3 -2 4 -3-1 -3 1z" fill="#3fbf6f" ${k}/>`;
  if(id==='jelly')ext=`<path d="M18 36 q-1 5 1 8 M22 37 q1 4 -1 7 M26 37 q-1 4 1 7 M30 36 q1 5 -1 8" fill="none" stroke="#b98cff" stroke-width="2" stroke-linecap="round"/>`;
  return d+ext+legs+`<ellipse cx="24" cy="27" rx="11" ry="10" fill="${C[0]}" ${K}/>`+eye(20,26)+eye(28,26)+`<circle cx="17" cy="25" r="1.2" fill="#2a1640"/><circle cx="31" cy="25" r="1.2" fill="#2a1640"/>`+blush(18,31)+blush(30,31)+shine(18.5,20.5,3,1.5)+top};
// ----- 사탕 대포 (포신은 입에) -----
const mouthGun=(x,y,c)=>`<path d="M${x-4.6} ${y} v3.4 a4.6 3.4 0 0 0 9.2 0 v-3.4" fill="${c}" ${k}/><ellipse cx="${x}" cy="${y}" rx="4.6" ry="3.4" fill="${c}" ${k}/><ellipse cx="${x}" cy="${y}" rx="2.6" ry="1.8" fill="#2a1640"/>`;
const cannon=id=>{const B={plain:['#f6e3c3','#c98a5a','#f6e3c3'],stripe:['url(#cn_stripe)','#ff7eb6','#fff'],dots:['url(#cn_dots)','#7cc6ff','#fff'],check:['url(#cn_check)','#3fbf6f','#fff'],stars:['url(#cn_stars)','#ffe48a','#3a3a8a'],hearts:['#ffd6ea','#ff4f6d','#fff'],cake:['#fff3dc','#ff9ec7','#fff']}[id]||['#f6e3c3','#c98a5a','#f6e3c3'];let d='',x='';
  if(id==='stripe')d=pat('cn_stripe','stripes','#ffffff','#ff7eb6');if(id==='dots')d=pat('cn_dots','dots','#bfe6ff','#ffffff');if(id==='check')d=pat('cn_check','check','#ffffff','#c8f5c0');if(id==='stars')d=pat('cn_stars','stars','#3a3a8a','#ffe48a');
  const body=id==='cake'?`<rect x="12" y="35" width="24" height="9" rx="2" fill="#fff3dc" ${K}/><rect x="14.5" y="28" width="19" height="8" rx="2" fill="#ffd6ea" ${K}/><path d="M12 37 q3 3 6 0 q3 3 6 0 q3 3 6 0 q3 3 6 0" fill="none" stroke="#ff9ec7" stroke-width="2"/>`
    :`<path d="M14 44 L16 28 h16 l2 16z" fill="${B[0]}" ${K}/><path d="M14.6 37 h18.8" stroke="${B[1]}" stroke-width="2.4"/>`;
  const head=`<circle cx="24" cy="19" r="10.5" fill="${B[2]}" ${K}/>`+eye(20,16.5,2)+eye(28,16.5,2)+blush(16.5,21)+blush(31.5,21)+mouthGun(24,22.5,B[1]);
  if(id==='hearts')x=heart(24,6.5,3.6,'#ff4f6d')+`<path d="M16.5 10 l2-4 3 3 2.5-4 2.5 4 3-3 2 4z" fill="#ffd23a" ${k}/>`;
  if(id==='cake')x=`<rect x="22.6" y="4.5" width="2.8" height="4.5" rx="1" fill="#7cc6ff" ${k}/><path d="M24 .8 q2 1.8 0 3.2 q-2 -1.4 0 -3.2z" fill="#ffa51f" stroke="#4a2a1a" stroke-width=".8"/>`;
  if(id==='dots')x=`<path d="M24 9 l-5.5-3.5 v7z M24 9 l5.5-3.5 v7z" fill="#ff7eb6" ${k}/>`;
  if(id==='check')x=`${[0,1,2,3,4].map(i=>{const a=i*1.2566-1.57;return`<circle cx="${(24+Math.cos(a)*3.4).toFixed(1)}" cy="${(7.5+Math.sin(a)*3.4).toFixed(1)}" r="2" fill="#fff" stroke="#4a2a1a" stroke-width="1.2"/>`}).join('')}<circle cx="24" cy="7.5" r="1.8" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.2"/>`;
  if(id==='stars')x=star(24,7,4.4,'#ffe48a');
  return d+body+head+x};
// ----- 얼음 사탕 포탑 (빙수) -----
const ice=id=>{const I={snow:['#e0f6ff','#a8e8ff','#a8e8ff'],strawberry:['#fff0f6','#ff9ec7','#ff5f8a'],mango:['#fff6dc','#ffc94a','#ffa51f'],matcha:['#f2fff0','#8fcf7a','#5aa04a'],redbean:['#fff6ee','#efe0d8','#7a2a2a'],macaron:['#fff3f8','#ffd6ea','#a8e0ff'],rainbow:['#ffffff','url(#ic_rb)','#7cc6ff']}[id]||['#e0f6ff','#a8e8ff','#a8e8ff'];let d=id==='rainbow'?rb('ic_rb'):'',t='';
  const cup=`<path d="M12 28 h24 l-3 15 h-18z" fill="${I[0]}" ${K}/><path d="M13 32 h22" stroke="${I[2]}" stroke-width="2.4"/>`;
  const dome=`<path d="M11 29 q0-17 13-17 q13 0 13 17z" fill="${I[1]}" ${K}/><path d="M15 22 q2 -5 6 -6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
  if(id==='snow')t=`<path d="M24 3 v13 M18.5 6.2 l11 6.6 M29.5 6.2 l-11 6.6" stroke="#4a2a1a" stroke-width="4.4" stroke-linecap="round"/><path d="M24 3 v13 M18.5 6.2 l11 6.6 M29.5 6.2 l-11 6.6" stroke="#7cc6ff" stroke-width="2.2" stroke-linecap="round"/>`;
  if(id==='strawberry')t=`<path d="M24 16 c-6 0 -6 -8 0 -9 c6 1 6 9 0 9z" fill="#e8364f" ${k}/><path d="M20.5 8 l3.5 1.5 3.5-1.5 -1.5 3 -2-1 -2 1z" fill="#3fbf6f" ${k}/>`;
  if(id==='mango')t=`<g ${k}><rect x="15" y="13" width="6" height="6" rx="1" fill="#ffa51f" transform="rotate(-12 18 16)"/><rect x="22" y="9" width="6" height="6" rx="1" fill="#ffc94a"/><rect x="28" y="13" width="6" height="6" rx="1" fill="#ffa51f" transform="rotate(14 31 16)"/></g>`;
  if(id==='matcha')t=`<path d="M24 16 q-8 -4 -2 -11 q8 4 2 11z" fill="#5aa04a" ${k}/><path d="M24 16 q-1 -5 -2 -9" fill="none" stroke="#c8ecb0" stroke-width="1.2"/>`;
  if(id==='redbean')t=`<path d="M15 19 q9 -10 18 0 q-9 3 -18 0z" fill="#7a2a2a" ${k}/><circle cx="21" cy="16" r="1" fill="#b05050"/><circle cx="27" cy="16" r="1" fill="#b05050"/>`;
  if(id==='macaron')t=`<g ${k}><rect x="16" y="11" width="16" height="4.4" rx="2.2" fill="#a8e0ff"/><rect x="17" y="8.6" width="14" height="2.6" rx="1.3" fill="#fff"/><rect x="16" y="4.6" width="16" height="4.4" rx="2.2" fill="#a8e0ff"/></g>`;
  if(id==='rainbow')t=`<path d="M14 18 a10 10 0 0 1 20 0" fill="none" stroke="#ff9ec7" stroke-width="2.4"/><path d="M17 18 a7 7 0 0 1 14 0" fill="none" stroke="#ffd23a" stroke-width="2.4"/><path d="M20 18 a4 4 0 0 1 8 0" fill="none" stroke="#7cc6ff" stroke-width="2.4"/>`;
  return d+dome+cup+eye(20,23.5,1.8)+eye(28,23.5,1.8)+mouthGun(24,28.5,I[0]==='#ffffff'?'#bfe6ff':I[2])+t};
// ----- 자석 사탕 포탑 (잘리지 않게 아래로) -----
const magnet=id=>{const M={red:['#e8364f','#ff7a8a','#f6e3c3'],stripe:['url(#mg_st)','#ff9eaa','#ffffff'],mint:['#2fbf93','#c9f5e6','#effffa'],choco:['#5a3220','#c89060','#f6e3c3'],heart:['#ff4f6d','#ffd6dc','#fff0f3'],star:['#ffcf3a','#cfeaff','#eaf6ff'],gold:['#e0a020','#ffe48a','#fff3c4']}[id]||['#e8364f','#ff7a8a','#f6e3c3'];let d=id==='stripe'?pat('mg_st','stripes','#ffffff','#e8364f'):'',t='';
  const body=`<rect x="16" y="29" width="16" height="16" rx="3" fill="${M[2]}" ${K}/><path d="M16 34.5 h16 M16 40 h16" stroke="${M[0]==='url(#mg_st)'?'#e8364f':M[0]}" stroke-width="2.6"/>`;
  let mag;const U='M13 26 V18 a11 11 0 0 1 22 0 V26';
  if(id==='heart'){const H='M24 28 C11 21 11 8 20 9.5 q4 1 4 5 q0 -4 4 -5 C37 8 37 21 24 28z';mag=`<path d="${H}" fill="none" stroke="#4a2a1a" stroke-width="9" stroke-linejoin="round"/><path d="${H}" fill="none" stroke="#ff4f6d" stroke-width="5.4" stroke-linejoin="round"/>`}
  else if(id==='choco')mag=`<path d="${U}" fill="none" stroke="#4a2a1a" stroke-width="10"/><path d="${U}" fill="none" stroke="#5a3220" stroke-width="6.6"/><path d="M16 12 l2.6 2.6 M24 7.5 v3.4 M32 12 l-2.6 2.6" stroke="#8a5534" stroke-width="1.6"/>`;
  else mag=`<path d="${U}" fill="none" stroke="#4a2a1a" stroke-width="10"/><path d="${U}" fill="none" stroke="${M[0]}" stroke-width="6.6"/><path d="M13 26 v-4 M35 26 v-4" stroke="#e9eef5" stroke-width="6.6"/>`;
  if(id==='star')t=star(24,12,5,'#ffcf3a');if(id==='gold')t=`<path d="M16 3.5 l1.4 2.4 M32 3.5 l-1.4 2.4 M24 1.5 v3" stroke="#ffd23a" stroke-width="2" stroke-linecap="round"/>`;
  return d+body+mag+`<circle cx="24" cy="28" r="5" fill="${M[1]}" ${k}/>`+eye(22.4,28,1.3)+eye(25.6,28,1.3)+t};
// ----- 막대사탕 회전날: 줄무늬 받침 + 노란 축 + 가로 막대 + 양 끝 사탕이 빙글빙글 -----
const spin=id=>{const C={lolli:['#ff7eb6','#7cc6ff'],rainbow:['rainbow','rainbow'],heart:['#ff4f6d','#ff9ec7'],star:['#ffcf3a','#7cc6ff'],cane:['#e8364f','#e8364f'],cotton:['#ffc4de','#bfe6ff'],pretzel:['#8a4a26','#8a4a26']}[id]||['#ff7eb6','#7cc6ff'];
  const Y=27,L=8.5,R=39.5;let d=pat('spb_'+id,'stripes','#fff6ee','#ff9ec7');if(id==='rainbow')d+=rb('spr_rb');
  const motion=`<path d="M6 17 Q24 7 42 17" fill="none" stroke="#b49a80" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2.5 3"/><path d="M38 14.5 l4.2 2.6 -4.8 .9" fill="none" stroke="#b49a80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 37 Q10 40 14 41" fill="none" stroke="#b49a80" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2.5 3"/><path d="M34 41 Q38 40 42 37" fill="none" stroke="#b49a80" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2.5 3"/>`;
  const base=`<path d="M17 46 L18.5 33 h11 L31 46z" fill="url(#spb_${id})" ${K}/><ellipse cx="24" cy="33" rx="6.5" ry="2" fill="#fff" ${k}/>`;
  const barC=id==='cane'?'#e8364f':id==='pretzel'?'#a0602e':id==='rainbow'?'#b98cff':C[0];
  const bar=`<path d="M${L} ${Y} H${R}" stroke="#4a2a1a" stroke-width="5" stroke-linecap="round"/><path d="M${L} ${Y} H${R}" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>`+(id==='pretzel'?`<path d="M${L} ${Y} H${R}" stroke="#a0602e" stroke-width="2.6" stroke-linecap="round"/>`:`<path d="M${L} ${Y} H${R}" stroke="${barC}" stroke-width="2.6" stroke-dasharray="2 2"/>`);
  const hub=`<circle cx="24" cy="${Y}" r="4.2" fill="#ffd35f" ${k}/><path d="M24 ${Y-4.5} l-3.6-2.4 v4.4z M24 ${Y-4.5} l3.6-2.4 v4.4z" fill="${id==='pretzel'?'#ff9ec7':'#ff5f9e'}" ${k}/>`;
  const arms=(x,y,r,c1)=>{let p='';for(let q=0;q<5;q++){const a=q*Math.PI*2/5,P=(rr,da)=>[(x+Math.cos(a+da)*rr).toFixed(2),(y+Math.sin(a+da)*rr).toFixed(2)];const[m1,m2]=P(r*.55,.8),[e1,e2]=P(r*.9,1.6);p+=`<path d="M${x} ${y} Q${m1} ${m2} ${e1} ${e2}" fill="none" stroke="${c1}" stroke-width="${(r*.3).toFixed(2)}" stroke-linecap="round"/>`}return p};
  const head=(x,c)=>{const y=Y,r=6.6;
    if(id==='heart')return heart(x,y+.5,6.6,c,'#4a2a1a',2.2);
    if(id==='star')return star(x,y,7.6,c,'#4a2a1a',2.2);
    if(id==='cotton')return`<circle cx="${x-2.6}" cy="${y-1}" r="3.6" fill="${c}" ${k}/><circle cx="${x+2.6}" cy="${y-1.6}" r="3.6" fill="${c}" ${k}/><circle cx="${x}" cy="${y+2.4}" r="3.8" fill="${c}" ${k}/><circle cx="${x}" cy="${y-4}" r="3.2" fill="${c}" ${k}/>`;
    if(id==='cane'){const dir=x<24?-1:1,P=`M${x-dir*1.5} ${y} V${y-5} a${3.6} ${3.6} 0 0 ${dir<0?0:1} ${dir*7.2} 0 v2`;return`<path d="${P}" fill="none" stroke="#4a2a1a" stroke-width="5.4" stroke-linecap="round"/><path d="${P}" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/><path d="${P}" fill="none" stroke="#e8364f" stroke-width="2.8" stroke-dasharray="2 2"/>`}
    if(id==='pretzel'){const T=`M${x} ${y+5} C${x-7} ${y+5} ${x-7} ${y-6} ${x-1.5} ${y-5.5} C${x+1} ${y-5} ${x+1} ${y-1} ${x} ${y} C${x-1} ${y-1} ${x-1} ${y-5} ${x+1.5} ${y-5.5} C${x+7} ${y-6} ${x+7} ${y+5} ${x} ${y+5}z`;return`<path d="${T}" fill="none" stroke="#4a2a1a" stroke-width="4.6" stroke-linejoin="round"/><path d="${T}" fill="none" stroke="#9a5228" stroke-width="2.4" stroke-linejoin="round"/><circle cx="${x-3.5}" cy="${y-2}" r=".7" fill="#fff"/><circle cx="${x+3.5}" cy="${y-2}" r=".7" fill="#fff"/><circle cx="${x}" cy="${y+4}" r=".7" fill="#fff"/>`}
    const fill=c==='rainbow'?'url(#spr_rb)':'#fff';return`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${k}/>${arms(x,y,r,c==='rainbow'?'#ffffff':c)}<circle cx="${x}" cy="${y}" r="1.2" fill="${c==='rainbow'?'#fff':c}"/><ellipse cx="${x-2.6}" cy="${y-3}" rx="1.6" ry=".9" fill="#fff" opacity=".8" transform="rotate(-30 ${x-2.6} ${y-3})"/>`};
  return d+motion+base+bar+head(L,C[0])+head(R,C[1])+hub};
return{ghost,bat,bear,soldier,spider,cannon,ice,magnet,spin}})();
{const ii=itemIcon;itemIcon=function(cat,id){if(WI[cat]){let b;try{b=WI[cat](id)}catch(e){b=null}if(b)return'<svg viewBox="0 0 48 48" aria-hidden="true">'+b+'</svg>'}return ii.apply(this,arguments)}}
// ----- 홈 · 로딩 화면 제목: 글자마다 사탕 색 + 초코 테두리 + 통통 튀는 기울기 -----
function logoDress(){for(const h of document.querySelectorAll('#title h1, h1.ld-t')){if(h.dataset.logo)continue;const t=h.textContent.trim();if(!t)continue;h.dataset.logo=1;
  const cols=[['#ffb3d1','#ff5f9e'],['#a8f0d4','#2fbf93'],['#ffe48a','#ffb21f'],['#c9b3ff','#8a5cff']];
  h.innerHTML=`<span class="lg-w">${[...t].map((c,i)=>c===' '?'<i class="lg-sp"></i>':`<span class="lg-c" data-c="${c}" style="--a:${cols[i%cols.length][0]};--b:${cols[i%cols.length][1]};--r:${i%2?6:-6}deg;--d:${i*.12}s">${c}</span>`).join('')}<svg class="lg-st" viewBox="0 0 24 24"><path d="M12 1 l3 7.5 8 .7 -6 5.2 1.9 7.8 -6.9-4.2 -6.9 4.2 1.9-7.8 -6-5.2 8-.7z" fill="#ffe48a" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg><svg class="lg-lp" viewBox="0 0 24 40"><path d="M12 22 V39" stroke="#4a2a1a" stroke-width="4" stroke-linecap="round"/><path d="M12 22 V39" stroke="#fff8ee" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="10" fill="#fff" stroke="#4a2a1a" stroke-width="2.2"/><path d="M12 12 Q15.62 15.73 11.75 20.60" fill="none" stroke="#ff5f9e" stroke-width="2.6" stroke-linecap="round"/><path d="M12 12 Q9.57 16.60 3.75 14.42" fill="none" stroke="#ff5f9e" stroke-width="2.6" stroke-linecap="round"/><path d="M12 12 Q6.88 11.11 7.15 4.90" fill="none" stroke="#ff5f9e" stroke-width="2.6" stroke-linecap="round"/><path d="M12 12 Q11.26 6.85 17.26 5.19" fill="none" stroke="#ff5f9e" stroke-width="2.6" stroke-linecap="round"/><path d="M12 12 Q16.67 9.71 20.10 14.90" fill="none" stroke="#ff5f9e" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="12" r="1.4" fill="#ff5f9e"/></svg></span>`}}
setInterval(logoDress,500);
{const st=document.createElement('style');st.textContent=`
#title h1,h1.ld-t{line-height:1;margin:2px 0 4px}
.lg-w{position:relative;display:inline-flex;align-items:flex-end;gap:.02em;padding:0 .35em}
.lg-c{display:inline-block;font:clamp(42px,12vh,72px)/1 var(--f-display);color:var(--a);-webkit-text-stroke:.16em var(--choco);paint-order:stroke fill;text-shadow:0 .1em 0 var(--choco),0 .1em .12em #4a2a1a55;transform:rotate(var(--r));
  -webkit-text-fill-color:var(--a);animation:lgBob 2.6s ease-in-out var(--d) infinite;position:relative}
.lg-c::after{content:attr(data-c);position:absolute;left:0;top:0;-webkit-text-stroke:0;-webkit-text-fill-color:#ffffffb0;text-shadow:none;clip-path:inset(8% 40% 62% 12%);pointer-events:none}
h1.ld-t .lg-c{font-size:clamp(34px,10vh,60px)}
.lg-sp{display:inline-block;width:.3em}
@keyframes lgBob{0%,100%{transform:rotate(var(--r)) translateY(0)}50%{transform:rotate(var(--r)) translateY(-.06em)}}
.lg-st{position:absolute;right:-.05em;top:-.12em;width:.42em;height:.42em;font-size:clamp(42px,12vh,72px);animation:lgTw 1.8s ease-in-out infinite}
.lg-lp{position:absolute;left:-.12em;bottom:-.02em;width:.36em;height:.6em;font-size:clamp(42px,12vh,72px);transform:rotate(-18deg)}
@keyframes lgTw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(.8) rotate(20deg)}}
@media (prefers-reduced-motion:reduce){.lg-c,.lg-st{animation:none}}`;document.head.appendChild(st)}
// ================= 등급 상자: 등급이 높을수록 화려하게 + 여는 애니메이션 =================
const BXS='stroke="#4a2a1a" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
const bxSpark=(x,y,r,c='#fff')=>`<path class="bx-sp" d="M${x} ${y-r} Q${x+r*.18} ${y-r*.18} ${x+r} ${y} Q${x+r*.18} ${y+r*.18} ${x} ${y+r} Q${x-r*.18} ${y+r*.18} ${x-r} ${y} Q${x-r*.18} ${y-r*.18} ${x} ${y-r}z" fill="${c}" stroke="#4a2a1a" stroke-width="1.2"/>`;
boxSvg=function(t){t=Math.max(0,Math.min(4,t|0));
  const S=[{b:'#e3a659',b2:'#c98a4b',lid:'#eab06a',rib:'#fff3dc',bow:'#fff3dc'},{b:'#ffb3d1',b2:'#ff8ab5',lid:'#ffc4dc',rib:'#ffffff',bow:'#ffffff'},{b:'#c9a8ff',b2:'#a982f5',lid:'#d6bcff',rib:'#6fe0b8',bow:'#6fe0b8'},{b:'#8fd0ff',b2:'#5fb4f0',lid:'#a6dcff',rib:'#ffd23a',bow:'#ffd23a'},{b:'url(#bxGold)',b2:'#e8a000',lid:'url(#bxGold)',rib:'#e8364f',bow:'#e8364f'}][t];
  let defs=`<defs><linearGradient id="bxGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2a8"/><stop offset=".55" stop-color="#ffd23a"/><stop offset="1" stop-color="#f0a800"/></linearGradient>
    <pattern id="bxDot" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#ffb3d1"/><circle cx="2.5" cy="2.5" r="1.7" fill="#fff"/><circle cx="7" cy="7" r="1.7" fill="#fff"/></pattern>
    <pattern id="bxStr" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="10" height="10" fill="#c9a8ff"/><rect width="5" height="10" fill="#d9c2ff"/></pattern>
    <radialGradient id="bxGlow"><stop offset="0" stop-color="#fff6b0" stop-opacity=".95"/><stop offset="1" stop-color="#fff6b0" stop-opacity="0"/></radialGradient></defs>`;
  const body=t===1?'url(#bxDot)':t===2?'url(#bxStr)':S.b;
  let back='',deco='',lidDeco='',top='';
  if(t===4){back=`<circle cx="40" cy="44" r="38" fill="url(#bxGlow)"/>`+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return`<path d="M40 44 L${(40+Math.cos(a-.09)*40).toFixed(1)} ${(44+Math.sin(a-.09)*40).toFixed(1)} L${(40+Math.cos(a+.09)*40).toFixed(1)} ${(44+Math.sin(a+.09)*40).toFixed(1)}z" fill="#fff3a8" opacity=".55"/>`}).join('')}
  if(t===3)back=`<circle cx="40" cy="46" r="34" fill="#dff1ff" opacity=".8"/>`;
  if(t===0)deco=`<circle cx="24" cy="50" r="1.4" fill="#8a5230"/><circle cx="55" cy="60" r="1.4" fill="#8a5230"/><circle cx="23" cy="64" r="1.2" fill="#8a5230"/><circle cx="56" cy="47" r="1.2" fill="#8a5230"/>`;
  if(t===2)deco=`<g stroke-width="2.2" stroke-linecap="round"><path d="M22 48 l3 -1.5" stroke="#ff7eb6"/><path d="M54 58 l2.5 2" stroke="#ffd23a"/><path d="M23 62 l2.6 1.2" stroke="#7cc6ff"/><path d="M55 46 l-2 2.4" stroke="#fff"/></g>`+bxSpark(57,66,3.2,'#ffe48a');
  if(t===3)deco=`<rect x="16" y="66" width="48" height="5" fill="#ffd23a" stroke="#4a2a1a" stroke-width="2"/>`;
  if(t===4)deco=`<g ${BXS}><circle cx="24" cy="54" r="3.2" fill="#ff4f6d"/><circle cx="56" cy="54" r="3.2" fill="#4f9dff"/><circle cx="24" cy="65" r="2.6" fill="#2fbf93"/><circle cx="56" cy="65" r="2.6" fill="#b98cff"/></g>`;
  if(t===3)lidDeco=`<path d="M12 39 h56 v2 q-3 5 -6 0 q-3 6 -7 0 q-3 4 -6 0 q-3 6 -7 0 q-3 4 -6 0 q-3 6 -7 0 q-3 4 -6 0 q-3 5 -6 0 q-2 4 -5 0z" fill="#fff" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><rect x="12" y="28" width="56" height="3.4" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.6"/>`;
  if(t===4)lidDeco=`<rect x="12" y="28" width="56" height="3.6" fill="#fff3a8" stroke="#4a2a1a" stroke-width="1.6"/><circle cx="20" cy="35" r="2" fill="#ff4f6d" stroke="#4a2a1a" stroke-width="1.2"/><circle cx="60" cy="35" r="2" fill="#4f9dff" stroke="#4a2a1a" stroke-width="1.2"/>`;
  const bowW=[7,8,9,10,0][t];
  top=t===4?`<path d="M26 27 L24 13 L32 19 L40 9 L48 19 L56 13 L54 27z" fill="url(#bxGold)" ${BXS}/><circle cx="40" cy="9" r="2.6" fill="#ff4f6d" stroke="#4a2a1a" stroke-width="1.4"/><circle cx="24" cy="13" r="2" fill="#4f9dff" stroke="#4a2a1a" stroke-width="1.2"/><circle cx="56" cy="13" r="2" fill="#2fbf93" stroke="#4a2a1a" stroke-width="1.2"/><circle cx="40" cy="22" r="2.6" fill="#ff4f6d" stroke="#4a2a1a" stroke-width="1.4"/>`
    :`<path d="M40 28 C${40-bowW*.9} ${28-bowW*1.5} ${40-bowW*2.4} ${28-bowW*1.1} ${40-bowW*1.6} ${28-bowW*.15} Q${40-bowW*.8} ${28+.5} 40 28z M40 28 C${40+bowW*.9} ${28-bowW*1.5} ${40+bowW*2.4} ${28-bowW*1.1} ${40+bowW*1.6} ${28-bowW*.15} Q${40+bowW*.8} ${28+.5} 40 28z" fill="${S.bow}" ${BXS}/><circle cx="40" cy="28" r="${(2.6+t*.4).toFixed(1)}" fill="${t===1?'#ff8ab5':t===3?'#fff3a8':S.bow}" stroke="#4a2a1a" stroke-width="2"/>`;
  const spark=t>=3?bxSpark(10,24,4)+bxSpark(70,30,3.4,'#fff3a8')+bxSpark(68,70,3)+(t===4?bxSpark(12,66,3.6,'#fff3a8')+bxSpark(40,4,0):''):t===2?bxSpark(68,34,3):'';
  return`<svg viewBox="0 0 80 80" aria-hidden="true">${defs}${back}<g class="bx-body"><rect x="16" y="38" width="48" height="34" rx="5" fill="${body}" ${BXS}/><path d="M16 64 h48" stroke="${S.b2}" stroke-width="2" opacity=".35"/>${deco}<rect x="35.5" y="38" width="9" height="34" fill="${S.rib}" ${BXS}/></g>
    <g class="bx-lid"><rect x="12" y="28" width="56" height="13" rx="4" fill="${S.lid}" ${BXS}/>${lidDeco}<rect x="35" y="28" width="10" height="13" fill="${S.rib}" ${BXS}/><path d="M17 31.5 h7" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".75"/>${top}</g>${spark}</svg>`};
// 여는 애니메이션: 흔들흔들 → 빛이 차오름 → 뚜껑 펑 → 빛살과 색종이 → 결과 카드가 톡
function pgBoxResult(t,kind,res){const B=SAVE.boxes,W=kind==='c',nm=res.k?(W?CARDS[res.k].n:SKN[res.k][0]):'';
  $('pgBody').innerHTML=`<div class="kicker">${boxName(t)}</div>`+(res.k?`<div class="pg-card bx-pop g${res.g}">${dkTile(res.k,W,'box')}<i class="bx-halo"></i></div><h2 class="bx-name"><span class="gr-l" style="--gc:${GR_C[res.g]}">${GR_N[res.g]}</span> ${nm}</h2><p class="note">카드·스킬 화면에서 덱에 넣을 수 있어요</p>`
    :`<div class="pg-box bx-pop">${boxSvg(t)}</div><h2 class="bx-name">${COIN_SVG} ${res.coins}코인</h2><p class="note">${GR_N[res.g]} ${W?'카드':'스킬'}를 모두 가지고 있어서 코인으로 받았어요</p>`)+
    `<button class="mbtn berry small" id="bPgOk"><span class="mt"><b>${B.length?'다음 상자':'확인'}</b></span></button>`;
  $('bPgOk').onclick=()=>{try{SFX.click()}catch(e){}B.length?pgBoxes():pgClose()}}
{const pb=pgBoxes;pgBoxes=function(){const r=pb.apply(this,arguments);const B=SAVE.boxes;if(!B.length||$('pgM').hidden)return r;const t=B[0];const bx=$('pgBody').querySelector('.pg-box');if(bx){bx.classList.add('bx-idle','bt'+t)}
  for(const b of $('pgBody').querySelectorAll('.pg-two button'))b.onclick=()=>{try{SFX.click()}catch(e){}const kind=b.dataset.k,res=boxRoll(t,kind);B.shift();saveGame();
    $('pgBody').querySelector('.pg-two').remove();const l=$('bPgLater');if(l)l.remove();for(const q of $('pgBody').querySelectorAll('.pg-odds,.note'))q.style.visibility='hidden';
    bx.classList.remove('bx-idle');bx.classList.add('bx-charge');let done=false;const fin=()=>{if(done)return;done=true;try{SFX.win()}catch(e){}pgBoxResult(t,kind,res)};
    const skip=e=>{if(e.target.closest('#bPgOk'))return;$('pgBody').removeEventListener('click',skip);fin()};setTimeout(()=>$('pgBody').addEventListener('click',skip),50);
    setTimeout(()=>{if(done)return;try{SFX.pop()}catch(e){}bx.classList.add('bx-open');const bu=document.createElement('div');bu.className='bx-burst bt'+t;
      bu.innerHTML='<i class="bx-rays"></i>'+Array.from({length:16},(_,i)=>{const a=i/16*Math.PI*2+Math.random()*.3,d=70+Math.random()*60;const c=['#ff7eb6','#ffd23a','#7cc6ff','#2fbf93','#b98cff','#ffffff'][i%6];return`<b style="--x:${(Math.cos(a)*d).toFixed(0)}px;--y:${(Math.sin(a)*d-20).toFixed(0)}px;--r:${(Math.random()*720-360).toFixed(0)}deg;background:${c}"></b>`}).join('');bx.appendChild(bu)},1000);
    setTimeout(fin,1650)};return r}}
{const st=document.createElement('style');st.textContent=`
.pg-box{position:relative}.pg-box svg{width:clamp(84px,27vh,132px)!important;overflow:visible}
.pg-box .bx-lid{transform-box:fill-box;transform-origin:50% 100%}
.pg-box.bx-idle svg{animation:bxBob 2.2s ease-in-out infinite}.pg-box .bx-sp{transform-box:fill-box;transform-origin:center;animation:bxTw 1.6s ease-in-out infinite}
.pg-box .bx-sp:nth-of-type(2n){animation-delay:.5s}
@keyframes bxBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes bxTw{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.55);opacity:.6}}
.pg-box.bx-charge svg{animation:bxShake 1s ease-in forwards}
.pg-box.bt1.bx-charge svg{--gl:#ff9ec7}.pg-box.bt2.bx-charge svg{--gl:#b98cff}.pg-box.bt3.bx-charge svg{--gl:#7cc6ff}.pg-box.bt4.bx-charge svg{--gl:#ffd23a}
@keyframes bxShake{0%{transform:rotate(0) scale(1);filter:drop-shadow(0 0 0 var(--gl,#ffe48a))}15%{transform:rotate(-6deg) scale(1.02)}30%{transform:rotate(6deg) scale(1.03)}45%{transform:rotate(-9deg) scale(1.05)}60%{transform:rotate(9deg) scale(1.07)}72%{transform:rotate(-12deg) scale(1.09)}84%{transform:rotate(12deg) scale(1.12);filter:drop-shadow(0 0 14px var(--gl,#ffe48a))}100%{transform:rotate(0) scale(1.16);filter:drop-shadow(0 0 22px var(--gl,#ffe48a))}}
.pg-box.bx-open .bx-lid{animation:bxLid .6s cubic-bezier(.2,.9,.3,1) forwards}
@keyframes bxLid{to{transform:translate(18px,-46px) rotate(28deg);opacity:0}}
.bx-burst{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none}
.bx-rays{position:absolute;left:-110px;top:-110px;width:220px;height:220px;border-radius:50%;background:repeating-conic-gradient(#fff6b0cc 0 9deg,transparent 9deg 22deg);-webkit-mask:radial-gradient(circle,#000 30%,transparent 70%);mask:radial-gradient(circle,#000 30%,transparent 70%);animation:bxRays .7s ease-out forwards}
.bx-burst.bt4 .bx-rays{background:repeating-conic-gradient(#ffd23add 0 9deg,transparent 9deg 18deg)}
@keyframes bxRays{0%{transform:scale(.2) rotate(0);opacity:0}30%{opacity:1}100%{transform:scale(1.5) rotate(40deg);opacity:0}}
.bx-burst b{position:absolute;left:-4px;top:-3px;width:8px;height:6px;border-radius:2px;border:1px solid #4a2a1a55;animation:bxConf .7s cubic-bezier(.2,.8,.3,1) forwards}
@keyframes bxConf{to{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}}
.bx-pop{position:relative;animation:bxPop .5s cubic-bezier(.3,1.7,.5,1) both}
@keyframes bxPop{0%{transform:scale(.2);opacity:0}100%{transform:scale(1);opacity:1}}
.bx-name{animation:bxPop .45s .12s cubic-bezier(.3,1.6,.5,1) both}
.pg-card .bx-halo{position:absolute;left:50%;top:50%;width:230px;height:230px;margin:-115px 0 0 -115px;border-radius:50%;z-index:-1;pointer-events:none;opacity:.75;-webkit-mask:radial-gradient(circle,#000 25%,transparent 70%);mask:radial-gradient(circle,#000 25%,transparent 70%);animation:bxSpin 8s linear infinite}
.pg-card.g1 .bx-halo{background:radial-gradient(circle,#c8f5c0,transparent 70%)}.pg-card.g2 .bx-halo{background:repeating-conic-gradient(#bfe0ff 0 10deg,transparent 10deg 24deg)}.pg-card.g3 .bx-halo{background:repeating-conic-gradient(#ffd23a 0 10deg,#fff3a8 10deg 16deg,transparent 16deg 24deg);opacity:.95}
.pg-card{position:relative;isolation:isolate;width:clamp(84px,30vh,110px)!important}.pg-card .dk{width:100%!important}
@keyframes bxSpin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.pg-box.bx-idle svg,.pg-box .bx-sp,.pg-card .bx-halo{animation:none}}`;document.head.appendChild(st)}
