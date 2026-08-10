import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react';

/**
 * Tiparul meniului în miniatură (~15 linii de logică):
 *   1) array de intrări
 *   2) useState cu activeId
 *   3) active = find(...) ?? first
 *   4) butoane sus + conținut activ dedesubt
 *
 * Sursa unică de adevăr = ID-ul activ. Restul UI-ului se DERIVĂ din el
 * (nu ținem în state și lista, și elementul selectat).
 */

type MiniDemo = {
  id: string;
  step: number;
  title: string;
  body: string;
};

const miniDemos: MiniDemo[] = [
  { id: 'alpha', step: 1, title: 'Alpha', body: 'Conținut Alpha — primul tipar.' },
  { id: 'beta', step: 2, title: 'Beta', body: 'Conținut Beta — al doilea tipar.' },
  { id: 'gamma', step: 3, title: 'Gamma', body: 'Conținut Gamma — al treilea tipar.' }
];

const STORAGE_KEY = 'demo-menu-prefs';

type Theme = 'light' | 'dark';

type Prefs = {
  activeId: string;
  theme: Theme;
};

type PrefsContextValue = {
  prefs: Prefs;
  setActiveId: (id: string) => void;
  setTheme: (theme: Theme) => void;
};

const PrefsContext = createContext<PrefsContextValue | null>(null);

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { activeId: miniDemos[0].id, theme: 'light' };
    }
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      activeId: parsed.activeId ?? miniDemos[0].id,
      theme: parsed.theme === 'dark' ? 'dark' : 'light'
    };
  } catch {
    return { activeId: miniDemos[0].id, theme: 'light' };
  }
}

function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(readPrefs);

  // Persist whenever prefs change — survives refresh.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const value: PrefsContextValue = {
    prefs,
    setActiveId: id => setPrefs(prev => ({ ...prev, activeId: id })),
    setTheme: theme => setPrefs(prev => ({ ...prev, theme }))
  };

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

function usePrefs(): PrefsContextValue {
  const ctx = useContext(PrefsContext);
  if (!ctx) {
    throw new Error('usePrefs must be used inside PrefsProvider');
  }
  return ctx;
}

/** Same ~15-line menu pattern — selection lives only in useState (lost on refresh). */
function LocalMiniMenu() {
  // LOCAL: memory only → F5 resets to the initial id.
  const [activeId, setActiveId] = useState(miniDemos[0].id);
  const active = miniDemos.find(d => d.id === activeId) ?? miniDemos[0];

  return (
    <div className="mini-menu-panel">
      <h3>LOCAL (useState)</h3>
      <p className="mini-menu-hint">Se pierde la refresh.</p>
      <nav className="mini-menu-nav" aria-label="Local mini demos">
        {miniDemos.map(demo => (
          <button
            key={demo.id}
            type="button"
            className={demo.id === active.id ? 'demo-tab active' : 'demo-tab'}
            onClick={() => setActiveId(demo.id)}
          >
            {demo.title}
            <span className="demo-tab-badge">{demo.step}</span>
          </button>
        ))}
      </nav>
      <p>
        Pas {active.step} — {active.title}: {active.body}
      </p>
    </div>
  );
}

/** Same pattern, but activeId + theme come from context backed by localStorage. */
function GlobalMiniMenu() {
  const { prefs, setActiveId, setTheme } = usePrefs();
  const active = miniDemos.find(d => d.id === prefs.activeId) ?? miniDemos[0];

  return (
    <div className={`mini-menu-panel mini-menu-panel--${prefs.theme}`}>
      <h3>GLOBAL (context + localStorage)</h3>
      <p className="mini-menu-hint">Rămâne după refresh.</p>
      <nav className="mini-menu-nav" aria-label="Global mini demos">
        {miniDemos.map(demo => (
          <button
            key={demo.id}
            type="button"
            className={demo.id === active.id ? 'demo-tab active' : 'demo-tab'}
            onClick={() => setActiveId(demo.id)}
          >
            {demo.title}
            <span className="demo-tab-badge">{demo.step}</span>
          </button>
        ))}
      </nav>
      <p>
        Pas {active.step} — {active.title}: {active.body}
      </p>
      <button
        type="button"
        className="counter"
        onClick={() => setTheme(prefs.theme === 'light' ? 'dark' : 'light')}
      >
        Temă: {prefs.theme}
      </button>
    </div>
  );
}

export function DemoMenu() {
  return (
    <div className="demo-menu">
      <p>
        Meniul de sus din <code>App</code> nu e magie: e un registru + un id activ. Mai jos, același
        tipar în miniatură, apoi LOCAL vs GLOBAL.
      </p>

      <div className="mini-menu-compare">
        <LocalMiniMenu />
        <PrefsProvider>
          <GlobalMiniMenu />
        </PrefsProvider>
      </div>
    </div>
  );
}

export default DemoMenu;
