import React, {useState} from 'react'
import { Box, Flex, Text, Divider, Heading, FormControl, FormLabel, Input, Button, NumberInputField, NumberInput} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

function SenderInfo() {
    const [message, setMessage] = useState('');
    const [senderFullName, setFullName] = useState('');
    const [senderPhoneNumber, setPhoneNumber] = useState('');
    const [senderEmailAddress, setEmailAddress] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;

    const handleSenderInfo = async (e) => {
        e.preventDefault();
        const data = {
            senderFullName,
            senderPhoneNumber,
            senderEmailAddress
        }
    
        console.log(data);

        const isSuccess = true; 
        if (isSuccess) {
            // Navigate to payment page
            navigate('/payment', { state: { product } });
        } else {
            setMessage('Failed to submit sender information. Please try again.');
        }
    };

  return (
    <Flex
        direction={{ base: 'column', md: 'row' }}
        w="100%"
        p={4}
        gap={6}
    >
        {/* Delivery Information */}
        <Box
        flex={2}
        border="2px solid"
        borderColor="#3D52A0"
        borderRadius="md"
        p={4}
        boxShadow="sm"
        >
        <Heading size="md" mb={4} color="#3D52A0">
            Delivery Information
        </Heading>
        <Divider mb={4} />
        <form onSubmit={handleSenderInfo}>
            <FormControl>
            <FormLabel color="#323232">Sender's Full Name</FormLabel>
            <Input 
                name="senderFullName"
                id="senderFullName"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sender's Full Name" required
            />
            </FormControl>
            
            <FormControl mt="4">
            <FormLabel color="#323232">Sender's Phone Number</FormLabel>
            <NumberInput>
                <NumberInputField
                    name="senderPhoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(000) 000 00 00" required
                    id="senderPhoneNumber"
                />
            </NumberInput>
            </FormControl>

            <FormControl mt="4">
            <FormLabel color="#323232">Sender's Email Address</FormLabel>
            <Input
                name="senderEmailAddress"
                id="senderEmailAddress"
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Sender's Email Address" required
            />
            </FormControl>


            {
            message && <p className="#D22B2B">{message}</p>
            }

            <Button mt="6" width="full" type="submit" color="#3D52A0" bg="#ADBBDA">
            Next >
            </Button>
        </form>
        </Box>

        {/* Order Summary */}
        <Box
        flex={1}
        border="2px solid"
        borderColor="#3D52A0"
        borderRadius="md"
        p={4}
        boxShadow="sm"
        height="18rem"
        >
        <Heading size="md" mb={4} color="#3D52A0">
            Order Summary
        </Heading>
        <Divider mb={4} />
        {product ? (
            <>
                <Text mb={2}>Product Name: {product.name}</Text>
                <Text mb={2}>Price: ${product.price}</Text>
                <Text mb={2}>Quantity: 1</Text>
                <Divider my={4} />
                <Text fontWeight="bold">Total: ${product.price}</Text>
            </>
        ) : (
            <Text>No products selected.</Text>
        )}
        </Box>
    </Flex>
  )
}

export default SenderInfo;