import { Router } from "express";
import { auditFindings } from "../services/auditService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(auditFindings);
});

export default router;
