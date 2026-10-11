'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';

type Choices={essential:true;analytics:boolean;marketing:boolean;updatedAt:string};
const KEY='tmt-cookie-consent-v1';
function readChoices():Choices|null{
  try{const saved=localStorage.getItem(KEY);if(!saved)return null;const v=JSON.parse(saved);if(typeof v.analytics!=='boolean'||typeof v.marketing!=='boolean')return null;return {essential:true,analytics:v.analytics,marketing:v.marketing,updatedAt:String(v.updatedAt||'')}}
  catch{return null}
}
export function CookieConsent(){
  const [ready,setReady]=useState(false);
  const [open,setOpen]=useState(false);
  const [customise,setCustomise]=useState(false);
  const [analytics,setAnalytics]=useState(false);
  const [marketing,setMarketing]=useState(false);
  useEffect(()=>{
    const saved=readChoices();
    setOpen(!saved);setAnalytics(saved?.analytics??false);setMarketing(saved?.marketing??false);setReady(true);
    const reopen=()=>{const v=readChoices();setAnalytics(v?.analytics??false);setMarketing(v?.marketing??false);setCustomise(true);setOpen(true)};
    window.addEventListener('tmt:open-cookie-preferences',reopen);
    return ()=>window.removeEventListener('tmt:open-cookie-preferences',reopen);
  },[]);
  function save(a:boolean,m:boolean){
    const value:Choices={essential:true,analytics:a,marketing:m,updatedAt:new Date().toISOString()};
    try{localStorage.setItem(KEY,JSON.stringify(value))}catch{}
    window.dispatchEvent(new CustomEvent('tmt:cookie-consent-changed',{detail:value}));
    setOpen(false);setCustomise(false);
  }
  if(!ready||!open)return null;
  return <div className="cookie-consent-backdrop"><section className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-description">
    <div className="cookie-consent-heading"><span className="cookie-consent-eyebrow">YOUR PRIVACY MATTERS</span><button type="button" onClick={()=>save(false,false)} aria-label="Close and reject optional cookies">×</button></div>
    <h2 id="cookie-consent-title">Your cookie choices</h2>
    <p id="cookie-consent-description">We use essential browser storage for preferences and site functionality. Optional analytics and marketing choices are available for future integrations. This website does not currently load analytics or advertising trackers.</p>
    {customise&&<div className="cookie-preferences">
      <label className="cookie-choice"><span><strong>Essential</strong><small>Always active for preferences and core functionality.</small></span><input type="checkbox" checked disabled aria-label="Essential storage is always enabled"/></label>
      <label className="cookie-choice"><span><strong>Analytics</strong><small>Optional website measurement, if added later.</small></span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label>
      <label className="cookie-choice"><span><strong>Marketing</strong><small>Optional advertising trackers, if added later.</small></span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)}/></label>
    </div>}
    <div className="cookie-consent-actions">
      <button className="cookie-btn cookie-btn-primary" type="button" onClick={()=>customise?save(analytics,marketing):save(true,true)}>{customise?'Save preferences':'Accept optional'}</button>
      <button className="cookie-btn cookie-btn-outline" type="button" onClick={()=>save(false,false)}>Reject optional</button>
      {!customise&&<button className="cookie-btn cookie-btn-text" type="button" onClick={()=>setCustomise(true)}>Customise</button>}
    </div>
    <p className="cookie-consent-links">Read our <Link href="/cookies">cookie information</Link> and <Link href="/privacy">privacy notice</Link>. You can reopen this panel using Cookie settings in the footer.</p>
  </section></div>;
}
