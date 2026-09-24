// Seven rounded petals, matching the desktop shader's seven-lobed reveal.
// CSS paths keep this scroll-driven mask lightweight on touch devices.
const PETALS=7;
const DEPTH=.22;
const SAMPLES=PETALS*4;

export function petalGeometry(stage,poster){
  const width=stage.clientWidth,height=stage.clientHeight;
  const pw=poster.offsetWidth,ph=poster.offsetHeight;
  // object-fit: cover; mobile object-position: 60% 50%.
  const imageHeight=Math.max(ph,pw/1.5),imageWidth=imageHeight*1.5;
  // The heart of the original artwork is at 77% / 45% of its pixels.
  const x=poster.offsetLeft+(pw-imageWidth)*.6+imageWidth*.77;
  const y=poster.offsetTop+(ph-imageHeight)*.5+imageHeight*.45;
  const cx=Math.min(width*.96,Math.max(width*.1,x));
  const cy=Math.min(height*.9,Math.max(height*.1,y));
  const farthest=Math.max(...[[0,0],[width,0],[0,height],[width,height]].map(([px,py])=>Math.hypot(px-cx,py-cy)));
  // Even the valleys between petals pass beyond all four corners at the end.
  return {width,height,cx,cy,radius:farthest/(1-DEPTH)*1.12};
}

export function petalPath({cx,cy,radius},progress){
  const points=Array.from({length:SAMPLES},(_,i)=>{
    const angle=i/SAMPLES*Math.PI*2-Math.PI/2;
    const r=radius*progress*(1+DEPTH*Math.cos(PETALS*(angle+Math.PI/2)));
    return [cx+Math.cos(angle)*r,cy+Math.sin(angle)*r];
  });
  const fmt=p=>p.map(n=>n.toFixed(2)).join(' ');
  let d=`M ${fmt(points[0])}`;
  // Closed Catmull-Rom spline converted to cubic Beziers: smooth petal edges.
  for(let i=0;i<SAMPLES;i++){
    const a=points[(i+SAMPLES-1)%SAMPLES],b=points[i],c=points[(i+1)%SAMPLES],e=points[(i+2)%SAMPLES];
    const first=b.map((n,k)=>n+(c[k]-a[k])/6);
    const second=c.map((n,k)=>n-(e[k]-b[k])/6);
    d+=` C ${fmt(first)} ${fmt(second)} ${fmt(c)}`;
  }
  return `path("${d} Z")`;
}
