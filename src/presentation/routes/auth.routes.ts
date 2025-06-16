import { Router } from 'express';
import { registerUser } from '../controllers/auth.controller';
import { loginUser } from '../controllers/auth.controller';
import { validateRegistration } from '../middleware/validation';
import { validateLogin } from '../middleware/validation';

const router = Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);

export const authRoutes = router; 