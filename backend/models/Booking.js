import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  customer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  datetime:   { type: Date, required: true },
  partySize:  { type: Number, default: 1 },
  status:     { type: String, enum: ['pending','confirmed','canceled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);
