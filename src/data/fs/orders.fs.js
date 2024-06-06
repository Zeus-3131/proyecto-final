import Order from "../mongo/models/order.model.js";

class OrdersManager {
  async create(data) {
    try {
      const order = new Order(data);
      await order.save();
      console.log("Orden creada:", order);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const orders = await Order.find();
      if (orders.length === 0) {
        throw new Error("¡No hay órdenes!");
      } else {
        console.log("Órdenes:", orders);
        return orders;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const order = await Order.findById(id);
      if (!order) {
        throw new Error(`No se encontró ninguna orden con el id=${id}`);
      }
      console.log("Orden encontrada:", order);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const order = await Order.findById(id);
      if (!order) {
        throw new Error(`No se encontró ninguna orden con el id=${id}`);
      }

      Object.assign(order, data);
      order.updatedAt = new Date();

      await order.save();
      console.log("Orden actualizada:", order);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        throw new Error(`No se encontró ninguna orden con el id=${id}`);
      }

      console.log("Orden eliminada:", order);
      return { order, message: "Orden eliminada correctamente" };
    } catch (error) {
      throw error;
    }
  }
}

const ordersManager = new OrdersManager();
export default ordersManager;
