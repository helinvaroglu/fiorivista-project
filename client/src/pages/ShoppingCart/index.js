import React from 'react'
import { Button, Image} from '@chakra-ui/react';
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
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/features/Cart/cartslice';

const ShoppingCart = ({products, isOpen, onClose}) => {
    const dispatch = useDispatch();
    
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart());
    };
    return (
        <div>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader color="#3D52A0">Shopping Cart</DrawerHeader>
                    <DrawerBody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                            <Box key={index} mb={4} pt={8} borderWidth="1px" borderRadius="md">
                                <Text color="#3D52A0" fontWeight="bold">{product.name}</Text>
                                <Text color="#323232">Price: {product.price} TL</Text>
                                <Text color="#323232">Quantity: {product.quantity}</Text>
                                <Image pt={10} src={product.image}  alt="product" />
                                <Button mt="10" width="full" type="submit" color="#3D52A0" bg="#ADBBDA">Order Now</Button>
                                <Button mt="3" width="full" type="submit" color="#3D52A0" onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromCart();
                                }}
                                >Remove from Cart</Button>
                            </Box>
                            ))
                        ) : (
                        <Text color="#323232">Your cart is empty.</Text>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default ShoppingCart;