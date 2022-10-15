import {
  notFoundResponse,
  serverError,
} from "../controllers/controllers.helper.js";
import * as urlsRepository from "../repositories/urls.repository.js";

async function urlExists(req, res, next) {
  const { id } = req.params;
  try {
    const url = await urlsRepository.selectUrlById(id);
    if (!url) {
      return notFoundResponse(res, { error: "URL not found" });
    }
    res.locals.url = url;
    return next();
  } catch (error) {
    return serverError(res, error);
  }
}

export default urlExists;
