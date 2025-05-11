import { test } from '@playwright/test';

export class MainPage{

	constructor(page) {
		this.page = page;
		this.signupButton = page.getByRole('link', { name: 'Sign up' });
	}

	async open() {
		return test.step('OpenPage', async () => {

			await this.page.goto('https://realworld.qa.guru/');
		});
	}

	async gotoLogin() {
			return test.step('ClickButton', async () => {
				await this.signupButton.click()
			})
	}
}
