import jwt from "jsonwebtoken";
import envs from "../config/envs.js";
import { userServices } from "../services/user.services.js";

export const cartAuthHandler = async (req, res, next) => {
	const { cid } = req.params;

	const authHeaders = req.headers.authorization;
	if (!authHeaders)
		return res.status(401).json({ status: "Error", message: "No autorizado" });
	const token = authHeaders.split(" ")[1];

	const user = jwt.verify(token, envs.JWT_SECRET);
};
