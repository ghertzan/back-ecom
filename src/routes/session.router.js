import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();
router.post("/register", userController.createUser);
router.post("/login", passport.authenticate("login"), userController.login);
router.post("/recupero", userController.resetPassword);
router.post("/logout", userController.logout);
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	userController.current
);

export default router;
