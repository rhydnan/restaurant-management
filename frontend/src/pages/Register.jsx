import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Text,
  Select
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      // err.response.data.error holds your server message
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="8">
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <FormControl mb="4" isInvalid={error === 'All fields required'}>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {error === 'All fields required' && (
            <FormErrorMessage>Please enter your name.</FormErrorMessage>
          )}
        </FormControl>

        {/* Email */}
        <FormControl mb="4" isInvalid={['All fields required', 'Email in use'].includes(error)}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {error === 'All fields required' && (
            <FormErrorMessage>Please enter your email.</FormErrorMessage>
          )}
          {error === 'Email in use' && (
            <FormErrorMessage>This email is already registered.</FormErrorMessage>
          )}
        </FormControl>

        {/* Password */}
        <FormControl mb="4" isInvalid={['All fields required', 'Password must be ≥6 chars'].includes(error)}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {error === 'All fields required' && (
            <FormErrorMessage>Please enter a password.</FormErrorMessage>
          )}
          {error === 'Password must be ≥6 chars' && (
            <FormErrorMessage>Password must be at least 6 characters.</FormErrorMessage>
          )}
        </FormControl>

        {/* Role */}
        <FormControl mb="4" isInvalid={['All fields required', 'Invalid role'].includes(error)}>
          <FormLabel>Role</FormLabel>
          <Select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
          </Select>
          {error === 'All fields required' && (
            <FormErrorMessage>Please select a role.</FormErrorMessage>
          )}
          {error === 'Invalid role' && (
            <FormErrorMessage>Role must be “manager” or “customer.”</FormErrorMessage>
          )}
        </FormControl>

        {/* Fallback general error */}
        {error &&
          !['All fields required', 'Email in use', 'Password must be ≥6 chars', 'Invalid role'].includes(error) && (
          <Text color="red.500" mb="4">{error}</Text>
        )}

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
          width="full"
        >
          Register
        </Button>
      </form>
    </Box>
  );
}
