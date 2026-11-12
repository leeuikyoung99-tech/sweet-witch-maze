(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const errs=[];window.addEventListener('error',e=>errs.push(e.message));const log=[];
const go=async()=>{snDoCamo();await w(1200);SN.t=.01;await w(700)};const next=async()=>{for(let i=0;i<60&&SN.phase!=='review';i++)await w(150);log.push('review '+SN.phase);$('snNext').click();await w(500)};
snStart({ail:2});await w(600);await go();for(const k of Object.keys(SN_IT)){snGive('me',k);snGive('ai',k)}SN.fx.smoke=0;SNV.ai.shield=0;await w(200);
{const v=new THREE.Vector3(SNV.ai.pos.x,SNV.ai.pos.y+.1,SNV.ai.pos.z);snHitCine('me',snHeadOf(SNV.me),v,()=>snResolve('me',{object:SNV.ai.hit,point:v},v,false))}await next();log.push('r'+SN.round+' pts '+SN.pts.map(Math.round));
await go();let n=0;while(SN.phase==='seek'&&n<200){if(!SN.busy){SN.ai.fx.glit=1;SN.ai.next=0}n++;await w(80)}await next();log.push('r'+SN.round+' pts '+SN.pts.map(Math.round));
await go();SN.ai.next=999;SN.t=.01;await w(300);await next();log.push('final '+SN.phase+' '+($('snEnd')?!$('snEnd').hidden:'noEnd'));
return JSON.stringify({log,errs})})()
