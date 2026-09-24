"""Reconstruct the supplied raster mark as two layers of Bezier paths.
Run with: uv run --with pillow --with numpy --with vtracer python SCRIPT INPUT OUTPUT
"""
from pathlib import Path
from tempfile import TemporaryDirectory
from PIL import Image
import numpy as np
import xml.etree.ElementTree as ET
import vtracer
import sys

source=Path(sys.argv[1]); destination=Path(sys.argv[2])
scale=4
im=Image.open(source).convert('RGB')
a=np.array(im.resize((im.width*scale,im.height*scale),Image.Resampling.LANCZOS),dtype=float)
y,x=np.indices(a.shape[:2]); y=y/scale; x=x/scale
r,g,b=np.moveaxis(a,-1,0)
light=(r+g+b)/3
brown=(((y<120)|((y>=329)&(y<370)&(x>62)&(x<420))|((y>=408)&(y<460)))&(light<171))
gold=((y>=120)&(y<325)&(b<170)&((r-b)>39))
ns='{http://www.w3.org/2000/svg}'
parts=[]
with TemporaryDirectory() as folder:
 for name,mask,color in [('ornaments-and-captions',brown,'#49392A'),('wordmark-and-accents',gold,'#A78348')]:
  png=Path(folder)/f'{name}.png'; svg=Path(folder)/f'{name}.svg'
  Image.fromarray(np.where(mask,0,255).astype('uint8'),'L').save(png)
  vtracer.convert_image_to_svg_py(str(png),str(svg),colormode='binary',mode='spline',filter_speckle=12,corner_threshold=65,length_threshold=5.0,max_iterations=10,splice_threshold=40,path_precision=2)
  traced=ET.parse(svg).getroot()
  paths=[]
  for p in traced.iter(ns+'path'):
   attrs=' '.join(f'{k}="{v}"' for k,v in p.attrib.items() if k!='fill')
   paths.append(f'    <path {attrs}/>')
  parts.append(f'  <g id="{name}" fill="{color}" transform="scale({1/scale})">\n'+ '\n'.join(paths)+'\n  </g>')
parts.append('  <g id="fine-accents" fill="none" stroke="#B79A60" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M25 349H55M428 349H456M128 390H201M282 390H353"/>\n    <path d="M241 391C235 385 224 380 216 383C210 385 211 389 215 389C219 389 220 386 217 385M241 391C247 385 258 380 266 383C272 385 271 389 267 389C263 389 262 386 265 385M241 387C236 383 239 381 241 380C243 381 246 383 241 387M237 393L241 397L245 393"/>\n  </g>')
destination.parent.mkdir(parents=True,exist_ok=True)
destination.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {im.width} {im.height}" role="img" aria-labelledby="logo-title">\n  <title id="logo-title">Beauty Obsession — Centro estetico, Boffalora d’Adda</title>\n'+ '\n'.join(parts)+'\n</svg>\n')
print(destination, destination.stat().st_size, 'bytes')
