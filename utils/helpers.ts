export const getFirstImgAndPar = (html: string) => {
	const firstLetter = html.indexOf("<img");

	let secondLetter;

	for (let i = firstLetter; i < html.length; i++) {
		if (html[i] === ">") {
			secondLetter = i + 1;
			break;
		}
	}

	const image = html.slice(firstLetter, secondLetter);

	///////////////////////

	const firstPar = html
		.slice(html.search("<p>") + 3, html.search("</p>"))
		.split(" ");

	const whatWeWantToShow = (firstPar.length <= 50
		? firstPar
		: firstPar.slice(0, 50)
	).join(" ");

	return `<p>${whatWeWantToShow}...</p> <div>${image}</div>`;
};

export const convertDateToShamsi = (date: any) => {
	return new Date(date).toLocaleDateString("fa", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};
