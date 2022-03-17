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
export function Articles() {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box
      maxW="22rem"
      borderWidth="1px"
      bg="white"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box padding={'3'}>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          <Text fontSize="lg">{property.title}</Text>
        </Box>
        <Flex mt="0.5rem" alignItems={'flex-start'}>
          <Flex>
            <Avatar
              borderColor={'yellow.300'}
              showBorder
              size="xs"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <Box ml="2">
              <Text fontSize="8px" fontWeight="bold" flexWrap={'nowrap'}>
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

              <Text fontSize="8px">UI Engineer</Text>
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
          <Box ml={'2'} maxW="100px" mr={'1'}>
            <Text fontSize="8px" color={'gray.400'} >
              Themes
            </Text>
            <Text fontSize="8px" fontWeight="bold" flexWrap={'wrap'}>
              UX Design, Business, Sales User Research
            </Text>
          </Box>

          <Stack
            direction="row"
            h="50px"
            w="2px"
            bgColor={'gray.400'}
          >
            <Divider orientation="vertical" bgColor={'gray.400'} />
          </Stack>
          <Box maxW="md" ml={'1'} >
            <Text fontSize="8px" color={'gray.400'}>
              temps
            </Text>
            <Text fontSize="8px" fontWeight="bold" flexWrap={'nowrap'}>
              4 minutes
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
