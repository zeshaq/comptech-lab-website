import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    order: z.number().default(99),
    eyebrow: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    capabilities: z.array(z.string()).default([]),
    related_case_studies: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    customer: z.string(),
    sector: z.string().optional(),
    summary: z.string(),
    year: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    technologies: z.array(z.string()).default([]),
    services: z.array(z.string()).default([]),
    outcome: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/industries" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    eyebrow: z.string().optional(),
    order: z.number().default(99),
    typical_workloads: z.array(z.string()).default([]),
    regulatory_profile: z.array(z.string()).default([]),
    key_services: z.array(z.string()).default([]),
    related_case_studies: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  services,
  "case-studies": caseStudies,
  industries,
};
