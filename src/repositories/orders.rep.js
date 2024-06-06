import OrderDTO from "../dto/order.dto.js";
import dao from "../data/index.factory.js";

const { orders } = dao;

class OrdersRep {
  constructor() {
    this.model = orders;
  }

  create = async (data) => {
    data = new OrderDTO(data);
    const response = await this.model.create(data);
    return response;
  };

  read = async ({ filter, options }) => {
    try {
      const response = await this.model.read(filter, options);
      return response;
    } catch (error) {
      console.error("Repository read error:", error);
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      const response = await this.model.readOne(id);
      return response;
    } catch (error) {
      console.error("Repository readOne error:", error);
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const response = await this.model.update(id, data);
      return response;
    } catch (error) {
      console.error("Repository update error:", error);
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const response = await this.model.destroy(id);
      return response;
    } catch (error) {
      console.error("Repository destroy error:", error);
      throw error;
    }
  };
}

const repository = new OrdersRep();
export default repository;
