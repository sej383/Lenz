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
} as const;

export type NavLink = {
  label: string;
  href: string;
};

// Primary site navigation. Pages listed here aren't all built yet — see
// PROJECT-BRIEF.md for the full site architecture. Linking to them now
// keeps the nav structure correct as each page comes online.
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/work/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];
