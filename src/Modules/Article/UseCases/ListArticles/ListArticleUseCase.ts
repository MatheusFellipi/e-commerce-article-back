import { inject, injectable } from 'tsyringe';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { Pagination } from '@Shared/types/pagination';
import { Utility } from '@Shared/Utils/Utility';

@injectable()
class ListArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private articlesRepository: IArticlesRepository
  ) {}

  async execute(pagination: Pagination): Promise<any[]> {
    const list = await this.articlesRepository.list(pagination);
    return list.map((item) => Utility.FormattedArticlesDashEHomeUsers(item));
  }
}

export { ListArticlesUseCase };
