import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign="center" py={20}>
      <Heading>404 – Page Not Found</Heading>
      <Text mt={4}>The page you’re looking for doesn’t exist.</Text>
      <Button as={Link} to="/" mt={6} colorScheme="teal">
        Go Home
      </Button>
    </Box>
  );
}
