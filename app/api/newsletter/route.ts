import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'ایمیل نامعتبر است' }, { status: 400 });
    }
    // Stub: in production, plug into Resend / Mailchimp / Supabase here.
    console.log('[newsletter] subscribed:', parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطای داخلی' }, { status: 500 });
  }
}
