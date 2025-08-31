import { productManager } from "../managers/product-manager.js";

class ProductController {
	constructor(manager) {
		this.manager = manager;
	}

	getAll = async (req, res, next) => {
		try {
			const products = await this.manager.getAll();
			res.json(products);
		} catch (error) {
			next(error);
		}
	};

	getById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const product = await this.manager.getById(id);
			if (!product) {
				return res.staus(404).json({ message: "Product not found" });
			}
			res.json(product);
		} catch (error) {
			next(error);
		}
	};

	create = async (req, res, next) => {
		try {
			console.log(req.body);

			const productData = req.body;
			console.log(productData);
			const newProduct = await this.manager.create(productData);
			res.status(201).json(newProduct);
		} catch (error) {
			next(error);
		}
	};

	update = async (req, res, next) => {
		try {
			const { id } = req.params;
			const productData = req.body;
			const updatedProduct = await this.manager.update(id, productData);
			if (!updatedProduct) {
				return res.status(404).json({ message: "Product not found" });
			}
			res.json(updatedProduct);
		} catch (error) {
			next(error);
		}
	};

	delete = async (req, res, next) => {
		try {
			const { id } = req.params;
			const deletedProduct = await this.manager.delete(id);
			if (!deletedProduct) {
				return res.status(404).json({ message: "Product not found" });
			}
		} catch (error) {
			next(error);
		}
	};
}

export const productController = new ProductController(productManager);
