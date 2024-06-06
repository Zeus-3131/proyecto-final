import {socketServer} from "../../server.js"
// import events from "../data/fs/events.fs.js";
import productsManager from "../data/fs/products.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";
// import propsEventsUtils from "./propsEvents.utils.js";

export default (socket) => {
  console.log("client " + socket.id + " connected");
  socket.emit("products", productsManager.readProducts());
  socket.on("newProduct", async (data) => {
    try {
      propsProductsUtils(data)
      await productsManager.createProduct(data);
      socketServer.emit("products", productsManager.readProducts());
    } catch (error) {
      console.log(error);
      //emitir al cliente un mensaje de alerta
    }
  });
};
