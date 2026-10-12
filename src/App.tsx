import { useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ChevronDown,
  CircleHelp,
  Hash,
  RotateCcw,
  WandSparkles,
} from 'lucide-react'
import './App.css'
import {
  castReading,
  hexagramSymbol,
  type Reading,
} from './lib/divination'

const CURRENT_YEAR = new Date().getFullYear()

function HexagramLines({
  lines,
  changingLine,
  compact = false,
}: {
  lines: number[]
  changingLine?: number
  compact?: boolean
}) {
  return (
    <div className={`hexagram-lines ${compact ? 'is-compact' : ''}`} aria-label="六爻卦象">
      {[...lines].reverse().map((line, visualIndex) => {
        const lineNumber = 6 - visualIndex
        const changing = changingLine === lineNumber
        return (
          <div
            className={`yao ${line ? 'yang' : 'yin'} ${changing ? 'is-changing' : ''}`}
            key={lineNumber}
            title={`第 ${lineNumber} 爻${changing ? '，动爻' : ''}`}
          >
            {line ? <span /> : <><span /><span /></>}
            {changing && <i>{line ? '○' : '×'}</i>}
          </div>
        )
      })}
    </div>
  )
}

function InputStep({
  question,
  number,
  error,
  onQuestion,
  onNumber,
  onCast,
}: {
  question: string
  number: string
  error: string
  onQuestion: (value: string) => void
  onNumber: (value: string) => void
  onCast: () => void
}) {
  return (
    <main className="reading-shell input-state">
      <section className="intro">
        <p className="eyebrow">数字起卦 · 决策参考</p>
        <h1>观象决</h1>
        <p className="intro-copy">
          拿不定主意时，输入此刻第一眼看见的数字。
          用一份清楚、可解释的卦象提示，换个角度审视选择。
        </p>
        <div className="how-it-works" aria-label="使用步骤">
          <span><b>1</b>心中定一事</span>
          <span><b>2</b>取第一眼数字</span>
          <span><b>3</b>查看行动提示</span>
        </div>
      </section>

      <section className="casting-panel" aria-labelledby="casting-title">
        <div className="panel-heading">
          <span>现在开始</span>
          <h2 id="casting-title">你在为什么事犹豫？</h2>
        </div>
        <label className="field">
          <span>想问的事 <small>选填</small></span>
          <textarea
            value={question}
            onChange={(event) => onQuestion(event.target.value)}
            maxLength={80}
            placeholder="例如：我是否应该接受这份工作？"
            rows={2}
          />
          <em>{question.length}/80</em>
        </label>

        <label className="field number-field">
          <span>第一眼看到的数字</span>
          <div className="number-input">
            <Hash size={24} aria-hidden="true" />
            <input
              value={number}
              onChange={(event) => onNumber(event.target.value.replace(/[^\d]/g, '').slice(0, 18))}
              inputMode="numeric"
              autoComplete="off"
              placeholder="例如 35"
              aria-describedby={error ? 'number-error' : 'number-hint'}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onCast()
              }}
            />
          </div>
          <p id="number-hint">可以是时间、电量、页码或门牌。第一眼为准，不挑不换。</p>
          {error && <strong id="number-error" role="alert">{error}</strong>}
        </label>

        <button type="button" className="cast-button" onClick={onCast}>
          <WandSparkles size={19} />
          查看卦象提示
        </button>
        <p className="disclaimer">
          仅用于文化体验和决策反思，不代替专业意见。
        </p>
      </section>
    </main>
  )
}

