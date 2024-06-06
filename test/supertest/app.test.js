// import "dotenv/config.js";
// import { expect } from "chai";
// import supertest from "supertest";
// import dao from "../../src/data/index.factory.js";
// const { Pet } = dao;

// const requester = supertest("http://localhost:" + process.env.PORT + "/api");

// describe("Testeando ADOPTME API", () => {
//   const user = {
//     first_name: "coder",
//     email: "coder@coder.com",
//     password: "hola1234",
//     role: "admin",
//   };
//   let uid;
//   let token = {};
//   it("Registro de un usuario correctamente", async () => {
//     const response = await requester.post("/sessions/register").send(user);
//     const { _body, statusCode } = response;
//     //console.log(_body);
//     uid = _body.payload._id;
//     expect(statusCode).to.be.equals(201);
//   });
//   it("Inicio de sesión correctamente", async () => {
//     const response = await requester.post("/sessions/login").send(user);
//     const { statusCode, headers } = response;
//     console.log(headers);
//     token.key = headers["set-cookie"][0].split("=")[0];
//     token.value = headers["set-cookie"][0].split("=")[1];
//     expect(statusCode).to.be.equals(200);
//   });
//   it("Cerrado de sesión correctamente", async () => {
//     const response = await requester.post("/sessions/signout").set("Cookie", [
//       token.key + "=" + token.value,
//     ]);
//     const { statusCode } = response;
//     expect(statusCode).to.be.equals(200);
//   });
//   it("Eliminación de un usuario correctamente", async () => {
//     console.log(uid);
//     const response = await requester.delete("/users/" + uid);
//     const { statusCode } = response;
//     expect(statusCode).to.be.equals(200);
//   });
// });

import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
const { Pet } = dao;

const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("Testeando ADOPTME API", () => {
  const user = {
    first_name: "coder",
    email: "coder@coder.com",
    password: "hola1234",
    role: "admin",
  };
  let uid;
  let token = {};
  
  it("Registro de un usuario correctamente", async () => {
    const response = await requester.post("/sessions/register").send(user);
    const { body, statusCode } = response;
    expect(statusCode).to.be.equals(201);
    expect(body).to.have.property("status", "success");
    expect(body).to.have.property("payload");
    expect(body.payload).to.have.property("_id");
    uid = body.payload._id; // Actualiza el ID del usuario
  });
  
  it("Inicio de sesión correctamente", async () => {
    const response = await requester.post("/sessions/login").send(user);
    const { statusCode, headers } = response;
    expect(statusCode).to.be.equals(200);
    expect(headers).to.have.property("set-cookie");
    const cookie = headers["set-cookie"][0];
    token.key = cookie.split("=")[0];
    token.value = cookie.split("=")[1];
  });
  
  it("Cerrado de sesión correctamente", async () => {
    const response = await requester.post("/sessions/signout").set("Cookie", [
      token.key + "=" + token.value,
    ]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
  
  it("Eliminación de un usuario correctamente", async () => {
    console.log(uid); // Asegúrate de que uid tenga un valor
    const response = await requester.delete("/users/" + uid);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
});
