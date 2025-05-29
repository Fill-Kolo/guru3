import { test, expect } from '@playwright/test';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { UserBuilder } from '../src/helpers/buillders/user.builder';
import { YourFeedPage } from '../src/pages/yourfeed.page';
//ниже импорт того, что я создавал в НОВЫХ pages
import { CreatedArticle } from '../src/pages/created.article.page'
import { RandomTextBuilder } from '../src/helpers/buillders/random.text.builder'
import { WriteComment } from '../src/pages/write.comment.page'
import { TextFirstCommentArticlePage } from '../src/pages/text.comment.article.page'



test('Создаем новую статью', async ({
	page,
}) => {
	// Gotovim stranichki

	const mainpage = new MainPage(page);
	const registerPage = new RegisterPage(page);
	const yourFeedPage = new YourFeedPage(page);
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
	await mainpage.gotoLogin();
	await registerPage.signup(randomUser);
	await createdArticle.clickNewArticle();
	await createdArticle.writeArticle(randomTextBuilder);
	await expect(yourFeedPage.profileNameField).toContainText(randomUser.username);
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
	await mainpage.gotoLogin();
	await registerPage.signup(randomUser);
	await writeComment.clickGlobalFeed();
	await writeComment.clickFirstArticle();
	await writeComment.clickAndWriteCommen(randomTextBuilder);
	
	await expect(textFirstCommentArticlePage.textLastCommentOnArticle).toContainText(randomTextBuilder.articleWrite);

});