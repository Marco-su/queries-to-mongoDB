import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    nid: {
      type: Number,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    service_years: {
      type: Number,
      required: true,
      default: 0,
    },
    position: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Position",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model("Employee", EmployeeSchema);
