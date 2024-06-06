import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    // Usuarios no logueados
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["PUBLIC"], readOne);

    // pruebas en el crud de products 
    this.create("/", ["PUBLIC"], create);
    this.update("/:pid", ["PUBLIC"], update);
    this.destroy("/:pid", ["PUBLIC"], destroy);
    
    // Usuarios comunes
    this.read("/", ["USER"], read);
    this.read("/:pid", ["USER"], readOne);
    
    // Administradores
    this.create("/", ["ADMIN"], create);
    this.read("/", ["ADMIN"], read);
    this.read("/:pid", ["ADMIN"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
    
    // Usuarios premium
    this.create("/", ["PREM"], create);
    this.read("/", ["PREM"], read);
    this.read("/me", ["PREM"], read); // Asumiendo que read es adecuado para esta ruta
    this.read("/:pid", ["PREM"], readOne);
    this.update("/:pid", ["PREM"], update);
    this.destroy("/:pid", ["PREM"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
