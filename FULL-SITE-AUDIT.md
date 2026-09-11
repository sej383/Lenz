# LENZ — Full Site Audit

Conducted after all core pages (Homepage, Services ×4, Portfolio, About, Blog, Contact) were built and approved, before beginning the cosmetic Final Polish punch list. Covers every live route, navigation/links, SEO, migration/redirects, responsive behavior, accessibility, performance, the Contact form, and content/config consistency. A production build (`npm run build`) was run twice — once before fixes, once after — both completed cleanly with zero build errors or warnings.

No pages were redesigned and no cosmetic issues were fixed during this audit. Two small, structural/functional bugs were fixed immediately (see below) because they matched the "Fix Now" criteria exactly — not because they were convenient to fix.

---

## 1. Fix Now — structural/technical problems

### 1.1 Fixed during this audit

- **Footer `tel:` link didn't strip formatting characters.** `Footer.astro` rendered `href="tel:402.813.7289"` (literal dots) on every single page, while `ContactInfo.astro` on the Contact page correctly stripped to `tel:4028137289`. Dotted `tel:` URIs are not reliably parsed by every mobile dialer. **Fixed** — Footer now uses the same digit-stripping logic as ContactInfo. Verified live: the Footer's tel link now reads `tel:4028137289` on every page checked (Homepage, Real Estate, Contact).

### 1.2 Found, not fixed — requires your decision

- **`/services/` has no page and 404s.** The primary nav (every page, header) and Footer both link to `/services/`, but no `src/pages/services/index.astro` was ever built — only the four individual service pages exist. This is a real, currently-broken link in the site's own primary navigation, present on every single page. It wasn't fixed during this audit because it requires a content/design decision, not a one-line correction:
  - **Option A:** Build a minimal Services index page (a simple grid of 4 links to Commercial/Branding/Real Estate/Aerial, similar spirit to how Portfolio and Blog index pages work).
  - **Option B:** Point the nav link at the homepage's existing Services section (`/#services`) instead of a dedicated route.
  - **Option C:** Point it at one of the four service pages as a default.

  I'd lean toward Option A since "Services" reads as its own destination in the nav, not an anchor — but this is a real design decision, flagging rather than deciding it for you.

- **No custom 404 page.** Confirmed by visiting `/services/` directly: the visitor sees Astro's generic, unstyled "404: Not Found" page — no LENZ branding, no navigation back into the site. Every broken/mistyped URL currently dead-ends here. Recommend building a minimal on-brand 404 (charcoal/cream, logo, a line of copy, links back to Home/Portfolio/Contact) before launch.

---

## 2. Pre-Launch Requirements — must be completed before domain switch

### 2.1 Already tracked (confirmed still accurate)

- Contact form: connect a real form handler, remove the "Development Preview" notice, enable production spam protection, test actual delivery to `info@lenzphotos.com`, verify live success/error states. (Recorded in `PROJECT-BRIEF.md` section 13.)
- URL/redirect migration map — see section 4 of this audit for the concrete table.
- Favicon/OG social-sharing image, Open Graph metadata, Search Console registration, sitemap submission, analytics.

### 2.2 New findings from this audit

