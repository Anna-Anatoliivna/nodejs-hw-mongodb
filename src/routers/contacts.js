import express from 'express';
import {
  getContactsContoller,
  getContactContoller,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getContactsContoller);

router.get('/:contactId', getContactContoller);

export default router;
