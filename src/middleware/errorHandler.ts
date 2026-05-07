import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function notFoundHandler(_request: Request, response: Response) {
  response.status(404).json({
    error: "Not Found",
    message: "The requested resource does not exist.",
  });
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      error: "Validation Error",
      message: "Request payload failed validation.",
      details: error.flatten(),
    });
  }

  console.error(error);

  return response.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
  });
}
