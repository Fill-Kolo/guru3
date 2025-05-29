export class TextFirstCommentArticlePage {

	constructor(page) {
		this.page = page;
		this.textLastCommentOnArticle = page.locator('.card-text').last();
	}

}