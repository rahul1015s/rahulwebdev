import mongoose from "mongoose";

const blogVisitorSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.BlogVisitor ||
  mongoose.model("BlogVisitor", blogVisitorSchema);
