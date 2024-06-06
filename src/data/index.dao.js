import dbConnection from "../utils/db.utils.js";
const persistence = process.env.PERSISTENCE || "MONGO";

let dao = {};

switch (persistence) {
  case "MEMORY":
    break;
  case "FS":
    break;
  default:
    dbConnection();
    const { default: CommentsMongo } = await import("./mongo/comments.mongo.js");
    const { default: OrdersMongo } = await import("./mongo/orders.mongo.js");
    const { default: ProductsMongo } = await import("./mongo/products.mongo.js");
    const { default: UsersMongo } = await import("./mongo/users.mongo.js");

    dao = { comments: CommentsMongo, users: UsersMongo, orders: OrdersMongo, products:ProductsMongo };
    break;
}

export default dao;
