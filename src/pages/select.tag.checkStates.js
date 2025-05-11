import { expect } from '@playwright/test';

export class SelectTagCheckStates {

	locators = {
		// данный локатор ищЄт непосредственно тег с текстом "ver"
		tagState: 'button[class="tag-pill tag-default"] >> text="ver"',
		articlePreview: '.article-preview',
		tagInState: '.tag-default.tag-pill.tag-outline'

	}

	constructor(page) {
		this.page = page;

	}

	async open() {
		await this.page.goto('https://vk.com/', {
		//	waitUntil: 'networkidle' 
		});
	}

	async clickTag() {
		{
			
			await this.page.locator(this.locators.tagState).click();
			//await this.page.waitForLoadState('domcontentloaded');
			//await this.page.waitForTimeout(800);

		}
	}

	async checkAllStates() {
		{
			const allTagLists = await this.page.locator('.tag-default tag-pill tag-outline').all();
			await Promise.all(
				allTagLists.map(tagList => tagList.waitFor())
			);
			const articlePreviews = await this.page.locator(this.locators.articlePreview).all();
			//ѕроверка, что если пишетс€ в консоле число 3, значит все 3 статьи прогрузились
			let number123 = 0;
			for (const articlePreview of articlePreviews){
				
				await expect(articlePreview.locator(this.locators.tagInState).filter({ hasText: 'ver' })).toHaveText('ver');
				number123 = number123 + 1;
				console.log(number123)

			}
			}
		}
}