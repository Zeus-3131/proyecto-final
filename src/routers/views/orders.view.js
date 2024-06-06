import { Router } from "express";
import orderManager from "../../data/mongo/orders.mongo.js";
import usersManager from "../../data/mongo/users.mongo.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const productsRouter = Router();

productsRouter.get("/", passCallBack("jwt"), async (req, res, next) => {
  try {
    const options = {
      limit: req.query.limit || 20,
      page: req.query.page || 1, 
      sort: { title: 1 },
      lean: true,
    };
    const user = await usersManager.readByEmail(req.user.email);
    const filter = {
      user_id: user._id,
    };
    const all = await orderManager.read({ filter, options });
    console.log(all.docs[0].event_id);
    return res.render("orderManager", { title: "MY CART", orderManager: all.docs });
  } catch (error) {
    return res.render("orderManager", {
      title: "MY CART",
      message: "NO orderManager YET!",
    });
  }
});

export default productsRouter;
