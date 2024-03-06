const mongoose = require("mongoose");
const { Schema } = mongoose;

const CatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Assuming you are storing the image URL
      required: true,
    },
    id: {
      type: String, // or ObjectId if you want to use MongoDB ObjectId
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cat", CatSchema);
