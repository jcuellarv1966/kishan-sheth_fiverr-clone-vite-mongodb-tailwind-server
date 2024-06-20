import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    paymentIntent: { type: Number, required: true },
    isCompleted: { type: Boolean, default: false },
    gigId: { type: String, required: true },
    price: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
