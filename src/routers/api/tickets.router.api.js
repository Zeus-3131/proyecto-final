import CustomRouter from "../CustomRouter.js";
import { calculateTotal } from "../../controllers/tickets.controller.js"

class TicketsRouter extends CustomRouter {
  init() {
    // Rutas para usuarios logueados
    this.read("/", ["USER", "PREM"], calculateTotal);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
