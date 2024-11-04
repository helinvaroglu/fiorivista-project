import React, {useState} from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

// import validationSchema from './validations';

// TODO: do validations

function Login() {

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }

    console.log(data);
  }
  

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box p={10} border="2px solid" borderColor="#3D52A0" borderRadius="20px">
          <Box textAlign="center">
            <Heading color="#3D52A0">Welcome back!</Heading>
          </Box>
          <Box my={5} textAlign="left">

            <form onSubmit={handleLogin}>

              <FormControl mt="4">
                <FormLabel color="#323232">Email Address</FormLabel>
                <Input
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" required
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

              {
                message && <p className="#D22B2B">{message}</p>
              }

              <Button mt="6" width="full" type="submit" color="#3D52A0" bg="#ADBBDA">
                Log in
              </Button>
            </form>

          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Login;