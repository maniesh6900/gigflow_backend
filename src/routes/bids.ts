import {Router} from 'express';
import { createBid, getBidsForGig, getMyBids, hireBid } from '../controller/bidController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, createBid);
router.get('/:gigId', authenticate, getBidsForGig);
router.patch('/:bidId/hire', authenticate, hireBid);
router.get('/my-bids', authenticate, getMyBids);

export default router;