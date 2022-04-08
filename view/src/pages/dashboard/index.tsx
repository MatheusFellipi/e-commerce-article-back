import NextLink from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <NextLink href="/dashboard/published" passHref>
        published
      </NextLink>
    </div>
  );
}
