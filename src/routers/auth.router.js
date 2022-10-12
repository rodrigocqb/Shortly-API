import express from "express";
import { createUser, logUserIn } from "../controllers/auth.controller.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const router = express.Router();

router.post("/signup", validateSchema(signUpSchema), createUser);
router.post("/signin", validateSchema(signInSchema), logUserIn);

export default router;
