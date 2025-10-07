import "dotenv/config";
import { connect } from "mongoose";

export const initMongoDB = async () => {
	try {
		await connect(process.env.MONGO_LOCAL_URL);
	} catch (error) {
		throw new Error(`Error connecting to Mongo DB ${error}`);
	}
};
