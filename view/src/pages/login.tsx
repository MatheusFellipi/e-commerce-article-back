import { Flex, Button, Box, Image, Text, Stack } from '@chakra-ui/react';
import { setCookie } from 'nookies';
import { FormEvent, SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { MFInput } from '../components/Form/MFInput';
import { useAuth } from '../services/hook/auth';
import { UserType } from '../services/Type';

type InitialValuesType = {
  email: string;
  password: string;
};


export default function login() {
  const { signin } = useAuth();
  const initialValue = {
    email: 'matheus.fellipi@hotmail.com',
    password: '1234578',
  };

  const [values, setValues] = useState<InitialValuesType>(initialValue);

  function handleChanger(event: FormEvent<HTMLInputElement>) {
    const fieldName = event.currentTarget.getAttribute('name');
    const value = event.currentTarget.value;

    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const responose = await fetch('http://localhost:3333/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data: UserType = await responose.json();
    signin(data);
  };

  return (
    <Flex flexDir="column" h="100vh" align="center" justify="center">
      <Box mt="5rem" w="10rem">
        <Image src="tog.svg" alt="tog design" />
      </Box>

      <Flex
        as="form"
        flexDir="column"
        align="center"
        justify="space-around"
        maxW={400}
        h="100%"
        method="post"
        onSubmit={handleSubmit}
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
              value={values.email}
              type="email"
              focusBorderColor="black"
              autoComplete="username"
              onChange={handleChanger}
              isRequired
            />

            <MFInput
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              value={values.password}
              size="sm"
              w="400px"
              h="40px"
              focusBorderColor="black"
              onChange={handleChanger}
              autoComplete="current-password"
              isRequired
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
          onClick={handleSubmit}
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
