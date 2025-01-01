import React from 'react';
import {Box, Image, Button, Text, Flex, Icon, Grid} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
import {addToCart} from '../../redux/features/Cart/cartslice'


// every product's card that holds details of them
// box is used as div (element of chakra ui)

const Card = ({products}) => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    if (!products || products.length === 0) {
        return (
            <Flex justifyContent="center" alignItems="center" height="200px">
                <Text fontSize="lg" color="gray.600">No products found.</Text>
            </Flex>
        );
    }
    
    return (
    <Grid templateColumns='repeat(4, 1fr)' gap={55}>
        {products.map((product) => (
            <Box key={product._id} className='product-card' borderWidth="1px" borderRadius="lg" overflow="hidden" p="3" pb="0" bg="#ADBBDA" justify="center" align="center">
                <Link to={`/products/${product._id}`}>
                    <Box width="250px" height="200px"  overflow="hidden">
                        <Image  width="100%"  height="100%" objectFit='cover' src={product.image}  alt="product" />
                    </Box>
                </Link>

                <Flex direction="column" p="2">
                    <Flex justify="space-between" align="center">
                        <Text fontWeight="bold" color="#323232">{product.name}</Text>
                        <Flex align="center">
                            <Text color="#323232"  mr="2">{product.price} TL</Text>
                            <Button size="sm" bg="#7091E6" color="#FDFDFF" _hover={{ color: '#323232' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                            }}
                            >
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