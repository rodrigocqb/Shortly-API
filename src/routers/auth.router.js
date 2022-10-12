import express from "express";
import { createUser } from "../controllers/auth.controller.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const router = express.Router();

router.post("/signup", validateSchema(signUpSchema), createUser);

export default router;
