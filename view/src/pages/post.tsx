import {
  Box,
  Image,
  Text,
  Badge,
  Flex,
  Avatar,
  CloseButton,
  Divider,
  Stack,
  Button,
  
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { createEditor, Descendant, Element } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';

export default function post() {
  const property = {
    amount: '10',
    created_at: '2022-01-24T20:29:28.123Z',
    id: 'd89d254c-4007-4f8b-bebf-7043587fbb3f',
    img_url: 'https://bit.ly/2Z4KKcF',
    isDeleted: false,
    text: [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ],
    themes: 'iu,üx',
    title: 'loren loren loren',
    update_at: '2022-01-24T20:29:28.123Z',
    user_id: '7339bbfc-5e3e-4d2e-9664-acec9cefad25',
  };

  const [article, setArticle] = useState(property);
  //TODO tira esse if Somente para teste
  const [text, setText] = useState<Descendant[]>(
    typeof article.text === 'string' ? JSON.parse(article.text) : article.text
  );
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);

  return (
    <Flex justifyContent={'flex-end'}>
      <Box maxW={'430'} pos="relative">
        <Image
          src={article.img_url}
          alt={article.title + ' : ' + article.user_id}
        />
        <Box
          padding={'3'}
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
        >
          <Text fontSize="lg">{article.title}</Text>
        </Box>
        <Slate
          editor={editor}
          value={text}
          onChange={(value) => setText(value)}
        >
          <Editable readOnly />
        </Slate>
        <Flex h="xs">
          <Flex
            direction={'column'}
            alignItems={'start'}
            w="100%"
            alignContent={'start'}
          >
            <Text fontSize="14">
              To continue reading, you need to buy this article.
            </Text>
            <Text fontSize="14" mt="0.5">
              you can continue this readinf for olny {article.amount} paid your
              on card
            </Text>
            <Flex w="100%" mt="10" justifyContent={'center'}>
              <Button mt="2" colorScheme="cyan" color={'white'} size="xs">
                Buy item
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex mt="0.5rem" pos="fixed" alignItems={'flex-start'} bottom="1" >
          <Flex>
            <Avatar
              borderColor={'yellow.300'}
              showBorder
              size="md"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <Box ml="2">
              <Text fontSize="xs" fontWeight="bold" flexWrap={'nowrap'}>
                Segun Adebayo
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
              </Text>

              <Text fontSize="xs">UI Engineer</Text>
            </Box>
          </Flex>

          <Stack direction="row" h="50px" w="2px" bgColor={'gray.400'} ml={'7'}>
            <Divider orientation="vertical" bgColor={'gray.400'} />
          </Stack>
          <Box ml={'2'} maxW="150px" mr={'1'}>
            <Text fontSize="8px" color={'gray.400'}>
              THEME
            </Text>
            <Text fontSize="10px" fontWeight="bold" flexWrap={'wrap'}>
              UX Design, Business, Sales User Research
            </Text>
          </Box>

          <Stack direction="row" h="50px" w="2px" bgColor={'gray.400'}>
            <Divider orientation="vertical" bgColor={'gray.400'} />
          </Stack>
          <Box maxW="md" ml={'1'}>
            <Text fontSize="8px" color={'gray.400'}>
              TEMPS
            </Text>
            <Text fontSize="10px" fontWeight="bold" flexWrap={'nowrap'}>
              4 minutes
            </Text>
          </Box>
        </Flex>
      </Box>

      <Flex justifyContent={'flex-end'} w="30%">
        <CloseButton size="lg" />
      </Flex>
    </Flex>
  );
}
