import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "comments";
const schema = new Schema(
  {
    text: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Schema.Types.ObjectId, required: true, ref: "products" },
    // idcat: { type: Schema.Types.ObjectId } // No es una referencia directa a otro modelo
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

// Configurar el poblado para las operaciones de búsqueda (find)
schema.pre("find", function () {
  this.populate("user_id", "-password -createdAt -updatedAt -__v");
  this.populate("product_id", "nombre imagen precio");
  // No es necesario poblar "idcat" porque no es una referencia directa a otro modelo
});

const Comment = model(collection, schema);
export default Comment;
