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
		title: "Perfil logueado...",
		user: req.session.user,
	});
});

router.get("/recupero", (req, res, next) => {
	res.render("recupero", { title: "Recuperar contraseña" });
});

export default router;
