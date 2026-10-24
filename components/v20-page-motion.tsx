'use client';
import {useRef} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
type Variant='ai'|'saas'|'websites'|'mobile'|'cloud'|'security'|'portfolio'|'about'|'contact'|'general';
export default function V20PageMotion({variant='general'}:{variant?:Variant}){
 const root=useRef<HTMLDivElement>(null),reduce=useReducedMotion();
 const {scrollYProgress}=useScroll({target:root,offset:['start start','end start']});
 const shift=useTransform(scrollYProgress,[0,1],[0,reduce?0:55]);
 return <div ref={root} className={`v20-page-motion v20-motion-${variant}`} aria-hidden="true">
  <div className="v20-motion-aura"/>
  <motion.div className="v20-motion-object" style={{y:reduce?0:shift}}>
   <span className="v20-motion-ring v20-motion-ring-one"/>
   <span className="v20-motion-ring v20-motion-ring-two"/>
   <span className="v20-motion-core"/>
   <span className="v20-motion-spark v20-spark-a"/><span className="v20-motion-spark v20-spark-b"/><span className="v20-motion-spark v20-spark-c"/>
  </motion.div>
 </div>;
}
