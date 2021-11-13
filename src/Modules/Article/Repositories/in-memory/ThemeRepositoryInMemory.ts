import { DTOCreateTheme } from '@Modules/Article/DTOS/DTOCreateTheme';
import { Themes } from '@Modules/Article/Infra/Typeorm/Entities/Themes';
import { IThemeRepository } from '../IThemeRepository';

export class ThemeRepositoryInMemory implements IThemeRepository {
  private _theme: Themes[];

  constructor() {
    this._theme = [];
  }

  async create({ theme }: DTOCreateTheme): Promise<void> {
    const entitiesThemes = new Themes();

    Object.assign(entitiesThemes, { theme });

    this._theme.push(entitiesThemes);
  }

  async findByName(termoPesquisa: string): Promise<Themes> {
    return this._theme.find((el) => el.theme === termoPesquisa);
  }
}
