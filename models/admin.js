const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Admin Schema with Validation
const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Admin name is required"],
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name must not exceed 50 characters"],
    trim: true, // Removes whitespace from both ends
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure email addresses are unique
    trim: true, // Removes whitespace from both ends
    lowercase: true, // Convert to lowercase
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: {
      values: ["admin", "superadmin"],
      message: "Role must be either 'admin' or 'superadmin'",
    },
  },
});

// Mongoose Model
const admin = mongoose.model("admin", adminSchema);

// Joi Admin Validation Schema
const adminValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid("admin", "superadmin")
    .required(),
});

// Function to Validate Admin Data using Joi
function validateAdmin(admin) {
  return adminValidationSchema.validate(admin);
}

// Exporting Mongoose Model and Joi Validation Function
module.exports = {
  admin,
  validateAdmin,
};
