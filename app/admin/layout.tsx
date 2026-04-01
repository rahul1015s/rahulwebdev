import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session || session.user.role !== "admin") {
      redirect("/login");
    }
  } catch (error) {
    redirect("/login");
  }

  return <>{children}</>;
}