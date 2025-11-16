import { cartService } from "../services/cart.services.js";

class CartController {
	constructor(service) {
		this.service = service;
	}

	getAllCarts = async (req, res, next) => {
		try {
			const carts = await this.service.getAllCarts();
			res.status(200).json(carts);
		} catch (error) {
			next(error);
		}
	};

	getCartById = async (req, res, next) => {
		try {
			const { cid } = req.params;

			const cart = await this.service.getCartById(cid);

			if (!cart) {
				return res.status(404).json({ message: "Cart not found" });
			}
			res.status(200).json(cart);
		} catch (error) {
			next(error);
		}
	};

	createCart = async (req, res, next) => {
		try {
			const uid = req.params.uid || null;
			const newCart = await this.service.createCart(uid);
			res.status(200).json({
				status: "Correcto",
				payload: { cid: newCart._id, uid: newCart.user },
			});
		} catch (error) {
			next(error);
		}
	};

	//Suponiendo que no hay ningun carrito en la session
	addProductToCart = async (req, res, next) => {
		try {
			const { cid } = req.params;
			const { pid } = req.params;
			const updatedCart = await this.service.addProductToCart(cid, pid);
			res.status(200).json(updatedCart);
		} catch (error) {
			next(error);
		}
	};

	deleteCart = async (req, res, next) => {
		try {
			const { cid } = req.params;
			const deletedCart = await this.service.deleteCart(cid);

			res.status(200).json(deletedCart);
		} catch (error) {
			next(error);
		}
	};

	removeProductFromCart = async (req, res, next) => {
		try {
			const { cid } = req.params;
			const { pid } = req.params;

			const updatedCart = await this.service.removeProductFromCart(cid, pid);
			res.status(200).json({ message: `Product:  ${pid} removed form cart` });
		} catch (error) {
			next(error);
		}
	};

	changeProductQty = async (req, res, next) => {
		try {
			const { cid } = req.params;
			const { pid } = req.params;
			const { qty } = req.body;

			const updatedCart = await this.service.changeProductQty(cid, pid, qty);
			res.status(200).json(updatedCart);
		} catch (error) {
			next(error);
		}
	};

	clearCart = async (req, res, next) => {
		try {
			const { cid } = req.params;
			const updatedCart = await this.service.clearCart(cid);
			res.status(200).json(updatedCart);
		} catch (error) {
			next(error);
		}
	};
}

export const cartController = new CartController(cartService);
