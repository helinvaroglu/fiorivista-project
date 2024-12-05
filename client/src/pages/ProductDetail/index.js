import React from 'react';
import {Box, Text, Button, Image, Flex} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Grid, GridItem  } from '@chakra-ui/react';

import products from '../../data/products.json'; 

function ProductDetail() {
    const { id } = useParams(); // Get product ID from the URL
    const product = products.find((p) => p.id === parseInt(id, 10)); // Find the product by ID
    if (!product) {
        return <Text>Product not found</Text>;
    }

    return (
        <Box 
        display="flex"
        justifyContent="center"
      >
            <Box m={5} bg="#ADBBDA" p={4} borderRadius="md" boxShadow="md">
                <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
                    <GridItem colSpan={1} display="flex" alignItems="center"  h="100%">
                        <Image src={product.image}  alt="product" />
                    </GridItem>
                    <GridItem colSpan={1} display="flex" flexDirection="column" alignItems="end"  h="100%">
                        <Text fontWeight="bold" fontSize="2xl" color="#3D52A0" mb={1}>
                            {product.name}
                        </Text>
                        <Text fontSize="xl" color="#F5D158" mb={2}>
                            {product.rating}
                        </Text>
                        <Flex justifyContent="space-between">
                            <Text fontSize="md" color="#323232" mb={10}>
                                {product.description}
                            </Text>
                        </Flex>
                        <Text fontSize="xl" fontWeight="bold" color="#3D52A0" mb={4}>
                            {product.price}
                        </Text>
                        <Button bg="#7091E6" color="#FDFDFF" size="lg">
                            Order
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductDetail;