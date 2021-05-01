import { Router } from "express";
import {
  createNewEmployee,
  getAllEmployees,
  getSingleEmployeeByNid,
  getEmployeesByEspecificAges,
  getEmployeeByRangeAge,
  getEmployeesByPosition,
  updateEmployee,
} from "../controllers/employees.controller";

const router = Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee);

router.route("/nid/:nid").get(getSingleEmployeeByNid);

router.get("/ages", getEmployeesByEspecificAges);

router.get("/ages/min=:min&max=:max", getEmployeeByRangeAge);

router.get("/position", getEmployeesByPosition);

export default router;
