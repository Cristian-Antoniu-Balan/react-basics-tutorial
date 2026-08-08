import { useState } from 'react';
import UseStateCounter from './examples/UseStateCounter';
import ClassCounter from './examples/ClassCounter';
import PureVsImpure from './examples/PureVsImpure';
import './App.css';

type ExampleId = 'useState-counter' | 'class-counter' | 'pure-vs-impure';

const examples: { id: ExampleId; label: string }[] = [
  { id: 'useState-counter', label: 'useState — Counter' },
  { id: 'class-counter', label: 'Class — Counter' },
  { id: 'pure-vs-impure', label: 'Pure vs impure' },
];

function App() {
  const [activeExample, setActiveExample] = useState<number>(2);

  return (
    <>
      <section id='center'>
        <div>
          <h1>React Basics</h1>
          <p>Functional examples — switch below to explore each concept.</p>
        </div>

        <nav className='example-nav' aria-label='Examples'>
          {examples.map((example, index) => (
            <button
              key={example.id}
              type='button'
              className={activeExample === index ? 'active' : undefined}
              onClick={() => setActiveExample(index)}
            >
              {example.label}
            </button>
          ))}
        </nav>

        {activeExample === 0 && <UseStateCounter />}
        {activeExample === 1 && <ClassCounter />}
        {activeExample === 2 && <PureVsImpure />}
      </section>

      <div className='ticks'></div>
      <section id='spacer'></section>
    </>
  );
}

export default App;
