import {existsSync,statSync} from 'node:fs';
import {join} from 'node:path';
const expected=[
 ['public/media/v20-hero.mp4',250_000,8_000_000],
 ['public/media/v20-hero.webm',250_000,8_000_000],
 ['public/media/v20-hero-poster.jpg',20_000,1_500_000],
];
let failures=0;
for(const [file,min,max] of expected){
 const full=join(process.cwd(),file);
 if(!existsSync(full)){console.error('MISSING '+file);failures++;continue}
 const bytes=statSync(full).size;
 if(bytes<min||bytes>max){console.error('INVALID SIZE '+file+' ('+bytes+' bytes)');failures++}
 else console.log('OK '+file+' '+(bytes/1024/1024).toFixed(2)+' MB');
}
if(failures){console.error('V20 media not ready: '+failures+' issue(s). Do not deploy cinematic hero.');process.exitCode=1}
else console.log('V20 media files exist and sizes are in the expected range. Verify video visually and test browser playback.');
