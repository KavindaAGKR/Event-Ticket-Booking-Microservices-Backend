import express from 'express';

import dotenv from 'dotenv';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/bookings', bookingRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


