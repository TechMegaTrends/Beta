// Renders the V20 light-tube tunnel card art (services + projects) to public/images/v20/cards.
// Run: node scripts/generate-v20-card-art.mjs
import sharp from 'sharp';
import {mkdirSync} from 'node:fs';
import {join} from 'node:path';

const W=1536,H=992,HORIZON=H*.64,F=900;
// Light palette to sit inside the white V20 cards: glow = tube halo, deep = icon and edge colour.
const accents={pink:['#ff8fe0','#c93ea8'],cyan:['#6fe6ff','#1b8fc4'],violet:['#a88cff','#5b3fd6'],aqua:['#5ff2dc','#11a08f'],orange:['#ffbe7a','#d9731c'],blue:['#7fb6ff','#2363dc'],mint:['#7ef7bf','#1a9e63']};
// Each card gets a frosted panel at the tunnel's vanishing point with an icon for what the card is about.
const icons={
 dashboard:d=>`<rect x="-110" y="-80" width="220" height="160" rx="14"/><line x1="-60" y1="-80" x2="-60" y2="80"/><rect x="-35" y="10" width="22" height="50" rx="4" fill="${d}"/><rect x="5" y="-25" width="22" height="85" rx="4" fill="${d}"/><rect x="45" y="-60" width="22" height="120" rx="4" fill="${d}"/><line x1="-95" y1="-50" x2="-75" y2="-50"/><line x1="-95" y1="-20" x2="-75" y2="-20"/>`,
 browser:d=>`<rect x="-115" y="-85" width="230" height="170" rx="14"/><line x1="-115" y1="-45" x2="115" y2="-45"/><circle cx="-90" cy="-65" r="6" fill="${d}"/><circle cx="-70" cy="-65" r="6" fill="${d}"/><circle cx="-50" cy="-65" r="6" fill="${d}"/><rect x="-90" y="-22" width="90" height="70" rx="8" fill="${d}" fill-opacity=".18"/><line x1="20" y1="-15" x2="90" y2="-15"/><line x1="20" y1="12" x2="90" y2="12"/><line x1="20" y1="39" x2="70" y2="39"/>`,
 phone:d=>`<rect x="-62" y="-115" width="124" height="230" rx="24"/><line x1="-15" y1="-96" x2="15" y2="-96"/><rect x="-40" y="-65" width="36" height="36" rx="8" fill="${d}"/><rect x="4" y="-65" width="36" height="36" rx="8" fill="${d}" fill-opacity=".45"/><rect x="-40" y="-20" width="36" height="36" rx="8" fill="${d}" fill-opacity=".45"/><rect x="4" y="-20" width="36" height="36" rx="8" fill="${d}"/><line x1="-25" y1="92" x2="25" y2="92"/>`,
 cloud:d=>`<path d="M-85 10 a42 42 0 0 1 14 -80 a58 58 0 0 1 108 -8 a44 44 0 0 1 48 88 Z"/><rect x="-70" y="38" width="140" height="30" rx="7"/><rect x="-70" y="80" width="140" height="30" rx="7"/><circle cx="-48" cy="53" r="5" fill="${d}"/><circle cx="-48" cy="95" r="5" fill="${d}"/>`,
 chip:d=>`<rect x="-62" y="-62" width="124" height="124" rx="16"/><rect x="-30" y="-30" width="60" height="60" rx="8" fill="${d}" fill-opacity=".25"/>${[-35,0,35].map(v=>`<line x1="${v}" y1="-62" x2="${v}" y2="-92"/><line x1="${v}" y1="62" x2="${v}" y2="92"/><line x1="-62" y1="${v}" x2="-92" y2="${v}"/><line x1="62" y1="${v}" x2="92" y2="${v}"/>`).join('')}<circle cx="0" cy="0" r="10" fill="${d}"/>`,
 shield:()=>`<path d="M0 -112 L92 -74 V-6 C92 56 50 96 0 116 C-50 96 -92 56 -92 -6 V-74 Z"/><path d="M-40 0 L-10 32 L46 -32"/>`,
 growth:d=>`<line x1="-115" y1="105" x2="115" y2="105"/><rect x="-100" y="45" width="42" height="60" rx="6" fill="${d}" fill-opacity=".35"/><rect x="-38" y="5" width="42" height="100" rx="6" fill="${d}" fill-opacity=".6"/><rect x="24" y="-45" width="42" height="150" rx="6" fill="${d}"/><polyline points="-105,-10 -40,-55 10,-35 95,-105"/><polyline points="62,-105 95,-105 95,-72"/>`,
 genie:d=>`<rect x="-115" y="-75" width="200" height="150" rx="14"/><line x1="-115" y1="-38" x2="85" y2="-38"/><circle cx="-92" cy="-57" r="6" fill="${d}"/><circle cx="-72" cy="-57" r="6" fill="${d}"/><line x1="-90" y1="-5" x2="20" y2="-5"/><line x1="-90" y1="22" x2="40" y2="22"/><line x1="-90" y1="49" x2="0" y2="49"/><path d="M85 -115 L97 -83 L129 -71 L97 -59 L85 -27 L73 -59 L41 -71 L73 -83 Z" fill="${d}"/>`,
 compass:d=>`<circle r="104"/><path d="M0 -82 L20 0 L0 82 L-20 0 Z"/><path d="M0 -82 L20 0 L-20 0 Z" fill="${d}"/><circle r="9" fill="${d}"/><line x1="0" y1="-104" x2="0" y2="-118"/><line x1="0" y1="104" x2="0" y2="118"/><line x1="-104" y1="0" x2="-118" y2="0"/><line x1="104" y1="0" x2="118" y2="0"/>`,
 paw:d=>`<ellipse cx="0" cy="42" rx="52" ry="44" fill="${d}"/><ellipse cx="-74" cy="-14" rx="23" ry="29" fill="${d}"/><ellipse cx="-30" cy="-62" rx="23" ry="30" fill="${d}"/><ellipse cx="30" cy="-62" rx="23" ry="30" fill="${d}"/><ellipse cx="74" cy="-14" rx="23" ry="29" fill="${d}"/>`,
 envelope:d=>`<rect x="-112" y="-72" width="224" height="144" rx="14"/><polyline points="-112,-68 0,14 112,-68"/><path d="M0 38 C-10 26 -30 30 -30 46 C-30 62 0 78 0 78 C0 78 30 62 30 46 C30 30 10 26 0 38 Z" fill="${d}"/>`,
};
const cards=[
 {slug:'saas-development',accent:'pink',sides:4,base:8,dir:1,icon:'dashboard'},
 {slug:'websites',accent:'cyan',sides:4,base:-6,dir:-1,icon:'browser'},
 {slug:'mobile-apps',accent:'violet',sides:4,base:0,dir:1,stretch:1.35,icon:'phone'},
 {slug:'hybrid-cloud',accent:'aqua',sides:6,base:0,dir:1,icon:'cloud'},
 {slug:'ai-automation',accent:'orange',sides:3,base:-30,dir:-1,icon:'chip'},
 {slug:'security-risk',accent:'blue',sides:5,base:-18,dir:1,icon:'shield'},
 {slug:'digital-growth',accent:'mint',sides:4,base:14,dir:-1,icon:'growth'},
 {slug:'webcraftgenie',accent:'violet',sides:4,base:20,dir:-1,icon:'genie'},
 {slug:'juras-expeditions',accent:'aqua',sides:5,base:0,dir:1,icon:'compass'},
 {slug:'petcare-plus',accent:'pink',sides:6,base:10,dir:-1,icon:'paw'},
 {slug:'invita-event-craft',accent:'orange',sides:4,base:-12,dir:1,icon:'envelope'},
];