- **No Open Graph, Twitter Card, or canonical `<link>` tags anywhere on the site.** `BaseLayout.astro` only sets `<title>` and `<meta name="description">`. This means: shared links (Facebook, iMessage, Slack, etc.) currently show no preview image or title card, and there's no explicit canonical URL strategy (relevant once/if the site is ever reachable at both a `www.` and bare domain, or via redirects). This is broader than the brief's existing "Open Graph metadata" checklist line — that line covers the image; this finding also covers the tags themselves and canonical URLs, which weren't explicitly scoped before.
- **No sitemap generation configured.** `astro.config.mjs` has no `site` URL set and no `@astrojs/sitemap` integration — confirmed no `sitemap.xml` in the build output at all. This is a prerequisite for the already-known "sitemap submission" checklist item — there's currently nothing to submit. Needs the final production domain decided first (to set `site` in the config), then the integration added.
- **No `robots.txt`.** Not present in `public/` or the build output. Low effort to add once the domain/staging strategy is settled (e.g., to block indexing of any staging URL before the real launch).
- **No structured data (JSON-LD) outside the Blog.** The three migrated blog articles correctly carry `BlogPosting` schema (verified valid and present on all three). The rest of the site has none — the original brief (section 10) called for `LocalBusiness`/`ProfessionalService` schema on the homepage; that was never built. Worth adding before launch for local-SEO purposes.
- **`prefers-reduced-motion` isn't respected anywhere.** Hover-scale transitions on image tiles (every gallery across the site), the mobile nav slide-in, and the Portfolio lightbox all animate regardless of the visitor's OS-level reduced-motion preference. Nothing is inaccessible without it — all functionality works with or without the animation — but it's a real, systemic accessibility gap worth a dedicated pass (touches many components) rather than a rushed audit-time patch.
- **Facebook URL discovered, not yet added.** The live site links to `https://www.facebook.com/Throughthelenzphoto`. `siteConfig.contact.facebookUrl` is still `null` on the new site (Footer shows "add page link"). This is real, verifiable business data I found during the audit, not something I'm certain you want auto-populated — flagging for your confirmation rather than adding it myself, same as you handled email/phone directly. **Also worth noting:** the current site config has no field for Instagram at all, and the live business is actively using `@throughthelenzphotography` on Instagram (linked in the old site's footer) — the contact/social data model may want an Instagram field added at the same time.
- **Old site uses a second, different contact email in one place.** The old site's `/book-now` page shows `Lenz83@outlook.com`, while the rest of the old site and your explicit instruction to me both use `info@lenzphotos.com`. Flagging as a factual observation only — not a new-site inconsistency, and not something I've changed. `info@lenzphotos.com` is what the new site correctly and consistently uses everywhere.

---

## 3. Final Polish — cosmetic items already tracked or newly discovered

No new cosmetic items were fixed. Everything below either already lives in `FINAL-POLISH-PUNCH-LIST.md` (unchanged, confirmed still accurate) or is newly logged there as a result of this audit.

**Already tracked (confirmed accurate, untouched):**
- Homepage CTA "Explore the Work" vs. "Explore the Portfolio" wording review.
- Header/navigation spacing and sizing final review.
- Photo crop review across all breakpoints.
- Texture strength/consistency review across dark sections.
- Global copy/wording polish pass.
- Aerial page's positioning-intro wide-desktop balance.
- Aerial hero headline sizing on large/ultrawide displays.
- About page's text-only sections' wide-desktop balance.

