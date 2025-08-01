import { request, response, Router } from "express";
import { productManager } from "../managers/product-manager.js";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const products = await productManager.getProducts();
		res.json(products);
	} catch (error) {
		next(error);
	}
});

router.get("/:pid", async (req, res, next) => {
	try {
		const { pid } = req.params;

		const product = await productManager.getProductById(parseInt(pid));
		res.json(product);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const product = req.body;
		await productManager.setProduct(product);
		res.json(product);
	} catch (error) {
		next(error);
	}
});

router.put("/:pid", async (req, res, next) => {
	try {
		const { pid } = req.params;
		const toUpdate = req.body;
		const updatedProduct = await productManager.updateProduct(
			toUpdate,
			parseInt(pid)
		);
		res.json(updatedProduct);
	} catch (error) {
		next(error);
	}
});

router.delete("/:pid", async (req, res, next) => {
	try {
		const { pid } = req.params;
		const deletedProduct = await productManager.deleteProduct(parseInt(pid));
		res.json(deletedProduct);
	} catch (error) {
		next(error);
	}
});

export default router;
