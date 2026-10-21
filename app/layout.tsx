import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header, Footer, MotionPreferences } from '@/components/shell';
import { CookieConsent } from '@/components/cookie-consent';
import CosmicNetworkBackground from '@/components/cosmic-network-background';
export const metadata:Metadata = {metadataBase:new URL('https://techmegatrends.com'),title:{default:'TechMegaTrends | Software, AI, Cloud & Cybersecurity',template:'%s | TechMegaTrends'},description:'UK digital engineering, AI, cloud and cybersecurity services: websites, software, SaaS applications, automation and cyber risk advisory across the UK and EU.',openGraph:{type:'website',locale:'en_GB',siteName:'TechMegaTrends',title:'TechMegaTrends — Design. Build. Transform.',description:'SaaS platforms, web and mobile apps, AI automation, hybrid cloud, cybersecurity and risk management for SMEs across the UK and EU.'},robots:{index:process.env.NEXT_PUBLIC_STAGING !== 'true',follow:process.env.NEXT_PUBLIC_STAGING !== 'true'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#000000'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><a className="skip-link" href="#main">Skip to content</a><Header/><MotionPreferences/><CosmicNetworkBackground variant="subtle" className="cosmic-site-ambient"/>{children}<Footer/><CookieConsent/></body></html>}
