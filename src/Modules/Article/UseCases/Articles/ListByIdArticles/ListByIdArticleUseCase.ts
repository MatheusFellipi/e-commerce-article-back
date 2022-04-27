import { inject, injectable } from 'tsyringe';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';

@injectable()
class ListByIdArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(id: string): Promise<Articles> {
    return await this.articlesRepository.FindById(id);
  }
}
export { ListByIdArticlesUseCase };
