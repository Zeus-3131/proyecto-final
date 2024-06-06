import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.router.api.js";
import ViewsRouter from "./views/index.view.js";
import winston from "../utils/logger/index.js";


const views = new ViewsRouter();
const viewsRouter = views.getRouter(); 

class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);

    this.router.get("/simplex", (req, res, next) => {
      winston.INFO(process.pid);
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });

    this.router.get("/complex", (req, res, next) => {
      winston.INFO(process.pid);
      try {
        let total = 1;
        for (let i = 1; i <= 1000000; i++) {
          // Reducir el límite del bucle
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const router = new IndexRouter();
export default router.getRouter();
