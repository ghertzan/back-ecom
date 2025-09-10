import { productModel } from "../models/products-model.js";

class ProductManager {
	constructor(model) {
		this.model = model;
	}

	getAll = async () => {
		try {
			return await this.model.find();
		} catch (error) {
			throw new Error(error);
		}
	};

	getById = async (id) => {
		try {
			return await this.model.findById(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	create = async (productObj) => {
		try {
			return await this.model.create(productObj);
		} catch (error) {
			throw new Error(error);
		}
	};

	update = async (id, productData) => {
		try {
			return await this.model.findByIdAndUpdate(id, productData, { new: true });
		} catch (error) {
			throw new Error(error);
		}
	};

	delete = async (id) => {
		try {
			return await this.model.findByIdAndDelete(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const productManager = new ProductManager(productModel);
