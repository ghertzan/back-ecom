import { userServices } from "../services/user.services.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import { createToken } from "../utils/utils.js";

class UserController {
	constructor(services) {
		this.services = services;
	}

	/* createUser = async (req, res, next) => {
		const { first_name, last_name, email, password } = req.body;
		try {
			const exists = await this.services.getUserByEmail(email);
			if (exists) {
				return res.status(400).json({ message: "email already registered" });
			}
			const hashedPassword = createHash(password);
			const newUser = {
				first_name,
				last_name,
				email,
				password: hashedPassword,
			};
			const result = await this.services.createUser(newUser);
			res.redirect("/login");
		} catch (error) {
			next(error);
		}
	}; */

	createUser = async (newUser) => {
		try {
			const user = this.services.createUser(newUser);
			return user;
		} catch (error) {
			console.log(error.message);
		}
	};

	findUserByEmail = async (email) => {
		try {
			const foundUser = await this.services.getUserByEmail(email);
			if (foundUser) {
				return foundUser;
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	getUserByEmail = async (req, res, next) => {
		const { email } = req.body;
		try {
			const foundUser = this.services.getUserByEmail(email);
			if (foundUser) {
				return res.status(200).json(foundUser);
			}
			res.status(404).json({ message: "email do not exist." });
		} catch (error) {
			next(error);
		}
	};

	findById = async (id) => {
		try {
			const userFound = await this.services.findById(id);
			return userFound;
		} catch (error) {
			throw new Error(error);
		}
	};

	login = async (req, res) => {
		const { email, password } = req.body;
		try {
			const exist = await this.services.getUserByEmail(email);
			if (exist) {
				const isValid = isValidPassword(password, exist.password);
				if (isValid) {
					const validUser = {
						first_name: exist.first_name,
						last_name: exist.last_name,
						email: exist.email,
						age: exist.age,
						role: exist.role,
					};
					const token = createToken(validUser);
					res.cookie("authCookie", token, { maxAge: 360000, httpOnly: true });
					return res.status(200).redirect("/api/session/current");
				}
			}
			res.status(401).json({ message: "Error en credenciales" });
		} catch (error) {
			console.log(error);
			res.status();
		}
	};

	resetPassword = async (req, res) => {
		const { email, password } = req.body;
		try {
			const userFound = await this.services.getUserByEmail(email);

			const hashedPassword = createHash(password);

			userFound.password = hashedPassword;
			await userFound.save();

			res.redirect("/login");
		} catch (error) {
			res
				.status(500)
				.json({ message: "Internal server error", err: error.message });
		}
	};

	logout = async (req, res, next) => {
		console.log(req.cookies);
		res.clearCookie("authCookie");
		res.status(200).json({ message: "Logout exitoso" });
	};
}

export const userController = new UserController(userServices);
