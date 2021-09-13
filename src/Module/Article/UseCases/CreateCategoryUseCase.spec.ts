import { AppError } from 'Shared/Infra/typeorm/errors/appError';
import { ThemeRepositoryInMemory } from '../Repositories/in-memory/ThemeRepositoryInMemory';
import { CreateThemeUseCase } from './CreateCategoryUseCase';

describe('Create Category', () => {
  let createThemeUseCase: CreateThemeUseCase;
  let themeRepositoryInMemory: ThemeRepositoryInMemory;

  beforeEach(() => {
    themeRepositoryInMemory = new ThemeRepositoryInMemory();
    createThemeUseCase = new CreateThemeUseCase(themeRepositoryInMemory);
  });
  it('should be able to create a new theme', async () => {
    const themes = {
      theme: 'theme test',
    };

    await createThemeUseCase.execute({
      theme: themes.theme,
    });

    const categoryCreated = await themeRepositoryInMemory.findByName(
      themes.theme
    );

    expect(categoryCreated).toHaveProperty('id');
  });
  it('should not be able to create a new theme with name exists', async () => {
    expect(async () => {
      const themes = {
        theme: 'theme test',
      };

      await createThemeUseCase.execute({
        theme: themes.theme,
      });

      await createThemeUseCase.execute({
        theme: themes.theme,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
