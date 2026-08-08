# Requirements

## Project purpose

A hands-on React learning project for **experienced developers who are new to JavaScript and React** (background in Python, Java, C#, etc.). The goal is to learn every concept needed to build real React applications — not to receive a finished codebase.

## Teaching model

These rules apply to all AI-assisted lessons in this repository:

| Rule | Meaning |
| ---- | ------- |
| No upfront codegen | AI must not scaffold or dump full solutions at the start |
| Step-by-step | One concept at a time: explain → small exercise → review → next |
| Understand then apply | Each step ends with the learner implementing something in the growing app |
| Wait for confirmation | Do not advance until the current step is done or the learner asks to skip |

## Target learner profile

- Knows programming fundamentals (variables, functions, OOP, async concepts)
- Does **not** know JavaScript syntax, npm, or React
- Benefits from analogies to prior languages (e.g., props ≈ constructor arguments, state ≈ instance fields, hooks ≈ lifecycle methods)

## Tech stack

| Layer | Choice | Notes |
| ----- | ------ | ----- |
| UI library | React 19+ | Functional components and hooks only |
| Language | TypeScript | Typed props, interfaces, and state from early lessons |
| Build tool | Vite | Fast dev server, modern ESM-based tooling |
| Routing | React Router | Introduced in Lesson 9 |
| Package manager | npm | Scaffolded in Lesson 1 |

Lesson 1 scaffolds the project with:

```bash
npm create vite@latest . -- --template react-ts
```

**Mandatory:** React 19+ + TypeScript + Vite. No plain JavaScript, Create React App, or Next.js.

## Curriculum

One **Task Board** app grows across all lessons — simple enough to start, rich enough for routing and data fetching.

| Lesson | Topics | App milestone |
| ------ | ------ | ------------- |
| 1 | JS/TS essentials for React, JSX, Vite setup (`react-ts` template) | App renders a greeting |
| 2 | Functional components, props, composition | Reusable `TaskCard`, `Header` |
| 3 | `useState`, events, conditional rendering | Add, toggle, and delete tasks |
| 4 | `.map()`, keys, derived data | Render a task list |
| 5 | Controlled inputs, validation basics | Task creation form |
| 6 | `useEffect`, cleanup, `localStorage` | Persist tasks locally |
| 7 | Custom hooks | Extract `useLocalStorage`, `useTasks` |
| 8 | Context API, provider pattern | Theme or filter preference |
| 9 | React Router, layouts, nested routes | List view + detail/settings pages |
| 10 | `fetch`, loading/error states, async/await | Load seed tasks from JSON/API |
| 11 | Folder layout, separation of concerns | Organize `src/components/`, `src/hooks/`, `src/pages/`, `src/types/` |

Track completion in [progress.md](progress.md).

## AI instruction files

Synchronized copies carry the same tutor instructions for different tools:

- [.cursor/rules/project-guidelines.mdc](../.cursor/rules/project-guidelines.mdc) — **source of truth** (always-apply Cursor project guidelines)
- [agent-instructions.md](agent-instructions.md)
- [.github/cursor-instructions.md](../.github/cursor-instructions.md)
- [claude.md](../claude.md)

Edit the Cursor rule, then run `scripts/sync-instructions.sh` (or `.ps1` on Windows) to refresh the generated copies.

## Out of scope

- Pre-built starter code beyond the Vite `react-ts` scaffold (created in Lesson 1)
- Plain JavaScript, Create React App, Webpack-from-scratch, Next.js, Remix
- Redux, SSR, advanced testing, CI/CD
- Generating the full app in one pass
