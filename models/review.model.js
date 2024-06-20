import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    rating: { type: Number },
    reviewText: { type: String },
    gigId: { type: String, required: true },
    reviewerId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
