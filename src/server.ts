import http from "node:http";
import { PORT } from "./config/app.config";
import database from "./models/index";
import { app } from "./app";
import redisClient from "./config/redis";

const server = http.createServer(app);

const start = async (): Promise<void> => {
  try {
    await database.sync({ force: false });

    server.listen(PORT, () => {
      // console.timeEnd("serverStart")
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      
    });
  } catch (error) {
    console.error(error);
    // process.exit(1);
  }
};
void start();


redisClient.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Error occurred while connecting to Redis', err);
});