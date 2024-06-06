import { faker } from "@faker-js/faker";
import repository from "../repositories/orders.rep.js";
import dbUtils from "../utils/db.js";

function ordersMock(userId, productId) {
  const quantity = faker.datatype.number({ min: 1, max: 5 }); // Genera una cantidad aleatoria entre 1 y 5
  const status = "reserved"; // El estado por defecto es "reserved"

  return {
    user_id: userId,
    product_id: productId,
    quantity,
    status,
  };
}

export default async function createOrder(userId, productId) {
  try {
    const data = ordersMock(userId, productId);
    await dbUtils(); // Configurar la conexión a la base de datos
    await repository.create(data);
    console.log("ORDER CREATED!");
  } catch (error) {
    console.log(error);
  }
}
