import { Router } from "express";
import { users } from "../services/auditService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(users);
});

router.get("/:id", (request, response) => {
  const user = users.find((entry) => entry.id === request.params.id);

  if (!user) {
    return response.status(404).json({
      error: "Not Found",
      message: "User was not found.",
    });
  }

  return response.json(user);
});

export default router;
