import { Badge, Box, Center, Flex, Icon, Progress } from '@chakra-ui/react';
import NextLink from 'next/link';
type LinksType = {
  href: string;
  icon: any;
};

type InfoType = {
  themes: string;
  total: number;
};

interface ICardDashInfo {
  title: {
    name: string;
    icon: any;
  };
  inf: InfoType[];
  links: LinksType[];
  marginRight?: string | number;
}

export function CardDashInfo({
  title,
  inf,
  links,
  marginRight,
}: ICardDashInfo) {
  return (
    <Flex
      bgColor={'#ECEDF3'}
      borderRadius="2rem"
      flexDirection={'column'}
      align={'center'}
      marginRight={marginRight}
      width={420}
      maxW={420}
      height={700}
      maxH={700}
    >
      <Flex p="6" width="100%" alignItems="center" justifyContent={'center'}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          textAlign={'center'}
        >
          <Badge bgColor={'yellow.400'} p={'0.5'}>
            <Center>
              <Icon as={title.icon} w="1.2rem" h="1.2rem" />
            </Center>
          </Badge>
          <Box ml="2" mt="1" as="h4" lineHeight="tight" isTruncated>
            {title.name}
          </Box>
        </Flex>

        <Flex justifyContent={'space-around'} w="100px" m={5}>
          {links.map((item) => (
            <Box key={item.href} cursor="pointer" bgColor={'white'}>
              <NextLink href={item.href} passHref>
                <Center>
                  <Icon as={item.icon} />
                </Center>
              </NextLink>
            </Box>
          ))}
        </Flex>
      </Flex>

      {inf.map((item) => (
        <Box key={item.themes}>
          <Flex p={5} justifyContent={'space-around'} alignItems={'flex-end'}>
            <Flex
              justifyContent={'end'}
              alignItems={'flex-start'}
              flexDirection={'column'}
            >
              <Box
                as="p"
                fontSize={'12px'}
                color={'gray.600'}
                maxW={'100px'}
                w={'100px'}
                overflow="hidden"
              >
                {item.themes}
              </Box>
              <Box fontWeight={'bold'} fontSize={'22px'}>
                {item.total}
              </Box>
            </Flex>

            <Box w={'152px'} pb={'8px'}>
              <Progress
                isAnimated
                bgColor={'gray.400'}
                h={'4px'}
                value={item.total}
              />
            </Box>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}
