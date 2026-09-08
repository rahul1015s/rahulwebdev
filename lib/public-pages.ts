import { readdir } from "node:fs/promises";
import path from "node:path";

export type PublicPage = {
  name: string;
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
  summary: string;
};

const EXCLUDED_SEGMENTS = new Set([
  "admin",
  "api",
  "dashboard",
  "verify-email",
  "privacy-policy",
  "terms-and-conditions",
]);
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
    name: "Freelance Web Developer in Patna",
    path: "/freelance-web-developer-patna",
    changeFrequency: "monthly",
    priority: 0.9,
    summary: "Page for hiring Rahul Verma as a freelance web developer based in Patna, covering what he builds, selected client work, how a project runs, and how to get in touch.",
  },
  {
    name: "Web Development Services",
    path: "/services",
    changeFrequency: "monthly",
    priority: 0.8,
    summary: "What Rahul Verma builds: business websites, web applications, dashboards, CRM and internal tools, and booking or workflow systems, with links to the projects behind each.",
  },
  {
    name: "Contact",
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.7,
    summary: "How to start a project with Rahul Verma: what to include in a first message, which projects are a good fit, and the direct ways to reach him.",
  },
];

const STATIC_PAGE_META: Record<string, Omit<PublicPage, "path">> = {
  "/contact": {
    name: "Contact",
    changeFrequency: "monthly",
    priority: 0.7,
    summary: "How to start a project with Rahul Verma: what to include in a first message, which projects are a good fit, and the direct ways to reach him.",
  },
  "/blog/website-cost-in-india": {
    name: "How much does a website cost in India?",
    changeFrequency: "monthly",
    priority: 0.7,
    summary: "A developer's breakdown of what actually drives website cost in India, from a simple marketing site to a web app with a backend, so you can estimate the scope of your own project.",
  },
  "/blog/how-to-choose-a-web-developer": {
    name: "How to choose a web developer",
    changeFrequency: "monthly",
    priority: 0.7,
    summary: "Practical criteria for evaluating a freelancer, agency, or marketplace hire: portfolio and shipped work, technical fit, scope and communication, code ownership, deployment, and maintenance.",
  },
};

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

  if (routePath === "/services") {
    return FALLBACK_PAGES[4];
  }

  const known = STATIC_PAGE_META[routePath];
  if (known) {
    return { ...known, path: routePath };
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
