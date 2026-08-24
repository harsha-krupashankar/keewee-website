# Form submissions → Google Sheets

The four public forms POST to `app/api/forms/route.ts`, which forwards each
submission server-side to a **Google Apps Script Web App**. The script appends a
row to one of two spreadsheets:

| Form type   | Forms                                                        | Spreadsheet |
| ----------- | ----------------------------------------------------------- | ----------- |
| `subscribe` | Newsletter page hero, Blog newsletter banner                | Subscribes (ID in the script's Script Properties, not here — see below) |
| `quote`     | Per-service quote form, Services-index quote form           | Custom quotes (ID in the script's Script Properties, not here — see below) |

> This repo is public. Spreadsheet IDs aren't secrets by themselves, but
> there's no reason to publish them — find yours by opening each sheet; the
> ID is the long string between `/d/` and `/edit` in its URL.

The Web App URL is stored server-side only, in `GOOGLE_SHEETS_WEBHOOK_URL`
(no `NEXT_PUBLIC_` prefix), so it is never shipped to the browser.

## One-time setup

1. Go to <https://script.google.com> → **New project**.
2. Delete the placeholder code and paste **`Code.gs`** below as-is — it reads
   the two spreadsheet IDs from Script Properties rather than from source, so
   nothing sheet-identifying ends up in this file or in git.
3. **Project Settings (gear icon) → Script Properties → Add script property**,
   twice: `SUBSCRIBE_SHEET_ID` and `QUOTE_SHEET_ID`, each set to the ID from
   its sheet's URL (the string between `/d/` and `/edit`).
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

Both sheets should also be shared as **Restricted** (not "Anyone with the
link") — Share → General access, on each spreadsheet.

The script writes a header row automatically the first time each sheet is
empty — no need to add column titles by hand.

> After editing the script later, you must **Deploy → Manage deployments →
> edit → Deploy** again (or create a new deployment) for changes to take effect.
> The `/exec` URL stays the same when you edit an existing deployment.

## `Code.gs`

```javascript
// Spreadsheet IDs live in Script Properties, not here — see step 3 above.
const props = PropertiesService.getScriptProperties();
const SUBSCRIBE_SHEET_ID = props.getProperty('SUBSCRIBE_SHEET_ID');
const QUOTE_SHEET_ID = props.getProperty('QUOTE_SHEET_ID');

const SUBSCRIBE_HEADERS = ['Timestamp', 'Email', 'Source'];
const QUOTE_HEADERS = [
  'Timestamp', 'Name', 'Email', 'Company', 'Website',
  'ARR', 'Monthly budget', 'Services', 'Goals', 'Message', 'Source',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const now = new Date();

    if (data.formType === 'subscribe') {
      appendRow(SUBSCRIBE_SHEET_ID, SUBSCRIBE_HEADERS, [
        now,
        safe(data.email),
        safe(data.source),
      ]);
    } else if (data.formType === 'quote') {
      appendRow(QUOTE_SHEET_ID, QUOTE_HEADERS, [
        now,
        safe(data.name),
        safe(data.email),
        safe(data.company),
        safe(data.website),
        safe(data.arr),
        safe(data.budget),
        safe((data.services || []).join(', ')),
        safe((data.goals || []).join(', ')),
        safe(data.message),
        safe(data.source),
      ]);
    } else {
      return json({ ok: false, error: 'Unknown formType' });
    }

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

function appendRow(spreadsheetId, headers, row) {
  const sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
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
```

`source` values: `newsletter-page`, `blog-newsletter-banner` (subscribes);
`services-index`, `service-page:<scope>` (quotes).
