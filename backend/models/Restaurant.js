import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  manager:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:         { type: String, required: true },
  address:      { type: String, required: true },
  cuisine:      { type: String, required: true },
  phone:        { type: String },
  openingHours: { type: String } // e.g. "10:00-22:00"
}, { timestamps: true });

export default mongoose.model('Restaurant', RestaurantSchema);
