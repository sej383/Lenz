# LENZ — Remaining Tasks to Live Launch

Tracks what's actually left now that `www.lenzphotos.com` is the live, confirmed-working production
site (HTTPS valid, legacy domains redirecting correctly — see the domain verification pass in this
session's history). What's left is almost entirely dashboard actions in third-party services this
repo has no access to, not code.

---

## A. Done — code shipped, verified live on production

- [x] **Production Contact form handler** — Netlify Forms, real `fetch` POST with genuine
      success/error states.
- [x] **Spam protection** — honeypot reused by Netlify's own `netlify-honeypot="website"` filtering.
- [x] **"Development Preview" messaging removed.**
- [x] **Canonical tags** — every page.
- [x] **Open Graph / Twitter Card metadata** — every page.
- [x] **XML sitemap** — `https://www.lenzphotos.com/sitemap-index.xml`, 16 URLs, confirmed live and
      returning valid XML.
- [x] **`robots.txt`** — live, references the sitemap.
- [x] **Structured data** — `ProfessionalService` (home), `BlogPosting` (3 posts), `VideoObject`
      (Aerial page) — all confirmed valid JSON-LD live in production.
- [x] **Privacy Policy / Terms of Use / Accessibility Statement** — live, with the retention wording
      and Iowa governing-law clause from this session.
- [x] **Security headers** — CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
      Permissions-Policy confirmed present on live responses. HSTS is also live — turned out to be
      Netlify's own default once a custom domain + SSL is attached, not something this repo added.
- [x] **HTTPS on the primary domain** — confirmed live, valid certificate, HTTP→HTTPS redirect
      working, on `www.lenzphotos.com`, `lenzphotos.com`, `throughthelenzphoto.com`, and
      `www.throughthelenzphoto.com`.
- [x] **Legacy domain redirects** — `throughthelenzphoto.com` and `www.throughthelenzphoto.com` both
      301 straight to `https://www.lenzphotos.com`; every mapped old URL (blog posts,
      `/real-estate-portfolio`, `/drone-photography`, `/about`, `/book-now`, etc.) redirects to its
      correct new page, verified through both legacy hostnames.
- [x] **Live inquiry delivery test — COMPLETE.** Sarah submitted a real test inquiry and confirmed
      it arrived at `info@lenzphotos.com`. Don't re-flag unless a future change touches the form.
- [x] **Google/Bing site-verification meta tags — code ready.** `siteConfig.search` now has
      `googleSiteVerification` and `bingSiteVerification` fields (both `null`), rendered as
      `<meta name="google-site-verification">` / `<meta name="msvalidate.01">` in
      `BaseLayout.astro` only once a real value is set. See section B for how to use this.

---

## B. Analytics & search visibility — dashboard actions, not code

Everything the code side needs is already shipped and confirmed live. What's left is entirely
account-level setup in Cloudflare/Google/Bing's own dashboards.

- [ ] **Cloudflare Web Analytics.** Code is ready and confirmed idle (no beacon script renders while
      the token is unset — verified live). To activate: add `www.lenzphotos.com` under Cloudflare's
      **Web Analytics** tab (this does *not* require proxying DNS through Cloudflare — it just
      issues a per-hostname JS beacon token), send me the token, I'll drop it into
      `siteConfig.analytics.cloudflareBeaconToken` and redeploy. Confirm activation by checking for
      a real pageview in Cloudflare's dashboard a few minutes after visiting the live site. **Not
      adding GA4** unless you specifically ask for it.
- [ ] **Google Search Console — verification options for `www.lenzphotos.com`.** Two realistic
      paths:
      1. **DNS TXT record** (Google's usual recommendation) — added at whatever registrar/DNS
         provider now manages `lenzphotos.com`'s DNS. No code change, nothing from me needed except
         confirming it once added.
      2. **HTML tag method** — Google gives you a `<meta name="google-site-verification"
         content="...">` snippet; send me just the `content` value and I'll drop it into
         `siteConfig.search.googleSiteVerification` (already wired, confirmed rendering nothing
         while unset) — one line, one redeploy, done.
      Either way: once verified, submit the sitemap at
      **`https://www.lenzphotos.com/sitemap-index.xml`** — confirmed live, valid XML, all 16 real
      pages listed, 404 correctly excluded. Ready to submit as-is.
- [ ] **Bing Webmaster Tools.** Same two paths as Google — Bing also supports a meta-tag method
      (`siteConfig.search.bingSiteVerification` is wired the same way), or importing directly from
      an already-verified Search Console property, which is usually the faster route once GSC is
      done. Same sitemap URL applies.
- [ ] **Structured data live validation.** Already confirmed as valid, parseable JSON on the live
      site this session. Running the real production URLs through Google's Rich Results Test and
      schema.org's Validator is the last formal step — optional polish, not a known problem.

---

## C. Not started, no action needed yet

- [ ] **`book.lenzphotos.com`** — preserved as a possible future branded HDPhotoHub subdomain (see
      `HDPHOTOHUB-BRAND-CONSISTENCY-CHECKLIST.md`). Not configured. No DNS record exists for it and
      none should be added until you decide to actually set this up.
