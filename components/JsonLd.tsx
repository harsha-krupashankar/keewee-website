/**
 * Renders schema.org data. `<` is escaped so a CMS string containing
 * "</script>" can't break out of the tag — JSON.stringify alone doesn't escape
 * it. `null` entries are skipped so builders can opt out when data is missing.
 */
export default function JsonLd({ data }: { data: object | null | (object | null)[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(
    (item): item is object => item !== null
  );
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
    />
  ));
}
