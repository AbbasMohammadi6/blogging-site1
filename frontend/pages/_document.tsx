// The below code is from here:
// https://nextjs.org/docs/advanced-features/custom-document
// and here:
// https://github.com/isaachinman/next-i18next/issues/20

import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return initialProps;
	}

	render() {
		return (
			<Html lang="fa_IR" dir="rtl">
				<Head>
					<link
						href="https://v1.fontapi.ir/css/Shabnam:300;500;700"
						rel="stylesheet"
					/>

					<link
						href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v28.0.0/dist/font-face.css"
						rel="stylesheet"
						type="text/css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
