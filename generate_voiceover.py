#!/usr/bin/env python3
"""
Generate voiceover audio from VIDEO_SCRIPT.md using Google Cloud TTS

Prerequisites:
  pip3 install google-cloud-texttospeech
  export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json

Usage:
  python3 generate_voiceover.py
"""

import os
import sys
from google.cloud import texttospeech

def synthesize_speech(text, output_file, voice_name="en-US-Neural2-A", speaking_rate=1.0):
    """Convert text to speech using Google Cloud TTS"""
    try:
        client = texttospeech.TextToSpeechClient()
    except Exception as e:
        print(f"✗ Error: Could not authenticate with Google Cloud.")
        print(f"  Make sure GOOGLE_APPLICATION_CREDENTIALS is set:")
        print(f"  export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json")
        sys.exit(1)

    input_text = texttospeech.SynthesisInput(text=text)

    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name=voice_name,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=speaking_rate,
    )

    try:
        print(f"  Generating: {output_file}...")
        response = client.synthesize_speech(
            input=input_text,
            voice=voice,
            audio_config=audio_config,
        )

        with open(output_file, "wb") as out:
            out.write(response.audio_content)

        file_size = os.path.getsize(output_file) / 1024  # KB
        print(f"  ✓ Created: {output_file} ({file_size:.1f} KB)")
        return True
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

# Script sections (from VIDEO_SCRIPT.md timings)
SECTIONS = {
    "00_intro": """This is a demo of cmux-tab-agents, a tool that lets you dispatch multiple AI subagents in parallel to build features faster with automatic code review.

Today we're building a real todo app with Next.js and Tailwind. But here's the twist: all three features are being built at the same time by AI agents running in separate tabs, with automatic spec review and code quality checks.

This would normally take hours. Let's see it happen in minutes.""",

    "01_setup": """We've got a bare Next.js project set up with Tailwind CSS. Progressive enhancement all the way. Every feature works without JavaScript, then JavaScript enhances the experience.

Here's the plan: three independent sub-tasks, each with its own feature spec.

Each task has acceptance criteria, file structure, and testing requirements. The key is: they're completely independent. Task one doesn't block Task two. No merge conflicts. No waiting.

That means: dispatch all three implementers right now.""",

    "02_dispatch": """I'm in cmux with a fresh planner session. Let me dispatch all three implementers in parallel.

Three tabs. Three agents. Three different features. All running at the same time.

Look at the status pills: DEMO-1-implementer, DEMO-2-implementer, DEMO-3-implementer. Each one is writing code for its own feature.

The agents are reading their specs, understanding the requirements, and implementing the code. Let's watch them work.""",

    "03_agents_talking": """Here's where it gets interesting. The agents aren't silent. They talk back.

The agent is asking for clarification. It needs to know: what's the error strategy? Show a toast? In-line message? Let me tell it.

It gets the answer and keeps coding. No restart. No re-dispatch. Just a quick nudge in the right direction.

Another agent, another question. We tell it, and it continues. This is real-time collaboration with AI agents.""",

    "04_results": """And then, one by one, they finish.

All three done. Now comes the review phase.

For each task, a spec-reviewer agent checks: Does the code meet the spec? Are acceptance criteria verified? Are tests passing?

The spec-reviewer is thorough. It's not just reading the implementer's claim. It's actually running the tests, checking the code, verifying the spec was met.""",

    "05_merge": """Each sub-task has its own branch in its own git worktree. Now we merge them all to main.

There it is. A complete, production-ready todo app. Three features. Three AI agents working in parallel. Automatic spec review. Automatic code quality review. All the safety gates, zero manual code review overhead.""",

    "06_recap": """Here's what just happened:

Parallelism: Three independent features built simultaneously by AI agents, each in its own worktree. No conflicts. No waiting.

Quality: Every feature went through two review gates: spec compliance, then code quality. Issues were caught and fixed automatically.

Speed: This workflow would normally take days. Here, we saw it in minutes.

Safety: The agents followed discipline. No hook bypasses. No skipped tests. Every acceptance criterion was verified.

That's cmux-tab-agents. It's about scaling your development velocity with AI, without sacrificing safety or quality.""",

    "07_cta": """If you want to try it yourself, the repo is public. Check out the CLAUDE.md to see how the plan works, run the dispatch commands, and watch your own agents build in parallel.

Questions? Comments? Reach out on GitHub. Thanks for watching.""",
}

def main():
    # Check for credentials
    if not os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
        print("✗ Error: GOOGLE_APPLICATION_CREDENTIALS not set")
        print("\nRun:")
        print("  export GOOGLE_APPLICATION_CREDENTIALS=~/google-cloud-tts-key.json")
        sys.exit(1)

    # Create output directory
    output_dir = os.path.dirname(os.path.abspath(__file__)) + "/voiceover"
    os.makedirs(output_dir, exist_ok=True)

    # Voice selection
    # Female: en-US-Neural2-A (friendly), en-US-Neural2-F (professional)
    # Male: en-US-Neural2-C (warm), en-US-Neural2-E (steady)
    voice = "en-US-Neural2-A"  # Change this for different voice
    speaking_rate = 1.0  # Adjust: 0.8 = slower, 1.2 = faster

    print(f"\n🎙️  Generating voiceover using:")
    print(f"    Voice: {voice}")
    print(f"    Speaking rate: {speaking_rate}x")
    print(f"    Output: {output_dir}\n")

    success_count = 0
    for section_name, text in sorted(SECTIONS.items()):
        output_file = f"{output_dir}/{section_name}.mp3"
        if synthesize_speech(text, output_file, voice_name=voice, speaking_rate=speaking_rate):
            success_count += 1

    print(f"\n✓ Generated {success_count}/{len(SECTIONS)} voiceover files")
    print(f"\nNext steps:")
    print(f"  1. Record your screen demo (QuickTime)")
    print(f"  2. Import video + MP3s into iMovie or CapCut")
    print(f"  3. Sync audio with video timeline")
    print(f"  4. Export as 1080p MP4")
    print(f"  5. Upload to YouTube/Twitter/LinkedIn")
    print(f"\nVoiceover files: {output_dir}/")

if __name__ == "__main__":
    main()
