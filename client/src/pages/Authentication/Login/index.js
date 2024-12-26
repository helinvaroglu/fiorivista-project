import React, {useState} from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from './api'; 
import { setUser } from '../../../redux/features/Auth/authslice'; 
import { useNavigate } from 'react-router-dom';

function Login() {

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    const data = {
      email,
      password
    }

    try {
      const response = await loginUser(data).unwrap();

      dispatch(setUser({ user: response.user, token: response.token }));
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      setMessage('Login successful!');
      navigate('/'); 
    } catch (error) {
      setMessage(error.data?.message || 'An error occurred during login.');
    }
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

              {message && (
                <Text color={message.includes('successful') ? 'green' : 'red'} mt="4">
                  {message}
                </Text>
              )}

              <Button mt="6" width="full" type="submit" color="#3D52A0" bg="#ADBBDA" isLoading={isLoading} loadingText="Logging in...">
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