import { Schema, model } from "mongoose";

const CandidateSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    nid: {
      type: Number,
      required: true,
      unique: true,
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

export default model("Candidate", CandidateSchema);
