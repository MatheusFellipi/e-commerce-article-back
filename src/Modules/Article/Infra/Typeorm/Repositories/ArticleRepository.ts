import { getRepository, Repository } from 'typeorm';
import { DTOCreateArticle } from '@Modules/Article/DTOS/DTOCreateArticle';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { Articles } from '../Entities/Articles';

class ArticlesRepository implements IArticlesRepository {
  private repository: Repository<Articles>;

  constructor() {
    this.repository = getRepository(Articles);
  }
  async create({
    user_id,
    theme_id,
    text,
    title,
    id,
  }: DTOCreateArticle): Promise<void> {
    const article = this.repository.create({
      id,
      theme_id,
      user_id,
      text,
      title,
    });

    await this.repository.save(article);
  }
  async list(): Promise<Articles[]> {
    return this.repository.find();
  }
  async FindByName(termoPesquisa: string): Promise<Articles[]> {
    return this.repository.find({ title: termoPesquisa });
  }
}

export { ArticlesRepository };
