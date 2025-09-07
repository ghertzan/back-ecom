import { productService } from "../services/product.services.js";

class ProductController {
	constructor(service) {
		this.service = service;
	}

	getAllProducts = async (req, res, next) => {
		try {
			const products = await this.service.getAllProducts();
			res.json(products);
		} catch (error) {
			next(error);
		}
	};

	getProductById = async (req, res, next) => {
		try {
			const { id } = req.params;
			const product = await this.service.getProductById(id);
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	};

	createProduct = async (req, res, next) => {
		try {
			const productData = req.body;
			const newProduct = await this.service.createProduct(productData);
			res.status(200).json(newProduct);
		} catch (error) {
			next(error);
		}
	};

	updateProduct = async (req, res, next) => {
		try {
			const { id } = req.params;
			const productData = req.body;
			const updatedProduct = await this.service.updateProduct(id, productData);
			res.status(200).json(updatedProduct);
		} catch (error) {
			next(error);
		}
	};

	deleteProduct = async (req, res, next) => {
		try {
			const { id } = req.params;
			const deletedProduct = await this.service.deleteProduct(id);
			res.json.status(200)(deletedProduct);
		} catch (error) {
			next(error);
		}
	};
}

export const productController = new ProductController(productService);
