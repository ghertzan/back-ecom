import { Router } from "express";
import { cartManager } from "../managers/cart-manager.js";
import { productManager } from "../managers/product-manager.js";

const router = Router();

/**
 * Crea un carro vavío y devuelve el id del carro
 */
router.post("/", async (req, res, next) => {
	try {
		const cart = await cartManager.createCart();
		res.json(cart.id);
	} catch (error) {
		next(error);
	}
});

router.get("/:cid", async (req, res, next) => {
	try {
		const { cid } = req.params;
		const cartFound = await cartManager.getCartById(parseInt(cid));
		res.json(cartFound.products);
	} catch (error) {
		next(error);
	}
});

router.post("/:cid/product/:pid", async (req, res, next) => {
	try {
		const { cid } = req.params;
		const { pid } = req.params;
		const newCart = await cartManager.addToCart(parseInt(cid), parseInt(pid));
		res.json(newCart.products);
	} catch (error) {
		next(error);
	}
});

export default router;
