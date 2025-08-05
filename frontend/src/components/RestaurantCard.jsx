import React from 'react';
import { Box, Heading, Text, Button, Stack, useColorModeValue } from '@chakra-ui/react';

export default function RestaurantCard({ restaurant, onViewSlots }) {
  return (
    <Box
      bg={useColorModeValue('white','gray.700')}
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow:'lg' }}
      transition="box-shadow 0.2s"
    >
      <Box p={4}>
        <Stack spacing={2}>
          <Heading size="md">{restaurant.name}</Heading>
          <Text fontSize="sm" color="gray.500">{restaurant.address}</Text>
          <Text>
            <Text as="span" fontWeight="bold">Cuisine:</Text> {restaurant.cuisine}
          </Text>
        </Stack>
      </Box>
      {onViewSlots && (
        <Box bg="teal.50" p={4} textAlign="center">
          <Button colorScheme="teal" onClick={onViewSlots}>
            View Available Slots
          </Button>
        </Box>
      )}
    </Box>
  );
}
