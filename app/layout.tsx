import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header, Footer, MotionPreferences } from '@/components/shell';
import { CookieConsent } from '@/components/cookie-consent';
export const metadata:Metadata = {metadataBase:new URL('https://techmegatrends.com'),title:{default:'TechMegaTrends | SaaS, Websites, Mobile Apps & AI Automation',template:'%s | TechMegaTrends'},description:'UK-based digital product studio building SaaS platforms, websites, iOS and Android apps, AI automation, hybrid cloud solutions and security-minded software across the UK, Ireland and EU.',openGraph:{type:'website',locale:'en_GB',siteName:'TechMegaTrends',title:'TechMegaTrends — Design. Build. Transform.',description:'SaaS platforms, web and mobile apps, AI automation, hybrid cloud, cybersecurity and risk management for SMEs across the UK, Ireland and EU.'},robots:{index:process.env.NEXT_PUBLIC_STAGING !== 'true',follow:process.env.NEXT_PUBLIC_STAGING !== 'true'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#000000'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><a className="skip-link" href="#main">Skip to content</a><Header/><MotionPreferences/>{children}<Footer/><CookieConsent/></body></html>}
