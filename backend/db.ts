import mongoose from "mongoose";
import chalk from "chalk";

const DBConnect = async (): Promise<void> => {
	try {
		if (!process.env.MONGODB_URI)
			throw new Error("MONGODB_URI does not exists");

		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log(
			chalk.blue.bold(`succesfuly conncted to ${conn.connection.host}`)
		);
	} catch (e) {
		console.log(chalk.redBright(`Error: ${e}`));
	}
};

export default DBConnect;
