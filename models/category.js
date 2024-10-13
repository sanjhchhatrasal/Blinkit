const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Category Schema with Validation
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    minlength: [2, "Category name must be at least 2 characters"],
    maxlength: [50, "Category name must not exceed 50 characters"],
    unique: true, // Ensures category names are unique
    trim: true,   // Removes whitespace from both ends
  },
});

// Mongoose Model
const category = mongoose.model("category", categorySchema);

// Joi Category Validation Schema
const categoryValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
});

// Function to Validate Category Data using Joi
function validateCategory(category) {
  return categoryValidationSchema.validate(category);
}

// Exporting Mongoose Model and Joi Validation Function
module.exports = {
  category,
  validateCategory,
};
