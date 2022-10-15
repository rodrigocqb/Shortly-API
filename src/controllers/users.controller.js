import { okResponse, serverError } from "./controllers.helper.js";
import * as usersRepository from "../repositories/users.repository.js";

async function getUser(req, res) {
  const { user } = res.locals;
  try {
    const userData = await usersRepository.selectUserData(user.id);
    const userUrls = await usersRepository.selectUserUrls(user.id);
    userData.shortenedUrls = userUrls;
    return okResponse(res, userData);
  } catch (error) {
    return serverError(res, error);
  }
}

async function getRanking(req, res) {
  try {
    const users = await usersRepository.selectRanking();
    return okResponse(res, users);
  } catch (error) {
    return serverError(res, error);
  }
}

export { getUser, getRanking };
