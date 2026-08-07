import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: z.date(),
    coverImage: z.string(),
    coverImageAlt: z.string(),
    readTime: z.string(),
  }),
});

export const collections = { blog };