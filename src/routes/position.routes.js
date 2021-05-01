import { Router } from "express";
import {
  createNewPosition,
  getAllPositions,
} from "../controllers/position.controller";

const router = Router();

router.route("/").get(getAllPositions).post(createNewPosition);

export default router;
