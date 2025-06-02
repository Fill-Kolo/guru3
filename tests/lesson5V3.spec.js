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
import { CreatedArticle } from '../src/pages/created.article.page'
import { RandomTextBuilder } from '../src/helpers/buillders/random.text.builder'
import { WriteComment } from '../src/pages/write.comment.page'
import { TextFirstCommentArticlePage } from '../src/pages/text.comment.article.page'
import { ChangePassword } from '../src/pages/change.password.page'



test('checkNoAuthorization', async ({
	page,
}) => {
	// Proiskhodit proverka, chto nikto ne avtorizirovan na stranice
	const checkNoAuthorization = new CheckNoAuthorization(page);

	await checkNoAuthorization.open();
	await checkNoAuthorization.gotoSignUp();
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
	await mainpage.gotoSignUp();
	await registerPage.signup(randomUser);
	await expect(yourFeedPage.profileNameField).toContainText(randomUser.username);
	

	await logOut.gotoLogOut();
	await expect(logOut.buttonSignUp).toContainText('Sign up');

});

test('selectTagCheckStates', async ({
	page,
}) => {
	//Proveryaet, chto nahodyatsya tegi po stat'yam s nadpis'yu "ver"
	const selectTagCheckStates = new SelectTagCheckStates(page);

	await selectTagCheckStates.open();
	await selectTagCheckStates.clickTag();


	const articlePreviews = await selectTagCheckStates.getAllArticlePreviews();
	//Proverka, chto esli vyvoditsya chislo 3 v konsole, to znachit vse tri stat'i zagruzilis'
	for (const articlePreview of articlePreviews) {
		await expect(articlePreview.locator(selectTagCheckStates.locators.tagInState).filter({ hasText: 'ver' })).toHaveText('ver');
	}

});
test('Создаем новую статью', async ({
	page,
}) => {
	// Gotovim stranichki

	const mainpage = new MainPage(page);
	const registerPage = new RegisterPage(page);
	const createdArticle = new CreatedArticle(page)

	//Генерируем рандомного юзера
	const randomUser = new UserBuilder()
		.addEmail()
		.addPassword(14)
		.addUsername()
		.generate();

	//Генерируем текст нашей статья
	const randomTextBuilder = new RandomTextBuilder()
		.addArticleName(4)
		.addArticleAbout(2)
		.addArticleWrite(1)
		.generate();

	await mainpage.open();
	await mainpage.gotoSignUp();
	await registerPage.signup(randomUser);
	await createdArticle.clickNewArticle();
	await createdArticle.writeArticle(randomTextBuilder);

	await expect(createdArticle.buttonPostComment).toContainText('Post Comment');
	
});


test('Оставляем комментарий под первой стаьей', async ({
	page,
}) => {
	// Gotovim stranichki

	const mainpage = new MainPage(page);
	const registerPage = new RegisterPage(page);
	const writeComment = new WriteComment(page);
	const textFirstCommentArticlePage = new TextFirstCommentArticlePage(page);

	//Генерируем рандомного юзера
	const randomUser = new UserBuilder()
		.addEmail()
		.addPassword(10)
		.addUsername()
		.generate();

	//Генерируем текст комментарий к статье
	const randomTextBuilder = new RandomTextBuilder()
		.addArticleWrite(1)
		.generate();

	await mainpage.open();
	await mainpage.gotoSignUp();
	await registerPage.signup(randomUser);
	await writeComment.clickGlobalFeed();
	await writeComment.clickFirstArticle();
	await writeComment.clickAndWriteCommen(randomTextBuilder);

	await expect(textFirstCommentArticlePage.textLastCommentOnArticle).toContainText(randomTextBuilder.articleWrite);

});

test('Меняем логин пользователю', async ({
	page,
}) => {
	// Gotovim stranichki

	const mainpage = new MainPage(page);
	const registerPage = new RegisterPage(page);
	const yourFeedPage = new YourFeedPage(page);
	const changePassword = new ChangePassword(page);

	//Act
	const randomUser = new UserBuilder()
		.addEmail()
		.addPassword(14)
		.addUsername()
		.generate();

	//Генерируем текст нового логина пользователя
	const randomTextBuilder = new RandomTextBuilder()
		.addArticleName(1)
		.generate();

	await mainpage.open();
	await mainpage.gotoSignUp();
	await registerPage.signup(randomUser);
	await expect(yourFeedPage.profileNameField).toContainText(randomUser.username);


	//Заходим в профиль для смены пароля
	await changePassword.openProfileUser();

	//Меняем логин Юзеру 
	await changePassword.changeUserName(randomTextBuilder);
	//Проверяем, что подставился новый логин
	await expect(yourFeedPage.profileNameField).toContainText(randomTextBuilder.articleName);

});