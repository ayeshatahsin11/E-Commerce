const { default: mongoose, Mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountPrice: {
      type: Number,
    },
    variantType: {
      type: String,
      enum: ["singlevariant", "multivariant"],
      default: "singlevariant",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
