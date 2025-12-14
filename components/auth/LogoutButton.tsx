"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout} className="gap-2">
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
}