'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,ArrowDown,Monitor,Smartphone,Workflow,ShieldCheck,Cloud,Layers3} from 'lucide-react';
const scenes=[
 {number:'01',tag:'SAAS PLATFORMS',name:'Software that works for you.',detail:'Custom platforms, connected dashboards, subscription products and client portals.',icon:Layers3,kind:'saas',slug:'saas-development',image:'/images/cards/saas-development.webp'},
 {number:'02',tag:'WEB EXPERIENCES',name:'Websites with a pulse.',detail:'High-impact websites, dynamic web apps, booking systems and online experiences.',icon:Monitor,kind:'web',slug:'websites',image:'/images/cards/websites.webp'},
 {number:'03',tag:'MOBILE & MICRO APPS',name:'Big ideas. Every screen.',detail:'Micro-apps, mobile-first workflows and iOS / Android applications.',icon:Smartphone,kind:'mobile',slug:'mobile-apps',image:'/images/cards/mobile-apps.webp'},
 {number:'04',tag:'AI AUTOMATION',name:'Less busywork. More possibility.',detail:'Connected workflows, intelligent assistants and practical business automation.',icon:Workflow,kind:'ai',slug:'ai-automation',image:'/images/cards/ai-automation.webp'},
 {number:'05',tag:'HYBRID CLOUD',name:'Built to scale with you.',detail:'Reliable, integrated cloud SaaS infrastructure for growing teams.',icon:Cloud,kind:'cloud',slug:'hybrid-cloud',image:'/images/cards/hybrid-cloud.webp'},
 {number:'06',tag:'SECURITY & RISK',name:'Confidence by design.',detail:'Security assessments, application protection, identity and business risk controls.',icon:ShieldCheck,kind:'security',slug:'security-risk',image:'/images/cards/security-risk.webp'}
];
export default function ImmersiveStage(){
 const root=useRef<HTMLElement>(null);const [active,setActive]=useState(0); const [px,setPx]=useState(0);const [py,setPy]=useState(0);
 useEffect(()=>{const node=root.current;if(!node)return;const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(Number((e.target as HTMLElement).dataset.scene||0))})},{threshold:.52});node.querySelectorAll('[data-scene]').forEach(n=>observer.observe(n));return()=>observer.disconnect()},[]);
 const onMove=(e:React.PointerEvent<HTMLElement>)=>{if(e.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('reduce-motion'))return;const r=e.currentTarget.getBoundingClientRect();setPx((e.clientX-r.left)/r.width-.5);setPy((e.clientY-r.top)/r.height-.5)};
 const current=scenes[active] ?? scenes[0];
 return <section className="immersive-stage" ref={root} aria-label="Explore TechMegaTrends digital services" onPointerMove={onMove} onPointerLeave={()=>{setPx(0);setPy(0)}}>
   <div className="immersive-sticky" aria-hidden="true"><div className="stage-grid"/><div className="stage-sculpture" style={{transform:`translate3d(${px*24}px,${py*18}px,0) rotateY(${px*12}deg) rotateX(${-py*9}deg)`}}><div className="sculpture-plane sculpture-back"/><div className="sculpture-plane sculpture-mid"/><div className="sculpture-plane sculpture-front"><div className="sculpture-window"><span/><span/><span/></div><div className="sculpture-image-wrap"><img key={current.image} className="sculpture-image" src={current.image} alt="" loading="eager"/></div><div className="sculpture-image-caption"><span>{current.tag}</span><b>TMT—{current.number}</b></div></div><div className="sculpture-orbit"/></div><div className="stage-index">TMT—0{active+1}<span>/06</span></div><div className="stage-side-note">DIGITAL PRODUCTS / BUILT WITH PURPOSE</div></div>
   <div className="stage-progress" aria-hidden="true">{scenes.map((s,i)=><span key={s.number} className={i===active?'current':''}/>)}</div>
   <div className="stage-scenes">{scenes.map((s,i)=><article className="stage-scene" data-scene={i} key={s.number}><div className="stage-scene-copy"><p className="stage-tag"><s.icon size={15}/>{s.number} — {s.tag}</p><h2>{s.name}</h2><p>{s.detail}</p><div className="stage-mobile-media"><img src={s.image} alt={`${s.tag.toLowerCase()} interface illustration`} loading="lazy"/></div><Link href={`/services/${s.slug}`} className="stage-pill">Explore {s.tag.toLowerCase()} <ArrowUpRight size={18}/></Link></div><div className="stage-scene-number" aria-hidden="true">{s.number}</div></article>)}</div>
   <div className="stage-ending"><span>KEEP EXPLORING</span><ArrowDown size={18}/></div>
 </section>
}