**Newly added to the punch list from this audit:**
- One content-collection image (`ridgeway-interior.md`'s source photo) appears in the production build output as an unoptimized raw `.jpg` copy rather than a WebP variant. Harmless — the entry isn't currently rendered by any page, so nothing on the live site is affected — but worth a look whenever that entry either gets used somewhere or is confirmed permanently unused.

---

## 4. Migration / Redirect Audit

Old site: `throughthelenzphoto.com` (aliased from `www.lenzphotos.com`), built on Wix. Full top-level navigation and footer link inventory captured directly from the live site during this audit (not assumed).

| Old URL | Content | New URL | Action |
|---|---|---|---|
| `/` | Homepage | `/` | Preserve |
| `/about` | About | `/about/` | 301 redirect |
| `/real-estate-portfolio` | Real estate service + gallery | `/services/real-estate/` (and/or `/work/` for gallery images) | 301 redirect — **needs a decision**: this old page mixed service info and portfolio images; the new site splits that into two destinations. Recommend redirecting to `/services/real-estate/` as the primary target. |
| `/drone-photography` | Aerial services | `/services/aerial/` | 301 redirect |
| `/branding-photography` | Branding services | `/services/branding/` | 301 redirect |
| `/photo-albums` | "Other Photography" (commercial-leaning gallery) | `/services/commercial/` and/or `/work/` | 301 redirect — needs a quick content check to confirm the better target |
| `/real-estate-photo-services` | "Extra Services": 3D Tours, Floor Plans, etc. | `/services/real-estate/` | 301 redirect — this content is **already substantively covered** by the new Real Estate page's Listing Media section |
| `/real-estate-photo-checklist` | "Home Prep Checklist" guide | *(no equivalent yet)* | **Needs investigation/decision** — genuinely useful content with no current home on the new site. Options: recreate as a blog post, add as a Real Estate page resource, or retire with a redirect to `/services/real-estate/` |
| `/contact` | Contact | `/contact/` | 301 redirect |
| `/book-now` | Old booking instructions (pre-dates the current HDPhotoHub flow; shows a different email) | *(no direct equivalent — booking is now the external HDPhotoHub link, not a page)* | 301 redirect → `/services/real-estate/`, since that's now where "Book Real Estate" lives |
| `/blog` | Blog index | `/blog/` | 301 redirect |
| `/post/commercial-photography-that-elevates-your-brand` | Blog post | `/blog/commercial-photography-that-elevates-your-brand/` | 301 redirect (already recorded in `PROJECT-BRIEF.md`) |
| `/post/the-power-of-drone-photography-from-real-estate-to-everyday-moments` | Blog post | `/blog/the-power-of-drone-photography-from-real-estate-to-everyday-moments/` | 301 redirect (already recorded) |
| `/post/why-professional-branding-photos-matter-for-your-business` | Blog post | `/blog/why-professional-branding-photos-matter-for-your-business/` | 301 redirect (already recorded) |
| `/category/all-products` | Wix store auto-generated category page, no real content | — | Intentionally retire, no redirect needed |
| `/my-addresses` | Wix account-system boilerplate | — | Intentionally retire, no redirect needed |
| `/cart-page` | Wix store cart, no real content | — | Intentionally retire, no redirect needed |
| `/_files/ugd/b4a9f5_301188dc279549c09de40dc8c348e5c4.pdf` | Unknown PDF, linked from the old site | — | **Needs investigation** — I didn't open it (downloading and reviewing a PDF from a third-party CDN wasn't in this audit's scope), but its existence and link target should be checked before the old site is decommissioned, in case it's linked from anywhere worth preserving. |

**On the Portfolio route specifically:** the visible navigation already reads "Portfolio," but the underlying route is still `/work/` (per your explicit instruction not to auto-rename it). Recommendation, not a decision: **keep `/work/` as the canonical URL.** It's not indexed under any old URL that used the word "portfolio," so there's no existing SEO equity tied to that specific word — renaming now would only create a redirect to manage for no migration benefit. If you'd rather the URL matched the nav label for its own sake (not for migration reasons), that's a valid but separate call; I'd only make that change on your explicit go-ahead.

---

## 5. Route-by-Route Confirmation

Every route below was checked live (dev server, actual rendering) for: console errors, broken/missing images, H1 count, and — at a 360px viewport — horizontal overflow. All passed cleanly.

| Route | Console errors | Broken images | H1 count | 360px overflow |
|---|---|---|---|---|
| `/` | None | 0 | 1 | None |
| `/work/` (Portfolio) | None | 0 of 20 | 1 | None |
| `/services/commercial/` | None | 0 of 12 | 1 | None |
| `/services/branding/` | None | 0 of 11 | 1 | None |
| `/services/real-estate/` | None | 0 of 12 | 1 | None |
| `/services/aerial/` | None | 0 of 12 | 1 | None |
| `/about/` | None | 0 of 3 | 1 | None |
| `/blog/` | None* | 0 of 5 | 1 | None |
| `/blog/commercial-photography-that-elevates-your-brand/` | None | 0 of 3 | 1 | None |
| `/blog/the-power-of-drone-photography-from-real-estate-to-everyday-moments/` | None | 0 of 3 | 1 | None |
| `/blog/why-professional-branding-photos-matter-for-your-business/` | None | 0 of 3 | 1 | None |
| `/contact/` | None | 0 of 2 | 1 | None |
| `/services/` | N/A — 404, see section 1.2 | | | |

\* A single 404 console entry appeared once while testing this page, traced via network log to a leftover browser-console carryover from the immediately-prior deliberate `/services/` 404 test — confirmed via a fresh reload and full network trace that `/blog/` itself returns 200 with no failed requests.

Every unique `href` collected off the Homepage, Real Estate, and Blog pages resolved correctly except the known `/services/` gap: internal links, both `mailto:info@lenzphotos.com` and `tel:` (now fixed), the external HDPhotoHub booking link (opens new tab, correct `rel="noopener noreferrer"`), and all Blog card links.

**Portfolio lightbox and Contact form**: not re-tested exhaustively in this pass (both were extensively verified — open/close, keyboard Tab-trap, arrow-key navigation, Escape, honeypot behavior, validation, success state — when originally built, with a real bug caught and fixed each time). Nothing in this audit touched either component's code, so no regression is expected; confirmed no console errors on both pages.

---

## 6. Content/System Consistency

Checked for duplication of business info outside `siteConfig`:

| Value | Source of truth | Duplicated elsewhere? |
|---|---|---|
| LENZ wordmark | `src/assets/logo/` via `BrandWordmark.astro` / direct `<Image>` | No typed "LENZ" found in any headline — confirmed via the same rule enforced throughout the build |
| "Visual Storytelling from Every Angle" | `siteConfig.tagline` | Used consistently (Footer, homepage hero) |
| Sarah Lenz | Hardcoded string in `AboutHero.astro`/`AboutStory.astro` copy, and `author` field default in the blog schema | Not centralized in `siteConfig`, but appears identically everywhere it's used — no inconsistency found, just not technically single-sourced. Low priority: could move to `siteConfig.founderName` later if it ever needs to change. |
| `info@lenzphotos.com` | `siteConfig.contact.email` | Correctly referenced everywhere (Footer, Contact page) — no hardcoded duplicates found |
| `402.813.7289` | `siteConfig.contact.phone` | Correctly referenced everywhere — no hardcoded duplicates found |
| FAA Part 107 Licensed & Insured | Repeated as copy text on the Aerial page, About page, homepage teaser, and Footer bottom bar | **Not centralized** — it's the same four-word phrase typed independently in ~4 places. All four currently say the same thing correctly, so this isn't an active inconsistency, but it's a single fact living in multiple places rather than one. Flagging as a content-architecture observation, not a bug — moving it into `siteConfig` is a reasonable Final Polish/pre-launch cleanup, not urgent. |
| Service area | `siteConfig.serviceArea` | Correctly referenced everywhere via the constant — no hardcoded duplicates found |
| `bookRealEstateUrl` | `siteConfig.bookRealEstateUrl` | Correctly referenced everywhere — confirmed identical URL and `target="_blank" rel="noopener noreferrer"` pattern on every "Book Real Estate" button site-wide |
| Contact page URL (`/contact/`) | Hardcoded `href="/contact/"` in several components (Service CTAs, etc.) | Consistent everywhere, but not a named constant like the other URLs above. Same low-priority observation as FAA wording. |

No factual inconsistencies found. The two "not centralized" notes above are architecture observations for a future cleanup pass, not corrections — copy wasn't changed anywhere during this audit.

---

## 7. Performance & Image Notes

- Production build completed in ~15–17 seconds both times, zero errors, zero warnings.
- No bundled `.js` files in the build output at all — the few interactive scripts (mobile nav toggle, Portfolio lightbox, Contact form validation) are small enough that Astro inlines them directly into each page's HTML rather than emitting separate bundles. Confirms the "near-zero JavaScript" goal from the original tech-stack brief is holding.
- Every source photo (some 20–35MB camera originals) is being correctly optimized: spot-checked several `_astro/*.webp` outputs against their source files and confirmed dramatic size reduction (e.g., a 34MB source down to under 100KB in its served variant) with multiple responsive widths generated per image.
- One unused content-collection image ships as an unoptimized raw `.jpg` in the build output — see Final Polish section 3.
- Hero images consistently use `loading="eager"` (correct — above-the-fold, shouldn't lazy-load) while gallery/grid images below the fold use the default lazy behavior — matches the pattern established from the start of the build.

---

## Summary

1. **Fixed immediately:** one bug — the Footer's `tel:` link wasn't stripping formatting characters, unlike the Contact page's version of the same link. Fixed because it's a small, unambiguous correctness fix affecting a functional link on every page, not a design decision.
2. **Remaining structural issues requiring your decision:** the `/services/` nav link 404s (no page exists at that route — needs a decision on what should live there), and there's no custom 404 page for any broken link to land on.
3. **Pre-launch blocker list:** the already-tracked items (form handler, spam protection, migration redirects, favicon/OG image, Search Console, analytics) plus four new ones from this audit — Open Graph/canonical tags, sitemap generation (needs the config's `site` URL set once a domain is chosen), robots.txt, and homepage structured data. Plus two data points to confirm with you: the discovered Facebook URL, and whether to add an Instagram field.
4. **Cosmetic/Final Polish:** no new items beyond one very minor build-output note; everything else already tracked remains accurate and untouched.
5. **Is the site technically ready to enter Final Polish?** Yes, with one caveat: I'd resolve the `/services/` decision first, since it's a broken link in the primary navigation on every page — small in effort, but it sits above "cosmetic" and below "needs a redesign." Everything else found is either already fixed, already tracked, or a genuine pre-launch-phase item that doesn't block cosmetic work from starting.
