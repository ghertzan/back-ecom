import { cartDao } from "../daos/mongo/cart.dao.js";
import { productDao } from "../daos/mongo/product.dao.js";
import { CustomError } from "../utils/CustomError.js";

class CartService {
	constructor(dao) {
		this.dao = dao;
	}

	getAllCarts = async () => {
		try {
			return await this.dao.getAllCarts();
		} catch (error) {
			throw new Error(error);
		}
	};

	getCartById = async (id) => {
		try {
			const cart = await this.dao.getCartById(id);

			if (!cart) {
				throw new CustomError("Cart not found", 404);
			}
			return cart;
		} catch (error) {
			throw new Error(error);
		}
	};

	createCart = async () => {
		try {
			const cart = await this.dao.createCart();
			if (!cart) {
				throw new CustomError("Cart not created", 500);
			}
			return cart;
		} catch (error) {
			throw new Error(error);
		}
	};

	addProductToCart = async (cid, pid) => {
		try {
			const product = await productDao.getProductById(pid);

			if (!product) {
				throw new CustomError("Error: product not exist", 404);
			}

			return await this.dao.addProductToCart(cid, product._id);
		} catch (error) {
			throw new Error(error);
		}
	};

	deleteCart = async (id) => {
		try {
			const deletedCart = await this.dao.deleteCart(id);
			if (!deletedCart) {
				throw new CustomError("Error: cart not deleted", 500);
			}
			return deletedCart;
		} catch (error) {
			throw new Error(error);
		}
	};

	removeProductFromCart = async (cid, pid) => {
		try {
			const product = await productDao.getProductById(pid);
			if (!product) {
				throw new CustomError("Error: product not found", 404);
			}
			return this.dao.removeProductFromCart(cid, product._id);
		} catch (error) {
			throw new Error(error);
		}
	};

	changeProductQty = async (cid, pid, qty) => {
		try {
			if (qty < 0) {
				throw new CustomError("Error: qty must be positive", 400);
			}

			const product = await productDao.getProductById(pid);

			if (!product) {
				throw new CustomError("Error: Product not found", 404);
			}

			if (qty === 0) {
				return await this.dao.removeProductFromCart(cid, product._id);
			}

			return await this.dao.changeProductQty(cid, product._id, qty);
		} catch (error) {
			throw new Error(error);
		}
	};

	clearCart = async (id) => {
		try {
			return await this.dao.clearCart(id);
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const cartService = new CartService(cartDao);
