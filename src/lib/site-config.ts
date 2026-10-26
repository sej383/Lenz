// Central place for site-wide constants that need to change in exactly one
// spot. Update a value here and it updates everywhere it's used.

export const siteConfig = {
  name: "LENZ",
  tagline: "Visual Storytelling from Every Angle",

  // Business / service area (used in footer, About, Contact, and structured
  // data once those are built — see PROJECT-BRIEF.md section 0.5).
  baseLocation: "Woodbine, Iowa",
  serviceArea:
    "western Iowa, the Omaha/Council Bluffs metro, eastern Nebraska, and surrounding Midwest markets",

  // Marketing & visibility work (consultation, Google Business Profile,
  // local/AI search, digital advertising) is deliverable remotely, so it
  // isn't bound by the same travel-dependent coverage area as on-location
  // photography/aerial shoots (`serviceArea`, above) — this is the broader
  // region used wherever the site talks about LENZ's marketing positioning.
  marketingArea: "the Midwest",

  // Short "where we call home" line used for general company framing
  // (homepage, About, Footer) now that LENZ leads with its Midwest-wide
  // marketing positioning rather than the home metro. The specific
  // on-location coverage area (`serviceArea`) is still used wherever travel
  // actually matters — e.g. the photography service pages and Contact.
  homeStatement: "Proudly based in Iowa. Partnering with businesses across the Midwest.",

  // Strengthened umbrella line for the dual marketing + visual media
  // positioning — used alongside (never replacing) the established
  // tagline above.
  allInOneTagline: "Your All-in-One Partner for Marketing, Visibility & Visual Media",

  // LENZ isn't just a photography studio that also offers marketing — it's
  // a single point of contact for a business's marketing and visibility
  // needs, coordinating specialists where needed rather than performing
  // every specialty in-house. This label is the formal name for that
  // service used in page titles, nav-adjacent labels, and the contact
  // form; keep "Marketing" (short) in the primary nav itself, where space
  // is tight.
  marketingServiceLabel: "Marketing & Business Solutions",

  // The brand's category line — "LENZ / [this] / [headline tagline]" — used
  // in the homepage hero and footer brand block now that LENZ leads with
  // its marketing positioning rather than reading as a photography studio
  // that also does marketing.
  brandCategory: "Marketing Solutions & Commercial Visual Media",

  // Live HDPhotoHub ordering page. Every "Book Real Estate" button on the
  // site reads from this single constant — if this link ever changes,
  // updating it here is the only edit needed anywhere in the codebase.
  bookRealEstateUrl: "https://throughthelenzphotography.hd.pics/order",

  // Contact details shown in the footer and on the Contact page. Both read
  // these directly rather than hardcoding their own copy, so filling one in
  // here is the only change needed to make it live everywhere it's used.
  contact: {
    email: "info@lenzphotos.com" as string | null,
    phone: "402.813.7289" as string | null,
    facebookUrl: "https://www.facebook.com/LENZPhotos" as string | null,
  },

  // Cloudflare Web Analytics beacon token — cookieless, no consent banner
  // needed, gives visitors/pageviews/top pages/referrers/country-level
  // traffic (see PROJECT-BRIEF.md section 13). Issued per-hostname under
  // Cloudflare's Web Analytics tab for www.lenzphotos.com. BaseLayout.astro
  // renders the beacon script only when this is non-null.
  analytics: {
    cloudflareBeaconToken: "bb3564852af74e2fb7aae18575cf0f78" as string | null,
  },

  // Search-engine site-verification codes (HTML meta tag method). Both null
  // until you paste the value each console issues after choosing "HTML tag"
  // as the verification method — the DNS TXT record method works too and
  // needs no code change at all, but these are here so the meta-tag route
  // is a one-line fill-in instead of a new round of code changes. Nothing
  // renders until a real value is set.
  search: {
    googleSiteVerification: null as string | null,
    bingSiteVerification: null as string | null,
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

// Primary site navigation. Marketing leads (right after Home) now that
// LENZ's primary positioning is a marketing & business solutions partner,
// not a photography studio that also does marketing — Portfolio and the
// individual photography Services follow rather than lead.
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Marketing", href: "/services/marketing/" },
  { label: "Services", href: "/services/" },
  { label: "Portfolio", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];
