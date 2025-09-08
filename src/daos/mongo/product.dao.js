import { productModel } from "./models/product.model.js";

class ProductDao {
	constructor(model) {
		this.model = model;
	}

	getAllProducts = async (page = 1, limit = 10, query, sort) => {
		try {
			const filter = {};
			if (query) {
				const parsed = JSON.parse(query);
				Object.assign(filter, parsed);
				console.log(filter);
			}
			let sortOrder = {};

			if (sort) {
				sortOrder.price = sort === "asc" ? 1 : sort === "des" ? -1 : null;
			}
			return await this.model.paginate(filter, {
				page,
				limit,
				sort: sortOrder,
			});
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
