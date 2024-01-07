import { DTOCreateArticle } from '@Modules/Article/DTOS/DTOCreateArticle';
import { Articles } from '@Modules/Article/Infra/Typeorm/Entities/Articles';
import { ThemeRepositoryInMemory } from './ThemeRepositoryInMemory';
import { IArticlesRepository } from '../IArticlesRepository';

export class ArticlesRepositoryInMemory implements IArticlesRepository {
  private _articles: Articles[];

  constructor() {
    this._articles = [];
  }
  FindByIds(idsArticles: string[]): Promise<Articles[]> {
    throw new Error('Method not implemented.');
  }
  FindByIdUser(termoPesquisa: string): Promise<Articles[]> {
    throw new Error('Method not implemented.');
  }

  FindById(termoPesquisa: string): Promise<Articles> {
    const article = this._articles.find((x) => x.title === termoPesquisa);
    return article
  }

  async FindByName(termoPesquisa: string): Promise<Articles[]> {
    const needle = termoPesquisa.toLowerCase();
    return this._articles.filter(
      (v) => v.title.toLocaleLowerCase().indexOf(needle) > -1
    );
  }
  async FindByNameOne(termoPesquisa: string): Promise<Articles> {
    return this._articles.find((x) => x.title === termoPesquisa);
  }

  async list(): Promise<Articles[]> {
    return this._articles;
  }

  async create({
    user_id,
    title,
    text,
    themes,
  }: DTOCreateArticle): Promise<void> {
    const themeRepository = new ThemeRepositoryInMemory();

    themes.map(async (theme) => {
      const themeAlreadyExists = await themeRepository.findByName(theme);
      if (!themeAlreadyExists) {
        await themeRepository.create({ theme });
      }
    });

    const entitiesArticles = new Articles();
    const themeArrayToString = themes.toString();

    Object.assign(entitiesArticles, {
      themes: themeArrayToString,
      user_id,
      text,
      title,
    });

    this._articles.push(entitiesArticles);
  }
}
