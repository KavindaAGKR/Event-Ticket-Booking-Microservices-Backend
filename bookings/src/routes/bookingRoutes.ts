import Router from 'express';
import { validateAuth } from '../middlewares/authMiddleware';
import { cancelBooking, createBooking, getAllBookings, getBookingById } from '../controllers/bookingController';

const router = Router();

router.post('/', validateAuth, createBooking);
router.get('/', validateAuth, getAllBookings);
router.get('/:id', validateAuth, getBookingById);
router.put('/cancel/:id', validateAuth,  cancelBooking);

export default router;

