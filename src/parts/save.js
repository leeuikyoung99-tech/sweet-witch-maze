/* ================= 저장 · 코인 · 꾸미기 목록 ================= */
const DEF_EQ={theme:'candy',cloth:'mint',hat:'none',back:'none',hand:'lolli',slime:'grape',cannon:'stripe'};
const SHOP={
 cloth:{t:'옷 색',items:{mint:['민트',0],berry:['딸기',120],grape:['포도',120],lemon:['레몬',120],soda:['소다',150],choco:['초코',150]}},
 hat:{t:'과자 모자',items:{none:['없음',0],cupcake:['컵케이크',200],cone:['아이스크림',200],ears:['쿠키 귀',150],crown:['사탕 왕관',300]}},
 back:{t:'등에 메는 것',items:{none:['없음',0],lolli:['막대사탕 가방',200],wings:['마카롱 날개',300]}},
 hand:{t:'손에 든 과자',items:{lolli:['막대사탕',0],cane:['지팡이 사탕',100],cotton:['솜사탕',150],cone:['아이스크림',150]}},
 slime:{t:'슬라임 색',items:{grape:['포도',0],berry:['딸기',150],soda:['소다',150],lemon:['레몬',150]}},
 cannon:{t:'사탕 대포',items:{stripe:['딸기 줄무늬',0],mint:['민트 줄무늬',150],choco:['초코',150],rainbow:['무지개',250]}},
 theme:{t:'미로 테마',items:{candy:['과자 마을',0],ice:['아이스크림 왕국',300],pumpkin:['할로윈 마을',400],xmas:['크리스마스 마을',400]}},
};
const SAVE=(()=>{let s=null;try{s=JSON.parse(localStorage.getItem('swm-save')||'null')}catch(e){}s=s&&typeof s==='object'?s:{};if(typeof s.coins!=='number')s.coins=100;s.own=s.own||{};s.eq=Object.assign({},DEF_EQ,s.eq||{});s.tut=s.tut||{};s.view=s.view===3?3:1;
  for(const k in DEF_EQ){s.own[k+':'+DEF_EQ[k]]=1;if(!SHOP[k].items[s.eq[k]]||!s.own[k+':'+s.eq[k]])s.eq[k]=DEF_EQ[k]}return s})();
function saveGame(){try{localStorage.setItem('swm-save',JSON.stringify(SAVE))}catch(e){}}
const owns=(cat,id)=>!!SAVE.own[cat+':'+id];
// 상대에게서 받은 꾸미기는 목록에 있는 것만 써요
function cleanLook(l){const o={};for(const k in DEF_EQ)o[k]=(l&&typeof l[k]==='string'&&SHOP[k].items[l[k]])?l[k]:DEF_EQ[k];return o}
