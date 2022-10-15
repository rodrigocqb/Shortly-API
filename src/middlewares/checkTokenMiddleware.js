import jwt from "jsonwebtoken";
import {
  notFoundResponse,
  serverError,
  unauthorizedResponse,
} from "../controllers/controllers.helper.js";
import * as authRepository from "../repositories/auth.repository.js";

async function checkToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let userId;
  try {
    userId = jwt.verify(token, process.env.TOKEN_SECRET).userId;
  } catch (error) {
    authRepository.deleteSession(token);
    return unauthorizedResponse(res, { error: "User not authorized" });
  }
  try {
    const user = await authRepository.selectUserById(userId);
    if (!user) {
      if (req.path === "/users/me") {
        return notFoundResponse(res, { error: "User not found" });
      }
      return unauthorizedResponse(res, { error: "User not authorized" });
    }
    delete user.password;
    res.locals.user = user;
    const isTokenValid = await authRepository.selectToken(userId, token);
    if (!isTokenValid) {
      return unauthorizedResponse(res, { error: "User not authorized" });
    }
    return next();
  } catch (error) {
    return serverError(res, error);
  }
}

export default checkToken;
