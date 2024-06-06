import User from "../data/mongo/models/user.model.js";
import UserDTO from "../dto/user.dto.js"; 
import { createHash } from "../utils/hash.util.js"; 

class UsersController {
  async create(req, res) {
    try {
      const userDTO = new UserDTO(req.body); // Usar UserDTO para procesar los datos de entrada
      const user = await User.create(userDTO);
      res.status(201).json({ status: 201, user, message: "Usuario creado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async read(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ status: 200, users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async stats(req, res) {
    try {
      const stats = await User.aggregate([
        { $match: {} },
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
            totalAge: { $sum: "$age" },
          },
        },
      ]);
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async readOne(req, res) {
    try {
      const user = await User.findById(req.params.uid);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { password, ...rest } = req.body;
      const updateData = { ...rest };

      if (password) {
        console.log('Updated password (unencrypted):', password);
        updateData.password = createHash(password);
      }

      const user = await User.findByIdAndUpdate(req.params.uid, updateData, { new: true });
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.status(200).json({ status: 200, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.uid);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json({
        user: user,
        message: "Usuario eliminado satisfactoriamente",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const controller = new UsersController();
const { create, read, stats, readOne, update, destroy } = controller;
export { create, read, stats, readOne, update, destroy };
