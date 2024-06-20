import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: String },
    deliveryTime: { type: Number },
    revisions: { type: Number },
    features: { type: [String], required: true },
    price: { type: Number },
    shortDesc: { type: String },
    images: { type: [String], required: false },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
