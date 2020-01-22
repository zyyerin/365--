let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let userInput;

let counter = 0;

function setup() {
	noCanvas();
	userInput = select("#userInput");
	userInput.changed(startSearch);
	goWiki(userInput.value());

	function startSearch() {
		counter = 0;
		goWiki(userInput.value());
	}

	function goWiki(term) {
		counter ++;

		if (counter < 60) {
			let url = searchUrl + term;
			loadJSON(url, gotSearch, 'jsonp');
		} 		
	}

	function gotSearch(d) {
		let len = d[1].length;

		// pick the first item found
		let idx = 0;
		let title = d[1][idx];

			createDiv(title.toLowerCase()+"&nbsp;");

		if (counter%7 == 0) {
			createDiv("may");
			createDiv(",&nbsp;");
		} else if (counter%13 == 0){
			createDiv("jun");
			createDiv(".&nbsp;");
		} else if (counter == 59){
			createDiv("div");
			createDiv(".&nbsp;");
		}

		

		// change the space into underscore for url
		title = title.replace(/\s+/g, '_');
		// console.log("Querying: " + title);

		let url = contentUrl + title;
		loadJSON(url, gotContent, 'jsonp');

		console.log(url);
	}

	function gotContent(d) {
		let page = d.query.pages;
		let pageId = Object.keys(page)[0];
		// console.log(pageId);
		let content = page[pageId].revisions[0]['*'];
		// console.log(content);

		// search for words have more than 4 characters
		let wordRegex = /\b\w{2,}\b/g;
		var words = content.match(wordRegex);
		var word = random(words);
		console.log("random word selection: " + word);
		goWiki(word);
	}
}