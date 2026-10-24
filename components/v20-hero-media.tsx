'use client';
import {useEffect,useRef,useState} from 'react';
import {useReducedMotion} from 'motion/react';
export default function V20HeroMedia(){
 const video=useRef<HTMLVideoElement>(null);
 const reduced=useReducedMotion();
 const [siteReduced,setSiteReduced]=useState(false);
 const [unavailable,setUnavailable]=useState(false);
 useEffect(()=>{const sync=()=>setSiteReduced(document.documentElement.classList.contains('reduce-motion'));sync();const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});return()=>observer.disconnect()},[]);
 useEffect(()=>{const el=video.current;if(!el||reduced||siteReduced||unavailable){el?.pause();return}const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)el.play().catch(()=>setUnavailable(true));else el.pause()},{threshold:.05});observer.observe(el);return()=>observer.disconnect()},[reduced,siteReduced,unavailable]);
 return <div className="v20-hero-media" aria-hidden="true"><div className="v20-london-poster"/>
 {!reduced&&!siteReduced&&!unavailable&&<video ref={video} className="v20-hero-film" muted playsInline loop preload="metadata" poster="/media/v20-hero-poster.jpg" onError={()=>setUnavailable(true)}><source src="/media/v20-hero.webm" type="video/webm"/><source src="/media/v20-hero.mp4" type="video/mp4"/></video>}
 <div className="v20-hero-wash"/><div className="v20-hero-horizon"/></div>;
}
