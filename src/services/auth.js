import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../models/session.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';

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
