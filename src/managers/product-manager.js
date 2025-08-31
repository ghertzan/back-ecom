import { productModel } from "../models/products-model";
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
			return this.model.create(productObj);
		} catch (error) {
			throw new Error(error);
		}
	};

	update = async (id, productData) => {
		try {
			return this.model.findByIdAndUpdate(id, productData, { new: true });
		} catch (error) {
			throw new Error(error);
		}
	};

	delete = async (id) => {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const productManager = new ProductManager(productModel);
