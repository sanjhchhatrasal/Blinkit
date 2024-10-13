const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Payment Schema with Validation
const paymentSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: [true, "Order reference is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount must be a positive number"],
  },
  method: {
    type: String,
    required: [true, "Payment method is required"],
  },
  status: {
    type: String,
    required: [true, "Payment status is required"],
  },
  transactionId: {
    type: String,
    required: [true, "Transaction ID is required"],
  },
});

// Mongoose Model
const payment = mongoose.model("payment", paymentSchema);

// Joi Payment Validation Schema
const paymentValidationSchema = Joi.object({
  order: Joi.string().required(), // ObjectId as a string
  amount: Joi.number().min(0).required(),
  method: Joi.string()
    .required(),
  status: Joi.string()
    .required(),
  transactionId: Joi.string().required(),
});

// Function to Validate Payment Data using Joi
function validatePayment(payment) {
  return paymentValidationSchema.validate(payment);
}

// Exporting Mongoose Model and Joi Validation Function
module.exports = {
  payment,
  validatePayment,
};
