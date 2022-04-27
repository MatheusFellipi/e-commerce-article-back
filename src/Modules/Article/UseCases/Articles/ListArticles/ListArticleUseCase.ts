import { inject, injectable } from 'tsyringe';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';

@injectable()
class ListArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(): Promise<Articles[]> {
    const list = await this.articlesRepository.list();
    return list.map((item) => {
      return {
        ...item,
        themes: JSON.parse(item.themes),
      };
    });
  }
}

export { ListArticlesUseCase };
