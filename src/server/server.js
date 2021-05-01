import express from "express";
import employeesRoutes from "../routes/employees.routes";
import positionRoutes from "../routes/position.routes";
import candidatesRoutes from "../routes/candidates.routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/positions", positionRoutes);
app.use("/employees", employeesRoutes);
app.use("/candidates", candidatesRoutes);

export default app;
