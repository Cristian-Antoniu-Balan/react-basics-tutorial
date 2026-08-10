import { useState } from 'react';

/**
 * Lifting state — o singură sursă de adevăr în părinte.
 *
 * Analogie (backend): nu ții aceeași sumă în două tabele care se pot desincroniza.
 * Ții RON-ul o dată; punctele sunt doar o VEDERE (amount * rate).
 *
 * Copilul CONTROLAT = fără useState propriu. Primește valoarea (props)
 * și cere schimbarea prin callback (onChange) — ca un input controlat.
 */

type PriceCardProps = {
  label: string;
  amount: number;
  currency: string;
  step?: number;
  onChange: (next: number) => void;
};

/** Copil controlat: afișează + −, dar nu „deține” suma. */
function PriceCard({ label, amount, currency, step = 1, onChange }: PriceCardProps) {
  return (
    <div className="price-card">
      <p>
        {label}:{' '}
        <code>
          {amount} {currency}
        </code>
      </p>
      <div>
        <button type="button" className="counter" onClick={() => onChange(amount - step)}>
          −{step}
        </button>
        <button type="button" className="counter" onClick={() => onChange(amount + step)}>
          +{step}
        </button>
      </div>
    </div>
  );
}

export function LiftingState() {
  // Singura sursă de adevăr — trăiește AICI, în părinte.
  const [amount, setAmount] = useState(10);
  const rate = 5; // 1 RON = 5 puncte (curs fictiv)

  return (
    <div>
      <h2>Lifting state — RON ↔ puncte</h2>
      <p>
        Stare în părinte: <code>{amount} RON</code> (= {amount * rate} puncte)
      </p>

      {/* Ambele carduri citesc / scriu ACEEAȘI stare */}
      <PriceCard label="Lei" amount={amount} currency="RON" onChange={setAmount} />
      <PriceCard
        label="Puncte fidelitate"
        amount={amount * rate}
        currency="pct"
        step={rate}
        // puncte → RON: împărțim la curs; round ca să rămânem pe întregi
        onChange={next => setAmount(Math.round(next / rate))}
      />
    </div>
  );
}

export default LiftingState;
