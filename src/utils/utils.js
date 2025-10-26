import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envs from "../config/envs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "..");

export const createHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
export const isValidPassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

export const createToken = (userObject) => {
	const token = jwt.sign(userObject, envs.JWT_SECRET, { expiresIn: "1h" });
	return token;
};

export const tokenVerify = (token) => {
	try {
		return jwt.verify(token, envs.JWT_SECRET);
	} catch (error) {
		return null;
	}
};

export function currencyFormat(amount) {
	return new Intl.NumberFormat("es-AR", {
		style: "currency",
		currency: "ARS",
	}).format(amount);
}

export { join, __dirname };
