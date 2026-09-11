# LENZ — Website Project Brief

*Prepared by Claude Code after reviewing the LENZ logo and the full photo library in `/Assets`. This is a planning document only — no site has been built yet.*

---

## 0. What's in the folder today

- **Logo:** one file — `Assets/Logos/Untitled - August 26, 2026 at 12.18.37-3.png`. A clean, metallic-gold "LENZ" wordmark on white, with a small black bar through the E, and the tagline "VISUAL STORYTELLING FROM EVERY ANGLE" beneath it in gold. This is a polished, high-end mark and works well as the primary logo.
  - **Gap to flag:** the brief mentions a second, leather-textured version of the logo. That file isn't in the Assets folder. I've planned around the one clean logo we have, and treated "leather" purely as a *texture/material inspiration* (see Visual System) rather than an actual asset. If you have the leather version, drop it in `Assets/Logos/` and I'll incorporate it (e.g., as a favicon variant, a business-card treatment, or a subtle background texture).
  - Also worth doing eventually: a one-color (all-cream or all-white) version of the mark for use on dark backgrounds/footers, and a small square "icon-only" mark for browser tabs and social previews. Easy to create later — not a blocker.

- **Photos:** 29 full-resolution camera files in `Assets/Photos/`, ranging 1.6MB–35MB each. They break down into a few clear groups:
  - **Real estate — aerial (drone):** apartment/multifamily buildings, a large stone custom home from above (pool visible), commercial buildings with water towers, farmland/river property with a boundary overlay.
  - **Real estate — interiors & exteriors:** bathrooms, bedrooms, living rooms, an Airbnb-style property, a twilight pool/home shot.
  - **Commercial:** aerial shots of apartment communities (MUSE Apartments), retail/shopping centers (Nebraska Crossing), and industrial buildings (Southern Tire Mart).
  - **Branding/product:** botanical spray bottles, a coffee sack close-up, whimsical bottle-cap "gnome" figurines — all clean product photography.
  - **People/lifestyle:** a chiropractic treatment session and a fitness/yoga portrait — evidence LENZ can shoot people and services, not just buildings.

  These are camera-original files, not web-ready — that's expected and totally fine (see Image Strategy and Technical Stack below for how we'll handle that automatically).

---

## 0.5 Confirmed Business Details

These decisions are locked in and should inform every page from here on:

- **Service area:** LENZ is based in **Woodbine, Iowa**, and serves western Iowa, the Omaha/Council Bluffs metro, eastern Nebraska, and surrounding Midwest markets. The site should build a strong local/regional SEO presence around this area — but should **not** sound geographically restricted, since LENZ travels for commercial and specialty (branding, aerial) projects. Practical effect: About/Contact copy and structured data should name the home base and core service region plainly, while service-page copy for Commercial/Branding/Aerial should make clear that travel for the right project is normal.
- **Aerial credibility:** LENZ is **FAA Part 107 licensed and insured**. This should appear on the Aerial service page and in an appropriate credibility spot on the About page (e.g., a short credentials line) — stated once, plainly, and not repeated throughout the site as a marketing crutch.
- **Real estate booking:** Real estate photography is ordered through an external **HDPhotoHub** ordering system (not built by us) at `https://throughthelenzphotography.hd.pics/order`. The "Book Real Estate" CTA stays prominent in the header and on the Real Estate service page, opens in a new tab (since it leaves the LENZ site for an external booking system), and reads from **one centrally managed constant** (`bookRealEstateUrl` in `src/lib/site-config.ts`) so that if this URL ever changes, updating it in that one file updates it everywhere on the site.
- **Existing site migration:** The new site will eventually replace **lenzphotos.com**, which already has pages, blog posts, metadata, and accumulated SEO value. **Before launch**, we must complete a URL/redirect migration review: inventory the existing site's URLs and blog posts, decide which are worth preserving, keep URLs the same where practical, and set up proper 301 redirects for anything that changes. **The new site should not go live until this migration map is done.** This is a hard launch gate, not a nice-to-have.
- **Hosting:** left undecided for now. We'll choose between static hosting options (Netlify, Cloudflare Pages, etc.) closer to actual deployment.
- **Logo:** the clean gold LENZ wordmark is the primary — and for this initial build, the *only* — logo treatment. The leather-textured version is not required for launch; it can be considered later as a supplementary treatment if/when that asset exists.

