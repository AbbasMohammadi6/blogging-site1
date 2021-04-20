export const getFirstImg = (html: string): string => {
	const firstLetter = html.indexOf("<img");

	let secondLetter;

	for (let i = firstLetter; i < html.length; i++) {
		if (html[i] === ">") {
			secondLetter = i + 1;
			break;
		}
	}

	return html.slice(firstLetter, secondLetter);
};

export const getFirstPar = (html: string): string => {
	const firstPar = html
		.slice(html.search("<p>") + 3, html.search("</p>"))
		.split(" ");

	return (firstPar.length <= 50 ? firstPar : firstPar.slice(0, 50)).join(" ");
};

export const getFirstImgAndPar = (html: string): string => {
	return `<p>${getFirstPar(html)}...</p> <div>${getFirstImg(html)}</div>`;
};

export const convertDateToShamsi = (date: any) => {
	return new Date(date).toLocaleDateString("fa", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};
