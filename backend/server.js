import { config } from "dotenv";
import express from "express";
import colors from "colors";
import connectDb from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import SocketServer from "./socketServer.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { ExpressPeerServer } from "peer";
import path from "path";
import { authRouter, commentRouter, messageRouter, notifyRouter, postRouter, userRouter } from "./routes/index.js";

config();
connectDb();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:3001"] }));
app.use(cookieParser());

// Socket
import { Server } from "socket.io";
import * as http from "http";

const _ = http.createServer(app);

const io = new Server(_);

io.on("connection", (socket) => {
  SocketServer(socket);
});

// Create peer server
ExpressPeerServer(http, { path: "/" });

// Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", commentRouter);
app.use("/api", messageRouter);
app.use("/api", notifyRouter);
app.use("/api", postRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 4002;

const server = _.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
