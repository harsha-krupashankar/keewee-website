/**
 * The Studio renders its own full-viewport chrome, so it opts out of the site's
 * fonts, background and `<SanityLive />` connection.
 */
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
