import { connect } from "mongoose";
import envs from "../config/envs.js";

export const initMongoDB = async () => {
	try {
		await connect(envs.MONGODB_ATLAS_URL);
	} catch (error) {
		throw new Error(`Error al conectar con Mongo DB ${error}`);
	}
};
