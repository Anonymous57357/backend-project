import server from "./server.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import connectDB from "./config/db.js";
import colors from "colors";

const start = async () => {
  try {
    await server();
    await connectDB();
  } catch (err) {
    console.log(err.message);
  }
};

start();
