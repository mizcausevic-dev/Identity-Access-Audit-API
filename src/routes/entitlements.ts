import { Router } from "express";
import { entitlements } from "../services/auditService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(entitlements);
});

export default router;
