import React from 'react';
import {
  Box, Flex, Spacer, Button, Link, Heading,
  HStack, IconButton, useColorMode, Text
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="nav" bg={colorMode==='light'?'white':'gray.800'} px={6} boxShadow="sm">
      <Flex maxW="8xl" mx="auto" h={16} align="center">
        <Heading size="md" color="teal.500" mr={8}>
          RestaurantMgmt
        </Heading>
        <HStack spacing={6}>
          <Link as={RouterLink} to="/">Home</Link>
          {!user ? (
            <>
              <Button as={RouterLink} to="/login" variant="ghost" size="sm">Login</Button>
              <Button as={RouterLink} to="/register" colorScheme="teal" size="sm">Sign Up</Button>
            </>
          ) : (
            <>
              <Text fontSize="sm">{user.name}</Text>
              <Button onClick={logout} variant="outline" size="sm">Logout</Button>
            </>
          )}
          <IconButton
            aria-label="Toggle theme"
            icon={colorMode==='light'?<FaMoon/>:<FaSun/>}
            onClick={toggleColorMode}
            size="sm"
          />
        </HStack>
        <Spacer />
      </Flex>
    </Box>
);
}
