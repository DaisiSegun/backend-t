const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
 
 
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    shortDesc: {
      type: String,
      required: false,
    },
 
    revisionNumber: {
      type: Number,
      required: false,
    },
    
    priority: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
