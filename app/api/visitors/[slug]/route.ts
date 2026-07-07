import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BlogVisitor from "@/models/BlogVisitor";

type RouteContext = {
  params: Promise<{ slug: string }> | { slug: string };
};

const getParams = async (context: RouteContext) =>
  context.params instanceof Promise ? await context.params : context.params;

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await connectDB();

    const { slug } = await getParams(context);
    const cleanSlug = decodeURIComponent((slug ?? "").trim());

    if (!cleanSlug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const getOnly = searchParams.get("get") === "true";

    if (getOnly) {
      const visitor = await BlogVisitor.findOne({ slug: cleanSlug }).lean();
      const count = typeof visitor?.count === "number" ? visitor.count : 0;
      return NextResponse.json({ slug: cleanSlug, count }, { status: 200 });
    }

    const visitor = await BlogVisitor.findOneAndUpdate(
      { slug: cleanSlug },
      { $inc: { count: 1 } },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    ).lean();

    const count = typeof visitor?.count === "number" ? visitor.count : 1;
    return NextResponse.json({ slug: cleanSlug, count }, { status: 200 });
  } catch (error) {
    console.error("GET /api/visitors/[slug] error:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
