import passport from "passport";
import local from "passport-local";
import { userServices } from "../services/user.services.js";
import { isValidPassword } from "../utils/utils.js";
import jwt from "passport-jwt";
import envs from "../config/envs.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const LocalStrategy = local.Strategy;
const initializePassport = () => {
	passport.use(
		"login",
		new LocalStrategy(
			{ usernameField: "email" },
			async (username, password, done) => {
				try {
					const userFound = await userServices.getUserByEmail(username);
					if (!userFound) throw new Error("Usuario no existe");
					const isValid = isValidPassword(password, userFound.password);
					if (!isValid) throw new Error("Credenciales no validas");
					const user = {
						_id: userFound._id,
						first_name: userFound.first_name,
						last_name: userFound.last_name,
						email: userFound.email,
						age: userFound.age,
						role: userFound.role,
					};
					done(null, user);
				} catch (error) {
					done(error, null);
				}
			}
		)
	);
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

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
	passport.deserializeUser(async (id, done) => {
		const user = await userServices.findById(id);
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
