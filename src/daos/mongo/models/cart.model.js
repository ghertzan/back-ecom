import { model, Schema } from "mongoose";

const cartSchema = new Schema({
	user: {
		_id: false,
		type: Schema.Types.ObjectId,
		ref: "users",
		required: false,
		index: true,
	},
	items: [
		{
			_id: false,
			product: {
				type: Schema.Types.ObjectId,
				ref: "products",
			},
			qty: {
				type: Number,
				default: 1,
			},
		},
	],
});

export const cartModel = model("carts", cartSchema);
