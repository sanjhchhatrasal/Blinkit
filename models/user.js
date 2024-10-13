const mongoose = require("mongoose");
const Joi = require('joi');

const addressSchema = mongoose.Schema({
  city: {
    type: String,
    required: [true, 'City is required'],
    minlength: [2, 'City name must be at least 2 characters'],
    maxlength: [50, 'City name must not exceed 50 characters'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    minlength: [2, 'State name must be at least 2 characters'],
    maxlength: [50, 'State name must not exceed 50 characters'],
  },
  zip: {
    type: Number,
    required: [true, 'ZIP code is required'],
    min: [10000, 'ZIP code must be at least 5 digits'],
    max: [999999, 'ZIP code must not exceed 5 digits'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [5, 'Address must be at least 5 characters'],
    maxlength: [100, 'Address must not exceed 100 characters'],
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name must not exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensuring email uniqueness
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [30, 'Password must not exceed 30 characters'],
    },
    phone: {
      type: Number,
      required: [true, 'Phone number is required'],
      min: [1000000000, 'Phone number must be at least 10 digits'],
      max: [9999999999, 'Phone number must not exceed 10 digits'],
    },
    address: {
      type: [addressSchema],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0; // Ensure at least one address exists
        },
        message: 'At least one address is required',
      },
    },
  },
  { timestamps: true }
);

const addressValidationSchema = Joi.object({
  city: Joi.string().min(2).max(50).required(),
  state: Joi.string().min(2).max(50).required(),
  zip: Joi.number().integer().min(10000).max(99999).required(), // Validating 5-digit zip codes
  address: Joi.string().min(5).max(100).required(),
});

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(), // Password with a reasonable length
  phone: Joi.number().integer().min(1000000000).max(9999999999).required(), // Assuming 10-digit phone numbers
  address: Joi.array().items(addressValidationSchema).min(1).required(), // At least one address is required
});

module.exports = { userValidationSchema };


module.exports = mongoose.model("user", userSchema);
