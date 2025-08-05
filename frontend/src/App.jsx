import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ManagerDashboard from './pages/ManagerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

function Protected({ children, allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Box
        as="main"
        bg={useColorModeValue('gray.50','gray.800')}
        minH="calc(100vh - 128px)"
        py={8}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/manager"
            element={
              <Protected allowedRoles={['manager']}>
                <ManagerDashboard />
              </Protected>
            }
          />

          <Route
            path="/customer"
            element={
              <Protected allowedRoles={['customer']}>
                <CustomerDashboard />
              </Protected>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}
