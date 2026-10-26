'use client';
import {useRef} from 'react';
import {motion,useReducedMotion,useScroll,useTransform} from 'motion/react';
type Variant='ai'|'saas'|'websites'|'mobile'|'cloud'|'security'|'portfolio'|'about'|'contact'|'general';
export default function V20PageMotion({variant='general'}:{variant?:Variant}){
 const root=useRef<HTMLDivElement>(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:root,offset:['start start','end start']});
 const y=useTransform(scrollYProgress,[0,1],[0,-42]);
 return <div ref={root} className={`v20-page-motion v20-motion-${variant} v20-engineering-motion`} aria-hidden="true">
 <motion.div className="v20-engineering-city" style={reduced?{}:{y}}/>
 <div className="v20-engineering-grid"/>
 <div className="v20-engineering-sheen"/>
 </div>;
}
