export class TransitionSecondPagination {

	constructor(page) {
		this.page = page;
		this.secondPaginationButton = page.getByRole('button', { name: 'Page 2' });

	}

	async open() {
		await this.page.goto('https://realworld.qa.guru/');
	}

	async gotoSecondPagination() {
		await this.secondPaginationButton.click()
	}

}