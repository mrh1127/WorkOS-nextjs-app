import NextLink from "next/link";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { SignInButton } from "./components/sign-in-button";

export default async function HomePage() {
  // 🔐 Get the authenticated user's session, including role and metadata
  const { user, role } = await withAuth();

  return (
    <Flex direction="column" align="center" gap="2">
      {user ? (
        <>
          {/* 👋 Welcome header for signed-in user */}
          <Heading size="8">
            Welcome back{user?.firstName && `, ${user?.firstName}`}
          </Heading>

          <Text size="5" color="gray">
            You are now authenticated into the application
          </Text>

          <Flex align="center" gap="3" mt="4">
            {/* 🔗 Button to Account page */}
            <Button asChild size="3" variant="soft">
              <NextLink href="/account">View account</NextLink>
            </Button>

            {/* 🛡️ Only show this button if the user is an admin */}
            {role === "admin" && (
              <Button asChild size="3" variant="soft">
                <NextLink href="/user-management">User Management</NextLink>
              </Button>
            )}

            {/* 🚪 Sign out button */}
            <SignInButton large />
          </Flex>
        </>
      ) : (
        <>
          {/* 👤 Prompt for unauthenticated users */}
          <Heading size="8">AuthKit authentication example</Heading>
          <Text size="5" color="gray" mb="4">
            Sign in to view your account details
          </Text>
          <SignInButton large />
        </>
      )}
    </Flex>
  );
}
