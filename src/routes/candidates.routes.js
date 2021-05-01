import { Router } from "express";

import {
  createNewCandidate,
  deleteLessThan18YearsOld,
  hireCandidate,
  getAllCandidates,
} from "../controllers/candidates.controller";

const router = Router();

router
  .route("/")
  .get(getAllCandidates)
  .post(createNewCandidate)
  .delete(deleteLessThan18YearsOld);

router.route("/hire").post(hireCandidate);

export default router;
