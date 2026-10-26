import { track as vercelTrack } from '@vercel/analytics';

// Yandex Metrica counter ID — set VITE_YM_ID in Vercel's Environment
// Variables (or a local .env.local). Without it Metrica stays off; Vercel
// Analytics still runs.
const YM_ID = Number(import.meta.env.VITE_YM_ID) || 0;
// Only real production builds report — `npm run dev` / preview never
// pollute the stats.
const ENABLED = import.meta.env.PROD && YM_ID > 0;

type YmParams = Record<string, string | number | boolean>;
type Ym = ((id: number, method: string, ...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

declare global {
  interface Window {
    ym?: Ym;
  }
}

// Every tracked goal — keep in sync with the goals created in the Metrica
// dashboard (Settings → Goals → "JavaScript event", identifier = this name).
export type AnalyticsGoal =
  | 'resume_open'
  | 'resume_download'
  | 'view_portfolio_click'
  | 'project_resource_click'
  | 'contact_click'
  | 'language_change';

// Official Metrica loader, minus document.write: queue calls until tag.js
// arrives, then initialise the counter. `defer: true` — page hits are sent
// manually on every route change (see usePageTracking).
export function initAnalytics() {
  if (!ENABLED || window.ym) return;

  const ym: Ym = (...args) => {
    (ym.a = ym.a || []).push(args);
  };
  ym.l = Date.now();
  window.ym = ym;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  window.ym(YM_ID, 'init', {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

export function trackPageview(url: string) {
  if (!ENABLED) return;
  window.ym?.(YM_ID, 'hit', url, { title: document.title, referer: document.referrer });
}

// Sent to both Metrica (goal) and Vercel (custom event — counted only on
// Vercel plans that include custom events; a no-op otherwise).
export function trackGoal(goal: AnalyticsGoal, params?: YmParams) {
  if (!import.meta.env.PROD) return;
  if (ENABLED) window.ym?.(YM_ID, 'reachGoal', goal, params);
  vercelTrack(goal, params);
}
