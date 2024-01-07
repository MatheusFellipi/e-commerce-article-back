import { ArticlesRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ArticlesRepositoryInMemory';
import { ListByIdArticlesUseCase } from './ListByIdArticleUseCase';

describe('Create articles', () => {
  let listByIdArticlesUseCase: ListByIdArticlesUseCase;
  let themeRepositoryInMemory: ArticlesRepositoryInMemory;

  beforeEach(() => {
    themeRepositoryInMemory = new ArticlesRepositoryInMemory();
  });

  it('should be able to list all articles', async () => {});
});
