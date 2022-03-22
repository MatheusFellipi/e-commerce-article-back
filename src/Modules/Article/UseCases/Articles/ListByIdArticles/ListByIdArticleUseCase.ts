import { inject, injectable } from 'tsyringe';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';

@injectable()
class ListByIdArticlesUseCase {
  constructor(
    @inject('ArticlesRepository')
    private themeRepository: IArticlesRepository
  ) {}

  async execute(id: string): Promise<Articles> {
    console.log(await this.themeRepository.FindById(id));
    return await this.themeRepository.FindById(id);
  }
}
export { ListByIdArticlesUseCase };
