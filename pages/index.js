import { useState, useEffect } from 'react'
import Head from 'next/head'

// ─── SUBSTITUA AQUI pelo link do seu produto na Cakto ───────────────────────
const CAKTO_LINK = process.env.NEXT_PUBLIC_CAKTO_LINK || 'https://pay.cakto.com.br/SEU-LINK-AQUI'
// ────────────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    question: 'Você está respondendo pensando em quem?',
    options: [
      'No meu marido',
      'No meu noivo',
      'No meu companheiro',
      'No homem que eu amo',
    ],
  },
  {
    id: 2,
    question: 'Quando você pensa nele, qual sentimento aparece primeiro?',
    options: [
      'Vontade de protegê-lo',
      'Saudade de vê-lo mais perto de Deus',
      'Preocupação com a saúde ou o emocional dele',
      'Medo das escolhas que ele tem feito',
      'Ansiedade sobre o futuro dele',
    ],
  },
  {
    id: 3,
    question: 'Hoje, o que você mais gostaria de pedir a Deus por ele?',
    options: [
      'Que Deus proteja ele de todo mal',
      'Que Deus toque o coração dele e fortaleça a fé',
      'Que Deus cure suas dores e guie o futuro dele',
      'Que Deus restaure o nosso casamento',
    ],
  },
  {
    id: 4,
    question: 'Qual dessas preocupações mais pesa no seu coração hoje?',
    options: [
      'Eu queria protegê-lo, mas nem sempre consigo',
      'Eu sinto que ele se afastou de Deus ou da fé',
      'Eu me preocupo com suas escolhas e com o futuro',
      'Eu vejo que ele pode não estar bem, mesmo quando diz que está',
    ],
  },
  {
    id: 5,
    question: 'O que mais aperta seu coração de esposa?',
    options: [
      'Não saber como ele realmente está por dentro',
      'Ver que Deus já não parece ser prioridade para ele',
      'Sentir que ele carrega dores, ansiedade ou tristeza',
      'Ver ele se envolvendo com caminhos errados',
      'Imaginar o futuro e não conseguir controlar nada',
    ],
  },
  {
    id: 6,
    question: 'Se você pudesse cobrir uma área da vida dele em oração pelos próximos 30 dias, qual seria?',
    options: [
      'Proteção física e espiritual',
      'Fé e volta para Deus',
      'Saúde do corpo, da mente e da alma',
      'Caráter, escolhas e relacionamentos',
      'Futuro, propósito e provisão',
    ],
  },
]

const RESULTS = {
  'Proteção física e espiritual': {
    icon: '🛡',
    tag: 'RESULTADO: PROTEÇÃO',
    title: 'seu coração de esposa está pedindo proteção sobre ele',
    text: 'Pelas suas respostas, sua maior preocupação hoje é com a proteção do seu marido. Talvez você sinta medo das companhias, das saídas, dos caminhos e dos perigos que você não consegue controlar. Mas onde seus olhos não alcançam, Deus alcança.',
    direction: 'Sua direção de oração é pedir que Deus cubra ele nas ruas, nas decisões, nas amizades e em toda batalha espiritual que ele enfrenta — mesmo sem saber que está enfrentando.',
  },
  'Fé e volta para Deus': {
    icon: '✝',
    tag: 'RESULTADO: FÉ',
    title: 'seu coração está pedindo que ele volte para Deus',
    text: 'Pelas suas respostas, o que mais pesa no seu coração é o distanciamento espiritual do seu marido. Você o ama, e precisamente por isso dói vê-lo longe da fé. Mas nenhum coração é impermeável ao amor de Deus.',
    direction: 'Sua direção de oração é pedir que Deus plante uma saudade d\'Ele no coração do seu marido — uma saudade que ele não consiga ignorar.',
  },
  'Saúde do corpo, da mente e da alma': {
    icon: '💚',
    tag: 'RESULTADO: SAÚDE',
    title: 'seu coração está pedindo cura e inteireza para ele',
    text: 'Pelas suas respostas, você percebe que algo dentro do seu marido não está bem — seja no corpo, na mente ou na alma. Ele pode não falar. Mas você sente. E Deus sente também.',
    direction: 'Sua direção de oração é pedir que Deus toque cada camada da vida dele — corpo, emoções, memórias e espírito — com a Sua cura.',
  },
  'Caráter, escolhas e relacionamentos': {
    icon: '⚖',
    tag: 'RESULTADO: CARÁTER',
    title: 'seu coração está pedindo integridade e boas escolhas para ele',
    text: 'Pelas suas respostas, o que mais pesa são as escolhas que ele tem feito — as amizades, os caminhos, as decisões. Você deseja para ele um coração íntegro e uma mente que discerne o bem.',
    direction: 'Sua direção de oração é pedir que Deus forme em seu marido um coração sábio, cercado de pessoas que o puxam para cima.',
  },
  'Futuro, propósito e provisão': {
    icon: '🌟',
    tag: 'RESULTADO: PROPÓSITO',
    title: 'seu coração está pedindo direção e futuro para ele',
    text: 'Pelas suas respostas, o que mais pesa é a incerteza sobre o futuro — o propósito dele, a provisão, o caminho a seguir. Você quer vê-lo realizado, florescendo, chegando onde Deus planejou.',
    direction: 'Sua direção de oração é pedir que Deus revele o propósito único do seu marido e dê a ele coragem para caminhar nele.',
  },
}

