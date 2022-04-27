import { Box } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Dashboard() {
  return (
    <Box>
      <h1>Dashboard</h1>
      <NextLink href="/dashboard/published" passHref>
        published
      </NextLink>
    </Box>
  );
}
