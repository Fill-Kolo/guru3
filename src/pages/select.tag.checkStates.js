import { expect } from '@playwright/test';

export class SelectTagCheckStates {

	locators = {
		// dannyj lokator ishchyot neposredstvenno teg s tekstom "ver"
		tagState: 'button[class="tag-pill tag-default"] >> text="ver"',
		articlePreview: '.article-preview',
		tagInState: '.tag-default.tag-pill.tag-outline',
		// dannyj lotakr ishchet element paginacii
		PaginationButton: '.page-item'
	}

	constructor(page) {
		this.page = page;

	}

	async open() {
		await this.page.goto('https://realworld.qa.guru/', {
			waitUntil: 'networkidle'
		});
	}


	async clickTag() {
		{
			await this.page.locator(this.locators.tagState).click();
			//Proveryaem zagruzku paginacii, t.e. chtoby uspela otrisovat'sya vsya stranica
			await this.page.waitForSelector(this.locators.PaginationButton);
		}
	};

}
