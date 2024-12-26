import React from 'react';
import {Box, Text, Button, Image, Flex} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { Grid, GridItem  } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { useFetchSingleProductQuery } from '../../redux/features/Products/productApi';
import {addToCart} from '../../redux/features/Cart/cartslice'


const ProductDetail = () => {
    const { id } = useParams(); // Get product ID from the URL

    const dispatch = useDispatch();
    const {data, error, isLoading} = useFetchSingleProductQuery(id);

    const singleProduct = data?.product || {};

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>Error loading.</p>

    const handleAddToCart = (singleProduct) => {
        dispatch(addToCart(singleProduct));
    }

    return (
        <Box 
        display="flex"
        justifyContent="center"
        >
            <Box m={5} bg="#ADBBDA" p={4} borderRadius="md" boxShadow="md">
                <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
                    <GridItem colSpan={1} display="flex" alignItems="center"  h="100%">
                        <Flex width="400px" height="400px">
                            <Image objectFit="cover" src={singleProduct.image} alt="product" />
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={1} display="flex" flexDirection="column" alignItems="end"  h="100%">
                        <Text fontWeight="bold" fontSize="2xl" color="#3D52A0" mb={4}>
                            {singleProduct.name} 
                        </Text>
                        <Text fontSize="xl" color="#F5D158" mb={4}>
                            {singleProduct.rating}
                        </Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="md" color="#323232" mt={10}>
                                {singleProduct.description}
                            </Text>
                        </Flex>
                        <Flex mt="auto" flexDirection="column" align="flex-end">
                            <Text fontSize="xl" fontWeight="bold" color="#3D52A0" mb={4}>
                                {singleProduct.price} TL
                            </Text>
                            <Button bg="#7091E6" color="#FDFDFF" size="lg" 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(singleProduct);
                            }}>
                                Order
                            </Button>
                        </Flex>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductDetail;