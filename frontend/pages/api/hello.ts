// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
	// if (!process.env.MONGODB_URI) return res.send('something went wrong');
	res.status(200).json({
		first: process.env.MONGODB_URI,
		second: "something else",
	});
};

// export default () => {};
