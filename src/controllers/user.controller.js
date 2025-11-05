import { userServices } from "../services/user.services.js";
import { createHash, createToken } from "../utils/utils.js";

class UserController {
	constructor(services) {
		this.services = services;
	}

	createUser = async (req, res) => {
		const { first_name, last_name, email, age, role, password } = req.body;
		try {
			const exist = await this.services.getUserByEmail(email);
			if (exist) {
				res.status(400).json({ status: "Error", message: "Usuario ya existe" });
				return res.redirect("/login");
			}
			const newUser = {
				first_name,
				last_name,
				email,
				age,
				role,
				password: createHash(password),
			};
			let user = await this.services.createUser(newUser);
			res.status(200).json({ status: "Usuario creado", payload: user._id });
		} catch (error) {
			return res.status(500).json({ status: "Error", message: error.message });
		}
	};

	findUserByEmail = async (req, res) => {
		console.log("here");

		try {
			const { email } = req.body;
			console.log(email);

			const foundUser = await this.services.getUserByEmail(email);
			if (!foundUser) {
				res
					.status(400)
					.json({ status: "Error", message: "Usuario no encontrado" });
				return null;
			}
			return foundUser;
		} catch (error) {
			return res.status(500).json({ status: "Error", message: error.message });
		}
	};

	login = (req, res) => {
		try {
			if (!req.user) throw new Error("Error de credenciales");
			const token = createToken(req.user);
			res.cookie("authCookie", token, { maxAge: 360000, httpOnly: true });
			res.sendStatus(200);
		} catch (error) {
			res.status(500).json({ status: "Error", message: error.message });
		}
	};
	current = (req, res) => {
		res.status(200).json({ status: "Exito", payload: req.user });
	};

	findById = async (id) => {
		try {
			const userFound = await this.services.findById(id);
			return userFound;
		} catch (error) {
			throw new Error(error);
		}
	};

	resetPassword = async (req, res) => {
		const { email, password } = req.body;
		try {
			const userFound = await this.services.getUserByEmail(email);

			const hashedPassword = createHash(password);

			userFound.password = hashedPassword;
			await userFound.save();

			res.sendStatus(200);
		} catch (error) {
			res
				.status(500)
				.json({ message: "Internal server error", err: error.message });
		}
	};

	logout = async (req, res, next) => {
		try {
			res.clearCookie("authCookie");
			req.session.destroy((err) => {
				if (err) {
					throw new Error(err);
				} else {
					res.clearCookie("connect.sid");
					res.sendStatus(200);
				}
			});
		} catch (error) {
			next(error);
		}
	};
}

export const userController = new UserController(userServices);
