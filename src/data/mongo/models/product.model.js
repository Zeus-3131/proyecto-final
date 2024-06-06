import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    imagen: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    precio: { type: Number, default: 300000 },
    stock: { type: Number, default: 50 },
    idcat: { type: String, enum: ["M", "F"], required: true }, // Agregado idcat con validación de valores permitidos
    date: { type: Date, default: Date.now() }, // Cambiado a Date.now()
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;
