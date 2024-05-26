import { app } from "./app.js";

import http from "http";

const serverInstance = http.createServer(app);
const PORT = 3000;

const server = async () => {
  try {
    await serverInstance.listen(PORT, () => {
      console.log(`server is listening on ${PORT}`.yellow.bold);
    });
  } catch (err) {
    console.log(`server is not listenin ${err.message}`);
  }
};

export default server;
