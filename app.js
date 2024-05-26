import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

// cors policy
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" })); // json-body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // body-parser
app.use(express.static("public")); // static files
app.use(cookieParser()); // cookie-parser

export { app };
