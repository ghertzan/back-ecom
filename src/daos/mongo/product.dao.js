import { productModel } from "./models/product.model.js";

class ProductDao {
	constructor(model) {
		this.model = model;
	}

	getAllProducts = async () => {
		try {
			return await this.model.find({});
		} catch (error) {
			throw new Error(error);
		}
	};

	getProductById = async (id) => {
		try {
			return await this.model.findById(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	createProduct = async (productObj) => {
		try {
			return await this.model.create(productObj);
		} catch (error) {
			throw new Error(error);
		}
	};

	updateProduct = async (id, productData) => {
		try {
			return await this.model.findByIdAndUpdate(id, productData, { new: true });
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteProduct = async (id) => {
		try {
			return await this.model.findByIdAndDelete(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const productDao = new ProductDao(productModel);
