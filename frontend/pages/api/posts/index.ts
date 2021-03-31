import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Post, { IPost } from "../../../models/postModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { body } = req.body;

	await dbConnect();

	switch (req.method) {
		case "POST":
			if (!body) res.status(400).json({ message: "body is required" });
			else {
				try {
					const post: IPost = await Post.create({ body });
					res.status(201).json(post);
				} catch (e) {
					console.log(e);
				}
			}
			break;

		default:
			res.status(404).json({ message: "Not found" });
			break;
	}
};

// import dbConnect from '../../../utils/dbConnect'
// import Pet from '../../../models/Pet'

// export default async function handler(req, res) {
//   const { method } = req

//   await dbConnect()

//   switch (method) {
//     case 'GET':
//       try {
//         const pets = await Pet.find({}) /* find all the data in our database */
//         res.status(200).json({ success: true, data: pets })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     case 'POST':
//       try {
//         const pet = await Pet.create(
//           req.body
//         ) /* create a new model in the database */
//         res.status(201).json({ success: true, data: pet })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }
