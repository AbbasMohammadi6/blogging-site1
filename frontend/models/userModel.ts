import { Schema, model, Model, Document, models } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	generateToken: () => string;
}

const userSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},
});

userSchema.methods.generateToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

export default models.User || model("User", userSchema);
