# ✅ Setup Complete: Your cmux-tab-agents Video Demo is Ready!

## What's Been Set Up

### 1. **GitHub Repository**
- **URL:** https://github.com/AhmedElBanna80/todo-cmux-demo
- **Status:** Public, all code pushed
- **Local path:** `/Users/banna/cmux-demo-workspace/todo-cmux-demo`

### 2. **Three GitHub Issues** (Agents Will Pick These Up)
- **Issue #1:** DEMO-1 - Add Todo Item (Form Submission)
- **Issue #2:** DEMO-2 - Mark Todo Complete
- **Issue #3:** DEMO-3 - Delete Todo with Confirmation

Each issue contains the full specification for the feature.

### 3. **Mock Implementation**
- ✅ Next.js 16.2 + TypeScript + Tailwind CSS
- ✅ In-memory todo store (`lib/db.ts`)
- ✅ Server actions for all features
- ✅ React components with progressive enhancement
- ✅ Basic tests (will be expanded by agents)
- ✅ Working UI at `http://localhost:3000`

### 4. **Documentation**
- ✅ `CLAUDE.md` — Planner's breakdown with GitHub issue references
- ✅ `DEMO-1.md`, `DEMO-2.md`, `DEMO-3.md` — Detailed specs
- ✅ `TEST_DISPATCH.md` — Test one task before recording
- ✅ `DEMO_QUICKSTART.md` — Step-by-step recording guide
- ✅ `VIDEO_SCRIPT.md` — Full 13-minute narration script

## How Agents Will Work

### The New Workflow (GitHub-Aware)
1. **Planner (you)** references GitHub issues in the dispatch
2. **Agents pick up the issues** and read the full spec
3. **Agents write code** that closes the issue
4. **Tests verify** the issue is resolved
5. **Reviews approve** the implementation
6. **Agents link branches** to the issues

In the video, you'll see:
```
[DEMO-1-implementer] DONE: Closes #1 - Implemented add-todo form; 8 tests pass
```

---

## Next Steps: Test Dispatch → Full Recording → Upload

### 📝 Step 1: Test Dispatch (30 minutes)

Before recording, run a single test dispatch to see the workflow:

```bash
cd /Users/banna/cmux-demo-workspace/todo-cmux-demo

# Start cmux session
cmux new-session

# Read the test guide
cat TEST_DISPATCH.md

# Run the test
~/.claude/skills/cmux-tab-agents/scripts/dispatch-implementer.sh \
  --ticket DEMO-1 \
  --title "Add todo item" \
  --slug add-todo \
  --task-file ./DEMO-1.md
```

**Why test first:**
- See how fast it is (3-6 min per task)
- Learn the communication pattern (agents ask, you respond)
- Verify status pills and notifications work
- Get comfortable before recording

### 🎬 Step 2: Record Full Demo (45 minutes)

Once test dispatch feels smooth:

```bash
# Open QuickTime Player
# File → New Screen Recording → Record button

# Follow DEMO_QUICKSTART.md:
# - Show the plan
# - Dispatch all 3 implementers in parallel
# - Answer agent questions
# - Wait for DONE → Dispatch spec-reviewers → Dispatch code-reviewers
# - Show final app running
# - Total: 10-15 minutes of video

# Stop recording in QuickTime
```

**Pro tips:**
- Maximize terminal (fullscreen)
- Use large fonts (18pt+)
- Narrate live OR add voiceover in post
- Pause 2-3 sec when agents push messages (let viewers read)

### 📤 Step 3: Edit & Upload (30 minutes)

Using iMovie or CapCut:
1. Trim intro/outro (remove false starts)
2. Add titles: "cmux-tab-agents demo", feature names
3. Add captions (auto-generate from audio)
4. Export as MP4, 1080p
5. Upload to YouTube, Twitter, LinkedIn, Dev.to

---

## Repository Structure

