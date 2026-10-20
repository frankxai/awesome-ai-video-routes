# Awesome AI video routes

The ways to make video with Claude, mapped: native features, MCP connectors, model APIs, apps, open-weight models and full pipelines. Each route says what it costs, what plan it needs, what it can't do, and how sure we are.

<!-- generated:counts -->
31 usable routes across 7 families (20 confirmed on the provider's own page), 22 linked resources, verified 2026-10-20.
<!-- /generated:counts -->

Other lists catalogue tools. This one answers **"I need this video, which route do I take?"** and links to the deeper list for that route. Agents read the same answer from [`data/routes.json`](data/routes.json) or through the [`video-router`](skills/video-router/SKILL.md) skill.

## Pick a route

### 1. Name the jobs in the brief

Most videos need more than one. Mark every job that applies.

| Job | Means | Routes |
|---|---|---|
| **Motion graphics** | Words, numbers, charts or UI that must read exactly | Claude Motion (Team, Enterprise) · HTML artifact rendered with HyperFrames (any plan) · Remotion for many templated versions · Manim for maths · Figma for product motion |
| **Record** | The product exists and can be shown | Claude in Chrome (paid plans) · brag |
| **Generate footage** | Realistic or cinematic shots of things that were never filmed | Higgsfield MCP · Gemini Omni API · Grok Imagine API · Runway · Luma · open weights on a GPU |
| **Presenter** | A person talking to camera | HeyGen avatars · ElevenLabs lip-sync |
| **Audio** | Narration, dubbing, music, sound effects | ElevenLabs MCP · Descript |
| **Edit** | You have footage and need it cut, captioned or cleaned | FFmpeg + auto-editor + WhisperX (cut, caption) · Descript (edit by transcript) · CapCut or Captions (finish by hand) |
| **Publish** | Get it onto a channel | Postiz · vidIQ. A human approves every post. |

### 2. Filter by what you have

- **Claude only, no other accounts:** HTML artifact + HyperFrames, Manim and FFmpeg are free and local. Remotion is free for individuals and companies of up to 3 employees.
- **Claude Team or Enterprise:** add Claude Motion.
- **A connector already authorised:** use it before paying for a second service.
- **An API key and a budget:** Gemini Omni at about $0.10 per second of 720p, Grok Imagine, or the providers in [awesome-ai-video-models](https://github.com/Anil-matcha/awesome-ai-video-models).
- **A GPU:** Wan 2.2 and the other open weights, with fixed seeds and no per-second bill.
- **None of those, but you need footage:** Claude writes the shot brief and you run it in the Gemini app, Flow, Luma or Runway.

### 3. Join the jobs

The combination that works most often: **generate footage clips, then compose titles, captions and data in code** (HyperFrames or Remotion), with narration from ElevenLabs. Generators still render text unreliably, and the code half stays editable after the footage is paid for.

If the product exists, record it before generating anything that imitates it.

### Before you start

- **Veo 3.1 on the Gemini API shuts down on 2026-10-22.** All three preview IDs go. New work uses `gemini-omni-1.1-flash`, or the GA Veo models on Google's Gemini Enterprise Agent Platform.
- **Sora is gone.** The app closed on 2026-04-26 and the API on 2026-09-24.

## All routes

<!-- generated:routes -->
### Native

Claude makes it with no third-party account: the output is code, rendered by Claude or by a free local tool.

| Route | Makes | Exact text | Access | Status | Evidence |
|---|---|---|---|---|---|
| [Claude Motion](https://support.claude.com/en/articles/17454997) | explainer, animated-chart, product-walkthrough | yes | Beta on Team and Enterprise plans. On by default for Team; Enterprise owners turn it on under Organization settings > Artifacts. | beta | documented |
| [Artifacts: animated HTML pages](https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them) | explainer, animated-chart, interactive-demo, loop | yes | Free, Pro, Max, Team and Enterprise all include artifacts. | live | documented |
| [Claude Code + HyperFrames](https://github.com/heygen-com/hyperframes) | explainer, social-short, launch-video, captions, data-story | yes | Free, Apache-2.0, runs locally. | live | documented |
| [Claude Code + Remotion](https://github.com/remotion-dev/skills) | explainer, social-short, data-driven-batch, captions, templated-series | yes | Free for individuals and for-profit companies with up to 3 employees; larger for-profits need a Remotion company licence. | live | documented |
| [Claude Code + Manim or Motion Canvas](https://github.com/ManimCommunity/manim) | math-explainer, diagram-animation, code-walkthrough | yes | Free, MIT. | live | documented |
| [Claude Code + FFmpeg, auto-editor, WhisperX](https://github.com/WyattBlue/auto-editor) | cut-down, silence-removal, captions, reframe-vertical, clips-from-long-video | yes | Free and local. | live | documented |
| [Product demo from the running app](https://github.com/latent-spaces/brag) | product-demo, launch-video, gif | yes | Claude in Chrome needs a paid plan (Pro, Max, Team or Enterprise). brag is MIT. | live | documented |

### Connector

Claude calls a hosted service through an MCP connector. The service generates or edits and bills its own credits.

| Route | Makes | Exact text | Access | Status | Evidence |
|---|---|---|---|---|---|
| [Higgsfield MCP](https://higgsfield.ai/blog/Generate-AI-Videos-From-Claude-with-Higgsfield-MCP) | realistic-footage, cinematic-shot, image-to-video, ad-creative | no | Higgsfield account. Higgsfield's own post lists Veo 3.1, Kling 3.0, Seedance 2.0, Wan and MiniMax Hailuo, up to 4K and about 15 seconds per clip. | live | documented |
| [HeyGen MCP (avatars) and HyperFrames hosted MCP](https://www.heygen.com/blog/generate-ai-videos-with-claude) | talking-head, avatar-explainer, hosted-html-video | yes | HeyGen account; check the current plan limits on HeyGen's pricing page. | live | documented |
| [ElevenLabs MCP (hosted)](https://elevenlabs.io/blog/introducing-voice-music-image-and-video-generation-in-the-elevenlabs-mcp) | narration, dubbing, music, sound-effects, lip-sync, transcript, image-to-video | yes | ElevenLabs account. | live | documented |
| [Descript MCP and API](https://www.descript.com/api) | transcript-edit, filler-word-removal, studio-sound, captions, clips, translation-dub, rough-cut | yes | Any paid Descript plan. | live | documented |
| [OpenArt MCP](https://openart.ai) | image-to-video, short-clip, style-consistent-series | no | OpenArt account. | live | unverified |
| [vidIQ MCP](https://vidiq.com) | clips-from-long-video, b-roll, voiceover, music, motion-graphics, thumbnail, youtube-upload | no | vidIQ account; a YouTube or Instagram connection for publishing. | live | unverified |
| [Canva MCP](https://www.canva.com) | branded-social-video, resize-to-formats, template-video | yes | Canva account. | live | unverified |
| [Figma MCP (motion and video export)](https://help.figma.com/hc/en-us/articles/32132100833559) | ui-motion, prototype-video, design-system-animation | yes | Figma account with the MCP server enabled. Motion and export may need a paid seat; check Figma's plan page. | live | unverified |
| [Runway MCP plugin](https://github.com/runwayml/runway-mcp-plugin) | realistic-footage, video-to-video, reference-consistent-shots | no | Runway API key. | community | documented |
| [ComfyUI MCP](https://github.com/artokun/comfyui-mcp) | open-model-video, custom-workflow, lip-sync, upscale | no | A ComfyUI instance on a capable GPU. | community | documented |

### Api

Claude Code writes the call to a model's API. You hold the key and pay per second of output.

| Route | Makes | Exact text | Access | Status | Evidence |
|---|---|---|---|---|---|
| [Gemini Omni Flash via the Gemini API](https://ai.google.dev/gemini-api/docs/omni) | realistic-footage, native-audio, cinematic-shot | no | Google AI Studio key on the paid tier. | live | documented |
| [Veo 3.1](https://ai.google.dev/gemini-api/docs/pricing) | realistic-footage, native-audio, cinematic-shot | no | Gemini API IDs veo-3.1-generate-preview, veo-3.1-fast-generate-preview and veo-3.1-lite-generate-preview shut down on 2026-10-22. | retiring | documented |
| [Grok Imagine video (xAI API)](https://docs.x.ai/developers/model-capabilities/video/overview) | text-to-video, image-to-video, video-edit, video-extend | no | xAI API key. | live | documented |
| [Kling, Seedance, Runway and Luma APIs (pointer)](https://github.com/Anil-matcha/awesome-ai-video-models) | realistic-footage, image-to-video, motion-heavy-shot, multi-reference | no | An account and key per provider, or one aggregator key. | live | third-party |
| [Sora (OpenAI)](https://techcrunch.com/2026/03/29/soras-shutdown-could-be-a-reality-check-moment-for-ai-video/) | - | no | None. The app closed on 2026-04-26 and the Videos API and Sora 2 endpoints were retired on 2026-09-24. | dead | third-party |

### App

No integration with Claude is established. Claude writes the shot brief and you run it in the app.

| Route | Makes | Exact text | Access | Status | Evidence |
|---|---|---|---|---|---|
| [Gemini app video](https://support.google.com/gemini/answer/16126339) | realistic-footage, conversational-edit | no | Personal accounts need a Google AI plan; Workspace accounts need a qualifying licence; not for users under 18. Uploading video for edits is unavailable in the EEA, Switzerland, the UK and some US states. | live | documented |
| [Google Flow](https://flow.google.com/) | cinematic-shot, multi-shot-scene | no | Google account with a qualifying Google AI plan; check Flow's page. | live | unverified |
| [Luma Dream Machine (Ray3.14)](https://lumalabs.ai/news/ray3_14) | text-to-video, image-to-video, video-to-video, modify-video | no | Luma account. | live | documented |
| [Runway app](https://runwayml.com/) | realistic-footage, video-to-video, reference-consistent-shots | no | Runway account. | live | unverified |
| [Midjourney video](https://docs.midjourney.com/hc/en-us/articles/37460773864589-Video) | image-to-video, stylised-loop | no | Midjourney subscription. | live | unverified |
| [Pika](https://pika.art/) | short-clip, effects | no | Pika account. | live | unverified |
| [LTX Studio](https://ltx.io/studio) | storyboard, multi-shot-scene, pitch-video | no | LTX Studio account. | live | unverified |
| [CapCut and Captions](https://captions.ai/) | captions, short-form-edit, narration, talking-head-finish | yes | CapCut or Captions account. | live | unverified |

### Local

Open-weight models you run yourself, on your own GPU or a rented one.

| Route | Makes | Exact text | Access | Status | Evidence |
|---|---|---|---|---|---|
| [Wan 2.2, HunyuanVideo, LTX-Video, CogVideoX, Mochi](https://github.com/Wan-Video/Wan2.2) | realistic-footage, image-to-video, custom-fine-tune | no | Open weights, but code licences and weight licences differ. Read each checkpoint's model card: HunyuanVideo, LTX-Video and CogVideoX ship weight licences of their own, and CogVideoX-5B asks commercial users to register. | live | documented |

### Pipeline

Open-source end-to-end kits that chain script, voice, footage, captions and render.

| Route | Makes | Exact text | Access | Status | Evidence |
|---|---|---|---|---|---|
| [MoneyPrinterTurbo, explainroo, onetake](https://github.com/harry0703/MoneyPrinterTurbo) | faceless-short, explainer-film, batch-social | yes | Open source; the models they call bill separately. | live | third-party |

### Distribution

Getting the finished file onto a channel. Every publish is a human decision.

| Route | Makes | Exact text | Access | Status | Evidence |
|---|---|---|---|---|---|
| [Postiz (self-hosted scheduler with MCP)](https://github.com/gitroomhq/postiz-app) | scheduled-post | yes | Self-hosted Postiz with each platform's OAuth connected. | live | documented |

**Evidence levels:** `documented` Read on the provider's own page on checkedOn. `third-party` Reported by a third-party guide or tracker; not confirmed on the provider's page. `unverified` The provider's page could not be read on checkedOn; listed from the provider's homepage or reputation. `tested` Run end to end by a maintainer; the test is linked in notes.
<!-- /generated:routes -->

Every row in [`data/routes.json`](data/routes.json) also carries `operations`, `howFromClaude`, `cost`, `notFor`, `reproducible`, `checkedOn` and `notes`.

## Prompts, lists and guides

<!-- generated:resources -->
### Awesome lists

Other curated lists. Use them for depth; this repo routes you to the right one.

- [zhuyansen/awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills): The largest list of video skills for Claude Code and Codex, with 16 skills run end to end against one brief.
- [Anil-matcha/awesome-ai-video-models](https://github.com/Anil-matcha/awesome-ai-video-models): Model-by-model comparison of APIs, price per second, speed and resolution. Maintained by an aggregator vendor.
- [bestaidrama/awesome-ai-video-generators](https://github.com/bestaidrama/awesome-ai-video-generators): One line per generator plus the open-weight models behind them.
- [bestaidrama/awesome-ai-video-benchmarks-and-reviews](https://github.com/bestaidrama/awesome-ai-video-benchmarks-and-reviews): Where to check what a tool actually does: leaderboards, benchmarks, hands-on roundups.
- [ScreenKite/awesome-ai-video-editing](https://github.com/ScreenKite/awesome-ai-video-editing): Editing tools: cutting, captions, reframing.
- [frankxai/awesome-motion-design-agent-skills](https://github.com/frankxai/awesome-motion-design-agent-skills): Sister list for code-driven motion: GSAP, Motion, Remotion, Lottie, Rive.

### Prompts

Prompt libraries and galleries with real outputs.

- [cclank/lanshu-awesome-ai-video-kit](https://github.com/cclank/lanshu-awesome-ai-video-kit): About 600 prompts across 24 models, 7 Claude skills, and a weekly check of official endpoints. Chinese first, English README available.
- [geekjourneyx/awesome-ai-video-prompts](https://github.com/geekjourneyx/awesome-ai-video-prompts): Prompt structure, cinematic language and audio sync, grouped by technique.
- [renoise-ai/awesome-seedance-prompts](https://github.com/renoise-ai/awesome-seedance-prompts): 290+ Seedance 2.0 prompts, CC-BY-4.0.
- [HuyLe82US/awesome-seedance-prompts](https://github.com/HuyLe82US/awesome-seedance-prompts): Seedance 2.0 prompt vault with templates.
- [UlazAI prompt directory](https://ulazai.com/directory/): Browsable community prompts for Seedance, Veo, Kling, Wan and Hailuo. Each prompt links to the vendor's generator.

### Guides

Prompting and production guides, official first.

- [Google Cloud: The ultimate prompting guide for Veo 3.1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1): Official. Shot, subject, action, setting, light, style and audio, with examples.
- [Claude Motion help article](https://support.claude.com/en/articles/17454997): Official. Plans, export and editing for Claude's own animation feature.
- [Remotion docs](https://www.remotion.dev/docs): Official. Compositions, rendering, Lambda, licence.

### Agent skills

Installable skills that teach a coding agent to make or edit video.

- [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes): Write HTML, render video. Ships its own agent skills.
- [remotion-dev/skills](https://github.com/remotion-dev/skills): Remotion's own agent skills.
- [nexu-io/html-video](https://github.com/nexu-io/html-video): HTML, CSS and data to MP4 on your laptop.
- [nateherkai/herk-edit-kit](https://github.com/nateherkai/herk-edit-kit): 15 skills for editing reels and Shorts with Claude Code or Codex.
- [pireel/pireel](https://github.com/pireel/pireel): Open-source editor any agent can drive over MCP. AGPL-3.0.
- [latent-spaces/brag](https://github.com/latent-spaces/brag): Turns a finished project into a launch video in one command.

### Research

Papers and model surveys.

- [showlab/Awesome-Video-Diffusion](https://github.com/showlab/Awesome-Video-Diffusion): The reference list of video diffusion papers.
- [AlonzoLeeeooo/awesome-video-generation](https://github.com/AlonzoLeeeooo/awesome-video-generation): Video generation studies by task.
<!-- /generated:resources -->

A shot template that works across models lives in [`prompts/shot-brief.md`](prompts/shot-brief.md).

## How this list differs

| List | Covers | What this repo adds |
|---|---|---|
| [awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills) | Skills that let coding agents render video, 16 tested end to end | Connectors, model APIs, apps, Claude Motion, audio |
| [awesome-ai-video-models](https://github.com/Anil-matcha/awesome-ai-video-models) | Models, APIs and price per second | How to drive each from Claude, when not to, and what shuts down next |
| [awesome-ai-video-prompts](https://github.com/geekjourneyx/awesome-ai-video-prompts) | Prompting technique | Which route a prompt is for |

Use them together: this repo routes, they go deep.

## Roadmap

1. **Routing benchmark.** Ten representative creator briefs, each run through the route this repo picks and one rejected alternative, with the output, time and cost published. Until it exists, no route here is marked `tested`.
2. One row per model API instead of the shared pointer row.
3. A route-picker page generated from the same data.

## Provenance for generated video

A generated clip cannot be recreated from its prompt alone. Keep a sidecar beside every output with the prompt, model ID, provider, seed if exposed, settings and date. Routes marked `reproducible` are code or open-weight routes that rerun the same way only with the same source, versions, checkpoint and settings.

## Use it from an agent

```bash
npx skills add frankxai/awesome-ai-video-routes
```

The `video-router` skill reads a brief, finds its jobs, filters routes by your access, and returns a route per job with its recipe and limits. It asks before spending credits and never publishes.

## Keep it true

```bash
node scripts/atlas.mjs validate
node scripts/atlas.mjs links
node scripts/atlas.mjs build
node --test scripts/atlas.test.mjs
```

Every route carries its own `checkedOn` date. `validate` fails when any row is older than 45 days or dated in the future, so a stale price cannot sit here quietly. `links` reports pages it could not reach as unverified rather than passing them. CI runs validation and tests on every pull request and the link check weekly.

## Contributing

Add or correct a route in `data/routes.json` with a source URL, an evidence level and today's date, run `node scripts/atlas.mjs build`, and open a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

[CC0 1.0](LICENSE). Linked projects keep their own licences.
