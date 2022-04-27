import { getRepository, Repository } from 'typeorm';
import { DTOCreateArticle } from '@Modules/Article/DTOS/DTOCreateArticle';
import { IArticlesRepository } from '@Modules/Article/Repositories/IArticlesRepository';
import { IThemeRepository } from '@Modules/Article/Repositories/IThemeRepository';
import { Articles } from '../Entities/Articles';
import { ThemeRepository } from './ThemesRepository';

class ArticlesRepository implements IArticlesRepository {
  private repository: Repository<Articles>;
  private themeRepository: IThemeRepository;

  constructor() {
    this.repository = getRepository(Articles);
    this.themeRepository = new ThemeRepository();
  }
  
  FindByIdOne(termoPesquisa: string): Promise<Articles> {
    return this.repository.findOne({
      where: {
        id: termoPesquisa,
      },
    });
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

  async create({
    user_id,
    themes,
    text,
    title,
    amount,
    img_url,
    id,
  }: DTOCreateArticle): Promise<void> {
    themes.map(async (theme) => {
      const themeAlreadyExists = await this.themeRepository.findByName(theme);
      if (!themeAlreadyExists) {
        await this.themeRepository.create({ theme });
      }
    });

    const themeArrayToString = JSON.stringify(themes);

    const article = this.repository.create({
      id,
      img_url,
      user_id,
      themes: themeArrayToString,
      amount,
      text,
      title,
    });

    await this.repository.save(article);
  }

  async list(): Promise<Articles[]> {
    return await this.repository.find({
      relations: ['user'],
    });
  }

  async FindByName(termoPesquisa: string): Promise<Articles[]> {
    return this.repository.find({ title: termoPesquisa });
  }
}

export { ArticlesRepository };
