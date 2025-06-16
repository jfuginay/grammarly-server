import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} from '../controllers/document.controller';
import { validateDocument } from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.post('/', validateDocument, createDocument);
router.get('/', getDocuments);
router.get('/:id', getDocument);
router.put('/:id', validateDocument, updateDocument);
router.delete('/:id', deleteDocument);

export const documentRoutes = router; 