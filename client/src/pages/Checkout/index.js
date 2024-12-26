import React, {useState} from 'react'
import { Box, Flex, Text, Divider, Heading, FormControl, FormLabel, Input, Button, NumberInputField, NumberInput, Textarea} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateRecipient } from '../../redux/features/RecipientInfo/recipientSlice';

function Checkout() {
    const [message, setMessage] = useState('');
    const [recipientFullName, setFullName] = useState('');
    const [recipientPhoneNumber, setPhoneNumber] = useState('');
    const [recipientAddress, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [cityName, setCityName] = useState('');
    const [order, setOrder] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.orderData;
    const dispatch = useDispatch();

    console.log(product)

    const handleDeliveryInfo = async (e) => {
        e.preventDefault();
        const data = {
            recipientFullName,
            recipientPhoneNumber,
            recipientAddress,
            zipCode,
            cityName
        }

        dispatch(updateRecipient(data));

        try {
          // Get orderId from the product object
          const orderId = product?.productId;
          if (!orderId) {
              setMessage("Order ID is missing.");
              return;
          }

          const response = await fetch(`http://localhost:5000/api/orders/updateRecipient/${orderId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Response Error:", errorData);
            throw new Error(errorData.error || "Failed to update recipient details.");
          }

          const updatedOrder = await response.json();
          console.log("Updated order:", updatedOrder);

          // Navigate to sender information page
          navigate("/senderinformation", { state: { updatedOrder } });
      } catch (err) {
          console.error(err);
          setMessage("Failed to submit delivery information. Please try again.");
      }
    };

    const displayProduct = product || order;

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
        height="18rem"
      >
        <Heading size="md" mb={4} color="#3D52A0">
          Order Summary
        </Heading>
        <Divider mb={4} />
        {displayProduct ? (
          <>
              <Text mb={2}>Product Name: {displayProduct.productName}</Text>
              <Text mb={2}>Price: {displayProduct.price} TL</Text>
              <Text mb={2}>Quantity: 1</Text>
              <Divider my={4} />
              <Text fontWeight="bold">Total: {displayProduct.price} TL</Text>
          </>
        ) : (
          <Text>No products selected.</Text>
        )}
      </Box>
    </Flex>
  )
}

export default Checkout;