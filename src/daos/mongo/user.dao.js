import { userModel } from "./models/user.model.js";

class UserDao {
	constructor(model) {
		this.model = model;
	}

	createUser = async (userObj) => {
		try {
			return this.model.create(userObj);
		} catch (error) {
			throw new Error(error);
		}
	};

	getAllUsers = async () => {
		try {
			return await this.model.find({});
		} catch (error) {
			throw new Error(error);
		}
	};

	getUserByEmail = async (email) => {
		try {
			return await this.model.findOne({ email });
		} catch (error) {
			throw new Error(error);
		}
	};
}

export const userDao = new UserDao(userModel);
