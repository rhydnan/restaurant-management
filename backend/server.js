import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import authRoutes      from './routes/authRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import bookingRoutes    from './routes/bookingRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5000' }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.get('/api/health', (_req, res) => res.json({ status: 'OK' }));

app.use('/api/auth',       authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/bookings',    bookingRoutes);


console.log(process.env.MONGO_URI);
app.get("/", (req,res) =>{
    res.send("server is ready")
});

app.listen(5000, () => {
    connectDB();
    console.log("server started http://localhost:5000")
});

console.log('JWT_SECRET is:', process.env.JWT_SECRET);

// rhydnantabassum
// Z7vYOiqL2yCkWGE6