# Form submissions → Google Sheets

The five public forms POST to `app/api/forms/route.ts`, which forwards each
submission server-side to a **Google Apps Script Web App**. The script appends a
row to one **spreadsheet**, on a separate **tab** per form type:

| Form type   | Forms                                              | Tab          |
| ----------- | -------------------------------------------------- | ------------ |
| `subscribe` | Newsletter page hero, Blog newsletter banner       | `Subscribes` |
| `quote`     | Per-service quote form, Services-index quote form  | `Quotes` |
| `audit`     | `/free-audit` booking form                         | `Audits` |

The script creates a missing tab on first write, so renaming or deleting one
just makes a fresh empty tab appear on the next submission — rename the tab
name in `Code.gs` instead if you want a different label.

> This repo is public. The spreadsheet ID isn't a secret by itself, but
> there's no reason to publish it — it lives in the script's Script Properties.
> Find it by opening the sheet; the ID is the long string between `/d/` and
> `/edit` in its URL.

The Web App URL is stored server-side only, in `GOOGLE_SHEETS_WEBHOOK_URL`
(no `NEXT_PUBLIC_` prefix), so it is never shipped to the browser.

## One-time setup

1. Go to <https://script.google.com> → **New project**.
2. Delete the placeholder code and paste **`Code.gs`** below as-is — it reads
   the spreadsheet ID from Script Properties rather than from source, so
   nothing sheet-identifying ends up in this file or in git.
3. **Project Settings (gear icon) → Script Properties → Add script property**:
   `SHEET_ID`, set to the ID from the spreadsheet's URL (the string between
   `/d/` and `/edit`).
4. Click **Deploy → New deployment**. Choose type **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, authorize when prompted, and copy the **Web app URL**
   (ends in `/exec`).
6. Put it in `.env.local`:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
   ```
   Also add it to your hosting provider's environment variables (e.g. Vercel).
7. Restart `npm run dev`.

The spreadsheet should also be shared as **Restricted** (not "Anyone with the
link") — Share → General access.

The script creates each tab and writes its header row automatically on the
first submission of that type — no need to add tabs or column titles by hand.

> After editing the script later, you must **Deploy → Manage deployments →
> edit → Deploy** again (or create a new deployment) for changes to take effect.
> The `/exec` URL stays the same when you edit an existing deployment.

## `Code.gs`

```javascript
// The spreadsheet ID lives in Script Properties, not here — see step 3 above.
const SHEET_ID = PropertiesService.getScriptProperties().getProperty('SHEET_ID');

// One tab per form type. Tabs are created on first write if missing.
const TABS = {
  subscribe: {
    name: 'Subscribes',
    headers: ['Timestamp', 'Email', 'Source'],
    row: (d, now) => [now, safe(d.email), safe(d.source)],
  },
  quote: {
    name: 'Quotes',
    headers: [
      'Timestamp', 'Name', 'Email', 'Company', 'Website',
      'ARR', 'Monthly budget', 'Services', 'Goals', 'Message', 'Source',
    ],
    row: (d, now) => [
      now,
      safe(d.name),
      safe(d.email),
      safe(d.company),
      safe(d.website),
      safe(d.arr),
      safe(d.budget),
      safe((d.services || []).join(', ')),
      safe((d.goals || []).join(', ')),
      safe(d.message),
      safe(d.source),
    ],
  },
  audit: {
    name: 'Audits',
    headers: ['Timestamp', 'Name', 'Email', 'Company', 'Website', 'Message', 'Source'],
    row: (d, now) => [
      now,
      safe(d.name),
      safe(d.email),
      safe(d.company),
      safe(d.website),
      safe(d.message),
      safe(d.source),
    ],
  },
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const tab = TABS[data.formType];
    if (!tab) {
      return json({ ok: false, error: 'Unknown formType' });
    }
    appendRow(tab, tab.row(data, new Date()));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Google Sheets treats a cell starting with =, +, - or @ as a formula.
// Without this, a form field becomes a way to plant a live formula in the
// sheet — e.g. one that reads every row and mails it to an attacker the
// moment someone opens the sheet. A leading apostrophe forces literal text.
function safe(v) {
  const s = v == null ? '' : String(v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function appendRow(tab, row) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(tab.name);
  if (!sheet) {
    sheet = ss.insertSheet(tab.name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(tab.headers);
  }
  sheet.appendRow(row);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Payload shapes (for reference)

Sent by `lib/submit-form.ts`, validated in `app/api/forms/route.ts`:

```jsonc
// subscribe
{ "formType": "subscribe", "source": "newsletter-page", "email": "you@co.com" }

// quote
{
  "formType": "quote",
  "source": "services-index",
  "name": "...", "email": "...", "company": "...", "website": "...",
  "arr": "...", "budget": "...",
  "services": ["..."], "goals": ["..."], "message": "..."
}

// audit
{
  "formType": "audit",
  "source": "free-audit-page",
  "name": "...", "email": "...", "company": "...", "website": "...", "message": "..."
}
```

`source` values: `newsletter-page`, `blog-newsletter-banner` (subscribes);
`services-index`, `service-page:<scope>` (quotes); `free-audit-page` (audit).

## Rate limiting

`/api/forms` sits behind a Vercel Firewall rule (`form-rate-limit`, Project →
Firewall) that denies an IP after **30 POSTs per 600s**. It is enforced at the
edge, so a blocked request never reaches the route and leaves **no runtime
log** — `vercel logs` stays silent while the browser gets a `403` whose body is
Vercel's `{"error":{...}}` envelope rather than the route's `{"message":...}`.

Two things to know when this looks like "the form is broken":

- **All five public forms share the one path**, so they share one counter per IP.
- The limit was originally `5 / 600s`, which a single visitor could exhaust by
  retrying — and which unrelated visitors behind one mobile CGNAT or office NAT
  address share. That is what made legitimate submissions fail.

`lib/submit-form.ts` maps `403`/`429` to `SubmissionThrottledError` so the forms
say "wait a few minutes" instead of "something went wrong", which otherwise
invites the immediate retry that spends more of the same budget.
