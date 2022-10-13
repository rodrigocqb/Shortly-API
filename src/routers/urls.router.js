import express from "express";
import { shortenUrl } from "../controllers/urls.controller.js";
import checkToken from "../middlewares/checkTokenMiddleware.js";

const router = express.Router();

router.post("/urls/shorten", checkToken, shortenUrl);

export default router;
