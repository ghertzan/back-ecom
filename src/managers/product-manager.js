import fs from "fs";

class ProductManager {
	constructor(path) {
		this.path = path;
	}

	idGenerator() {
		return parseInt(Math.random() * 100000);
	}

	async getProducts() {
		if (fs.existsSync(this.path)) {
			const products = await fs.promises.readFile(this.path, "utf-8");
			return JSON.parse(products);
		}
		return [];
	}

	async getProductById(id) {
		try {
			const products = await this.getProducts();
			const productFound = products.find((product) => product.id === id);
			if (!productFound) {
				throw new Error("Product not found");
			}
			return productFound;
		} catch (error) {
			throw error;
		}
	}

	async setProduct(obj) {
		const product = { ...obj, id: this.idGenerator() };
		const products = await this.getProducts();
		products.push(product);
		try {
			await fs.promises.writeFile(this.path, JSON.stringify(products));
			return product;
		} catch (error) {
			console.error(error);
		}
	}

	/*
    Pre-condición el producto debe existir
     */
	async updateProduct(obj, id) {
		try {
			const products = await this.getProducts();
			let updatedProduct = await this.getProductById(id);
			updatedProduct = { ...updatedProduct, ...obj };
			const newProductsArray = products.filter((product) => product.id !== id);
			newProductsArray.push(updatedProduct);
			await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray));
			return updatedProduct;
		} catch (error) {
			throw error;
		}
	}

	async deleteProduct(id) {
		try {
			const products = await this.getProducts();
			const toDeleteProduct = await this.getProductById(id);
			const newProductsArray = products.filter((product) => product.id !== id);
			await fs.promises.writeFile(this.path, JSON.stringify(newProductsArray));
			return toDeleteProduct;
		} catch (error) {
			throw error;
		}
	}
}

export const productManager = new ProductManager("./src/data/products.json");
