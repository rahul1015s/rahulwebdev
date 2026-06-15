import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CaseStudy from "@/models/casestudy";

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const caseStudy = isObjectId
      ? (await CaseStudy.findById(id).lean()) || (await CaseStudy.findOne({ slug: id }).lean())
      : await CaseStudy.findOne({ slug: id }).lean();

    if (!caseStudy) {
      return NextResponse.json({ ok: false, error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, caseStudy });
  } catch (error: unknown) {
    return NextResponse.json({ ok: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const updates = await request.json();
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    if (updates.slug) updates.slug = slugify(String(updates.slug));
    if ("tagline" in updates) updates.tagline = cleanString(updates.tagline);
    if ("description" in updates) updates.description = cleanString(updates.description);
    if ("liveUrl" in updates) updates.liveUrl = cleanString(updates.liveUrl);
    if ("githubUrl" in updates) updates.githubUrl = cleanString(updates.githubUrl);
    if ("timeline" in updates) updates.timeline = cleanString(updates.timeline);
    if ("client" in updates) updates.client = cleanString(updates.client);
    if ("stack" in updates) updates.stack = toStringArray(updates.stack);
    if ("category" in updates) updates.category = toStringArray(updates.category);
    if ("deliverables" in updates) updates.deliverables = toStringArray(updates.deliverables);
    if ("team" in updates) updates.team = toStringArray(updates.team);
    if ("challenges" in updates) updates.challenges = toStringArray(updates.challenges);
    if ("solutions" in updates) updates.solutions = toStringArray(updates.solutions);
    if ("results" in updates) updates.results = toStringArray(updates.results);

    if (updates.coverImage) {
      const { normalizeImageUrl } = await import("@/utils/url-utils");
      updates.coverImage = normalizeImageUrl(String(updates.coverImage));
    }
    if (updates.gallery && Array.isArray(updates.gallery)) {
      const { normalizeImageUrl } = await import("@/utils/url-utils");
      updates.gallery = updates.gallery.map((item: unknown) => normalizeImageUrl(String(item)));
    }

    const caseStudy = isObjectId
      ? (await CaseStudy.findByIdAndUpdate(id, { $set: updates }, { new: true })) ||
        (await CaseStudy.findOneAndUpdate({ slug: id }, { $set: updates }, { new: true }))
      : await CaseStudy.findOneAndUpdate({ slug: id }, { $set: updates }, { new: true });

    if (!caseStudy) {
      return NextResponse.json({ ok: false, error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, caseStudy });
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const caseStudy = isObjectId
      ? (await CaseStudy.findByIdAndDelete(id)) || (await CaseStudy.findOneAndDelete({ slug: id }))
      : await CaseStudy.findOneAndDelete({ slug: id });

    if (!caseStudy) {
      return NextResponse.json({ ok: false, error: "Case study not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    return NextResponse.json({ ok: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
