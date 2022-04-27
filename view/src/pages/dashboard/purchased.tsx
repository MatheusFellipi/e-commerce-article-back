import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { DeleteIcon } from '@chakra-ui/icons';
import { parseCookies } from 'nookies';
import {
  Box,
  Flex,
  Tr,
  Th,
  Td,
  Table,
  Thead,
  Tbody,
  Button,
  TableContainer,
} from '@chakra-ui/react';

import { BiBook, BiEdit, BiLineChart } from 'react-icons/bi';

import { CardDashInfo } from '../../components/CardDashInfo/CardDashInfo';
import { Formatar } from '../../services/Formatar';
import { Articles } from '../../components/Articles/Articles';

type PublishedType = {
  purchased: {
    listItemsPuschasedArticles: [
      {
        id: string;
        title: string;
        user_id: string;
        amount: number;
        themes: string[];
        img_url: string;
        created_at: Date;
        update_at: Date;
        user: {
          id: string;
          name: string;
          job_role: string;
          avatar: string;
        };
      }
    ];
    count: number;
    themes: [
      {
        themes: string;
        total: number;
      }
    ];
  };
};

export default function Purchased(published: PublishedType) {
  const [datas] = useState<PublishedType>(published);

  return (
    <Flex
      p="10"
      width={'100%'}
      alignItems={'flex-start'}
      justifyContent="flex-end"
    >
      <Box w="1080px" mr={'100px'}>
        <Articles article={datas.purchased.listItemsPuschasedArticles} />
      </Box>

      <CardDashInfo
        inf={datas.purchased.themes}
        links={[
          {
            href: '/dashboard',
            icon: BiLineChart,
          },
          {
            href: '/dashboard/published',
            icon: BiEdit,
          },
        ]}
        title={{
          name: 'Purchased articles',
          icon: BiBook,
        }}
      />
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['togdesign:token']: token } = parseCookies(ctx);

  const responce = await fetch('http://localhost:3333/dashborad/purchased', {
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
      published: data.purchased,
    },
  };
};
