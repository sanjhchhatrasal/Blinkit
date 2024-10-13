const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose Delivery Schema with Validation
const deliverySchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: [true, "Order reference is required"],
  },
  deliveryBoy: {
    type: String,
    required: [true, "Delivery boy name is required"],
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name must not exceed 50 characters"],
  },
  status: {
    type: String,
    required: [true, "Delivery status is required"],
    enum: {
      values: ["Assigned", "In Transit", "Delivered", "Cancelled"],
      message: "Status must be one of: Assigned, In Transit, Delivered, or Cancelled",
    },
  },
  trackingUrl: {
    type: String,
    match: [
      /^(http|https):\/\/.*$/,
      "Tracking URL must be a valid URL starting with http or https",
    ],
  },
  estimatedDeliveryTime: {
    type: Number,
    required: [true, "Estimated delivery time is required"],
    min: [1, "Estimated delivery time must be at least 1 minute"],
  },
});

// Mongoose Model
const delivery = mongoose.model("delivery", deliverySchema);

// Joi Delivery Validation Schema
const deliveryValidationSchema = Joi.object({
  order: Joi.string().required(), // ObjectId as string
  deliveryBoy: Joi.string().min(2).max(50).required(),
  status: Joi.string()
    .valid("Assigned", "In Transit", "Delivered", "Cancelled")
    .required(),
  trackingUrl: Joi.string()
    .uri()
    .optional()
    .messages({ "string.uri": "Tracking URL must be a valid URL" }),
  estimatedDeliveryTime: Joi.number().min(1).required(),
});

// Function to Validate Delivery Data using Joi
function validateDelivery(delivery) {
  return deliveryValidationSchema.validate(delivery);
}

// Exporting Mongoose Model and Joi Validation Function
module.exports = {
  delivery,
  validateDelivery,
};
