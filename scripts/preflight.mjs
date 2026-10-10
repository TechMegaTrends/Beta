import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['app/page.tsx','app/layout.tsx','app/globals.css','app/services/page.tsx','app/contact/page.tsx','app/api/enquiries/route.ts','public/brand/techmegatrends-full-electric-tight.png'];
for (const image of ['saas-development','websites','mobile-apps','hybrid-cloud','ai-automation','security-risk']) required.push(`public/images/cards/${image}.webp`);
const images=['home','services','saas','websites','mobile','ai','cloud','security','portfolio','contact'];
for(const img of images) required.push(`public/images/pages/${img}.webp`);
const missing=required.filter(file=>!fs.existsSync(path.join(root,file)));
if(missing.length){console.error('Missing required files:',missing);process.exitCode=1;} else console.log('PASS: required project files and page images present.');
const services=fs.readFileSync(path.join(root,'lib/data.ts'),'utf8');
for(const slug of ['saas-development','websites','mobile-apps','hybrid-cloud','ai-automation','security-risk','digital-growth']) {
 if(!services.includes(`slug:'${slug}'`)){console.error(`Missing service: ${slug}`);process.exitCode=1;}
}
if(!process.env.ENQUIRY_WEBHOOK_URL) console.warn('WARNING: enquiry webhook is not configured. Form will return an honest 503 error.');
if(process.env.NEXT_PUBLIC_STAGING!=='true') console.warn('WARNING: staging noindex is not enabled; set NEXT_PUBLIC_STAGING=true for staging.');
console.log('Preflight finished; this does not replace npm run build or browser QA.');
