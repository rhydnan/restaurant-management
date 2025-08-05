import Booking from '../models/Booking.js';
import Restaurant from '../models/Restaurant.js';

// Customer books a slot
export async function createBooking(req, res) {
  try {
    const { restaurantId, datetime, partySize } = req.body;
    await Restaurant.findById(restaurantId).orFail();
    const b = await Booking.create({
      customer: req.user.id,
      restaurant: restaurantId,
      datetime,
      partySize
    });
    res.status(201).json(b);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// List bookings
export async function listBookings(req, res) {
  if (req.user.role === 'manager') {
    const all = await Booking.find()
      .populate('restaurant','name manager')
      .populate('customer','name email');
    const ours = all.filter(b => String(b.restaurant.manager) === req.user.id);
    return res.json(ours);
  }
  // customer
  const mine = await Booking.find({ customer: req.user.id })
    .populate('restaurant','name address')
    .populate('customer','name');
  res.json(mine);
}

// Confirm or cancel booking
export async function updateBooking(req, res) {
  const { status } = req.body; // confirmed or canceled
  if (!['confirmed','canceled'].includes(status))
    return res.status(400).json({ error: 'Invalid status' });

  try {
    const b = await Booking.findById(req.params.id)
      .populate('restaurant','manager');
    if (!b) return res.status(404).json({ error: 'Not found' });

    if (req.user.role === 'manager') {
      if (String(b.restaurant.manager) !== req.user.id)
        return res.status(403).json({ error: 'Forbidden' });
    } else {
      // customer can only cancel
      if (b.customer.toString() !== req.user.id || status !== 'canceled')
        return res.status(403).json({ error: 'Forbidden' });
    }

    b.status = status;
    await b.save();
    res.json(b);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
