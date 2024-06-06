import { faker } from "@faker-js/faker";
import repository from "../repositories/users.rep.js";
import dbUtils from "../utils/db.js";
import comments from "./comments.mock.js";

function usersMock() {
  const firstName = faker.person.firstName(); // Usar faker.person en lugar de faker.name
  const lastName = faker.person.lastName();
  const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const email = `${username}@example.com`; // Usar un dominio de ejemplo para los correos electrónicos

  return {
    photo: faker.image.avatar(), // Generar una URL de imagen aleatoria para la foto de perfil
    username,
    lastName,
    email,
    password: faker.internet.password(), // Generar una contraseña aleatoria
    role: faker.datatype.number({ min: 0, max: 2 }), // Generar un número aleatorio para el rol (0, 1, o 2)
    age: faker.datatype.number({ min: 18, max: 80 }), // Generar una edad aleatoria entre 18 y 80 años
  };
}

async function createMocks() {
  try {
    await dbUtils(); // Configurar la conexión a la base de datos
    const data = usersMock();
    const user = await repository.create(data);
    await comments(user._id); // Simular la creación de comentarios para el usuario creado
    console.log("USER CREATED!");
  } catch (error) {
    console.log(error);
  }
}

createMocks();
