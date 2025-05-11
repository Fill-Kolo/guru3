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
	// ���������� ��������, ��� ����� �� ������������� �� ��������
	const checkNoAuthorization = new CheckNoAuthorization(page);

	await checkNoAuthorization.open();
	await checkNoAuthorization.gotoLogin();
});

test('transitionSecondPagination', async ({
	page,
}) => {
	//���������, ��� ���������� ������� ��������� �� ������ ��������
	const transitionSecondPagination = new TransitionSecondPagination(page);

	await transitionSecondPagination.open();
	await transitionSecondPagination.gotoSecondPagination();
});


test('transitionLastPagination', async ({
	page,
}) => {
	//���������, ��� ���������� ������� ��������� �� �������� ��������
	const transitionLastPagination = new TransitionLastPagination(page);

	await transitionLastPagination.open();
	await transitionLastPagination.gotolastPaginationButton();
});

test('logOutNewCreatedUser', async ({
	page,
}) => {
	// ������� ���������

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
	//���������, ��� ������ � ����� "ver"
	const selectTagCheckStates = new SelectTagCheckStates(page);

	await selectTagCheckStates.open();
	await selectTagCheckStates.clickTag();
	await selectTagCheckStates.checkAllStates();
});