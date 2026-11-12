# 29차 마지막: 이모티콘을 모두 지우고, 꼭 필요한 곳은 직접 그린 그림으로 (patch28.py 끝에서 exec)
import re
K='stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"'
LOCK='<svg viewBox="0 0 24 24" aria-hidden="true" class="lk-svg"><rect x="4" y="10" width="16" height="11" rx="3" fill="#ffd35f" stroke="#4a2a1a" stroke-width="2"/><path d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke="#4a2a1a" stroke-width="2.4"/><circle cx="12" cy="15" r="1.8" fill="#4a2a1a"/></svg>'
GEAR='<svg viewBox="0 0 24 24" aria-hidden="true" class="gear-svg"><path d="M12 2.5 l2 .4 .6 2.4 2 .9 2.2-1.2 1.4 1.4-1.2 2.2 .9 2 2.4.6 .4 2-.4 2-2.4.6-.9 2 1.2 2.2-1.4 1.4-2.2-1.2-2 .9-.6 2.4-2 .4-2-.4-.6-2.4-2-.9-2.2 1.2-1.4-1.4 1.2-2.2-.9-2-2.4-.6-.4-2 .4-2 2.4-.6.9-2-1.2-2.2 1.4-1.4 2.2 1.2 2-.9.6-2.4z" fill="#fff8ee" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="3.4" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="1.6"/></svg>'
PEN='<svg viewBox="0 0 24 24" aria-hidden="true" class="pen-svg"><path d="M4 20 l1-5 11-11 4 4-11 11z" fill="#ffd35f" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 6 l4 4" stroke="#4a2a1a" stroke-width="1.8"/><path d="M4 20 l1-5 4 4z" fill="#ff9ec7" stroke="#4a2a1a" stroke-width="1.5" stroke-linejoin="round"/></svg>'
GRANNY='<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="14" r="9" fill="#e9e4f2" stroke="#4a2a1a" stroke-width="2.5"/><circle cx="32" cy="34" r="18" fill="#ffd9c0" stroke="#4a2a1a" stroke-width="2.5"/><path d="M14 30 q2-14 18-14 q16 0 18 14 q-6-6-18-6 q-12 0-18 6z" fill="#e9e4f2" stroke="#4a2a1a" stroke-width="2.5"/><circle cx="24" cy="36" r="5" fill="none" stroke="#7a5236" stroke-width="2"/><circle cx="40" cy="36" r="5" fill="none" stroke="#7a5236" stroke-width="2"/><path d="M29 36 h6" stroke="#7a5236" stroke-width="2"/><path d="M26 45 q6 4 12 0" fill="none" stroke="#4a2a1a" stroke-width="2.2" stroke-linecap="round"/><circle cx="20" cy="43" r="2.6" fill="#ff9ec7" opacity=".7"/><circle cx="44" cy="43" r="2.6" fill="#ff9ec7" opacity=".7"/></svg>'
CAKE='<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="24" width="32" height="16" rx="3" fill="#ffd6ea" '+K+'/><path d="M8 29 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0" fill="none" stroke="#fff8ee" stroke-width="3"/><rect x="22" y="12" width="4" height="12" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="2"/><path d="M24 4 q4 4 0 7 q-4-3 0-7z" fill="#ffb347" stroke="#4a2a1a" stroke-width="1.5"/></svg>'
CSS7="""
/* 이모티콘 대신 그린 그림 */
.dk.locked .lk::before{content:''!important;width:clamp(24px,7vh,32px);height:clamp(24px,7vh,32px);background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='4' y='10' width='16' height='11' rx='3' fill='%23ffd35f' stroke='%234a2a1a' stroke-width='2'/%3E%3Cpath d='M8 10 V7 a4 4 0 0 1 8 0 V10' fill='none' stroke='%234a2a1a' stroke-width='2.4'/%3E%3Ccircle cx='12' cy='15' r='1.8' fill='%234a2a1a'/%3E%3C/svg%3E") center/contain no-repeat;filter:drop-shadow(0 2px 0 #4a2a1a)}
.lk-svg{width:1.2em;height:1.2em;vertical-align:-.2em}.gear-svg{width:26px;height:26px;display:block}.pen-svg{width:16px;height:16px;display:block}
.st-gm svg{width:clamp(56px,18vh,100px);height:clamp(56px,18vh,100px)}#gmCake{width:44px;height:44px;left:16px;top:12px;line-height:0}#gmCake svg{width:44px;height:44px;display:block}
.si-ci svg{width:20px;height:20px;vertical-align:-5px}.si-ci{display:inline-block;margin-right:1px}
.ic-mix b{right:-6px;bottom:-6px;width:22px;height:22px}.ic-mix b svg{width:100%;height:100%}
.dk-buy-t{flex:1;min-width:0}#deckSel:has(.dk-buy){display:flex;align-items:center;gap:8px}.dk-new{color:#2fbf93}
"""
R(".shop-buy{",CSS7+"\n.shop-buy{")
R("'<span class=\"st-gm\">👵</span>'","'<span class=\"st-gm\">"+GRANNY.replace("'","\\'")+"</span>'")
R("c.textContent='🎂';","c.innerHTML='"+CAKE.replace("'","\\'")+"';")
R('aria-label="소리 설정">⚙️</button>','aria-label="소리 설정">'+GEAR+'</button>')
R('id="bFrNick">✏️</button>','id="bFrNick" aria-label="닉네임 바꾸기">'+PEN+'</button>')
R("${chOpen(q.n)?q.n+'장':'🔒'}","${chOpen(q.n)?q.n+'장':'"+LOCK.replace("'","\\'")+"'}")
R(".map(k=>CARDS[k].ic).join('')",".map(k=>'<i class=\"si-ci\">'+(ART[k]||'')+'</i>').join('')")
# 나머지 이모티콘은 모두 지워요 (뒤 칸 띄우기도 같이) · 별(★)·화살표·체크 같은 글자 기호는 남겨요
EMO=re.compile('(?:[\U0001F000-\U0001FAFF\u2600-\u26FF\u2702-\u27B0\u2B50\u2B55\u231A\u231B\u23E9-\u23FA\u2934\u2935\u3030\u303D\u3297\u3299\u203C\u2049](?:\uFE0F|\u200D[\U0001F000-\U0001FAFF\u2600-\u27BF]\uFE0F?)*)[ ]?')
KEEP=set('★☆✓✕✦✔✖')
def strip(m):
    return m.group() if m.group()[0] in KEEP else ''
s=EMO.sub(strip,s)
s=s.replace('\uFE0F','')
R('<div id="burn" hidden>버닝 타임 · 벽 밀기 금지</div>','<div id="burn" hidden>버닝 타임 · 벽 밀기 금지</div>')
