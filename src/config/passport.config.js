import passport from "passport";
import local from "passport-local";
import { userController } from "../controllers/user.controller.js";
import { createHash, isValidPassword } from "../utils/utils.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				const { first_name, last_name, email, age, role} = req.body;

				try {
					const userFound = await userController.findUserByEmail(username);

					if (userFound) {
						console.log("Ya existe");
						return done(null, false);
					}
					const newUser = {
						first_name,
						last_name,
						email,
                        age,
                        role,
						password: createHash(password),
					};
					console.log(newUser);

					const user = await userController.createUser(newUser);
					console.log("user: ", user);

					return done(null, user);
				} catch (error) {
					return done(`err: ${error}`, false);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser(async (id, done) => {
		const user = await userController.findById(id);
		done(null, user);
	});
};

export { initializePassport };
