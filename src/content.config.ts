import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      status: z.enum(['active', 'completed', 'archived']),
      techStack: z.array(z.string()).default([]),
      repoUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const site = defineCollection({
  loader: file('src/data/site.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    author: z.string(),
    nav: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
    footer: z.object({
      tagline: z.string().optional(),
      copyright: z.string(),
    }),
  }),
});

const home = defineCollection({
  loader: file('src/data/home.json'),
  schema: ({ image }) =>
    z.object({
      id: z.string(),
      hero: z.object({
        heading: z.string(),
        subheading: z.string().optional(),
        image: image().optional(),
      }),
      intro: z.string().optional(),
      featuredArticles: z.array(z.string()).default([]), // article IDs
      featuredProjects: z.array(z.string()).default([]), // project IDs
    }),
});

const cv = defineCollection({
  loader: file('src/data/cv.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    headline: z.string(),
    location: z.string().optional(),
    summary: z.string(),
    experience: z.array(
      z.object({
        company: z.string(),
        role: z.string(),
        startDate: z.string(), // 'YYYY-MM' format
        endDate: z.string().optional(), // omit or null for current
        location: z.string().optional(),
        highlights: z.array(z.string()),
      }),
    ),
    education: z.array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string().optional(),
        startDate: z.string(),
        endDate: z.string().optional(),
        notes: z.string().optional(),
      }),
    ),
    skills: z.array(
      z.object({
        category: z.string(),
        items: z.array(z.string()),
      }),
    ),
  }),
});

const contact = defineCollection({
  loader: file('src/data/contact.json'),
  schema: z.object({
    id: z.string(),
    heading: z.string(),
    blurb: z.string().optional(),
    email: z.string().email(),
    socials: z.array(
      z.object({
        platform: z.string(),
        url: z.string().url(),
        handle: z.string().optional(),
      }),
    ),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { articles, projects, site, home, cv, contact };
