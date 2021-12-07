import { DTOCreateArticle } from '../DTOS/DTOCreateArticle';
import { Articles } from '../Infra/Typeorm/Entities/Articles';

interface IThemeRepository {
  create(data: DTOCreateArticle): Promise<void>;
}

export { IThemeRepository };
