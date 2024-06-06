import { model, Schema, Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = "orders";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    status: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function (next) {
  this.populate("user_id", "-password -createdAt -updatedAt -__v");
  this.populate("product_id", "nombre precio stock");
  next();
});

// Aplicar el plugin de paginación al esquema
schema.plugin(mongoosePaginate);

const Order = model(collection, schema);
export default Order;
