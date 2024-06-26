import mongoose from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    title: { type: String, required: false, unique: false },
    description: { type: String },
    category: { type: String },
    deliveryTime: { type: Number },
    revisions: { type: Number },
    features: { type: [String], required: false },
    price: { type: Number },
    shortDesc: { type: String },
    images: { type: [String], required: false },
    createdBy: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gig", GigSchema);
