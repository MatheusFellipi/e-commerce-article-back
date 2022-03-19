import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { MFInput } from '../components/Form/MFInput';
export default function Cart() {
  return (
    <Flex h="100vh" justify='end'>
      <Flex  flexDir="column" justify="center" align="center" pr="15rem">
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          <Text fontSize="md" fontFamily="Montserrat" fontWeight={400}>
            Your cart
          </Text>
        </Box>
        <Box maxW={716.5} w={716.5} mt="10">
          <Table w="100%" variant="simple">
            <Thead fontFamily="Montserrat" fontSize="12px" fontWeight={500}>
              <Th
                align="left"
                fontFamily="Montserrat"
                fontSize="12px"
                fontWeight={500}
                pb="0"
                pl="5"
                pr="5"
                pt="5"
              >
                Article
              </Th>
              <Th
                align="left"
                fontFamily="Montserrat"
                fontSize="12px"
                fontWeight={500}
                pb="0"
                pl="5"
                pr="5"
                pt="5"
              >
                Author
              </Th>
              <Th
                fontFamily="Montserrat"
                fontSize="12px"
                fontWeight={500}
                align="left"
                pb="0"
                pl="5"
                pr="5"
                pt="5"
              >
                Publisher
              </Th>
              <Th
                align="left"
                fontFamily="Montserrat"
                fontSize="12px"
                fontWeight={500}
                pb="0"
                pl="5"
                pr="5"
                pt="5"
              >
                Value
              </Th>
              <Th></Th>
            </Thead>
            <Tbody>
              <Tr>
                <Td
                  pb="0"
                  pl="5"
                  pr="5"
                  pt="0"
                  maxW="200px"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  What was the trend in 2020 and you didn’t use it
                </Td>
                <Td
                  pb="0"
                  pl="5"
                  pr="5"
                  pt="0"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  Daniel Alves
                </Td>
                <Td
                  pb="2"
                  pl="5"
                  pr="5"
                  pt="0"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  Tog.design
                </Td>
                <Td
                  pb="0"
                  pl="5"
                  pr="5"
                  pt="0"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  R$ 10,90
                </Td>
                <Td>
                  <Button colorScheme="gray" variant="ghost">
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td
                  pb="0"
                  pl="5"
                  pr="5"
                  pt="0"
                  maxW="200px"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  What was the trend in 2020 and you didn’t use it
                </Td>
                <Td
                  pb="0"
                  pl="5"
                  pr="5"
                  pt="0"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  Daniel Alves
                </Td>
                <Td
                  pb="0"
                  pl="5"
                  pr="5"
                  pt="0"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  Tog.design
                </Td>
                <Td
                  pb="0"
                  pl="5"
                  pr="5"
                  pt="0"
                  fontFamily="Montserrat"
                  fontSize="12px"
                >
                  R$ 10,90
                </Td>
                <Td>
                  <Button colorScheme="gray" variant="ghost">
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Stack bgColor={'gray.700'}>
            <Divider orientation="horizontal" bgColor={'gray.700'} />
          </Stack>

          <Flex mt={5} ml={10} w="75%" justify={'end'} as="h4">
            <Text mr={5} fontSize="xs" fontFamily="Montserrat" fontWeight={500}>
              Subtotal
            </Text>
            <Text fontSize="xs" fontFamily="Montserrat" fontWeight={400}>
              R$ 29,80
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Flex
        flexDir="column"
        maxW={400}
        w="400px"
        bgColor="gray.200"
        padding={10}
        h="100%"
      >
        <Box width="100%" mt="5rem" mb="5rem">
          <Text fontSize="24px"> Resume</Text>
        </Box>
        <MFInput
          name="Discont coupon"
          size="sm"
          w="270px"
          h="40px"
          borderColor="black"
        />
        <Flex mt={5} ml={10} w="75%" justify={'space-between'} as="h4">
          <Text mr={5} fontSize="sm" fontFamily="Montserrat" fontWeight={500}>
            Subtotal
          </Text>
          <Text fontSize="sm" fontFamily="Montserrat" fontWeight={400}>
            R$ 29,80
          </Text>
        </Flex>
        <Flex mt={5} mb={2} ml={10} w="75%" justify={'space-between'} as="h4">
          <Text mr={5} fontSize="sm" fontFamily="Montserrat" fontWeight={500}>
            Discount
          </Text>
          <Text fontSize="sm" fontFamily="Montserrat" fontWeight={400}>
            R$ 2,00
          </Text>
        </Flex>

        <Stack bgColor={'gray.700'}>
          <Divider orientation="horizontal" bgColor={'gray.700'} />
        </Stack>
        <Flex mt={5} ml={10} w="75%" justify={'space-between'} as="h4">
          <Text mr={5} fontSize="sm" fontFamily="Montserrat" fontWeight={500}>
            Total
          </Text>
          <Text fontSize="md" fontFamily="Montserrat" fontWeight={400}>
            R$ 29,80
          </Text>
        </Flex>
        <Flex mt={20} flexDirection={'column'}>
          <Stack spacing={8}>
            <Button
              bgColor="black"
              variant="solid"
              color="yellow"
              fontFamily="Montserrat"
              fontSize="xs"
              borderRadius="20rem"
              fontWeight={400}
              _hover={{
                bgColor: 'gray.700',
              }}
            >
              CHECKOUT
            </Button>
            <Button
              colorScheme="black"
              variant="outline"
              fontFamily="Montserrat"
              borderRadius="20rem"
              fontSize="xs"
              fontWeight={400}
              _hover={{
                bgColor: 'gray.300',
              }}
            >
              KEEP BUYING
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}
