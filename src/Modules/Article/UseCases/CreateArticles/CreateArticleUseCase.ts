import { inject, injectable } from 'tsyringe';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { AppError } from '@Shared/Errors/AppError';
import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';

interface IRequest {
  id?: string;
  user_id: string;
  themes: string[];
  text: any;
  title: string;
  img_url?: string;
  isDeleted?: boolean;
  amount: number;
}

@injectable()
class CreateArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private __articleRepos: IArticlesRepository,
    @inject('ThemeRepository')
    private themeRepository: IThemeRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const theme = JSON.stringify(data.themes);
    data.text = JSON.stringify(data.text);
    this.__articleRepos.create({
      ...data,
      themes: theme,
    });
  }
}
export { CreateArticlesUseCase };
