import { ArticlesRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ArticlesRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { ListByIdArticlesUseCase } from './ListByIdArticleUseCase';

describe('Create articles', () => {
  let listByIdArticlesUseCase: ListByIdArticlesUseCase;
  let themeRepositoryInMemory: ArticlesRepositoryInMemory;

  beforeEach(() => {
    themeRepositoryInMemory = new ArticlesRepositoryInMemory();
    listByIdArticlesUseCase = new ListByIdArticlesUseCase(themeRepositoryInMemory);
  });

  it('should be able to list all articles', async () => {
    const id = "2"
    await listByIdArticlesUseCase.execute(id);
    const res = await themeRepositoryInMemory.list();
    expect(res).toBeNull;
  });
});
