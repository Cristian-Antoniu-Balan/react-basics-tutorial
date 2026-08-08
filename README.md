# React Basics Tutorial

Step-by-step React learning for developers who know Python, Java, or C# but not JavaScript.

## Who this is for

Experienced programmers who want to learn React by building a real app — not by reading a pre-built codebase. You write every line; an AI tutor guides you one concept at a time.

## What you'll build

A **Task Board** application that grows across 11 lessons: from a blank Vite scaffold to a typed, routed app with persisted state, shared context, and data fetching.

## How learning works

1. Open this repo in Cursor (or use Claude with [claude.md](claude.md)).
2. Say **"Start Lesson 1"** or **"Continue where we left off"**.
3. The AI explains one concept, gives you a small task, and reviews your code.
4. You implement the task yourself — the AI does not dump full solutions.
5. Progress is tracked in [docs/progress.md](docs/progress.md).

## Tech stack

| Layer | Choice |
| ----- | ------ |
| UI | React 19+ |
| Language | TypeScript |
| Build tool | Vite |
| Routing | React Router (Lesson 9) |
| Package manager | npm |

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)
- A code editor (Cursor recommended)

## Getting started

```bash
git clone <repo-url>
cd react-basics-tutorial
```

Open the project in your editor, then tell your AI assistant:

> Start Lesson 1

Lesson 1 walks you through scaffolding the app:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```

**This repo starts without application code.** The Vite project is created during Lesson 1, not before.

## Curriculum overview

| Lesson | Topics | Milestone |
| ------ | ------ | --------- |
| 1 | JSX, Vite setup | App renders a greeting |
| 2 | Components, props | `TaskCard`, `Header` |
| 3 | State, events | Add/toggle/delete tasks |
| 4 | Lists, keys | Task list rendering |
| 5 | Forms | Task creation form |
| 6 | useEffect, localStorage | Persist tasks |
| 7 | Custom hooks | `useLocalStorage`, `useTasks` |
| 8 | Context | Theme or filter preference |
| 9 | React Router | Multiple pages |
| 10 | Data fetching | Load tasks from API/JSON |
| 11 | Project structure | Organized `src/` folders |

Full details: [docs/requirements.md](docs/requirements.md)

## Working with AI assistants

This project ships synchronized tutor instructions for different tools:

| File | Purpose |
| ---- | ------- |
| [.cursor/rules/project-guidelines.mdc](.cursor/rules/project-guidelines.mdc) | Cursor project guidelines (always apply) — **edit this** |
| [claude.md](claude.md) | Claude agent entry point |
| [docs/agent-instructions.md](docs/agent-instructions.md) | Docs copy of tutor rules |
| [.github/cursor-instructions.md](.github/cursor-instructions.md) | GitHub/Cursor context |

**Source of truth:** [.cursor/rules/project-guidelines.mdc](.cursor/rules/project-guidelines.mdc)

After editing the source, sync all copies:

```bash
# Linux / macOS / Git Bash
bash scripts/sync-instructions.sh

# Windows PowerShell
.\scripts\sync-instructions.ps1
```

## Project structure (after Lesson 1)

```
react-basics-tutorial/
├── .cursor/rules/
│   └── project-guidelines.mdc # AI tutor rules (edit this)
├── docs/
│   ├── requirements.md        # Full spec
│   ├── agent-instructions.md  # Generated — do not edit
│   └── progress.md            # Your lesson checklist
├── scripts/
│   ├── sync-instructions.sh
│   └── sync-instructions.ps1
├── src/                       # Created in Lesson 1
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── types/
├── claude.md                  # Generated — do not edit
└── README.md
```

Folders under `src/` are introduced gradually across lessons 1–11.

## License

MIT — use freely for learning and teaching.
