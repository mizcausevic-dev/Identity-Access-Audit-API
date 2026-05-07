import { Router } from "express";
import { applications } from "../services/auditService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(applications);
});

export default router;
