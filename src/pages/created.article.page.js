export class CreatedArticle {
	locators = {
		//данный локатор ищет поле с placeholder "Article Title"
		articleName: '[placeholder="Article Title"]',
		//данный локатор ищет поле с placeholder "What's this article about?"
		articleAbout: '[placeholder="What\'s this article about?"]',
		//данный локатор ищет поле с placeholder "Write your article (in markdown)"
		articleWrite: '[placeholder="Write your article (in markdown)"]',
		//данный локатор ищет кнопку Publish Article, которая отвечает за публикацию статьи
		buttonPublishArticle: 'button >> text="Publish Article"',
		//данный локатор ищет кнопку Post commen после создания статьи
		buttonPostComment: 'button >> text="Post Comment"'
	}


	constructor(page) {
		this.page = page;
		this.buttonNewArticle = page.getByRole('link', { name: 'New Article' });
		this.buttonPostComment = page.getByRole('button', { name: 'Post Comment' })

	}

	//clickaem na knopky New Article
	async clickNewArticle() {
		await this.buttonNewArticle.click();
	}

	//кликаем на поля и заполняем их значения
	async writeArticle(randomText) {
		const { articleName, articleAbout, articleWrite } = randomText;

		await this.page.locator(this.locators.articleName).click()
		await this.page.locator(this.locators.articleName).fill(articleName);
		await this.page.locator(this.locators.articleAbout).click();
		await this.page.locator(this.locators.articleAbout).fill(articleAbout);
		await this.page.locator(this.locators.articleWrite).click();
		await this.page.locator(this.locators.articleWrite).fill(articleWrite);
		await this.page.locator(this.locators.buttonPublishArticle).click();
		await this.page.locator(this.locators.buttonPostComment)

	}

}