import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import router from "./routes/product-router.js";
import productRouter from "./routes/product-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);

app.get("/", (req, res) => {
	res.send("Inicializado Express");
});

app.use(errorHandler);

app.listen(8080, () => console.log("Escuchando en 8080"));
