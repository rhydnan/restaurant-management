import React from 'react';
import { Box, Text, Link, Stack, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" bg={useColorModeValue('gray.100','gray.900')} py={6}>
      <Stack spacing={4} align="center" maxW="6xl" mx="auto">
        <Text fontSize="sm" color="gray.500">
          &copy; {new Date().getFullYear()} RestaurantMgmt. All rights reserved.
        </Text>
        <Stack direction="row" spacing={4}>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Privacy</Link>
        </Stack>
      </Stack>
    </Box>
  );
}
