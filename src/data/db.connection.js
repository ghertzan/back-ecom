import { connect } from "mongoose";
import envs from '../config/envs.js';

export const initMongoDB = async () => {
	try {
		await connect(envs.MONGODB_LOCAL_URL);
	} catch (error) {
		throw new Error(`Error connecting to Mongo DB ${error}`);
	}
};
