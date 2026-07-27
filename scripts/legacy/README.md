# Legacy content

The hardcoded `lib/*-data.ts` files as they existed before the Sanity migration,
recovered verbatim from commit `dfd89ce`.

They exist only as input to `scripts/seed.ts`, which transforms them into Sanity
documents. Nothing in `app/` or `components/` imports from here.

**Once the seed has run against every environment you care about, delete this
directory.** Leaving it around invites someone to "fix a typo" here and wonder
why the site never changed.
