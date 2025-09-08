import { cartModel } from "./models/cart.model.js";

class CartDao {
	constructor(model) {
		this.model = model;
	}

	getAllCarts = async () => {
		try {
			return await this.model.find({});
		} catch (error) {
			throw new Error(error);
		}
	};

	getCartById = async (id) => {
		try {
			return await this.model.findById(id).populate("items.product");
		} catch (error) {
			throw new Error(error);
		}
	};

	createCart = async () => {
		try {
			const a = await this.model.create({
				items: [],
			});
			console.log(a);
			return a;
		} catch (error) {
			throw new Error(error);
		}
	};

	addProductToCart = async (cid, pid) => {
		try {
			let updatedCart = await this.model.findOneAndUpdate(
				{ _id: cid, "items.product": pid },
				{ $inc: { "items.$.qty": 1 } },
				{ new: true }
			);
			if (!updatedCart) {
				updatedCart = await this.model.findByIdAndUpdate(
					cid,
					{ $push: { items: { product: pid, qty: 1 } } },
					{ new: true }
				);
			}
			return updatedCart;
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteCart = async (id) => {
		try {
			return await this.model.findByIdAndDelete(id);
		} catch (error) {
			throw new Error(error);
		}
	};

	removeProductFromCart = async (cid, pid) => {
		try {
			return await this.model.findByIdAndUpdate(
				cid,
				{ $pull: { items: { product: pid } } },
				{ new: true }
			);
		} catch (error) {
			throw new Error(error);
		}
	};

	changeProductQty = async (cid, pid, qty) => {
		try {
			return await this.model.findOneAndUpdate(
				{ _id: cid, "items.product": pid },
				{ $set: { "items.$.qty": qty } },
				{ new: true }
			);
		} catch (error) {
			throw new Error(error);
		}
	};

	clearCart = async (id) => {
		try {
			return await this.model.findOneAndUpdate(
				{ _id: id },
				{ $set: { items: [] } },
				{ new: true }
			);
		} catch (error) {
			throw new Error(error);
		}
	};

	// isInCart = async (cid, pid) => {
	// 	try {
	// 		return await this.model.findOne({
	// 			_id: cid,
	// 			items: { $matchElement: { product: pid } },
	// 		});
	// 	} catch (error) {
	// 		throw new Error(error);
	// 	}
	// };
}

export const cartDao = new CartDao(cartModel);
