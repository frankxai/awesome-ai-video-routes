# Shot brief

One block per shot. Fill it in plain words, then trim to what the model needs. It is a starting point: the published guides for Gemini Omni, Veo, Kling, Runway and Seedance all ask for some version of these parts, in different orders and at different lengths.

```text
Shot:      [framing + lens + one camera move]   e.g. medium close-up, 35mm, slow push-in
Subject:   [who or what, with two visual anchors]   e.g. a potter in her 60s, clay-grey apron, silver braid
Action:    [one action, present tense]   e.g. lifts a wet bowl off the wheel
Setting:   [place + time of day]   e.g. small stone workshop, early morning
Light:     [source + quality]   e.g. low window light from the left, soft shadows
Style:     [medium + reference era, never a living artist's name]   e.g. 16mm documentary, natural grain
Audio:     [ambience, effects, any line of dialogue in quotes]   e.g. wheel hum, birds outside, no music
Avoid:     [what must not appear]   e.g. text, logos, extra hands
Length:    [seconds] · Aspect: [16:9 | 9:16 | 1:1]
```

## Habits that usually help

1. **Start with one camera move and one action per shot.** Several guides report that stacking moves blurs the motion; add more only once the simple version works.
2. **Describe sound out loud** on models with native audio (Gemini Omni, Veo 3.1 and others). Silence is a choice you state.
3. **Do not ask a generator for exact on-screen text.** Leave text out of the shot and add it afterwards in HyperFrames, Remotion or an editor.
4. **Keep a character consistent with references, not adjectives.** Pass the same reference image to every shot where the model supports it.
5. **Change one thing per retry** so you learn which word moved the result.

## Per-model notes

These come from vendor and third-party guides, not benchmarks. Treat them as starting points.

- **Veo 3.1 and Gemini Omni:** Google's Veo 3.1 guide asks for shot, subject, action, setting, light, style and audio; the same structure is a sound start for Gemini Omni. The Veo 3.1 Gemini API IDs shut down on 2026-10-22. Guide: [Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1).
- **Kling:** guides recommend subject, action, scene, then camera, light and atmosphere, in that order.
- **Runway:** guides favour short prompts about behaviour over appearance, with reference images carrying the look.
- **Seedance 2.0:** strongest when given several reference inputs; see the prompt collections in the README.
