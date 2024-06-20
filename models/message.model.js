import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    text: { type: String },
    isRead: { type: Boolean, default: false },
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    orderId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
