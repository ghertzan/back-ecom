import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import { policiesHandler } from "../middleware/policiesHandler.js";

const router = Router();

router.get("/", policiesHandler(["PUBLIC"]), productController.getAllProducts);
router.get(
	"/:id",
	policiesHandler(["PUBLIC"]),
	productController.getProductById
);
router.post("/", policiesHandler(["ADMIN"]), productController.createProduct);
router.put("/:id", policiesHandler(["ADMIN"]), productController.updateProduct);
router.delete(
	"/:id",
	policiesHandler(["ADMIN"]),
	productController.deleteProduct
);

export default router;
