import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import productRouter from "./routes/product-router.js";
import { initMongoDB } from "./data/db-connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);

app.use(errorHandler);

initMongoDB()
	.then((res) => console.log("Connected to MongoDB:"))
	.catch((error) => console.error(error));

app.listen(8080, () => console.log("Server running on 8080"));
