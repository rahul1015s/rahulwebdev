import { readdir } from "node:fs/promises";
import path from "node:path";

export type PublicPage = {
  name: string;
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
  summary: string;
};

const EXCLUDED_SEGMENTS = new Set(["admin", "api", "dashboard", "verify-email"]);
const EXCLUDED_PREFIXES = ["(", "[", "_"];

const FALLBACK_PAGES: PublicPage[] = [
  {
    name: "Home",
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    summary: "Portfolio homepage for Rahul Verma with service positioning, proof of work, projects, skills, and contact entry points.",
  },
  {
    name: "Blog",
    path: "/blog",
    changeFrequency: "daily",
    priority: 0.9,
    summary: "Index of published engineering articles covering React, Next.js, performance, SEO, and full-stack development.",
  },
  {
    name: "Case Studies",
    path: "/case-studies",
    changeFrequency: "weekly",
    priority: 0.9,
    summary: "Index of published case studies documenting project context, implementation choices, stack, and outcomes.",
  },
  {
    name: "Freelance Web Developer Patna",
    path: "/freelance-web-developer-patna",
    changeFrequency: "monthly",
    priority: 0.85,
    summary: "Local landing page focused on freelance full-stack web development services in Patna, Bihar.",
  },
  {
    name: "Services Patna",
    path: "/services-patna",
    changeFrequency: "monthly",
    priority: 0.8,
    summary: "Local service page for website and app development for Patna businesses, startups, and professionals.",
  },
];

function prettifySegment(segment: string) {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildPageMetadata(routePath: string): PublicPage {
  if (routePath === "/") {
    return FALLBACK_PAGES[0];
  }

  if (routePath === "/blog") {
    return FALLBACK_PAGES[1];
  }

  if (routePath === "/case-studies") {
    return FALLBACK_PAGES[2];
  }

  if (routePath === "/freelance-web-developer-patna") {
    return FALLBACK_PAGES[3];
  }

  if (routePath === "/services-patna") {
    return FALLBACK_PAGES[4];
  }

  const parts = routePath.split("/").filter(Boolean);
  const lastSegment = parts[parts.length - 1] || "Page";

  return {
    name: prettifySegment(lastSegment),
    path: routePath,
    changeFrequency: "monthly",
    priority: 0.7,
    summary: `Public page for ${prettifySegment(lastSegment).toLowerCase()} on Rahul Verma's website.`,
  };
}

async function walkAppPages(dir: string, segments: string[] = [], collected: string[] = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  const hasPage = entries.some((entry) => entry.isFile() && entry.name === "page.tsx");
  if (hasPage) {
    const routePath = segments.length === 0 ? "/" : `/${segments.join("/")}`;
    collected.push(routePath);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (EXCLUDED_SEGMENTS.has(entry.name)) continue;
    if (EXCLUDED_PREFIXES.some((prefix) => entry.name.startsWith(prefix))) continue;

    await walkAppPages(path.join(dir, entry.name), [...segments, entry.name], collected);
  }

  return collected;
}

export async function discoverPublicPages() {
  try {
    const routes = await walkAppPages(path.join(process.cwd(), "app"));
    const staticRoutes = routes.filter((routePath) => !routePath.includes("["));
    const uniqueRoutes = [...new Set(staticRoutes)].sort((a, b) => (a === "/" ? -1 : a.localeCompare(b)));
    return uniqueRoutes.map(buildPageMetadata);
  } catch {
    return FALLBACK_PAGES;
  }
}
