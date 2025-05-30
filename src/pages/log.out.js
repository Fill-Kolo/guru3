export class LogOut {

	constructor(page) {
		this.page = page;
		this.dropdownLoginUser = page.locator('.nav-link.dropdown-toggle.cursor-pointer');
		this.buttonDropdownLogout = page.getByRole('link', { name: 'Logout' });
		this.buttonSignUp = page.getByRole('link', { name: 'Sign up' });
		
	}



	async gotoLogOut() {
		await this.dropdownLoginUser.click()
		await this.page.waitForSelector('.nav-link.dropdown-toggle.cursor-pointer')
		await this.buttonDropdownLogout.click()
	}

}