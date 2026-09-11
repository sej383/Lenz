# LENZ — Launch Compliance & SEO Audit

Covers accessibility (WCAG 2.2 A/AA), legal/privacy readiness, security, technical SEO, local SEO,
structured data, migration/redirects, and search/analytics launch prep. No approved page layout
was redesigned. Unambiguous technical/accessibility/SEO defects found during this audit were fixed
directly (noted inline); nothing here invents a legal fact or touches DNS/domain configuration.

---

## 1. Accessibility (WCAG 2.2 A/AA)

Tested via real keyboard interaction (actual Tab/Escape key presses, not just static code
reading), computed-style inspection of focus/contrast, and targeted code review — not an
automated score alone.

### Fixed during this audit

- **Mobile nav: no visible or clickable way to close it.** Once open, the full-screen panel
  (`z-index: 40`) rendered *on top of* the header's own toggle button, because the header bar
  picked up `.container`'s `z-index: 1` and lost the stacking fight. The hamburger-to-X animation
  fired correctly, but the X was invisible and unclickable — the only way out was Escape or
  navigating to a link. **Fixed:** `.site-header__bar` now stacks above the panel
  (`src/components/Header.astro`), verified via real click that the X is visible and closes the
  menu.
- **Mobile nav: closed panel was still keyboard/screen-reader reachable.** The panel was hidden
  only via `transform: translateY(-100%)`, which doesn't remove an element from the accessibility
  tree or tab order — a keyboard user tabbing through the page could land on off-screen nav links
  before ever opening the menu. **Fixed:** the panel now carries `inert` while closed (removed on
  open), and `<main>`/`<footer>` go `inert` while the panel is open — a real focus trap using the
  native `inert` attribute rather than hand-rolled Tab-cycling JS. Opening now also moves focus to
  the first link in the panel; closing returns focus to the toggle button. All verified live:
  `main` correctly goes `inert` on open, focus correctly lands on "Home" then returns to the
  toggle button on close.

### Verified, no issue found

- **Keyboard navigation / tab order:** real Tab presses confirmed the skip link is the first stop,
  moves into view on focus, and precedes the rest of the page in a logical order; primary nav
  links are reachable at desktop width.
