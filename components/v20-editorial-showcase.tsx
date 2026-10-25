'use client';
import {useRef} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
import Link from 'next/link';
import {ArrowUpRight,MoveRight} from 'lucide-react';
const panels=[
 {id:'01',eyebrow:'SOFTWARE & SAAS',title:'Ideas engineered into platforms.',body:'Connected digital products, web applications and SaaS experiences built around real business needs.',href:'/services/saas-development',cta:'Explore software solutions',variant:'saas'},
 {id:'02',eyebrow:'AI & AUTOMATION',title:'Intelligence built into every workflow.',body:'Purposeful automation that connects information, teams and decisions — without unnecessary complexity.',href:'/services/ai-automation',cta:'Explore AI automation',variant:'ai'},
 {id:'03',eyebrow:'CLOUD & SECURITY',title:'Built to scale. Designed to protect.',body:'Resilient cloud engineering, secure architecture and practical cybersecurity for growing organisations.',href:'/services/security-risk',cta:'Explore cybersecurity',variant:'security'}
] as const;
function Panel({panel}:{panel:typeof panels[number]}){
 const ref=useRef<HTMLElement>(null);const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const lift=useTransform(scrollYProgress,[0,1],[35,-35]);
 return <section ref={ref} className={`v20-editorial-panel v20-editorial-${panel.variant}`} aria-labelledby={`v20-panel-${panel.id}`}>
  <div className="v20-editorial-panel-inner container">
   <div className="v20-editorial-copy">
    <span className="v20-editorial-index">{panel.id} / OUR CAPABILITIES</span>
    <motion.div initial={reduce?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.65}}>
     <p className="v20-overline">{panel.eyebrow}</p>
     <h2 id={`v20-panel-${panel.id}`}>{panel.title}</h2>
     <p>{panel.body}</p>
     <Link href={panel.href} className="v20-editorial-action">{panel.cta}<ArrowUpRight size={19}/></Link>
    </motion.div>
   </div>
   <motion.div className="v20-editorial-display" style={reduce?{}:{y:lift}} aria-hidden="true">
    <div className="v20-editorial-display-photo"/><div className="v20-editorial-display-grid"/>
    <div className="v20-editorial-metric"><span>TECHMEGATRENDS / {panel.id}</span><MoveRight size={22}/></div>
   </motion.div>
  </div>
 </section>
}
export default function V20EditorialShowcase(){return <div className="v20-editorial-showcase">{panels.map(p=><Panel key={p.id} panel={p}/>)}</div>}
