import { Schema, model } from "mongoose";

const PositionSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Position", PositionSchema);
