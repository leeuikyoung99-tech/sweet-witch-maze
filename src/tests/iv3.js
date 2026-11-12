(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));snStart({});await w(2000);const out=[];
for(const key of['low','high']){const vk=snOpp(key),VZ=SN_Z[vk],vb=VZ.y+.14,vo=SNV.obs[vk];const eyes=[];let g=0;while(eyes.length<20&&g<500){g++;const x=VZ.cx+snR(-VZ.w/2+1,VZ.w/2-1),z=VZ.cz+VZ.dir*(VZ.d/2-snR(1,6)),y=vb+snR(.25,.85);if(vo.some(q=>q.top>y-.1&&snObsD(q,x,z)<.15))continue;eyes.push(new THREE.Vector3(x,y,z))}
 for(const it of SNV.items[key]){const c=it.sp.position.clone();c.y+=.1;let n=0;for(const e of eyes){const d=c.clone().sub(e);const L=d.length();snRay.set(e,d.normalize());snRay.far=L-.35;if(!snRay.intersectObjects(SNV.occ[key].concat(SNV.occ[vk]),false).length)n++}snRay.far=Infinity;out.push(it.k+SN_IT[it.k].t+':'+n+'/'+eyes.length)}}
return out.join(' ')})()
