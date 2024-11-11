import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../models/session.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createSession } from '../utils/createSession.js';
import createHttpError from 'http-errors';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });
export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return await UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};

export const createActiveSession = async (userId) => {
  await SessionsCollection.deleteOne({ userId });
  const session = createSession();
  return SessionsCollection.create({ ...session, userId });
};

export const findSessionByToken = (token) =>
  SessionsCollection.findOne({ accessToken: token });

export const findUserById = (userId) => UsersCollection.findById(userId);

export const logoutUser = async (sessionId, refreshToken) => {
  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  const user = await findUserById(session.userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  await SessionsCollection.findOneAndDelete({ _id: sessionId });
  const newSession = createSession();
  return await SessionsCollection.create({ userId: user._id, ...newSession });
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');    
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );

  // await sendEmail({
  //   from: env(SMTP.SMTP_FROM),
  //   to: email,
  //   subject: 'Reset your password',
  //   html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  // });
};