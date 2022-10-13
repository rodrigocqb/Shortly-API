import express from "express";
import { getUrl, shortenUrl } from "../controllers/urls.controller.js";
import checkToken from "../middlewares/checkTokenMiddleware.js";
import urlExists from "../middlewares/urlExistsMiddleware.js";

const router = express.Router();

router.post("/urls/shorten", checkToken, shortenUrl);
router.get("/urls/:id", urlExists, getUrl);

export default router;
