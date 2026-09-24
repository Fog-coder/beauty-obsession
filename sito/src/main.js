import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';
import { reviews } from './content.js';

gsap.registerPlugin(ScrollTrigger,CustomEase);
const EASE=CustomEase.create('beauty','.22,1,.36,1');
gsap.defaults({ease:EASE,duration:1});
ScrollTrigger.config({ignoreMobileResize:true});
const preference=matchMedia('(prefers-reduced-motion: reduce)');
let manualPause=false,motionEnabled=!preference.matches,lenis=null,disposeMotion=()=>{};
const fine=()=>matchMedia('(hover:hover) and (pointer:fine)').matches;
const goTo=el=>{const y=typeof el==='number'?el:el.getBoundingClientRect().top+scrollY-80;if(lenis)lenis.scrollTo(y,{duration:1.25});else window.scrollTo({top:y,behavior:motionEnabled?'smooth':'instant'});};

// Native dialog handles focus trapping, Escape and background inertness.
const menu=document.querySelector('#menu-dialog'),toggle=document.querySelector('.menu-toggle');
toggle.addEventListener('click',()=>{menu.showModal();toggle.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');lenis?.stop();if(motionEnabled)gsap.fromTo('.menu-inner nav a',{y:35,opacity:0},{y:0,opacity:1,duration:.65,stagger:.07,clearProps:'all'});});
document.querySelector('.menu-close').addEventListener('click',()=>menu.close());
menu.addEventListener('close',()=>{toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');lenis?.start();toggle.focus();});
menu.addEventListener('click',e=>{if(e.target===menu)menu.close();});
const privacy=document.querySelector('.privacy-dialog');
document.querySelector('.privacy-open').addEventListener('click',()=>privacy.showModal());
document.querySelector('.privacy-close').addEventListener('click',()=>privacy.close());
privacy.addEventListener('click',e=>{if(e.target===privacy)privacy.close();});
for(const dialog of [menu,privacy])dialog.addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const items=[...dialog.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]')].filter(el=>el.getClientRects().length);
  const first=items[0],last=items.at(-1);
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.getElementById(a.hash.slice(1));if(!target)return;e.preventDefault();goTo(target);history.replaceState(null,'',a.hash);target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}));

const ritualRows=[...document.querySelectorAll('.ritual-row')],ritualPhotos=[...document.querySelectorAll('.ritual-photo')];
const activateRitual=index=>{ritualRows.forEach((r,i)=>r.classList.toggle('active',i===index));ritualPhotos.forEach((p,i)=>p.classList.toggle('active',i===index));const count=document.querySelector('[data-ritual-number]');if(count)count.textContent=String(index+1).padStart(2,'0');};
ritualRows.forEach((r,i)=>{r.addEventListener('pointerenter',()=>activateRitual(i));r.addEventListener('focus',()=>activateRitual(i));});

let reviewIndex=0;
function switchReview(direction){reviewIndex=(reviewIndex+direction+reviews.length)%reviews.length;document.querySelectorAll('[data-review]').forEach((el,i)=>{el.hidden=i!==reviewIndex;});document.querySelector('[data-review-count]').textContent=`${String(reviewIndex+1).padStart(2,'0')} / 03`;if(motionEnabled)gsap.fromTo(`[data-review="${reviewIndex}"]`,{y:12,opacity:0},{y:0,opacity:1,duration:.6,clearProps:'all'});}
document.querySelector('[data-review-prev]')?.addEventListener('click',()=>switchReview(-1));
document.querySelector('[data-review-next]')?.addEventListener('click',()=>switchReview(1));
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>ScrollTrigger.refresh()));

