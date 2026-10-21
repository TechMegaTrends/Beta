'use client';
import {useEffect,useRef,useState} from 'react';

/* Deterministic decorative constellation: no canvas dependency or hydration randomness. */
const nodes = [
 [7,22],[16,41],[10,68],[25,17],[27,56],[35,34],[39,77],[45,13],
 [50,53],[57,28],[62,75],[69,43],[73,14],[81,62],[87,30],[94,72],
 [95,13],[32,92],[55,92],[82,91]
];
const edges = [[0,1],[0,3],[1,2],[1,4],[2,4],[3,5],[3,7],[4,5],[4,6],
 [5,7],[5,8],[6,8],[6,17],[7,9],[8,9],[8,10],[8,11],[9,11],[9,12],
 [10,11],[10,18],[11,12],[11,13],[11,14],[12,14],[12,16],[13,14],
 [13,15],[13,19],[14,16],[15,19],[17,18],[18,19]];
type Props={variant?:'hero'|'page'|'subtle';className?:string};
export default function CosmicNetworkBackground({variant='page',className=''}:Props){
 const ref=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(false);
 useEffect(()=>{
  const el=ref.current;if(!el)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false;
  const sync=()=>setActive(visible&&!motion.matches&&!document.documentElement.classList.contains('reduce-motion')&&!document.hidden);
  const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;sync()},{rootMargin:'100px'});
  io.observe(el);motion.addEventListener('change',sync);
  const mo=new MutationObserver(sync);mo.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',sync);
  return()=>{io.disconnect();mo.disconnect();motion.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync)};
 },[]);
 return <div ref={ref} className={['cosmic-network','cosmic-network--'+variant,active?'cosmic-network--active':'',className].filter(Boolean).join(' ')} aria-hidden="true">
  <div className="cosmic-network__haze"/>
  <svg className="cosmic-network__map" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" focusable="false">
   <defs><linearGradient id={'cosmic-link-'+variant} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3979ff"/><stop offset=".55" stopColor="#5cebfa"/><stop offset="1" stopColor="#9965ff"/></linearGradient></defs>
   {edges.map(([a,b],i)=><line key={'l'+i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={'url(#cosmic-link-'+variant+')'} strokeWidth=".11" opacity={i%3===0?.58:.27} className="cosmic-network__link" style={{animationDelay:(i%7)*-.45+'s'}}/>)}
   {nodes.map(([x,y],i)=><g key={i} className="cosmic-network__node" style={{animationDelay:(i%6)*-.52+'s'}}><circle cx={x} cy={y} r={i%4===0?1.15:.62} fill={i%5===0?'#9965ff':'#5cebfa'} opacity=".12"/><circle cx={x} cy={y} r={i%4===0?.39:.23} fill={i%5===0?'#bb93ff':'#b6fbff'}/></g>)}
  </svg>
  <div className="cosmic-network__veil"/>
 </div>;
}
