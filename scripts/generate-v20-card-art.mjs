// Renders the V20 light-tube tunnel card art (services + projects) to public/images/v20/cards.
// Run: node scripts/generate-v20-card-art.mjs
import sharp from 'sharp';
import {mkdirSync} from 'node:fs';
import {join} from 'node:path';

const W=1536,H=992,HORIZON=H*.64,F=900;
const accents={pink:'#ff7ad9',cyan:'#5fe3ff',violet:'#9b7bff',aqua:'#4ff0d8',orange:'#ffb36b',blue:'#5aa2ff',mint:'#6ff5b5'};
const cards=[
 {slug:'saas-development',accent:'pink',sides:4,vp:.6,base:8,dir:1},
 {slug:'websites',accent:'cyan',sides:4,vp:.55,base:-6,dir:-1},
 {slug:'mobile-apps',accent:'violet',sides:4,vp:.62,base:0,dir:1,stretch:1.45},
 {slug:'hybrid-cloud',accent:'aqua',sides:6,vp:.58,base:0,dir:1},
 {slug:'ai-automation',accent:'orange',sides:3,vp:.56,base:-30,dir:-1},
 {slug:'security-risk',accent:'blue',sides:5,vp:.6,base:-18,dir:1},
 {slug:'digital-growth',accent:'mint',sides:4,vp:.52,base:14,dir:-1},
 {slug:'webcraftgenie',accent:'violet',sides:4,vp:.64,base:20,dir:-1},
 {slug:'juras-expeditions',accent:'aqua',sides:5,vp:.5,base:0,dir:1},
 {slug:'petcare-plus',accent:'pink',sides:6,vp:.58,base:10,dir:-1},
 {slug:'invita-event-craft',accent:'orange',sides:4,vp:.6,base:-12,dir:1},
];

const skyline=y=>{ // simplified London silhouette: towers, the Shard, the Gherkin and the Eye
 const b=[[60,90],[150,60],[210,120],[300,70],[360,140],[470,85],[560,160],[650,95],[760,130],[860,70],[930,180],[1040,110],[1120,150],[1230,80],[1320,125],[1420,95],[1500,60]];
 let d=`M0 ${y}`;b.forEach(([x,h],i)=>{const w=i%2?52:38;d+=` L${x} ${y} L${x} ${y-h} L${x+w} ${y-h} L${x+w} ${y}`});d+=` L${W} ${y} Z`;
 return `<path d="${d}"/><path d="M520 ${y} L548 ${y-300} L576 ${y} Z"/><ellipse cx="760" cy="${y-120}" rx="34" ry="120"/><circle cx="1090" cy="${y-118}" r="112" fill="none" stroke="currentColor" stroke-width="8"/>`;
};

function tunnel({sides,vp,base,dir,stretch=1}){
 const cx=W*vp,cy=H*.47,frames=[];
 for(let i=19;i>=0;i--){
  const z=2.1+i*.55,rot=(base+dir*i*9.5)*Math.PI/180,fog=Math.exp(-i*.09)*(i<2?.8:1),w=Math.min(9,Math.max(1.4,F*.026/z));
  const pts=Array.from({length:sides},(_,k)=>{const a=rot+k*2*Math.PI/sides+(sides===4?Math.PI/4:-Math.PI/2);return [Math.cos(a)*1.55,Math.sin(a)*1.55*stretch]});
  for(let k=0;k<sides;k++){
   const [x1,y1]=pts[k],[x2,y2]=pts[(k+1)%sides],t=.08;
   const ax=x1+(x2-x1)*t,ay=y1+(y2-y1)*t,bx=x2-(x2-x1)*t,by=y2-(y2-y1)*t;
   frames.push({x1:cx+F*ax/z,y1:cy+F*ay/z,x2:cx+F*bx/z,y2:cy+F*by/z,w,fog});
  }
 }
 const pass=(color,mult,op)=>frames.map(f=>`<line x1="${f.x1.toFixed(1)}" y1="${f.y1.toFixed(1)}" x2="${f.x2.toFixed(1)}" y2="${f.y2.toFixed(1)}" stroke="${color}" stroke-width="${(f.w*mult).toFixed(2)}" stroke-linecap="round" opacity="${(f.fog*op).toFixed(3)}"/>`).join('');
 return {cx,cy,pass};
}

function svg(card){
 const a=accents[card.accent],{cx,cy,pass}=tunnel(card);
 const grid=Array.from({length:15},(_,i)=>{const x=(i-7)*260+cx;return `<line x1="${cx}" y1="${HORIZON}" x2="${x*2-cx}" y2="${H}" />`}).join('')+Array.from({length:6},(_,i)=>{const y=HORIZON+Math.pow(i+1,1.8)*9;return `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`}).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16294b"/><stop offset=".45" stop-color="#2d4c7f"/><stop offset=".64" stop-color="#7d9fcf"/><stop offset=".66" stop-color="#22385e"/><stop offset="1" stop-color="#0b1730"/></linearGradient>
 <radialGradient id="core" cx="${cx/W}" cy="${cy/H}" r=".5"><stop offset="0" stop-color="${a}" stop-opacity=".55"/><stop offset=".35" stop-color="#8fc4ff" stop-opacity=".22"/><stop offset="1" stop-color="#8fc4ff" stop-opacity="0"/></radialGradient>
 <radialGradient id="floor" cx="${cx/W}" cy="${(HORIZON+70)/H}" r=".42"><stop offset="0" stop-color="#cfe9ff" stop-opacity=".5"/><stop offset=".5" stop-color="${a}" stop-opacity=".16"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#030a18" stop-opacity=".55"/></radialGradient>
 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="16"/></filter>
 <filter id="halo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
 <filter id="mist"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${H}" fill="url(#core)"/>
<g fill="#0f2142" color="#0f2142" opacity=".7" filter="url(#mist)">${skyline(HORIZON)}</g>
<rect y="${HORIZON-40}" width="${W}" height="80" fill="#a9c8ee" opacity=".22" filter="url(#glow)"/>
<g stroke="${a}" stroke-width="1.2" opacity=".16">${grid}</g>
<rect width="${W}" height="${H}" fill="url(#floor)"/>
<g filter="url(#glow)">${pass(a,5,.6)}</g>
<g filter="url(#halo)">${pass('#bfe6ff',2.2,.8)}</g>
<g>${pass('#ffffff',1,1)}</g>
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

const out=join(process.cwd(),'public/images/v20/cards');
mkdirSync(out,{recursive:true});
for(const card of cards){
 const file=join(out,`${card.slug}.webp`);
 const info=await sharp(Buffer.from(svg(card))).webp({quality:82}).toFile(file);
 console.log(`${card.slug}.webp ${(info.size/1024).toFixed(0)} KB`);
}
