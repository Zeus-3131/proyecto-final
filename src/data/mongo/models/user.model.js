import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  { 
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    username: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    age: { type: Number, default: 18 },
    verified: { type: Boolean, default: false },
    verifyCode: { type: String } // Asegúrate de que este campo existe
  },
  { timestamps: true } 
);
 
schema.plugin(mongoosePaginate);

const User = model(collection, schema);
export default User;
