import {Instrument_Serif,JetBrains_Mono} from 'next/font/google';
// Cinematic display fonts, applied site-wide on <body> (see app/layout.tsx).
export const cineSerif=Instrument_Serif({subsets:['latin'],weight:'400',style:['normal','italic'],variable:'--cine-serif',display:'swap'});
export const cineMono=JetBrains_Mono({subsets:['latin'],weight:['400','500'],variable:'--cine-mono',display:'swap'});
