import React, {useState} from 'react';
import {Flex, Box, Heading, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';

// import validationSchema from './validations';
import axios from 'axios';

// TODO: show validation errors to users

function Signup() {
 
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      fullName,
      email,
      password,
      confirmPassword
    }

    console.log(data);
  }

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
                  // onBlur={formik.handleBlur}
                  // value={formik.values.fullName}
                  // isInvalid={formik.errors.fullName && formik.touched.fullName}
                />
              </FormControl>
              
              <FormControl mt="4">
                <FormLabel color="#323232">E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" required
                  id="email"
                  // onBlur={formik.handleBlur}
                  // value={formik.values.email}
                  // isInvalid={formik.errors.email && formik.touched.email}
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
                  // onBlur={formik.handleBlur}
                  // value={formik.values.password}
                  // isInvalid={formik.errors.password && formik.touched.password}
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

              {
                message && <p className="#D22B2B">{message}</p>
              }

              <Button mt="6" width="full" type="submit" color="#3D52A0" bg="#ADBBDA">
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