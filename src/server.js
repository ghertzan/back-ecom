import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import { errorHandler } from "./middleware/error-handler.js";
import viewsRouter from "./routes/views-router.js";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";
import { productManager } from "./managers/product-manager.js";
import { initMongoDB } from "./data/db-connection.js";

const app = express();
const httpServer = app.listen(8080, () => {
	console.log("Running on 8080");
});

initMongoDB()
	.then((res) => console.log("Connected to MongoDB"))
	.catch((error) => console.error(error));

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(process.cwd(), "src", "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/", viewsRouter);
app.use("/api/products", productRouter(socketServer));
app.use("/api/carts", cartRouter);

app.use(errorHandler);

socketServer.on("connection", async (socket) => {
	console.log(`User ${socket.id} connected`);

	socketServer.emit("products", await productManager.getProducts());

	socket.on("disconnect", () => {
		console.log(`User: ${socket.id} disconnected`);
	});

	socket.on("delete-product", async (pid) => {
		socket.emit("deleted-product", await productManager.deleteProduct(pid));
		socketServer.emit("products", await productManager.getProducts());
	});
});

export default socketServer;
