const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Product Schema with Validation
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [2, "Product name must be at least 2 characters"],
      maxlength: [100, "Product name must not exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      minlength: [3, "Category must be at least 3 characters"],
      maxlength: [50, "Category must not exceed 50 characters"],
    },
    stock: {
      type: Boolean,
      required: [true, "Stock status is required"],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Mongoose Model
const product = mongoose.model("product", productSchema);

// Joi Product Validation Schema
const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().min(3).max(50).required(),
  stock: Joi.boolean().required(),
  description: Joi.string().optional(),
  image: Joi.string()
});

// Function to Validate Product Data using Joi
function validateProduct(product) {
  return productValidationSchema.validate(product);
}

// Exporting Mongoose Model and Joi Validation Function
module.exports = {
  product,
  validateProduct,
};
