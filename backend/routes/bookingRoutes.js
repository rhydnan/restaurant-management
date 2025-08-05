import express from 'express';
import auth from '../middleware/auth.js';
import { permit } from '../middleware/roles.js';
import {
  createBooking,
  listBookings,
  updateBooking
} from '../controllers/bookingController.js';

const r = express.Router();

r.post('/', auth, permit('customer'), createBooking);
r.get('/', auth, permit('manager','customer'), listBookings);
r.patch('/:id', auth, permit('manager','customer'), updateBooking);

export default r;
