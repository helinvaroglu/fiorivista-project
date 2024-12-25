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
import { Link } from 'react-router-dom';
import { useCreateOrderMutation } from './api';
import { useToast } from '@chakra-ui/react';

const ShoppingCart = ({products, isOpen, onClose}) => {
    const dispatch = useDispatch();
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const toast = useToast();
    
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart());
    };

    const handleOrderNow = async (product) => {
        try {
            const orderData = {
                productName: product.name, // Map `name` to `productName`
                price: product.price,
                quantity: 1, // Default quantity to 1 or get from user input
                imageUrl: product.image, // Map `image` to `imageUrl`
            };
    
            console.log('Order Data:', orderData); // Debugging log
            const response = await createOrder(orderData).unwrap();
            console.log('Order created successfully:', response);
            toast({
                title: 'Order placed successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Failed to place order:', error);
            toast({
                title: 'Failed to place order.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
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
                                <Link to="/checkout">
                                    <Button mt="10" width="full" type="submit" color="#3D52A0" bg="#ADBBDA" onClick={() => handleOrderNow(product)}>Order Now</Button>
                                </Link>
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