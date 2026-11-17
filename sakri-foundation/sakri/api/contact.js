// Vercel serverless function: POST /api/contact. Needs env vars RESEND_API_KEY and CONTACT_TO_EMAIL (set in Vercel dashboard).
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, message, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot: bots fill this hidden field
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return res.status(500).json({ error: 'Mail not configured' });
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Sakri Website <onboarding@resend.dev>', to: [to], reply_to: email, subject: `Website message from ${name}`, text: message }),
  });
  return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ error: 'Send failed' });
}
