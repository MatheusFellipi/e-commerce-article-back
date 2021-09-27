import { ICreateThemeDTO } from '../DTOS/IThemeDTO';
import { Themes } from '../Infra/Typeorm/Entities/Themes';

interface IThemeRepository {
  create(data: ICreateThemeDTO): Promise<void>;
  findByName(termoPesquisa: string): Promise<Themes>;
}

export { IThemeRepository };
