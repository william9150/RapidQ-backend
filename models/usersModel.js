import mongoose from 'mongoose';
import usersSchema from '../schema/users.js';

const Users = mongoose.model('Users', usersSchema);

export default Users;

/**
 * Checks if email already exists
 * @param {email} email
 * @returns {(boolean|Object)} True if doc existing, false otherwise
 */
export async function checkExisting(email) {
  const match = await Users.findOne({ email });
  return match;
}
