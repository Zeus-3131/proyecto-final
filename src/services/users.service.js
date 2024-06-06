import usersManager from "../data/mongo/users.mongo.js";
import UserDTO from "../dto/user.dto.js";
import sendEmail from "../utils/sendEmail.utils.js";

class UsersService {
  constructor() {
    this.model = usersManager; 
  }

  async create(data) {
    const userDTO = new UserDTO(data);
    return await this.model.create(userDTO);
  }

  async read({ filter, options }) {
    return await this.model.read({ filter, options });
  }

  async stats(id) {
    return await this.model.stats(id);
  }

  async readOne(id) {
    return await this.model.readOne(id);
  }

  async readByEmail(email) {
    return await this.model.readByEmail(email);
  }

  async update(id, data) {
    return await this.model.update(id, data);
  }

  async destroy(id) {
    return await this.model.destroy(id);
  }

  async register(data) {
    try {
      await sendEmail(data);
    } catch (error) {
      throw error;
    }
  }
}

const service = new UsersService();
export default service;
