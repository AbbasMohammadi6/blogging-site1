import formidable from 'formidable'
import {NextApiRequest, NextApiResponse} from 'next';


export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function hanlder (req: NextApiRequest, res: NextApiResponse) {

	const {method} = req;

	switch (method) {
		case "POST":
			const form = new formidable({multiples: true});

			form.parse(req, (err, fields, files) => {
				if (err) {
					console.log(err);
					return ;
				}
				res.json({fields, files});
			});
			break;
		
		default:
			// code...
			break;
	}
}

// import formidable from 'formidable';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async (req, res) => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = "./";
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     console.log(err, fields, files);
//   });
// };

// app.post('/api/upload', (req, res, next) => {
//   const form = formidable({ multiples: true });
 
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.json({ fields, files });
//   });
// });