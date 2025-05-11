export class CheckNoAuthorization {

	constructor(page) {
		this.page = page;
		this.loginButton = page.getByRole('link', { name: 'Login' });
		
	}

	async open() {
		await this.page.goto('https://realworld.qa.guru/');

	}

	async gotoLogin() {
		await this.loginButton.click()
	}
}

/*
function name(items) {
	for (const singleItem of items) {
		const innerContent = singleItem.innerHTML;
		if (innerContent.lastIndexOf(">") !== -1) { 
			console.log(innerContent.slice(innerContent.lastIndexOf(">")))
		}
	}
}

*/