import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['manager','customer'], required: true }
}, { timestamps: true });

// Registration helper
UserSchema.statics.register = async function({ name, email, password, role }) {
  if (!name||!email||!password||!role) throw new Error('All fields required');
  if (!['manager','customer'].includes(role)) throw new Error('Invalid role');
  if (password.length<6) throw new Error('Password must be ≥6 chars');
  if (await this.exists({ email })) throw new Error('Email in use');
  const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS));
  return this.create({ name, email, passwordHash: hash, role });
};

// Password check
UserSchema.methods.compare = function(p) {
  return bcrypt.compare(p, this.passwordHash);
};

export default mongoose.model('User', UserSchema);
