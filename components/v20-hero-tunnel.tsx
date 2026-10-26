'use client';
import {useEffect,useRef} from 'react';
// 3D light-tube tunnel: square frames of glowing tubes spiral toward the viewer on a seamless loop.
const FRAMES=16;
export default function V20HeroTunnel(){
 const scene=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=scene.current;if(!el||!window.matchMedia('(hover:hover)').matches)return;let raf=0;
  const move=(e:PointerEvent)=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;el.style.setProperty('--tilt-x',`${(-y*8).toFixed(2)}deg`);el.style.setProperty('--tilt-y',`${(x*10).toFixed(2)}deg`)})};
  window.addEventListener('pointermove',move,{passive:true});return()=>{window.removeEventListener('pointermove',move);cancelAnimationFrame(raf)}},[]);
 return <div className="v20-hero-media v20-tunnel-stage" aria-hidden="true">
  <div className="v20-london-poster"/><div className="v20-tunnel-mist"/>
  <div className="v20-tunnel" ref={scene}><div className="v20-tunnel-track">
   {Array.from({length:FRAMES},(_,i)=><div className="v20-tunnel-frame" key={i} style={{animationDelay:`${-i*(24/FRAMES)}s`}}><i/><i/><i/><i/></div>)}
  </div></div>
  <div className="v20-tunnel-floor"/><div className="v20-hero-wash"/><div className="v20-hero-horizon"/>
 </div>;
}
