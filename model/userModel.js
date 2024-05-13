const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    accountInfo: {
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: (email) => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
          },
          message: "Invalid email format",
        },
      },

      registrationDate: {
        type: Date,
        default: Date.now,
      },
      lastLogin: {
        type: Date,
        default: Date.now,
      },
      role: {
        type: Number, // use an enum or string for specific roles
        default: 0, // 0- User , 1 - Mod , 2 - Admin , 3 - debug
        required: true,
      },
      twoFactorAuthentication: {
        type: Boolean,
        default: false,
      },
      isBanned: {
        type: Boolean,
        required: true,
        default: false,
      },
      profilePicture: {
        type: String,
      }, // path para imagem
    },
    personalInfo: {
      firstName: {
        type: String,
      }, // optional
      lastName: {
        type: String,
      }, // optional
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      }, // optional
      location: {
        country: String,
        city: String,
      }, // optional
      contactInfo: {
        phoneNumber: String,
        address: String,
      }, // optional
      dateOfBirth: Date, // optional
    },
    recipes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(passportLocalMongoose);

  module.exports = mongoose.model('user', userSchema);
  