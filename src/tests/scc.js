(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));snStart({ail:1});await w(2600);document.querySelectorAll('#ntBox .nt').forEach(n=>n.remove());SN.t=.01;await w(2500);SN.scope=1;snSync();await w(400);$('snMsg').classList.remove('show');
const sc=$('snScope');const R=parseFloat(getComputedStyle(sc).getPropertyValue('--R'))||0;const tmp=document.createElement('div');tmp.style.cssText='position:fixed;width:var(--R)';sc.appendChild(tmp);const Rp=tmp.getBoundingClientRect().width;tmp.remove();
const cx=innerWidth/2,cy=innerHeight/2;const out=['R='+Rp.toFixed(0)];
const hit=(r,q)=>{// circle vs rect
const nx=Math.max(r.left,Math.min(cx,r.right)),ny=Math.max(r.top,Math.min(cy,r.bottom));const d=Math.hypot(nx-cx,ny-cy);if(d<Rp)out.push('CIRCLE x '+q+' d='+d.toFixed(0))};
const rs=[];for(const q of ['.sn-sc','#snPip','.sn-it','.sn-tm','#snX','#snBig','#snA1','#snA2','#snA3','#snA5','#snA6','#snA7','#snMvL','#snJh','#snZs','#snTip'])for(const e of document.querySelectorAll('#snHud '+q)){const r=e.getBoundingClientRect();if(r.width<2||getComputedStyle(e).visibility=='hidden'||!(e.offsetParent||getComputedStyle(e).position=='fixed'))continue;if(q!='#snZs')hit(r,q);rs.push([q,r])}
for(let i=0;i<rs.length;i++)for(let j=i+1;j<rs.length;j++){const a=rs[i][1],b=rs[j][1];if(a.left<b.right-1&&b.left<a.right-1&&a.top<b.bottom-1&&b.top<a.bottom-1&&!rs[i][1].__)out.push('OV '+rs[i][0]+' '+rs[j][0])}
const z=document.querySelector('#snZs');if(z){const zr=z.getBoundingClientRect(),br=$('snBig')?.getBoundingClientRect();out.push('zs '+zr.left.toFixed(0)+'-'+zr.right.toFixed(0)+' y'+zr.top.toFixed(0)+'-'+zr.bottom.toFixed(0)+(br?' fire '+br.left.toFixed(0)+' gap '+(br.left-zr.right).toFixed(0):''))}
for(const q of ['.sn-it','.sn-sc','.sn-tm'])for(const e of document.querySelectorAll('#snHud '+q)){const r=e.getBoundingClientRect();out.push(q+' '+r.left.toFixed(0)+'-'+r.right.toFixed(0)+' y'+r.top.toFixed(0)+'-'+r.bottom.toFixed(0))}
return out.join('\n')})()
