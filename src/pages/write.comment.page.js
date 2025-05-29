export class WriteComment {

	locators = {
		// dannyj lotakr ishchet elementi paginacii
		PaginationButton: '.page-item',
		paginationAllButton: '.pagination.pagination-sm',
		//данный локатор ищет поле с placeholder "Write your a commetn" в самой статье
		articleWriteComment: '[placeholder="Write a comment..."]',
		// dannyj lotakr ishchet element paginacii
		PaginationButton: '.page-item',
		//данный локатор переход на таб "Global Feed" на главной странице
		buttonGlobalFeed: 'button >> text="Global Feed"',
		//данный локатор тыкает в первую статью на странице
		firstArticleOnPage: '.preview-link >> nth=0',
		//данный локатор кликает в кнопку опубликовать коммент
		buttonPostComment: 'button >> text="Post Comment"',
		//данный локатор ищет первый написанный коммент в статье
		firstComment: '.card-block >> nth=0'
	}
	constructor(page) {
		this.page = page;
	}


	async clickGlobalFeed() {
		{
			await this.page.locator(this.locators.buttonGlobalFeed).click();
			//Proveryaem zagruzku paginacii, t.e. chtoby uspela otrisovat'sya vsya stranica
			await this.page.waitForSelector(this.locators.paginationAllButton);
		}
	}

	async clickFirstArticle() {

		{
			await this.page.locator(this.locators.firstArticleOnPage).click();
		}
	}

	async clickAndWriteCommen(randomText) {
		{
			const {articleWrite} = randomText;

			await this.page.locator(this.locators.articleWriteComment).click();
			await this.page.locator(this.locators.articleWriteComment).fill(articleWrite)
			await this.page.locator(this.locators.buttonPostComment).click();

		}

	}

}