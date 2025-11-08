import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";
import { policiesHandler } from "../middleware/policiesHandler.js";

const router = Router();

router.get("/", policiesHandler(["ADMIN"]), cartController.getAllCarts);

router.post("/{:uid}", policiesHandler(["PUBLIC"]), cartController.createCart);

router.get(
	"/:cid",
	policiesHandler(["ADMIN, USER"]),
	cartController.getCartById
);

router.delete(
	"/:cid/products/:pid",
	policiesHandler(["PUBLIC"]),
	cartController.removeProductFromCart
);

router.post(
	"/:cid/products/:pid",
	policiesHandler(["PUBLIC"]),
	cartController.addProductToCart
);

router.put(
	"/:cid/products/:pid",
	policiesHandler(["PUBLIC"]),
	cartController.changeProductQty
);

router.delete("/:cid", policiesHandler(["PUBLIC"]), cartController.clearCart);

export default router;
