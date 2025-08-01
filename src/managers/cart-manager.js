import fs from "fs";
import { idGenerator } from "../utils/utils.js";
import { productManager } from "./product-manager.js";

class CartManager {
	constructor(path) {
		this.path = path;
	}

	/* 
    Crea un carro y lo agrega al listado de carros
    */
	async createCart() {
		try {
			const carts = await this.getCarts();
			const cart = { id: idGenerator(), products: [] };
			carts.push(cart);
			await fs.promises.writeFile(this.path, JSON.stringify(carts));
		} catch (error) {
			throw error;
		}
	}

	async getCarts() {
		try {
			if (fs.existsSync(this.path)) {
				const carts = await fs.promises.readFile(this.path, "utf-8");
				return JSON.parse(carts);
			}
			return [];
		} catch (error) {
			throw error;
		}
	}

	async getCartById(cid) {
		try {
			const carts = await this.getCarts();
			const cartFound = carts.find((cart) => cart.id === id);
			if (!cartFound) {
				throw new Error(`Cart not found by id: ${cid}`);
			}
			return cartFound;
		} catch (error) {
			throw error;
		}
	}

	async addToCart(cid, pid, qty) {
		try {
			const cart = this.getCartById(cid);
			const product = await productManager.getProductById(pid);
			const productInCart = cart.products.find((prod) => prod.pid === pid);
			if (!productInCart) {
				cart.products.push({ pid, qty });
			} else {
			}
		} catch (error) {
			throw error;
		}
	}
}

export const cartManager = new CartManager("../../src/data/carts.json");
