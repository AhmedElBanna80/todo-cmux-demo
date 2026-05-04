# Quick Start: Running the cmux-tab-agents Demo

This guide walks you through recording a video demo of building a todo app with cmux-tab-agents.

## Prerequisites

✅ Ensure you have:
- `cmux` installed and running
- `cmux-tab-agents` skill set up: `/cmux-tab-agents:setup`
- This repo cloned: `/Users/banna/cmux-demo-workspace/todo-cmux-demo`
- Node.js 18+

## Step 1: Prepare Your Screen

1. **Open QuickTime Player** (for screen recording)
2. **Start a new cmux session** in a large terminal window (fullscreen recommended)
3. **Navigate to the repo:**
   ```bash
   cd /Users/banna/cmux-demo-workspace/todo-cmux-demo
   ```
4. **Position your screen:**
   - Planner tab (where you'll dispatch) — center-left
   - Code tabs will open on the right as agents work
   - Make sure cmux status pills are visible at the bottom

## Step 2: Start Recording

1. **Open QuickTime Player**
2. **File → New Screen Recording**
3. **Click the red circle to start recording**
4. **In your terminal, start narrating** (or you can add voiceover after)

## Step 3: Run the Demo

### 00:00-01:00 | Introduction
Narrate:
> "This is cmux-tab-agents, a tool for building features with parallel AI agents. Today we're building a todo app with three features, all at the same time."

### 01:00-02:00 | Show the Plan
```bash
# Show the plan
cat CLAUDE.md | less
# Highlight the three sub-tasks
```

Narrate the three features (add, mark complete, delete).

### 02:00-05:00 | Dispatch Agents
Run the three dispatch commands **in rapid succession**:

```bash
# Dispatch DEMO-1 (Add Todo)
~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-1 \
  --title "Add todo item" \
  --slug add-todo \
  --task-file ./DEMO-1.md

# Dispatch DEMO-2 (Mark Complete)
~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-2 \
  --title "Mark complete" \
  --slug mark-complete \
  --task-file ./DEMO-2.md

# Dispatch DEMO-3 (Delete Todo)
~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-3 \
  --title "Delete todo" \
  --slug delete-todo \
  --task-file ./DEMO-3.md
```

Watch three tabs open in parallel. Narrate the parallelism.

### 05:00-07:00 | Watch Agents Work & Answer Questions

- Switch between the three tabs to show code being written
- When an agent pushes a `NEEDS_CONTEXT` message, answer it
- Example:
  ```bash
  cmux send --surface surface:17 "Show errors in-line below the input field."
  cmux send-key --surface surface:17 enter
  ```

### 07:00-09:00 | Wait for DONE Status

- Show agents pushing DONE messages to your input
- Narrate the transition to spec-review

### 09:00-11:00 | Dispatch Spec-Reviewers

For each DONE task, dispatch a spec-reviewer:

```bash
~/.claude/skills/cmux-tab-agents/scripts/dispatch-spec-reviewer.sh \
  --ticket DEMO-1 \
  --title "Add todo item" \
  --slug add-todo \
  --task-text "$(cat DEMO-1.md)" \
  --implementer-sha "$(git -C ~/.../DEMO-1/todo-cmux-demo rev-parse HEAD)"

~/.claude/skills/cmux-tab-agents/scripts/dispatch-spec-reviewer.sh \
  --ticket DEMO-2 \
  --title "Mark complete" \
  --slug mark-complete \
  --task-text "$(cat DEMO-2.md)" \
  --implementer-sha "$(git -C ~/.../DEMO-2/todo-cmux-demo rev-parse HEAD)"

~/.claude/skills/cmux-tab-agents/scripts/dispatch-spec-reviewer.sh \
  --ticket DEMO-3 \
  --title "Delete todo" \
  --slug delete-todo \
  --task-text "$(cat DEMO-3.md)" \
  --implementer-sha "$(git -C ~/.../DEMO-3/todo-cmux-demo rev-parse HEAD)"
```

Wait for APPROVED statuses.

### 11:00-12:30 | Code Quality Review & Merge

Dispatch code-reviewers similarly, then merge the branches:

```bash
# Show the final app
npm install
npm run dev
# Open http://localhost:3000 in browser
# Add a todo, mark complete, delete
```

### 12:30-13:30 | Wrap-up

Narrate the recap (see VIDEO_SCRIPT.md for exact wording).

## Step 4: Stop Recording

- **In QuickTime:** Press Cmd+Control+Esc (or click the stop button)
- **Save the file** (e.g., `~/Desktop/cmux-tab-agents-demo.mov`)

## Step 5: Add Voiceover (Optional)

You have two options:

### Option A: Use Recorded Audio
If you narrated live:
- Export the QuickTime recording with audio
- Edit in iMovie or CapCut (trim intro/outro, add text overlays)

### Option B: Add Voiceover in Post
If you recorded silent:
1. **Record voiceover separately** (Voice Memos app, Audacity, etc.)
2. **Import into iMovie:**
   - File → Import → Select your .mov recording
   - File → Import → Select your audio voiceover
   - Drag audio to the timeline
   - Sync with video using the script as a guide

## Step 6: Edit & Export

Using iMovie or CapCut:
1. **Trim:** Remove dead time, false starts
2. **Add titles:** "cmux-tab-agents demo", feature names
3. **Captions:** Auto-captions from audio, or add manually
4. **Music:** Optional background music (royalty-free)
5. **Export:** 1080p, MP4, for social media

## Step 7: Upload

Post to:
- YouTube (unlisted or public)
- Twitter/X (30-min limit, so consider a teaser)
- LinkedIn
- Dev.to

## Tips for a Smooth Recording

- **Pre-record the narration** — easier to edit than live
- **Slow down:** Use `sleep 2` commands between major steps so viewers can follow
- **Maximize terminal:** Full-screen cmux with large fonts (18pt+)
- **Highlight key moments:** When agents push messages or code is written, pause briefly so viewers see it
- **Test dispatch commands first** — make sure syntax is correct before recording
- **Have the script visible** — tape it next to your monitor for reference

## Troubleshooting

### "Agent is taking too long"
- **cmux-tab-agents defaults to claude-sonnet-4-6.** For this demo, that's fine.
- If an agent stalls, press `Ctrl+C` in its tab and re-dispatch with feedback.

### "Dispatch command failed"
- **Check syntax:** Make sure `--task-file ./DEMO-X.md` path is correct
- **Check worktree path:** The error message will show where cmux is trying to create the worktree

### "Recording is too long"
- **Edit in post:** Trim wait times, speed up slower sections (playback 1.25x–1.5x)
- **Shorter demo:** Skip some agent interactions; jump to the final app demo

## Expected Timing

- Dispatch: 30 sec
- Implementers (all 3 parallel): 2-3 min
- Spec review: 1-2 min
- Code review: 1-2 min
- Merge + show final app: 1 min
- **Total runtime: 5-10 minutes**
- **Video length (with intro/outro, captions): 10-15 minutes**

---

**Good luck with your demo!** The video will showcase the power of parallel AI development. 🚀
