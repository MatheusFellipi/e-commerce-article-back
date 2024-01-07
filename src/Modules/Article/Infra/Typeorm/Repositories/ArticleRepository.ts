import { getRepository, Repository } from 'typeorm';
import { DTOCreateArticle } from '@Modules/Article/DTOS/DTOCreateArticle';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';
import { Articles } from '../Entities/Articles';
import { ThemeRepository } from './ThemesRepository';
import { Pagination } from '@Shared/types/pagination';

class ArticlesRepository implements IArticlesRepository {
  private repository: Repository<Articles>;
  private themeRepository: IThemeRepository;

  constructor() {
    this.repository = getRepository(Articles);
    this.themeRepository = new ThemeRepository();
  }
  FindByIds(idsArticles: string[]): Promise<Articles[]> {
    return this.repository.findByIds(idsArticles);
  }
  FindByIdUser(termoPesquisa: string): Promise<Articles[]> {
    return this.repository.find({
      where: {
        user_id: termoPesquisa,
      },
    });
  }
  FindById(termoPesquisa: string): Promise<Articles> {
    return this.repository.findOne({
      where: {
        id: termoPesquisa,
      },
      relations: ['user'],
    });
  }
  async create(data: DTOCreateArticle): Promise<void> {
    const article = this.repository.create(data);
    await this.repository.save(article);
  }
  async list({ page, page_size }: Pagination): Promise<Articles[]> {
    const skip = (page - 1) * page_size;
    return await this.repository.find({
      relations: ['user'],
      take: page_size,
      skip,
    });
  }
  async FindByName(termoPesquisa: string): Promise<Articles[]> {
    return this.repository.find({ title: termoPesquisa });
  }
}

export { ArticlesRepository };
