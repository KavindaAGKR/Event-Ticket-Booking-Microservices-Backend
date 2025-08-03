import express from 'express';
import eventRoutes from './routes/eventRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/events', eventRoutes);



const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


