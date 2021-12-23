import mongoose, { Schema, Document } from "mongoose";

interface addressType extends Document {
  userId: string;
  name: string;
  type?: string;
}

const addressSchema = new Schema<addressType>({
  userId: {
    type: String,
  },
  name: { type: String },
  type: { type: String, default: "Home Address" },
});

export default mongoose.model<addressType>("address", addressSchema);
