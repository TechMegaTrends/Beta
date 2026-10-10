import {NextRequest,NextResponse} from 'next/server';
import {services} from '@/lib/data';
export const runtime='nodejs';
export async function POST(req:NextRequest){
  let data:Record<string,unknown>;
  try {data=await req.json();}catch{return NextResponse.json({error:'Invalid request body.'},{status:400})}
  if(data.website)return NextResponse.json({ok:true});
  const name=String(data.name||'').trim(),email=String(data.email||'').trim(),message=String(data.message||'').trim(),service=String(data.service||'').trim();
  if(!name||name.length>120||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||message.length<10||message.length>4000||![...services.map(s=>s.slug),'other'].includes(service))return NextResponse.json({error:'Please check your details and try again.'},{status:400});
  // A production endpoint must include a durable store, rate limits, abuse protection,
  // verified transactional email, retention policies and monitoring. Never silently accept data.
  if(!process.env.ENQUIRY_WEBHOOK_URL){return NextResponse.json({error:'Online enquiries are not yet configured. Please email info@techmegatrends.com directly.'},{status:503})}
  try {const url=new URL(process.env.ENQUIRY_WEBHOOK_URL);if(url.protocol!=='https:')throw new Error('HTTPS required');const response=await fetch(url.toString(),{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.ENQUIRY_WEBHOOK_SECRET||''}`},body:JSON.stringify({name,email,message,service,company:String(data.company||'').slice(0,120),phone:String(data.phone||'').slice(0,40),budget:String(data.budget||'').slice(0,100),source:'techmegatrends.com',receivedAt:new Date().toISOString()}),signal:AbortSignal.timeout(8000),cache:'no-store'});if(!response.ok)throw new Error('Webhook rejected');return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Unable to send at present. Please email info@techmegatrends.com directly.'},{status:503})}
}
