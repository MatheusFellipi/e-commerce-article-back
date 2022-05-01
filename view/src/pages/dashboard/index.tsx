import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { BiBook, BiEdit, BiLineChart } from 'react-icons/bi';
import { CardDashInfo } from '../../components/CardDashInfo/CardDashInfo';
import { Formatar } from '../../services/Formatar';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type DashboardType = {
  dashboard: {
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
    options: any;
  };
};

export default function Dashboard(dashborad: DashboardType) {
  const [data] = useState<any>(dashborad);
  console.log(data.dashboard.options);

  return (
    <Flex justify={'end'} p="10">
      <Flex
        flexDirection={'column'}
        borderRadius={10}
        justify={'start'}
        mr={'96px'}
        w={1080}
      >
        <Box
          mb={'32px'}
          bgColor={'white'}
          w={900}
          borderRadius={10}
          as={'section'}
        >
          <HighchartsReact
            highcharts={Highcharts}
            options={data.dashboard.options}
          />
        </Box>
        <Box
          bgColor={'white'}
          w={900}
          h={335}
          mt={'32px'}
          as={'section'}
          borderRadius={10}
          px={'16px'}
          py={'24px'}
        >
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            Your bestsellers
          </Box>

          <TableContainer
            fontFamily="Montserrat"
            fontSize="16px"
            whiteSpace="normal"
          >
            <Table variant="unstyled" size="lg">
              <Thead>
                <Th align="left" fontSize="16px" fontWeight={500}>
                  Article
                </Th>
                <Th fontWeight={500} align="left" fontSize="16px">
                  Publisher
                </Th>
                <Th fontWeight={500} align="left" fontSize="16px">
                  Sales
                </Th>
                <Th align="left" fontSize="16px" fontWeight={500}>
                  Value
                </Th>
              </Thead>
              <Tbody>
                {data.dashboard.listSales.map((item) => (
                  <Tr key={item.id}>
                    <Td maxW={'305px'}>{item.title}</Td>
                    <Td>Tog.design</Td>
                    <Td>2</Td>
                    <Td>{Formatar.Money(item.amount)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>

      <Box>
        <CardDashInfo
          marginRight={'20px'}
          inf={[
            {
              themes: 'Published articles',
              total: 2,
            },
            {
              themes: 'Sales of articles',
              total: 2,
            },
            {
              themes: 'Read articles',
              total: 2,
            },
            {
              themes: 'Purchased articles',
              total: 2,
            },
            {
              themes: 'Citations received',
              total: 2,
            },
          ]}
          links={[
            {
              href: '/dashboard/purchased',
              icon: BiBook,
            },
            {
              href: '/dashboard/published',
              icon: BiEdit,
            },
          ]}
          title={{
            name: 'dashboard',
            icon: BiLineChart,
          }}
        />
      </Box>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['togdesign:token']: token } = parseCookies(ctx);

  const responce = await fetch('http://localhost:3333/dashboard/', {
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
      dashboard: data,
    },
  };
};
