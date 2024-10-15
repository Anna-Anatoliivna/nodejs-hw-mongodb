import express from 'express';
import {
  getContactsContoller,
  getContactContoller,
  createContactContoller,
  deleteContactContoller,
  updateContactContoller,
} from '../controllers/contacts.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsContoller));

router.get('/:contactId', ctrlWrapper(getContactContoller));

router.post('/', jsonParser, ctrlWrapper(createContactContoller));

router.delete('/:contactId', ctrlWrapper(deleteContactContoller));

router.patch('/:contactId', jsonParser, ctrlWrapper(updateContactContoller));

export default router;
