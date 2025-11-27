import jwt from "jsonwebtoken";
import envs from "../config/envs.js";

export const policiesHandler = (policies) => (req, res, next) => {
	if (policies[0] === "PUBLIC") return next();

	const authHeaders = req.headers.authorization;
	if (!authHeaders)
		return res
			.status(401)
			.json({ status: "Error", message: "No autorizado - PH" });
	const token = authHeaders.split(" ")[1];

	const user = jwt.verify(token, envs.JWT_SECRET);

	if (!policies.includes(user.role.toUpperCase())) {
		return res
			.status(403)
			.json({ status: "Error", message: "Sin acceso, sin permiso para esto" });
	}
	req.user = user;
	next();
};
