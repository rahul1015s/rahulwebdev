import { NextResponse } from "next/server";
import { requireDashboardUserId } from "@/lib/dashboard/auth";
import { getUpcomingContests } from "@/lib/dashboard/contests";

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
    const beginnerOnly = searchParams.get("beginner") === "1";

    const contests = await getUpcomingContests(beginnerOnly);
    return NextResponse.json({ ok: true, contests });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
