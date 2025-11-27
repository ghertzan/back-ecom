import { initMongoDB } from "./data/db.connection.js";
import { userServices } from "./services/user.services.js";
import { cartService } from "./services/cart.services.js";
import mongoose from "mongoose";

initMongoDB()
	.then((res) => console.log("Connected to MongoDB:"))
	.catch((error) => console.error(error));

const newUser = {
	first_name: "pepe",
	last_name: "pepe",
	age: 42,
	role: "user",
	email: "pepe@mail.com",
	password: "1234",
};

const users = await userServices.getAllUsers();
// console.log(users);
const carts = await cartService.getAllCarts();
// console.log("carts: ", carts);
// console.log(new mongoose.Types.ObjectId("6927846fa3ca0758b7a44e04"));

const cart = await cartService.getCartByUserId(
	new mongoose.Types.ObjectId("6927846fa3ca0758b7a44e04")
);

console.log(cart);