- **Focus visibility:** every custom interactive element (`.btn` variants, nav links, footer
  links, blog cards, service tiles, the agriculture video's play button, form fields) shows a
  visible indicator on real keyboard focus — either an explicit `:focus-visible` style or the
  browser's native outline (nothing in the codebase sets `outline: none`). The skip link and plain
  nav links rely on the native outline rather than a brand-styled one — functional, not a failure,
  but a nice-to-have polish item if you want it customized later.
- **Heading hierarchy / landmark semantics:** exactly one `<h1>` per page confirmed across all 16
  indexable routes (13 original + the 3 new legal pages), including after this session's changes.
  `<header>`, `<nav aria-label="...">` (separate labels for primary vs. mobile nav), `<main
  id="main-content">`, and `<footer>` are used correctly and consistently.
- **Link/button semantics:** real `<a>` for navigation, real `<button type="button">` for the
  mobile-nav toggle and the agriculture video's play control — no clickable `<div>`s standing in
  for either.
- **Images:** every meaningful `<Image>` across the site carries a real, specific `alt`; the
  header/footer wordmark logo (decorative, name is already in the page's own heading/nav text)
  correctly uses `alt=""` with `role="presentation"`. Portfolio and homepage work-grid images use
  real descriptive alt text — confirmed not decorative-blank.
- **Text/background contrast:** the light-surface and dark-leather-surface color pairs were
  already deliberately tuned and manually contrast-checked earlier in this project (see prior
  session work); spot-re-checked this pass, nothing regressed.
- **Form labels/instructions/errors:** every Contact form field has a real `<label>`, required
  fields are marked both visually and via `aria-describedby` pointing at a live error region,
  validation errors use `role="alert"`, and the honeypot field is `aria-hidden`-equivalent via
  off-screen positioning without being removed from the DOM in a way that would break its
  spam-catching purpose.
- **Zoom/reflow:** content reflows to a single column and remains readable at 200% zoom — no
  fixed-width containers found that would force horizontal scrolling.
- **Mobile target sizing:** the agriculture video's play button (4.5–5.5rem), all `.btn` instances,
  and nav links all clear the 24×24 CSS px WCAG 2.2 (2.5.8) minimum. The Contact form's radio
  inputs are visually small (~18px) but sit inside a `<label>` whose full clickable area is the
  icon *and* its text — the effective target is the whole row, not just the circle.
- **Motion / `prefers-reduced-motion`:** every scroll-reveal and hover-scale animation is gated
  under `@media (prefers-reduced-motion: no-preference)`, so a visitor with the OS setting on never
  sees a hidden/animating state at all — confirmed via the pattern used in `global.css` and
  `BaseLayout.astro`'s reveal script.
- **Video/media controls:** the agriculture video (see section 5 and the separate video-quality
  pass earlier this session) never autoplays, uses `playsinline`, exposes native `<video
  controls>` only once playback starts, and its trigger is a real button with a specific
  `aria-label` naming the video by title.
- **Portfolio gallery:** confirmed (again) non-interactive — plain `<figure>` tiles, no anchors, no
  click handlers, no lightbox code anywhere in the repository.

### Not independently re-verified this pass

Screen-reader-specific behavior (actual NVDA/JAWS/VoiceOver output, not just correct markup) was
evaluated through code/ARIA correctness and keyboard-interaction testing, not a live screen
reader — see the "needs specialist review" note in the deliverable summary below.

### New: `/accessibility/` page

Added at `src/pages/accessibility/index.astro` — restrained LENZ styling (same light-section/prose
treatment as a blog article), plain-language statement, explicitly **does not claim certified
compliance**, states the WCAG 2.2 AA target and known limitations honestly, and lists
`info@lenzphotos.com` as the feedback contact (pulled from `siteConfig`, not hardcoded). No
accessibility-overlay script and no right-click/selection blocking anywhere on the site — confirmed
absent, and the statement says so explicitly.

---

## 2. Legal / privacy

Added `/privacy/` and `/terms/` (`src/pages/privacy/`, `src/pages/terms/`), sharing a new
`src/layouts/LegalPage.astro` shell (same prose styling as a blog article, reused rather than
duplicated three times since it's a real repeated page structure).

**Privacy Policy** discloses, factually, what's actually true about this site today:

- Exactly what the Contact form collects (name, company, email, phone, project type, location,
  project details) and why (to respond to the inquiry — nothing else).
- The honeypot field's existence and purpose (spam-catching, not visitor data).
- That "Book Real Estate" links leave the site to a third party (HDPhotoHub) governed by its own
  policy.
- Cloudflare Web Analytics as the analytics tool, and that it's cookieless (no individual tracking
  profile).
- Netlify (hosting/form processing) and Cloudflare (analytics) named as the two data processors.
- HTTPS as the transport-security baseline.

**Marked, not invented:** one field in the Privacy Policy is flagged with a visible "to confirm"
callout rather than a fabricated answer — exactly how long Netlify retains submitted form data
under LENZ's account, and how long Sarah personally keeps inquiry info afterward. The **Terms of
Use**'s "Governing law" section is flagged the same way — which state's law governs was not
invented; Iowa is *noted as likely* (business location) but explicitly left for confirmation rather
than stated as fact. **Do not publish either page with those two callouts still showing** — the
markup makes them visually obvious for exactly that reason.

**Site-wide copyright notice:** `Footer.astro`'s bottom line now reads exactly `© 2026 LENZ. All
photography and content rights reserved.` (year is computed, not hardcoded — already was). Also
added a small three-link legal row to the footer (Privacy Policy / Terms of Use / Accessibility) so
the three new pages are actually discoverable from every page, not orphaned routes.

**What I did not do:** draft actual photography/video service contract terms (usage rights,
licensing, delivery terms for a real shoot) — the Terms of Use page covers *website* use only, by
design; a client-services contract is a separate, business-specific legal document outside a
website audit's scope.

---

## 3. Security

- **Headers added** (`netlify.toml`, safe to ship pre-launch): `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive
  `Permissions-Policy` (camera/microphone/geolocation all denied — the site uses none of them), and
  a `Content-Security-Policy`.
- **CSP trade-off, stated plainly:** it allows `'unsafe-inline'` for `script-src` and `style-src`,
  because Astro inlines this site's small interactive scripts (mobile nav, contact form, video
  player, scroll-reveal) and every component's scoped CSS directly into each page rather than
  external files. There's no user-generated content rendered back into any page, so the realistic
  XSS surface a stricter CSP would guard against is low here — but this is a real, documented
  trade-off, not a strict CSP. Tightening it later means moving those scripts to external files
  (with Subresource Integrity) or adding a nonce pipeline.
- **HSTS deliberately NOT added yet** — a long-`max-age` `Strict-Transport-Security` header is hard
  to safely reverse once live. Add it only after confirming HTTPS actually works correctly on the
  final production domain post-launch (checklist item below).
- **HTTPS/canonical-host readiness:** `astro.config.mjs` sets `site: 'https://www.lenzphotos.com'`
  (the `https://` + `www.` canonical form used consistently by every canonical/OG/JSON-LD tag
  already). Netlify auto-provisions and auto-renews the TLS certificate once the domain is attached
  — no code-side action needed for HTTPS itself, only DNS at actual launch.
- **No exposed secrets:** grepped the repo for API keys/tokens/credentials — none found. Cloudflare
  Web Analytics uses a public, non-secret per-hostname beacon token by design (it's meant to sit in
  client-side HTML). Netlify Forms needs no API key at all for this site's usage.
- **External resources:** the only third-party script origin the CSP admits is
  `static.cloudflareinsights.com` (the analytics beacon, once its token is filled in). Fonts are
  self-hosted via `@fontsource` npm packages, not loaded from Google Fonts or any other CDN at
  runtime.
- **Form spam/rate-limiting readiness:** the honeypot field (already built, reused by Netlify's own
  `netlify-honeypot` filtering now that the form is wired for Netlify Forms) is the first layer.
  Netlify Forms includes its own spam filtering on top. Neither requires code changes to activate —
  both come from the form already being correctly attributed (`data-netlify="true"`,
  `netlify-honeypot="website"`).
- **Production form handling:** code-complete (see prior session work) — real `fetch` POST with
  genuine success/error states, "Development Preview" notice removed. **Not yet live-verified** —
  see the pre-launch checklist below; this can only be confirmed once actually deployed to Netlify.
- **DMARC:** not something this repo can configure — it's a DNS TXT record on the domain sending
  `info@lenzphotos.com` mail, set at the DNS provider (GoDaddy, per earlier conversation), not in
  this codebase. Documented as a launch-day DNS checklist item; no DNS changes made.

---

## 4. Technical SEO

- **`site` URL:** set in `astro.config.mjs` (`https://www.lenzphotos.com`) — drives every
  canonical, OG, and sitemap URL sitewide.
- **Sitemap:** `@astrojs/sitemap` generates `sitemap-index.xml` + `sitemap-0.xml` at build time;
  confirmed 16 URLs present (every real page, including the 3 new legal pages), 404 correctly
  excluded automatically.
- **`robots.txt`:** present (`public/robots.txt`), references the sitemap.
- **404 not indexed:** confirmed the 404 page was NOT carrying a `noindex` directive — fixed by
  adding a `noindex` prop to `BaseLayout.astro` (renders `<meta name="robots" content="noindex,
  nofollow">` and skips the canonical tag instead) and setting it on `404.astro`. Verified in the
  built HTML.
- **No dev/test routes:** confirmed — `src/pages/` contains only real, intended routes; nothing
  exposes a staging/test/debug page.
- **Per-page audit, all 16 indexable routes:** unique `<title>` (spot-checked all 13
  previously-existing + the 3 new pages — no duplicates), unique meta description, canonical tag,
  exactly one `<h1>`, sensible heading nesting, internal links resolving (see migration section),
  descriptive alt text, and full Open Graph/Twitter Card tags (title/description/image/type) — all
  confirmed present via direct inspection of the built `dist/` output, not assumed from source.
- **Favicon/site-name metadata:** real branded favicons (not the leftover Astro-starter rocket icon
  found and replaced earlier this session) at every standard size, `apple-touch-icon`, and
  `og:site_name` set from `siteConfig.name`.
- **Crawlability:** no `robots.txt` disallow rules blocking real content; no orphaned pages (every
  real route is linked from nav, footer, or an index page).
- **Responsive performance:** unchanged from the existing build — static HTML/CSS, near-zero JS,
  every photo served as build-time-optimized WebP at multiple widths (confirmed again this session
  when checking the agriculture video didn't regress this: total `dist/` is still in the tens of
  MB, not hundreds).

---

## 5. Structured data

- **`ProfessionalService`** (functionally the Organization-level schema the brief called for) on
  the homepage — name, description, address (Woodbine, IA), phone, email, service area, and
  `sameAs` (Facebook) — already built earlier this session, unchanged, re-verified valid JSON.
- **`BlogPosting`** on all three migrated blog articles — unchanged, re-confirmed present and
  valid.
- **`VideoObject`** — new, added to the Aerial service page for the agriculture film: name,
  description, `thumbnailUrl` (the poster JPEG), `contentUrl` (the actual MP4), `uploadDate`
  (2026-09-10, the file's real date — not invented), and `duration` (`PT58S`, from the file's real
  57.5s runtime). Verified valid JSON in the built output.
- **Image/creator metadata:** no site-wide `ImageObject` schema was added — with ~50+ photos across
  the site and no per-image licensing/creator data model currently in the content collections, an
  `ImageObject` block for every photo would mean either fabricating fields or a larger
  content-architecture change outside this audit's scope. Flagged as a future enhancement, not
  implemented.
- **Validation:** structured, valid JSON confirmed by parsing the actual rendered output
  (`JSON.parse` against every script tag) — not run through Google's Rich Results Test / Schema
  Markup Validator, since those require a live, publicly reachable URL this site doesn't have yet.
  **Run both tools against the real production URL once it's live** — listed in the launch
  checklist below.

---

## 6. Local SEO

- **NAP (name/address/phone) consistency:** `LENZ`, `402.813.7289`, `info@lenzphotos.com`, and the
  service-area sentence all read from `siteConfig` everywhere they appear (Header, Footer,
  Contact, About, homepage Credibility strip, JSON-LD) — grepped for stray hardcoded copies of the
  phone number/email outside `siteConfig` and found none except the three new legal pages, which
  I've since switched to import from `siteConfig` too rather than hardcoding, for the same
  single-source-of-truth reason.
- **FAA Part 107 wording:** still typed independently in ~4 places (Aerial page, About page,
  homepage teaser, Footer) — all four currently say the same thing correctly (not a new finding;
  carried over from the prior `FULL-SITE-AUDIT.md` note). Not centralized into `siteConfig` in this
  pass — a reasonable future cleanup, not a defect.
- **Service-area language:** already reads naturally across Commercial/Branding/Aerial/Real Estate
  copy (from earlier build work) — no duplicate "doorway" pages targeting individual cities exist,
  and none were added.
- **Social/business-profile URL:** `siteConfig.contact.facebookUrl` is the one social link
  currently modeled; see section 8 for what to update once the domain is live.

---

## 7. Migration / redirects

- The full old→new URL table (`FULL-SITE-AUDIT.md` section 4) and its ready-to-deploy
  `public/_redirects` file are unchanged and still correct — re-validated this pass by re-running a
  clean production build and confirming `dist/_redirects` still contains every mapped rule.
- **`throughthelenzphoto.com` + `www.throughthelenzphoto.com`**, per your correction this session,
  are documented (not yet implemented — no DNS touched) in `FULL-SITE-AUDIT.md` section 4.1: both
  must permanently 301 to `https://www.lenzphotos.com`, with every URL that has a specific mapping
  in the table redirecting **straight to its corresponding new page** (not to either homepage
  first), and only genuinely unmapped paths falling back to the new homepage. The documented
  procedure explains *why* this needs a small, separate redirect-only Netlify site rather than
  reusing the main site's `_redirects` (relative-path rules would keep visitors on the old domain
  instead of moving them to the new one) — full ready-to-paste `_redirects` content with absolute
  destination URLs is included there.
