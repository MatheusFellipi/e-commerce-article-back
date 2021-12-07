import { getRepository, Repository } from 'typeorm';
import { DTOCreateArticle } from '@Modules/Article/DTOS/DTOCreateArticle';
import { IThemeRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { Articles } from '../Entities/Articles';

class ArticlesRepository implements IThemeRepository {
  private repository: Repository<Articles>;

  constructor() {
    this.repository = getRepository(Articles);
  }

  async create({
    user_id,
    theme_id,
    text,
    title,
  }: DTOCreateArticle): Promise<void> {
    const article = this.repository.create({ theme_id, user_id, text, title });
    await this.repository.save(article);
  }
}

export { ArticlesRepository };
