import { ticketServices } from "../services/ticket.services.js";
import { v4 as uuid } from "uuid";
import { cartService } from "../services/cart.services.js";
import { productService } from "../services/product.services.js";

class TicketController {
	constructor(services) {
		this.services = services;
	}

	create = async (req, res) => {
		try {
			const user = req.user;
			const { cid } = req.params;

			const cartFound = await cartService.getCartById(cid);
			if (!cartFound) {
				return res
					.status(404)
					.json({ status: "Error", message: "Carrito no encontrado" });
			}
			if (!cartFound.items.length) {
				return res
					.status(400)
					.json({ status: "Error", message: "Carrito vacío" });
			}
			const cartItems = cartFound.items;
			const excluded = [];
			const itemsToKeep = [];

			for (const item of cartItems) {
				const productFound = await productService.getProductById(
					item.product._id
				);
				if (!productFound) {
					throw new Error("Producto no encontrado");
				}
				if (item.qty <= productFound.stock) {
					await productService.updateProduct(item.product._id, {
						stock: productFound.stock - item.qty,
					});
					itemsToKeep.push(item);
				} else {
					excluded.push(item);
				}
			}

			cartItems.length = 0;
			cartItems.push(...itemsToKeep);

			if (!cartItems.length) {
				return res.status(400).json({
					status: "Error",
					message: "Todos los articulos de carrito tiene problemas",
					payload: excluded,
				});
			}

			let amount = 0;
			cartItems.forEach((e) => {
				amount = amount + e.qty * e.product.price;
			});

			cartFound.items = excluded;
			await cartFound.save();

			const newTicket = {
				code: uuid(),
				amount: amount,
				purchaser: user.email,
			};

			const ticket = await ticketServices.create(newTicket);
			res
				.status(200)
				.json({ status: "Success", payload: { ticket, excluded } });
		} catch (error) {
			res.status(500).json({ status: "Error", message: error.message });
		}
	};
}
export const ticketController = new TicketController(ticketServices);
