import app from "./server/server";
import dotenv from "dotenv";
import "./database/database";

dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Express server listening on port ", port);
});
