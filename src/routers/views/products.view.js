// import { Router } from "express";
// import products from "../../data/fs/products.fs.js";

// const productsRouter = Router();

// productsRouter.get("/real", (req, res, next) => {
//   try {
//     return res.render("real", { title: "REAL" });
//   } catch (error) {
//     next(error);
//   }
// });

// productsRouter.get("/form", async (req, res, next) => {
//   try {
//     return res.render("form");
//   } catch (error) {
//     next(error);
//   }
// });

// productsRouter.get("/:eid", async (req, res, next) => {
//   try {
//     const { eid } = req.params;
//     const one = await events.readOne(eid);
//     return res.render("detail", { event: one });
//   } catch (error) {
//     next(error);
//   }
// });

// export default productsRouter;


import { Router } from "express"; 
import productsManager from "../../data/mongo/products.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.get("/real", passCallBack("jwt"), isAdmin, (req, res, next) => {
  try {
    return res.render("real", { title: "REAL" });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/form", passCallBack("jwt"), isAdmin, (req, res, next) => {
  try {
    return res.render("form", { title: "CREATE MOVIE" });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:eid", async (req, res, next) => {
  try {
    const { eid } = req.params;
    const one = await productsManager.readOne(eid);
    return res.render("detail", { event: one, title: one.title.toUpperCase() });
  } catch (error) {
    next(error);
  } 
});

export default productsRouter;
