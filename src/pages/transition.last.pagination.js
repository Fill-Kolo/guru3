export class TransitionLastPagination {

	constructor(page) {
		this.page = page;
		this.allPaginationButton = page.locator('.page-item');

	}

	async open() {
		await this.page.goto('https://realworld.qa.guru/');
		await this.page.waitForTimeout(700);

	}

	async gotolastPaginationButton() {
		{
			const allItems = await this.allPaginationButton.all();
			await allItems[allItems.length - 2].click();
		}
	}

}