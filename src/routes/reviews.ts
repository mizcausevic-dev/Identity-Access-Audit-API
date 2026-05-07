import { Router } from "express";
import { accessReviews } from "../services/auditService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(accessReviews);
});

export default router;
