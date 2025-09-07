import { cartModel } from "../daos/mongo/models/cart.model.js";
class CartManager {
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

	create = async (cartObj) => {
		try {
			return await this.model.create(cartObj);
		} catch (error) {
			throw new Error(error);
		}
	};

	update = async (id, cartData) => {
		try {
			return await this.model.findByIdAndUpdate(id, cartData, { new: true });
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

export const cartManager = new CartManager(cartModel);
