import { faker } from "@faker-js/faker";
import repository from "../repositories/products.rep.js";
import dbUtils from "../utils/db.js";

function productsMock() {
  const nombre = faker.commerce.productName(); // Genera un nombre de producto ficticio
  const imagen = faker.image.image(); // Genera una URL de imagen aleatoria
  const precio = faker.datatype.number({ min: 50, max: 1000 }); // Genera un precio aleatorio entre 50 y 1000
  const stock = faker.datatype.number({ min: 1, max: 100 }); // Genera una cantidad de stock aleatoria entre 1 y 100

  return {
    nombre,
    imagen,
    precio,
    stock,
  };
}

export default async function createProduct() {
  try {
    const data = productsMock();
    await dbUtils(); // Configurar la conexión a la base de datos
    await repository.create(data);
    console.log("PRODUCT CREATED!");
  } catch (error) {
    console.log(error);
  }
}
