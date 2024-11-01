import { UsersCollection } from '../models/user.js';
import bcrypt from 'bcrypt';

export const findUserByEmail = (email) => UsersCollection.findOne({ email });
export const createUser = async (userData) => {
  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  return await UsersCollection.create({
    ...userData,
    password: encryptedPassword,
  });
};
