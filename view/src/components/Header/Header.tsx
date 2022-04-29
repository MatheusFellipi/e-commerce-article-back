import {
  Image,
  Box,
  Flex,
  Button,
  Link,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  MenuGroup,
  Avatar,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { useAuth } from '../../services/hook/auth';

export function Header() {
  const route = useRouter();
  const { signout } = useAuth();

  const [whitGray, setWhitGray] = useState<boolean>(false);
  const [hideOrShow, setHideOrShow] = useState<boolean>(false);
  const [hideOrShowDashBtn, setHideOrShowDashBtn] = useState<boolean>(false);

  const [isLogin, setisLogin] = useState<boolean>(() => {
    const { ['togdesign:token']: token } = parseCookies();
    if (token) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    route.route === '/cart' ? setWhitGray(false) : setWhitGray(true);
    route.route === '/login' ? setHideOrShow(true) : setHideOrShow(false);
    route.route === '/dashboard'
      ? setHideOrShowDashBtn(true)
      : setHideOrShowDashBtn(false);

    const { ['togdesign:token']: token } = parseCookies();
    if (token) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
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
        pl={8}
        pr={8}
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
        <Flex justify={'center'} align={'center'}>
          {isLogin ? (
            <Button onClick={signout} fontWeight="bold" fontSize="16px">
              Logout
            </Button>
          ) : (
            <NextLink href="/login" passHref>
              <Button fontWeight="bold" fontSize="16px">
                Sign In
              </Button>
            </NextLink>
          )}
          <Menu>
            <MenuButton
              as={Avatar}
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />

            <MenuList>
              <MenuGroup title="Profile">
                <NextLink href="/dashboard" passHref>
                  <MenuItem>Dashboardt</MenuItem>
                </NextLink>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                {isLogin ? (
                  <MenuItem onClick={signout} fontWeight="bold" fontSize="16px">
                    Logout
                  </MenuItem>
                ) : (
                  <NextLink href="/login" passHref>
                    <MenuItem fontWeight="bold" fontSize="16px">
                      Sign In
                    </MenuItem>
                  </NextLink>
                )}
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
}
