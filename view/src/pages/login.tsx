import { Flex, Button, Box, Image, Text, Stack } from '@chakra-ui/react';
import { MFInput } from '../components/Form/MFInput';
export default function login() {
  return (
    <Flex flexDir="column" w="100vw" h="100vh" align="center" justify="center">
      <Box mt="5rem" w="10rem">
        <Image src="tog.svg" alt="tog design" />
      </Box>

      <Flex
        flexDir="column"
        align="center"
        justify="space-around"
        maxW={400}
        h="100%"
        as="form"
      >
        <Box
          fontWeight="bold"
          as="h1"
          fontSize="25px"
          color="black"
          w="100%"
          mt="9"
        >
          <Text textShadow="1px 1px #ffff">Sign in</Text>
        </Box>

        <Box>
          <Stack spacing={'10'}>
            <MFInput
              placeholder="E-mail"
              id="email"
              name="email"
              size="sm"
              w="400px"
              h="40px"
              type="email"
              focusBorderColor="black"
            />

            <MFInput
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              size="sm"
              w="400px"
              h="40px"
              focusBorderColor="black"
            />
          </Stack>

          <Text fontSize="15px" align="right" w="100%" mt="5">
            Forgot your password?
          </Text>
        </Box>
        <Button
          w="200px"
          h="40px"
          borderRadius="20rem"
          type="submit"
          mb="5rem"
          bgColor={'blue.600'}
          color="white"
          _hover={{
            bgColor: 'blue.700',
          }}
        >
          Sign in
        </Button>
      </Flex>
    </Flex>
  );
}
