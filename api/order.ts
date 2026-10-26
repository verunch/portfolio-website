// Vercel serverless function: receives the order form from /services and
// forwards it to Telegram and to email. Secrets live only in Vercel's
// Environment Variables (never in the browser bundle), named with the
// project's `_VB_PD2` suffix:
//   TELEGRAM_BOT_TOKEN_VB_PD2, TELEGRAM_CHAT_ID_VB_PD2 — Telegram bot + chat
//   RESEND_API_KEY_VB_PD2, ORDER_EMAIL_TO_VB_PD2       — Resend key + inbox
// Unsuffixed names are read as a fallback. Either channel may be left
// unconfigured; the request succeeds if at least one channel delivered.

declare const process: { env: Record<string, string | undefined> };

function env(name: string): string | undefined {
  return (process.env[`${name}_VB_PD2`] || process.env[name])?.trim();
}

type OrderPayload = {
  name?: unknown;
  contact?: unknown;
  service?: unknown;
  message?: unknown;
  language?: unknown;
  // Honeypot — real visitors never see or fill it.
  website?: unknown;
};

const LIMITS = { name: 100, contact: 200, service: 200, message: 3000, language: 10 };

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function sendTelegram(text: string): Promise<boolean> {
  const token = env('TELEGRAM_BOT_TOKEN');
  const chatId = env('TELEGRAM_CHAT_ID');
  if (!token || !chatId) return false;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  return response.ok;
}

async function sendEmail(subject: string, html: string, replyTo: string): Promise<boolean> {
  const apiKey = env('RESEND_API_KEY');
  const to = env('ORDER_EMAIL_TO');
  if (!apiKey || !to) return false;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      // Resend's shared sender works without a verified domain when sending
      // to the account owner's own inbox.
      from: 'Portfolio orders <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
      // Lets you hit "Reply" when the client left an email as their contact.
      ...(replyTo.includes('@') ? { reply_to: replyTo } : {}),
    }),
  });
  return response.ok;
}

export async function POST(request: Request): Promise<Response> {
  let payload: OrderPayload;
  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Bots that fill the hidden field get a fake success and nothing is sent.
  if (clean(payload.website, 200)) return Response.json({ ok: true });

  const name = clean(payload.name, LIMITS.name);
  const contact = clean(payload.contact, LIMITS.contact);
  const service = clean(payload.service, LIMITS.service);
  const message = clean(payload.message, LIMITS.message);
  const language = clean(payload.language, LIMITS.language);

  if (!name || !contact) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const lines = [
    ['Имя', name],
    ['Контакт', contact],
    ['Услуга', service || '—'],
    ['Язык сайта', language || '—'],
    ['Сообщение', message || '—'],
  ] as const;

  const telegramText = [
    '<b>Новая заявка с сайта</b>',
    ...lines.map(([label, value]) => `<b>${label}:</b> ${escapeHtml(value)}`),
  ].join('\n');

  const emailHtml = `<h2>Новая заявка с сайта</h2>${lines
    .map(([label, value]) => `<p><b>${label}:</b> ${escapeHtml(value).replace(/\n/g, '<br>')}</p>`)
    .join('')}`;

  const results = await Promise.allSettled([
    sendTelegram(telegramText),
    sendEmail(`Заявка: ${service || 'проект'} — ${name}`, emailHtml, contact),
  ]);
  const delivered = results.some((result) => result.status === 'fulfilled' && result.value);

  return delivered
    ? Response.json({ ok: true })
    : Response.json({ ok: false, error: 'delivery_failed' }, { status: 502 });
}
