import { NextResponse } from "next/server";
import { requireDashboardUserId } from "@/lib/dashboard/auth";
import { getDashboardData } from "@/lib/dashboard/service";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export async function GET() {
  try {
    const userId = await requireDashboardUserId();
    const data = await getDashboardData(userId);
    return NextResponse.json({ ok: true, github: data.github });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
