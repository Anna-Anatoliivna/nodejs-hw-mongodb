import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function getContactsContoller(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { _id: userId } = req.user;
  const data = await getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
}

export async function getContactContoller(req, res) {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactContoller(req, res) {
  const { _id: userId } = req.user;
  const newContact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const result = await createContact(newContact, userId);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function deleteContactContoller(req, res) {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const result = await deleteContact(contactId, userId);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
}

export async function updateContactContoller(req, res) {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, userId);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
