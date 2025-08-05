// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  SimpleGrid,
  Text,
  Button,
  Spinner,
  Center
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import RestaurantCard from '../components/RestaurantCard';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]); // ← start as []
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/restaurants')
      .then(res => {
        if (!Array.isArray(res.data)) {
          console.error('Unexpected payload:', res.data);
          setError('Unexpected response from server.');
          return;
        }
        setRestaurants(res.data);
      })
      .catch(() => setError('Failed to load restaurants.'));
  }, []);

  // show loading while array is still empty and no error
  if (restaurants.length === 0 && !error) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6} textAlign="center">
        Explore Restaurants
      </Heading>

      {error && (
        <Text color="red.500" mb={4} textAlign="center">
          {error}
        </Text>
      )}

      {restaurants.length > 0 ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {restaurants.map(r => (
            <RestaurantCard
              key={r._id}
              restaurant={r}
              onViewSlots={null}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text textAlign="center">No restaurants available.</Text>
      )}

      
    </Container>
  );
}
