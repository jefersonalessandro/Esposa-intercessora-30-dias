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

## Scripts

- `npm run dev`: roda o ambiente de desenvolvimento.
- `npm run build`: gera a versão de produção.
- `npm run start`: inicia a versão de produção após o build.
