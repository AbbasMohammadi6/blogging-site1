import { Schema, model, Model, Document, models } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  posts: typeof Schema.Types.ObjectId[];
  generateToken: () => string;
  checkPassword: (password: string) => Promise<boolean>;
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

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

userSchema.pre("save", async function (next) {
  // TS will thorw an error, if I don't do this:
  const user = this as any;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.checkPassword = async function (password) {
  const user = this as any;
  return await bcrypt.compare(password, user.password);
};

userSchema.methods.toJSON = function () {
  const user = this as any;
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

export default models.User || model("User", userSchema);
