// 게임 장면 녹화: node rec.js <main|mini> <outdir> <warm> <frames>
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const MZ='/home/claude/sweet-witch-maze/src/mz';const [MODE,OUT,WARM,FR]=[process.argv[2],process.argv[3],+process.argv[4],+process.argv[5]];fs.mkdirSync(OUT,{recursive:true});
const W=+(process.env.W||1280),H=+(process.env.H||320);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true});
 await ctx.addInitScript(()=>{localStorage.setItem('swm-save',JSON.stringify({lang:'ko',acct:'guest',nick:'T',tutDone:1,mgView:3}))});
 const p=await ctx.newPage();p.on('pageerror',e=>console.log('PAGEERR',String(e).slice(0,300)));
 await p.route('**/fonts.g*/**',r=>r.abort());await p.route(u=>u.hostname.endsWith('supabase.co'),r=>r.abort());await p.route('**/peerjs**',r=>r.abort());
 await p.route('http://local/**',async r=>{const u=r.request().url().split('://local/')[1];let f=path.join(MZ,u);if(!fs.existsSync(f))f=path.join(MZ,'..','..',u);let b64=0;if(!fs.existsSync(f)&&f.endsWith('.txt')){f=f.slice(0,-4);b64=1}let body=fs.existsSync(f)?fs.readFileSync(f):Buffer.from('');if(b64)body=Buffer.from(body.toString('base64'));if(f.endsWith('.html'))body=Buffer.concat([Buffer.from('<!doctype html><meta charset=utf-8><body>'),body]);r.fulfill({status:200,body,contentType:f.endsWith('.html')?'text/html':'text/plain'})});
 await p.goto('http://local/v28e.html');await p.waitForTimeout(3000);await p.evaluate(()=>document.querySelectorAll('.nt-x').forEach(x=>x.click()));
 if(MODE==='main'){await p.evaluate(`MAPPICK='${process.env.MAP||'candy'}';SET.mode='devil';SER.on=false;SET.lvl=2;window.__aiBoth=true;beginMatch('devil')`);await p.waitForTimeout(9000)}
 else{await p.evaluate(`(()=>{try{lbApplyMap&&LOBBY&&(LOBBY.map='${process.env.MAP||'candy'}')}catch(e){}MG.both=true;MG.lvl=2;mgStart('thief',['decoy','cloak'],${process.env.WSK||"['tower','bear','spider']"})})()`);await p.waitForTimeout(6000)}
 await p.evaluate((mode)=>{const s=document.createElement('style');s.textContent='body *{visibility:hidden!important}canvas.__r{visibility:visible!important}';renderer.domElement.classList.add('__r');document.head.appendChild(s);
  window.__q=[];window.__T=performance.now();window.requestAnimationFrame=cb=>{__q.push(cb);return __q.length};
  window.__step=()=>{const q=__q;__q=[];__T+=1000/30;for(const f of q)try{f(__T)}catch(e){console.log('ERR',e)}};
  const V=THREE.Vector3;window.__c={t:null,p:null};
  const rr=renderer.render.bind(renderer);renderer.render=(sc,c)=>{try{if(c===camera){
    if(mode==='main'){const h=G.hero;const B=N*C;const tg=new V(Math.max(B*.32,Math.min(B*.68,h.x)),0,Math.max(B*.25,Math.min(B*.8,h.z-4)));if(!__c.t)__c.t=tg.clone();__c.t.lerp(tg,.03);c.fov=40;c.updateProjectionMatrix();c.position.set(__c.t.x,24,__c.t.z+22);c.lookAt(__c.t)}
    else{const a=MG.th,m=MG.mo;const d=new V(m.x-a.x,0,m.z-a.z);const L=d.length()||1;d.multiplyScalar(1/L);const sd=new V(-d.z,0,d.x);const mid=new V((a.x+m.x)/2,0,(a.z+m.z)/2);const R=Math.min(34,Math.max(14,L*.85+8));
      const want=mid.clone().addScaledVector(sd,R).addScaledVector(d,-R*.35);const B=N*C;if(want.x<2||want.x>B-2||want.z<2||want.z>B-2){want.copy(mid).addScaledVector(sd,-R).addScaledVector(d,-R*.35)}want.x=Math.max(2,Math.min(B-2,want.x));want.z=Math.max(2,Math.min(B-2,want.z));want.y=12;const look=new V(mid.x,3.2,mid.z);
      if(!__c.p){__c.p=want.clone();__c.t=look.clone()}__c.p.lerp(want,.03);__c.t.lerp(look,.05);c.fov=50;c.updateProjectionMatrix();c.position.copy(__c.p);c.lookAt(__c.t)}}}catch(e){}rr(sc,c)}},MODE);
 for(let i=0;i<WARM;i++)await p.evaluate('__step()');
 const t0=Date.now();
 for(let i=0;i<FR;i++){await p.evaluate('__step()');await p.screenshot({path:`${OUT}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:92})}
 console.log('frames',FR,'sec',(Date.now()-t0)/1000,await p.evaluate(MODE==='main'?`'t='+G.t.toFixed(1)+' ents '+G.ents.length+' over '+G.over`:`'t='+MG.t.toFixed(1)+' got '+MG.got+' hp '+MG.th.hp+' over '+MG.over`));
 await b.close()})()
