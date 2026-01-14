import {Router} from 'express';
import { createGig, getAllGigs, getMyGigs } from '../controller/gigController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getAllGigs);
router.post('/', authenticate, createGig);
router.get('/my-gigs', authenticate, getMyGigs);

export default router;