import { Badge, Box, Flex, Progress, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';

import { BiBook, BiEdit, BiLineChart } from 'react-icons/Bi';

interface ICardDashInfo {
  title: string;
  inf: [];
  links: [];
}

export function CardDashInfo({ title }: ICardDashInfo) {
  return (
    <Flex>
      <Flex></Flex>

      <Box
        maxW="sm"
        bgColor={'#ECEDF3'}
        borderRadius="2rem"
        width={420}
        height={758}
      >
        <Flex p="6" width="100%" alignItems="center">
          <Flex justifyContent={'center'} alignItems={'center'}>
            <Badge bgColor={'yellow.400'} p={'0.5'}>
              <BiEdit size="1.2rem" />
            </Badge>
            <Box ml="2" mt="1" as="h4" lineHeight="tight" isTruncated>
              Articles you wrote
            </Box>
          </Flex>

          <Flex justifyContent={'space-around'} w="100px" m={5}>
            <Box cursor="pointer" bgColor={'white'}>
              <NextLink href="/dashboard" passHref>
                <BiLineChart />
              </NextLink>
            </Box>

            <Box cursor="pointer" bgColor={'white'}>
              <NextLink href="/dashboard/published" passHref>
                <BiBook />
              </NextLink>
            </Box>
          </Flex>
        </Flex>

        <Box>
          <Flex p={5} justifyContent={'space-around'} alignItems={'flex-end'}>
            <Flex
              justifyContent={'end'}
              alignItems={'flex-start'}
              flexDirection={'column'}
            >
              <Box as="p" fontSize={'12px'} color={'gray.600'}>
                Design
              </Box>
              <Box fontWeight={'bold'} fontSize={'22px'}>
                2
              </Box>
            </Flex>
            <Box w={'152px'} pb={'8px'}>
              <Progress
                colorScheme="green"
                bgColor={'gray.400'}
                h={'4px'}
                value={20}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
