import MongoManager from "./manager.mongo.js";
import Product from "./models/product.model.js";

const productsManager = new MongoManager(Product);
export default productsManager;
