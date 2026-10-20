# Agent instructions

This repository routes video jobs to the right way of making them with Claude. The data is the product; the README is generated from it.

## Edit the data, not the tables

- Routes live in `data/routes.json`, resources in `data/resources.json`.
- Never hand-edit text between `<!-- generated:* -->` markers in `README.md`. Run `node scripts/atlas.mjs build`.
- Every route needs a primary source `url`, an `evidence` level and the `checkedOn` date you read it. `documented` means you read it on the provider's own page; `tested` needs a linked end-to-end run.
- Label vendor claims as vendor claims. Never round a price or widen a plan restriction.

## Before you open a pull request

```bash
node scripts/atlas.mjs validate
node scripts/atlas.mjs check
node --test scripts/atlas.test.mjs
node scripts/atlas.mjs links
```

All four must pass; `links` may report `unverified` pages, never `broken` ones.

## Keep it public-safe

No credentials, private paths, internal strategy, affiliate links or tracking parameters. Linked projects keep their own licences.

## Generation and publishing

The `video-router` skill may recommend paid generation and publishing tools. Agents state the expected cost before spending credits and never upload or publish on a user's behalf without that user's approval.
