import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      requiered: true,
    },
    author: {
      type: String,
      requiered: true,
    },
    publishYear: {
      type: Number,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Book = mongoose.model("Book", bookSchema);
