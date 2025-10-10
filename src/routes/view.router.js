import { Router } from "express";

const router = Router();

router.get("/register", (req, res, next) => {
	res.render("register", { title: "Proceso de registro" });
});

router.get("/login", (req, res, next) => {
	res.render("login", { title: "Login..." });
});

router.get("/profile", (req, res, next) => {
	res.render("profile", {
		title: "Perrfil logueado...",
		user: req.session.user,
	});
});

export default router;
