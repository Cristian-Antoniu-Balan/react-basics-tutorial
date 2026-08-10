/**
 * Prettier — formats code to a consistent style (quotes, semicolons, line width).
 * Tailwind CSS — utility classes in JSX instead of custom CSS for layout/spacing/color.
 *
 * This example shows before → after for both tools side by side.
 */
function PrettierAndTailwind() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 text-left">
      <h2 className="text-center">Prettier + Tailwind</h2>
      <p className="text-center text-[var(--text)]">
        Tooling lesson: consistent formatting (<code>Prettier</code>) and utility-first styling (
        <code>Tailwind CSS</code>).
      </p>

      <section className="space-y-3">
        <h3 className="m-0 text-lg font-medium text-[var(--text-h)]">Prettier — before / after</h3>
        <p className="text-sm text-[var(--text)]">
          Same logic; Prettier applies <code>semi</code>, double quotes, <code>printWidth: 120</code>, and{' '}
          <code>arrowParens: &quot;avoid&quot;</code>.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <SnippetPanel title="Before">
            {`const greet = (name) => {
  return 'Hello, ' + name
}
const long = { a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10,k:11,l:12 }`}
          </SnippetPanel>
          <SnippetPanel title="After">
            {`const greet = name => {
  return "Hello, " + name;
};
const long = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12 };`}
          </SnippetPanel>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="m-0 text-lg font-medium text-[var(--text-h)]">Tailwind — before / after</h3>
        <p className="text-sm text-[var(--text)]">
          Same card UI: custom CSS / inline styles vs Tailwind utility classes on the element.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="m-0 text-center text-sm font-medium text-[var(--text-h)]">Before (inline styles)</p>
            <div
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--social-bg)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <p style={{ margin: 0, color: 'var(--text-h)', fontWeight: 500 }}>Task card</p>
              <p style={{ margin: '8px 0 0', fontSize: '14px' }}>Styled without Tailwind utilities.</p>
            </div>
            <SnippetPanel title="Code">
              {`<div style={{ padding: "16px", borderRadius: "8px", border: "1px solid var(--border)" }}>
  ...
</div>`}
            </SnippetPanel>
          </div>

          <div className="space-y-2">
            <p className="m-0 text-center text-sm font-medium text-[var(--text-h)]">After (Tailwind)</p>
            <div className="rounded-lg border border-[var(--border)] bg-[var(--social-bg)] p-4 shadow-[var(--shadow)]">
              <p className="m-0 font-medium text-[var(--text-h)]">Task card</p>
              <p className="mt-2 mb-0 text-sm">Styled with Tailwind utility classes.</p>
            </div>
            <SnippetPanel title="Code">
              {`<div className="rounded-lg border border-[var(--border)] bg-[var(--social-bg)] p-4 shadow-[var(--shadow)]">
  ...
</div>`}
            </SnippetPanel>
          </div>
        </div>
      </section>
    </div>
  );
}

function SnippetPanel({ title, children }: { title: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--code-bg)]">
      <p className="m-0 border-b border-[var(--border)] px-3 py-2 text-xs font-medium tracking-wide text-[var(--text-h)] uppercase">
        {title}
      </p>
      <pre className="m-0 overflow-x-auto p-3 text-left text-xs leading-relaxed whitespace-pre-wrap text-[var(--text-h)]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default PrettierAndTailwind;
