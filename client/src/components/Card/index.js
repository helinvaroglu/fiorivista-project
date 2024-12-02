import React from 'react';
import {Box, Image, Button, Text, Flex, Icon, Grid} from '@chakra-ui/react'

import {Link} from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
import {addToCart} from '../../redux/features/Cart/cartslice'


// every product's card that holds details of them
// box is used as div (element of chakra ui)

const Card = ({products}) => {
    // const dispatch = useDispatch();

    // const handleAddToCart = (product) => {
    //     dispatch(addToCart(product))
    // }

    return (
    <Grid templateColumns='repeat(4, 1fr)' gap={5}>
        {products.map((product, index) => (
            <Box key={index} className='product-card' borderWidth="1px" borderRadius="lg" overflow="hidden" p="3" pb="0" bg="#ADBBDA">
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image}  alt="product" />
                </Link>

                <Flex direction="column" p="2">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold" color="#323232">{product.name}</Text>
                        <Flex align="center">
                            <Text color="#323232"  mr="2">{product.price} TL</Text>
                            <Button size="sm" bg="#7091E6" color="#FDFDFF" _hover={{ color: '#323232' }}>
                                <Icon as={FaShoppingCart} />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>

            </Box>
        ))}
    </Grid>
    
    )
}

export default Card;