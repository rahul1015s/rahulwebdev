import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/casestudy";
import { normalizeImageUrl } from "@/utils/url-utils";

const slugify = (value: string) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const toStringArray = (value: unknown) =>
  Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];

const cleanString = (value: unknown) => {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Unknown error");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";

    await connectDB();

    const query = all ? {} : { published: true };
    const caseStudies = await CaseStudy.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ ok: true, caseStudies });
  } catch (error: unknown) {
    return NextResponse.json({ ok: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      tagline,
      description,
      content,
      coverImage,
      gallery = [],
      stack = [],
      liveUrl,
      githubUrl,
      featured = false,
      category = [],
      deliverables = [],
      timeline,
      client,
      team = [],
      challenges = [],
      solutions = [],
      results = [],
      published = false,
      order = 0,
    } = body;

    if (!name) {
      return NextResponse.json({ ok: false, error: "Missing required field: name" }, { status: 400 });
    }

    await connectDB();

    let finalSlug = cleanString(slug) ? slugify(String(slug)) : slugify(name);

    let counter = 1;
    const originalSlug = finalSlug;
    let existing = await CaseStudy.findOne({ slug: finalSlug });

    while (existing) {
      finalSlug = `${originalSlug}-${counter}`;
      existing = await CaseStudy.findOne({ slug: finalSlug });
      counter += 1;
    }

    const normCover = coverImage ? normalizeImageUrl(String(coverImage)) : undefined;
    const normGallery = Array.isArray(gallery)
      ? gallery.map((item: unknown) => normalizeImageUrl(String(item)))
      : [];

    const record = new CaseStudy({
      name,
      slug: finalSlug,
      tagline: cleanString(tagline),
      description: cleanString(description),
      content,
      coverImage: normCover,
      gallery: normGallery,
      stack: toStringArray(stack),
      liveUrl: cleanString(liveUrl),
      githubUrl: cleanString(githubUrl),
      featured,
      category: toStringArray(category),
      deliverables: toStringArray(deliverables),
      timeline: cleanString(timeline),
      client: cleanString(client),
      team: toStringArray(team),
      challenges: toStringArray(challenges),
      solutions: toStringArray(solutions),
      results: toStringArray(results),
      published,
      order,
    });
    await record.save();

    return NextResponse.json({ ok: true, caseStudy: record });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      const field =
        "keyPattern" in error && typeof error.keyPattern === "object" && error.keyPattern !== null
          ? Object.keys(error.keyPattern)[0]
          : "field";
      return NextResponse.json({ ok: false, error: `${field} already exists` }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
