'use client';
import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Instrument_Serif,JetBrains_Mono} from 'next/font/google';
// Cinematic "viewfinder" hero: film frame corners, reel meta bar, running timecode, serif headline, synopsis column and stat row.
const serif=Instrument_Serif({subsets:['latin'],weight:'400',style:['normal','italic'],variable:'--cine-serif',display:'swap'});
const mono=JetBrains_Mono({subsets:['latin'],weight:['400','500'],variable:'--cine-mono',display:'swap'});
const stats=[{label:'Specialist services',value:'7'},{label:'Connected divisions',value:'3'},{label:'Registered in',value:'the UK'}];
const pad=(n:number)=>String(n).padStart(2,'0');
export default function V20CinemaHero(){
 const clock=useRef<HTMLSpanElement>(null);
 useEffect(()=>{const el=clock.current;if(!el)return;const start=performance.now();let raf=0;
  const tick=()=>{const t=(performance.now()-start)/1000,f=Math.floor((t%1)*24);el.textContent=`${pad(Math.floor(t/3600))}:${pad(Math.floor(t/60)%60)}:${pad(Math.floor(t)%60)}:${pad(f)}`;raf=requestAnimationFrame(tick)};
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('reduce-motion'))return;
  raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[]);
 return <section className={`cine-hero ${serif.variable} ${mono.variable}`} aria-labelledby="cine-hero-title">
  <div className="cine-grain" aria-hidden="true"/>
  <div className="cine-frame container">
   <i className="cine-corner cine-corner-tl" aria-hidden="true"/><i className="cine-corner cine-corner-tr" aria-hidden="true"/>
   <div className="cine-meta cine-reveal" style={{'--d':'0ms'} as React.CSSProperties}><span><b className="cine-dot"/>Reel 01 · Digital product studio</span><span>Software · AI · Cloud · Security</span></div>
   <div className="cine-body">
    <h1 id="cine-hero-title" className="cine-title"><span className="cine-reveal" style={{'--d':'120ms'} as React.CSSProperties}>We engineer</span><em className="cine-reveal" style={{'--d':'260ms'} as React.CSSProperties}>what’s next.</em></h1>
    <aside className="cine-synopsis cine-reveal" style={{'--d':'420ms'} as React.CSSProperties}>
     <p className="cine-label">Synopsis</p>
     <p>Turning complex challenges into intelligent digital solutions. We build software, SaaS platforms, AI automation, secure cloud solutions and exceptional digital experiences.</p>
     <div className="cine-actions"><Link className="cine-btn cine-btn-accent" href="/contact">Start your project <ArrowUpRight size={15}/></Link><Link className="cine-btn" href="/portfolio">Explore our work</Link></div>
    </aside>
   </div>
   <dl className="cine-stats cine-reveal" style={{'--d':'560ms'} as React.CSSProperties}>{stats.map((s,i)=><div key={s.label}><dt><b>{pad(i+1)}</b> {s.label}</dt><dd>{s.value}</dd></div>)}</dl>
  </div>
  <div className="cine-edge" aria-hidden="true"><span ref={clock}>00:00:00:00</span><span>Reel 01</span></div>
 </section>;
}
