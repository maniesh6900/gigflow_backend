import {Router} from 'express';
import { login, register } from '../controller/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);


export default router; // Use 'export default' for ES modules