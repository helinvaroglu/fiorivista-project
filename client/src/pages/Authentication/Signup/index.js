import React, {useState} from 'react';
import {Flex, Box, Heading, FormControl, FormLabel, Input, Button, Text} from '@chakra-ui/react';
import { useRegisterUserMutation } from './api';

// import validationSchema from './validations';
import axios from 'axios';


function Signup() {
 
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [registerUser, { isLoading }] = useRegisterUserMutation();
 
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return; // Prevent API call if passwords don't match
    }

    const data = {
      fullName,
      email,
      password,
      confirmPassword
    }

    try {
      const response = await registerUser(data).unwrap();
      setMessage(response.message || 'Signup successful!');
    } catch (error) {
      setMessage(error.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box p={10} border="2px solid" borderColor="#3D52A0" borderRadius="20px">
          <Box textAlign="center">
            <Heading color="#3D52A0">New customer? Sign up.</Heading>
          </Box>
          <Box my={5} textAlign="left">

            <form onSubmit={handleSignup}>

              <FormControl>
                <FormLabel color="#323232">Full Name</FormLabel>
                <Input 
                  name="fullName"
                  id="fullName"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name" required
                />
              </FormControl>
              
              <FormControl mt="4">
                <FormLabel color="#323232">E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" required
                  id="email"
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel color="#323232">Password</FormLabel>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" required
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel color="#323232">Confirm password</FormLabel>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password" required
                  // onBlur={formik.handleBlur}
                  // value={formik.values.reenterPassword}
                  // isInvalid={formik.errors.reenterPassword && formik.touched.reenterPassword}
                />
              </FormControl>

              {message && <Text color={message.includes('success') ? 'green' : 'red'} mt="4">{message}</Text>}

              <Button mt="6" width="full" type="submit" color="#3D52A0" bg="#ADBBDA" isLoading={isLoading} loadingText="Signing up...">
                Sign up
              </Button>
            </form>

          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signup;