'use client';

import { Flex, Heading, Text } from "@radix-ui/themes";

interface ErrorDisplayProps {
  message?: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ minHeight: '50vh' }}
    >
      <Heading size="8" color="red">
        Something Went Wrong
      </Heading>
      <Text size="5" color="red">
        {message ?? "Access denied. Administrator privileges are required to view this content."}
      </Text>
    </Flex>
  );
}
