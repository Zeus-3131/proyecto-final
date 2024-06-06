import crypto from "crypto";
import argsUtil from "../utils/args.util.js";

const { env } = argsUtil;

class OrderDTO {
  constructor(data) {
    if (env !== "prod") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity || 1;
    this.status = data.status || "reserved";
  }
}

export default OrderDTO; 
