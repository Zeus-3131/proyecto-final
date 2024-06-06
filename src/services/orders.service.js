import OrderDTO from "../dto/order.dto.js";
import repository from "../repositories/orders.rep.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    data = new OrderDTO(data);
    const response = await this.repository.create(data);
    return response;
  };

  read = async ({ filter, options }) => {
    try {
      const response = await this.repository.read({ filter, options });
      return response;
    } catch (error) {
      console.error("Service read error:", error);
      throw error;
    }
  };

  readOne = async (id) => {
    try {
      const response = await this.repository.readOne(id);
      return response;
    } catch (error) {
      console.error("Service readOne error:", error);
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const response = await this.repository.update(id, data);
      return response;
    } catch (error) {
      console.error("Service update error:", error);
      throw error;
    }
  };

  destroy = async (id) => {
    try {
      const response = await this.repository.destroy(id);
      return response;
    } catch (error) {
      console.error("Service destroy error:", error);
      throw error;
    }
  };

  reportBill = async (uid) => {
    try {
      // Implementa la lógica para generar el reporte de la factura
    } catch (error) {
      console.error("Service reportBill error:", error);
      throw error;
    }
  };
}

const service = new OrdersService();
export default service;
