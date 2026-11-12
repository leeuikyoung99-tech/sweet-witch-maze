// ===== 69차: 서브 게임(도둑 대 도둑 · 마녀 대 마녀) 없애기 =====
// 게임 고르기 화면에는 마녀의 미로(도둑 대 마녀)만 남겨요. 탭 줄도 숨겨요.
ROLETAB='main';
{const t=document.querySelector('#roleTabs [data-t="sub"]');if(t)t.remove();$('roleTabs').hidden=true;
  for(const id of['bRace','bWW']){const b=$(id);if(b){b.hidden=true;b.style.display='none'}}}
{const sr=showRole;showRole=function(){const r=sr.call(this,'main');try{$('roleTabs').hidden=true;for(const id of['bRace','bWW'])if($(id))$(id).hidden=true}catch(e){}return r}}
{const st=document.createElement('style');st.textContent='#roleTabs{display:none!important}#bRace,#bWW{display:none!important}';document.head.appendChild(st)}
