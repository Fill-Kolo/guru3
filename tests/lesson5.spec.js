import { test, expect } from '@playwright/test';
import { CheckNoAuthorization } from "../src/pages/check.noauthorization"
import { TransitionSecondPagination } from "../src/pages/trasition.second.pagination"
import { TransitionLastPagination } from "../src/pages/transition.last.pagination"
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { LogOut } from '../src/pages/log.out'
import { YourFeedPage } from '../src/pages/yourfeed.page';
import { UserBuilder } from '../src/helpers/buillders/user.builder';
import { SelectTagCheckStates } from '../src/pages/select.tag.checkStates'


test('checkNoAuthorization', async ({
	page,
}) => {
	// Proiskhodit proverka, chto nikto ne avtorizirovan na stranice
	const checkNoAuthorization = new CheckNoAuthorization(page);

	await checkNoAuthorization.open();
	await checkNoAuthorization.gotoLogin();
});

test('transitionSecondPagination', async ({
	page,
}) => {
	//Proveryaem, chto proiskhodit perekhod paginacii na vtoruyu stranicu
	const transitionSecondPagination = new TransitionSecondPagination(page);

	await transitionSecondPagination.open();
	await transitionSecondPagination.gotoSecondPagination();
});


test('transitionLastPagination', async ({
	page,
}) => {
	//Proveryaem, chto proiskhodit perekhod paginacii na polednyuyu stranicu
	const transitionLastPagination = new TransitionLastPagination(page);

	await transitionLastPagination.open();
	await transitionLastPagination.gotolastPaginationButton();
});

test('logOutNewCreatedUser', async ({
	page,
}) => {
	// Gotovim stranichki

	const mainpage = new MainPage(page);
	const registerPage = new RegisterPage(page);
	const yourFeedPage = new YourFeedPage(page);
	const logOut = new LogOut(page);

	//Act
	const randomUser = new UserBuilder()
		.addEmail()
		.addPassword(14)
		.addUsername()
		.generate();

	await mainpage.open();
	await mainpage.gotoLogin();
	await registerPage.signup(randomUser);
	await expect(yourFeedPage.profileNameField).toContainText(randomUser.username);

	await logOut.gotoLogOut();

	
});

test('selectTagCheckStates', async ({
	page,
}) => {
	//Proveryaet, chto nahodyatsya tegi po stat'yam s nadpis'yu "ver"
	const selectTagCheckStates = new SelectTagCheckStates(page);

	await selectTagCheckStates.open();
	await selectTagCheckStates.clickTag();
	

		const articlePreviews = await this.page.locator(this.locators.articlePreview).all();
		//Proverka, chto esli vyvoditsya chislo 3 v konsole, to znachit vse tri stat'i zagruzilis'
		let number123 = 0;
		for (const articlePreview of articlePreviews) {

			await expect(articlePreview.locator(this.locators.tagInState).filter({ hasText: 'ver' })).toHaveText('ver');
			number123 = number123 + 1;
			console.log(number123)

		}
	
});