---

## 1. Brand Direction

LENZ should feel like a **trusted visual partner for people who care about how their property, business, or brand is presented** — not a "photographer for hire" and not a luxury-lifestyle brand. The tone is confident and editorial, the way a well-designed architecture or design magazine feels: warm, clean, a little understated, letting the work do the talking.

Concretely, that means:
- **Confident, not showy.** No superlatives, no "award-winning," no exclamation points.
- **Warm, not cold.** The near-black/charcoal foundation is softened by cream and gold — this isn't a stark minimalist tech-startup palette.
- **Editorial, not decorative.** Photos are treated like a magazine spread — generous space, thoughtful cropping — not stuffed into rounded cards with drop shadows.
- **Grounded, not aspirational-fluff.** Copy describes what LENZ actually does (real estate, commercial, branding, aerial) rather than vague inspirational language.
- **Language to avoid:** "capturing moments," "turning moments into memories," "freeze time," "tell your story" (overused), "elevate your brand" (overused SaaS-speak), anything with an exclamation point in a headline.
- **Language to lean into:** direct, specific, sensory-but-plain description — "Interiors that show true to scale," "Aerial coverage for listings, land, and construction progress," "Photography your brand can build a website, deck, or ad campaign around."

## 2. Target Audiences

Four distinct audiences, each with a different buying trigger:

1. **Real estate agents & listing teams** — need fast turnaround, consistent quality, and a simple booking/ordering process (this is why "Book Real Estate" gets its own header button linked to an external ordering system).
2. **Commercial property owners/managers & developers** — leasing offices, apartment communities, retail centers, industrial sites. They want photography that makes a property look leasable/sellable and often need drone coverage of the whole site.
3. **Small businesses & brands** — need product photography, headshots, and brand imagery for their own websites and marketing. This audience buys on trust and portfolio fit, not price — they'll want to see the Branding work specifically.
4. **Aerial/drone clients more broadly** — construction progress, land parcels, events, agriculture — anyone who needs a licensed, professional drone operator, not just real estate aerials.

Because three of these four groups don't come from real estate, the site's messaging and homepage imagery need to work hard to *not* look like a real-estate-only photographer's site — which is exactly why the brief calls for a multi-image hero instead of one big house photo.

## 3. Recommended Site Architecture

A small, flat set of pages — nothing nested more than one level deep, which keeps navigation simple for visitors and keeps the site easy for you to maintain later.

```
/                      Homepage
/work/                 Portfolio — filterable by category
/work/[project-slug]/  (optional, phase 2) individual case studies
/services/             Services overview
/services/real-estate/
/services/commercial/
/services/branding/
/services/aerial/
/about/                About LENZ
/blog/                 Blog index
/blog/[post-slug]/     Individual blog posts
/contact/              Inquiry form (Commercial, Branding, Aerial, general)
```

