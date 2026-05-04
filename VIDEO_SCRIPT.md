# Video Script: Building a Todo App with cmux-tab-agents

**Duration:** 10-15 minutes  
**Narration:** Your voice (recorded)  
**Screen Recording:** QuickTime + this script

---

## 00:00 - 01:00 | INTRO

**[VISUAL: Title card or repo overview on screen]**

> "This is a demo of cmux-tab-agents, a tool that lets you **dispatch multiple AI subagents in parallel** to build features faster with automatic code review.
>
> Today we're building a real todo app with Next.js and Tailwind — but here's the twist: all three features are being built **at the same time** by AI agents running in separate tabs, with automatic spec review and code quality checks.
>
> This would normally take hours. Let's see it happen in minutes."

**[VISUAL: Highlight the three features in CLAUDE.md]**
- Add todo item
- Mark complete
- Delete with confirmation

---

## 01:00 - 02:00 | SETUP

**[VISUAL: Show the repo directory]**

> "We've got a bare Next.js 15 project set up with Tailwind CSS. Progressive enhancement all the way — every feature works without JavaScript, then JavaScript enhances the experience.
>
> Here's the plan: three independent sub-tasks, each with its own feature spec."

**[VISUAL: Open CLAUDE.md, scroll through SUB-TASK-1, SUB-TASK-2, SUB-TASK-3]**

> "Each task has acceptance criteria, file structure, and testing requirements. The key is: they're **completely independent**. Task 1 doesn't block Task 2. No merge conflicts. No waiting.
>
> That means: dispatch all three implementers **right now**."

---

## 02:00 - 05:00 | DISPATCH & PARALLEL WORK

**[VISUAL: cmux session with planner tab in focus]**

> "I'm in cmux with a fresh planner session. Let me dispatch all three implementers in parallel."

**[ACTION: Run dispatch commands]**
```bash
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

**[VISUAL: Watch tabs open in parallel: surface:17, surface:18, surface:19]**

> "Three tabs. Three agents. Three different features. All running **at the same time**."

**[VISUAL: Show cmux workspace with three tabs running side-by-side]**

> "Look at the status pills: DEMO-1-implementer, DEMO-2-implementer, DEMO-3-implementer. Each one is writing code for its own feature.
>
> The agents are reading their specs, understanding the requirements, and implementing the code. Let's watch them work."

**[VISUAL: Switch between tabs, show code being written]**
- Tab 1: Creating `app/api/tasks/route.ts`, `components/TodoForm.tsx`, tests
- Tab 2: Creating `components/TodoItem.tsx`, updating `lib/db.ts`
- Tab 3: Creating `components/TodoDeleteButton.tsx`, confirm page

> "Each tab is independent. Tab 1 writes the POST handler for creating todos. Tab 2 writes the checkbox toggle. Tab 3 writes the delete confirmation.
>
> No conflicts. No waiting for each other. Pure parallelism."

---

## 05:00 - 07:00 | AGENTS TALKING BACK

**[VISUAL: Watch implementer agents push status messages to the planner]**

> "Here's where it gets interesting. The agents aren't silent. They talk back."

**[VISUAL: See DEMO-1 agent push message to planner input]**
```
[DEMO-1-implementer] NEEDS_CONTEXT: How should the form component handle errors on submission?
```

> "The agent is asking for clarification. It needs to know: what's the error strategy? Show a toast? In-line message? Let me tell it."

**[ACTION: Reply to agent]**
```bash
cmux send --surface surface:17 "Show errors in-line below the input field. Use a red text color and clear error message."
cmux send-key --surface surface:17 enter
```

**[VISUAL: See the agent continue work with your guidance]**

> "It gets the answer and keeps coding. No restart. No re-dispatch. Just a quick nudge in the right direction."

**[VISUAL: DEMO-2 agent also pushes a question]**
```
[DEMO-2-implementer] NEEDS_CONTEXT: Should the optimistic update rollback if the server returns an error, or should we show an error message and keep the client-side state?
```

> "Another agent, another question. We tell it, and it continues. This is real-time collaboration with AI agents."

---

## 07:00 - 09:00 | RESULTS & REVIEWS

**[VISUAL: Watch implementers finish and report DONE]**

> "And then... one by one, they finish."

**[VISUAL: See messages arrive in planner input]**
```
[DEMO-1-implementer] DONE: Implemented add-todo form with progressive enhancement; 8 tests pass.
[DEMO-2-implementer] DONE: Implemented checkbox toggle with optimistic updates; 10 tests pass.
[DEMO-3-implementer] DONE: Implemented delete with confirmation modal; 9 tests pass.
```

> "All three done. Now comes the review phase."

**[VISUAL: Show opening of spec-reviewer tabs]**

```bash
dispatch-spec-reviewer.sh --ticket DEMO-1 --title "Add todo" --slug add-todo \
  --task-text "$(cat DEMO-1.md)" --implementer-sha "$(git -C ~/worktrees/DEMO-1/todo-cmux-demo rev-parse HEAD)"
