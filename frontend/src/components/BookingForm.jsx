import React, { useState } from 'react';
import {
  Button, Select, FormControl, FormLabel,
  Input, Stack, Text, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter
} from '@chakra-ui/react';
import api from '../api/api';

export default function BookingForm({ restaurant, isOpen, onClose }) {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState('');
  const [partySize, setPartySize] = useState(1);

  const fetchSlots = () => {
    if (!date) return;
    api.get(`/restaurants/${restaurant._id}/slots?date=${date}`)
      .then(res => setSlots(res.data.slots))
      .catch(() => setSlots([]));
  };

  const handleBook = async () => {
    await api.post('/bookings', {
      restaurantId: restaurant._id,
      datetime: slot,
      partySize
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book at {restaurant.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                onBlur={fetchSlots}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Time Slot</FormLabel>
              <Select
                placeholder="Select slot"
                value={slot}
                onChange={e => setSlot(e.target.value)}
              >
                {slots.map(s => (
                  <option key={s} value={s}>
                    {new Date(s).toLocaleTimeString([], {
                      hour:'2-digit', minute:'2-digit'
                    })}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Party Size</FormLabel>
              <Input
                type="number"
                min={1}
                value={partySize}
                onChange={e => setPartySize(Number(e.target.value))}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme="teal" onClick={handleBook}>Book Table</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
