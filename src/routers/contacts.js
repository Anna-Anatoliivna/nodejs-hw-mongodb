import express from 'express';
import {
  getContactsContoller,
  getContactContoller,
  createContactContoller,
} from '../controllers/contacts.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsContoller));

router.get('/:contactId', ctrlWrapper(getContactContoller));

router.post('/', jsonParser, ctrlWrapper(createContactContoller));

export default router;
