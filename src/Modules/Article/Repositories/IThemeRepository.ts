import { DTOCreateTheme } from '../DTOS/DTOCreateTheme';
import { Themes } from '../Infra/Typeorm/Entities/Themes';

interface IThemeRepository {
  create(data: DTOCreateTheme): Promise<void>;
  findByName(termoPesquisa: string): Promise<Themes>;
}

export { IThemeRepository };