// Mapeamento: resposta da Q6 → resultado
function getResult(answers) {
  const q6Answer = answers[5]
  return RESULTS[q6Answer] || RESULTS['Proteção física e espiritual']
}

// ─── ESTILOS ────────────────────────────────────────────────────────────────
const S = {
  // Container geral
  wrapper: {
    minHeight: '100vh',
    background: 'var(--creme)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 16px',
  },

  card: {
    background: 'var(--branco)',
    borderRadius: '16px',
    padding: '32px 24px',
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 4px 24px var(--sombra)',
    position: 'relative',
    overflow: 'hidden',
  },

  // Progress bar
  progressBar: {
    height: '3px',
    background: 'var(--creme-escuro)',
    borderRadius: '2px',
    marginBottom: '28px',
    overflow: 'hidden',
  },
  progressFill: (pct) => ({
    height: '100%',
    width: `${pct}%`,
    background: 'linear-gradient(to right, var(--marrom), var(--dourado-claro))',
    borderRadius: '2px',
    transition: 'width 0.4s ease',
  }),

  // Ícone central
  iconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'var(--creme-escuro)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    margin: '0 auto 20px',
    border: '1px solid var(--creme-escuro)',
  },

  // Textos
  heading: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--marrom)',
    textAlign: 'center',
    lineHeight: '1.3',
    marginBottom: '8px',
  },
  subheading: {
    fontSize: '14px',
    color: 'var(--texto-leve)',
    textAlign: 'center',
    lineHeight: '1.6',
    marginBottom: '24px',
  },

  // Opções do quiz
  option: (selected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    border: `1.5px solid ${selected ? 'var(--marrom)' : 'var(--creme-escuro)'}`,
    borderRadius: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    background: selected ? 'var(--creme)' : 'var(--branco)',
    transition: 'all 0.2s ease',
  }),
  optionRadio: (selected) => ({
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: `2px solid ${selected ? 'var(--marrom)' : 'var(--creme-escuro)'}`,
    background: selected ? 'var(--marrom)' : 'transparent',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  }),
  optionCheck: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'white',
  },
  optionText: (selected) => ({
    fontSize: '14px',
    color: selected ? 'var(--marrom)' : 'var(--texto)',
    fontWeight: selected ? '700' : '400',
    lineHeight: '1.4',
  }),

  // Botão principal
  btn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, var(--marrom) 0%, var(--marrom-medio) 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginTop: '20px',
    cursor: 'pointer',
    transition: 'transform 0.15s, opacity 0.15s',
  },

  // Input nome
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '1.5px solid var(--creme-escuro)',
    borderRadius: '10px',
    fontSize: '16px',
    color: 'var(--texto)',
    background: 'var(--branco)',
    outline: 'none',
    marginBottom: '4px',
  },
  inputLabel: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--texto-leve)',
    marginBottom: '8px',
    display: 'block',
  },

  // Loading checks
  loadingCheck: (done) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    opacity: done ? 1 : 0.4,
    transition: 'opacity 0.5s ease',
  }),
  loadingCheckIcon: (done) => ({
    fontSize: '14px',
    color: done ? 'var(--marrom)' : 'var(--creme-escuro)',
  }),
  loadingCheckText: (done) => ({
    fontSize: '14px',
    color: done ? 'var(--texto)' : 'var(--texto-leve)',
    fontWeight: done ? '700' : '400',
  }),

  // Resultado
  resultTag: {
    display: 'inline-block',
    background: 'var(--creme-escuro)',
    color: 'var(--marrom-medio)',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '4px 14px',
    borderRadius: '20px',
    marginBottom: '12px',
    fontFamily: 'Lato, sans-serif',
  },
  resultTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '19px',
    fontWeight: '700',
    color: 'var(--marrom)',
    textAlign: 'center',
    lineHeight: '1.3',
    marginBottom: '16px',
  },
  resultBox: {
    background: 'var(--creme)',
    borderRadius: '10px',
    padding: '18px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  resultBoxText: {
    fontSize: '13.5px',
    lineHeight: '1.75',
    color: 'var(--texto)',
    marginBottom: '12px',
  },
  resultDirection: {
    borderTop: '1px solid var(--creme-escuro)',
    paddingTop: '12px',
    marginTop: '4px',
  },
  resultDirectionLabel: {
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--dourado)',
    display: 'block',
    marginBottom: '6px',
  },
  resultDirectionText: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: 'italic',
    fontSize: '13px',
    color: 'var(--texto)',
    lineHeight: '1.7',
  },

  // Garantia e preço
  priceBox: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  priceOld: {
    fontSize: '12px',
    color: 'var(--texto-leve)',
    textDecoration: 'line-through',
  },
  priceNew: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--marrom)',
    display: 'block',
    lineHeight: '1.1',
  },
  priceSub: {
    fontSize: '12px',
    color: 'var(--texto-leve)',
    marginTop: '2px',
  },

  // CTA button especial
  ctaBtn: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #4A2008 0%, #7B3F10 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginBottom: '12px',
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    boxShadow: '0 4px 16px rgba(74,32,8,0.3)',
  },
  guarantee: {
    fontSize: '11px',
    color: 'var(--texto-leve)',
    textAlign: 'center',
    lineHeight: '1.5',
  },

  // Rodapé da landing
  brand: {
    textAlign: 'center',
    fontSize: '11px',
    color: 'var(--texto-leve)',
    marginTop: '20px',
    letterSpacing: '1px',
  },
}

