import { ArticlesRepositoryInMemory } from "@Modules/Article/Repositories/in-memory/ArticlesRepositoryInMemory";
import { CreateArticlesUseCase } from "./CreateArticleUseCase";
import { ThemeRepositoryInMemory } from "@Modules/Article/Repositories/in-memory/ThemeRepositoryInMemory";


describe('Create themes', () => {
  let createArticlesUseCase: CreateArticlesUseCase;
  let articlesRepositoryInMemory: ArticlesRepositoryInMemory;
  let themeRepositoryInMemory: ThemeRepositoryInMemory;

  beforeEach(() => {
    articlesRepositoryInMemory = new ArticlesRepositoryInMemory();
    createArticlesUseCase = new CreateArticlesUseCase(
      articlesRepositoryInMemory,
      themeRepositoryInMemory
    );

    themeRepositoryInMemory = new ThemeRepositoryInMemory();
  });

  it('should be able to create a new article', async () => {
    const article = {
      text: [{"children":[{"text":"Tell you story..."}]}],
      title: 'loren loren loren',
      amount: 10.9,
      user_id: '68c98acc-edff-4b44-8da8-8c69ebc7dbe9',
      themes: ['iu', 'ux'],
    };
    await createArticlesUseCase.execute(article);
    const res = await articlesRepositoryInMemory.FindByNameOne(article.title);
  });
});
