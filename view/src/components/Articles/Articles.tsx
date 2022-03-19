import {
  Box,
  Image,
  Badge,
  Text,
  Avatar,
  Flex,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';

type UsersType = {
  name: string;
  job_role: string;
  avatar: string;
};

type ArticlesType = {
  id: string;
  title: string;
  themes: string;
  img_url: string;
  created_at: string;
  user: UsersType;
};

interface ArticlesProps {
  article: ArticlesType[];
}

export function Articles({ article }: ArticlesProps) {
  const [listArticle, setlistArticle] = useState<ArticlesType[]>(article);

  return (
    <>
      {listArticle.map((article) => (
        <Box
          cursor={'pointer'}
          key={article.id}
          maxW="412px"
          w="412px"
          margin="5"
          borderWidth="1px"
          bg="white"
          borderRadius="lg"
          overflow="hidden"
        >
          <Image
            src="https://img.freepik.com/vetores-gratis/paisagem-de-marte-planeta-alienigena-fundo-marciano_107791-1781.jpg?t=st=1647618475~exp=1647619075~hmac=aadf3e302b96d6d2e7e5a6873d66f5e4e2611c1fb7bd821da85d60418e6e96c1&w=1380"
            alt={article.title}
          />

          <Box padding={'3'}>
            <Box mt="1" as="h4">
              <Text fontSize="lg" fontWeight="500">
                {article.title}
              </Text>
            </Box>
            <Flex mt="0.5rem" alignItems={'flex-start'} justify="center">
              <Flex w={200} align={'center'}>
                <Avatar
                  borderColor={'yellow.300'}
                  showBorder
                  w={35}
                  h={35}
                  name={article.user.name}
                  src={article.user.avatar}
                />
                <Box ml="2">
                  <Flex justify="center" align="center">
                    <Text fontSize="12px" fontWeight="bold">
                      {article.user.name}
                    </Text>
                    <div>
                      <Badge
                        fontWeight="normal"
                        fontStyle="normal"
                        ml="3"
                        fontSize="6px"
                        bgColor={'yellow.300'}
                        color={'white'}
                      >
                        Follow
                      </Badge>
                    </div>
                  </Flex>

                  <Text fontSize="xs">{article.user.job_role}</Text>
                </Box>
              </Flex>

              <Flex justify="flex-end">
                <Stack direction="row" h="50px" w="2px" bgColor={'gray.400'}>
                  <Divider orientation="vertical" bgColor={'gray.400'} />
                </Stack>
                <Box ml={'2'} maxW="130px" w="130px" mr={'1'}>
                  <Text fontSize="8px" color={'gray.400'}>
                    THEME
                  </Text>
                  <Text fontSize="10px" fontWeight="bold" flexWrap={'wrap'}>
                    {article.themes}
                  </Text>
                </Box>
                <Stack direction="row" h="50px" w="2px" bgColor={'gray.400'}>
                  <Divider orientation="vertical" bgColor={'gray.400'} />
                </Stack>
                <Box maxW="md" ml={'1'}>
                  <Text fontSize="8px" color={'gray.400'}>
                    TEMPS
                  </Text>
                  <Text fontSize="8px" fontWeight="bold" flexWrap={'nowrap'}>
                    4 minutes
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      ))}
    </>
  );
}
