import { Router } from "express";
import {
  register,
  login,
  signout,
  verifyAccount,
} from "../../controllers/auth.controller.js";
import passCallback from "../../middlewares/passCallBack.mid.js";

const authRouter = Router();

authRouter.post("/register", passCallback("register"), register);
authRouter.post("/login", passCallback("login"), login);
authRouter.post("/signout", passCallback("jwt"), signout);
authRouter.post("/verify", verifyAccount); // Asegúrate de tener esta línea

export default authRouter;