const skyline=y=>{ // simplified London silhouette: towers, the Shard, the Gherkin and the Eye
 const b=[[60,90],[150,60],[210,120],[300,70],[360,140],[470,85],[560,160],[650,95],[760,130],[860,70],[930,180],[1040,110],[1120,150],[1230,80],[1320,125],[1420,95],[1500,60]];
 let d=`M0 ${y}`;b.forEach(([x,h],i)=>{const w=i%2?52:38;d+=` L${x} ${y} L${x} ${y-h} L${x+w} ${y-h} L${x+w} ${y}`});d+=` L${W} ${y} Z`;
 return `<path d="${d}"/><path d="M520 ${y} L548 ${y-300} L576 ${y} Z"/><ellipse cx="760" cy="${y-120}" rx="34" ry="120"/><circle cx="1090" cy="${y-118}" r="112" fill="none" stroke="currentColor" stroke-width="8"/>`;
};

function tunnel({sides,base,dir,stretch=1}){
 const cx=W*.5,cy=H*.47,frames=[];
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
 const [glow,deep]=accents[card.accent],{cx,cy,pass}=tunnel(card);
 const grid=Array.from({length:15},(_,i)=>{const x=(i-7)*260+cx;return `<line x1="${cx}" y1="${HORIZON}" x2="${x*2-cx}" y2="${H}" />`}).join('')+Array.from({length:6},(_,i)=>{const y=HORIZON+Math.pow(i+1,1.8)*9;return `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`}).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9f1fc"/><stop offset=".5" stop-color="#d4e3f7"/><stop offset=".63" stop-color="#f4f8ff"/><stop offset=".65" stop-color="#d9e5f5"/><stop offset="1" stop-color="#bfd2ea"/></linearGradient>
 <radialGradient id="core" cx=".5" cy="${cy/H}" r=".45"><stop offset="0" stop-color="${glow}" stop-opacity=".5"/><stop offset=".55" stop-color="${glow}" stop-opacity=".12"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#1b3a6b" stop-opacity="0"/><stop offset="1" stop-color="#1b3a6b" stop-opacity=".16"/></radialGradient>
 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
 <filter id="halo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
 <filter id="mist"><feGaussianBlur stdDeviation="3"/></filter>
 <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${H}" fill="url(#core)"/>
<g fill="#8ea9cf" color="#8ea9cf" opacity=".55" filter="url(#mist)">${skyline(HORIZON)}</g>
<g stroke="${deep}" stroke-width="1.4" opacity=".16">${grid}</g>
<g filter="url(#glow)">${pass(glow,5,.6)}</g>
<g filter="url(#halo)">${pass(deep,2,.5)}</g>
<g>${pass(glow,1.5,.95)}</g>
<g>${pass('#ffffff',.75,1)}</g>
<rect x="${cx-175}" y="${cy-140}" width="350" height="320" rx="44" fill="${deep}" opacity=".22" filter="url(#shadow)"/>
<rect x="${cx-170}" y="${cy-160}" width="340" height="320" rx="44" fill="#ffffff" fill-opacity=".8" stroke="#ffffff" stroke-width="4"/>
<rect x="${cx-170}" y="${cy-160}" width="340" height="320" rx="44" fill="none" stroke="${glow}" stroke-opacity=".7" stroke-width="2"/>
<g transform="translate(${cx} ${cy})" fill="none" stroke="${deep}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">${icons[card.icon](deep)}</g>
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
