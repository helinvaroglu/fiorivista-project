import React from 'react';
import {Box, Image, Button, Text, Flex, Icon} from '@chakra-ui/react'

import {Link} from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 


// every product's card that holds details of them
// box is used as div (element of chakra ui)

function Card() {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3" pb="0" bg="#ADBBDA">
        {/* TODO: change the link dynamically with item id*/}
        <Link to={'/product/product_id'}>
            <Image src="https://picsum.photos/400/200"  alt="product" />
        </Link>

          <Flex direction="column" p="2">
              <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" color="#323232">Product Name</Text>
                  <Flex align="center">
                      <Text color="#323232"  mr="2">$100</Text>
                      <Button size="sm" bg="#7091E6" color="#FDFDFF" _hover={{ color: '#323232' }}>
                          <Icon as={FaShoppingCart} />
                      </Button>
                  </Flex>
              </Flex>
          </Flex>

    </Box>
  )
}

export default Card;