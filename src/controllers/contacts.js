import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
} from '../services/contacts.js';
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

export async function createContactContoller(req, res) {
  const newContact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const result = await createContact(newContact);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function deleteContactContoller(req, res) {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);

   if (!result) {
     throw createHttpError(404, 'Contact not found');
   }
   res.status(204).send();
  // console.log({ result });
}
