import { faker } from "@faker-js/faker";
import repository from "../repositories/comments.rep.js";
import dbUtils from "../utils/db.js";

function commentsMock(id) {
  return {
    text: faker.lorem.sentence(), // Genera un texto aleatorio para el comentario
    user_id: id,
    product_id: id, // Debes proporcionar el mismo ID para user_id y product_id
  };
}

export default async function createComment(id) {
  try {
    const data = commentsMock(id);
    await dbUtils(); // Configurar la conexión a la base de datos
    await repository.create(data);
    console.log("COMMENT CREATED!");
  } catch (error) {
    console.log(error);
  }
}
