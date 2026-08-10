import { useEffect, useState } from 'react';

/**
 * Lesson 6 — useEffect (timer + click tracker)
 *
 * useEffect = place for side effects (timers, listeners, fetch).
 * It runs AFTER paint — never put that work in the component body.
 *
 * Cleanup = the function you return from the effect. React calls it
 * before the effect re-runs, and when the component unmounts.
 */

/** Module-level counter: each body-click subscription gets an id. */
let subscriptionCount = 0;

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  // --- Effect 1: interval while running ---------------------------------
  // Dependency: [running]. When running flips, React:
  //   1) runs the previous cleanup (clearInterval)
  //   2) runs this effect again
  // Without cleanup, fast Pause/Start would leave multiple intervals
  // ("zombie timers" → memory leak / seconds jumping by more than 1).
  useEffect(() => {
    console.log('[timer] effect run — running =', running);

    if (!running) {
      console.log('[timer] not running — no interval started');
      return;
    }

    console.log('[timer] starting setInterval');
    const id = window.setInterval(() => {
      // Functional updater: always based on latest seconds
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      console.log('[timer] cleanup — clearInterval (runs BEFORE next effect / on leave)');
      window.clearInterval(id);
    };
  }, [running]);

  // --- Effect 2: click telemetry on document.body -----------------------
  // Deps [] → mount only (when you open this example).
  // Intentionally NO removeEventListener yet — leave the example and
  // come back: watch subscriptionCount grow and duplicate logs.
  useEffect(() => {
    subscriptionCount += 1;
    const trackerId = subscriptionCount;
    console.log(`[tracker #${trackerId}] subscribe — active subscriptions: ${subscriptionCount}`);

    function onBodyClick(event: MouseEvent) {
      const target = event.target;
      console.log('clicked >> ', target);
      if (!(target instanceof Element)) {
        return;
      }

      const tag = target.tagName.toLowerCase();
      const x = Math.round(event.pageX);
      const y = Math.round(event.pageY);

      // Own text only (direct TEXT_NODE children).
      // Do NOT use textContent: a click on <body> would dump the whole page.
      const ownText = Array.from(target.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => (node.textContent ?? '').trim())
        .filter(text => text.length > 0)
        .join(' ');

      let detail: string;
      if (ownText.length > 0) {
        detail = `"${ownText}"`;
      } else {
        // classList, not className: on SVG, className is SVGAnimatedString.
        const classes = Array.from(target.classList).slice(0, 3);
        detail = classes.length > 0 ? classes.join(' ') : '(no text/class)';
      }

      // READ-ONLY vs React: no setState, no DOM writes, no fetch — log only.
      console.log(`track click → ${tag} ${detail} @ ${x}×${y}  (tracker #${trackerId}, active: ${subscriptionCount})`);
    }

    document.body.addEventListener('click', onBodyClick);
    // cleanup / removeEventListener — added later with the trainer
    return () => removeEventListener('click', onBodyClick);
  }, []);

  return (
    <div>
      <h2>useEffect — Timer + click tracker</h2>
      <p>
        Seconds: <code>{seconds}</code>
        {' — '}
        {running ? 'running' : 'paused'}
      </p>
      <p>Open DevTools Console, then Pause / Start / Reset and switch examples.</p>
      <div>
        <button type="button" className="counter" onClick={() => setRunning(r => !r)}>
          {running ? 'Pauză' : 'Pornește'}
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