```

> "For each task, a spec-reviewer agent checks: Does the code meet the spec? Are acceptance criteria verified? Are tests passing?"

**[VISUAL: Show spec-reviewer running tests, reading code]**

> "The spec-reviewer is thorough. It's not just reading the implementer's claim — it's actually running the tests, checking the code, verifying the spec was met."

**[VISUAL: See ISSUES_FOUND status if there's a problem]**
```
[DEMO-2-spec-reviewer] ISSUES_FOUND: Missing test for optimistic rollback on server error. Acceptance criterion #5 not covered.
```

> "Found an issue. The implementer didn't test the rollback scenario. Rather than force the implementer to re-dispatch, we just send feedback to the existing agent."

**[ACTION: Send feedback]**
```bash
cmux send --surface surface:18 "Add a test for optimistic rollback: when the server returns 500, the checkbox should revert to its previous state."
cmux send-key --surface surface:18 enter
```

**[VISUAL: Watch implementer fix and re-test]**

> "The agent gets the feedback, writes the missing test, runs it, and pushes the fix. It all happens in the same tab, same context. No starting from scratch."

**[VISUAL: See APPROVED messages arrive]**
```
[DEMO-1-spec-reviewer] APPROVED: All acceptance criteria met. Tests pass. Progressive enhancement verified.
[DEMO-2-spec-reviewer] APPROVED: Spec compliance verified. Optimistic updates work correctly with rollback.
[DEMO-3-spec-reviewer] APPROVED: Delete confirmation required. Error handling works.
```

> "All three specs approved. Now the code-quality review."

---

## 09:00 - 11:00 | CODE QUALITY & FINAL CHECKS

**[VISUAL: Dispatch code-reviewer tabs]**

> "The code-quality reviewer checks: Is the code clean? Are there any patterns we should change? Are the hooks properly verified?"

**[VISUAL: Show code-reviewer running linter, checking for issues]**

> "It's checking TypeScript strict mode, ESLint, testing discipline, no hook bypasses, proper error handling."

**[VISUAL: See APPROVED statuses arrive]**
```
[DEMO-1-code-reviewer] APPROVED: Code quality verified. TypeScript strict, all tests pass, no warnings.
[DEMO-2-code-reviewer] APPROVED: Clean implementation. No hydration mismatches. Good error boundaries.
[DEMO-3-code-reviewer] APPROVED: Proper form handling. Confirmation required before deletion.
```

> "All green. All done. Three features, three parallel implementation/review pipelines, all completed successfully."

---

## 11:00 - 12:30 | MERGE & RESULT

**[VISUAL: Show merging all three branches to main]**

> "Each sub-task has its own branch in its own git worktree. Now we merge them all to main."

**[ACTION: Show final merge]**
```bash
git -C ~/worktrees/DEMO-1/todo-cmux-demo push origin feat/DEMO-1/add-todo:main
git -C ~/worktrees/DEMO-2/todo-cmux-demo push origin feat/DEMO-2/mark-complete:main
git -C ~/worktrees/DEMO-3/todo-cmux-demo push origin feat/DEMO-3/delete-todo:main
```

**[VISUAL: Show the final app running locally]**
```bash
npm run dev
# Open http://localhost:3000
```

**[VISUAL: Browser shows the working todo app]**
- Add a todo (works without JS)
- Mark it complete (works without JS)
- Delete it (with confirmation, works without JS)
- Enhanced with JavaScript: optimistic updates, no full-page reloads

> "There it is. A complete, production-ready todo app. Three features. Three AI agents working in parallel. Automatic spec review. Automatic code quality review. All the safety gates, zero manual code review overhead."

---

## 12:30 - 13:30 | RECAP & TAKEAWAYS

**[VISUAL: Summary slide or return to repo]**

> "Here's what just happened:
>
> **Parallelism:** Three independent features built simultaneously by AI agents, each in its own worktree. No conflicts. No waiting.
>
> **Quality:** Every feature went through two review gates: spec compliance, then code quality. Issues were caught and fixed automatically.
>
> **Speed:** This workflow would normally take days. Here, we saw it in minutes.
>
> **Safety:** The agents followed discipline. No hook bypasses. No skipped tests. Every acceptance criterion was verified.
>
> That's cmux-tab-agents. It's about scaling your development velocity with AI, without sacrificing safety or quality."

**[VISUAL: Link to GitHub repo, call-to-action]**

> "If you want to try it yourself, the repo is public. Check out the CLAUDE.md to see how the plan works, run the dispatch commands, and watch your own agents build in parallel.
>
> Questions? Comments? Reach out on Twitter or GitHub. Thanks for watching."

---

## RECORDING NOTES

### Screen Areas to Capture
1. **cmux workspace** — three tabs visible, showing agent activity
2. **File edits** — switch to code tabs, show what's being written
3. **Status pills** — zoom in on the status updates in cmux
4. **Browser** — show the final app working
5. **Result files** — optionally show the .cmux-implementer-result.md files

### Key Moments (Mark for editing/VO)
- [ ] 00:00 - Title / intro
- [ ] 01:00 - Show the plan, explain the three tasks
- [ ] 02:00 - Run dispatch commands, watch tabs open
- [ ] 02:30 - Show parallel work in three tabs
- [ ] 05:00 - Agent asks for clarification (push message)
- [ ] 05:30 - Respond to agent feedback
- [ ] 07:00 - Implementers finish, report DONE
- [ ] 07:30 - Spec-reviewers run, find issues
- [ ] 08:30 - Issues fixed, APPROVED messages arrive
- [ ] 09:00 - Code-quality reviewers run
- [ ] 10:00 - All APPROVED, ready to merge
- [ ] 11:00 - Merge all branches
- [ ] 11:30 - Show final app running in browser
- [ ] 12:30 - Recap and takeaways

### Audio/Voiceover Tips
- Speak clearly, not too fast (script is 10-15 min)
- Pause slightly when highlighting important concepts
- Use vocal variation to emphasize key points (parallelism, speed, quality)
- Pause 2-3 seconds when screen actions are happening (let people see the activity)

---

## File Checklist

Before recording:
- [ ] All three DEMO-*.md task files exist
- [ ] CLAUDE.md has the full plan
- [ ] Next.js project builds successfully (`npm run build`)
- [ ] cmux-tab-agents is set up and configured
- [ ] .claude/cmux-tab-agents.toml has your defaults
- [ ] You've tested at least one dispatch to verify the workflow

---

**Total Script Duration: ~13 minutes (adjust pacing based on live demo speed)**
