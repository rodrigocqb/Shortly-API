import express from "express";
import {
  deleteUrl,
  getUrl,
  openUrl,
  shortenUrl,
} from "../controllers/urls.controller.js";
import checkToken from "../middlewares/checkTokenMiddleware.js";
import urlExists from "../middlewares/urlExistsMiddleware.js";

const router = express.Router();

router.post("/urls/shorten", checkToken, shortenUrl);
router.get("/urls/:id", urlExists, getUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", checkToken, urlExists, deleteUrl);

export default router;
