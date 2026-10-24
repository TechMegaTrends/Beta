'use client';
import {useEffect,useRef,useState} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';

/** Decorative video and architectural depth; existing content stays semantic HTML. */
export default function V20HeroMedia(){
 const root=useRef<HTMLDivElement>(null);
 const video=useRef<HTMLVideoElement>(null);
 const reduce=useReducedMotion();
 const [siteReduced,setSiteReduced]=useState(false);
 const [playable,setPlayable]=useState(true);
 const {scrollYProgress}=useScroll({target:root,offset:['start start','end start']});
 const translate=useTransform(scrollYProgress,[0,1],[0,reduce?0:90]);
 useEffect(()=>{
  const sync=()=>setSiteReduced(document.documentElement.classList.contains('reduce-motion'));
  sync();const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  const el=video.current;if(!el)return;
  if(reduce||siteReduced){el.pause();return}
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.play().catch(()=>setPlayable(false))}else el.pause()},{threshold:.05});
  observer.observe(el);return()=>observer.disconnect();
 },[reduce,siteReduced,playable]);
 return <div ref={root} className="v20-hero-media" aria-hidden="true">
  {playable&&!reduce&&!siteReduced&&<video ref={video} className="v20-hero-film" muted loop playsInline preload="none" poster="/images/cards/saas-development.webp" onError={()=>setPlayable(false)}>
   <source src="/media/v20-hero.webm" type="video/webm"/><source src="/media/v20-hero.mp4" type="video/mp4"/>
  </video>}
  <div className="v20-hero-wash"/>
  <motion.div className="v20-hero-installation" style={{y:reduce||siteReduced?0:translate}}>
   <div className="v20-hero-orbit v20-hero-orbit-a"/><div className="v20-hero-orbit v20-hero-orbit-b"/>
   <div className="v20-hero-iris"/><div className="v20-hero-sheen"/>
  </motion.div>
  <div className="v20-hero-horizon"/>
 </div>;
}