const form=document.querySelector('.booking-form');
if(form){
  const treatment=form.querySelector('#treatment'),availability=form.querySelector('#availability'),message=form.querySelector('#message'),status=form.querySelector('.form-status');
  const buildMessage=()=>{message.value=`Ciao Beauty Obsession! ${treatment.value?`Vorrei informazioni e un appuntamento per: ${treatment.value}.`:'Vorrei un consiglio per scegliere un trattamento e fissare un appuntamento.'}${availability.value.trim()?` La mia disponibilità: ${availability.value.trim()}.`:''} Grazie!`;status.textContent='';};
  const requested=new URLSearchParams(location.search).get('trattamento');
  if([...treatment.options].some(o=>o.value===requested)){treatment.value=requested;buildMessage();}
  treatment.addEventListener('change',buildMessage);availability.addEventListener('input',buildMessage);
  form.addEventListener('submit',async e=>{e.preventDefault();if(!message.value.trim()){status.textContent='Scrivi un messaggio prima di copiarlo.';message.focus();return;}try{await navigator.clipboard.writeText(message.value);status.textContent='Messaggio copiato. Apri Instagram e incollalo nella chat.';}catch{message.focus();message.select();status.textContent='Seleziona e copia il testo, poi apri Instagram.';}});
}

function setupMotion(){
  motionEnabled=!manualPause&&!preference.matches;
  document.documentElement.classList.toggle('motion-static',!motionEnabled);
  const motionButton=document.querySelector('.motion-toggle');
  if(motionButton){motionButton.setAttribute('aria-pressed',String(!motionEnabled));motionButton.setAttribute('aria-label',motionEnabled?'Pausa movimento':'Attiva movimento');motionButton.innerHTML=motionEnabled?'Pausa movimento <span aria-hidden="true">Ⅱ</span>':'Attiva movimento <span aria-hidden="true">▷</span>';}
  if(!motionEnabled)return ()=>{};
  let bloom=null,cancelled=false;
  let ticker;
  if(fine()){lenis=new Lenis({duration:1.12,smoothWheel:true,syncTouch:false});lenis.on('scroll',ScrollTrigger.update);ticker=t=>lenis?.raf(t*1000);gsap.ticker.add(ticker);gsap.ticker.lagSmoothing(0);}
  const context=gsap.context(()=>{
    const hero=document.querySelector('.hero');
    if(hero){
      const state={progress:0};
      const chapter=hero.querySelector('.hero-chapter');
      const chapterLink=chapter.querySelector('a');
      const art=hero.querySelector('.hero-art');
      let sceneRequested=false;
      const requestScene=()=>{
        if(sceneRequested||cancelled)return;sceneRequested=true;
        // Touch uses the same cinematic iris composition without a GL startup.
        if(!fine()||innerWidth<768)return;
        import('./bloom.js').then(async({createBloom})=>{if(cancelled)return;let created;try{created=await createBloom(document.querySelector('#bloom-canvas'));}catch{return;}if(cancelled){created.dispose();return;}bloom=created;bloom.setProgress(state.progress);}).catch(()=>{});
      };
      const mobile=innerWidth<768;
      const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'bloom-story',trigger:hero,start:'top top',end:()=>`+=${innerHeight*(innerWidth<768?1.75:2.35)}`,pin:'.hero-stage',scrub:.65,anticipatePin:1,invalidateOnRefresh:true,onUpdate:st=>{if(st.progress>0)requestScene();const accessible=st.progress>.64;chapter.setAttribute('aria-hidden',String(!accessible));chapterLink.tabIndex=accessible?0:-1;}}});
      tl.to(state,{progress:1,duration:1,onUpdate:()=>bloom?.setProgress(state.progress)},0)
        .to('.hero-content',{y:-60,autoAlpha:0,duration:.14},.04)
        .to('.hero-foot',{autoAlpha:0,duration:.08},.06)
        .fromTo('.hero-interlude',{scale:.85,autoAlpha:0},{scale:1,autoAlpha:1,duration:.1},.23)
        .to('.hero-interlude',{scale:1.15,autoAlpha:0,duration:.12},.41)
        .fromTo(chapter,{y:50,autoAlpha:0},{y:0,autoAlpha:1,duration:.16},.65)
        .to('.hero-wash',{opacity:mobile?.9:.7,duration:.2},.55)
        .fromTo('.hero-destination',{clipPath:'circle(0% at 72% 50%)'},{clipPath:'circle(140% at 72% 50%)',duration:.48},.32);
      // A meaningful visual fallback also works if WebGL is unavailable.
      tl.to('.hero-poster',{scale:1.22,rotation:4,duration:.8},0);
      if(scrollY<15){gsap.from('.hero-content h1 span,.hero-content h1 em',{y:45,duration:1.35,stagger:.11,clearProps:'all'});gsap.from('.hero-content>.eyebrow,.hero-bottom',{y:15,duration:1,delay:.2,stagger:.1,clearProps:'all'});gsap.from(art,{scale:1.035,duration:1.9,clearProps:'transform'});}
    }
    // All subsequent triggers are created after the hero pin.
    document.querySelectorAll('[data-reveal]').forEach(el=>gsap.from(el,{y:35,opacity:0,duration:1.1,scrollTrigger:{trigger:el,start:'top 91%',once:true},clearProps:'all'}));
    document.querySelectorAll('.media-reveal img').forEach(el=>gsap.fromTo(el,{scale:1.09},{scale:1,duration:1.3,scrollTrigger:{trigger:el.parentElement,start:'top 92%',end:'bottom 25%',scrub:1}}));
    document.querySelectorAll('.word-reveal').forEach(el=>{
      if(!el.dataset.split){const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const texts=[];while(walker.nextNode())texts.push(walker.currentNode);for(const node of texts){const f=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(s=>{if(!s.trim())f.append(document.createTextNode(s));else{const word=document.createElement('span');word.className='word';word.textContent=s;f.append(word);}});node.replaceWith(f);}el.dataset.split='true';}
      gsap.fromTo(el.querySelectorAll('.word'),{opacity:.78},{opacity:1,stagger:.13,ease:'none',scrollTrigger:{trigger:el,start:'top 88%',end:'bottom 58%',scrub:.4}});
    });
    document.querySelectorAll('.treatment-area').forEach(area=>ScrollTrigger.create({trigger:area,start:'top 40%',end:'bottom 40%',onToggle:st=>{document.querySelector(`.area-nav a[href="#${area.id}"]`)?.classList.toggle('active',st.isActive);}}));
    if(fine())document.querySelectorAll('.button').forEach(button=>{
      const xTo=gsap.quickTo(button,'x',{duration:.65,ease:EASE}),yTo=gsap.quickTo(button,'y',{duration:.65,ease:EASE});
      const move=e=>{const rect=button.getBoundingClientRect();xTo((e.clientX-rect.left-rect.width/2)*.08);yTo((e.clientY-rect.top-rect.height/2)*.12);};
      const leave=()=>{xTo(0);yTo(0);};button.addEventListener('pointermove',move);button.addEventListener('pointerleave',leave);
      contextCleanups.push(()=>{button.removeEventListener('pointermove',move);button.removeEventListener('pointerleave',leave);});
    });
  });
  document.fonts.ready.then(()=>{if(!cancelled)ScrollTrigger.refresh();});
  return ()=>{cancelled=true;bloom?.dispose();context.revert();contextCleanups.splice(0).forEach(fn=>fn());if(ticker)gsap.ticker.remove(ticker);lenis?.destroy();lenis=null;};
}
const contextCleanups=[];
disposeMotion=setupMotion();
document.querySelector('.motion-toggle')?.addEventListener('click',()=>{manualPause=!manualPause;disposeMotion();window.scrollTo(0,0);disposeMotion=setupMotion();ScrollTrigger.refresh();});
preference.addEventListener('change',()=>{disposeMotion();disposeMotion=setupMotion();ScrollTrigger.refresh();});
// Width changes rebuild the scene's responsive timings. Mobile address-bar
// changes do not tear down or restart the scroll narrative.
let previousWidth=innerWidth,resizeTimer;
addEventListener('resize',()=>{if(Math.abs(innerWidth-previousWidth)<80)return;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{previousWidth=innerWidth;disposeMotion();disposeMotion=setupMotion();ScrollTrigger.refresh();},220);});
addEventListener('pagehide',()=>disposeMotion());
addEventListener('pageshow',e=>{if(e.persisted){disposeMotion=setupMotion();ScrollTrigger.refresh();}});
addEventListener('load',()=>{ScrollTrigger.refresh();if(location.hash){const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el)setTimeout(()=>{if(lenis)lenis.scrollTo(el,{immediate:true,offset:-80});else window.scrollTo(0,el.getBoundingClientRect().top+scrollY-80);},100);}});
