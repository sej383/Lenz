# LENZ — Final Polish Punch List

Cosmetic-only items that don't affect structure, functionality, responsiveness, SEO, accessibility, content architecture, or the design system get logged here instead of fixed immediately. Nothing on this list gets changed until it's explicitly requested.

Anything broken, structurally/functionally incorrect, a responsive/mobile problem, an accessibility or SEO issue, a wrong link/CTA, a clearly incorrect image/category choice, or a global design-system issue that would propagate forward is still fixed immediately and does not go on this list.

---

## Global / Header / Footer

- Review whether the homepage CTA "Explore the Work" should become "Explore the Portfolio" now that the navigation uses Portfolio.
- Final review of header/navigation spacing and sizing after all pages exist.
- Final review of photo crops across all breakpoints.
- Final global copy/wording polish once all page content exists.
- (From full-site audit) `ridgeway-interior.md`'s source photo ships as an unoptimized raw `.jpg` in the production build rather than a WebP variant — harmless since the entry isn't currently rendered by any page, but worth a look whenever it's used or confirmed permanently unused.
- (From full-site audit) FAA Part 107 Licensed & Insured wording and the `/contact/` URL are each typed independently in several places rather than centralized in `siteConfig` — all instances currently match, so this is an architecture cleanup opportunity, not an active inconsistency.
- (From visual-system implementation) The Manrope display-font swap changed headline line-wrapping on a few pages versus the old Fraunces metrics — e.g. About's hero ("The Eye Behind LENZ") now wraps to two lines and Branding's hero wraps to three. Nothing is broken or overlapping, just a different wrap point than before; worth a look during the page-by-page pass in case any heading reads better with a manual line break or a touch less hero copy width.
- (From visual-system implementation) Texture C's blend opacity (0.4, `.texture-charcoal::before` in `global.css`) and the dark-gradient's exact stop values (`--color-dark-center/mid/edge`) were approved from on-screen review — worth a final sanity check against Sarah's own monitor/lighting during her pass, since grain visibility and warmth can read slightly differently display to display.

## Homepage

- Sarah does not like the "A Glimpse of the Work" section heading/copy (the section formerly titled "Selected Work") — revisit the heading and supporting line during the cosmetic pass. Do not skip this one.

## Commercial

_(none yet)_

## Branding

_(none yet)_

## Real Estate

_(none yet)_

## Aerial

- Review the wide-desktop balance of the positioning-intro section; it currently leaves a large amount of unused beige space on very wide screens.
- During final typography review, verify that the hero headline/supporting copy has enough visual presence on large and ultrawide displays without becoming oversized on normal desktops.

## Portfolio

_(none yet)_

## About

- Review wide-desktop/ultrawide balance for the text-only sections (The LENZ Story, Working With LENZ, Credentials & Service Region) — they're left-aligned and max-width-capped, so they leave a lot of empty space on the right on very wide screens. Same class of issue as the Aerial positioning-intro item above. Will likely resolve naturally once Sarah's portrait is added to the hero and can inform whether other sections want a supporting visual too.

## Blog

_(none yet)_

## Contact

_(none yet)_
