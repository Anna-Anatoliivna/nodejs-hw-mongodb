import express from 'express';
import {
  getContactsContoller,
  getContactContoller,
  createContactContoller,
  deleteContactContoller,
  updateContactContoller,
} from '../controllers/contacts.js';
import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';


const router = express.Router();
const jsonParser = express.json();

router.use(authenticate);
router.get('/', ctrlWrapper(getContactsContoller));

router.get('/:contactId', isValidId, ctrlWrapper(getContactContoller));

router.post(
  '/',
  upload.single("photo"),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactContoller),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactContoller));

router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  validateBody(patchContactSchema),
  ctrlWrapper(updateContactContoller),
);

export default router;
