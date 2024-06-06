import MongoManager from "./manager.mongo.js";
import Order from "./models/order.model.js";

const orderManager = new MongoManager(Order);
export default orderManager;
