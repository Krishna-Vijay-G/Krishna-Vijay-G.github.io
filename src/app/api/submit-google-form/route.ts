import { NextResponse } from 'next/server';

// Server-side API route that forwards form data to a Google Form
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Expect these fields from the client
    const { name, email, subject, message } = body || {};

    const formUrl = process.env.GOOGLE_FORM_ACTION;
    if (!formUrl) {
      return NextResponse.json({ success: false, error: 'GOOGLE_FORM_ACTION not configured' }, { status: 500 });
    }

    const params = new URLSearchParams();
    // Map your form fields to Google Form entry IDs
    params.append('entry.1444212408', name || '');
    params.append('entry.12430413', email || '');
    params.append('entry.1777991339', subject || '');
    params.append('entry.445717152', message || '');

    // Post to Google Forms endpoint
    const resp = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
      // Google may redirect; do not follow automatically so we can inspect status
      redirect: 'manual' as RequestRedirect
    });

    // Treat 200 and 302 (redirect) as success
    if (resp.ok || resp.status === 302) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, status: resp.status }, { status: 502 });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
