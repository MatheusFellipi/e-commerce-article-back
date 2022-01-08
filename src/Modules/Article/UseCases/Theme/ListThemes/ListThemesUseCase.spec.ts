import { ThemeRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ThemeRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { ListThemesUseCase } from './ListThemesUseCase';

describe('Create themes', () => {
  let listThemesUseCase: ListThemesUseCase;
  let themeRepositoryInMemory: ThemeRepositoryInMemory;

  beforeEach(() => {
    themeRepositoryInMemory = new ThemeRepositoryInMemory();
    listThemesUseCase = new ListThemesUseCase(themeRepositoryInMemory);
  });

  it('should be able to list all themes', async () => {
    await listThemesUseCase.execute();

    const res = await themeRepositoryInMemory.list();

    expect(res).toBeNull;
  });
});
