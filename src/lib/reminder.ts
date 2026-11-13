// Service worker registration and the daily study reminder (see components/Reminder.astro).
import { withBase } from './format';

const TAG = 'study-reminder';
const base = () => withBase('');

type PeriodicSyncRegistration = ServiceWorkerRegistration & {
  periodicSync?: { register(tag: string, o: { minInterval: number }): Promise<void>; unregister(tag: string): Promise<void>; getTags(): Promise<string[]> };
};

export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register(`${base()}sw.js`, { scope: base() }).catch(() => undefined);
}

async function registration(): Promise<PeriodicSyncRegistration | undefined> {
  if (!('serviceWorker' in navigator)) return undefined;
  return (await navigator.serviceWorker.getRegistration(base())) as PeriodicSyncRegistration | undefined;
}

async function isOn() {
  const reg = await registration();
  return !!(await reg?.periodicSync?.getTags())?.includes(TAG);
}

async function toggleNotifications(): Promise<string> {
  const reg = await registration();
  if (!reg?.periodicSync || !('Notification' in window)) return 'This browser cannot schedule reminders. Use the calendar option.';
  if (await isOn()) {
    await reg.periodicSync.unregister(TAG);
    return 'Daily notification turned off.';
  }
  if ((await Notification.requestPermission()) !== 'granted') return 'Notifications are blocked for this site.';
  try {
    await reg.periodicSync.register(TAG, { minInterval: 24 * 60 * 60 * 1000 });
    return 'On. You will get a reminder about once a day.';
  } catch {
    return 'Install the site as an app first (browser menu, "Install"), then turn this on.';
  }
}

// A repeating daily calendar event at the chosen local time, linking back to the site.
function downloadCalendar(time: string) {
  const [h, m] = time.split(':').map(Number);
  const start = new Date();
  start.setHours(h, m, 0, 0);
  if (start < new Date()) start.setDate(start.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, '0');
  const local = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const end = new Date(start.getTime() + 15 * 60 * 1000);
  const url = new URL(base(), location.origin).href;
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Easy Review//Study reminder//EN',
    'BEGIN:VEVENT', `UID:study-reminder@${location.host}`, `DTSTAMP:${local(new Date())}`,
    `DTSTART:${local(start)}`, `DTEND:${local(end)}`, 'RRULE:FREQ=DAILY',
    'SUMMARY:AWS study: 15 minutes of flashcards', `DESCRIPTION:Pick up where you left off: ${url}`, `URL:${url}`,
    'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:Time for a quick review', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'easy-review-reminder.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export async function setupReminder() {
  registerServiceWorker();
  const root = document.querySelector<HTMLDetailsElement>('[data-remind]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = '1';
  const notify = root.querySelector<HTMLButtonElement>('[data-remind-notify]')!;
  const label = root.querySelector<HTMLElement>('[data-remind-notify-label]')!;
  const status = root.querySelector<HTMLElement>('[data-remind-status]')!;
  const refresh = async () => {
    const on = await isOn();
    notify.classList.toggle('is-on', on);
    label.textContent = on ? 'Notifications on (turn off)' : 'Turn on notifications';
  };
  notify.addEventListener('click', async () => { status.textContent = await toggleNotifications(); refresh(); });
  root.querySelector('[data-remind-ics]')!.addEventListener('click', () => downloadCalendar(root.querySelector<HTMLInputElement>('[data-remind-time]')!.value || '19:00'));
  const close = (ev: MouseEvent) => {
    if (!root.isConnected) return document.removeEventListener('click', close);
    if (root.open && !root.contains(ev.target as Node)) root.open = false;
  };
  document.addEventListener('click', close);
  refresh();
}
