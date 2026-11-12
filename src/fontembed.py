# 게임에 쓰인 글자만 잘라 Jua·고운돋움 글꼴을 파일 안에 넣어요 (인터넷 없이도 같은 글씨체)
import base64, io, re, sys
from fontTools import subset
from fontTools.ttLib import TTFont
def sub(path, text):
    opts=subset.Options(); opts.flavor='woff2'; opts.layout_features=['*']
    f=TTFont(path); s=subset.Subsetter(opts); s.populate(text=text); s.subset(f)
    b=io.BytesIO(); f.flavor='woff2'; f.save(b); return base64.b64encode(b.getvalue()).decode()
def embed(html):
    chars=set(html)|set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz !?.,:;·…%+-×/()[]'\"~—–")
    text=''.join(sorted(c for c in chars if ord(c)>=32))
    # 친구 이름 등 사람이 쓰는 글자도 같은 굵은 글씨로 보이게: 자주 쓰는 한글 2350자 + 자모
    ks=''.join(bytes([a,b]).decode('euc-kr') for a in range(0xB0,0xC9) for b in range(0xA1,0xFF))+''.join(chr(c) for c in range(0x3131,0x3164))
    j=sub('fonts/Jua-Regular.ttf',''.join(sorted(set(text)|set(ks))))
    face="<style>@font-face{font-family:'Jua';src:url(data:font/woff2;base64,%s) format('woff2');font-display:block}"%j
    if 'Gowun Dodum' in html: face+="@font-face{font-family:'Gowun Dodum';src:url(data:font/woff2;base64,%s) format('woff2');font-display:block}"%sub('fonts/GowunDodum-Regular.ttf',text)
    face+="</style>\n"
    html=re.sub(r'<link rel="preconnect"[^>]*>\n?','',html)
    html=re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>\n?','',html)
    i=html.index('<style>'); return html[:i]+face+html[i:]
if __name__=='__main__':
    src,dst=sys.argv[1],sys.argv[2]; h=embed(open(src).read()); open(dst,'w').write(h); print(dst,len(h))