// ─── TELAS ──────────────────────────────────────────────────────────────────

function LandingScreen({ onStart }) {
  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        {/* Ornamento superior */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'var(--creme-escuro)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', margin: '0 auto 16px',
          }}>✝</div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--dourado)', marginBottom: '10px' }}>
            Devocional de Intercessão
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '24px', fontWeight: '700', color: 'var(--marrom)',
            lineHeight: '1.3', marginBottom: '12px',
          }}>
            Descubra qual área da vida do seu marido mais precisa da sua oração hoje
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--texto-leve)', lineHeight: '1.65', marginBottom: '24px' }}>
            Responda algumas perguntas rápidas e veja qual área está pedindo a intercessão da sua oração agora.
          </p>
        </div>

        <div style={{
          background: 'var(--creme)',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {['🙏 Apenas 2 minutos para responder', '✦ Resultado personalizado com seu nome', '📖 30 dias de oração estruturada'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--texto)' }}>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          style={S.ctaBtn}
          onClick={onStart}
        >
          DESCOBRIR AGORA →
        </button>

        <p style={S.brand}>Esposa Intercessora · Devocional</p>
      </div>
    </div>
  )
}

function QuizScreen({ question, questionIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const progress = ((questionIndex) / total) * 100

  function handleContinue() {
    if (selected !== null) onAnswer(question.options[selected])
  }

  // Reset seleção ao mudar de pergunta
  useEffect(() => { setSelected(null) }, [questionIndex])

  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={S.progressBar}>
          <div style={S.progressFill(progress)} />
        </div>

        <h2 style={{ ...S.heading, marginBottom: '20px', fontSize: '18px' }}>
          {question.question}
        </h2>

        {question.options.map((opt, i) => (
          <div
            key={i}
            style={S.option(selected === i)}
            onClick={() => setSelected(i)}
          >
            <div style={S.optionRadio(selected === i)}>
              {selected === i && <div style={S.optionCheck} />}
            </div>
            <span style={S.optionText(selected === i)}>{opt}</span>
          </div>
        ))}

        <button
          style={{
            ...S.btn,
            opacity: selected !== null ? 1 : 0.4,
            cursor: selected !== null ? 'pointer' : 'not-allowed',
          }}
          onClick={handleContinue}
          disabled={selected === null}
        >
          CONTINUAR
        </button>

        <p style={{ ...S.brand, marginTop: '16px' }}>Esposa Intercessora · Devocional</p>
      </div>
    </div>
  )
}

function NameScreen({ onSubmit }) {
  const [name, setName] = useState('')

  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={S.progressBar}>
          <div style={S.progressFill(90)} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={S.iconCircle}>✨</div>
          <h2 style={{ ...S.heading, fontSize: '18px', marginBottom: '8px' }}>
            Seu resultado está pronto
          </h2>
          <p style={S.subheading}>
            Pelas suas respostas, uma área da vida do seu marido tocou mais forte o seu coração. E talvez isso não seja por acaso.
          </p>
        </div>

        <div style={{
          background: 'var(--creme)',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '13.5px', lineHeight: '1.7', color: 'var(--texto)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            "Deus pode transformar essa preocupação em uma direção de oração."
          </p>
        </div>

        <label style={S.inputLabel}>DIGITE SEU NOME PARA RECEBER SUA DIREÇÃO</label>
        <input
          type="text"
          placeholder="Seu primeiro nome"
          value={name}
          onChange={e => setName(e.target.value)}
          style={S.input}
          onKeyDown={e => e.key === 'Enter' && name.trim() && onSubmit(name.trim())}
        />

        <button
          style={{
            ...S.btn,
            opacity: name.trim() ? 1 : 0.4,
            cursor: name.trim() ? 'pointer' : 'not-allowed',
          }}
          onClick={() => name.trim() && onSubmit(name.trim())}
          disabled={!name.trim()}
        >
          VER MINHA DIREÇÃO DE ORAÇÃO →
        </button>

        <p style={S.brand}>Esposa Intercessora · Devocional</p>
      </div>
    </div>
  )
}

function LoadingScreen({ name, onDone }) {
  const [step, setStep] = useState(0)

  const checks = [
    'Lendo suas respostas com cuidado',
    'Identificando a área que mais tocou seu coração',
    'Preparando sua direção de oração',
  ]

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2800),
      setTimeout(() => onDone(), 3800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={S.iconCircle}>🙏</div>
          <h2 style={{ ...S.heading, fontSize: '18px', marginBottom: '8px' }}>
            {name}, estamos calculando<br />sua direção de oração...
          </h2>
          <p style={S.subheading}>
            Suas respostas estão sendo analisadas para entregar um resultado personalizado para o seu momento.
          </p>
        </div>

        {/* Barra de progresso animada */}
        <div style={{ ...S.progressBar, marginBottom: '20px', height: '6px' }}>
          <div style={{
            ...S.progressFill((step / 3) * 100),
            height: '6px',
          }} />
        </div>

        <div>
          {checks.map((check, i) => (
            <div key={i} style={S.loadingCheck(step > i)}>
              <span style={S.loadingCheckIcon(step > i)}>
                {step > i ? '✓' : '○'}
              </span>
              <span style={S.loadingCheckText(step > i)}>{check}</span>
            </div>
          ))}
        </div>

        <p style={S.brand}>Esposa Intercessora · Devocional</p>
      </div>
    </div>
  )
}

function LoadingScreen2({ name, onDone }) {
  const [step, setStep] = useState(0)

  const checks = [
    'Separando as áreas de oração para você',
    'Organizando seu caminho de 30 dias',
    'Preparando próximo passo para começar hoje',
  ]

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 700),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2500),
      setTimeout(() => onDone(), 3400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={S.iconCircle}>📖</div>
          <h2 style={{ ...S.heading, fontSize: '18px', marginBottom: '8px' }}>
            {name}, ajustes finais...
          </h2>
          <p style={S.subheading}>
            Preparando seu Devocional Esposa Intercessora com base na direção de oração que apareceu no seu resultado.
          </p>
        </div>

        <div style={{ ...S.progressBar, marginBottom: '20px', height: '6px' }}>
          <div style={{
            ...S.progressFill((step / 3) * 100),
            height: '6px',
          }} />
        </div>

        <div>
          {checks.map((check, i) => (
            <div key={i} style={S.loadingCheck(step > i)}>
              <span style={S.loadingCheckIcon(step > i)}>
                {step > i ? '✓' : '○'}
              </span>
              <span style={S.loadingCheckText(step > i)}>{check}</span>
            </div>
          ))}
        </div>

        <p style={S.brand}>Esposa Intercessora · Devocional</p>
      </div>
    </div>
  )
}

