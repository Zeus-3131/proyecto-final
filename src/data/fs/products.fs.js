import Product from "../mongo/models/product.model.js";
import ProductDTO from "../../dto/product.dto.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductsManager {
  async create(data) { 
    try {
      if (!data.nombre || data.nombre.trim() === '') {
        throw new Error("El nombre del producto es requerido");
      }

      const productDTO = new ProductDTO(data);
      const product = new Product(productDTO);

      await product.save();
      console.log("Producto creado:", product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const products = await Product.find();
      if (products.length === 0) {
        throw new Error("¡No hay productos!");
      } else {
        console.log(products);
        return products;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error("No hay ningún producto con id=" + id);
      }
      console.log(product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error(`No document found for query "{ _id: ${id} }" on model "products"`);
      }

      Object.assign(product, data);
      product.updatedAt = new Date();

      await product.save();
      console.log("Producto actualizado:", product);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        throw new Error(`No document found for query "{ _id: ${id} }" on model "products"`);
      }

      console.log("Producto eliminado:", product);
      return { product, message: "Producto eliminado satisfactoriamente" };
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;
