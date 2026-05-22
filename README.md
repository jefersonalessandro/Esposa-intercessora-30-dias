# Esposa Intercessora Quiz

Quiz em Next.js para direcionar esposas ao devocional **Esposa Intercessora - 30 Dias de Oração pelo Meu Marido**.

## Como rodar

```bash
npm install
npm run dev
```

Depois acesse `http://localhost:3000`.

## Configurar checkout

Copie `.env.example` para `.env.local` e troque o valor de `NEXT_PUBLIC_CAKTO_LINK` pelo link real do produto na Cakto.

```bash
NEXT_PUBLIC_CAKTO_LINK=https://pay.cakto.com.br/seu-link-real
```

## Analytics do funil

O app envia eventos de funil para o Vercel Web Analytics, Microsoft Clarity e, opcionalmente, GA4. No Vercel, eventos customizados exigem plano Pro ou Enterprise; se o projeto estiver no Hobby, use Clarity ou GA4 para analisar o funil.

Eventos principais:

- `funnel_landing_viewed`
- `funnel_quiz_started`
- `funnel_question_viewed`
- `funnel_question_answered`
- `funnel_name_screen_viewed`
- `funnel_name_submitted`
- `funnel_result_viewed`
- `funnel_offer_requested`
- `funnel_offer_viewed`
- `funnel_checkout_clicked`

No Vercel, ative **Web Analytics** no projeto e veja os eventos na aba **Analytics**. Para GA4, crie uma propriedade Web e configure:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Para Microsoft Clarity, crie um projeto em `https://clarity.microsoft.com`, copie o ID do projeto e configure:

```bash
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

Além dos eventos `funnel_*`, o Clarity também recebe aliases em português para facilitar leitura:

- `quiz_q1_respondida` até `quiz_q6_respondida`
- `quiz_completo`
- `nome_inserido`
- `resultado_viu_cta`
- `clicou_comprar`

## Scripts

- `npm run dev`: roda o ambiente de desenvolvimento.
- `npm run build`: gera a versão de produção.
- `npm run start`: inicia a versão de produção após o build.
