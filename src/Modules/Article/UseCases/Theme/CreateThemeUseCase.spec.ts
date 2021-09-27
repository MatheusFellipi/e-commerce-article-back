import { ThemesRepositoryInMemory } from '@Modules/Article/Repositories/in-memory/ThemeRepositoryInMemory';
import { AppError } from '@Shared/Errors/AppError';
import { CreateThemeUseCase } from './CreateThemeUseCase';

describe('Create Category', () => {
  let createCategoryUseCase: CreateThemeUseCase;
  let categoriesRepositoryInMemory: ThemesRepositoryInMemory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new ThemesRepositoryInMemory();
    createCategoryUseCase = new CreateThemeUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('should be able to create a new category', async () => {
    const category = {
      name: 'category test',
    };
    await createCategoryUseCase.execute({
      theme: category.name,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'category test',
        description: 'category description test',
      };

      await createCategoryUseCase.execute({
        theme: category.name,
      });
      await createCategoryUseCase.execute({
        theme: category.name,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
