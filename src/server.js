import express from "express";
import { engine } from "express-handlebars";
import { join, __dirname } from "./utils/utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/session.router.js";
import viewRouter from "./routes/view.router.js";
import { initMongoDB } from "./data/db.connection.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import envs from "./config/envs.js";
import cookieParser from "cookie-parser";
import { policiesHandler } from "./middleware/policiesHandler.js";

const app = express();
app.set("PORT", envs.PORT);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		store: MongoStore.create({
			mongoUrl: envs.MONGODB_LOCAL_URL,
			ttl: 6000,
		}),
		secret: envs.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(express.static(join(__dirname, "../public")));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.get("/", (req, res) => {
	res.render("home", { title: "HOME" });
});

app.use("/", viewRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", userRouter);

app.use(policiesHandler);

//Inicialización de Base
initMongoDB()
	.then((res) => console.log("Connected to MongoDB:"))
	.catch((error) => console.error(error));
app.listen(app.get("PORT"), () =>
	console.log(`Server running on port http://localhost:${app.get("PORT")}`)
);
