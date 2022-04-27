import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Articles } from '../components/Articles/Articles';
export default function Home({ article }) {
  return (
    <Box as="main" h="100vh">
      <Flex flexDirection="row">
        <Flex flexWrap={'wrap'} pl="15rem" pb="1rem" w="80%">
          <Articles article={article} />
        </Flex>

        <Box mt={200}>
          <Stack spacing={8}>
            <Box>
              <Flex>
                <Text fontSize="1rem" fontWeight="bold" color="gray.400" mr="3">
                  01
                </Text>
                <Text fontSize="1rem" fontWeight="bold" color="gray.400" mr="1">
                  Emerging, identifying
                </Text>
              </Flex>
              <Flex align="center" mt="-2">
                <Box h="4px" w="20px" mr="3" bgColor="black"></Box>
                <Text fontWeight="bold">Strategy</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Text fontSize="1rem" fontWeight="bold" color="yellow" mr="3">
                  02
                </Text>
                <Text fontSize="1rem" fontWeight="bold" color="gray.400" mr="1">
                  Research, Design and Validation
                </Text>
              </Flex>
              <Flex align="center" mt="-2">
                <Box h="4px" w="20px" mr="3" bgColor="yellow"></Box>
                <Text fontWeight="bold">Strategy</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Text fontSize="1rem" fontWeight="bold" color="gray.400" mr="3">
                  01
                </Text>
                <Text fontSize="1rem" fontWeight="bold" color="gray.400" mr="1">
                  Emerging, identifying
                </Text>
              </Flex>
              <Flex align="center" mt="-2">
                <Box h="4px" w="20px" mr="3" bgColor="black"></Box>
                <Text fontWeight="bold">Strategy</Text>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/article');
  const data = await response.json();
  return {
    props: {
      article: data,
    },
    revalidate: 10,
  };
};
