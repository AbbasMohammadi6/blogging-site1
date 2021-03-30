import express from "express";
import chalk from "chalk";
import { Schema, model, Document, Model } from "mongoose";
import dotenv from "dotenv";
import DBConnect from "./db";

dotenv.config();
DBConnect();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is running...");
});

interface IPost extends Document {
	body: string;
}

const postSchema: Schema = new Schema(
	{ body: { type: String, required: true } },
	{ timestamps: true }
);

// If you put the keyword 'new' before model it will throw an error.

const Post: Model<IPost> = model("Post", postSchema);

(async function () {
	const post: IPost = await Post.create({ body: "<h1>another test post</h1>" });

	console.log(post);
})();

app.post("/post", (req, res) => {
	// for now we just save the body, not title or anything else
});

app.listen(5000, () =>
	console.log(chalk.yellow.bold("Server is running on port 5000"))
);
