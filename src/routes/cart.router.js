import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";
import { policiesHandler } from "../middleware/policiesHandler.js";
import { ticketController } from "../controllers/ticket.controller.js";

const router = Router();

router.post(
	"/:cid/purchase",
	policiesHandler(["USER"]),
	ticketController.create
);

router.get("/", policiesHandler(["ADMIN"]), cartController.getAllCarts);

router.post("/{:uid}", policiesHandler(["PUBLIC"]), cartController.createCart);

router.get(
	"/:cid",
	policiesHandler(["ADMIN, USER"]),
	cartController.getCartById
);

router.delete(
	"/:cid/products/:pid",
	policiesHandler(["USER"]),
	cartController.removeProductFromCart
);

router.post(
	"/:cid/products/:pid",
	policiesHandler(["USER"]),
	cartController.addProductToCart
);

router.put(
	"/:cid/products/:pid",
	policiesHandler(["USER"]),
	cartController.changeProductQty
);

router.delete("/:cid", policiesHandler(["USER"]), cartController.clearCart);

export default router;
