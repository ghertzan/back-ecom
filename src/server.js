import express from "express";
import { Server } from "socket.io";
import path from "path";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import { errorHandler } from "./middleware/error-handler.js";
import { initMongoDB } from "./data/db.connection.js";
import { productService } from "./services/product.services.js";

const app = express();
app.listen(8080, () => console.log("Server running on 8080"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(process.cwd(), "src", "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use(errorHandler);

initMongoDB()
	.then((res) => console.log("Connected to MongoDB:"))
	.catch((error) => console.error(error));
