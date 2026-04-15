import { NextResponse } from "next/server";
import { requireDashboardUserId } from "@/lib/dashboard/auth";
import { generateContestIcs } from "@/lib/dashboard/contests";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export async function GET(req: Request) {
  try {
    await requireDashboardUserId();
    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name") || "Contest";
    const platform = searchParams.get("platform") || "Platform";
    const startTime = searchParams.get("startTime") || new Date().toISOString();
    const durationMinutes = Number(searchParams.get("duration") || "60");
    const url = searchParams.get("url") || "https://example.com";

    const ics = generateContestIcs({
      name,
      platform,
      startTime,
      durationMinutes,
      url,
    });

    const safeName = name.replace(/[^a-z0-9]/gi, "-").toLowerCase();

    return new NextResponse(ics, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${safeName}.ics"`,
      },
    });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
