import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    if (argsUtil.env !== "prod") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.nombre = data.nombre;
    this.imagen = data.imagen || "https://i.postimg.cc/wTgNFWhR/profile.png";
    this.precio = data.precio || 300000;
    this.stock = data.stock || 50;

    const validCategories = ["M", "F"];
    if (validCategories.includes(data.idcat)) {
      this.idcat = data.idcat;
    } else {
      throw new Error(`Invalid idcat value: ${data.idcat}. Allowed values are ${validCategories.join(", ")}`);
    }

    this.date = data.date || new Date();
    if (argsUtil.env !== "prod") {
      this.updatedAt = new Date();
      this.createdAt = new Date();
    }
  }
}

export default ProductDTO;
