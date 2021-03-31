import { NextApiRequest, NextApiResponse } from "next";
import Post, { IPost } from "../../../models/postModel";
import dbConnect from "../../../utils/dbConnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { id },
	} = req;

	await dbConnect();

	switch (method) {
		case "GET":
			try {
				const post = await Post.findById(id);
				if (!post) res.status(404).json({ message: "Post not found" });
				else res.json(post);
			} catch (error) {
				res.status(500);
			}
			break;

		default:
			res.status(404).json({ message: "Api endpoint doesn't exist" });
			break;
	}
};

// import dbConnect from '../../../utils/dbConnect'
// import Pet from '../../../models/Pet'

// export default async function handler(req, res) {
//   const {
//     query: { id },
//     method,
//   } = req

//   await dbConnect()

//   switch (method) {
//     case 'GET' /* Get a model by its ID */:
//       try {
//         const pet = await Pet.findById(id)
//         if (!pet) {
//           return res.status(400).json({ success: false })
//         }
//         res.status(200).json({ success: true, data: pet })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break

//     case 'PUT' /* Edit a model by its ID */:
//       try {
//         const pet = await Pet.findByIdAndUpdate(id, req.body, {
//           new: true,
//           runValidators: true,
//         })
//         if (!pet) {
//           return res.status(400).json({ success: false })
//         }
//         res.status(200).json({ success: true, data: pet })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break

//     case 'DELETE' /* Delete a model by its ID */:
//       try {
//         const deletedPet = await Pet.deleteOne({ _id: id })
//         if (!deletedPet) {
//           return res.status(400).json({ success: false })
//         }
//         res.status(200).json({ success: true, data: {} })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break

//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }
