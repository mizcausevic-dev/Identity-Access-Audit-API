import { Router } from "express";
import { getDashboardSummary } from "../services/auditService.js";

const router = Router();

router.get("/summary", (_request, response) => {
  response.json(getDashboardSummary());
});

export default router;
