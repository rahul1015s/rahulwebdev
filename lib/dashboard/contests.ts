import type { ContestItem } from "@/lib/dashboard/types";

const BEGINNER_HINTS = [
  "beginner",
  "div 3",
  "div3",
  "div.3",
  "div 4",
  "div4",
  "starter",
  "easy",
  "newbie",
  "ladder",
];

interface ClistContest {
  event: string;
  host: string;
  start: string;
  duration: number;
  href: string;
}

interface ClistResponse {
  objects: ClistContest[];
}

export function isBeginnerFriendly(name: string) {
  const normalized = name.toLowerCase();
  return BEGINNER_HINTS.some((hint) => normalized.includes(hint));
}

export async function getUpcomingContests(beginnerOnly = false) {
  const username = process.env.CLIST_USERNAME;
  const apiKey = process.env.CLIST_API_KEY;

  if (!username || !apiKey) {
    return [] as ContestItem[];
  }

  const startGte = new Date().toISOString();
  const searchParams = new URLSearchParams({
    username,
    api_key: apiKey,
    start__gte: startGte,
    order_by: "start",
    limit: "20",
  });

  try {
    const response = await fetch(
      `https://clist.by/api/v4/contest/?${searchParams.toString()}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Clist API request failed: ${response.status}`);
    }

    const payload = (await response.json()) as ClistResponse;
    const mapped = payload.objects.map((contest) => {
      const beginnerFriendly = isBeginnerFriendly(contest.event);
      return {
        name: contest.event,
        platform: contest.host,
        startTime: contest.start,
        durationMinutes: Math.max(1, Math.round(contest.duration / 60)),
        url: contest.href,
        beginnerFriendly,
      } satisfies ContestItem;
    });

    if (beginnerOnly) {
      return mapped.filter((contest) => contest.beginnerFriendly);
    }

    return mapped;
  } catch (error) {
    console.error("Failed to fetch contests", error);
    return [] as ContestItem[];
  }
}

export function generateContestIcs(contest: {
  name: string;
  platform: string;
  startTime: string;
  durationMinutes: number;
  url: string;
}) {
  const start = new Date(contest.startTime);
  const end = new Date(start.getTime() + contest.durationMinutes * 60_000);

  const formatIcsDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  };

  const now = formatIcsDate(new Date());
  const startAt = formatIcsDate(start);
  const endAt = formatIcsDate(end);

  const escapeValue = (value: string) =>
    value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,");

  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@rahulwebdev.in`;
  const summary = escapeValue(`${contest.platform}: ${contest.name}`);
  const description = escapeValue(`Contest link: ${contest.url}`);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RahulWebDev//FocusStack Dashboard//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${startAt}`,
    `DTEND:${endAt}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `URL:${contest.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
