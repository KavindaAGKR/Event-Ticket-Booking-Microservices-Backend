import Router from 'express';
import { validateAuth } from '../middlewares/authMiddleware';
import { cancelBooking, createBooking, getAllBookings, getBookingById } from '../controllers/bookingController';

const router = Router();

router.post('/', validateAuth, createBooking);
router.get('/', validateAuth, getAllBookings);
router.get('/:id', validateAuth, getBookingById);
router.put('/cancel/:id', validateAuth,  cancelBooking);

router.get("/health", (req, res) => res.status(200).send("OK"));

export default router;

