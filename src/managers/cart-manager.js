import fs from "fs";
import { idGenerator } from "../utils/utils.js";
import { productManager } from "./product-manager.js";

class CartManager {
	constructor(path) {
		this.path = path;
	}

	/**
	 * Crea un carrito de compras
	 * @returns Carrito de compras vacío.
	 */
	async createCart() {
		try {
			const carts = await this.getCarts();
			const cart = { id: idGenerator(), products: [] };
			carts.push(cart);
			await fs.promises.writeFile(this.path, JSON.stringify(carts));
			return cart;
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @returns Array con carritos de compras si existen, si no un array vacío.
	 */
	async getCarts() {
		try {
			if (fs.existsSync(this.path)) {
				const carts = await fs.promises.readFile(this.path, "utf-8");

				if (carts) {
					return JSON.parse(carts);
				}
			}
			return [];
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param {number} cid Código del producto
	 * @returns El carrito encontrado o un error
	 */
	async getCartById(cid) {
		try {
			const carts = await this.getCarts();
			const cartFound = carts.find((cart) => cart.id === cid);
			if (!cartFound) {
				throw new Error("cart not found");
			}
			return cartFound;
		} catch (error) {
			throw error;
		}
	}
	/**
	 *
	 * @param {number} cid
	 * @param {number} pid
	 * @returns El carrito con el atrículo nuevo o incremento en el artículo
	 */

	async addToCart(cid, pid) {
		try {
			const carts = await this.getCarts();
			const cart = await this.getCartById(cid);
			const product = await productManager.getProductById(pid);
			const productInCart = cart.products.find(
				(prod) => prod.productId === pid
			);

			if (!productInCart) {
				cart.products.push({ productId: product.id, qty: 1 });
			} else {
				cart.products.forEach((prod) => {
					if (prod.productId === pid) {
						prod.qty++;
					}
				});
			}
			const updatedCarts = carts.filter((cart) => cart.id !== cid);
			updatedCarts.push(cart);
			await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
			return cart;
		} catch (error) {
			throw error;
		}
	}
}

export const cartManager = new CartManager("./src/data/carts.json");