The **"Book Real Estate"** button lives in the header/nav on every page (styled distinctly from primary nav — it's a call-to-action, not a nav item) and links out to the HDPhotoHub booking/shopping-cart system, opening in a new tab since it leaves the LENZ site. The URL is stored as one centrally managed constant, so if it ever needs to change, it's a one-line edit in one file rather than a hunt through every page.

**Why this structure:** every page has an obvious job, URLs are clean and human-readable (good for SEO and for you to remember), and it maps directly onto how the business actually works — book real estate instantly, inquire about everything else.

## 4. Homepage Structure

Following the brief's direction (no single full-bleed hero photo), here's the section-by-section plan:

1. **Header** — logo left, nav center/right (Home, Work, Services, About, Blog, Contact), "Book Real Estate" button styled as a distinct CTA on the far right.
2. **Hero — asymmetric/editorial split.** Left (or top, on mobile) carries the brand message:
   - **LENZ**
   - **Visual Storytelling from Every Angle**
   - One supporting sentence establishing breadth (property, people, and business — not just real estate)
   - Primary CTA: **Explore the Work** → `/work/`
   - Secondary CTA: **Start a Project** → `/contact/`

   Right side (or below, on mobile): a **2×2 or asymmetric photo grid**, one image per service line (Real Estate, Commercial, Branding, Aerial) — see Image Strategy for the exact files. This single section does the job a hero video or single photo can't: it shows range in one glance.
3. **Services strip** — four short entries (Real Estate, Commercial, Branding, Aerial), each with a representative thumbnail, one line of description, and a link into that service page.
4. **Featured work** — a tighter, curated grid (6–8 images) pulled from across categories, editorial-magazine style, linking to `/work/`.
5. **About/credibility strip** — a short paragraph (not a full bio dump) plus a supporting photo, linking to the full About page.
6. **Recent from the blog** — 2–3 latest post cards (once the blog has content; can be hidden until there's at least one post).
7. **Closing CTA band** — restates the two CTAs (Explore the Work / Start a Project), simple and quiet, no gradient banner.
8. **Footer** — logo mark, nav links, service links, contact info, social links, copyright.

## 5. Recommended Visual System

- **Foundation:** near-black charcoal backgrounds and cream/off-white backgrounds used deliberately in *alternating sections* — not one dark page. Dark sections feel gallery-like and make photography pop; cream sections keep the site feeling warm and readable, not like a moody portfolio site that's exhausting to browse.
- **Photography is the hero, not decoration.** Large, full-width or large-format image treatments; no photos inside heavy card shadows, no rounded-corner-everything, no photo filters/overlays beyond what's needed for text legibility.
- **Gold/bronze is a spot color, not a wash.** Use it for: the logo, small labels/eyebrows (e.g., "REAL ESTATE" category tags), hairline dividers, hover states, icon accents, and the occasional oversized pull-quote. Never as a full-section background — it should feel earned and rare, like foil stamping.
- **Leather-inspired texture — used sparingly and abstractly.** Not literal leather grain. Think: a very subtle warm-toned grain/noise texture applied to isolated small elements (a section divider, a background behind a pull-quote, a button hover state) — never full-page, never a repeating pattern that reads as "rustic" or "western." If in doubt, leave it out; the photography should never compete with a texture.
- **No AI/SaaS tells:** no glassmorphism, no glow/blur effects, no giant blob gradients, no pill-shaped buttons/badges everywhere, no scroll-jacking animations. Motion (if any) should be limited to simple fades/reveals on scroll — subtle, fast, and skippable.
- **Grid discipline:** an editorial magazine layout uses a consistent column grid with intentional asymmetry (one large image + two small, for example) rather than uniform card grids. This is what will make the site feel "designed" rather than templated.

## 6. Typography Direction

Editorial and sophisticated, but the brief is explicit about staying highly readable — so pair a characterful **display serif** for headlines with a clean, neutral **sans-serif** for body copy and UI:

- **Headlines (display):** something like **Fraunces** or **Newsreader** (both free, on Google Fonts) — warm, slightly editorial serifs with real personality at large sizes, without tipping into "wedding invitation" territory.
- **Body/UI:** something like **Inter** or **Public Sans** — highly legible at small sizes, neutral enough to disappear and let the serif and the photography lead.
- **Small labels/eyebrows** (e.g., category tags like "AERIAL"): body sans, letter-spaced, small caps or uppercase, often in the gold accent color — a common editorial device that reinforces the "magazine" feel cheaply.

I'll propose exact type scale (sizes, weights, line-height) once we're building — that's a small technical detail, not a brand decision.

## 7. Color Direction

Pulling directly from the logo's metallic gold and the brief's described palette:

| Role | Approx. value | Use |
|---|---|---|
| Charcoal (near-black) | `#1B1815` | Primary dark background, primary body text on cream |
| Cream | `#F4EEE3` | Primary light background |
| Warm off-white (text on dark) | `#EDE6D8` | Body text on charcoal sections |
| Gold/bronze (primary accent) | `#B98F4E` | Logo color, links, small accents, borders |
| Deep bronze (hover/pressed) | `#8C6A38` | Hover states, active states |
| Muted charcoal (secondary text) | `#5C564D` | Captions, metadata, secondary text on cream |

These are starting points, not locked-in hex codes — once we're building, we'll fine-tune against the actual logo file and check contrast ratios for accessibility (see SEO/Technical section). The important decision to approve now is the *direction*: warm charcoal + cream + a single restrained gold accent, no secondary "brand color," no gradients between them.

## 8. Image Strategy

**The problem today:** every photo in `Assets/Photos/` is a full camera export (several are 20–35MB). Publishing files that size would make the site slow and fail the "extremely fast" requirement immediately.

**The plan:** keep these originals as untouched masters in the project, and let the build process automatically generate small, correctly-sized, next-gen-format (WebP/AVIF) copies for the actual website — at multiple sizes for different screen widths, with lazy-loading below the fold. You will never have to manually resize or compress a photo; you'll drop the original in a folder and the site handles the rest. (Details on how in the Technical Stack section.)

**Recommended homepage hero grid (one photo per service line), by filename:**

| Service | File | Why |
|---|---|---|
| Real Estate | `WP020 - 3865 Martha St - DSC_7863.jpg` | Twilight pool/home shot — warm dusk sky, genuinely striking, and it sets the emotional tone (warm, editorial) for the whole page. |
| Aerial | `WP066 - 2268 S 218th Elkhorn - DJI_20250703131311_0082_D with Pool.jpg` | Dramatic straight-down drone shot — instantly reads as "aerial," strong graphic composition. |
| Commercial | `WP049 - MUSE APARTMENTS - DJI_20250731150231_0826_D.jpg` | Aerial of a multifamily/commercial building — clearly not a single-family house, signals the commercial-scale work. |
| Branding | `DSC_4719.jpg` (Prairie Star Botanicals bottles) | Clean, warm product photography — immediately signals "this studio also shoots brands and products," not just buildings. |

**Supporting images for the "Featured Work" grid and service pages:**
- `WP065 - 2268 S 218th Elkhorn - DJI_20250703131311_0080_D.jpg` — elegant stone-home exterior (Real Estate)
- `WP096 - 4002 Ridgeway - Airbnb Style - DSC_5866.jpg` and `WP082 - 3314 107th Airbnb - DSC_2966.jpg` — warm interior lifestyle shots (Real Estate/interiors)
- `WP050 - MUSE APARTMENTS - DSC_7256-3-HDR.jpg` and `WP051 - MUSE APARTMENTS - DSC_7527-3.jpg` — amenity/courtyard lifestyle shots (Commercial)
- `DSC_3917.jpg` (coffee sack) and `DSC_9690.jpg` (gnome figurines) — product photography (Branding)
- `DSC_4281.jpg` (chiropractic session) and `DSC_7919-3.jpg` (fitness portrait) — people/service photography, good for the About page or a "we shoot people too" moment on the Branding service page
- `WP075 - Mill Creek Ln Updates - DJI_20260715195147_0225_D Line.jpg` — land/property aerial with boundary overlay; useful on the Aerial service page as an example of land-survey-style work, but not a homepage hero (the yellow boundary graphic is client-specific)

**Alt text:** every image will need a short, descriptive alt attribute (e.g., "Aerial view of a stone and metal-roofed home with backyard pool, Elkhorn, Nebraska") — good for accessibility and it directly helps SEO. I'll draft these from the filenames/content and you can refine any that need it.

## 9. Recommended Technical Stack

You told me not to reach for React/Next.js just because they're popular — so here's the reasoning, not just the pick.

**Recommendation: [Astro](https://astro.build), with hand-written CSS (no heavy CSS framework), and Markdown files for blog content.**

Why this fits *this* project specifically:

- **Ships almost no JavaScript by default.** Astro builds plain HTML/CSS. Unlike React or Next.js, there's no client-side framework loading in the visitor's browser unless we deliberately opt a specific small piece of the page into it. For a photography site, that's a huge speed advantage — the bottleneck is images, not app logic, so there's no reason to ship app-framework weight.
- **Built-in image optimization.** Astro has an image pipeline built in — point it at your original photo, and it automatically generates correctly-sized, compressed, modern-format versions at build time. This directly solves the 20–35MB camera-file problem without you touching Photoshop or a compression tool.
- **Content collections = a real blog engine, in plain files.** Each blog post is a single Markdown file (a text file with a title/date/category at the top and your writing below it — genuinely no harder than writing in a plain text editor). Astro turns that into a real, SEO-correct blog with an index page, individual post pages, and (with one small add-on) an RSS feed — without a database or a CMS login to manage.
- **Static output.** The finished site is just files — HTML, CSS, optimized images. That means it's extremely fast to load, cheap or free to host, has no server to get hacked or go down, and is simple to reason about ("what you write is what gets published").
- **Genuinely easier for a non-programmer working with Claude Code than React/Next.js would be.** Astro's page/component files look like HTML with small, readable bits of logic — there's no state management, no client-side routing, no build complexity beyond "run the build command." When you and I look at a file together, it'll be readable, not abstracted behind framework concepts you'd have to learn first.
- **Where a *little* interactivity is genuinely needed** (a mobile nav menu toggle, a lightbox for the work gallery, a filter on the portfolio page), Astro allows small islands of plain JavaScript — no framework required for that either.

**Supporting pieces:**
- **Styling:** hand-written modern CSS using CSS custom properties for the color/type tokens from this brief — no Tailwind, no Bootstrap. Keeps the dependency footprint minimal and keeps styling changes ("make the gold a little darker") a one-file edit.
- **Forms:** since there's no backend server, the Contact/inquiry form should use a static-friendly form handler (e.g., Netlify Forms if hosted on Netlify, or a lightweight service like Formspree) — no custom backend code needed, and submissions land in your email/inbox.
- **Hosting:** a static host such as Netlify or Cloudflare Pages — both have generous free tiers, deploy automatically when files are updated, and require no server maintenance from you.
- **Version control:** the project should live in Git (even a simple local repo, ideally pushed to GitHub) so every change is tracked and nothing is ever truly lost — this also enables the automatic-deploy-on-update workflow above.

This stack avoids the two failure modes the brief warns about: it's not "React/Next.js by default," and it's not a pile of unnecessary dependencies — it's close to the metal (plain HTML/CSS at output) while still giving us real conveniences (image optimization, a blog engine, reusable components) that would otherwise have to be built by hand.

## 10. SEO Considerations

- **Semantic HTML throughout** — proper heading hierarchy (one `<h1>` per page), `<nav>`, `<main>`, `<article>`, `<figure>`/`<figcaption>` for images — helps both search engines and screen readers.
- **Per-page metadata** — unique title tags and meta descriptions for every page, driven from a single reusable layout so it's hard to forget one.
- **Structured data (JSON-LD)** — `LocalBusiness`/`ProfessionalService` schema on the homepage (name, service area, categories), `BlogPosting` schema on blog posts, `ImageObject` schema where useful. This is what lets Google show rich results and understand LENZ is a local visual-media business.
- **Sitemap.xml and robots.txt** — auto-generated at build time (Astro has an official plugin for this) so new pages/posts are always included without manual updates.
- **Fast Core Web Vitals almost for free** — because the site is static with optimized images and near-zero JavaScript, the biggest SEO ranking factors (load speed, interactivity, layout stability) are largely handled by the architecture itself rather than requiring ongoing optimization work.
- **Descriptive, keyword-natural URLs and filenames** — `/services/real-estate/`, `/blog/aerial-photography-for-land-listings/`, etc., rather than IDs or generic slugs.
- **Local SEO** — structured data and About/Contact copy should name Woodbine, Iowa as the home base and explicitly list the served region (western Iowa, Omaha/Council Bluffs metro, eastern Nebraska, surrounding Midwest) so local search understands LENZ's service area — while service-page copy for Commercial/Branding/Aerial stays open about traveling for the right project, so the site doesn't read as geographically limited. The blog is a strong lever here too (see next section).

## 11. Blog/Content Approach

The blog exists for content marketing and SEO, so it should be genuinely easy to add to — not a chore that gets abandoned after two posts.

- **Format:** one Markdown file per post, with a short frontmatter block (title, date, category, cover image, short excerpt) at the top and normal writing underneath. Claude Code can scaffold a new post from a simple request like "start a new blog post about photographing homes at twilight."
- **Categories** that map to the services (Real Estate, Commercial, Branding, Aerial) plus a general/behind-the-scenes category — this lets posts double as SEO landing pages for category-specific searches ("aerial photography for construction progress," "why twilight real estate photos sell homes faster").
- **Content types worth planning for:** educational posts (helps agents/clients understand your process — good SEO), project spotlights/case studies (built from your existing shoots — you already have the photos), and local-market posts (ties LENZ to specific service areas for local search).
- **Cadence is a business decision, not a technical one** — the architecture supports posting weekly or monthly equally well; consistency matters more than frequency for SEO.
- **Images in posts** get the same automatic optimization as everywhere else on the site.

### 11.5 Blog Migration Requirement (firm)

The new Blog is **not a blank slate**. All existing blog content from the current site (lenzphotos.com) must be preserved during migration — new posts are additive, not a replacement for the existing archive.

For every existing post, carry over wherever available:
- post title
- complete article body (verbatim — no rewriting, summarizing, shortening, or "improving" unless explicitly requested later as a separate editorial pass)
- original publication date
- featured image and in-article images
- existing category/topic
- SEO title/meta description, if available
- existing URL/slug

**URLs are preserved exactly wherever practical.** Any URL that must change gets recorded as an explicit `old URL → new URL` mapping in the migration/redirect map (see section 13's pre-launch URL/redirect gate) so a permanent 301 redirect exists before launch — no migrated post's URL changes silently.

Migrated posts become normal, first-class entries in the same `blog` content collection future posts use — same schema, same CMS-readiness, no separate "legacy" system.

**Inventory taken from the live site (throughthelenzphoto.com, aliased from lenzphotos.com) — 3 existing posts, all confirmed and captured in full:**

| Old URL | New URL | Published |
|---|---|---|
| `/post/commercial-photography-that-elevates-your-brand` | `/blog/commercial-photography-that-elevates-your-brand/` | 2026-02-21 |
| `/post/the-power-of-drone-photography-from-real-estate-to-everyday-moments` | `/blog/the-power-of-drone-photography-from-real-estate-to-everyday-moments/` | 2025-09-30 |
| `/post/why-professional-branding-photos-matter-for-your-business` | `/blog/why-professional-branding-photos-matter-for-your-business/` | 2025-09-24 |

Every existing URL's path changes (`/post/` → `/blog/`, matching this site's existing nav structure), so all three need a 301 redirect at launch — slugs themselves are preserved exactly, only the prefix changes. None of the three currently have a manually-authored SEO meta description (the live site's `og:description`/schema `description` are auto-truncated from the body text) — worth writing real ones during migration rather than carrying over the auto-truncated version. None have inline body images beyond their featured image. The live site doesn't expose a category/tag field in its data — each post's category will need to be assigned by content judgment when migrated (post 1 reads as Commercial, post 2 as Aerial, post 3 as Branding), not carried over from a source field that doesn't exist.

## 12. Contact and Booking Workflows

Two distinct workflows, matching how the business actually operates:

1. **Real Estate → "Book Real Estate" button (header, every page).** Links out to the external **HDPhotoHub** ordering/shopping-cart system (`https://throughthelenzphotography.hd.pics/order`), opening in a new tab since it leaves the LENZ site. This button reads from **one centrally managed constant** — if the link ever changes, it's a one-line update in a single file, not a page-by-page hunt. This path bypasses the contact form entirely, since real estate booking should be instant and self-serve.
2. **Everything else (Commercial, Branding, Aerial, general inquiries) → `/contact/` inquiry form.** A single well-designed form with a "project type" selector (Commercial / Branding / Aerial / Other) so inquiries arrive pre-categorized, plus the standard name/email/phone/message fields and a project-details textarea. Submissions route to your email via the static form handler mentioned in the Technical Stack section — no separate inbox or dashboard to check.

The Services pages (Real Estate, Commercial, Branding, Aerial) should each end with the *correct* CTA for that page — "Book Real Estate" button for the real estate page, "Start a Project" (→ contact form) for the other three — so visitors are never routed to the wrong workflow.

---

## 13. Pre-Launch Checklist

Items that don't need to be built during initial development, but **must** be addressed before the site goes live replacing lenzphotos.com:

- **URL/redirect migration map** (hard launch gate — see Confirmed Business Details above): inventory lenzphotos.com's existing pages and blog posts, preserve URLs where practical, and write 301 redirects for anything that changes.
- **Favicon and social-sharing image** — a small square icon version of the logo for browser tabs, and a designed image (typically 1200×630px) for how the site looks when a link is shared on social media or in a text message.
- **Open Graph metadata** — the behind-the-scenes tags that control that shared-link preview (title, description, image) on every page.
- **Google Search Console** — register the site so Google can properly index it and so we can monitor for crawl errors after launch.
- **Sitemap submission** — submit the auto-generated sitemap.xml to Google (and Bing) once the domain is live.
- **Analytics** — decide on and install a page-view analytics tool (e.g., a privacy-friendly option like Plausible/Fathom, or Google Analytics) so you can see traffic after launch.
- **Connect the Contact page's real form handler** — the inquiry form (`src/components/contact/InquiryForm.astro`) is fully built (fields, validation, success/error states, honeypot) but intentionally submits nowhere yet, since hosting/form-provider (Netlify Forms vs. Formspree vs. other) is still undecided. Once chosen, wire up the real submission target.
- **Remove the "Development preview" notice** on the Contact page once a real handler is connected — it's the visible marker that submissions aren't live yet.
- **Enable production spam protection** — a honeypot field is already in place; add the hosting/provider's additional layer (e.g., Netlify Forms' built-in filtering, or reCAPTCHA/hCaptcha) once the provider is chosen.
- **Test successful delivery to `info@lenzphotos.com`** — confirm real submissions actually arrive once the handler is connected, before the form goes live publicly.
- **Verify live success/error states** — confirm the already-built success and validation-error UI behave correctly against the real handler's actual responses (not just the current client-side-only simulation).

---

## 14. Future Requirement: Lightweight CMS / Admin Interface

**The site owner should not have to edit Astro source code for routine content updates.** A CMS/admin interface is not being built now, but the site must be architected so one can be added cleanly later without a rebuild. Practical effect on how the site gets built from here on:

- **Content lives in structured content files, not hardcoded in page templates.** Blog posts, portfolio/project entries, and their images, titles, descriptions, and categories belong in Astro **content collections** (Markdown/JSON files with a defined schema in `src/content/`) — never written directly inline inside `.astro` page markup. This was already the plan for the blog (section 11); it now extends to the portfolio/work items as well.
- **Why this matters:** content collections are just structured files on disk. A future CMS — whether a git-based one (e.g., Decap CMS, Tina) or a hosted one — can read and write those same files/an equivalent data source directly, without anyone having to re-architect how the site pulls in its content. Keeping content and presentation separated now is what makes that swap possible later without a rebuild.
- **Scope for a future CMS:** blog posts, portfolio/project entries, project images, titles/descriptions, categories, and a defined set of editable homepage/site copy fields (e.g., the hero tagline and supporting copy) — content an owner would plausibly want to update often. Global layout, design system, and page structure stay Claude Code's responsibility, not something exposed for editing.
- **Not required to implement yet.** No CMS software, admin UI, or authentication is being set up as part of current work. This section exists so that ongoing build decisions (how blog/portfolio data is structured, whether homepage copy is hardcoded vs. pulled from a small content file) are made with this future need in mind.

---

## 15. Ongoing Requirement: The Photo Library Is Evolving, Not Fixed

**The 29 files reviewed in section 0 are a starting inventory, not the final library.** The site owner is actively going through their own archives and adding new images to `Assets/Photos/` throughout the build. Every phase of work from here on should treat the photo library as something that can grow mid-project, and build a rescan into the process rather than relying solely on whatever was present at the last review.

Practical effect on how pages get built from here on:

- **Before starting a new service page**, rescan `Assets/Photos/` for images added since the last review that are relevant to that service, and factor genuine candidates into the proposed structure/image selection before building.
- **Before final approval of a page**, do one more quick rescan to check whether a newer image would strengthen a weak or repetitive selection already in the draft.
- **Never auto-replace an approved image just because a newer one exists.** If a rescan turns up a stronger candidate for something already approved, flag it explicitly — name the current image, the proposed replacement, and the reason — and wait for approval before swapping anything.
- **Priority gaps to watch for** as new images come in: stronger Branding/product work, people-at-work imagery, hospitality, construction, agriculture, commercial interiors, and specialty aerial work — these are the categories the current library is thinnest on (see section 0 and the Branding page build, which had only 5 usable images total).
- **Never delete source photographs for being unused on a given page.** Every original stays in `Assets/Photos/` as part of the full portfolio and future-use library, regardless of which pages currently reference it — consistent with the existing "flag, don't delete" pattern already used in the `work` content collection (`featuredOnHome`, `featuredOnServicePages`).
- **New images that earn a spot on the site go through the content collection**, not a hardcoded import — add a new Markdown entry in `src/content/work/` with the appropriate `featuredOnServicePages`/`featuredOnHome` flags, per the CMS-readiness architecture in section 14. Direct component imports stay reserved for page-identity assets (e.g., a service page's single hero image), matching the pattern already established for the Commercial and Branding hero photos.

---

**This is the plan.** Direction approved — next step is the initial Astro project scaffold and homepage foundation (see below for what's included in this first build phase).
