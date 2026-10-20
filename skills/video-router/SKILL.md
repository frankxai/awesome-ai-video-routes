---
name: video-router
description: Picks the right way to make a video with Claude before any generation starts. Use when someone asks to make, generate, animate, edit, dub, narrate or cut a video, reel, Short, explainer, launch film, avatar or talking-head clip, or asks which video tool, model or connector to use. Returns a route per job with its recipe, cost and limits. Never publishes.
---

# Video router

Choose routes before generating. The wrong route wastes credits and still garbles on-screen text.

## 1. Read the data

Load `data/routes.json` from this repository (raw: `https://raw.githubusercontent.com/frankxai/awesome-ai-video-routes/main/data/routes.json`). Drop routes whose `status` is `dead` or `retiring`. Treat any row whose `checkedOn` is older than 45 days as needing a re-check before you quote its price.

## 2. Find the jobs in the brief

A brief can contain several. Each job maps to the `operations` field:

- `motion-graphics`: words, numbers, charts or UI must read exactly.
- `record`: the product exists and can be shown.
- `generate-footage`: realistic or cinematic shots that were never filmed.
- `presenter`: a person speaking to camera.
- `audio`: narration, dubbing, music, sound effects.
- `edit`: existing footage to cut, caption, clean or edit by transcript.
- `compose`: putting clips, titles and audio together.
- `publish`: getting it onto a channel.

If the product exists and the brief wants its UI on screen, prefer `record` over generating an imitation.

## 3. Find out what the user has

Ask only what the brief leaves out, one question at a time: Claude plan, connectors already authorised, API keys, a GPU, budget, length, aspect ratio, destination.

## 4. Pick one route per job

For each job, keep routes whose `operations` include it. Drop every route the user cannot use: a plan they lack, a connector or key they do not have and will not add, a `local` route without a capable GPU. Then prefer in order:

1. A connector the user already has.
2. A free `native` route.
3. A `local` route when the user has a GPU and wants fixed seeds or no per-second bill.
4. A paid `api` or `connector` route within budget, cheapest that meets the quality bar.
5. An `app` route, where Claude writes the brief and the user runs it, when nothing else is left.

If no route survives for a job, say so and name what would unlock one.

Prefer `evidence: documented` over `third-party` over `unverified` when two routes tie.

## 5. Answer

For each job, in order:

1. **Route** and one sentence on why.
2. **Recipe** from `howFromClaude`.
3. **Cost and access** from `cost` and `access`, with `checkedOn`.
4. **Watch out** from `notFor` and `notes`.

Then one line on how the jobs join, usually: generate clips, compose text and captions in code, add audio last.

## Rules

- Before any generation that spends credits or money, state the expected cost and get a yes.
- Uploading and publishing are the user's actions. Stage the file and stop.
- Write a sidecar beside every generated clip: prompt, model ID, provider, seed if exposed, settings, date.
- An avatar or voice clone of a real person needs that person's consent.
