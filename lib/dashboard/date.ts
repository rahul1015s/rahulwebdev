export const DASHBOARD_TIMEZONE =
  process.env.DASHBOARD_TIMEZONE || "Asia/Kolkata";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: DASHBOARD_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function getTodayDateKey(date = new Date()) {
  return DATE_FORMATTER.format(date);
}

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatUTCDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getPreviousDateKey(dateKey: string) {
  const date = parseDateKey(dateKey);
  date.setUTCDate(date.getUTCDate() - 1);
  return formatUTCDate(date);
}

export function dateKeyDiffInDays(from: string, to: string) {
  const fromDate = parseDateKey(from);
  const toDate = parseDateKey(to);
  const diffMs = toDate.getTime() - fromDate.getTime();
  return Math.floor(diffMs / 86_400_000);
}
