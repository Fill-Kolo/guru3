import { fakerRU as faker } from '@faker-js/faker';

export class RandomTextBuilder {



    addArticleName(symbol = 5) {
        //генерирум короткой слово для статьи
        this.articleName = faker.string.alpha({ length: symbol })
        return this;
    };

    addArticleAbout(symbol = 5) {
        //генерирум короткой слово для статьи
        this.articleAbout = faker.string.alpha({ length: symbol })
        return this;
    };


    addArticleWrite(sentenceCount = 2 ) {
        //генерируем абзац
        this.articleWrite = faker.lorem.paragraph( sentenceCount )
        return this
    };


    generate() {
        return {
            articleName: this.articleName,
            articleAbout: this.articleAbout,
            articleWrite: this.articleWrite
        }
    };
}