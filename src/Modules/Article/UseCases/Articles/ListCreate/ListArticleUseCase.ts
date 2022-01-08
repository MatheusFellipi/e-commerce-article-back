import { inject, injectable } from 'tsyringe';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';

@injectable()
class ListArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private themeRepository: IArticlesRepository
  ) {}

  async execute(): Promise<Articles[]> {
    return await this.themeRepository.list();
  }
}
export { ListArticlesUseCase };
