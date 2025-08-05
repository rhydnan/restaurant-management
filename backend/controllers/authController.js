import User from '../models/User.js';
import jwt from 'jsonwebtoken';

function genToken(u) {
  return jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
}

export async function register(req, res) {
  try {
    const u = await User.register(req.body);
    const token = genToken(u);
    res.status(201).json({
      token,
      user: { id: u._id, name: u.name, email: u.email, role: u.role }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u || !(await u.compare(password)))
      return res.status(401).json({ error: 'Invalid credentials' });
    const token = genToken(u);
    res.json({
      token,
      user: { id: u._id, name: u.name, email: u.email, role: u.role }
    });
  } catch {
    res.status(500).json({ error: 'Login failed' });
  }
}
