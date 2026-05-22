import { Html, Head, Main, NextScript } from 'next/document'

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'wv2a2p348w'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Descubra qual área da vida do seu marido mais precisa da sua oração hoje. Um devocional de 30 dias para esposas intercessoras." />
        <meta property="og:title" content="Esposa Intercessora — 30 Dias de Oração pelo Meu Marido" />
        <meta property="og:description" content="A oração de uma esposa é a arma mais poderosa que um casamento pode ter. Descubra por onde começar." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#4A2008" />
        <link rel="icon" href="/favicon.ico" />
        {CLARITY_ID && (
          <script
            id="microsoft-clarity"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
              `,
            }}
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
