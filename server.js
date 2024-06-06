import env from "./src/utils/env.util.js";
import express from "express"; 
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import args from "./src/utils/args.util.js";
import socketUtils from "./src/utils/socket.utils.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import dbConnection from "./src/utils/db.js";
import cors from "cors";
import compression from "express-compression";
import winston from "./src/middlewares/winston.mid.js";
import wintsonLog from "./src/utils/logger/index.js";
import cluster from "cluster";
import { cpus } from "os";
import options from "./src/config/swagger.js";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";


//server
const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  wintsonLog.INFO("server ready on port " + PORT);
  dbConnection();
  console.log("mode " + args.env); 
};
const httpServer = createServer(server); 
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const FileStore = sessionFileStore(expressSession);
//middlewares
server.use(cookieParser(env.SECRET_KEY));
//MEMORY STORE
/* server.use(
  expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
); */
//FILE STORE
/* server.use(
  expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new FileStore({
      path: "./src/data/fs/files/sessions",
      ttl: 10,
      retries: 2,
    }),
  })
); */
//MONGO STORE
/* server.use(
  expressSession({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60, //chequear la unidad de ttl
      mongoUrl: env.DB_LINK,
    }),
  })
); */
server.use(
  cors({
    origin: 'http://localhost:5173',
    origin: true,
    credentials: true,
  })
);

const specs = swaggerJSDoc(options);
server.use("/api/docs", serve, setup(specs));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));
server.use(winston);
server.use( compression({
brotli: { enabled: true, zlib: {} },
})
);

//clusters
// console.log(cluster.isPrimary);
// if (cluster.isPrimary) {
//   console.log("PRIMARY ID: " + process.pid);
//   const numberOfProcess = cpus().length;
//   console.log("NUMBER OF PROCESS OF MY COMPUTER: " + numberOfProcess);
//   for (let i = 1; i <= numberOfProcess; i++) {
//     cluster.fork();
//   }
// } else {
//   console.log("WORKER ID: " + process.pid);
//   server.listen(PORT, ready);
// }



//endpoints
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };

