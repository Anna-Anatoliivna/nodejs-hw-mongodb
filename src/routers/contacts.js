import express from 'express';
import {
  getContactsContoller,
  getContactContoller,
  createContactContoller,
  deleteContactContoller,
  updateContactContoller,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';


const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsContoller));

router.get('/:contactId', isValidId, ctrlWrapper(getContactContoller));

router.post('/', jsonParser, ctrlWrapper(createContactContoller));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactContoller));

router.patch('/:contactId', isValidId, jsonParser, ctrlWrapper(updateContactContoller));

export default router;