- **Blog slugs/dates preserved:** confirmed — all three migrated posts keep their original slugs
  (`/blog/<same-slug>/`) and original `publishDate` values from the old site, unchanged from the
  initial migration.
- **Migrated assets:** each post's featured image and body content were carried over during initial
  build (per `PROJECT-BRIEF.md` section 11.5) and are unaffected by anything in this session's
  work — re-confirmed rendering correctly in this pass's build.

---

## 8. Search / analytics — launch-day checklist

None of these can be done before the production domain is actually live; listed here as the exact
sequence to run once it is.

1. **Google Search Console** — verify the property (DNS TXT record or HTML tag method), submit
   `https://www.lenzphotos.com/sitemap-index.xml`.
2. **Bing Webmaster Tools** — verify (Bing supports importing directly from a verified GSC
   property, which is usually the fastest path), submit the same sitemap URL.
3. **Cloudflare Web Analytics** — add the production hostname under Cloudflare's dashboard, copy
   the issued beacon token into `siteConfig.analytics.cloudflareBeaconToken`
   (`src/lib/site-config.ts`), redeploy, and confirm real pageviews land in the Cloudflare
   dashboard within a few minutes of a real visit. The code side of this has been ready since
   earlier this session — this step is purely "paste the token in and confirm it reports."
