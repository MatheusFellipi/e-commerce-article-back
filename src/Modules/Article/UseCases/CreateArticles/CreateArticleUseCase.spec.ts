import { ArticlesRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ArticlesRepositoryInMemory';
import { CreateArticlesUseCase } from './CreateArticleUseCase';

import { ThemeRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ThemeRepositoryInMemory';
import { CreateThemeUseCase } from '../Theme/CreateTheme/CreateThemeUseCase';

describe('Create themes', () => {
  let createArticlesUseCase: CreateArticlesUseCase;
  let articlesRepositoryInMemory: ArticlesRepositoryInMemory;
  let themeRepositoryInMemory: ThemeRepositoryInMemory;

  beforeEach(() => {
    articlesRepositoryInMemory = new ArticlesRepositoryInMemory();
    createArticlesUseCase = new CreateArticlesUseCase(
      articlesRepositoryInMemory
    );

    themeRepositoryInMemory = new ThemeRepositoryInMemory();
  });

  it('should be able to create a new article', async () => {
    const article = {
      text: "[{'type':'paragraph','children':[{'text':'This is editable '},{'text':'rich','bold':true},{'text':' text, '},{'text':'much','italic':true},{'text':' better than a '},{'text':'<textarea>','code':true},{'text':'!'}]},{'type':'paragraph','children':[{'text':'Since it's rich text, you can do things like turn a selection of text '},{'text':'bold','bold':true},{'text':', or add a semantically rendered block quote in the middle of the '}]}]",
      title: 'loren loren loren',
      value: 10.9,
      user_id: '68c98acc-edff-4b44-8da8-8c69ebc7dbe9',
      themes: ['iu', 'ux'],
    };

    await createArticlesUseCase.execute(article);

    const res = await articlesRepositoryInMemory.FindByNameOne(article.title);
    const t = await themeRepositoryInMemory.findByName(article.themes[0]);

    expect(shoppingList).toContain('leite');
  });
});
