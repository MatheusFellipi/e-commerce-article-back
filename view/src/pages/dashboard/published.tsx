import { DeleteIcon } from '@chakra-ui/icons';
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
  Center,
} from '@chakra-ui/react';

import { CardDashInfo } from '../../components/CardDashInfo/CardDashInfo';
export default function Dashboard() {
  return (
    <Flex
      p="10"
      width={'100%'}
      alignItems={'flex-start'}
      justifyContent="flex-end"
    >
      <Center w="1080px" mr={'100px'}>
        <TableContainer
          fontFamily="Montserrat"
          fontSize="18px"
          whiteSpace="normal"
        >
          <Table variant="simple" size="lg">
            <Thead>
              <Th  align="left" fontSize="18px" fontWeight={500}>
                Article
              </Th>
              <Th fontWeight={500} align="left" fontSize="18px">
                Publisher
              </Th>
              <Th fontWeight={500} align="left" fontSize="18px">
                Publication date
              </Th>
              <Th align="left" fontSize="18px" fontWeight={500}>
                Value
              </Th>
              <Th></Th>
            </Thead>
            <Tbody>
              <Tr>
                <Td maxW={'305px'}>
                  What was the trend in 2020 and you didn’t use it
                </Td>
                <Td>Daniel Alves</Td> 
                <Td>Tog.design</Td>
                <Td>R$ 10,90</Td>
                <Td>
                  <Box as="p" w={'100%'}>
                    <Button colorScheme="gray" variant="ghost">
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td maxW={'305px'}>
                  What was the trend in 2020 and you didn’t use it
                </Td>
                <Td>Daniel Alves</Td>
                <Td>Tog.design</Td>
                <Td>R$ 10,90</Td>
                <Td>
                  <Button colorScheme="gray" variant="ghost">
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Center>

      <CardDashInfo inf={[]} links={[]} title="Articles you wrote" />
    </Flex>
  );
}
