export class CheckNoAuthorization {

	constructor(page) {
		this.page = page;
		this.loginButton = page.getByRole('link', { name: 'Login' });
		
	}

	async open() {
		await this.page.goto('https://realworld.qa.guru/');

	}

	async gotoSignUp() {
		await this.loginButton.click()
	}
}
