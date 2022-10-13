import express from "express";
import { getUser } from "../controllers/users.controller.js";
import checkToken from "../middlewares/checkTokenMiddleware.js";

const router = express.Router();

router.get("/users/me", checkToken, getUser);

export default router;
