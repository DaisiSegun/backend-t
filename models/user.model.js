const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // minlength: 8,
      // maxlength: 20,
    },
    confirmPassword: {
      type: String,
      required: true,
      // minlength: 8,
      // maxlength: 20,
    },
    phone: {
      type: String,
      required: true,
    },
    businessLocation: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    certifications: {
      type: String,
      required: false,
    },
    interests: {
      type: String,
      required: false,
    },
    profilePicture: {
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
    desc: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpiration: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
