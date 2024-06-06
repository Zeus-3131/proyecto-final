import crypto from "crypto";
import notFoundOne from "../../utils/notFoundOne.util.js";

class ProductsManager {
  static #products = [];

  constructor() {}

  async create(data) {
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        image: data.image || "https://example.com/default-image.jpg",
        price: data.price || 10,
        stock: data.stock || 50,
        date: data.date || new Date(),
      };

      ProductsManager.#products.push(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  read({ filter, options }) {
    try {
      if (ProductsManager.#products.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        // Aplicar filtros y opciones si es necesario
        return ProductsManager.#products;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const one = ProductsManager.#products.find((product) => product.id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(productId, data) {
    try {
      const product = this.readOne(productId);
      notFoundOne(product);

      // Actualizar los campos especificados en 'data'
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          product[key] = data[key];
        }
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const product = this.readOne(id);
      notFoundOne(product);

      ProductsManager.#products = ProductsManager.#products.filter(
        (product) => product.id !== id
      );

      return product;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;
