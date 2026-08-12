# Form submissions → Google Sheets

The four public forms POST to `app/api/forms/route.ts`, which forwards each
submission server-side to a **Google Apps Script Web App**. The script appends a
row to one of two spreadsheets:

| Form type   | Forms                                                        | Spreadsheet |
| ----------- | ----------------------------------------------------------- | ----------- |
| `subscribe` | Newsletter page hero, Blog newsletter banner                | [Subscribes](https://docs.google.com/spreadsheets/d/1voqfVSeiRD2z8BH-4Rk8HC7bG-qcBHdodfVX63vmPMQ/edit) |
| `quote`     | Per-service quote form, Services-index quote form           | [Custom quotes](https://docs.google.com/spreadsheets/d/1kSlu7bndAI_Ud9PnHtL_RYGjclxBqYzsJ-k4Bi_d3rQ/edit) |

The Web App URL is stored server-side only, in `GOOGLE_SHEETS_WEBHOOK_URL`
(no `NEXT_PUBLIC_` prefix), so it is never shipped to the browser.

## One-time setup

1. Go to <https://script.google.com> → **New project**.
2. Delete the placeholder code and paste **`Code.gs`** below. The spreadsheet
   IDs are already filled in from the two links above.
3. Click **Deploy → New deployment**. Choose type **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, authorize when prompted, and copy the **Web app URL**
   (ends in `/exec`).
5. Put it in `.env.local`:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
   ```
   Also add it to your hosting provider's environment variables (e.g. Vercel).
6. Restart `npm run dev`.

The script writes a header row automatically the first time each sheet is
empty — no need to add column titles by hand.

> After editing the script later, you must **Deploy → Manage deployments →
> edit → Deploy** again (or create a new deployment) for changes to take effect.
> The `/exec` URL stays the same when you edit an existing deployment.

## `Code.gs`

```javascript
// Spreadsheet IDs (the long string between /d/ and /edit in each sheet URL).
const SUBSCRIBE_SHEET_ID = '1voqfVSeiRD2z8BH-4Rk8HC7bG-qcBHdodfVX63vmPMQ';
const QUOTE_SHEET_ID = '1kSlu7bndAI_Ud9PnHtL_RYGjclxBqYzsJ-k4Bi_d3rQ';

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
        data.email || '',
        data.source || '',
      ]);
    } else if (data.formType === 'quote') {
      appendRow(QUOTE_SHEET_ID, QUOTE_HEADERS, [
        now,
        data.name || '',
        data.email || '',
        data.company || '',
        data.website || '',
        data.arr || '',
        data.budget || '',
        (data.services || []).join(', '),
        (data.goals || []).join(', '),
        data.message || '',
        data.source || '',
      ]);
    } else {
      return json({ ok: false, error: 'Unknown formType' });
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
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
