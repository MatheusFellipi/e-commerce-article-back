import { DTOCreateArticle } from '../DTOS/DTOCreateArticle';
import { Articles } from '../Infra/Typeorm/Entities/Articles';

interface IArticlesRepository {
  create(data: DTOCreateArticle): Promise<void>;
}

export { IArticlesRepository };
