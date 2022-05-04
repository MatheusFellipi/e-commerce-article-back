import { Image, Box, Flex, Button, Center } from '@chakra-ui/react';
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
    route.route === '/dashboard/write'
      ? setHideOrShow(true)
      : setHideOrShow(false);

    if (route.route === '/login') {
      setHideOrShow(true);
    } else {
      setHideOrShow(false);
    }

    if (
      route.route === '/dashboard' ||
      route.route === '/dashboard/published' ||
      route.route === '/dashboard/purchased'
    ) {
      setHideOrShowDashBtn(true);
    } else {
      setHideOrShowDashBtn(false);
    }

    const { ['togdesign:token']: token } = parseCookies();
    if (token) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
  }, [route.route]);

  return (
    <Flex
      hidden={hideOrShow}
      as="header"
      height={"120px"}
      justify={'space-between'}
    >
      <Box marginTop={'32px'} ml={'20rem'}>
        <NextLink href="/" passHref>
          <Box cursor="pointer" w="10rem">
            <Image src="tog.svg" alt="tog design" />
          </Box>
        </NextLink>
      </Box>

      <Flex
        align="center"
        justify="space-around"
        maxW={'400px'}
        w="400px"
        h={'100%'}
        bgColor={whitGray ? 'gray.50' : 'gray.200'}
      >
        {!!hideOrShowDashBtn && (
          <NextLink href="/dashboard/write" passHref>
            <Button
              colorScheme="cyan"
              color="white"
              fontWeight="bold"
              fontSize="12px"
              borderRadius={10}
              w={'106px'}
              h={'38px'}
            >
              Write now
            </Button>
          </NextLink>
        )}

        <Box
          marginTop={'32px'}
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

        {isLogin ? (
          <Button
            onClick={signout}
            color={'white'}
            marginTop={'32px'}
            mr={'102px'}
            bgColor={'purple.600'}
            fontWeight="bold"
            fontSize="12px"
            w={'86px'}
            h={'38px'}
            _hover={{
              filter: `brightness(0.9)`,
            }}
            borderRadius={10}
          >
            Logout
          </Button>
        ) : (
          <NextLink href="/login" passHref>
            <Button
              color={'white'}
              marginTop={'32px'}
              mr={'102px'}
              bgColor={'purple.600'}
              fontWeight="bold"
              fontSize="12px"
            >
              Sign In
            </Button>
          </NextLink>
        )}

        {/* <Flex justify={'center'} align={'center'}>
    
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
        </Flex> */}
      </Flex>
    </Flex>
  );
}
