import React, { useState, useEffect } from 'react';
import {
  Container, Box, Heading, Stack, FormControl,
  FormLabel, Input, Button, Flex, IconButton,
  useToast, Divider, HStack, Text
} from '@chakra-ui/react';
import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import api from '../api/api';

export default function ManagerDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({
    name:'', address:'', cuisine:'', phone:'', openingHours:''
  });
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  const fetchRestaurants = async () => {
    try {
      const res = await api.get('/restaurants');
      setRestaurants(res.data);
    } catch {
      toast({ status: 'error', title: 'Load failed' });
    }
  };

  useEffect(() => { fetchRestaurants(); }, []);

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await api.put(`/restaurants/${editingId}`, form);
        toast({ status: 'success', title: 'Updated' });
      } else {
        await api.post('/restaurants', form);
        toast({ status: 'success', title: 'Created' });
      }
      setForm({ name:'',address:'',cuisine:'',phone:'',openingHours:'' });
      setEditingId(null);
      fetchRestaurants();
    } catch (err) {
      toast({ status: 'error', title: err.response?.data?.error || 'Error' });
    }
  };

  const handleEdit = r => {
    setForm({
      name: r.name,
      address: r.address,
      cuisine: r.cuisine,
      phone: r.phone,
      openingHours: r.openingHours
    });
    setEditingId(r._id);
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/restaurants/${id}`);
      toast({ status: 'info', title: 'Deleted' });
      fetchRestaurants();
    } catch {
      toast({ status: 'error', title: 'Delete failed' });
    }
  };

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={4}>Manage Your Restaurants</Heading>

      <Box mb={6} p={4} bg="white" boxShadow="sm" borderRadius="md">
        <Heading size="sm" mb={4}>
          {editingId ? 'Edit Restaurant' : 'New Restaurant'}
        </Heading>
        <Stack spacing={3}>
          {['name','address','cuisine','phone','openingHours'].map(f => (
            <FormControl key={f}>
              <FormLabel textTransform="capitalize">
                {f==='openingHours'?'Opening Hours (HH:MM-HH:MM)':f}
              </FormLabel>
              <Input
                value={form[f]}
                onChange={e=>setForm({...form,[f]:e.target.value})}
                placeholder={f==='openingHours'?'10:00-22:00':`Enter ${f}`}
              />
            </FormControl>
          ))}
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {editingId?'Update':'Create'}
            </Button>
            {editingId && (
              <Button onClick={()=>{
                setEditingId(null);
                setForm({name:'',address:'',cuisine:'',phone:'',openingHours:''});
              }}>
                Cancel
              </Button>
            )}
          </HStack>
        </Stack>
      </Box>

      <Divider mb={6} />

      <Heading size="md" mb={4}>Your Restaurants</Heading>
      <Stack spacing={4}>
        {restaurants.length===0 && <Text>No restaurants yet</Text>}
        {restaurants.map(r=>(
          <Flex
            key={r._id}
            p={4}
            bg="white"
            boxShadow="sm"
            borderRadius="md"
            align="center"
            justify="space-between"
          >
            <Box>
              <Text fontWeight="bold">{r.name}</Text>
              <Text fontSize="sm" color="gray.600">{r.address}</Text>
            </Box>
            <HStack spacing={2}>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                aria-label="Edit"
                onClick={()=>handleEdit(r)}
              />
              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                aria-label="Delete"
                onClick={()=>handleDelete(r._id)}
              />
            </HStack>
          </Flex>
        ))}
      </Stack>
    </Container>
  );
}
