import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import sessionRouter from "./routes/session.router.js";
import { errorHandler } from "./middleware/error-handler.js";
import { initMongoDB } from "./data/db.connection.js";
import "dotenv/config";

const app = express();
app.set("PORT", 8080);
const secret = "fasfdsfhuibfdsa789;;-##po";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_LOCAL_URL,
			ttl: 60000,
		}),
		secret,
		resave: false,
		saveUninitialized: false,
	})
);

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", sessionRouter);

app.use(errorHandler);

initMongoDB()
	.then((res) => console.log("Connected to MongoDB:"))
	.catch((error) => console.error(error));
app.listen(app.get("PORT"), () =>
	console.log(`Server running on port http://localhost:${app.get("PORT")}`)
);
