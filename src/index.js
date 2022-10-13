import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
import urlsRouter from "./routers/urls.router.js";
import usersRouter from "./routers/users.router.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

export default app;
