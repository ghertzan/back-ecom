import passport from "passport";
import local from "passport-local";
import { userController } from "../controllers/user.controller.js";
import { createHash } from "../utils/utils.js";
import jwt from "passport-jwt";
import envs from "../config/envs.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const LocalStrategy = local.Strategy;
const initializePassport = () => {
	passport.use(
		"jwt",
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
				secretOrKey: envs.JWT_SECRET,
			},
			async (jwt_payload, done) => {
				try {
					return done(null, jwt_payload);
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				const { first_name, last_name, email, age, role } = req.body;

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

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["authCookie"];
	}
	return token;
};

export { initializePassport };
