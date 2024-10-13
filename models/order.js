const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Order Schema with Validation
const orderSchema = mongoose.Schema({
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
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [5, "Address must be at least 5 characters"],
    maxlength: [100, "Address must not exceed 100 characters"],
  },
  status: {
    type: String,
    required: [true, "Order status is required"],
    enum: {
      values: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      message: "Status must be one of: Pending, Confirmed, Shipped, Delivered, or Cancelled",
    },
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
    required: [true, "Payment reference is required"],
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "delivery",
    required: [true, "Delivery reference is required"],
  },
});

// Mongoose Model
const order = mongoose.model("order", orderSchema);

// Joi Order Validation Schema
const orderValidationSchema = Joi.object({
  user: Joi.string().required(), // ObjectId as string
  product: Joi.string().required(), // ObjectId as string
  totalPrice: Joi.number().min(0).required(),
  address: Joi.string().min(5).max(100).required(),
  status: Joi.string()
    .valid("Pending", "Confirmed", "Shipped", "Delivered", "Cancelled")
    .required(),
  payment: Joi.string().required(), // ObjectId as string
  delivery: Joi.string().required(), // ObjectId as string
});

// Function to Validate Order Data using Joi
function validateOrder(order) {
  return orderValidationSchema.validate(order);
}

// Exporting Mongoose Model and Joi Validation Function
module.exports = {
  order,
  validateOrder,
};
