import React, {useState} from 'react'
import { Box, Flex, Text, Divider, Heading, FormControl, FormLabel, Input, Button, NumberInputField, NumberInput, Textarea} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const [message, setMessage] = useState('');
    const [recipientFullName, setFullName] = useState('');
    const [recipientPhoneNumber, setPhoneNumber] = useState('');
    const [recipientAddress, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cityName, setCityName] = useState('');

    const navigate = useNavigate();

    const handleDeliveryInfo = async (e) => {
        e.preventDefault();
        const data = {
            recipientFullName,
            recipientPhoneNumber,
            recipientAddress,
            zipCode,
            cityName
        }
    
        console.log(data);

        const isSuccess = true; 
        if (isSuccess) {
            // Navigate to sender information page
            navigate('/senderInfo');
        } else {
            setMessage('Failed to submit delivery information. Please try again.');
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
        <form onSubmit={handleDeliveryInfo}>
            <FormControl>
            <FormLabel color="#323232">Recipient's Full Name</FormLabel>
            <Input 
                name="recipientFullName"
                id="recipientFullName"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Recipient's Full Name" required
            />
            </FormControl>
            
            <FormControl mt="4">
            <FormLabel color="#323232">Recipient's Phone Number</FormLabel>
            <NumberInput>
                <NumberInputField
                    name="recipientPhoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(000) 000 00 00" required
                    id="recipientPhoneNumber"
                />
            </NumberInput>
            </FormControl>

            <FormControl mt="4">
            <FormLabel color="#323232">Recipient's Address</FormLabel>
            <Textarea
                name="recipientAddress"
                id="recipientAddress"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Recipient's Address" required
            />
            </FormControl>

            <FormControl mt="4">
            <FormLabel color="#323232">Zip Code</FormLabel>
            <Input
                name="zipCode"
                id="zipCode"
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Zip Code" required
            />
            </FormControl>

            <FormControl mt="4">
            <FormLabel color="#323232">City</FormLabel>
            <Input
                name="cityName"
                id="cityName"
                onChange={(e) => setCityName(e.target.value)}
                placeholder="City" required
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
      >
        <Heading size="md" mb={4} color="#3D52A0">
          Order Summary
        </Heading>
        <Divider mb={4} />
        <Text mb={2}>Product 1: $20.00</Text>
        <Text mb={2}>Product 2: $15.00</Text>
        <Text mb={2}>Shipping: $5.00</Text>
        <Divider my={4} />
        <Text fontWeight="bold">Total: $40.00</Text>
      </Box>
    </Flex>
  )
}

export default Checkout;