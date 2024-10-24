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
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';


const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsContoller));

router.get('/:contactId', isValidId, ctrlWrapper(getContactContoller));

router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactContoller),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactContoller));

router.patch('/:contactId', isValidId, jsonParser, ctrlWrapper(updateContactContoller));

export default router;
