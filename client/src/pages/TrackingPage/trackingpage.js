import React, {useState} from 'react'
import { Box, Input, Button, Text, Flex } from '@chakra-ui/react';
import { getBaseUrl } from '../../utils/baseUrl';


function TrackingPage() {
    const [trackingKey, setTrackingKey] = useState("");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTrackOrder = async () => {
        try {
            const response = await fetch(`${getBaseUrl()}/api/orders/track/${trackingKey}`);
            if (!response.ok) {
                throw new Error("Order not found.");
            }
            const data = await response.json();
            setOrder(data);
        } catch (err) {
            console.error(err);
            setOrder(null);
        }
    };

    return (
        <Flex align="center" width="full" justifyContent="center">
            <Box p={4} textAlign="center">
                <Input
                    placeholder="Enter your tracking key"
                    value={trackingKey}
                    onChange={(e) => setTrackingKey(e.target.value)}
                />
                <Button mt="6" type="submit" color="#3D52A0" bg="#ADBBDA" onClick={handleTrackOrder}>
                    Track Order
                </Button>
                {order ? (
                    <Box mt={4}>
                        <Text>Product Name: {order.productName}</Text>
                        <Text>Product Price: {order.price} TL</Text>
                        <Text>Recipient Name: {order.recipient.fullName}</Text>
                        <Text>Sender Name: {order.sender.fullName}</Text>
                        <Text>Status: Confirmed</Text>
                    </Box>
                ) : (
                    <Text mt={4}>No order found.</Text>
                )}
            </Box>
        </Flex>
    );
}

export default TrackingPage