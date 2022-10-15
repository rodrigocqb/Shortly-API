import { nanoid } from "nanoid";
import {
  createdResponse,
  noContentResponse,
  notFoundResponse,
  okResponse,
  serverError,
  unauthorizedResponse,
} from "./controllers.helper.js";
import * as urlsRepository from "../repositories/urls.repository.js";

async function shortenUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;
  const shortUrl = nanoid(8);
  try {
    await urlsRepository.insertUrl(user.id, shortUrl, url);
    return createdResponse(res, { shortUrl });
  } catch (error) {
    return serverError(res, error);
  }
}

function getUrl(req, res) {
  const { url } = res.locals;
  delete url.createdAt;
  delete url.userId;
  return okResponse(res, url);
}

async function openUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const url = await urlsRepository.selectUrlByShortUrl(shortUrl);
    if (!url) {
      return notFoundResponse(res, { error: "URL not found" });
    }
    await urlsRepository.insertVisit(url.id);
    return res.redirect(url.url);
  } catch (error) {
    return serverError(res, error);
  }
}

async function deleteUrl(req, res) {
  const { url, user } = res.locals;
  if (url.userId !== user.id) {
    return unauthorizedResponse(res, {
      error: "This URL is from another user",
    });
  }
  try {
    await urlsRepository.deleteVisitsFromUrl(url.id);
    await urlsRepository.deleteUrl(url.id);
    return noContentResponse(res);
  } catch (error) {
    return serverError(res, error);
  }
}

export { shortenUrl, getUrl, openUrl, deleteUrl };
