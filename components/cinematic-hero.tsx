'use client';
import {useEffect,useRef,useState} from 'react';

/** Progressive enhancement: the page is usable without video, JavaScript or motion. */
export default function CinematicHero(){
 const ref=useRef<HTMLDivElement>(null);
 const [videoOK,setVideoOK]=useState(true);
 const [motionOK,setMotionOK]=useState(false);
 useEffect(()=>{
   const query=window.matchMedia('(prefers-reduced-motion: reduce)');
   const fine=window.matchMedia('(pointer: fine)');
   const sync=()=>setMotionOK(!query.matches && fine.matches && !document.documentElement.classList.contains('reduce-motion'));
   sync();query.addEventListener('change',sync);fine.addEventListener('change',sync);
   const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
   return()=>{query.removeEventListener('change',sync);fine.removeEventListener('change',sync);observer.disconnect()};
 },[]);
 const move=(event:React.PointerEvent<HTMLDivElement>)=>{
   if(!motionOK||!ref.current)return;
   const box=ref.current.getBoundingClientRect();
   const x=((event.clientX-box.left)/box.width-.5)*2;
   const y=((event.clientY-box.top)/box.height-.5)*2;
   ref.current.style.setProperty('--v18-x',x.toFixed(3));
   ref.current.style.setProperty('--v18-y',y.toFixed(3));
 };
 const reset=()=>{ref.current?.style.setProperty('--v18-x','0');ref.current?.style.setProperty('--v18-y','0')};
 return <div className="v18-cinema" ref={ref} onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
  {videoOK&&<video className="v18-video" autoPlay muted loop playsInline preload="none" poster="/images/cards/saas-development.webp" onError={()=>setVideoOK(false)}>
    <source src="/media/techmegatrends-dreamcore-hero.webm" type="video/webm"/>
    <source src="/media/techmegatrends-dreamcore-hero.mp4" type="video/mp4"/>
  </video>}
  <div className="v18-nebula"/>
  <div className="v18-glass-object">
   <span className="v18-glass v18-glass-outer"/><span className="v18-glass v18-glass-inner"/>
   <span className="v18-glass-core"/><span className="v18-glass-shine"/>
  </div>
  <div className="v18-floor"/><div className="v18-vignette"/>
 </div>;
}
