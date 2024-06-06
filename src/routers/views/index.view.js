// // import { Router } from "express";
// import CustomRouter from "../CustomRouter.js";
// import productsRouter from "./products.view.js";
// import usersRouter from "./users.view.js"
// import sessionsRouter from "./sessions.view.js"
// import ordersRouter from "./orders.view.js";


// export default class ViewsRouter extends CustomRouter {
//   init() {
//     this.router.use("/products", productsRouter);
//     this.router.use("/orders", ordersRouter);
//     this.router.use("/sessions", sessionsRouter);
//     this.read("/", ["PUBLIC"], async (req, res, next) => {
//       try {
//         const options = {
//           limit: req.query.limit || 4,
//           page: req.query.page || 1,
//           sort: { title: 1 },
//           lean: true,
//         };
//         const filter = {};
//         if (req.query.title) {
//           filter.title = new RegExp(req.query.title.trim(), "i");
//         }
//         if (req.query.sort === "desc") {
//           options.sort.title = "desc";
//         }
//         const all = await events.read({ filter, options });
//         return res.render("index", {
//           events: all.docs,
//           next: all.nextPage,
//           prev: all.prevPage,
//           title: "INDEX",
//           filter: req.query.title,
//         });
//       } catch (error) {
//         next(error);
//       }
//     });
//   }
// }

// viewsRouter.get("/", (req, res, next) => {
//   try {
//     const mainProducts = ["hp", "pokemon", "batman"];
//     const date = new Date();
//     return res.render("index", { products: mainProducts, date, title: "INDEX" });
//   } catch (error) {
//     next(error);
//   }
// });
// viewsRouter.use("/products", productsRouter);
// viewsRouter.use("/users", usersRouter)
// viewsRouter.use("/sessions", sessionsRouter)


// export default viewsRouter;



import CustomRouter from "../CustomRouter.js";
import productsManager from "../../data/mongo/products.mongo.js";
import productsRouter from "./products.view.js";
import sessionsRouter from "./sessions.view.js";
import ordersRouter from "./orders.view.js"; 

export default class ViewsRouter extends CustomRouter { 
  init() {
    this.router.use("/products", productsRouter);
    this.router.use("/orders", ordersRouter);
    this.router.use("/sessions", sessionsRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 4,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await productsManager.read({ filter, options });
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
      } catch (error) {
        next(error);
      }
    });
  }
}


