# Contributing

Thank you for keeping this list true.

## Add or fix a route

1. Edit `data/routes.json`. Every field is required; `url` must be the most official source you can find, and `evidence` says how you know: `documented` only if you read it on the provider's own page, `tested` only with a linked end-to-end run.
2. Label vendor claims as vendor claims in `notes`. Prices carry the date you read them.
3. Set the row's `checkedOn` to the day you checked it. Rows older than 45 days fail validation.
4. Run `node scripts/atlas.mjs build` and commit the regenerated `README.md`.

## Add a resource

Edit `data/resources.json` with a one-line `why` that says what the link gives you that the others do not. One entry per URL.

## What gets declined

- Affiliate links and tracking parameters.
- Tools with no public page or repository.
- Duplicates of a list already linked, unless it is clearly better maintained.
