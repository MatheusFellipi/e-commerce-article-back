import { IThemeDTO } from '../DTOS/IThemeDTO';
import { Themes } from '../Infra/typeorm/entities/Themes';

interface IThemeRepository {
  create(data: IThemeDTO): Promise<void>;
  findByName(theme: string): Promise<Themes>;
}

export { IThemeRepository };
