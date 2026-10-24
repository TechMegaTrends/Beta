'use client';
import {useRef} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
const chapters=[
 {number:'01',eyebrow:'UNDERSTAND THE CHALLENGE',title:'From disconnected systems',description:'We uncover the friction between teams, tools and workflows before defining the right digital architecture.',tag:'DISCOVER'},
 {number:'02',eyebrow:'ENGINEER THE INTELLIGENCE',title:'To connected engineering',description:'Custom software, AI automation, secure cloud and resilient integrations unite into one purposeful ecosystem.',tag:'CONNECT'},
 {number:'03',eyebrow:'DELIVER THE OUTCOME',title:'And meaningful progress',description:'Thoughtfully designed, secure digital products that support better experiences and sustainable business growth.',tag:'SCALE'}
];
function Chapter({item,index}:{item:typeof chapters[number],index:number}){
 const target=useRef<HTMLElement>(null);const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target,offset:['start end','end start']});
 const scale=useTransform(scrollYProgress,[0,.5,1],[.92,1,1.06]);
 const y=useTransform(scrollYProgress,[0,1],[38,-38]);
 return <section ref={target} className="v20-scroll-chapter" aria-label={item.eyebrow}>
 <motion.div className="v20-scroll-visual" aria-hidden="true" style={reduce?{}:{scale}}>
 <div className="v20-scroll-city"/>
 <motion.div className="v20-scroll-lines" style={reduce?{}:{y}}/>
 </motion.div>
 <div className="v20-scroll-overlay">
 <span className="v20-scroll-number">{item.number} / 03 — {item.eyebrow}</span>
 <motion.div initial={reduce?false:{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{duration:.55}}>
 <h3>{item.title}</h3><p>{item.description}</p><span className="v20-scroll-tag">{item.tag} <ArrowUpRight size={15}/></span>
 </motion.div></div>
 </section>;
}
export default function V20ScrollStory(){return <section className="v20-scroll-story" aria-labelledby="v20-scroll-title">
 <div className="container v20-scroll-intro"><p className="v20-overline">SCROLL TO EXPLORE / THE ENGINEERING JOURNEY</p><h2 id="v20-scroll-title">Complexity is everywhere.<br/><span>Intelligence is engineered.</span></h2><p>Explore how disconnected digital challenges become connected solutions.</p></div>
 <div className="v20-scroll-scenes">{chapters.map((c,i)=><Chapter key={c.number} item={c} index={i}/>)}</div>
 <div className="container v20-scroll-footer"><strong>Less complexity. More possibility.</strong><Link href="/contact">Let's discuss your project <ArrowUpRight size={18}/></Link></div>
 </section>}
