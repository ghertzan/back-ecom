import jwt from "jsonwebtoken";
import envs from "../config/envs.js";
import { cartService } from "../services/cart.services.js";

export const cartAuthHandler = async (req, res, next) => {
	const { cid } = req.params;

	const authHeaders = req.headers.authorization;
	if (!authHeaders)
		return res
			.status(401)
			.json({ status: "Error", message: "No autorizado - AuthToken" });
	const token = authHeaders.split(" ")[1];
	const user = jwt.verify(token, envs.JWT_SECRET);
	const carts = await cartService.getCartByUserId(user._id);
	const cartFound = carts.filter((cart) => cart._id.toString() === cid);
	if (cartFound.length === 0) {
		return res
			.status(401)
			.json({ status: "Error", message: "No autorizado - No es tu carrito" });
	}
	return next();
};
