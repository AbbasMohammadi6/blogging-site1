export const getFiftyWords = (html: string) => {
	const firstPar = html
		.slice(html.search("<p>") + 3, html.search("</p>"))
		.split(" ");

	const whatWeWantToShow = (firstPar.length <= 50
		? firstPar
		: firstPar.slice(0, 50)
	).join(" ");

	return `<p>${whatWeWantToShow}...</p>`;
};
