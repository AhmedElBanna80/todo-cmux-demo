# Test Dispatch Guide: See cmux-tab-agents in Action

This guide walks you through a **single test dispatch** to see how the workflow works before recording your full demo.

## What You'll See

- ✅ One cmux tab opens with an AI agent
- ✅ Agent reads the task spec
- ✅ Agent starts writing code
- ✅ Agent may ask questions (NEEDS_CONTEXT)
- ✅ You respond and agent continues
- ✅ Agent finishes and reports DONE

## Prerequisites

1. **Start a cmux session** (if not already in one):
   ```bash
   cmux new-session
   ```

2. **Navigate to the repo:**
   ```bash
   cd /Users/banna/cmux-demo-workspace/todo-cmux-demo
   ```

3. **cmux-tab-agents is configured:**
   ```bash
   cat ~/.claude/cmux-tab-agents.toml
   # Should show:
   # default_model = claude-sonnet-4-6
   # default_effort = high
   ```

## Step 1: Run a Test Dispatch

Dispatch ONE implementer to test the workflow:

```bash
~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-1 \
  --title "Add todo item" \
  --slug add-todo \
  --task-file ./DEMO-1.md
```

**What happens:**
1. A new cmux tab opens (e.g., `surface:17`)
2. Agent reads DEMO-1.md
3. Agent starts coding
4. Status pill appears: `DEMO-1-implementer` (yellow = dispatched)

## Step 2: Watch the Agent Work

- Switch between planner tab and agent tab
- See code being written
- Agent may push a `NEEDS_CONTEXT` message asking for clarification

Example:
```
[DEMO-1-implementer] NEEDS_CONTEXT: Should the form submit via fetch or traditional form POST?
```

## Step 3: Respond to Agent Questions

If the agent asks a question, send feedback:

```bash
cmux send --surface surface:17 "Use traditional form POST for progressive enhancement, then enhance with fetch for no-reload experience."
cmux send-key --surface surface:17 enter
```

The agent gets your message and continues coding.

## Step 4: Wait for DONE

Watch for the agent to push:
```
[DEMO-1-implementer] DONE: Implemented add-todo form; 8 tests pass. Result: /Users/.../.cmux-implementer-result.md
```

Status pill changes to green ✓.

## Step 5: Review the Result File

Check what the agent completed:

```bash
cat /Users/banna/.claude/worktrees/DEMO-1/todo-cmux-demo/.cmux-implementer-result.md
```

You'll see:
```yaml
status: DONE
duration_minutes: 3
files_modified:
  - components/TodoForm.tsx
  - app/actions.ts
  - lib/db.ts
  - __tests__/TodoForm.test.tsx
tests_status: 8/8 pass
```

## Step 6: Check the Git Branch

Look at what the agent committed:

```bash
git -C /Users/banna/.claude/worktrees/DEMO-1/todo-cmux-demo log --oneline -5
# Output:
# abc1234 (feat/DEMO-1/add-todo) Implement TodoForm with progressive enhancement
# ...
```

## Step 7: Exit and Clean Up

After testing, you can clean up the test worktree:

```bash
# In cmux, kill the agent tab
cmux kill-pane --surface surface:17

# Optionally remove the worktree
rm -rf ~/.claude/worktrees/DEMO-1
```

---

## Expected Timing

- **Dispatch to first code written:** 30 sec
- **Total implementation:** 2-5 min (depending on model + effort)
- **Agent reporting DONE:** 30 sec after finishing

**Total: 3-6 minutes per task**

---

## Troubleshooting Test Dispatch

### Agent is stuck or taking too long
- Check the agent's tab (`surface:17`)
- Press `Ctrl+C` if it seems hung
- Re-dispatch with explicit instructions

### "Worktree already exists"
```bash
rm -rf ~/.claude/worktrees/DEMO-1
# Re-run dispatch
```

### Can't find the surface ref
When you dispatch, the script echoes the surface ref:
```
Output from dispatch:
surface:17
```

Use that to communicate with the agent:
```bash
cmux send --surface surface:17 "Your message here"
```

### Agent asks for clarification
**This is expected and good!** The agent is confirming requirements before coding. Answer clearly:
```bash
cmux send --surface surface:17 "Form should validate on client-side, show errors in-line."
cmux send-key --surface surface:17 enter
```

---

## After Test Dispatch: What You've Learned

1. **How agents work:** They read specs, ask questions, write code
2. **How to communicate:** Send messages to agent surfaces
3. **How reviews work:** Next you'll dispatch spec-reviewers and code-reviewers
4. **How fast it is:** One task in 3-6 minutes
5. **How to record:** This is exactly the workflow you'll capture in your video

---

## Ready for Full Recording?

Once the test dispatch feels smooth, you're ready to record:

1. **Start QuickTime recording**
2. **Dispatch all 3 implementers** (in parallel)
3. **Answer agent questions** as they arrive
4. **Wait for DONE statuses** from all 3
5. **Dispatch spec-reviewers**
6. **Dispatch code-reviewers**
7. **Show final merged code** in the app

See `DEMO_QUICKSTART.md` for the full recording guide.

---

**Total expected recording time: 10-15 minutes of action (agents working in parallel = fast!)**
