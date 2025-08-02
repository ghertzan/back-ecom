import fs from "fs";
import { idGenerator } from "../utils/utils.js";
import { productManager } from "./product-manager.js";
import { log } from "console";

class CartManager {
	constructor(path) {
		this.path = path;
	}

	/* 
    Crea un carro y lo agrega al listado de carros
	items: Array de obj
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

	async addToCart(cid, pid) {
		try {
			const carts = await this.getCarts();
			const cart = await this.getCartById(cid);
			const product = await productManager.getProductById(pid);
			const productInCart = cart.products.find((prod) => prod.item.id === pid);

			if (!productInCart) {
				cart.products.push({ item: product, qty: 1 });
			} else {
				cart.products.forEach((prod) => {
					if (prod.item.id === pid) {
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
