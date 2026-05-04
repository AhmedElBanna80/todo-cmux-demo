# Text-to-Speech Voice Guide: Google Cloud TTS

Generate a professional AI voiceover for your demo video using Google Cloud Text-to-Speech.

## Step 1: Set Up Google Cloud TTS

### Prerequisites
- Google Cloud account (create free at https://cloud.google.com)
- $300 free trial credit (includes TTS)

### Setup (5 minutes)

1. **Create a Google Cloud project:**
   ```bash
   # Visit https://console.cloud.google.com/projectcreate
   # Project name: "todo-cmux-demo"
   # Create
   ```

2. **Enable the Text-to-Speech API:**
   ```bash
   # In Cloud Console:
   # Search for "Text-to-Speech API"
   # Click "Enable"
   ```

3. **Create a service account:**
   ```bash
   # Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
   # "Create Service Account"
   # Name: "tts-agent"
   # Grant: "Editor" role
   # Create and download JSON key file → save as ~/google-cloud-tts-key.json
   ```

4. **Set environment variable:**
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json
   ```

---

## Step 2: Install Python TTS Client

```bash
# Install Google Cloud TTS library
pip3 install google-cloud-texttospeech

# Verify installation
python3 -c "from google.cloud import texttospeech; print('✓ Google Cloud TTS ready')"
```

---

## Step 3: Extract Script Sections

The `VIDEO_SCRIPT.md` has sections with timings. We'll convert each section to audio.

Create a Python script to break up the script by scenes:

```bash
cat > /Users/banna/cmux-demo-workspace/todo-cmux-demo/generate_voiceover.py << 'EOF'
#!/usr/bin/env python3
"""
Generate voiceover audio from VIDEO_SCRIPT.md using Google Cloud TTS
"""

import os
from google.cloud import texttospeech

def synthesize_speech(text, output_file, voice_name="en-US-Neural2-C", speaking_rate=1.0):
    """Convert text to speech using Google Cloud TTS"""
    client = texttospeech.TextToSpeechClient()
    
    input_text = texttospeech.SynthesisInput(text=text)
    
    # Voice options
    # Male voices: en-US-Neural2-C, en-US-Neural2-E
    # Female voices: en-US-Neural2-A, en-US-Neural2-F
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name=voice_name,
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL,
    )
    
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=speaking_rate,
    )
    
    print(f"Generating: {output_file}...")
    response = client.synthesize_speech(
        input=input_text,
        voice=voice,
        audio_config=audio_config,
    )
    
    # Write MP3 file
    with open(output_file, "wb") as out:
        out.write(response.audio_content)
    
    print(f"✓ Created: {output_file}")

