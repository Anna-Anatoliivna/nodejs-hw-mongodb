import express from 'express';
import {
  getContactsContoller,
  getContactContoller,
} from '../controllers/contacts.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContactsContoller));

router.get('/:contactId', ctrlWrapper(getContactContoller));

export default router;
