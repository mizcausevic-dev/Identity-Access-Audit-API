import { Router } from "express";
import { roles } from "../services/auditService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(roles);
});

export default router;
