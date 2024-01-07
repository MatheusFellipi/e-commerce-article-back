import { Pagination } from '@Shared/types/pagination';
import { DTOCreateArticle } from '../DTOS/DTOCreateArticle';
import { Articles } from '../Infra/Typeorm/Entities/Articles';

interface IArticlesRepository {
  create(data: DTOCreateArticle): Promise<void>;
  list(Pagination: Pagination): Promise<Articles[]>;
  FindById(termoPesquisa: string): Promise<Articles>;
  FindByName(termoPesquisa: string): Promise<Articles[]>;
  FindByIds(idsArticles: string[]): Promise<Articles[]>;
  FindByIdUser(termoPesquisa: string): Promise<Articles[]>;
}

export { IArticlesRepository };
