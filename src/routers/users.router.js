import express from "express";
import { getRanking, getUser } from "../controllers/users.controller.js";
import checkToken from "../middlewares/checkTokenMiddleware.js";

const router = express.Router();

router.get("/users/me", checkToken, getUser);
router.get("/ranking", getRanking);

export default router;
