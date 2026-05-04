# Todo App - cmux-tab-agents Demo

## Story: Build a Progressive Enhancement Todo App

### Goal
Implement a production-ready todo app using Next.js 15 and Tailwind CSS with full progressive enhancement (works without JavaScript).

### Tech Stack
- **Frontend:** Next.js 15 (latest), TypeScript, Tailwind CSS
- **Architecture:** Progressive enhancement — core functionality works without JS
- **Testing:** Jest + React Testing Library
- **Code Quality:** ESLint, TypeScript strict mode

### Why This Demo
This story has 3 independent sub-tasks perfect for demonstrating **parallel tab-agent dispatch**:
1. **Add a todo item** (backend form submission + server action)
2. **Mark todo complete** (checkbox with progressive enhancement)
3. **Delete a todo** (with confirmation, works without JS)

Each sub-task has its own feature branch, its own worktree, and can be implemented in parallel. Then spec-reviewers and code-reviewers run sequentially per task.

---

## Sub-tasks (Parallel Work)

### SUB-TASK-1: Add Todo Item (Form Submission)

**Ticket:** `DEMO-1`

**Description:**
Implement the ability to add a new todo item via form submission. The form must work with **and** without JavaScript.

**Files to Create/Modify:**
- `app/api/tasks/route.ts` — POST handler for creating todos
- `app/actions.ts` — Server action for form handling
- `components/TodoForm.tsx` — Progressive form component
- `lib/db.ts` — In-memory todo store (or SQLite if you prefer)
- `lib/types.ts` — Todo type definitions

**Acceptance Criteria:**
- [ ] User can submit the form via browser form submission (no JS required)
- [ ] Form validates title is not empty
- [ ] New todo appears in the list immediately after submission
- [ ] Form clears after submission
- [ ] JavaScript enhancement: form submits via fetch with optimistic updates
- [ ] Server action logs show form data received
- [ ] Tests pass: form submission, validation, server action

**Spec Compliance:**
- Progressive enhancement: core works without JS, enhanced with JS
- Form accessibility: proper labels, ARIA attributes
- Error handling: server-side validation, user feedback

**Code Quality Gates:**
- No prop drilling (context for todo store state)
- Type-safe server actions (use zod for form validation)
- Tests cover: happy path, validation error, network error

---

### SUB-TASK-2: Mark Todo Complete

**Ticket:** `DEMO-2`

**Description:**
Implement the ability to mark a todo item as complete/incomplete via checkbox. Works without JavaScript (form submission), enhanced with fetch.

**Files to Create/Modify:**
- `app/api/tasks/[id]/route.ts` — PATCH handler for update
- `app/actions.ts` — Server action for toggle
- `components/TodoItem.tsx` — Progressive checkbox component
- Update `lib/db.ts` to support updates
- Tests for checkbox toggle

**Acceptance Criteria:**
- [ ] Checkbox state reflects in database
- [ ] Works with form submission (no JS)
- [ ] JavaScript enhancement: checkbox updates via fetch without reload
- [ ] Optimistic UI: checked state shows immediately
- [ ] Accessibility: proper label associations, semantic HTML
- [ ] Tests pass: toggle on/off, optimistic updates, rollback on error

**Spec Compliance:**
- Progressive enhancement: baseline HTML form works
- Accessibility: keyboard navigation, screen reader friendly
- State consistency: UI matches database state

**Code Quality Gates:**
- Optimistic updates with rollback on error
- No state hydration mismatches (SSR/client mismatch)
- Error boundaries for failed mutations

---

### SUB-TASK-3: Delete Todo with Confirmation

**Ticket:** `DEMO-3`

**Description:**
Implement the ability to delete a todo item. Must show confirmation (works without JS via form, enhanced with dialog).

**Files to Create/Modify:**
- `app/api/tasks/[id]/route.ts` — DELETE handler
- `app/actions.ts` — Server action for delete
- `components/TodoDeleteButton.tsx` — Progressive delete component with confirmation
- Update `lib/db.ts` to support deletion
- Tests for delete flow

