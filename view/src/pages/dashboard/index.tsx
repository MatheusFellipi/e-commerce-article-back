import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { parseCookies } from 'nookies';
import { useState } from 'react';

type DashboardType = {
  SalesOfArticles: number;
  ReadArticles: number;
  CitationsReceived: number;
  PurchasedArticles: number;
  listSales: [
    {
      title: string;
      amount: number;
    }
  ];
};

export default function Dashboard(dashborad: DashboardType) {
  const [datas] = useState<any>(dashborad);

  return (
    <Box>
      <h1>Dashboard</h1>
      <NextLink href="/dashboard/published" passHref>
        published
      </NextLink>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['togdesign:token']: token } = parseCookies(ctx);

  const responce = await fetch('http://localhost:3333/dashborad/', {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + token,
    },
  });

  const data = await responce.json();

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dashborad: data,
    },
  };
};
