import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";

const router = Router();

router.get("/", cartController.getAllCarts);

router.post("/", cartController.createCart);

router.get("/:cid", cartController.getCartById);

router.delete("/:cid/products/:pid", cartController.removeProductFromCart);

router.post("/:cid/products/:pid", cartController.addProductToCart);

router.put("/:cid/products/:pid", cartController.changeProductQty);

router.delete("/:cid", cartController.clearCart);

export default router;
