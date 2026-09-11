import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Content lives here (structured Markdown files) rather than hardcoded in
// page templates, specifically so a future CMS can read/write these same
// files without a rebuild. See PROJECT-BRIEF.md section 14.

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      // Optional hand-written SEO description, distinct from the on-page
      // excerpt. Falls back to excerpt when unset — see article template.
      metaDescription: z.string().optional(),
      category: z.enum(["Real Estate", "Commercial", "Branding", "Aerial", "General"]),
      author: z.string().default("Sarah Lenz"),
      image: image(),
      imageAlt: z.string(),
      // Placeholder posts ship with the initial build so the homepage
      // preview has something to show. Set to false once real posts
      // replace them.
      isPlaceholder: z.boolean().default(false),
      publishDate: z.coerce.date().optional(),
      // Only set when a post receives a meaningful editorial update —
      // never overwrite publishDate for that. Shown unobtrusively on the
      // article when present; absent otherwise.
      updatedDate: z.coerce.date().optional(),
    }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(["Real Estate", "Commercial", "Branding", "Aerial"]),
      image: image(),
      imageAlt: z.string(),
      // Layout hint for the editorial mosaic grid on the homepage.
      size: z.enum(["large", "medium", "small"]).default("medium"),
      // Lower sorts first within the homepage's curated selection.
      featuredOrder: z.number().default(99),
      // Whether this entry shows in the homepage's Selected Work section.
      // Entries stay in the collection (available for the full /work/
      // portfolio and other pages) even when this is false.
      featuredOnHome: z.boolean().default(true),
      // Which individual service pages' galleries this entry should
      // appear in (independent of featuredOnHome). Lets one photo appear
      // on, say, the homepage AND the Commercial page, or neither.
      featuredOnServicePages: z
        .array(z.enum(["commercial", "branding", "real-estate", "aerial"]))
        .default([]),
      // CSS object-position for the homepage's equal-aspect-ratio crop,
      // e.g. "center 30%". Defaults to a centered crop.
      objectPosition: z.string().default("center"),
    }),
});

export const collections = { blog, work };
