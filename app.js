import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

// cors policy
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(morgan("dev"));

// express middlewares
app.use(express.json({ limit: "16kb" })); // json-body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // body-parser
app.use(express.static("public")); // static files
app.use(cookieParser()); // cookie-parser

// routes import
import userRouter from "./src/routes/user.router.js";

// mounting routes
// http://localhost:3000/api/v1/users/register
app.use("/api/v1/users", userRouter);

export { app };
