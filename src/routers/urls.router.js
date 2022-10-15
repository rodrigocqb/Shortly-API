import express from "express";
import {
  deleteUrl,
  getUrl,
  openUrl,
  shortenUrl,
} from "../controllers/urls.controller.js";
import checkToken from "../middlewares/checkTokenMiddleware.js";
import validateSchema from "../middlewares/schemaValidationMiddleware.js";
import urlExists from "../middlewares/urlExistsMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";

const router = express.Router();

router.post("/urls/shorten", checkToken, validateSchema(urlSchema), shortenUrl);
router.get("/urls/:id", urlExists, getUrl);
router.get("/urls/open/:shortUrl", openUrl);
router.delete("/urls/:id", checkToken, urlExists, deleteUrl);

export default router;