**Acceptance Criteria:**
- [ ] Delete button visible on each todo
- [ ] Click shows confirmation (form-based: page redirect, JS-based: modal)
- [ ] Confirmed deletion removes todo from list and database
- [ ] Without JS: form submission with confirmation page
- [ ] With JS: native confirm() or custom modal
- [ ] Undo / error recovery: show error message on failed delete
- [ ] Tests pass: delete flow, confirmation required, error handling

**Spec Compliance:**
- Progressive enhancement: baseline form submission required
- User safety: confirmation before destructive action
- Accessibility: form semantics, focus management in modal

**Code Quality Gates:**
- Optimistic deletion with rollback
- Loading states (button disabled during submission)
- Error messages for failed operations
- No unhandled promises

---

## Dispatch Strategy

```bash
# In cmux session, as the planner:

# 1. GitHub issues are already created (see Issues tab)
# Agents will reference these issues in their work

# 2. Dispatch all three implementers in parallel
IMPL1=$(dispatch-implementer.sh --ticket DEMO-1 --slug add-todo ...)
IMPL2=$(dispatch-implementer.sh --ticket DEMO-2 --slug mark-complete ...)
IMPL3=$(dispatch-implementer.sh --ticket DEMO-3 --slug delete-todo ...)

# 3. Poll each in parallel, record all as they complete
poll-result.sh --worktree ~/.../DEMO-1/... &
poll-result.sh --worktree ~/.../DEMO-2/... &
poll-result.sh --worktree ~/.../DEMO-3/... &

# 4. For each DONE, dispatch spec-reviewer
dispatch-spec-reviewer.sh --ticket DEMO-1 ...
dispatch-spec-reviewer.sh --ticket DEMO-2 ...
dispatch-spec-reviewer.sh --ticket DEMO-3 ...

# 5. Loop reviews as needed (implementer ↔ reviewer)

# 6. Once all APPROVED by spec-reviewer, dispatch code-reviewer
dispatch-code-reviewer.sh --ticket DEMO-1 ...
dispatch-code-reviewer.sh --ticket DEMO-2 ...
dispatch-code-reviewer.sh --ticket DEMO-3 ...

# 7. Finalize: merge all three branches into main
```

---

## Video Demo Script

**Duration:** 10-15 minutes

### Scene 1: Intro (1 min)
- Show the repo structure
- Explain: "Building a todo app with cmux-tab-agents"
- Show the 3 sub-tasks

### Scene 2: Setup (1 min)
- Show .git, plan, issues

### Scene 3: Dispatch (2-3 min)
- Run dispatch-implementer for all 3 tasks
- Show tabs opening in parallel
- Show status pills

### Scene 4: Agents Working (2-3 min)
- Show implementer writing code
- Show progress in terminal
- Agents asking for clarification (NEEDS_CONTEXT)
- Respond to agents

### Scene 5: Results (1-2 min)
- Show DONE / ISSUES_FOUND status
- Read result files
- Show specs approved

### Scene 6: Review (2-3 min)
- Code reviewer tab opens
- Issues found, implementer fixes
- Final APPROVED

### Scene 7: Merge & Wrap (1 min)
- Show all branches merged to main
- Final working app
- Recap: speed, quality, parallelism

---

## Getting Started (For Developers Running This)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   ```

3. **Create a planner session in cmux:**
   ```bash
   cmux new-session
   # cd to this repo
   # source ~/.claude/cmux-tab-agents/.envrc (if needed)
   ```

4. **Start dispatching sub-tasks** (see Dispatch Strategy above)

---

## Acceptance for Main Story

- All 3 sub-tasks: DONE
- All specs: APPROVED
- All code reviews: APPROVED
- All tests passing: ✓
- Merge all branches to main: ✓
- App ready for demo video: ✓
