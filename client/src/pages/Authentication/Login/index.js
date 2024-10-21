import React from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import { useFormik } from 'formik';
import validationSchema from './validations';

// TODO: check user data from backend

function Login() {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      // printing out the form
      console.log(values);
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box p={10} border="2px solid" borderColor="#3D52A0" borderRadius="20px">
          <Box textAlign="center">
            <Heading color="#3D52A0">Welcome back!</Heading>
          </Box>
          <Box my={5} textAlign="left">

            <form onSubmit={formik.handleSubmit}>

              <FormControl mt="4">
                <FormLabel color="#323232">E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.errors.email && formik.touched.email}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel color="#323232">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.errors.password && formik.touched.password}
                />
              </FormControl>

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