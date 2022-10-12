import express from "express";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import { signUpSchema } from "../schemas/signUpSchema.js";

const router = express.Router();

router.post("/signup", validateSchema(signUpSchema));

export default router;