# Script sections (from VIDEO_SCRIPT.md)
SECTIONS = {
    "intro": """This is a demo of cmux-tab-agents, a tool that lets you dispatch multiple AI subagents in parallel to build features faster with automatic code review.

Today we're building a real todo app with Next.js and Tailwind — but here's the twist: all three features are being built at the same time by AI agents running in separate tabs, with automatic spec review and code quality checks.

This would normally take hours. Let's see it happen in minutes.""",

    "setup": """We've got a bare Next.js project set up with Tailwind CSS. Progressive enhancement all the way — every feature works without JavaScript, then JavaScript enhances the experience.

Here's the plan: three independent sub-tasks, each with its own feature spec.

Each task has acceptance criteria, file structure, and testing requirements. The key is: they're completely independent. Task 1 doesn't block Task 2. No merge conflicts. No waiting.

That means: dispatch all three implementers right now.""",

    "dispatch": """I'm in cmux with a fresh planner session. Let me dispatch all three implementers in parallel.

Three tabs. Three agents. Three different features. All running at the same time.

Look at the status pills: DEMO-1-implementer, DEMO-2-implementer, DEMO-3-implementer. Each one is writing code for its own feature.

The agents are reading their specs, understanding the requirements, and implementing the code. Let's watch them work.""",

    "agents_talking": """Here's where it gets interesting. The agents aren't silent. They talk back.

The agent is asking for clarification. It needs to know: what's the error strategy? Show a toast? In-line message? Let me tell it.

It gets the answer and keeps coding. No restart. No re-dispatch. Just a quick nudge in the right direction.

Another agent, another question. We tell it, and it continues. This is real-time collaboration with AI agents.""",

    "results": """And then... one by one, they finish.

All three done. Now comes the review phase.

For each task, a spec-reviewer agent checks: Does the code meet the spec? Are acceptance criteria verified? Are tests passing?

The spec-reviewer is thorough. It's not just reading the implementer's claim — it's actually running the tests, checking the code, verifying the spec was met.""",

    "merge": """Each sub-task has its own branch in its own git worktree. Now we merge them all to main.

There it is. A complete, production-ready todo app. Three features. Three AI agents working in parallel. Automatic spec review. Automatic code quality review. All the safety gates, zero manual code review overhead.""",

    "recap": """Here's what just happened:

Parallelism: Three independent features built simultaneously by AI agents, each in its own worktree. No conflicts. No waiting.

Quality: Every feature went through two review gates: spec compliance, then code quality. Issues were caught and fixed automatically.

Speed: This workflow would normally take days. Here, we saw it in minutes.

Safety: The agents followed discipline. No hook bypasses. No skipped tests. Every acceptance criterion was verified.

That's cmux-tab-agents. It's about scaling your development velocity with AI, without sacrificing safety or quality.

If you want to try it yourself, the repo is public. Check out the CLAUDE.md to see how the plan works, run the dispatch commands, and watch your own agents build in parallel.

Questions? Comments? Reach out on Twitter or GitHub. Thanks for watching.""",
}

if __name__ == "__main__":
    output_dir = "/Users/banna/cmux-demo-workspace/todo-cmux-demo/voiceover"
    os.makedirs(output_dir, exist_ok=True)
    
    # Female voice (en-US-Neural2-A) or Male voice (en-US-Neural2-C)
    voice = "en-US-Neural2-A"  # Change to "en-US-Neural2-C" for male voice
    
    print(f"Generating voiceover using voice: {voice}\n")
    
    for section_name, text in SECTIONS.items():
        output_file = f"{output_dir}/{section_name}.mp3"
        synthesize_speech(text, output_file, voice_name=voice, speaking_rate=1.0)
    
    print(f"\n✓ All voiceover files generated in {output_dir}")
    print("\nNext: Use these MP3 files in your video editor (iMovie/CapCut)")
EOF

chmod +x /Users/banna/cmux-demo-workspace/todo-cmux-demo/generate_voiceover.py
```

---

## Step 4: Generate All Voiceovers

```bash
cd /Users/banna/cmux-demo-workspace/todo-cmux-demo

# Make sure credentials are set
export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json

# Generate all voiceover sections
python3 generate_voiceover.py
```

**Output:**
```
Generating: /Users/banna/cmux-demo-workspace/todo-cmux-demo/voiceover/intro.mp3
✓ Created: voiceover/intro.mp3
Generating: /Users/banna/cmux-demo-workspace/todo-cmux-demo/voiceover/setup.mp3
✓ Created: voiceover/setup.mp3
... (continues for all 8 sections)
```

---

## Step 5: List Generated Files

```bash
ls -lh /Users/banna/cmux-demo-workspace/todo-cmux-demo/voiceover/

