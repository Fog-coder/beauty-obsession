from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
from urllib.request import urlopen
import json
import os
base=Path(__file__).resolve().parent.parent/'dist'
prefix=os.environ.get('SITE_BASE','/')
port=os.environ.get('PREVIEW_PORT','4174')
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(); self.links=[];self.ids=set();self.h1=0;self.images=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='img':self.images.append(a.get('src',''))
  if tag=='h1':self.h1+=1
pages={('/'+str(p.parent.relative_to(base))+'/').replace('/./','/'):Page(p.read_text()) for p in base.rglob('*.html')}
errors=[]
for route,page in pages.items():
 if page.h1!=1:errors.append([route,'H1 count',page.h1])
 status=urlopen('http://127.0.0.1:'+port+prefix+route.lstrip('/')).status
 if status!=200:errors.append([route,'HTTP',status])
 for link in page.links:
  u=urlparse(link)
  if u.scheme or u.netloc:continue
  if u.path and not u.path.startswith(prefix):errors.append([route,'outside base',link]);continue
  target=('/'+u.path[len(prefix):]) if u.path else route
  if target not in pages:errors.append([route,'missing route',link]);continue
  if u.fragment and unquote(u.fragment) not in pages[target].ids:errors.append([route,'missing anchor',link])
 for image in page.images:
  if not image.startswith(prefix) or not (base/image[len(prefix):]).exists():errors.append([route,'missing image',image])
print(json.dumps({'pages':len(pages),'internal_links_and_images':'pass' if not errors else 'fail','errors':errors},indent=2))
raise SystemExit(bool(errors))
