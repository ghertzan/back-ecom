import { productDao } from "../daos/mongo/product.dao.js";
import { CustomError } from "../utils/CustomError.js";

class ProductService {
	constructor(dao) {
		this.dao = dao;
	}

	getAllProducts = async (page, limit, query, sort) => {
		try {
			const products = await this.dao.getAllProducts(page, limit, query, sort);
			return products;
		} catch (error) {
			throw new Error(error);
		}
	};

	getProductById = async (id) => {
		try {
			const product = await this.dao.getProductById(id);
			if (!product) {
				throw new CustomError("Product not found", 404);
			}
			return product;
		} catch (error) {
			throw new Error(error);
		}
	};

	createProduct = async (productObj) => {
		try {
			const newProduct = await this.dao.createProduct(productObj);
			if (!newProduct) {
				throw new CustomError("Error: product not created", 500);
			}
			return newProduct;
		} catch (error) {
			throw new Error(error);
		}
	};

	updateProduct = async (id, productData) => {
		try {
			const updatedProduct = await this.dao.updateProduct(id, productData);
			if (!updatedProduct) {
				throw new CustomError("Error: product not updated", 500);
			}
			return updatedProduct;
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteProduct = async (id) => {
		try {
			const deletedProduct = await this.dao.deleteProduct(id);
			if (!deletedProduct) {
				throw new CustomError("Error: product not deleted", 500);
			}
			return deletedProduct;
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const productService = new ProductService(productDao);
