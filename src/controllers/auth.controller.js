import service from "../services/users.service.js";
import jwt from "jsonwebtoken";
import isValidPass from "../utils/isValidPass.utils.js";
import repository from "../repositories/users.rep.js";

class AuthController {
  constructor() {
    this.service = service;
    this.repository = repository;
  }

  async register(req, res, next) {
    try {
      const { email, username, password } = req.body;
      const userData = {
        email,
        name: username,
        password, 
      };

      const newUser = await this.repository.create(userData);
      return res.status(201).json({ message: "Registered!", user: newUser });
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.repository.readByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!isValidPass(password, user.password)) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res
        .cookie("token", token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .json({ message: "Logged in!", token });
    } catch (error) {
      return next(error);
    }
  }

  async signout(req, res, next) {
    try {
      return res.clearCookie("token").status(200).json({ message: "Signed out!" });
    } catch (error) {
      return next(error);
    }
  }

  async verifyAccount(req, res, next) {
    try {
      const { email, verifiedCode } = req.body;
      const user = await this.repository.readByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.verifyCode !== verifiedCode) {
        return res.status(400).json({ message: "Invalid verification code" });
      }

      await this.repository.update(user._id, { verified: true });
      return res.status(200).json({ message: "Verified user!" });
    } catch (error) {
      return next(error);
    }
  }
}

const controller = new AuthController();
export const { register, login, signout, verifyAccount } = controller;
