import React from 'react'
import { Button } from '@chakra-ui/react';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    Box,
    Text,
} from '@chakra-ui/react'; 

const ShoppingCart = ({products, isOpen, onClose}) => {
  return (
    <div>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Shopping Cart</DrawerHeader>
                <DrawerBody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                        <Box key={index} mb={4} p={3} borderWidth="1px" borderRadius="md">
                            <Text fontWeight="bold">{product.name}</Text>
                            <Text>Price: {product.price} TL</Text>
                            <Text>Quantity: {product.quantity}</Text>
                        </Box>
                        ))
                    ) : (
                    <Text>Your cart is empty.</Text>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </div>
  )
}

export default ShoppingCart;