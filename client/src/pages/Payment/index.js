import React, {useState} from 'react'
import { Select, Box, Flex, Text, Divider, Heading, FormControl, FormLabel, Input, Button, NumberInputField, NumberInput, ButtonGroup, Spacer} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const [message, setMessage] = useState('');
    const [cardFullName, setFullName] = useState('');
    const [cardNumber, setNumber] = useState('');
    const [expDateMonth, setExpDateMonth] = useState('');
    const [expDateYear, setExpDateYear] = useState('');
    const [cvcNumber, setCvcNumber] = useState('');



    const navigate = useNavigate();

    const handleCardInfo = async (e) => {
        e.preventDefault();
        const data = {
            cardFullName,
            cardNumber,
            expDateMonth,
            expDateYear,
            cvcNumber
        }
    
        console.log(data);

        const isSuccess = true; 
        if (isSuccess) {
            // Navigate to payment page
            navigate('/paymentconfirmed');
        } else {
            setMessage('Failed to submit card information. Please try again.');
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
                Card Information
            </Heading>
            <Divider mb={4} />
            <form onSubmit={handleCardInfo}>
                <FormControl>
                <FormLabel color="#323232">Full Name on Card</FormLabel>
                <Input 
                    name="cardFullName"
                    id="cardFullName"
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name" required
                />
                </FormControl>
                
                <FormControl mt="4">
                <FormLabel color="#323232">Card Number</FormLabel>
                <NumberInput>
                    <NumberInputField
                        name="cardNumber"
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="**** **** **** ****" required
                        id="cardNumber"
                    />
                </NumberInput>
                </FormControl>

                <FormControl mt="4">
                <FormLabel color="#323232">Expiration Date</FormLabel>
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                    <ButtonGroup gap='2'>
                        <Select id="month" placeholder='Month' required>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1 < 10 ? `0${i + 1}` : i + 1}
                            </option>
                        ))}
                        </Select>
                        <Select id="year" placeholder='Year'>
                        {Array.from({ length: 15 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                                <option key={year} value={year}>
                                {year}
                                </option>
                            );
                        })}
                        </Select>
                    </ButtonGroup>
                </Flex>
                </FormControl>
    
                <FormControl mt="4">
                <FormLabel color="#323232">CVV/CVC</FormLabel>
                <NumberInput>
                    <NumberInputField
                        name="cvcNumber"
                        onChange={(e) => setCvcNumber(e.target.value)}
                        placeholder="***" required
                        id="cvcNumber"
                    />
                </NumberInput>
                </FormControl>
    
    
                {
                message && <p className="#D22B2B">{message}</p>
                }
    
                <Button mt="6" width="full" type="submit" color="#3D52A0" bg="#ADBBDA">
                Finish Order
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

export default Payment;