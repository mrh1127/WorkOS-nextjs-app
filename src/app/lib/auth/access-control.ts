import { redirect } from "next/navigation";

interface AccessControlOptions {
  role: string | null;
  organizationId: string | null;
}

export function requireAdminAccess({ role, organizationId }: AccessControlOptions) {
  const isAdmin = role === "admin";
  if (!organizationId || !isAdmin) {
    redirect("/account");
  }
}