function ResultStep({
  reading,
  question,
  onReset,
}: {
  reading: Reading
  question: string
  onReset: () => void
}) {
  const dateText = new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(reading.timestamp)

  return (
    <main className="result-shell">
      <button className="back-button" type="button" onClick={onReset}>
        <ArrowLeft size={17} />
        重新取数
      </button>

      <header className="result-header">
        <div>
          <p className="eyebrow">本次所问 · {dateText}</p>
          <h1>{question || '此刻心中所问'}</h1>
        </div>
        <span className="source-number">取数 {reading.input}</span>
      </header>

      <section className="verdict-summary" aria-label="行动结论">
        <div className={`verdict verdict-${reading.tendency}`}>
          <span>行动倾向</span>
          <strong>{reading.tendency}</strong>
        </div>
        <div>
          <p>先看结论</p>
          <h2>{reading.tendencyNote}</h2>
          <span>{reading.primary.action}</span>
        </div>
      </section>

      <section className="reading-stage" aria-label="卦象结果">
        <div className="hexagram-visual">
          <div className="hexagram-name">
            <span>{hexagramSymbol(reading.primary.number)}</span>
            <p>第 {reading.primary.number} 卦</p>
            <h2>{reading.primary.name}</h2>
            <em>{reading.primary.theme}</em>
          </div>
          <HexagramLines lines={reading.primaryLines} changingLine={reading.changingLine} />
          <div className="trigram-labels">
            <span>上卦 · {reading.upper.nature}{reading.upper.name}</span>
            <span>下卦 · {reading.lower.nature}{reading.lower.name}</span>
          </div>
        </div>

        <div className="reading-interpretation">
          <div className="judgement">
            <p>主卦解读</p>
            <blockquote>{reading.primary.insight}</blockquote>
          </div>
          <div className="changing">
            <div>
              <p>第 {reading.changingLine} 爻动</p>
              <ArrowDown size={16} />
              <p>之卦 · {reading.transformed.name}</p>
            </div>
            <HexagramLines lines={reading.transformedLines} compact />
            <span>{reading.transformed.insight}</span>
          </div>
        </div>
      </section>

      <section className="reflection">
        <div className="section-title">
          <span>问</span>
          <div>
            <p>落回现实</p>
            <h2>做决定前，再问自己三件事</h2>
          </div>
        </div>
        <div className="reflection-grid">
          <article>
            <i>01</i>
            <h3>我真正担心的是什么？</h3>
            <p>把模糊的不安写成一个可以核实的风险。</p>
          </article>
          <article>
            <i>02</i>
            <h3>最小可逆的一步是什么？</h3>
            <p>先用低成本行动获取信息，而不是一次押注。</p>
          </article>
          <article>
            <i>03</i>
            <h3>什么事实会让我改变决定？</h3>
            <p>提前设定判断条件，避免只寻找支持自己的证据。</p>
          </article>
        </div>
      </section>

      <details className="method">
        <summary>
          <span><CircleHelp size={17} />本次卦象如何得出</span>
          <ChevronDown size={18} />
        </summary>
        <div className="method-content">
          <p>
            图片所示方法先将多位数逐位相加：{reading.input.split('').join(' + ')}
            {' = '}{reading.digitSum}。数字 0 按坤数 8 处理，超过 8 则循环取八卦。
          </p>
          <p>
            上卦取数为 {reading.upper.index}，得{reading.upper.name}；下卦结合起卦时刻之数
            {reading.timeSeed}，取数为 {reading.lower.index}，得{reading.lower.name}；
            六爻循环得第 {reading.changingLine} 爻动。
          </p>
          <p>
            行动提示综合主卦与变卦的传统意象，转换成“宜行、审慎行、暂缓”三档。
            它是一套可解释的反思框架，不是对未来的事实预测。
          </p>
        </div>
      </details>

      <button className="again-button" type="button" onClick={onReset}>
        <RotateCcw size={17} />
        再问一事
      </button>
    </main>
  )
}

function App() {
  const [question, setQuestion] = useState('')
  const [number, setNumber] = useState('')
  const [reading, setReading] = useState<Reading | null>(null)
  const [error, setError] = useState('')
  const handleCast = () => {
    if (!number) {
      setError('请写下第一眼看见的数字')
      return
    }
    setError('')
    setReading(castReading(number))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNumber = (value: string) => {
    setNumber(value)
    if (value) setError('')
  }

  return (
    <div className="app">
      <nav className="site-nav">
        <a href="/" className="brand" onClick={(event) => event.preventDefault()}>
          <span>观</span>
          <div>
            <strong>观象决</strong>
            <small>GUAN XIANG JUE</small>
          </div>
        </a>
        <div className="nav-note">
          <span>取数 · 起卦 · 决策提示</span>
        </div>
      </nav>

      {reading ? (
        <ResultStep reading={reading} question={question} onReset={() => setReading(null)} />
      ) : (
        <InputStep
          question={question}
          number={number}
          error={error}
          onQuestion={setQuestion}
          onNumber={handleNumber}
          onCast={handleCast}
        />
      )}

      <footer>
        <p>观象决 · 数字起卦与决策反思</p>
        <span>{CURRENT_YEAR} · 敬畏传统，理性决策</span>
      </footer>
    </div>
  )
}

export default App
