import { cartModel } from "./models/cart.model.js";
import { userServices } from "../../services/user.services.js";
import mongoose from "mongoose";

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

	getCartByUserId = async (uid) => {
		try {
			if (!uid) throw new Error("Se requiere uid");
			if (!mongoose.Types.ObjectId.isValid(uid)) {
				console.warn("uid no es un ObjectId válido:", uid);
			}
			const found = await this.model
				.find({ user: uid })
				.populate("items.product");
			return found;
		} catch (error) {
			throw new Error(error);
		}

		// 	try {
		// 		const found = await this.model.find({ user: uid });
		// 		console.log("Encontrado: ", found);
		// 		return found;

		// 		// return await this.model.find({ user: uid });
		// 	} catch (error) {
		// 		throw new Error(error);
		// 	}
	};

	getCartById = async (id) => {
		try {
			return await this.model.findById(id).populate("items.product");
		} catch (error) {
			throw new Error(error);
		}
	};

	createCart = async (uid) => {
		try {
			let newCart = null;
			if (!uid) {
				newCart = await this.model.create({
					items: [],
				});
			} else {
				newCart = await this.model.create({
					user: uid,
					items: [],
				});
				const user = await userServices.findById(uid);
				user.carts.push({ cartId: newCart._id });
				await user.save();
			}
			return newCart;
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
			let updatedCart = await this.model.findOneAndUpdate(
				{ _id: cid, "items.product": pid },
				{ $set: { "items.$.qty": qty } },
				{ new: true }
			);
			if (!updatedCart) {
				updatedCart = await this.model.findByIdAndUpdate(
					cid,
					{ $push: { items: { product: pid, qty: qty } } },
					{ new: true }
				);
			}
			return updatedCart;
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
