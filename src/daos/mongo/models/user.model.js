import { model, Schema } from "mongoose";

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
    age: {
      type: Number,
      required: true,
    },
	password: {
		type: String,
		required: true,
	},
    cart: {
        type: Schema.Types.ObjectId,
        required:false,
    },
    role: {
        type: String,
        enum: ['user', 'admin','guest'],
        default: 'user',
    }
});

export const userModel = model("users", UserSchema);
