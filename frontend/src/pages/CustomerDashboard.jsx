import React, { useState, useEffect } from 'react';
import {
  Container, Heading, SimpleGrid, Spinner,
  Center, Text, useDisclosure
} from '@chakra-ui/react';
import api from '../api/api';
import RestaurantCard from '../components/RestaurantCard';
import BookingForm from '../components/BookingForm';

export default function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/restaurants')
      .then(res=>setRestaurants(res.data))
      .catch(console.error);
  }, []);

  if (restaurants===null) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="teal.500"/>
      </Center>
    );
  }

  if (restaurants.length===0) {
    return (
      <Center py={10}>
        <Text>No restaurants available.</Text>
      </Center>
    );
  }

  const handleView = r => {
    setSelected(r);
    onOpen();
  };

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6}>Available Restaurants</Heading>

      <SimpleGrid columns={[1,2,3]} spacing={6}>
        {restaurants.map(r=>(
          <RestaurantCard
            key={r._id}
            restaurant={r}
            onViewSlots={()=>handleView(r)}
          />
        ))}
      </SimpleGrid>

      {selected && (
        <BookingForm
          restaurant={selected}
          isOpen={isOpen}
          onClose={()=>{
            setSelected(null);
            onClose();
          }}
        />
      )}
    </Container>
  );
}
