import { Router } from "express";
import { z } from "zod";
import {
  analyzeAccessRisk,
  analyzeException,
  analyzeRemediation,
} from "../services/auditService.js";

const router = Router();

const analysisSchema = z.object({
  userName: z.string().min(2),
  department: z.string().min(2),
  role: z.string().min(2),
  sensitiveApplications: z.array(z.string().min(2)).min(1),
  privilegedEntitlements: z.number().int().nonnegative(),
  daysSinceLastAccessReview: z.number().int().nonnegative(),
  hasPolicyException: z.boolean(),
  isDormant: z.boolean(),
});

router.post("/analyze/access-risk", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeAccessRisk(input));
});

router.post("/analyze/exception", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeException(input));
});

router.post("/analyze/remediation", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeRemediation(input));
});

export default router;
