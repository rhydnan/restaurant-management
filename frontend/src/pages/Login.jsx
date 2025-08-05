import React, { useState } from 'react';
import {
  Flex, Box, Heading, FormControl,
  FormLabel, Input, Button, Text
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [creds, setCreds] = useState({ email:'', password:'' });
  const { login } = useAuth();
  const nav = useNavigate();

  const handle = async () => {
    await login(creds.email, creds.password);
    nav('/');
  };

  return (
    <Flex align="center" justify="center" minH="80vh" bg="gray.50" p={4}>
      <Box w="100%" maxW="md" p={8} bg="white" boxShadow="lg" borderRadius="md">
        <Heading mb={6}>Sign In</Heading>

        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={creds.email}
            onChange={e=>setCreds({...creds,email:e.target.value})}
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={creds.password}
            onChange={e=>setCreds({...creds,password:e.target.value})}
          />
        </FormControl>

        <Button colorScheme="teal" w="full" onClick={handle}>Sign In</Button>

        <Text mt={4} textAlign="center">
          Don’t have an account?{' '}
          <Link to="/register" color="teal.500">Sign Up</Link>
        </Text>
      </Box>
    </Flex>
  );
}
