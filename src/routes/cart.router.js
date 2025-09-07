import { Router } from "express";
import { cartController } from "../controllers/carts.controller.js";

const router = Router();

/**
 * Crea un carro vavío y devuelve el id del carro
 */

router.get("/", cartController.getAllCarts);

router.post("/", cartController.createCart);

router.get("/:cid", cartController.getCartById);

router.delete("/:cid/products/:pid", cartController.removeProductFromCart);

router.put("/:cid/product/:pid", cartController.addProductToCart);

router.delete("/:cid", cartController.clearCart);

export default router;
