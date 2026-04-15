import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface DashboardUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export async function getDashboardSession() {
  const requestHeaders = await headers();
  return auth.api.getSession({ headers: requestHeaders });
}

export async function requireDashboardUser() {
  const session = await getDashboardSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session.user as DashboardUser;
}

export async function requireDashboardUserId() {
  const session = await getDashboardSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id as string;
}
