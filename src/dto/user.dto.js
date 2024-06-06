import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";
import args from "../utils/args.util.js";

const { env } = args;

class UserDTO { 
  constructor(data) {
    if (env === "test") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    this.username = data.username;
    this.lastName = data.lastName; 
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || 0;
    this.photo = data.photo || null;
    this.age = data.age || 18;
    this.verified = data.verified || false;
    this.verifyCode = crypto.randomBytes(12).toString("base64");
  }
}
 
export default UserDTO; 
