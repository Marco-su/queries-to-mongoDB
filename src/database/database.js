import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database conected");
  })
  .catch((err) => {
    console.log(err);
  });
