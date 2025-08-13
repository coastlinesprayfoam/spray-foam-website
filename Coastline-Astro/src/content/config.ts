import { defineCollection, z } from 'astro:content';

// Generic text-based collections with minimal placeholder fields.
// Avoid specific numbers/years per user request.
const services = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string().optional(),
    body: z.string().optional(),
    order: z.number().optional()
  })
});

const faqs = defineCollection({
  type: 'data',
  schema: z.object({
    question: z.string(),
    answer: z.string()
  })
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    author: z.string(),
    quote: z.string(),
    location: z.string().optional()
  })
});

const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional()
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).default([])
  })
});

export const collections = { services, faqs, testimonials, team, blog };
