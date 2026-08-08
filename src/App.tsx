import { useState } from 'react'
import UseStateCounter from './examples/UseStateCounter'
import './App.css'

type ExampleId = 'useState-counter'

const examples: { id: ExampleId; label: string }[] = [
  { id: 'useState-counter', label: 'useState — Counter' },
]

function App() {
  const [activeExample, setActiveExample] = useState<ExampleId>('useState-counter')

  return (
    <>
      <section id="center">
        <div>
          <h1>React Basics</h1>
          <p>Functional examples — switch below to explore each concept.</p>
        </div>

        <nav className="example-nav" aria-label="Examples">
          {examples.map((example) => (
            <button
              key={example.id}
              type="button"
              className={activeExample === example.id ? 'active' : undefined}
              onClick={() => setActiveExample(example.id)}
            >
              {example.label}
            </button>
          ))}
        </nav>

        {activeExample === 'useState-counter' && <UseStateCounter />}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
