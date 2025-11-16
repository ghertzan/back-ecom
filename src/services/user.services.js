import { userDao } from "../daos/mongo/user.dao.js";

class UserServices {
	constructor(dao) {
		this.dao = dao;
	}

	createUser = async (userObj) => {
		try {
			const user = await this.dao.createUser(userObj);
			return user;
		} catch (error) {
			throw new Error(error);
		}
	};

	getAllUsers = async () => {
		try {
			const users = await this.dao.getAllUsers();
			return users;
		} catch (error) {
			throw new Error(error);
		}
	};

	getUserByEmail = async (email) => {
		try {
			const user = await this.dao.getUserByEmail(email);
			return user;
		} catch (error) {
			throw new Error(error);
		}
	};

	findById = async (id) => {
		try {
			const user = await this.dao.findById(id);
			return user;
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const userServices = new UserServices(userDao);
