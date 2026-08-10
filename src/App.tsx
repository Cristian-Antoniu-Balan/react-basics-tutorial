import { useState, type ReactNode } from 'react';
import UseStateCounter from './examples/UseStateCounter';
import ClassCounter from './examples/ClassCounter';
import PureVsImpure from './examples/PureVsImpure';
import PrettierAndTailwind from './examples/PrettierAndTailwind';
import Timer from './examples/Timer';
import LiftingState from './examples/LiftingState';
import DemoMenu from './examples/DemoMenu';
import './App.css';

type Demo = {
  id: string;
  step: number;
  title: string;
  element: ReactNode;
};

// Add a new example = one object in this list (no other file changes for the menu).
const demos: Demo[] = [
  { id: 'useState-counter', step: 1, title: 'useState — Counter', element: <UseStateCounter /> },
  { id: 'class-counter', step: 2, title: 'Class — Counter', element: <ClassCounter /> },
  { id: 'pure-vs-impure', step: 3, title: 'Pure vs impure', element: <PureVsImpure /> },
  { id: 'prettier-tailwind', step: 4, title: 'Prettier + Tailwind', element: <PrettierAndTailwind /> },
  { id: 'useEffect-timer', step: 5, title: 'useEffect — Timer', element: <Timer /> },
  { id: 'lifting-state', step: 6, title: 'Lifting state', element: <LiftingState /> },
  { id: 'demo-menu', step: 7, title: 'Meniu demos', element: <DemoMenu /> }
];

type DemoTabProps = {
  title: string;
  step: number;
  isActive: boolean;
  onSelect: () => void;
};

/** Concept name in the button; step number as a corner badge (not jammed into the label). */
function DemoTab({ title, step, isActive, onSelect }: DemoTabProps) {
  return (
    <button
      type="button"
      className={isActive ? 'demo-tab active' : 'demo-tab'}
      onClick={onSelect}
      aria-current={isActive ? 'page' : undefined}
    >
      {title}
      <span className="demo-tab-badge">{step}</span>
    </button>
  );
}

function App() {
  // Single source of truth for navigation: the active id.
  // Title, step, and content are DERIVED with find — we do not store the selected element in state.
  // useState lives in memory → refresh resets to the initial value below.
  const [activeId, setActiveId] = useState(demos[demos.length - 1].id);
  const active = demos.find(d => d.id === activeId) ?? demos[0];

  return (
    <>
      <section id="center">
        <div>
          <h1>React Basics</h1>
          <p>Functional examples — switch below to explore each concept.</p>
        </div>

        <nav className="example-nav" aria-label="Examples">
          {demos.map(demo => (
            <DemoTab
              key={demo.id}
              title={demo.title}
              step={demo.step}
              isActive={demo.id === active.id}
              onSelect={() => setActiveId(demo.id)}
            />
          ))}
        </nav>

        <main className="demo-main">
          <h2>
            Pas {active.step} — {active.title}
          </h2>
          {active.element}
        </main>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
