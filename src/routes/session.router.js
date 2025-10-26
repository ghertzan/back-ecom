import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import passport from "passport";

const router = Router();

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
router.post("/logout", userController.logout);
router.get(
	"/current",
	passport.authenticate("jwt", {
		session: false,
		failureRedirect: "failCurrent",
	}),
	(req, res) => {
		res.render("profile", {
			title: "Usuario logueado...",
			user: req.user,
		});
	}
);
router.get("/failCurrent", (req, res) => {
	res.status(401);
	res.redirect("/login");
});

export default router;
