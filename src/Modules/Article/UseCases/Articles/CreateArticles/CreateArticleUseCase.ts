import { inject, injectable } from 'tsyringe';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { AppError } from '@Shared/Errors/AppError';

interface IRequest {
  id?: string;
  user_id: string;
  themes: string[];
  text: string;
  title: string;
  img_url?: string;
  isDeleted?: boolean;
}

@injectable()
class CreateArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private articleRepository: IArticlesRepository
  ) {}

  async execute({
    text,
    themes,
    title,
    user_id,
    id,
    img_url,
    isDeleted,
  }: IRequest): Promise<void> {
    this.articleRepository.create({
      text,
      themes,
      title,
      user_id,
      isDeleted,
      id,
      img_url,
    });
  }
}
export { CreateArticlesUseCase };
