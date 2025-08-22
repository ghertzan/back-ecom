import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import { errorHandler } from "./middleware/error-handler.js";
import viewsRouter from "./routes/views-router.js";
import { productManager } from "./managers/product-manager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(process.cwd(), "src", "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/", viewsRouter);

app.use(errorHandler);

const httpServer = app.listen(8080, () => {
	console.log("Running on 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
	console.log(`User ${socket.id} connected`);

	socketServer.emit("products", await productManager.getProducts());
});
