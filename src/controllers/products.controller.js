import service from "../services/products.service.js";

class ProductsController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.status(201).json({ status: 201, response, message: "Producto creado" });
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.idcat) {
        filter.idcat = req.query.idcat;
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const all = await this.service.read({ filter, options });
      return res.status(200).json({ status: 200, all });
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await this.service.readOne(pid);
      return res.status(200).json({ status: 200, one });
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const response = await this.service.update(pid, data); 
      return res.status(200).json({ status: 200, response, message: "Producto actualizado" });
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.destroy(pid); 
      return res.status(200).json({status: 200, response, message: "Producto eliminado"});
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
