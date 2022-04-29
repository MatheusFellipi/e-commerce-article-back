import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Image,
  Text,
  Badge,
  Flex,
  Avatar,
  CloseButton,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { useCart } from '../../services/hook/useCart';

type UsersType = {
  name: string;
  job_role: string;
  avatar: string;
};

type ArticlesType = {
  amount: string;
  id: string;
  title: string;
  themes: string[];
  text: string;
  img_url: string;
  created_at: string;
  user: UsersType;
};

interface ModalArticleReadingProps {
  handleOpenModalClick: Function;
  onClose: () => void;
  isOpen: boolean;
  idArticle: string;
}

export function ModalArticleReading({
  onClose,
  isOpen,
  idArticle,
}: ModalArticleReadingProps) {
  const { addProduct } = useCart();
  const [article, setArticle] = useState<ArticlesType>();
  const [text, setText] = useState<Descendant[]>();
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);

  useEffect(() => {
    if (idArticle) {
      fetch(`http://localhost:3333/article/${idArticle}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
          const textFormatedJson = JSON.parse(data.text);
          const textFormatedJsonArry = textFormatedJson.slice(0, 3);
          console.log(textFormatedJsonArry.length);
          setText(textFormatedJsonArry);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  }, [idArticle]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {article && (
              <Flex justifyContent={'center'}>
                <Box maxW={'430'} pos="relative">
                  <Image src={article.img_url} alt={article.title} />
                  <Box
                    padding={'3'}
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                  >
                    <Text fontSize="lg">{article.title}</Text>
                  </Box>
                  {!!text && (
                    <Slate
                      editor={editor}
                      value={text}
                      onChange={(value) => setText(value)}
                    >
                      <Editable readOnly />
                    </Slate>
                  )}
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
                        you can continue this readinf for olny {article.amount}{' '}
                        paid your on card
                      </Text>
                      <Flex w="100%" mt="10" justifyContent={'center'}>
                        <Button
                          mt="2"
                          colorScheme="cyan"
                          color={'white'}
                          size="lg"
                          onClick={() => addProduct(article)}
                        >
                          Buy item
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Flex mt="0.5rem" alignItems={'center'} bottom="1">
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

              <Stack
                direction="row"
                h="50px"
                w="2px"
                bgColor={'gray.400'}
                ml={'7'}
              >
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
