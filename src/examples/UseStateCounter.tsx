import { useState } from 'react';

/**
 * Lesson 3 — useState
 *
 * useState gives a component its own data that can change over time.
 * When you call the setter, React re-renders the component with the new value.
 */
function UseStateCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>useState — Counter</h2>
      <p>
        Count is <code>{count}</code>
      </p>
      <div>
        <button type="button" className="counter" onClick={() => setCount(count + 1)}>
          Increase
        </button>
        <button type="button" className="counter" onClick={() => setCount(count - 1)}>
          Decrease
        </button>
        <button type="button" className="counter" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default UseStateCounter;
