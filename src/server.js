import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
	res.send("Inicializado Express");
});

app.use(errorHandler);

app.listen(8080, () => console.log("Escuchando en 8080"));