function ResultScreen({ name, result, onContinue }) {
  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={S.iconCircle}>{result.icon}</div>
          <div style={S.resultTag}>{result.tag}</div>
          <h2 style={S.resultTitle}>
            {name}, {result.title}
          </h2>
        </div>

        <div style={S.resultBox}>
          <p style={S.resultBoxText}>{result.text}</p>
          <div style={S.resultDirection}>
            <span style={S.resultDirectionLabel}>✦ Sua direção de oração</span>
            <p style={S.resultDirectionText}>{result.direction}</p>
          </div>
        </div>

        <button
          style={S.btn}
          onClick={onContinue}
        >
          QUERO COMEÇAR MEUS 30 DIAS DE ORAÇÃO →
        </button>

        <p style={S.brand}>Esposa Intercessora · Devocional</p>
      </div>
    </div>
  )
}

function SalesScreen({ name, result }) {
  return (
    <div style={S.wrapper}>
      <div style={S.card}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--dourado)', marginBottom: '8px' }}>
            {name}, agora você já sabe por onde começar
          </p>
          <h2 style={{ ...S.heading, fontSize: '20px', marginBottom: '8px' }}>
            Você não precisa carregar isso sozinha.
          </h2>
          <p style={S.subheading}>
            O Devocional Esposa Intercessora te guia por 30 dias de oração com fé, direção e constância — para entregar seu marido nas mãos de Deus um dia de cada vez.
          </p>
        </div>

        {/* O que recebe */}
        <div style={{
          background: 'var(--creme)',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          {[
            ['🛡', 'Proteção física e espiritual'],
            ['✝', 'Fé e volta para Deus'],
            ['💚', 'Saúde do corpo, da mente e da alma'],
            ['⚖', 'Caráter, escolhas e relacionamentos'],
            ['🌟', 'Futuro, propósito e provisão'],
            ['🎁', 'BÔNUS: Orações de Emergência'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '13px', color: 'var(--texto)' }}>
              <span style={{ fontSize: '16px' }}>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Depoimentos */}
        <div style={{
          borderLeft: '3px solid var(--dourado-claro)',
          paddingLeft: '14px',
          marginBottom: '12px',
        }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '12.5px', color: 'var(--texto)', lineHeight: '1.6', marginBottom: '4px' }}>
            "Comecei sem fé nenhuma, só por desespero. Hoje no dia 15 vejo meu marido diferente. Mais calmo. Voltou a me abraçar."
          </p>
          <span style={{ fontSize: '11px', color: 'var(--texto-leve)', letterSpacing: '1px' }}>APARECIDA S., 62 ANOS · SÃO PAULO</span>
        </div>

        <div style={{
          borderLeft: '3px solid var(--dourado-claro)',
          paddingLeft: '14px',
          marginBottom: '20px',
        }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '12.5px', color: 'var(--texto)', lineHeight: '1.6', marginBottom: '4px' }}>
            "Faz anos que meu marido não falava de Deus. No dia 22 do devocional ele me perguntou o horário da missa. Estou em lágrimas."
          </p>
          <span style={{ fontSize: '11px', color: 'var(--texto-leve)', letterSpacing: '1px' }}>ROSA M., 58 ANOS · GOIÂNIA</span>
        </div>

        {/* Preço */}
        <div style={{ ...S.priceBox, marginBottom: '16px' }}>
          <span style={S.priceOld}>De R$ 197,00 por apenas</span>
          <span style={S.priceNew}>R$ 37</span>
          <span style={S.priceSub}>Pix instantâneo · Acesso imediato pelo celular</span>
        </div>

        <a
          href={CAKTO_LINK}
          style={S.ctaBtn}
          target="_blank"
          rel="noopener noreferrer"
        >
          QUERO COMEÇAR MEUS 30 DIAS DE ORAÇÃO →
        </a>

        <div style={{
          background: 'var(--creme)',
          borderRadius: '8px',
          padding: '12px',
          textAlign: 'center',
          marginBottom: '12px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: 'var(--marrom)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            GARANTIA INCONDICIONAL DE 7 DIAS
          </p>
          <p style={{ fontSize: '12px', color: 'var(--texto-leve)', lineHeight: '1.5' }}>
            Se em 7 dias você sentir que esse devocional não é pra você, devolvemos 100% do seu investimento.
          </p>
        </div>

        <p style={{ ...S.guarantee, marginBottom: '8px' }}>
          Acesso imediato pelo celular. Você pode ler online, baixar ou imprimir para rezar com mais calma.
        </p>

        <p style={S.brand}>Esposa Intercessora · Devocional</p>
      </div>
    </div>
  )
}

// ─── MÁQUINA DE ESTADOS PRINCIPAL ───────────────────────────────────────────

export default function Home() {
  const [screen, setScreen] = useState('landing') // landing | quiz | name | loading1 | result | loading2 | sales
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState('')

  function handleAnswer(answer) {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setScreen('name')
    }
  }

  function handleName(name) {
    setUserName(name)
    setScreen('loading1')
  }

  const result = answers.length === QUESTIONS.length ? getResult(answers) : null

  return (
    <>
      <Head>
        <title>Esposa Intercessora — 30 Dias de Oração pelo Meu Marido</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {screen === 'landing' && (
        <LandingScreen onStart={() => setScreen('quiz')} />
      )}

      {screen === 'quiz' && (
        <QuizScreen
          question={QUESTIONS[currentQuestion]}
          questionIndex={currentQuestion}
          total={QUESTIONS.length}
          onAnswer={handleAnswer}
        />
      )}

      {screen === 'name' && (
        <NameScreen onSubmit={handleName} />
      )}

      {screen === 'loading1' && (
        <LoadingScreen
          name={userName}
          onDone={() => setScreen('result')}
        />
      )}

      {screen === 'result' && result && (
        <ResultScreen
          name={userName}
          result={result}
          onContinue={() => setScreen('loading2')}
        />
      )}

      {screen === 'loading2' && (
        <LoadingScreen2
          name={userName}
          onDone={() => setScreen('sales')}
        />
      )}

      {screen === 'sales' && result && (
        <SalesScreen
          name={userName}
          result={result}
        />
      )}
    </>
  )
}
