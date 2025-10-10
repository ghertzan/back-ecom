import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

// router.post("/register", userController.createUser);
router.post(
	"/register",
	passport.authenticate("register", { failureRedirect: "failregister" }),
	async (req, res) => {
		res.redirect("/login");
	}
);
router.get("/failregister", (req, res) => {
	res.status(400).json({ status: "error", message: "Registry Error" });
});

router.post("/login", userController.login);
router.post("/recupero", userController.resetPassword);

export default router;