# Output:
# intro.mp3
# setup.mp3
# dispatch.mp3
# agents_talking.mp3
# results.mp3
# merge.mp3
# recap.mp3
```

---

## Step 6: Sync Audio with Screen Recording

Now you have:
- 📹 **Screen recording** (from QuickTime) — `demo.mov`
- 🎙️ **Voiceover audio** — Multiple MP3 files

### Using iMovie (Mac)

1. **Import video:**
   - File → Import → Select your `demo.mov` from QuickTime

2. **Add voiceover audio:**
   - File → Import → Select first MP3 (e.g., `intro.mp3`)
   - Drag to timeline at 00:00

3. **Sync subsequent audio clips:**
   - Each section has a timing in VIDEO_SCRIPT.md:
     - 00:00-01:00 → intro.mp3
     - 01:00-02:00 → setup.mp3
     - 02:00-05:00 → dispatch.mp3
     - etc.
   - Drag each MP3 to the timeline at its start time

4. **Adjust timing:**
   - If voiceover is too fast, slow down video (right-click clip → retime)
   - If too slow, speed up video (1.1x or 1.25x)

5. **Add captions:**
   - Right-click video → Add Captions
   - iMovie auto-generates captions from audio

6. **Export:**
   - File → Export → Format: 1080p → Save as MP4

### Using CapCut (Free, easier)

1. **Create new project**
2. **Import video** (your QuickTime recording)
3. **Import audio** → Add voiceover MP3s to audio track
4. **Sync by timeline:**
   - Drag each MP3 to the correct timestamp
5. **Auto-captions:**
   - Tools → Captions → Auto-generate
6. **Export:** 1080p, MP4

---

## Step 7: Upload to Social Media

```bash
# File size check
ls -lh demo-final.mp4

# YouTube (unlisted or public)
# 1. Go to YouTube Studio
# 2. Upload → Select demo-final.mp4
# 3. Title: "Building a Todo App with cmux-tab-agents"
# 4. Description: (paste from README.md)
# 5. Tags: cmux, ai-agents, software-development
# 6. Unlisted or Public → Publish

# Twitter/LinkedIn/Dev.to
# Direct upload or share YouTube link
```

---

## Voice Options

Customize the voice by changing `voice_name` in the script:

### Female Voices
- `en-US-Neural2-A` — Friendly, clear (recommended)
- `en-US-Neural2-F` — Professional, slightly deeper

### Male Voices
- `en-US-Neural2-C` — Warm, conversational
- `en-US-Neural2-E` — Professional, steady

**Change in script:**
```python
voice = "en-US-Neural2-C"  # Change this line
```

---

## Timing / Speaking Rate

If voiceover doesn't sync with screen recording:

### Too slow?
Increase `speaking_rate` in `generate_voiceover.py`:
```python
synthesize_speech(text, output_file, voice_name=voice, speaking_rate=1.2)
# 1.2 = 20% faster
```

### Too fast?
Decrease `speaking_rate`:
```python
synthesize_speech(text, output_file, voice_name=voice, speaking_rate=0.8)
# 0.8 = 20% slower
```

Then regenerate: `python3 generate_voiceover.py`

---

## Cost Estimate

Google Cloud TTS pricing:
- **Free tier:** 0-4 million characters/month (free)
- **Paid:** ~$16 per 1 million characters after free tier

**This demo:**
- ~5,000 words = ~30,000 characters
- **Cost: FREE** (within free tier)

---

## Troubleshooting

### "GOOGLE_APPLICATION_CREDENTIALS not found"
```bash
# Make sure to set it:
export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json

# Or add to ~/.zshrc:
echo 'export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json' >> ~/.zshrc
source ~/.zshrc
```

### "Authentication failed"
- Download the JSON key file again from Google Cloud Console
- Check file permissions: `chmod 600 ~/google-cloud-tts-key.json`

### "Audio quality is too robotic"
- Use Neural2 voices (more natural than Standard)
- Adjust `speaking_rate` to 0.9-1.1 (slightly slower = more natural)

### "Audio doesn't sync with video"
- Use CapCut (easier) or iMovie with manual timeline adjustment
- Slow down video with retime tool in iMovie

---

## Next Steps

1. **Set up Google Cloud TTS** (5 min)
2. **Run `generate_voiceover.py`** (2 min, downloads 8 MP3s)
3. **Record your screen** (10-15 min of action)
4. **Edit in iMovie/CapCut** (15-20 min)
5. **Upload to social media** (5 min)

**Total time: ~45 minutes from setup to published video**

---

## Quick Commands

```bash
# Set up credentials
export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json

# Generate all voiceovers
python3 /Users/banna/cmux-demo-workspace/todo-cmux-demo/generate_voiceover.py

# List generated files
ls /Users/banna/cmux-demo-workspace/todo-cmux-demo/voiceover/
```

---

Ready to generate voice? Run the setup steps above, then start recording! 🎙️
