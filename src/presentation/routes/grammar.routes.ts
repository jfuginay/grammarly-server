import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { checkGrammar } from '../controllers/grammar.controller';
import { validateGrammarCheck } from '../middleware/validation';

const router = Router();

router.use(authenticate);
router.post('/check', validateGrammarCheck, checkGrammar);

export const grammarRoutes = router; 