4. **Google Business Profile** — update the listed website URL to the new canonical domain.
5. **Bing Places / Apple Business Connect (or equivalent Apple Maps listing)** — update website URL
   for consistency with the same canonical domain, so all listings agree with each other and with
   the site's own NAP data.
6. **Structured data validation** — run the live production URLs through Google's Rich Results Test
   and the Schema Markup Validator (schema.org's own validator) once reachable publicly; fix
   anything either tool flags before considering structured data "done," not just "valid JSON."
7. **HSTS** — once HTTPS on the production domain is confirmed working end-to-end, add
   `Strict-Transport-Security` to `netlify.toml`'s existing headers block (deliberately withheld
   until this point — see section 3).

---

## Deliverable summary

**1. Accessibility failures requiring fixes.** Two found, both fixed and verified live this
session (mobile-nav close control invisible/unclickable; closed nav panel reachable via keyboard
when it shouldn't be). No other WCAG 2.2 A/AA failures found across keyboard navigation, focus
visibility, heading/landmark structure, forms, images, contrast, zoom/reflow, target sizing,
motion, video, or the portfolio gallery — see section 1 for what was actually tested and how.

**2. Legal/privacy pages or facts still needing Sarah's input.** Two specific, clearly-flagged
items, both marked with a visible on-page callout rather than a guess: (a) Privacy Policy — exact
data-retention duration for form submissions (Netlify account settings + personal practice); (b)
Terms of Use — the specific state whose law governs (Iowa noted as likely, not assumed as fact).
Do not publish either page with those callouts still showing.

**3. Technical/security blockers.** None that block a *staging* deploy. Two real items that must
happen at actual production launch, not before: enabling HSTS only after HTTPS is confirmed live
(by design — see section 3), and live-testing the contact form's real delivery to
`info@lenzphotos.com` (can only be tested once actually deployed to Netlify).

**4. SEO issues fixed.** 404 page was missing `noindex` (fixed, verified). Placeholder/rocket
favicon issue from earlier this session remains fixed. No other technical SEO defects found in
this pass's per-page audit (see section 4).

**5. Structured data implementation.** `ProfessionalService` (homepage) and `BlogPosting` (3 posts)
already existed and were re-verified valid; `VideoObject` newly added for the agriculture film.
All three confirmed as valid, parseable JSON-LD in the built output — not yet run through Google's
live validation tools, since that requires a public URL (see checklist item 6).

**6. Final redirect map status.** Complete and unchanged for the primary `lenzphotos.com` migration
(implemented, in `public/_redirects`, re-validated this pass). The `throughthelenzphoto.com`
legacy-domain procedure is fully documented with ready-to-deploy redirect rules but intentionally
**not implemented** — no DNS or domain changes were made, per instruction.

**7. Launch-day Search Console/analytics checklist.** See section 8 — seven concrete steps, none
of which can start before the domain is live.

**8. Needs attorney or accessibility-specialist review, not represented as guaranteed compliant:**
- **Both flagged Privacy Policy/Terms of Use fields** (data retention specifics; governing-law
  jurisdiction) — genuine legal facts, not something to infer from the codebase.
- **The Privacy Policy and Terms of Use as a whole** — written in good faith from what's actually
  true about this site's data handling, but neither page was drafted or reviewed by an attorney.
  Recommend legal review before treating either as final, especially if LENZ operates across
  multiple states or the client base includes any minors' data (it doesn't appear to, but that's
  exactly the kind of judgment call a specialist should make, not this audit).
- **Accessibility, similarly:** this pass used real keyboard testing and careful code/ARIA review,
  not an automated score — but it also wasn't tested with an actual screen reader (NVDA, JAWS, or
  VoiceOver) by someone who uses one daily, which is the gold standard beyond what a sighted
  reviewer (human or AI) can fully verify alone. The Accessibility Statement already avoids
  claiming certified compliance for exactly this reason; a professional accessibility audit before
  launch, or shortly after, would be the way to actually earn a stronger claim than "built to align
  with WCAG 2.2 AA."
