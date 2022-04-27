import { Image, Box, Flex, Button, Link, Center } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function Header() {
  const route = useRouter();

  const [whitGray, setWhitGray] = useState<boolean>(false);
  const [hideOrShow, setHideOrShow] = useState<boolean>(false);
  const [hideOrShowDashBtn, setHideOrShowDashBtn] = useState<boolean>(false);

  useEffect(() => {
    route.route === '/cart' ? setWhitGray(false) : setWhitGray(true);
    route.route === '/login' ? setHideOrShow(true) : setHideOrShow(false);
    route.route === '/dashboard'
      ? setHideOrShowDashBtn(true)
      : setHideOrShowDashBtn(false);
  }, [route.route]);

  return (
    <Flex hidden={hideOrShow} as="header" align="center" justify="flex-end">
      <Box w="1180px">
        <NextLink href="/" passHref>
          <Box cursor="pointer" w="10rem" pt={2} ml={10}>
            <Image src="tog.svg" alt="tog design" />
          </Box>
        </NextLink>
      </Box>

      <Flex
        align="center"
        justify="space-around"
        maxW={'400px'}
        w="400px"
        bgColor={whitGray ? 'gray.50' : 'gray.200'}
        pl={10}
        pr={10}
        pt={2}
      >
        {!!hideOrShowDashBtn && (
          <NextLink href="/dashboard/write" passHref>
            <Button
              colorScheme="cyan"
              color="white"
              fontWeight="bold"
              fontSize="16px"
            >
              Write now
            </Button>
          </NextLink>
        )}

        <Box
          as="button"
          height="3rem"
          width="3rem"
          px="8px"
          borderRadius="2rem"
          fontSize="16px"
          bg="gray.300"
          _hover={{ bg: '#A9A7B0' }}
          _active={{
            bg: '#A9A7B0',
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }}
        >
          <NextLink href="/cart" passHref>
            <Center>
              <Image
                src="ShoopingBag.svg"
                alt="Carrinho de compras"
                w={7}
                h={7}
              />
            </Center>
          </NextLink>
        </Box>
          <NextLink href="/login" passHref>
          <Button colorScheme="purple" fontWeight="bold" fontSize="16px">
            Sign In
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
}
