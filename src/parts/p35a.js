/* 언어 선택: 소리 설정 창 안에 한국어 / English */
{const o=openSnd;openSnd=function(){o();const M=$('sndM');if(M.querySelector('.lang-row'))return;const rows=M.querySelectorAll('.snd-row');const last=rows[rows.length-1];if(!last)return;
  const d=document.createElement('div');d.className='snd-row lang-row';d.setAttribute('data-ni','');
  d.innerHTML=`<span>${LANG==='en'?'Language':'언어'}</span><div class="lang-seg"><button class="tg${LANG==='ko'?' on':''}" data-l="ko">한국어</button><button class="tg${LANG==='en'?' on':''}" data-l="en">English</button></div>`;
  last.after(d);for(const b of d.querySelectorAll('button'))b.onclick=()=>{if(b.dataset.l===LANG)return;SAVE.lang=b.dataset.l;try{saveGame()}catch(e){}location.reload()}}}
{const st=document.createElement('style');st.textContent=`.lang-row .lang-seg{display:flex;gap:8px;flex:0 0 197px}.lang-row .lang-seg .tg{min-width:0;padding-left:12px;padding-right:12px}`;document.head.appendChild(st)}
if(LANG!=='en')for(const k of document.querySelectorAll('.kicker.en'))if(k.textContent.trim()==='COOKOOD'){k.textContent='쿠키 도둑 & 과자 마녀';k.style.letterSpacing='.08em'}
if(LANG==='en'){const j=$('joyHint');if(j)j.innerHTML='Drag<br>here<br>to move'}
if(LANG==='en'){
  for(const k of document.querySelectorAll('.kicker'))if(k.textContent.trim()==='COOKOOD')k.textContent='COOKIE THIEVES & SWEET WITCHES';
  const st=document.createElement('style');st.textContent=`.dk .fx{z-index:6}.card .kind{font-size:8px;padding:1px 3px;z-index:3}`;document.head.appendChild(st)}
if(LANG==='en'){const st=document.createElement('style');st.textContent=`
@media (max-width:720px){#title .sbtn{padding-left:8px;padding-right:8px;font-size:14px}#title .sub-row{gap:6px}}
#deckTabs{flex:0 0 auto!important;max-width:none!important}#deckTabs button{flex:0 0 auto!important;padding-left:10px;padding-right:10px}#deckN{min-width:0}
#deckN{white-space:normal;line-height:1.15;max-width:110px;font-size:11.5px}
@media (max-width:720px){.pane-top>b{font-size:18px}#deckN{max-width:84px;font-size:10.5px}}
.lang-row .lang-seg{flex:0 0 197px}
#stgInfo .si-rw{display:block;line-height:1.45}#stgInfo .si-rw svg{vertical-align:-3px;margin-right:2px}#stgInfo .si-h b{white-space:normal;font-size:clamp(16px,4.8vh,22px)}
#dhint{white-space:normal;max-width:min(230px,34vw);text-align:center;line-height:1.25}`;document.head.appendChild(st)}
