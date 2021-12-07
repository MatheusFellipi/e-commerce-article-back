import { ThemeRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ThemeRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { CreateThemeUseCase } from './CreateArticleUseCase';

describe('Create themes', () => {
  let createThemesUseCase: CreateThemeUseCase;
  let themeRepositoryInMemory: ThemeRepositoryInMemory;

  beforeEach(() => {
    themeRepositoryInMemory = new ThemeRepositoryInMemory();
    createThemesUseCase = new CreateThemeUseCase(themeRepositoryInMemory);
  });

  it('should be able to create a new themes', async () => {
    const theme = 'theme test';
    await createThemesUseCase.execute({ theme });

    const res = await themeRepositoryInMemory.findByName(theme);

    expect(res).toHaveProperty('id');
  });

  it('should not be able to create a new themes with name exists', async () => {
    expect(async () => {
      const theme = 'theme test';

      await createThemesUseCase.execute({ theme });
      await createThemesUseCase.execute({ theme });
    }).rejects.toBeInstanceOf(AppError);
  });
});
