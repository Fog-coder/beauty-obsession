// Lightweight refractive artwork surface. No scene graph or model download.
const FRAGMENT = `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uFlower; uniform sampler2D uSkin;
    uniform float uProgress; uniform float uTime; uniform float uAspect; uniform float uMobile;
    uniform vec2 uPointer;
    vec2 cover(vec2 uv,float imageAspect,float boxAspect){
      vec2 s=vec2(min(boxAspect/imageAspect,1.0),min(imageAspect/boxAspect,1.0));
      return (uv-.5)*s+.5;
    }
    void main(){
      float p=uProgress;
      vec2 uv=vUv;
      vec2 centre=vec2(.72,.5);
      vec2 delta=uv-centre;
      float r=length(delta*vec2(uAspect,1.0));
      float a=atan(delta.y,delta.x);
      float life=sin(uTime*.45+r*8.)*.0018;
      float surge=sin(clamp(p,0.,1.)*3.14159265);
      vec2 bend=delta*(.025*surge*sin(a*5.+p*7.-r*6.));
      vec2 offset=(uPointer-.5)*.008;
      float zoom=1.+p*.58;
      vec2 flowerUv=(uv-centre)/zoom+centre+bend+offset+vec2(life,life*.4);
      vec2 fuv=cover(flowerUv,1.5,uAspect);
      vec3 one=texture2D(uFlower,clamp(fuv,.001,.999)).rgb;
      float angle=a+.14*sin(a*3.+p*3.);
      float petalRadius=r + sin(angle*7.+r*3.-p*5.)*.07*surge;
      float reveal=smoothstep(.32,.84,p)*2.1;
      float mask=1.-smoothstep(reveal-.09,reveal+.06,petalRadius+.06);
      mask*=smoothstep(.23,.34,p);
      vec2 suv=uv;
      suv.x=(uv.x-.4)/.6;
      suv=cover(suv,.75,uAspect*.6);
      suv+=vec2(-.04*p,.025*p);
      vec3 two=texture2D(uSkin,clamp(suv,.001,.999)).rgb;
      float fade=smoothstep(.31,.66,uv.x);
      vec3 ivory=vec3(.969,.933,.91);
      two=mix(ivory,two,fade);
      float edge=exp(-pow((petalRadius-reveal)*17.,2.))*surge*.22;
      vec3 col=mix(one,two,mask);
      col+=edge*vec3(.34,.23,.1);
      gl_FragColor=vec4(col,1.);
    }`;
const VERTEX = `attribute vec2 aPosition; varying vec2 vUv; void main(){vUv=aPosition*.5+.5;gl_Position=vec4(aPosition,0.,1.);}`;
const loadImage = src => new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Immagine non disponibile'));img.src=src;});

export async function createBloom(canvas) {
  const images=await Promise.all([loadImage(`${import.meta.env.BASE_URL}media/fiore.webp`),loadImage(`${import.meta.env.BASE_URL}media/pelle.webp`)]);
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power',preserveDrawingBuffer:false});
  if(!gl)throw new Error('WebGL non disponibile');
  const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(s);gl.deleteShader(s);throw new Error(error);}return s;};
  const vs=compile(gl.VERTEX_SHADER,VERTEX),fs=compile(gl.FRAGMENT_SHADER,FRAGMENT);
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const names=['uFlower','uSkin','uProgress','uTime','uPointer','uAspect','uMobile'];
  const uniforms=Object.fromEntries(names.map(name=>[name,gl.getUniformLocation(program,name)]));
  const textures=images.map((img,i)=>{const texture=gl.createTexture();gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,img);return texture;});
  gl.uniform1i(uniforms.uFlower,0);gl.uniform1i(uniforms.uSkin,1);
  let alive=true,visible=true,raf=0,last=0,progress=0,x=.5,y=.5,targetX=.5,targetY=.5;
  const stage=canvas.closest('.hero-stage');
  const size=()=>{const box=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,innerWidth<768?1.35:1.7);if(box.width&&box.height){const w=Math.round(box.width*dpr),h=Math.round(box.height*dpr);if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;gl.viewport(0,0,canvas.width,canvas.height);gl.uniform1f(uniforms.uAspect,box.width/box.height);gl.uniform1f(uniforms.uMobile,innerWidth<768?1:0);}};
  const observer=new ResizeObserver(size);observer.observe(canvas.parentElement);size();
  const draw=t=>{gl.uniform1f(uniforms.uProgress,progress);gl.uniform1f(uniforms.uTime,t*.001);gl.uniform2f(uniforms.uPointer,x,y);gl.drawArrays(gl.TRIANGLES,0,6);};
  const tick=t=>{if(!alive||!visible||document.hidden){raf=0;return;}raf=requestAnimationFrame(tick);if(t-last<1000/(innerWidth<768?40:60))return;last=t;x+=(targetX-x)*.06;y+=(targetY-y)*.06;draw(t);};
  const wake=()=>{if(alive&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(tick);};
  const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;wake();},{rootMargin:'60px'});intersection.observe(canvas);
  document.addEventListener('visibilitychange',wake);
  const pointer=e=>{if(e.pointerType!=='mouse')return;targetX=e.clientX/innerWidth;targetY=1-e.clientY/innerHeight;};
  const leave=()=>{targetX=.5;targetY=.5;};
  stage.addEventListener('pointermove',pointer,{passive:true});stage.addEventListener('pointerleave',leave);
  const lost=e=>{e.preventDefault();visible=false;canvas.parentElement.classList.remove('is-ready');};canvas.addEventListener('webglcontextlost',lost);
  draw(0);wake();canvas.parentElement.classList.add('is-ready');
  return {setProgress:p=>{progress=p;wake();},dispose(){alive=false;cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',wake);stage.removeEventListener('pointermove',pointer);stage.removeEventListener('pointerleave',leave);canvas.removeEventListener('webglcontextlost',lost);canvas.parentElement.classList.remove('is-ready');textures.forEach(t=>gl.deleteTexture(t));gl.deleteBuffer(buffer);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs);}};
}
