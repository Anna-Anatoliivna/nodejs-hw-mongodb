import express from 'express';
import { Router } from 'express';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const router = Router();
const jsonParser = express.json();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshSessionController));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default router;
