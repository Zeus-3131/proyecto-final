import { verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import repository from "../repositories/users.rep.js";

class SessionsController {
  register = async (req, res, next) => {
    try {
      return res.status(201).json({
        status: 201,
        user: req.user,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await repository.readByEmail(email);

      // Verificar si el usuario existe y la contraseña es correcta
      if (!user || !verifyHash(password, user.password)) {
        return res
          .status(401)
          .json({
            status: 401,
            message: "Email invalido o contraseña incorrecta",
          });
      }

      // Si las credenciales son válidas, generar un token y establecer la cookie
      const token = createToken({ _id: user._id, role: user.role });
      return res
        .cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json({ status: 200, message: "Usuario Logueado!" });
    } catch (error) {
      return next(error);
    }
  };

  google = async (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ status: 200, message: "Logged in with Google!" });
    } catch (error) {
      return next(error);
    }
  };

  github = async (req, res, next) => {
    try {
      return res
        .status(200)
        .json({ status: 200, message: "Logged in with Github!" });
    } catch (error) {
      return next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.status(200).json({ status: 200, user: user });
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res
        .clearCookie("token")
        .status(200)
        .json({status: 200, message: "Sesión cerrada" });
    } catch (error) {
      return next(error);
    }
  };

  badauth = (req, res, next) => {
    try {
      return res.status(401).json();
    } catch (error) {
      return next(error);
    }
  };

  googleCallback = async (req, res, next) => {
    try {
      const user = req.user; // Suponiendo que `req.user` contiene los datos de usuario de Google
      const token = createToken({ _id: user._id, role: user.role });
      return res
        .cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect("/"); // Redirige a la página principal después del inicio de sesión con Google
    } catch (error) {
      return next(error);
    }
  };

  githubCallback = async (req, res, next) => {
    try {
      const user = req.user; // Suponiendo que `req.user` contiene los datos de usuario de GitHub
      const token = createToken({ _id: user._id, role: user.role });
      return res
        .cookie("token", token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect("/"); // Redirige a la página principal después del inicio de sesión con GitHub
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new SessionsController();
export const {
  register,
  login,
  google,
  github,
  me,
  signout,
  badauth,
  googleCallback,
  githubCallback,
} = controller;
export default controller;
