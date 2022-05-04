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
import { Formatar } from '../services/Formatar';
import { useCart } from '../services/hook/useCart';
export default function Cart() {
  const { cart, removeProduct, valueTotal } = useCart();

  return (
    <Flex h="85vh" justify="space-between" align={'flex-start'}>
      <Flex
        w={'1200px'}
        mt={'52px'}
        ml={'128px'}
        flexDir="column"
        justify="center"
        align="center"
      >
        <Box fontWeight="semibold" as="h4" fontSize={'24px'} lineHeight="tight">
          <Text
            fontSize="md"
            fontFamily="Montserrat"
            size={'24px'}
            fontWeight={500}
          >
            Your cart
          </Text>
        </Box>
        <Box w="100%" mt="10">
          <Table size="lg" w="100%" variant="simple">
            <Thead>
              <Th
                align="left"
                fontFamily="Montserrat"
                fontSize="14px"
                fontWeight={'bold'}
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
                fontSize="14px"
                fontWeight={'bold'}
                pb="0"
                pl="5"
                pr="5"
                pt="5"
              >
                Author
              </Th>
              <Th
                fontFamily="Montserrat"
                fontSize="14px"
                fontWeight={'bold'}
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
                fontSize="14px"
                fontWeight={'bold'}
                pb="0"
                pl="5"
                pr="5"
                pt="5"
              >
                Value
              </Th>
              <Th></Th>
            </Thead>
            <Tbody fontFamily="Montserrat" fontSize={'14pxp'}>
              {cart.map((item) => (
                <Tr key={item.id}>
                  <Td pb="0" pl="5" pr="5" pt="0" maxW="200px">
                    {item.title}
                  </Td>
                  <Td pb="0" pl="5" pr="5" pt="0" fontFamily="Montserrat">
                    {item.user.name}
                  </Td>
                  <Td pb="2" pl="5" pr="5" pt="0" fontFamily="Montserrat">
                    <p>Tog.design</p>
                  </Td>
                  <Td pb="0" pl="5" pr="5" pt="0" fontFamily="Montserrat">
                    {Formatar.Money(item.amount)}
                  </Td>
                  <Td>
                    <Button
                      onClick={() => removeProduct(item)}
                      colorScheme="gray"
                      variant="ghost"
                    >
                      <DeleteIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
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
              {Formatar.Money(valueTotal)}
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
