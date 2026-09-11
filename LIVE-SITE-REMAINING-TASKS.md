# LENZ — Remaining Tasks to Live Launch

Tracks what's actually left between "code is ready" and "lenzphotos.com is live." Grouped by what
kind of action each item needs — most of the list is already done; what's left mostly needs a real
deployment or a DNS decision, neither of which can happen from this repo alone.

---

## A. Done in code, verified locally — nothing further needed here

- [x] **Production Contact form handler** — wired for Netlify Forms (`data-netlify="true"`, real
      `fetch` POST with genuine success/error states, `InquiryForm.astro`).
- [x] **Spam protection** — honeypot field reused by Netlify's own `netlify-honeypot="website"`
      filtering; bot-filled submissions are silently short-circuited client-side before any network
      call.
- [x] **"Development Preview" messaging removed** — gone from the Contact page and the form's
      success state.
- [x] **Canonical tags** — every page, via `BaseLayout.astro`.
- [x] **Open Graph / Twitter Card metadata** — every page, default image is the branded
      `og-image.jpg`.
- [x] **XML sitemap** — `@astrojs/sitemap`, 16 URLs, 404 correctly excluded.
- [x] **`robots.txt`** — present, references the sitemap.
- [x] **Organization/business structured data** — `ProfessionalService` schema on the homepage.
- [x] **BlogPosting structured data** — present and valid on all 3 migrated posts (re-verified this
      pass).
- [x] **VideoObject structured data** — present and valid on the Aerial page for the harvest film
      (re-verified this pass).
- [x] **Privacy Policy retention wording** — updated to the purpose-based statement (no fixed
      deletion period promised).
- [x] **Terms of Use governing-law clause** — states Iowa as the working jurisdiction, explicitly
      flagged on-page as attorney-review-recommended rather than presented as settled legal advice.
- [x] **Cloudflare Web Analytics — code side** — `siteConfig.analytics.cloudflareBeaconToken` is
      wired into `BaseLayout.astro`; the beacon script only renders once a real token is filled in.
- [x] **Security headers** — CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
      Permissions-Policy in `netlify.toml`. HSTS intentionally not yet added (see section C).
- [x] **Legacy-domain redirect procedure documented** — full ready-to-deploy `_redirects` content
      for `throughthelenzphoto.com`/`www` in `FULL-SITE-AUDIT.md` section 4.1. Not implemented —
      needs DNS, see section C.

---

## B. Can only be verified once the site is actually deployed somewhere public

Nothing in this section is a code problem — these genuinely cannot be tested against `localhost`.

- [ ] **Live inquiry delivery test to `info@lenzphotos.com`** — submit the real Contact form
      against the deployed site and confirm the email actually arrives. Requires: the site deployed
      to Netlify, and a Forms → Notifications → email rule configured in Netlify's dashboard first
      (dashboard setting, not code — I don't have access to configure this myself).
- [ ] **Cloudflare Web Analytics activation** — add the production hostname under Cloudflare's
      dashboard (Web Analytics tab), copy the issued beacon token into
      `siteConfig.analytics.cloudflareBeaconToken`, redeploy, confirm a real pageview reports back.
      Doesn't require proxying DNS through Cloudflare — just a hostname registration there.
- [ ] **Google Search Console readiness** — verify the property (DNS TXT or HTML-tag method) and
      submit `https://www.lenzphotos.com/sitemap-index.xml`. Sitemap/robots.txt are already
      correct and waiting; verification itself needs the live domain to exist first.
- [ ] **Bing Webmaster Tools readiness** — same idea; Bing supports importing straight from a
      verified GSC property, which is usually the faster path once GSC is done.
- [ ] **Structured data live validation** — run the real production URLs through Google's Rich
      Results Test and schema.org's Validator. Already confirmed valid JSON locally (this pass); a
      live-URL check is the last step.

## C. Blocked on a DNS/domain decision — will not proceed without showing you the exact change first

- [ ] **Confirm HTTPS on the live primary domain, then enable HSTS.** Netlify auto-provisions TLS
      once a domain is attached — this needs the domain actually pointed at Netlify first. Once
      confirmed working, adding HSTS is a one-line change to the existing `netlify.toml` headers
      block.
- [ ] **Legacy-domain redirects (`throughthelenzphoto.com` + `www`)** — the procedure and exact
      `_redirects` content are written and ready (`FULL-SITE-AUDIT.md` section 4.1); implementing
      it means creating a second small Netlify site and pointing that domain's DNS at it. Not done.
- [ ] **`lenzphotos.com` DNS → Netlify.** This is the actual go-live switch. Per your own earlier
      instruction, this doesn't happen until you've reviewed the deployed build on its Netlify
      staging URL first.

**Before touching any of the above:** I'll show the exact DNS records (type, host, value) that
would change, and wait for explicit confirmation — nothing in section C happens silently.

---

## What I need from you to keep going

1. **Has the GitHub → Netlify import been done yet?** (Add new site → Import from GitHub →
   `sej383/Lenz`.) If yes — what's the site's current `*.netlify.app` URL, so I can actually test
   against something real instead of localhost? If no, that's the next concrete step before any of
   section B can start.
2. Everything in section A is already pushed to `main` as of this session (see commit list below)
   — Netlify will pick it up automatically on the next deploy *if* continuous deployment from
   GitHub is already connected.
