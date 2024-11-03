import { Contact } from '../models/contact.js';

export const getAllContacts = async ({ userId, page, perPage, sortBy, sortOrder }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const [total, contacts] = await Promise.all([
    Contact.countDocuments(),
    Contact.find({userId})
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(total / perPage);
  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findById(contactId, userId);
  return contact;
};

export const createContact = async (newContact, userId) => {
  const contact = await Contact.create({ userId, ...newContact });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findByIdAndDelete(contactId, userId);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );
  return contact;
};
