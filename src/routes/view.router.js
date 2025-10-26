import { Router } from "express";
import { tokenVerify } from "../utils/utils.js";
import passport from "passport";

const router = Router();

router.get("/register", (req, res, next) => {
	res.render("register", { title: "Proceso de registro" });
});

router.get("/login", (req, res, next) => {
	res.render("login", { title: "Login..." });
});

router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.render("profile", {
			title: "Usuario Logueado...",
			user: req.user,
		});
	}
);

router.get("/recupero", (req, res, next) => {
	res.render("recupero", { title: "Recuperar contraseña" });
});

export default router;
