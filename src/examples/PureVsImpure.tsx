import { useState } from 'react';

/**
 * Pure vs impure functions
 *
 * A pure function’s result depends only on its arguments.
 * An impure function can also read something outside those arguments
 * (here: an uncontrolled checkbox in the DOM).
 *
 * Toggle the checkbox, then change base/extra — only then does React
 * re-render and re-read the checkbox. Same (base, extra) to the impure
 * function can yield different results depending on the checkbox.
 */
function calculatePure(base: number, extra: number): number {
  return base + extra;
}

function calculateImpure(base: number, extra: number): number {
  const checkbox = document.getElementById('include-bonus') as HTMLInputElement | null;
  const includeBonus = checkbox?.checked ?? false;
  const sum = base + extra;
  return includeBonus ? sum * 1.1 : sum;
}

function PureVsImpure() {
  const [base, setBase] = useState(10);
  const [extra, setExtra] = useState(5);

  const pureResult = calculatePure(base, extra);
  const impureResult = calculateImpure(base, extra);

  return (
    <div>
      <h2>Pure vs impure — Add 10%</h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <div>
          Base: <code>{base}</code>
        </div>
        <div>
          <button type="button" className="counter" onClick={() => setBase(base - 1)}>
            −
          </button>
          <button type="button" className="counter" onClick={() => setBase(base + 1)}>
            +
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <div>
          Extra: <code>{extra}</code>
        </div>
        <div>
          <button type="button" className="counter" onClick={() => setExtra(extra - 1)}>
            −
          </button>
          <button type="button" className="counter" onClick={() => setExtra(extra + 1)}>
            +
          </button>
        </div>
      </div>

      <p>
        <label>
          <input id="include-bonus" type="checkbox" /> Include 10% bonus
        </label>
      </p>

      <p>
        Pure: <code>{pureResult}</code>
        {' — '}
        <code>calculatePure(base, extra, includeBonus)</code>
      </p>
      <p>
        Impure: <code>{impureResult}</code>
        {' — '}
        <code>calculateImpure(base, extra)</code> (reads checkbox in the DOM)
      </p>
    </div>
  );
}

export default PureVsImpure;
