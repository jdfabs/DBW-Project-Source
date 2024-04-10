const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: (email) => {
            return /^[\w\.-]+@([\w-]+\.)+[.\w]{2,}$/g.test(email);
          },
          message: 'Invalid email format',
        },
      },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture: {
      type: Buffer,
    }, // or use a URL instead
    dateOfBirth: Date, // optional
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    }, // optional
    location: {
      country: String,
      city: String,
    }, // optional
    contactInfo: {
      phoneNumber: String,
      address: String,
    }, // optional
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    lastLogin: Date,
    role: {
      type: Number, // use an enum or string for specific roles
      required: true,
    },
    twoFactorAuthentication: {
      type: Boolean,
      default: false,
    },
    preferredLanguage: {
      type: String,
      enum: ['en', 'es', 'fr', ...], // add as many options as needed
    },
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('User', UserSchema);
  