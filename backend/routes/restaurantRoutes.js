import express from 'express';
import auth from '../middleware/auth.js';
import { permit } from '../middleware/roles.js';
import {
  createRestaurant,
  listRestaurants,
  getRestaurant,
  getAvailableSlots,
  updateRestaurant,
  deleteRestaurant
} from '../controllers/restaurantController.js';

const r = express.Router();

r.get('/', listRestaurants);
r.get('/:id', getRestaurant);
r.get('/:id/slots', auth, permit('customer','manager'), getAvailableSlots);
r.post('/', auth, permit('manager'), createRestaurant);
r.put('/:id', auth, permit('manager'), updateRestaurant);
r.delete('/:id', auth, permit('manager'), deleteRestaurant);

export default r;
