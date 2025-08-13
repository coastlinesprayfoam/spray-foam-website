import type { APIRoute } from 'astro';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
});

export const prerender = false; // ensure this is a server endpoint

export const POST: APIRoute = async ({ request }) => {
  const contentType = request.headers.get('content-type') || '';
  let data: any = {};
  try {
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported content type' }), { status: 415 });
    }
    const parsed = schema.parse(data);
    // Placeholder: In a Worker/Pages Function you would forward to email/service or KV
    console.log('Quote submission', parsed);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Validation failed', issues: err.issues }), { status: 400, headers: { 'content-type': 'application/json' } });
    }
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};
