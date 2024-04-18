const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
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
    },// optional
    firstName: {
      type: String,          
    },// optional
    lastName: {
      type: String,
    },// optional
    profilePicture: {
      type: String,
    }, // path para imagem
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
      default: 0, // 0- User , 1 - Mod , 2 - Admin , 3 - debug
      required: true,
    },
    twoFactorAuthentication: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('User', UserSchema);
  