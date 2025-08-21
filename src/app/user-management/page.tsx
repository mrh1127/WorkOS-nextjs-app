import { withAuth } from "@workos-inc/authkit-nextjs";
import { UsersManagement, WorkOsWidgets } from "@workos-inc/widgets";
import { redirect } from "next/navigation";

import { WorkOS } from '@workos-inc/node'
import { ErrorDisplay } from "@/app/components/error-display";

import { requireAdminAccess } from "@/app/lib/auth/access-control";
import { logServerError } from "@/app/lib/logging"; //here

const workos = new WorkOS(process.env.WORKOS_API_KEY); //maybe?

export default async function UserManagementPage() {
  try {

    const { user, role, organizationId } = await withAuth({ ensureSignedIn: true });

    requireAdminAccess({ 
      role: role ?? null,
      organizationId: organizationId ?? null,
     });

    const widgetToken = await workos.widgets.getToken({
      userId: user.id,
      organizationId,
      scopes: ["widgets:users-table:manage"],
    });

    if (!widgetToken) {
      throw new Error("WorkOS widget token generation returned null or undefined.");
    }

    return (
      <main className="page-layout space-y-6">
        <WorkOsWidgets style={{ height: "100%" }}>
          <UsersManagement authToken={widgetToken} />
        </WorkOsWidgets>
      </main>
    );
  } catch (error) {
    logServerError("Failed to load User Management page", error);
    return <ErrorDisplay message="You don’t have the required permissions to view this page. Admin access is required." />;
  }
}
