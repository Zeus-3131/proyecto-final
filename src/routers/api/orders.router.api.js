import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  report,
  update,
  destroy,
  readOne,
} from "../../controllers/orders.controller.js";
import isauth from '../../middlewares/isAuth.mid.js';

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM"], isauth, create);
    this.read("/bills/:uid", ["ADMIN"], isauth, report);
    this.read("/", ["USER", "PREM"], isauth, read);
    this.update("/:oid", ["USER", "PREM"], isauth, update);
    this.destroy("/:oid", ["USER", "PREM"], isauth, destroy);
    this.readOne("/:oid", ["USER", "PREM"], isauth, readOne); // Agregado readOne al enrutador
  }
}

const ordersRouter = new OrdersRouter(); 
export default ordersRouter.getRouter();
