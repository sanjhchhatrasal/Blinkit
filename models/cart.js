const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Cart Schema with Validation
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User reference is required"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "Product reference is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
    min: [0, "Total price must be a positive number"],
  },
});

// Mongoose Model
const cart = mongoose.model("cart", cartSchema);

// Joi Cart Validation Schema
const cartValidationSchema = Joi.object({
  user: Joi.string().required(), // ObjectId as a string
  product: Joi.string().required(), // ObjectId as a string
  totalPrice: Joi.number().min(0).required(),
});

// Function to Validate Cart Data using Joi
function validateCart(cart) {
  return cartValidationSchema.validate(cart);
}

// Exporting Mongoose Model and Joi Validation Function
module.exports = {
  cart,
  validateCart,
};
