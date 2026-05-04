# Todo App - cmux-tab-agents Demo

A production-ready todo app built with **Next.js 15**, **Tailwind CSS**, and **progressive enhancement**. This project demonstrates how to use **cmux-tab-agents** to build features with **parallel AI subagents**, automatic spec review, and code quality gates.

## Features

- ✅ **Add todos** via form submission (works without JavaScript)
- ✅ **Mark complete** with checkboxes (optimistic updates with rollback)
- ✅ **Delete with confirmation** (form-based or modal, works without JavaScript)
- ✅ **Progressive enhancement** — all features work without JS, enhanced with it
- ✅ **Type-safe** — TypeScript strict mode, full type coverage
- ✅ **Fully tested** — unit + integration tests for all features
- ✅ **Built with AI** — three parallel subagents (implementer, spec-reviewer, code-reviewer)

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 3.4
- **Testing:** Jest, React Testing Library
- **Code Quality:** ESLint, TypeScript strict mode
- **Architecture:** Server actions, API routes, progressive enhancement

## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- cmux (for the full demo experience)

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd todo-cmux-demo

# Install dependencies
npm install

# Start the dev server
npm run dev

# Open http://localhost:3000
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Demo: Using cmux-tab-agents

This project is designed to be built using **cmux-tab-agents** — a skill for dispatching parallel AI subagents with automatic code review.

### Prerequisites for Demo
1. cmux is installed and running
2. cmux-tab-agents skill is set up (`/cmux-tab-agents:setup`)
3. You're inside a cmux session

### Running the Demo

**Step 1: Read the plan**
```bash
cat CLAUDE.md
```

**Step 2: Dispatch all three implementers in parallel**
```bash
cd /Users/banna/cmux-demo-workspace/todo-cmux-demo

~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-1 \
  --title "Add todo item" \
  --slug add-todo \
  --task-file ./DEMO-1.md

~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-2 \
  --title "Mark complete" \
  --slug mark-complete \
  --task-file ./DEMO-2.md

~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-3 \
  --title "Delete todo" \
  --slug delete-todo \
  --task-file ./DEMO-3.md
```

**Step 3: Watch the tabs work in parallel**
- Three tabs open simultaneously (surface:17, surface:18, surface:19)
- Each agent writes code for its feature
- Status pills show: DEMO-1-implementer, DEMO-2-implementer, DEMO-3-implementer

**Step 4: Answer agent questions as they arrive**
Agents may push `NEEDS_CONTEXT` messages asking for clarification. Respond using:
```bash
cmux send --surface "<agent-surface>" "Your guidance here"
cmux send-key --surface "<agent-surface>" enter
```

**Step 5: Dispatch spec-reviewers once implementers report DONE**
```bash
~/.claude/skills/cmux-tab-agents/scripts/dispatch-spec-reviewer.sh \
  --ticket DEMO-1 \
  --title "Add todo item" \
  --slug add-todo \
  --task-text "$(cat DEMO-1.md)" \
  --implementer-sha "$(git -C ~/.claude/cmux-tab-agents/.../DEMO-1/todo-cmux-demo rev-parse HEAD)"
```

**Step 6: Dispatch code-quality reviewers once specs are APPROVED**
```bash
~/.claude/skills/cmux-tab-agents/scripts/dispatch-code-reviewer.sh \
  --ticket DEMO-1 \
  --title "Add todo item" \
  --slug add-todo \
  --task-text "$(cat DEMO-1.md)" \
  --implementer-sha "$(git -C ~/.claude/.../DEMO-1/todo-cmux-demo rev-parse HEAD)"
```

**Step 7: Merge all branches to main**
Once all three code-reviewers report APPROVED, merge each branch:
```bash
# Merge from each worktree
git -C ~/.../DEMO-1/todo-cmux-demo push origin feat/DEMO-1/add-todo:main
git -C ~/.../DEMO-2/todo-cmux-demo push origin feat/DEMO-2/mark-complete:main
git -C ~/.../DEMO-3/todo-cmux-demo push origin feat/DEMO-3/delete-todo:main
```

## Video Demo

A video script is included in `VIDEO_SCRIPT.md` for recording a 10-15 minute social media demo. The script walks through:
1. Dispatching all three agents in parallel
2. Watching them work simultaneously
3. Agents asking for clarification
4. Responses and continued work
5. Spec-review and code-quality review phases
6. Final merge and working app

## Project Structure

```
todo-cmux-demo/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── actions.ts              # Server actions
│   ├── api/
│   │   └── tasks/
│   │       └── route.ts        # POST /api/tasks (create)
│   │       └── [id]/
│   │           └── route.ts    # PATCH/DELETE /api/tasks/[id]
│   └── globals.css             # Tailwind styles
├── components/
│   ├── TodoForm.tsx            # Add todo form
│   ├── TodoItem.tsx            # Single todo with checkbox
│   └── TodoDeleteButton.tsx    # Delete with confirmation
├── lib/
│   ├── db.ts                   # In-memory todo store
│   └── types.ts                # TypeScript types
├── __tests__/
│   ├── TodoForm.test.tsx
│   ├── TodoItem.test.tsx
│   └── TodoDeleteButton.test.tsx
├── CLAUDE.md                   # Planner's task breakdown
├── DEMO-1.md                   # Spec: Add todo
├── DEMO-2.md                   # Spec: Mark complete
├── DEMO-3.md                   # Spec: Delete todo
├── VIDEO_SCRIPT.md             # Script for demo video
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md                   # This file
```

## Acceptance Criteria (Story-Level)

- [x] All three sub-tasks (DEMO-1, DEMO-2, DEMO-3) implemented
- [x] Spec-reviewer approved all features
- [x] Code-quality reviewer approved all features
- [x] All tests passing
- [x] Progressive enhancement verified (features work without JS)
- [x] All branches merged to main
- [x] App ready for demo/production

## Key Concepts

### Progressive Enhancement
Every feature works **without JavaScript**:
- Add todo: Form submission via browser's native form POST
- Mark complete: Form submission with POST request
- Delete: Form submission with confirmation page redirect

JavaScript **enhances** the experience:
- Form submission via fetch (no full-page reload)
- Optimistic updates (UI updates instantly)
- Custom modals instead of page redirects

### AI Subagent Workflow
1. **Implementer** reads the spec and writes code
2. **Spec-reviewer** verifies acceptance criteria are met
3. **Code-quality reviewer** ensures code follows discipline (tests, no shortcuts)
4. **Planner** (you) coordinates and answers questions

All three phases run for each task. Tasks can run in parallel (different worktrees).

## Documentation

- `CLAUDE.md` — Full plan breakdown and dispatch strategy
- `DEMO-1.md` — Spec for "Add todo" feature
- `DEMO-2.md` — Spec for "Mark complete" feature
- `DEMO-3.md` — Spec for "Delete todo" feature
- `VIDEO_SCRIPT.md` — Script for recording a social media demo

## Troubleshooting

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### "Module not found" errors
```bash
npm install
npm run build
```

### Tests failing
Ensure dependencies are installed and your Node version is 18+:
```bash
node --version
npm install
npm test
```

## License

MIT (for demo purposes)

## Questions?

This is a demo project for showcasing cmux-tab-agents. For questions about the tool, see:
- cmux-tab-agents docs: `/cmux-tab-agents` (in Claude Code)
- GitHub: https://github.com/AhmedElBanna80/cmux-tab-agents

---

**Built by:** AI subagents (DEMO-1, DEMO-2, DEMO-3 implementers) + human planner  
**Demo recorded:** 2026-05-04  
**Video available at:** (insert social media link)
