import React from 'react'
import { CheckCircleIcon } from '@chakra-ui/icons'; 
import { Box, Flex, Text } from '@chakra-ui/react';


function PaymentConfirmed() {
  return (
    <Flex
      mt={20}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="500px"
        height="200px"
        color="white"
        display="flex"
        borderRadius="md"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        p={4}
      >
        <CheckCircleIcon w={40} h={40} color="#3D52A0" mb={3}/>
        <Text color="#323232" fontSize='3xl'>Thank you for your purchase!</Text>
        <Text color="#323232" fontSize='xl'>Order Number: 0000</Text>
      </Box>
    </Flex>
  )
}

export default PaymentConfirmed