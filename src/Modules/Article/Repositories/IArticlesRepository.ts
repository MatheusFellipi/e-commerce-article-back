import { DTOCreateArticle } from '../DTOS/DTOCreateArticle';
import { Articles } from '../Infra/Typeorm/Entities/Articles';

interface IArticlesRepository {
  create(data: DTOCreateArticle): Promise<void>;
  list(): Promise<Articles[]>;
  FindByName(termoPesquisa: string): Promise<Articles[]>;
  FindByNameOne(termoPesquisa: string): Promise<Articles>;
}

export { IArticlesRepository };
