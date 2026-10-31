'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
// Cinematic "viewfinder" hero with an explainer tour: an isometric studio cutaway, then one room per process step.
const chapters=[
 {id:'studio',label:'The studio',caption:'Welcome to TechMegaTrends.'},
 {id:'discover',label:'Discover',caption:'We start by understanding your goals, users and challenges.'},
 {id:'design',label:'Design',caption:'Then we shape the experience and the technical approach.'},
 {id:'build',label:'Build securely',caption:'We engineer, test and integrate with security built in.'},
 {id:'launch',label:'Launch & grow',caption:'And we deliver, support and scale what comes next.'},
];
const pad=(n:number)=>String(n).padStart(2,'0');
const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('reduce-motion');
export default function V20CinemaHero(){
 const [active,setActive]=useState(0);
 const [progress,setProgress]=useState(0);
 const [still,setStill]=useState(false);
 const hero=useRef<HTMLElement>(null);
 const videos=useRef<(HTMLVideoElement|null)[]>([]);
 const clock=useRef<HTMLSpanElement>(null);
 const inView=useRef(true);
 useEffect(()=>{setStill(reducedMotion());const sync=()=>setStill(reducedMotion());const mo=new MutationObserver(sync);mo.observe(document.documentElement,{attributes:true,attributeFilter:['class']});return()=>mo.disconnect()},[]);
 // Play only the active chapter, and only while the hero is on screen.
 // Inactive clips are rewound so a clip left at its end can't fire "ended" the moment it becomes active again.
 useEffect(()=>{videos.current.forEach((v,i)=>{if(!v)return;if(i!==active){v.pause();if(v.currentTime)v.currentTime=0;return}if(still||!inView.current){v.pause();return}v.currentTime=0;v.play().catch(()=>setStill(true))});setProgress(0)},[active,still]);
 useEffect(()=>{const el=hero.current;if(!el)return;const io=new IntersectionObserver(([e])=>{inView.current=e.isIntersecting;const v=videos.current[active];if(!v||still)return;e.isIntersecting?v.play().catch(()=>{}):v.pause()},{threshold:.15});io.observe(el);return()=>io.disconnect()},[active,still]);
 useEffect(()=>{const el=clock.current;if(!el||still)return;const start=performance.now();let raf=0;
  const tick=()=>{const t=(performance.now()-start)/1000;el.textContent=`${pad(Math.floor(t/3600))}:${pad(Math.floor(t/60)%60)}:${pad(Math.floor(t)%60)}:${pad(Math.floor((t%1)*24))}`;raf=requestAnimationFrame(tick)};
  raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf)},[still]);
 const next=(active+1)%chapters.length;
 return <section ref={hero} className="cine-hero" aria-labelledby="cine-hero-title">
  <div className="cine-tour" aria-hidden="true">
   {chapters.map((c,i)=><video key={c.id} ref={el=>{videos.current[i]=el}} className={i===active?'is-active':''} muted playsInline preload={i===active||i===next?'auto':'none'} poster={`/media/tour/${c.id}.webp`}
    onTimeUpdate={e=>{if(i===active)setProgress(e.currentTarget.currentTime/(e.currentTarget.duration||5))}} onEnded={e=>{if(i===active&&e.currentTarget.currentTime>1)setActive(next)}}>
    <source src={`/media/tour/${c.id}.webm`} type="video/webm"/><source src={`/media/tour/${c.id}.mp4`} type="video/mp4"/></video>)}
   <div className="cine-tour-shade"/>
  </div>
  <div className="cine-grain" aria-hidden="true"/>
  <div className="cine-frame container">
   <i className="cine-corner cine-corner-tl" aria-hidden="true"/><i className="cine-corner cine-corner-tr" aria-hidden="true"/>
   <div className="cine-meta cine-reveal" style={{'--d':'0ms'} as React.CSSProperties}><span><b className="cine-dot"/>How we work</span><span>{pad(active+1)} / {pad(chapters.length)} · {chapters[active].label}</span></div>
   <div className="cine-body">
    <h1 id="cine-hero-title" className="cine-title"><span className="cine-reveal" style={{'--d':'120ms'} as React.CSSProperties}>We engineer</span><em className="cine-reveal" style={{'--d':'260ms'} as React.CSSProperties}>what’s next.</em></h1>
    <aside className="cine-synopsis cine-reveal" style={{'--d':'420ms'} as React.CSSProperties}>
     <p className="cine-label">Synopsis</p>
     <p>Turning complex challenges into intelligent digital solutions. We build software, SaaS platforms, AI automation, secure cloud solutions and exceptional digital experiences.</p>
     <div className="cine-actions"><Link className="cine-btn cine-btn-accent" href="/contact">Start your project <ArrowUpRight size={15}/></Link><Link className="cine-btn" href="/portfolio">Explore our work</Link></div>
    </aside>
   </div>
   <p className="cine-caption" aria-hidden="true" key={chapters[active].id}>{chapters[active].caption}</p>
   <nav className="cine-chapters cine-reveal" style={{'--d':'560ms'} as React.CSSProperties} aria-label="How we work">
    {chapters.map((c,i)=><button key={c.id} type="button" className={i===active?'is-active':i<active?'is-done':''} aria-current={i===active?'step':undefined} onClick={()=>setActive(i)}>
     <span className="cine-chapter-bar"><i style={{transform:`scaleX(${i===active?(still?1:progress):i<active?1:0})`}}/></span>
     <span className="cine-chapter-label"><b>{pad(i+1)}</b><span> {c.label}</span></span>
    </button>)}
   </nav>
  </div>
  <div className="cine-edge" aria-hidden="true"><span ref={clock}>00:00:00:00</span></div>
 </section>;
}
