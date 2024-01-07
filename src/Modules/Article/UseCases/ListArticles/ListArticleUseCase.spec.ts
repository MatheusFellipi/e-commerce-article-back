import { ArticlesRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ArticlesRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { ListArticlesUseCase } from './ListArticleUseCase';

describe('Create articles', () => {
  let listArticlesUseCase: ListArticlesUseCase;
  let themeRepositoryInMemory: ArticlesRepositoryInMemory;

  beforeEach(() => {
    themeRepositoryInMemory = new ArticlesRepositoryInMemory();
    listArticlesUseCase = new ListArticlesUseCase(themeRepositoryInMemory);
  });

  it('should be able to list all articles', async () => {
    await listArticlesUseCase.execute({ page: 1, page_size: 20 });
    const res = await themeRepositoryInMemory.list();
    expect(res).toBeNull;
  });
});
