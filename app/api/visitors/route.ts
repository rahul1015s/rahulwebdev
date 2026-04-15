import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const getOnly = searchParams.get("get") === "true";

    if (getOnly) {
      const visitor = await Visitor.findOne().lean();
      const count = typeof visitor?.count === "number" ? visitor.count : 0;
      return NextResponse.json({ count }, { status: 200 });
    }

    const visitor = await Visitor.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    const count = typeof visitor?.count === "number" ? visitor.count : 1;
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("GET /api/visitors error:", error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
