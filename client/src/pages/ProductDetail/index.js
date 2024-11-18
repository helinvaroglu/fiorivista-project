import React from 'react';
import {Box, Text, Button} from '@chakra-ui/react';
import { Grid, GridItem  } from '@chakra-ui/react'

// TODO: add the details dynamically.

function ProductDetail() {

    const product = {
        name: "Product Name",
        description: "Description",
        price: "100₺",
        // imageUrl: "path",
        rating: "★★★★★"
    };

    return (
        <Box m={5} bg="#ADBBDA" p={4} borderRadius="md" boxShadow="md">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem colSpan={1}>
                    Image
                    {/* <Image src={product.imageUrl} alt="Product Photo" borderRadius="md" /> */}
                </GridItem>
                <GridItem colSpan={1} display="flex" flexDirection="column" alignItems="end">
                    <Text fontWeight="bold" fontSize="2xl" color="#3D52A0" mb={1}>
                        {product.name}
                    </Text>
                    <Text fontSize="xl" color="#F5D158" mb={2}>
                        {product.rating}
                    </Text>
                    <Text fontSize="md" color="#323232" mb={10}>
                        {product.description}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="#3D52A0" mb={4}>
                        {product.price}
                    </Text>
                    <Button bg="#7091E6" color="#FDFDFF" size="lg">
                        Order
                    </Button>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default ProductDetail;