export class ChangeProfileUser {

	locators = {
		//данный локатор тыкает в Settings для перехода в профиль Юзера
		linkSettingsProfileSettings: 'a >> text="Settings"',

		//данный локатор тыкает в поле Your Name в профиле Юзера
		textNameProfileSettings: '[placeholder="Your Name"]',

		//данный локатор тыкает в поле Password в профиле Юзера
		textPasswordProfileSettings: '[placeholder="Password"]',

		//данный локатор сохраняет изменения в профиле, если они были
		buttonSaveChanges: 'button >> text="Update Settings"',

	}

	constructor(page) {
		this.page = page;
		//данный локатор открывает выпадающий список возможностей с профилей
		this.dropdownLoginUser = page.locator('.nav-link.dropdown-toggle.cursor-pointer');

	}

	async open() {
		return test.step('OpenPage', async () => {
			await this.page.goto('https://realworld.qa.guru/');
		});
	}


	async openProfileUser() {
		await this.dropdownLoginUser.click()
		await this.page.locator(this.locators.linkSettingsProfileSettings).click();
		
	};


	async changeUserName(randomText) {
		{
			const { articleName } = randomText;

			await this.page.locator(this.locators.textNameProfileSettings).click();
			await this.page.locator(this.locators.textNameProfileSettings).fill(articleName)
			await this.page.locator(this.locators.buttonSaveChanges).click();
		}
	}


}