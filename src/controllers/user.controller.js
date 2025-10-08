import { userServices } from "../services/user.services.js";

class UserController {
	constructor(services) {
		this.services = services;
	}

	createUser = async (req, res, next) => {
		const { first_name, last_name, email, password } = req.body;
		try {
			const exists = await this.services.getUserByEmail(email);
			if (exists) {
				return res.status(400).json({ message: "email already registered" });
			}
			const newUser = {
				first_name,
				last_name,
				email,
				password,
			};
			const result = await this.services.createUser(newUser);
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	};

	getUserByEmail = async (req, res, next) => {
		const { email } = req.body;
		try {
			const foundUser = this.services.findUserByEmail(email);
			if (foundUser) {
				return res.status(200).json(foundUser);
			}
			res.status(404).json({ message: "email do not exist." });
		} catch (error) {
			next(error);
		}
	};

	login = async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const exist = await this.services.getUserByEmail(email);
			if (exist) {
				const user = {
					first_name: exist.first_name,
					last_name: exist.last_name,
					email: exist.email,
				};
				req.session.user = user;
				res.redirect("/profile");
			} else {
				res.status(404).json({ message: "Error en credenciales" });
			}
		} catch (error) {
			next(error);
		}
	};

	logout = async (req, res, next) => {
		if (req.session.user) {
			//destrucción de session
		}
	};
}

export const userController = new UserController(userServices);
