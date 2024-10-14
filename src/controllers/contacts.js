import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export async function getContactsContoller(req, res) {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactContoller(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}
