'use client';
import {motion,useReducedMotion} from 'motion/react';
import Link from 'next/link';
import {ArrowUpRight,Network,Workflow,ShieldCheck,ChevronRight} from 'lucide-react';
const stages=[
 {number:'01',title:'Understand complexity',detail:'Find the bottlenecks across disconnected tools, data and processes.',Icon:Network},
 {number:'02',title:'Connect intelligence',detail:'Combine elegant software, practical AI automation and secure cloud integration.',Icon:Workflow},
 {number:'03',title:'Create possibility',detail:'Launch connected experiences engineered to adapt, scale and remain resilient.',Icon:ShieldCheck},
];
export default function V20Transformation(){
 const reduce=useReducedMotion();
 return <section className="v20-transformation" aria-labelledby="v20-transformation-title">
  <div className="container">
   <p className="v20-overline">OUR THINKING / DIGITAL TRANSFORMATION</p>
   <div className="v20-transformation-heading">
    <h2 id="v20-transformation-title">Complexity is everywhere.<br/><span>Intelligence is engineered.</span></h2>
    <p>We connect systems, streamline operations and build intelligent digital products that work together — with security considered from the start.</p>
   </div>
   <div className="v20-transformation-path" role="list">
    {stages.map((stage,i)=><motion.article role="listitem" key={stage.number} className="v20-transform-card" initial={reduce?false:{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.55,delay:reduce?0:i*.1}}>
      <div className="v20-transform-card-top"><span>{stage.number} / 03</span><stage.Icon size={28} strokeWidth={1.5}/></div>
      <h3>{stage.title}</h3><p>{stage.detail}</p>
      {i<stages.length-1&&<ChevronRight className="v20-transform-next" aria-hidden="true"/>}
    </motion.article>)}
   </div>
   <div className="v20-transformation-end"><strong>Less complexity. More possibility.</strong><Link href="/contact">Discuss your project <ArrowUpRight size={18}/></Link></div>
  </div>
 </section>;
}
