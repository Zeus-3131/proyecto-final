import MongoManager from "./manager.mongo.js";
import User from "./models/user.model.js";

const usersManager = new MongoManager(User);
export default usersManager;
