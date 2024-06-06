import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.util.js";

class UsersManager {
  static #users = [];

  constructor() {}

  async create(data) {
    try {
      if (!data.name || !data.email) {
        const error = new Error("Name and email are required");
        error.statusCode = 400;
        throw error;
      }

      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        email: data.email,
        photo: data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png",
      };

      UsersManager.#users.push(user);
      return user.id;
    } catch (error) {
      throw error;
    }
  }

  read() {
    try {
      if (UsersManager.#users.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return UsersManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = UsersManager.#users.find((user) => user.id === id);
      if (!one) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(userId, data) {
    try {
      const user = this.readOne(userId);
      notFoundOne(user);

      // Actualizar los campos especificados en 'data'
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          user[key] = data[key];
        }
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const user = this.readOne(id);
      notFoundOne(user);

      UsersManager.#users = UsersManager.#users.filter((user) => user.id !== id);

      return user;
    } catch (error) {
      throw error;
    }
  }
}

const usersManager = new UsersManager();
export default usersManager;
