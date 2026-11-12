# 빌드: python3 src/build.py  →  저장소 맨 위 index.html, sw.js 를 새로 만들어요
# src/app.txt = maze | rg | sn,  src/patch.txt = 패치 번호 (올릴 때마다 +1)
import os,sys,subprocess,re,json,base64
H=os.path.dirname(os.path.abspath(__file__));R=os.path.dirname(H);os.chdir(H)
APP=open('app.txt').read().strip();PATCH=open('patch.txt').read().strip()
subprocess.check_call([sys.executable,'patch28.py'],env=dict(os.environ,APP=APP))
from fontembed import embed
s=open('mz/v28.html').read()
open('mz/v28e.html','w').write(embed(s))   # 미리보기·테스트용 한 파일 (tests/probe4.js 가 씀)
i=s.rfind('<script>');j=s.rfind('</script>');open('last.js','w').write(s[i+8:j]);subprocess.check_call(['node','--check','last.js']);print('SYNTAX_OK')
NAME={'maze':'쿠쿠드','rg':'달콤 공방전','sn':'달콤 저격전'}[APP]
PFX={'maze':'sweet-witch-v','rg':'sw-gongbang-v','sn':'sw-sniper-v'}[APP]
vend='<script src="vendor/three.min.js"></script>\n<script src="vendor/GLTFLoader.js"></script>';assert vend in s
b64=lambda f:base64.b64encode(open(os.path.join(R,f),'rb').read()).decode()
LINKS='<link rel="apple-touch-icon" href="data:image/png;base64,'+b64('apple-touch-icon.png')+'">\n<link rel="icon" type="image/png" href="data:image/png;base64,'+b64('icon-192.png')+'">\n<meta name="theme-color" content="#ff5f9e">\n'
def doc(body):
    i=body.index('<style>');head=body[:i];rest=body[i:];j=rest.index('</style>')+len('</style>')
    return '<!doctype html>\n<html lang="ko">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'+LINKS+head+rest[:j]+'\n</head>\n<body>\n'+rest[j:]+'\n</body>\n</html>\n'
web=s.replace(vend,'<script>window.__ASSETS={hero:"models/hero.glb",anim:"models/anim.glb",music:"music/"};window.__peerjsURL="vendor/peerjs.min.js";</script>\n'+vend)
t=embed(doc(web))
PH='<link rel="manifest" href="manifest.webmanifest">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="'+NAME+'">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n<script>if(\'serviceWorker\' in navigator&&isSecureContext)addEventListener(\'load\',()=>navigator.serviceWorker.register(\'sw.js\').catch(()=>{}));</script>\n'
a='<meta charset="utf-8">\n';assert t.count(a)==1;t=t.replace(a,a+PH,1)
open(os.path.join(R,'index.html'),'w').write(t)
files=[]
for d,_,fs in os.walk(R):
    if '/.git' in d or d.startswith(H):continue
    for f in fs:
        p=os.path.relpath(os.path.join(d,f),R)
        if p.split('.')[-1] in('png','html','webmanifest','glb','mp3','js') and p!='sw.js':files.append(p)
sw=open('sw_template.js').read().replace('__PFX__',PFX).replace('__PATCH__',PATCH).replace('__FILES__',json.dumps(sorted(files),ensure_ascii=False))
open(os.path.join(R,'sw.js'),'w').write(sw);print('built',APP,'p'+PATCH,len(t))