```
todo-cmux-demo/
├── GitHub Issues #1, #2, #3        ← Agents will reference these
├── app/
│   ├── page.tsx                    # Working UI
│   ├── actions.ts                  # Server actions
│   └── layout.tsx
├── components/
│   ├── TodoForm.tsx                # Form with progressive enhancement
│   ├── TodoItem.tsx                # Checkbox with optimistic updates
│   └── TodoDeleteButton.tsx        # Delete with confirmation
├── lib/
│   ├── db.ts                       # In-memory store
│   └── types.ts                    # TypeScript types
├── __tests__/
│   └── TodoForm.test.tsx           # Sample test
├── CLAUDE.md                       # Planner's breakdown (references issues)
├── DEMO-1.md, DEMO-2.md, DEMO-3.md # Detailed specs
├── TEST_DISPATCH.md                # ← Read this first!
├── DEMO_QUICKSTART.md              # ← Follow this to record
├── VIDEO_SCRIPT.md                 # ← Reference this while narrating
└── SETUP_COMPLETE.md               # ← This file
```

---

## How to Update CLAUDE.md to Reference Issues

The spec files are embedded in GitHub issues, so agents will:
1. Read the issue on GitHub
2. Click through to see the full spec
3. See acceptance criteria, files to modify, testing requirements
4. Implement accordingly

When you dispatch, agents will see:
```
Task: DEMO-1 - Add Todo Item
Issue: https://github.com/AhmedElBanna80/todo-cmux-demo/issues/1
Description: Implement the ability to add a new todo item via form submission...
```

---

## What Makes This Demo Powerful

### ✅ Realistic Scale
- 3 independent features
- Runs in parallel (not sequential)
- Real GitHub issues (not made-up)
- Production-ready code

### ✅ Visible Coordination
- Agents ask questions (you respond)
- Status updates in real-time
- Three review gates (implementer → spec → quality)
- All visible in cmux tabs

### ✅ Fast Execution
- ~3-6 minutes per implementer
- ~2-3 minutes per reviewer
- Total: ~15-20 minutes for three features
- Recorded as 10-15 minute video (fast-paced)

### ✅ Educational Value
- Shows parallelism (no conflicts, no waiting)
- Shows code review discipline (two gates)
- Shows AI-human collaboration (questions/answers)
- Shows progressive enhancement pattern

---

## Quick Links

**GitHub:**
- Repo: https://github.com/AhmedElBanna80/todo-cmux-demo
- Issues: https://github.com/AhmedElBanna80/todo-cmux-demo/issues

**Local:**
- Path: `/Users/banna/cmux-demo-workspace/todo-cmux-demo`
- Dev server: `npm run dev` → http://localhost:3000

**Guides:**
1. `TEST_DISPATCH.md` — Test one task first
2. `DEMO_QUICKSTART.md` — Full recording walkthrough
3. `VIDEO_SCRIPT.md` — What to narrate

---

## Verification Checklist

Before you start recording:

- [ ] cmux-tab-agents is installed and configured
- [ ] You're authenticated with GitHub (`gh auth status`)
- [ ] Repo is on GitHub (AhmedElBanna80/todo-cmux-demo)
- [ ] Three GitHub issues are created (#1, #2, #3)
- [ ] You've read `TEST_DISPATCH.md`
- [ ] You've run one test dispatch successfully
- [ ] The app runs locally: `npm run dev`
- [ ] QuickTime Player is installed
- [ ] You have a quiet space to narrate

---

## You're Ready!

Next: **Read `TEST_DISPATCH.md` and run a single test dispatch.** This will take 30 min and show you exactly what happens during recording. Then record your full demo following `DEMO_QUICKSTART.md`.

**Estimated total time:**
- Test dispatch: 30 min
- Full recording: 45 min
- Editing: 30 min
- **Total: 2 hours from now to published video**

Good luck! Your cmux-tab-agents video demo will showcase the power of parallel AI development. 🚀
