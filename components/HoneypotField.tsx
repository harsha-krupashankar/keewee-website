/**
 * Bot trap for the public forms. Positioned off-screen and pulled out of tab
 * order rather than `display:none` — hidden from real visitors and screen
 * readers alike, but still visible to a scraper that fills in every field it
 * finds. A non-empty value is checked server-side in `app/api/forms/route.ts`.
 */
export default function HoneypotField() {
  return (
    <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
