import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Contact = model('Contact', contactsSchema);

// {
// "name": "Liza Moor",
// "phoneNumber": "(515)2345576",
// "email": "liz@gmail.com",
// "isFavourite": true
// }