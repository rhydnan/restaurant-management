import Restaurant from '../models/Restaurant.js';
import Booking from '../models/Booking.js';

/** Helper to generate 1h slots */
function generateSlots(hours, date) {
  const [open, close] = hours.split('-');
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  const slots = [];
  let current = new Date(`${date}T${open}:00`);
  const end = new Date(`${date}T${close}:00`);
  while (current < end) {
    slots.push(new Date(current));
    current = new Date(current.getTime() + 60 * 60 * 1000);
  }
  return slots;
}

// Create (manager)
export async function createRestaurant(req, res) {
  try {
    const doc = await Restaurant.create({ ...req.body, manager: req.user.id });
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// List all (public)
export async function listRestaurants(req, res) {
  const list = await Restaurant.find().populate('manager','name');
  res.json(list);
}

// Get one (public)
export async function getRestaurant(req, res) {
  try {
    const doc = await Restaurant.findById(req.params.id).populate('manager','name');
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
}

// Available slots on a given date (customer & manager)
export async function getAvailableSlots(req, res) {
  const { date } = req.query; // YYYY-MM-DD
  if (!date) return res.status(400).json({ error: 'date=YYYY-MM-DD required' });

  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Restaurant not found' });

    const slots = generateSlots(r.openingHours, date);
    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd   = new Date(`${date}T23:59:59`);
    const bookings = await Booking.find({
      restaurant: r._id,
      datetime: { $gte: dayStart, $lte: dayEnd },
      status: { $ne: 'canceled' }
    });

    const booked = new Set(bookings.map(b => b.datetime.toISOString()));
    const available = slots.filter(s => !booked.has(s.toISOString()));

    res.json({ date, slots: available });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Update (manager & owner)
export async function updateRestaurant(req, res) {
  try {
    const doc = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, manager: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ error: 'Not found or unauthorized' });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

// Delete (manager & owner)
export async function deleteRestaurant(req, res) {
  const doc = await Restaurant.findOneAndDelete({
    _id: req.params.id,
    manager: req.user.id
  });
  if (!doc) return res.status(404).json({ error: 'Not found or unauthorized' });
  res.json({ message: 'Deleted' });
}
