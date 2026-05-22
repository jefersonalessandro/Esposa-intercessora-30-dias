import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import '../styles/globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function App({ Component, pageProps }) {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
