import { Schema, model, Document, Model, models } from "mongoose";
import User from "models/userModel";

// export interface IComment extends Document {
// 	text: string;
// 	owner: typeof Schema.Types.ObjectId;
// }

export interface IPost extends Document {
	title: string;
	body: string;
	owner: typeof Schema.Types.ObjectId;
	createdAt: Date;
	comments: Array<any>;
}

/**Todo: Do I need a interface for this???**/
const commentSchema: Schema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},

		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const postSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		body: {
			type: String,
			required: true,
		},

		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		comments: [commentSchema],
	},
	{
		timestamps: true,
	}
);

// If I don't do this line and do it like I did in express, it will throw an error that says:
// Cannot overwrite `Post` model once compiled.
// I saw this in an example that the next js team did.
// So if there is already a model called Post don't make another one.
export default models.Post || model("Post", postSchema);

// I MAY DO THIS FOR DATA VALIDATION:
//   name: {
//     /* The name of this pet */

//     type: String,
//     required: [true, 'Please provide a name for this pet.'],
//     maxlength: [20, 'Name cannot be more than 60 characters'],
//   },
